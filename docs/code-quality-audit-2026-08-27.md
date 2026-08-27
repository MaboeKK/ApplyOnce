# ApplyOnce Code Quality Audit — 2026-08-27

Read-only audit. No code was changed as part of this report.

## Scope & Methodology

Two audit passes, both against the actual codebase as of this date (`main`, clean working tree):

1. **DCX Engineering Standards translation** — the Datacentrix internal standards handbook (written for a Fastify/Kysely/Keycloak/BullMQ/OpenTofu multi-tenant billing platform) was read in full and triaged into "not applicable to this stack" (Fastify plugins, Kysely, BullMQ, OpenTofu, Prometheus/Grafana/Loki/Tempo, circuit breakers/bulkheads/event bus, Keycloak/RS256), "already aligned," and "real gap, translated to Express/Prisma/Next.js/MUI/Jest." No file-size, line-count, or god-object rule exists anywhere in that pack (confirmed by exhaustive grep across all 16 standard docs — zero matches).
2. **Generalized industry-standard audit** — a broader pass using React's own official best practices (as the concrete proxy for "Meta-style" React patterns, since Meta built React), well-known FAANG-scale engineering norms (testing pyramid, CI gating, monorepo hygiene, dependency hygiene), and Netflix's publicly-known resilience-engineering reputation (timeouts, retries, idempotency, health checks) as reference points — no single company publishes a canonical "coding standard" document comparable to the DCX pack, so these are explicitly proxies, not literal specs.

Findings below are deduplicated and merged across both passes, severity-graded using: **CRITICAL** = blocks merge, no exceptions · **HIGH** = blocks release without a written exception · **MEDIUM** = fix by sprint close or log as tracked tech debt · **LOW** = polish.

## Executive Summary

The codebase has disciplined fundamentals: a clean layered architecture with no circular dependencies, TypeScript `strict: true` genuinely enforced (not just configured) across all four packages, a correct payment-webhook idempotency implementation, a properly-implemented graceful shutdown sequence, and clean monorepo package boundaries. What undermines it is a **lint/CI pipeline that structurally cannot catch the two things most worth worrying about** — `any`-type erosion and file-size/complexity sprawl — plus a genuinely inverted test pyramid that includes at least one test asserting nothing. Nothing found requires an architectural rewrite; the large majority of fixes are config-file changes or single-function extractions.

---

## Lint / CI Pipeline Flaws

| Flaw                                                                   | Exact cause (file:line)                                                                                                                                                                                                                                           | Fix                                                                                                                                                             |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `any` types can spread with CI staying green                           | `.eslintrc.json:25` sets `"@typescript-eslint/no-explicit-any": "warn"`; no package's lint script passes `--max-warnings 0` (`packages/api/package.json:10`, `packages/shared/package.json:9` run bare `eslint src --ext .ts`; portal/admin run bare `next lint`) | Set the rule to `"error"`, or add `--max-warnings 0` to all 4 lint scripts + the root fan-out                                                                   |
| A 10,175-line file (or any future oversized file) is invisible to lint | No `max-lines`, `max-lines-per-function`, or `complexity` rule exists anywhere — not in root `.eslintrc.json`, not in `next/core-web-vitals` (confirmed by direct inspection, not assumption)                                                                     | Add `"max-lines": ["warn", 1000]` and `"complexity": ["warn", 15]` to `.eslintrc.json`                                                                          |
| Formatting is enforced by nothing                                      | No `.prettierrc`/`prettier.config.js` exists anywhere; Prettier is a devDependency referenced only inside a **dead** `lint-staged` block (no `.husky/` directory, no `prepare` script exists) — never invoked in CI either                                        | Add a `.prettierrc`, add a `prettier --check` CI step, and actually wire up Husky (`npx husky init` + `prepare` script) so `lint-staged` stops being decorative |
| Branch protection lists 5 job names instead of one gate                | `.github/BRANCH_PROTECTION.md` names `Lint`/`Typecheck`/`Test @applyonce/shared`/`Test @applyonce/api`/`Build` individually rather than requiring a single `gate` job                                                                                             | Add a `gate: needs: [...], if: always()` job to `ci.yml`; point branch protection at just `gate`                                                                |
| No exit-code swallowing anywhere (checked, genuinely clean)            | `grep -c "continue-on-error\|\|\| true"` on `ci.yml` → 0 matches                                                                                                                                                                                                  | No fix needed                                                                                                                                                   |
| No `.github/PULL_REQUEST_TEMPLATE.md`                                  | Confirmed absent                                                                                                                                                                                                                                                  | Add one — cheap, standard practice                                                                                                                              |
| No build-artifact sharing between CI jobs                              | Each job re-runs `npm ci` + `prisma generate` independently                                                                                                                                                                                                       | Low priority; cache/artifact-share if CI time becomes a problem                                                                                                 |

