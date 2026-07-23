// src/constants/universities.ts
// University and Programme data for all 26 South African public universities
// UJ and Wits are fully detailed reference implementations
// Other universities are placeholders pending prospectus data

import { University, Programme } from '../types/university';

// ─── UNIVERSITY OF JOHANNESBURG (UJ) ────────────────────────────────────────

const UJ: University = {
  id: 'uj',
  name: 'University of Johannesburg',
  shortName: 'UJ',
  applicationSystem: 'Custom portal',
  applicationFee: 0,
  feeNote: 'No application fee for online or paper applications. The flat ApplyOnce service fee still applies.',
  maxChoices: 2,
  choicesRanked: false,
  choicesIndependent: true,
  choicesFinal: true,
  apsRule: {
    method: 'standard_aps',
    subjectsCounted: 6,
    includesLifeOrientation: false,
    scale: 'nsc_7point',
    note: 'Six best subjects, Life Orientation excluded. UJ ranks all applicants by APS in January and selects down to capacity.',
  },
  applicationsOpen: '2026-04',
  defaultClosingDate: '2026-10-31T12:00:00+02:00',
  applyUrl: 'https://www.uj.ac.za/Apply',
  notes: [
    'Meeting the minimum does not guarantee a place (capacity-ranked).',
    'Provisional admission on final Grade 11; final admission on final Grade 12.',
  ],
  programmes: [
    // Flat APS, hard subject gates
    {
      qualificationCode: 'B8BA3Q',
      universityId: 'uj',
      name: 'Bachelor of Architecture',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Art, Design and Architecture',
      campus: ['APB'],
      admission: {
        apsMinimum: { default: 30 },
        subjectRequirements: [
          { subject: 'english', status: 'required', minRating: 5 },
          { subject: 'mathematics', status: 'required', minRating: 5 },
          { subject: 'mathematicalLiteracy', status: 'not_accepted' },
          { subject: 'technicalMathematics', status: 'not_accepted' },
        ],
      },
      careers: ['Architectural professional'],
    },
    // Conditional APS (branches by maths type) + maths/maths-lit alternatives
    {
      qualificationCode: 'B8CD2Q',
      universityId: 'uj',
      name: 'BA (Communication Design)',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Art, Design and Architecture',
      campus: ['APB'],
      admission: {
        apsMinimum: { withMathematics: 25, withMathematicalLiteracy: 26 },
        subjectRequirements: [
          { subject: 'english', status: 'required', minRating: 5 },
          { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
          { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 4, altGroup: 'maths' },
          { subject: 'technicalMathematics', status: 'not_accepted' },
        ],
      },
      careers: ['Communication Designer'],
    },
    // Maths-ONLY gate + dual-language requirement
    {
      qualificationCode: 'B4C01Q',
      universityId: 'uj',
      name: 'BCom (Law)',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Law',
      campus: ['APK'],
      admission: {
        apsMinimum: { withMathematics: 31 },
        subjectRequirements: [
          { subject: 'english', status: 'required', minRating: 5 },
          { subject: 'additionalLanguage', status: 'required', minRating: 4 },
          { subject: 'mathematics', status: 'required', minRating: 4 },
          { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        ],
        note: 'Faculty of Law does not accept NCV, NASCA or ASC.',
      },
      careers: ['Legal Advisor', 'Career in Commerce'],
    },
    // High-APS reach example
    {
      qualificationCode: 'B2M52Q',
      universityId: 'uj',
      name: 'BSc Actuarial Science',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Science',
      campus: ['APK'],
      admission: {
        apsMinimum: { default: 40 },
        subjectRequirements: [
          { subject: 'english', status: 'required', minRating: 5 },
          { subject: 'mathematics', status: 'required', minRating: 7 },
          { subject: 'technicalMathematics', status: 'not_accepted' },
          { subject: 'technicalScience', status: 'not_accepted' },
        ],
      },
      careers: ['Actuary', 'Quantitative Analyst', 'Risk Manager'],
    },
    // Extended programme — safety-tier example
    {
      qualificationCode: 'D34PEQ',
      universityId: 'uj',
      name: 'Extended Diploma in People Management',
      qualificationType: 'extended_diploma',
      durationYears: 4,
      faculty: 'College of Business and Economics',
      campus: ['SWC'],
      firstTimeEntrantsOnly: true,
      admission: {
        apsMinimum: { withMathematics: 19, withMathematicalLiteracy: 21 },
        subjectRequirements: [
          { subject: 'english', status: 'required', minRating: 4 },
          { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
          { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 4, altGroup: 'maths' },
        ],
      },
      careers: ['People Management Practitioner', 'HR Officer'],
    },
  ],
  // Legacy fields
  type: 'comprehensive',
  city: 'Johannesburg',
  province: 'gauteng',
  website: 'https://www.uj.ac.za',
  applicationPortal: 'https://www.uj.ac.za/apply',
};

// ─── UNIVERSITY OF THE WITWATERSRAND (WITS) ─────────────────────────────────

const WITS: University = {
  id: 'wits',
  name: 'University of the Witwatersrand',
  shortName: 'Wits',
  applicationSystem: 'Custom portal',
  applicationFee: 100,
  feeNote: 'R100 flat for all applicants.',
  maxChoices: 3,
  choicesRanked: false,
  choicesIndependent: true,
  choicesFinal: false,
  apsRule: {
    method: 'standard_aps',
    subjectsCounted: 7,
    includesLifeOrientation: true,
    scale: 'nsc_7point',
    note: 'Best 7 subjects INCLUDING Life Orientation. Faculty of Health Sciences uses a Composite Index (school results + NBT), NOT plain APS.',
  },
  applicationsOpen: '2026',
  defaultClosingDate: '2026-09-30T23:59:00+02:00',
  applyUrl: 'https://www.wits.ac.za/applications',
  notes: [
    'Closing dates VARY by programme — see closingDateOverride.',
    '30 June 2026 group: all Health Sciences programmes, Bachelor of Architectural Studies, Bachelor of Audiology, Bachelor of Speech-Language Pathology, BA Film and Television.',
    'Wait-listing is part of selection; meeting the minimum may mean wait-list, not accept.',
  ],
  programmes: [
    // Standard threshold + wait-list band
    {
      qualificationCode: 'CBA00',
      universityId: 'wits',
      name: 'Bachelor of Commerce (General)',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Commerce, Law and Management',
      campus: ['Braamfontein'],
      admission: {
        apsMinimum: { default: 38 },
        subjectRequirements: [
          { subject: 'english', status: 'required', homeLanguageRating: 5, additionalLanguageRating: 5 },
          { subject: 'mathematics', status: 'required', minRating: 5 },
        ],
        waitlistBand: {
          apsRange: [35, 37],
          conditions: ['English Level 5', 'Mathematics Level 5', 'subject to available places'],
        },
      },
      careers: ['Professional Accountant', 'Management Consultant'],
    },
    // Dual-maths alternative + higher English + wait-list
    {
      qualificationCode: 'WITS-LLB',
      universityId: 'wits',
      name: 'Bachelor of Laws (LLB)',
      qualificationType: 'degree',
      durationYears: 4,
      faculty: 'Commerce, Law and Management',
      campus: ['Braamfontein'],
      additionalRequirements: ['NBT'],
      admission: {
        apsMinimum: { default: 46 },
        subjectRequirements: [
          { subject: 'english', status: 'required', homeLanguageRating: 6, additionalLanguageRating: 6 },
          { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'maths' },
          { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 6, altGroup: 'maths' },
        ],
        waitlistBand: {
          apsRange: [40, 45],
          conditions: ['English Level 6'],
        },
      },
      careers: ['Advocate', 'Attorney', 'Legal Advisor'],
    },
    // Closing-date override + placeholder requirements
    {
      qualificationCode: 'WITS-BAS',
      universityId: 'wits',
      name: 'Bachelor of Architectural Studies',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Engineering and the Built Environment',
      campus: ['Braamfontein'],
      closingDateOverride: '2026-06-30T23:59:00+02:00',
      additionalRequirements: ['portfolio'],
      admission: {
        apsMinimum: { default: 0 },
        subjectRequirements: [],
        note: 'Placeholder — requirements not yet available. Populate from prospectus before going live.',
      },
    },
  ],
  type: 'traditional',
  city: 'Johannesburg',
  province: 'gauteng',
  website: 'https://www.wits.ac.za',
  applicationPortal: 'https://www.wits.ac.za/apply-online',
};


// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSITY OF CAPE TOWN (UCT) — full reference implementation
// ═══════════════════════════════════════════════════════════════════════════
// UCT's admission model differs fundamentally from UJ/Wits: APS is a raw
// percentage score out of 600 (not a 1-7 point scale), and most faculties
// convert it into a Faculty Points Score (FPS) before applying a 3-tier
// Band A/B/C admission system (guaranteed / likely / possible-EDU-only).
// NBTs (National Benchmark Tests) are OUT OF SCOPE for ApplyOnce's MVP —
// every UCT programme below carries additionalRequirements: ['NBT'] as an
// informational flag only; Band B/C thresholds (which depend on NBT/WPS
// data this platform never collects) are documented in each programme's
// admission.note rather than modelled as computable logic.
// Source: docs/prospectuses/uct/ (UCT 2027 Undergraduate Prospectus).

// UCT — Faculty of Commerce — extracted from the 2027 Undergraduate Prospectus
// (OCR chunk: pages 23-31, "prospectus-text/uct-commerce.txt")
//
// This file is NOT wired into the monorepo — it will be spliced into
// packages/shared/src/constants/universities.ts by hand. Import path below
// is illustrative only and does not need to resolve.
// import { Programme } from '@applyonce/shared/types/university';
//
// ─── HOW TO READ UCT'S NUMBERS (see university.ts ApsRule.facultyScoring) ───
// UCT's base APS is a percentage score out of 600 (English + 5 best other
// subjects, raw %, LO excluded, <40% scores 0). For Commerce, Faculty Points
// Score (FPS) = APS unchanged (still /600). Each specialisation GROUP below
// publishes its own three-tier band:
//   Band A (FPS threshold)  -> guaranteed admission
//   Band B (WPS threshold)  -> likely admission (WPS = FPS + disadvantage-factor% x FPS)
//   Band C (lower FPS)      -> possible admission, EDU ONLY, SA redress applicants only
// NBTs are OUT OF SCOPE for this MVP (never collected/evaluated by the
// platform), so Band B/C are NOT modelled as computable logic here. Per the
// founder's decision:
//   - admission.apsMinimum.default = Band A's FPS threshold, scoreType: 'FPS'
//   - additionalRequirements: ['NBT'] on every Commerce programme (mandatory
//     per prospectus: "ALL APPLICANTS TO COMMERCE ... MUST WRITE THE NBTS")
//   - admission.note carries a short pointer to Band B/C for context only
//
// ─── BCom vs BBusSc ───────────────────────────────────────────────────────
// "Entry requirements are the same for both degrees" (p.24) — BBusSc is the
// 4-year version of the same specialisation, BCom the 3-year version, same
// FPS/WPS/subject thresholds. Rather than duplicate every specialisation at
// both durations, most specialisations below are encoded ONCE as BCom (3yr);
// a couple of representative BBusSc entries are included where the
// specialisation is BBusSc-only in the prospectus text (Computer Science,
// Statistics & Data Science, Organisational Psychology) or to illustrate the
// 4-year twin (Actuarial Science). This is a judgement call to avoid
// mechanically doubling every entry — noted per-programme below.
//
// ─── Group membership (page 27-28 of the chunk) ────────────────────────────
// Group 1 "All specialisations except Actuarial Science, Computer Science,
//          Statistics & Data Science": Mathematics 60%, English HL 50% /
//          English FAL 60%. Band A FPS>=435, Band B WPS>=470, Band C FPS 430-434.
// Group 2 "ONLY Computer Science & Statistics and Data Science": Mathematics
//          70%, English HL 50% / FAL 60%. Same FPS/WPS/BandC thresholds as
//          Group 1 (435/470/430-434) — only the Maths % is higher.
// Group 3 "ONLY Actuarial Science and Quantitative Finance": Mathematics 80%,
//          English HL 60% / FAL 80% (FAL applicants also need NBT AL&QL
//          "Proficient" rather than "Upper Intermediate" — noted in
//          admission.note since NBT levels aren't modelled). Band A FPS>=500,
//          Band B WPS>=525, Band C FPS 475-479.
//
// English HL vs FAL: the schema's SubjectKey has no distinct
// englishHomeLanguage/englishAdditionalLanguage key (only a generic
// 'english' that matches either), so the HL/FAL alternative is modelled as
// two SubjectRequirement entries sharing subject: 'english' and an altGroup,
// distinguished only by the inline comment and minPercentage. This is the
// closest fit the schema allows — see per-programme comments.
//
// Mathematics vs Mathematical Literacy: the prospectus names "Mathematics"
// specifically (never "Mathematics or Mathematical Literacy") for every
// Commerce band table, so mathematicalLiteracy is encoded as not_accepted.
// This is a judgement call (not verbatim in the text) but matches UCT's
// well-established mainstream-Commerce policy and the internal consistency
// of the source (Mathematics is the only maths subject ever named).
//
// Excluded on purpose: Advanced Diploma in Actuarial Science and Advanced
// Diploma in Accounting (pages 28/31) both require an ALREADY-COMPLETED
// undergraduate degree as their entry qualification — they are not
// matric-entry programmes and don't fit our NSC-subject/APS schema or this
// platform's target applicant (school-leavers with final NSC results, not
// people who already hold a degree). Omitted rather than force-fit.

export const UCT_COMMERCE_PROGRAMMES: Programme[] = [
  // ═══════════════════════════════════════════════════════════════════
  // GROUP 1 — all specialisations except Actuarial Science, Computer
  // Science, Statistics & Data Science. Mathematics 60%, English HL 50%
  // or FAL 60%. FPS 435 (Band A) / WPS 470 (Band B) / FPS 430-434 (Band C,
  // EDU only, SA redress applicants only).
  // ═══════════════════════════════════════════════════════════════════

  {
    qualificationCode: 'UCT-COM-BCOM-ACC-GEN',
    universityId: 'uct',
    name: 'BCom Financial Accounting (General)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 435, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        // English HL 50% OR English FAL 60% — see file header note.
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' }, // as Home Language
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' }, // as First Additional Language
      ],
      note: 'FPS 435 = Band A (guaranteed admission). Band B (WPS 470, likely admission) and Band C (FPS 430-434, Education Development Unit only, SA redress applicants only) also exist but are not modelled — NBTs are out of scope for this platform.',
    },
    additionalRequirements: ['NBT'],
    careers: ['General Accountant', 'Financial Consultant', 'Internal Auditor'],
    note: 'Leads toward international designations (e.g. ACCA, CIMA) rather than SAICA CA(SA) — see Financial Accounting: Chartered Accountant for the CA(SA) path.',
  },
  {
    qualificationCode: 'UCT-COM-BCOM-ACC-CA',
    universityId: 'uct',
    name: 'BCom Financial Accounting: Chartered Accountant',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 435, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
      ],
      note: 'FPS 435 = Band A. Band B (WPS 470) and Band C (FPS 430-434, EDU only, redress only) not modelled.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Chartered Accountant CA(SA)', 'Auditor', 'Tax Advisor'],
    note: 'The SAICA CA(SA) path: this degree + a 1-year PGDA + a 3-year training contract + SAICA board exams.',
  },
  {
    qualificationCode: 'UCT-COM-BCOM-PPE',
    universityId: 'uct',
    name: 'BCom Philosophy, Politics & Economics (PPE)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 435, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
      ],
      note: 'FPS 435 = Band A. Band B (WPS 470) and Band C (FPS 430-434, EDU only, redress only) not modelled.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Economist', 'Policy Analyst'],
  },
  {
    qualificationCode: 'UCT-COM-BCOM-ECOSTAT',
    universityId: 'uct',
    name: 'BCom Economics & Statistics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 435, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
      ],
      note: 'FPS 435 = Band A. Band B (WPS 470) and Band C (FPS 430-434, EDU only, redress only) not modelled.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Economist', 'Data/Financial Analyst'],
  },
  {
    qualificationCode: 'UCT-COM-BCOM-ECOFIN',
    universityId: 'uct',
    name: 'BCom Economics with Finance',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 435, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
      ],
      note: 'FPS 435 = Band A. Band B (WPS 470) and Band C (FPS 430-434, EDU only, redress only) not modelled.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Financial Analyst', 'Investment Analyst'],
  },
  {
    qualificationCode: 'UCT-COM-BCOM-ECOLAW',
    universityId: 'uct',
    name: 'BCom Economics with Law',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 435, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
      ],
      note: 'FPS 435 = Band A. Band B (WPS 470) and Band C (FPS 430-434, EDU only, redress only) not modelled.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Attorney (via postgraduate LLB)', 'Advocate (via postgraduate LLB)', 'Commercial Economist'],
    note: 'Graduates who want to qualify as attorney/advocate proceed to a 2-year postgraduate LLB.',
  },
  {
    qualificationCode: 'UCT-COM-BCOM-IS',
    universityId: 'uct',
    name: 'BCom Information Systems',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 435, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
      ],
      note: 'FPS 435 = Band A. Band B (WPS 470) and Band C (FPS 430-434, EDU only, redress only) not modelled.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Information Systems Professional', 'Business/Systems Analyst'],
  },
  {
    qualificationCode: 'UCT-COM-BCOM-ISFIN',
    universityId: 'uct',
    name: 'BCom Information Systems & Finance',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 435, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
      ],
      note: 'FPS 435 = Band A. Band B (WPS 470) and Band C (FPS 430-434, EDU only, redress only) not modelled.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Financial Systems Analyst', 'Investment Analyst'],
  },
  {
    qualificationCode: 'UCT-COM-BCOM-MGMT',
    universityId: 'uct',
    name: 'BCom Management Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 435, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
      ],
      note: 'FPS 435 = Band A. Band B (WPS 470) and Band C (FPS 430-434, EDU only, redress only) not modelled.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Management Consultant', 'Generalist Business Professional'],
    note: 'The most flexible BCom: a core of 11 courses plus wide elective choice across UCT.',
  },
  {
    qualificationCode: 'UCT-COM-BBUSSC-MKT',
    universityId: 'uct',
    name: 'BBusSc Marketing',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 435, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
      ],
      note: 'FPS 435 = Band A. Band B (WPS 470) and Band C (FPS 430-434, EDU only, redress only) not modelled. Same requirements as the 3-year BCom specialisations in this group — BBusSc is the 4-year variant (see file header).',
    },
    additionalRequirements: ['NBT'],
    careers: ['Marketing Manager', 'Brand Strategist'],
  },
  {
    qualificationCode: 'UCT-COM-BBUSSC-IOP',
    universityId: 'uct',
    name: 'BBusSc Industrial and Organisational Psychology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 435, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
      ],
      note: 'FPS 435 = Band A. Band B (WPS 470) and Band C (FPS 430-434, EDU only, redress only) not modelled. Only offered as BBusSc in Commerce (the BA/BSocSc equivalent is a Humanities programme, out of scope for this file).',
    },
    additionalRequirements: ['NBT'],
    firstTimeEntrantsOnly: false,
    careers: ['HR Manager', 'Organisational Development Consultant', 'Talent Management Specialist'],
    note: 'Text states this Commerce option is only available to students who did pure Mathematics in matric (consistent with the Group 1 Mathematics-required gate already encoded above).',
  },

  // ═══════════════════════════════════════════════════════════════════
  // GROUP 2 — ONLY Computer Science & Statistics and Data Science.
  // Mathematics 70% (higher than Group 1), English HL 50% or FAL 60%.
  // Same FPS/WPS/Band-C thresholds as Group 1 (435 / 470 / 430-434).
  // ═══════════════════════════════════════════════════════════════════

  {
    qualificationCode: 'UCT-COM-BBUSSC-CS',
    universityId: 'uct',
    name: 'BBusSc Computer Science',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 435, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
      ],
      note: 'FPS 435 = Band A. Band B (WPS 470) and Band C (FPS 430-434, EDU only, redress only) not modelled.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Software Developer', 'Data Analyst', 'Technology Consultant'],
  },
  {
    qualificationCode: 'UCT-COM-BBUSSC-STATS',
    universityId: 'uct',
    name: 'BBusSc Statistics and Data Science',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 435, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
      ],
      note: 'FPS 435 = Band A. Band B (WPS 470) and Band C (FPS 430-434, EDU only, redress only) not modelled.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Statistician', 'Data Scientist'],
  },
  {
    qualificationCode: 'UCT-COM-BCOM-ISCS',
    universityId: 'uct',
    name: 'BCom Information Systems & Computer Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 435, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
      ],
      note: 'FPS 435 = Band A. Band B (WPS 470) and Band C (FPS 430-434, EDU only, redress only) not modelled.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Software Developer', 'Business Systems Analyst'],
    note: "Judgement call: the source text does not explicitly say which group this specific combined specialisation falls under. Because its name contains 'Computer Science', it is placed in Group 2 (Mathematics 70%) rather than Group 1 (Mathematics 60%) — treat this mapping as lower-confidence than the other entries and verify against the live UCT prospectus if precision matters.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // GROUP 3 — ONLY Actuarial Science and Quantitative Finance.
  // Mathematics 80%, English HL 60% or FAL 80%. FAL applicants also need
  // NBT AL & QL "Proficient" (vs "Upper Intermediate" elsewhere) — NBT
  // levels are not modelled by this platform, noted in admission.note.
  // FPS 500 (Band A) / WPS 525 (Band B) / FPS 475-479 (Band C, EDU only).
  // ═══════════════════════════════════════════════════════════════════

  {
    qualificationCode: 'UCT-COM-BCOM-ACT',
    universityId: 'uct',
    name: 'BCom Actuarial Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 500, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' }, // as Home Language
        { subject: 'english', status: 'alternative', minPercentage: 80, altGroup: 'english' }, // as First Additional Language
      ],
      note: 'FPS 500 = Band A (guaranteed admission). Band B (WPS 525, likely admission) and Band C (FPS 475-479, EDU only, SA redress applicants only) also exist but are not modelled. English FAL applicants additionally need NBT AL & QL scores of "Proficient" (all other Commerce specialisations only require "Upper Intermediate") — NBT levels are out of scope for this platform and not enforced here.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Actuary', 'Risk Manager', 'Quantitative Analyst'],
    note: 'Graduates are well prepared for the FASSA (Fellow of the Actuarial Society of South Africa) qualification. Transfers into this specialisation are not permitted per the prospectus.',
  },
  {
    qualificationCode: 'UCT-COM-BBUSSC-ACT',
    universityId: 'uct',
    name: 'BBusSc Actuarial Science',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 500, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 80, altGroup: 'english' },
      ],
      note: 'Same requirements as BCom Actuarial Science — this is the 4-year variant (see file header). Band B/C and NBT proficiency requirement not modelled.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Actuary', 'Risk Manager', 'Quantitative Analyst'],
  },
  {
    qualificationCode: 'UCT-COM-BCOM-QF',
    universityId: 'uct',
    name: 'BCom Quantitative Finance',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 500, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 80, altGroup: 'english' },
      ],
      note: 'FPS 500 = Band A. Band B (WPS 525) and Band C (FPS 475-479, EDU only, redress only) not modelled. English FAL applicants additionally need NBT AL & QL "Proficient" (not enforced here — NBTs out of scope).',
    },
    additionalRequirements: ['NBT'],
    careers: ['Investment Banker', 'Derivatives Trader', 'Quantitative Asset Manager'],
    note: 'Shares foundations with Actuarial Science but with more emphasis on investment/financial-industry applications.',
  },

  // ═══════════════════════════════════════════════════════════════════
  // EDUCATION DEVELOPMENT UNIT (EDU) — extended-duration variants.
  // "The degrees and specialisations in the EDU are the same as the
  // mainstream programmes... you receive the same degree at graduation."
  // Admission is via Band C only: SA applicants/permanent residents in
  // targeted redress categories, at the lower FPS threshold for that
  // specialisation group. Two representative examples encoded (per the
  // MVP's "a few ECP examples" rule) rather than one EDU twin per
  // mainstream programme above.
  // ═══════════════════════════════════════════════════════════════════

  {
    qualificationCode: 'UCT-COM-EDU-BCOM-GEN',
    universityId: 'uct',
    name: 'BCom (Academic Development Programme, EDU)',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 430, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
      ],
      note: 'Band C: FPS 430-434 (using the floor, 430, as the modelled minimum). Admission via the Education Development Unit is limited to South African applicants/permanent residents in targeted redress categories. Extra support is provided; same degree awarded at graduation as the mainstream BCom. Text says the ADP BCom runs 3-4 years — 4 modelled here as the extended path.',
    },
    additionalRequirements: ['NBT'],
    firstTimeEntrantsOnly: true,
    careers: ['General Accountant', 'Economist', 'Business Professional'],
    note: 'Any Group-1 specialisation (Accounting, Economics variants, Information Systems, Management Studies, Marketing, etc.) is available at this EDU entry point for eligible redress applicants.',
  },
  {
    qualificationCode: 'UCT-COM-EDU-BCOM-ACT',
    universityId: 'uct',
    name: 'BCom Actuarial Science (Academic Development Programme, EDU)',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Commerce',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 475, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'english' },
        { subject: 'english', status: 'alternative', minPercentage: 80, altGroup: 'english' },
      ],
      note: 'Band C: FPS 475-479 (using the floor, 475, as the modelled minimum). SA redress applicants/permanent residents only, EDU entry point. Extra support over an extended timeline; same degree at graduation.',
    },
    additionalRequirements: ['NBT'],
    firstTimeEntrantsOnly: true,
    careers: ['Actuary', 'Quantitative Analyst'],
  },
];

