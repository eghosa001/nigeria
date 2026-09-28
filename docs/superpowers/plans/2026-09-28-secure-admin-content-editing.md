# Secure Admin Content Editing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a secure browser-based admin editor that turns guide edits into reviewable GitHub pull requests while keeping public rendering repository-backed and KV-free.

**Architecture:** Move editable service records into a structured JSON file validated by server/shared TypeScript code. Reuse the existing protected admin passphrase session for editing, and send validated proposals through a server-only GitHub client that creates a feature branch, commits only the service-data change, and opens a pull request against `main`. Public pages continue reading only deployed repository data.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, GitHub REST API, Playwright, Cloudflare Workers/vinext.

**Spec:** `docs/superpowers/specs/2026-09-28-secure-admin-content-editing-design.md`

## Global Constraints

- Public guide reads remain repository/static-data based; do not add KV, D1, or another database to normal rendering.
- Do not expose GitHub credentials or server secrets to browser code.
- No admin form submission may write directly to `main`.
- Preserve all existing public/review guide slugs, source URLs, related links, status values, and checked dates during the data migration.
- Existing CI, content checks, Browser QA, Cloudflare Runtime QA, source/link checks, and Live Deployment QA remain publication gates.
- Use the existing private admin passphrase boundary and HttpOnly/Secure/SameSite=Strict cookie pattern.
- Keep government-service content changes review-first and auditable.

## Review Focus

- A malformed or oversized edit must fail before any GitHub write occurs.
- A valid proposal must alter only the requested service record and never silently rewrite unrelated guides.
- Expired or missing admin authentication must block both form data retrieval and proposal submission.
- GitHub API partial failure must not be reported as a successful proposal.
- The data migration must preserve the exact current service catalog and public-guide count.

---

### Task 1: Structured service data and validation

**Files:**
- Create: `data/services.json`
- Create: `lib/service-records.ts`
- Modify: `lib/data.ts`
- Create: `scripts/verify-service-migration.ts`
- Test: `tests/service-records.spec.ts`

**Interfaces:**
- Produces: `validateServiceRecord(value: unknown): Service`
- Produces: `validateServiceCatalog(value: unknown): Service[]`
- Produces: `serializeServiceCatalog(records: Service[]): string`
- `lib/data.ts` exports `services`, `publicServices`, `getService`, `getPublicService`, `getServicesByAgency`, and `getServicesByStatus` from the structured catalog without changing their public signatures.

- [ ] **Step 1: Write failing catalog-preservation tests**
  - Assert 106 public guides.
  - Assert every current slug remains present.
  - Assert representative source URLs, statuses, related links, requirements and steps survive serialization/validation.
  - Assert invalid status, blank slug, non-HTTPS source URL and duplicate slug are rejected.

- [ ] **Step 2: Run the focused tests and confirm RED**
  - Run: `npx playwright test tests/service-records.spec.ts --workers=1`
  - Expected: FAIL because the structured service-record module/data file does not exist.

- [ ] **Step 3: Generate `data/services.json` from the current exported catalog and implement validators**
  - `validateServiceRecord(value: unknown): Service`
  - `validateServiceCatalog(value: unknown): Service[]`
  - `serializeServiceCatalog(records: Service[]): string`
  - Reject duplicate slugs and malformed nested sources.
  - Keep output deterministic with two-space JSON indentation and a trailing newline.

- [ ] **Step 4: Switch `lib/data.ts` to the validated structured catalog**
  - Preserve agency/source definitions and all existing helper signatures.
  - Remove duplicated inline service definitions after parity is proven.

- [ ] **Step 5: Run focused and existing content tests**
  - Run: `npx playwright test tests/service-records.spec.ts --workers=1 && npm run typecheck && npm run check:content`
  - Expected: PASS with 106 public guides and no migration drift.

- [ ] **Step 6: Commit**
  - Commit: `refactor: move service guides to validated structured data`

### Task 2: Shared admin authentication boundary

**Files:**
- Create: `lib/admin-access.ts`
- Modify: `lib/admin-analytics-access.ts`
- Create: `app/api/admin/content-access/route.ts`
- Modify: `app/admin/services/[slug]/page.tsx`
- Test: `tests/admin-editing.spec.ts`

**Interfaces:**
- Consumes: existing `MYNIGERIAGUIDE_ADMIN_ANALYTICS_KEY`.
- Produces: `adminAccessConfigured(): boolean`
- Produces: `verifyAdminPassword(password: string): boolean`
- Produces: `hasAdminSession(): Promise<boolean>`
- Produces: a protected `POST/DELETE /api/admin/content-access` session endpoint using the shared HttpOnly cookie.

- [ ] **Step 1: Write failing authentication tests**
  - Unauthenticated admin guide detail does not expose editable fields.
  - Incorrect passphrase returns 401.
  - Correct passphrase creates the protected session.
  - Lock/delete clears access.

- [ ] **Step 2: Run the focused tests and confirm RED**
  - Run: `npx playwright test tests/admin-editing.spec.ts --workers=1`
  - Expected: FAIL because content editing/access controls are absent.

- [ ] **Step 3: Implement the shared admin-access helper**
  - Preserve analytics unlock behaviour by routing its helper through the shared implementation.
  - Keep cookie HttpOnly, Secure, SameSite=Strict, path=/, 12-hour max age.

- [ ] **Step 4: Add content access API and server-side access check on admin guide detail**
  - Do not leak the secret or a reusable token to client JavaScript.

- [ ] **Step 5: Run focused tests plus analytics smoke**
  - Run: `npx playwright test tests/admin-editing.spec.ts tests/smoke.spec.ts --workers=1`
  - Expected: PASS, including existing visits unlock/lock coverage.

