# ApplyOnce — Build Guide (paste these to Claude CLI, one at a time)

> How to use this: paste ONE prompt, let Claude CLI finish, do the QUICK CHECK yourself,
> and only then paste the next prompt. Each prompt tells Claude CLI to STOP and report
> when done — it will not run ahead. If a check fails, tell Claude CLI what you saw and
> let it fix before moving on.

---

## STEP 0 — Get the code onto the server

You have the project zip. Get it to the server first.

**Option A — scp from your laptop (PowerShell), one command:**
```powershell
scp -i C:\Users\KK\.ssh\server\id_ed25519 applyonce_final.zip kmaboe@45.220.228.31:/home/kmaboe/
```

**Option B — your SSH client's file upload (SFTP):** drag `applyonce_final.zip` into `/home/kmaboe/`.

Then SSH in and unzip:
```bash
cd /home/kmaboe
unzip applyonce_final.zip
mv home/claude/applyonce_v2 applyonce   # if the zip nested it; otherwise rename the folder to "applyonce"
ls applyonce                            # confirm CLAUDE.md, packages/, scripts/ are there
```

Put the server rules in place and start Claude CLI:
```bash
cp applyonce/SERVER_CLAUDE.md ~/CLAUDE.md
cd applyonce
claude
```

---

## PROMPT 1 — Setup & sanity check (no app code yet)

```
Read CLAUDE.md fully before doing anything. Then:
1. Confirm we are in /home/kmaboe/applyonce and summarise back to me the sandbox safety rules (ports, kmaboe- prefixes, what you must not touch).
2. Run scripts/setup.sh — it verifies tools, checks our ports (3600/3601/3602/3610/3611) are free, starts ONLY the kmaboe-applyonce Postgres + Redis containers, installs npm deps, runs Prisma migrations, and seeds the 26 universities + admin accounts + demo student.
3. Initialise a LOCAL git repo (no remote, no GitHub) and make the first commit.
4. STOP and report: what ran, what's now running (docker ps for kmaboe- containers only), and the seeded credentials. Do NOT write any application code yet.
```

**QUICK CHECK (you):** `docker ps` shows `kmaboe-applyonce-postgres` and `kmaboe-applyonce-redis` running. Setup printed the seeded credentials. No errors.

---

## PROMPT 2 — API foundation + auth

```
Follow CLAUDE.md Build Order Phase A, steps 1–3 only.
Build: the Express app entry point with the full middleware stack (Helmet, CORS for the portal+admin origins, cookie-parser, express-rate-limit, pino logging, Swagger docs at /v1/docs, a /v1/health endpoint), the asyncHandler wrapper, the Zod validation middleware, the JWT-from-httpOnly-cookie auth middleware with role support, the global error handler, and the auth routes: POST /v1/auth/register, /v1/auth/login, /v1/auth/logout for students, AND email verification on signup (register creates an unverified account + generates a 6-digit code; POST /v1/auth/verify activates it). In dev (EMAIL_MODE=dev) return/log the code instead of emailing it so the demo needs no SMTP.
Use @applyonce/shared for types. Commit when done.
STOP and report. Do not build profile/documents/universities yet.
```

**QUICK CHECK (you):** Start the API (`npm run dev:api`), open `http://45.220.228.31:3600/v1/health` in your browser → should show status ok. Open `http://45.220.228.31:3600/v1/docs` → Swagger page loads.

---

## PROMPT 3 — Student profile, documents, OCR + APS

```
Follow CLAUDE.md Build Order Phase A, steps 4–7.
Build: student profile routes (GET/PUT /v1/students/me, PUT /v1/students/me/subjects), document upload (multer, save to /home/kmaboe/applyonce/uploads), the OCR scan endpoint (POST /v1/documents/scan-matric using Tesseract.js — upload-first: extract marks, auto-calculate APS via calculateAPS() from @applyonce/shared, return the APS plus extracted subjects with a confidence flag per value), the APS endpoints (POST /v1/aps/calculate, GET /v1/aps/matches — each match must include its choice-strategy tag reach/match/safety via a classifyChoice() helper you add to @applyonce/shared), and the read-only university routes served from the @applyonce/shared constants. Also add a few example ECP (Extended Curriculum) programmes to the shared constants with lower APS minimums and an isECP flag, so the safety tier is real.
Remember: OCR is primary, APS is the key output, confirmation/correction is per-field only.
Commit when done. STOP and report.
```

**QUICK CHECK (you):** Ask Claude CLI to show you a test: upload a sample matric image to the scan endpoint and confirm it returns an APS number. `GET /v1/universities` returns 26 universities.

---

## PROMPT 4 — Applications, payments, submission engine

```
Follow CLAUDE.md Build Order Phase A, steps 8–10.
Build: application routes (POST/GET/DELETE /v1/applications — programme-specific, storing programmeId+programmeName; enforce ONE programme per university; require BOTH matric certificate + ID document uploaded before a draft can be paid; DELETE only allowed on unpaid drafts — submitted applications are final, no withdraw), payment routes (POST /v1/payments/initiate, POST /v1/payments/notify mock webhook) using the mock PayGate from @applyonce/shared with the R5 SERVICE_FEE_ZAR, and the submission engine that runs after a payment is confirmed — it calls MockUniversityAdapter.submitApplication() per paid application, stores the university reference, and moves status draft → submitted.
Commit when done. STOP and report.
```

**QUICK CHECK (you):** Ask Claude CLI to run a scripted test: create a draft application, initiate + complete a mock payment, and confirm the application status becomes "submitted" with a reference number.

---

## PROMPT 5 — University admin API (with isolation)

