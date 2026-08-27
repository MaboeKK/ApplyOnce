// packages/shared/src/constants/universities/uwc.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const UWC: University = buildPlaceholderUniversity({
  id: 'uwc',
  name: 'University of the Western Cape',
  shortName: 'UWC',
  fee: 100,
  type: 'traditional',
  logo: '/logos/uwc.png',
});
