// packages/api/src/schemas/document.ts
// Validation schemas for document operations

import { z } from 'zod';

export const documentTypes = ['matric_certificate', 'id_document', 'proof_of_residence'] as const;

export const uploadDocumentSchema = z.object({
  type: z.enum(documentTypes),
});
