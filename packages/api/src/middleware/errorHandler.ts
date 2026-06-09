// packages/api/src/middleware/errorHandler.ts
// Global error handler

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';
import { config } from '../config';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // AppError (known errors)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      code: err.code,
      details: err.details,
    });
  }

  // Unknown errors
  logger.error(err, 'Unhandled error');

  // Don't leak error details in production
  const message =
    config.env === 'development'
      ? err.message
      : 'Internal server error';

  return res.status(500).json({
    message,
    code: 'INTERNAL_ERROR',
  });
}
