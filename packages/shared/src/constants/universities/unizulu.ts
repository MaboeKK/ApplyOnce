// packages/shared/src/constants/universities/unizulu.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const UNIZULU: University = buildPlaceholderUniversity({
  id: 'unizulu',
  name: 'University of Zululand',
  shortName: 'UniZulu',
  fee: 150,
  type: 'traditional',
  logo: '/logos/unizulu.png',
});
