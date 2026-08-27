// packages/shared/src/constants/universities/up.ts
import { University, Programme } from '../../types/university';

// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSITY OF PRETORIA (UP) — full reference implementation
// ═══════════════════════════════════════════════════════════════════════════
// UP uses the same standard NSC 1-7 achievement-level scale as UJ/Wits (6 best
// 20-credit subjects, Life Orientation excluded, max APS 42) — no schema
// changes were needed. Where the prospectus described a two-stage
// Grade-11-conditional / Grade-12-final admission, only the FINAL (lower,
// confirmed) APS number is encoded, since ApplyOnce serves applicants who
// already hold their final NSC results (see CLAUDE.md scope decision).
// Application fee: not stated anywhere in the sourced 2027 prospectus text —
// left at 0 with a note rather than carrying over an unconfirmed guess.
// Source: docs/prospectuses/up/ (UP 2027 Undergraduate Prospectus).

// University of Pretoria (UP) — Programme data extracted from the
// Undergraduate Prospectus 2027 (Applicants with NSC/IEB Certificate).
//
// APS scale: standard nsc_7point, 6 best 20-credit subjects, Life Orientation
// excluded, max APS = 42 (identical model to UJ/Wits — no schema changes needed).
//
// IMPORTANT: Per locked scope rule, wherever the prospectus describes a
// two-stage "conditional on Grade 11 / final on Grade 12" admission (e.g.
// "conditional APS 30 on Grade 11, final admission confirmed with APS 28"),
// ONLY the FINAL/confirmed (lower) number is encoded here as apsMinimum.default,
// since ApplyOnce serves applicants who already hold their final NSC results.
//
// qualificationCode values are SYNTHESISED (pattern UP-<FACULTY-ABBR>-<SLUG>) —
// UP's prospectus does not publish short official codes in this text. Not official.
//
// Application fee: NOT FOUND anywhere in this prospectus text. Left unconfirmed —
// do not invent a number (see report).
//
// maxChoices: UP's own online form allows first + second choice, but ApplyOnce
// restricts every student to ONE programme per university (locked product rule).
// That is set on the University object (handled separately, not here).

// ─── FACULTY OF ECONOMIC AND MANAGEMENT SCIENCES ───────────────────────────
// Table column order in the prospectus: English (Home/FAL) | Mathematics | APS

export const UP_EMS_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UP-EMS-BADMIN-PAIR',
    universityId: 'up',
    name: 'Bachelor of Administration specialising in Public Administration and International Relations',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'alternative', minRating: 3, altGroup: 'maths' },
        { subject: 'mathematicalLiteracy', status: 'alternative', minRating: 4, altGroup: 'maths' },
      ],
    },
    careers: [
      'Diplomat',
      'Political analyst',
      'Public sector manager',
      'Local government official',
      'NGO/international organisation staff',
    ],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-ACC',
    universityId: 'up',
    name: 'Bachelor of Commerce in Accounting Sciences',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
    careers: [
      'Chartered accountant (CA) track',
      'External auditor',
      'Government auditor',
      'Tax professional',
      'Financial director',
    ],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-INVMAN',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Investment Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
    careers: ['Portfolio/fund manager', 'Investment analyst', 'Risk manager', 'Wealth manager'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-FINMAN',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Financial Management Sciences',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
    careers: [
      'Financial reporting specialist',
      'Management accountant',
      'Tax advisor',
      'Internal auditor',
    ],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-ECONOMETRICS',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Econometrics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
    careers: ['Econometrician', 'Financial/economic analyst', 'Researcher'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-ECON',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Economics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
    careers: ['Economist', 'Banking analyst', 'Policy researcher'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-LAW',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Law',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
    careers: ['Attorney track', 'Legal advisor', 'Advocate track'],
    note: 'Also listed in the Faculty of Law brochure with the same requirements — modelled once here to avoid a duplicate qualificationCode.',
  },
  {
    qualificationCode: 'UP-EMS-BCOM-STATS',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Statistics and Data Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
    careers: ['Data scientist', 'Statistical analyst', 'Researcher'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-INFOSYS',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Information Systems',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
    careers: ['IT manager', 'Systems analyst', 'Business analyst', 'IT auditor'],
    note: 'Administered jointly with the School of Information Technology (Faculty of EBIT) — same programme, same requirements.',
  },
  {
    qualificationCode: 'UP-EMS-BCOM-AGRIBUS',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Agribusiness Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
    careers: ['Agribusiness manager', 'Commodity trader', 'Policy advisor'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-BUSMAN',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Business Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
    careers: ['General manager', 'Management consultant', 'HR/marketing/finance roles'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-SCM',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Supply Chain Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Supply chain manager', 'Logistics manager', 'Procurement specialist'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-MARKETING',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Marketing Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Product manager', 'Brand manager', 'Marketing researcher'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-HR',
    universityId: 'up',
    name: 'Bachelor of Commerce specialising in Human Resource Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
    careers: ['HR practitioner', 'HR consultant', 'Labour relations specialist'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-GEN3',
    universityId: 'up',
    name: 'Bachelor of Commerce',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
      note: 'Accounting at school is not a subject requirement for any of the Bachelor of Commerce or Bachelor of Administration programmes.',
    },
    careers: ['Flexible commerce career paths across sectors'],
  },
  {
    qualificationCode: 'UP-EMS-BCOM-GEN4',
    universityId: 'up',
    name: 'Bachelor of Commerce (4-year, extended)',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Economic and Management Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 3 },
      ],
      note: 'This is a selection programme — additional selection criteria apply and are communicated by the Faculty.',
    },
    careers: ['Flexible commerce career paths across sectors'],
  },
];

// ─── FACULTY OF EDUCATION ───────────────────────────────────────────────────
// Table column order: English (Home/FAL) only | APS (no Mathematics requirement)

export const UP_EDUCATION_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UP-EDU-ECCE',
    universityId: 'up',
    name: 'Bachelor of Education in Early Childhood Care and Education',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
    },
    careers: ['Pre-primary/primary school teacher'],
  },
  {
    qualificationCode: 'UP-EDU-FOUNDATION',
    universityId: 'up',
    name: 'Bachelor of Education in Foundation Phase Teaching (Grade R–3)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
    },
    careers: ['Pre-primary/primary school teacher'],
  },
  {
    qualificationCode: 'UP-EDU-INTERMEDIATE',
    universityId: 'up',
    name: 'Bachelor of Education in Intermediate Phase Teaching (Grade 4–6)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
    },
    careers: ['Primary school teacher'],
  },
  {
    qualificationCode: 'UP-EDU-SENIOR-FET',
    universityId: 'up',
    name: 'Bachelor of Education in Senior Phase and Further Education and Training Teaching (Grade 7–12)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'For elective modules in Physical Sciences or Life Sciences, applicants must have passed both Mathematics and Physical Sciences at achievement level 5 (60–69%).',
    },
    careers: ['Primary/secondary school teacher'],
  },
  {
    qualificationCode: 'UP-EDU-HCSS-1YR',
    universityId: 'up',
    name: 'Higher Certificate in Sports Sciences',
    qualificationType: 'higher_certificate',
    durationYears: 1,
    faculty: 'Education',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 20 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Selection also considers sports achievements in consultation with TuksSport; preference to applicants nominated by an official UP sports club.',
    },
    careers: ['Sports coaching', 'Exercise industry roles'],
  },
  {
    qualificationCode: 'UP-EDU-HCSS-2YR',
    universityId: 'up',
    name: 'Higher Certificate in Sports Sciences (online)',
    qualificationType: 'online',
    durationYears: 2,
    faculty: 'Education',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 20 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Online programme — students must have at least part-time access to schools/sports clubs/accredited training facilities.',
    },
    careers: ['Sports trainer/coach (community, school, or public/private sector)'],
  },
];

