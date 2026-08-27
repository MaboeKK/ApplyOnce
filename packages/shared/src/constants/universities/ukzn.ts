// packages/shared/src/constants/universities/ukzn.ts
import { University, Programme } from '../../types/university';

// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSITY OF KWAZULU-NATAL (UKZN) — full reference implementation
// ═══════════════════════════════════════════════════════════════════════════
// UKZN uses the same 8-point NSC-to-APS conversion table as UFS (Level 7
// splits into APS 7 for 80-89% and APS 8 for 90-100%) but EXCLUDES Life
// Orientation entirely (no bonus point, unlike UFS) — max APS = 6x8 = 48.
// UKZN's own "College" structure (not "Faculty") is mapped onto the existing
// `faculty` field for consistency with the rest of this dataset.
// Programme codes are real CAO (Central Applications Office) codes, e.g.
// KN-W-xxx (Westville), KN-H-xxx (Howard College), KN-P-xxx (Pietermaritzburg),
// KN-M-xxx (Nelson R Mandela School of Medicine), KN-E-xxx (Edgewood) — used
// directly as qualificationCode, not synthesized.
// First-time SA undergrad applicants apply via the shared CAO system (which
// also covers other KZN institutions); returning/international/postgrad
// applicants apply directly to UKZN. ApplyOnce models a single "apply to
// UKZN" flow using UKZN's own direct application fee.
// Source: docs/prospectuses/ukzn/ (UKZN 2027 Undergraduate Prospectus).

// UKZN — College of Agriculture, Engineering and Science
// Source: UKZN Undergraduate Prospectus 2027, aes-summary.txt (CAO code / APS table)
// cross-referenced with aes-detail-v2.txt (full subject-level entrance requirements).
// universityId: 'ukzn' | faculty: 'Agriculture, Engineering and Science'
// UKZN apsRule: scale 'nsc_8point', 6 subjects, Life Orientation EXCLUDED from APS total
// (but LO is still frequently a PASS/GATE requirement at Level 4 — modelled below as a
// subjectRequirement, separately from the APS-total exclusion, which lives in the
// university-level ApsRule and is not re-stated per programme).

