// src/types/student.ts

export interface Student {
  id: string;
  idNumber: string;         // SA ID number (13 digits)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;      // ISO date
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  race: 'african' | 'coloured' | 'indian' | 'white' | 'other' | 'prefer_not_to_say'; // Required by many SA universities
  nationality: string;
  homeLanguage: string;
  disability?: string;
  address: Address;
  guardian?: Guardian;
  matricYear: number;
  school: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  suburb?: string;
  city: string;
  province: SAProvince;
  postalCode: string;
}

export type SAProvince =
  | 'gauteng'
  | 'western_cape'
  | 'kwazulu_natal'
  | 'eastern_cape'
  | 'limpopo'
  | 'mpumalanga'
  | 'north_west'
  | 'free_state'
  | 'northern_cape';

export interface Guardian {
  firstName: string;
  lastName: string;
  relationship: string;
  phone: string;
  email?: string;
  employed: boolean;
  annualIncome?: number;    // For NSFAS eligibility (Phase 2)
}

export interface SubjectResult {
  id: string;
  studentId: string;
  subject: NSCSubject;
  mark: number;             // 0–100
  level?: number;           // 1–7 (derived from mark)
  year: number;             // year achieved (may differ for repeats)
}

export type NSCSubject =
  // Home Languages
  | 'afrikaans_home'
  | 'english_home'
  | 'zulu_home'
  | 'xhosa_home'
  | 'sotho_home'
  | 'tswana_home'
  | 'pedi_home'
  | 'venda_home'
  | 'tsonga_home'
  | 'swati_home'
  | 'ndebele_home'
  // First Additional Languages
  | 'afrikaans_fal'
  | 'english_fal'
  | 'zulu_fal'
  | 'xhosa_fal'
  // Core subjects
  | 'mathematics'
  | 'mathematical_literacy'
  | 'technical_mathematics'
  | 'life_orientation'
  // Sciences
  | 'physical_sciences'
  | 'life_sciences'
  | 'agricultural_sciences'
  // Business & Economics
  | 'accounting'
  | 'business_studies'
  | 'economics'
  // Humanities
  | 'history'
  | 'geography'
  | 'religion_studies'
  // Technical
  | 'information_technology'
  | 'computer_applications_technology'
  | 'engineering_graphics_design'
  | 'electrical_technology'
  | 'mechanical_technology'
  | 'civil_technology'
  // Arts
  | 'visual_arts'
  | 'music'
  | 'dramatic_arts'
  // Other
  | 'tourism'
  | 'consumer_studies'
  | 'hospitality_studies';
