// packages/shared/src/constants/universities/univen.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const UNIVEN: University = buildPlaceholderUniversity({
  id: 'univen',
  name: 'University of Venda',
  shortName: 'UNIVEN',
  fee: 150,
  type: 'traditional',
  logo: '/logos/univen.png',
});
