// packages/shared/src/constants/universities/uj.ts
import { University } from '../../types/university';

// ─── UNIVERSITY OF JOHANNESBURG (UJ) ────────────────────────────────────────

export const UJ: University = {
  id: 'uj',
  name: 'University of Johannesburg',
  shortName: 'UJ',
  logoUrl: '/logos/uj.png',
  applicationSystem: 'Custom portal',
  applicationFee: 0,
  feeNote:
    'No application fee for online or paper applications. The flat ApplyOnce service fee still applies.',
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
          {
            subject: 'mathematicalLiteracy',
            status: 'alternative',
            minRating: 4,
            altGroup: 'maths',
          },
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
          {
            subject: 'mathematicalLiteracy',
            status: 'alternative',
            minRating: 4,
            altGroup: 'maths',
          },
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
