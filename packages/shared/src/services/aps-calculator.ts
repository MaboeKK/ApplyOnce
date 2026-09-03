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
  ApsMinimum,
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

/**
 * 8-point conversion table used by UFS and UKZN — distinguishes the top NSC
 * achievement level (80-100%) into two point values instead of the standard
 * scale's single "7". No points below 30%.
 */
export function markToAPS8(mark: number): number {
  if (mark >= 90) return 8;
  if (mark >= 80) return 7;
  if (mark >= 70) return 6;
  if (mark >= 60) return 5;
  if (mark >= 50) return 4;
  if (mark >= 40) return 3;
  if (mark >= 30) return 2;
  return 0;
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
  rating: Rating; // canonical 1-7 NSC achievement level — always this scale
  points: number; // this university's own scale-converted contribution to totalAPS
  included: boolean;
  isLO: boolean;
}

function baseBreakdown(results: SubjectResult[]): SubjectAPSBreakdown[] {
  return results.map((r) => ({
    subject: r.subject,
    mark: r.mark,
    rating: markToAPS(r.mark),
    points: 0,
    included: false,
    isLO: r.subject === 'life_orientation',
  }));
}

/**
 * Standard NSC 1-7 point scale (UJ, Wits, UP, ...).
 * UJ: 6 subjects, LO excluded. Wits: 7 subjects, LO included.
 */