// UCT — Faculty of Engineering & the Built Environment
// Source: UCT 2027 Undergraduate Prospectus, pp.32-38 (OCR)
// APS system note: UCT expresses admission minimums as FPS (Faculty Points Score,
// out of 600) for this faculty — FPS = APS, no adjustment. Only the Band A
// ("guaranteed admission") FPS threshold is modeled as apsMinimum.default;
// Band B (WPS-based, "likely admission") and Band C (FPS-based, restricted to
// SA applicants in targeted redress categories, "possible admission") exist in
// the source but are not computable without live NBT/WPS data and are
// summarized only in each programme's admission.note.
// NBTs (National Benchmark Tests) are out of scope for ApplyOnce MVP — flagged
// via additionalRequirements: ['NBT'] only, never scored.

const BAND_NOTE =
  'UCT also publishes a Band B (likely admission, WPS-based) and Band C (possible admission, restricted to SA applicants in targeted redress categories) at lower thresholds; only Band A (guaranteed admission, FPS-based) is modeled here.';

export const UCT_EBE_PROGRAMMES: Programme[] = [
  // ── BSc(Eng) Civil Engineering ──────────────────────────────────────
  {
    qualificationCode: 'UCT-EBE-CIVIL-ENG',
    universityId: 'uct',
    name: 'Bachelor of Science in Engineering in Civil Engineering',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Engineering & the Built Environment',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 500, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'technicalMathematics', status: 'not_accepted' },
        { subject: 'physicalScience', status: 'required', minPercentage: 70 },
        { subject: 'technicalScience', status: 'not_accepted' },
      ],
      note: `${BAND_NOTE} Accredited by the Engineering Council of South Africa (ECSA); internationally recognised under the Washington Accord.`,
    },
    additionalRequirements: ['NBT'],
    careers: ['Civil Engineer', 'Structural Engineer', 'Water Resources Engineer'],
  },

  // ── BSc(Eng) Electrical Engineering ─────────────────────────────────
  {
    qualificationCode: 'UCT-EBE-ELECTRICAL-ENG',
    universityId: 'uct',
    name: 'Bachelor of Science in Engineering in Electrical Engineering',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Engineering & the Built Environment',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 500, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'technicalMathematics', status: 'not_accepted' },
        { subject: 'physicalScience', status: 'required', minPercentage: 75 },
        { subject: 'technicalScience', status: 'not_accepted' },
      ],
      note: `${BAND_NOTE} Accredited by ECSA; internationally recognised under the Washington Accord.`,
    },
    additionalRequirements: ['NBT'],
    careers: ['Electrical Engineer', 'Power Systems Engineer', 'Telecommunications Engineer'],
  },

  // ── BSc(Eng) Electrical & Computer Engineering ──────────────────────
  {
    qualificationCode: 'UCT-EBE-ELEC-COMP-ENG',
    universityId: 'uct',
    name: 'Bachelor of Science in Engineering in Electrical & Computer Engineering',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Engineering & the Built Environment',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 500, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'technicalMathematics', status: 'not_accepted' },
        { subject: 'physicalScience', status: 'required', minPercentage: 75 },
        { subject: 'technicalScience', status: 'not_accepted' },
      ],
      note: `${BAND_NOTE} Accredited by ECSA; internationally recognised under the Washington Accord.`,
    },
    additionalRequirements: ['NBT'],
    careers: ['Computer Engineer', 'Embedded Systems Engineer', 'Systems Engineer'],
  },

  // ── BSc(Eng) Mechatronics ────────────────────────────────────────────
  {
    qualificationCode: 'UCT-EBE-MECHATRONICS',
    universityId: 'uct',
    name: 'Bachelor of Science in Engineering in Mechatronics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Engineering & the Built Environment',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 500, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'technicalMathematics', status: 'not_accepted' },
        { subject: 'physicalScience', status: 'required', minPercentage: 75 },
        { subject: 'technicalScience', status: 'not_accepted' },
      ],
      note: `${BAND_NOTE} Accredited by ECSA; internationally recognised under the Washington Accord.`,
    },
    additionalRequirements: ['NBT'],
    careers: ['Mechatronics Engineer', 'Robotics Engineer', 'Automation Engineer'],
  },

  // ── BSc(Eng) Chemical Engineering ───────────────────────────────────
  {
    qualificationCode: 'UCT-EBE-CHEMICAL-ENG',
    universityId: 'uct',
    name: 'Bachelor of Science in Engineering in Chemical Engineering',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Engineering & the Built Environment',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 500, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'technicalMathematics', status: 'not_accepted' },
        { subject: 'physicalScience', status: 'required', minPercentage: 75 },
        { subject: 'technicalScience', status: 'not_accepted' },
      ],
      note: `${BAND_NOTE} Accredited by ECSA; internationally recognised under the Washington Accord. Can be specialised in biotechnology, chemical sciences or mineralogical sciences.`,
    },
    additionalRequirements: ['NBT'],
    careers: ['Chemical Engineer', 'Process Engineer'],
  },

  // ── BSc(Eng) Mechanical Engineering ──────────────────────────────────
  {
    qualificationCode: 'UCT-EBE-MECHANICAL-ENG',
    universityId: 'uct',
    name: 'Bachelor of Science in Engineering in Mechanical Engineering',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Engineering & the Built Environment',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 500, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'technicalMathematics', status: 'not_accepted' },
        { subject: 'physicalScience', status: 'required', minPercentage: 75 },
        { subject: 'technicalScience', status: 'not_accepted' },
      ],
      note: `${BAND_NOTE} Accredited by ECSA; internationally recognised under the Washington Accord.`,
    },
    additionalRequirements: ['NBT'],
    careers: ['Mechanical Engineer', 'Aeronautical Engineer', 'Biomedical Engineer'],
  },

  // ── BSc(Eng) Mechanical & Mechatronic Engineering ───────────────────
  {
    qualificationCode: 'UCT-EBE-MECH-MECHATRONIC-ENG',
    universityId: 'uct',
    name: 'Bachelor of Science in Engineering in Mechanical & Mechatronic Engineering',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Engineering & the Built Environment',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 500, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'technicalMathematics', status: 'not_accepted' },
        { subject: 'physicalScience', status: 'required', minPercentage: 75 },
        { subject: 'technicalScience', status: 'not_accepted' },
      ],
      note: `${BAND_NOTE} Accredited by ECSA; internationally recognised under the Washington Accord.`,
    },
    additionalRequirements: ['NBT'],
    careers: ['Mechatronics Engineer', 'Automation Engineer', 'Robotics Engineer'],
  },

  // ── BSc Construction Studies ─────────────────────────────────────────
  {
    qualificationCode: 'UCT-EBE-CONSTRUCTION-STUDIES',
    universityId: 'uct',
    name: 'Bachelor of Science in Construction Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering & the Built Environment',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 450, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 65 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'technicalMathematics', status: 'not_accepted' },
        { subject: 'physicalScience', status: 'required', minPercentage: 60 },
        { subject: 'technicalScience', status: 'not_accepted' },
      ],
      note: `${BAND_NOTE} The BSc Honours in Construction Management (one year, postgraduate) is accredited by SACQSP, RICS and CIOB.`,
    },
    additionalRequirements: ['NBT'],
    careers: ['Quantity Surveyor', 'Construction Manager'],
  },

  // ── BSc Property Studies ─────────────────────────────────────────────
  {
    qualificationCode: 'UCT-EBE-PROPERTY-STUDIES',
    universityId: 'uct',
    name: 'Bachelor of Science in Property Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering & the Built Environment',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 450, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 65 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'technicalMathematics', status: 'not_accepted' },
      ],
      note: `${BAND_NOTE} The BSc Honours in Property Studies (one year, postgraduate) is accredited by SACPVP and RICS.`,
    },
    additionalRequirements: ['NBT'],
    careers: ['Property Valuer', 'Property Developer'],
  },

  // ── Bachelor of Architectural Studies (BAS) ─────────────────────────
  {
    qualificationCode: 'UCT-EBE-ARCH-STUDIES',
    universityId: 'uct',
    name: 'Bachelor of Architectural Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering & the Built Environment',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 450, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 50 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'technicalMathematics', status: 'not_accepted' },
      ],
      note: `${BAND_NOTE} A written motivation and a portfolio of creative work are required — Band A requires an Architecture Portfolio Score of 75% or above (Band B: 68%, Band C: 50%). Graduates may register with SACAP as a Candidate Architectural Technologist; provides grounding for the BAS Honours, which articulates into the Master of Architecture (professional).`,
    },
    additionalRequirements: ['NBT', 'portfolio'],
    careers: ['Architectural Technologist', 'Architect (via further postgraduate study)'],
  },

  // ── BSc Geomatics ─────────────────────────────────────────────────────
  {
    qualificationCode: 'UCT-EBE-GEOMATICS',
    universityId: 'uct',
    name: 'Bachelor of Science in Geomatics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Engineering & the Built Environment',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 450, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 75 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'technicalMathematics', status: 'not_accepted' },
        { subject: 'physicalScience', status: 'required', minPercentage: 70 },
        { subject: 'technicalScience', status: 'not_accepted' },
      ],
      note: `${BAND_NOTE} Accredited by the South African Geomatics Council; graduates may register as a professional surveyor after completing a period of articles.`,
    },
    additionalRequirements: ['NBT'],
    careers: ['Professional Land Surveyor', 'GIS Specialist'],
  },
];

// UCT Faculty of Health Sciences — extracted from 2027 Undergraduate Prospectus, pages 39-47
// (OCR source: uct-healthsci.txt). Encoded for @applyonce/shared constants/universities.ts.
//
// IMPORTANT CONTEXT FOR ALL PROGRAMMES BELOW:
// UCT's base APS = sum of percentages of English + 5 best other NSC subjects (excl. Life
// Orientation), out of 600 ("percentage_600" scale — NOT the 7-point rating scale UJ/Wits use).
// For Health Sciences specifically, the university does NOT admit on raw APS — it admits on
// FPS (Faculty Points Score) = APS (out of 600) + NBT score (AL + QL + Mathematics, out of 300),
// giving a score out of 900. WPS (Weighted Points Score, used only for "Band B") = FPS weighted
// upward by a disadvantage factor of 0-20% for this faculty (SA applicants only).
// NBTs are OUT OF SCOPE for ApplyOnce's MVP (never collected/evaluated) — but here NBT points are
// baked directly into the FPS/WPS numbers themselves, unlike other faculties where NBT is a
// separate pass/fail gate. That means the `apsMinimum.default` FPS figure recorded below is the
// real published bar, but ApplyOnce's matching engine CANNOT currently compute a student's true
// FPS (we have no NBT data), so eligibility for these programmes can only be fully evaluated once
// NBT scores are available. Every degree programme below carries `additionalRequirements: ['NBT']`
// and an `admission.note` restating this limitation.
//
// UCT uses a 3-tier band system for these degree programmes:
//   Band A — Guaranteed admission, all applicants, threshold expressed in FPS.
//   Band B — Likely admission, all applicants, threshold expressed in WPS.
//   Band C — Possible admission, ONLY SA applicants in targeted redress categories, into the
//            Education Development Unit, threshold expressed in FPS (often tiered by redress
//            category 1/2/3-4).
// Since the schema's ApsMinimum only models a single default/withMathematics-style threshold, we
// record the Band A (guaranteed) FPS figure as `apsMinimum.default` with `scoreType: 'FPS'`, and
// describe Band B/C numbers in prose in `admission.note` — they are real published figures but not
// separately queryable via this schema without extending it.
//
// A raw "sub-minimum APS" (the percentage-only score out of 600, BEFORE adding NBT) is also
// published per programme as a hard floor before FPS/WPS is even considered — recorded in prose
// only, since there is no dedicated schema field for it.


