// src/api/universities/mock-adapter.ts
// Simulates a university API response for development and testing.
// Every university starts as a mock until a real MOU and API integration is in place.
// Replace this with a real adapter once the university signs an MOU.

import {
  UniversityAdapter,
  ApplicationPayload,
  SubmissionResult,
  ApplicationStatus,
  ValidationResult,
} from './index';

// Simulated network delay (ms) — makes mock feel realistic
const MOCK_DELAY = (min = 300, max = 900) =>
  new Promise(r => setTimeout(r, Math.floor(Math.random() * (max - min)) + min));

// Reference number generator — mimics a university's format
function generateReference(universityId: string): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `${universityId.toUpperCase()}-${year}-${random}`;
}

// Mock status store — tracks submissions in memory for the session
const mockSubmissions = new Map<string, {
  reference: string;
  status: ApplicationStatus['status'];
  submittedAt: string;
}>();

export class MockUniversityAdapter implements UniversityAdapter {
  universityId: string;
  universityName: string;

  // Configurable failure rate for realistic testing (0 = never fail, 1 = always fail)
  private failureRate: number;

  constructor(universityId: string, universityName: string, failureRate = 0.05) {
    this.universityId = universityId;
    this.universityName = universityName;
    this.failureRate = failureRate;
  }

  validateApplication(payload: ApplicationPayload): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic required field validation
    if (!payload.idNumber || payload.idNumber.length !== 13) {
      errors.push('Valid 13-digit SA ID number is required');
    }
    if (!payload.firstName?.trim()) errors.push('First name is required');
    if (!payload.lastName?.trim()) errors.push('Last name is required');
    if (!payload.email?.includes('@')) errors.push('Valid email address is required');
    if (!payload.phone?.trim()) errors.push('Phone number is required');
    if (!payload.programmeId) errors.push('Programme selection is required');
    if (!payload.matricCertificate && !payload.documents?.matricCertificate) {
      warnings.push('Matric certificate not uploaded — most universities require this');
    }
    if (payload.subjects.length < 6) {
      errors.push(`Only ${payload.subjects.length} subjects provided. Minimum 6 required.`);
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  async submitApplication(payload: ApplicationPayload): Promise<SubmissionResult> {
    await MOCK_DELAY();

    // Validate first
    const validation = this.validateApplication(payload);
    if (!validation.valid) {
      return {
        success: false,
        message: 'Application failed validation',
        errors: validation.errors,
        submittedAt: new Date().toISOString(),
      };
    }

    // Simulate occasional failures (real APIs fail sometimes)
    if (Math.random() < this.failureRate) {
      return {
        success: false,
        message: `${this.universityName} system is temporarily unavailable. Please try again.`,
        submittedAt: new Date().toISOString(),
      };
    }

    const reference = generateReference(this.universityId);
    const submittedAt = new Date().toISOString();

    // Store for status checks
    mockSubmissions.set(reference, {
      reference,
      status: 'received',
      submittedAt,
    });

    // Simulate status progression (in real implementation this comes from webhooks)
    setTimeout(() => {
      const submission = mockSubmissions.get(reference);
      if (submission) submission.status = 'under_review';
    }, 5000);

    return {
      success: true,
      universityReference: reference,
      message: `Your application has been received by ${this.universityName}. Reference: ${reference}`,
      submittedAt,
    };
  }

  async checkStatus(universityReference: string): Promise<ApplicationStatus> {
    await MOCK_DELAY(100, 400);

    const submission = mockSubmissions.get(universityReference);

    if (!submission) {
      return {
        universityReference,
        status: 'unknown',
        message: 'Reference not found',
        updatedAt: new Date().toISOString(),
      };
    }

    return {
      universityReference,
      status: submission.status,
      message: `Application is ${submission.status.replace('_', ' ')}`,
      updatedAt: new Date().toISOString(),
    };
  }
}

// ─── FACTORY ────────────────────────────────────────────────────────────────
// Creates a mock adapter for every university that doesn't yet have a real one.
// Called at app startup to populate the registry.

import { UNIVERSITIES } from '../../constants/universities';
import { registerAdapter } from './index';

export function registerAllMockAdapters(): void {
  for (const university of UNIVERSITIES) {
    if (university.integrationStatus === 'mock') {
      registerAdapter(
        new MockUniversityAdapter(university.id, university.name)
      );
    }
  }
  console.log(`[University Registry] Registered ${UNIVERSITIES.length} mock adapters`);
}
