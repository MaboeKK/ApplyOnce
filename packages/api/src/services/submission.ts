// packages/api/src/services/submission.ts
// Application submission engine - runs after payment confirms
// Calls MockUniversityAdapter for each application

import { getAdapter, ApplicationPayload } from '@applyonce/shared';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';

interface SubmissionInput {
  applicationId: string;
  studentId: string;
}

/**
 * Submit a single application to its university
 * Called after payment is confirmed
 */
export async function submitApplication(input: SubmissionInput): Promise<void> {
  const { applicationId, studentId } = input;

  // Fetch the application with all related data
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      student: {
        include: {
          subjectResults: true,
          documents: true,
        },
      },
      university: true,
    },
  });

  if (!application) {
    logger.error({ applicationId }, 'Application not found for submission');
    throw new Error(`Application ${applicationId} not found`);
  }

  if (application.status !== 'draft') {
    logger.warn({ applicationId, status: application.status }, 'Application already submitted');
    return;
  }

  // Get the university adapter
  const adapter = getAdapter(application.universityId);
  if (!adapter) {
    logger.error({ universityId: application.universityId }, 'No adapter found for university');
    throw new Error(`No adapter found for university ${application.universityId}`);
  }

  // Build the payload
  const student = application.student;
  const payload: ApplicationPayload = {
    // Student identity
    idNumber: student.idNumber,
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    phone: student.phone,
    dateOfBirth: student.dateOfBirth.toISOString().split('T')[0],
    gender: student.gender,
    race: student.race,
    nationality: student.nationality ?? 'South African',
    homeLanguage: student.homeLanguage ?? 'English',
    disability: student.disability ?? undefined,

    // Address
    address: {
      street: student.addressStreet,
      suburb: student.addressSuburb ?? undefined,
      city: student.addressCity,
      province: student.addressProvince,
      postalCode: student.addressPostalCode,
    },

    // Guardian (optional)
    guardian: student.guardianFirstName
      ? {
          firstName: student.guardianFirstName,
          lastName: student.guardianLastName!,
          relationship: student.guardianRelationship!,
          phone: student.guardianPhone!,
          email: student.guardianEmail ?? undefined,
          annualIncome: student.guardianAnnualIncome ?? undefined,
        }
      : undefined,

    // Academic
    matricYear: student.matricYear,
    school: student.school,
    subjects: student.subjectResults.map((s) => ({
      subject: s.subject,
      mark: s.mark,
    })),
    apsScore: student.apsScore,

    // Application
    programmeId: application.programmeId,
    programmeName: application.programmeName,
    applyOnceReference: application.id,

    // Documents (storage keys)
    documents: {
      idDocument: student.documents.find((d) => d.type === 'id_document')?.storageKey,
      matricCertificate: student.documents.find((d) => d.type === 'matric_certificate')?.storageKey,
      proofOfResidence: student.documents.find((d) => d.type === 'proof_of_residence')?.storageKey,
    },
  };

  logger.info(
    { applicationId, universityId: application.universityId, programmeName: application.programmeName },
    'Submitting application to university adapter'
  );

  // Submit to university
  const result = await adapter.submitApplication(payload);

  if (result.success) {
    // Update application status to submitted
    await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: 'submitted',
        universityReference: result.universityReference,
        submittedAt: new Date(result.submittedAt),
        universityResponse: result as any,
      },
    });

    // Log event
    await prisma.applicationEvent.create({
      data: {
        applicationId,
        eventType: 'submitted',
        fromStatus: 'draft',
        toStatus: 'submitted',
        data: {
          universityReference: result.universityReference,
          message: result.message,
        },
      },
    });

    logger.info(
      { applicationId, universityReference: result.universityReference },
      'Application submitted successfully'
    );
  } else {
    // Submission failed - log but don't throw
    logger.error(
      { applicationId, errors: result.errors, message: result.message },
      'Application submission failed'
    );

    await prisma.applicationEvent.create({
      data: {
        applicationId,
        eventType: 'submission_failed',
        data: {
          errors: result.errors,
          message: result.message,
        },
      },
    });

    // Application stays in draft state so user can retry
  }
}

/**
 * Submit multiple applications (e.g., after payment)
 * Runs submissions in parallel
 */
export async function submitMultipleApplications(
  applicationIds: string[],
  studentId: string
): Promise<{ succeeded: string[]; failed: string[] }> {
  const succeeded: string[] = [];
  const failed: string[] = [];

  const results = await Promise.allSettled(
    applicationIds.map((applicationId) => submitApplication({ applicationId, studentId }))
  );

  results.forEach((result, index) => {
    const applicationId = applicationIds[index];
    if (result.status === 'fulfilled') {
      succeeded.push(applicationId);
    } else {
      failed.push(applicationId);
      logger.error({ applicationId, error: result.reason }, 'Application submission failed');
    }
  });

  return { succeeded, failed };
}