export const UCT_HEALTH_SCIENCES_PROGRAMMES: Programme[] = [
  // ─── MBChB ──────────────────────────────────────────────────────────────
  {
    qualificationCode: 'UCT-HSC-MBCHB',
    universityId: 'uct',
    name: 'Bachelor of Medicine and Bachelor of Surgery (MBChB)',
    qualificationType: 'degree',
    durationYears: 6,
    faculty: 'Health Sciences',
    campus: ['Observatory'],
    admission: {
      apsMinimum: { default: 810, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
        { subject: 'physicalScience', status: 'required', minPercentage: 70 },
        { subject: 'english', status: 'required', minPercentage: 65 },
      ],
      note:
        'Also requires 70% for the next three best subjects excluding Life Orientation. Raw sub-minimum APS (percentage-only, before NBT) of 450 required just to be considered. ' +
        'Band A (guaranteed, all applicants): FPS >= 810, plus NBT results of Proficient for AL, QL and Mathematics. ' +
        'Band B (likely admission, all applicants): WPS >= 807, NBT Intermediate or above for AL, QL and Mathematics. ' +
        'Band C (possible admission, SA applicants in targeted redress categories only, into the Education Development Unit): FPS >= 644, NBT Intermediate or above. ' +
        'Only SA citizens/permanent residents and eligible SADC applicants qualify (MBChB places for SADC applicants only offered where that country does not itself offer the programme — as of this prospectus: Comoros, Eswatini, Lesotho, Seychelles). ' +
        "FPS/WPS here bake NBT scores directly into the score (out of 900), unlike other faculties where NBT is a separate gate — ApplyOnce does not collect NBT scores, so this programme's true eligibility cannot currently be fully evaluated from academic marks alone. apsMinimum.default is the published Band A FPS threshold, shown for reference.",
    },
    additionalRequirements: ['NBT'],
    careers: ['Medical Doctor'],
  },

  // ─── BSc Physiotherapy ──────────────────────────────────────────────────
  {
    qualificationCode: 'UCT-HSC-PHYSIO',
    universityId: 'uct',
    name: 'Bachelor of Science in Physiotherapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Observatory'],
    admission: {
      apsMinimum: { default: 730, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'alternative', minPercentage: 65, altGroup: 'science' },
        { subject: 'lifeScience', status: 'alternative', minPercentage: 65, altGroup: 'science' },
        { subject: 'english', status: 'required', minPercentage: 65 },
      ],
      note:
        'Also requires 60% for the next three best subjects excluding Life Orientation. Raw sub-minimum APS (pre-NBT) of 360 required. ' +
        'Band A (guaranteed, all applicants): FPS >= 730, NBT Intermediate or above for AL, QL and Mathematics. ' +
        'Band B (likely, all applicants): WPS >= 797. ' +
        'Band C (possible, SA redress applicants only): FPS >= 580 (redress category 1), 610 (redress 2), 680 (redress 3 and 4). ' +
        'Eligible SADC countries for this programme: Angola, Eswatini (Swaziland), Lesotho. ' +
        "FPS/WPS bake NBT scores directly into the score (out of 900) — ApplyOnce does not collect NBT scores, so true eligibility cannot currently be fully evaluated from academic marks alone. apsMinimum.default is the published Band A FPS threshold, shown for reference.",
    },
    additionalRequirements: ['NBT'],
    careers: ['Physiotherapist'],
  },

  // ─── BSc Occupational Therapy ───────────────────────────────────────────
  {
    qualificationCode: 'UCT-HSC-OT',
    universityId: 'uct',
    name: 'Bachelor of Science in Occupational Therapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Observatory'],
    admission: {
      apsMinimum: { default: 730, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'alternative', minPercentage: 60, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minPercentage: 70, altGroup: 'maths' },
        { subject: 'physicalScience', status: 'alternative', minPercentage: 65, altGroup: 'science' },
        { subject: 'lifeScience', status: 'alternative', minPercentage: 65, altGroup: 'science' },
        { subject: 'english', status: 'required', minPercentage: 65 },
      ],
      note:
        'Also requires 60% for the next three best subjects excluding Life Orientation. Raw sub-minimum APS (pre-NBT) of 340 required. ' +
        'Band A (guaranteed, all applicants): FPS >= 730, NBT Intermediate or above for AL, QL and Mathematics (applicants who took Mathematical Literacy and scored above 75% are exempt from the NBT Mathematics test). ' +
        'Band B (likely, all applicants): WPS >= 782 (same NBT/exemption conditions). ' +
        'Band C (possible, SA redress applicants only): FPS >= 565 (redress 1), 580 (redress 2), 670 (redress 3 and 4). ' +
        'For Mathematical Literacy applicants, a Mathematics-NBT equivalence score is calculated as: NBT Quantitative Literacy score minus 20 points. ' +
        'Eligible SADC countries: Angola, Botswana, Comoros, DR Congo, Eswatini (Swaziland), Lesotho, Malawi, Mozambique, Seychelles. ' +
        "FPS/WPS bake NBT scores directly into the score (out of 900) — ApplyOnce does not collect NBT scores, so true eligibility cannot currently be fully evaluated from academic marks alone. apsMinimum.default is the published Band A FPS threshold, shown for reference.",
    },
    additionalRequirements: ['NBT'],
    careers: ['Occupational Therapist'],
  },

  // ─── BSc Audiology ──────────────────────────────────────────────────────
  {
    qualificationCode: 'UCT-HSC-AUDIOLOGY',
    universityId: 'uct',
    name: 'Bachelor of Science in Audiology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Observatory'],
    admission: {
      apsMinimum: { default: 720, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'alternative', minPercentage: 60, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minPercentage: 70, altGroup: 'maths' },
        { subject: 'physicalScience', status: 'alternative', minPercentage: 65, altGroup: 'science' },
        { subject: 'lifeScience', status: 'alternative', minPercentage: 65, altGroup: 'science' },
        { subject: 'english', status: 'required', minPercentage: 65 },
      ],
      note:
        'Also requires 60% for the next three best subjects excluding Life Orientation. Raw sub-minimum APS (pre-NBT) of 340 required. ' +
        'Band A (guaranteed, all applicants): FPS >= 720, NBT Intermediate or above for AL, QL and Mathematics (Mathematical Literacy takers scoring above 75% are exempt from the NBT Mathematics test). ' +
        'Band B (likely, all applicants): WPS >= 710 (same NBT/exemption conditions). ' +
        'Band C (possible, SA redress applicants only): FPS >= 550 (redress 1), 565 (redress 2), 610 (redress 3 and 4). ' +
        'Mathematical Literacy applicants get a Mathematics-NBT equivalence score of: NBT Quantitative Literacy score minus 20 points. ' +
        'Eligible SADC countries: Angola, Botswana, DR Congo, Lesotho, Malawi, Mauritius, Mozambique, Namibia, Seychelles, Swaziland, Tanzania, Zambia, Zimbabwe. ' +
        "FPS/WPS bake NBT scores directly into the score (out of 900) — ApplyOnce does not collect NBT scores, so true eligibility cannot currently be fully evaluated from academic marks alone. apsMinimum.default is the published Band A FPS threshold, shown for reference.",
    },
    additionalRequirements: ['NBT'],
    careers: ['Audiologist'],
  },

  // ─── BSc Speech-Language Pathology ──────────────────────────────────────
  {
    qualificationCode: 'UCT-HSC-SLP',
    universityId: 'uct',
    name: 'Bachelor of Science in Speech-Language Pathology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Observatory'],
    admission: {
      apsMinimum: { default: 715, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'alternative', minPercentage: 60, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minPercentage: 70, altGroup: 'maths' },
        { subject: 'physicalScience', status: 'alternative', minPercentage: 65, altGroup: 'science' },
        { subject: 'lifeScience', status: 'alternative', minPercentage: 65, altGroup: 'science' },
        { subject: 'english', status: 'required', minPercentage: 65 },
      ],
      note:
        'JUDGMENT CALL / LOWER CONFIDENCE: this programme\'s minimum-subject-requirements paragraph and band table were cut off mid-sentence at a page break in the source OCR text and the ' +
        'following page appears to interleave an unrelated "international qualifications" section header before the actual numbers resume. The figures below are reconstructed from the ' +
        'numeric block that follows the same "Mathematics at 60% or Mathematical Literacy at 70%..." requirement wording used by Occupational Therapy and Audiology, matched to a band table ' +
        'with numbers distinct from every other programme in this chunk (so it is very likely this programme\'s own table, not a duplicate) — but this should be verified against the official ' +
        'prospectus PDF pagination if precision matters. Also requires 60% for the next three best subjects excluding Life Orientation; raw sub-minimum APS (pre-NBT) of 340. ' +
        'Band A (guaranteed): FPS >= 715, NBT Intermediate or above for AL, QL and Mathematics (Mathematical Literacy takers scoring above 75% exempt from NBT Mathematics). ' +
        'Band B (likely): WPS >= 670. Band C (SA redress only): FPS >= 510 (redress 1), 515 (redress 2), 600 (redress 3 and 4). ' +
        'Eligible SADC countries (shared with Audiology in source text): Angola, Botswana, DR Congo, Lesotho, Malawi, Mauritius, Mozambique, Namibia, Seychelles, Swaziland, Tanzania, Zambia, Zimbabwe. ' +
        "FPS/WPS bake NBT scores directly into the score (out of 900) — ApplyOnce does not collect NBT scores, so true eligibility cannot currently be fully evaluated from academic marks alone. apsMinimum.default is the published Band A FPS threshold, shown for reference.",
    },
    additionalRequirements: ['NBT'],
    careers: ['Speech-Language Therapist'],
  },

  // ─── Higher Certificate in Disability Practice ─────────────────────────
  {
    qualificationCode: 'UCT-HSC-DISABILITY',
    universityId: 'uct',
    name: 'Higher Certificate in Disability Practice',
    qualificationType: 'higher_certificate',
    durationYears: 1,
    faculty: 'Health Sciences',
    campus: ['Observatory'],
    admission: {
      apsMinimum: {},
      subjectRequirements: [],
      note:
        'Not part of the FPS/band system (prospectus explicitly states this qualification\'s criteria are not expressed in bands) — no numeric APS/FPS threshold is published. ' +
        'Eligibility requires a National Senior Certificate OR an approved HEQSF-level-4 school-leaving qualification, plus National Benchmark Test results in the Upper Intermediate to ' +
        'Proficient range for the Academic and Quantitative Literacy components only (the NBT Mathematics component is not required for this qualification). ' +
        'Offered only if there is a sufficient number of applicants; 30 places available.',
    },
    additionalRequirements: ['NBT (Academic & Quantitative Literacy components only, no Mathematics component)'],
    careers: ['Community-Based Disability Practitioner', 'Home-Based Carer'],
  },

  // ─── Advanced Diploma in Cosmetic Formulation Science ──────────────────
  {
    qualificationCode: 'UCT-HSC-COSMETIC',
    universityId: 'uct',
    name: 'Advanced Diploma in Cosmetic Formulation Science',
    qualificationType: 'advanced_diploma',
    durationYears: 1, // NOT stated in source text — assumed typical duration for a UCT top-up Advanced Diploma; verify against the official curriculum.
    faculty: 'Health Sciences',
    campus: ['Observatory'],
    admission: {
      apsMinimum: {},
      subjectRequirements: [],
      note:
        'This is a prior-qualification-gated entry route (a top-up for people who already hold tertiary study), NOT an NSC schooling-based admission — no FPS/APS/NBT numeric threshold applies, ' +
        'and the prospectus explicitly states criteria are not expressed in bands. Requires EITHER a completed degree that included Biochemistry 3 (with at least Chemistry 2 also completed), ' +
        'OR a partially-completed/non-degree tertiary record with Chemistry 2 plus relevant work experience. NBTs are explicitly NOT required for this qualification. ' +
        'Offers are made subject to availability of space; 10 places available. ' +
        'durationYears above is an assumption (not stated in the source text) — flagged for verification.',
    },
    additionalRequirements: ['Prior tertiary study including Chemistry 2 and/or Biochemistry 3, or relevant work experience'],
  },
];

// UCT Faculty of Humanities — extracted from 2027 Undergraduate Prospectus (pages 55-58)
// NOTE: UCT expresses admission minimums as FPS (Faculty Points Score), a percentage-style
// score out of 600 (see ApsRule.facultyScoring on the University record for UCT).
// NBTs are out of scope for ApplyOnce MVP — every programme below carries additionalRequirements: ['NBT']
// as a purely informational flag; no NBT score is collected or evaluated by the platform.
// Only the "guaranteed admission" (Band A) FPS threshold is modelled as apsMinimum.default.
// Where a programme has only a single "possible admission" tier (no bands), that FPS is used instead.


export const UCT_HUMANITIES_PROGRAMMES: Programme[] = [
  // Bachelor of Arts (BA) and Bachelor of Social Science (BSocSc) are presented jointly in the
  // prospectus with identical admission requirements throughout (p.55, p.58) — encoded as one entry.
  {
    qualificationCode: 'UCT-HUM-BA-BSOCSC',
    universityId: 'uct',
    name: 'Bachelor of Arts (BA) / Bachelor of Social Science (BSocSc)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 450, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 50 },
      ],
      note:
        'Band A (guaranteed admission, FPS 450+) modelled here. Minimum eligibility is FPS 380 ' +
        '(Band C, possible admission — SA redress applicants only) and Band B (WPS 450+, likely ' +
        'admission) also exist but are not modelled. English: 50% if taken as Home Language, ' +
        '60% if taken as First Additional Language.',
    },
    additionalRequirements: ['NBT'],
  },

  {
    qualificationCode: 'UCT-HUM-BSOCSC-PPE',
    universityId: 'uct',
    name: 'Bachelor of Social Science in Philosophy, Politics and Economics (PPE)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 450, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
      ],
      note:
        'Only one admission band is published for this qualification (FPS 450+, guaranteed admission) ' +
        '— no Band B/C listed. English: 50% if Home Language, 60% if First Additional Language. ' +
        'NBT Academic Literacy at Upper Intermediate and NBT Quantitative Literacy at Upper ' +
        'Intermediate are also specified (not modelled — NBTs out of scope).',
    },
    additionalRequirements: ['NBT'],
  },

  {
    qualificationCode: 'UCT-HUM-BSW',
    universityId: 'uct',
    name: 'Bachelor of Social Work (BSW)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 450, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 50 },
      ],
      note:
        'Band A (guaranteed admission, FPS 450+) modelled here. Minimum eligibility is FPS 380 ' +
        '(Band C, possible admission — SA redress applicants only) and Band B (WPS 450+, likely ' +
        'admission) also exist but are not modelled. English: 50% if Home Language, 60% if First ' +
        'Additional Language. Applicants may be required to attend an admissions interview and ' +
        'demonstrate they will meet professional requirements of the SA Council for Social Service Professions.',
    },
    additionalRequirements: ['NBT', 'interview'],
  },

  {
    qualificationCode: 'UCT-HUM-BAFA',
    universityId: 'uct',
    name: 'Bachelor of Arts in Fine Art (BA(FA))',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 380, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 50 },
      ],
      note:
        'Single "possible admission" tier (FPS 380+) — no guaranteed/likely bands published; the ' +
        'leading indicator for admission is portfolio performance, and places are awarded on merit. ' +
        'English: 50% if Home Language, 60% if First Additional Language. SA redress applicants ' +
        'below the FPS minimum who excel in the portfolio evaluation may still be considered (not modelled).',
    },
    additionalRequirements: ['NBT', 'portfolio'],
  },

  {
    qualificationCode: 'UCT-HUM-BATP',
    universityId: 'uct',
    name: 'Bachelor of Arts in Theatre & Performance (BA(T&P))',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 380, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 50 },
      ],
      note:
        'Single "possible admission" tier (FPS 380+) — no guaranteed/likely bands published; the ' +
        'leading indicator for admission is audition performance, and places are awarded on merit. ' +
        'English: 50% if Home Language, 60% if First Additional Language. SA redress applicants who ' +
        'excel in the audition but fall below the FPS minimum may be considered for the Diploma in ' +
        'Theatre and Performance instead (not modelled).',
    },
    additionalRequirements: ['NBT', 'audition'],
  },

  {
    qualificationCode: 'UCT-HUM-BMUS',
    universityId: 'uct',
    name: 'Bachelor of Music (BMus)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 380, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 50 },
      ],
      note:
        'Single "possible admission" tier (FPS 380+) — no guaranteed/likely bands published; the ' +
        'leading indicator for admission is audition performance. English: 50% if Home Language, ' +
        '60% if First Additional Language. Additional subject-level criteria published (NSC Music ' +
        '60%+, Unisa Music Theory Grade V+, Unisa Music Practical Grade VII+) have no matching ' +
        'SubjectKey in this platform and are only captured here as a note. SA redress applicants who ' +
        'excel in the audition but fall below the FPS minimum may be considered for the Diploma in ' +
        'Music Performance instead (not modelled).',
    },
    additionalRequirements: ['NBT', 'audition', 'interview', 'music_theory_test'],
  },

  {
    qualificationCode: 'UCT-HUM-DMP',
    universityId: 'uct',
    name: 'Diploma in Music Performance (DMP)',
    qualificationType: 'diploma',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: {},
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 50 },
      ],
      note:
        'No numeric FPS/APS threshold is published for this diploma — minimum requirement is an NSC ' +
        'endorsed for diploma study (or equivalent) plus NBT Academic Literacy at Intermediate level ' +
        '(not modelled). English: 50% if Home Language, 60% if First Additional Language. The leading ' +
        'indicator for admission is audition, interview and music theory test performance.',
    },
    additionalRequirements: ['NBT', 'audition', 'interview', 'music_theory_test'],
  },

  {
    qualificationCode: 'UCT-HUM-DTP',
    universityId: 'uct',
    name: 'Diploma in Theatre & Performance (DTP)',
    qualificationType: 'diploma',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: {},
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 50 },
      ],
      note:
        'No numeric FPS/APS threshold is published for this diploma — minimum requirement is an NSC ' +
        'endorsed for diploma study (or equivalent) plus NBT Academic Literacy at Intermediate level ' +
        '(not modelled). English: 50% if Home Language, 60% if First Additional Language. The leading ' +
        'indicator for admission is audition performance.',
    },
    additionalRequirements: ['NBT', 'audition'],
  },
];

// UCT — FACULTY OF LAW
// Source: UCT 2027 Undergraduate Prospectus, pages 59-63 (OCR'd chunk).
// See report for judgement calls / omissions.

export const UCT_LAW_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UCT-LAW-LLB',
    universityId: 'uct',
    name: 'Bachelor of Laws (LLB) — Undergraduate',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Law',
    campus: ['Rondebosch'],
    additionalRequirements: ['NBT'],
    admission: {
      // Only the Band A guaranteed-admission FPS threshold is modelled.
      // FPS = APS here (no Law-specific transform beyond the standard
      // percentage_600 base score) — see UCT's overall facultyScoring rule.
      apsMinimum: { default: 500, scoreType: 'FPS' },
      subjectRequirements: [],
      note:
        'UCT Law uses a 3-tier band system, not a single cutoff: Band A (all SA applicants) 500 FPS = guaranteed admission; Band B (all SA applicants) 500 WPS = likely admission; Band C (SA applicants in targeted redress categories only) 470 FPS = possible admission. All bands also require NBT AL "proficient" and NBT QL "intermediate or above" — not evaluated by this platform (NBTs out of scope). International (non-SA schooling) applicants: 510 FPS = probable admission. Only Band A is modelled here; Band B/C thresholds exist but are not enforced by this platform.',
    },
    careers: ['Advocate', 'Attorney', 'Legal Advisor'],
    note:
      'Applicants with non-South African leaving certificates (A-level/AS-level/NSSC/IB Diploma) are instead scored on a separate international APS-points table (not FPS): international applicants 44+/46+ (minimum/probable admission); SA applicants 40+/44+; SA redress applicants 38+/39+. Two other LLB routes are described in the prospectus but are NOT separately modelled as programmes here because no explicit FPS/APS admission number applies at the point of matric application: (1) the combined Humanities/LLB or Commerce/LLB route (5 years min, a BBusSci/LLB variant needs 6) — a matric applicant is admitted into the BA/BSocSci or BCom degree under that faculty\'s own requirements (not in this chunk), then competes for entry into the law major via either the same NSC+NBT LLB Band criteria or a first-year average of 65% (Humanities) / 63% (Commerce); (2) the graduate LLB (3 years min) — open only to holders of an already-completed undergraduate degree, admitted on a competitive basis requiring roughly 65% average in that prior degree. Neither route is gated by matric APS, so neither fits this platform\'s NSC-applicant model.',
  },
];

// UCT — Faculty of Science
// Extracted from 2027 Undergraduate Prospectus, pages 64-70 (Faculty of Science section).
//
// FACULTY-LEVEL NOTES (for splicing into the UCT University object's apsRule.facultyScoring —
// NOT part of the Programme[] array below, included here for the person doing the splice):
//
//   facultyScoring: [{
//     faculty: 'Science',
//     scoreName: 'FPS',
//     scoreMax: 800,
//     transform: 'Sum of percentages in best 6 NSC subjects (incl. English, excl. Life Orientation), ' +
//       'with Mathematics % and Physical Science % each counted twice (doubled). Where Physical Science ' +
//       'was not completed, Information Technology or Life Sciences may be doubled instead, in specific cases.',
//     disadvantageFactor: {
//       maxPercent: 10,
//       formula: 'WPS = FPS + (factor% x FPS)',
//       note: 'Factor 0-10% for Science (Health Sciences uses a wider 0-20% band). WPS is the Band B "Likely Admission" score.',
//     },
//     usesNBT: true,
//     note: 'All Science applicants must write NBTs in Academic Literacy, Quantitative Literacy and Mathematics. ' +
//       'NBT results are NOT used for admission to the Faculty of Science; they are used only to help place ' +
//       'admitted students into the 4-year Extended Degree Programme (EDP) after first-semester class tests. ' +
//       'Not modelled in ApplyOnce (NBTs are out of scope) — every programme below carries additionalRequirements: ["NBT"] ' +
//       'as an informational flag only.',
//   }]
//
// BAND SYSTEM (as printed — Science uses the same 3-band structure as other UCT faculties):
//   Band A — Guaranteed Admission: FPS >= 660, Mathematics >= 70%, Physical Sciences >= 60%
//   Band B — Likely Admission: WPS >= 640, Mathematics >= 70%, Physical Sciences >= 60%
//   Band C — Possible Admission (SA applicants in targeted redress categories only): FPS >= 550, same subject minimums
//   Per the task's scope decision, only Band A's FPS threshold (660) is used as admission.apsMinimum.default
//   below (scoreType 'FPS'); Bands B and C are summarised in each programme's admission.note rather than modelled.
//
// STRUCTURE: UCT's Faculty of Science formally awards ONE degree (BSc) with ~20 selectable majors. Admission
// numbers (FPS/WPS/bands, Mathematics 70%, Physical Sciences 60%) are IDENTICAL across the whole faculty and
// are NOT differentiated per major in this prospectus chunk, with three printed exceptions:
//   - NOTE 1: Biochemistry, Computer Science (+ its associated majors), Genetics, and Human Anatomy & Physiology
//     have capacity limits — admission to Science does not guarantee a place in these specific majors.
//   - NOTE 2: Applicants without Physical Science (or IT) are restricted to Archaeology or Environmental &
//     Geographical Science — implying these two majors do not gate on Physical Science.
//   - NOTE 3: For the Computer Science / Computer Engineering / Business Computing major group, the Physical
//     Science requirement may be replaced by Information Technology (only when Physical Science wasn't taken).
//     There is no `informationTechnology` SubjectKey in our schema, so this substitution is captured as a
//     `note` rather than an `alternative` subjectRequirement.
// A per-major "Chemistry required for X / Physics required for Y" list DOES appear in the text, but it is
// printed under "ADMISSION CRITERIA FOR APPLICANTS WITH NON-SOUTH AFRICAN SECONDARY SCHOOL-LEAVING
// CERTIFICATES" — i.e. it applies to foreign-qualification applicants, not NSC/matric applicants (ApplyOnce's
// target users per CLAUDE.md scope). It is therefore NOT applied as an NSC subject gate below.
// No NSC-specific minimum English percentage is printed anywhere in this chunk, so no `english`
// subjectRequirement is added (English's only stated role for NSC applicants is as one of the 6 subjects
// summed into FPS) — not inventing a number that isn't in the text.
//
// qualificationType: 'degree' for all — admission is directly onto the standard 3-year BSc; the 4-year
// Extended Degree Programme (EDP) is an internal post-admission conversion (via first-semester class tests +
// NSC/NBT results), not a separately-applied-to qualification, so it is described in `note` only, not modelled
// as a distinct extended_degree Programme.


