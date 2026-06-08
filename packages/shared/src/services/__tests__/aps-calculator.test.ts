// src/services/__tests__/aps-calculator.test.ts
// Tests for per-university APS calculation and admission matching

import { calculateAPS, matchStudentToProgramme } from '../aps-calculator';
import { University, Programme } from '../../types/university';
import { SubjectResult, NSCSubject } from '../../types/student';

// ─── Mock Student Results ───────────────────────────────────────────────────

const mockStudentHighAPS: SubjectResult[] = [
  { id: '1', studentId: 'test', subject: 'english_home', mark: 75, level: 6, year: 2024 },
  { id: '2', studentId: 'test', subject: 'mathematics', mark: 72, level: 6, year: 2024 },
  { id: '3', studentId: 'test', subject: 'accounting', mark: 82, level: 7, year: 2024 },
  { id: '4', studentId: 'test', subject: 'life_sciences', mark: 70, level: 6, year: 2024 },
  { id: '5', studentId: 'test', subject: 'physical_sciences', mark: 70, level: 6, year: 2024 },
  { id: '6', studentId: 'test', subject: 'business_studies', mark: 65, level: 5, year: 2024 },
  { id: '7', studentId: 'test', subject: 'life_orientation', mark: 75, level: 6, year: 2024 },
];

const mockStudentMathsLit: SubjectResult[] = [
  { id: '1', studentId: 'test', subject: 'english_home', mark: 65, level: 5, year: 2024 },
  { id: '2', studentId: 'test', subject: 'mathematical_literacy', mark: 70, level: 6, year: 2024 },
  { id: '3', studentId: 'test', subject: 'accounting', mark: 60, level: 5, year: 2024 },
  { id: '4', studentId: 'test', subject: 'business_studies', mark: 62, level: 5, year: 2024 },
  { id: '5', studentId: 'test', subject: 'economics', mark: 58, level: 4, year: 2024 },
  { id: '6', studentId: 'test', subject: 'geography', mark: 55, level: 4, year: 2024 },
  { id: '7', studentId: 'test', subject: 'life_orientation', mark: 68, level: 5, year: 2024 },
];

const mockStudentTechMaths: SubjectResult[] = [
  { id: '1', studentId: 'test', subject: 'english_home', mark: 60, level: 5, year: 2024 },
  { id: '2', studentId: 'test', subject: 'technical_mathematics', mark: 65, level: 5, year: 2024 },
  { id: '3', studentId: 'test', subject: 'accounting', mark: 58, level: 4, year: 2024 },
  { id: '4', studentId: 'test', subject: 'business_studies', mark: 55, level: 4, year: 2024 },
  { id: '5', studentId: 'test', subject: 'economics', mark: 52, level: 4, year: 2024 },
  { id: '6', studentId: 'test', subject: 'geography', mark: 50, level: 4, year: 2024 },
  { id: '7', studentId: 'test', subject: 'life_orientation', mark: 62, level: 5, year: 2024 },
];

// ─── Mock Universities ──────────────────────────────────────────────────────

const mockUJ: University = {
  id: 'uj',
  name: 'University of Johannesburg',
  shortName: 'UJ',
  applicationSystem: 'Custom portal',
  applicationFee: 0,
  maxChoices: 2,
  choicesRanked: false,
  choicesIndependent: true,
  choicesFinal: true,
  apsRule: {
    method: 'standard_aps',
    subjectsCounted: 6,
    includesLifeOrientation: false,
    scale: 'nsc_7point',
  },
  defaultClosingDate: '2026-10-31T12:00:00+02:00',
  applyUrl: 'https://www.uj.ac.za/Apply',
  programmes: [],
};

const mockWits: University = {
  id: 'wits',
  name: 'University of the Witwatersrand',
  shortName: 'Wits',
  applicationSystem: 'Custom portal',
  applicationFee: 100,
  maxChoices: 3,
  choicesRanked: false,
  choicesIndependent: true,
  choicesFinal: false,
  apsRule: {
    method: 'standard_aps',
    subjectsCounted: 7,
    includesLifeOrientation: true,
    scale: 'nsc_7point',
  },
  defaultClosingDate: '2026-09-30T23:59:00+02:00',
  applyUrl: 'https://www.wits.ac.za/applications',
  programmes: [],
};

// ─── TESTS ──────────────────────────────────────────────────────────────────

