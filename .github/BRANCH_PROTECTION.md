# Branch Protection Setup

This document explains how to configure GitHub branch protection rules to require passing checks before merging.

## Required Status Checks

A single **`Gate`** job must pass before code can be merged to `main`. It depends on every other CI job (`Typecheck`, `Lint`, `Format`, `Test @applyonce/shared`, `Test @applyonce/api`, `Build`) with `if: always()`, so it only succeeds when all of them do — branch protection only needs to track this one check name, instead of being silently out of date whenever a job is renamed or a new one is added.

## Configuration Steps

### 1. Navigate to Repository Settings

1. Go to https://github.com/MaboeKK/ApplyOnce/settings/branches
2. Click "Add branch protection rule" or edit existing rule for `main`

### 2. Configure Branch Protection Rule

**Branch name pattern:** `main`

**Protect matching branches:**

- ✅ Require a pull request before merging
  - ✅ Require approvals: 1
  - ✅ Dismiss stale pull request approvals when new commits are pushed

- ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date before merging
  - **Required status checks:**
    - `Gate`

- ✅ Require conversation resolution before merging
- ✅ Require linear history (prevents merge commits)
- ✅ Include administrators (admins must follow these rules too)

### 3. Save Changes

Click "Create" or "Save changes" at the bottom.

## Verification

After configuring, create a test PR and verify:

1. The `Gate` status check appears in the PR (along with the individual job checks it depends on)
2. PR cannot be merged until `Gate` passes
3. "Merge pull request" button is disabled until `Gate` completes

## CI Workflow Location

The CI jobs are defined in `.github/workflows/ci.yml`

## Bypassing Checks (Emergency Only)

If you absolutely must merge without passing checks:

1. Temporarily disable branch protection (not recommended)
2. Or push directly to `main` if you have admin access and "Include administrators" is unchecked

**Do not bypass checks** except for critical production fixes.

## Notes

- The `lint` job runs ESLint with auto-fix disabled (read-only check)
- Local pre-commit hooks (via husky) run lint+prettier with auto-fix
- CI uses `npm ci` for reproducible installs from package-lock.json
- All jobs run in parallel for fast feedback (~5-10 minutes total)
