// packages/shared/src/constants/universities/index.ts
// University and Programme data for all 26 South African public universities
// UJ and Wits are fully detailed reference implementations
// Other universities are placeholders pending prospectus data

import { University } from '../../types/university';
import { UJ } from './uj';
import { WITS } from './wits';
import { UCT } from './uct';
import { UP } from './up';
import { SU } from './su';
import { UFS } from './ufs';
import { UKZN } from './ukzn';
import { NWU } from './nwu';
import { NMU } from './nmu';
import { UWC } from './uwc';
import { RHODES } from './rhodes';
import { UNISA } from './unisa';
import { TUT } from './tut';
import { DUT } from './dut';
import { CPUT } from './cput';
import { VUT } from './vut';
import { CUT } from './cut';
import { MUT } from './mut';
import { UNIZULU } from './unizulu';
import { UFH } from './ufh';
import { WSU } from './wsu';
import { SMU } from './smu';
import { SPU } from './spu';
import { UMP } from './ump';
import { UL } from './ul';
import { UNIVEN } from './univen';

export const UNIVERSITIES: University[] = [
  UJ,
  WITS,
  UCT,
  UP,
  SU,
  UFS,
  UKZN,
  NWU,
  NMU,
  UWC,
  RHODES,
  UNISA,
  TUT,
  DUT,
  CPUT,
  VUT,
  CUT,
  MUT,
  UNIZULU,
  UFH,
  WSU,
  SMU,
  SPU,
  UMP,
  UL,
  UNIVEN,
];

export const UNIVERSITY_COUNT = UNIVERSITIES.length; // Should be 26
export const getUniversityById = (id: string) => UNIVERSITIES.find((u) => u.id === id);

export const SERVICE_FEE_ZAR = 5; // ApplyOnce fee per application
