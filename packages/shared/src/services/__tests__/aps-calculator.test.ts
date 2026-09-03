// src/services/__tests__/aps-calculator.test.ts
// Tests for per-university APS calculation and admission matching

import {
  calculateAPS,
  matchStudentToProgramme,
  classifyChoice,
  markToAPS8,
} from '../aps-calculator';
import { University, Programme } from '../../types/university';
import { SubjectResult } from '../../types/student';

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
      expect(result.subjects.find((s) => s.subject === 'life_orientation')?.included).toBe(false);
    });
  });

  describe('Wits (7 subjects, LO included)', () => {
    test('calculates APS with best 6 + LO', () => {
      const result = calculateAPS(mockStudentHighAPS, mockWits);

      expect(result.universityId).toBe('wits');
      // Best 6 + LO(6): 36 + 6 = 42
      expect(result.totalAPS).toBe(42);
      expect(result.subjects.find((s) => s.subject === 'life_orientation')?.included).toBe(true);
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
      expect(match.missingRequirements.some((m) => m.includes('specific maths type'))).toBe(true);
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
          {
            subject: 'mathematicalLiteracy',
            status: 'alternative',
            minRating: 5,
            altGroup: 'maths',
          },
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
      // Create a student with APS 36 at Wits (7 subjects incl LO: 6+5+5+5+5+5+5=36)
      const waitlistStudent: SubjectResult[] = [
        { id: '1', studentId: 'test', subject: 'english_home', mark: 72, level: 6, year: 2024 },
        { id: '2', studentId: 'test', subject: 'mathematics', mark: 65, level: 5, year: 2024 },
        { id: '3', studentId: 'test', subject: 'accounting', mark: 62, level: 5, year: 2024 },
        { id: '4', studentId: 'test', subject: 'business_studies', mark: 60, level: 5, year: 2024 },
        { id: '5', studentId: 'test', subject: 'economics', mark: 60, level: 5, year: 2024 },
        { id: '6', studentId: 'test', subject: 'geography', mark: 60, level: 5, year: 2024 },
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
          {
            subject: 'mathematicalLiteracy',
            status: 'alternative',
            minRating: 5,
            altGroup: 'maths',
          },
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
  const standardProgramme: Programme = {
    qualificationCode: 'TEST-STD',
    universityId: 'uj',
    name: 'Standard Programme',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Test Faculty',
    campus: ['Main'],
    admission: {
      apsMinimum: { withMathematics: 30 },
      subjectRequirements: [],
    },
  };

  test('classifies as reach when 0-2 points above minimum', () => {
    expect(classifyChoice(35, 35, standardProgramme)).toBe('reach'); // gap 0
    expect(classifyChoice(36, 35, standardProgramme)).toBe('reach'); // gap 1
    expect(classifyChoice(37, 35, standardProgramme)).toBe('reach'); // gap 2
  });

  test('classifies as match when 3-5 points above minimum', () => {
    expect(classifyChoice(38, 35, standardProgramme)).toBe('match'); // gap 3
    expect(classifyChoice(40, 35, standardProgramme)).toBe('match'); // gap 5
  });

  test('classifies as safety when 6+ points above minimum', () => {
    expect(classifyChoice(41, 35, standardProgramme)).toBe('safety'); // gap 6
    expect(classifyChoice(50, 35, standardProgramme)).toBe('safety'); // gap 15
  });

  test('classifies as not_qualified when below minimum on a standard programme', () => {
    expect(classifyChoice(34, 35, standardProgramme)).toBe('not_qualified'); // gap -1
  });

  test('classifies an ECP below its own minimum as reach, not not_qualified', () => {
    const ecpBelowMinimum: Programme = {
      ...standardProgramme,
      qualificationCode: 'TEST-ECP-GAP',
      qualificationType: 'extended_diploma',
    };

    expect(classifyChoice(28, 30, ecpBelowMinimum)).toBe('reach'); // gap -2, but it's an ECP
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

// ─── Alternate scale universities (SU, UCT, UFS, UKZN) ──────────────────────
// Regression coverage for scales beyond the standard 1-7 point sum: without
// dispatching on apsRule.scale, calculateAPS would silently compare a ~42-49
// point total against these universities' much larger/differently-shaped
// thresholds (e.g. UCT's 500-900 FPS, SU's 55-80% average), making every
// programme at these universities appear as "does not qualify" regardless of
// the student's actual results.

const mockStudentWithTopMark: SubjectResult[] = [
  { id: '1', studentId: 'test', subject: 'english_home', mark: 92, level: 7, year: 2024 }, // 90%+ band
  { id: '2', studentId: 'test', subject: 'mathematics', mark: 72, level: 6, year: 2024 },
  { id: '3', studentId: 'test', subject: 'accounting', mark: 82, level: 7, year: 2024 },
  { id: '4', studentId: 'test', subject: 'life_sciences', mark: 70, level: 6, year: 2024 },
  { id: '5', studentId: 'test', subject: 'physical_sciences', mark: 70, level: 6, year: 2024 },
  { id: '6', studentId: 'test', subject: 'business_studies', mark: 65, level: 5, year: 2024 },
  { id: '7', studentId: 'test', subject: 'life_orientation', mark: 75, level: 6, year: 2024 },
];

const mockUKZN: University = {
  ...mockUJ,
  id: 'ukzn',
  name: 'University of KwaZulu-Natal',
  shortName: 'UKZN',
  apsRule: {
    method: 'custom',
    subjectsCounted: 6,
    includesLifeOrientation: false,
    scale: 'nsc_8point',
  },
};

const mockUFS: University = {
  ...mockUJ,
  id: 'ufs',
  name: 'University of the Free State',
  shortName: 'UFS',
  apsRule: {
    method: 'custom',
    subjectsCounted: 6,
    includesLifeOrientation: true,
    scale: 'nsc_8point',
    bonusPoints: 'Life Orientation contributes exactly 1 bonus point if Level 5 (60%) or higher.',
  },
};

const mockSU: University = {
  ...mockUJ,
  id: 'su',
  name: 'Stellenbosch University',
  shortName: 'SU',
  apsRule: {
    method: 'custom',
    subjectsCounted: 6,
    includesLifeOrientation: false,
    scale: 'percentage_average',
  },
};

const mockUCT: University = {
  ...mockUJ,
  id: 'uct',
  name: 'University of Cape Town',
  shortName: 'UCT',
  apsRule: {
    method: 'composite_index',
    subjectsCounted: 6,
    includesLifeOrientation: false,
    scale: 'percentage_600',
    facultyScoring: [
      {
        faculty: 'Commerce',
        scoreName: 'FPS',
        scoreMax: 600,
        transform: 'FPS = APS (no adjustment).',
      },
      {
        faculty: 'Science',
        scoreName: 'FPS',
        scoreMax: 800,
        transform: 'FPS = APS + Mathematics% + Physical Sciences%.',
      },
      {
        faculty: 'Health Sciences',
        scoreName: 'FPS',
        scoreMax: 900,
        transform: 'FPS = APS + sum of NBT scores.',
        usesNBT: true,
      },
    ],
  },
};

describe('markToAPS8 (UFS/UKZN 8-point table)', () => {
  test('splits the top NSC band into 90-100=8 and 80-89=7', () => {
    expect(markToAPS8(95)).toBe(8);
    expect(markToAPS8(90)).toBe(8);
    expect(markToAPS8(89)).toBe(7);
    expect(markToAPS8(80)).toBe(7);
    expect(markToAPS8(70)).toBe(6);
    expect(markToAPS8(29)).toBe(0);
  });
});

describe('UKZN (nsc_8point, LO excluded)', () => {
  test('sums the best 6 subjects on the 8-point table, LO excluded', () => {
    const result = calculateAPS(mockStudentWithTopMark, mockUKZN);
    // Best 6: English(8) + Accounting(7) + Maths(6) + LifeSci(6) + PhysSci(6) + Business(5) = 38
    expect(result.totalAPS).toBe(38);
    expect(result.subjects.find((s) => s.subject === 'life_orientation')?.included).toBe(false);
  });
});

describe('UFS (nsc_8point, LO as a flat 1-point bonus)', () => {
  test('adds a flat 1-point LO bonus on top of the best 6, not the 8-point LO value', () => {
    const result = calculateAPS(mockStudentWithTopMark, mockUFS);
    // Same best 6 as UKZN (38) + LO bonus (mark 75% >= 60% -> 1) = 39
    expect(result.totalAPS).toBe(39);
    const lo = result.subjects.find((s) => s.subject === 'life_orientation');
    expect(lo?.included).toBe(true);
    expect(lo?.points).toBe(1);
  });
});

describe('SU (percentage_average — all subjects, LO excluded)', () => {
  test('averages the raw percentage across every non-LO subject', () => {
    const result = calculateAPS(mockStudentHighAPS, mockSU);
    // (75+72+82+70+70+65) / 6 = 72.3
    expect(result.totalAPS).toBeCloseTo(72.3, 1);
    expect(result.subjectCount).toBe(6);
  });
});

describe('UCT (percentage_600 base + per-faculty FPS transform)', () => {
  test('base APS = English% + best 5 other %, out of 600', () => {
    const result = calculateAPS(mockStudentHighAPS, mockUCT);
    // English(75) + Accounting(82) + Maths(72) + LifeSci(70) + PhysSci(70) + Business(65) = 434
    expect(result.totalAPS).toBe(434);
  });

  test('Commerce FPS = base APS unchanged', () => {
    const commerceProgramme: Programme = {
      qualificationCode: 'UCT-COM-TEST',
      universityId: 'uct',
      name: 'Test Commerce Programme',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Commerce',
      campus: ['Main'],
      admission: { apsMinimum: { default: 400, scoreType: 'FPS' }, subjectRequirements: [] },
    };
    const match = matchStudentToProgramme(mockStudentHighAPS, commerceProgramme, mockUCT);
    expect(match.studentAPS).toBe(434);
    expect(match.outcome).toBe('qualifies');
  });

  test('Science FPS = base APS + Mathematics% + Physical Sciences%', () => {
    const scienceProgramme: Programme = {
      qualificationCode: 'UCT-SCI-TEST',
      universityId: 'uct',
      name: 'Test Science Programme',
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Science',
      campus: ['Main'],
      admission: { apsMinimum: { default: 500, scoreType: 'FPS' }, subjectRequirements: [] },
    };
    const match = matchStudentToProgramme(mockStudentHighAPS, scienceProgramme, mockUCT);
    // 434 base + Maths(72) + PhysSci(70) = 576
    expect(match.studentAPS).toBe(576);
    expect(match.outcome).toBe('qualifies');
  });

  test('Health Sciences (NBT baked into FPS) is not silently compared — requirements_not_available', () => {
    const healthProgramme: Programme = {
      qualificationCode: 'UCT-HSC-TEST',
      universityId: 'uct',
      name: 'Test Health Sciences Programme',
      qualificationType: 'degree',
      durationYears: 6,
      faculty: 'Health Sciences',
      campus: ['Main'],
      admission: { apsMinimum: { default: 810, scoreType: 'FPS' }, subjectRequirements: [] },
    };
    const match = matchStudentToProgramme(mockStudentHighAPS, healthProgramme, mockUCT);
    expect(match.outcome).toBe('requirements_not_available');
    expect(match.missingRequirements.some((m) => m.includes('NBT'))).toBe(true);
  });
});
