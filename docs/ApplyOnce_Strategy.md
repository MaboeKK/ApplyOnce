# ApplyOnce — Product Concept & Strategy Document

**Version:** 1.0 | **Date:** May 2026 | **Status:** Confidential — Founder Use Only

---

## 1. Executive Summary

ApplyOnce is a proposed South African mobile application that enables matric students and post-matric applicants to apply to multiple universities through a single, unified platform. Instead of creating separate accounts, uploading documents multiple times, and navigating different portals for each institution, a student registers once, builds a single profile, and submits applications to all participating universities from one place.

South Africa has 26 public universities, each with its own application portal, different required fields, separate fee payment systems, and distinct deadlines. A student applying to five universities currently needs five separate accounts, five logins, five document uploads, and five fee payments. ApplyOnce eliminates this friction entirely.

**Core Value Proposition:** One profile. One document vault. One payment flow. Applications to all participating universities — submitted simultaneously.

The government's Central Application Service (CAS), launched as a pilot in 2026, is not a competitor. CAS functions as a clearing house for leftover spaces after the main application cycle. ApplyOnce is a proactive, student-driven application platform used before and during the main cycle — solving a completely different problem.

---

## 2. The Problem

### 2.1 The Current Application Reality

Every year, hundreds of thousands of South African matric students and past matriculants apply to universities. The process is fragmented, stressful, and unnecessarily complicated.

| Step | Current Reality | Cost |
|---|---|---|
| Research universities | Visit each university website separately | Hours of browsing |
| Check APS requirements | Calculate manually per university | Manual, error-prone |
| Create accounts | Separate account per university | 5+ accounts for 5 unis |
| Upload documents | Re-upload ID, results, certificates each time | Repeated effort |
| Pay application fees | Separate payment per university | R100–R250 each time |
| Track applications | Check each portal separately | No unified view |
| Receive offers | Different channels per university | Easy to miss offers |

### 2.2 Why This Has Not Been Solved

South Africa's university system was built in racial silos under apartheid. Historically white universities (English and Afrikaans), Black universities, and so-called 'coloured' institutions each developed independently with different cultures, systems, and funding levels. Post-1994, these institutions were brought under one national framework but retained their individual systems and autonomy.

Unlike the UK, where universities collectively agreed in 1961 to create a centralised clearing house (which became UCAS by 1993), South African universities have never had a culture of shared infrastructure. Each institution guards its admissions process as a matter of institutional identity and autonomy.

The government's own CAS is described as a pilot project and currently functions only as a clearing house — matching unplaced students with leftover spots after the main cycle closes. The gap is real, confirmed, and unaddressed.

---

## 3. The Solution — ApplyOnce

### 3.1 What ApplyOnce Does

ApplyOnce is a mobile application (Android and iOS) that serves as the single application layer between South African university applicants and all participating institutions.

**The student experience:**
1. Register once with your South African ID number and basic personal details
2. Build your student profile: personal info, matric results (scanned and auto-processed), supporting documents
3. Browse universities and programmes with automatic APS matching
4. Select the universities and programmes you want to apply to
5. Pay a single consolidated fee covering all application fees plus the ApplyOnce service charge
6. Track all application statuses in one dashboard
7. Receive all offers in one place

### 3.2 App Name

The chosen name is **ApplyOnce**. It communicates the core value proposition instantly: you apply to everything, once. Simple, memorable, and accessible to first-generation applicants.

**Alternative names considered:**
- ApplyZA — clear SA branding but less descriptive
- UniHub — clean but generic
- OneApply — similar concept but less distinctive
- VarsityGate — uses SA slang; memorable but narrower appeal

---

## 4. The Market

### 4.1 Target Users

**Primary:** Current Grade 12 (matric) students preparing to apply for undergraduate study
- Approximately 600,000–800,000 matric candidates sit the NSC annually
- A significant portion qualify for and seek university entry

**Secondary:** Post-matric applicants — individuals who completed Grade 12 in a prior year and are applying or re-applying
- Large and often underserved population
- May have updated results or changed career direction

### 4.2 Geographic Scope

National from day one. All 26 South African public universities are the target, with progressive technical rollout starting with willing partner institutions.

### 4.3 Institution Scope

Phase 1: 26 public universities only. TVET colleges, private higher education institutions, and other post-school institutions are out of scope for Phase 1.

---

## 5. Business Model

### 5.1 Revenue Model

ApplyOnce generates revenue through a per-application service fee added on top of each university's standard application fee.

| Element | Description |
|---|---|
| University fee | Collected from student and passed directly to the university (e.g. R200) |
| ApplyOnce service fee | A small fee added per application, retained by ApplyOnce |
| Student pays | University fee + ApplyOnce service fee in a single transaction |
| University receives | Their standard application fee, unchanged |
| ApplyOnce earns | The service fee per application submitted |

**Initial service fee:** R5 per application