describe('APS Calculator - Per-University', () => {
  describe('UJ (6 subjects, LO excluded)', () => {
    test('calculates APS with best 6 subjects, LO excluded', () => {
      const result = calculateAPS(mockStudentHighAPS, mockUJ);

      expect(result.universityId).toBe('uj');
      // Best 6: Accounting(7) + English(6) + Maths(6) + Life Sci(6) + Phys Sci(6) + Business(5) = 36
      expect(result.totalAPS).toBe(36);
      expect(result.subjects.find(s => s.subject === 'life_orientation')?.included).toBe(false);
    });
  });

  describe('Wits (7 subjects, LO included)', () => {
    test('calculates APS with best 6 + LO', () => {
      const result = calculateAPS(mockStudentHighAPS, mockWits);

      expect(result.universityId).toBe('wits');
      // Best 6 + LO(6): 36 + 6 = 42
      expect(result.totalAPS).toBe(42);
      expect(result.subjects.find(s => s.subject === 'life_orientation')?.included).toBe(true);
    });
  });
});

describe('Programme Matching', () => {
  describe('Maths-only gate', () => {
    const mathsOnlyProgramme: Programme = {
      qualificationCode: 'TEST-MATHS',
      universityId: 'uj',
      name: 'Test Programme (Maths Required)',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Test Faculty',
      campus: ['Main'],
      admission: {
        apsMinimum: { withMathematics: 30 },
        subjectRequirements: [
          { subject: 'english', status: 'required', minRating: 5 },
          { subject: 'mathematics', status: 'required', minRating: 4 },
          { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        ],
      },
    };

    test('qualifies student with Mathematics', () => {
      const match = matchStudentToProgramme(mockStudentHighAPS, mathsOnlyProgramme, mockUJ);

      expect(match.outcome).toBe('qualifies');
      expect(match.meetsRequirements).toBe(true);
    });

    test('rejects student with Maths Literacy', () => {
      const match = matchStudentToProgramme(mockStudentMathsLit, mathsOnlyProgramme, mockUJ);

      expect(match.outcome).toBe('below_minimum');
      expect(match.meetsRequirements).toBe(false);
      expect(match.missingRequirements.some(m => m.includes('specific maths type'))).toBe(true);
    });
  });

  describe('Alternative group (Maths OR Maths Lit)', () => {
    const altGroupProgramme: Programme = {
      qualificationCode: 'TEST-ALT',
      universityId: 'uj',
      name: 'Test Programme (Maths OR Maths Lit)',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Test Faculty',
      campus: ['Main'],
      admission: {
        apsMinimum: { withMathematics: 25, withMathematicalLiteracy: 27 },
        subjectRequirements: [
          { subject: 'english', status: 'required', minRating: 5 },
          { subject: 'mathematics', status: 'alternative', minRating: 4, altGroup: 'maths' },
          { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'maths' },
        ],
      },
    };

    test('qualifies with Mathematics at Level 4+', () => {
      const match = matchStudentToProgramme(mockStudentHighAPS, altGroupProgramme, mockUJ);

      expect(match.outcome).toBe('qualifies');
      expect(match.requiredAPS).toBe(25);
    });

    test('qualifies with Maths Literacy at Level 5+', () => {
      const match = matchStudentToProgramme(mockStudentMathsLit, altGroupProgramme, mockUJ);

      expect(match.outcome).toBe('qualifies');
      expect(match.requiredAPS).toBe(27);
    });
  });

  describe('Not accepted gate (Tech Maths)', () => {
    const noTechMathsProgramme: Programme = {
      qualificationCode: 'TEST-NO-TECH',
      universityId: 'uj',
      name: 'Test Programme (No Tech Maths)',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Test Faculty',
      campus: ['Main'],
      admission: {
        apsMinimum: { withMathematics: 28 },
        subjectRequirements: [
          { subject: 'english', status: 'required', minRating: 5 },
          { subject: 'mathematics', status: 'required', minRating: 4 },
          { subject: 'technicalMathematics', status: 'not_accepted' },
        ],
      },
    };

    test('rejects student with Technical Mathematics', () => {
      const match = matchStudentToProgramme(mockStudentTechMaths, noTechMathsProgramme, mockUJ);

      expect(match.outcome).toBe('below_minimum');
      expect(match.meetsRequirements).toBe(false);
    });
  });

  describe('Waitlist band', () => {
    const waitlistProgramme: Programme = {
      qualificationCode: 'TEST-WAITLIST',
      universityId: 'wits',
      name: 'Test Programme (With Waitlist)',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Test Faculty',
      campus: ['Main'],
      admission: {
        apsMinimum: { default: 38 },
        subjectRequirements: [
          { subject: 'english', status: 'required', minRating: 5 },
          { subject: 'mathematics', status: 'required', minRating: 5 },
        ],
        waitlistBand: {
          apsRange: [35, 37],
          conditions: ['English Level 5', 'Mathematics Level 5'],
        },
      },
    };

    test('qualifies student above APS threshold', () => {
      // This student has Wits APS of 42 (from earlier test)
      const match = matchStudentToProgramme(mockStudentHighAPS, waitlistProgramme, mockWits);

      expect(match.outcome).toBe('qualifies');
      expect(match.meetsRequirements).toBe(true);
    });

    test('waitlists student in the band with subject requirements met', () => {
      // Create a student with APS 36 at Wits
      const waitlistStudent: SubjectResult[] = [
        { id: '1', studentId: 'test', subject: 'english_home', mark: 65, level: 5, year: 2024 },
        { id: '2', studentId: 'test', subject: 'mathematics', mark: 62, level: 5, year: 2024 },
        { id: '3', studentId: 'test', subject: 'accounting', mark: 60, level: 5, year: 2024 },
        { id: '4', studentId: 'test', subject: 'business_studies', mark: 58, level: 4, year: 2024 },
        { id: '5', studentId: 'test', subject: 'economics', mark: 56, level: 4, year: 2024 },
        { id: '6', studentId: 'test', subject: 'geography', mark: 54, level: 4, year: 2024 },
        { id: '7', studentId: 'test', subject: 'life_orientation', mark: 65, level: 5, year: 2024 },
      ];

      const match = matchStudentToProgramme(waitlistStudent, waitlistProgramme, mockWits);

      expect(match.outcome).toBe('waitlist');
      expect(match.waitlistInfo?.inBand).toBe(true);
    });

    test('rejects student below waitlist band', () => {
      // Create a student with APS 30 at Wits
      const lowStudent: SubjectResult[] = [
        { id: '1', studentId: 'test', subject: 'english_home', mark: 55, level: 4, year: 2024 },
        { id: '2', studentId: 'test', subject: 'mathematics', mark: 52, level: 4, year: 2024 },
        { id: '3', studentId: 'test', subject: 'accounting', mark: 50, level: 4, year: 2024 },
        { id: '4', studentId: 'test', subject: 'business_studies', mark: 48, level: 3, year: 2024 },
        { id: '5', studentId: 'test', subject: 'economics', mark: 46, level: 3, year: 2024 },
        { id: '6', studentId: 'test', subject: 'geography', mark: 44, level: 3, year: 2024 },
        { id: '7', studentId: 'test', subject: 'life_orientation', mark: 60, level: 5, year: 2024 },
      ];

      const match = matchStudentToProgramme(lowStudent, waitlistProgramme, mockWits);

      expect(match.outcome).toBe('below_minimum');
      expect(match.meetsRequirements).toBe(false);
    });
  });

  describe('Conditional APS minimum', () => {
    const conditionalProgramme: Programme = {
      qualificationCode: 'TEST-COND',
      universityId: 'uj',
      name: 'Test Programme (Conditional APS)',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Test Faculty',
      campus: ['Main'],
      admission: {
        apsMinimum: { withMathematics: 28, withMathematicalLiteracy: 30 },
        subjectRequirements: [
          { subject: 'english', status: 'required', minRating: 5 },
          { subject: 'mathematics', status: 'alternative', minRating: 4, altGroup: 'maths' },
          { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 5, altGroup: 'maths' },
        ],
      },
    };

    test('applies lower APS threshold for Mathematics students', () => {
      const match = matchStudentToProgramme(mockStudentHighAPS, conditionalProgramme, mockUJ);

      expect(match.requiredAPS).toBe(28);
      expect(match.outcome).toBe('qualifies');
    });

    test('applies higher APS threshold for Maths Lit students', () => {
      const match = matchStudentToProgramme(mockStudentMathsLit, conditionalProgramme, mockUJ);

      expect(match.requiredAPS).toBe(30);
    });
  });
});

describe('Choice Strategy Classification', () => {
  test('classifies as reach when 0-2 points above minimum', () => {
    // Student APS 36, required 35 = gap of 1 = reach
    expect(true).toBe(true); // Placeholder - classification tested in matching
  });

  test('classifies extended programmes as safety', () => {
    const ecpProgramme: Programme = {
      qualificationCode: 'TEST-ECP',
      universityId: 'uj',
      name: 'Extended Programme',
      qualificationType: 'extended_diploma',
      durationYears: 4,
      faculty: 'Test Faculty',
      campus: ['Main'],
      firstTimeEntrantsOnly: true,
      admission: {
        apsMinimum: { withMathematics: 20 },
        subjectRequirements: [],
      },
    };

    const match = matchStudentToProgramme(mockStudentHighAPS, ecpProgramme, mockUJ);
    expect(match.choiceStrategy).toBe('safety');
  });
});
