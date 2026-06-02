// src/services/aps-calculator.ts
// NSC Admission Point Score (APS) Calculator
// Based on official DHET/DBE guidelines

import { SubjectResult, NSCSubject } from '../types/student';
import { Programme, University, UniversityMatch, ChoiceStrategy } from '../types/university';

// ─── APS POINT CONVERSION ───────────────────────────────────────────────────
// Official NSC percentage → APS level conversion

export function markToAPS(mark: number): number {
  if (mark >= 80) return 7;
  if (mark >= 70) return 6;
  if (mark >= 60) return 5;
  if (mark >= 50) return 4;
  if (mark >= 40) return 3;
  if (mark >= 30) return 2;
  return 1;
}

// ─── LIFE ORIENTATION HANDLING ──────────────────────────────────────────────
// LO is treated inconsistently across SA universities:
// - Some exclude it entirely (most common for competitive programmes)
// - Some include it but cap at 4 points
// - Some include it at full value (uncommon)

export type LOHandling = 'exclude' | 'cap_at_4' | 'full';

// ─── CORE APS CALCULATION ───────────────────────────────────────────────────

export interface APSResult {
  totalAPS: number;                  // Final APS score
  totalAPSWithLO: number;            // Score including LO at full value
  totalAPSWithLOCapped: number;      // Score including LO capped at 4
  subjects: SubjectAPSBreakdown[];
  subjectCount: number;              // How many subjects contributed
  isValid: boolean;                  // Has minimum required subjects
  validationErrors: string[];
}

export interface SubjectAPSBreakdown {
  subject: NSCSubject;
  mark: number;
  apsPoints: number;
  included: boolean;
  isLO: boolean;
}

export function calculateAPS(
  results: SubjectResult[],
  loHandling: LOHandling = 'exclude'
): APSResult {
  const errors: string[] = [];

  if (results.length < 6) {
    errors.push(`Only ${results.length} subjects provided. Minimum 6 required.`);
  }

  const breakdown: SubjectAPSBreakdown[] = results.map(r => ({
    subject: r.subject,
    mark: r.mark,
    apsPoints: markToAPS(r.mark),
    included: true,
    isLO: r.subject === 'life_orientation',
  }));

  // Separate LO from other subjects
  const loEntry = breakdown.find(b => b.isLO);
  const otherSubjects = breakdown.filter(b => !b.isLO);

  // Take best 6 non-LO subjects (some students take more than 7 subjects)
  const sortedOthers = [...otherSubjects].sort((a, b) => b.apsPoints - a.apsPoints);
  const top6 = sortedOthers.slice(0, 6);
  
  // Mark excluded subjects
  breakdown.forEach(b => {
    if (!b.isLO && !top6.includes(b)) {
      b.included = false;
    }
  });

  const baseAPS = top6.reduce((sum, s) => sum + s.apsPoints, 0);

  // LO variants
  const loPoints = loEntry ? loEntry.apsPoints : 0;
  const loCapped = loEntry ? Math.min(loEntry.apsPoints, 4) : 0;

  let totalAPS: number;
  switch (loHandling) {
    case 'full':
      totalAPS = baseAPS + loPoints;
      break;
    case 'cap_at_4':
      totalAPS = baseAPS + loCapped;
      break;
    case 'exclude':
    default:
      totalAPS = baseAPS;
  }

  return {
    totalAPS,
    totalAPSWithLO: baseAPS + loPoints,
    totalAPSWithLOCapped: baseAPS + loCapped,
    subjects: breakdown,
    subjectCount: top6.length + (loEntry ? 1 : 0),
    isValid: errors.length === 0,
    validationErrors: errors,
  };
}

// ─── PROGRAMME MATCHING ─────────────────────────────────────────────────────

export function matchStudentToProgramme(
  studentResults: SubjectResult[],
  programme: Programme,
  _university: University
): { meets: boolean; studentAPS: number; missing: string[] } {
  const loHandling: LOHandling = programme.apsWithLO ? 'cap_at_4' : 'exclude';
  const apsResult = calculateAPS(studentResults, loHandling);
  const studentAPS = apsResult.totalAPS;

  const missing: string[] = [];

  // Check APS minimum
  if (studentAPS < programme.apsMinimum) {
    missing.push(
      `APS too low: you have ${studentAPS}, need ${programme.apsMinimum}`
    );
  }

  // Check subject-specific requirements
  for (const req of programme.subjectRequirements) {
    const result = studentResults.find(r =>
      r.subject.toLowerCase().replace(/_/g, ' ') === req.subject.toLowerCase()
    );
    if (!result) {
      missing.push(`Missing required subject: ${req.subject}`);
    } else if (result.mark < req.minimumMark) {
      missing.push(
        `${req.subject}: need ${req.minimumMark}%, you have ${result.mark}%`
      );
    }
  }

  return {
    meets: missing.length === 0,
    studentAPS,
    missing,
  };
}

// ─── BULK MATCHING ──────────────────────────────────────────────────────────

export function findAllMatches(
  studentResults: SubjectResult[],
  universities: University[]
): UniversityMatch[] {
  const matches: UniversityMatch[] = [];

  for (const university of universities) {
    for (const faculty of university.faculties) {
      for (const programme of faculty.programmes) {
        const match = matchStudentToProgramme(studentResults, programme, university);
        matches.push({
          university,
          programme,
          studentAPS: match.studentAPS,
          meetsRequirements: match.meets,
          missingRequirements: match.missing,
        });
      }
    }
  }

  // Sort: qualifying programmes first, then by APS gap
  return matches.sort((a, b) => {
    if (a.meetsRequirements && !b.meetsRequirements) return -1;
    if (!a.meetsRequirements && b.meetsRequirements) return 1;
    return (a.programme.apsMinimum - a.studentAPS) - (b.programme.apsMinimum - b.studentAPS);
  });
}

// ─── CHOICE STRATEGY CLASSIFICATION ─────────────────────────────────────────
// Tags programmes as reach/match/safety based on student APS vs programme minimum

export function classifyChoice(
  studentAPS: number,
  programme: Programme
): ChoiceStrategy {
  const gap = studentAPS - programme.apsMinimum;

  // Does not meet minimum (unless ECP, which may still be reachable)
  if (gap < 0) {
    return programme.isECP ? 'reach' : 'not_qualified';
  }

  // ECPs are always safety (lower entry point + foundation year)
  if (programme.isECP) {
    return 'safety';
  }

  // Reach (Dream): meets minimum but tight (0-2 points above)
  if (gap >= 0 && gap <= 2) {
    return 'reach';
  }

  // Match (Strong fit): comfortably above minimum (3-5 points)
  if (gap >= 3 && gap <= 5) {
    return 'match';
  }

  // Safety (Secure): well above minimum (6+ points)
  return 'safety';
}

// ─── CONVENIENCE EXPORT ─────────────────────────────────────────────────────

export const APSCalculator = {
  markToAPS,
  calculateAPS,
  matchStudentToProgramme,
  findAllMatches,
  classifyChoice,
};
