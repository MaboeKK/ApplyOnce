// packages/shared/src/constants/universities/unisa.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const UNISA: University = buildPlaceholderUniversity({
  id: 'unisa',
  name: 'University of South Africa',
  shortName: 'UNISA',
  fee: 115,
  type: 'traditional',
  logo: '/logos/unisa.png',
});
