// packages/shared/src/constants/universities/su.ts
import { University, Programme } from '../../types/university';

// ═══════════════════════════════════════════════════════════════════════════
// STELLENBOSCH UNIVERSITY (SU) — full reference implementation
// ═══════════════════════════════════════════════════════════════════════════
// SU uses a THIRD distinct APS model: an "aggregate" — the AVERAGE percentage
// across ALL NSC subjects (excluding Life Orientation), not a sum (unlike
// UCT's sum-to-600 or UJ/Wits/UP's 1-7 point scale). Subject minimums are also
// raw percentages (minPercentage, not minRating).
// NBTs are the INVERSE of UCT/UP here: NOT required for 2027 admission at all,
// EXCEPT for every Faculty of Law programme — so additionalRequirements:
// ['NBT'] appears only on Law programmes below.
// Faculty of Science applies its own weighted "Selection Mark" on top of the
// bare-minimum aggregate (see apsRule.facultyScoring) — actual selection is
// more competitive than the floor numbers shown per programme.
// Source: docs/prospectuses/su/ (SU 2027 Undergraduate Prospectus).
// NOTE: this sourced document did not include a general "how to apply" page
// with application fee / universal closing date — those two fields below
// are carried over from prior placeholder data and are UNCONFIRMED against
// this specific prospectus; verify via www.maties.com before relying on them.

// Stellenbosch University (SU) — Programme[] data extracted from the 2027
// Undergraduate Prospectus. To be spliced into src/constants/universities.ts.
//
// University-level ApsRule (set by caller, not here):
//   scale: 'percentage_average', method: 'custom' (or similar), the base
//   "aggregate" = average % across ALL NSC subjects excluding Life Orientation.
//
// MODELLING NOTES (see report for full detail):
// - English/Afrikaans alternative: modelled as two (or more) SubjectRequirement
//   rows sharing an altGroup, keyed on 'english' / 'afrikaans' (each already
//   matches both Home Language and First Additional Language forms per
//   matchesSubjectKey in types/university.ts). A trailing comment on each row
//   notes whether the percentage is the HL or FAL figure.
// - NBT tagged ONLY on Faculty of Law programmes (additionalRequirements: ['NBT']),
//   per SU being the exception where NBTs are NOT required except for Law.
// - "60% or 70% depending on first-year Mathematics/Physics combination" in the
//   Faculty of Science: modelled with the HIGHER figure as apsMinimum default
//   (the more conservative / non-Bio track) except where the source text states
//   the LOWER figure as the primary threshold and the higher one only as an
//   elevated alternative (BSc GeoInformatics) — in all cases the other branch is
//   captured in `note`.
// - Faculty of Science programmes carry a `note` pointing out the actual
//   Selection Mark (SM) is a weighted formula higher than this bare minimum
//   (SM = [(Mathematics x 2) + 5 other subjects, at least one English/Afrikaans,
//   excluding LO] / 7) — see faculty-level facultyScoring, not re-derived here.
// - Programmes requiring a prior bachelor's degree rather than NSC results
//   (LLB three-year second-degree route, Advanced Diploma in Practical Music)
//   are OMITTED — out of scope for an NSC/matric-results-based applicant flow.
// - PGCE (postgraduate teaching certificate) omitted for the same reason.
// - Bachelor of Data Science (BDatSci) is a genuine interfaculty programme that
//   recurs in the prospectus once per contributing faculty (Agrisciences, EMS,
//   Science) with different focal areas each time but IDENTICAL admission
//   numbers (aggregate 80%, Mathematics 80%, HL 60%/FAL 75% language gate).
//   Modelled as one Programme entry per faculty occurrence (3 total), each
//   carrying only the focal areas named in that faculty's section.
// - A few programmes/entries physically appear under the wrong faculty header
//   in the OCR'd text (evidently a column-order artifact in the source PDF):
//   BCom (Management Accounting) and BCom (Financial Accounting) print under
//   "FACULTY OF EDUCATION" but are obviously Economic and Management Sciences
//   programmes — placed there. Likewise "Diploma in Sustainable Development"
//   and "BCom (Economic Sciences)" print at the tail of the Arts and Social
//   Sciences pages but are grouped with the Faculty of Economic and Management
//   Sciences here (matches SU's real-world faculty structure: Sustainable
//   Development sits under the School of Public Leadership within EMS).
// - Agrisciences' generic ECP note ("Combination 1 / Combination 2" Mathematics
//   band + Physical Sciences band, applicable to nearly all Agrisciences
//   programmes as a 4-year extended route) is NOT modelled as separate
//   Programme entries: the admission logic is a percentage BAND (e.g.
//   "Mathematics between 55% and 59.9%"), which SubjectRequirement.minPercentage
//   (a single floor) cannot represent, and no distinct qualification code/name
//   is given per programme for the ECP variant. Captured in a `note` instead.

// ─── FACULTY OF AGRISCIENCES ────────────────────────────────────────────────

