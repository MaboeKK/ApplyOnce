// packages/api/src/schemas/application.ts
// Zod validation schemas for application routes

import { z } from 'zod';

export const createApplicationSchema = z.object({
  universityId: z.string().min(1, 'University ID is required'),
  universityName: z.string().min(1, 'University name is required'),
  programmeId: z.string().min(1, 'Programme ID is required'),
  programmeName: z.string().min(1, 'Programme name is required'),
  facultyName: z.string().min(1, 'Faculty name is required'),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
