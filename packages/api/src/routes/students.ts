// packages/api/src/routes/students.ts
// Student profile routes

import { Router } from 'express';
import { requireStudent } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { updateStudentProfileSchema, updateSubjectsSchema } from '../schemas/student';
import { getMyProfile, updateMyProfile, updateMySubjects } from '../controllers/student';

const router = Router();

/**
 * @openapi
 * /students/me:
 *   get:
 *     summary: Get current student profile
 *     tags: [Students]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Student profile retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/me', requireStudent, getMyProfile);

/**
 * @openapi
 * /students/me:
 *   put:
 *     summary: Update student profile
 *     tags: [Students]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Profile updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.put('/me', requireStudent, validateBody(updateStudentProfileSchema), updateMyProfile);

/**
 * @openapi
 * /students/me/subjects:
 *   put:
 *     summary: Update student subject results
 *     tags: [Students]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               results:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Subjects updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.put('/me/subjects', requireStudent, validateBody(updateSubjectsSchema), updateMySubjects);

export default router;