- [ ] **Step 6: Commit**
  - Commit: `feat: share protected admin session with content editing`

### Task 3: GitHub review-change service

**Files:**
- Create: `lib/admin-github.ts`
- Create: `app/api/admin/services/[slug]/proposal/route.ts`
- Modify: `.env.example`
- Test: `tests/admin-editing.spec.ts`

**Interfaces:**
- Consumes: `MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN`.
- Consumes: validated `Service` and full catalog from Task 1.
- Produces: `createServiceProposal(slug: string, next: Service): Promise<{ pullRequestUrl: string; pullRequestNumber: number; branch: string }>`
- Route: `POST /api/admin/services/[slug]/proposal`.

- [ ] **Step 1: Add failing proposal-boundary tests**
  - 401 without admin session.
  - 413/400 for oversized or malformed payload.
  - 404 for unknown slug.
  - Server validation rejects changed slug.
  - A successful mocked GitHub boundary returns a PR URL/number and leaves `main` untouched.

- [ ] **Step 2: Run the focused tests and confirm RED**
  - Run: `npx playwright test tests/admin-editing.spec.ts --workers=1`
  - Expected: FAIL because the proposal endpoint/client do not exist.

- [ ] **Step 3: Implement server-only GitHub client**
  - Read repository owner/name from fixed server constants for `eghosa001/nigeria`.
  - Fetch current `main` SHA and current `data/services.json`.
  - Replace only the matching record after validation.
  - Create unique branch `admin/<slug>-<UTC timestamp>-<suffix>`.
  - Commit only `data/services.json`.
  - Open PR against `main` with a field-level summary.
  - Never return the GitHub token.

- [ ] **Step 4: Implement proposal route hardening**
  - Require same-origin JSON POST.
  - Enforce request-size ceiling before parsing.
  - Require authenticated admin session.
  - Return safe setup error when GitHub token is absent.

- [ ] **Step 5: Run focused tests**
  - Run: `npx playwright test tests/admin-editing.spec.ts --workers=1`
  - Expected: PASS for auth, validation, and proposal boundary.

- [ ] **Step 6: Commit**
  - Commit: `feat: create review-only GitHub proposals from admin edits`

### Task 4: Admin editing UI

**Files:**
- Create: `components/admin-service-editor.tsx`
- Modify: `app/admin/services/[slug]/page.tsx`
- Modify: `app/globals.css`
- Test: `tests/admin-editing.spec.ts`
- Test: `tests/a11y.spec.ts`

**Interfaces:**
- Consumes: the current `Service` record.
- Produces: accessible grouped editing form.
- Produces: proposal success state with pull-request link and explicit “production has not changed yet” copy.

- [ ] **Step 1: Add failing browser tests**
  - Unlock editor with the admin passphrase.
  - Edit summary, requirements and official portal.
  - Validation error is announced accessibly.
  - Successful submission shows PR link and review-not-published message.
  - Mobile viewport keeps all fields/actions usable.
  - No serious/critical Axe violations on the authenticated editor state.

- [ ] **Step 2: Run the focused browser tests and confirm RED**
  - Run: `npx playwright test tests/admin-editing.spec.ts tests/a11y.spec.ts --workers=1`
  - Expected: FAIL because the editor UI is absent.

- [ ] **Step 3: Implement the editor**
  - Group: Core information, Requirements, Steps, Notes, Sources, Search/relationships.
  - Lists use one item per line in textareas; sources use structured rows.
  - Primary action label: `Create review change`.
  - Never label submission as publish.

- [ ] **Step 4: Add responsive/admin styles**
  - Meet existing touch-target and contrast expectations.
  - Preserve the existing admin visual system.

- [ ] **Step 5: Run focused browser/accessibility tests**
  - Run: `npx playwright test tests/admin-editing.spec.ts tests/a11y.spec.ts --workers=1`
  - Expected: PASS desktop and mobile.

- [ ] **Step 6: Commit**
  - Commit: `feat: add secure admin guide editor`

### Task 5: Production documentation and full verification

**Files:**
- Modify: `docs/DEPLOYMENT.md`
- Modify: `README.md`
- Modify: `tests/full-site-audit.spec.ts` if needed for catalog invariants.

**Interfaces:**
- Documents required secret: `MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN`.
- Documents minimum GitHub permissions: repository Contents read/write and Pull requests read/write for `eghosa001/nigeria` only.

- [ ] **Step 1: Add/strengthen regression assertions**
  - No KV binding.
  - 106 public guides.
  - Admin editor does not appear unauthenticated.
  - Public route output remains catalog-backed.

- [ ] **Step 2: Run the complete local/CI-equivalent suite**
  - Run: `npm run typecheck && npm run check:content && npm run build:next && npm run check:cloudflare && npm run build && npx playwright test`
  - Expected: PASS.

- [ ] **Step 3: Update deployment docs**
  - Explain token creation, Cloudflare secret name, least-privilege permissions, review workflow, and failure states.
  - Explicitly state that public requests remain KV/database-free.

- [ ] **Step 4: Run link/source checks**
  - Run: `npm run check:sources && npm run check:links`
  - Expected: no definitive broken monitored sources/links.

- [ ] **Step 5: Commit**
  - Commit: `docs: finish secure admin editing rollout`

- [ ] **Step 6: Open PR, verify all GitHub checks, and merge only after green**
  - PR base: `main`
  - PR head: `feat/secure-admin-editing`
  - Expected: CI, Browser QA, Cloudflare Runtime QA, source integrity, and relevant deployment checks green before merge.
