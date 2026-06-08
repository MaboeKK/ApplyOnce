# ApplyOnce — University & Programme Admission Schema

**Purpose.** This is the data contract that powers APS calculation, the qualify/reach/match/safety check, and the application builder. Claude CLI should build the matching engine against these types and seed the constants file from the worked examples below.

**Design principles**
- Programme data lives in the seed/constants file, served read-only (per earlier decision). Universities and admins live in the DB; programmes do **not** need DB tables.
- **APS is per-university, not global.** Two real prospectuses already disagree (UJ counts 6 subjects excluding Life Orientation; Wits counts 7 including it). So we store each student's *raw marks once* and compute a *separate APS per university* using that university's rule.
- **A programme's entry is a rule, not a number.** Minimum APS can branch by which maths the student took, and each subject carries its own minimum rating and acceptance status.
- **More universities will be added.** UJ and Wits below are the first two reference institutions. Adding a university = one new `University` object + its `Programme[]`. The engine must not hard-code anything UJ- or Wits-specific.

---

## Shared reference: the NSC 7-point rating scale

Used to convert a subject percentage to a rating (1–7). This is the standard scale; a university's `apsRule` says how the ratings are then summed.

| Rating | Percentage |
|---|---|
| 7 | 80–100% |
| 6 | 70–79% |
| 5 | 60–69% |
| 4 | 50–59% |
| 3 | 40–49% |
| 2 | 30–39% |
| 1 | 0–29% |

---

## Type definitions (TypeScript)

```typescript
// ── Subjects & ratings ───────────────────────────────────────────────
export type SubjectKey =
  | "english"
  | "homeLanguage"          // generic "language of teaching/learning"
  | "additionalLanguage"
  | "afrikaans" | "isiZulu" | "sepedi"     // specific languages where named
  | "mathematics"
  | "mathematicalLiteracy"
  | "technicalMathematics"
  | "physicalScience"
  | "technicalScience"
  | "lifeScience"
  | "geography"
  | "accounting"
  | "lifeOrientation";      // captured but usually excluded from APS

export type Rating = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// ── How a university computes APS ────────────────────────────────────
export interface ApsRule {
  method: "standard_aps" | "composite_index" | "custom";
  subjectsCounted: number;            // UJ = 6, Wits = 7
  includesLifeOrientation: boolean;   // UJ = false, Wits = true
  scale: "nsc_7point";
  bonusPoints?: string;               // describe if the uni adds any
  note?: string;                      // e.g. faculties that use a different method
}

// ── University ───────────────────────────────────────────────────────
export interface University {
  id: string;                 // slug, e.g. "uj", "wits"
  name: string;
  shortName: string;
  applicationSystem: string;  // "Custom portal" | "CAO" | "PeopleSoft" | ...
  applicationFee: number;     // ZAR. 0 = free (still attracts the flat service fee)
  feeNote?: string;
  maxChoices: number;         // UJ = 2, Wits = 3
  choicesRanked: boolean;     // does the student order them by preference?
  choicesIndependent: boolean;// each judged on its own merits?
  choicesFinal: boolean;      // can't be amended once submitted/processed?
  apsRule: ApsRule;
  applicationsOpen?: string;  // ISO date (month-level ok)
  defaultClosingDate: string; // ISO datetime; a programme may override this
  applyUrl: string;
  notes?: string[];
}

// ── Programme ────────────────────────────────────────────────────────
export type QualificationType =
  | "degree" | "extended_degree"
  | "diploma" | "extended_diploma"
  | "online";

export interface Programme {
  qualificationCode: string;  // PRIMARY KEY, e.g. "B8BA3Q" (already unique in prospectuses)
  universityId: string;
  name: string;
  qualificationType: QualificationType;
  durationYears: number;
  faculty: string;
  campus: string[];           // per-programme (UJ: APK/APB/DFC/SWC)
  admission: AdmissionRule;
  closingDateOverride?: string;     // ISO datetime if it differs from the university default
  additionalRequirements?: string[];// ["NBT", "portfolio", "audition", "interview", ...] — FLAG ONLY
  firstTimeEntrantsOnly?: boolean;  // extended/ECP programmes
  careers?: string[];
  note?: string;
}

// ── The admission rule (the core) ────────────────────────────────────
export interface AdmissionRule {
  apsMinimum: ApsMinimum;
  subjectRequirements: SubjectRequirement[];
  waitlistBand?: WaitlistBand;      // Wits-style; omit when a uni has none
  note?: string;
}

export interface ApsMinimum {
  // Use the branch matching the student's maths subject.
  // If only `default` is set, the minimum does NOT depend on maths type.
  default?: number;
  withMathematics?: number;
  withMathematicalLiteracy?: number;
  withTechnicalMathematics?: number;
}

export type SubjectStatus =
  | "required"        // must be present at minRating
  | "alternative"     // one of an altGroup must be satisfied
  | "not_accepted"    // taking this subject does NOT satisfy the requirement / disqualifies the path
  | "not_applicable"; // irrelevant to this programme

export interface SubjectRequirement {
  subject: SubjectKey;
  status: SubjectStatus;
  minRating?: Rating;             // required level on the 1–7 scale
  homeLanguageRating?: Rating;    // when a language differs Home vs Additional
  additionalLanguageRating?: Rating;
  altGroup?: string;              // subjects sharing a group are alternatives (satisfy ONE)
}

export interface WaitlistBand {
  apsRange: [number, number];     // inclusive, e.g. [35, 37]
  conditions: string[];           // extra conditions, human-readable
}
```