// ─── FACULTY OF ENGINEERING, BUILT ENVIRONMENT AND INFORMATION TECHNOLOGY ──
// School of Engineering table order: English | Mathematics | Physical Sciences | APS

const engineeringDisciplines: { code: string; name: string; careers: string[] }[] = [
  {
    code: 'CHEM',
    name: 'Chemical Engineering',
    careers: ['Chemical engineer (petroleum, food processing, minerals, power generation)'],
  },
  {
    code: 'CIVIL',
    name: 'Civil Engineering',
    careers: ['Civil engineer (structures, dams, roads, bridges, railways)'],
  },
  {
    code: 'COMPUTER',
    name: 'Computer Engineering',
    careers: ['Computer engineer (systems, software, networks, embedded systems)'],
  },
  {
    code: 'ELECTRICAL',
    name: 'Electrical Engineering',
    careers: ['Electrical engineer (power generation, transmission, renewable energy)'],
  },
  {
    code: 'ELECTRONIC',
    name: 'Electronic Engineering',
    careers: ['Electronic engineer (telecommunications, medical technology, robotics)'],
  },
  {
    code: 'INDUSTRIAL',
    name: 'Industrial Engineering',
    careers: ['Industrial engineer (production systems, supply chain, quality management)'],
  },
  {
    code: 'MECHANICAL',
    name: 'Mechanical Engineering',
    careers: [
      'Mechanical/aeronautical engineer (vehicles, aircraft, turbines, biomedical systems)',
    ],
  },
  {
    code: 'METALLURGICAL',
    name: 'Metallurgical Engineering',
    careers: ['Metallurgical engineer (minerals processing, materials engineering)'],
  },
  {
    code: 'MINING',
    name: 'Mining Engineering',
    careers: ['Mining engineer (mine management, technical operations, mine design)'],
  },
];

