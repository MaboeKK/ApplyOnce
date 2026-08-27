// packages/shared/src/constants/universities/ufs.ts
import { University, Programme } from '../../types/university';

// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSITY OF THE FREE STATE (UFS) — full reference implementation
// ═══════════════════════════════════════════════════════════════════════════
// UFS uses a FOURTH distinct APS model: an 8-point NSC-to-AP conversion table
// (Level 7 splits into AP 7 for 80-89% and AP 8 for 90-100%), plus a single
// bonus point for Life Orientation at Level 5+ (60%+). Six best academic
// subjects are converted via this table and summed, then the LO bonus point
// is added — max AP = 6x8 + 1 = 49.
// KNOWN LIMITATION: the achievement-Level-7-to-AP-7-vs-8 split depends on the
// exact percentage within that band, which this platform does not always
// capture per subject (only the achievement level, 1-7) — so a student whose
// results are all recorded as levels only (no raw %) cannot have their exact
// UFS AP computed for Level-7 subjects; this is a data-precision gap in the
// matching engine, not a schema gap. Individual PROGRAMME subject gates
// (e.g. "Mathematics Level 5") are unaffected — only the overall AP total is.
// UFS publishes real official "PROGRAMME ACADEMIC PLAN CODE" values, used
// directly as qualificationCode below (not synthesized).
// Source: docs/prospectuses/ufs/ (UFS 2027 Undergraduate Prospectus).

// UFS (University of the Free State) — Programme[] data extracted from the
// UFS Undergraduate Prospectus 2027.
// NOT standalone-compileable — import paths to be fixed when spliced into
// packages/shared/src/constants/universities.ts
//
// GLOBAL NOTES (apply across all arrays below):
// - `durationYears` is NOT tabulated anywhere in the source prospectus (no
//   "Duration" column exists in any programme table). Values below use
//   standard SA qualification lengths (BCom/BAdmin/BSc/BA/BSocSci = 3,
//   BEd = 4 [explicit in source], LLB = 4 [explicit in source], MBChB = 6,
//   health-professional bachelor's = 4, BSocWork = 4, BArch = 4,
//   HCert = 1, AdvDip = 1, Diploma = 3) and are INFERRED, not sourced.
// - UFS's own AP (Admission Point) column value is used directly as
//   `apsMinimum.default` for every programme (the AP scale already accounts
//   for the 6-subjects + LO-bonus rule university-wide; no separate
//   with-Maths/with-MathsLit split is used by UFS the way UJ does, except
//   where a programme explicitly states alternative Maths/Maths Lit gates,
//   which are modelled as `alternative` subjectRequirements with altGroup
//   'maths').
// - `minRating` is used for every subject gate (achievement level 1-7),
//   per project convention; the parenthetical percentage printed in the
//   source (e.g. "4 (50%)") is the standard NSC-level percentage band and is
//   NOT separately stored in minPercentage.
// - Columns marked "N/A" in the source tables are omitted entirely (no
//   subjectRequirement entry), matching project convention of only listing
//   applicable gates.
// - No SubjectKey exists for Sesotho Home Language, Business Studies,
//   Economics, or Engineering Graphics & Design. Where the source gates on
//   these, the generic 'homeLanguage' key (for Sesotho HL) is used with a
//   clarifying `note`, or the requirement is captured only in prose via
//   `note` (Business Studies / Economics / Engineering Graphics & Design).
// - Closing dates: confirmed via explicit inline statements in the source
//   (not just the summary table on p.51) as follows — School of Clinical
//   Medicine/Pathology/Biomedical Sciences (MBChB, BMedSc Radiation
//   Science) and School of Health & Rehabilitation Sciences (BOptom, BSc
//   Physiotherapy, BSc Dietetics, BOccTher, BBiok, BSportCoach) = 31 May
//   2026; Bachelor of Nursing, Bachelor of Social Work, Bachelor of
//   Architecture = 31 July 2026. All other named programmes in the
//   "later group" (Community Development-QC, Construction Economics and
//   Management FT, Construction Management Compact, Drama and Theatre
//   Arts, Fine Arts, Forensic Sciences, Music [all forms], Physics with
//   Engineering Subjects, Quantity Surveying Compact) have explicit inline
//   statements elsewhere in the source confirming 30 September 2026 (the
//   university default) for 7 of the 9 — Drama, Fine Arts, Music (HCert/
//   AdvDip/Bachelor), Forensic Sciences, Construction Econ & Mgmt FT,
//   Construction Mgmt Compact, QS Compact all explicitly state "30
//   September 2026" next to the programme itself. Community Development
//   (QC) and Physics with Engineering Subjects have no explicit inline
//   date, but sit in the same p.51 table column as the other 7 confirmed
//   Sept-30 items (resolved via column-major OCR read-order analysis — see
//   report). Conclusion: NONE of that 9-item "later group" need a
//   closingDateOverride (they equal the University-level default of 30
//   Sept 2026) — only the 31 May and 31 July items above get an explicit
//   override.