export const UKZN_AES_PROGRAMMES: Programme[] = [
  // ─── ARCHITECTURE ──────────────────────────────────────────────────
  {
    qualificationCode: 'KN-H-BAR',
    universityId: 'ukzn',
    name: 'Bachelor of Architectural Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'bar_elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'bar_elective' },
        { subject: 'homeLanguage', status: 'alternative', minRating: 5, altGroup: 'bar_elective' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minRating: 5,
          altGroup: 'bar_elective',
        },
      ],
      note: 'One elective at Level 5 also satisfiable by Business Studies, Consumer Studies, Dramatic Arts, Economics, History, Information Technology, Music or Religion Studies/Visual Arts — none of these map to an existing SubjectKey so are not individually modelled. Applicants also required to submit a portfolio, write an essay and complete a questionnaire; selection influenced by these.',
    },
    closingDateOverride: '2026-09-30T12:00:00+02:00',
    additionalRequirements: ['portfolio', 'essay', 'questionnaire'],
  },

  // ─── ENGINEERING (B Sc Eng, 4 years) ───────────────────────────────
  // Shared entrance requirement across all seven specialisations + Land Surveying:
  // "NSC-Deg with Maths and Phys Sci 5 (pass with at least 65%) & Engl & LO 4"
  // APS range 48-33 (figure printed once, against the Computer Eng row, in the
  // source summary table, but the identical requirements text spans the whole group).
  {
    qualificationCode: 'KN-P-BEA',
    universityId: 'ukzn',
    name: 'BSc Engineering: Agricultural (Bioresources) Engineering',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
      note: 'Mathematics and Physical Science/Physics both require a 65% (Level 5) pass. First year must be completed at Pietermaritzburg; second year at Howard College; third/fourth years back at Pietermaritzburg.',
    },
  },
  {
    qualificationCode: 'KN-H-BEC',
    universityId: 'ukzn',
    name: 'BSc Engineering: Chemical Engineering',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
      note: 'Chemical Engineering is offered on Howard College campus only (no Pietermaritzburg first-year option, unlike the other six disciplines).',
    },
  },
  {
    qualificationCode: 'KN-H-BEV',
    universityId: 'ukzn',
    name: 'BSc Engineering: Civil Engineering (Howard College)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
    },
  },
  {
    qualificationCode: 'KN-P-BEV',
    universityId: 'ukzn',
    name: 'BSc Engineering: Civil Engineering (Pietermaritzburg)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
      note: 'Only first year may be completed at Pietermaritzburg — years 2-4 must be completed at Howard College.',
    },
  },
  {
    qualificationCode: 'KN-H-BEK',
    universityId: 'ukzn',
    name: 'BSc Engineering: Computer Engineering (Howard College)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
    },
  },
  {
    qualificationCode: 'KN-P-BEK',
    universityId: 'ukzn',
    name: 'BSc Engineering: Computer Engineering (Pietermaritzburg)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
      note: 'Only first year may be completed at Pietermaritzburg — years 2-4 must be completed at Howard College.',
    },
  },
  {
    qualificationCode: 'KN-H-BEE',
    universityId: 'ukzn',
    name: 'BSc Engineering: Electrical Engineering (Howard College)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
    },
  },
  {
    qualificationCode: 'KN-P-BEE',
    universityId: 'ukzn',
    name: 'BSc Engineering: Electrical Engineering (Pietermaritzburg)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
      note: 'Only first year may be completed at Pietermaritzburg — years 2-4 must be completed at Howard College.',
    },
  },
  {
    qualificationCode: 'KN-H-BEF',
    universityId: 'ukzn',
    name: 'BSc Engineering: Electronic Engineering (Howard College)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
    },
  },
  {
    qualificationCode: 'KN-P-BEF',
    universityId: 'ukzn',
    name: 'BSc Engineering: Electronic Engineering (Pietermaritzburg)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
      note: 'Only first year may be completed at Pietermaritzburg — years 2-4 must be completed at Howard College.',
    },
  },
  {
    qualificationCode: 'KN-H-BEM',
    universityId: 'ukzn',
    name: 'BSc Engineering: Mechanical Engineering (Howard College)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
    },
  },
  {
    qualificationCode: 'KN-P-BEM',
    universityId: 'ukzn',
    name: 'BSc Engineering: Mechanical Engineering (Pietermaritzburg)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
      note: 'Only first year may be completed at Pietermaritzburg — years 2-4 must be completed at Howard College.',
    },
  },
  {
    qualificationCode: 'KN-H-BSL',
    universityId: 'ukzn',
    name: 'BSc Land Surveying',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
      note: 'Shares the same entrance-requirements text block as the BSc Engineering group. Howard College only.',
    },
    careers: ['Land Surveyor', 'Geographical Information Systems (GIS) Specialist'],
  },

  // ─── ACCESS / EXTENDED ENGINEERING PROGRAMME ───────────────────────
  {
    qualificationCode: 'KN-H-UNT',
    universityId: 'ukzn',
    name: 'BSc Engineering Access Programme',
    qualificationType: 'extended_degree',
    durationYears: 5,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Howard College'],
    firstTimeEntrantsOnly: true,
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
      note: 'Alternative-admission (extended) route into Engineering for applicants from disadvantaged (Quintile 1 & 2) schools not qualifying for direct entry.',
    },
  },

  // ─── AGRICULTURE (Pietermaritzburg only) ───────────────────────────
  {
    qualificationCode: 'KN-P-SAE',
    universityId: 'ukzn',
    name: 'BSc Agriculture: Agricultural Economics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Agricultural Science also accepted as an alternative to the Life/Physical Science requirement (not a modelled SubjectKey). A Level 4 pass in Economics may additionally substitute for the science requirement — Economics is not a modelled SubjectKey.',
    },
  },
  {
    qualificationCode: 'KN-P-BAQ',
    universityId: 'ukzn',
    name: 'Bachelor of Agricultural Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Agricultural Science also accepted as an alternative to the Life/Physical Science requirement. A Level 4 pass in Economics may additionally substitute for the science requirement — Economics is not a modelled SubjectKey. Aimed at producing agribusiness/farm/policy managers (distinct from BSc Agriculture).',
    },
  },
  {
    qualificationCode: 'KN-P-BAC',
    universityId: 'ukzn',
    name: 'Bachelor of Agriculture',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Cedara College'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Source text is inconsistent on the CAO code for this programme — it appears as "KN-P-BAG" in the Access Programmes section and "KN-P-BAC" in the Duration section (used here). Offered at Cedara College only; aims to produce development programme/project managers, distinct from the BSc in Agriculture.',
    },
  },
  {
    qualificationCode: 'KN-P-SAP',
    universityId: 'ukzn',
    name: 'BSc Agriculture: Agricultural Plant Sciences',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Agricultural Science also accepted as an alternative to the Life/Physical Science requirement. Specialisations available in Crop Science, Horticultural Science & Plant Breeding.',
    },
  },
  {
    qualificationCode: 'KN-P-BSB',
    universityId: 'ukzn',
    name: 'BSc Agriculture: Agribusiness',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Agricultural Science also accepted as an alternative. Specialisations available in Animal Science, Crop Science, Horticultural Science and Wildlife Management Science.',
    },
  },
  {
    qualificationCode: 'KN-P-BSP',
    universityId: 'ukzn',
    name: 'BSc Agriculture: Plant Pathology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Subject-level detail not individually itemised for this specialisation in the source table — inferred from the shared "BSc in Agriculture" admission block (APS 28, Engl/LO/Maths/science-alternative all Level 4), consistent with sibling Agriculture specialisations on the same page.',
    },
  },
  {
    qualificationCode: 'KN-P-BS1',
    universityId: 'ukzn',
    name: 'BSc Agriculture: Soil Science',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Agricultural Science also accepted as an alternative to the Life/Physical Science requirement.',
    },
  },
  {
    qualificationCode: 'KN-P-SAA',
    universityId: 'ukzn',
    name: 'BSc Agriculture: Animal and Poultry Science',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Agricultural Science also accepted as an alternative to the Life/Physical Science requirement.',
    },
  },
  // Note: BSc Dietetics and Human Nutrition (KN-P-BSD) is encoded once,
  // under Health Sciences (its more natural academic home) — this is a
  // cross-listed/interfaculty programme also named in the AES summary table.

  // ─── ACCESS / EXTENDED SCIENCE PROGRAMME ───────────────────────────
  {
    qualificationCode: 'KN-P-BS4',
    universityId: 'ukzn',
    name: 'BSc Augmented Programme (Pietermaritzburg)',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    firstTimeEntrantsOnly: true,
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
        { subject: 'lifeScience', status: 'alternative', minRating: 3, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 3, altGroup: 'science' },
      ],
      note: 'Alternative-admission (extended/foundation-year) route for candidates from educationally disadvantaged (Quintile 1 & 2) schools. Agricultural Science also accepted as an alternative science subject.',
    },
  },
  {
    qualificationCode: 'KN-W-BS4',
    universityId: 'ukzn',
    name: 'BSc Augmented Programme (Westville)',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Westville'],
    firstTimeEntrantsOnly: true,
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
        { subject: 'lifeScience', status: 'alternative', minRating: 3, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 3, altGroup: 'science' },
      ],
      note: 'Alternative-admission (extended/foundation-year) route for candidates from educationally disadvantaged (Quintile 1 & 2) schools. Agricultural Science also accepted as an alternative science subject.',
    },
  },

  // ─── BSc STREAMS (Life & Earth Sciences / Mathematical) ────────────
  {
    qualificationCode: 'KN-P-BS2',
    universityId: 'ukzn',
    name: 'BSc Stream (Life and Earth Sciences) — Pietermaritzburg',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Majors offered under this stream include Biochemistry, Biology, Genetics and Microbiology. Agricultural Science also accepted as an alternative science subject.',
    },
  },
  {
    qualificationCode: 'KN-W-BS2',
    universityId: 'ukzn',
    name: 'BSc Stream (Life and Earth Sciences) — Westville',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Majors offered under this stream include Biochemistry, Biology, Genetics and Microbiology. Agricultural Science also accepted as an alternative science subject.',
    },
  },
  {
    qualificationCode: 'KN-P-BS3',
    universityId: 'ukzn',
    name: 'BSc Stream M (Mathematical) — Pietermaritzburg',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Higher-Mathematics stream for majors demanding more maths (Mathematics, Statistics, Physics, Computer Science). Agricultural Science also accepted as an alternative science subject.',
    },
  },
  {
    qualificationCode: 'KN-W-BS3',
    universityId: 'ukzn',
    name: 'BSc Stream M (Mathematical) — Westville',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Higher-Mathematics stream for majors demanding more maths (Mathematics, Statistics, Physics, Computer Science). Agricultural Science also accepted as an alternative science subject.',
    },
  },

  // ─── FOCUSED / SPECIALISED BSc PROGRAMMES ──────────────────────────
  {
    qualificationCode: 'KN-P-GEO',
    universityId: 'ukzn',
    name: 'BSc Geographic Information Systems and Earth Observation',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Agricultural Science also accepted as an alternative science subject.',
    },
  },
  {
    qualificationCode: 'KN-W-BSR',
    universityId: 'ukzn',
    name: 'BSc Applied Chemistry',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Agricultural Science also accepted as an alternative science subject.',
    },
  },
  {
    qualificationCode: 'KN-P-SIK',
    universityId: 'ukzn',
    name: 'BSc Chemistry and Chemical Technology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'APS range not individually printed for this row in the source table — inferred as 28 from the shared table cell shared with BSc Applied Chemistry (48-28) directly above it. Agricultural Science also accepted as an alternative science subject.',
    },
  },
  {
    qualificationCode: 'KN-P-BSU',
    universityId: 'ukzn',
    name: 'BSc Computer Science and Information Technology — Pietermaritzburg',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Asterisked (higher-Mathematics) major. Agricultural Science also accepted as an alternative science subject.',
    },
  },
  {
    qualificationCode: 'KN-W-BSU',
    universityId: 'ukzn',
    name: 'BSc Computer Science and Information Technology — Westville',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Asterisked (higher-Mathematics) major. Agricultural Science also accepted as an alternative science subject.',
    },
  },
  {
    qualificationCode: 'KN-P-SIH',
    universityId: 'ukzn',
    name: 'BSc Crop and Horticultural Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Agricultural Science also accepted as an alternative science subject.',
    },
  },
  {
    qualificationCode: 'KN-W-BSS',
    universityId: 'ukzn',
    name: 'BSc Environmental Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Westville', 'Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Source major/CAO-code table ticks both Westville and Pietermaritzburg for this major but lists only one CAO code (KN-W-BSS) — modelled as a single dual-campus programme rather than guessing a separate Pietermaritzburg code. Explicitly named in the general APS-28 admission group. Agricultural Science also accepted as an alternative science subject.',
    },
  },
  {
    qualificationCode: 'KN-P-BES',
    universityId: 'ukzn',
    name: 'BSc Environmental Science (Grassland Science)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Explicitly named in the general APS-28 admission group. Agricultural Science also accepted as an alternative science subject.',
    },
  },
  {
    qualificationCode: 'KN-P-EES',
    universityId: 'ukzn',
    name: 'BSc Environmental and Earth Sciences',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Not individually named in the 1a/1b admission-requirements prose — APS and subject gates assumed from the general non-asterisked B Sc major pattern (APS 28, Mathematics Level 4) since this major carries no asterisk in the major-subjects table.',
    },
  },
  {
    qualificationCode: 'KN-W-BSG',
    universityId: 'ukzn',
    name: 'BSc Geological Sciences',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Westville only (major-subjects table marks Pietermaritzburg "No" for this major). Not individually named in the 1a/1b admission-requirements prose — APS and subject gates assumed from the general non-asterisked B Sc major pattern (APS 28, Mathematics Level 4).',
    },
  },
  {
    qualificationCode: 'KN-W-BSM',
    universityId: 'ukzn',
    name: 'BSc Marine Biology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Not individually named in the 1a/1b admission-requirements prose — APS and subject gates assumed from the general non-asterisked B Sc major pattern (APS 28, Mathematics Level 4).',
    },
  },
  {
    qualificationCode: 'KN-P-BSN',
    universityId: 'ukzn',
    name: 'BSc Biological Sciences — Pietermaritzburg',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Not individually named in the 1a/1b admission-requirements prose (appears only in the campus/CAO-code major table) — APS and subject gates assumed from the general non-asterisked B Sc major pattern.',
    },
  },
  {
    qualificationCode: 'KN-W-BSN',
    universityId: 'ukzn',
    name: 'BSc Biological Sciences — Westville',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Not individually named in the 1a/1b admission-requirements prose (appears only in the campus/CAO-code major table) — APS and subject gates assumed from the general non-asterisked B Sc major pattern.',
    },
  },
  {
    qualificationCode: 'KN-P-SII',
    universityId: 'ukzn',
    name: 'BSc Industrial and Applied Biotechnology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agriculture, Engineering and Science',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Not individually named in the 1a/1b admission-requirements prose or the summary APS table (appears only in the campus/CAO-code major table) — APS and subject gates assumed from the general non-asterisked B Sc major pattern.',
    },
  },
];