---

## Findings by Severity

### CRITICAL

1. **`POST /v1/aps/calculate` has no request validation and is unauthenticated** — `packages/api/src/routes/aps.ts:34`, `packages/api/src/controllers/aps.ts:23-38`. No `validateBody`/Zod schema wired in; the controller does manual ad-hoc `if (!results || !Array.isArray(results)...)` checks; `req.body` is implicit `any`; the route has no auth middleware at all.
2. **The test suite destroys the live database on every run** — `packages/api/src/__tests__/admin.test.ts` and `e2e.test.ts` call `prisma.application.deleteMany({})`, `applicationEvent.deleteMany({})`, `payment.deleteMany({})` with **no `where` clause** against whatever `DATABASE_URL` is configured — there is no separate test database.
3. **A test asserts nothing** — `packages/shared/src/services/__tests__/aps-calculator.test.ts:309-312`:
   ```ts
   test('classifies as reach when 0-2 points above minimum', () => {
     // Student APS 36, required 35 = gap of 1 = reach
     expect(true).toBe(true); // Placeholder - classification tested in matching
   });
   ```
   The "reach" tier of `classifyChoice` has zero real coverage despite appearing tested.
4. **Lint cannot fail the build on `any` usage or file size** — root cause of nearly every type-safety and file-size finding in this report; see the pipeline table above.

### HIGH