// NOTE: UP_ENGINEERING_PROGRAMMES below covers ALL THREE schools in this single
// faculty (School of Engineering, School for the Built Environment, School of
// Information Technology) — one export per faculty, as requested.
export const UP_ENGINEERING_PROGRAMMES: Programme[] = [
  ...engineeringDisciplines.map(
    ({ code, name, careers }): Programme => ({
      qualificationCode: `UP-EBIT-BENG-${code}`,
      universityId: 'up',
      name: `Bachelor of Engineering in ${name}`,
      qualificationType: 'degree',
      durationYears: 4,
      faculty: 'Engineering, Built Environment and Information Technology',
      campus: ['Hatfield'],
      admission: {
        apsMinimum: { default: 35 },
        subjectRequirements: [
          { subject: 'english', status: 'required', minRating: 5 },
          { subject: 'mathematics', status: 'required', minRating: 6 },
          { subject: 'physicalScience', status: 'required', minRating: 6 },
        ],
      },
      careers,
    })
  ),
  {
    qualificationCode: 'UP-EBIT-BENG-5YR',
    universityId: 'up',
    name: 'Bachelor of Engineering (5-year, any discipline)',
    qualificationType: 'extended_degree',
    durationYears: 5,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 33 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 65 },
        { subject: 'mathematics', status: 'required', minPercentage: 65 },
        { subject: 'physicalScience', status: 'required', minPercentage: 65 },
      ],
      note: 'Previously called ENGAGE. Students can apply directly for any engineering discipline. Admission to this programme is determined by final Grade 12 results.',
    },
    careers: ['Entry route into any Engineering discipline'],
  },
  // — School for the Built Environment —
  {
    qualificationCode: 'UP-EBIT-BSC-ARCH',
    universityId: 'up',
    name: 'Bachelor of Science in Architecture',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
      note: 'Will only be considered as a first-choice programme. Selection includes an interview.',
    },
    careers: ['Candidate architectural technologist (SACAP registration route)'],
  },
  // NOTE (judgement call): the raw OCR text lists these three Built Environment
  // programmes as "5  5 or Accounting  30  4" — the APS figure (30) appears
  // between the Mathematics-or-Accounting cell and the Physical Sciences cell,
  // out of the column order used everywhere else in this faculty (English |
  // Mathematics | Physical Sciences | APS). We infer the intended reading is
  // English=5, Mathematics-or-Accounting=5, Physical Sciences=4, APS=30 (matching
  // the consistent pattern of the surrounding rows) rather than a genuinely
  // different table layout. Flagged as an assumption in the report.
  {
    qualificationCode: 'UP-EBIT-BSC-CONSTMAN',
    universityId: 'up',
    name: 'Bachelor of Science in Construction Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'quant' },
        { subject: 'accounting', status: 'alternative', minRating: 5, altGroup: 'quant' },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: [
      'Construction site manager',
      'Candidate professional construction manager (with honours)',
    ],
  },
  {
    qualificationCode: 'UP-EBIT-BSC-REALESTATE',
    universityId: 'up',
    name: 'Bachelor of Science in Real Estate',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'quant' },
        { subject: 'accounting', status: 'alternative', minRating: 5, altGroup: 'quant' },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: [
      'Property investment/finance',
      'Facilities management',
      'Professional property valuer (with honours)',
    ],
  },
  {
    qualificationCode: 'UP-EBIT-BSC-QS',
    universityId: 'up',
    name: 'Bachelor of Science in Quantity Surveying',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'alternative', minRating: 5, altGroup: 'quant' },
        { subject: 'accounting', status: 'alternative', minRating: 5, altGroup: 'quant' },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Candidate professional quantity surveyor (with honours)'],
  },
  {
    qualificationCode: 'UP-EBIT-BTRP',
    universityId: 'up',
    name: 'Bachelor of Town and Regional Planning',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Town and regional planner', 'Development practitioner', 'Urban manager'],
  },
  // — School of Information Technology —
  {
    qualificationCode: 'UP-EBIT-BIS',
    universityId: 'up',
    name: 'Bachelor of Information Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'If specialising in Information Systems at first-year level, achievement level 5 in Mathematics is required.',
    },
    careers: [
      'Information/knowledge manager',
      'E-commerce specialist',
      'Information systems developer',
    ],
  },
  {
    qualificationCode: 'UP-EBIT-BIS-PUBLISHING',
    universityId: 'up',
    name: 'Bachelor of Information Science specialising in Publishing',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
    },
    careers: [
      'Publishing house assistant/commissioning editor',
      'Copy editor',
      'Marketing/production roles',
    ],
  },
  {
    qualificationCode: 'UP-EBIT-BIS-MULTIMEDIA',
    universityId: 'up',
    name: 'Bachelor of Information Science specialising in Multimedia',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
      note: 'Possible future name change to Bachelor of Information Science specialising in Interactive Technology.',
    },
    careers: ['Programmer', 'Web designer', 'Animation specialist', 'Video editor'],
  },
  {
    qualificationCode: 'UP-EBIT-BIT-INFOSYS',
    universityId: 'up',
    name: 'Bachelor of Information Technology in Information Systems',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
      ],
    },
    careers: ['Data scientist', 'IT auditor', 'Business analyst', 'Project manager'],
  },
  {
    qualificationCode: 'UP-EBIT-BSC-COMPSCI',
    universityId: 'up',
    name: 'Bachelor of Science in Computer Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
    careers: ['Programmer', 'Systems analyst/architect', 'Database administrator'],
  },
  {
    qualificationCode: 'UP-EBIT-BSC-ITKS',
    universityId: 'up',
    name: 'Bachelor of Science in Information Technology in Information and Knowledge Systems',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Engineering, Built Environment and Information Technology',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
    careers: ['Data scientist', 'GIS specialist', 'Software developer'],
  },
];

// ─── FACULTY OF HEALTH SCIENCES ────────────────────────────────────────────
// Table order (where all 3 subjects present): English | Mathematics | Physical Sciences | APS