function calculateNsc7PointAPS(results: SubjectResult[], university: University): APSResult {
  const errors: string[] = [];
  if (results.length < 6) {
    errors.push(`Only ${results.length} subjects provided. Minimum 6 required.`);
  }

  const breakdown = baseBreakdown(results);
  breakdown.forEach((b) => {
    b.points = b.rating;
  });

  const { subjectsCounted, includesLifeOrientation } = university.apsRule;

  const loEntry = breakdown.find((b) => b.isLO);
  const otherSubjects = breakdown.filter((b) => !b.isLO);
  const sortedOthers = [...otherSubjects].sort((a, b) => b.points - a.points);

  let topSubjects: SubjectAPSBreakdown[];
  let totalAPS: number;

  if (includesLifeOrientation) {
    const countWithoutLO = subjectsCounted - 1;
    topSubjects = sortedOthers.slice(0, countWithoutLO);
    topSubjects.forEach((s) => {
      s.included = true;
    });

    const baseAPS = topSubjects.reduce((sum, s) => sum + s.points, 0);
    const loPoints = loEntry ? loEntry.points : 0;
    if (loEntry) loEntry.included = true;

    totalAPS = baseAPS + loPoints;
  } else {
    topSubjects = sortedOthers.slice(0, subjectsCounted);
    topSubjects.forEach((s) => {
      s.included = true;
    });
    totalAPS = topSubjects.reduce((sum, s) => sum + s.points, 0);
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

/**
 * 8-point scale (UFS, UKZN). Life Orientation is never part of the ranked
 * "best N" pool: UKZN excludes it entirely (includesLifeOrientation: false);
 * UFS awards it a flat 1-point bonus if the mark is 60%+ (0 otherwise) on top
 * of the best 6 academic subjects, signalled by apsRule.bonusPoints being set
 * — it is NOT run through the 8-point table like the other six subjects.
 */
function calculateNsc8PointAPS(results: SubjectResult[], university: University): APSResult {
  const errors: string[] = [];
  if (results.length < 6) {
    errors.push(`Only ${results.length} subjects provided. Minimum 6 required.`);
  }

  const breakdown = baseBreakdown(results);
  breakdown.forEach((b) => {
    b.points = markToAPS8(b.mark);
  });

  const { subjectsCounted, includesLifeOrientation, bonusPoints } = university.apsRule;

  const loEntry = breakdown.find((b) => b.isLO);
  const otherSubjects = breakdown.filter((b) => !b.isLO);
  const sortedOthers = [...otherSubjects].sort((a, b) => b.points - a.points);

  const topSubjects = sortedOthers.slice(0, subjectsCounted);
  topSubjects.forEach((s) => {
    s.included = true;
  });

  let totalAPS = topSubjects.reduce((sum, s) => sum + s.points, 0);
  let subjectCount = topSubjects.length;

  if (includesLifeOrientation && loEntry) {
    loEntry.included = true;
    subjectCount += 1;
    if (bonusPoints) {
      loEntry.points = loEntry.mark >= 60 ? 1 : 0;
    }
    totalAPS += loEntry.points;
  }

  return {
    universityId: university.id,
    totalAPS,
    subjects: breakdown,
    subjectCount,
    isValid: errors.length === 0,
    validationErrors: errors,
  };
}

/**
 * Percentage-average scale (SU): the average raw NSC percentage across ALL
 * subjects excluding Life Orientation (not a best-N sum like the other
 * scales). Thresholds like "60" are a target average %, not APS points.
 */
function calculatePercentageAverageAPS(
  results: SubjectResult[],
  university: University
): APSResult {
  const errors: string[] = [];
  if (results.length < 6) {
    errors.push(`Only ${results.length} subjects provided. Minimum 6 required.`);
  }

  const breakdown = baseBreakdown(results);
  breakdown.forEach((b) => {
    b.points = b.mark;
  });

  const nonLO = breakdown.filter((b) => !b.isLO);
  nonLO.forEach((b) => {
    b.included = true;
  });

  const totalAPS =
    nonLO.length > 0
      ? Math.round((nonLO.reduce((sum, b) => sum + b.points, 0) / nonLO.length) * 10) / 10
      : 0;

  return {
    universityId: university.id,
    totalAPS,
    subjects: breakdown,
    subjectCount: nonLO.length,
    isValid: errors.length === 0,
    validationErrors: errors,
  };
}

/**
 * Base percentage-out-of-600 scale (UCT): English (home or FAL) + best 5
 * other subjects, raw percentages, Life Orientation excluded, any subject
 * below 40% scores 0. This is UCT's BASE APS before any faculty-specific
 * Faculty Points Score (FPS) transform — see applyFacultyScoring, applied
 * per-programme in matchStudentToProgramme since the transform depends on
 * the programme's faculty.
 */
function calculatePercentage600APS(results: SubjectResult[], university: University): APSResult {
  const errors: string[] = [];
  if (results.length < 6) {
    errors.push(`Only ${results.length} subjects provided. Minimum 6 required.`);
  }

  const breakdown = baseBreakdown(results);
  breakdown.forEach((b) => {
    b.points = b.mark < 40 ? 0 : b.mark;
  });

  const nonLO = breakdown.filter((b) => !b.isLO);
  const englishEntry = [...nonLO]
    .filter((b) => b.subject === 'english_home' || b.subject === 'english_fal')
    .sort((a, b) => b.points - a.points)[0];

  if (!englishEntry) {
    errors.push('English subject not found — UCT APS requires English.');
  }

  const others = nonLO
    .filter((b) => b !== englishEntry)
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  [englishEntry, ...others].forEach((b) => {
    if (b) b.included = true;
  });

  const totalAPS =
    (englishEntry ? englishEntry.points : 0) + others.reduce((sum, b) => sum + b.points, 0);

  return {
    universityId: university.id,
    totalAPS,
    subjects: breakdown,
    subjectCount: (englishEntry ? 1 : 0) + others.length,
    isValid: errors.length === 0,
    validationErrors: errors,
  };
}

/**
 * Calculate APS for a specific university using that university's apsRule.
 * Dispatches on apsRule.scale since universities score NSC results in
 * genuinely different units (1-7 points, 1-8 points, a raw percentage
 * average, or a percentage sum out of 600) — see the per-scale functions
 * above for each university's documented methodology.
 */
export function calculateAPS(results: SubjectResult[], university: University): APSResult {
  switch (university.apsRule.scale) {
    case 'nsc_8point':
      return calculateNsc8PointAPS(results, university);
    case 'percentage_average':
      return calculatePercentageAverageAPS(results, university);
    case 'percentage_600':
      return calculatePercentage600APS(results, university);
    case 'nsc_7point':
    default:
      return calculateNsc7PointAPS(results, university);
  }
}

/**
 * "Headline" APS shown before a specific university is chosen (OCR confirmation
 * screen, dashboard) — best 6 subjects excluding Life Orientation, the
 * methodology most universities use. This is a preview only: per-university
 * matching (calculateAPS) recalculates correctly for universities whose
 * apsRule includes Life Orientation (e.g. Wits), which can yield a different,
 * higher score for that university.
 */
export function calculateStandardAPS(results: SubjectResult[]): number {
  const nonLO = results.filter((r) => r.subject !== 'life_orientation');
  const sorted = [...nonLO].sort((a, b) => markToAPS(b.mark) - markToAPS(a.mark));
  const best6 = sorted.slice(0, 6);
  return best6.reduce((sum, r) => sum + markToAPS(r.mark), 0);
}

/**
 * Apply a university's faculty-specific score transform (e.g. UCT's base APS
 * -> Faculty Points Score) on top of a base APSResult, for a given
 * programme's faculty. Returns the base score unchanged if the university
 * has no facultyScoring or the programme's faculty isn't listed. Returns
 * `cannotCompute` when the real transform requires data ApplyOnce doesn't
 * collect (e.g. NBT scores) — callers must not silently compare the base
 * score against that faculty's threshold in that case.
 */
function applyFacultyScoring(
  apsResult: APSResult,
  programme: Programme,
  university: University
): { score: number; cannotCompute?: string } {
  const rule = university.apsRule.facultyScoring?.find((f) => f.faculty === programme.faculty);
  if (!rule) return { score: apsResult.totalAPS };

  // UCT Health Sciences bakes NBT scores directly into the formula — genuinely
  // not computable without NBT data, which is explicitly out of scope.
  if (rule.faculty === 'Health Sciences' && rule.usesNBT) {
    return {
      score: apsResult.totalAPS,
      cannotCompute: `${rule.scoreName} for this faculty requires NBT results, which ApplyOnce does not collect — check directly with the university.`,
    };
  }

  // UCT Science: FPS = base APS + Mathematics% + Physical Sciences% (Life
  // Sciences substitutes when Physical Sciences wasn't taken).
  if (rule.faculty === 'Science' && rule.scoreName === 'FPS') {
    const mathEntry = apsResult.subjects.find((s) => s.subject === 'mathematics');
    const sciEntry =
      apsResult.subjects.find((s) => s.subject === 'physical_sciences') ||
      apsResult.subjects.find((s) => s.subject === 'life_sciences');
    const bonus = (mathEntry?.points ?? 0) + (sciEntry?.points ?? 0);
    return { score: apsResult.totalAPS + bonus };
  }

  // Commerce / Engineering / Humanities / Law: "FPS = APS (no adjustment)".
  return { score: apsResult.totalAPS };
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
  if (
    programme.admission.note?.includes('requirements not yet available') ||
    programme.admission.note?.includes('Placeholder')
  ) {
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
  let studentAPS = apsResult.totalAPS;

  // Universities with a faculty-specific score transform (e.g. UCT's base
  // APS -> Faculty Points Score) need it applied before comparing against
  // that programme's threshold, which is expressed in the transformed score.
  if (university.apsRule.facultyScoring) {
    const adjusted = applyFacultyScoring(apsResult, programme, university);
    if (adjusted.cannotCompute) {
      return {
        university,
        programme,
        outcome: 'requirements_not_available',
        studentAPS: apsResult.totalAPS,
        requiredAPS: 0,
        meetsRequirements: false,
        missingRequirements: [adjusted.cannotCompute],
        choiceStrategy: 'not_qualified',
      };
    }
    studentAPS = adjusted.score;
  }

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
  requirements: {
    subject: SubjectKey;
    status: string;
    minRating?: Rating;
    minPercentage?: number;
    homeLanguageRating?: Rating;
    additionalLanguageRating?: Rating;
    altGroup?: string;
  }[]
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
      const hasSubject = studentResults.some((r) => matchesSubjectKey(r.subject, req.subject));
      if (hasSubject) {
        // Check if there's an acceptable alternative
        const hasAcceptableAlternative = requirements.some(
          (alt) =>
            (alt.status === 'required' || alt.status === 'alternative') &&
            studentResults.some((r) => matchesSubjectKey(r.subject, alt.subject))
        );
        if (!hasAcceptableAlternative) {
          missing.push(`${req.subject} is not accepted for this programme`);
        }
      }
    }
  }

  // Check required subjects
  for (const req of requiredReqs) {
    const studentSubj = studentResults.find((r) => matchesSubjectKey(r.subject, req.subject));

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

      if (req.minPercentage && studentSubj.mark < req.minPercentage) {
        missing.push(`${req.subject}: need ${req.minPercentage}%, you have ${studentSubj.mark}%`);
      }
    }
  }

  // Check alternative groups (at least ONE must be satisfied)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, alts] of altGroups) {
    const satisfied = alts.some((req) => {
      const studentSubj = studentResults.find((r) => matchesSubjectKey(r.subject, req.subject));
      if (!studentSubj) return false;
      if (req.minPercentage) return studentSubj.mark >= req.minPercentage;
      const rating = markToAPS(studentSubj.mark);
      return req.minRating ? rating >= req.minRating : true;
    });

    if (!satisfied) {
      const altNames = alts.map((a) => a.subject).join(' OR ');
      const thresholds = alts
        .map((a) =>
          a.minPercentage ? `${a.minPercentage}%` : a.minRating ? `Level ${a.minRating}` : ''
        )
        .filter(Boolean)
        .join(' or ');
      missing.push(`Need one of: ${altNames} ${thresholds ? `at ${thresholds}` : ''}`);
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
    return a.requiredAPS - a.studentAPS - (b.requiredAPS - b.studentAPS);
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
    const isECP =
      programme.qualificationType.includes('extended') || programme.firstTimeEntrantsOnly;
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
  calculateStandardAPS,
  matchStudentToProgramme,
  findAllMatches,
  classifyChoice,
};
