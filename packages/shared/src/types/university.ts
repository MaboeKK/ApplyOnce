// src/types/university.ts

import { NSCSubject } from './student';

// ── Ratings & Subject Keys ──────────────────────────────────────────
export type Rating = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// SubjectKey maps to our existing NSCSubject types
// Generic keys allow matching across similar subjects
export type SubjectKey =
  | 'english'
  | 'homeLanguage'          // matches any *_home language
  | 'additionalLanguage'    // matches any *_fal language
  | 'afrikaans' | 'isiZulu' | 'sepedi'
  | 'mathematics'
  | 'mathematicalLiteracy'
  | 'technicalMathematics'
  | 'physicalScience'
  | 'technicalScience'
  | 'lifeScience'
  | 'geography'
  | 'accounting'
  | 'lifeOrientation';

// ── How a university computes APS ───────────────────────────────────
export interface ApsRule {
  method: 'standard_aps' | 'composite_index' | 'custom';
  subjectsCounted: number;            // UJ = 6, Wits = 7
  includesLifeOrientation: boolean;   // UJ = false, Wits = true
  scale: 'nsc_7point';
  bonusPoints?: string;
  note?: string;
}

// ── University ──────────────────────────────────────────────────────
export interface University {
  id: string;                         // slug, e.g. 'uj', 'wits'
  name: string;
  shortName: string;
  applicationSystem: string;          // 'Custom portal' | 'CAO' | 'PeopleSoft'
  applicationFee: number;             // ZAR. 0 = free
  feeNote?: string;
  maxChoices: number;                 // UJ = 2, Wits = 3
  choicesRanked: boolean;
  choicesIndependent: boolean;
  choicesFinal: boolean;
  apsRule: ApsRule;
  applicationsOpen?: string;          // ISO date
  defaultClosingDate: string;         // ISO datetime
  applyUrl: string;
  notes?: string[];
  programmes: Programme[];
  // Legacy fields for DB compatibility
  type?: 'traditional' | 'university_of_technology' | 'comprehensive';
  city?: string;
  province?: string;
  website?: string;
  applicationPortal?: string;
}

// ── Programme ───────────────────────────────────────────────────────
export type QualificationType =
  | 'degree' | 'extended_degree'
  | 'diploma' | 'extended_diploma'
  | 'online'
  // Legacy types for backward compatibility
  | 'bachelor' | 'btech' | 'higher_certificate' | 'advanced_diploma';

export interface Programme {
  qualificationCode: string;          // PRIMARY KEY, e.g. 'B8BA3Q'
  universityId: string;
  name: string;
  qualificationType: QualificationType;
  durationYears: number;
  faculty: string;
  campus: string[];
  admission: AdmissionRule;
  closingDateOverride?: string;       // ISO datetime
  additionalRequirements?: string[];  // ['NBT', 'portfolio', 'audition']
  firstTimeEntrantsOnly?: boolean;
  careers?: string[];
  note?: string;
  // Legacy fields for backward compatibility
  id?: string;
  isECP?: boolean;                    // derived from qualificationType
}

// ── Admission Rule (the core) ───────────────────────────────────────
export interface AdmissionRule {
  apsMinimum: ApsMinimum;
  subjectRequirements: SubjectRequirement[];
  waitlistBand?: WaitlistBand;
  note?: string;
}

export interface ApsMinimum {
  default?: number;
  withMathematics?: number;
  withMathematicalLiteracy?: number;
  withTechnicalMathematics?: number;
}

export type SubjectStatus =
  | 'required'        // must be present at minRating
  | 'alternative'     // one of an altGroup must be satisfied
  | 'not_accepted'    // disqualifies this path
  | 'not_applicable'; // irrelevant

export interface SubjectRequirement {
  subject: SubjectKey;
  status: SubjectStatus;
  minRating?: Rating;
  homeLanguageRating?: Rating;
  additionalLanguageRating?: Rating;
  altGroup?: string;
}

export interface WaitlistBand {
  apsRange: [number, number];         // inclusive, e.g. [35, 37]
  conditions: string[];
}

// ── Matching Results ────────────────────────────────────────────────
export type MatchOutcome = 'qualifies' | 'waitlist' | 'below_minimum' | 'requirements_not_available';

export interface UniversityMatch {
  university: University;
  programme: Programme;
  outcome: MatchOutcome;
  studentAPS: number;
  requiredAPS: number;                // The applicable APS minimum for this student
  meetsRequirements: boolean;
  missingRequirements: string[];
  choiceStrategy?: ChoiceStrategy;
  waitlistInfo?: {
    inBand: boolean;
    conditions: string[];
  };
}

export type ChoiceStrategy = 'reach' | 'match' | 'safety' | 'not_qualified';

// ── Subject Key Mapping ─────────────────────────────────────────────
// Maps generic SubjectKey to specific NSCSubject types
export function matchesSubjectKey(nscSubject: NSCSubject, key: SubjectKey): boolean {
  const s = nscSubject.toLowerCase();
  const k = key.toLowerCase();

  // Direct matches
  if (s === k) return true;
  if (s === 'mathematical_literacy' && k === 'mathematicalliteracy') return true;
  if (s === 'technical_mathematics' && k === 'technicalmathematics') return true;
  if (s === 'physical_sciences' && k === 'physicalscience') return true;
  if (s === 'life_sciences' && k === 'lifescience') return true;
  if (s === 'life_orientation' && k === 'lifeorientation') return true;

  // Generic homeLanguage matches any *_home
  if (k === 'homelanguage' && s.endsWith('_home')) return true;

  // Generic additionalLanguage matches any *_fal
  if (k === 'additionallanguage' && s.endsWith('_fal')) return true;

  // English can match either english_home or english_fal
  if (k === 'english' && (s === 'english_home' || s === 'english_fal')) return true;

  // Specific languages
  if (k === 'afrikaans' && (s === 'afrikaans_home' || s === 'afrikaans_fal')) return true;
  if (k === 'isizulu' && (s === 'zulu_home' || s === 'zulu_fal')) return true;
  if (k === 'sepedi' && s === 'pedi_home') return true;

  return false;
}

// Detect which maths type the student has
export function getStudentMathsType(subjects: { subject: NSCSubject }[]): 'mathematics' | 'mathematicalLiteracy' | 'technicalMathematics' | null {
  for (const s of subjects) {
    const subj = s.subject.toLowerCase();
    if (subj === 'mathematics') return 'mathematics';
    if (subj === 'mathematical_literacy') return 'mathematicalLiteracy';
    if (subj === 'technical_mathematics') return 'technicalMathematics';
  }
  return null;
}
