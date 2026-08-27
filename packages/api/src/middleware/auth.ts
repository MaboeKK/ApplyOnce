// packages/api/src/middleware/auth.ts
// JWT authentication middleware (reads from httpOnly cookie)

import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import { AuthenticatedRequest, JWTPayload } from '../types/express';

// jwt.verify only checks the signature — it says nothing about the shape of
// the payload that was signed. Without this, a token signed by some other
// path (or an older token format) would be trusted as JWTPayload with no
// check at all.
function isJWTPayload(value: unknown): value is JWTPayload {
  if (typeof value !== 'object' || value === null) return false;
  const payload = value as Record<string, unknown>;

  if (payload.role === 'student') {
    return typeof payload.studentId === 'string' && typeof payload.email === 'string';
  }
  if (payload.role === 'university_admin') {
    return (
      typeof payload.adminId === 'string' &&
      typeof payload.universityId === 'string' &&
      typeof payload.email === 'string'
    );
  }
  return false;
}

export function requireAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new UnauthorizedError('Authentication required', 'NO_TOKEN');
    }

    const decoded = jwt.verify(token, config.jwt.accessSecret);
    if (!isJWTPayload(decoded)) {
      throw new UnauthorizedError('Invalid token', 'INVALID_TOKEN');
    }
    const payload = decoded;

    req.user = payload;

    // Convenience properties
    if (payload.role === 'student') {
      req.student = payload;
    } else if (payload.role === 'university_admin') {
      req.admin = payload;
    }

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new UnauthorizedError('Token expired', 'TOKEN_EXPIRED'));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError('Invalid token', 'INVALID_TOKEN'));
    } else {
      next(error);
    }
  }
}

export function requireStudent(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  // First authenticate
  requireAuth(req, res, (err) => {
    if (err) return next(err);

    // Then check role
    if (req.user?.role !== 'student') {
      return next(new ForbiddenError('Student access only', 'ROLE_FORBIDDEN'));
    }

    next();
  });
}

export function requireUniversityAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  // First authenticate
  requireAuth(req, res, (err) => {
    if (err) return next(err);

    // Then check role
    if (req.user?.role !== 'university_admin') {
      return next(new ForbiddenError('University admin access only', 'ROLE_FORBIDDEN'));
    }

    next();
  });
}
