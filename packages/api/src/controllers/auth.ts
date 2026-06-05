// packages/api/src/controllers/auth.ts
// Auth controller (register, verify, login, logout)

import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { AuthenticatedRequest } from '../types/express';
import { RegisterInput, VerifyEmailInput, LoginInput } from '../schemas/auth';
import { prisma } from '../utils/prisma';
import {
  ConflictError,
  UnauthorizedError,
  BadRequestError,
} from '../utils/errors';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { sendVerificationEmail } from '../utils/email';
import { parseSAIdNumber } from '../utils/saId';
import { config } from '../config';
import { logger } from '../utils/logger';

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: 'lax' as const,
    maxAge,
  };
}

export async function register(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const input = req.body as RegisterInput;

  // Check if student already exists
  const existing = await prisma.student.findUnique({
    where: { email: input.email },
  });

  if (existing) {
    throw new ConflictError(
      'Email already registered',
      'EMAIL_EXISTS'
    );
  }

  // Hash password
  const passwordHash = await bcrypt.hash(input.password, 10);

  // Generate verification code
  const verificationCode = generateVerificationCode();
  const verifyExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Create student (minimal info - profile fields collected in wizard)
  const student = await prisma.student.create({
    data: {
      email: input.email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      emailVerifyToken: verificationCode,
      emailVerifyExpires: verifyExpires,
      // All other fields (idNumber, phone, DOB, gender, etc.) are nullable
      // and will be filled during profile wizard
    },
  });

  // Send verification email (or log in dev mode)
  await sendVerificationEmail(student.email, verificationCode);

  logger.info({ studentId: student.id, email: student.email }, 'Student registered');

  res.status(201).json({
    message: 'Registration successful. Please verify your email.',
    studentId: student.id,
    email: student.email,
    // In dev mode, return the code for easy testing
    ...(config.email.mode === 'dev' && { verificationCode }),
  });
}

export async function verifyEmail(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const input = req.body as VerifyEmailInput;

  const student = await prisma.student.findUnique({
    where: { email: input.email },
  });

  if (!student) {
    throw new BadRequestError('Student not found', 'STUDENT_NOT_FOUND');
  }

  if (student.emailVerified) {
    throw new BadRequestError('Email already verified', 'ALREADY_VERIFIED');
  }

  if (!student.emailVerifyToken || !student.emailVerifyExpires) {
    throw new BadRequestError('No verification code found', 'NO_VERIFY_CODE');
  }

  if (student.emailVerifyExpires < new Date()) {
    throw new BadRequestError('Verification code expired', 'CODE_EXPIRED');
  }

  if (student.emailVerifyToken !== input.code) {
    throw new BadRequestError('Invalid verification code', 'INVALID_CODE');
  }

  // Mark as verified
  await prisma.student.update({
    where: { id: student.id },
    data: {
      emailVerified: true,
      emailVerifyToken: null,
      emailVerifyExpires: null,
    },
  });

  logger.info({ studentId: student.id, email: student.email }, 'Email verified');

  res.json({
    message: 'Email verified successfully. You can now log in.',
  });
}

export async function login(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const input = req.body as LoginInput;

  // Check for student
  const student = await prisma.student.findUnique({
    where: { email: input.email },
  });

  if (student) {
    // Verify password
    const valid = await bcrypt.compare(input.password, student.passwordHash);
    if (!valid) {
      throw new UnauthorizedError(
        'Invalid credentials',
        'INVALID_CREDENTIALS'
      );
    }

    // Check email verification
    if (!student.emailVerified) {
      throw new UnauthorizedError(
        'Please verify your email before logging in',
        'EMAIL_NOT_VERIFIED'
      );
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      role: 'student',
      studentId: student.id,
      email: student.email,
    });

    const refreshToken = generateRefreshToken(student.id);
    const refreshExpires = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ); // 30 days

    // Store refresh token
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        studentId: student.id,
        expiresAt: refreshExpires,
      },
    });

    // Set cookies
    res.cookie('accessToken', accessToken, getCookieOptions(15 * 60 * 1000)); // 15 min
    res.cookie('refreshToken', refreshToken, getCookieOptions(30 * 24 * 60 * 60 * 1000)); // 30 days

    logger.info({ studentId: student.id, email: student.email }, 'Student logged in');

    res.json({
      message: 'Login successful',
      user: {
        role: 'student',
        id: student.id,
        email: student.email,
        firstName: student.firstName,
        lastName: student.lastName,
      },
    });
    return;
  }

  // Check for university admin
  const admin = await prisma.universityAdmin.findUnique({
    where: { email: input.email },
    include: { university: true },
  });

  if (admin) {
    // Verify password
    const valid = await bcrypt.compare(input.password, admin.passwordHash);
    if (!valid) {
      throw new UnauthorizedError(
        'Invalid credentials',
        'INVALID_CREDENTIALS'
      );
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      role: 'university_admin',
      adminId: admin.id,
      universityId: admin.universityId,
      email: admin.email,
    });

    const refreshToken = generateRefreshToken(admin.id);
    const refreshExpires = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    );

    // Store refresh token
    await prisma.universityAdminRefreshToken.create({
      data: {
        token: refreshToken,
        adminId: admin.id,
        expiresAt: refreshExpires,
      },
    });

    // Set cookies
    res.cookie('accessToken', accessToken, getCookieOptions(15 * 60 * 1000));
    res.cookie('refreshToken', refreshToken, getCookieOptions(30 * 24 * 60 * 60 * 1000));

    logger.info({ adminId: admin.id, email: admin.email, universityId: admin.universityId }, 'University admin logged in');

    res.json({
      message: 'Login successful',
      user: {
        role: 'university_admin',
        id: admin.id,
        email: admin.email,
        name: admin.name,
        universityId: admin.universityId,
        universityName: admin.university.name,
      },
    });
    return;
  }

  // Neither student nor admin found
  throw new UnauthorizedError('Invalid credentials', 'INVALID_CREDENTIALS');
}

export async function logout(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    // Delete refresh token from database
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
    await prisma.universityAdminRefreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }

  // Clear cookies
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  logger.info('User logged out');

  res.json({ message: 'Logout successful' });
}
