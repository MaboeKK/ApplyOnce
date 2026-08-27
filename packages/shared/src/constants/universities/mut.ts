// packages/shared/src/constants/universities/mut.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const MUT: University = buildPlaceholderUniversity({
  id: 'mut',
  name: 'Mangosuthu University of Technology',
  shortName: 'MUT',
  fee: 270,
  type: 'university_of_technology',
  logo: '/logos/mut.png',
});
