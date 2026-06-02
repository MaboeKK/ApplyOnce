// packages/api/src/controllers/document.ts
// Document upload and OCR management

import { Response } from 'express';
import path from 'path';
import fs from 'fs';
import { AuthRequest } from '../types/express';
import { asyncHandler } from '../utils/asyncHandler';
import { prisma } from '../utils/prisma';
import { ValidationError, NotFoundError } from '../utils/errors';
import { parseMatricCertificate } from '../utils/ocr';
import { logger } from '../utils/logger';
import { UPLOAD_DIR } from '../config/multer';

/**
 * POST /v1/documents/upload
 * Upload a document (matric certificate, ID, proof of residence)
 */
export const uploadDocument = asyncHandler(async (req: AuthRequest, res: Response) => {
  const studentId = req.student!.studentId;
  const { type } = req.body;

  if (!req.file) {
    throw new ValidationError('No file uploaded');
  }

  const file = req.file;

  // Check if document of this type already exists
  const existing = await prisma.document.findFirst({
    where: { studentId, type },
  });

  // Delete old file if replacing
  if (existing) {
    const oldPath = path.join(UPLOAD_DIR, existing.storageKey);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
    await prisma.document.delete({
      where: { id: existing.id },
    });
  }

  // Create document record
  const document = await prisma.document.create({
    data: {
      studentId,
      type,
      fileName: file.originalname,
      mimeType: file.mimetype,
      storageKey: file.filename,
      sizeBytes: file.size,
    },
  });

  res.json({
    message: 'Document uploaded successfully',
    document: {
      id: document.id,
      type: document.type,
      fileName: document.fileName,
      uploadedAt: document.uploadedAt.toISOString(),
    },
  });
});

/**
 * POST /v1/documents/scan-matric
 * OCR scan of matric certificate
 */
export const scanMatricCertificate = asyncHandler(async (req: AuthRequest, res: Response) => {
  const studentId = req.student!.studentId;

  if (!req.file) {
    throw new ValidationError('No file uploaded');
  }

  const file = req.file;
  const filePath = file.path;

  try {
    logger.info({ studentId, fileName: file.originalname }, 'Scanning matric certificate');

    // Run OCR
    const ocrResult = await parseMatricCertificate(filePath);

    // Get student's registered ID for cross-check
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      select: { idNumber: true },
    });

    if (!student) {
      throw new NotFoundError('Student not found');
    }

    // Cross-check ID number
    if (ocrResult.idNumber && ocrResult.idNumber !== student.idNumber) {
      ocrResult.warnings.push(
        'ID number on certificate does not match your registered ID. Please verify.'
      );
    }

    // Save the file as matric_certificate document
    const existing = await prisma.document.findFirst({
      where: { studentId, type: 'matric_certificate' },
    });

    if (existing) {
      const oldPath = path.join(UPLOAD_DIR, existing.storageKey);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      await prisma.document.delete({
        where: { id: existing.id },
      });
    }

    const document = await prisma.document.create({
      data: {
        studentId,
        type: 'matric_certificate',
        fileName: file.originalname,
        mimeType: file.mimetype,
        storageKey: file.filename,
        sizeBytes: file.size,
      },
    });

    res.json({
      message: 'Matric certificate scanned successfully',
      document: {
        id: document.id,
        type: document.type,
        fileName: document.fileName,
        uploadedAt: document.uploadedAt.toISOString(),
      },
      ocr: {
        aps: ocrResult.aps,
        subjects: ocrResult.subjects,
        idNumber: ocrResult.idNumber,
        confidence: ocrResult.confidence,
        warnings: ocrResult.warnings,
      },
    });
  } catch (error) {
    // Clean up uploaded file on error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
});

/**
 * GET /v1/documents
 * List student's documents
 */
export const listMyDocuments = asyncHandler(async (req: AuthRequest, res: Response) => {
  const studentId = req.student!.studentId;

  const documents = await prisma.document.findMany({
    where: { studentId },
    select: {
      id: true,
      type: true,
      fileName: true,
      sizeBytes: true,
      uploadedAt: true,
    },
    orderBy: { uploadedAt: 'desc' },
  });

  res.json({ documents });
});

/**
 * GET /v1/documents/:id
 * Download a document
 */
export const downloadDocument = asyncHandler(async (req: AuthRequest, res: Response) => {
  const studentId = req.student!.studentId;
  const { id } = req.params;

  const document = await prisma.document.findFirst({
    where: { id, studentId },
  });

  if (!document) {
    throw new NotFoundError('Document not found');
  }

  const filePath = path.join(UPLOAD_DIR, document.storageKey);

  if (!fs.existsSync(filePath)) {
    throw new NotFoundError('File not found on server');
  }

  res.download(filePath, document.fileName);
});

/**
 * DELETE /v1/documents/:id
 * Delete a document
 */
export const deleteDocument = asyncHandler(async (req: AuthRequest, res: Response) => {
  const studentId = req.student!.studentId;
  const { id } = req.params;

  const document = await prisma.document.findFirst({
    where: { id, studentId },
  });

  if (!document) {
    throw new NotFoundError('Document not found');
  }

  // Delete file from disk
  const filePath = path.join(UPLOAD_DIR, document.storageKey);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  // Delete record
  await prisma.document.delete({
    where: { id },
  });

  res.json({ message: 'Document deleted successfully' });
});
