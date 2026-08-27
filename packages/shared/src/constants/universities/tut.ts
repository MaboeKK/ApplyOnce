// packages/shared/src/constants/universities/tut.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const TUT: University = buildPlaceholderUniversity({
  id: 'tut',
  name: 'Tshwane University of Technology',
  shortName: 'TUT',
  fee: 240,
  type: 'university_of_technology',
  logo: '/logos/tut.png',
});