// UKZN — College of Health Sciences
// Source: prospectus-text/ukzn-chunks/health-summary.txt (summary table)
//       + prospectus-text/ukzn-chunks/health-detail-v2.txt (full corrected detail section,
//         pages 100-111/112, bounded from "COLLEGE OF HEALTH SCIENCES" header to just
//         before "COLLEGE OF HUMANITIES" begins)
//
// UKZN apsRule: nsc_8point scale, Life Orientation EXCLUDED from the APS total
// (individual LO subject gates below are admission GATES, not APS-contributing points).
//
// Redo result: same 13 programmes as the previous (truncated) attempt were found again
// in the corrected, complete chunk — no additional programmes exist beyond these 13 in
// the College of Health Sciences undergraduate section. See report for details.

export const UKZN_HEALTH_SCIENCES_PROGRAMMES: Programme[] = [
  // ── Bachelor of Audiology ──────────────────────────────────────────
  {
    qualificationCode: 'KN-W-BPA',
    universityId: 'ukzn',
    name: 'Bachelor of Audiology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
        { subject: 'lifeScience', status: 'alternative', minRating: 3, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 3, altGroup: 'science' },
      ],
      note: 'Only first to third choices will be considered (UKZN internal ranking — not relevant to ApplyOnce, which restricts to one programme per university).',
    },
    careers: ['Audiologist'],
  },

  // ── Bachelor of Speech-Language Therapy ────────────────────────────
  {
    qualificationCode: 'KN-W-BPB',
    universityId: 'ukzn',
    name: 'Bachelor of Speech-Language Therapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
        { subject: 'lifeScience', status: 'alternative', minRating: 3, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 3, altGroup: 'science' },
      ],
      note: 'Only first to third choices will be considered (UKZN internal ranking — not relevant to ApplyOnce).',
    },
    careers: ['Speech-Language Therapist'],
  },

  // ── Bachelor of Dental Therapy ─────────────────────────────────────
  {
    qualificationCode: 'KN-W-BDT',
    universityId: 'ukzn',
    name: 'Bachelor of Dental Therapy',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Health Sciences',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'required', minRating: 3 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
      note: 'Only first to third choices will be considered.',
    },
    careers: ['Dental Therapist'],
  },

  // ── Bachelor of Medical Science, Innovation and Entrepreneurship ──
  // Found only in the summary table — no matching detail-section prose in
  // health-detail-v2.txt (section jumps from the intro pages straight to
  // Audiology). Encoded from the summary table's stated APS + subjects only.
  {
    qualificationCode: 'KN-W-BMS-IE',
    universityId: 'ukzn',
    name: 'Bachelor of Medical Science, Innovation and Entrepreneurship',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'required', minRating: 4 },
      ],
      note: 'Only choices 1 to 3 will be considered. Life Orientation requirement not explicitly stated in the source table for this programme (unlike its siblings) — omitted rather than assumed.',
    },
  },

  // ── Bachelor of Occupational Therapy ───────────────────────────────
  {
    qualificationCode: 'KN-W-BOT',
    universityId: 'ukzn',
    name: 'Bachelor of Occupational Therapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
        { subject: 'lifeScience', status: 'alternative', minRating: 3, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 3, altGroup: 'science' },
      ],
      note: 'Only first to third choices will be considered.',
    },
    careers: ['Occupational Therapist'],
  },

  // ── Bachelor of Optometry ──────────────────────────────────────────
  {
    qualificationCode: 'KN-W-BOP',
    universityId: 'ukzn',
    name: 'Bachelor of Optometry',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'lifeScience', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
      note: 'Only first to third choices will be considered.',
    },
    careers: ['Optometrist'],
  },

  // ── Bachelor of Oral Hygiene ───────────────────────────────────────
  {
    qualificationCode: 'KN-W-BON',
    universityId: 'ukzn',
    name: 'Bachelor of Oral Hygiene',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Health Sciences',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'required', minRating: 3 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
      note: 'Only first to third choices will be considered.',
    },
    careers: ['Oral Hygienist'],
  },

  // ── Bachelor of Pharmacy ───────────────────────────────────────────
  {
    qualificationCode: 'KN-W-BPR',
    universityId: 'ukzn',
    name: 'Bachelor of Pharmacy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'lifeScience', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
      note: 'Only first to third choices will be considered.',
    },
    careers: ['Pharmacist'],
  },

  // ── Bachelor of Physiotherapy ──────────────────────────────────────
  {
    qualificationCode: 'KN-W-BPH',
    universityId: 'ukzn',
    name: 'Bachelor of Physiotherapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'lifeScience', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
      note: 'Only first to third choices will be considered. Summary table shows APS 30 but no subject detail; full requirements came from the detail-section prose (all core subjects at level 4, not level 3 as the compact summary row implies for other programmes).',
    },
    careers: ['Physiotherapist'],
  },

  // ── Bachelor of Science in Dietetics and Human Nutrition ───────────
  {
    qualificationCode: 'KN-P-BSD',
    universityId: 'ukzn',
    name: 'Bachelor of Science in Dietetics and Human Nutrition',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Pietermaritzburg campus only. Source also accepts Agricultural Science as a third alternative to Life Sciences/Physical Sciences at level 4 — no SubjectKey exists for Agricultural Science so it is not modelled here.',
    },
    careers: ['Dietitian'],
  },

  // ── Bachelor of Sport Science ──────────────────────────────────────
  {
    qualificationCode: 'KN-W-BRT',
    universityId: 'ukzn',
    name: 'Bachelor of Sport Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Health Sciences',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 3, altGroup: 'maths' },
      ],
      note: 'Selection also considers demonstrated interest in sport, rehabilitation, high performance and community leisure; not a hard admission gate.',
    },
    careers: [
      'Personal Trainer',
      'Sports Coach',
      'Health and Wellness Centre Manager',
      'Sport and Recreation Officer',
    ],
  },

  // ── Bachelor of Nursing ─────────────────────────────────────────────
  {
    qualificationCode: 'KN-H-BN1',
    universityId: 'ukzn',
    name: 'Bachelor of Nursing',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 3, altGroup: 'maths' },
      ],
      note: "Only first choice applications will be considered by UKZN (not relevant to ApplyOnce, which is one-programme-per-university already). Life Orientation points are explicitly stated as NOT included in the 30-point APS requirement, consistent with UKZN's nsc_8point scale (LO excluded from total).",
    },
    careers: ['General Nurse', 'Psychiatric Nurse', 'Midwife', 'Community Health Nurse'],
  },

  // ── Bachelor of Medicine and Bachelor of Surgery (MBChB) ───────────
  // Uses a percentage-based selection system, not the standard APS —
  // encoded via minPercentage on each SubjectRequirement rather than a
  // numeric apsMinimum (source explicitly shows APS Range = "N/A").
  {
    qualificationCode: 'KN-M-MBC',
    universityId: 'ukzn',
    name: 'Bachelor of Medicine and Bachelor of Surgery (MBChB)',
    qualificationType: 'degree',
    durationYears: 6,
    faculty: 'Health Sciences',
    campus: ['Nelson R Mandela School of Medicine'],
    closingDateOverride: '2026-06-30T23:59:00+02:00',
    admission: {
      apsMinimum: {},
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 60 },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 60 },
        { subject: 'lifeScience', status: 'required', minPercentage: 60 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Not a standard APS programme: requires a minimum of 60% in each of Mathematics, Physical Science, Life Sciences and English, with an overall aggregate of 65% across the top six subjects (excluding Life Orientation). Ranking uses the arithmetic average of six subjects including these four plus two languages. Mathematics Paper 3 is explicitly not accepted as a substitute for Mathematics. Upgraded Matric results are not accepted for MBChB — only the original Matric result is used. NBT is explicitly NOT required by UKZN Medical School (stated in source) — consistent with ApplyOnce being out of scope for NBTs anyway.',
    },
    additionalRequirements: [],
    careers: ['Medical Practitioner', 'General Practitioner', 'Medical Specialist'],
  },
];

