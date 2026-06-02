// packages/api/src/schemas/auth.ts
// Zod schemas for auth endpoints

import { z } from 'zod';

// SA ID number: 13 digits (YYMMDD + gender + sequence + citizenship + checksum)
const saIdNumberRegex = /^\d{13}$/;

export const registerSchema = z.object({
  idNumber: z
    .string()
    .regex(saIdNumberRegex, 'SA ID number must be 13 digits'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

export const verifyEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  code: z.string().length(6, 'Verification code must be 6 digits'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
