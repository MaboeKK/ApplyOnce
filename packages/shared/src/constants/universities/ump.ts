// packages/shared/src/constants/universities/ump.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const UMP: University = buildPlaceholderUniversity({
  id: 'ump',
  name: 'University of Mpumalanga',
  shortName: 'UMP',
  fee: 100,
  type: 'traditional',
  logo: '/logos/ump.png',
});