export const UP_HEALTH_SCIENCES_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UP-HS-DENTAL-SURGERY',
    universityId: 'up',
    name: 'Bachelor of Dental Surgery',
    qualificationType: 'degree',
    durationYears: 5,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 35 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
      note: 'Selection is based on the candidate’s final Grade 11 examination results.',
    },
    careers: ['Dentist', 'Dental specialist', 'Academic/researcher'],
  },
  {
    qualificationCode: 'UP-HS-ORAL-HYGIENE',
    universityId: 'up',
    name: 'Bachelor of Oral Hygiene',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 25 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Oral hygienist'],
  },
  {
    qualificationCode: 'UP-HS-DIETETICS',
    universityId: 'up',
    name: 'Bachelor of Dietetics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Dietician', 'Academic/researcher'],
  },
  {
    qualificationCode: 'UP-HS-NURSING',
    universityId: 'up',
    name: 'Bachelor of Nursing Science',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'lifeScience', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'not_accepted' },
      ],
      note: 'Life Sciences required (not Physical Sciences).',
    },
    careers: ['General nurse', 'Midwife'],
  },
  {
    qualificationCode: 'UP-HS-OCC-THERAPY',
    universityId: 'up',
    name: 'Bachelor of Occupational Therapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Occupational therapist', 'Academic/researcher'],
  },
  {
    qualificationCode: 'UP-HS-PHYSIOTHERAPY',
    universityId: 'up',
    name: 'Bachelor of Physiotherapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Physiotherapist', 'Academic/researcher'],
  },
  {
    qualificationCode: 'UP-HS-RADIOGRAPHY',
    universityId: 'up',
    name: 'Bachelor of Radiography in Diagnostics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Radiographer', 'Academic/researcher'],
  },
  {
    qualificationCode: 'UP-HS-BCMP',
    universityId: 'up',
    name: 'Bachelor of Clinical Medical Practice (BCMP)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
      note: 'Selection is based on the candidate’s final Grade 11 results and the Biographical Information Form.',
    },
    careers: ['Clinical associate', 'Academic/researcher'],
  },
  {
    qualificationCode: 'UP-HS-MBCHB',
    universityId: 'up',
    name: 'Bachelor of Medicine and Surgery (MBChB)',
    qualificationType: 'degree',
    durationYears: 6,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 35 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
      ],
      note: 'Selection is based on the candidate’s final Grade 11 results. Applicants from countries with their own medical schools cannot apply.',
    },
    careers: ['General medical practitioner', 'Specialist (postgraduate)'],
  },
  {
    qualificationCode: 'UP-HS-SPORTS-SCIENCE',
    universityId: 'up',
    name: 'Bachelor of Sports Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Health Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
    },
    careers: [
      'Sports scientist',
      'Biokineticist (with honours)',
      'Personal trainer',
      'Strength and conditioning specialist',
    ],
  },
];

// ─── FACULTY OF HUMANITIES ──────────────────────────────────────────────────

export const UP_HUMANITIES_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UP-HUM-BA-SLP',
    universityId: 'up',
    name: 'Bachelor of Arts in Speech-Language Pathology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'english', status: 'required', minRating: 5 },
      ],
      note: 'Selection based on academic achievement; only 50 students admitted. Conditional selection process starts in August.',
    },
    careers: ['Speech-language pathologist (education, health, private practice)'],
  },
  {
    qualificationCode: 'UP-HUM-BA-AUDIOLOGY',
    universityId: 'up',
    name: 'Bachelor of Arts in Audiology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'english', status: 'required', minRating: 5 },
      ],
      note: 'Selection based on academic achievement; only 50 students admitted. Conditional selection process starts in August.',
    },
    careers: ['Audiologist (diagnostic and rehabilitative)'],
  },
  {
    qualificationCode: 'UP-HUM-BA-INFODESIGN',
    universityId: 'up',
    name: 'Bachelor of Arts in Information Design',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28 (final NSC/IEB results).',
    },
    additionalRequirements: ['portfolio'],
    careers: ['Animator', 'Graphic designer', 'Illustrator', 'Art director'],
  },
  {
    qualificationCode: 'UP-HUM-BA-GENERAL',
    universityId: 'up',
    name: 'Bachelor of Arts',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28.',
    },
    careers: [
      'Community development',
      'Counselling',
      'Diplomacy and politics',
      'Journalism',
      'Language services',
    ],
  },
  {
    qualificationCode: 'UP-HUM-BSOCWORK',
    universityId: 'up',
    name: 'Bachelor of Social Work',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28. Continued enrolment requires departmental selection at end of year 1.',
    },
    careers: ['Social worker'],
  },
  {
    qualificationCode: 'UP-HUM-BA-LAW',
    universityId: 'up',
    name: 'Bachelor of Arts specialising in Law',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
    },
    careers: ['Lawyer (BA(Law) + LLB required)'],
    note: 'Also listed in the Faculty of Law brochure with the same requirements — modelled once here.',
  },
  {
    qualificationCode: 'UP-HUM-BA-LANGUAGES',
    universityId: 'up',
    name: 'Bachelor of Arts specialising in Languages',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28.',
    },
    careers: ['Advertising', 'Editing', 'Language teaching', 'Translation', 'Publishing'],
  },
  {
    qualificationCode: 'UP-HUM-BSOCSCI-INDSOC',
    universityId: 'up',
    name: 'Bachelor of Social Science specialising in Industrial Sociology and Labour Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28.',
    },
    careers: ['Labour relations practice', 'Arbitration', 'Conflict management'],
  },
  {
    qualificationCode: 'UP-HUM-BSOCSCI-HERITAGE',
    universityId: 'up',
    name: 'Bachelor of Social Science in Heritage and Cultural Sciences (Option: Heritage and Cultural Tourism)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28. Possible name change to "Bachelor of Social Science specialising in Heritage and Cultural Tourism".',
    },
    careers: ['Tourism', 'Museum and heritage sector', 'Hospitality management'],
  },
  {
    qualificationCode: 'UP-HUM-BMUS-4YR',
    universityId: 'up',
    name: 'Bachelor of Music (4-year)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Music achievement level 4 (50–59%) or Grade VII practical/Grade V theory (Unisa/Royal Schools/Trinity) or comparable, plus practical audition and theory test passed at 60%. Conditional admission Grade 11 APS 30; final admission APS 28.',
    },
    additionalRequirements: ['audition'],
    careers: ['Music teacher', 'Performer', 'Orchestral musician', 'Composer'],
  },
  {
    qualificationCode: 'UP-HUM-BMUS-5YR',
    universityId: 'up',
    name: 'Bachelor of Music (5-year)',
    qualificationType: 'extended_degree',
    durationYears: 5,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Music achievement level 4 (50–59%) or Grade V practical/Grade III theory or comparable, plus audition and theory test passed at 50%. If admitted, cannot also be considered for any other Faculty of Humanities degree.',
    },
    additionalRequirements: ['audition'],
    careers: ['Music teacher', 'Performer', 'Orchestral musician', 'Composer'],
  },
  {
    qualificationCode: 'UP-HUM-BDRAMA-3YR',
    universityId: 'up',
    name: 'Bachelor of Drama (3-year)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28. Admissions take place in August and on an ad-hoc basis.',
    },
    additionalRequirements: ['audition'],
    careers: ['Actor', 'Theatre director', 'Stage manager', 'Playwright/scriptwriter'],
  },
  {
    qualificationCode: 'UP-HUM-BDRAMA-4YR',
    universityId: 'up',
    name: 'Bachelor of Drama (4-year, foundation)',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'First year is a foundation year. Applicants who meet the criteria for the 3-year programme must apply for that programme instead.',
    },
    additionalRequirements: ['audition'],
    careers: ['Actor', 'Theatre director', 'Stage manager', 'Playwright/scriptwriter'],
  },
  {
    qualificationCode: 'UP-HUM-BA-PPE',
    universityId: 'up',
    name: 'Bachelor of Arts specialising in Philosophy, Politics and Economics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'english', status: 'required', minRating: 5 },
      ],
      note: 'Applicants with APS 32, Mathematics 4 and English 5 (not meeting the Mathematics 5 requirement) may enter another programme in year 1 and transfer internally in year 2 via STC 110/STC 122.',
    },
    careers: ['Economic/political policy-making', 'Journalism', 'Diplomatic service'],
  },
  {
    qualificationCode: 'UP-HUM-BPOLSCI-INTL',
    universityId: 'up',
    name: 'Bachelor of Political Science specialising in International Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28.',
    },
    careers: [
      'International relations',
      'Diplomatic service',
      'Policy analysis',
      'Strategic intelligence',
    ],
  },
  {
    qualificationCode: 'UP-HUM-BPOLSCI-POLITICAL',
    universityId: 'up',
    name: 'Bachelor of Political Science specialising in Political Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28.',
    },
    careers: ['Policy analysis', 'Political communication', 'Governance', 'Conflict resolution'],
  },
  {
    qualificationCode: 'UP-HUM-BA-FINEARTS-4YR',
    universityId: 'up',
    name: 'Bachelor of Arts in Fine Arts (4-year)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28. UP competency test (conceptualisation, drawing, interview, A4 portfolio) each at min 60%.',
    },
    additionalRequirements: ['portfolio'],
    careers: ['Gallery manager', 'Art educator', 'Fine artist'],
  },
  {
    qualificationCode: 'UP-HUM-BA-FINEARTS-5YR',
    universityId: 'up',
    name: 'Bachelor of Arts in Fine Arts (5-year)',
    qualificationType: 'extended_degree',
    durationYears: 5,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 26 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'UP competency test (conceptualisation, drawing, interview, A4 portfolio) each at min 50%.',
    },
    additionalRequirements: ['portfolio'],
    careers: ['Gallery manager', 'Art educator', 'Fine artist'],
  },
  {
    qualificationCode: 'UP-HUM-BA-VISUALSTUDIES',
    universityId: 'up',
    name: 'Bachelor of Arts specialising in Visual Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Humanities',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 5 }],
      note: 'Conditional admission with Grade 11 APS 30; final admission confirmed at APS 28.',
    },
    careers: ['Art/film critic', 'Visual culture specialist', 'Curator', 'Gallery manager'],
  },
];

