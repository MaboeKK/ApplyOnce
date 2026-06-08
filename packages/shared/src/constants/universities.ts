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

// ─── PLACEHOLDER UNIVERSITIES ───────────────────────────────────────────────
// Minimal data only. Engine returns "requirements not yet available" for these.

const PLACEHOLDERS: University[] = [
  {
    id: 'uct',
    name: 'University of Cape Town',
    shortName: 'UCT',
    applicationSystem: 'Custom portal',
    applicationFee: 100,
    maxChoices: 3,
    choicesRanked: false,
    choicesIndependent: true,
    choicesFinal: true,
    apsRule: { method: 'standard_aps', subjectsCounted: 6, includesLifeOrientation: false, scale: 'nsc_7point' },
    defaultClosingDate: '2026-09-30T23:59:00+02:00',
    applyUrl: 'https://www.uct.ac.za/apply',
    programmes: [{
      qualificationCode: 'UCT-PLACEHOLDER',
      universityId: 'uct',
      name: 'Programmes pending prospectus data',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Various',
      campus: ['Rondebosch'],
      admission: {
        apsMinimum: { default: 0 },
        subjectRequirements: [],
        note: 'Programme requirements not yet available — prospectus data pending.',
      },
    }],
    type: 'traditional',
    city: 'Cape Town',
    province: 'western_cape',
    website: 'https://www.uct.ac.za',
    applicationPortal: 'https://www.uct.ac.za/apply',
  },
  {
    id: 'up',
    name: 'University of Pretoria',
    shortName: 'UP',
    applicationSystem: 'Custom portal',
    applicationFee: 300,
    maxChoices: 3,
    choicesRanked: false,
    choicesIndependent: true,
    choicesFinal: true,
    apsRule: { method: 'standard_aps', subjectsCounted: 7, includesLifeOrientation: true, scale: 'nsc_7point' },
    defaultClosingDate: '2026-06-30T23:59:00+02:00',
    applyUrl: 'https://www.up.ac.za/apply',
    programmes: [{
      qualificationCode: 'UP-PLACEHOLDER',
      universityId: 'up',
      name: 'Programmes pending prospectus data',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Various',
      campus: ['Hatfield'],
      admission: {
        apsMinimum: { default: 0 },
        subjectRequirements: [],
        note: 'Programme requirements not yet available — prospectus data pending.',
      },
    }],
    type: 'traditional',
    city: 'Pretoria',
    province: 'gauteng',
    website: 'https://www.up.ac.za',
    applicationPortal: 'https://www.up.ac.za/apply',
  },
  {
    id: 'su',
    name: 'Stellenbosch University',
    shortName: 'SU',
    applicationSystem: 'Custom portal',
    applicationFee: 100,
    maxChoices: 3,
    choicesRanked: false,
    choicesIndependent: true,
    choicesFinal: true,
    apsRule: { method: 'standard_aps', subjectsCounted: 6, includesLifeOrientation: false, scale: 'nsc_7point' },
    defaultClosingDate: '2026-06-30T23:59:00+02:00',
    applyUrl: 'https://www.maties.com/application',
    programmes: [{
      qualificationCode: 'SU-PLACEHOLDER',
      universityId: 'su',
      name: 'Programmes pending prospectus data',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Various',
      campus: ['Stellenbosch'],
      admission: {
        apsMinimum: { default: 0 },
        subjectRequirements: [],
        note: 'Programme requirements not yet available — prospectus data pending.',
      },
    }],
    type: 'traditional',
    city: 'Stellenbosch',
    province: 'western_cape',
    website: 'https://www.sun.ac.za',
    applicationPortal: 'https://www.maties.com/application',
  },
  // Add remaining 23 universities similarly...
  // For brevity, I'll add abbreviated placeholders
];

// Generate remaining placeholders
const REMAINING_UNIS = [
  { id: 'ukzn', name: 'University of KwaZulu-Natal', shortName: 'UKZN', fee: 270, type: 'traditional' as const },
  { id: 'ufs', name: 'University of the Free State', shortName: 'UFS', fee: 150, type: 'traditional' as const },
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

export const UNIVERSITIES: University[] = [UJ, WITS, ...PLACEHOLDERS];

export const UNIVERSITY_COUNT = UNIVERSITIES.length; // Should be 26
export const getUniversityById = (id: string) => UNIVERSITIES.find(u => u.id === id);

export const SERVICE_FEE_ZAR = 5; // ApplyOnce fee per application
