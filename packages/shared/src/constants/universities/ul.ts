// packages/shared/src/constants/universities/ul.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const UL: University = buildPlaceholderUniversity({
  id: 'ul',
  name: 'University of Limpopo',
  shortName: 'UL',
  fee: 200,
  type: 'traditional',
  logo: '/logos/ul.png',
});
