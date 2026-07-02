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

  // Detect Home Language vs First Additional Language (CRITICAL - order matters)
  const isHomeLanguage = normalized.includes('home language') || normalized.includes(' hl');
  const isFirstAdditional = normalized.includes('first additional') || normalized.includes(' fal');
  const isSecondAdditional = normalized.includes('second additional') || normalized.includes(' sal');

  // Languages - must distinguish HL vs FAL
  if (normalized.includes('english')) {
    if (isHomeLanguage) return 'english_home';
    if (isFirstAdditional || isSecondAdditional) return 'english_fal';
    // If ambiguous, default to FAL (most common in matric results)
    return 'english_fal';
  }
  if (normalized.includes('afrikaans')) {
    if (isHomeLanguage) return 'afrikaans_home';
    if (isFirstAdditional || isSecondAdditional) return 'afrikaans_fal';
    return 'afrikaans_fal';
  }
  if (normalized.includes('zulu') || normalized.includes('isizulu')) {
    if (isHomeLanguage) return 'zulu_home';
    if (isFirstAdditional || isSecondAdditional) return 'zulu_fal';
    return 'zulu_home'; // Most isiZulu speakers take it as HL
  }
  if (normalized.includes('xhosa') || normalized.includes('isixhosa')) {
    if (isHomeLanguage) return 'xhosa_home';
    if (isFirstAdditional || isSecondAdditional) return 'xhosa_fal';
    return 'xhosa_home';
  }
  if (normalized.includes('sotho') || normalized.includes('sesotho')) {
    return 'sotho_home'; // Typically HL
  }
  if (normalized.includes('tswana') || normalized.includes('setswana')) {
    return 'tswana_home';
  }
  if (normalized.includes('pedi') || normalized.includes('sepedi')) {
    return 'pedi_home';
  }
  if (normalized.includes('venda') || normalized.includes('tshivenda')) {
    return 'venda_home';
  }
  if (normalized.includes('tsonga') || normalized.includes('xitsonga')) {
    return 'tsonga_home';
  }
  if (normalized.includes('swati') || normalized.includes('siswati')) {
    return 'swati_home';
  }
  if (normalized.includes('ndebele') || normalized.includes('isindebele')) {
    return 'ndebele_home';
  }

  // Mathematics variants (order matters - check specific before general)
  if (normalized.includes('math lit')) return 'mathematical_literacy';
  if (normalized.includes('technical math')) return 'technical_mathematics';
  if (normalized.includes('mathematics')) return 'mathematics';

  // Core subjects
  if (normalized.includes('life orientation')) return 'life_orientation';

  // Sciences
  if (normalized.includes('physical sciences')) return 'physical_sciences';
  if (normalized.includes('life sciences')) return 'life_sciences';
  if (normalized.includes('agricultural')) return 'agricultural_sciences';

  // Business & Economics
  if (normalized.includes('accounting')) return 'accounting';
  if (normalized.includes('business')) return 'business_studies';
  if (normalized.includes('economics')) return 'economics';

  // Humanities
  if (normalized.includes('geography')) return 'geography';
  if (normalized.includes('history')) return 'history';
  if (normalized.includes('religion')) return 'religion_studies';

  // Technical
  if (normalized.includes('information technology') || normalized.includes('it ')) return 'information_technology';
  if (normalized.includes('computer applications') || normalized.includes('cat ')) return 'computer_applications_technology';
  if (normalized.includes('engineering graphics')) return 'engineering_graphics_design';
  if (normalized.includes('electrical')) return 'electrical_technology';
  if (normalized.includes('mechanical')) return 'mechanical_technology';
  if (normalized.includes('civil tech')) return 'civil_technology';

  // Arts
  if (normalized.includes('visual')) return 'visual_arts';
  if (normalized.includes('music')) return 'music';
  if (normalized.includes('dramatic') || normalized.includes('dance')) return 'dramatic_arts';

  // Other
  if (normalized.includes('tourism')) return 'tourism';
  if (normalized.includes('consumer')) return 'consumer_studies';
  if (normalized.includes('hospitality')) return 'hospitality_studies';

  // Return as-is if no mapping (lowercase with underscores)
  return normalized.replace(/\s+/g, '_');
}
