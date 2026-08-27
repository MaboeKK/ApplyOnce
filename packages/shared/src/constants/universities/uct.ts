// packages/shared/src/constants/universities/uct.ts
import { University, Programme } from '../../types/university';

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
    careers: [
      'Attorney (via postgraduate LLB)',
      'Advocate (via postgraduate LLB)',
      'Commercial Economist',
    ],
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
    careers: [
      'HR Manager',
      'Organisational Development Consultant',
      'Talent Management Specialist',
    ],
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
        {
          subject: 'physicalScience',
          status: 'alternative',
          minPercentage: 65,
          altGroup: 'science',
        },
        { subject: 'lifeScience', status: 'alternative', minPercentage: 65, altGroup: 'science' },
        { subject: 'english', status: 'required', minPercentage: 65 },
      ],
      note:
        'Also requires 60% for the next three best subjects excluding Life Orientation. Raw sub-minimum APS (pre-NBT) of 360 required. ' +
        'Band A (guaranteed, all applicants): FPS >= 730, NBT Intermediate or above for AL, QL and Mathematics. ' +
        'Band B (likely, all applicants): WPS >= 797. ' +
        'Band C (possible, SA redress applicants only): FPS >= 580 (redress category 1), 610 (redress 2), 680 (redress 3 and 4). ' +
        'Eligible SADC countries for this programme: Angola, Eswatini (Swaziland), Lesotho. ' +
        'FPS/WPS bake NBT scores directly into the score (out of 900) — ApplyOnce does not collect NBT scores, so true eligibility cannot currently be fully evaluated from academic marks alone. apsMinimum.default is the published Band A FPS threshold, shown for reference.',
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
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minPercentage: 70,
          altGroup: 'maths',
        },
        {
          subject: 'physicalScience',
          status: 'alternative',
          minPercentage: 65,
          altGroup: 'science',
        },
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
        'FPS/WPS bake NBT scores directly into the score (out of 900) — ApplyOnce does not collect NBT scores, so true eligibility cannot currently be fully evaluated from academic marks alone. apsMinimum.default is the published Band A FPS threshold, shown for reference.',
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
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minPercentage: 70,
          altGroup: 'maths',
        },
        {
          subject: 'physicalScience',
          status: 'alternative',
          minPercentage: 65,
          altGroup: 'science',
        },
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
        'FPS/WPS bake NBT scores directly into the score (out of 900) — ApplyOnce does not collect NBT scores, so true eligibility cannot currently be fully evaluated from academic marks alone. apsMinimum.default is the published Band A FPS threshold, shown for reference.',
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
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minPercentage: 70,
          altGroup: 'maths',
        },
        {
          subject: 'physicalScience',
          status: 'alternative',
          minPercentage: 65,
          altGroup: 'science',
        },
        { subject: 'lifeScience', status: 'alternative', minPercentage: 65, altGroup: 'science' },
        { subject: 'english', status: 'required', minPercentage: 65 },
      ],
      note:
        "JUDGMENT CALL / LOWER CONFIDENCE: this programme's minimum-subject-requirements paragraph and band table were cut off mid-sentence at a page break in the source OCR text and the " +
        'following page appears to interleave an unrelated "international qualifications" section header before the actual numbers resume. The figures below are reconstructed from the ' +
        'numeric block that follows the same "Mathematics at 60% or Mathematical Literacy at 70%..." requirement wording used by Occupational Therapy and Audiology, matched to a band table ' +
        "with numbers distinct from every other programme in this chunk (so it is very likely this programme's own table, not a duplicate) — but this should be verified against the official " +
        'prospectus PDF pagination if precision matters. Also requires 60% for the next three best subjects excluding Life Orientation; raw sub-minimum APS (pre-NBT) of 340. ' +
        'Band A (guaranteed): FPS >= 715, NBT Intermediate or above for AL, QL and Mathematics (Mathematical Literacy takers scoring above 75% exempt from NBT Mathematics). ' +
        'Band B (likely): WPS >= 670. Band C (SA redress only): FPS >= 510 (redress 1), 515 (redress 2), 600 (redress 3 and 4). ' +
        'Eligible SADC countries (shared with Audiology in source text): Angola, Botswana, DR Congo, Lesotho, Malawi, Mauritius, Mozambique, Namibia, Seychelles, Swaziland, Tanzania, Zambia, Zimbabwe. ' +
        'FPS/WPS bake NBT scores directly into the score (out of 900) — ApplyOnce does not collect NBT scores, so true eligibility cannot currently be fully evaluated from academic marks alone. apsMinimum.default is the published Band A FPS threshold, shown for reference.',
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
        "Not part of the FPS/band system (prospectus explicitly states this qualification's criteria are not expressed in bands) — no numeric APS/FPS threshold is published. " +
        'Eligibility requires a National Senior Certificate OR an approved HEQSF-level-4 school-leaving qualification, plus National Benchmark Test results in the Upper Intermediate to ' +
        'Proficient range for the Academic and Quantitative Literacy components only (the NBT Mathematics component is not required for this qualification). ' +
        'Offered only if there is a sufficient number of applicants; 30 places available.',
    },
    additionalRequirements: [
      'NBT (Academic & Quantitative Literacy components only, no Mathematics component)',
    ],
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
    additionalRequirements: [
      'Prior tertiary study including Chemistry 2 and/or Biochemistry 3, or relevant work experience',
    ],
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
      subjectRequirements: [{ subject: 'english', status: 'required', minPercentage: 50 }],
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
      subjectRequirements: [{ subject: 'english', status: 'required', minPercentage: 50 }],
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
      subjectRequirements: [{ subject: 'english', status: 'required', minPercentage: 50 }],
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
      subjectRequirements: [{ subject: 'english', status: 'required', minPercentage: 50 }],
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
      subjectRequirements: [{ subject: 'english', status: 'required', minPercentage: 50 }],
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
      subjectRequirements: [{ subject: 'english', status: 'required', minPercentage: 50 }],
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
      subjectRequirements: [{ subject: 'english', status: 'required', minPercentage: 50 }],
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
      note: 'UCT Law uses a 3-tier band system, not a single cutoff: Band A (all SA applicants) 500 FPS = guaranteed admission; Band B (all SA applicants) 500 WPS = likely admission; Band C (SA applicants in targeted redress categories only) 470 FPS = possible admission. All bands also require NBT AL "proficient" and NBT QL "intermediate or above" — not evaluated by this platform (NBTs out of scope). International (non-SA schooling) applicants: 510 FPS = probable admission. Only Band A is modelled here; Band B/C thresholds exist but are not enforced by this platform.',
    },
    careers: ['Advocate', 'Attorney', 'Legal Advisor'],
    note: "Applicants with non-South African leaving certificates (A-level/AS-level/NSSC/IB Diploma) are instead scored on a separate international APS-points table (not FPS): international applicants 44+/46+ (minimum/probable admission); SA applicants 40+/44+; SA redress applicants 38+/39+. Two other LLB routes are described in the prospectus but are NOT separately modelled as programmes here because no explicit FPS/APS admission number applies at the point of matric application: (1) the combined Humanities/LLB or Commerce/LLB route (5 years min, a BBusSci/LLB variant needs 6) — a matric applicant is admitted into the BA/BSocSci or BCom degree under that faculty's own requirements (not in this chunk), then competes for entry into the law major via either the same NSC+NBT LLB Band criteria or a first-year average of 65% (Humanities) / 63% (Commerce); (2) the graduate LLB (3 years min) — open only to holders of an already-completed undergraduate degree, admitted on a competitive basis requiring roughly 65% average in that prior degree. Neither route is gated by matric APS, so neither fits this platform's NSC-applicant model.",
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
  "(shown as this programme's apsMinimum); Band B - Likely Admission at WPS 640+; Band C - Possible " +
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
      subjectRequirements: [{ subject: 'mathematics', status: 'required', minPercentage: 70 }],
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
      subjectRequirements: [{ subject: 'mathematics', status: 'required', minPercentage: 70 }],
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

