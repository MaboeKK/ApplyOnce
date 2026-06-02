// src/constants/universities.ts
// Mock data for all 26 South African public universities
// Real application fees and dates approximated from public information
// Programmes are illustrative — real integration will pull live data per MOU

import { University } from '../types/university';

export const UNIVERSITIES: University[] = [
  // ─── TRADITIONAL UNIVERSITIES ───────────────────────────────────────────
  {
    id: 'uct',
    name: 'University of Cape Town',
    abbreviation: 'UCT',
    type: 'traditional',
    city: 'Cape Town',
    province: 'western_cape',
    website: 'https://www.uct.ac.za',
    applicationPortal: 'https://www.uct.ac.za/apply',
    applicationFeeZAR: 100,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'uct-commerce', name: 'Commerce', programmes: [
          { id: 'uct-bcom', name: 'Bachelor of Commerce', qualification: 'bachelor', duration: 3, apsMinimum: 36, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 50 }] },
          { id: 'uct-bba', name: 'Bachelor of Business Administration', qualification: 'bachelor', duration: 3, apsMinimum: 34, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 50 }] },
        ]
      },
      {
        id: 'uct-engineering', name: 'Engineering & Built Environment', programmes: [
          { id: 'uct-bsc-eng', name: 'BSc Engineering', qualification: 'bachelor', duration: 4, apsMinimum: 42, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 70 }, { subject: 'physical_sciences', minimumMark: 60 }] },
        ]
      },
      {
        id: 'uct-humanities', name: 'Humanities', programmes: [
          { id: 'uct-ba', name: 'Bachelor of Arts', qualification: 'bachelor', duration: 3, apsMinimum: 33, apsWithLO: false, subjectRequirements: [] },
        ]
      },
      {
        id: 'uct-science', name: 'Science', programmes: [
          { id: 'uct-bsc', name: 'Bachelor of Science', qualification: 'bachelor', duration: 3, apsMinimum: 36, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 60 }, { subject: 'physical_sciences', minimumMark: 50 }] },
        ]
      },
      {
        id: 'uct-health', name: 'Health Sciences', programmes: [
          { id: 'uct-mbchb', name: 'MBChB (Medicine)', qualification: 'bachelor', duration: 6, apsMinimum: 42, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 70 }, { subject: 'physical_sciences', minimumMark: 70 }, { subject: 'life_sciences', minimumMark: 70 }] },
        ]
      },
    ],
  },
  {
    id: 'wits',
    name: 'University of the Witwatersrand',
    abbreviation: 'Wits',
    type: 'traditional',
    city: 'Johannesburg',
    province: 'gauteng',
    website: 'https://www.wits.ac.za',
    applicationPortal: 'https://www.wits.ac.za/apply-online',
    applicationFeeZAR: 100,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'wits-engineering', name: 'Engineering & Built Environment', programmes: [
          { id: 'wits-bsc-eng', name: 'BSc Engineering', qualification: 'bachelor', duration: 4, apsMinimum: 42, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 70 }, { subject: 'physical_sciences', minimumMark: 60 }] },
        ]
      },
      {
        id: 'wits-commerce', name: 'Commerce, Law & Management', programmes: [
          { id: 'wits-bcom', name: 'Bachelor of Commerce', qualification: 'bachelor', duration: 3, apsMinimum: 35, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 50 }] },
        ]
      },
      {
        id: 'wits-science', name: 'Science', programmes: [
          { id: 'wits-bsc', name: 'Bachelor of Science', qualification: 'bachelor', duration: 3, apsMinimum: 35, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 60 }] },
        ]
      },
    ],
  },
  {
    id: 'up',
    name: 'University of Pretoria',
    abbreviation: 'UP',
    type: 'traditional',
    city: 'Pretoria',
    province: 'gauteng',
    website: 'https://www.up.ac.za',
    applicationPortal: 'https://www.up.ac.za/apply',
    applicationFeeZAR: 300,
    applicationOpenDate: '04-01',
    applicationCloseDate: '06-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'up-engineering', name: 'Engineering, Built Environment & IT', programmes: [
          { id: 'up-beng', name: 'BEng (Engineering)', qualification: 'bachelor', duration: 4, apsMinimum: 30, apsWithLO: true, subjectRequirements: [{ subject: 'mathematics', minimumMark: 70 }, { subject: 'physical_sciences', minimumMark: 60 }] },
        ]
      },
      {
        id: 'up-econ', name: 'Economic & Management Sciences', programmes: [
          { id: 'up-bcom', name: 'BCom', qualification: 'bachelor', duration: 3, apsMinimum: 28, apsWithLO: true, subjectRequirements: [{ subject: 'mathematics', minimumMark: 50 }] },
        ]
      },
      {
        id: 'up-humanities', name: 'Humanities', programmes: [
          { id: 'up-ba', name: 'BA', qualification: 'bachelor', duration: 3, apsMinimum: 24, apsWithLO: true, subjectRequirements: [] },
        ]
      },
      {
        id: 'up-health', name: 'Health Sciences', programmes: [
          { id: 'up-mbchb', name: 'MBChB (Medicine)', qualification: 'bachelor', duration: 6, apsMinimum: 34, apsWithLO: true, subjectRequirements: [{ subject: 'mathematics', minimumMark: 60 }, { subject: 'physical_sciences', minimumMark: 60 }, { subject: 'life_sciences', minimumMark: 60 }] },
        ]
      },
    ],
  },
  {
    id: 'su',
    name: 'Stellenbosch University',
    abbreviation: 'SU',
    type: 'traditional',
    city: 'Stellenbosch',
    province: 'western_cape',
    website: 'https://www.sun.ac.za',
    applicationPortal: 'https://www.maties.com/application',
    applicationFeeZAR: 100,
    applicationOpenDate: '04-01',
    applicationCloseDate: '06-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'su-engineering', name: 'Engineering', programmes: [
          { id: 'su-beng', name: 'BEng', qualification: 'bachelor', duration: 4, apsMinimum: 36, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 70 }, { subject: 'physical_sciences', minimumMark: 60 }] },
        ]
      },
      {
        id: 'su-econ', name: 'Economic & Management Sciences', programmes: [
          { id: 'su-bcomm', name: 'BComm', qualification: 'bachelor', duration: 3, apsMinimum: 34, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 50 }] },
        ]
      },
    ],
  },
  {
    id: 'uj',
    name: 'University of Johannesburg',
    abbreviation: 'UJ',
    type: 'comprehensive',
    city: 'Johannesburg',
    province: 'gauteng',
    website: 'https://www.uj.ac.za',
    applicationPortal: 'https://www.uj.ac.za/apply',
    applicationFeeZAR: 200,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'uj-engineering', name: 'Engineering & Built Environment', programmes: [
          { id: 'uj-beng', name: 'BEng', qualification: 'bachelor', duration: 4, apsMinimum: 30, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 60 }] },
          { id: 'uj-ndip-eng', name: 'ND: Engineering', qualification: 'diploma', duration: 3, apsMinimum: 22, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 40 }] },
        ]
      },
      {
        id: 'uj-commerce', name: 'Management', programmes: [
          { id: 'uj-bcom', name: 'BCom', qualification: 'bachelor', duration: 3, apsMinimum: 28, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 50 }] },
        ]
      },
      {
        id: 'uj-humanities', name: 'Humanities', programmes: [
          { id: 'uj-ba', name: 'BA', qualification: 'bachelor', duration: 3, apsMinimum: 24, apsWithLO: false, subjectRequirements: [] },
        ]
      },
    ],
  },
  {
    id: 'ukzn',
    name: 'University of KwaZulu-Natal',
    abbreviation: 'UKZN',
    type: 'traditional',
    city: 'Durban',
    province: 'kwazulu_natal',
    website: 'https://www.ukzn.ac.za',
    applicationPortal: 'https://cao.ac.za',
    applicationFeeZAR: 270,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'ukzn-engineering', name: 'Engineering', programmes: [
          { id: 'ukzn-bsceng', name: 'BSc Engineering', qualification: 'bachelor', duration: 4, apsMinimum: 30, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 60 }, { subject: 'physical_sciences', minimumMark: 50 }] },
        ]
      },
      {
        id: 'ukzn-management', name: 'Management Studies', programmes: [
          { id: 'ukzn-bcom', name: 'BCom', qualification: 'bachelor', duration: 3, apsMinimum: 28, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 50 }] },
        ]
      },
    ],
  },
  {
    id: 'ufs',
    name: 'University of the Free State',
    abbreviation: 'UFS',
    type: 'traditional',
    city: 'Bloemfontein',
    province: 'free_state',
    website: 'https://www.ufs.ac.za',
    applicationPortal: 'https://www.ufs.ac.za/apply',
    applicationFeeZAR: 150,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'ufs-econ', name: 'Economic & Management Sciences', programmes: [
          { id: 'ufs-bcom', name: 'BCom', qualification: 'bachelor', duration: 3, apsMinimum: 26, apsWithLO: true, subjectRequirements: [{ subject: 'mathematics', minimumMark: 50 }] },
        ]
      },
      {
        id: 'ufs-humanities', name: 'Humanities', programmes: [
          { id: 'ufs-ba', name: 'BA', qualification: 'bachelor', duration: 3, apsMinimum: 22, apsWithLO: true, subjectRequirements: [] },
        ]
      },
      {
        id: 'ufs-health', name: 'Health Sciences', programmes: [
          { id: 'ufs-mbchb', name: 'MBChB', qualification: 'bachelor', duration: 6, apsMinimum: 34, apsWithLO: true, subjectRequirements: [{ subject: 'mathematics', minimumMark: 60 }, { subject: 'physical_sciences', minimumMark: 60 }, { subject: 'life_sciences', minimumMark: 60 }] },
        ]
      },
    ],
  },
  {
    id: 'nwu',
    name: 'North-West University',
    abbreviation: 'NWU',
    type: 'traditional',
    city: 'Potchefstroom',
    province: 'north_west',
    website: 'https://www.nwu.ac.za',
    applicationPortal: 'https://www.nwu.ac.za/apply',
    applicationFeeZAR: 150,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'nwu-engineering', name: 'Engineering', programmes: [
          { id: 'nwu-beng', name: 'BEng', qualification: 'bachelor', duration: 4, apsMinimum: 30, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 60 }] },
        ]
      },
      {
        id: 'nwu-econ', name: 'Economic & Management Sciences', programmes: [
          { id: 'nwu-bcom', name: 'BCom', qualification: 'bachelor', duration: 3, apsMinimum: 26, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 50 }] },
        ]
      },
    ],
  },
  {
    id: 'nmu',
    name: 'Nelson Mandela University',
    abbreviation: 'NMU',
    type: 'comprehensive',
    city: 'Gqeberha',
    province: 'eastern_cape',
    website: 'https://www.mandela.ac.za',
    applicationPortal: 'https://www.mandela.ac.za/apply',
    applicationFeeZAR: 200,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'nmu-engineering', name: 'Engineering, Built Environment & IT', programmes: [
          { id: 'nmu-beng', name: 'BEng', qualification: 'bachelor', duration: 4, apsMinimum: 29, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 60 }] },
        ]
      },
      {
        id: 'nmu-business', name: 'Business & Economic Sciences', programmes: [
          { id: 'nmu-bcom', name: 'BCom', qualification: 'bachelor', duration: 3, apsMinimum: 26, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 50 }] },
        ]
      },
    ],
  },
  {
    id: 'uwc',
    name: 'University of the Western Cape',
    abbreviation: 'UWC',
    type: 'traditional',
    city: 'Bellville',
    province: 'western_cape',
    website: 'https://www.uwc.ac.za',
    applicationPortal: 'https://www.uwc.ac.za/apply',
    applicationFeeZAR: 100,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'uwc-econ', name: 'Economic & Management Sciences', programmes: [
          { id: 'uwc-bcom', name: 'BCom', qualification: 'bachelor', duration: 3, apsMinimum: 25, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 50 }] },
        ]
      },
      {
        id: 'uwc-science', name: 'Natural Sciences', programmes: [
          { id: 'uwc-bsc', name: 'BSc', qualification: 'bachelor', duration: 3, apsMinimum: 27, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 50 }] },
        ]
      },
    ],
  },
  {
    id: 'rhodes',
    name: 'Rhodes University',
    abbreviation: 'Rhodes',
    type: 'traditional',
    city: 'Makhanda',
    province: 'eastern_cape',
    website: 'https://www.ru.ac.za',
    applicationPortal: 'https://www.ru.ac.za/apply',
    applicationFeeZAR: 100,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'rhodes-commerce', name: 'Commerce', programmes: [
          { id: 'rhodes-bcom', name: 'BCom', qualification: 'bachelor', duration: 3, apsMinimum: 30, apsWithLO: false, subjectRequirements: [{ subject: 'mathematics', minimumMark: 50 }] },
        ]
      },
      {
        id: 'rhodes-humanities', name: 'Humanities', programmes: [
          { id: 'rhodes-ba', name: 'BA', qualification: 'bachelor', duration: 3, apsMinimum: 28, apsWithLO: false, subjectRequirements: [] },
        ]
      },
    ],
  },
  {
    id: 'unisa',
    name: 'University of South Africa',
    abbreviation: 'UNISA',
    type: 'traditional',
    city: 'Pretoria',
    province: 'gauteng',
    website: 'https://www.unisa.ac.za',
    applicationPortal: 'https://my.unisa.ac.za/portal',
    applicationFeeZAR: 115,
    applicationOpenDate: '08-01',
    applicationCloseDate: '10-31',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'unisa-econ', name: 'Economic & Management Sciences', programmes: [
          { id: 'unisa-bcom', name: 'BCom', qualification: 'bachelor', duration: 3, apsMinimum: 23, apsWithLO: true, subjectRequirements: [] },
        ]
      },
    ],
  },
  // ─── UNIVERSITIES OF TECHNOLOGY ─────────────────────────────────────────
  {
    id: 'tut',
    name: 'Tshwane University of Technology',
    abbreviation: 'TUT',
    type: 'university_of_technology',
    city: 'Pretoria',
    province: 'gauteng',
    website: 'https://www.tut.ac.za',
    applicationPortal: 'https://www.tut.ac.za/apply',
    applicationFeeZAR: 240,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'tut-engineering', name: 'Engineering & Built Environment', programmes: [
          { id: 'tut-ndip-eng', name: 'ND: Engineering (Electrical)', qualification: 'diploma', duration: 3, apsMinimum: 20, apsWithLO: true, subjectRequirements: [{ subject: 'mathematics', minimumMark: 40 }] },
          { id: 'tut-btech-eng', name: 'BTech: Engineering', qualification: 'btech', duration: 4, apsMinimum: 24, apsWithLO: true, subjectRequirements: [{ subject: 'mathematics', minimumMark: 50 }] },
        ]
      },
      {
        id: 'tut-ict', name: 'ICT', programmes: [
          { id: 'tut-ndip-it', name: 'ND: Information Technology', qualification: 'diploma', duration: 3, apsMinimum: 20, apsWithLO: true, subjectRequirements: [] },
        ]
      },
    ],
  },
  {
    id: 'dut',
    name: 'Durban University of Technology',
    abbreviation: 'DUT',
    type: 'university_of_technology',
    city: 'Durban',
    province: 'kwazulu_natal',
    website: 'https://www.dut.ac.za',
    applicationPortal: 'https://cao.ac.za',
    applicationFeeZAR: 270,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'dut-engineering', name: 'Engineering & Built Environment', programmes: [
          { id: 'dut-ndip-eng', name: 'ND: Engineering', qualification: 'diploma', duration: 3, apsMinimum: 20, apsWithLO: true, subjectRequirements: [{ subject: 'mathematics', minimumMark: 40 }] },
        ]
      },
      {
        id: 'dut-commerce', name: 'Management Sciences', programmes: [
          { id: 'dut-ndip-mgt', name: 'ND: Management', qualification: 'diploma', duration: 3, apsMinimum: 18, apsWithLO: true, subjectRequirements: [] },
        ]
      },
    ],
  },
  {
    id: 'cput',
    name: 'Cape Peninsula University of Technology',
    abbreviation: 'CPUT',
    type: 'university_of_technology',
    city: 'Cape Town',
    province: 'western_cape',
    website: 'https://www.cput.ac.za',
    applicationPortal: 'https://www.cput.ac.za/apply',
    applicationFeeZAR: 100,
    applicationOpenDate: '04-01',
    applicationCloseDate: '07-31',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'cput-engineering', name: 'Engineering & Built Environment', programmes: [
          { id: 'cput-ndip-eng', name: 'Diploma: Engineering', qualification: 'diploma', duration: 3, apsMinimum: 20, apsWithLO: true, subjectRequirements: [{ subject: 'mathematics', minimumMark: 40 }] },
        ]
      },
    ],
  },
  {
    id: 'vut',
    name: 'Vaal University of Technology',
    abbreviation: 'VUT',
    type: 'university_of_technology',
    city: 'Vanderbijlpark',
    province: 'gauteng',
    website: 'https://www.vut.ac.za',
    applicationPortal: 'https://www.vut.ac.za/apply',
    applicationFeeZAR: 200,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'vut-engineering', name: 'Engineering & Technology', programmes: [
          { id: 'vut-ndip-eng', name: 'Diploma: Engineering', qualification: 'diploma', duration: 3, apsMinimum: 18, apsWithLO: true, subjectRequirements: [{ subject: 'mathematics', minimumMark: 40 }] },
        ]
      },
    ],
  },
  {
    id: 'cut',
    name: 'Central University of Technology',
    abbreviation: 'CUT',
    type: 'university_of_technology',
    city: 'Bloemfontein',
    province: 'free_state',
    website: 'https://www.cut.ac.za',
    applicationPortal: 'https://www.cut.ac.za/apply',
    applicationFeeZAR: 180,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'cut-engineering', name: 'Engineering & Information Technology', programmes: [
          { id: 'cut-ndip-eng', name: 'Diploma: Engineering', qualification: 'diploma', duration: 3, apsMinimum: 18, apsWithLO: true, subjectRequirements: [{ subject: 'mathematics', minimumMark: 40 }] },
        ]
      },
    ],
  },
  {
    id: 'mut',
    name: 'Mangosuthu University of Technology',
    abbreviation: 'MUT',
    type: 'university_of_technology',
    city: 'Umlazi',
    province: 'kwazulu_natal',
    website: 'https://www.mut.ac.za',
    applicationPortal: 'https://cao.ac.za',
    applicationFeeZAR: 270,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'mut-engineering', name: 'Engineering', programmes: [
          { id: 'mut-ndip-eng', name: 'Diploma: Engineering', qualification: 'diploma', duration: 3, apsMinimum: 18, apsWithLO: true, subjectRequirements: [{ subject: 'mathematics', minimumMark: 40 }] },
        ]
      },
    ],
  },
  // ─── HISTORICALLY DISADVANTAGED UNIVERSITIES ────────────────────────────
  {
    id: 'unizulu',
    name: 'University of Zululand',
    abbreviation: 'UniZulu',
    type: 'traditional',
    city: 'Richards Bay',
    province: 'kwazulu_natal',
    website: 'https://www.unizulu.ac.za',
    applicationPortal: 'https://www.unizulu.ac.za/apply',
    applicationFeeZAR: 150,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'unizulu-commerce', name: 'Commerce, Administration & Law', programmes: [
          { id: 'unizulu-bcom', name: 'BCom', qualification: 'bachelor', duration: 3, apsMinimum: 20, apsWithLO: true, subjectRequirements: [] },
        ]
      },
    ],
  },
  {
    id: 'ufh',
    name: 'University of Fort Hare',
    abbreviation: 'UFH',
    type: 'traditional',
    city: 'Alice',
    province: 'eastern_cape',
    website: 'https://www.ufh.ac.za',
    applicationPortal: 'https://www.ufh.ac.za/apply',
    applicationFeeZAR: 150,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'ufh-management', name: 'Management & Commerce', programmes: [
          { id: 'ufh-bcom', name: 'BCom', qualification: 'bachelor', duration: 3, apsMinimum: 20, apsWithLO: true, subjectRequirements: [] },
        ]
      },
    ],
  },
  {
    id: 'wsu',
    name: 'Walter Sisulu University',
    abbreviation: 'WSU',
    type: 'comprehensive',
    city: 'Mthatha',
    province: 'eastern_cape',
    website: 'https://www.wsu.ac.za',
    applicationPortal: 'https://www.wsu.ac.za/apply',
    applicationFeeZAR: 150,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'wsu-commerce', name: 'Business, Management Sciences & Law', programmes: [
          { id: 'wsu-bcom', name: 'BCom', qualification: 'bachelor', duration: 3, apsMinimum: 20, apsWithLO: true, subjectRequirements: [] },
        ]
      },
    ],
  },
  {
    id: 'smu',
    name: 'Sefako Makgatho Health Sciences University',
    abbreviation: 'SMU',
    type: 'traditional',
    city: 'Ga-Rankuwa',
    province: 'gauteng',
    website: 'https://www.smu.ac.za',
    applicationPortal: 'https://www.smu.ac.za/apply',
    applicationFeeZAR: 200,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'smu-health', name: 'Health Sciences', programmes: [
          { id: 'smu-mbchb', name: 'MBChB', qualification: 'bachelor', duration: 6, apsMinimum: 30, apsWithLO: true, subjectRequirements: [{ subject: 'mathematics', minimumMark: 60 }, { subject: 'physical_sciences', minimumMark: 60 }, { subject: 'life_sciences', minimumMark: 60 }] },
        ]
      },
    ],
  },
  {
    id: 'spu',
    name: 'Sol Plaatje University',
    abbreviation: 'SPU',
    type: 'traditional',
    city: 'Kimberley',
    province: 'northern_cape',
    website: 'https://www.spu.ac.za',
    applicationPortal: 'https://www.spu.ac.za/apply',
    applicationFeeZAR: 100,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'spu-humanities', name: 'Humanities', programmes: [
          { id: 'spu-ba', name: 'BA', qualification: 'bachelor', duration: 3, apsMinimum: 20, apsWithLO: true, subjectRequirements: [] },
        ]
      },
    ],
  },
  {
    id: 'mu',
    name: 'University of Mpumalanga',
    abbreviation: 'UMP',
    type: 'traditional',
    city: 'Mbombela',
    province: 'mpumalanga',
    website: 'https://www.ump.ac.za',
    applicationPortal: 'https://www.ump.ac.za/apply',
    applicationFeeZAR: 100,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'ump-agriculture', name: 'Agriculture & Natural Sciences', programmes: [
          { id: 'ump-bsc-agri', name: 'BSc Agriculture', qualification: 'bachelor', duration: 4, apsMinimum: 20, apsWithLO: true, subjectRequirements: [] },
        ]
      },
    ],
  },
  {
    id: 'ul',
    name: 'University of Limpopo',
    abbreviation: 'UL',
    type: 'traditional',
    city: 'Mankweng',
    province: 'limpopo',
    website: 'https://www.ul.ac.za',
    applicationPortal: 'https://www.ul.ac.za/apply',
    applicationFeeZAR: 200,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'ul-health', name: 'Health Sciences', programmes: [
          { id: 'ul-mbchb', name: 'MBChB', qualification: 'bachelor', duration: 6, apsMinimum: 28, apsWithLO: true, subjectRequirements: [{ subject: 'mathematics', minimumMark: 60 }, { subject: 'life_sciences', minimumMark: 60 }] },
        ]
      },
      {
        id: 'ul-commerce', name: 'Management & Law', programmes: [
          { id: 'ul-bcom', name: 'BCom', qualification: 'bachelor', duration: 3, apsMinimum: 22, apsWithLO: true, subjectRequirements: [] },
        ]
      },
    ],
  },
  {
    id: 'univen',
    name: 'University of Venda',
    abbreviation: 'UNIVEN',
    type: 'traditional',
    city: 'Thohoyandou',
    province: 'limpopo',
    website: 'https://www.univen.ac.za',
    applicationPortal: 'https://www.univen.ac.za/apply',
    applicationFeeZAR: 150,
    applicationOpenDate: '04-01',
    applicationCloseDate: '09-30',
    isIntegrated: false,
    integrationStatus: 'mock',
    faculties: [
      {
        id: 'univen-management', name: 'Management, Commerce & Law', programmes: [
          { id: 'univen-bcom', name: 'BCom', qualification: 'bachelor', duration: 3, apsMinimum: 20, apsWithLO: true, subjectRequirements: [] },
        ]
      },
    ],
  },
];

// Utility exports
export const UNIVERSITY_COUNT = UNIVERSITIES.length; // Should be 26
export const getUniversityById = (id: string) => UNIVERSITIES.find(u => u.id === id);
export const getIntegratedUniversities = () => UNIVERSITIES.filter(u => u.isIntegrated);
export const getMockUniversities = () => UNIVERSITIES.filter(u => u.integrationStatus === 'mock');

export const SERVICE_FEE_ZAR = 5; // ApplyOnce fee per application