// ─────────────────────────────────────────────────────────────────────────
// FACULTY OF ECONOMIC AND MANAGEMENT SCIENCES
// ─────────────────────────────────────────────────────────────────────────
export const UFS_EMS_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'BC630000',
    universityId: 'ufs',
    name: 'BCom',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'BC630020',
    universityId: 'ufs',
    name: 'BCom with specialisation in Economics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'BC630025',
    universityId: 'ufs',
    name: 'BCom with specialisation in Finance',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'BC638080',
    universityId: 'ufs',
    name: 'BCom with specialisation in Business Analytics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC630010',
    universityId: 'ufs',
    name: 'BCom with specialisation in Marketing',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
      ],
    },
  },
  {
    qualificationCode: 'BC630012',
    universityId: 'ufs',
    name: 'BCom with specialisation in Business Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
      ],
    },
  },
  {
    qualificationCode: 'BC630030',
    universityId: 'ufs',
    name: 'BCom with specialisation in Human Resource Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
      ],
    },
  },
  {
    qualificationCode: 'BC637070',
    universityId: 'ufs',
    name: 'BCom (Law)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'BC634040',
    universityId: 'ufs',
    name: 'Bachelor of Administration (BAdmin)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
      ],
    },
  },
  {
    qualificationCode: 'BC636060',
    universityId: 'ufs',
    name: 'Bachelor of Accounting (BAcc)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Economic and Management Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
      note: 'SAICA-accredited (Level 1 rating) — feeds into the CA(SA) route together with the PGDip(CA) or BAcc Honours.',
    },
    careers: ['Chartered Accountant (SA)'],
  },
  {
    qualificationCode: 'BC635050',
    universityId: 'ufs',
    name: 'BCom (Accounting)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
      note: 'Aimed at general accountancy professions (AGA(SA), SAIPA, ACCA, CIMA). CA(SA) route requires further PGDip(GA)/BComHons(Acc).',
    },
  },
  {
    qualificationCode: 'QC630001',
    universityId: 'ufs',
    name: 'BCom with specialisation in Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'QC634040',
    universityId: 'ufs',
    name: 'Bachelor of Administration (BAdmin)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 2 },
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────
// FACULTY OF EDUCATION
// All BEd programmes are 4 years (explicit in source: "FOUR YEARS
// FOUNDATION PHASE" header; assumed uniform across Intermediate and
// Senior/FET phases since no other duration is given).
// No SubjectKey exists for Sesotho Home Language — modelled via generic
// 'homeLanguage' with a clarifying note. Business Studies / Economics /
// Engineering Graphics & Design (Senior/FET "other subject requirements")
// have no SubjectKey and are captured in `note` only.
// ─────────────────────────────────────────────────────────────────────────
export const UFS_EDUCATION_PROGRAMMES: Programme[] = [
  // BEd Foundation Phase
  {
    qualificationCode: 'LC735101',
    universityId: 'ufs',
    name: 'BEd Foundation Phase — Specialisation in Afrikaans Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['South Campus'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'afrikaans', status: 'required', minRating: 4, homeLanguageRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'LC735103',
    universityId: 'ufs',
    name: 'BEd Foundation Phase — Specialisation in Sesotho Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['South Campus'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'required', minRating: 4 },
      ],
      note: 'Home-language requirement is Sesotho Home Language Level 4 (50%) — no dedicated SubjectKey exists for Sesotho, generic homeLanguage used.',
    },
  },
  {
    qualificationCode: 'QC735103',
    universityId: 'ufs',
    name: 'BEd Foundation Phase — Specialisation in Sesotho Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'required', minRating: 4 },
      ],
      note: 'Home-language requirement is Sesotho Home Language Level 4 (50%) — no dedicated SubjectKey exists for Sesotho, generic homeLanguage used.',
    },
  },
  {
    qualificationCode: 'QC735105',
    universityId: 'ufs',
    name: 'BEd Foundation Phase — Specialisation in isiZulu Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'isiZulu', status: 'required', minRating: 4, homeLanguageRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'LC735106',
    universityId: 'ufs',
    name: 'BEd Foundation Phase — Specialisation in English Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['South Campus'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4, homeLanguageRating: 4 },
        { subject: 'afrikaans', status: 'required', minRating: 4 },
      ],
      note: 'Afrikaans Level 4 (50%) is required for the English Home Language specialisation.',
    },
  },
  // BEd Intermediate Phase
  {
    qualificationCode: 'BC735791',
    universityId: 'ufs',
    name: 'BEd Intermediate Phase — Mathematics, Natural Sciences, Technology, and Afrikaans Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'afrikaans', status: 'required', minRating: 4, homeLanguageRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'BC735784',
    universityId: 'ufs',
    name: 'BEd Intermediate Phase — Life Skills, Social Sciences, and Afrikaans Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'afrikaans', status: 'required', minRating: 4, homeLanguageRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'BC735793',
    universityId: 'ufs',
    name: 'BEd Intermediate Phase — Mathematics, Natural Sciences and Technology, and English Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4, homeLanguageRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'additionalLanguage', status: 'required', minRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'BC735787',
    universityId: 'ufs',
    name: 'BEd Intermediate Phase — Life Skills, Social Sciences, and English Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4, homeLanguageRating: 4 },
        { subject: 'additionalLanguage', status: 'required', minRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'BC735792',
    universityId: 'ufs',
    name: 'BEd Intermediate Phase — Mathematics, Natural Sciences and Technology, and Sesotho Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'required', minRating: 4 },
      ],
      note: 'Home-language requirement is Sesotho Home Language Level 4 (50%).',
    },
  },
  {
    qualificationCode: 'QC735792',
    universityId: 'ufs',
    name: 'BEd Intermediate Phase — Mathematics, Natural Sciences and Technology, and Sesotho Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'required', minRating: 4 },
      ],
      note: 'Home-language requirement is Sesotho Home Language Level 4 (50%).',
    },
  },
  {
    qualificationCode: 'QC735788',
    universityId: 'ufs',
    name: 'BEd Intermediate Phase — Life Skills and Social Sciences, and isiZulu Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'isiZulu', status: 'required', minRating: 4, homeLanguageRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'BC735782',
    universityId: 'ufs',
    name: 'BEd Intermediate Phase — Life Skills, Social Sciences, and Sesotho Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'required', minRating: 4 },
      ],
      note: 'Home-language requirement is Sesotho Home Language Level 4 (50%).',
    },
  },
  {
    qualificationCode: 'QC735782',
    universityId: 'ufs',
    name: 'BEd Intermediate Phase — Life Skills, Social Sciences, and Sesotho Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'required', minRating: 4 },
      ],
      note: 'Home-language requirement is Sesotho Home Language Level 4 (50%).',
    },
  },
  {
    qualificationCode: 'QC735794',
    universityId: 'ufs',
    name: 'BEd Intermediate Phase — Mathematics, Natural Sciences and Technology, and isiZulu Home Language',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'isiZulu', status: 'required', minRating: 4, homeLanguageRating: 4 },
      ],
    },
  },
  // BEd Senior and FET Phase
  {
    qualificationCode: 'BC736101',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — Accounting and Business Studies',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'accounting', status: 'required', minRating: 4 },
      ],
      note: 'Business Studies Level 4 (50%) is also required — no SubjectKey exists for Business Studies.',
    },
  },
  {
    qualificationCode: 'BC736104',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — EMS and Accounting',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'accounting', status: 'required', minRating: 4 },
      ],
      note: 'Alternative to Accounting: Economics Level 4 (50%) OR Business Studies Level 4 (50%) — no SubjectKey exists for either.',
    },
  },
  {
    qualificationCode: 'BC736301',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — Technology and Engineering Graphics and Design',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Engineering Graphics and Design Level 4 (50%) required — no SubjectKey exists for this subject.',
    },
  },
  {
    qualificationCode: 'BC736305',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — Life Sciences and Mathematics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'QC736305',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — Life Sciences and Mathematics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC736308',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — Technology and Life Sciences',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC736404',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — Sesotho Home Language and English FAL',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'required', minRating: 4 },
      ],
      note: 'Home-language requirement is Sesotho Home Language Level 4 (50%).',
    },
  },
  {
    qualificationCode: 'QC736402',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — Sesotho Home Language and English FAL',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'required', minRating: 4 },
      ],
      note: 'Home-language requirement is Sesotho Home Language Level 4 (50%).',
    },
  },
  {
    qualificationCode: 'QC736403',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — isiZulu Home Language and English FAL',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'isiZulu', status: 'required', minRating: 4, homeLanguageRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'BC736314',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — Mathematics and Physical Sciences',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'QC736314',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — Mathematics and Physical Sciences',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC736511',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — Sesotho Home Language and History',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'required', minRating: 4 },
      ],
      note: 'Home-language requirement is Sesotho Home Language Level 4 (50%). History requirement stated but no SubjectKey exists for History.',
    },
  },
  {
    qualificationCode: 'QC736511',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — Sesotho Home Language and History',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'required', minRating: 4 },
      ],
      note: 'Home-language requirement is Sesotho Home Language Level 4 (50%). History requirement stated but no SubjectKey exists for History.',
    },
  },
  {
    qualificationCode: 'QC736512',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — isiZulu Home Language and History',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'isiZulu', status: 'required', minRating: 4, homeLanguageRating: 4 },
      ],
      note: 'History requirement stated but no SubjectKey exists for History.',
    },
  },
  {
    qualificationCode: 'BC736519',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — English and History',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'History requirement stated but no SubjectKey exists for History.',
    },
  },
  {
    qualificationCode: 'BC736521',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — Afrikaans Home Language and English',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'afrikaans', status: 'required', minRating: 4, homeLanguageRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'QC736600',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — Geography and Life Sciences',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
        { subject: 'geography', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC736600',
    universityId: 'ufs',
    name: 'BEd Senior and FET Phase — Geography and Life Sciences',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
        { subject: 'geography', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────
// FACULTY OF HEALTH SCIENCES
// All closing dates below are explicit in the source text (not inferred).
// ─────────────────────────────────────────────────────────────────────────
export const UFS_HEALTH_SCIENCES_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'BC831000',
    universityId: 'ufs',
    name: 'Bachelor of Medical Science with specialisation in Radiation Science (BMedSc)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Bloemfontein'],
    closingDateOverride: '2026-05-31T12:00:00+02:00',
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'C834100',
    universityId: 'ufs',
    name: 'Bachelor of Medicine and Bachelor of Surgery (MB ChB)',
    qualificationType: 'degree',
    durationYears: 6,
    faculty: 'Health Sciences',
    campus: ['Bloemfontein'],
    closingDateOverride: '2026-05-31T12:00:00+02:00',
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 36 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
      note: 'Senior applicants (already at a tertiary institution, or graduates) face additional requirements — contact fhsapplications@ufs.ac.za.',
    },
    careers: ['Medical Doctor'],
  },
  {
    qualificationCode: 'BC8413033',
    universityId: 'ufs',
    name: 'Bachelor of Optometry (BOptom)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Bloemfontein'],
    closingDateOverride: '2026-05-31T12:00:00+02:00',
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC842002',
    universityId: 'ufs',
    name: 'Bachelor of Science in Physiotherapy BSc (Physiotherapy)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Bloemfontein'],
    closingDateOverride: '2026-05-31T12:00:00+02:00',
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'BC846002',
    universityId: 'ufs',
    name: 'Bachelor of Science in Dietetics BSc (Dietetics)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Bloemfontein'],
    closingDateOverride: '2026-05-31T12:00:00+02:00',
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'BC843100',
    universityId: 'ufs',
    name: 'Bachelor of Occupational Therapy (BOccTher)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Bloemfontein'],
    closingDateOverride: '2026-05-31T12:00:00+02:00',
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
  },
  {
    qualificationCode: 'BC844000',
    universityId: 'ufs',
    name: 'Bachelor of Biokinetics (BBiok)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Health Sciences',
    campus: ['Bloemfontein'],
    closingDateOverride: '2026-05-31T12:00:00+02:00',
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    note: 'Source lists a second plan code BC844001 alongside BC844000 for this same programme row — likely an extended/alternate stream; not enough detail to encode separately.',
  },
  {
    qualificationCode: 'BC834000',
    universityId: 'ufs',
    name: 'Bachelor of Sport Coaching (B SportCoach)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Health Sciences',
    campus: ['Bloemfontein'],
    closingDateOverride: '2026-05-31T12:00:00+02:00',
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Source table row for B SportCoach only prints an English requirement (Maths/Life Sciences/Physical Sciences columns blank for this row).',
    },
  },
  {
    qualificationCode: 'BC849000',
    universityId: 'ufs',
    name: 'Bachelor of Nursing',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Bloemfontein'],
    closingDateOverride: '2026-07-31T12:00:00+02:00',
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 6, altGroup: 'maths' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Either Mathematics (Level 3/40%) or Mathematical Literacy (Level 6/70%) is required. Either Life Sciences (Level 5/60%) or Physical Sciences (Level 4/50%) is required.',
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────
// FACULTY OF LAW
// ─────────────────────────────────────────────────────────────────────────
export const UFS_LAW_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'BC340000',
    universityId: 'ufs',
    name: 'Bachelor of Laws (LLB)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Law',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 6 },
        { subject: 'mathematics', status: 'alternative', minRating: 4, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 6, altGroup: 'maths' },
      ],
      note: 'Either Mathematics (Level 4/50%) or Mathematical Literacy (Level 6/70%) is required.',
    },
    careers: ['Advocate', 'Attorney', 'Legal Advisor', 'Prosecutor', 'Magistrate'],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// FACULTY OF NATURAL AND AGRICULTURAL SCIENCES (NAS)