**Revenue projection (illustrative):**
- At R5/application × 100,000 applications = R500,000/year
- At R10/application × 100,000 applications = R1,000,000/year
- A student applying to 5 universities pays R25–R50 in total service fees — a compelling value exchange for the convenience offered

### 5.2 Who Pays

The student pays. No charge to universities. No government contract. Fully independent and commercially sustainable.

### 5.3 Payment Infrastructure

A registered payment gateway (PayFast, Peach Payments, or Yoco) will be used. These providers hold the required licensing under the National Payment System Act. ApplyOnce does not need its own payment institution licence.

---

## 6. Technical Architecture

### 6.1 The Core Technical Challenge

Every South African university runs a different application system:
- Oracle PeopleSoft (UCT, UFS, others)
- ITS / i-Enabler (NMU, TUT, VUT)
- CAO system (DUT, UKZN, MUT)
- Custom portals (Wits, UJ, Stellenbosch, UP)

There is no common standard. ApplyOnce becomes the universal interface layer — presenting one clean experience to students while handling translation to each university's required format on the backend.

### 6.2 Student-Facing Features

- Single registration with SA ID verification
- Profile builder: personal details, contact info, next-of-kin
- Document vault: upload once, reuse across all applications
- APS auto-calculator: scan/upload matric results → OCR → APS score → matched to university requirements
- University and course browser: filter by APS, province, field of study
- Application builder: pre-filled from profile; university-specific fields presented clearly
- Consolidated payment: one checkout for all selected applications
- Application tracker: real-time status per university in a single dashboard

### 6.3 University Integration

Formal API agreements with each university's IT department. Each agreement covers:
- Data format and submission standards
- Application fee pass-through arrangements
- System change notification (30–60 days notice required)
- Data protection and POPIA compliance responsibilities
- Volume caps if imposed by the university

Universities that decline integration are either not listed or shown as "Apply Directly" with a link to their own portal.

### 6.4 APS Scanning & Verification

- Phase 1: OCR extraction from uploaded NSC result document → APS calculation → university matching
- Phase 2: Direct DBE/Umalusi API integration for verified result retrieval

### 6.5 Platform Decisions

| Platform | Decision |
|---|---|
| Mobile app (Android + iOS) | Phase 1 — primary platform |
| Web app | Phase 2 |
| WhatsApp integration | Phase 2 |
| USSD | Not planned — document uploads make USSD impractical |

---

## 7. University Relationships

### 7.1 Integration Strategy

Point of contact: IT department (owns the student information system and API). Registrar's office approval required from an admissions policy perspective.

### 7.2 Onboarding Approach

Start with high-volume institutions with known IT capacity. Sign an MOU before going live. MOU covers:
- Data format and submission standards
- Application fee pass-through
- System change notification obligations
- Data protection responsibilities
- Volume caps (if any)

### 7.3 Non-Participating Universities

Simply not integrated on the platform, or listed as "Apply Directly" with a link to their portal. No submissions without a formal agreement.

---

## 8. Data & Compliance

### 8.1 Data Ownership

The student owns their data. ApplyOnce is a data processor and custodian only — holding and using data solely for the purpose of submitting applications as instructed by the student. This must be stated clearly in the Terms of Service and Privacy Policy.

When application data is submitted to a university, that university becomes a separate responsible party under POPIA for the data they receive.

### 8.2 POPIA Compliance Requirements

- Appoint a registered Information Officer with the SA Information Regulator
- Obtain explicit, informed consent from students before collecting and processing data
- Publish a clear Privacy Policy
- Implement the right to erasure — students who delete accounts must have data deleted
- Implement data minimisation — collect only what is necessary
- Notify the Information Regulator and affected students in event of a data breach

### 8.3 Result Verification

Phase 1: uploaded documents treated as applicant-supplied (universities verify independently). Phase 2: DBE/Umalusi integration for verified retrieval.

### 8.4 Data Security

Encrypted storage at rest and in transit, secure authentication, regular security audits, cyber liability insurance.

---

## 9. Competitive Landscape

### 9.1 The Government's CAS — Not a Competitor

| | CAS | ApplyOnce |
|---|---|---|
| What it does | Clearing house for unplaced students after the cycle | Proactive applications before and during the cycle |
| Student role | Passive — profile submitted, institutions contact student | Active — student chooses universities and programmes |
| Status | Pilot project, 2026 | To be built |
| Problem solved | "I have no offers, what now?" | "I want to apply to multiple universities easily" |

### 9.2 Existing Private Solutions

| Platform | What It Does | Limitation |
|---|---|---|
| UniApplyForMe | APS tools, guidance, application support | Does not submit to all universities |
| 4applications.org | Applies for students at 4 institutions for R250 | Only 4 institutions; not scalable |
| CAO (cao.ac.za) | Centralised for KZN universities | Regional only |
| SA Universities app | Info, prospectus, fees, dates | No application submission |

### 9.3 Competitive Moat

