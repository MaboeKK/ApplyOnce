// src/services/aps-calculator.ts
// NSC Admission Point Score (APS) Calculator — Per-University

import { SubjectResult, NSCSubject } from '../types/student';
import {
  University,
  Programme,
  UniversityMatch,
  ChoiceStrategy,
  Rating,
  MatchOutcome,
  SubjectKey,
  matchesSubjectKey,
  getStudentMathsType,
  ApsMinimum
} from '../types/university';

// ─── APS POINT CONVERSION ───────────────────────────────────────────────────
// Official NSC percentage → APS level conversion (1-7 scale)

export function markToAPS(mark: number): Rating {
  if (mark >= 80) return 7;
  if (mark >= 70) return 6;
  if (mark >= 60) return 5;
  if (mark >= 50) return 4;
  if (mark >= 40) return 3;
  if (mark >= 30) return 2;
  return 1;
}

// ─── CORE APS CALCULATION (PER-UNIVERSITY) ──────────────────────────────────

export interface APSResult {
  universityId: string;
  totalAPS: number;
  subjects: SubjectAPSBreakdown[];
  subjectCount: number;
  isValid: boolean;
  validationErrors: string[];
}

export interface SubjectAPSBreakdown {
  subject: NSCSubject;
  mark: number;
  rating: Rating;
  included: boolean;
  isLO: boolean;
}

/**
 * Calculate APS for a specific university using that university's apsRule.
 *
 * UJ: 6 subjects, LO excluded
 * Wits: 7 subjects, LO included
 */
export function calculateAPS(
  results: SubjectResult[],
  university: University
): APSResult {
  const errors: string[] = [];

  if (results.length < 6) {
    errors.push(`Only ${results.length} subjects provided. Minimum 6 required.`);
  }

  const breakdown: SubjectAPSBreakdown[] = results.map(r => ({
    subject: r.subject,
    mark: r.mark,
    rating: markToAPS(r.mark),
    included: false,
    isLO: r.subject === 'life_orientation',
  }));

  const { subjectsCounted, includesLifeOrientation } = university.apsRule;

  // Separate LO from other subjects
  const loEntry = breakdown.find(b => b.isLO);
  const otherSubjects = breakdown.filter(b => !b.isLO);

  // Sort by rating descending
  const sortedOthers = [...otherSubjects].sort((a, b) => b.rating - a.rating);

  let topSubjects: SubjectAPSBreakdown[];
  let totalAPS: number;

  if (includesLifeOrientation) {
    // Take best (subjectsCounted - 1) non-LO subjects + LO
    const countWithoutLO = subjectsCounted - 1;
    topSubjects = sortedOthers.slice(0, countWithoutLO);

    topSubjects.forEach(s => { s.included = true; });

    const baseAPS = topSubjects.reduce((sum, s) => sum + s.rating, 0);
    const loPoints = loEntry ? loEntry.rating : 0;

    if (loEntry) {
      loEntry.included = true;
    }

    totalAPS = baseAPS + loPoints;
  } else {
    // Take best subjectsCounted non-LO subjects, LO excluded
    topSubjects = sortedOthers.slice(0, subjectsCounted);
    topSubjects.forEach(s => { s.included = true; });
    totalAPS = topSubjects.reduce((sum, s) => sum + s.rating, 0);
  }

  return {
    universityId: university.id,
    totalAPS,
    subjects: breakdown,
    subjectCount: topSubjects.length + (includesLifeOrientation && loEntry ? 1 : 0),
    isValid: errors.length === 0,
    validationErrors: errors,
  };
}

// ─── PROGRAMME MATCHING ─────────────────────────────────────────────────────

/**
 * Check if a student qualifies for a programme.
 * Returns one of: qualifies | waitlist | below_minimum | requirements_not_available
 */