// Largest faculty — Natural Sciences, Agricultural Sciences, Building
// Sciences, across Bloemfontein and Qwaqwa campuses.
// ─────────────────────────────────────────────────────────────────────────
export const UFS_NAS_PROGRAMMES: Programme[] = [
  // ── BSc specialising in Biological Sciences (B4310) ──
  {
    qualificationCode: 'BC433118',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Behavioural Genetics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC431920',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Biochemistry and Botany',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC431927',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Biochemistry and Entomology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC431931',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Biochemistry and Genetics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC431939',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Biochemistry and Microbiology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC431980',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Biochemistry and Physiology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC431946',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Biochemistry and Statistics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC431949',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Biochemistry and Zoology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC430098',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Biodiversity and Conservation Ecology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432027',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Botany and Entomology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432031',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Botany and Genetics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432039',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Botany and Microbiology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432041',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Botany and Plant Breeding',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432042',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Botany and Plant Pathology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432049',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Botany and Zoology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432731',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Entomology and Genetics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432739',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Entomology and Microbiology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432749',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Entomology and Zoology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC433139',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Genetics and Microbiology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC433180',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Genetics and Physiology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC433149',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Genetics and Zoology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC433946',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Microbiology and Statistics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC433949',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Microbiology and Zoology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432082',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Plant Health Ecology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432742',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Plant Health Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  // ── BSc specialising in Forensic Science (B4311) ──
  {
    qualificationCode: 'BC433031',
    universityId: 'ufs',
    name: 'BSc (Forensic Science)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'lifeScience', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
      note: 'Subject to selection — a cumulative AP of at least 17 across Mathematics, Life Sciences, and Physical Sciences is also required.',
    },
  },
  // ── BSc specialising in Mathematical Sciences (B4321) ──
  {
    qualificationCode: 'BC433816',
    universityId: 'ufs',
    name: 'BSc (Mathematical Sciences) — Mathematics and Applied Mathematics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC433821',
    universityId: 'ufs',
    name: 'BSc (Mathematical Sciences) — Mathematics and Chemistry',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC433837',
    universityId: 'ufs',
    name: 'BSc (Mathematical Sciences) — Mathematics and Mathematical Statistics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC433840',
    universityId: 'ufs',
    name: 'BSc (Mathematical Sciences) — Mathematics and Physics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  // ── BSc specialising in Actuarial Sciences (B4324) ──
  {
    qualificationCode: 'BC431000',
    universityId: 'ufs',
    name: 'BSc (Actuarial Science)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
      note: 'Subject to selection on academic performance. Unsuccessful applicants may be offered Econometrics instead, with a possible transfer into Actuarial Science in year 3 if they excel.',
    },
    careers: ['Actuary'],
  },
  // ── BSc specialising in Mathematical Statistics and Applied Statistics (B4322, B4323, B4325) ──
  {
    qualificationCode: 'BC433712',
    universityId: 'ufs',
    name: 'BSc (Mathematical Statistics) — Climate Sciences',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC433758',
    universityId: 'ufs',
    name: 'BSc (Mathematical Statistics) — Econometrics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
  },
  {
    qualificationCode: 'BC433786',
    universityId: 'ufs',
    name: 'BSc (Mathematical Statistics) — Mathematical Statistics and Psychometrics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
  },
  {
    qualificationCode: 'BC434658',
    universityId: 'ufs',
    name: 'BSc (Applied Statistics) — Statistics and Economics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC434686',
    universityId: 'ufs',
    name: 'BSc (Applied Statistics) — Statistics and Psychology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
  },
  // ── BSc specialising in Chemical Sciences (B4330) ──
  {
    qualificationCode: 'BC432119',
    universityId: 'ufs',
    name: 'BSc (Chemical Sciences) — Chemistry and Biochemistry',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432120',
    universityId: 'ufs',
    name: 'BSc (Chemical Sciences) — Chemistry and Botany',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432139',
    universityId: 'ufs',
    name: 'BSc (Chemical Sciences) — Chemistry and Microbiology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432140',
    universityId: 'ufs',
    name: 'BSc (Chemical Sciences) — Chemistry and Physics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  // ── BSc specialising in Physical Sciences (B4331) ──
  {
    qualificationCode: 'BC434012',
    universityId: 'ufs',
    name: 'BSc (Physical Sciences) — Physics and Agrometeorology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC434017',
    universityId: 'ufs',
    name: 'BSc (Physical Sciences) — Physics and Astrophysics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  // ── BSc specialising in Physical Sciences with Engineering Subjects (B4332) / BEng Agric & Biosystems Eng (B5430) ──
  {
    qualificationCode: 'BC434026',
    universityId: 'ufs',
    name: 'BSc (Physical Sciences with Engineering Subjects) — Physics and Engineering Subjects',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC540026',
    universityId: 'ufs',
    name: 'BEng (Agricultural and Biosystems Engineering)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
      note: 'Subject to selection.',
    },
  },
  // ── BSc specialising in Geography (B4340) / Environmental Soil Science (B4341) ──
  {
    qualificationCode: 'BC433362',
    universityId: 'ufs',
    name: 'BSc (Geography) — Geography and Environmental Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC433333',
    universityId: 'ufs',
    name: 'BSc (Geography Specialisation)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC434462',
    universityId: 'ufs',
    name: 'BSc (Environmental Soil Science)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  // ── BSc specialising in Geology (B4341, printed same code prefix as Environmental Soil Science above) ──
  {
    qualificationCode: 'BC433521',
    universityId: 'ufs',
    name: 'BSc (Geology) — Geology and Chemistry',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC433528',
    universityId: 'ufs',
    name: 'BSc (Environmental Geology)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC433532',
    universityId: 'ufs',
    name: 'BSc (Geochemistry)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC433535',
    universityId: 'ufs',
    name: 'BSc (Geology)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC433540',
    universityId: 'ufs',
    name: 'BSc (Geology and Physics)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  // ── BSc in Agricultural Economics (B4350) ──
  {
    qualificationCode: 'BC431100',
    universityId: 'ufs',
    name: 'BSc (Agricultural Economics)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
  },
  // ── BSc (Information Technology) specialising in Computer Sciences (B4360, B4361, B4362, B4364) ──
  {
    qualificationCode: 'BC432221',
    universityId: 'ufs',
    name: 'BSc (IT) — Computer Science and Chemistry',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
      note: 'All BSc (IT) programmes are subject to a selection process.',
    },
  },
  {
    qualificationCode: 'BC432237',
    universityId: 'ufs',
    name: 'BSc (IT) — Computer Science and Mathematical Statistics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432238',
    universityId: 'ufs',
    name: 'BSc (IT) — Computer Science and Mathematics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432240',
    universityId: 'ufs',
    name: 'BSc (IT) — Computer Science and Physics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432295',
    universityId: 'ufs',
    name: 'BSc (IT) — Data Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC432255',
    universityId: 'ufs',
    name: 'BSc (IT) — Computer Science and Business Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
  },
  // ── Bachelor of Computer Information Systems (B4363) ──
  {
    qualificationCode: 'BC430156',
    universityId: 'ufs',
    name: 'Bachelor of Computer Information Systems (CompInfoSys)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
  },
  // ── Bachelor of Sustainable Food Systems (B4371) ──
  {
    qualificationCode: 'BC430223',
    universityId: 'ufs',
    name: 'Bachelor of Sustainable Food Systems',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'alternative', minRating: 2, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'maths' },
      ],
      note: 'Mathematical Literacy at Level 5 (60%) is also accepted in place of Mathematics Level 2 (30%).',
    },
  },
  // ── Bachelor of Agriculture (B5300) ──
  {
    qualificationCode: 'BC530147',
    universityId: 'ufs',
    name: 'Bachelor of Agriculture — Agricultural Extension',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 7, altGroup: 'maths' },
      ],
      note: 'Mathematical Literacy Level 7 (80%) is also accepted in place of Mathematics Level 3 (40%), if the overall AP is 31 or above.',
    },
  },
  {
    qualificationCode: 'BC530101',
    universityId: 'ufs',
    name: 'Bachelor of Agriculture — Animal Production Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 7, altGroup: 'maths' },
      ],
      note: 'Mathematical Literacy Level 7 (80%) is also accepted in place of Mathematics Level 3 (40%), if the overall AP is 31 or above.',
    },
  },
  {
    qualificationCode: 'BC530102',
    universityId: 'ufs',
    name: 'Bachelor of Agriculture — Crop Production',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 7, altGroup: 'maths' },
      ],
      note: 'Mathematical Literacy Level 7 (80%) is also accepted in place of Mathematics Level 3 (40%), if the overall AP is 31 or above.',
    },
  },
  {
    qualificationCode: 'BC530103',
    universityId: 'ufs',
    name: 'Bachelor of Agriculture — Mixed Farming Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 7, altGroup: 'maths' },
      ],
      note: 'Mathematical Literacy Level 7 (80%) is also accepted in place of Mathematics Level 3 (40%), if the overall AP is 31 or above.',
    },
  },
  {
    qualificationCode: 'BC530172',
    universityId: 'ufs',
    name: 'Bachelor of Agriculture — Irrigation Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
      ],
    },
  },
  // ── Bachelor of Agriculture (B5350) ──
  {
    qualificationCode: 'BC530111',
    universityId: 'ufs',
    name: 'Bachelor of Agriculture — Agricultural Economics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
      note: 'Mathematical Literacy alternative is NOT available for this major (excluded from the general BAgric Maths Lit exception).',
    },
  },
  {
    qualificationCode: 'BC530152',
    universityId: 'ufs',
    name: 'Bachelor of Agriculture — Agricultural Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 7, altGroup: 'maths' },
      ],
      note: 'Mathematical Literacy Level 7 (80%) is also accepted in place of Mathematics Level 3 (40%), if the overall AP is 31 or above.',
    },
  },
  // ── BSc in Agriculture (BScAgric, B5480) — Physical Sciences compulsory + Life Sciences or Agricultural Sciences ──
  {
    qualificationCode: 'BC540015',
    universityId: 'ufs',
    name: 'BSc (Agriculture) — Animal Science',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
      ],
      note: 'Physical Sciences is compulsory; the fifth column (Life Sciences OR Agricultural Sciences, both Level 5/60%) has no dedicated Agricultural Sciences SubjectKey — Life Sciences used here.',
    },
  },
  {
    qualificationCode: 'BC540012',
    universityId: 'ufs',
    name: 'BSc (Agriculture) — Agrometeorology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC540013',
    universityId: 'ufs',
    name: 'BSc (Agriculture) — Agronomy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC540041',
    universityId: 'ufs',
    name: 'BSc (Agriculture) — Plant Breeding',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC540042',
    universityId: 'ufs',
    name: 'BSc (Agriculture) — Plant Pathology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'BC540044',
    universityId: 'ufs',
    name: 'BSc (Agriculture) — Soil Science',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
      ],
    },
  },
  // ── Building Sciences — Bachelor of Architecture (B4391) ──
  {
    qualificationCode: 'BC430114',
    universityId: 'ufs',
    name: 'Bachelor of Architecture (BArch)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    closingDateOverride: '2026-07-31T12:00:00+02:00',
    additionalRequirements: ['selection form'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
      note: 'Subject to a selection process — a separate selection form must be submitted to NoReplyArchiSelect@ufs.ac.za by 31 July 2026. Selection outcome notified by 30 November 2026.',
    },
  },
  // ── Building Sciences — BSc Construction Economics and Management (B4392) ──
  {
    qualificationCode: 'BC432443',
    universityId: 'ufs',
    name: 'BSc (Construction Economics and Management) — Full-time',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'accounting', status: 'alternative', minRating: 4, altGroup: 'econ_group' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'econ_group' },
      ],
      note: 'One of Economics, Business Studies, Accounting, or Physical Science at Level 4 (50%) is required — no SubjectKey exists for Economics/Business Studies, so only Accounting and Physical Science are modelled as the alternative gate.',
    },
  },
  // ── Building Sciences — BSc Quantity Surveying / Construction Management, Compact Learning (B4393) ──
  {
    qualificationCode: 'BC432401',
    universityId: 'ufs',
    name: 'BSc (Construction Management) — Compact Learning',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    additionalRequirements: [
      'selection',
      'age 22+',
      'proof of full-time employment in the construction industry',
    ],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'accounting', status: 'alternative', minRating: 4, altGroup: 'econ_group' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'econ_group' },
      ],
      note: 'One of Economics, Business Studies, Accounting, or Physical Science at Level 4 (50%) is required. Compact Learning applicants must be at least 22 years old and supply proof of full-time employment in the construction industry.',
    },
  },
  {
    qualificationCode: 'BC434301',
    universityId: 'ufs',
    name: 'BSc (Quantity Surveying) — Compact Learning',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Bloemfontein'],
    additionalRequirements: [
      'selection',
      'age 22+',
      'proof of full-time employment in the construction industry',
    ],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'accounting', status: 'alternative', minRating: 4, altGroup: 'econ_group' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'econ_group' },
      ],
      note: 'One of Economics, Business Studies, Accounting, or Physical Science at Level 4 (50%) is required. Compact Learning applicants must be at least 22 years old and supply proof of full-time employment in the construction industry.',
    },
  },
  // ── Qwaqwa Campus — BSc specialising in Biological Sciences (Q4310) ──
  {
    qualificationCode: 'QC432075',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Botany and Life Sciences',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'QC437500',
    universityId: 'ufs',
    name: 'BSc (Life Sciences)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'QC434975',
    universityId: 'ufs',
    name: 'BSc (Biological Sciences) — Zoology and Life Sciences',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  // ── Qwaqwa Campus — BSc specialising in Chemical and Physical Sciences (Q4330) ──
  {
    qualificationCode: 'QC432140',
    universityId: 'ufs',
    name: 'BSc (Chemical and Physical Sciences) — Chemistry and Physics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'QC432120',
    universityId: 'ufs',
    name: 'BSc (Chemical and Physical Sciences) — Chemistry and Botany',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  // ── Qwaqwa Campus — BSc specialising in Geography (Q4340) ──
  {
    qualificationCode: 'QC433359',
    universityId: 'ufs',
    name: 'BSc (Geography) — Geography and Environmental Geography',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'QC433333',
    universityId: 'ufs',
    name: 'BSc (Geography)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  // ── Qwaqwa Campus — BSc (Information Technology) (Q4360, Q4364) ──
  {
    qualificationCode: 'QC432221',
    universityId: 'ufs',
    name: 'BSc (IT) — Computer Science and Chemistry',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Qwaqwa'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'QC432240',
    universityId: 'ufs',
    name: 'BSc (IT) — Computer Science and Physics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Qwaqwa'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
  },
  {
    qualificationCode: 'QC432202',
    universityId: 'ufs',
    name: 'BSc (IT) — Computer Science and Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Qwaqwa'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────
// FACULTY OF THE HUMANITIES
// ─────────────────────────────────────────────────────────────────────────
export const UFS_HUMANITIES_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'BC111044',
    universityId: 'ufs',
    name: 'Higher Certificate in Music Performance',
    qualificationType: 'higher_certificate',
    durationYears: 1,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    additionalRequirements: ['audition', 'musical aptitude test'],
    admission: {
      apsMinimum: { default: 20 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Subject to selection. Compulsory audition and musical aptitude test on the chosen instrument/voice before 30 September 2026.',
    },
  },
  {
    qualificationCode: 'BC120044',
    universityId: 'ufs',
    name: 'Diploma in Music',
    qualificationType: 'diploma',
    durationYears: 3,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    additionalRequirements: ['audition', 'theory proficiency test'],
    admission: {
      apsMinimum: { default: 25 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Subject to selection. Unisa/ABRSM/Trinity College Grade 5 in principal instrument or voice (Grade 3 Music Theory advised). Compulsory audition and theory proficiency test before 30 September 2026. Duration inferred (standard SA diploma length); not stated explicitly.',
    },
  },
  {
    qualificationCode: 'BC140442',
    universityId: 'ufs',
    name: 'Advanced Diploma in Music',
    qualificationType: 'advanced_diploma',
    durationYears: 1,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    additionalRequirements: ['audition'],
    admission: {
      apsMinimum: {},
      subjectRequirements: [],
      note: 'Entry requires a completed Diploma in Music or relevant NQF6 qualification (not an NSC-based admission). Compulsory audition before 30 September 2026.',
    },
  },
  {
    qualificationCode: 'BC140441',
    universityId: 'ufs',
    name: 'Advanced Diploma in Opera Studies',
    qualificationType: 'advanced_diploma',
    durationYears: 1,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    additionalRequirements: ['audition'],
    admission: {
      apsMinimum: {},
      subjectRequirements: [],
      note: 'Entry requires a completed Diploma in Music or relevant NQF6 qualification (not an NSC-based admission). Compulsory audition before 30 September 2026.',
    },
  },
  {
    qualificationCode: 'BC130039',
    universityId: 'ufs',
    name: 'BA (Language Practice)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Subject to selection. Any home language (HL) taken in Grade 12 must be at least Level 5 (60%); any first additional language (FAL) at least 65%. A second additional language (SAL) does not count.',
    },
  },
  {
    qualificationCode: 'BC130031',
    universityId: 'ufs',
    name: 'BA (Governance and Political Transformation)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
    },
  },
  {
    qualificationCode: 'BC130038',
    universityId: 'ufs',
    name: 'BA (Integrated Organisational Communication)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'English requirement: Level 6 (60%) Home Language OR at least 65% First/Second Additional Language.',
    },
  },
  {
    qualificationCode: 'BC130035',
    universityId: 'ufs',
    name: 'BA (Journalism)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'English requirement: Level 6 (60%) Home Language OR at least 65% First/Second Additional Language.',
    },
  },
  {
    qualificationCode: 'BC140025',
    universityId: 'ufs',
    name: 'BA (Fine Arts)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    additionalRequirements: ['portfolio', 'selection form'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Subject to selection. Closing date for application, portfolio of creative work, and selection form is 30 September 2026 (matches university default — no override needed).',
    },
  },
  {
    qualificationCode: 'BC130020',
    universityId: 'ufs',
    name: 'BA (Drama and Theatre Arts)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    additionalRequirements: ['audition', 'interview'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5, homeLanguageRating: 5 },
      ],
      note: 'English Home Language Level 5 (60%) OR at least 65% First/Second Additional Language. Drama experience recommended; compulsory audition and interview. Closing date 30 September 2026 (matches university default).',
    },
  },
  {
    qualificationCode: 'BC137000',
    universityId: 'ufs',
    name: 'BA General',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Majors offered include Ancient Near Eastern Studies, Philosophy, History, Classical Studies, Art History and Image Studies, Linguistics, Geography (requires Mathematics Level 3/40%), Classical Languages, Sesotho HL, isiZulu HL, Afrikaans and Dutch, South African Sign Language, Political Science, Criminology, Psychology, English, Hebrew, Arabic, French, German, Anthropology, Sociology.',
    },
  },
  {
    qualificationCode: 'BC137500',
    universityId: 'ufs',
    name: 'BA specialising in Languages',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
    },
  },
  {
    qualificationCode: 'BC140544',
    universityId: 'ufs',
    name: 'Bachelor of Music',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    additionalRequirements: ['audition', 'theory proficiency test'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Subject to selection. Music Theory Unisa/ABRSM Grade 5 (or equivalent); Music Performance Unisa/ABRSM/Trinity College Grade 7 (or equivalent). Compulsory audition and theory proficiency test before 30 September 2026.',
    },
  },
  {
    qualificationCode: 'BC130044',
    universityId: 'ufs',
    name: 'BA (Music)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    additionalRequirements: ['audition', 'theory proficiency test'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Subject to selection. Same audition/theory-test requirements as Bachelor of Music, before 30 September 2026.',
    },
  },
  {
    qualificationCode: 'BC138000',
    universityId: 'ufs',
    name: 'Bachelor of Social Sciences (BSocSci)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Majors: any two of Psychology, Sociology, Anthropology, Criminology, Political Science, Industrial Psychology.',
    },
  },
  {
    qualificationCode: 'BC140250',
    universityId: 'ufs',
    name: 'Bachelor of Social Work',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'The Humanities',
    campus: ['Bloemfontein'],
    closingDateOverride: '2026-07-31T12:00:00+02:00',
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 35 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Subject to selection. Direct school-leaver admission is prioritised; first-choice Social Work applications are given preference.',
    },
  },
  {
    qualificationCode: 'QC137000',
    universityId: 'ufs',
    name: 'BA General',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'The Humanities',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
    },
  },
  {
    qualificationCode: 'QC140400',
    universityId: 'ufs',
    name: 'Bachelor of Community Development (BCommDev)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'The Humanities',
    campus: ['Qwaqwa'],
    additionalRequirements: ['selection'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'An AP of 30 OR a Diploma in Vocational Skills with a minimum Level 4 pass in English is required. Subject to a selection process. Source lists this programme in the p.51 closing-date table alongside items confirmed elsewhere as 30 September 2026 — no explicit inline date found, treated as the university default.',
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────
// FACULTY OF THEOLOGY AND RELIGION
// ─────────────────────────────────────────────────────────────────────────
export const UFS_THEOLOGY_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'BC940301',
    universityId: 'ufs',
    name: 'Bachelor of Divinity (BDiv)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Theology and Religion',
    campus: ['Bloemfontein'],
    additionalRequirements: ['selection form', 'UFS test of academic literacy'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'All applicants must complete a selection form (available during online application) — the Admission Committee makes final decisions. All first-time entering students must write the UFS test of academic literacy; if not met, a development module must be completed.',
    },
  },
  {
    qualificationCode: 'QC138000',
    universityId: 'ufs',
    name: 'Bachelor of Social Sciences (BSocSci)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Theology and Religion',
    campus: ['Qwaqwa'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
    },
  },
];