// UKZN — College of Humanities
// Source: humanities-summary.txt (CAO summary table) + humanities-detail-v2.txt
// (corrected, fully-bounded College of Humanities detail section, pages 112-124
// of the 2027 Undergraduate Prospectus, printed page numbers 104-115).
//
// NOTE ON SCOPE: The College's detail text describes ~35 individually-named
// "major subjects" (Anthropology, Psychology, Political Science, etc.) that
// students select from WITHIN the two general-studies degrees (BA / BSocSc).
// These majors do NOT have their own CAO qualification codes — only the
// parent BA2 / SO2 codes do. Per instructions not to invent qualification
// codes, they are NOT encoded as separate Programme entries; instead the
// full major list is captured in the `note` field of the two general-studies
// programmes. Every entry below uses a REAL CAO code found in the source text.
//
// Campus-specific CAO codes (e.g. KN-H-BA2 for Howard College vs KN-P-BA2 for
// Pietermaritzburg) are real, distinct application codes, so each campus
// variant is encoded as its own Programme record rather than merged under a
// single code with a multi-value campus array.

// Shared elective gate used across most Humanities/BA/BSocSc programmes:
// "English & LO at Level 4, plus ONE of: any language HL/FAL, Business
// Studies, Consumer Studies, Dramatic Arts, Economics, Geography, History,
// Information Technology, Life Sciences, Mathematics/Mathematical Literacy,
// Music, Religion Studies, Visual Arts — at Level 5."
// Only subjects with an existing SubjectKey are encoded as SubjectRequirement
// alternatives; the rest are captured in each programme's `note`.
const HUMANITIES_ELECTIVE_NOTE =
  'Also accepts (Level 5, no SubjectKey available so not encoded as a gate): Business Studies, Consumer Studies, Dramatic Arts, Economics, History, Information Technology, Music, Religion Studies, Visual Arts.';