const SCIENCE_ADMISSION_NOTE =
  'Faculty of Science admission bands (NSC applicants): Band A - Guaranteed Admission at FPS 660+ ' +
  '(shown as this programme\'s apsMinimum); Band B - Likely Admission at WPS 640+; Band C - Possible ' +
  'Admission (SA redress applicants only) at FPS 550+. All bands additionally require Mathematics 70%+ ' +
  'and Physical Sciences 60%+. Meeting a band does not guarantee admission (capacity-limited). Bands B ' +
  'and C are not modelled in ApplyOnce. NBTs (AL, QL, Mathematics) must be written but are not used for ' +
  'admission — only for EDP placement.';

const STANDARD_SCIENCE_SUBJECTS = [
  { subject: 'mathematics' as const, status: 'required' as const, minPercentage: 70 },
  { subject: 'physicalScience' as const, status: 'required' as const, minPercentage: 60 },
];

export const UCT_SCIENCE_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UCT-SCI-APPLIED-MATHS',
    universityId: 'uct',
    name: 'BSc (Applied Mathematics)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note: SCIENCE_ADMISSION_NOTE,
    },
    additionalRequirements: ['NBT'],
    careers: ['Applied Mathematician', 'Data Scientist', 'Operations Researcher'],
  },
  {
    qualificationCode: 'UCT-SCI-APPLIED-STATS',
    universityId: 'uct',
    name: 'BSc (Applied Statistics)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note: SCIENCE_ADMISSION_NOTE,
    },
    additionalRequirements: ['NBT'],
    careers: ['Statistician', 'Data Analyst', 'Actuarial Analyst'],
  },
  {
    qualificationCode: 'UCT-SCI-ARCHAEOLOGY',
    universityId: 'uct',
    name: 'BSc (Archaeology)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note:
        SCIENCE_ADMISSION_NOTE +
        ' Per the prospectus, applicants who have not completed Physical Science or Information Technology ' +
        'are restricted to Archaeology or Environmental & Geographical Science — so Physical Science is not ' +
        'gated for this major.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Archaeologist', 'Heritage Consultant', 'Museum Curator'],
  },
  {
    qualificationCode: 'UCT-SCI-AI',
    universityId: 'uct',
    name: 'BSc (Artificial Intelligence)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note:
        SCIENCE_ADMISSION_NOTE +
        ' Designed to be completed as a co-major with Computer Science, Mathematical Statistics or Mathematics.',
    },
    additionalRequirements: ['NBT'],
    careers: ['AI Engineer', 'Machine Learning Researcher'],
  },
  {
    qualificationCode: 'UCT-SCI-ASTROPHYSICS',
    universityId: 'uct',
    name: 'BSc (Astrophysics)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note: SCIENCE_ADMISSION_NOTE,
    },
    additionalRequirements: ['NBT'],
    careers: ['Astrophysicist', 'Research Scientist'],
  },
  {
    qualificationCode: 'UCT-SCI-BIOCHEMISTRY',
    universityId: 'uct',
    name: 'BSc (Biochemistry)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note:
        SCIENCE_ADMISSION_NOTE +
        ' Capacity-limited major (Note 1 in prospectus): admission to the Science Faculty does not guarantee ' +
        'a place in Biochemistry — selection happens during first year based on academic criteria.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Biochemist', 'Biotechnologist', 'Research Scientist'],
  },
  {
    qualificationCode: 'UCT-SCI-BIOLOGY',
    universityId: 'uct',
    name: 'BSc (Biology)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note: SCIENCE_ADMISSION_NOTE,
    },
    additionalRequirements: ['NBT'],
    careers: ['Biologist', 'Ecologist', 'Conservation Scientist'],
  },
  {
    qualificationCode: 'UCT-SCI-CHEMISTRY',
    universityId: 'uct',
    name: 'BSc (Chemistry)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note: SCIENCE_ADMISSION_NOTE,
    },
    additionalRequirements: ['NBT'],
    careers: ['Chemist', 'Analytical Chemist', 'Research Scientist'],
  },
  {
    qualificationCode: 'UCT-SCI-CS-BUSCOMP',
    universityId: 'uct',
    name: 'BSc (Computer Science, Computer Engineering & Business Computing)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note:
        SCIENCE_ADMISSION_NOTE +
        ' Capacity-limited major group (Note 1). Note 3 in the prospectus: for this major combination only, ' +
        'the Physical Sciences requirement may be replaced by Information Technology if Physical Science was ' +
        'not taken — not modelled as a subjectRequirements alternative since there is no informationTechnology ' +
        'SubjectKey in this schema.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Software Engineer', 'Computer Engineer', 'IT Business Analyst'],
  },
  {
    qualificationCode: 'UCT-SCI-EGS',
    universityId: 'uct',
    name: 'BSc (Environmental & Geographical Science)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note:
        SCIENCE_ADMISSION_NOTE +
        ' Per the prospectus, applicants who have not completed Physical Science or Information Technology ' +
        'are restricted to Archaeology or Environmental & Geographical Science — so Physical Science is not ' +
        'gated for this major.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Environmental Scientist', 'Geographer', 'Urban Planner'],
  },
  {
    qualificationCode: 'UCT-SCI-GENETICS',
    universityId: 'uct',
    name: 'BSc (Genetics)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note:
        SCIENCE_ADMISSION_NOTE +
        ' Capacity-limited major (Note 1): admission to the Science Faculty does not guarantee a place in ' +
        'Genetics — selection happens during first year based on academic criteria.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Geneticist', 'Molecular Biologist', 'Research Scientist'],
  },
  {
    qualificationCode: 'UCT-SCI-GEOLOGY',
    universityId: 'uct',
    name: 'BSc (Geology)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note: SCIENCE_ADMISSION_NOTE,
    },
    additionalRequirements: ['NBT'],
    careers: ['Geologist', 'Mining Geologist', 'Environmental Consultant'],
  },
  {
    qualificationCode: 'UCT-SCI-ANATOMY-PHYSIOLOGY',
    universityId: 'uct',
    name: 'BSc (Human Anatomy & Physiology)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note:
        SCIENCE_ADMISSION_NOTE +
        ' Capacity-limited major (Note 1): admission to the Science Faculty does not guarantee a place in ' +
        'Human Anatomy & Physiology — selection happens during first year based on academic criteria. Major ' +
        'coursework only begins at second-year level.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Biomedical Scientist', 'Physiologist', 'Health Researcher'],
  },
  {
    qualificationCode: 'UCT-SCI-MARINE-BIOLOGY',
    universityId: 'uct',
    name: 'BSc (Marine Biology)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note: SCIENCE_ADMISSION_NOTE,
    },
    additionalRequirements: ['NBT'],
    careers: ['Marine Biologist', 'Conservation Scientist'],
  },
  {
    qualificationCode: 'UCT-SCI-MATHEMATICS',
    universityId: 'uct',
    name: 'BSc (Mathematics)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note: SCIENCE_ADMISSION_NOTE,
    },
    additionalRequirements: ['NBT'],
    careers: ['Mathematician', 'Data Scientist', 'Quantitative Analyst'],
  },
  {
    qualificationCode: 'UCT-SCI-MATH-STATS',
    universityId: 'uct',
    name: 'BSc (Mathematical Statistics)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note: SCIENCE_ADMISSION_NOTE,
    },
    additionalRequirements: ['NBT'],
    careers: ['Statistician', 'Data Scientist', 'Actuarial Analyst'],
  },
  {
    qualificationCode: 'UCT-SCI-OCEAN-ATMOSPHERE',
    universityId: 'uct',
    name: 'BSc (Ocean & Atmosphere Science)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note: SCIENCE_ADMISSION_NOTE,
    },
    additionalRequirements: ['NBT'],
    careers: ['Oceanographer', 'Climate Scientist', 'Meteorologist'],
  },
  {
    qualificationCode: 'UCT-SCI-PHYSICS',
    universityId: 'uct',
    name: 'BSc (Physics)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note: SCIENCE_ADMISSION_NOTE,
    },
    additionalRequirements: ['NBT'],
    careers: ['Physicist', 'Research Scientist', 'Data Scientist'],
  },
  {
    qualificationCode: 'UCT-SCI-QUANT-BIOLOGY',
    universityId: 'uct',
    name: 'BSc (Quantitative Biology)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note:
        SCIENCE_ADMISSION_NOTE +
        ' Interdisciplinary stream drawing from Biology, Statistics and Mathematics; prepares graduates for ' +
        'Data Science and Quantitative Ecology fields.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Computational Biologist', 'Bioinformatician', 'Data Scientist'],
  },
  {
    qualificationCode: 'UCT-SCI-STATS-DATA-SCIENCE',
    universityId: 'uct',
    name: 'BSc (Statistics & Data Science)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Rondebosch'],
    admission: {
      apsMinimum: { default: 660, scoreType: 'FPS' },
      subjectRequirements: STANDARD_SCIENCE_SUBJECTS,
      note: SCIENCE_ADMISSION_NOTE,
    },
    additionalRequirements: ['NBT'],
    careers: ['Data Scientist', 'Statistician', 'Data Analyst'],
  },
];

const UCT: University = {
  id: 'uct',
  name: 'University of Cape Town',
  shortName: 'UCT',
  applicationSystem: 'Custom portal',
  applicationFee: 100,
  feeNote: 'R100 for South African and SADC applicants; R300 for other international applicants. Non-refundable. Currently registered UCT students, UCT graduates, and Semester Study Abroad applicants do not pay.',
  maxChoices: 1,
  choicesRanked: false,
  choicesIndependent: true,
  choicesFinal: true,
  apsRule: {
    method: 'composite_index',
    subjectsCounted: 6,
    includesLifeOrientation: false,
    scale: 'percentage_600',
    note: 'Base APS = English + 5 best other NSC subjects, raw percentages (results below 40% score 0), out of 600. Faculties convert this into a Faculty Points Score (FPS) before applying admission bands — see facultyScoring below.',
    facultyScoring: [
      {
        faculty: 'Commerce',
        scoreName: 'FPS',
        scoreMax: 600,
        transform: 'FPS = APS (no adjustment).',
        disadvantageFactor: { maxPercent: 10, formula: 'WPS = FPS + (factor% x FPS)' },
        usesNBT: true,
        note: 'NBTs mandatory for all Commerce applicants; used as a pass/fail gate in the band system (not modelled by this platform).',
      },
      {
        faculty: 'Engineering & the Built Environment',
        scoreName: 'FPS',
        scoreMax: 600,
        transform: 'FPS = APS (no adjustment).',
        disadvantageFactor: { maxPercent: 10, formula: 'WPS = FPS + (factor% x FPS)' },
        usesNBT: true,
      },
      {
        faculty: 'Humanities',
        scoreName: 'FPS',
        scoreMax: 600,
        transform: 'FPS = APS (no adjustment).',
        disadvantageFactor: { maxPercent: 10, formula: 'WPS = FPS + (factor% x FPS)' },
        usesNBT: true,
      },
      {
        faculty: 'Law',
        scoreName: 'FPS',
        scoreMax: 600,
        transform: 'FPS = APS (no adjustment).',
        disadvantageFactor: { maxPercent: 10, formula: 'WPS = FPS + (factor% x FPS)' },
        usesNBT: true,
      },
      {
        faculty: 'Science',
        scoreName: 'FPS',
        scoreMax: 800,
        transform: 'FPS = APS + (Mathematics% + Physical Sciences%) — these two subjects are effectively doubled. IT or Life Sciences may substitute for Physical Sciences for certain majors.',
        disadvantageFactor: { maxPercent: 10, formula: 'WPS = FPS + (factor% x FPS)' },
        usesNBT: true,
        note: 'NBT results are written but NOT used for Science admission decisions — only for post-admission Extended Degree Programme (EDP) placement.',
      },
      {
        faculty: 'Health Sciences',
        scoreName: 'FPS',
        scoreMax: 900,
        transform: 'FPS = APS (out of 600) + sum of the three NBT scores (AL + QL + Mathematics, out of 300).',
        disadvantageFactor: { maxPercent: 20, formula: 'WPS = FPS + (factor% x FPS)', note: 'Wider 0-20% band than other faculties.' },
        usesNBT: true,
        note: 'NBT scores are baked directly into the FPS formula here (unlike other faculties, where NBT is a separate gate) — true FPS cannot be computed without NBT data, which this platform does not collect.',
      },
    ],
  },
  applicationsOpen: '2026',
  defaultClosingDate: '2026-07-31T23:59:00+02:00',
  applyUrl: 'https://www.uct.ac.za/apply',
  notes: [
    'UCT applications are for ONE programme choice only (with a formal "change of programme" request process after applying) — this maps directly onto ApplyOnce\'s own one-programme-per-university rule.',
    'All undergraduate applicants normally resident/schooled in South Africa must write the National Benchmark Tests (NBTs) — mandatory faculty-wide, though not always used in the admission decision itself (e.g. Science). NBTs are out of scope for ApplyOnce\'s MVP; the platform cannot evaluate NBT-gated bands (Band B/C, or Health Sciences\' FPS itself).',
    'Applications, NBT writing (for a conditional Health Sciences offer), and student housing all close 31 July 2026 — much earlier than UJ/Wits. No late applications accepted.',
    'Mature-age exemption applicants (23+, no NSC) are not considered for Health Sciences or Law.',
  ],
  programmes: [
    ...UCT_COMMERCE_PROGRAMMES,
    ...UCT_EBE_PROGRAMMES,
    ...UCT_HEALTH_SCIENCES_PROGRAMMES,
    ...UCT_HUMANITIES_PROGRAMMES,
    ...UCT_LAW_PROGRAMMES,
    ...UCT_SCIENCE_PROGRAMMES,
  ],
  type: 'traditional',
  city: 'Cape Town',
  province: 'western_cape',
  website: 'https://www.uct.ac.za',
  applicationPortal: 'https://www.uct.ac.za/apply',
};


// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSITY OF PRETORIA (UP) — full reference implementation
// ═══════════════════════════════════════════════════════════════════════════
// UP uses the same standard NSC 1-7 achievement-level scale as UJ/Wits (6 best
// 20-credit subjects, Life Orientation excluded, max APS 42) — no schema
// changes were needed. Where the prospectus described a two-stage
// Grade-11-conditional / Grade-12-final admission, only the FINAL (lower,
// confirmed) APS number is encoded, since ApplyOnce serves applicants who
// already hold their final NSC results (see CLAUDE.md scope decision).
// Application fee: not stated anywhere in the sourced 2027 prospectus text —
// left at 0 with a note rather than carrying over an unconfirmed guess.
// Source: docs/prospectuses/up/ (UP 2027 Undergraduate Prospectus).

// University of Pretoria (UP) — Programme data extracted from the
// Undergraduate Prospectus 2027 (Applicants with NSC/IEB Certificate).
//
// APS scale: standard nsc_7point, 6 best 20-credit subjects, Life Orientation
// excluded, max APS = 42 (identical model to UJ/Wits — no schema changes needed).
//
// IMPORTANT: Per locked scope rule, wherever the prospectus describes a
// two-stage "conditional on Grade 11 / final on Grade 12" admission (e.g.
// "conditional APS 30 on Grade 11, final admission confirmed with APS 28"),
// ONLY the FINAL/confirmed (lower) number is encoded here as apsMinimum.default,
// since ApplyOnce serves applicants who already hold their final NSC results.
//
// qualificationCode values are SYNTHESISED (pattern UP-<FACULTY-ABBR>-<SLUG>) —
// UP's prospectus does not publish short official codes in this text. Not official.
//
// Application fee: NOT FOUND anywhere in this prospectus text. Left unconfirmed —
// do not invent a number (see report).
//
// maxChoices: UP's own online form allows first + second choice, but ApplyOnce
// restricts every student to ONE programme per university (locked product rule).
// That is set on the University object (handled separately, not here).


// ─── FACULTY OF ECONOMIC AND MANAGEMENT SCIENCES ───────────────────────────
// Table column order in the prospectus: English (Home/FAL) | Mathematics | APS

export const UP_EMS_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UP-EMS-BADMIN-PAIR',
    universityId: 'up',
    name: 'Bachelor of Administration specialising in Public Administration and International Relations',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 4, altGroup: 'maths' },
      ],
    },
    careers: ['Diplomat', 'Political analyst', 'Public sector manager', 'Local government official', 'NGO/international organisation staff'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-ACC',
    universityId: 'up',
    name: 'Bachelor of Commerce in Accounting Sciences',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
    careers: ['Chartered accountant (CA) track', 'External auditor', 'Government auditor', 'Tax professional', 'Financial director'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-INVMAN',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Investment Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
    careers: ['Portfolio/fund manager', 'Investment analyst', 'Risk manager', 'Wealth manager'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-FINMAN',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Financial Management Sciences',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
    careers: ['Financial reporting specialist', 'Management accountant', 'Tax advisor', 'Internal auditor'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-ECONOMETRICS',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Econometrics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
    careers: ['Econometrician', 'Financial/economic analyst', 'Researcher'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-ECON',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Economics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
    careers: ['Economist', 'Banking analyst', 'Policy researcher'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-LAW',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Law',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
    careers: ['Attorney track', 'Legal advisor', 'Advocate track'],
    note: 'Also listed in the Faculty of Law brochure with the same requirements — modelled once here to avoid a duplicate qualificationCode.',
  },
  {
    qualificationCode: 'UP-EMS-BCOM-STATS',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Statistics and Data Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
    careers: ['Data scientist', 'Statistical analyst', 'Researcher'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-INFOSYS',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Information Systems',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
    careers: ['IT manager', 'Systems analyst', 'Business analyst', 'IT auditor'],
    note: 'Administered jointly with the School of Information Technology (Faculty of EBIT) — same programme, same requirements.',
  },
  {
    qualificationCode: 'UP-EMS-BCOM-AGRIBUS',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Agribusiness Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
    careers: ['Agribusiness manager', 'Commodity trader', 'Policy advisor'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-BUSMAN',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Business Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
    careers: ['General manager', 'Management consultant', 'HR/marketing/finance roles'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-SCM',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Supply Chain Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Supply chain manager', 'Logistics manager', 'Procurement specialist'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-MARKETING',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Marketing Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Product manager', 'Brand manager', 'Marketing researcher'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-HR',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Human Resource Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
    careers: ['HR practitioner', 'HR consultant', 'Labour relations specialist'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-GEN3',
    universityId: 'up',
    name: 'Bachelor of Commerce',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
      note: 'Accounting at school is not a subject requirement for any of the Bachelor of Commerce or Bachelor of Administration programmes.',
    },
    careers: ['Flexible commerce career paths across sectors'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-GEN4',
    universityId: 'up',
    name: 'Bachelor of Commerce (4-year, extended)',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
      ],
      note: 'This is a selection programme — additional selection criteria apply and are communicated by the Faculty.',
    },
    careers: ['Flexible commerce career paths across sectors'],
  },
];

// ─── FACULTY OF EDUCATION ───────────────────────────────────────────────────
// Table column order: English (Home/FAL) only | APS (no Mathematics requirement)

export const UP_EDUCATION_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UP-EDU-ECCE',
    universityId: 'up',
    name: 'Bachelor of Education in Early Childhood Care and Education',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
    },
    careers: ['Pre-primary/primary school teacher'],
  },
  {
    qualificationCode: 'UP-EDU-FOUNDATION',
    universityId: 'up',
    name: 'Bachelor of Education in Foundation Phase Teaching (Grade R–3)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
    },
    careers: ['Pre-primary/primary school teacher'],
  },
  {
    qualificationCode: 'UP-EDU-INTERMEDIATE',
    universityId: 'up',
    name: 'Bachelor of Education in Intermediate Phase Teaching (Grade 4–6)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
    },
    careers: ['Primary school teacher'],
  },
  {
    qualificationCode: 'UP-EDU-SENIOR-FET',
    universityId: 'up',
    name: 'Bachelor of Education in Senior Phase and Further Education and Training Teaching (Grade 7–12)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'For elective modules in Physical Sciences or Life Sciences, applicants must have passed both Mathematics and Physical Sciences at achievement level 5 (60–69%).',
    },
    careers: ['Primary/secondary school teacher'],
  },
  {
    qualificationCode: 'UP-EDU-HCSS-1YR',
    universityId: 'up',
    name: 'Higher Certificate in Sports Sciences',
    qualificationType: 'higher_certificate',
    durationYears: 1,
    faculty: 'Education',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 20 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Selection also considers sports achievements in consultation with TuksSport; preference to applicants nominated by an official UP sports club.',
    },
    careers: ['Sports coaching', 'Exercise industry roles'],
  },
  {
    qualificationCode: 'UP-EDU-HCSS-2YR',
    universityId: 'up',
    name: 'Higher Certificate in Sports Sciences (online)',
    qualificationType: 'online',
    durationYears: 2,
    faculty: 'Education',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 20 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Online programme — students must have at least part-time access to schools/sports clubs/accredited training facilities.',
    },
    careers: ['Sports trainer/coach (community, school, or public/private sector)'],
  },
];

