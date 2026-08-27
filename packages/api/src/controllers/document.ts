// packages/api/src/controllers/document.ts
// Document upload and OCR management

import { Response } from 'express';
import path from 'path';
import { AuthRequest } from '../types/express';
import { asyncHandler } from '../utils/asyncHandler';
import { prisma } from '../utils/prisma';
import { ValidationError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger';
import { UPLOAD_DIR } from '../config/multer';
import { pathExists, safeUnlink } from '../utils/fs';
import {
  replaceExistingDocument,
  scanAndSaveMatricCertificate,
  scanAndSaveIdDocument,
} from '../services/document.service';

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

  // Delete old file if replacing
  await replaceExistingDocument(studentId, type);

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

  logger.info({ studentId, fileName: req.file.originalname }, 'Scanning matric certificate');

  const { document, ocr } = await scanAndSaveMatricCertificate(studentId, req.file);

  res.json({
    message: 'Matric certificate scanned successfully',
    document: {
      id: document.id,
      type: document.type,
      fileName: document.fileName,
      uploadedAt: document.uploadedAt.toISOString(),
    },
    ocr: {
      aps: ocr.aps,
      subjects: ocr.subjects,
      idNumber: ocr.idNumber,
      confidence: ocr.confidence,
      warnings: ocr.warnings,
    },
  });
});

/**
 * POST /v1/documents/scan-id
 * OCR scan of ID document to extract ID number
 */
export const scanIdDocument = asyncHandler(async (req: AuthRequest, res: Response) => {
  const studentId = req.student!.studentId;

  if (!req.file) {
    throw new ValidationError('No file uploaded');
  }

  logger.info({ studentId, fileName: req.file.originalname }, 'Scanning ID document');

  const { document, idNumber, confidence, warnings } = await scanAndSaveIdDocument(
    studentId,
    req.file
  );

  res.json({
    message: 'ID document scanned successfully',
    document: {
      id: document.id,
      type: document.type,
      fileName: document.fileName,
      uploadedAt: document.uploadedAt.toISOString(),
    },
    ocr: { idNumber, confidence, warnings },
  });
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

  if (!(await pathExists(filePath))) {
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
  await safeUnlink(filePath);

  // Delete record
  await prisma.document.delete({
    where: { id },
  });

  res.json({ message: 'Document deleted successfully' });
});