export const UKZN_HUMANITIES_PROGRAMMES: Programme[] = [
  // ── Bachelor of Education (Edgewood campus only) ─────────────────────
  {
    qualificationCode: 'KN-E-BFP',
    universityId: 'ukzn',
    name: 'Bachelor of Education (Foundation Phase)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Edgewood'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'isiZulu', status: 'required', minRating: 4 },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 4, altGroup: 'maths' },
        { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
      ],
      note: 'Foundation and Intermediate Phase students are expected to do English and isiZulu. Minimum rating 4 (50-59%) in Mathematical Literacy OR rating 3 (40-49%) in Mathematics. NSC must carry a Bachelors pass (or NQF L4 NCV with degree endorsement).',
    },
    careers: ['Foundation Phase Teacher'],
  },
  {
    qualificationCode: 'KN-E-BIP',
    universityId: 'ukzn',
    name: 'Bachelor of Education (Intermediate Phase)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Edgewood'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'isiZulu', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'alternative', minRating: 4, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'maths' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'twoOfFive' },
        { subject: 'physicalScience', status: 'alternative', minRating: 5, altGroup: 'twoOfFive' },
      ],
      note: 'Mathematics Level 4 or Mathematical Literacy Level 5 required. Additionally, Level 5 in any TWO of: Mathematics, Mathematical Literacy, Technology, Life Science, Physical Science (Technology has no SubjectKey mapping — not encoded as a gate). Foundation and Intermediate Phase students are expected to do English and isiZulu.',
    },
    careers: ['Intermediate Phase Teacher'],
  },
  {
    qualificationCode: 'KN-E-BSN/FET',
    universityId: 'ukzn',
    name: 'Bachelor of Education (Senior Phase & Further Education and Training)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Edgewood'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Level 5 in any TWO NSC subjects pertaining to the teaching-subject package selected (subject pairing varies by specialisation — not individually enumerated in source text).',
    },
    careers: ['Senior Phase Teacher', 'FET Phase Teacher (Grades 10-12)'],
  },

  // ── Bachelor of Arts — General Studies ───────────────────────────────
  {
    qualificationCode: 'KN-H-BA2',
    universityId: 'ukzn',
    name: 'Bachelor of Arts (General Studies)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
      ],
      note: `Consists of two majors plus free elective modules. Available majors (Howard College): Anthropology, Community Development, Criminology, Cultural and Heritage Tourism, Development Studies, Drama and Performance Studies, Economic History, English Studies, Fine Art, French, Greek, History, Industrial Psychology, IsiZulu, Latin, Media and Cultural Studies, Philosophy, Political Science, Psychology, Religion, Sociology; plus Economics, Geography, HR Management, Information Systems and Technology, Legal Studies, Management, Marketing (from other Colleges). Alternative Senior Certificate route: Matriculation Endorsement with at least 32 points. ${HUMANITIES_ELECTIVE_NOTE}`,
    },
  },
  {
    qualificationCode: 'KN-P-BA2',
    universityId: 'ukzn',
    name: 'Bachelor of Arts (General Studies)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
      ],
      note: `Consists of two majors plus free elective modules. Available majors (Pietermaritzburg): Anthropology, Drama and Performance Studies, English Studies, French, Greek, History, Industrial/Organisational and Labour Studies, IsiZulu, Latin, Linguistics, Media and Cultural Studies, Philosophy, Political Science, Psychology, Religion, Sociology, Theology, Biblical Studies, Classical Civilisation, Ethics Studies, Digital Arts; plus Economics, Geography, HR Management, Legal Studies (from other Colleges). Alternative Senior Certificate route: Matriculation Endorsement with at least 32 points. ${HUMANITIES_ELECTIVE_NOTE}`,
    },
  },

  // ── Bachelor of Arts — Music ─────────────────────────────────────────
  {
    qualificationCode: 'KN-H-BAM',
    universityId: 'ukzn',
    name: 'Bachelor of Arts in Music',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Students may specialise in Performance, Theory and Composition, or Research, while also carrying a second non-musical major. Can be structured to meet PGCE requirements for those intending to teach.',
    },
    additionalRequirements: ['audition'],
    careers: ['Musician', 'Music Educator', 'Composer'],
  },
  {
    qualificationCode: 'KN-H-BMX',
    universityId: 'ukzn',
    name: 'Bachelor of Arts in Music (Foundation)',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Howard College'],
    isECP: true,
    admission: {
      apsMinimum: { default: 22 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Foundation (extended, 4-year) entry route into the BA in Music for applicants below the standard BA in Music APS threshold.',
    },
    additionalRequirements: ['audition'],
    careers: ['Musician', 'Music Educator', 'Composer'],
  },

  // ── Bachelor of Social Science — General Studies ─────────────────────
  {
    qualificationCode: 'KN-H-SO2',
    universityId: 'ukzn',
    name: 'Bachelor of Social Science (General Studies)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
      ],
      note: `Consists of two majors plus a group of cognate electives. Available majors (Howard College): Anthropology, Community Development, Criminology, Cultural and Heritage Tourism, Development Studies, Industrial Psychology, Political Science, Psychology, Sociology; plus Computer Science, Economics, Geography, HR Management, Information Systems and Technology, Legal Studies, Management, Marketing. ${HUMANITIES_ELECTIVE_NOTE}`,
    },
  },
  {
    qualificationCode: 'KN-P-SO2',
    universityId: 'ukzn',
    name: 'Bachelor of Social Science (General Studies)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
      ],
      note: `Consists of two majors plus a group of cognate electives. Available majors (Pietermaritzburg): Anthropology, Political Science, Psychology, Sociology; plus Economics, Geography, HR Management, Legal Studies. ${HUMANITIES_ELECTIVE_NOTE}`,
    },
  },

  // ── Structured BSocSc — Geography & Environmental Management ─────────
  {
    qualificationCode: 'KN-H-SGE',
    universityId: 'ukzn',
    name: 'Bachelor of Social Science (Geography and Environmental Management)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
      ],
      note: `Core of Geography and Environmental Science modules plus environmental management skills. Not a formal requirement, but highly recommended that both Mathematics and Geography were taken as Grade 12 subjects. ${HUMANITIES_ELECTIVE_NOTE}`,
    },
    careers: ['Environmental Management Practitioner'],
  },
  {
    qualificationCode: 'KN-P-SGE',
    universityId: 'ukzn',
    name: 'Bachelor of Social Science (Geography and Environmental Management)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
      ],
      note: `Core of Geography and Environmental Science modules plus environmental management skills. Not a formal requirement, but highly recommended that both Mathematics and Geography were taken as Grade 12 subjects. ${HUMANITIES_ELECTIVE_NOTE}`,
    },
    careers: ['Environmental Management Practitioner'],
  },

  // ── Structured BSocSc — Housing (Howard College only) ────────────────
  {
    qualificationCode: 'KN-H-SOR',
    universityId: 'ukzn',
    name: 'Bachelor of Social Science (Housing)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
      ],
      note: 'Mathematics specifically required at Level 4 (Mathematical Literacy is not an accepted alternative for this programme). Includes prescribed modules in Economics, Business Studies, Commercial Law and Management, taught within the School of Planning and Housing. Graduates may progress to a Masters in Housing.',
    },
    careers: ['Housing Practitioner', 'Property Manager'],
  },

  // ── Bachelor of Social Work ───────────────────────────────────────────
  {
    qualificationCode: 'KN-H-BSX',
    universityId: 'ukzn',
    name: 'Bachelor of Social Work',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
      ],
      note: `28/30 points do not guarantee acceptance due to limited space. Applicants with Mature Age Exemption may be admitted. Registerable with the South African Council for Social Service Professionals (SACSSP) on graduation. ${HUMANITIES_ELECTIVE_NOTE}`,
    },
    careers: ['Social Worker'],
  },

  // ── BA Philosophy, Politics & Law ─────────────────────────────────────
  {
    qualificationCode: 'KN-H-ABP',
    universityId: 'ukzn',
    name: 'BA Philosophy, Politics & Law',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
      ],
      note: `An APS of at least 30 is required to register for ANY Law modules in the College of Humanities (applies to PPL, a Legal Studies major, or Law electives for BA/BSocSc). Involves majoring in one or more of Philosophy, Politics and Law, with the remainder structured from the other two disciplines plus electives. ${HUMANITIES_ELECTIVE_NOTE}`,
    },
    careers: ['Legal career pathway', 'Public management'],
  },
  {
    qualificationCode: 'KN-P-ABP',
    universityId: 'ukzn',
    name: 'BA Philosophy, Politics & Law',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
      ],
      note: `An APS of at least 30 is required to register for ANY Law modules in the College of Humanities (applies to PPL, a Legal Studies major, or Law electives for BA/BSocSc). Involves majoring in one or more of Philosophy, Politics and Law, with the remainder structured from the other two disciplines plus electives. ${HUMANITIES_ELECTIVE_NOTE}`,
    },
    careers: ['Legal career pathway', 'Public management'],
  },

  // ── BA Visual Art (Pietermaritzburg only) ─────────────────────────────
  {
    qualificationCode: 'KN-P-AAV',
    universityId: 'ukzn',
    name: 'BA Visual Art',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Full programme of studio-based courses (drawing, painting, ceramics, printmaking, computer-generated imagery) and Art History. Most candidates have studied Art for Grade 12, but this is not a strict requirement — introductory courses available for those who have not.',
    },
    careers: ['Art Educator', 'Designer', 'Animator', 'Museum Professional', 'Illustrator'],
  },

  // ── BSocSc Government, Business & Ethics (Pietermaritzburg only) ─────
  {
    qualificationCode: 'KN-P-SOG',
    universityId: 'ukzn',
    name: 'Bachelor of Social Science (Government, Business and Ethics)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
        { subject: 'homeLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minRating: 5,
          altGroup: 'elective',
        },
      ],
      note: `Combines training in government and business fields with a foundation in ethics, aiming for flexibility across education, public service and entrepreneurial career paths. ${HUMANITIES_ELECTIVE_NOTE}`,
    },
  },

  // ── Humanities Extended Curriculum Programme ─────────────────────────
  {
    qualificationCode: 'KN-H-SO4',
    universityId: 'ukzn',
    name: 'Humanities Extended Curriculum Programme',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Howard College'],
    isECP: true,
    firstTimeEntrantsOnly: true,
    admission: {
      apsMinimum: { default: 20 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'For applicants from disadvantaged contexts with scores ranging from 20 to 27 (or 24 to 31, depending on category). Only applicants from Schools with quintiles 1 and 2 will be considered. Applicants who have attended university or any other tertiary institution for at least one complete semester will not be admitted to the ECP.',
    },
  },
  {
    qualificationCode: 'KN-P-SO4',
    universityId: 'ukzn',
    name: 'Humanities Extended Curriculum Programme',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Pietermaritzburg'],
    isECP: true,
    firstTimeEntrantsOnly: true,
    admission: {
      apsMinimum: { default: 20 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'For applicants from disadvantaged contexts with scores ranging from 20 to 27 (or 24 to 31, depending on category). Only applicants from Schools with quintiles 1 and 2 will be considered. Applicants who have attended university or any other tertiary institution for at least one complete semester will not be admitted to the ECP.',
    },
  },
];

// UKZN — College of Law and Management Studies
// Source: UKZN Undergraduate Prospectus 2027, pages 108-127 (summary table p.20-ish +
// detailed College of Law and Management Studies section p.116-124).
// All qualificationCodes below are REAL CAO codes printed in the prospectus — none synthesized.
// Two-campus offerings (e.g. LLB at Howard College AND Pietermaritzburg) are split into
// separate Programme entries, one per campus, because each campus has its own distinct
// real CAO code and qualificationCode is the Programme primary key.
// UKZN excludes Life Orientation from APS entirely (no bonus point) — handled at the
// University/ApsRule level (scale: 'nsc_8point', includesLifeOrientation: false). The
// apsMinimum numbers below are as printed (already "excluding Life Orientation").

export const UKZN_LAW_MANAGEMENT_PROGRAMMES: Programme[] = [
  // ── Bachelor of Laws (LLB) — full-time, Howard College ─────────────────────
  {
    qualificationCode: 'KN-H-BL1',
    universityId: 'ukzn',
    name: 'Bachelor of Laws (LLB)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Law and Management Studies',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        {
          subject: 'english',
          status: 'required',
          homeLanguageRating: 5,
          additionalLanguageRating: 6,
        },
        { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'maths' },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Minimum APS of 32 (excluding Life Orientation). English Home Language Level 5, OR English First Additional Language Level 6.',
    },
    careers: ['Advocate', 'Attorney', 'Legal Advisor'],
  },
  // ── Bachelor of Laws (LLB) — full-time, Pietermaritzburg ────────────────────
  {
    qualificationCode: 'KN-P-BL1',
    universityId: 'ukzn',
    name: 'Bachelor of Laws (LLB)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Law and Management Studies',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        {
          subject: 'english',
          status: 'required',
          homeLanguageRating: 5,
          additionalLanguageRating: 6,
        },
        { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'maths' },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Minimum APS of 32 (excluding Life Orientation). English Home Language Level 5, OR English First Additional Language Level 6.',
    },
    careers: ['Advocate', 'Attorney', 'Legal Advisor'],
  },
  // ── Bachelor of Laws (LLB) — part-time, Howard College ──────────────────────
  {
    qualificationCode: 'KN-H-BLZ',
    universityId: 'ukzn',
    name: 'Bachelor of Laws (LLB) (Part-time)',
    qualificationType: 'degree',
    durationYears: 6,
    faculty: 'Law and Management Studies',
    campus: ['Howard College'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        {
          subject: 'english',
          status: 'required',
          homeLanguageRating: 5,
          additionalLanguageRating: 6,
        },
        { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'maths' },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Same entrance requirements as the full-time LLB. Part-time study over 12 semesters (6 years); Howard College does not otherwise offer part-time (evening) classes.',
    },
    careers: ['Advocate', 'Attorney', 'Legal Advisor'],
  },

  // ── Bachelor of Administration — Westville ──────────────────────────────────
  {
    qualificationCode: 'KN-W-BAD',
    universityId: 'ukzn',
    name: 'Bachelor of Administration',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Law and Management Studies',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Allows specialisation in Human Resource Management, Management or Public Administration. Applicants with APS 32 (English & Life Orientation Level 4, Mathematics Level 3) considered for early selection.',
    },
    careers: ['Public Administrator', 'Human Resource Officer', 'Management Practitioner'],
  },

  // ── Bachelor of Business Administration (evening classes) — Pietermaritzburg ─
  {
    qualificationCode: 'KN-P-BBA',
    universityId: 'ukzn',
    name: 'Bachelor of Business Administration',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Law and Management Studies',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [
        {
          subject: 'english',
          status: 'required',
          homeLanguageRating: 4,
          additionalLanguageRating: 4,
        },
        { subject: 'mathematics', status: 'required', minRating: 3 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Requires a prior NSC Bachelor’s degree pass. Evening classes only; no funding available for this programme (3-4 year qualification). Grade 12 applicants who do not meet the BBA criteria may instead be considered for the CBA route (Mathematics Level 2 (no Mathematical Literacy), English & Life Orientation Level 4, 24 points excl. LO).',
    },
    careers: ['Business Manager', 'Management Consultant'],
  },
  // ── Bachelor of Business Administration (evening classes) — Westville ───────
  {
    qualificationCode: 'KN-W-BBA',
    universityId: 'ukzn',
    name: 'Bachelor of Business Administration',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Law and Management Studies',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [
        {
          subject: 'english',
          status: 'required',
          homeLanguageRating: 4,
          additionalLanguageRating: 4,
        },
        { subject: 'mathematics', status: 'required', minRating: 3 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Requires a prior NSC Bachelor’s degree pass. Evening classes only; no funding available for this programme (3-4 year qualification). Grade 12 applicants who do not meet the BBA criteria may instead be considered for the CBA route (Mathematics Level 2 (no Mathematical Literacy), English & Life Orientation Level 4, 24 points excl. LO).',
    },
    careers: ['Business Manager', 'Management Consultant'],
  },

  // ── Bachelor of Business Science in Finance — Westville ─────────────────────
  {
    qualificationCode: 'KN-W-B5F',
    universityId: 'ukzn',
    name: 'Bachelor of Business Science (Finance)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Law and Management Studies',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Honours-equivalent, high-performing-student programme with heavier mathematical/statistical emphasis than the BCom. Applicants with APS 37 (English & Life Orientation Level 4, Mathematics Level 6) considered for early selection. Candidates not meeting the Mathematics requirement are advised toward the College’s Alternative Access Programmes.',
    },
    careers: [
      'Chartered Financial Analyst',
      'Investment Analyst',
      'Certified Financial Planner',
      'Economist',
    ],
  },
  // ── Bachelor of Business Science in Investment Science — Westville ──────────
  {
    qualificationCode: 'KN-W-B5I',
    universityId: 'ukzn',
    name: 'Bachelor of Business Science (Investment Science)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Law and Management Studies',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Honours-equivalent, high-performing-student programme with heavier mathematical/statistical emphasis than the BCom. Applicants with APS 37 (English & Life Orientation Level 4, Mathematics Level 6) considered for early selection. Candidates not meeting the Mathematics requirement are advised toward the College’s Alternative Access Programmes.',
    },
    careers: [
      'Chartered Financial Analyst',
      'Investment Analyst',
      'Certified Financial Planner',
      'Economist',
    ],
  },

  // ── Bachelor of Commerce (General) — Pietermaritzburg ───────────────────────
  {
    qualificationCode: 'KN-P-BC1',
    universityId: 'ukzn',
    name: 'Bachelor of Commerce (General)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Law and Management Studies',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Allows specialisation in Economics, Finance, Human Resource Management, Information Systems, Management, Marketing or Supply Chain Management. Applicants with APS 35 (English, Life Orientation and Mathematics Level 5) considered for early selection.',
    },
    careers: ['Business Manager', 'Economist', 'Marketing Professional'],
  },
  // ── Bachelor of Commerce (General) — Westville ──────────────────────────────
  {
    qualificationCode: 'KN-W-BC1',
    universityId: 'ukzn',
    name: 'Bachelor of Commerce (General)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Law and Management Studies',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Allows specialisation in Economics, Finance, Human Resource Management, Information Systems, Management, Marketing or Supply Chain Management. Applicants with APS 35 (English, Life Orientation and Mathematics Level 5) considered for early selection.',
    },
    careers: ['Business Manager', 'Economist', 'Marketing Professional'],
  },

  // ── Bachelor of Commerce in Accounting — Pietermaritzburg ───────────────────
  {
    qualificationCode: 'KN-P-BCN',
    universityId: 'ukzn',
    name: 'Bachelor of Commerce in Accounting',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Law and Management Studies',
    campus: ['Pietermaritzburg'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Specifically designed to prepare students for a career as a professional accountant. Applicants with APS 35 (English, Life Orientation and Mathematics Level 5) considered for early selection.',
    },
    careers: ['Professional Accountant'],
  },
  // ── Bachelor of Commerce in Accounting — Westville ──────────────────────────
  {
    qualificationCode: 'KN-W-BCN',
    universityId: 'ukzn',
    name: 'Bachelor of Commerce in Accounting',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Law and Management Studies',
    campus: ['Westville'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Specifically designed to prepare students for a career as a professional accountant. Applicants with APS 35 (English, Life Orientation and Mathematics Level 5) considered for early selection.',
    },
    careers: ['Professional Accountant'],
  },

  // ── BCom 4 General (Extended Curriculum) — Pietermaritzburg — ECP/safety tier ─
  {
    qualificationCode: 'KN-P-BCG',
    universityId: 'ukzn',
    name: 'Bachelor of Commerce (General) — Extended Curriculum',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Law and Management Studies',
    campus: ['Pietermaritzburg'],
    firstTimeEntrantsOnly: true,
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Standard 3-year BCom (General) extended over 4 years. For applicants from Quintile 1–3 schools. Students who have attended university or any other tertiary institution (degree or access programme) for a complete semester will not be admitted.',
    },
    careers: ['Business Manager', 'Economist'],
  },
  // ── BCom 4 General (Extended Curriculum) — Westville — ECP/safety tier ──────
  {
    qualificationCode: 'KN-W-BCG',
    universityId: 'ukzn',
    name: 'Bachelor of Commerce (General) — Extended Curriculum',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Law and Management Studies',
    campus: ['Westville'],
    firstTimeEntrantsOnly: true,
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Standard 3-year BCom (General) extended over 4 years. For applicants from Quintile 1–3 schools. Students who have attended university or any other tertiary institution (degree or access programme) for a complete semester will not be admitted.',
    },
    careers: ['Business Manager', 'Economist'],
  },

  // ── BCom 4 Accounting (Extended Curriculum) — Pietermaritzburg — ECP/safety tier ─
  {
    qualificationCode: 'KN-P-BCO',
    universityId: 'ukzn',
    name: 'Bachelor of Commerce in Accounting — Extended Curriculum',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Law and Management Studies',
    campus: ['Pietermaritzburg'],
    firstTimeEntrantsOnly: true,
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Standard 3-year BCom Accounting extended over 4 years. For applicants from Quintile 1–3 schools. Students who have attended university or any other tertiary institution (degree or access programme) for a complete semester will not be admitted.',
    },
    careers: ['Professional Accountant'],
  },
  // ── BCom 4 Accounting (Extended Curriculum) — Westville — ECP/safety tier ───
  {
    qualificationCode: 'KN-W-BCO',
    universityId: 'ukzn',
    name: 'Bachelor of Commerce in Accounting — Extended Curriculum',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Law and Management Studies',
    campus: ['Westville'],
    firstTimeEntrantsOnly: true,
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeOrientation', status: 'required', minRating: 4 },
      ],
      note: 'Standard 3-year BCom Accounting extended over 4 years. For applicants from Quintile 1–3 schools. Students who have attended university or any other tertiary institution (degree or access programme) for a complete semester will not be admitted.',
    },
    careers: ['Professional Accountant'],
  },
];

