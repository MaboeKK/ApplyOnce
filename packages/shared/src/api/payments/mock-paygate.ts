// src/api/payments/mock-paygate.ts
// Simulates the PayGate payment gateway for development.
// In production, replace with real PayGate SDK calls.
// PayGate docs: https://developers.paygate.co.za

import { Payment, PaymentStatus, PaymentInitiateRequest, PaymentInitiateResponse, PaymentBreakdown } from '../../types/application';
import { getUniversityById, SERVICE_FEE_ZAR } from '../../constants/universities';

// Mock store — in production this lives in the database
const payments = new Map<string, Payment>();

function generateId(): string {
  return `pay_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function generateGatewayRef(): string {
  return `PF${Date.now()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

// ─── PAYMENT INITIATION ──────────────────────────────────────────────────────

export async function initiatePayment(
  request: PaymentInitiateRequest,
  universityApplicationFees: Record<string, number> // universityId → fee
): Promise<PaymentInitiateResponse> {
  const breakdown: PaymentBreakdown[] = [];

  for (const appId of request.applicationIds) {
    // In real code, look up the university from the application record
    // For mock, we derive it from the passed fee map
    const universityId = appId.split('_')[1]; // e.g. 'app_uct_123' → 'uct'
    const university = getUniversityById(universityId);
    const applicationFee = universityApplicationFees[universityId] ?? (university?.applicationFee ?? 100);

    breakdown.push({
      universityId: universityId,
      universityName: university?.name ?? universityId,
      applicationFeeZAR: applicationFee,
      serviceFeeZAR: SERVICE_FEE_ZAR,
      totalZAR: applicationFee + SERVICE_FEE_ZAR,
    });
  }

  const totalAmount = breakdown.reduce((sum, b) => sum + b.totalZAR, 0);
  const universityFees = breakdown.reduce((sum, b) => sum + b.applicationFeeZAR, 0);
  const serviceFees = breakdown.reduce((sum, b) => sum + b.serviceFeeZAR, 0);

  const paymentId = generateId();
  const payment: Payment = {
    id: paymentId,
    studentId: request.studentId,
    applicationIds: request.applicationIds,
    totalAmountZAR: totalAmount,
    universityFeesZAR: universityFees,
    serviceFeesZAR: serviceFees,
    status: 'pending',
    gateway: 'mock',
    createdAt: new Date().toISOString(),
    breakdown,
  };

  payments.set(paymentId, payment);

  // Mock: construct a fake PayGate URL
  // In production this would be a real PayGate checkout URL with a signed payload
  const mockPaymentUrl = `https://sandbox.paygate.co.za/eng/process?payment_id=${paymentId}&amount=${totalAmount}&return_url=${encodeURIComponent(request.returnUrl)}&cancel_url=${encodeURIComponent(request.cancelUrl)}`;

  return {
    paymentId,
    paymentUrl: mockPaymentUrl,
    totalAmountZAR: totalAmount,
    breakdown,
  };
}

// ─── PAYMENT NOTIFICATION (ITN) ─────────────────────────────────────────────
// In production: PayGate POSTs to your /api/payments/notify endpoint.
// This mock simulates that webhook call.

export async function handlePaymentNotification(
  paymentId: string,
  status: 'COMPLETE' | 'FAILED' | 'CANCELLED'
): Promise<{ updated: boolean; payment?: Payment }> {
  const payment = payments.get(paymentId);
  if (!payment) return { updated: false };

  const statusMap: Record<string, PaymentStatus> = {
    COMPLETE: 'complete',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  };

  payment.status = statusMap[status];
  payment.gatewayReference = generateGatewayRef();
  if (status === 'COMPLETE') {
    payment.paidAt = new Date().toISOString();
  }

  payments.set(paymentId, payment);
  return { updated: true, payment };
}

// ─── MOCK PAYMENT COMPLETION ────────────────────────────────────────────────
// Simulate a student completing payment. Used in dev/testing only.

export async function simulatePaymentComplete(paymentId: string): Promise<Payment | null> {
  const result = await handlePaymentNotification(paymentId, 'COMPLETE');
  return result.payment ?? null;
}

// ─── PAYMENT RETRIEVAL ───────────────────────────────────────────────────────

export function getPayment(paymentId: string): Payment | undefined {
  return payments.get(paymentId);
}

export function getPaymentsByStudent(studentId: string): Payment[] {
  return Array.from(payments.values()).filter(p => p.studentId === studentId);
}

// ─── REAL PAYGATE SIGNATURE (for when you go live) ──────────────────────────
// TODO: Implement when real PayGate merchant account is obtained.
// Real implementation:
// 1. Build param string from sorted key=value pairs (excluding signature)
// 2. MD5 hash the string + merchant passphrase
// 3. Append as `signature` parameter
// 4. POST to https://www.paygate.co.za/eng/process

export function buildPayGateSignature(
  _params: Record<string, string>,
  _passphrase: string
): string {
  // Placeholder — implement before going live
  throw new Error('Real PayGate signature not implemented — use mock gateway in development');
}