export const UFS: University = {
  id: 'ufs',
  name: 'University of the Free State',
  shortName: 'UFS',
  logoUrl: '/logos/ufs.png',
  applicationSystem: 'Custom portal',
  applicationFee: 150,
  feeNote:
    'UNCONFIRMED against the sourced 2027 prospectus text (no domestic application-fee figure found) — carried over from prior data. Verify via apply.ufs.ac.za before relying on this figure.',
  maxChoices: 1,
  choicesRanked: false,
  choicesIndependent: true,
  choicesFinal: true,
  apsRule: {
    method: 'custom',
    subjectsCounted: 6,
    includesLifeOrientation: true,
    scale: 'nsc_8point',
    bonusPoints:
      'Life Orientation contributes exactly 1 bonus point if Level 5 (60%) or higher, else 0 — it is not scored on the main 8-point table like the other six subjects.',
    note: 'Six best academic subjects (no points below 30%) converted via an 8-point table: NSC Level 7 at 90-100% = AP 8, Level 7 at 80-89% = AP 7, Level 6 = AP 6, Level 5 = AP 5, Level 4 = AP 4, Level 3 = AP 3, Level 2 = AP 2, Level 1 = 0. Max AP = 49 (6x8 + 1 LO bonus). Selection is merit-based beyond the minimum threshold, starting from the highest AP — meeting the minimum does not guarantee admission.',
  },
  applicationsOpen: '2026-04-01',
  defaultClosingDate: '2026-09-30T23:59:00+02:00',
  applyUrl: 'https://apply.ufs.ac.za',
  notes: [
    'UFS recommends applying to two programmes as a strategy, and Faculty of Health Sciences applications must list the true preference as first choice — ApplyOnce restricts every student to ONE programme per university (a platform-wide rule), so maxChoices is set to 1 regardless.',
    'Applications open 1 April 2026. Closing dates are staggered: 31 May 2026 for Faculty of Health Sciences selection programmes (MBChB, Radiation Science, Optometry, Physiotherapy, Dietetics, Occupational Therapy, Biokinetics, Sport Coaching) and international/transfer applications; 31 July 2026 for Nursing, Social Work and Architecture; 30 September 2026 (the default) for all other programmes.',
    'Extended Curriculum Programmes (ECP) exist as a fallback for applicants who fall short of mainstream criteria, but require applying to the mainstream programme first — not a separate application. Only encoded as distinct programmes where the prospectus gave an explicit ECP code and AP number.',
  ],
  programmes: [
    ...UFS_EMS_PROGRAMMES,
    ...UFS_EDUCATION_PROGRAMMES,
    ...UFS_HEALTH_SCIENCES_PROGRAMMES,
    ...UFS_LAW_PROGRAMMES,
    ...UFS_NAS_PROGRAMMES,
    ...UFS_HUMANITIES_PROGRAMMES,
    ...UFS_THEOLOGY_PROGRAMMES,
  ],
  type: 'traditional',
  city: 'Bloemfontein',
  province: 'free_state',
  website: 'https://www.ufs.ac.za',
  applicationPortal: 'https://apply.ufs.ac.za',
};
