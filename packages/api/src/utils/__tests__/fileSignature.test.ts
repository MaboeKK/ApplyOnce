// packages/api/src/utils/__tests__/fileSignature.test.ts
// Unit tests for magic-byte file-type verification.

import { mkdtemp, writeFile, rm } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import { verifyFileSignature } from '../fileSignature';

describe('verifyFileSignature', () => {
  let dir: string;

  beforeEach(async () => {
    dir = await mkdtemp(path.join(tmpdir(), 'file-signature-test-'));
  });

  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  async function writeTestFile(bytes: number[]): Promise<string> {
    const filePath = path.join(dir, 'upload');
    await writeFile(filePath, Buffer.from(bytes));
    return filePath;
  }

  test('accepts a real JPEG signature', async () => {
    const filePath = await writeTestFile([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
    await expect(verifyFileSignature(filePath, 'image/jpeg')).resolves.toBeUndefined();
  });

  test('accepts a real PNG signature', async () => {
    const filePath = await writeTestFile([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);
    await expect(verifyFileSignature(filePath, 'image/png')).resolves.toBeUndefined();
  });

  test('accepts a real PDF signature', async () => {
    const filePath = await writeTestFile([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]);
    await expect(verifyFileSignature(filePath, 'application/pdf')).resolves.toBeUndefined();
  });

  test('accepts a real WEBP signature (RIFF....WEBP)', async () => {
    const bytes = [
      0x52,
      0x49,
      0x46,
      0x46, // RIFF
      0x00,
      0x00,
      0x00,
      0x00, // file size (unchecked)
      0x57,
      0x45,
      0x42,
      0x50, // WEBP
    ];
    const filePath = await writeTestFile(bytes);
    await expect(verifyFileSignature(filePath, 'image/webp')).resolves.toBeUndefined();
  });

  test('rejects a PDF renamed to claim it is a JPEG (spoofed mimetype)', async () => {
    const filePath = await writeTestFile([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]);
    await expect(verifyFileSignature(filePath, 'image/jpeg')).rejects.toThrow(
      'File content does not match its declared type'
    );
  });

  test('rejects an empty file', async () => {
    const filePath = await writeTestFile([]);
    await expect(verifyFileSignature(filePath, 'application/pdf')).rejects.toThrow(
      'File content does not match its declared type'
    );
  });

  test('does not throw for a mimetype it has no signature for', async () => {
    const filePath = await writeTestFile([0x00, 0x01, 0x02]);
    await expect(verifyFileSignature(filePath, 'text/plain')).resolves.toBeUndefined();
  });
});
