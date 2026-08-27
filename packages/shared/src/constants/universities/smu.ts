// packages/shared/src/constants/universities/smu.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const SMU: University = buildPlaceholderUniversity({
  id: 'smu',
  name: 'Sefako Makgatho Health Sciences University',
  shortName: 'SMU',
  fee: 200,
  type: 'traditional',
  logo: '/logos/smu.png',
});
