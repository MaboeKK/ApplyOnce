// packages/api/src/schemas/student.ts
// Validation schemas for student profile operations

import { z } from 'zod';

// SA provinces
const saProvinces = [
  'gauteng',
  'western_cape',
  'kwazulu_natal',
  'eastern_cape',
  'limpopo',
  'mpumalanga',
  'north_west',
  'free_state',
  'northern_cape',
] as const;

// Address schema
const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  suburb: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  province: z.enum(saProvinces),
  postalCode: z.string().regex(/^\d{4}$/, 'Postal code must be 4 digits'),
});

// Guardian schema
const emergencyContactSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().regex(/^\+27[6-8]\d{8}$/, 'Phone must be in format +27XXXXXXXXX').optional(),
  relationship: z.string().optional(),
});

const guardianSchema = z.object({
  firstName: z.string().min(1, 'Guardian first name is required'),
  lastName: z.string().min(1, 'Guardian last name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  otherRelationship: z.string().optional(),
  phone: z.string().regex(/^\+27[6-8]\d{8}$/, 'Phone must be in format +27XXXXXXXXX'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  annualIncome: z.number().int().min(0, 'Annual income cannot be negative').optional(),
  emergencyContactSameAsGuardian: z.boolean().optional(),
  emergencyContact: emergencyContactSchema.optional(),
});

// Update profile schema
// NOTE: When idNumber is provided, dateOfBirth and gender are auto-derived
// server-side and any client-submitted values are ignored (spoofing prevention)
export const updateStudentProfileSchema = z.object({
  idNumber: z.string().regex(/^\d{13}$/, 'SA ID number must be 13 digits').optional(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format').transform((str) => new Date(str)).optional(),
  gender: z.enum(['male', 'female', 'prefer_not_to_say']).optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().regex(/^\+27[6-8]\d{8}$/, 'Phone must be in format +27XXXXXXXXX').optional(),
  race: z.enum(['african', 'coloured', 'indian', 'white', 'other', 'prefer_not_to_say']).optional(),
  nationality: z.string().min(1).optional(),
  homeLanguage: z.string().min(1).optional(),
  disability: z.string().optional(),
  address: addressSchema.optional(),
  guardian: guardianSchema.optional(),
  matricYear: z.number().int().min(2000).max(new Date().getFullYear()).optional(),
  school: z.string().min(1).optional(),
});

// Subject result schema
export const subjectResultSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  mark: z.number().int().min(0).max(100, 'Mark must be between 0 and 100'),
  level: z.number().int().min(1).max(7).optional(),
  year: z.number().int().min(2000).max(new Date().getFullYear()),
});

// Update subjects schema
export const updateSubjectsSchema = z.object({
  results: z.array(subjectResultSchema).min(6, 'Minimum 6 subjects required').max(10),
});