// ─── FACULTY OF ENGINEERING, BUILT ENVIRONMENT AND INFORMATION TECHNOLOGY ──
// School of Engineering table order: English | Mathematics | Physical Sciences | APS

const engineeringDisciplines: { code: string; name: string; careers: string[] }[] = [
  { code: 'CHEM', name: 'Chemical Engineering', careers: ['Chemical engineer (petroleum, food processing, minerals, power generation)'] },
  { code: 'CIVIL', name: 'Civil Engineering', careers: ['Civil engineer (structures, dams, roads, bridges, railways)'] },
  { code: 'COMPUTER', name: 'Computer Engineering', careers: ['Computer engineer (systems, software, networks, embedded systems)'] },
  { code: 'ELECTRICAL', name: 'Electrical Engineering', careers: ['Electrical engineer (power generation, transmission, renewable energy)'] },
  { code: 'ELECTRONIC', name: 'Electronic Engineering', careers: ['Electronic engineer (telecommunications, medical technology, robotics)'] },
  { code: 'INDUSTRIAL', name: 'Industrial Engineering', careers: ['Industrial engineer (production systems, supply chain, quality management)'] },
  { code: 'MECHANICAL', name: 'Mechanical Engineering', careers: ['Mechanical/aeronautical engineer (vehicles, aircraft, turbines, biomedical systems)'] },
  { code: 'METALLURGICAL', name: 'Metallurgical Engineering', careers: ['Metallurgical engineer (minerals processing, materials engineering)'] },
  { code: 'MINING', name: 'Mining Engineering', careers: ['Mining engineer (mine management, technical operations, mine design)'] },
];

// NOTE: UP_ENGINEERING_PROGRAMMES below covers ALL THREE schools in this single
// faculty (School of Engineering, School for the Built Environment, School of
// Information Technology) — one export per faculty, as requested.
export const UP_ENGINEERING_PROGRAMMES: Programme[] = [
  ...engineeringDisciplines.map(({ code, name, careers }): Programme => ({
    qualificationCode: `UP-EBIT-BENG-${code}`,
    universityId: 'up',
    name: `Bachelor of Engineering in ${name}`,
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 35 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 6 },
      ],
    },
    careers,
  })),
  {
    qualificationCode: 'UP-EBIT-BENG-5YR',
    universityId: 'up',
    name: 'Bachelor of Engineering (5-year, any discipline)',
    qualificationType: 'extended_degree',
    durationYears: 5,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 65 },
        { subject: 'mathematics', status: 'required', minPercentage: 65 },
        { subject: 'physicalScience', status: 'required', minPercentage: 65 },
      ],
      note: 'Previously called ENGAGE. Students can apply directly for any engineering discipline. Admission to this programme is determined by final Grade 12 results.',
    },
    careers: ['Entry route into any Engineering discipline'],
  },
  // — School for the Built Environment —
  {
    qualificationCode: 'UP-EBIT-BSC-ARCH',
    universityId: 'up',
    name: 'Bachelor of Science in Architecture',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
      note: 'Will only be considered as a first-choice programme. Selection includes an interview.',
    },
    careers: ['Candidate architectural technologist (SACAP registration route)'],
  },
  // NOTE (judgement call): the raw OCR text lists these three Built Environment
  // programmes as "5  5 or Accounting  30  4" — the APS figure (30) appears
  // between the Mathematics-or-Accounting cell and the Physical Sciences cell,
  // out of the column order used everywhere else in this faculty (English |
  // Mathematics | Physical Sciences | APS). We infer the intended reading is
  // English=5, Mathematics-or-Accounting=5, Physical Sciences=4, APS=30 (matching
  // the consistent pattern of the surrounding rows) rather than a genuinely
  // different table layout. Flagged as an assumption in the report.
  {
    qualificationCode: 'UP-EBIT-BSC-CONSTMAN',
    universityId: 'up',
    name: 'Bachelor of Science in Construction Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'quant' },
        { subject: 'accounting', status: 'alternative', minRating: 5, altGroup: 'quant' },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Construction site manager', 'Candidate professional construction manager (with honours)'],
  },
  {
    qualificationCode: 'UP-EBIT-BSC-REALESTATE',
    universityId: 'up',
    name: 'Bachelor of Science in Real Estate',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'quant' },
        { subject: 'accounting', status: 'alternative', minRating: 5, altGroup: 'quant' },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Property investment/finance', 'Facilities management', 'Professional property valuer (with honours)'],
  },
  {
    qualificationCode: 'UP-EBIT-BSC-QS',
    universityId: 'up',
    name: 'Bachelor of Science in Quantity Surveying',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'quant' },
        { subject: 'accounting', status: 'alternative', minRating: 5, altGroup: 'quant' },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Candidate professional quantity surveyor (with honours)'],
  },
  {
    qualificationCode: 'UP-EBIT-BTRP',
    universityId: 'up',
    name: 'Bachelor of Town and Regional Planning',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Town and regional planner', 'Development practitioner', 'Urban manager'],
  },
  // — School of Information Technology —
  {
    qualificationCode: 'UP-EBIT-BIS',
    universityId: 'up',
    name: 'Bachelor of Information Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'If specialising in Information Systems at first-year level, achievement level 5 in Mathematics is required.',
    },
    careers: ['Information/knowledge manager', 'E-commerce specialist', 'Information systems developer'],
  },
  {
    qualificationCode: 'UP-EBIT-BIS-PUBLISHING',
    universityId: 'up',
    name: 'Bachelor of Information Science specialising in Publishing',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
    },
    careers: ['Publishing house assistant/commissioning editor', 'Copy editor', 'Marketing/production roles'],
  },
  {
    qualificationCode: 'UP-EBIT-BIS-MULTIMEDIA',
    universityId: 'up',
    name: 'Bachelor of Information Science specialising in Multimedia',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
      note: 'Possible future name change to Bachelor of Information Science specialising in Interactive Technology.',
    },
    careers: ['Programmer', 'Web designer', 'Animation specialist', 'Video editor'],
  },
  {
    qualificationCode: 'UP-EBIT-BIT-INFOSYS',
    universityId: 'up',
    name: 'Bachelor of Information Technology in Information Systems',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
    careers: ['Data scientist', 'IT auditor', 'Business analyst', 'Project manager'],
  },
  {
    qualificationCode: 'UP-EBIT-BSC-COMPSCI',
    universityId: 'up',
    name: 'Bachelor of Science in Computer Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
    careers: ['Programmer', 'Systems analyst/architect', 'Database administrator'],
  },
  {
    qualificationCode: 'UP-EBIT-BSC-ITKS',
    universityId: 'up',
    name: 'Bachelor of Science in Information Technology in Information and Knowledge Systems',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
    careers: ['Data scientist', 'GIS specialist', 'Software developer'],
  },
];

// ─── FACULTY OF HEALTH SCIENCES ────────────────────────────────────────────
// Table order (where all 3 subjects present): English | Mathematics | Physical Sciences | APS

export const UP_HEALTH_SCIENCES_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UP-HS-DENTAL-SURGERY',
    universityId: 'up',
    name: 'Bachelor of Dental Surgery',
    qualificationType: 'degree',
    durationYears: 5,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 35 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
      note: 'Selection is based on the candidate’s final Grade 11 examination results.',
    },
    careers: ['Dentist', 'Dental specialist', 'Academic/researcher'],
  },
  {
    qualificationCode: 'UP-HS-ORAL-HYGIENE',
    universityId: 'up',
    name: 'Bachelor of Oral Hygiene',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 25 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Oral hygienist'],
  },
  {
    qualificationCode: 'UP-HS-DIETETICS',
    universityId: 'up',
    name: 'Bachelor of Dietetics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Dietician', 'Academic/researcher'],
  },
  {
    qualificationCode: 'UP-HS-NURSING',
    universityId: 'up',
    name: 'Bachelor of Nursing Science',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'not_accepted' },
      ],
      note: 'Life Sciences required (not Physical Sciences).',
    },
    careers: ['General nurse', 'Midwife'],
  },
  {
    qualificationCode: 'UP-HS-OCC-THERAPY',
    universityId: 'up',
    name: 'Bachelor of Occupational Therapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Occupational therapist', 'Academic/researcher'],
  },
  {
    qualificationCode: 'UP-HS-PHYSIOTHERAPY',
    universityId: 'up',
    name: 'Bachelor of Physiotherapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Physiotherapist', 'Academic/researcher'],
  },
  {
    qualificationCode: 'UP-HS-RADIOGRAPHY',
    universityId: 'up',
    name: 'Bachelor of Radiography in Diagnostics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Radiographer', 'Academic/researcher'],
  },
  {
    qualificationCode: 'UP-HS-BCMP',
    universityId: 'up',
    name: 'Bachelor of Clinical Medical Practice (BCMP)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Selection is based on the candidate’s final Grade 11 results and the Biographical Information Form.',
    },
    careers: ['Clinical associate', 'Academic/researcher'],
  },
  {
    qualificationCode: 'UP-HS-MBCHB',
    universityId: 'up',
    name: 'Bachelor of Medicine and Surgery (MBChB)',
    qualificationType: 'degree',
    durationYears: 6,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 35 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
      note: 'Selection is based on the candidate’s final Grade 11 results. Applicants from countries with their own medical schools cannot apply.',
    },
    careers: ['General medical practitioner', 'Specialist (postgraduate)'],
  },
  {
    qualificationCode: 'UP-HS-SPORTS-SCIENCE',
    universityId: 'up',
    name: 'Bachelor of Sports Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
    },
    careers: ['Sports scientist', 'Biokineticist (with honours)', 'Personal trainer', 'Strength and conditioning specialist'],
  },
];

// ─── FACULTY OF HUMANITIES ──────────────────────────────────────────────────

export const UP_HUMANITIES_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UP-HUM-BA-SLP',
    universityId: 'up',
    name: 'Bachelor of Arts in Speech-Language Pathology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'english', status: 'required', minRating: 5 },
      ],
      note: 'Selection based on academic achievement; only 50 students admitted. Conditional selection process starts in August.',
    },
    careers: ['Speech-language pathologist (education, health, private practice)'],
  },
  {
    qualificationCode: 'UP-HUM-BA-AUDIOLOGY',
    universityId: 'up',
    name: 'Bachelor of Arts in Audiology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'english', status: 'required', minRating: 5 },
      ],
      note: 'Selection based on academic achievement; only 50 students admitted. Conditional selection process starts in August.',
    },
    careers: ['Audiologist (diagnostic and rehabilitative)'],
  },
  {
    qualificationCode: 'UP-HUM-BA-INFODESIGN',
    universityId: 'up',
    name: 'Bachelor of Arts in Information Design',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28 (final NSC/IEB results).',
    },
    additionalRequirements: ['portfolio'],
    careers: ['Animator', 'Graphic designer', 'Illustrator', 'Art director'],
  },
  {
    qualificationCode: 'UP-HUM-BA-GENERAL',
    universityId: 'up',
    name: 'Bachelor of Arts',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28.',
    },
    careers: ['Community development', 'Counselling', 'Diplomacy and politics', 'Journalism', 'Language services'],
  },
  {
    qualificationCode: 'UP-HUM-BSOCWORK',
    universityId: 'up',
    name: 'Bachelor of Social Work',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28. Continued enrolment requires departmental selection at end of year 1.',
    },
    careers: ['Social worker'],
  },
  {
    qualificationCode: 'UP-HUM-BA-LAW',
    universityId: 'up',
    name: 'Bachelor of Arts specialising in Law',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
    },
    careers: ['Lawyer (BA(Law) + LLB required)'],
    note: 'Also listed in the Faculty of Law brochure with the same requirements — modelled once here.',
  },
  {
    qualificationCode: 'UP-HUM-BA-LANGUAGES',
    universityId: 'up',
    name: 'Bachelor of Arts specialising in Languages',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28.',
    },
    careers: ['Advertising', 'Editing', 'Language teaching', 'Translation', 'Publishing'],
  },
  {
    qualificationCode: 'UP-HUM-BSOCSCI-INDSOC',
    universityId: 'up',
    name: 'Bachelor of Social Science specialising in Industrial Sociology and Labour Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28.',
    },
    careers: ['Labour relations practice', 'Arbitration', 'Conflict management'],
  },
  {
    qualificationCode: 'UP-HUM-BSOCSCI-HERITAGE',
    universityId: 'up',
    name: 'Bachelor of Social Science in Heritage and Cultural Sciences (Option: Heritage and Cultural Tourism)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28. Possible name change to "Bachelor of Social Science specialising in Heritage and Cultural Tourism".',
    },
    careers: ['Tourism', 'Museum and heritage sector', 'Hospitality management'],
  },
  {
    qualificationCode: 'UP-HUM-BMUS-4YR',
    universityId: 'up',
    name: 'Bachelor of Music (4-year)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Music achievement level 4 (50–59%) or Grade VII practical/Grade V theory (Unisa/Royal Schools/Trinity) or comparable, plus practical audition and theory test passed at 60%. Conditional admission Grade 11 APS 30; final admission APS 28.',
    },
    additionalRequirements: ['audition'],
    careers: ['Music teacher', 'Performer', 'Orchestral musician', 'Composer'],
  },
  {
    qualificationCode: 'UP-HUM-BMUS-5YR',
    universityId: 'up',
    name: 'Bachelor of Music (5-year)',
    qualificationType: 'extended_degree',
    durationYears: 5,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Music achievement level 4 (50–59%) or Grade V practical/Grade III theory or comparable, plus audition and theory test passed at 50%. If admitted, cannot also be considered for any other Faculty of Humanities degree.',
    },
    additionalRequirements: ['audition'],
    careers: ['Music teacher', 'Performer', 'Orchestral musician', 'Composer'],
  },
  {
    qualificationCode: 'UP-HUM-BDRAMA-3YR',
    universityId: 'up',
    name: 'Bachelor of Drama (3-year)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28. Admissions take place in August and on an ad-hoc basis.',
    },
    additionalRequirements: ['audition'],
    careers: ['Actor', 'Theatre director', 'Stage manager', 'Playwright/scriptwriter'],
  },
  {
    qualificationCode: 'UP-HUM-BDRAMA-4YR',
    universityId: 'up',
    name: 'Bachelor of Drama (4-year, foundation)',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'First year is a foundation year. Applicants who meet the criteria for the 3-year programme must apply for that programme instead.',
    },
    additionalRequirements: ['audition'],
    careers: ['Actor', 'Theatre director', 'Stage manager', 'Playwright/scriptwriter'],
  },
  {
    qualificationCode: 'UP-HUM-BA-PPE',
    universityId: 'up',
    name: 'Bachelor of Arts specialising in Philosophy, Politics and Economics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'english', status: 'required', minRating: 5 },
      ],
      note: 'Applicants with APS 32, Mathematics 4 and English 5 (not meeting the Mathematics 5 requirement) may enter another programme in year 1 and transfer internally in year 2 via STC 110/STC 122.',
    },
    careers: ['Economic/political policy-making', 'Journalism', 'Diplomatic service'],
  },
  {
    qualificationCode: 'UP-HUM-BPOLSCI-INTL',
    universityId: 'up',
    name: 'Bachelor of Political Science specialising in International Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28.',
    },
    careers: ['International relations', 'Diplomatic service', 'Policy analysis', 'Strategic intelligence'],
  },
  {
    qualificationCode: 'UP-HUM-BPOLSCI-POLITICAL',
    universityId: 'up',
    name: 'Bachelor of Political Science specialising in Political Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28.',
    },
    careers: ['Policy analysis', 'Political communication', 'Governance', 'Conflict resolution'],
  },
  {
    qualificationCode: 'UP-HUM-BA-FINEARTS-4YR',
    universityId: 'up',
    name: 'Bachelor of Arts in Fine Arts (4-year)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28. UP competency test (conceptualisation, drawing, interview, A4 portfolio) each at min 60%.',
    },
    additionalRequirements: ['portfolio'],
    careers: ['Gallery manager', 'Art educator', 'Fine artist'],
  },
  {
    qualificationCode: 'UP-HUM-BA-FINEARTS-5YR',
    universityId: 'up',
    name: 'Bachelor of Arts in Fine Arts (5-year)',
    qualificationType: 'extended_degree',
    durationYears: 5,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'UP competency test (conceptualisation, drawing, interview, A4 portfolio) each at min 50%.',
    },
    additionalRequirements: ['portfolio'],
    careers: ['Gallery manager', 'Art educator', 'Fine artist'],
  },
  {
    qualificationCode: 'UP-HUM-BA-VISUALSTUDIES',
    universityId: 'up',
    name: 'Bachelor of Arts specialising in Visual Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28.',
    },
    careers: ['Art/film critic', 'Visual culture specialist', 'Curator', 'Gallery manager'],
  },
];

// ─── FACULTY OF LAW ──────────────────────────────────────────────────────────
// Note: Bachelor of Commerce specialising in Law and Bachelor of Arts specialising
// in Law are also listed in this faculty's brochure with identical requirements
// to the EMS and Humanities entries above — modelled once each there to avoid
// duplicate qualificationCodes for what is the same physical programme.

export const UP_LAW_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UP-LAW-LLB',
    universityId: 'up',
    name: 'Bachelor of Laws (LLB)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Law',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 35 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 6 }],
      note: 'Faculty aims for at least 50% of the first-year class from designated groups. Late conditional admission possible for APS 38+ with English level 6+.',
    },
    careers: ['Attorney', 'Advocate', 'Legal advisor', 'Prosecutor', 'Magistrate/judge track'],
  },
];

// ─── FACULTY OF THEOLOGY AND RELIGION ───────────────────────────────────────

export const UP_THEOLOGY_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UP-THEO-BTHEOL',
    universityId: 'up',
    name: 'Bachelor of Theology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Theology and Religion',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
    },
    careers: ['Minister', 'Pastor', 'Priest', 'Missionary', 'Ethics consultant'],
  },
  {
    qualificationCode: 'UP-THEO-BDIVINITY',
    universityId: 'up',
    name: 'Bachelor of Divinity',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Theology and Religion',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
    },
    careers: ['Minister', 'Pastor', 'Priest', 'Missionary'],
  },
  {
    qualificationCode: 'UP-THEO-DIP',
    universityId: 'up',
    name: 'Diploma in Theology',
    qualificationType: 'diploma',
    durationYears: 3,
    faculty: 'Theology and Religion',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 24 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Intended for candidates who completed NSC/IEB (or equivalent) but without the required university admission for the Bachelor programmes.',
    },
    careers: ['Minister', 'Pastor', 'Lay preacher', 'Missionary'],
  },
];

// ─── FACULTY OF NATURAL AND AGRICULTURAL SCIENCES ──────────────────────────
// Agricultural/Food Sciences and Biological Sciences tables: English | Mathematics | Physical Sciences | APS

const nasStandard532 = (
  code: string,
  name: string,
  durationYears: number,
  careers: string[],
  note?: string,
): Programme => ({
  qualificationCode: `UP-NAS-${code}`,
  universityId: 'up',
  name,
  qualificationType: 'degree',
  durationYears,
  faculty: 'Natural and Agricultural Sciences',
  campus: ['Hatfield'],
  admission: {
    apsMinimum: { default: 32 },
    subjectRequirements: [
      { subject: 'english', status: 'required', minRating: 5 },
      { subject: 'mathematics', status: 'required', minRating: 5 },
      { subject: 'physicalScience', status: 'required', minRating: 5 },
    ],
    ...(note ? { note } : {}),
  },
  careers,
});

