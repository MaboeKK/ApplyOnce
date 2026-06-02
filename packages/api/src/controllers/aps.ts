// packages/api/src/controllers/aps.ts
// APS calculation and programme matching

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
} from '@applyonce/shared';

/**
 * POST /v1/aps/calculate
 * Calculate APS from provided subject results
 */
export const calculateAPSFromResults = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { results, loHandling = 'exclude' } = req.body;

  if (!results || !Array.isArray(results) || results.length < 6) {
    throw new ValidationError('Minimum 6 subject results required');
  }

  const apsResult = calculateAPS(results, loHandling);

  res.json({
    aps: apsResult.totalAPS,
    apsWithLO: apsResult.totalAPSWithLO,
    apsWithLOCapped: apsResult.totalAPSWithLOCapped,
    subjects: apsResult.subjects,
    isValid: apsResult.isValid,
    validationErrors: apsResult.validationErrors,
  });
});

/**
 * GET /v1/aps/matches
 * Get programmes that match student's APS
 * Includes reach/match/safety classification
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
    subject: r.subject as any, // Type assertion for NSCSubject
    mark: r.mark,
    level: r.level,
    year: r.year,
  }));

  // Calculate student's APS
  const apsResult = calculateAPS(results, 'exclude');
  const studentAPS = apsResult.totalAPS;

  // Find all matches
  const allMatches = findAllMatches(results, UNIVERSITIES);

  // Add choice strategy classification to each match
  const matchesWithStrategy = allMatches.map((match) => {
    const strategy = classifyChoice(studentAPS, match.programme);
    return {
      ...match,
      choiceStrategy: strategy,
      // Flatten university and programme for easier frontend consumption
      universityId: match.university.id,
      universityName: match.university.name,
      universityAbbreviation: match.university.abbreviation,
      programmeId: match.programme.id,
      programmeName: match.programme.name,
      programmeApsMinimum: match.programme.apsMinimum,
      programmeDuration: match.programme.duration,
      programmeIsECP: match.programme.isECP || false,
      apsGap: studentAPS - match.programme.apsMinimum,
    };
  });

  // Count by strategy
  const strategyCounts = {
    reach: matchesWithStrategy.filter((m) => m.choiceStrategy === 'reach').length,
    match: matchesWithStrategy.filter((m) => m.choiceStrategy === 'match').length,
    safety: matchesWithStrategy.filter((m) => m.choiceStrategy === 'safety').length,
    not_qualified: matchesWithStrategy.filter((m) => m.choiceStrategy === 'not_qualified').length,
  };

  // Balance nudge
  const qualifying = matchesWithStrategy.filter((m) => m.meetsRequirements);
  const qualifyingCounts = {
    reach: qualifying.filter((m) => m.choiceStrategy === 'reach').length,
    match: qualifying.filter((m) => m.choiceStrategy === 'match').length,
    safety: qualifying.filter((m) => m.choiceStrategy === 'safety').length,
  };

  let balanceNudge: string | null = null;
  if (qualifyingCounts.reach > 0 && qualifyingCounts.safety === 0) {
    balanceNudge = 'Consider adding a safety choice to protect yourself.';
  } else if (qualifyingCounts.safety > 0 && qualifyingCounts.reach === 0 && qualifyingCounts.match === 0) {
    balanceNudge = 'You have safety choices. Consider adding reach or match programmes to aim higher.';
  }

  res.json({
    studentAPS,
    totalMatches: matchesWithStrategy.length,
    qualifyingMatches: qualifying.length,
    strategyCounts,
    balanceNudge,
    matches: matchesWithStrategy,
  });
});