export const SU_AGRISCIENCES_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'SU-AGRI-BAGRIC-AGRIBUSINESS',
    universityId: 'su',
    name: 'BAgric in Agribusiness Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Also offered as a 4-year Extended Curriculum Programme (Mathematics/Physical Sciences band-combination admission — not modelled here, schema represents single-floor minimums only; see faculty selection guidelines).',
    },
    careers: [
      'Agribusiness manager (crop or animal production)',
      'Agricultural economist at a financial institution',
    ],
    note: 'Similar programmes: BScAgric in Agricultural Economic Analysis and Management; BCom (Management Sciences) focal area Agricultural Economics.',
  },
  {
    qualificationCode: 'SU-AGRI-BSCAGRIC-AGRIECON',
    universityId: 'su',
    name: 'BScAgric in Agricultural Economics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Fields of study: Agricultural Economic Analysis; Agricultural Economic Analysis and Management; Agricultural Economic Analysis and Management with Food Science; Agricultural Economics with Food Science. Also available as an Extended Curriculum Programme (see Agrisciences ECP note).',
    },
    careers: [
      'Agricultural policy researcher',
      'Agricultural economist (financial/marketing institution)',
      'Food-processing manager',
    ],
  },
  {
    qualificationCode: 'SU-AGRI-BAGRIC-ELSENBURG',
    universityId: 'su',
    name: 'BAgric in Agricultural Production and Management (Elsenburg)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Agrisciences',
    campus: ['Elsenburg'],
    admission: {
      apsMinimum: { default: 55 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'alternative', minPercentage: 50, altGroup: 'maths' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minPercentage: 60,
          altGroup: 'maths',
        },
        {
          subject: 'physicalScience',
          status: 'alternative',
          minPercentage: 50,
          altGroup: 'science',
        },
        { subject: 'lifeScience', status: 'alternative', minPercentage: 50, altGroup: 'science' },
      ],
      note: 'Science alternative also accepts Agricultural Sciences 50% (no SubjectKey exists for Agricultural Sciences — not modelled). Offered in collaboration with Elsenburg Agricultural Training Institute; students reside on the Elsenburg campus. Fields of study: Animal Production; Cellar Management; Cellar Technology; Extension and Animal Production; Extension and Plant Production; Plant Production; Plant and Animal Production. Not available as an ECP.',
    },
    careers: [],
  },
  {
    qualificationCode: 'SU-AGRI-BSCFOR-FORESTRY-NATRES',
    universityId: 'su',
    name: 'BSc in Forestry (Forestry and Natural Resources Sciences)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'BScFor (Forestry and Wood Sciences), Forestry and Natural Resources Sciences field. Also available as a 4-year ECP with a Mathematics 55-59.9%/Physical Sciences >=50% OR Mathematics >=60%/Physical Sciences 45-49.9% combination (not modelled, see Agrisciences ECP note).',
    },
    careers: [
      'Forestry expert',
      'Timber grower',
      'Environmental planner',
      'Forest researcher',
      'Extension officer/consultant',
      'Logistics manager',
      'Tree breeder',
      'Rural development advisor',
    ],
  },
  {
    qualificationCode: 'SU-AGRI-BSCFOR-WOOD-PRODUCTS',
    universityId: 'su',
    name: 'BSc in Forestry (Wood and Wood Products Sciences)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
        { subject: 'physicalScience', status: 'required', minPercentage: 60 },
      ],
      note: 'BScFor (Forestry and Wood Sciences), Wood and Wood Products Sciences field. Also available as a 4-year ECP with a Mathematics 60-69.9%/Physical Sciences >=60% OR Mathematics >=70%/Physical Sciences 55-59.9% combination (not modelled, see Agrisciences ECP note).',
    },
    careers: [
      'Wood products expert',
      'Production plant manager',
      'Product development manager',
      'Quality assurance manager',
      'Wood scientist',
    ],
  },
  {
    qualificationCode: 'SU-AGRI-BSCAGRIC-PLANT-SOIL',
    universityId: 'su',
    name: 'BScAgric in Plant and Soil Science',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Fields of study: Crop Production Systems; Crop Production Systems with Agronomy, Agricultural Economics and Animal Science; Crop Protection and Breeding; Soil and Water Management. Also available as an ECP (see Agrisciences ECP note).',
    },
    careers: [
      'Agronomist',
      'Crop protection specialist',
      'Soil and water management consultant',
      'Extension officer',
      'Researcher',
    ],
  },
  {
    qualificationCode: 'SU-AGRI-BSCAGRIC-VITICULTURE',
    universityId: 'su',
    name: 'BScAgric in Viticulture and Oenology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Also available as an ECP (see Agrisciences ECP note).',
    },
    careers: [
      'Winemaker',
      'Viticulturist',
      'Sensory specialist',
      'Wine biotechnologist',
      'Laboratory analyst',
      'Production manager',
    ],
  },
  {
    qualificationCode: 'SU-AGRI-BSCAGRIC-ANIMAL-PRODUCTION',
    universityId: 'su',
    name: 'BScAgric in Animal Production Systems',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Field of study: Animal Science. Also available as an ECP (see Agrisciences ECP note).',
    },
    careers: [
      'Consultant/manager/technician in animal sciences',
      'Extension officer',
      'Aquaculture industry',
      'Stock farmer',
      'Game farmer',
    ],
  },
  {
    qualificationCode: 'SU-AGRI-BSC-CONSERVATION-ECOLOGY',
    universityId: 'su',
    name: 'BSc in Conservation Ecology',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Also available as an ECP (see Agrisciences ECP note).',
    },
    careers: [
      'Environmental impact assessor',
      'Restoration ecologist',
      'Conservation biologist',
      'Game farm manager',
      'Ecotourism',
    ],
  },
  {
    qualificationCode: 'SU-AGRI-BSC-FOOD-SCIENCE',
    universityId: 'su',
    name: 'BSc in Food Science',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Explicitly NOT available as an Extended Curriculum Programme (per prospectus exception list).',
    },
    careers: [
      'Food scientist (quality assurance)',
      'Product development',
      'Technical support',
      'Production management',
    ],
  },
  {
    qualificationCode: 'SU-AGRI-BDATSCI-STATGENETICS',
    universityId: 'su',
    name: 'Bachelor of Data Science (BDatSci) — Statistical Genetics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Agrisciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 80 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // Home Language
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 75, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 75, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Interfaculty programme (Agrisciences, EMS, Science all contribute). This entry covers the Statistical Genetics field of study (statistical methods applied to genetic data — plant breeding, conservation genetics, genetic epidemiology). See also the Economic and Management Sciences and Science faculty BDatSci entries for other focal areas — identical admission requirements throughout.',
    },
    careers: ['Statistical geneticist'],
  },
];