---

## Worked example 1 — University of Johannesburg (UJ)

```typescript
export const UJ: University = {
  id: "uj",
  name: "University of Johannesburg",
  shortName: "UJ",
  applicationSystem: "Custom portal",
  applicationFee: 0,
  feeNote: "No application fee for online or paper applications. The flat ApplyOnce service fee still applies.",
  maxChoices: 2,
  choicesRanked: false,
  choicesIndependent: true,
  choicesFinal: true,            // "no amendments once the application is processed"
  apsRule: {
    method: "standard_aps",
    subjectsCounted: 6,
    includesLifeOrientation: false,
    scale: "nsc_7point",
    note: "Six best subjects, Life Orientation excluded. UJ ranks all applicants by APS in January and selects down to capacity.",
  },
  applicationsOpen: "2026-04",
  defaultClosingDate: "2026-10-31T12:00:00+02:00",
  applyUrl: "https://www.uj.ac.za/Apply",
  notes: [
    "Meeting the minimum does not guarantee a place (capacity-ranked).",
    "Provisional admission on final Grade 11; final admission on final Grade 12.",
  ],
};

export const UJ_PROGRAMMES: Programme[] = [
  // Flat APS, hard subject gates
  {
    qualificationCode: "B8BA3Q",
    universityId: "uj",
    name: "Bachelor of Architecture",
    qualificationType: "degree",
    durationYears: 3,
    faculty: "Art, Design and Architecture",
    campus: ["APB"],
    admission: {
      apsMinimum: { default: 30 },
      subjectRequirements: [
        { subject: "english", status: "required", minRating: 5 },
        { subject: "mathematics", status: "required", minRating: 5 },
        { subject: "mathematicalLiteracy", status: "not_accepted" },
        { subject: "technicalMathematics", status: "not_accepted" },
      ],
    },
    careers: ["Architectural professional"],
  },

  // Conditional APS (branches by maths type) + maths/maths-lit alternatives
  {
    qualificationCode: "B8CD2Q",
    universityId: "uj",
    name: "BA (Communication Design)",
    qualificationType: "degree",
    durationYears: 3,
    faculty: "Art, Design and Architecture",
    campus: ["APB"],
    admission: {
      apsMinimum: { withMathematics: 25, withMathematicalLiteracy: 26 },
      subjectRequirements: [
        { subject: "english", status: "required", minRating: 5 },
        { subject: "mathematics", status: "alternative", minRating: 3, altGroup: "maths" },
        { subject: "mathematicalLiteracy", status: "alternative", minRating: 4, altGroup: "maths" },
        { subject: "technicalMathematics", status: "not_accepted" },
      ],
    },
    careers: ["Communication Designer"],
  },

  // Maths-ONLY gate + dual-language requirement
  {
    qualificationCode: "B4C01Q",
    universityId: "uj",
    name: "BCom (Law)",
    qualificationType: "degree",
    durationYears: 3,
    faculty: "Law",
    campus: ["APK"],
    admission: {
      apsMinimum: { withMathematics: 31 },     // Mathematics ONLY
      subjectRequirements: [
        { subject: "english", status: "required", minRating: 5 },
        { subject: "additionalLanguage", status: "required", minRating: 4 },
        { subject: "mathematics", status: "required", minRating: 4 },
        { subject: "mathematicalLiteracy", status: "not_accepted" },
      ],
      note: "Faculty of Law does not accept NCV, NASCA or ASC.",
    },
    careers: ["Legal Advisor", "Career in Commerce"],
  },

  // High-APS reach example (Faculty of Science: Tech Maths/Science not accepted for degrees)
  {
    qualificationCode: "B2M52Q",
    universityId: "uj",
    name: "BSc Actuarial Science",
    qualificationType: "degree",
    durationYears: 3,
    faculty: "Science",
    campus: ["APK"],
    admission: {
      apsMinimum: { default: 40 },
      subjectRequirements: [
        { subject: "english", status: "required", minRating: 5 },
        { subject: "mathematics", status: "required", minRating: 7 },
        { subject: "technicalMathematics", status: "not_accepted" },
        { subject: "technicalScience", status: "not_accepted" },
      ],
    },
    careers: ["Actuary", "Quantitative Analyst", "Risk Manager"],
  },

  // Extended programme — safety-tier example, first-time entrants only
  {
    qualificationCode: "D34PEQ",
    universityId: "uj",
    name: "Extended Diploma in People Management",
    qualificationType: "extended_diploma",
    durationYears: 4,
    faculty: "College of Business and Economics",
    campus: ["SWC"],
    firstTimeEntrantsOnly: true,
    admission: {
      apsMinimum: { withMathematics: 19, withMathematicalLiteracy: 21 },
      subjectRequirements: [
        { subject: "english", status: "required", minRating: 4 },
        { subject: "mathematics", status: "alternative", minRating: 3, altGroup: "maths" },
        { subject: "mathematicalLiteracy", status: "alternative", minRating: 4, altGroup: "maths" },
      ],
    },
    careers: ["People Management Practitioner", "HR Officer"],
  },
];
```

