// packages/api/src/services/document.service.ts
// Business logic for document upload/OCR scanning: path resolution, OCR
// execution, and DB persistence. Controllers stay thin orchestrators that
// just call these and shape the HTTP response.

import path from 'path';
import { Document } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { NotFoundError } from '../utils/errors';
import { parseMatricCertificate, parseIdDocument, OCRResult } from '../utils/ocr';
import { UPLOAD_DIR } from '../config/multer';
import { safeUnlink } from '../utils/fs';
import { verifyFileSignature } from '../utils/fileSignature';

type UploadedFile = Pick<
  Express.Multer.File,
  'path' | 'filename' | 'originalname' | 'mimetype' | 'size'
>;

// Deletes the student's existing document of this type (file + DB row), if any.
export async function replaceExistingDocument(studentId: string, type: string): Promise<void> {
  const existing = await prisma.document.findFirst({ where: { studentId, type } });
  if (!existing) return;

  await safeUnlink(path.join(UPLOAD_DIR, existing.storageKey));
  await prisma.document.delete({ where: { id: existing.id } });
}

function saveDocumentRecord(
  studentId: string,
  type: string,
  file: UploadedFile
): Promise<Document> {
  return prisma.document.create({
    data: {
      studentId,
      type,
      fileName: file.originalname,
      mimeType: file.mimetype,
      storageKey: file.filename,
      sizeBytes: file.size,
    },
  });
}

async function getStudentIdNumber(studentId: string): Promise<string | null> {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: { idNumber: true },
  });
  if (!student) {
    throw new NotFoundError('Student not found');
  }
  return student.idNumber;
}

export async function scanAndSaveMatricCertificate(
  studentId: string,
  file: UploadedFile
): Promise<{ document: Document; ocr: OCRResult }> {
  try {
    await verifyFileSignature(file.path, file.mimetype);

    const ocrResult = await parseMatricCertificate(file.path);
    const registeredIdNumber = await getStudentIdNumber(studentId);

    if (ocrResult.idNumber && ocrResult.idNumber !== registeredIdNumber) {
      ocrResult.warnings.push(
        'ID number on certificate does not match your registered ID. Please verify.'
      );
    }

    await replaceExistingDocument(studentId, 'matric_certificate');
    const document = await saveDocumentRecord(studentId, 'matric_certificate', file);

    return { document, ocr: ocrResult };
  } catch (error) {
    await safeUnlink(file.path);
    throw error;
  }
}

export async function scanAndSaveIdDocument(
  studentId: string,
  file: UploadedFile
): Promise<{
  document: Document;
  idNumber: string | null;
  confidence: 'high' | 'medium' | 'low';
  warnings: string[];
}> {
  try {
    await verifyFileSignature(file.path, file.mimetype);

    const ocrResult = await parseIdDocument(file.path);
    const registeredIdNumber = await getStudentIdNumber(studentId);

    const warnings = [...ocrResult.warnings];
    if (registeredIdNumber && ocrResult.idNumber && ocrResult.idNumber !== registeredIdNumber) {
      warnings.unshift('ID number on document does not match your profile. Please verify.');
    }

    await replaceExistingDocument(studentId, 'id_document');
    const document = await saveDocumentRecord(studentId, 'id_document', file);

    return { document, idNumber: ocrResult.idNumber, confidence: ocrResult.confidence, warnings };
  } catch (error) {
    await safeUnlink(file.path);
    throw error;
  }
}
