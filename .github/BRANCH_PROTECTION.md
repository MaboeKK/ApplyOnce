# Branch Protection Setup

This document explains how to configure GitHub branch protection rules to require passing checks before merging.

## Required Status Checks

The following CI jobs must pass before code can be merged to `main`:

1. **Lint** - ESLint + Prettier formatting
2. **Typecheck** - TypeScript type checking across all packages
3. **Test (shared)** - Unit tests for @applyonce/shared
4. **Test (api)** - Integration tests for @applyonce/api
5. **Build** - Verify all packages build successfully

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
  - **Required status checks (select all):**
    - `Lint`
    - `Typecheck`
    - `Test @applyonce/shared`
    - `Test @applyonce/api`
    - `Build (api, portal, admin)`

- ✅ Require conversation resolution before merging
- ✅ Require linear history (prevents merge commits)
- ✅ Include administrators (admins must follow these rules too)

### 3. Save Changes

Click "Create" or "Save changes" at the bottom.

## Verification

After configuring, create a test PR and verify:
1. All 5 status checks appear in the PR
2. PR cannot be merged until all checks pass
3. "Merge pull request" button is disabled until checks complete

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
