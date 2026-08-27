// packages/shared/src/constants/universities/nwu.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const NWU: University = buildPlaceholderUniversity({
  id: 'nwu',
  name: 'North-West University',
  shortName: 'NWU',
  fee: 150,
  type: 'traditional',
  logo: '/logos/nwu.png',
});
