// packages/shared/src/constants/universities/placeholder-template.ts
// Shared generator for universities with minimal data only (prospectus pending).
// Engine returns "requirements not yet available" for these.

import { University } from '../../types/university';

export interface RemainingUniversityInput {
  id: string;
  name: string;
  shortName: string;
  fee: number;
  type: 'traditional' | 'university_of_technology' | 'comprehensive';
  logo?: string;
}

export function buildPlaceholderUniversity(uni: RemainingUniversityInput): University {
  return {
    id: uni.id,
    name: uni.name,
    shortName: uni.shortName,
    applicationSystem: 'Custom portal',
    applicationFee: uni.fee,
    maxChoices: 3,
    choicesRanked: false,
    choicesIndependent: true,
    choicesFinal: true,
    apsRule: {
      method: 'standard_aps',
      subjectsCounted: 6,
      includesLifeOrientation: false,
      scale: 'nsc_7point',
    },
    defaultClosingDate: '2026-09-30T23:59:00+02:00',
    applyUrl: `https://www.${uni.id}.ac.za/apply`,
    programmes: [
      {
        qualificationCode: `${uni.id.toUpperCase()}-PLACEHOLDER`,
        universityId: uni.id,
        name: 'Programmes pending prospectus data',
        qualificationType: 'degree',
        durationYears: 3,
        faculty: 'Various',
        campus: ['Main Campus'],
        admission: {
          apsMinimum: { default: 0 },
          subjectRequirements: [],
          note: 'Programme requirements not yet available — prospectus data pending.',
        },
      },
    ],
    type: uni.type,
    city: 'TBD',
    province: 'gauteng',
    website: `https://www.${uni.id}.ac.za`,
    applicationPortal: `https://www.${uni.id}.ac.za/apply`,
    logoUrl: uni.logo,
  };
}
