// packages/api/src/controllers/student.ts
// Student profile and subject management

import { Response } from 'express';
import { AuthRequest } from '../types/express';
import { asyncHandler } from '../utils/asyncHandler';
import { prisma } from '../utils/prisma';
import { NotFoundError, ConflictError } from '../utils/errors';
import { markToAPS, normalizeSubjectName } from '@applyonce/shared';
import { parseSAIdNumber } from '../utils/saId';
import { Prisma } from '@prisma/client';

/**
 * GET /v1/students/me
 * Get current student profile
 */
export const getMyProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const studentId = req.student!.studentId;

  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      subjectResults: {
        orderBy: { subject: 'asc' },
      },
      documents: {
        select: {
          id: true,
          type: true,
          fileName: true,
          uploadedAt: true,
          sizeBytes: true,
        },
      },
    },
  });

  if (!student) {
    throw new NotFoundError('Student not found');
  }

  // Remove sensitive fields
  const { passwordHash: _passwordHash, emailVerifyToken: _emailVerifyToken, emailVerifyExpires: _emailVerifyExpires, ...studentData } = student;

  res.json({
    student: {
      ...studentData,
      dateOfBirth: student.dateOfBirth ? student.dateOfBirth.toISOString().split('T')[0] : null,
      createdAt: student.createdAt.toISOString(),
      updatedAt: student.updatedAt.toISOString(),
    },
  });
});

/**
 * PUT /v1/students/me
 * Update student profile
 */
export const updateMyProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const studentId = req.student!.studentId;
  const updates = req.body;

  // Cannot update certain fields via this endpoint
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _id, email: _email, passwordHash: _passwordHash, emailVerified: _emailVerified, ...allowedUpdates } = updates;

  // SECURITY: If idNumber is present, auto-derive DOB and gender from it
  // and IGNORE any client-submitted DOB/gender values to prevent spoofing
  if (allowedUpdates.idNumber) {
    try {
      const idInfo = parseSAIdNumber(allowedUpdates.idNumber);

      // Replace DOB and gender with server-derived values (ignore client input)
      allowedUpdates.dateOfBirth = idInfo.dateOfBirth;
      allowedUpdates.gender = idInfo.gender;
    } catch (error) {
      // If ID parsing fails, the validation error will be caught below
      // (invalid ID format will fail the Zod schema validation)
    }
  }

  try {
    const student = await prisma.student.update({
      where: { id: studentId },
      data: allowedUpdates,
      include: {
        subjectResults: true,
      },
    });

    const { passwordHash: _passwordHash, emailVerifyToken: _emailVerifyToken, emailVerifyExpires: _emailVerifyExpires, ...studentData } = student;

    res.json({
      message: 'Profile updated successfully',
      student: {
        ...studentData,
        dateOfBirth: student.dateOfBirth ? student.dateOfBirth.toISOString().split('T')[0] : null,
        createdAt: student.createdAt.toISOString(),
        updatedAt: student.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    // Handle unique constraint violation for idNumber
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new ConflictError(
        'This ID number is already registered with another account',
        'ID_NUMBER_EXISTS'
      );
    }
    throw error;
  }
});

/**
 * PUT /v1/students/me/subjects
 * Update student subject results
 */
export const updateMySubjects = asyncHandler(async (req: AuthRequest, res: Response) => {
  const studentId = req.student!.studentId;
  const { results } = req.body;

  // Delete existing subject results
  await prisma.subjectResult.deleteMany({
    where: { studentId },
  });

  // Create new subject results (normalize subject names for consistency)
  const subjectResults = await prisma.subjectResult.createMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: results.map((result: any) => ({
      studentId,
      subject: normalizeSubjectName(result.subject),
      mark: result.mark,
      level: result.level || markToAPS(result.mark),
      year: result.year,
    })),
  });

  // Fetch the created results
  const updated = await prisma.subjectResult.findMany({
    where: { studentId },
    orderBy: { subject: 'asc' },
  });

  res.json({
    message: 'Subject results updated successfully',
    count: subjectResults.count,
    subjects: updated,
  });
});