// ─── FACULTY OF LAW ──────────────────────────────────────────────────────────
// Note: Bachelor of Commerce specialising in Law and Bachelor of Arts specialising
// in Law are also listed in this faculty's brochure with identical requirements
// to the EMS and Humanities entries above — modelled once each there to avoid
// duplicate qualificationCodes for what is the same physical programme.

export const UP_LAW_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UP-LAW-LLB',
    universityId: 'up',
    name: 'Bachelor of Laws (LLB)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Law',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 35 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 6 }],
      note: 'Faculty aims for at least 50% of the first-year class from designated groups. Late conditional admission possible for APS 38+ with English level 6+.',
    },
    careers: ['Attorney', 'Advocate', 'Legal advisor', 'Prosecutor', 'Magistrate/judge track'],
  },
];

// ─── FACULTY OF THEOLOGY AND RELIGION ───────────────────────────────────────

export const UP_THEOLOGY_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UP-THEO-BTHEOL',
    universityId: 'up',
    name: 'Bachelor of Theology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Theology and Religion',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
    },
    careers: ['Minister', 'Pastor', 'Priest', 'Missionary', 'Ethics consultant'],
  },
  {
    qualificationCode: 'UP-THEO-BDIVINITY',
    universityId: 'up',
    name: 'Bachelor of Divinity',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Theology and Religion',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
    },
    careers: ['Minister', 'Pastor', 'Priest', 'Missionary'],
  },
  {
    qualificationCode: 'UP-THEO-DIP',
    universityId: 'up',
    name: 'Diploma in Theology',
    qualificationType: 'diploma',
    durationYears: 3,
    faculty: 'Theology and Religion',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 24 },
      subjectRequirements: [{ subject: 'english', status: 'required', minRating: 4 }],
      note: 'Intended for candidates who completed NSC/IEB (or equivalent) but without the required university admission for the Bachelor programmes.',
    },
    careers: ['Minister', 'Pastor', 'Lay preacher', 'Missionary'],
  },
];

