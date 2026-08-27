// packages/shared/src/constants/universities/vut.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const VUT: University = buildPlaceholderUniversity({
  id: 'vut',
  name: 'Vaal University of Technology',
  shortName: 'VUT',
  fee: 200,
  type: 'university_of_technology',
  logo: '/logos/vut.png',
});