export const UP_NAS_PROGRAMMES: Programme[] = [
  // Agricultural and Food Sciences (all APS 32, English5/Maths5/PhysSci5)
  nasStandard532('BSC-AGRIC-ECON', 'Bachelor of Science in Agriculture in Agricultural Economics / Agribusiness Management', 4, [
    'Agricultural economist', 'Commodity trader', 'Agribusiness advisor',
  ]),
  nasStandard532('BSC-AGRIC-ANIMAL', 'Bachelor of Science in Agriculture in Animal Science', 4, [
    'Livestock production specialist', 'Animal nutrition/breeding consultant',
  ]),
  nasStandard532('BSC-AGRIC-PLANTSOIL', 'Bachelor of Science in Agriculture in Applied Plant and Soil Sciences', 4, [
    'Agricultural researcher', 'Crop/soil management consultant',
  ]),
  nasStandard532('BSC-AGRIC-PLANTPATH', 'Bachelor of Science in Agriculture in Plant Pathology', 4, [
    'Plant pathologist', 'Agricultural extension specialist',
  ]),
  nasStandard532('BSC-FOODMAN-CULINARY', 'Bachelor of Science in Food Management (Option: Culinary Science)', 4, [
    'Culinary scientist', 'Food product developer', 'Food service manager',
  ]),
  nasStandard532('BSC-FOODMAN-NUTRITION', 'Bachelor of Science in Food Management (Option: Nutritional Science)', 4, [
    'Nutrition-focused food industry roles', 'Public health/NGO roles',
  ], 'Interfaculty programme with the Faculty of Health Sciences (Human Nutrition).'),
  nasStandard532('BSC-FOODSCIENCE', 'Bachelor of Science in Food Science', 3, [
    'Food safety/quality assurance manager', 'Food chemist/microbiologist',
  ]),
  // Biological Sciences (all APS 32, English5/Maths5/PhysSci5)
  nasStandard532('BSC-BIOCHEMISTRY', 'Bachelor of Science in Biochemistry', 3, [
    'Researcher (pharmaceutical, food, waste-processing industries)',
  ]),
  nasStandard532('BSC-BIOTECHNOLOGY', 'Bachelor of Science in Biotechnology', 3, [
    'Laboratory researcher', 'Bio-entrepreneur',
  ]),
  nasStandard532('BSC-ECOLOGY', 'Bachelor of Science in Ecology', 3, [
    'Conservation scientist', 'Environmental consultant',
  ]),
  nasStandard532('BSC-ENTOMOLOGY', 'Bachelor of Science in Entomology', 3, [
    'Insect management specialist', 'Agricultural/conservation researcher',
  ]),
  nasStandard532('BSC-GENETICS', 'Bachelor of Science in Genetics / Bachelor of Science in Human Genetics', 3, [
    'Molecular biologist', 'Genetic counsellor', 'Bioinformaticist',
  ]),
  nasStandard532('BSC-HUMANPHYSIO', 'Bachelor of Science in Human Physiology (incl. Genetics and Psychology option)', 3, [
    'Research roles with medical teams', 'Sports physiology', 'Biostatistics',
  ]),
  nasStandard532('BSC-MEDSCIENCES', 'Bachelor of Science in Medical Sciences', 3, [
    'Anatomy/physiology researcher', 'Forensic science', 'Health science industry',
  ]),
  nasStandard532('BSC-MICROBIOLOGY', 'Bachelor of Science in Microbiology', 3, [
    'Food/dairy/fermentation industry roles', 'Medical/veterinary microbiology',
  ]),
  nasStandard532('BSC-PLANTSCIENCE', 'Bachelor of Science in Plant Science', 3, [
    'Plant researcher', 'Biotechnology/pharmaceutical roles',
  ]),
  nasStandard532('BSC-ZOOLOGY', 'Bachelor of Science in Zoology', 3, [
    'Conservation scientist', 'Environmental consultant',
  ]),
  // Consumer Science (English | Mathematics | APS — no Physical Sciences column)
  {
    qualificationCode: 'UP-NAS-BCONSUMER-CLOTHING',
    universityId: 'up',
    name: 'Bachelor of Consumer Science specialising in Clothing Retail Management',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Brand manager', 'Clothing buyer/planner', 'Fashion designer/marketer'],
  },
  {
    qualificationCode: 'UP-NAS-BCONSUMER-FOOD',
    universityId: 'up',
    name: 'Bachelor of Consumer Science specialising in Food Management',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Brand manager', 'Food stylist', 'Consumer insight specialist'],
  },
  // Mathematical Sciences (English | Mathematics | APS)
  {
    qualificationCode: 'UP-NAS-BSC-ACTUARIAL',
    universityId: 'up',
    name: 'Bachelor of Science in Actuarial and Financial Mathematics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 36 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 7 },
      ],
    },
    careers: ['Actuary/actuarial technician', 'Financial engineer'],
  },
  {
    qualificationCode: 'UP-NAS-BSC-MATHEMATICS',
    universityId: 'up',
    name: 'Bachelor of Science in Mathematics / Bachelor of Science in Applied Mathematics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
    careers: ['Researcher', 'Educator', 'Financial/engineering modelling roles'],
  },
  {
    qualificationCode: 'UP-NAS-BSC-MATHSTATS',
    universityId: 'up',
    name: 'Bachelor of Science in Mathematical Statistics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
    careers: ['Data scientist', 'Financial/risk analyst', 'Biostatistician'],
  },
  // Physical Sciences (English | Mathematics | Physical Sciences | APS, all APS 34)
  ...[
    ['BSC-CHEMISTRY', 'Bachelor of Science in Chemistry', ['Synthetic chemist', 'Materials scientist', 'Analytical chemist']],
    ['BSC-ENVENGGEOLOGY', 'Bachelor of Science in Environmental and Engineering Geology', ['Environmental/engineering geologist', 'Hydrogeologist']],
    ['BSC-GEOGRAPHY', 'Bachelor of Science in Geography (Option: Geography and Environmental Science)', ['Environmental manager', 'Urban/regional development consultant']],
    ['BSC-GEOINFORMATICS', 'Bachelor of Science in Geoinformatics', ['Geospatial/GIS consultant', 'Candidate Geomatics Practitioner']],
    ['BSC-GEOLOGY', 'Bachelor of Science in Geology', ['Mining geologist', 'Environmental/engineering geologist']],
    ['BSC-METEOROLOGY', 'Bachelor of Science in Meteorology', ['Weather forecaster', 'Climate researcher']],
    ['BSC-PHYSICS', 'Bachelor of Science in Physics', ['Researcher', 'Radiation/medical scientist', 'Geophysicist']],
  ].map(([code, name, careers]): Programme => ({
    qualificationCode: `UP-NAS-${code}`,
    universityId: 'up',
    name: name as string,
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
    },
    careers: careers as string[],
  })),
  // Extended (lower-entry) 4-/5-year Bachelor of Science programmes — percentage-based requirements
  {
    qualificationCode: 'UP-NAS-BSC-MATHEMATICS-EXT',
    universityId: 'up',
    name: 'Bachelor of Science in Mathematics (extended)',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 58 },
        { subject: 'mathematics', status: 'required', minPercentage: 65 },
      ],
      note: 'Extended (augmented) programme with additional academic support for students who, due to exceptional circumstances, benefit from it.',
    },
    careers: ['Same career paths as mainstream Bachelor of Science in Mathematics'],
  },
  ...['BSC-CHEMISTRY', 'BSC-GEOINFORMATICS', 'BSC-GEOLOGY', 'BSC-METEOROLOGY', 'BSC-PHYSICS'].map((code): Programme => ({
    qualificationCode: `UP-NAS-${code}-EXT`,
    universityId: 'up',
    name: `${
      { 'BSC-CHEMISTRY': 'Bachelor of Science in Chemistry', 'BSC-GEOINFORMATICS': 'Bachelor of Science in Geoinformatics', 'BSC-GEOLOGY': 'Bachelor of Science in Geology', 'BSC-METEOROLOGY': 'Bachelor of Science in Meteorology', 'BSC-PHYSICS': 'Bachelor of Science in Physics' }[code]
    } (extended)`,
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 58 },
        { subject: 'mathematics', status: 'required', minPercentage: 58 },
        { subject: 'physicalScience', status: 'required', minPercentage: 58 },
      ],
      note: 'Extended (augmented) programme with additional academic support. Students transferring into a 4-year Bachelor of Engineering programme after year 1 need 70% in Mathematics/Physical Sciences and 65% in Languages.',
    },
    careers: ['Same career paths as the mainstream 3-year equivalent'],
  })),
  ...[
    ['BSC-AGRIC-PLANTSOIL-EXT', 'Bachelor of Science in Agriculture in Applied Plant and Soil Sciences (extended)', 5],
    ['BSC-AGRIC-PLANTPATH-EXT', 'Bachelor of Science in Agriculture in Plant Pathology (extended)', 5],
    ['BSC-ECOLOGY-EXT', 'Bachelor of Science in Ecology (extended)', 4],
    ['BSC-HUMANPHYSIO-EXT', 'Bachelor of Science in Human Physiology (extended)', 4],
  ].map(([code, name, years]): Programme => ({
    qualificationCode: `UP-NAS-${code}`,
    universityId: 'up',
    name: name as string,
    qualificationType: 'extended_degree',
    durationYears: years as number,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 58 },
        { subject: 'mathematics', status: 'required', minPercentage: 58 },
        { subject: 'physicalScience', status: 'required', minPercentage: 58 },
      ],
      note: 'Extended (augmented) programme with additional academic support. Maximum 30 students per programme; preference given to quintile 1–4 school applicants.',
    },
    careers: ['Same career paths as the mainstream equivalent'],
  })),
];

// ─── FACULTY OF VETERINARY SCIENCE ─────────────────────────────────────────
// Closing date 31 May 2026 (earlier than all other faculties, which close 30 June).
// Campus: Onderstepoort (not Hatfield).

export const UP_VET_SCIENCE_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UP-VET-BVETSCI',
    universityId: 'up',
    name: 'Bachelor of Veterinary Science',
    qualificationType: 'degree',
    durationYears: 6,
    faculty: 'Veterinary Science',
    campus: ['Onderstepoort'],
    closingDateOverride: '2026-05-31T12:00:00+02:00',
    admission: {
      apsMinimum: { default: 35 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'technicalMathematics', status: 'not_accepted' },
      ],
      note: 'School-leaving applicants are conditionally selected on Grade 11 results; final NSC results must not drop Merit Point Score by more than 5% to retain the place. Only Mathematics is considered — Mathematical Literacy and Technical Mathematics are not accepted.',
    },
    careers: ['Veterinarian (private practice, state veterinary services, research, wildlife management)'],
  },
  {
    qualificationCode: 'UP-VET-BVETNURSING',
    universityId: 'up',
    name: 'Bachelor of Veterinary Nursing',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Veterinary Science',
    campus: ['Onderstepoort'],
    closingDateOverride: '2026-05-31T12:00:00+02:00',
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
    },
    careers: ['Veterinary nurse (clinics, hospitals, animal welfare, research centres)'],
  },
];

const UP: University = {
  id: 'up',
  name: 'University of Pretoria',
  shortName: 'UP',
  applicationSystem: 'Custom portal',
  applicationFee: 0,
  feeNote: 'No application fee is stated in the sourced 2027 Undergraduate Prospectus text. Verify directly via UP\'s application portal before relying on this figure.',
  maxChoices: 1,
  choicesRanked: false,
  choicesIndependent: true,
  choicesFinal: true,
  apsRule: {
    method: 'standard_aps',
    subjectsCounted: 6,
    includesLifeOrientation: false,
    scale: 'nsc_7point',
    note: 'Six best 20-credit NSC subjects, Life Orientation excluded. Maximum APS = 42.',
  },
  applicationsOpen: '2026',
  defaultClosingDate: '2026-06-30T23:59:00+02:00',
  applyUrl: 'https://www.up.ac.za/apply',
  notes: [
    'UP\'s own online application form allows a first- and second-choice programme as a fallback mechanism — ApplyOnce restricts every student to ONE programme per university (a platform-wide rule), so maxChoices is set to 1 regardless of UP\'s own two-choice form.',
    'Applications for the Faculty of Veterinary Science close 31 May 2026 (earlier than all other faculties, which close 30 June 2026) — modelled via closingDateOverride on the two Veterinary Science programmes.',
    'Where the prospectus describes conditional admission on Grade 11 results with a different final NSC threshold, only the final/confirmed threshold is modelled — ApplyOnce applicants already hold final results.',
  ],
  programmes: [
    ...UP_EMS_PROGRAMMES,
    ...UP_EDUCATION_PROGRAMMES,
    ...UP_ENGINEERING_PROGRAMMES,
    ...UP_HEALTH_SCIENCES_PROGRAMMES,
    ...UP_HUMANITIES_PROGRAMMES,
    ...UP_LAW_PROGRAMMES,
    ...UP_THEOLOGY_PROGRAMMES,
    ...UP_NAS_PROGRAMMES,
    ...UP_VET_SCIENCE_PROGRAMMES,
  ],
  type: 'traditional',
  city: 'Pretoria',
  province: 'gauteng',
  website: 'https://www.up.ac.za',
  applicationPortal: 'https://www.up.ac.za/apply',
};


// ═══════════════════════════════════════════════════════════════════════════
// STELLENBOSCH UNIVERSITY (SU) — full reference implementation
// ═══════════════════════════════════════════════════════════════════════════
// SU uses a THIRD distinct APS model: an "aggregate" — the AVERAGE percentage
// across ALL NSC subjects (excluding Life Orientation), not a sum (unlike
// UCT's sum-to-600 or UJ/Wits/UP's 1-7 point scale). Subject minimums are also
// raw percentages (minPercentage, not minRating).
// NBTs are the INVERSE of UCT/UP here: NOT required for 2027 admission at all,
// EXCEPT for every Faculty of Law programme — so additionalRequirements:
// ['NBT'] appears only on Law programmes below.
// Faculty of Science applies its own weighted "Selection Mark" on top of the
// bare-minimum aggregate (see apsRule.facultyScoring) — actual selection is
// more competitive than the floor numbers shown per programme.
// Source: docs/prospectuses/su/ (SU 2027 Undergraduate Prospectus).
// NOTE: this sourced document did not include a general "how to apply" page
// with application fee / universal closing date — those two fields below
// are carried over from prior placeholder data and are UNCONFIRMED against
// this specific prospectus; verify via www.maties.com before relying on them.

// Stellenbosch University (SU) — Programme[] data extracted from the 2027
// Undergraduate Prospectus. To be spliced into src/constants/universities.ts.
//
// University-level ApsRule (set by caller, not here):
//   scale: 'percentage_average', method: 'custom' (or similar), the base
//   "aggregate" = average % across ALL NSC subjects excluding Life Orientation.
//
// MODELLING NOTES (see report for full detail):
// - English/Afrikaans alternative: modelled as two (or more) SubjectRequirement
//   rows sharing an altGroup, keyed on 'english' / 'afrikaans' (each already
//   matches both Home Language and First Additional Language forms per
//   matchesSubjectKey in types/university.ts). A trailing comment on each row
//   notes whether the percentage is the HL or FAL figure.
// - NBT tagged ONLY on Faculty of Law programmes (additionalRequirements: ['NBT']),
//   per SU being the exception where NBTs are NOT required except for Law.
// - "60% or 70% depending on first-year Mathematics/Physics combination" in the
//   Faculty of Science: modelled with the HIGHER figure as apsMinimum default
//   (the more conservative / non-Bio track) except where the source text states
//   the LOWER figure as the primary threshold and the higher one only as an
//   elevated alternative (BSc GeoInformatics) — in all cases the other branch is
//   captured in `note`.
// - Faculty of Science programmes carry a `note` pointing out the actual
//   Selection Mark (SM) is a weighted formula higher than this bare minimum
//   (SM = [(Mathematics x 2) + 5 other subjects, at least one English/Afrikaans,
//   excluding LO] / 7) — see faculty-level facultyScoring, not re-derived here.
// - Programmes requiring a prior bachelor's degree rather than NSC results
//   (LLB three-year second-degree route, Advanced Diploma in Practical Music)
//   are OMITTED — out of scope for an NSC/matric-results-based applicant flow.
// - PGCE (postgraduate teaching certificate) omitted for the same reason.
// - Bachelor of Data Science (BDatSci) is a genuine interfaculty programme that
//   recurs in the prospectus once per contributing faculty (Agrisciences, EMS,
//   Science) with different focal areas each time but IDENTICAL admission
//   numbers (aggregate 80%, Mathematics 80%, HL 60%/FAL 75% language gate).
//   Modelled as one Programme entry per faculty occurrence (3 total), each
//   carrying only the focal areas named in that faculty's section.
// - A few programmes/entries physically appear under the wrong faculty header
//   in the OCR'd text (evidently a column-order artifact in the source PDF):
//   BCom (Management Accounting) and BCom (Financial Accounting) print under
//   "FACULTY OF EDUCATION" but are obviously Economic and Management Sciences
//   programmes — placed there. Likewise "Diploma in Sustainable Development"
//   and "BCom (Economic Sciences)" print at the tail of the Arts and Social
//   Sciences pages but are grouped with the Faculty of Economic and Management
//   Sciences here (matches SU's real-world faculty structure: Sustainable
//   Development sits under the School of Public Leadership within EMS).
// - Agrisciences' generic ECP note ("Combination 1 / Combination 2" Mathematics
//   band + Physical Sciences band, applicable to nearly all Agrisciences
//   programmes as a 4-year extended route) is NOT modelled as separate
//   Programme entries: the admission logic is a percentage BAND (e.g.
//   "Mathematics between 55% and 59.9%"), which SubjectRequirement.minPercentage
//   (a single floor) cannot represent, and no distinct qualification code/name
//   is given per programme for the ECP variant. Captured in a `note` instead.


// ─── FACULTY OF AGRISCIENCES ────────────────────────────────────────────────

