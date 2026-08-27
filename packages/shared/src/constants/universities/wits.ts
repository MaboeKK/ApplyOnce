// packages/shared/src/constants/universities/wits.ts
import { University } from '../../types/university';

// ─── UNIVERSITY OF THE WITWATERSRAND (WITS) ─────────────────────────────────

export const WITS: University = {
  id: 'wits',
  name: 'University of the Witwatersrand',
  shortName: 'Wits',
  logoUrl: '/logos/wits.png',
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
          {
            subject: 'english',
            status: 'required',
            homeLanguageRating: 5,
            additionalLanguageRating: 5,
          },
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
          {
            subject: 'english',
            status: 'required',
            homeLanguageRating: 6,
            additionalLanguageRating: 6,
          },
          { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'maths' },
          {
            subject: 'mathematicalLiteracy',
            status: 'alternative',
            minRating: 6,
            altGroup: 'maths',
          },
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
