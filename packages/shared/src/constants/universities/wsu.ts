// packages/shared/src/constants/universities/wsu.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const WSU: University = buildPlaceholderUniversity({
  id: 'wsu',
  name: 'Walter Sisulu University',
  shortName: 'WSU',
  fee: 150,
  type: 'comprehensive',
  logo: '/logos/wsu.png',
});