// ─── FACULTY OF ARTS AND SOCIAL SCIENCES ────────────────────────────────────

export const SU_ARTS_SOCIAL_SCIENCES_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'SU-ARTS-BA-HUMANITIES',
    universityId: 'su',
    name: 'BA in Humanities',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 63 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 40 },
      ],
      note: 'If taking Organisational Informatics as a university subject: also Mathematics 50% OR Mathematical Literacy 70%. Also available as a 4-year Extended Curriculum Programme (marked # in prospectus; admission at Faculty discretion, no separate published minimums).',
    },
    careers: [
      'Teacher',
      'Psychologist',
      'Language practitioner',
      'Journalist',
      'Town and regional planner',
    ],
  },
  {
    qualificationCode: 'SU-ARTS-BA-LANGUAGE-CULTURE',
    universityId: 'su',
    name: 'BA in Language and Culture',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 63 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 50 },
      ],
      note: 'Also available as a 4-year Extended Curriculum Programme (marked # in prospectus).',
    },
    careers: [
      'Diplomatic service',
      'Teacher',
      'Publisher',
      'Advertising',
      'Tourism',
      'Journalist',
      'Translator',
    ],
  },
  {
    qualificationCode: 'SU-ARTS-BA-DEV-ENVIRONMENT',
    universityId: 'su',
    name: 'BA in Development and the Environment',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 63 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 40 },
      ],
      note: 'If taking Economics as a university subject: also Mathematics 60%. Also available as a 4-year Extended Curriculum Programme (marked # in prospectus).',
    },
    careers: [
      'Community development',
      'Population development',
      'Town and regional planner',
      'Tourism',
      'Environmental planner/manager',
    ],
  },
  {
    qualificationCode: 'SU-ARTS-BA-MUSIC',
    universityId: 'su',
    name: 'BA in Music',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 40 },
      ],
      note: 'If taking Mathematics as a university subject: also Mathematics 70%. Requires a practical standard in the main instrument/singing equivalent to Grade VII classical music plus Grade V theory, and an audition/theory test at the Department of Music.',
    },
    additionalRequirements: ['audition'],
    careers: ['Private music teacher', 'Conductor', 'Performing artist', 'Accompanist'],
  },
  {
    qualificationCode: 'SU-ARTS-DIP-PRACTICAL-MUSIC',
    universityId: 'su',
    name: 'Diploma in Practical Music',
    qualificationType: 'diploma',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: {},
      subjectRequirements: [],
      note: 'A National Senior Certificate with at least 40% in each of four school subjects (excluding Life Orientation) — not modelled as a single aggregate figure. Requires a practical standard equivalent to Grade VII classical music plus Grade III/IV theory, and an audition/theory test.',
    },
    additionalRequirements: ['audition'],
    careers: [
      'Instrumental/singing teacher',
      'Choral conductor',
      'Church organist',
      'Orchestral musician',
    ],
  },
  {
    qualificationCode: 'SU-ARTS-HCERT-MUSIC',
    universityId: 'su',
    name: 'Higher Certificate in Music',
    qualificationType: 'higher_certificate',
    durationYears: 1,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: {},
      subjectRequirements: [],
      note: 'Requires a National Senior Certificate (no aggregate percentage published) plus a practical standard equivalent to Grade V/VI classical music and Grade III/IV theory, and an audition.',
    },
    additionalRequirements: ['audition'],
    careers: ['Community music projects'],
  },
  {
    qualificationCode: 'SU-ARTS-BA-DRAMA-THEATRE',
    universityId: 'su',
    name: 'BA in Drama and Theatre Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 60 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 50 },
      ],
      note: 'Candidates must be available for auditions and/or interviews at the Drama Department in August.',
    },
    additionalRequirements: ['audition'],
    careers: [
      'Theatre/media industry',
      'Public relations',
      'Marketing',
      'Teaching',
      'Cultural affairs',
    ],
  },
  {
    qualificationCode: 'SU-ARTS-BA-HR-MANAGEMENT',
    universityId: 'su',
    name: 'BA in Human Resource Management',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 63 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 40 },
        { subject: 'mathematics', status: 'alternative', minPercentage: 50, altGroup: 'maths' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minPercentage: 70,
          altGroup: 'maths',
        },
      ],
      note: 'Also available as a 4-year Extended Curriculum Programme (marked # in prospectus).',
    },
    careers: [
      'Development manager',
      'Human resource manager',
      'Psychometrician',
      'Management consultant',
      'Labour relations practitioner',
    ],
  },
  {
    qualificationCode: 'SU-ARTS-BA-INTL-STUDIES',
    universityId: 'su',
    name: 'BA in International Studies',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 63 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Also available as a 4-year Extended Curriculum Programme (marked # in prospectus).',
    },
    careers: [
      'Diplomatic service',
      'Parliament',
      'Tourism industry',
      'International journalism',
      'Import/export industry',
    ],
  },
  {
    qualificationCode: 'SU-ARTS-BMUS',
    universityId: 'su',
    name: 'Bachelor of Music (BMus)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 40 },
      ],
      note: 'If taking Mathematics as a university subject: also Mathematics 70%. Requires a practical standard equivalent to Grade VII classical music plus Grade V theory, and an audition/theory test.',
    },
    additionalRequirements: ['audition'],
    careers: [
      'Music educator',
      'Performing artist',
      'Accompanist',
      'Music director',
      'Musicologist',
      'Composer',
      'Conductor',
    ],
  },
  {
    qualificationCode: 'SU-ARTS-BA-PPE',
    universityId: 'su',
    name: 'BA in Political, Philosophical and Economic Studies (PPE)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 63 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 40 },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
      ],
    },
    careers: [
      'Manager',
      'Journalist',
      'Business/investment analyst',
      'Entrepreneur',
      'Diplomat',
      'Civil servant',
      'Researcher',
    ],
  },
  {
    qualificationCode: 'SU-ARTS-BSW-SOCIAL-WORK',
    universityId: 'su',
    name: 'Bachelor of Social Work',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 63 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 50 },
      ],
      note: '100 places in the programme.',
    },
    careers: ['Social worker (state, NPO, hospital, schools, private practice)'],
  },
  {
    qualificationCode: 'SU-ARTS-BA-VISUAL-ARTS',
    universityId: 'su',
    name: 'BA in Visual Arts',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Arts and Social Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'required', minPercentage: 50 },
        { subject: 'additionalLanguage', status: 'required', minPercentage: 40 },
      ],
      note: '60 places in the programme. Requires a prescribed art portfolio by 1 September. Fields of study: Fine Arts; Jewellery and Metal Design; Visual Communication Design.',
    },
    additionalRequirements: ['portfolio'],
    careers: [
      'Fine artist',
      'Art teacher',
      'Graphic designer',
      'Illustrator',
      'Jewellery designer',
      'Art critic/theorist',
    ],
  },
];

