// packages/api/src/controllers/university.ts
// University data controller (read-only from constants)

import { Response, Request } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { UNIVERSITIES } from '@applyonce/shared';
import { NotFoundError } from '../utils/errors';

/**
 * GET /v1/universities
 * List all universities with their faculties and programmes
 */
export const listUniversities = asyncHandler(async (_req: Request, res: Response) => {
  res.json({
    universities: UNIVERSITIES,
    count: UNIVERSITIES.length,
  });
});

/**
 * GET /v1/universities/:id
 * Get single university details
 */
export const getUniversity = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const university = UNIVERSITIES.find((u) => u.id === id);

  if (!university) {
    throw new NotFoundError('University not found');
  }

  res.json({ university });
});