export const UCT: University = {
  id: 'uct',
  name: 'University of Cape Town',
  shortName: 'UCT',
  logoUrl: '/logos/uct.png',
  applicationSystem: 'Custom portal',
  applicationFee: 100,
  feeNote:
    'R100 for South African and SADC applicants; R300 for other international applicants. Non-refundable. Currently registered UCT students, UCT graduates, and Semester Study Abroad applicants do not pay.',
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
        transform:
          'FPS = APS + (Mathematics% + Physical Sciences%) — these two subjects are effectively doubled. IT or Life Sciences may substitute for Physical Sciences for certain majors.',
        disadvantageFactor: { maxPercent: 10, formula: 'WPS = FPS + (factor% x FPS)' },
        usesNBT: true,
        note: 'NBT results are written but NOT used for Science admission decisions — only for post-admission Extended Degree Programme (EDP) placement.',
      },
      {
        faculty: 'Health Sciences',
        scoreName: 'FPS',
        scoreMax: 900,
        transform:
          'FPS = APS (out of 600) + sum of the three NBT scores (AL + QL + Mathematics, out of 300).',
        disadvantageFactor: {
          maxPercent: 20,
          formula: 'WPS = FPS + (factor% x FPS)',
          note: 'Wider 0-20% band than other faculties.',
        },
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
    "All undergraduate applicants normally resident/schooled in South Africa must write the National Benchmark Tests (NBTs) — mandatory faculty-wide, though not always used in the admission decision itself (e.g. Science). NBTs are out of scope for ApplyOnce's MVP; the platform cannot evaluate NBT-gated bands (Band B/C, or Health Sciences' FPS itself).",
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
