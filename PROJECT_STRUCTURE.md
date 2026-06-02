# ApplyOnce — Project Structure

This document explains every folder in the project and what goes in it.

---

## Root Level

```
applyonce/
├── CLAUDE.md                    ← READ THIS FIRST. Full context for Claude CLI.
├── README.md                    ← Human-readable project intro
├── PROJECT_STRUCTURE.md         ← This file
├── docs/                        ← All planning, research, and legal documents
├── src/                         ← All application source code
├── backend/                     ← Backend API server
└── scripts/                     ← Dev and deployment scripts
```

---

## `/docs` — Documentation

```
docs/
├── ApplyOnce_Strategy.md        ← Full product concept & strategy document
├── university-systems.md        ← SA university integration research
└── legal/
    └── requirements.md          ← Legal & regulatory checklist
```

Everything non-code lives here. Before writing a line of code, docs should be complete.

---

## `/src` — Application Source Code

The mobile app (React Native) and shared services.

```
src/
├── app/                         ← React Native mobile app
│   ├── screens/                 ← One file per screen
│   │   ├── Auth/                ← Login, Register, Onboarding
│   │   ├── Profile/             ← Student profile builder
│   │   ├── Documents/           ← Document vault
│   │   ├── Universities/        ← Browse, search, APS match
│   │   ├── Applications/        ← Build and submit applications
│   │   ├── Payment/             ← Checkout and payment
│   │   └── Dashboard/           ← Application status tracker
│   ├── components/              ← Reusable UI components
│   │   ├── common/              ← Buttons, inputs, modals
│   │   ├── forms/               ← Form components
│   │   └── cards/               ← University cards, application cards
│   ├── navigation/              ← React Navigation stack and tab config
│   ├── hooks/                   ← Custom React hooks
│   ├── store/                   ← State management (Redux Toolkit or Zustand)
│   └── utils/                   ← App-level utility functions
│
├── api/                         ← All external API integrations
│   ├── universities/            ← Per-university integration modules
│   │   ├── index.ts             ← University registry
│   │   ├── wits.ts              ← Wits University integration
│   │   ├── uj.ts                ← UJ integration
│   │   ├── tut.ts               ← TUT integration
│   │   └── [university].ts      ← One file per integrated university
│   ├── payments/
│   │   ├── payfast.ts           ← PayFast gateway integration
│   │   └── index.ts             ← Payment abstraction layer
│   └── auth/
│       ├── id-verification.ts   ← SA ID number validation
│       └── index.ts
│
├── services/                    ← Core business logic (shared across app and API)
│   ├── aps-calculator.ts        ← APS score calculation from matric results
│   ├── ocr-service.ts           ← OCR extraction from matric result documents
│   ├── document-vault.ts        ← Document management logic
│   └── application-builder.ts  ← Build application payload per university
│
├── constants/
│   ├── universities.ts          ← List of all 26 SA public universities
│   ├── subjects.ts              ← NSC subjects and APS weighting
│   └── fees.ts                  ← Application fee constants
│
└── types/
    ├── student.ts               ← Student profile types
    ├── application.ts           ← Application types
    ├── university.ts            ← University and programme types
    └── payment.ts               ← Payment types
```

---

## `/backend` — Backend API Server

Node.js / Express (or NestJS) REST API. Handles authentication, data persistence, university submission, and payment processing.

```
backend/
├── src/
│   ├── routes/                  ← API endpoint definitions
│   │   ├── auth.ts              ← /api/auth/*
│   │   ├── students.ts          ← /api/students/*
│   │   ├── applications.ts      ← /api/applications/*
│   │   ├── universities.ts      ← /api/universities/*
│   │   └── payments.ts          ← /api/payments/*
│   ├── controllers/             ← Route handler logic
│   ├── models/                  ← Database models (PostgreSQL via Prisma or TypeORM)
│   │   ├── Student.ts
│   │   ├── Application.ts
│   │   ├── Document.ts
│   │   └── Payment.ts
│   ├── middleware/
│   │   ├── auth.ts              ← JWT verification
│   │   ├── validation.ts        ← Request validation (Zod)
│   │   └── error-handler.ts     ← Global error handler
│   ├── services/                ← Backend business logic
│   │   ├── submission.ts        ← University submission orchestration
│   │   ├── payment.ts           ← Payment processing
│   │   └── notification.ts     ← Email/SMS notifications
│   └── utils/
│       ├── logger.ts
│       └── helpers.ts
└── config/
    ├── database.ts              ← DB connection config
    ├── env.ts                   ← Environment variable validation
    └── universities.ts          ← University API endpoint config
```

---

## `/scripts` — Dev & Deployment Scripts

```
scripts/
├── setup.sh                     ← Initial server setup script
├── seed-universities.ts         ← Seed DB with all 26 SA universities
└── test-university-api.ts       ← Test a university integration endpoint
```

---

## Key Architectural Rules

1. **One integration file per university** — `src/api/universities/[name].ts`. Each file implements the same interface so the submission engine treats all universities identically.
2. **Services are framework-agnostic** — the APS calculator, OCR service, and document vault contain pure business logic with no React Native or Express dependencies.
3. **Types are shared** — the `/src/types/` folder is used by both the mobile app and backend.
4. **Never hardcode fees** — all application fees live in `/src/constants/fees.ts` so they can be updated in one place.
5. **Every university integration requires a corresponding MOU** — do not build a live integration without a signed agreement.

---

## Getting Started on the Server

```bash
# Clone the project
git clone [repo-url] applyonce
cd applyonce

# Install dependencies (mobile app)
cd src && npm install

# Install dependencies (backend)
cd ../backend && npm install

# Set up environment variables
cp backend/config/.env.example backend/config/.env
# Fill in DB credentials, payment gateway keys, etc.

# Start backend dev server
cd backend && npm run dev

# Start React Native (requires separate Android/iOS environment)
cd ../src && npx react-native start
```
