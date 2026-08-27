# ApplyOnce

> Apply to every university. Once.

ApplyOnce is a South African web platform where matric students apply to all 26 public universities through one profile, one document vault, and one payment. University admins review and respond on a separate portal.

## Quick Links

- [Full Strategy Document](docs/ApplyOnce_Strategy.md)
- [Project Structure](PROJECT_STRUCTURE.md)
- [Claude CLI Context](CLAUDE.md)
- [Branch Protection Setup](.github/BRANCH_PROTECTION.md)
- [Deployment Security Checklist](DEPLOYMENT_SECURITY.md)

## Status

**Stage:** Active build. Core student and university-admin flows are implemented; real prospectus data is being backfilled per university.

## Monorepo Layout

- `packages/api` — Express 4 + TypeScript backend, serves both portals
- `packages/portal` — student-facing Next.js app
- `packages/admin` — university-admin Next.js app
- `packages/shared` — shared types, APS calculator, university constants, and mock adapters (`@applyonce/shared`)

## Tech Stack

- **Frontend:** Next.js 13 + MUI 6 (student portal and university-admin portal)
- **Backend:** Express 4 + TypeScript
- **Database:** PostgreSQL 16 (via Prisma 6)
- **Auth:** JWT in httpOnly cookies
- **Payments:** Mock PayGate (swapped for a real merchant account post-MVP)
- **Language:** TypeScript throughout
