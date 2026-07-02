// packages/api/src/routes/admin.ts
// University admin routes (applications inbox, detail, decision)

import { Router } from 'express';
import { requireUniversityAdmin } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { applicationDecisionSchema } from '../schemas/admin';
import * as adminController from '../controllers/admin';

const router = Router();

// All admin routes require university admin authentication
router.use(requireUniversityAdmin);

/**
 * @swagger
 * /v1/admin/applications:
 *   get:
 *     summary: Get all applications for the authenticated admin's university
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status (draft, submitted, accepted, rejected, waitlisted)
 *     responses:
 *       200:
 *         description: List of applications
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not a university admin
 */
router.get('/applications', adminController.getApplications);

/**
 * @swagger
 * /v1/admin/applications/{id}:
 *   get:
 *     summary: Get a single application by ID (only if it belongs to admin's university)
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     responses:
 *       200:
 *         description: Application details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized to view this application
 *       404:
 *         description: Application not found
 */
router.get('/applications/:id', adminController.getApplicationById);

/**
 * @swagger
 * /v1/admin/applications/{id}/decision:
 *   patch:
 *     summary: Accept or Decline an application
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - decision
 *               - reason
 *             properties:
 *               decision:
 *                 type: string
 *                 enum: [accepted, rejected]
 *                 description: Accept or Decline (no waitlist in UI)
 *               reason:
 *                 type: string
 *                 description: Required reason for both Accept and Decline
 *     responses:
 *       200:
 *         description: Decision recorded successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized to decide on this application
 *       404:
 *         description: Application not found
 */
router.patch(
  '/applications/:id/decision',
  validateBody(applicationDecisionSchema),
  adminController.updateApplicationDecision
);

/**
 * @swagger
 * /v1/admin/documents/{id}:
 *   get:
 *     summary: Download a student document (only for students who applied to admin's university)
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Document ID
 *     responses:
 *       200:
 *         description: Document file download
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized to access this document
 *       404:
 *         description: Document not found
 */
router.get('/documents/:id', adminController.downloadDocument);

export default router;
