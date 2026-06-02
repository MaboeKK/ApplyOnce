// src/types/application.ts

export interface Application {
  id: string;
  studentId: string;
  universityId: string;
  programmeId: string;
  status: ApplicationStatus;
  referenceNumber?: string;    // From university once submitted
  submittedAt?: string;
  updatedAt: string;
  createdAt: string;
  paymentId?: string;
  notes?: string;
  universityResponse?: UniversityResponse;
}

export type ApplicationStatus =
  | 'draft'           // Student building application, not yet paid/submitted
  | 'pending_payment' // Waiting for payment to clear
  | 'submitted'       // Sent to university
  | 'received'        // University confirmed receipt
  | 'under_review'    // University is reviewing
  | 'accepted'        // Offer received
  | 'rejected'        // Not accepted
  | 'waitlisted'      // On waiting list
  | 'withdrawn'       // Student withdrew

export interface UniversityResponse {
  message?: string;
  offerExpiry?: string;
  conditions?: string[];   // Conditions attached to offer
  reportDate?: string;     // When to report if accepted
}

// src/types/payment.ts

export interface Payment {
  id: string;
  studentId: string;
  applicationIds: string[];         // One payment can cover multiple applications
  totalAmountZAR: number;           // University fees + service fees
  universityFeesZAR: number;        // Amount to pass through to universities
  serviceFeesZAR: number;           // ApplyOnce's cut
  status: PaymentStatus;
  gateway: 'payfast' | 'mock';
  gatewayReference?: string;        // PayFast payment ID
  gatewayPayload?: Record<string, unknown>;
  paidAt?: string;
  createdAt: string;
  breakdown: PaymentBreakdown[];
}

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'complete'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export interface PaymentBreakdown {
  universityId: string;
  universityName: string;
  applicationFeeZAR: number;   // University's fee
  serviceFeeZAR: number;       // ApplyOnce's R5 (or current rate)
  totalZAR: number;
}

export interface PaymentInitiateRequest {
  studentId: string;
  applicationIds: string[];
  returnUrl: string;          // Where to redirect after payment
  cancelUrl: string;
}

export interface PaymentInitiateResponse {
  paymentId: string;
  paymentUrl: string;         // Redirect student here
  totalAmountZAR: number;
  breakdown: PaymentBreakdown[];
}
