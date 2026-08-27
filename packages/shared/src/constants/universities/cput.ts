// packages/shared/src/constants/universities/cput.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const CPUT: University = buildPlaceholderUniversity({
  id: 'cput',
  name: 'Cape Peninsula University of Technology',
  shortName: 'CPUT',
  fee: 100,
  type: 'university_of_technology',
  logo: '/logos/cput.png',
});
