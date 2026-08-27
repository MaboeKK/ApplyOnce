// packages/shared/src/constants/universities/dut.ts
import { University } from '../../types/university';
import { buildPlaceholderUniversity } from './placeholder-template';

export const DUT: University = buildPlaceholderUniversity({
  id: 'dut',
  name: 'Durban University of Technology',
  shortName: 'DUT',
  fee: 270,
  type: 'university_of_technology',
  logo: '/logos/dut.png',
});
