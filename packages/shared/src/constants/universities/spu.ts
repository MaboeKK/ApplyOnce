// packages/shared/src/constants/universities/spu.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const SPU: University = buildPlaceholderUniversity({
  id: 'spu',
  name: 'Sol Plaatje University',
  shortName: 'SPU',
  fee: 100,
  type: 'traditional',
  logo: '/logos/spu.png',
});
