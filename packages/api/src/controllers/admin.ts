// packages/api/src/controllers/admin.ts
// University admin controllers (applications inbox, detail, decision, document download)

import { Response } from 'express';
import path from 'path';
import fs from 'fs';
import { AuthRequest } from '../types/express';
import { asyncHandler } from '../utils/asyncHandler';
import { prisma } from '../utils/prisma';
import { NotFoundError, ForbiddenError, BadRequestError } from '../utils/errors';
import { ApplicationDecisionInput } from '../schemas/admin';
import { logger } from '../utils/logger';
import { sendDecisionEmail } from '../utils/email';
import { UPLOAD_DIR } from '../config/multer';

/**
 * GET /v1/admin/applications
 * Get all applications for the authenticated admin's university
 * Isolation enforced: filters by req.admin.universityId
 */
export const getApplications = asyncHandler(async (req: AuthRequest, res: Response) => {
  const universityId = req.admin!.universityId;
  const statusFilter = req.query.status as string | undefined;

  // Build where clause with mandatory university filter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    universityId,
  };

  if (statusFilter) {
    where.status = statusFilter;
  }

  const applications = await prisma.application.findMany({
    where,
    include: {
      student: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          idNumber: true,
        },
      },
    },
    orderBy: [
      { submittedAt: 'desc' },
      { createdAt: 'desc' },
    ],
  });

  logger.info(
    { adminId: req.admin!.adminId, universityId, count: applications.length },
    'Admin fetched applications'
  );

  res.json({
    applications: applications.map(app => ({
      id: app.id,
      studentId: app.studentId,
      studentName: `${app.student.firstName} ${app.student.lastName}`,
      studentEmail: app.student.email,
      studentIdNumber: app.student.idNumber,
      universityId: app.universityId,
      universityName: app.universityName,
      programmeId: app.programmeId,
      programmeName: app.programmeName,
      facultyName: app.facultyName,
      status: app.status,
      universityReference: app.universityReference,
      submittedAt: app.submittedAt,
      decision: app.decision,
      decisionReason: app.decisionReason,
      decisionAt: app.decisionAt,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
    })),
  });
});

/**
 * GET /v1/admin/applications/:id
 * Get a single application by ID
 * Isolation enforced: returns 403 if application.universityId !== req.admin.universityId
 */
export const getApplicationById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const universityId = req.admin!.universityId;

  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      student: {
        include: {
          subjectResults: true,
          documents: true,
        },
      },
    },
  });

  if (!application) {
    throw new NotFoundError('Application not found', 'APPLICATION_NOT_FOUND');
  }

  // Isolation check: admin can only view applications to their university
  if (application.universityId !== universityId) {
    logger.warn(
      { adminId: req.admin!.adminId, universityId, applicationId: id, applicationUniversity: application.universityId },
      'Admin attempted to access another university\'s application'
    );
    throw new ForbiddenError(
      'You do not have permission to view this application',
      'UNIVERSITY_MISMATCH'
    );
  }

  logger.info(
    { adminId: req.admin!.adminId, universityId, applicationId: id },
    'Admin viewed application detail'
  );

  res.json({
    application: {
      id: application.id,
      studentId: application.studentId,
      student: {
        id: application.student.id,
        firstName: application.student.firstName,
        lastName: application.student.lastName,
        email: application.student.email,
        phone: application.student.phone,
        idNumber: application.student.idNumber,
        dateOfBirth: application.student.dateOfBirth,
        gender: application.student.gender,
        race: application.student.race,
        nationality: application.student.nationality,
        homeLanguage: application.student.homeLanguage,
        address: application.student.address,
        matricYear: application.student.matricYear,
        school: application.student.school,
        subjectResults: application.student.subjectResults,
        documents: application.student.documents.map(doc => ({
          id: doc.id,
          type: doc.type,
          fileName: doc.fileName,
          storageKey: doc.storageKey,
          uploadedAt: doc.uploadedAt,
        })),
      },
      universityId: application.universityId,
      universityName: application.universityName,
      programmeId: application.programmeId,
      programmeName: application.programmeName,
      facultyName: application.facultyName,
      status: application.status,
      universityReference: application.universityReference,
      submittedAt: application.submittedAt,
      decision: application.decision,
      decisionReason: application.decisionReason,
      decisionAt: application.decisionAt,
      decidedBy: application.decidedBy,
      notes: application.notes,
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
    },
  });
});

