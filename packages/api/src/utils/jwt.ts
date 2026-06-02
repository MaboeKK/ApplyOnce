// packages/api/src/utils/jwt.ts
// JWT utilities

import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config';
import { StudentJWTPayload, UniversityAdminJWTPayload } from '../types/express';

export function generateAccessToken(
  payload: StudentJWTPayload | UniversityAdminJWTPayload
): string {
  return jwt.sign(
    payload as object,
    config.jwt.accessSecret,
    { expiresIn: config.jwt.accessExpires } as SignOptions
  );
}

export function generateRefreshToken(id: string): string {
  return jwt.sign(
    { id } as object,
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpires } as SignOptions
  );
}

export function verifyRefreshToken(token: string): { id: string } {
  return jwt.verify(token, config.jwt.refreshSecret) as { id: string };
}
