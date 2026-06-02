// packages/api/src/routes/documents.ts
// Document upload and management routes

import { Router } from 'express';
import { requireStudent } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { upload } from '../config/multer';
import { uploadDocumentSchema } from '../schemas/document';
import {
  uploadDocument,
  scanMatricCertificate,
  listMyDocuments,
  downloadDocument,
  deleteDocument,
} from '../controllers/document';

const router = Router();

/**
 * @openapi
 * /documents:
 *   get:
 *     summary: List student's documents
 *     tags: [Documents]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Documents retrieved
 */
router.get('/', requireStudent, listMyDocuments);

/**
 * @openapi
 * /documents/upload:
 *   post:
 *     summary: Upload a document
 *     tags: [Documents]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [matric_certificate, id_document, proof_of_residence]
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Document uploaded
 */
router.post(
  '/upload',
  requireStudent,
  upload.single('file'),
  validateBody(uploadDocumentSchema),
  uploadDocument
);

/**
 * @openapi
 * /documents/scan-matric:
 *   post:
 *     summary: OCR scan of matric certificate
 *     tags: [Documents]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Certificate scanned, APS and subjects extracted
 */
router.post(
  '/scan-matric',
  requireStudent,
  upload.single('file'),
  scanMatricCertificate
);

/**
 * @openapi
 * /documents/{id}:
 *   get:
 *     summary: Download a document
 *     tags: [Documents]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document file
 */
router.get('/:id', requireStudent, downloadDocument);

/**
 * @openapi
 * /documents/{id}:
 *   delete:
 *     summary: Delete a document
 *     tags: [Documents]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document deleted
 */
router.delete('/:id', requireStudent, deleteDocument);

export default router;
