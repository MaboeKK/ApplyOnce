// packages/api/src/controllers/application.ts
// Application management (draft creation, retrieval, deletion)

import { Response } from 'express';
import { AuthRequest } from '../types/express';
import { asyncHandler } from '../utils/asyncHandler';
import { prisma } from '../utils/prisma';
import { BadRequestError, NotFoundError, ForbiddenError } from '../utils/errors';

/**
 * POST /v1/applications
 * Create a new draft application
 *
 * Rules:
 * - Only ONE programme per university (check existing applications)
 * - Application starts as 'draft' status
 * - Student must have uploaded matric certificate + ID before they can pay
 */
export const createApplication = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const studentId = req.student!.studentId;
    const { universityId, universityName, programmeId, programmeName, facultyName } = req.body;

    // Rule: Only one programme per university
    const existingApplication = await prisma.application.findFirst({
      where: {
        studentId,
        universityId,
        status: { in: ['draft', 'submitted'] },
      },
    });

    if (existingApplication) {
      throw new BadRequestError(
        `You already have an application to ${universityName}. Remove it first to choose a different programme.`
      );
    }

    // Create draft application
    const application = await prisma.application.create({
      data: {
        studentId,
        universityId,
        universityName,
        programmeId,
        programmeName,
        facultyName,
        status: 'draft',
      },
    });

    // Log event
    await prisma.applicationEvent.create({
      data: {
        applicationId: application.id,
        eventType: 'created',
        toStatus: 'draft',
      },
    });

    res.status(201).json({
      application: {
        id: application.id,
        universityId: application.universityId,
        universityName: application.universityName,
        programmeId: application.programmeId,
        programmeName: application.programmeName,
        facultyName: application.facultyName,
        status: application.status,
        createdAt: application.createdAt.toISOString(),
      },
    });
  }
);

/**
 * GET /v1/applications
 * List all applications for the logged-in student
 */
export const getMyApplications = asyncHandler(async (req: AuthRequest, res: Response) => {
  const studentId = req.student!.studentId;

  const applications = await prisma.application.findMany({
    where: { studentId },
    include: {
      university: {
        select: {
          id: true,
          name: true,
          abbreviation: true,
          city: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({
    applications: applications.map((app) => ({
      id: app.id,
      universityId: app.universityId,
      universityName: app.universityName,
      programmeId: app.programmeId,
      programmeName: app.programmeName,
      facultyName: app.facultyName,
      status: app.status,
      universityReference: app.universityReference,
      submittedAt: app.submittedAt?.toISOString(),
      decision: app.decision,
      decisionReason: app.decisionReason,
      decisionAt: app.decisionAt?.toISOString(),
      createdAt: app.createdAt.toISOString(),
      updatedAt: app.updatedAt.toISOString(),
    })),
  });
});

/**
 * DELETE /v1/applications/:id
 * Delete an application
 *
 * Rules:
 * - Can only delete DRAFT applications (unpaid)
 * - Submitted applications are final (no withdraw)
 */
export const deleteApplication = asyncHandler(async (req: AuthRequest, res: Response) => {
  const studentId = req.student!.studentId;
  const { id } = req.params;

  const application = await prisma.application.findUnique({
    where: { id },
  });

  if (!application) {
    throw new NotFoundError('Application not found');
  }

  if (application.studentId !== studentId) {
    throw new ForbiddenError('You can only delete your own applications');
  }

  if (application.status !== 'draft') {
    throw new BadRequestError(
      'Only unpaid draft applications can be deleted. Submitted applications are final.'
    );
  }

  // Delete the application (cascade will delete related events if configured)
  await prisma.application.delete({
    where: { id },
  });

  res.status(204).send();
});

/**
 * GET /v1/applications/:id
 * Get a single application by ID
 */
export const getApplication = asyncHandler(async (req: AuthRequest, res: Response) => {
  const studentId = req.student!.studentId;
  const { id } = req.params;

  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      university: {
        select: {
          id: true,
          name: true,
          abbreviation: true,
          city: true,
          province: true,
          website: true,
        },
      },
      events: {
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
    },
  });

  if (!application) {
    throw new NotFoundError('Application not found');
  }

  if (application.studentId !== studentId) {
    throw new ForbiddenError('You can only view your own applications');
  }

  res.json({
    application: {
      id: application.id,
      universityId: application.universityId,
      universityName: application.universityName,
      programmeId: application.programmeId,
      programmeName: application.programmeName,
      facultyName: application.facultyName,
      status: application.status,
      universityReference: application.universityReference,
      submittedAt: application.submittedAt?.toISOString(),
      decision: application.decision,
      decisionReason: application.decisionReason,
      decisionAt: application.decisionAt?.toISOString(),
      universityResponse: application.universityResponse,
      notes: application.notes,
      createdAt: application.createdAt.toISOString(),
      updatedAt: application.updatedAt.toISOString(),
      events: application.events.map((e) => ({
        id: e.id,
        eventType: e.eventType,
        fromStatus: e.fromStatus,
        toStatus: e.toStatus,
        data: e.data,
        createdAt: e.createdAt.toISOString(),
      })),
    },
  });
});