- `paygate.id`/`paygate.secret` use `optional(key, defaultValue)` with realistic-looking fallback secrets instead of `required()`, unlike `JWT_ACCESS_SECRET`/`JWT_REFRESH_SECRET` — `packages/api/src/config/index.ts:73-74`.
- `multer`'s `fileFilter` trusts client-supplied `file.mimetype` only, no magic-byte content verification — `packages/api/src/config/multer.ts:33-47`. Relevant because uploads are SA ID documents and matric certificates.
- bcrypt work factor is 10, not the standard's 12 — `packages/api/src/controllers/auth.ts:51`.
- Raw `new Error(...)` used instead of the project's own `AppError` hierarchy in `workflows/submission.ts` (8 sites), `utils/ocr.ts` (2 sites), `utils/saId.ts` (1 site) — contained today, but a second, inconsistent error idiom.
- nodemailer transport has no `connectionTimeout`/`socketTimeout`/`greetingTimeout` and is awaited directly inside request handlers — `packages/api/src/utils/email.ts:14`, called from `controllers/auth.ts:72` and `controllers/admin.ts:264`. `EMAIL_MODE=dev` short-circuits today; flipping to `production` with a real SMTP host is one env var away from a hung request.
- **Submission engine has no crash-recovery path.** `submitMultipleApplications` runs fire-and-forget (`.then()`, not `await`) immediately after the payment webhook flips status to `complete` (`controllers/payment.ts:225`). If the process crashes mid-loop: nothing re-triggers submission for stuck `draft` applications, a retried webhook is swallowed by the payment idempotency guard (so it can't help), and `workflows/submission.ts:58`'s status guard treats **any** non-`draft` status — including `submission_failed` — as "already submitted," so a failed submission can never be retried even by a future manual trigger. A student who paid can end up permanently stuck.
- No error boundary exists anywhere in either React app (no `ErrorBoundary`, no custom `_error.tsx`) — a render-time throw white-screens to Next's generic error page with no recovery UI.
- 10 of 12 `IconButton` usages have no `aria-label`, including the password-visibility toggle on **all three** login/register forms (`login.tsx:100`, `admin/login.tsx:79`, `register.tsx:204,223`) and the cart's remove-item button (`cart.tsx:214`).
- 12 pages duplicate inline auth-guard logic instead of a centralized `ProtectedRoute` component (portal: `index`, `dashboard`, `documents`, `cart`, `checkout`, `universities/index`, `universities/[id]`, `applications/[id]`, `profile/setup`; admin: `index`, `applications`, `applications/[id]`).
- `checkout.tsx:63-70` — `handleCancel` awaits `api.post('/payments/notify', ...)` inside `try{}finally{}` with **no `catch`** — unhandled-promise-rejection risk.
- Three confirmed-dead npm dependencies, verified by grepping every source file for imports: `axios` (`packages/api`), `@mui/x-charts` and `@emotion/css` (`packages/portal`) — zero usages anywhere.
- Two `AppError` subclasses are defined and never thrown anywhere: `TooManyRequestsError`, `InternalError` (`packages/api/src/utils/errors.ts:59,66`).
- No `CODEOWNERS`, no `CONTRIBUTING.md`, no `.github/PULL_REQUEST_TEMPLATE.md` — reasonable for the current solo-author stage (git log confirms a single committer), worth revisiting once a second contributor joins.

### MEDIUM

- Money fields (`SERVICE_FEE_ZAR`, `applicationFee`, fee summation via `.reduce((sum,b) => sum + b.applicationFeeZAR, 0)` in `controllers/payment.ts:88-95` and `shared/src/api/payments/mock-paygate.ts:44-46`) are computed on plain `number` before feeding a correctly-`Decimal(10,2)`-typed `Payment` model — low risk today (whole-Rand values only) but structurally wrong ahead of real PayGate integration.
- `Application.paymentId` has no `@@index` in `prisma/schema.prisma`, unlike every other FK on that model (`studentId`, `universityId`, `status` are all indexed).
- `pino` logger (`utils/logger.ts`) has no `redact` config for PII/secret fields.
- `errorHandler` middleware returns `{message, code, details}` with no `request_id`, despite `pino-http` already generating `req.id`.
- Rate limiter is prod-only, in-memory (`express-rate-limit`, no store), a single global limiter with no stricter `/auth`-specific limit — `app.ts:69-85`.
- `noUncheckedIndexedAccess`/`exactOptionalPropertyTypes` absent from all 4 `tsconfig.json` files; `noUnusedLocals`/`noUnusedParameters`/`noImplicitReturns`/`noFallthroughCasesInSwitch` present only in `api`'s tsconfig, unexplained absence in `shared`'s.
- `getStatusConfig`/`getStatusColor` duplicated near-identically across `portal/dashboard.tsx`, `portal/applications/[id].tsx`, `admin/applications.tsx`, `admin/applications/[id].tsx`.
- `formatZAR` utility exists (`portal/src/utils/formatters.ts`) but is used in only 1 of 10 real fee-display call sites — the other 9 (`cart.tsx` ×5, `checkout.tsx` ×3, `ReviewStep.tsx` ×1) use raw `` `R${amount}` `` interpolation.
- Admin session-expiry guard checks only the persisted Zustand `isAuthenticated` flag, not live token validity — briefly renders full admin chrome before the global 401 interceptor redirects (`packages/admin/src/pages/applications.tsx`, `applications/[id].tsx`).
- `packages/portal/src/pages/profile/setup.tsx:167` — `stepData as ProfileWizardData` cast not immediately preceded by runtime validation (call-site typing constrains it somewhat, so calibrated down from the DCX standard's literal CRITICAL label).
- **Redis is fully provisioned** (`config/index.ts:30`, docker-compose, project docs) **but has zero consumers anywhere in `packages/api/src`** — no `ioredis`/`createClient` call exists in the API source at all. Either dead config to remove, or an unfinished feature (sessions? distributed rate limiting?).
- `GET /v1/health` (`routes/index.ts:17-24`) returns `{status:'ok'}` unconditionally — no DB ping — would report healthy with Postgres unreachable.
- Synchronous `fs.existsSync`/`fs.unlinkSync` calls inside per-request handlers — `controllers/document.ts` (8 sites: 37-38, 112-113, 149-150, 199-200, 219-220, 239-240, 286, 311-312) and `controllers/admin.ts:352` — block the event loop under concurrent load; `fs.promises` equivalents aren't used anywhere in that file.
- `mockSubmissions` Map in `shared/src/api/universities/mock-adapter.ts:26,95` is only ever `.set()`, never `.delete()`'d — unbounded growth for the life of the process. Low impact at MVP data volumes.
- Two unchecked `as X` casts on real trust boundaries: `portal/src/utils/draft-storage.ts:18` (`JSON.parse(raw) as T` on localStorage content, no runtime validation), `api/src/middleware/auth.ts:25` (`jwt.verify(...) as JWTPayload` — signature verified, payload shape never checked).
- **No service/repository layer anywhere in the API** — every controller embeds Prisma queries directly (Prisma-call counts: `document.ts` 15, `auth.ts` 10, `application.ts` 7, `admin.ts` 6, `payment.ts` 5, `student.ts` 5, `aps.ts` 1). Consistent house style across all 8 controllers, not an isolated bug — worth naming as a structural decision to revisit as the controller count grows, not an urgent fix.
- `controllers/document.ts`'s `scanMatricCertificate` (72-159) and `scanIdDocument` (160-249) each mix ~6 responsibilities in one ~87-line handler: file-path resolution, OCR invocation, student DB lookup, ID cross-check, existing-document find+delete, response shaping.
- `utils/ocr.ts:121-192` (`parseSubjects`) — triple-nested loop over positional OCR heuristics (outer per-line loop, inner backward-scan for achievement level, innermost backward-scan for percentage), interleaved with two separate if-chains. The single hardest-to-follow function in the codebase, and it has **zero unit tests** despite being pure and deterministic — directly feeds the APS number the whole product is built around.
- Zero unit tests for `saId.ts` (SA ID digit parsing), `jwt.ts`, `errors.ts` — all pure, trivially testable, all untested.
- `constants/universities.ts`'s barrel export (`export * from './constants/universities'` in `shared/src/index.ts`) means `cart.tsx` and `profile/setup.tsx` each pull a ~23.4KB client bundle chunk to get one field (`SERVICE_FEE_ZAR`, `markToAPS` respectively) — real but minor; verified via an actual production `next build`, not assumption. Note `/universities/*` correctly avoids this entirely by fetching university data server-side.
- All 13 `useEffect`-based data fetches across portal+admin have no unmount cancellation (no `AbortController`, no cancelled-guard) — `PortalNav.tsx:44-52` compounds this by re-fetching the cart badge on every route change with a silent `.catch(() => {})`, so a fast navigation can let a stale response overwrite a newer one.
- `@types/multer` is listed under `dependencies` in `packages/api/package.json` instead of `devDependencies`.
- `e2e.test.ts:265-266` hardcodes `http://localhost:3000/payment/success|cancel` in test fixture data — port 3000 isn't even in ApplyOnce's own 3600 range; harmless (test-only) but sloppy.
- `MOCK_DELAY` in `mock-adapter.ts:15` is a SCREAMING_SNAKE_CASE-named function — should be camelCase.

### LOW

- A few silent `.catch(() => {})` sites with no logging — `PortalNav.tsx:51`, `universities/index.tsx:~133`.
- 2 array-index `key` props (`ResultsStep.tsx:483`, `ReviewStep.tsx:240`) — safe in context since the underlying lists are never reordered/filtered, just technically non-idiomatic.
- A couple of implicit-`any` catch blocks not using the existing `getErrorMessage` utility (`checkout.tsx:43`, `applications/[id].tsx:71`).

---

## Refactoring Blueprint — highest-risk files

**1. `packages/shared/src/constants/universities.ts` (10,175 lines).** Not a lint violation today (no rule catches it) but a genuine merge-conflict and review-quality risk — every university/programme edit touches the same file. Split into `constants/universities/<university-id>.ts` (one file per university, ~26-30 files of roughly 300-400 lines each), each exporting its `University` object; `constants/universities/index.ts` becomes a thin barrel importing and re-exporting the array. Zero behavior change — `UNIVERSITIES` keeps the same shape and `@applyonce/shared` keeps the same import surface for every consumer. This also sharpens future tree-shaking, directly addressing the "23KB pulled in for one field" bundling finding above.

**2. `packages/api/src/controllers/document.ts` — `scanMatricCertificate`/`scanIdDocument`.** Extract a `services/document.service.ts` with three named functions: `resolveUploadPath()`, `runOcrScan(filePath)`, `persistScannedDocument(studentId, docType, ocrResult)`. Each controller becomes a 10-15 line orchestrator calling these three, each independently unit-testable without spinning up Express/Prisma mocks for the whole flow.

**3. `packages/api/src/utils/ocr.ts` — `parseSubjects`.** Split into `findAchievementLevel(lines, index)`, `findPercentageMark(lines, index)`, `classifyExtractionConfidence(level, mark)`, driven by a flat top-level loop instead of the current triple-nesting. Highest-value refactor for testability in the codebase — pure, deterministic, currently untested, and it's the function that produces the APS score the entire product is built around.

**4. Broader, optional: a thin service layer between controllers and Prisma**, starting with `document.ts` and `auth.ts` (the two heaviest). Not urgent at MVP scale, but worth doing before controller count or team size grows — there is currently no shared seam to test query/response-shaping logic against independent of the full HTTP request cycle.

---

## Not Applicable at Current Stage (confirmed, not overlooked)

- Circular dependencies — none found; both `api` and `shared` traced as clean layered DAGs.
- Retry-with-backoff on the university adapter / PayGate — the mock layer is synchronous and in-process; retrying it would just be re-rolling a business-outcome coin flip, not handling real network flakiness. Becomes necessary once a real adapter/PayGate replaces the mock.
- Hardcoded secrets — none found anywhere in the repo (grepped for credential-shaped literals, private key headers, embedded-credential connection strings); the only connection string with credentials is `ci.yml:88`'s ephemeral CI-container Postgres password.
- Unoptimized loops / O(n²) patterns — none found; the only consumers of the 26-university constant are single flat `.find()` calls, immaterial at that scale.
- Graceful shutdown — already correctly implemented (`index.ts:23-38`): SIGTERM/SIGINT handled, `server.close()` → `disconnectDatabase()` → exit, with a 10s forced-shutdown fallback.
- Payment webhook idempotency — confirmed solid: atomic compare-and-swap (`updateMany({where:{id, status:'pending'}})`) correctly returns "already processed" on zero rows affected.
- Rules of Hooks — enforced, just not visibly: `next/core-web-vitals` (extended by portal/admin) bundles `eslint-plugin-react-hooks`; no violations found regardless.
- Monorepo package boundaries — clean; no cross-package relative-import leaks found anywhere.
