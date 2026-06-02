# ApplyOnce — Tech Stack

## Decisions & Rationale

### Mobile App
| Choice | Decision | Why |
|---|---|---|
| Framework | **Expo (managed workflow)** | No Mac needed for iOS builds (EAS cloud builds). Camera, file picker, document scanning built in. Can eject to bare RN later if needed. |
| Language | **TypeScript** | End-to-end type safety; shared types with backend |
| Navigation | **React Navigation v6** | De facto standard for Expo/RN |
| State management | **Zustand** | Lightweight, no boilerplate, works well with TypeScript |
| Forms | **React Hook Form + Zod** | Performant, schema-driven validation |
| HTTP client | **Axios** | Interceptors for auth token refresh |
| Image/PDF handling | **Expo Image Picker + Expo Document Picker** | Built into managed Expo |
| OCR | **Server-side via Tesseract.js** | Too heavy for mobile; upload image, server extracts text |

### Backend
| Choice | Decision | Why |
|---|---|---|
| Runtime | **Node.js 20 LTS** | Stable, well-supported |
| Framework | **Express + TypeScript** | Lightweight, familiar, full control |
| ORM | **Prisma** | Auto-generated TypeScript types from schema; excellent migration tooling |
| Database | **PostgreSQL 15** | Relational, reliable, great JSON support for flexible university data |
| Auth | **JWT (access + refresh tokens)** | Stateless, mobile-friendly |
| File storage | **Local filesystem (dev) → AWS S3 (prod)** | Abstract behind a storage service interface |
| OCR | **Tesseract.js** | Open source, runs on server, no external API cost |
| Validation | **Zod** | Schema-first, shared with frontend where possible |
| Password hashing | **bcrypt** | Industry standard |

### Infrastructure (Server/Sandbox)
| Choice | Decision |
|---|---|
| Containerisation | Docker + Docker Compose |
| Process manager | PM2 (production) |
| Reverse proxy | Nginx |
| Environment config | dotenv (.env files, never committed) |
| CI/CD skeleton | GitHub Actions (workflows ready, credentials TBD) |

### Shared
- **TypeScript throughout** — frontend, backend, scripts
- **Prettier + ESLint** — consistent formatting
- **Zod schemas** — defined once, used on both sides

## Package Versions (Pinned)
```
Node.js:        20 LTS
TypeScript:     5.x
Express:        4.x
Prisma:         5.x
Expo SDK:       51
React Native:   0.74
React Nav:      6.x
Zustand:        4.x
Zod:            3.x
Axios:          1.x
bcrypt:         5.x
jsonwebtoken:   9.x
Tesseract.js:   5.x
```
