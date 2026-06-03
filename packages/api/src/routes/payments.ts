// packages/api/src/routes/payments.ts
// Payment routes

import { Router } from 'express';
import { requireStudent } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { initiatePaymentSchema, paymentNotificationSchema } from '../schemas/payment';
import { initiatePayment, handlePaymentNotification, getPayment } from '../controllers/payment';

const router = Router();

/**
 * @openapi
 * /payments/initiate:
 *   post:
 *     summary: Initiate payment for draft applications
 *     tags: [Payments]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - applicationIds
 *               - returnUrl
 *               - cancelUrl
 *             properties:
 *               applicationIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               returnUrl:
 *                 type: string
 *                 format: uri
 *               cancelUrl:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Payment initiated
 *       400:
 *         description: Validation error or missing documents
 *       401:
 *         description: Unauthorized
 */
router.post('/initiate', requireStudent, validateBody(initiatePaymentSchema), initiatePayment);

/**
 * @openapi
 * /payments/notify:
 *   post:
 *     summary: PayGate webhook (ITN) - mock in dev, real in production
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentId
 *               - status
 *             properties:
 *               paymentId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [COMPLETE, FAILED, CANCELLED]
 *               gatewayReference:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification processed
 *       404:
 *         description: Payment not found
 */
router.post('/notify', validateBody(paymentNotificationSchema), handlePaymentNotification);

/**
 * @openapi
 * /payments/{id}:
 *   get:
 *     summary: Get payment details
 *     tags: [Payments]
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
 *         description: Payment retrieved
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 */
router.get('/:id', requireStudent, getPayment);

export default router;
