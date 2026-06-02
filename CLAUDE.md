# ApplyOnce — Claude CLI Project Context

> Pre-build phase COMPLETE. All decisions locked. Ready to build.

---

## What Is ApplyOnce?

South African web platform where matric students apply to all 26 public universities — one profile, one document vault, one payment. University admins review and respond on a separate portal.

**Tagline:** Apply to every university. Once.

---

## Status

**Pre-build: COMPLETE ✅**
**All decisions: LOCKED ✅**
**Ready to: BUILD**

---

## Three Separate Applications (Monorepo)

```
packages/api/       ← Express 4 backend — serves BOTH portals
packages/portal/    ← Student-facing Next.js app (applyonce.co.za)
packages/admin/     ← University admin Next.js app (admin.applyonce.co.za)
```

These are completely separate in every user-facing way:
- Different URLs
- Different login screens
- Different dashboards
- Students never see the admin side
- University admins never see the student side
- Connected only through the shared database and API

---

## Full Project Structure

```
applyonce/
├── CLAUDE.md                          ← You are here
├── package.json                       ← Workspace root (npm workspaces)
├── docker-compose.yml
├── scripts/setup.sh
├── docs/
│   ├── ApplyOnce_Strategy.md
│   ├── tech-stack.md
│   ├── api-contract.md
│   └── user-flow.md
├── src/                               ← Shared code used by all packages
│   ├── types/
│   │   ├── student.ts
│   │   ├── university.ts
│   │   └── application.ts            ← Also has Payment types
│   ├── services/
│   │   └── aps-calculator.ts         ← COMPLETE — do not change
│   ├── api/
│   │   ├── universities/
│   │   │   ├── index.ts              ← UniversityAdapter interface
│   │   │   └── mock-adapter.ts       ← Mock for all 26 universities
│   │   └── payments/
│   │       └── mock-paygate.ts
│   └── constants/
│       └── universities.ts           ← All 26 unis, mock data, fees
└── packages/
    ├── api/                          ← Express backend
    │   ├── package.json
    │   ├── prisma/schema.prisma      ← COMPLETE
    │   ├── .env.example
    │   └── src/                      ← TO BUILD
    ├── portal/                       ← Student app
    │   ├── package.json
    │   └── src/                      ← TO BUILD
    └── admin/                        ← University admin app
        ├── package.json
        └── src/                      ← TO BUILD
```

---

## Tech Stack (LOCKED)

| Layer | Technology |
|---|---|
| Student portal | Next.js 13 + MUI 6 (packages/portal/) |
| University admin | Next.js 13 + MUI 6 (packages/admin/) |
| Backend API | Express 4 + TypeScript (packages/api/) |
| Runtime | Node.js 22 |
| ORM | Prisma 6 |
| Database | PostgreSQL 16 (Docker) |
| Cache/sessions | Redis 7 — ioredis (Docker) |
| Auth | JWT + httpOnly cookies |
| Passwords | bcryptjs |
| Email | Nodemailer |
| Payments | Mock PayGate (paygate-sdk) |
| Validation | Zod |
| Logging | pino |
| API docs | Swagger (swagger-jsdoc) |
| Security | Helmet + express-rate-limit |
| Testing | Jest |
| Tooling | TypeScript 5, ESLint, Prettier, Husky |
| Server | Ubuntu (hosted VPS) |
| Infrastructure | Docker + Docker Compose + nginx |

## NOT in MVP
OpenBao, BullMQ, Redlock, OpenTelemetry, Playwright, Puppeteer,
ExcelJS, i18next, Email 2FA, Sentry, Kysely, Vitest, commitlint, Expo

---

## Everything Mocked

| Thing | Mock | Replaced when |
|---|---|---|
| All 26 university APIs | MockUniversityAdapter | MOU signed per university |
| University decisions | Human logs into admin portal and clicks Accept/Decline | Always — this IS the product |
| PayGate payments | Mock checkout — confirms immediately | Real PayGate merchant account |
| DBE/Umalusi results | Manual upload + OCR | Phase 2 |

