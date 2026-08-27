// packages/api/src/schemas/aps.ts
// Validation schemas for APS calculation

import { z } from 'zod';
import { subjectResultSchema } from './student';

export const calculateAPSSchema = z.object({
  results: z.array(subjectResultSchema).min(6, 'Minimum 6 subject results required'),
  universityId: z.string().min(1, 'universityId is required'),
});

export type CalculateAPSInput = z.infer<typeof calculateAPSSchema>;