export function matchStudentToProgramme(
  studentResults: SubjectResult[],
  programme: Programme,
  university: University
): UniversityMatch {
  // Check if this is a placeholder programme
  if (programme.admission.note?.includes('requirements not yet available') ||
      programme.admission.note?.includes('Placeholder')) {
    return {
      university,
      programme,
      outcome: 'requirements_not_available',
      studentAPS: 0,
      requiredAPS: 0,
      meetsRequirements: false,
      missingRequirements: ['Programme requirements not yet available'],
      choiceStrategy: 'not_qualified',
    };
  }

  // Calculate student's APS for THIS university
  const apsResult = calculateAPS(studentResults, university);
  const studentAPS = apsResult.totalAPS;

  // Detect student's maths type
  const mathsType = getStudentMathsType(studentResults);

  // Select the applicable APS minimum
  const requiredAPS = getApplicableApsMinimum(programme.admission.apsMinimum, mathsType);

  if (requiredAPS === null) {
    // No applicable branch (e.g., programme requires Maths but student only has Maths Lit)
    return {
      university,
      programme,
      outcome: 'below_minimum',
      studentAPS,
      requiredAPS: 0,
      meetsRequirements: false,
      missingRequirements: ['This programme requires a specific maths type you do not have'],
      choiceStrategy: 'not_qualified',
    };
  }

  const missing: string[] = [];

  // Check APS minimum
  const meetsAPS = studentAPS >= requiredAPS;
  if (!meetsAPS) {
    missing.push(`APS: need ${requiredAPS}, you have ${studentAPS}`);
  }

  // Check subject requirements
  const subjectCheck = evaluateSubjectRequirements(
    studentResults,
    programme.admission.subjectRequirements
  );

  missing.push(...subjectCheck.missing);

  // Determine outcome
  let outcome: MatchOutcome;
  let waitlistInfo;

  if (missing.length === 0) {
    outcome = 'qualifies';
  } else if (programme.admission.waitlistBand) {
    // Check if student falls in waitlist band
    const [min, max] = programme.admission.waitlistBand.apsRange;
    if (studentAPS >= min && studentAPS <= max && subjectCheck.missing.length === 0) {
      outcome = 'waitlist';
      waitlistInfo = {
        inBand: true,
        conditions: programme.admission.waitlistBand.conditions,
      };
    } else {
      outcome = 'below_minimum';
    }
  } else {
    outcome = 'below_minimum';
  }

  // Classify choice strategy
  const strategy = classifyChoice(studentAPS, requiredAPS, programme);

  return {
    university,
    programme,
    outcome,
    studentAPS,
    requiredAPS,
    meetsRequirements: outcome === 'qualifies',
    missingRequirements: missing,
    choiceStrategy: strategy,
    waitlistInfo,
  };
}

/**
 * Get the applicable APS minimum based on the student's maths type.
 */
function getApplicableApsMinimum(
  apsMin: ApsMinimum,
  mathsType: 'mathematics' | 'mathematicalLiteracy' | 'technicalMathematics' | null
): number | null {
  if (!mathsType) {
    // Student has no maths subject — use default if available
    return apsMin.default ?? null;
  }

  switch (mathsType) {
    case 'mathematics':
      return apsMin.withMathematics ?? apsMin.default ?? null;
    case 'mathematicalLiteracy':
      return apsMin.withMathematicalLiteracy ?? apsMin.default ?? null;
    case 'technicalMathematics':
      return apsMin.withTechnicalMathematics ?? apsMin.default ?? null;
  }
}

/**
 * Evaluate subject requirements.
 * Returns missing requirements as strings.
 */
