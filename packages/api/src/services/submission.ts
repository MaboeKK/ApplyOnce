// packages/api/src/services/submission.ts
// Application submission engine - runs after payment confirms
// Calls MockUniversityAdapter for each application

import {
  getAdapter,
  ApplicationPayload,
  calculateAPS,
  getUniversityById,
  SubjectResult
} from '@applyonce/shared';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';

interface SubmissionInput {
  applicationId: string;
  studentId: string;
}

/**
 * Type-safe field validator that narrows nullable types to non-null
 * Throws if value is missing, returns non-null typed value otherwise
 */
function requireField<T>(value: T | null | undefined, label: string): T {
  if (value === null || value === undefined || value === '') {
    throw new Error(`Cannot submit application — missing ${label}`);
  }
  return value;
}

/**
 * Submit a single application to its university
 * Called after payment is confirmed
 */
export async function submitApplication(input: SubmissionInput): Promise<void> {
  const { applicationId } = input;

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

  // Validate required fields before building payload
  const student = application.student;

  // Check all required-but-nullable fields
  const missingFields: string[] = [];

  if (!student.idNumber) missingFields.push('ID number');
  if (!student.phone) missingFields.push('phone number');
  if (!student.dateOfBirth) missingFields.push('date of birth');
  if (!student.gender) missingFields.push('gender');
  if (!student.race) missingFields.push('race');
  if (!student.matricYear) missingFields.push('matric year');
  if (!student.school) missingFields.push('school');
  if (!student.address) missingFields.push('address');

  if (missingFields.length > 0) {
    const error = `Cannot submit application - student profile incomplete. Missing: ${missingFields.join(', ')}`;
    logger.error({ applicationId, studentId: student.id, missingFields }, error);
    throw new Error(error);
  }

  // Parse address from JSON
  const address = student.address as {
    street: string;
    suburb?: string;
    city: string;
    province: string;
    postalCode: string;
  };

  // Validate address has required fields
  if (!address.street || !address.city || !address.province || !address.postalCode) {
    const error = 'Cannot submit application - address is incomplete (missing street, city, province, or postal code)';
    logger.error({ applicationId, studentId: student.id, address }, error);
    throw new Error(error);
  }

  // Parse guardian from JSON if present (guardian is optional)
  let guardian: ApplicationPayload['guardian'] = undefined;
  if (student.guardian) {
    const guardianData = student.guardian as {
      firstName: string;
      lastName: string;
      relationship: string;
      phone: string;
      email?: string;
      annualIncome?: number;
    };

    // If guardian exists, validate it has required fields
    if (!guardianData.firstName || !guardianData.lastName || !guardianData.relationship || !guardianData.phone) {
      const error = 'Cannot submit application - guardian information is incomplete';
      logger.error({ applicationId, studentId: student.id, guardianData }, error);
      throw new Error(error);
    }

    guardian = {
      firstName: guardianData.firstName,
      lastName: guardianData.lastName,
      relationship: guardianData.relationship,
      phone: guardianData.phone,
      email: guardianData.email,
      annualIncome: guardianData.annualIncome,
    };
  }

  // Calculate APS for this university
  const university = getUniversityById(application.universityId);
  if (!university) {
    const error = `University ${application.universityId} not found in constants`;
    logger.error({ applicationId, universityId: application.universityId }, error);
    throw new Error(error);
  }

  // Map Prisma subject results to SubjectResult type
  // Note: Prisma stores subject as string, but we know it's one of the NSCSubject values
  const subjectResults: SubjectResult[] = student.subjectResults.map((s) => ({
    id: s.id,
    studentId: s.studentId,
    subject: s.subject as SubjectResult['subject'],
    mark: s.mark,
    level: s.level,
    year: s.year,
  }));

  const apsResult = calculateAPS(subjectResults, university);
  if (!apsResult.isValid) {
    const error = `Cannot submit application - APS calculation failed: ${apsResult.validationErrors.join(', ')}`;
    logger.error({ applicationId, studentId: student.id, apsErrors: apsResult.validationErrors }, error);
    throw new Error(error);
  }

  // Build the payload - requireField ensures type narrowing at point of use
  const payload: ApplicationPayload = {
    // Student identity (validated via requireField for type narrowing)
    idNumber: requireField(student.idNumber, 'ID number'),
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    phone: requireField(student.phone, 'phone number'),
    dateOfBirth: requireField(student.dateOfBirth, 'date of birth').toISOString().split('T')[0],
    gender: requireField(student.gender, 'gender'),
    race: requireField(student.race, 'race'),
    nationality: student.nationality ?? 'South African',
    homeLanguage: student.homeLanguage ?? 'English',
    disability: student.disability ?? undefined,

    // Address (validated above)
    address: {
      street: address.street,
      suburb: address.suburb,
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
    },

    // Guardian (optional, validated if present)
    guardian,

    // Academic (validated via requireField for type narrowing)
    matricYear: requireField(student.matricYear, 'matric year'),
    school: requireField(student.school, 'school'),
    subjects: subjectResults.map((s) => ({
      subject: s.subject,
      mark: s.mark,
    })),
    apsScore: apsResult.totalAPS,

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
        universityResponse: {
          success: result.success,
          message: result.message,
          universityReference: result.universityReference,
          submittedAt: result.submittedAt,
        },
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