// ─── FACULTY OF ECONOMIC AND MANAGEMENT SCIENCES ────────────────────────────

export const SU_ECONOMIC_MANAGEMENT_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'SU-EMS-DIP-SUSTAINABLE-DEV',
    universityId: 'su',
    name: 'Diploma in Sustainable Development',
    qualificationType: 'diploma',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 55 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // First Additional Language
        { subject: 'mathematics', status: 'alternative', minPercentage: 50, altGroup: 'maths' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minPercentage: 60,
          altGroup: 'maths',
        },
      ],
      note: 'A third maths alternative exists (Mathematics 40% OR Mathematical Literacy 50%, AND 60% for Business Studies or Economics or Accounting) — not modelled, schema does not support a subject-conditional AND combination. Selection also weighs a combined score of NSC average plus a departmental interest/experience application form. Language of instruction is English.',
    },
    careers: ['Entrepreneurship', 'Roles aligned with the Sustainable Development Goals'],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-ECONOMIC-SCIENCES',
    universityId: 'su',
    name: 'BCom (Economic Sciences)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
      note: 'To register for Econometrics or Financial Sector focal areas (or to take Actuarial Science 112 generally): Grade 12 Mathematics final mark must be at least 70%.',
    },
    careers: [],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-MANAGEMENT-SCIENCES',
    universityId: 'su',
    name: 'BCom (Management Sciences)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Focal areas: Agricultural Economics; Business Analytics; Entrepreneurship and Innovation Management; Financial Management; Financial Planning; Human Resource Management; Information Systems Management; Investment Management; Logistics and Supply Chain Management; Marketing Management; Public and Development Management.',
    },
    careers: [
      'Entrepreneur',
      'General/financial manager',
      'Logistics manager',
      'Investment/marketing manager',
      'HR practitioner',
    ],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-MANAGEMENT-SCIENCES-ECP',
    universityId: 'su',
    name: 'BCom (Management Sciences) Extended Curriculum Programme',
    qualificationType: 'extended_degree',
    durationYears: 4,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    firstTimeEntrantsOnly: true,
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 50 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Only South African citizens may register. Preference given to applicants meeting the University’s socio-economic status (SES) criteria. Approximately 100 students accommodated per year. Applicants who repeated a Grade 12 subject to improve marks, or transferring students, are not eligible.',
    },
    careers: [],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-MATHEMATICAL-SCIENCES',
    universityId: 'su',
    name: 'BCom (Mathematical Sciences)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 70 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 75 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Focal areas: Data Science; Financial Risk Management; Operations Research.',
    },
    careers: [
      'Actuarial analyst',
      'Quantitative analyst',
      'Data scientist',
      'Operations research analyst',
    ],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-ACTUARIAL-SCIENCE',
    universityId: 'su',
    name: 'BCom (Actuarial Science)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 80 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'homeLanguage', status: 'required', minPercentage: 60 },
      ],
      note: 'If the Home Language above is not English, an additional English First Additional Language 75% is required — the conditional (language-specific) branch is not separately modelled.',
    },
    careers: ['Actuary (Fellow of the Actuarial Society of South Africa)'],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-INDUSTRIAL-PSYCHOLOGY',
    universityId: 'su',
    name: 'BCom (Industrial Psychology)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
    },
    careers: [
      'Psychometrist (after further studies/registration)',
      'Industrial psychologist (after further studies/registration)',
    ],
  },
  {
    qualificationCode: 'SU-EMS-BACC',
    universityId: 'su',
    name: 'BAcc',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 70 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Alternative path: Mathematics 60% AND Accounting 70% also satisfies the Mathematics requirement — not modelled (schema does not support an AND-combination across two subjects as a single alternative). Presented in English and Afrikaans (separate first-year groups).',
    },
    careers: [
      'Chartered Accountant CA(SA) (via SAICA/IRBA path)',
      'Auditor',
      'Management accountant',
      'Tax consultant',
    ],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-INTERNATIONAL-BUSINESS',
    universityId: 'su',
    name: 'BCom (International Business)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 80 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // Home Language
        { subject: 'english', status: 'alternative', minPercentage: 80, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Strict selection programme with set criteria to progress each year; a limited number of students selected via a special selection process. Third year includes an international exchange semester. Language of instruction is English.',
    },
    careers: [
      'Marketing manager',
      'Financial manager',
      'Entrepreneur',
      'Innovation manager (international firms)',
    ],
  },
  {
    qualificationCode: 'SU-EMS-BDATSCI',
    universityId: 'su',
    name: 'Bachelor of Data Science (BDatSci) — Geoinformatics / Analytics and Optimisation / Behavioural Economics / Statistical Learning',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 80 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // Home Language
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 75, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 75, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Interfaculty programme. This entry covers the focal areas named in the Economic and Management Sciences section of the prospectus: Geoinformatics, Analytics and Optimisation, Behavioural Economics, Statistical Learning. See also the Agrisciences and Science faculty BDatSci entries — identical admission requirements throughout.',
    },
    careers: [
      'Data scientist',
      'Business intelligence developer',
      'Operations researcher',
      'Behavioural economist',
    ],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-MANAGEMENT-ACCOUNTING',
    universityId: 'su',
    name: 'BCom (Management Accounting)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
    },
    careers: ['Chartered management accountant (CIMA)'],
  },
  {
    qualificationCode: 'SU-EMS-BCOM-FINANCIAL-ACCOUNTING',
    universityId: 'su',
    name: 'BCom (Financial Accounting)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Economic and Management Sciences',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 70, altGroup: 'language' }, // First Additional Language
      ],
    },
    careers: ['Chartered certified accountant (ACCA)'],
  },
];