```
Follow CLAUDE.md Build Order Phase A, step 11, AND the University Data Isolation rules.
Build: the requireUniversityAdmin middleware (verifies JWT, confirms role university_admin, attaches req.admin.universityId), admin auth login (POST /v1/admin/auth/login for seeded university admins), GET /v1/admin/applications (filtered to req.admin.universityId ONLY), GET /v1/admin/applications/:id (403 if not their university), PATCH /v1/admin/applications/:id/decision (Accept or Decline ONLY — no waitlist — reason required, 403 if not their university). On a decision, notify the student in-app AND send an email (respect EMAIL_MODE: log in dev, send via Nodemailer in production) stating the university, programme, decision, and reason.
Commit when done. STOP and report.
```

**QUICK CHECK (you):** Ask Claude CLI to prove isolation: log in as the UCT admin, confirm they only see UCT applications, and confirm trying to open another university's application returns 403.

---

## PROMPT 6 — Student portal (split into small sub-steps)

> The student portal is large. Build it in sub-steps 6a–6e, pasting one at a time and
> checking each, so Claude CLI never tries to do too much in one go.

### Prompt 6a — Shell, theme, auth screens
```
Follow CLAUDE.md Build Order Phase B. Use the frontend-design skill and the design tokens in CLAUDE.md (indigo/violet/cyan, youthful, app-like, desktop-first but fully phone-responsive).
Build ONLY: the Next.js app shell + MUI theme + layout, the Zustand auth store, and the register/login pages INCLUDING the email-verification step (in dev the code is shown on screen).
Connect to the API base URL. Commit. STOP and report.
```
**CHECK:** open `http://45.220.228.31:3601`, register the demo student, complete email verification, land logged-in.

### Prompt 6b — Profile wizard + document vault
```
Build ONLY: the profile builder wizard (personal → address → guardian → school → results-upload → review) and the document vault. The results step is UPLOAD-FIRST: upload the matric certificate, the API OCR returns the marks + auto-APS, show a confirmation screen where any misread value can be corrected. Require matric certificate + ID document uploads.
Commit. STOP and report.
```
**CHECK:** upload a sample matric certificate from test-data/, see your APS appear, confirm it; upload an ID document.

### Prompt 6c — University browser + programme selection
```
Build ONLY: the university browser (grid, filters by province/type, and a "only show where I qualify" toggle), the university detail page, faculty list, programme list, and programme detail. Each programme shows the green/red qualification indicator AND the choice-strategy chip (reach/match/safety). "Add to my applications" enforces one programme per university.
Commit. STOP and report.
```
**CHECK:** browse, open a BCom programme, see green tick + a reach/match/safety chip, add it; confirm you can't add a second programme at the same university.

### Prompt 6d — Cart + mock PayGate checkout
```
Build ONLY: the application cart (per-line cost breakdown: university fee + R5, running total; block submit unless matric + ID uploaded; choice-balance nudge e.g. "2 reach, 0 safety — consider a safety choice"), and the payment flow. The mock PayGate must render a SIMPLE, PLAUSIBLE checkout screen ("Pay R465 — Confirm / Cancel") — not an instant jump — then on confirm, mark payment complete, trigger submission, and show a success page.
Commit. STOP and report.
```
**CHECK:** add 2–3 programmes, see the itemised total, go through the mock checkout screen, land on a success page; applications now show as submitted.

### Prompt 6e — Dashboard + status tracker
```
Build ONLY: the student dashboard (APS badge, applications list with status badges, the choice-balance summary) and the application detail page (status timeline, university reference, and the decision + reason once a university responds).
Commit. STOP and report.
```
**CHECK:** dashboard shows your APS and your submitted applications with statuses.

---

## PROMPT 7 — University admin portal (split into 7a–7b)

### Prompt 7a — Admin shell, login, inbox
```
Follow CLAUDE.md Build Order Phase C. Build ONLY: the admin app (packages/admin) with a separate, neutral/professional MUI theme, the university admin login page, and the applications inbox (a table of applications for THIS university only — enforce the isolation rules).
Commit. STOP and report.
```
**CHECK:** open `http://45.220.228.31:3602`, log in as `admin@uj.applyonce.co.za`, see the seeded UJ sample application in the inbox.

### Prompt 7b — Application detail + decision
```
Build ONLY: the application detail page (full student profile, APS, subjects, AND view/download of the student's uploaded ID + matric certificate) and the decision panel (Accept or Decline — no waitlist — required reason + confirm) that calls the admin decision endpoint and notifies the student in-app + email.
Commit. STOP and report.
```
**CHECK:** open the UJ application, view the student's documents, Accept it with a reason; confirm the demo student's dashboard then shows the acceptance.

---

## PROMPT 8 — End-to-end test + backup

```
1. Run the full loop end to end and report each step: demo student applies to a programme → pays (mock) → admin for that university logs in → sees it → accepts with a reason → student dashboard shows the acceptance.
2. Fix anything that breaks in that loop.
3. Set up the backup: confirm rclone is installed (install if not), remind me to run `rclone config` to connect Google Drive, then add the daily cron job from CLAUDE.md for scripts/backup.sh.
4. Commit. Report the final status and how to start all three apps together (npm run dev).
```

**QUICK CHECK (you):** You personally walk the whole flow in the browser — apply as a student, switch to the admin portal, accept, switch back, see the decision. That's the MVP working.

---

## If a phase goes wrong

Tell Claude CLI exactly what you saw (the error, or "the health check didn't load"). Let it fix and re-report BEFORE you give the next prompt. Never paste the next prompt on top of a broken phase.

## Reminder of the safety rules (already in CLAUDE.md and ~/CLAUDE.md)
- Only kmaboe- Docker containers; never touch goturbo-*
- Ports 3600/3601/3602 (apps), 3610/3611 (DB/Redis, localhost only)
- Work only inside /home/kmaboe/applyonce
- Local git only — backups go to your Google Drive
