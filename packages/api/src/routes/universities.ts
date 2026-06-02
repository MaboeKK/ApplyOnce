// packages/api/src/routes/universities.ts
// University routes (read-only)

import { Router } from 'express';
import { listUniversities, getUniversity } from '../controllers/university';

const router = Router();

/**
 * @openapi
 * /universities:
 *   get:
 *     summary: List all universities
 *     tags: [Universities]
 *     responses:
 *       200:
 *         description: Universities list
 */
router.get('/', listUniversities);

/**
 * @openapi
 * /universities/{id}:
 *   get:
 *     summary: Get single university details
 *     tags: [Universities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: University details
 *       404:
 *         description: University not found
 */
router.get('/:id', getUniversity);

export default router;
