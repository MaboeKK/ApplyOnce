// packages/api/src/utils/fileSignature.ts
// Verifies an uploaded file's actual content matches its declared mimetype,
// by checking magic bytes rather than trusting the client-supplied
// Content-Type (which multer's fileFilter only checks, and which any client
// can set to whatever it likes).

import { open } from 'fs/promises';
import { ValidationError } from './errors';

type Signature = { bytes: number[]; offset?: number };

// Only the types config/multer.ts's fileFilter currently allows.
const SIGNATURES: Record<string, Signature[]> = {
  'image/jpeg': [{ bytes: [0xff, 0xd8, 0xff] }],
  'image/jpg': [{ bytes: [0xff, 0xd8, 0xff] }],
  'image/png': [{ bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] }],
  'image/webp': [
    { bytes: [0x52, 0x49, 0x46, 0x46] }, // "RIFF" at offset 0
    { bytes: [0x57, 0x45, 0x42, 0x50], offset: 8 }, // "WEBP" at offset 8
  ],
  'application/pdf': [{ bytes: [0x25, 0x50, 0x44, 0x46, 0x2d] }], // "%PDF-"
};

const HEADER_BYTES_NEEDED = 12;

async function readHeader(filePath: string, length: number): Promise<Buffer> {
  const handle = await open(filePath, 'r');
  try {
    const buffer = Buffer.alloc(length);
    const { bytesRead } = await handle.read(buffer, 0, length, 0);
    return buffer.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
}

function matchesSignature(header: Buffer, signature: Signature): boolean {
  const offset = signature.offset ?? 0;
  if (header.length < offset + signature.bytes.length) return false;
  return signature.bytes.every((byte, i) => header[offset + i] === byte);
}

/**
 * Throws ValidationError if the file at filePath's actual content doesn't
 * match its declared mimetype. Call this after multer has saved the file,
 * before it's persisted to the DB or processed further.
 */
export async function verifyFileSignature(filePath: string, mimetype: string): Promise<void> {
  const signatures = SIGNATURES[mimetype];
  if (!signatures) {
    // Not one of the types we know a signature for — fileFilter's mimetype
    // allowlist already rejected anything else before this can run.
    return;
  }

  const header = await readHeader(filePath, HEADER_BYTES_NEEDED);
  const matches = signatures.some((signature) => matchesSignature(header, signature));

  if (!matches) {
    throw new ValidationError(
      'File content does not match its declared type. The file may be corrupted or mislabeled.'
    );
  }
}