// ─── FACULTY OF EDUCATION ────────────────────────────────────────────────────

export const SU_EDUCATION_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'SU-EDU-BED-FOUNDATION-PHASE',
    universityId: 'su',
    name: 'BEd (Foundation Phase Education)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { withMathematics: 60, withMathematicalLiteracy: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'alternative', minPercentage: 40, altGroup: 'maths' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minPercentage: 60,
          altGroup: 'maths',
        },
        { subject: 'homeLanguage', status: 'required', minPercentage: 60 },
      ],
      note: 'Language requirement branches by medium of instruction: taught in English -> English HL 60% + (Afrikaans OR isiXhosa, HL or FAL) 50%; taught in Afrikaans -> Afrikaans HL 60% + (English OR isiXhosa) 50%; taught in isiXhosa -> isiXhosa HL 60% + (English OR Afrikaans) 50%. isiXhosa has no dedicated SubjectKey in this schema, so only the generic homeLanguage 60% floor is modelled; the second-language alternative is not modelled. 125 places in the programme.',
    },
    careers: ['Teacher (Grades R-3)'],
  },
  {
    qualificationCode: 'SU-EDU-BED-INTERMEDIATE-PHASE',
    universityId: 'su',
    name: 'BEd (Intermediate Phase Education)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Education',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { withMathematics: 60, withMathematicalLiteracy: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'alternative', minPercentage: 40, altGroup: 'maths' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minPercentage: 60,
          altGroup: 'maths',
        },
        { subject: 'homeLanguage', status: 'required', minPercentage: 60 },
      ],
      note: 'Same medium-of-instruction language branching as BEd (Foundation Phase) — see that entry’s note. Mathematics (Ed) is compulsory in first year (pass with 60% average); two further teaching modules chosen from Life Skills, Natural Sciences (Ed) (requires Life Sciences or Physical Sciences 50%), Social Sciences (Ed) (requires History or Geography 50%). 125 places in the programme.',
    },
    careers: ['Teacher (Grades 4-7, two subjects + two languages)'],
  },
];

// ─── FACULTY OF LAW ──────────────────────────────────────────────────────────

