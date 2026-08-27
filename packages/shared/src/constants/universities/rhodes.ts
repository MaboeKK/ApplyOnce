// packages/shared/src/constants/universities/rhodes.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const RHODES: University = buildPlaceholderUniversity({
  id: 'rhodes',
  name: 'Rhodes University',
  shortName: 'Rhodes',
  fee: 100,
  type: 'traditional',
  logo: '/logos/rhodes.png',
});
