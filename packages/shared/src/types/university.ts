// src/types/university.ts

export interface University {
  id: string;               // e.g. 'uct', 'wits', 'uj'
  name: string;
  abbreviation: string;
  type: 'traditional' | 'university_of_technology' | 'comprehensive';
  city: string;
  province: string;
  website: string;
  applicationPortal: string;
  applicationFeeZAR: number;
  applicationOpenDate: string;   // MM-DD format (varies by year)
  applicationCloseDate: string;
  isIntegrated: boolean;         // Has API integration with ApplyOnce
  integrationStatus: 'live' | 'mock' | 'not_integrated';
  logoUrl?: string;
  faculties: Faculty[];
}

export interface Faculty {
  id: string;
  name: string;
  programmes: Programme[];
}

export interface Programme {
  id: string;
  name: string;
  qualification: QualificationType;
  duration: number;          // years
  apsMinimum: number;
  apsWithLO: boolean;        // whether LO is included in APS calc
  isECP?: boolean;           // Extended Curriculum Programme (foundation year)
  subjectRequirements: SubjectRequirement[];
  applicationFeeOverride?: number;
  availableSpaces?: number;
  notes?: string;
}

export type QualificationType =
  | 'bachelor'
  | 'btech'
  | 'diploma'
  | 'higher_certificate'
  | 'advanced_diploma';

export interface SubjectRequirement {
  subject: string;           // e.g. 'mathematics', 'physical_sciences'
  minimumMark: number;       // e.g. 50
  note?: string;
}

export interface UniversityMatch {
  university: University;
  programme: Programme;
  studentAPS: number;
  meetsRequirements: boolean;
  missingRequirements: string[];
  choiceStrategy?: 'reach' | 'match' | 'safety' | 'not_qualified';
}

export type ChoiceStrategy = 'reach' | 'match' | 'safety' | 'not_qualified';
