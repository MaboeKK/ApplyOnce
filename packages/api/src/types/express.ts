// packages/api/src/types/express.ts
// Express type extensions for JWT auth

import { Request } from 'express';

export interface StudentJWTPayload {
  role: 'student';
  studentId: string;
  email: string;
}

export interface UniversityAdminJWTPayload {
  role: 'university_admin';
  adminId: string;
  universityId: string;
  email: string;
}

export type JWTPayload = StudentJWTPayload | UniversityAdminJWTPayload;

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
  student?: StudentJWTPayload;
  admin?: UniversityAdminJWTPayload;
}

// Alias for consistency with controller code
export type AuthRequest = AuthenticatedRequest;