export const SU_AGRISCIENCES_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'SU-AGRI-BAGRIC-AGRIBUSINESS',
    universityId: 'su',
    name: 'BAgric in Agribusiness Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Also offered as a 4-year Extended Curriculum Programme (Mathematics/Physical Sciences band-combination admission — not modelled here, schema represents single-floor minimums only; see faculty selection guidelines).',
    },
    careers: ['Agribusiness manager (crop or animal production)', 'Agricultural economist at a financial institution'],
    note: 'Similar programmes: BScAgric in Agricultural Economic Analysis and Management; BCom (Management Sciences) focal area Agricultural Economics.',
  },
  {
    qualificationCode: 'SU-AGRI-BSCAGRIC-AGRIECON',
    universityId: 'su',
    name: 'BScAgric in Agricultural Economics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Fields of study: Agricultural Economic Analysis; Agricultural Economic Analysis and Management; Agricultural Economic Analysis and Management with Food Science; Agricultural Economics with Food Science. Also available as an Extended Curriculum Programme (see Agrisciences ECP note).',
    },
    careers: ['Agricultural policy researcher', 'Agricultural economist (financial/marketing institution)', 'Food-processing manager'],
  },
  {
    qualificationCode: 'SU-AGRI-BAGRIC-ELSENBURG',
    universityId: 'su',
    name: 'BAgric in Agricultural Production and Management (Elsenburg)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agrisciences',
    campus: ['Elsenburg'],
    admission: {
      apsMinimum: { default: 55 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'alternative', minPercentage: 50, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minPercentage: 60, altGroup: 'maths' },
        { subject: 'physicalScience', status: 'alternative', minPercentage: 50, altGroup: 'science' },
        { subject: 'lifeScience', status: 'alternative', minPercentage: 50, altGroup: 'science' },
      ],
      note: 'Science alternative also accepts Agricultural Sciences 50% (no SubjectKey exists for Agricultural Sciences — not modelled). Offered in collaboration with Elsenburg Agricultural Training Institute; students reside on the Elsenburg campus. Fields of study: Animal Production; Cellar Management; Cellar Technology; Extension and Animal Production; Extension and Plant Production; Plant Production; Plant and Animal Production. Not available as an ECP.',
    },
    careers: [],
  },
  {
    qualificationCode: 'SU-AGRI-BSCFOR-FORESTRY-NATRES',
    universityId: 'su',
    name: 'BSc in Forestry (Forestry and Natural Resources Sciences)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'BScFor (Forestry and Wood Sciences), Forestry and Natural Resources Sciences field. Also available as a 4-year ECP with a Mathematics 55-59.9%/Physical Sciences >=50% OR Mathematics >=60%/Physical Sciences 45-49.9% combination (not modelled, see Agrisciences ECP note).',
    },
    careers: ['Forestry expert', 'Timber grower', 'Environmental planner', 'Forest researcher', 'Extension officer/consultant', 'Logistics manager', 'Tree breeder', 'Rural development advisor'],
  },
  {
    qualificationCode: 'SU-AGRI-BSCFOR-WOOD-PRODUCTS',
    universityId: 'su',
    name: 'BSc in Forestry (Wood and Wood Products Sciences)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
        { subject: 'physicalScience', status: 'required', minPercentage: 60 },
      ],
      note: 'BScFor (Forestry and Wood Sciences), Wood and Wood Products Sciences field. Also available as a 4-year ECP with a Mathematics 60-69.9%/Physical Sciences >=60% OR Mathematics >=70%/Physical Sciences 55-59.9% combination (not modelled, see Agrisciences ECP note).',
    },
    careers: ['Wood products expert', 'Production plant manager', 'Product development manager', 'Quality assurance manager', 'Wood scientist'],
  },
  {
    qualificationCode: 'SU-AGRI-BSCAGRIC-PLANT-SOIL',
    universityId: 'su',
    name: 'BScAgric in Plant and Soil Science',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Fields of study: Crop Production Systems; Crop Production Systems with Agronomy, Agricultural Economics and Animal Science; Crop Protection and Breeding; Soil and Water Management. Also available as an ECP (see Agrisciences ECP note).',
    },
    careers: ['Agronomist', 'Crop protection specialist', 'Soil and water management consultant', 'Extension officer', 'Researcher'],
  },
  {
    qualificationCode: 'SU-AGRI-BSCAGRIC-VITICULTURE',
    universityId: 'su',
    name: 'BScAgric in Viticulture and Oenology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Also available as an ECP (see Agrisciences ECP note).',
    },
    careers: ['Winemaker', 'Viticulturist', 'Sensory specialist', 'Wine biotechnologist', 'Laboratory analyst', 'Production manager'],
  },
  {
    qualificationCode: 'SU-AGRI-BSCAGRIC-ANIMAL-PRODUCTION',
    universityId: 'su',
    name: 'BScAgric in Animal Production Systems',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Field of study: Animal Science. Also available as an ECP (see Agrisciences ECP note).',
    },
    careers: ['Consultant/manager/technician in animal sciences', 'Extension officer', 'Aquaculture industry', 'Stock farmer', 'Game farmer'],
  },
  {
    qualificationCode: 'SU-AGRI-BSC-CONSERVATION-ECOLOGY',
    universityId: 'su',
    name: 'BSc in Conservation Ecology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Also available as an ECP (see Agrisciences ECP note).',
    },
    careers: ['Environmental impact assessor', 'Restoration ecologist', 'Conservation biologist', 'Game farm manager', 'Ecotourism'],
  },
  {
    qualificationCode: 'SU-AGRI-BSC-FOOD-SCIENCE',
    universityId: 'su',
    name: 'BSc in Food Science',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Explicitly NOT available as an Extended Curriculum Programme (per prospectus exception list).',
    },
    careers: ['Food scientist (quality assurance)', 'Product development', 'Technical support', 'Production management'],
  },
  {
    qualificationCode: 'SU-AGRI-BDATSCI-STATGENETICS',
    universityId: 'su',
    name: 'Bachelor of Data Science (BDatSci) — Statistical Genetics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 80 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // Home Language
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 75, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 75, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Interfaculty programme (Agrisciences, EMS, Science all contribute). This entry covers the Statistical Genetics field of study (statistical methods applied to genetic data — plant breeding, conservation genetics, genetic epidemiology). See also the Economic and Management Sciences and Science faculty BDatSci entries for other focal areas — identical admission requirements throughout.',
    },
    careers: ['Statistical geneticist'],
  },
];

// ─── FACULTY OF ARTS AND SOCIAL SCIENCES ────────────────────────────────────

export const SU_ARTS_SOCIAL_SCIENCES_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'SU-ARTS-BA-HUMANITIES',
    universityId: 'su',
    name: 'BA in Humanities',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 63 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 40 },
      ],
      note: 'If taking Organisational Informatics as a university subject: also Mathematics 50% OR Mathematical Literacy 70%. Also available as a 4-year Extended Curriculum Programme (marked # in prospectus; admission at Faculty discretion, no separate published minimums).',
    },
    careers: ['Teacher', 'Psychologist', 'Language practitioner', 'Journalist', 'Town and regional planner'],
  },
  {
    qualificationCode: 'SU-ARTS-BA-LANGUAGE-CULTURE',
    universityId: 'su',
    name: 'BA in Language and Culture',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 63 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 50 },
      ],
      note: 'Also available as a 4-year Extended Curriculum Programme (marked # in prospectus).',
    },
    careers: ['Diplomatic service', 'Teacher', 'Publisher', 'Advertising', 'Tourism', 'Journalist', 'Translator'],
  },
  {
    qualificationCode: 'SU-ARTS-BA-DEV-ENVIRONMENT',
    universityId: 'su',
    name: 'BA in Development and the Environment',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 63 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 40 },
      ],
      note: 'If taking Economics as a university subject: also Mathematics 60%. Also available as a 4-year Extended Curriculum Programme (marked # in prospectus).',
    },
    careers: ['Community development', 'Population development', 'Town and regional planner', 'Tourism', 'Environmental planner/manager'],
  },
  {
    qualificationCode: 'SU-ARTS-BA-MUSIC',
    universityId: 'su',
    name: 'BA in Music',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 40 },
      ],
      note: 'If taking Mathematics as a university subject: also Mathematics 70%. Requires a practical standard in the main instrument/singing equivalent to Grade VII classical music plus Grade V theory, and an audition/theory test at the Department of Music.',
    },
    additionalRequirements: ['audition'],
    careers: ['Private music teacher', 'Conductor', 'Performing artist', 'Accompanist'],
  },
  {
    qualificationCode: 'SU-ARTS-DIP-PRACTICAL-MUSIC',
    universityId: 'su',
    name: 'Diploma in Practical Music',
    qualificationType: 'diploma',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: {},
      subjectRequirements: [],
      note: 'A National Senior Certificate with at least 40% in each of four school subjects (excluding Life Orientation) — not modelled as a single aggregate figure. Requires a practical standard equivalent to Grade VII classical music plus Grade III/IV theory, and an audition/theory test.',
    },
    additionalRequirements: ['audition'],
    careers: ['Instrumental/singing teacher', 'Choral conductor', 'Church organist', 'Orchestral musician'],
  },
  {
    qualificationCode: 'SU-ARTS-HCERT-MUSIC',
    universityId: 'su',
    name: 'Higher Certificate in Music',
    qualificationType: 'higher_certificate',
    durationYears: 1,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: {},
      subjectRequirements: [],
      note: 'Requires a National Senior Certificate (no aggregate percentage published) plus a practical standard equivalent to Grade V/VI classical music and Grade III/IV theory, and an audition.',
    },
    additionalRequirements: ['audition'],
    careers: ['Community music projects'],
  },
  {
    qualificationCode: 'SU-ARTS-BA-DRAMA-THEATRE',
    universityId: 'su',
    name: 'BA in Drama and Theatre Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 60 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 50 },
      ],
      note: 'Candidates must be available for auditions and/or interviews at the Drama Department in August.',
    },
    additionalRequirements: ['audition'],
    careers: ['Theatre/media industry', 'Public relations', 'Marketing', 'Teaching', 'Cultural affairs'],
  },
  {
    qualificationCode: 'SU-ARTS-BA-HR-MANAGEMENT',
    universityId: 'su',
    name: 'BA in Human Resource Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 63 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 40 },
        { subject: 'mathematics', status: 'alternative', minPercentage: 50, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minPercentage: 70, altGroup: 'maths' },
      ],
      note: 'Also available as a 4-year Extended Curriculum Programme (marked # in prospectus).',
    },
    careers: ['Development manager', 'Human resource manager', 'Psychometrician', 'Management consultant', 'Labour relations practitioner'],
  },
  {
    qualificationCode: 'SU-ARTS-BA-INTL-STUDIES',
    universityId: 'su',
    name: 'BA in International Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 63 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Also available as a 4-year Extended Curriculum Programme (marked # in prospectus).',
    },
    careers: ['Diplomatic service', 'Parliament', 'Tourism industry', 'International journalism', 'Import/export industry'],
  },
  {
    qualificationCode: 'SU-ARTS-BMUS',
    universityId: 'su',
    name: 'Bachelor of Music (BMus)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 40 },
      ],
      note: 'If taking Mathematics as a university subject: also Mathematics 70%. Requires a practical standard equivalent to Grade VII classical music plus Grade V theory, and an audition/theory test.',
    },
    additionalRequirements: ['audition'],
    careers: ['Music educator', 'Performing artist', 'Accompanist', 'Music director', 'Musicologist', 'Composer', 'Conductor'],
  },
  {
    qualificationCode: 'SU-ARTS-BA-PPE',
    universityId: 'su',
    name: 'BA in Political, Philosophical and Economic Studies (PPE)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 63 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 40 },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
      ],
    },
    careers: ['Manager', 'Journalist', 'Business/investment analyst', 'Entrepreneur', 'Diplomat', 'Civil servant', 'Researcher'],
  },
  {
    qualificationCode: 'SU-ARTS-BSW-SOCIAL-WORK',
    universityId: 'su',
    name: 'Bachelor of Social Work',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 63 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 50 },
      ],
      note: '100 places in the programme.',
    },
    careers: ['Social worker (state, NPO, hospital, schools, private practice)'],
  },
  {
    qualificationCode: 'SU-ARTS-BA-VISUAL-ARTS',
    universityId: 'su',
    name: 'BA in Visual Arts',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 40 },
      ],
      note: '60 places in the programme. Requires a prescribed art portfolio by 1 September. Fields of study: Fine Arts; Jewellery and Metal Design; Visual Communication Design.',
    },
    additionalRequirements: ['portfolio'],
    careers: ['Fine artist', 'Art teacher', 'Graphic designer', 'Illustrator', 'Jewellery designer', 'Art critic/theorist'],
  },
];

// ─── FACULTY OF ECONOMIC AND MANAGEMENT SCIENCES ────────────────────────────

export const SU_ECONOMIC_MANAGEMENT_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'SU-EMS-DIP-SUSTAINABLE-DEV',
    universityId: 'su',
    name: 'Diploma in Sustainable Development',
    qualificationType: 'diploma',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 55 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // First Additional Language
        { subject: 'mathematics', status: 'alternative', minPercentage: 50, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minPercentage: 60, altGroup: 'maths' },
      ],
      note: 'A third maths alternative exists (Mathematics 40% OR Mathematical Literacy 50%, AND 60% for Business Studies or Economics or Accounting) — not modelled, schema does not support a subject-conditional AND combination. Selection also weighs a combined score of NSC average plus a departmental interest/experience application form. Language of instruction is English.',
    },
    careers: ['Entrepreneurship', 'Roles aligned with the Sustainable Development Goals'],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-ECONOMIC-SCIENCES',
    universityId: 'su',
    name: 'BCom (Economic Sciences)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
      note: 'To register for Econometrics or Financial Sector focal areas (or to take Actuarial Science 112 generally): Grade 12 Mathematics final mark must be at least 70%.',
    },
    careers: [],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-MANAGEMENT-SCIENCES',
    universityId: 'su',
    name: 'BCom (Management Sciences)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Focal areas: Agricultural Economics; Business Analytics; Entrepreneurship and Innovation Management; Financial Management; Financial Planning; Human Resource Management; Information Systems Management; Investment Management; Logistics and Supply Chain Management; Marketing Management; Public and Development Management.',
    },
    careers: ['Entrepreneur', 'General/financial manager', 'Logistics manager', 'Investment/marketing manager', 'HR practitioner'],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-MANAGEMENT-SCIENCES-ECP',
    universityId: 'su',
    name: 'BCom (Management Sciences) Extended Curriculum Programme',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    firstTimeEntrantsOnly: true,
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 50 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Only South African citizens may register. Preference given to applicants meeting the University’s socio-economic status (SES) criteria. Approximately 100 students accommodated per year. Applicants who repeated a Grade 12 subject to improve marks, or transferring students, are not eligible.',
    },
    careers: [],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-MATHEMATICAL-SCIENCES',
    universityId: 'su',
    name: 'BCom (Mathematical Sciences)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 70 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 75 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Focal areas: Data Science; Financial Risk Management; Operations Research.',
    },
    careers: ['Actuarial analyst', 'Quantitative analyst', 'Data scientist', 'Operations research analyst'],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-ACTUARIAL-SCIENCE',
    universityId: 'su',
    name: 'BCom (Actuarial Science)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 80 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'homeLanguage', status: 'required', minPercentage: 60 },
      ],
      note: 'If the Home Language above is not English, an additional English First Additional Language 75% is required — the conditional (language-specific) branch is not separately modelled.',
    },
    careers: ['Actuary (Fellow of the Actuarial Society of South Africa)'],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-INDUSTRIAL-PSYCHOLOGY',
    universityId: 'su',
    name: 'BCom (Industrial Psychology)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
    },
    careers: ['Psychometrist (after further studies/registration)', 'Industrial psychologist (after further studies/registration)'],
  },
  {
    qualificationCode: 'SU-EMS-BACC',
    universityId: 'su',
    name: 'BAcc',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 70 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Alternative path: Mathematics 60% AND Accounting 70% also satisfies the Mathematics requirement — not modelled (schema does not support an AND-combination across two subjects as a single alternative). Presented in English and Afrikaans (separate first-year groups).',
    },
    careers: ['Chartered Accountant CA(SA) (via SAICA/IRBA path)', 'Auditor', 'Management accountant', 'Tax consultant'],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-INTERNATIONAL-BUSINESS',
    universityId: 'su',
    name: 'BCom (International Business)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 80 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // Home Language
        { subject: 'english', status: 'alternative', minPercentage: 80, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Strict selection programme with set criteria to progress each year; a limited number of students selected via a special selection process. Third year includes an international exchange semester. Language of instruction is English.',
    },
    careers: ['Marketing manager', 'Financial manager', 'Entrepreneur', 'Innovation manager (international firms)'],
  },
  {
    qualificationCode: 'SU-EMS-BDATSCI',
    universityId: 'su',
    name: 'Bachelor of Data Science (BDatSci) — Geoinformatics / Analytics and Optimisation / Behavioural Economics / Statistical Learning',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 80 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // Home Language
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 75, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 75, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Interfaculty programme. This entry covers the focal areas named in the Economic and Management Sciences section of the prospectus: Geoinformatics, Analytics and Optimisation, Behavioural Economics, Statistical Learning. See also the Agrisciences and Science faculty BDatSci entries — identical admission requirements throughout.',
    },
    careers: ['Data scientist', 'Business intelligence developer', 'Operations researcher', 'Behavioural economist'],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-MANAGEMENT-ACCOUNTING',
    universityId: 'su',
    name: 'BCom (Management Accounting)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
    },
    careers: ['Chartered management accountant (CIMA)'],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-FINANCIAL-ACCOUNTING',
    universityId: 'su',
    name: 'BCom (Financial Accounting)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
    },
    careers: ['Chartered certified accountant (ACCA)'],
  },
];

// ─── FACULTY OF EDUCATION ────────────────────────────────────────────────────

export const SU_EDUCATION_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'SU-EDU-BED-FOUNDATION-PHASE',
    universityId: 'su',
    name: 'BEd (Foundation Phase Education)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { withMathematics: 60, withMathematicalLiteracy: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'alternative', minPercentage: 40, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minPercentage: 60, altGroup: 'maths' },
        { subject: 'homeLanguage', status: 'required', minPercentage: 60 },
      ],
      note: 'Language requirement branches by medium of instruction: taught in English -> English HL 60% + (Afrikaans OR isiXhosa, HL or FAL) 50%; taught in Afrikaans -> Afrikaans HL 60% + (English OR isiXhosa) 50%; taught in isiXhosa -> isiXhosa HL 60% + (English OR Afrikaans) 50%. isiXhosa has no dedicated SubjectKey in this schema, so only the generic homeLanguage 60% floor is modelled; the second-language alternative is not modelled. 125 places in the programme.',
    },
    careers: ['Teacher (Grades R-3)'],
  },
  {
    qualificationCode: 'SU-EDU-BED-INTERMEDIATE-PHASE',
    universityId: 'su',
    name: 'BEd (Intermediate Phase Education)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { withMathematics: 60, withMathematicalLiteracy: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'alternative', minPercentage: 40, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minPercentage: 60, altGroup: 'maths' },
        { subject: 'homeLanguage', status: 'required', minPercentage: 60 },
      ],
      note: 'Same medium-of-instruction language branching as BEd (Foundation Phase) — see that entry’s note. Mathematics (Ed) is compulsory in first year (pass with 60% average); two further teaching modules chosen from Life Skills, Natural Sciences (Ed) (requires Life Sciences or Physical Sciences 50%), Social Sciences (Ed) (requires History or Geography 50%). 125 places in the programme.',
    },
    careers: ['Teacher (Grades 4-7, two subjects + two languages)'],
  },
];

// ─── FACULTY OF LAW ──────────────────────────────────────────────────────────

export const SU_LAW_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'SU-LAW-BCOM-LAW',
    universityId: 'su',
    name: 'BCom (Law)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Law',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 70 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'alternative', minPercentage: 60, altGroup: 'language' },
        { subject: 'additionalLanguage', status: 'alternative', minPercentage: 70, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
      ],
      note: '80 places in the programme. Interfaculty (Law + Economic and Management Sciences). Write the NBTs AQL and MAT before 31 July.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Commercial law', 'Business world (entry route to the 2-year LLB for practising attorney/advocate)'],
  },
  {
    qualificationCode: 'SU-LAW-BACCLLB',
    universityId: 'su',
    name: 'BAccLLB',
    qualificationType: 'degree',
    durationYears: 5,
    faculty: 'Law',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 80 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'alternative', minPercentage: 60, altGroup: 'language' },
        { subject: 'additionalLanguage', status: 'alternative', minPercentage: 70, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: '35 places in the programme. Interfaculty (Law + Economic and Management Sciences). Write the NBTs AQL and MAT before 31 July. Alternative Mathematics path: Mathematics 60% AND Accounting 70% (AND-combination not modelled). Selection based on final Grade 11 (or Grade 12) results and NBT results in an 80:20 ratio.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Legal practitioner (attorney/advocate)', 'Chartered accountant (via postgraduate route)'],
  },
  {
    qualificationCode: 'SU-LAW-LLB-FOUR-YEAR',
    universityId: 'su',
    name: 'LLB (four-year)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Law',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 70 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'alternative', minPercentage: 60, altGroup: 'language' },
        { subject: 'additionalLanguage', status: 'alternative', minPercentage: 70, altGroup: 'language' },
      ],
      note: '120 places in the programme. Write the NBT AQL before 31 July. If taking Economics as a university subject: also Mathematics 60%.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Legal practitioner (attorney/advocate)', 'Judge/Magistrate', 'Public Prosecutor', 'Legal advisor', 'Compliance manager'],
    note: 'A related "LLB (three-year)" route exists but is a second bachelor’s degree pathway for existing graduates (selection based on a 60% aggregate in the prior degree, not NSC results) — out of scope for an NSC/matric-based applicant flow and omitted here.',
  },
  {
    qualificationCode: 'SU-LAW-BA-LAW',
    universityId: 'su',
    name: 'BA (Law)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Law',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 70 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'alternative', minPercentage: 60, altGroup: 'language' },
        { subject: 'additionalLanguage', status: 'alternative', minPercentage: 70, altGroup: 'language' },
      ],
      note: '55 places in the programme. Interfaculty (Law + Arts and Social Sciences). Write the NBT AQL before 31 July. If taking Economics as a university subject: also Mathematics 60%.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Entry route to the 2-year LLB for practising attorney/advocate'],
  },
];

// ─── FACULTY OF MEDICINE AND HEALTH SCIENCES ────────────────────────────────

