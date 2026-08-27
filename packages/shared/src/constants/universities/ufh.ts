// packages/shared/src/constants/universities/ufh.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const UFH: University = buildPlaceholderUniversity({
  id: 'ufh',
  name: 'University of Fort Hare',
  shortName: 'UFH',
  fee: 150,
  type: 'traditional',
  logo: '/logos/ufh.png',
});