// ─── FACULTY OF NATURAL AND AGRICULTURAL SCIENCES ──────────────────────────
// Agricultural/Food Sciences and Biological Sciences tables: English | Mathematics | Physical Sciences | APS

const nasStandard532 = (
  code: string,
  name: string,
  durationYears: number,
  careers: string[],
  note?: string
): Programme => ({
  qualificationCode: `UP-NAS-${code}`,
  universityId: 'up',
  name,
  qualificationType: 'degree',
  durationYears,
  faculty: 'Natural and Agricultural Sciences',
  campus: ['Hatfield'],
  admission: {
    apsMinimum: { default: 32 },
    subjectRequirements: [
      { subject: 'english', status: 'required', minRating: 5 },
      { subject: 'mathematics', status: 'required', minRating: 5 },
      { subject: 'physicalScience', status: 'required', minRating: 5 },
    ],
    ...(note ? { note } : {}),
  },
  careers,
});

export const UP_NAS_PROGRAMMES: Programme[] = [
  // Agricultural and Food Sciences (all APS 32, English5/Maths5/PhysSci5)
  nasStandard532(
    'BSC-AGRIC-ECON',
    'Bachelor of Science in Agriculture in Agricultural Economics / Agribusiness Management',
    4,
    ['Agricultural economist', 'Commodity trader', 'Agribusiness advisor']
  ),
  nasStandard532('BSC-AGRIC-ANIMAL', 'Bachelor of Science in Agriculture in Animal Science', 4, [
    'Livestock production specialist',
    'Animal nutrition/breeding consultant',
  ]),
  nasStandard532(
    'BSC-AGRIC-PLANTSOIL',
    'Bachelor of Science in Agriculture in Applied Plant and Soil Sciences',
    4,
    ['Agricultural researcher', 'Crop/soil management consultant']
  ),
  nasStandard532(
    'BSC-AGRIC-PLANTPATH',
    'Bachelor of Science in Agriculture in Plant Pathology',
    4,
    ['Plant pathologist', 'Agricultural extension specialist']
  ),
  nasStandard532(
    'BSC-FOODMAN-CULINARY',
    'Bachelor of Science in Food Management (Option: Culinary Science)',
    4,
    ['Culinary scientist', 'Food product developer', 'Food service manager']
  ),
  nasStandard532(
    'BSC-FOODMAN-NUTRITION',
    'Bachelor of Science in Food Management (Option: Nutritional Science)',
    4,
    ['Nutrition-focused food industry roles', 'Public health/NGO roles'],
    'Interfaculty programme with the Faculty of Health Sciences (Human Nutrition).'
  ),
  nasStandard532('BSC-FOODSCIENCE', 'Bachelor of Science in Food Science', 3, [
    'Food safety/quality assurance manager',
    'Food chemist/microbiologist',
  ]),
  // Biological Sciences (all APS 32, English5/Maths5/PhysSci5)
  nasStandard532('BSC-BIOCHEMISTRY', 'Bachelor of Science in Biochemistry', 3, [
    'Researcher (pharmaceutical, food, waste-processing industries)',
  ]),
  nasStandard532('BSC-BIOTECHNOLOGY', 'Bachelor of Science in Biotechnology', 3, [
    'Laboratory researcher',
    'Bio-entrepreneur',
  ]),
  nasStandard532('BSC-ECOLOGY', 'Bachelor of Science in Ecology', 3, [
    'Conservation scientist',
    'Environmental consultant',
  ]),
  nasStandard532('BSC-ENTOMOLOGY', 'Bachelor of Science in Entomology', 3, [
    'Insect management specialist',
    'Agricultural/conservation researcher',
  ]),
  nasStandard532(
    'BSC-GENETICS',
    'Bachelor of Science in Genetics / Bachelor of Science in Human Genetics',
    3,
    ['Molecular biologist', 'Genetic counsellor', 'Bioinformaticist']
  ),
  nasStandard532(
    'BSC-HUMANPHYSIO',
    'Bachelor of Science in Human Physiology (incl. Genetics and Psychology option)',
    3,
    ['Research roles with medical teams', 'Sports physiology', 'Biostatistics']
  ),
  nasStandard532('BSC-MEDSCIENCES', 'Bachelor of Science in Medical Sciences', 3, [
    'Anatomy/physiology researcher',
    'Forensic science',
    'Health science industry',
  ]),
  nasStandard532('BSC-MICROBIOLOGY', 'Bachelor of Science in Microbiology', 3, [
    'Food/dairy/fermentation industry roles',
    'Medical/veterinary microbiology',
  ]),
  nasStandard532('BSC-PLANTSCIENCE', 'Bachelor of Science in Plant Science', 3, [
    'Plant researcher',
    'Biotechnology/pharmaceutical roles',
  ]),
  nasStandard532('BSC-ZOOLOGY', 'Bachelor of Science in Zoology', 3, [
    'Conservation scientist',
    'Environmental consultant',
  ]),
  // Consumer Science (English | Mathematics | APS — no Physical Sciences column)
  {
    qualificationCode: 'UP-NAS-BCONSUMER-CLOTHING',
    universityId: 'up',
    name: 'Bachelor of Consumer Science specialising in Clothing Retail Management',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Brand manager', 'Clothing buyer/planner', 'Fashion designer/marketer'],
  },
  {
    qualificationCode: 'UP-NAS-BCONSUMER-FOOD',
    universityId: 'up',
    name: 'Bachelor of Consumer Science specialising in Food Management',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
      ],
    },
    careers: ['Brand manager', 'Food stylist', 'Consumer insight specialist'],
  },
  // Mathematical Sciences (English | Mathematics | APS)
  {
    qualificationCode: 'UP-NAS-BSC-ACTUARIAL',
    universityId: 'up',
    name: 'Bachelor of Science in Actuarial and Financial Mathematics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 36 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 7 },
      ],
    },
    careers: ['Actuary/actuarial technician', 'Financial engineer'],
  },
  {
    qualificationCode: 'UP-NAS-BSC-MATHEMATICS',
    universityId: 'up',
    name: 'Bachelor of Science in Mathematics / Bachelor of Science in Applied Mathematics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
    careers: ['Researcher', 'Educator', 'Financial/engineering modelling roles'],
  },
  {
    qualificationCode: 'UP-NAS-BSC-MATHSTATS',
    universityId: 'up',
    name: 'Bachelor of Science in Mathematical Statistics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 34 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 6 },
      ],
    },
    careers: ['Data scientist', 'Financial/risk analyst', 'Biostatistician'],
  },
  // Physical Sciences (English | Mathematics | Physical Sciences | APS, all APS 34)
  ...[
    [
      'BSC-CHEMISTRY',
      'Bachelor of Science in Chemistry',
      ['Synthetic chemist', 'Materials scientist', 'Analytical chemist'],
    ],
    [
      'BSC-ENVENGGEOLOGY',
      'Bachelor of Science in Environmental and Engineering Geology',
      ['Environmental/engineering geologist', 'Hydrogeologist'],
    ],
    [
      'BSC-GEOGRAPHY',
      'Bachelor of Science in Geography (Option: Geography and Environmental Science)',
      ['Environmental manager', 'Urban/regional development consultant'],
    ],
    [
      'BSC-GEOINFORMATICS',
      'Bachelor of Science in Geoinformatics',
      ['Geospatial/GIS consultant', 'Candidate Geomatics Practitioner'],
    ],
    [
      'BSC-GEOLOGY',
      'Bachelor of Science in Geology',
      ['Mining geologist', 'Environmental/engineering geologist'],
    ],
    [
      'BSC-METEOROLOGY',
      'Bachelor of Science in Meteorology',
      ['Weather forecaster', 'Climate researcher'],
    ],
    [
      'BSC-PHYSICS',
      'Bachelor of Science in Physics',
      ['Researcher', 'Radiation/medical scientist', 'Geophysicist'],
    ],
  ].map(
    ([code, name, careers]): Programme => ({
      qualificationCode: `UP-NAS-${code}`,
      universityId: 'up',
      name: name as string,
      qualificationType: 'degree',
      durationYears: 3,
      faculty: 'Natural and Agricultural Sciences',
      campus: ['Hatfield'],
      admission: {
        apsMinimum: { default: 34 },
        subjectRequirements: [
          { subject: 'english', status: 'required', minRating: 5 },
          { subject: 'mathematics', status: 'required', minRating: 5 },
          { subject: 'physicalScience', status: 'required', minRating: 5 },
        ],
      },
      careers: careers as string[],
    })
  ),
  // Extended (lower-entry) 4-/5-year Bachelor of Science programmes — percentage-based requirements
  {
    qualificationCode: 'UP-NAS-BSC-MATHEMATICS-EXT',
    universityId: 'up',
    name: 'Bachelor of Science in Mathematics (extended)',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Natural and Agricultural Sciences',
    campus: ['Hatfield'],
    admission: {
      apsMinimum: { default: 32 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minPercentage: 58 },
        { subject: 'mathematics', status: 'required', minPercentage: 65 },
      ],
      note: 'Extended (augmented) programme with additional academic support for students who, due to exceptional circumstances, benefit from it.',
    },
    careers: ['Same career paths as mainstream Bachelor of Science in Mathematics'],
  },
  ...['BSC-CHEMISTRY', 'BSC-GEOINFORMATICS', 'BSC-GEOLOGY', 'BSC-METEOROLOGY', 'BSC-PHYSICS'].map(
    (code): Programme => ({
      qualificationCode: `UP-NAS-${code}-EXT`,
      universityId: 'up',
      name: `${
        {
          'BSC-CHEMISTRY': 'Bachelor of Science in Chemistry',
          'BSC-GEOINFORMATICS': 'Bachelor of Science in Geoinformatics',
          'BSC-GEOLOGY': 'Bachelor of Science in Geology',
          'BSC-METEOROLOGY': 'Bachelor of Science in Meteorology',
          'BSC-PHYSICS': 'Bachelor of Science in Physics',
        }[code]
      } (extended)`,
      qualificationType: 'extended_degree',
      durationYears: 4,
      faculty: 'Natural and Agricultural Sciences',
      campus: ['Hatfield'],
      admission: {
        apsMinimum: { default: 32 },
        subjectRequirements: [
          { subject: 'english', status: 'required', minPercentage: 58 },
          { subject: 'mathematics', status: 'required', minPercentage: 58 },
          { subject: 'physicalScience', status: 'required', minPercentage: 58 },
        ],
        note: 'Extended (augmented) programme with additional academic support. Students transferring into a 4-year Bachelor of Engineering programme after year 1 need 70% in Mathematics/Physical Sciences and 65% in Languages.',
      },
      careers: ['Same career paths as the mainstream 3-year equivalent'],
    })
  ),
  ...[
    [
      'BSC-AGRIC-PLANTSOIL-EXT',
      'Bachelor of Science in Agriculture in Applied Plant and Soil Sciences (extended)',
      5,
    ],
    [
      'BSC-AGRIC-PLANTPATH-EXT',
      'Bachelor of Science in Agriculture in Plant Pathology (extended)',
      5,
    ],
    ['BSC-ECOLOGY-EXT', 'Bachelor of Science in Ecology (extended)', 4],
    ['BSC-HUMANPHYSIO-EXT', 'Bachelor of Science in Human Physiology (extended)', 4],
  ].map(
    ([code, name, years]): Programme => ({
      qualificationCode: `UP-NAS-${code}`,
      universityId: 'up',
      name: name as string,
      qualificationType: 'extended_degree',
      durationYears: years as number,
      faculty: 'Natural and Agricultural Sciences',
      campus: ['Hatfield'],
      admission: {
        apsMinimum: { default: 30 },
        subjectRequirements: [
          { subject: 'english', status: 'required', minPercentage: 58 },
          { subject: 'mathematics', status: 'required', minPercentage: 58 },
          { subject: 'physicalScience', status: 'required', minPercentage: 58 },
        ],
        note: 'Extended (augmented) programme with additional academic support. Maximum 30 students per programme; preference given to quintile 1–4 school applicants.',
      },
      careers: ['Same career paths as the mainstream equivalent'],
    })
  ),
];

