// packages/portal/src/utils/subject-labels.ts
// Human-readable labels for the normalized subject keys produced by
// @applyonce/shared's normalizeSubjectName() (e.g. "english_fal" -> "English First Additional Language").

const SUBJECT_LABELS: Record<string, string> = {
  english_home: 'English Home Language',
  english_fal: 'English First Additional Language',
  afrikaans_home: 'Afrikaans Home Language',
  afrikaans_fal: 'Afrikaans First Additional Language',
  zulu_home: 'isiZulu Home Language',
  zulu_fal: 'isiZulu First Additional Language',
  xhosa_home: 'isiXhosa Home Language',
  xhosa_fal: 'isiXhosa First Additional Language',
  sotho_home: 'Sesotho Home Language',
  tswana_home: 'Setswana Home Language',
  pedi_home: 'Sepedi Home Language',
  venda_home: 'Tshivenda Home Language',
  tsonga_home: 'Xitsonga Home Language',
  swati_home: 'siSwati Home Language',
  ndebele_home: 'isiNdebele Home Language',
  mathematics: 'Mathematics',
  mathematical_literacy: 'Mathematical Literacy',
  technical_mathematics: 'Technical Mathematics',
  life_orientation: 'Life Orientation',
  physical_sciences: 'Physical Sciences',
  life_sciences: 'Life Sciences',
  agricultural_sciences: 'Agricultural Sciences',
  accounting: 'Accounting',
  business_studies: 'Business Studies',
  economics: 'Economics',
  geography: 'Geography',
  history: 'History',
  religion_studies: 'Religion Studies',
  information_technology: 'Information Technology',
  computer_applications_technology: 'Computer Applications Technology',
  engineering_graphics_design: 'Engineering Graphics and Design',
  electrical_technology: 'Electrical Technology',
  mechanical_technology: 'Mechanical Technology',
  civil_technology: 'Civil Technology',
  visual_arts: 'Visual Arts',
  music: 'Music',
  dramatic_arts: 'Dramatic Arts',
  tourism: 'Tourism',
  consumer_studies: 'Consumer Studies',
  hospitality_studies: 'Hospitality Studies',
};

/** Human-readable label for a normalized subject key. Falls back to a Title Case guess. */
export function subjectLabel(key: string): string {
  if (SUBJECT_LABELS[key]) return SUBJECT_LABELS[key];
  return key
    .split('_')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
