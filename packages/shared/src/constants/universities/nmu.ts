// packages/shared/src/constants/universities/nmu.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const NMU: University = buildPlaceholderUniversity({
  id: 'nmu',
  name: 'Nelson Mandela University',
  shortName: 'NMU',
  fee: 200,
  type: 'comprehensive',
  logo: '/logos/nmu.png',
});
