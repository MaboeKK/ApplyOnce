// packages/portal/src/types/index.ts
// Local DTO shapes matching the actual API JSON responses consumed by the
// student portal (as opposed to the more aspirational domain types in
// @applyonce/shared, which don't map 1:1 onto every endpoint's payload).

import type { Address, Guardian, SubjectResult, ChoiceStrategy } from '@applyonce/shared';

export type { SubjectResult };

export interface PortalDocument {
  id: string;
  type: string;
  fileName: string;
  uploadedAt: string;
  sizeBytes: number;
}

export interface StudentProfile {
  id: string;
  email: string;
  phone: string | null;
  idNumber: string | null;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  gender: string | null;
  race: string | null;
  nationality: string | null;
  homeLanguage: string | null;
  disability: string | null;
  address: Address | null;
  guardian: Guardian | null;
  matricYear: number | null;
  school: string | null;
  emailVerified: boolean;
  aps?: number;
  subjectResults: SubjectResult[];
  documents: PortalDocument[];
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus = 'draft' | 'submitted' | 'submission_failed' | 'accepted' | 'rejected' | 'waitlisted';

export interface ApplicationEvent {
  id: string;
  eventType: string;
  fromStatus: string | null;
  toStatus: string | null;
  data: unknown;
  createdAt: string;
}

export interface PortalApplication {
  id: string;
  universityId: string;
  universityName: string;
  programmeId: string;
  programmeName: string;
  facultyName: string;
  status: ApplicationStatus;
  universityReference: string | null;
  submittedAt: string | null;
  decision: 'accepted' | 'rejected' | 'waitlisted' | null;
  decisionReason: string | null;
  decisionAt: string | null;
  universityResponse?: unknown;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  events?: ApplicationEvent[];
}

export interface PaymentBreakdownItem {
  applicationId: string;
  universityId: string;
  universityName: string;
  programmeName: string;
  applicationFeeZAR: number;
  serviceFeeZAR: number;
  totalZAR: number;
}

export interface PortalPayment {
  id: string;
  paymentUrl?: string;
  totalAmountZAR: number;
  universityFeesZAR: number;
  serviceFeesZAR: number;
  status?: string;
  gateway?: string;
  gatewayReference?: string | null;
  breakdown: PaymentBreakdownItem[];
  applications?: Array<{ id: string; universityName: string; programmeName: string; status: string }>;
  paidAt?: string;
  createdAt?: string;
}

// GET /v1/aps/matches — one row per (university, programme) pairing
export interface ProgrammeMatch {
  outcome: 'qualifies' | 'waitlist' | 'below_minimum' | 'requirements_not_available';
  universityId: string;
  universityName: string;
  universityShortName: string;
  universityAPS: number;
  programmeCode: string;
  programmeName: string;
  programmeType: string;
  programmeDuration: number;
  programmeFaculty: string;
  programmeCampus?: string;
  requiredAPS: number;
  studentAPS: number;
  apsGap: number;
  meetsRequirements: boolean;
  missingRequirements?: string[];
  choiceStrategy: ChoiceStrategy;
  waitlistInfo?: unknown;
  additionalRequirements?: string[];
  closingDate?: string;
  careers?: string[];
  note?: string;
}
