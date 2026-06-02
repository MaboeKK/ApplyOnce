// packages/api/src/routes/aps.ts
// APS calculation and matching routes

import { Router } from 'express';
import { requireStudent } from '../middleware/auth';
import { calculateAPSFromResults, getAPSMatches } from '../controllers/aps';

const router = Router();

/**
 * @openapi
 * /aps/calculate:
 *   post:
 *     summary: Calculate APS from subject results
 *     tags: [APS]
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
 *               loHandling:
 *                 type: string
 *                 enum: [exclude, cap_at_4, full]
 *     responses:
 *       200:
 *         description: APS calculated
 */
router.post('/calculate', calculateAPSFromResults);

/**
 * @openapi
 * /aps/matches:
 *   get:
 *     summary: Get programmes matching student's APS
 *     tags: [APS]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Matching programmes with reach/match/safety classification
 */
router.get('/matches', requireStudent, getAPSMatches);

export default router;