---

## Worked example 2 — University of the Witwatersrand (Wits)

Wits is the contrast case: it charges a fee, allows 3 choices, computes APS over 7 subjects **including** Life Orientation, has **per-programme closing dates**, and exposes explicit **wait-list bands**.

```typescript
export const WITS: University = {
  id: "wits",
  name: "University of the Witwatersrand",
  shortName: "Wits",
  applicationSystem: "Custom portal",
  applicationFee: 100,
  feeNote: "R100 flat for all applicants.",
  maxChoices: 3,
  choicesRanked: false,          // "order of choice does not matter; Wits does not rank applications"
  choicesIndependent: true,      // "each choice considered individually; one outcome doesn't affect another"
  choicesFinal: false,           // some programmes allow amending the choice
  apsRule: {
    method: "standard_aps",
    subjectsCounted: 7,
    includesLifeOrientation: true,
    scale: "nsc_7point",
    note: "Best 7 subjects INCLUDING Life Orientation. Faculty of Health Sciences uses a Composite Index (school results + NBT), NOT plain APS — see out-of-scope notes.",
  },
  applicationsOpen: "2026", // main cycle; BA also has a July intake (opens 1 Mar, closes 31 May)
  defaultClosingDate: "2026-09-30T23:59:00+02:00",
  applyUrl: "https://www.wits.ac.za/applications",
  notes: [
    "Closing dates VARY by programme — see closingDateOverride.",
    "30 June 2026 group: all Health Sciences programmes, Bachelor of Architectural Studies, Bachelor of Audiology, Bachelor of Speech-Language Pathology, BA Film and Television.",
    "Wait-listing is part of selection; meeting the minimum may mean wait-list, not accept.",
  ],
};

export const WITS_PROGRAMMES: Programme[] = [
  // Standard threshold + wait-list band (Wits pattern)
  {
    qualificationCode: "CBA00",
    universityId: "wits",
    name: "Bachelor of Commerce (General)",
    qualificationType: "degree",
    durationYears: 3,
    faculty: "Commerce, Law and Management",
    campus: ["Braamfontein"],
    admission: {
      apsMinimum: { default: 38 },
      subjectRequirements: [
        // English: Home OR First Additional, both at Level 5
        { subject: "english", status: "required", homeLanguageRating: 5, additionalLanguageRating: 5 },
        { subject: "mathematics", status: "required", minRating: 5 },
      ],
      waitlistBand: {
        apsRange: [35, 37],
        conditions: ["English Level 5", "Mathematics Level 5", "subject to available places"],
      },
    },
    careers: ["Professional Accountant", "Management Consultant"],
  },

  // Dual-maths alternative + higher English at Home/Additional + wait-list
  {
    qualificationCode: "WITS-LLB",   // confirm official code from portal
    universityId: "wits",
    name: "Bachelor of Laws (LLB)",
    qualificationType: "degree",
    durationYears: 4,
    faculty: "Commerce, Law and Management",
    campus: ["Braamfontein"],
    additionalRequirements: ["NBT"],
    admission: {
      apsMinimum: { default: 46 },
      subjectRequirements: [
        { subject: "english", status: "required", homeLanguageRating: 6, additionalLanguageRating: 6 },
        { subject: "mathematics", status: "alternative", minRating: 5, altGroup: "maths" },
        { subject: "mathematicalLiteracy", status: "alternative", minRating: 6, altGroup: "maths" },
      ],
      waitlistBand: {
        apsRange: [40, 45],
        conditions: ["English Level 6"],
      },
    },
    careers: ["Advocate", "Attorney", "Legal Advisor"],
  },

  // Closing-date override + additional requirement — APS still to confirm from full prospectus
  {
    qualificationCode: "WITS-BAS",   // confirm official code
    universityId: "wits",
    name: "Bachelor of Architectural Studies",
    qualificationType: "degree",
    durationYears: 3,
    faculty: "Engineering and the Built Environment",
    campus: ["Braamfontein"],
    closingDateOverride: "2026-06-30T23:59:00+02:00",   // earlier than the 30 Sept default
    additionalRequirements: ["portfolio"],
    admission: {
      apsMinimum: { default: 0 },   // TODO: confirm exact APS minimum from the full prospectus
      subjectRequirements: [],      // TODO: confirm subject requirements
      note: "Placeholder — populate APS and subjects from the prospectus before going live.",
    },
  },
];
```