---

## What Gets Auto-Filled (Never Typed Manually)

| Field | Source |
|---|---|
| Date of birth | Extracted from SA ID number digits 1–6 |
| Gender | Extracted from SA ID number digit 7 (0–4 = female, 5–9 = male) |
| Subject marks | OCR scan of uploaded matric certificate |
| APS score | Calculated automatically from extracted subject marks |

---

## Student Flow (Summary)

Register (ID auto-fills DOB + gender)
→ Profile wizard (personal → address → guardian → school → subjects)
→ Upload matric results (OCR auto-extracts marks + calculates APS)
→ Dashboard
→ Browse universities → Choose faculty → Choose programme
→ Programme shows green tick (qualifies) or red (doesn't + why)
→ Add specific programmes to cart
→ Review cart → Pay once (mock PayGate)
→ All applications submitted simultaneously
→ Track status per application on dashboard
→ Receive decisions from university admin portal

---

## University Admin Flow (Summary)

University admin logs in at admin.applyonce.co.za
→ Dashboard: inbox of all applications received for their university
→ Click an application → see full student profile, APS, subjects, documents
→ Click Accept or Decline → must enter a reason
→ Decision immediately reflects on the student's dashboard

---

## API

- Dev backend: http://localhost:3600/v1
- Dev student portal: http://localhost:3001
- Dev university admin: http://localhost:3002
- Full API contract: docs/api-contract.md

---

## Build Order (Follow This Exactly)

### Phase A — Backend (packages/api/)
1. Express app entry point — app.ts, index.ts, middleware stack, router mount
2. Auth middleware — JWT from httpOnly cookie, role check (student vs university_admin)
3. Auth routes — /auth/register, /auth/login, /auth/logout (shared for both portals)
4. Student routes — GET/PUT /students/me, PUT /students/me/subjects
5. Document upload — multer, local storage, OCR scan endpoint
6. University routes — GET /universities, GET /universities/:id (read-only from constants)
7. APS endpoint — POST /aps/calculate, GET /aps/matches
8. Application routes — POST/GET/DELETE /applications
9. Payment routes — POST /payments/initiate, POST /payments/notify (mock ITN)
10. Submission engine — runs after payment, calls MockUniversityAdapter per application
11. University admin routes — GET /admin/applications, PATCH /admin/applications/:id/decision

### Phase B — Student Portal (packages/portal/)
12. App shell — Next.js layout, MUI theme, auth context (Zustand)
13. Register + Login pages
14. Profile builder — 6-step wizard
15. Document vault page
16. University browser — grid, filters, APS match toggle
17. Faculty + programme selection — green/red qualification indicators
18. Application cart — itemised cost per programme
19. Payment flow — mock PayGate checkout → success/fail pages
20. Dashboard — APS badge, application list, status tracker
21. Application detail — status timeline, decision display

### Phase C — University Admin Portal (packages/admin/)
22. Admin app shell — separate MUI theme (more neutral/professional)
23. University login page
24. Applications inbox — table of all received applications, filterable by status
25. Application detail — full student profile, APS, subjects, uploaded documents
26. Decision panel — Accept / Decline radio + reason text field + confirm button
27. Decision confirmation — sent back to API, student dashboard updates

---

## Non-Negotiable Rules

- No hardcoded fees — use SERVICE_FEE_ZAR from src/constants/universities.ts
- Every university adapter is its own file in src/api/universities/
- No real PayGate until merchant account obtained
- All Express handlers wrapped in asyncHandler (never raw try/catch in routes)
- Zod validates every request body before it reaches a controller
- TypeScript strict mode throughout — no `any`
- JWT in httpOnly cookie — never localStorage
- Role field on JWT payload: 'student' | 'university_admin'
- University admin accounts are seeded, not self-registered
- Ask before any architecture decision not covered here

---

## University Data Isolation (CRITICAL — must be enforced at API level)

When a university admin logs in, their JWT payload contains both their role AND their universityId:

```json
{ "role": "university_admin", "adminId": "xxx", "universityId": "uct" }
```

This universityId is extracted from the UniversityAdmin record at login time and embedded in the token. It is the source of truth for what that admin can see.

Every admin API route MUST filter by the universityId from the JWT — never from a query parameter or request body that the client controls.

### Rules (non-negotiable):

1. GET /admin/applications — returns ONLY applications where application.universityId === jwt.universityId
2. GET /admin/applications/:id — returns 403 if application.universityId !== jwt.universityId
3. PATCH /admin/applications/:id/decision — returns 403 if application.universityId !== jwt.universityId
4. No admin endpoint ever accepts universityId as input from the client

### Why this matters:

Without this, admin@uct.applyonce.co.za could technically query applications belonging to Wits, UJ, or any other university just by changing a parameter. The isolation must be enforced server-side on every single admin route, not just on the frontend.

### How to implement:

Create a middleware called `requireUniversityAdmin` that:
- Verifies the JWT
- Confirms role === 'university_admin'
- Attaches req.admin = { adminId, universityId, name } to the request object
- All admin controllers then use req.admin.universityId for filtering — never req.query or req.body

---

## SHARED SANDBOX — CONFIRMED ENVIRONMENT (server 45.220.228.31, user kmaboe)

This server is SHARED with a live production service called **GoTurbo**. Verified facts below. A full standing-rules file lives at `~/CLAUDE.md` on the server.

### Already installed (do NOT reinstall)
Node v22.22.2, npm 10.9.7, Docker 29.1.3, Docker Compose 2.40.3, Git 2.43.0, Python 3.12.3, Claude Code. Node is system-wide (no nvm).

### Machine resources (plenty)
32 cores, 62GB RAM (59GB free), 489GB disk (354GB free). No resource constraints.

### TAKEN ports — NEVER bind to these
| Port | Owner |
|---|---|
| 22 | sshd (system) |
| 53 | systemd-resolved DNS (system) |
| 80 | nginx → GoTurbo frontend |
| 3000 | GoTurbo frontend (behind nginx — NOT obvious, but taken) |
| 3200 | GoTurbo nginx (docker-proxy) |
| 6379 | GoTurbo Redis |
| 8090 | GoTurbo internal nginx |
| 32947 | systemd-resolved (system) |

### ApplyOnce ports (CONFIRMED FREE — our claimed range is 3600–3699)
| Service | Port | Exposure |
|---|---|---|
| API (Express) | 3600 | public (0.0.0.0) — needed for demo |
| Student portal (Next.js) | 3601 | public (0.0.0.0) — needed for demo |
| University admin (Next.js) | 3602 | public (0.0.0.0) — needed for demo |
| PostgreSQL (Docker) | 3610 | **127.0.0.1 ONLY** — never expose |
| Redis (Docker) | 3611 | **127.0.0.1 ONLY** — never expose |

Always run `ss -tlnp` to confirm a port is free before binding.

### SECURITY — UFW is OFF
The server has no software firewall. Every listening port on 0.0.0.0 is reachable from the internet. Therefore:
- PostgreSQL and Redis MUST bind to 127.0.0.1 only (done in docker-compose.yml). Never change this to 0.0.0.0.
- The three apps are intentionally public for the demo. Before real student data goes in, revisit: put them behind auth/TLS, or proxy through a controlled port.
- Never log secrets. Never commit .env.

### Docker (GoTurbo owns everything currently there)
- Existing containers are all `goturbo-prod-*` — NEVER stop/restart/remove them
- Existing network: `go-turbo-deploy_internal` — NEVER attach to it
- ApplyOnce containers MUST be prefixed `kmaboe-` (kmaboe-applyonce-postgres, kmaboe-applyonce-redis)
- ApplyOnce network MUST be `kmaboe-net`
- GoTurbo uses postgres 14 + redis (separate containers/ports from ours — no conflict)

### Permissions (user kmaboe, uid 1007, developers group)
Passwordless sudo for: docker, docker compose, apt, apt-get, dpkg, systemctl, journalctl, service.
CANNOT: get root shell, read other users' files, modify nginx config. Do not attempt these.

### Boundaries
- All work inside `/home/kmaboe/applyonce/` only
- Never touch other users, /var/www, /srv, /opt, GoTurbo files, nginx, or system files
- Never rm -rf outside /home/kmaboe
- Only Postgres + Redis run in Docker; API/portal/admin run on the host via npm
- When unsure if something is safe — STOP and ask

---

## BACKUP STRATEGY (Google Drive — no GitHub needed)

Version control: LOCAL git on the server with a remote to the founder's PERSONAL GitHub repo (origin, set by cloning the empty repo first, then copying our files in). GitHub account: MaboeKK. The database is NOT in git — the Google Drive backup covers the database + a full snapshot. GitHub = code + history; Drive = database + full snapshot.

### What's backed up
- **Database** — full `pg_dump` of all data (students, applications, universities)
- **Code** — tarball INCLUDING the `.git` folder (preserves full commit history)
- **Uploads** — student documents folder
- **EXCLUDED:** node_modules, .next, dist, build, coverage, logs (regenerable — keeps backups small/fast)

### Scripts
- `scripts/backup.sh` — dumps DB, archives code (no node_modules), pushes to Google Drive, rotates old backups (keeps 7 days)
- `scripts/restore.sh` — lists backups, downloads one, restores the DB, gives instructions to extract code

### One-time setup (rclone)
```bash
sudo apt install rclone
rclone config          # create a remote named "gdrive" → Google Drive
                       # headless server: choose N for auto-config, authorise via laptop browser
```

### Schedule (cron — runs daily at 02:00)
```bash
crontab -e
# add:
0 2 * * * cd /home/kmaboe/applyonce && bash scripts/backup.sh >> /home/kmaboe/applyonce/backup.log 2>&1
```

### Rules
- Backup goes ONLY to the founder's personal Google Drive (org cannot delete it there)
- node_modules are NEVER included in backups
- The Drive copy is the safe harbour — the server is the org's, so push to Drive regularly
- rclone remote name is "gdrive"; Drive folder is "ApplyOnce-Backups"
- To restore on a fresh machine: restore DB, extract code tarball, run `npm install`, run `npm run dev`

### Version control
- Local git on the server, pushing to the founder's PERSONAL GitHub repo (MaboeKK/ApplyOnce) via `origin`
- `origin` is already set because the repo was CLONED first, then our files copied in — Claude CLI just does `git add . && git commit && git push -u origin main`
- Uses the dedicated key `~/.ssh/applyonce_personal` via the `github-personal` SSH alias (NOT the org key)
- Remote URL: git@github-personal:MaboeKK/ApplyOnce.git
- The Google Drive backup still runs for the DATABASE (GitHub does not store the DB)
- Never commit .env, uploads/, or test-data/real/ (the .gitignore handles this)

---

## OCR & APS — UPLOAD-FIRST (corrected approach)

The matric results step is UPLOAD-FIRST, not manual entry. Ease of use is the priority.

### Flow
1. Student uploads matric certificate (image or PDF) — primary action
2. Server runs OCR (Tesseract.js) → extracts text
3. Parser pulls the marks/achievement levels (and subject names where possible)
4. APS is calculated AUTOMATICALLY from the marks (this is the key output — for applying, APS is what matters most)
5. Confirmation screen shows the result: "Your APS is 34" + the subjects/marks it read
6. If OCR could not read a value confidently, ONLY that field is flagged for the student to correct — they do not retype everything
7. Student confirms → APS + subjects saved

### Rules for Claude CLI
- OCR is the PRIMARY path. Build the upload → scan → auto-APS → confirm flow.
- Manual entry exists ONLY as: (a) per-field correction on the confirmation screen, (b) a full fallback if the upload itself fails.
- The core deliverable is the APS score. Subject names matter less for now (we are APPLYING, not registering) — extract them best-effort for programme requirement matching, but do not block on perfect subject-name extraction.
- OCR accuracy varies by photo quality — the confirmation step is essential and must always let the student fix a misread value before it is saved.
- Use the existing calculateAPS() in @applyonce/shared — do not rewrite the APS logic.

---

## DATA LOCATION (avoid confusion)

- **Universities** → stored in the DATABASE (seeded). Needed for admin login links and application foreign keys.
- **Programmes / Faculties** → live in the CONSTANTS file (`@applyonce/shared` → constants/universities.ts), served READ-ONLY by the API. Do NOT build database tables for programmes/faculties in the MVP.
- **Students, Applications, Payments, Documents, Subject results** → DATABASE.
- Applications store `programmeId` + `programmeName` as strings (copied from the constants at selection time).

---

## SHARED CODE (monorepo)

- All shared code lives in `packages/shared` (package name: `@applyonce/shared`)
- Import it anywhere as: `import { calculateAPS, UNIVERSITIES, MockUniversityAdapter } from '@applyonce/shared';`
- Do NOT use relative imports like `../../src/...` across packages — always use `@applyonce/shared`
- The shared package exports types, the APS calculator, the 26-university constants, and the mock adapters

---

## FINAL PRODUCT DECISIONS (locked with founder)

### Student portal — design
- **Desktop-first, but MUST be fully usable on phones** (students are mostly on phones — responsive down to mobile is required, just designed for desktop first)
- **Visual feel: youthful, modern, app-like, friendly, colourful** — but still trustworthy (high-stakes process)
- Use the frontend-design skill. Design tokens:
  - Primary: Indigo #4F46E5
  - Secondary: Violet #7C3AED
  - Accent: Cyan #06B6D4
  - Success / qualifies: Emerald #10B981
  - Error / doesn't qualify: Rose #F43F5E
  - Warning: Amber #F59E0B
  - Neutrals: slate scale; backgrounds white + light tints
  - Rounded corners (12–16px), soft shadows, generous spacing
  - Headings: Poppins (or Plus Jakarta Sans); Body: Inter
  - Subtle indigo→violet gradient for hero/header accents
- **Admin portal** keeps a more neutral/professional theme (slate/blue, denser tables) — NOT the colourful student theme

### Applications
- **Unlimited** — a student can apply to as many programmes as they want. No cap on the cart.

### Sign-up — email verification REQUIRED
- Student registers → must verify email before the account is active
- **DEV/DEMO mode** (no SMTP configured / EMAIL_MODE=dev): the verification code is returned in the API response AND shown on screen, so testing and demos need NO email server
- **PRODUCTION mode** (SMTP configured): the code is emailed via Nodemailer
- This keeps the demo frictionless while the feature is genuinely built
- Add EMAIL_MODE + SMTP_* vars to .env (SMTP optional in dev)

### University admin — document access
- Admins **CAN view and download** the student's uploaded documents (ID, matric certificate) — they need them to verify the applicant
- POPIA note: document views by admins should eventually be audit-logged (use the ApplicationEvent table to record access). For MVP, enabling view/download is fine; add the audit log if time allows.
- Admins still only see documents for applications to THEIR university (isolation rules still apply)

---

## FINAL PRODUCT DECISIONS — ROUND 2 (locked with founder)

### University admin decisions
- Admins can **Accept or Decline only** — NO waitlist option in the UI
- The 'waitlisted' status may remain in the schema but is unused in MVP
- A reason is required for both Accept and Decline

### One programme per university
- A student may apply to a given university for **only ONE programme**
- The cart must PREVENT adding a second programme from a university already in the cart or already applied to
- Show a clear message: "You already have an application to [University] — remove it first to choose a different programme there"

### Required documents to apply
- A student MUST have uploaded BOTH: **matric certificate AND ID document** before they can submit/pay
- Proof of residence is NOT required
- Block submission with a clear message if either is missing

### Programme catalogue
- Keep the **minimal** mock catalogue already in @applyonce/shared (a few programmes per university) — do not expand it

### Applications are final
- **No withdraw** — once an application is submitted it cannot be withdrawn or deleted by the student
- Draft (unpaid) applications CAN still be removed from the cart before payment
- After submission: view-only status tracking

### Decision notifications — in-app + email
- When an admin Accepts or Declines, the student is notified BOTH in-app (dashboard status updates) AND by email
- The email respects EMAIL_MODE: in dev it is logged/shown (no SMTP needed); in production it sends via Nodemailer
- Email content: which university, which programme, the decision, and the admin's reason

---

## TARGET APPLICANT & SCOPE CLARIFICATION (locked with founder)

### Who the MVP serves
ApplyOnce MVP is for applicants who **already have their final matric (NSC) results** — school-leavers with results in hand, gap-year applicants, and people re-applying or improving their applications. NOT current Grade 12 learners applying provisionally with Grade 11 results.

Implication for the build:
- The results step is "upload your matric certificate / final NSC results" — the student HAS real final results
- APS calculated from those final results is real and final (no provisional/conditional logic)
- Do NOT build Grade 11 results handling, provisional acceptance, or conditional-offer logic in the MVP

### NBTs — explicitly OUT of scope
- National Benchmark Tests are booked and written by the student separately at nbt.ac.za
- NBT scores reach universities through the NBT system directly — ApplyOnce is NOT involved
- Do NOT build any NBT booking, scoring, or upload in the MVP
- (Phase 2 nicety only, if ever: a purely informational note on a programme like "This programme requires an NBT — book at nbt.ac.za". Not now.)

### Reaffirming what's out of scope (do not build in MVP)
Grade 11 / provisional applications, conditional offers, NBTs, residence applications, NSFAS/funding, first-and-second programme choice, portfolios/auditions/interviews, per-programme early deadlines.

---

## CHOICE STRATEGY LAYER (reach / match / safety) — IN MVP

Turns ApplyOnce from a form-filler into a guide. Built on data we already have (student APS + each programme's APS minimum).

### Tagging logic (per programme, relative to the student's APS)
Let gap = studentAPS - programmeApsMinimum.
- 🎯 **Reach (Dream)**: gap is 0–2 (meets minimum but tight). Label: "Aim high"
- ✅ **Match (Strong fit)**: gap is 3–5. Label: "Strong fit"
- 🛡️ **Safety (Secure)**: gap is 6+ OR the programme is an ECP/foundation programme. Label: "Secure"
- ❌ Below minimum (gap < 0): does not qualify (red) — EXCEPT ECPs, which have lower entry and may still be reachable

Show the tag as a small coloured chip on every programme card and on the programme detail page, alongside the existing green/red qualification indicator.

### Balance nudge (cart + dashboard)
Count the tiers in the student's current applications and nudge:
- "You have N reach, N match, N safety choices."
- If they have reaches but no safety: gentle prompt "Consider adding a safety choice to protect yourself."
- Never block — it's guidance, not a rule.

### ECP (Extended Curriculum Programmes)
- Add a FEW example ECPs to the seed/constants (Commerce, Science, Humanities at a handful of universities) so the safety tier is real
- ECPs: lower APS minimum than the mainstream programme, duration +1 year (foundation year), qualification type 'extended' or noted in the programme
- Full ECP catalogue across all 26 universities is PHASE 2 — just a few examples for MVP
- Add an `isECP: true` flag (or qualification type) to the Programme type in @applyonce/shared so the safety logic and UI can identify them

### Implementation notes
- Add a helper in @applyonce/shared: classifyChoice(studentAPS, programme) => 'reach' | 'match' | 'safety' | 'not_qualified'
- Use it in the university browser, programme detail, cart, and dashboard
- Surface it in GET /v1/aps/matches responses too


### Allocated port block: 3600–3699 (org-designated — stay inside it)
This range is allocated to kmaboe on this server. Keep ALL ApplyOnce services inside 3600–3699. Always run `ss -tlnp` to confirm a specific port is free before binding (the allocation means it's ours, but verify nothing is already bound).

---

## SEEDED DEMO DATA & TEST DATA (for a ready-to-show demo)

### Seeded on setup (in prisma/seed.ts)
- 26 universities + one admin each + demo student (demo@applyonce.co.za)
- Demo student's matric results (APS ~36) so they have a real APS without uploading
- 2 sample SUBMITTED applications: UJ BCom and Wits BCom — so the UJ and Wits admin inboxes are NOT empty on first login (great for demoing the admin side immediately)

### test-data/ folder
- The founder will place sample matric certificate files in `test-data/` for testing the OCR → APS flow
- `test-data/real/` is gitignored and excluded from backup — real personal documents go there, never committed
- Use these files when testing Phase 3 (OCR endpoint) and Phase 6b (portal upload)

---

## MONOREPO WIRING (do this FIRST in each frontend phase — prevents import errors)

All three apps import from `@applyonce/shared` (which ships TypeScript source). Wire it correctly:

### Next.js apps (portal + admin) — REQUIRED
In each app's `next.config.js`:
```js
const nextConfig = {
  transpilePackages: ['@applyonce/shared'],
};
module.exports = nextConfig;
```
Without `transpilePackages`, Next 13 will fail to compile the shared TS package — this is the #1 likely early error.

### Express API
- ts-node-dev imports `@applyonce/shared` via the npm-workspace symlink in node_modules
- Ensure `npm install` ran at the repo root so the symlink exists
- The API tsconfig should allow resolving the shared package (moduleResolution "node"/"bundler"); transpile-only is fine

### All packages
- Each package gets its own tsconfig.json; a shared base tsconfig at the root is nice-to-have
- Import ONLY as `@applyonce/shared` — never relative `../../packages/shared/...`
- If an import fails: confirm (1) transpilePackages is set (Next), (2) the symlink exists in node_modules, (3) the shared package's index.ts exports the symbol

---

## OCR PARSING — REAL NSC FORMAT (from founder's sample certificates)

The matric certificate is a National Senior Certificate (NSC) issued by Umalusi. Real layout the parser must handle:

### Structure
- Header: "National Senior Certificate", "Awarded to [Full Name]"
- "Identity number [13-digit ID]"
- A three-column results table:
  ```
  Subject                              %      Achievement level
  Afrikaans Home Language              70     6
  English First Additional Language    81     7
  Mathematical Literacy                84     7
  Life Orientation                     83     7
  Consumer Studies                     73     6
  Dance Studies                        70     6
  Life Sciences                        68     5
  ```
- A row of asterisks marks the end of subjects: `*****...  ***  *`
- Footer: certificate number (e.g. "120 1196 1914 T"), a serial number, and "UMALUSI / Council for Quality Assurance" 
- A statement confirming the candidate "met the minimum requirements for admission to bachelor's degree, diploma or higher certificate study"

### Parsing strategy (robust)
1. **Read the Achievement Level column (1–7) directly — it IS the APS point value per subject.** This is more reliable than converting the percentage. Use the % column as a cross-check / fallback via markToAPS().
2. **Distinguish Mathematics vs Mathematical Literacy** — they are different subjects; many programmes require Mathematics specifically. Do not conflate them.
3. **Exclude Life Orientation** from the best-6 APS (per our APS rules in calculateAPS()).
4. Extract the **ID number** and cross-check it against the student's registered ID (warn if mismatch).
5. Optionally capture the **bachelor/diploma/higher-certificate pass statement** — useful later for eligibility, not required for MVP.
6. The "***" asterisk row = stop reading subjects past this point.

### Confirmation step
Always show the extracted subjects + levels + computed APS for the student to confirm/correct, since OCR on photos varies. The level column being numeric and short makes it the most OCR-reliable field — lean on it.

### Test data
Real sample certificate(s) are in `test-data/real/` (gitignored, not backed up). Two real-format examples seen:
- Sample A: Afrikaans HL 6, English FAL 7, Math Literacy 7, LO 7, Consumer Studies 6, Dance Studies 6, Life Sciences 5 → APS (best 6 excl LO) = 37
- Sample B: English HL 6, Afrikaans FAL 5, Mathematics 6, LO 6, Accounting 6, Geography 6, Physical Sciences 6 → APS (best 6 excl LO) = 35
Use these to validate the parser + APS output.
