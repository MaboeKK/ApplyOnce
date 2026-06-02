// src/api/universities/index.ts
// Universal interface that every university integration must implement.
// This is the contract. Whether a university has a real API or a mock,
// the submission engine treats them identically.

export interface ApplicationPayload {
  // Student identity
  idNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  race: string;
  nationality: string;
  homeLanguage: string;
  disability?: string;

  // Address
  address: {
    street: string;
    suburb?: string;
    city: string;
    province: string;
    postalCode: string;
  };

  // Guardian
  guardian?: {
    firstName: string;
    lastName: string;
    relationship: string;
    phone: string;
    email?: string;
    annualIncome?: number;
  };

  // Academic
  matricYear: number;
  school: string;
  subjects: Array<{
    subject: string;
    mark: number;
  }>;
  apsScore: number;

  // Application
  programmeId: string;
  programmeName: string;
  applyOnceReference: string;     // Our internal reference

  // Documents (base64 or storage URLs)
  documents: {
    idDocument?: string;
    matricCertificate?: string;
    proofOfResidence?: string;
    [key: string]: string | undefined;
  };
}

export interface SubmissionResult {
  success: boolean;
  universityReference?: string;   // Their reference number if successful
  message: string;
  errors?: string[];
  submittedAt: string;
}

export interface ApplicationStatus {
  universityReference: string;
  status: 'received' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted' | 'unknown';
  message?: string;
  updatedAt: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// Every university adapter must implement this interface
export interface UniversityAdapter {
  universityId: string;
  universityName: string;

  /** Validate application data against this university's specific rules */
  validateApplication(payload: ApplicationPayload): ValidationResult;

  /** Submit an application to this university */
  submitApplication(payload: ApplicationPayload): Promise<SubmissionResult>;

  /** Check the status of a previously submitted application */
  checkStatus(universityReference: string): Promise<ApplicationStatus>;
}

// Registry of all available adapters
const registry = new Map<string, UniversityAdapter>();

export function registerAdapter(adapter: UniversityAdapter): void {
  registry.set(adapter.universityId, adapter);
}

export function getAdapter(universityId: string): UniversityAdapter | undefined {
  return registry.get(universityId);
}

export function getAllAdapters(): UniversityAdapter[] {
  return Array.from(registry.values());
}
