// src/utils/subject-mapping.ts
// Subject name normalization for consistent NSCSubject handling

/**
 * Normalize subject name to match our NSCSubject types
 *
 * Used across:
 * - OCR result processing (matric certificate parsing)
 * - APS calculation
 * - Subject result storage
 * - Programme requirement matching
 */
export function normalizeSubjectName(raw: string): string {
  const normalized = raw.toLowerCase().trim();

  // Common mappings
  if (normalized.includes('math lit')) return 'mathematical_literacy';
  if (normalized.includes('mathematics')) return 'mathematics';
  if (normalized.includes('life orientation')) return 'life_orientation';
  if (normalized.includes('physical sciences')) return 'physical_sciences';
  if (normalized.includes('life sciences')) return 'life_sciences';
  if (normalized.includes('afrikaans')) return 'afrikaans_fal'; // Default to FAL
  if (normalized.includes('english')) return 'english_fal'; // Default to FAL
  if (normalized.includes('accounting')) return 'accounting';
  if (normalized.includes('geography')) return 'geography';
  if (normalized.includes('history')) return 'history';
  if (normalized.includes('business')) return 'business_studies';
  if (normalized.includes('economics')) return 'economics';
  if (normalized.includes('consumer')) return 'consumer_studies';
  if (normalized.includes('dance')) return 'dramatic_arts'; // Close enough
  if (normalized.includes('music')) return 'music';
  if (normalized.includes('visual')) return 'visual_arts';
  if (normalized.includes('dramatic')) return 'dramatic_arts';
  if (normalized.includes('information')) return 'information_technology';
  if (normalized.includes('tourism')) return 'tourism';

  // Return as-is if no mapping
  return normalized.replace(/\s+/g, '_');
}