function evaluateSubjectRequirements(
  studentResults: SubjectResult[],
  requirements: { subject: SubjectKey; status: string; minRating?: Rating; homeLanguageRating?: Rating; additionalLanguageRating?: Rating; altGroup?: string }[]
): { missing: string[] } {
  const missing: string[] = [];

  // Group requirements by altGroup
  const altGroups = new Map<string, typeof requirements>();
  const requiredReqs: typeof requirements = [];

  for (const req of requirements) {
    if (req.status === 'required') {
      requiredReqs.push(req);
    } else if (req.status === 'alternative' && req.altGroup) {
      if (!altGroups.has(req.altGroup)) {
        altGroups.set(req.altGroup, []);
      }
      altGroups.get(req.altGroup)!.push(req);
    } else if (req.status === 'not_accepted') {
      // Check if student has this subject — if yes, fail
      const hasSubject = studentResults.some(r => matchesSubjectKey(r.subject, req.subject));
      if (hasSubject) {
        // Check if there's an acceptable alternative
        const hasAcceptableAlternative = requirements.some(alt =>
          (alt.status === 'required' || alt.status === 'alternative') &&
          studentResults.some(r => matchesSubjectKey(r.subject, alt.subject))
        );
        if (!hasAcceptableAlternative) {
          missing.push(`${req.subject} is not accepted for this programme`);
        }
      }
    }
  }

  // Check required subjects
  for (const req of requiredReqs) {
    const studentSubj = studentResults.find(r => matchesSubjectKey(r.subject, req.subject));

    if (!studentSubj) {
      missing.push(`Missing required subject: ${req.subject}`);
    } else {
      const rating = markToAPS(studentSubj.mark);
      let requiredRating: Rating | undefined;

      // For language subjects, check if it's home or additional
      if (req.homeLanguageRating || req.additionalLanguageRating) {
        const isHome = studentSubj.subject.toLowerCase().endsWith('_home');
        requiredRating = isHome ? req.homeLanguageRating : req.additionalLanguageRating;
      } else {
        requiredRating = req.minRating;
      }

      if (requiredRating && rating < requiredRating) {
        missing.push(`${req.subject}: need Level ${requiredRating}, you have Level ${rating}`);
      }
    }
  }

  // Check alternative groups (at least ONE must be satisfied)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, alts] of altGroups) {
    const satisfied = alts.some(req => {
      const studentSubj = studentResults.find(r => matchesSubjectKey(r.subject, req.subject));
      if (!studentSubj) return false;
      const rating = markToAPS(studentSubj.mark);
      return req.minRating ? rating >= req.minRating : true;
    });

    if (!satisfied) {
      const altNames = alts.map(a => a.subject).join(' OR ');
      const minRatings = alts.map(a => a.minRating ? `Level ${a.minRating}` : '').filter(Boolean).join(' or ');
      missing.push(`Need one of: ${altNames} ${minRatings ? `at ${minRatings}` : ''}`);
    }
  }

  return { missing };
}

// ─── BULK MATCHING ──────────────────────────────────────────────────────────

export function findAllMatches(
  studentResults: SubjectResult[],
  universities: University[]
): UniversityMatch[] {
  const matches: UniversityMatch[] = [];

  for (const university of universities) {
    for (const programme of university.programmes) {
      const match = matchStudentToProgramme(studentResults, programme, university);
      matches.push(match);
    }
  }

  // Sort: qualifying programmes first, then by APS gap
  return matches.sort((a, b) => {
    if (a.meetsRequirements && !b.meetsRequirements) return -1;
    if (!a.meetsRequirements && b.meetsRequirements) return 1;
    return (a.requiredAPS - a.studentAPS) - (b.requiredAPS - b.studentAPS);
  });
}

// ─── CHOICE STRATEGY CLASSIFICATION ─────────────────────────────────────────

export function classifyChoice(
  studentAPS: number,
  requiredAPS: number,
  programme: Programme
): ChoiceStrategy {
  const gap = studentAPS - requiredAPS;

  // Does not meet minimum
  if (gap < 0) {
    // ECPs might still be reachable with lower entry
    const isECP = programme.qualificationType.includes('extended') || programme.firstTimeEntrantsOnly;
    return isECP ? 'reach' : 'not_qualified';
  }

  // ECPs and first-time-only programmes are always safety
  const isECP = programme.qualificationType.includes('extended') || programme.firstTimeEntrantsOnly;
  if (isECP) {
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
