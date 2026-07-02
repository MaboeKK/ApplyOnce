// @applyonce/shared — single import surface for all packages
// Usage in api/portal/admin:  import { calculateAPS, UNIVERSITIES } from '@applyonce/shared';

export * from './types/student';
export * from './types/university';
export * from './types/application';
export * from './services/aps-calculator';
export * from './constants/universities';
export * from './api/universities';
export * from './api/universities/mock-adapter';
export * from './api/payments/mock-paygate';
export * from './utils/subject-mapping';
