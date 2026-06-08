// packages/api/src/controllers/aps.ts
// APS calculation and programme matching (per-university)

import { Response } from 'express';
import { AuthRequest } from '../types/express';
import { asyncHandler } from '../utils/asyncHandler';
import { prisma } from '../utils/prisma';
import { ValidationError } from '../utils/errors';
import {
  calculateAPS,
  findAllMatches,
  classifyChoice,
  UNIVERSITIES,
  SubjectResult,
  getUniversityById,
} from '@applyonce/shared';

/**
 * POST /v1/aps/calculate
 * Calculate APS for a specific university from provided subject results
 */
export const calculateAPSFromResults = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { results, universityId } = req.body;

  if (!results || !Array.isArray(results) || results.length < 6) {
    throw new ValidationError('Minimum 6 subject results required');
  }

  if (!universityId) {
    throw new ValidationError('universityId is required');
  }

  const university = getUniversityById(universityId);
  if (!university) {
    throw new ValidationError(`University ${universityId} not found`);
  }

  const apsResult = calculateAPS(results, university);

  res.json({
    universityId: apsResult.universityId,
    aps: apsResult.totalAPS,
    subjects: apsResult.subjects,
    isValid: apsResult.isValid,
    validationErrors: apsResult.validationErrors,
    apsRule: {
      subjectsCounted: university.apsRule.subjectsCounted,
      includesLifeOrientation: university.apsRule.includesLifeOrientation,
    },
  });
});

/**
 * GET /v1/aps/matches
 * Get programmes that match student's APS across all universities
 * Returns per-university APS with each match
 */
export const getAPSMatches = asyncHandler(async (req: AuthRequest, res: Response) => {
  const studentId = req.student!.studentId;

  // Fetch student's subject results
  const subjectResults = await prisma.subjectResult.findMany({
    where: { studentId },
  });

  if (subjectResults.length < 6) {
    throw new ValidationError('Student must have at least 6 subject results uploaded');
  }

  // Convert to SubjectResult format
  const results: SubjectResult[] = subjectResults.map((r) => ({
    id: r.id,
    studentId: r.studentId,
    subject: r.subject as any,
    mark: r.mark,
    level: r.level,
    year: r.year,
  }));

  // Calculate per-university APS
  const universityAPS = new Map<string, number>();
  for (const uni of UNIVERSITIES) {
    const apsResult = calculateAPS(results, uni);
    universityAPS.set(uni.id, apsResult.totalAPS);
  }

  // Find all matches
  const allMatches = findAllMatches(results, UNIVERSITIES);

  // Transform matches for frontend consumption
  const matchesWithStrategy = allMatches.map((match) => {
    const studentAPS = universityAPS.get(match.university.id) || 0;
    const strategy = classifyChoice(studentAPS, match.requiredAPS, match.programme);

    return {
      outcome: match.outcome,
      universityId: match.university.id,
      universityName: match.university.name,
      universityShortName: match.university.shortName,
      universityAPS: studentAPS,
      programmeCode: match.programme.qualificationCode,
      programmeName: match.programme.name,
      programmeType: match.programme.qualificationType,
      programmeDuration: match.programme.durationYears,
      programmeFaculty: match.programme.faculty,
      programmeCampus: match.programme.campus,
      requiredAPS: match.requiredAPS,
      studentAPS: studentAPS,
      apsGap: studentAPS - match.requiredAPS,
      meetsRequirements: match.meetsRequirements,
      missingRequirements: match.missingRequirements,
      choiceStrategy: strategy,
      waitlistInfo: match.waitlistInfo,
      additionalRequirements: match.programme.additionalRequirements,
      closingDate: match.programme.closingDateOverride || match.university.defaultClosingDate,
      careers: match.programme.careers,
      note: match.programme.note,
    };
  });

  // Filter out "requirements not available" unless explicitly requested
  const availableMatches = matchesWithStrategy.filter(m => m.outcome !== 'requirements_not_available');

  // Count by strategy (only for qualifying/waitlist programmes)
  const qualifying = availableMatches.filter((m) => m.meetsRequirements || m.outcome === 'waitlist');
  const qualifyingCounts = {
    reach: qualifying.filter((m) => m.choiceStrategy === 'reach').length,
    match: qualifying.filter((m) => m.choiceStrategy === 'match').length,
    safety: qualifying.filter((m) => m.choiceStrategy === 'safety').length,
  };

  // Balance nudge
  let balanceNudge: string | null = null;
  if (qualifyingCounts.reach > 0 && qualifyingCounts.safety === 0) {
    balanceNudge = 'Consider adding a safety choice to protect yourself.';
  } else if (qualifyingCounts.safety > 0 && qualifyingCounts.reach === 0 && qualifyingCounts.match === 0) {
    balanceNudge = 'You have safety choices. Consider adding reach or match programmes to aim higher.';
  }

  // Per-university APS breakdown
  const apsBreakdown = Array.from(universityAPS.entries()).map(([uniId, aps]) => {
    const uni = getUniversityById(uniId);
    return {
      universityId: uniId,
      universityName: uni?.name || uniId,
      aps,
      apsRule: uni?.apsRule || null,
    };
  });

  res.json({
    universityAPS: apsBreakdown,
    totalMatches: availableMatches.length,
    qualifyingMatches: qualifying.length,
    strategyCounts: qualifyingCounts,
    balanceNudge,
    matches: availableMatches,
    placeholderCount: matchesWithStrategy.length - availableMatches.length,
  });
});