// ─── FACULTY OF VETERINARY SCIENCE ─────────────────────────────────────────
// Closing date 31 May 2026 (earlier than all other faculties, which close 30 June).
// Campus: Onderstepoort (not Hatfield).

export const UP_VET_SCIENCE_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'UP-VET-BVETSCI',
    universityId: 'up',
    name: 'Bachelor of Veterinary Science',
    qualificationType: 'degree',
    durationYears: 6,
    faculty: 'Veterinary Science',
    campus: ['Onderstepoort'],
    closingDateOverride: '2026-05-31T12:00:00+02:00',
    admission: {
      apsMinimum: { default: 35 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 5 },
        { subject: 'mathematics', status: 'required', minRating: 5 },
        { subject: 'physicalScience', status: 'required', minRating: 5 },
        { subject: 'mathematicalLiteracy', status: 'not_accepted' },
        { subject: 'technicalMathematics', status: 'not_accepted' },
      ],
      note: 'School-leaving applicants are conditionally selected on Grade 11 results; final NSC results must not drop Merit Point Score by more than 5% to retain the place. Only Mathematics is considered — Mathematical Literacy and Technical Mathematics are not accepted.',
    },
    careers: [
      'Veterinarian (private practice, state veterinary services, research, wildlife management)',
    ],
  },
  {
    qualificationCode: 'UP-VET-BVETNURSING',
    universityId: 'up',
    name: 'Bachelor of Veterinary Nursing',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Veterinary Science',
    campus: ['Onderstepoort'],
    closingDateOverride: '2026-05-31T12:00:00+02:00',
    admission: {
      apsMinimum: { default: 28 },
      subjectRequirements: [
        { subject: 'english', status: 'required', minRating: 4 },
        { subject: 'mathematics', status: 'required', minRating: 4 },
        { subject: 'physicalScience', status: 'alternative', minRating: 4, altGroup: 'science' },
        { subject: 'lifeScience', status: 'alternative', minRating: 4, altGroup: 'science' },
      ],
    },
    careers: ['Veterinary nurse (clinics, hospitals, animal welfare, research centres)'],
  },
];

