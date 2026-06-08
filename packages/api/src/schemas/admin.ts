// packages/api/src/schemas/admin.ts
// Admin request validation schemas

import { z } from 'zod';

export const applicationDecisionSchema = z.object({
  decision: z.enum(['accepted', 'rejected'], {
    errorMap: () => ({ message: 'Decision must be either "accepted" or "rejected"' }),
  }),
  reason: z.string().min(1, 'Reason is required for all decisions').max(500, 'Reason must be 500 characters or less'),
});

export type ApplicationDecisionInput = z.infer<typeof applicationDecisionSchema>;