---

## Notes for the matching engine (and what's out of scope)

**Matching flow**
1. Capture the student's raw marks once: each subject → percentage → `Rating` via the NSC 7-point scale.
2. For each university, compute APS using **that university's** `apsRule` (`subjectsCounted`, `includesLifeOrientation`).
3. For each programme, evaluate `admission`:
   - Pick the `apsMinimum` branch matching the student's maths subject (`withMathematics` / `withMathematicalLiteracy` / `withTechnicalMathematics`), else `default`.
   - Check every `subjectRequirement`: `required` must be met at `minRating`; an `altGroup` is satisfied if **any one** member is met; `not_accepted` fails that path if that's the only maths the student has.
   - Result = **qualifies** / **wait-list band** (if `waitlistBand` and APS falls in range with conditions) / **below minimum**.
4. Wording: show "you meet the minimum" — never "you'll get in." Capacity ranking and wait-listing mean minimums don't guarantee a place.

**Reach / match / safety** is computed from the gap between the student's (per-university) APS and the programme's `apsMinimum`; any `extended_*` / first-time-only programme counts as **safety**.

**Out of scope for MVP (flag, don't handle)**
- Alternative qualification streams: NCV, NASCA, SC(a), and international certificates (Cambridge, IB, etc.). MVP targets NSC/IEB matric holders.
- `additionalRequirements` (NBT, portfolio, audition, interview, fitness/medical assessments): surface them to the student as "this programme needs more than an application," but don't manage them.
- **Composite-index programmes** (e.g. Wits Health Sciences): mark them clearly as "this faculty uses a composite index — we can't auto-check eligibility yet" rather than forcing an APS match.
- Multiple intakes (e.g. Wits BA July intake): note only; single main-cycle intake for MVP.

**Adding more universities** is purely additive: a new `University` object + its `Programme[]`, populated from that institution's prospectus. The engine reads `apsRule`, `maxChoices`, dates, and per-programme rules generically — nothing about UJ or Wits is special-cased.
