// packages/api/src/schemas/payment.ts
// Zod validation schemas for payment routes

import { z } from 'zod';

export const initiatePaymentSchema = z.object({
  applicationIds: z.array(z.string()).min(1, 'At least one application is required'),
  returnUrl: z.string().url('Valid return URL is required'),
  cancelUrl: z.string().url('Valid cancel URL is required'),
});

export const paymentNotificationSchema = z.object({
  paymentId: z.string().min(1, 'Payment ID is required'),
  status: z.enum(['COMPLETE', 'FAILED', 'CANCELLED']),
  gatewayReference: z.string().optional(),
});

export type InitiatePaymentInput = z.infer<typeof initiatePaymentSchema>;
export type PaymentNotificationInput = z.infer<typeof paymentNotificationSchema>;
