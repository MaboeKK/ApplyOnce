// packages/api/src/routes/auth.ts
// Auth routes

import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { validateBody } from '../middleware/validate';
import { registerSchema, verifyEmailSchema, loginSchema } from '../schemas/auth';
import * as authController from '../controllers/auth';

const router = Router();

/**
 * @swagger
 * /v1/auth/register:
 *   post:
 *     summary: Register a new student
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idNumber
 *               - email
 *               - phone
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               idNumber:
 *                 type: string
 *                 description: 13-digit SA ID number
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration successful
 *       409:
 *         description: Email or ID number already registered
 */
router.post(
  '/register',
  validateBody(registerSchema),
  asyncHandler(authController.register)
);

/**
 * @swagger
 * /v1/auth/verify:
 *   post:
 *     summary: Verify email with 6-digit code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired code
 */
router.post(
  '/verify',
  validateBody(verifyEmailSchema),
  asyncHandler(authController.verifyEmail)
);

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: Login (student or university admin)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials or email not verified
 */
router.post(
  '/login',
  validateBody(loginSchema),
  asyncHandler(authController.login)
);

/**
 * @swagger
 * /v1/auth/logout:
 *   post:
 *     summary: Logout (clears cookies)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', asyncHandler(authController.logout));

export default router;
