# MyNigeriaGuide — whole-site record audit, wave 3 (14 October 2026)

## Current verified baseline

- PR #379 is merged: 15 individually sourced changes across the four existing pillars.
- PR #381 is merged: 21 government and commercial service records, including the NPC parent/guardian NIN exception and Sendbox API/public-tracking distinction.
- The 36 changes are discrete record reviews, **not** a statement that all other website records or rendered URLs have been fact-checked.
- This wave implements a **repeatable, per-record editorial triage** and an immediately actionable Jobs trust correction. It does not mass-rewrite sources or inflate article text.

## Verified defect corrected

`lib/job-runtime.ts` previously used `daysSinceIsoDate` (which clamps dates in the future to zero) for the public “Checked today” label. A job record incorrectly dated tomorrow or later could therefore appear recently verified. Invalid dates could render “Checked Infinity days ago”.

Future and invalid verification dates now display **“Check current status on the employer's site”** instead, without representing unpublished editorial checks as completed.

## Record-by-record screening for every existing pillar

`npm run audit:publisher -- --json` now includes:

- `reviewQueueByPillar`: named canonical URLs and flags, grouped by Services, Tour, Movies, Series, Jobs, YouTube. Existing universities' service records are counted within Services, not a fifth pillar.
- `tourPlaceReviewQueue`: named individual place records, their parent canonical guide URLs, source dates and missing-address flags.
- Source-count and recorded-date signals, plus authored-field depth leads appropriate to editorial guides, profiles or vacancy listings.
- Separate urgent/high/routine priorities. No unverified claims of page correctness, freshness, copyright permission or measured search performance.

Priority rules include **recorded source missing**, **explicit official-source conflict**, **invalid or future review date**, **old source-check date**, and **unusually brief record fields**. A one-source record earns a low-weight review lead; it is not automatically considered wrong. Dates signal when to *recheck*, not that the underlying fact is false. Film cast gaps are editing leads only: unverified cast must never be filled with guesswork.

The existing read-only publisher report's totals and original depth bands are preserved. Review lists are capped to a small working shortlist per kind, rather than dumping thousands of records into the CLI and slowing down routine QA. No live indexation or production data is changed by the read-only auditor.

## Next content passes and constraints

1. **Services:** individually reconcile the previously identified conflicting official fee/eligibility pages against live primary providers. Keep the NIMC disagreement flagged; avoid substituting a single definitive number while official sources differ. Prioritize high-intent routes, then per-provider private services and universities' admissions/fees.
2. **Jobs:** prioritize currently open, near-deadline listings with stale evidence; verify employer-hosted vacancy and salary details before saying “open”. Career portals and programmes must not masquerade as vacancies or receive unsupported `JobPosting` schema.
3. **Tour:** individually check venue existence, official map address, current visitor access, event expiry and real transport options. Do not equate a nearby suggested stop with an event venue.
4. **Movies/Series/YouTube:** verify legal watch links, named credited performers versus documentary subjects, source/artwork licensing, current platform availability, and film-specific editorial detail. No synthetic role assignments, fabricated plot or unauthorized images.
5. **Site experience:** separately sample key templates and real pages at 320/360/390/768/1280px, both themes, keyboard controls, navigation/search, ad layout stability, accessibility, source links, and Cloudflare crawler HTML. This pass does **not** claim those tests were run.

Treat scores and review queues as **triage**, not automatic publication bans or a reason to noindex established URLs solely for length. Article depth must come from verifiable, specific reader utility; no generic filler. Preserve four-pillars, canonical routes, separate editorial/trust policies and minimal tests.

## Scoped validation

`npx tsx --test tests/editorial-triage-records.test.ts` checks future/invalid dates, source conflicts and brief-record flags only. Wider browser/Cloudflare/deployment tests should run when those surfaces are actually changed.