export const SU_LAW_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'SU-LAW-BCOM-LAW',
    universityId: 'su',
    name: 'BCom (Law)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Law',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 70 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'alternative', minPercentage: 60, altGroup: 'language' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minPercentage: 70,
          altGroup: 'language',
        },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
      ],
      note: '80 places in the programme. Interfaculty (Law + Economic and Management Sciences). Write the NBTs AQL and MAT before 31 July.',
    },
    additionalRequirements: ['NBT'],
    careers: [
      'Commercial law',
      'Business world (entry route to the 2-year LLB for practising attorney/advocate)',
    ],
  },
  {
    qualificationCode: 'SU-LAW-BACCLLB',
    universityId: 'su',
    name: 'BAccLLB',
    qualificationType: 'degree',
    durationYears: 5,
    faculty: 'Law',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 80 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'alternative', minPercentage: 60, altGroup: 'language' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minPercentage: 70,
          altGroup: 'language',
        },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: '35 places in the programme. Interfaculty (Law + Economic and Management Sciences). Write the NBTs AQL and MAT before 31 July. Alternative Mathematics path: Mathematics 60% AND Accounting 70% (AND-combination not modelled). Selection based on final Grade 11 (or Grade 12) results and NBT results in an 80:20 ratio.',
    },
    additionalRequirements: ['NBT'],
    careers: [
      'Legal practitioner (attorney/advocate)',
      'Chartered accountant (via postgraduate route)',
    ],
  },
  {
    qualificationCode: 'SU-LAW-LLB-FOUR-YEAR',
    universityId: 'su',
    name: 'LLB (four-year)',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Law',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 70 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'alternative', minPercentage: 60, altGroup: 'language' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minPercentage: 70,
          altGroup: 'language',
        },
      ],
      note: '120 places in the programme. Write the NBT AQL before 31 July. If taking Economics as a university subject: also Mathematics 60%.',
    },
    additionalRequirements: ['NBT'],
    careers: [
      'Legal practitioner (attorney/advocate)',
      'Judge/Magistrate',
      'Public Prosecutor',
      'Legal advisor',
      'Compliance manager',
    ],
    note: 'A related "LLB (three-year)" route exists but is a second bachelor’s degree pathway for existing graduates (selection based on a 60% aggregate in the prior degree, not NSC results) — out of scope for an NSC/matric-based applicant flow and omitted here.',
  },
  {
    qualificationCode: 'SU-LAW-BA-LAW',
    universityId: 'su',
    name: 'BA (Law)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Law',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 70 },
      subjectRequirements: [
        { subject: 'homeLanguage', status: 'alternative', minPercentage: 60, altGroup: 'language' },
        {
          subject: 'additionalLanguage',
          status: 'alternative',
          minPercentage: 70,
          altGroup: 'language',
        },
      ],
      note: '55 places in the programme. Interfaculty (Law + Arts and Social Sciences). Write the NBT AQL before 31 July. If taking Economics as a university subject: also Mathematics 60%.',
    },
    additionalRequirements: ['NBT'],
    careers: ['Entry route to the 2-year LLB for practising attorney/advocate'],
  },
];

// ─── FACULTY OF MEDICINE AND HEALTH SCIENCES ────────────────────────────────

export const SU_MEDICINE_HEALTH_SCIENCES_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'SU-MED-BOCC-THER',
    universityId: 'su',
    name: 'Bachelor of Occupational Therapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Medicine and Health Sciences',
    campus: ['Tygerberg'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 50 },
        { subject: 'lifeScience', status: 'required', minPercentage: 50 },
      ],
      note: '~50 candidates selected annually. Selection also weighs non-academic merit per the Faculty’s selection guidelines.',
    },
    careers: ['Occupational Therapist (HPCSA, after a year of community service)'],
  },
  {
    qualificationCode: 'SU-MED-BSC-PHYSIOTHERAPY',
    universityId: 'su',
    name: 'BSc in Physiotherapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Medicine and Health Sciences',
    campus: ['Tygerberg'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: '~55 candidates selected annually.',
    },
    careers: ['Physiotherapist (HPCSA, after a year of community service)'],
  },
  {
    qualificationCode: 'SU-MED-BSLHT',
    universityId: 'su',
    name: 'Bachelor of Speech-Language and Hearing Therapy',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Medicine and Health Sciences',
    campus: ['Tygerberg'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 50 },
        {
          subject: 'physicalScience',
          status: 'alternative',
          minPercentage: 50,
          altGroup: 'science',
        },
        { subject: 'lifeScience', status: 'alternative', minPercentage: 60, altGroup: 'science' },
      ],
      note: '~30 candidates selected annually. Also requires at least TWO of English/Afrikaans/a third South African language (Home Language or First Additional Language) at 60% each — not separately modelled (schema has no "any 2 of N languages" construct).',
    },
    careers: ['Speech-Language Therapist (HPCSA, after a year of community service)'],
  },
  {
    qualificationCode: 'SU-MED-MBCHB',
    universityId: 'su',
    name: 'MBChB',
    qualificationType: 'degree',
    durationYears: 6,
    faculty: 'Medicine and Health Sciences',
    campus: ['Tygerberg'],
    admission: {
      apsMinimum: { default: 75 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'lifeScience', status: 'required', minPercentage: 50 },
      ],
      note: '~280 candidates selected annually. Selection also weighs academic and non-academic merit per category (current Grade 12, recent school leavers, registered SU students only for MBChB, or applicants with tertiary qualifications/work experience).',
    },
    careers: [
      'Independent Medical Practitioner (HPCSA, after 2-year internship + community service year)',
    ],
  },
  {
    qualificationCode: 'SU-MED-BNURS',
    universityId: 'su',
    name: 'Bachelor of Nursing',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Medicine and Health Sciences',
    campus: ['Tygerberg'],
    admission: {
      apsMinimum: { withMathematics: 60, withMathematicalLiteracy: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'alternative', minPercentage: 40, altGroup: 'maths' },
        {
          subject: 'mathematicalLiteracy',
          status: 'alternative',
          minPercentage: 70,
          altGroup: 'maths',
        },
        { subject: 'lifeScience', status: 'required', minPercentage: 50 },
      ],
      note: '~50 candidates selected annually.',
    },
    careers: ['Nurse and Midwife (SANC, after a year of community service)'],
  },
  {
    qualificationCode: 'SU-MED-BSC-DIETETICS',
    universityId: 'su',
    name: 'BSc in Dietetics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Medicine and Health Sciences',
    campus: ['Tygerberg'],
    admission: {
      apsMinimum: { default: 60 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 50 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'lifeScience', status: 'required', minPercentage: 50 },
      ],
      note: '~35 candidates selected annually.',
    },
    careers: ['Dietitian (HPCSA, after a year of community service)'],
  },
];