export const UKZN: University = {
  id: 'ukzn',
  name: 'University of KwaZulu-Natal',
  shortName: 'UKZN',
  logoUrl: '/logos/ukzn.png',
  applicationSystem: 'CAO',
  applicationFee: 210,
  feeNote:
    'R210 on-time direct-to-UKZN application (R420 late). First-time SA undergrad applicants alternatively apply via the CAO (Central Applications Office) for R250 before 31 October 2026 (R470 late), which also covers other KZN institutions — CAO admin fee is separate from and not doubled with the direct UKZN fee.',
  maxChoices: 1,
  choicesRanked: false,
  choicesIndependent: true,
  choicesFinal: true,
  apsRule: {
    method: 'custom',
    subjectsCounted: 6,
    includesLifeOrientation: false,
    scale: 'nsc_8point',
    note: 'Six best subjects (Life Orientation excluded, no points allocated for it) converted via an 8-point table: NSC Level 7 at 90-100% = APS 8, Level 7 at 80-89% = APS 7, Level 6 = APS 6, down to Level 1 = 0. Max APS = 48. Mathematics Paper 3 is not counted. Meeting the minimum does not guarantee admission — selection is merit-ranked.',
  },
  applicationsOpen: '2026',
  defaultClosingDate: '2026-09-30T23:59:00+02:00',
  applyUrl: 'https://www.ukzn.ac.za',
  notes: [
    'The CAO (shared with other KZN institutions) allows six ranked choices — ApplyOnce restricts every student to ONE programme per university (a platform-wide rule), so maxChoices is set to 1 regardless.',
    "MBChB closes 30 June 2026 (earlier than all other programmes, which close 30 September 2026) and uses a percentage-aggregate gate (60% per subject, 65% aggregate) rather than the standard APS scale — captured in that programme's note since the schema does not have a per-programme alternate scale mechanism.",
    'Some programmes with identical qualifications are offered on multiple campuses under DISTINCT real CAO codes (e.g. Civil Engineering at Howard College vs Pietermaritzburg) — each is modelled as its own Programme entry rather than merged, since qualificationCode is the primary key and each code is a separately trackable real application path.',
  ],
  programmes: [
    ...UKZN_AES_PROGRAMMES,
    ...UKZN_HEALTH_SCIENCES_PROGRAMMES,
    ...UKZN_HUMANITIES_PROGRAMMES,
    ...UKZN_LAW_MANAGEMENT_PROGRAMMES,
  ],
  type: 'traditional',
  city: 'Durban',
  province: 'kwazulu_natal',
  website: 'https://www.ukzn.ac.za',
  applicationPortal: 'https://www.ukzn.ac.za',
};