- **University API agreements** — months to negotiate; not easily replicated
- **Student data network** — more students = more university incentive to integrate
- **First-mover brand trust** — students are conservative in high-stakes processes
- **APS verification accuracy** — DBE/Umalusi integration creates near-impossible-to-replicate feature
- **Proprietary data** — application volumes, conversion rates, programme popularity over time

---

## 10. Go-to-Market Strategy

### 10.1 Launch Approach

National launch from day one. Progressive university integration rollout. Available on Android (primary SA market share) and iOS.

### 10.2 Marketing Channels

- Social media: TikTok, Instagram, Facebook, X — targeting matric students and parents
- Word of mouth: the convenience is inherently shareable
- School and teacher partnerships: Phase 2
- WhatsApp marketing: high SA penetration among target demographic

### 10.3 Digital Divide Consideration

- App optimised for low-data environments
- WhatsApp integration in Phase 2
- Offline document capture with sync when connected

---

## 11. Legal & Regulatory

### 11.1 Required Actions Before Launch

| Requirement | Details |
|---|---|
| CIPC Registration | Register a Pty Ltd. Required for bank account and university contracts. |
| POPIA Compliance | Information Officer, Privacy Policy, consent flow, data deletion, breach notification. |
| Payment Processing | Use a registered gateway (PayFast/Peach/Yoco). No separate licence needed. |
| Terms of Service | State ApplyOnce is an intermediary, not a university. Cap liability for platform errors. |
| University MOUs | Sign before going live with each integration. |
| Cyber Liability Insurance | Strongly recommended before launch given volume of sensitive data. |

### 11.2 Licensing as an Admissions Intermediary

No specific DHET licence is required to operate as an admissions intermediary. ApplyOnce is a technology platform, not an educational institution. Advisable to notify DHET and establish a working relationship given the CAS initiative.

### 11.3 Liability

Terms of Service must clearly limit liability to the technology service provided. Legal counsel should draft or review ToS before launch.

---

## 12. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Universities refuse API integration | Medium | Start with willing institutions; approach with working prototype |
| Government mandates CAS exclusively | Low | CAS is a clearing house, not a primary application tool |
| Competitor copies the model | Medium | Move fast; lock in university agreements; build brand trust |
| Data breach | Low–Medium | Cyber insurance, modern security, regular audits |
| Low student adoption | Low–Medium | Social media marketing; strong UX; word-of-mouth |
| Payment gateway failure | Low | Use established provider; configure backup gateway |
| DBE/Umalusi integration delayed | High (initially) | Launch with manual upload; automate as Phase 2 |

---

## 13. Next Steps

1. Register the company (Pty Ltd) with CIPC and open a business bank account
2. Engage a lawyer to draft Terms of Service, Privacy Policy, and MOU template
3. Identify and approach 3–5 universities as pilot integration partners
4. Define full technical architecture and choose final stack
5. Build MVP: registration → profile → document vault → APS calculator → one university submission
6. Integrate payment gateway and test fee collection and disbursement
7. Beta test with real matric students before the April–August application season

---

## Appendix A: SA University Application Systems

| University | Application System | Notes |
|---|---|---|
| UCT | Oracle PeopleSoft | Direct portal |
| Wits | Custom portal | www.wits.ac.za/apply-online |
| UP (Pretoria) | Custom portal | Direct application |
| Stellenbosch | Custom portal | www.maties.com/application |
| UJ | Custom portal | www.uj.ac.za/apply |
| UKZN | CAO | Via cao.ac.za |
| UFS | PeopleSoft / custom | Direct portal |
| NWU | Custom portal | Direct application |
| NMU | ITS / i-Enabler | Direct portal |
| UWC | Custom portal | Direct application |
| Rhodes | Custom portal | Direct application |
| TUT | Custom portal | Register and create account |
| DUT | CAO | Must apply via CAO |
| CPUT | Custom portal | Direct application |
| VUT | i-Enabler | Via vut.ac.za |
| CUT | Custom portal | Direct application |
| MUT | CAO | Via CAO |
| UNISA | Own system | Distance learning; separate intake cycles |

---

## Appendix B: Glossary

| Term | Definition |
|---|---|
| APS | Admission Point Score — calculated from matric marks to determine programme eligibility |
| NSC | National Senior Certificate — the matric qualification |
| POPIA | Protection of Personal Information Act — SA's primary data protection law |
| CAS | Central Application Service — government clearing house for unplaced students (2026 pilot) |
| CAO | Central Applications Office — centralised system for KZN universities |
| DBE | Department of Basic Education — responsible for NSC results |
| DHET | Department of Higher Education and Training — oversees public universities |
| Umalusi | Quality council that certifies matric results and qualifications |
| MOU | Memorandum of Understanding — formal agreement with each partner university |
| MVP | Minimum Viable Product — first working version with core features only |
| CIPC | Companies and Intellectual Property Commission — company registration body in SA |