// ─── FACULTY OF SCIENCE ──────────────────────────────────────────────────────

export const SU_SCIENCE_PROGRAMMES: Programme[] = [
  {
    qualificationCode: 'SU-SCI-BSC-BIODIVERSITY-ECOLOGY',
    universityId: 'su',
    name: 'BSc Biodiversity and Ecology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
      ],
      note: 'Focal areas: Climate Change Ecology; Plant and Animal Biodiversity; Plants and Microbes. Bare minimum shown — actual Faculty selection uses a weighted Selection Mark (SM) higher than this floor: SM = [(Mathematics x 2) + 5 other subjects incl. at least one English/Afrikaans, excl. LO] / 7 (see faculty-level facultyScoring; not re-derived per programme).',
    },
    careers: [
      'Botanist',
      'Zoologist',
      'Conservation scientist',
      'Forensic scientist',
      'Marine scientist',
      'Ecologist',
    ],
  },
  {
    qualificationCode: 'SU-SCI-BSC-HUMAN-LIFE-SCIENCES',
    universityId: 'su',
    name: 'BSc Human Life Sciences',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: 'Mathematics 60% suffices if taking Mathematics (Bio) and Physics (Bio) as first-year subjects (70% for the standard Mathematics + Physics track). Focal areas: Biology; Biology with Psychology. Actual selection uses the weighted Selection Mark (SM), higher than this bare minimum — see faculty-level facultyScoring.',
    },
    careers: [
      'Forensic scientist',
      'Physiologist',
      'Biomedical scientist',
      'Biochemist',
      'Human geneticist',
      'Nutritionist',
    ],
  },
  {
    qualificationCode: 'SU-SCI-BSC-MOLECULAR-BIO-BIOTECH',
    universityId: 'su',
    name: 'BSc Molecular Biology and Biotechnology',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: 'Mathematics 60% suffices for the Mathematics (Bio)/Physics (Bio) first-year track. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: [
      'Plant biotechnologist',
      'Forensic scientist',
      'Biochemist',
      'Geneticist',
      'Microbiologist',
    ],
  },
  {
    qualificationCode: 'SU-SCI-BSC-SPORT-SCIENCE',
    universityId: 'su',
    name: 'BSc Sport Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
      ],
      note: 'Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: ['Sport coach', 'Sport scientist', 'Sport physiologist', 'Fitness instructor'],
  },
  {
    qualificationCode: 'SU-SCI-BSC-CHEMISTRY',
    universityId: 'su',
    name: 'BSc Chemistry',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: 'Focal areas: Chemistry and Polymer Science; Chemical Biology; Applied and Sustainable Chemistry; Chemistry with Chemical Engineering. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: [
      'Research scientist',
      'Analytical chemist',
      'Toxicologist',
      'Environmental scientist',
      'Forensic analyst',
    ],
  },
  {
    qualificationCode: 'SU-SCI-BSC-EARTH-SCIENCE',
    universityId: 'su',
    name: 'BSc Earth Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: 'Mathematics 60% suffices for the Mathematics (Bio)/Physics (Bio) first-year track. Focal areas: Applied Earth Science; Geo-environmental Science. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: [
      'Environmental consultant',
      'Geologist',
      'Geophysicist',
      'Seismologist',
      'Mining geologist',
    ],
  },
  {
    qualificationCode: 'SU-SCI-BSC-GEOINFORMATICS',
    universityId: 'su',
    name: 'BSc GeoInformatics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 60 },
      ],
      note: 'Mathematics rises to 70% if choosing Computer Science as a university subject. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: [
      'GIS technician',
      'Remote sensing specialist',
      'Cartographer',
      'Geospatial software engineer',
      'Meteorologist',
    ],
  },
  {
    qualificationCode: 'SU-SCI-BSC-PHYSICS',
    universityId: 'su',
    name: 'BSc Physics',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: 'Focal areas: Laser Physics (Physical); Laser Physics (Biological); Theoretical Physics. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: [
      'Medical physicist',
      'Nanotechnologist',
      'Geophysicist',
      'Data analyst',
      'Astrophysicist',
    ],
  },
  {
    qualificationCode: 'SU-SCI-BSC-MATHEMATICAL-SCIENCES',
    universityId: 'su',
    name: 'BSc Mathematical Sciences',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: 'Physical Sciences 50% required only if taking Chemistry or Physics as a university subject — not modelled as an unconditional gate. Focal areas: Applied Mathematics; Mathematics; Operations Research. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: [
      'Actuarial analyst',
      'Quantitative analyst',
      'Mathematics teacher',
      'Operations researcher',
    ],
  },
  {
    qualificationCode: 'SU-SCI-BSC-COMPUTER-SCIENCE',
    universityId: 'su',
    name: 'BSc Computer Science',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
      ],
      note: 'Physical Sciences 50% required only if taking Chemistry or Physics as a university subject — not modelled as an unconditional gate. Focal areas: General Computer Science; Computer Systems; Data Science. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: [
      'Software developer',
      'Data scientist',
      'Computer systems analyst',
      'Database administrator',
    ],
  },
  {
    qualificationCode: 'SU-SCI-BSC-INTERDISCIPLINARY',
    universityId: 'su',
    name: 'BSc (Interdisciplinary Programmes)',
    qualificationType: 'degree',
    durationYears: 3,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 65 },
      subjectRequirements: [
        { subject: 'english', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 50, altGroup: 'language' },
        { subject: 'mathematics', status: 'required', minPercentage: 70 },
        { subject: 'physicalScience', status: 'required', minPercentage: 50 },
      ],
      note: 'Focal areas: Biomedical Mathematical Sciences; Applied Medicinal Chemistry; Bioinformatics and Computational Biology; Biomathematics. Actual selection uses the weighted Selection Mark (SM) — see faculty-level facultyScoring.',
    },
    careers: [
      'Medical scientist',
      'Bioinformatician',
      'Pharmaceutical scientist',
      'Biomedical engineer',
    ],
  },
  {
    qualificationCode: 'SU-SCI-BDATSCI',
    universityId: 'su',
    name: 'Bachelor of Data Science (BDatSci) — Computer Science / Applied Mathematics / Statistical Physics',
    qualificationType: 'degree',
    durationYears: 4,
    faculty: 'Science',
    campus: ['Stellenbosch'],
    admission: {
      apsMinimum: { default: 80 },
      subjectRequirements: [
        { subject: 'mathematics', status: 'required', minPercentage: 80 },
        { subject: 'afrikaans', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // Home Language
        { subject: 'english', status: 'alternative', minPercentage: 60, altGroup: 'language' }, // Home Language
        { subject: 'afrikaans', status: 'alternative', minPercentage: 75, altGroup: 'language' }, // First Additional Language
        { subject: 'english', status: 'alternative', minPercentage: 75, altGroup: 'language' }, // First Additional Language
      ],
      note: 'Interfaculty programme. This entry covers the focal areas named in the Science section: Computer Science, Applied Mathematics, Statistical Physics. See also the Agrisciences and Economic and Management Sciences faculty BDatSci entries — identical admission requirements throughout.',
    },
    careers: [
      'Data scientist',
      'Machine learning engineer',
      'Applications architect',
      'Statistician',
    ],
  },
];