export const UP: University = {
  id: 'up',
  name: 'University of Pretoria',
  shortName: 'UP',
  logoUrl: '/logos/up.png',
  applicationSystem: 'Custom portal',
  applicationFee: 0,
  feeNote:
    "No application fee is stated in the sourced 2027 Undergraduate Prospectus text. Verify directly via UP's application portal before relying on this figure.",
  maxChoices: 1,
  choicesRanked: false,
  choicesIndependent: true,
  choicesFinal: true,
  apsRule: {
    method: 'standard_aps',
    subjectsCounted: 6,
    includesLifeOrientation: false,
    scale: 'nsc_7point',
    note: 'Six best 20-credit NSC subjects, Life Orientation excluded. Maximum APS = 42.',
  },
  applicationsOpen: '2026',
  defaultClosingDate: '2026-06-30T23:59:00+02:00',
  applyUrl: 'https://www.up.ac.za/apply',
  notes: [
    "UP's own online application form allows a first- and second-choice programme as a fallback mechanism — ApplyOnce restricts every student to ONE programme per university (a platform-wide rule), so maxChoices is set to 1 regardless of UP's own two-choice form.",
    'Applications for the Faculty of Veterinary Science close 31 May 2026 (earlier than all other faculties, which close 30 June 2026) — modelled via closingDateOverride on the two Veterinary Science programmes.',
    'Where the prospectus describes conditional admission on Grade 11 results with a different final NSC threshold, only the final/confirmed threshold is modelled — ApplyOnce applicants already hold final results.',
  ],
  programmes: [
    ...UP_EMS_PROGRAMMES,
    ...UP_EDUCATION_PROGRAMMES,
    ...UP_ENGINEERING_PROGRAMMES,
    ...UP_HEALTH_SCIENCES_PROGRAMMES,
    ...UP_HUMANITIES_PROGRAMMES,
    ...UP_LAW_PROGRAMMES,
    ...UP_THEOLOGY_PROGRAMMES,
    ...UP_NAS_PROGRAMMES,
    ...UP_VET_SCIENCE_PROGRAMMES,
  ],
  type: 'traditional',
  city: 'Pretoria',
  province: 'gauteng',
  website: 'https://www.up.ac.za',
  applicationPortal: 'https://www.up.ac.za/apply',
};