export const SU_MEDICINE_HEALTH_SCIENCES_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'SU-MED-BOCC-THER',
    universityId: 'su',
    name: 'Bachelor of Occupational Therapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Medicine and Health Sciences',
    campus: ['Tygerberg'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 50 },
        { subject: 'lifeScience', status: 'required', minPercentage: 50 },
      ],
      note: '~50 candidates selected annually. Selection also weighs non-academic merit per the Faculty’s selection guidelines.',
    },
    careers: ['Occupational Therapist (HPCSA, after a year of community service)'],
  },
  {
    qualificationCode: 'SU-MED-BSC-PHYSIOTHERAPY',
    universityId: 'su',
    name: 'BSc in Physiotherapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Medicine and Health Sciences',
    campus: ['Tygerberg'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: '~55 candidates selected annually.',
    },
    careers: ['Physiotherapist (HPCSA, after a year of community service)'],
  },
  {
    qualificationCode: 'SU-MED-BSLHT',
    universityId: 'su',
    name: 'Bachelor of Speech-Language and Hearing Therapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Medicine and Health Sciences',
    campus: ['Tygerberg'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 50 },
        { subject: 'physicalScience', status: 'alternative', minPercentage: 50, altGroup: 'science' },
        { subject: 'lifeScience', status: 'alternative', minPercentage: 60, altGroup: 'science' },
      ],
      note: '~30 candidates selected annually. Also requires at least TWO of English/Afrikaans/a third South African language (Home Language or First Additional Language) at 60% each — not separately modelled (schema has no "any 2 of N languages" construct).',
    },
    careers: ['Speech-Language Therapist (HPCSA, after a year of community service)'],
  },
  {
    qualificationCode: 'SU-MED-MBCHB',
    universityId: 'su',
    name: 'MBChB',
    qualificationType: 'degree',
    durationYears: 6,
    faculty: 'Medicine and Health Sciences',
    campus: ['Tygerberg'],
    admission: {
      apsMinimum: { default: 75 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'lifeScience', status: 'required', minPercentage: 50 },
      ],
      note: '~280 candidates selected annually. Selection also weighs academic and non-academic merit per category (current Grade 12, recent school leavers, registered SU students only for MBChB, or applicants with tertiary qualifications/work experience).',
    },
    careers: ['Independent Medical Practitioner (HPCSA, after 2-year internship + community service year)'],
  },
  {
    qualificationCode: 'SU-MED-BNURS',
    universityId: 'su',
    name: 'Bachelor of Nursing',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Medicine and Health Sciences',
    campus: ['Tygerberg'],
    admission: {
      apsMinimum: { withMathematics: 60, withMathematicalLiteracy: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'alternative', minPercentage: 40, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minPercentage: 70, altGroup: 'maths' },
        { subject: 'lifeScience', status: 'required', minPercentage: 50 },
      ],
      note: '~50 candidates selected annually.',
    },
    careers: ['Nurse and Midwife (SANC, after a year of community service)'],
  },
  {
    qualificationCode: 'SU-MED-BSC-DIETETICS',
    universityId: 'su',
    name: 'BSc in Dietetics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Medicine and Health Sciences',
    campus: ['Tygerberg'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 50 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'lifeScience', status: 'required', minPercentage: 50 },
      ],
      note: '~35 candidates selected annually.',
    },
    careers: ['Dietitian (HPCSA, after a year of community service)'],
  },
];

// ─── FACULTY OF SCIENCE ──────────────────────────────────────────────────────

export const SU_SCIENCE_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'SU-SCI-BSC-BIODIVERSITY-ECOLOGY',
    universityId: 'su',
    name: 'BSc Biodiversity and Ecology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
      ],
      note: 'Focal areas: Climate Change Ecology; Plant and Animal Biodiversity; Plants and Microbes. Bare minimum shown — actual Faculty selection uses a weighted Selection Mark (SM) higher than this floor: SM = [(Mathematics x 2) + 5 other subjects incl. at least one English/Afrikaans, excl. LO] / 7 (see faculty-level facultyScoring; not re-derived per programme).',
    },
    careers: ['Botanist', 'Zoologist', 'Conservation scientist', 'Forensic scientist', 'Marine scientist', 'Ecologist'],
  },
  {
    qualificationCode: 'SU-SCI-BSC-HUMAN-LIFE-SCIENCES',
    universityId: 'su',
    name: 'BSc Human Life Sciences',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: 'Mathematics 60% suffices if taking Mathematics (Bio) and Physics (Bio) as first-year subjects (70% for the standard Mathematics + Physics track). Focal areas: Biology; Biology with Psychology. Actual selection uses the weighted Selection Mark (SM), higher than this bare minimum — see faculty-level facultyScoring.',
    },
    careers: ['Forensic scientist', 'Physiologist', 'Biomedical scientist', 'Biochemist', 'Human geneticist', 'Nutritionist'],
  },
  {
    qualificationCode: 'SU-SCI-BSC-MOLECULAR-BIO-BIOTECH',
    universityId: 'su',
    name: 'BSc Molecular Biology and Biotechnology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: 'Mathematics 60% suffices for the Mathematics (Bio)/Physics (Bio) first-year track. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: ['Plant biotechnologist', 'Forensic scientist', 'Biochemist', 'Geneticist', 'Microbiologist'],
  },
  {
    qualificationCode: 'SU-SCI-BSC-SPORT-SCIENCE',
    universityId: 'su',
    name: 'BSc Sport Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
      ],
      note: 'Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: ['Sport coach', 'Sport scientist', 'Sport physiologist', 'Fitness instructor'],
  },
  {
    qualificationCode: 'SU-SCI-BSC-CHEMISTRY',
    universityId: 'su',
    name: 'BSc Chemistry',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: 'Focal areas: Chemistry and Polymer Science; Chemical Biology; Applied and Sustainable Chemistry; Chemistry with Chemical Engineering. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: ['Research scientist', 'Analytical chemist', 'Toxicologist', 'Environmental scientist', 'Forensic analyst'],
  },
  {
    qualificationCode: 'SU-SCI-BSC-EARTH-SCIENCE',
    universityId: 'su',
    name: 'BSc Earth Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: 'Mathematics 60% suffices for the Mathematics (Bio)/Physics (Bio) first-year track. Focal areas: Applied Earth Science; Geo-environmental Science. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: ['Environmental consultant', 'Geologist', 'Geophysicist', 'Seismologist', 'Mining geologist'],
  },
  {
    qualificationCode: 'SU-SCI-BSC-GEOINFORMATICS',
    universityId: 'su',
    name: 'BSc GeoInformatics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
      ],
      note: 'Mathematics rises to 70% if choosing Computer Science as a university subject. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: ['GIS technician', 'Remote sensing specialist', 'Cartographer', 'Geospatial software engineer', 'Meteorologist'],
  },
  {
    qualificationCode: 'SU-SCI-BSC-PHYSICS',
    universityId: 'su',
    name: 'BSc Physics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: 'Focal areas: Laser Physics (Physical); Laser Physics (Biological); Theoretical Physics. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: ['Medical physicist', 'Nanotechnologist', 'Geophysicist', 'Data analyst', 'Astrophysicist'],
  },
  {
    qualificationCode: 'SU-SCI-BSC-MATHEMATICAL-SCIENCES',
    universityId: 'su',
    name: 'BSc Mathematical Sciences',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: 'Physical Sciences 50% required only if taking Chemistry or Physics as a university subject — not modelled as an unconditional gate. Focal areas: Applied Mathematics; Mathematics; Operations Research. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: ['Actuarial analyst', 'Quantitative analyst', 'Mathematics teacher', 'Operations researcher'],
  },
  {
    qualificationCode: 'SU-SCI-BSC-COMPUTER-SCIENCE',
    universityId: 'su',
    name: 'BSc Computer Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: 'Physical Sciences 50% required only if taking Chemistry or Physics as a university subject — not modelled as an unconditional gate. Focal areas: General Computer Science; Computer Systems; Data Science. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: ['Software developer', 'Data scientist', 'Computer systems analyst', 'Database administrator'],
  },
  {
    qualificationCode: 'SU-SCI-BSC-INTERDISCIPLINARY',
    universityId: 'su',
    name: 'BSc (Interdisciplinary Programmes)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Focal areas: Biomedical Mathematical Sciences; Applied Medicinal Chemistry; Bioinformatics and Computational Biology; Biomathematics. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: ['Medical scientist', 'Bioinformatician', 'Pharmaceutical scientist', 'Biomedical engineer'],
  },
  {
    qualificationCode: 'SU-SCI-BDATSCI',
    universityId: 'su',
    name: 'Bachelor of Data Science (BDatSci) — Computer Science / Applied Mathematics / Statistical Physics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 80 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // Home Language
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 75, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 75, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Interfaculty programme. This entry covers the focal areas named in the Science section: Computer Science, Applied Mathematics, Statistical Physics. See also the Agrisciences and Economic and Management Sciences faculty BDatSci entries — identical admission requirements throughout.',
    },
    careers: ['Data scientist', 'Machine learning engineer', 'Applications architect', 'Statistician'],
  },
];

const SU: University = {
  id: 'su',
  name: 'Stellenbosch University',
  shortName: 'SU',
  applicationSystem: 'Custom portal',
  applicationFee: 100,
  feeNote: 'UNCONFIRMED against the sourced 2027 prospectus text (which did not include a general application-fee page) — carried over from prior data. Verify via www.maties.com before relying on this figure.',
  maxChoices: 1,
  choicesRanked: false,
  choicesIndependent: true,
  choicesFinal: true,
  apsRule: {
    method: 'custom',
    subjectsCounted: 6,
    includesLifeOrientation: false,
    scale: 'percentage_average',
    note: 'Base "aggregate" = average percentage across ALL NSC subjects, excluding Life Orientation (not a sum). All programmes are selection programmes — meeting the minimum does not guarantee admission.',
    facultyScoring: [
      {
        faculty: 'Science',
        scoreName: 'Selection Mark (SM)',
        scoreMax: 100,
        transform: 'SM = [(Mathematics % x 2) + 5 other subjects % (excl. Life Orientation, at least one must be English or Afrikaans)] / 7. Selection uses SM, which is a higher threshold than the bare-minimum aggregate published per programme.',
        usesNBT: false,
        note: 'Grade 11 marks used for current Grade 12 learners; final Grade 12 marks used once available. Full selection criteria: "Faculty of Science admission and selection guidelines" at www.maties.com.',
      },
      {
        faculty: 'Law',
        scoreName: 'Weighted selection (academic + NBT)',
        scoreMax: 100,
        transform: 'BAccLLB selection uses Grade 11 (or final Grade 12) results and NBT results in an 80:20 ratio. Other Law degrees select by academic + non-academic merit per the faculty guidelines.',
        usesNBT: true,
        note: 'NBTs (AQL, and MAT for BCom(Law)/BAccLLB) must be written before 31 July. NBTs are NOT modelled by this platform (out of scope) — the plain aggregate/subject minimums are used as apsMinimum.',
      },
    ],
  },
  applicationsOpen: '2026',
  defaultClosingDate: '2026-06-30T23:59:00+02:00',
  applyUrl: 'https://www.maties.com/application',
  notes: [
    'NBTs are NOT required for 2027 admission at SU except for all Faculty of Law programmes (and narrow exceptions not relevant to NSC applicants: School of Tomorrow, American High School Diploma, online schools) — the inverse of UCT/UP, where NBTs are near-universal.',
    'All programmes are selection programmes: SU receives more applications than places available, so meeting the minimum admission requirements does not guarantee admission — actual selection thresholds (especially in Science) run higher than the published floor.',
    'Most programmes accept English OR Afrikaans (Home or First Additional Language) at a stated percentage — modelled as an alternative subject-requirement group.',
    'A second-degree LLB (three-year) route for existing bachelor\'s graduates, and postgraduate-entry qualifications (PGCE, Advanced Diploma in Practical Music), are out of scope for this platform\'s NSC/matric-results applicant model and are not included below.',
  ],
  programmes: [
    ...SU_AGRISCIENCES_PROGRAMMES,
    ...SU_ARTS_SOCIAL_SCIENCES_PROGRAMMES,
    ...SU_ECONOMIC_MANAGEMENT_PROGRAMMES,
    ...SU_EDUCATION_PROGRAMMES,
    ...SU_LAW_PROGRAMMES,
    ...SU_MEDICINE_HEALTH_SCIENCES_PROGRAMMES,
    ...SU_SCIENCE_PROGRAMMES,
  ],
  type: 'traditional',
  city: 'Stellenbosch',
  province: 'western_cape',
  website: 'https://www.sun.ac.za',
  applicationPortal: 'https://www.maties.com/application',
};


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
    additionalRequirements: ['selection', 'age 22+', 'proof of full-time employment in the construction industry'],
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
    additionalRequirements: ['selection', 'age 22+', 'proof of full-time employment in the construction industry'],
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
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5, homeLanguageRating: 5 }],
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

const UFS: University = {
  id: 'ufs',
  name: 'University of the Free State',
  shortName: 'UFS',
  applicationSystem: 'Custom portal',
  applicationFee: 150,
  feeNote: 'UNCONFIRMED against the sourced 2027 prospectus text (no domestic application-fee figure found) — carried over from prior data. Verify via apply.ufs.ac.za before relying on this figure.',
  maxChoices: 1,
  choicesRanked: false,
  choicesIndependent: true,
  choicesFinal: true,
  apsRule: {
    method: 'custom',
    subjectsCounted: 6,
    includesLifeOrientation: true,
    scale: 'nsc_8point',
    bonusPoints: 'Life Orientation contributes exactly 1 bonus point if Level 5 (60%) or higher, else 0 — it is not scored on the main 8-point table like the other six subjects.',
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
        { subject: 'additionalLanguage', status: 'alternative', minRating: 5, altGroup: 'bar_elective' },
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
      note: 'Only first choice applications will be considered by UKZN (not relevant to ApplyOnce, which is one-programme-per-university already). Life Orientation points are explicitly stated as NOT included in the 30-point APS requirement, consistent with UKZN\'s nsc_8point scale (LO excluded from total).',
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
        { subject: 'additionalLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'elective' },
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
        { subject: 'additionalLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'elective' },
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
        { subject: 'additionalLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'elective' },
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
        { subject: 'additionalLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'elective' },
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
        { subject: 'additionalLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'elective' },
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
        { subject: 'additionalLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'elective' },
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
        { subject: 'additionalLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'elective' },
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
        { subject: 'additionalLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'elective' },
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
        { subject: 'additionalLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'elective' },
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
        { subject: 'additionalLanguage', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'geography', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'lifeScience', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'elective' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'elective' },
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
        { subject: 'english', status: 'required', homeLanguageRating: 5, additionalLanguageRating: 6 },
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
        { subject: 'english', status: 'required', homeLanguageRating: 5, additionalLanguageRating: 6 },
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
        { subject: 'english', status: 'required', homeLanguageRating: 5, additionalLanguageRating: 6 },
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
        { subject: 'english', status: 'required', homeLanguageRating: 4, additionalLanguageRating: 4 },
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
        { subject: 'english', status: 'required', homeLanguageRating: 4, additionalLanguageRating: 4 },
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
    careers: ['Chartered Financial Analyst', 'Investment Analyst', 'Certified Financial Planner', 'Economist'],
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
    careers: ['Chartered Financial Analyst', 'Investment Analyst', 'Certified Financial Planner', 'Economist'],
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

const UKZN: University = {
  id: 'ukzn',
  name: 'University of KwaZulu-Natal',
  shortName: 'UKZN',
  applicationSystem: 'CAO',
  applicationFee: 210,
  feeNote: 'R210 on-time direct-to-UKZN application (R420 late). First-time SA undergrad applicants alternatively apply via the CAO (Central Applications Office) for R250 before 31 October 2026 (R470 late), which also covers other KZN institutions — CAO admin fee is separate from and not doubled with the direct UKZN fee.',
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
    'MBChB closes 30 June 2026 (earlier than all other programmes, which close 30 September 2026) and uses a percentage-aggregate gate (60% per subject, 65% aggregate) rather than the standard APS scale — captured in that programme\'s note since the schema does not have a per-programme alternate scale mechanism.',
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

// ─── PLACEHOLDER UNIVERSITIES ───────────────────────────────────────────────
// Minimal data only. Engine returns "requirements not yet available" for these.

const PLACEHOLDERS: University[] = [
  // Add remaining 22 universities similarly...
  // For brevity, I'll add abbreviated placeholders
];

// Generate remaining placeholders
const REMAINING_UNIS = [
  { id: 'nwu', name: 'North-West University', shortName: 'NWU', fee: 150, type: 'traditional' as const },
  { id: 'nmu', name: 'Nelson Mandela University', shortName: 'NMU', fee: 200, type: 'comprehensive' as const },
  { id: 'uwc', name: 'University of the Western Cape', shortName: 'UWC', fee: 100, type: 'traditional' as const },
  { id: 'rhodes', name: 'Rhodes University', shortName: 'Rhodes', fee: 100, type: 'traditional' as const },
  { id: 'unisa', name: 'University of South Africa', shortName: 'UNISA', fee: 115, type: 'traditional' as const },
  { id: 'tut', name: 'Tshwane University of Technology', shortName: 'TUT', fee: 240, type: 'university_of_technology' as const },
  { id: 'dut', name: 'Durban University of Technology', shortName: 'DUT', fee: 270, type: 'university_of_technology' as const },
  { id: 'cput', name: 'Cape Peninsula University of Technology', shortName: 'CPUT', fee: 100, type: 'university_of_technology' as const },
  { id: 'vut', name: 'Vaal University of Technology', shortName: 'VUT', fee: 200, type: 'university_of_technology' as const },
  { id: 'cut', name: 'Central University of Technology', shortName: 'CUT', fee: 180, type: 'university_of_technology' as const },
  { id: 'mut', name: 'Mangosuthu University of Technology', shortName: 'MUT', fee: 270, type: 'university_of_technology' as const },
  { id: 'unizulu', name: 'University of Zululand', shortName: 'UniZulu', fee: 150, type: 'traditional' as const },
  { id: 'ufh', name: 'University of Fort Hare', shortName: 'UFH', fee: 150, type: 'traditional' as const },
  { id: 'wsu', name: 'Walter Sisulu University', shortName: 'WSU', fee: 150, type: 'comprehensive' as const },
  { id: 'smu', name: 'Sefako Makgatho Health Sciences University', shortName: 'SMU', fee: 200, type: 'traditional' as const },
  { id: 'spu', name: 'Sol Plaatje University', shortName: 'SPU', fee: 100, type: 'traditional' as const },
  { id: 'ump', name: 'University of Mpumalanga', shortName: 'UMP', fee: 100, type: 'traditional' as const },
  { id: 'ul', name: 'University of Limpopo', shortName: 'UL', fee: 200, type: 'traditional' as const },
  { id: 'univen', name: 'University of Venda', shortName: 'UNIVEN', fee: 150, type: 'traditional' as const },
];

for (const uni of REMAINING_UNIS) {
  PLACEHOLDERS.push({
    id: uni.id,
    name: uni.name,
    shortName: uni.shortName,
    applicationSystem: 'Custom portal',
    applicationFee: uni.fee,
    maxChoices: 3,
    choicesRanked: false,
    choicesIndependent: true,
    choicesFinal: true,
    apsRule: { method: 'standard_aps', subjectsCounted: 6, includesLifeOrientation: false, scale: 'nsc_7point' },
    defaultClosingDate: '2026-09-30T23:59:00+02:00',
    applyUrl: `https://www.${uni.id}.ac.za/apply`,
    programmes: [{
      qualificationCode: `${uni.id.toUpperCase()}-PLACEHOLDER`,
      universityId: uni.id,
      name: 'Programmes pending prospectus data',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Various',
      campus: ['Main Campus'],
      admission: {
        apsMinimum: { default: 0 },
        subjectRequirements: [],
        note: 'Programme requirements not yet available — prospectus data pending.',
      },
    }],
    type: uni.type,
    city: 'TBD',
    province: 'gauteng',
    website: `https://www.${uni.id}.ac.za`,
    applicationPortal: `https://www.${uni.id}.ac.za/apply`,
  });
}

// ─── EXPORTS ────────────────────────────────────────────────────────────────

export const UNIVERSITIES: University[] = [UJ, WITS, UCT, UP, SU, UFS, UKZN, ...PLACEHOLDERS];

export const UNIVERSITY_COUNT = UNIVERSITIES.length; // Should be 26
export const getUniversityById = (id: string) => UNIVERSITIES.find(u => u.id === id);

export const SERVICE_FEE_ZAR = 5; // ApplyOnce fee per application