export const SU: University = {
  id: 'su',
  name: 'Stellenbosch University',
  shortName: 'SU',
  logoUrl: '/logos/su.png',
  applicationSystem: 'Custom portal',
  applicationFee: 100,
  feeNote:
    'UNCONFIRMED against the sourced 2027 prospectus text (which did not include a general application-fee page) — carried over from prior data. Verify via www.maties.com before relying on this figure.',
  maxChoices: 1,
  choicesRanked: false,
  choicesIndependent: true,
  choicesFinal: true,
  apsRule: {
    method: 'custom',
    subjectsCounted: 6,
    includesLifeOrientation: false,
    scale: 'percentage_average',
    note: 'Base "aggregate" = average percentage across ALL NSC subjects, excluding Life Orientation (not a sum). All programmes are selection programmes — meeting the minimum does not guarantee admission.',
    facultyScoring: [
      {
        faculty: 'Science',
        scoreName: 'Selection Mark (SM)',
        scoreMax: 100,
        transform:
          'SM = [(Mathematics % x 2) + 5 other subjects % (excl. Life Orientation, at least one must be English or Afrikaans)] / 7. Selection uses SM, which is a higher threshold than the bare-minimum aggregate published per programme.',
        usesNBT: false,
        note: 'Grade 11 marks used for current Grade 12 learners; final Grade 12 marks used once available. Full selection criteria: "Faculty of Science admission and selection guidelines" at www.maties.com.',
      },
      {
        faculty: 'Law',
        scoreName: 'Weighted selection (academic + NBT)',
        scoreMax: 100,
        transform:
          'BAccLLB selection uses Grade 11 (or final Grade 12) results and NBT results in an 80:20 ratio. Other Law degrees select by academic + non-academic merit per the faculty guidelines.',
        usesNBT: true,
        note: 'NBTs (AQL, and MAT for BCom(Law)/BAccLLB) must be written before 31 July. NBTs are NOT modelled by this platform (out of scope) — the plain aggregate/subject minimums are used as apsMinimum.',
      },
    ],
  },
  applicationsOpen: '2026',
  defaultClosingDate: '2026-06-30T23:59:00+02:00',
  applyUrl: 'https://www.maties.com/application',
  notes: [
    'NBTs are NOT required for 2027 admission at SU except for all Faculty of Law programmes (and narrow exceptions not relevant to NSC applicants: School of Tomorrow, American High School Diploma, online schools) — the inverse of UCT/UP, where NBTs are near-universal.',
    'All programmes are selection programmes: SU receives more applications than places available, so meeting the minimum admission requirements does not guarantee admission — actual selection thresholds (especially in Science) run higher than the published floor.',
    'Most programmes accept English OR Afrikaans (Home or First Additional Language) at a stated percentage — modelled as an alternative subject-requirement group.',
    "A second-degree LLB (three-year) route for existing bachelor's graduates, and postgraduate-entry qualifications (PGCE, Advanced Diploma in Practical Music), are out of scope for this platform's NSC/matric-results applicant model and are not included below.",
  ],
  programmes: [
    ...SU_AGRISCIENCES_PROGRAMMES,
    ...SU_ARTS_SOCIAL_SCIENCES_PROGRAMMES,
    ...SU_ECONOMIC_MANAGEMENT_PROGRAMMES,
    ...SU_EDUCATION_PROGRAMMES,
    ...SU_LAW_PROGRAMMES,
    ...SU_MEDICINE_HEALTH_SCIENCES_PROGRAMMES,
    ...SU_SCIENCE_PROGRAMMES,
  ],
  type: 'traditional',
  city: 'Stellenbosch',
  province: 'western_cape',
  website: 'https://www.sun.ac.za',
  applicationPortal: 'https://www.maties.com/application',
};
