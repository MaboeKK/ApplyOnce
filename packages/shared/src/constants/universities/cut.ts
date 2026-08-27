// packages/shared/src/constants/universities/cut.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const CUT: University = buildPlaceholderUniversity({
  id: 'cut',
  name: 'Central University of Technology',
  shortName: 'CUT',
  fee: 180,
  type: 'university_of_technology',
  logo: '/logos/cut.png',
});
