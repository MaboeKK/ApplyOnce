// packages/api/src/routes/applications.ts
// Application management routes

import { Router } from 'express';
import { requireStudent } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { createApplicationSchema } from '../schemas/application';
import {
  createApplication,
  getMyApplications,
  getApplication,
  deleteApplication,
} from '../controllers/application';

const router = Router();

/**
 * @openapi
 * /applications:
 *   post:
 *     summary: Create a new draft application
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - universityId
 *               - universityName
 *               - programmeId
 *               - programmeName
 *               - facultyName
 *             properties:
 *               universityId:
 *                 type: string
 *               universityName:
 *                 type: string
 *               programmeId:
 *                 type: string
 *               programmeName:
 *                 type: string
 *               facultyName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Application created
 *       400:
 *         description: Validation error or university already applied to
 *       401:
 *         description: Unauthorized
 */
router.post('/', requireStudent, validateBody(createApplicationSchema), createApplication);

/**
 * @openapi
 * /applications:
 *   get:
 *     summary: List all applications for the logged-in student
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Applications retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/', requireStudent, getMyApplications);

/**
 * @openapi
 * /applications/{id}:
 *   get:
 *     summary: Get a single application by ID
 *     tags: [Applications]
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
 *         description: Application retrieved
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not your application
 *       404:
 *         description: Application not found
 */
router.get('/:id', requireStudent, getApplication);

/**
 * @openapi
 * /applications/{id}:
 *   delete:
 *     summary: Delete a draft application
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Application deleted
 *       400:
 *         description: Cannot delete submitted applications
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not your application
 *       404:
 *         description: Application not found
 */
router.delete('/:id', requireStudent, deleteApplication);

export default router;