/**
 * PATCH /v1/admin/applications/:id/decision
 * Accept or Decline an application
 * Isolation enforced: 403 if application.universityId !== req.admin.universityId
 * Notifies student in-app (via status update) AND by email
 */
export const updateApplicationDecision = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const input = req.body as ApplicationDecisionInput;
  const universityId = req.admin!.universityId;
  const adminId = req.admin!.adminId;

  // Fetch application
  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      student: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  if (!application) {
    throw new NotFoundError('Application not found', 'APPLICATION_NOT_FOUND');
  }

  // Isolation check
  if (application.universityId !== universityId) {
    logger.warn(
      { adminId, universityId, applicationId: id, applicationUniversity: application.universityId },
      'Admin attempted to decide on another university\'s application'
    );
    throw new ForbiddenError(
      'You do not have permission to decide on this application',
      'UNIVERSITY_MISMATCH'
    );
  }

  // Validate: no duplicate decisions (check this first - more specific error)
  if (application.decision) {
    throw new BadRequestError(
      'This application has already been decided',
      'ALREADY_DECIDED'
    );
  }

  // Validate application status (can only decide on submitted applications)
  if (application.status !== 'submitted') {
    throw new BadRequestError(
      `Cannot decide on application with status: ${application.status}`,
      'INVALID_STATUS'
    );
  }

  const now = new Date();
  const oldStatus = application.status;
  const newStatus = input.decision; // 'accepted' or 'rejected'

  // Update application with decision
  const updatedApplication = await prisma.application.update({
    where: { id },
    data: {
      decision: input.decision,
      decisionReason: input.reason,
      decisionAt: now,
      decidedBy: adminId,
      status: newStatus,
    },
  });

  // Log the decision as an application event
  await prisma.applicationEvent.create({
    data: {
      applicationId: id,
      eventType: 'decision',
      fromStatus: oldStatus,
      toStatus: newStatus,
      data: {
        decision: input.decision,
        reason: input.reason,
        decidedBy: adminId,
        universityId,
      },
    },
  });

  // Send decision email to student (respects EMAIL_MODE: dev=log, production=send)
  await sendDecisionEmail({
    studentEmail: application.student.email,
    studentName: `${application.student.firstName} ${application.student.lastName}`,
    universityName: application.universityName,
    programmeName: application.programmeName,
    decision: input.decision,
    reason: input.reason,
  });

  logger.info(
    {
      adminId,
      universityId,
      applicationId: id,
      decision: input.decision,
      studentId: application.studentId,
    },
    'Admin recorded decision'
  );

  res.json({
    message: 'Decision recorded successfully',
    application: {
      id: updatedApplication.id,
      status: updatedApplication.status,
      decision: updatedApplication.decision,
      decisionReason: updatedApplication.decisionReason,
      decisionAt: updatedApplication.decisionAt,
    },
  });
});

/**
 * GET /v1/admin/documents/:id
 * Download a student document (ID, matric certificate)
 * Isolation enforced: Admin can only download documents for students who have
 * applied to their university
 */
export const downloadDocument = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const universityId = req.admin!.universityId;
  const adminId = req.admin!.adminId;

  // Fetch document with student relation
  const document = await prisma.document.findUnique({
    where: { id },
    include: {
      student: {
        include: {
          applications: {
            select: {
              universityId: true,
            },
          },
        },
      },
    },
  });

  if (!document) {
    throw new NotFoundError('Document not found', 'DOCUMENT_NOT_FOUND');
  }

  // Isolation check: Admin can only download documents for students who have
  // applied to their university
  const hasApplicationToThisUniversity = document.student.applications.some(
    (app) => app.universityId === universityId
  );

  if (!hasApplicationToThisUniversity) {
    logger.warn(
      {
        adminId,
        universityId,
        documentId: id,
        studentId: document.studentId,
      },
      'Admin attempted to access document for student with no application to their university'
    );
    throw new ForbiddenError(
      'You do not have permission to access this document',
      'UNIVERSITY_MISMATCH'
    );
  }

  // Check file exists on disk
  const filePath = path.join(UPLOAD_DIR, document.storageKey);

  if (!fs.existsSync(filePath)) {
    throw new NotFoundError('File not found on server', 'FILE_NOT_FOUND');
  }

  logger.info(
    {
      adminId,
      universityId,
      documentId: id,
      documentType: document.type,
      studentId: document.studentId,
    },
    'Admin downloaded student document'
  );

  // Serve the file
  res.download(filePath, document.fileName);
});
