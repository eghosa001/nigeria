# Secure Admin Content Editing Design

**Date:** 2026-09-28

## Goal

Allow the owner of MyNigeriaGuide to update government-service guides from the web admin without giving public visitors write access, without putting content reads behind KV or a database, and without bypassing the repository's existing content, browser, Cloudflare and live-deployment quality gates.

## Current constraints

- Public guide data is repository-backed in `lib/data.ts`.
- The public site must remain KV-free for ordinary rendering, search, SEO and saved guides.
- The existing `/admin/visits` flow already proves a server-side secret can protect private admin data with an HttpOnly, Secure, SameSite=Strict cookie.
- Government-service content must never become public merely because a form was submitted.
- Secrets must stay in Cloudflare environment configuration and must never be committed to GitHub.
- Publishing must continue to run CI, Browser QA, Cloudflare Runtime QA, content-quality checks and Live Deployment QA.

## Recommended architecture

Use the existing admin passphrase session as the authentication boundary, but make content changes repository-reviewed rather than direct database writes.

The editing UI will work with structured service records. A server-only content-edit endpoint will validate an edit, create a dedicated GitHub branch, write the proposed service change, and open a pull request. The public site continues reading only the repository version deployed from `main`. A proposal therefore cannot change production until it has passed repository checks and is merged.

A fine-grained GitHub token stored only as a Cloudflare secret will have access only to `eghosa001/nigeria` and only the minimum repository permissions required for contents and pull requests. The browser never receives this token.

## Data model direction

The present monolithic TypeScript guide definitions are safe for reading but unnecessarily brittle for browser-originated edits. The implementation should move editable guide records into a structured repository data file while keeping source/agency helpers in TypeScript.

Recommended split:

- `data/services.json`: editable service records.
- `lib/data.ts`: agency/source helpers, validation, typed exports and compatibility functions used by the application.
- A schema validator rejects malformed records before any GitHub write.
- Existing public slugs remain stable.

This migration must preserve every currently published guide, review-only guide, source URL, related-service link, verification status and checked date. It is a data-format migration, not a content rewrite.

## Authentication and authorization

The admin shell should require the existing protected admin session before exposing editing controls.

Content-changing requests must also:

1. validate the authenticated HttpOnly session server-side;
2. require same-origin requests;
3. reject requests without JSON content type;
4. enforce a modest request-size limit;
5. validate the service slug and every editable field;
6. refuse direct writes to `main`;
7. never return server secrets or GitHub credentials.

The GitHub credential is stored as a Cloudflare secret such as `MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN`.

## Editing flow

1. Owner opens a guide under `/admin/services/[slug]`.
2. After authenticated access, the page shows an **Edit guide** action.
3. The form is pre-populated with the current repository record.
4. The form supports summary, fee/timeline text, requirements, steps, notes, search terms, related guides, official portal and verification status.
5. Sources are editable only as structured label/agency/URL/date records.
6. Client-side validation provides immediate feedback, but the server repeats all validation.
7. Submitting creates a branch named with the guide slug and a timestamp/unique suffix.
8. The server commits only the intended structured data change.
9. The server opens a pull request containing a field-by-field summary of the proposed change.
10. The admin UI returns the pull-request link and clearly states that production has not changed yet.
11. Normal GitHub checks decide whether the proposal is safe to merge.
12. After merge, Cloudflare deploys `main`; Live Deployment QA confirms production.

No browser action gets a direct “publish to main” endpoint.

## Review safety

The pull request is the publication review boundary. It provides:

- a permanent audit trail;
- exact before/after diff;
- CI/content-quality validation;
- link/source validation;
- browser and Cloudflare compatibility testing;
- rollback through Git history.

The admin UI may later add a “merge after green checks” action, but that is explicitly out of scope for the first implementation. The first version intentionally requires merge through GitHub.

## Failure behaviour

- Invalid form data: return 400 with field-level errors; do not create a branch.
- Missing/expired admin session: return 401.
- GitHub credential missing: show setup state; public site continues normally.
- GitHub API failure: return a safe error and do not claim the proposal was created.
- Branch collision: generate a new unique suffix and retry once.
- CI failure: leave the pull request open for review; never deploy the change.
- Live deployment failure after merge: existing Live Deployment QA remains the alert boundary.

## UI

Keep the existing admin visual system. Editing should be a focused form on the service detail page, with grouped sections for core information, requirements, process, notes and sources. The destructive/high-impact action is “Create review change,” not “Publish.”

Mobile layouts must remain usable and all form inputs must meet the site's existing accessibility/touch-target expectations.

## Testing

The implementation must add coverage for:

- unauthenticated users cannot see or submit editing actions;
- malformed edits are rejected;
- a valid edit produces a proposed repository change, not a direct main write;
- only the requested guide changes;
- existing guide count and slugs are preserved by the data migration;
- source URLs and related-guide references remain intact;
- mobile admin editing has no critical accessibility failures;
- public pages remain unchanged until the proposal is merged;
- no KV binding is introduced.

## Cost and operational impact

Public rendering stays repository/static-data based, so this design adds no per-page KV or database reads. GitHub API usage happens only when the owner submits an edit. The existing Cloudflare Worker, GitHub Actions and deployment model remain the core infrastructure.
