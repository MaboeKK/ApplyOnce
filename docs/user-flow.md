# ApplyOnce — User Flow & Screen Map

## The Student Journey (One Line)

```
Register (ID auto-fills DOB + gender)
→ Profile wizard
→ Upload matric results (OCR auto-extracts marks + calculates APS)
→ Dashboard
→ Browse universities → Faculty → Programme (green/red vs your APS)
→ Add specific programmes to cart
→ Review cart → Pay once
→ All applications submitted
→ Track status per programme
→ Receive offers
```

---

## How Auto-Fill Works

| Data | Source | Student types? |
|---|---|---|
| Date of birth | Extracted from SA ID number (digits 1–6) | No |
| Gender | Extracted from SA ID number (digit 7: 0–4 = female, 5–9 = male) | No |
| Subject marks | OCR scan of uploaded matric certificate | No |
| APS score | Auto-calculated the moment subjects are extracted | No |
| Everything else | Student types | Yes |

**SA ID format:** `YYMMDD G SSS C A Z`
Example: `9001015009087` → born 1990-01-01, gender digit 5 = male, SA citizen.
Extract on the frontend as soon as the ID field loses focus. Show DOB and gender as pre-filled, read-only, with a small "extracted from your ID" note.

---

## Stage 1 — Getting In (Not logged in)

| Screen | What happens |
|---|---|
| Landing | "Apply to every university. Once." — Register / Login buttons |
| Register | SA ID number, email, phone, password. DOB and gender shown as auto-filled below ID field. |
| Login | Email + password |
| Forgot password | Email → reset link |

---

## Stage 2 — Profile Builder (First time only — wizard, auto-saves each step)

| Step | Fields | Notes |
|---|---|---|
| Personal | First name, last name, DOB (pre-filled), gender (pre-filled), race, nationality, home language, disability | DOB + gender locked from ID |
| Address | Street, suburb, city, province, postal code | |
| Guardian | Name, relationship, phone, email, annual income | Income field for future NSFAS eligibility |
| School | School name, matric year | |
| Results | Upload matric certificate image/PDF → OCR extracts subjects + marks automatically → APS calculated and shown | Student can also enter manually if upload fails |
| Review | Summary of all entered info — confirm | Lands on Dashboard |

---

## Stage 3 — Dashboard (Home after login)

Shows:
- APS score badge (prominent — this is the student's key number)
- Applications summary: how many submitted, how many pending, any offers
- Status list of all active applications
- "Browse universities" call to action if no applications yet

---

## Stage 4 — Finding & Applying (PROGRAMME-SPECIFIC — not general)

Every application is for a **specific programme at a specific university**.
A student does not apply to a university — they apply for a course at a university.

### The selection path:

```
University Browser
→ University Detail
→ Faculty list
→ Programme list (filtered by faculty)
→ Programme Detail
→ "Add to my applications"
→ Cart
```

### Screen details:

| Screen | What it shows |
|---|---|
| University Browser | Grid of all 26 universities. Filter by: province, type (traditional / UoT / comprehensive), "only show where I qualify" toggle |
| University Detail | About the university, faculties, application fee, deadline, "View full prospectus" link (opens university website) |
| Faculty list | Faculties at that university (e.g. Commerce, Engineering, Humanities) |
| Programme list | All programmes in the chosen faculty with APS minimum shown |
| Programme Detail | Full requirements: APS minimum, required subjects + minimum marks, duration, qualification type. **Green tick** = student qualifies. **Red** = does not meet requirements (shows exactly what's missing). Application fee shown. "Add to my applications" button. |
| Cart | All selected programmes. Shows: programme name, university name, application fee, R5 service fee, line total. Running total at bottom. Remove button per item. |

### Cart example:

| Programme | University | Their fee | Our fee | Total |
|---|---|---|---|---|
| BCom Accounting | Wits | R100 | R5 | R105 |
| BCom Accounting | UJ | R200 | R5 | R205 |
| BCom | UFS | R150 | R5 | R155 |
| | | | **Total** | **R465** |

---

## Stage 5 — Payment & Submission

| Screen | What happens |
|---|---|
| Application Review | Pre-filled application form per university — student reviews all details before paying |
| Payment Breakdown | Itemised cost shown clearly. "Pay R465" button. |
| PayGate checkout | Student redirected to PayGate. Pays once for all applications. |
| Payment Success | Confirmation screen. All applications now submitted to their respective universities simultaneously. Reference numbers shown. |
| Payment Failed | Error shown. Retry button. Applications remain as drafts. |

---

## Stage 6 — Tracking

| Screen | What it shows |
|---|---|
| Applications List | All applications with status badges. Filterable by status. |
| Application Detail | Full status timeline for one application: Created → Paid → Submitted → Received → Under Review → Decision. University reference number. Offer details if accepted (conditions, report date). |
| Offers | Filtered view — only Accepted applications. |

### Status values:
`Draft` → `Pending Payment` → `Submitted` → `Received` → `Under Review` → `Accepted` / `Rejected` / `Waitlisted`

---

## Stage 7 — Account & Documents

| Screen | What happens |
|---|---|
| Document Vault | Upload, view, delete: ID document, matric certificate, proof of residence. Each document shows upload date and which applications it was used for. |
| Edit Profile | Edit any section of the profile wizard |
| Change Password | |
| Delete Account | Full data deletion — POPIA requirement. Confirmation step. |

---

## Navigation Structure (Next.js App Router)

```
/                        Landing (not logged in) or redirect to /dashboard
/register                Register
/login                   Login
/forgot-password         Forgot password

/onboarding              Profile wizard (redirected here if profile incomplete)
/onboarding/personal
/onboarding/address
/onboarding/guardian
/onboarding/school
/onboarding/results
/onboarding/review

/dashboard               Main home after login

/universities            University browser
/universities/[id]       University detail
/universities/[id]/[facultyId]         Faculty programmes
/universities/[id]/[facultyId]/[progId] Programme detail

/applications            Application cart + list
/applications/[id]       Single application detail

/payment                 Payment breakdown
/payment/success         Payment confirmed
/payment/failed          Payment failed

/documents               Document vault
/profile                 Edit profile
/settings                Password, account deletion
```

---

## Key UX Rules

1. **Never lose data.** Every form field auto-saves on blur. If the browser closes, nothing is lost.
2. **APS badge is always visible** on the dashboard and as a small badge during university browsing.
3. **Green/red qualification indicators** on every programme — student never has to manually check if they qualify.
4. **Clear cost breakdown before payment.** Never surprise the student with a total.
5. **Payment is atomic.** Either all applications are submitted or none are. No partial submissions.
6. **Error messages are human.** "University of Johannesburg is temporarily unavailable — we'll retry in a few minutes" not "503".
7. **Prospectus links.** Every university detail page has a "View full prospectus" link to their real website. Our data is a guide; the official prospectus is the authority.

---

## What Is NOT in MVP

- NSFAS application
- Bursary/scholarship matching
- Messaging with universities
- Push/email notifications (in-app only)
- Document verification (student uploads, university checks)
- Mobile app (web only, mobile-responsive)
- Multiple application rounds (one active cycle at a time)
