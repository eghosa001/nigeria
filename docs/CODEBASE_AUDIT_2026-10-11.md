# MyNigeriaGuide Codebase Audit — 11 October 2026

**State:** Initial whole-repository inventory completed; targeted optimization and correctness changes implemented on an isolated maintenance branch. **Not** a claim that every function, unused symbol, deployed URL, user journey or CSS rule has been individually verified.

## Measured repository inventory (GitHub `main`, before this PR)

| Area | Tracked files | Tracked source bytes | Main concern |
| --- | ---: | ---: | --- |
| Entire repository | **473** | **14,043,247** | Scale and maintenance burden |
| `data/` | 38 | 10,286,463 | Large generated datasets; do not delete blindly |
| `lib/` | 131 | 2,110,592 | Monolithic catalog modules and repeated catalog scanning |
| `app/` | 118 | 757,985 | Next.js routes, SEO and server/client boundaries |
| `components/` | 54 | 215,739 | Shared UI, accessibility and client hydration |
| `tests/` | 34 | 196,194 | Preserve focused regression coverage |
| `scripts/` | 32 | 162,872 | CLI tools, source checks, build hooks |
| `docs/` | 15 | 150,084 | Architecture and policy documentation |

These are **checked-in byte sizes**, **not** actual Cloudflare bundle or browser transfer sizes. Measurements were obtained from the recursive GitHub tree, not a local production build.

Largest measured hotspots:
- `data/youtube-movies.generated.json`: **3,381,073 bytes**.
- `data/youtube-movies-review.generated.json`: **1,009,798 bytes**.
- `data/services-scale-verified.json`: **751,159 bytes**.
- `data/services-private-extended.json`: **636,402 bytes**.
- `data/services.json`: **627,960 bytes**.
- `lib/explore.ts`: **578,706 bytes**.
- `lib/jobs.ts`: **269,869 bytes**.
- `app/globals.css`: **198,076 bytes**.

## Full static dependency-graph scan (focused GitHub CI run)

The new read-only analyzer **ran successfully** in PR #290's focused `verify` job. Its initial branch snapshot returned:

- **480** checked-in files and **386** source-code files.
- **114** recognized production route/entry files, **338** production-reachable modules, **39** tooling roots, **37** test roots.
- **0 unresolved internal imports** and **0 computed dynamic imports found by this syntax scan** (a limit of the scanner, not proof that no runtime load exists).
- **2 review candidates**: `components/adsense.tsx` and `components/route-wizard.tsx`.

Both candidates were inspected against the active route/module graph. The old `AdsenseScript` was never rendered; the active script is installed through `app/layout.tsx` and the site retains its AdSense integration. The old `RouteWizard` component had no consumers; the active `/assistant` page renders `GuideAssistant` instead. **Both unused component files have now been deleted** (6,252 bytes of checked-in source). Their unreachable CSS selectors remain for a separate cascade-controlled cleanup.

The scanner is informational and never modifies or deletes files. The initial branch inventory differs from `main` because this PR adds tooling/tests/docs and removes two confirmed orphan components.

## Confirmed findings and changes in this execution

| Status | Finding | Action | Guardrail |
| --- | --- | --- | --- |
| **Fixed in branch** | Global cross-pillar search added +24 for every open job, even when base query relevance was zero. Unrelated open jobs could appear for any search. | Apply availability boost **only after a positive text match**; add a focused no-match regression test. | Keep match/ranking semantics for actual matches. |
| **Optimized in branch** | Global search normalized the exact same query/tokens for every result across 9 searched record groups. | Precompile query once per search; reuse token set and per-title word set. | Preserve all scoring weights and result categories. |
| **Optimized in branch** | Approved YouTube publishers were checked by nested iteration and repeated alias normalization for each candidate. | Precompute approved normalized alias Set and first-match verified channel maps. | Preserve first-match semantics and publisher whitelist. |
| **Optimized in branch** | Curated movie pagination sorted the whole static catalog for every pagination call. | Compute sort once per module and return defensive copies when public title-list API is called. | Keep sorting and page URLs identical. |
| **Optimized in branch** | Movie directory scoring renormalized the search query once per matching title. | Normalize once before matching. | Keep existing weights, filtering and ordering. |
| **Deleted in branch** | Two unreferenced client components: the legacy AdSense script and old service route wizard. | Removed after static-graph and active-layout/assistant inspection; tracked AdSense integration and guide search remain active. | No route, JSX consumer, or publisher configuration was removed. |\n| **Added in branch** | No repeatable way to inventory code import reachability while distinguishing Next.js entrypoints from reusable modules. | Manual `npm run audit:codebase` read-only inventory with candidate lists, source sizes, unresolved and computed imports. | **Never delete from the output automatically.** |
| **Done previously** | Admin API request origin/path guard implementations duplicated across five routes. | PR #289 consolidated guards with focused regression checks and was merged before this audit. | Legacy aliases remain closed; Cloudflare Access remains. |

## Confirmed safe to keep (not dead code)

- Next.js convention-based `app/**/page.tsx`, `route.ts`, metadata/image/robots/sitemap entries, including ones with no explicit import.
- `data/youtube-detail-shards/*` and `lib/youtube-detail-shard-modules/*`: sharded movie-detail paths are intentional and must not be removed merely for size.
- GSC/GA4/PostHog/AdSense modules, service-account permissions, `/admin/api/*` guards, tracking exemptions, historical datasets and verification assets: operational or publisher-critical.
- Checked-in service/job/movie/travel source records: publishing and indexing assets, not removable without content-level review and redirect/canonical planning.
- `.agents/skills/fast-production/SKILL.md`, `scripts/fast_path_guard.py`, `.github/CODEOWNERS` and guarded CI policy.

## Remaining investigation queue (not falsely reported as fixed)

1. **Large data modules and bundle boundaries (high):** verify runtime Worker output and per-route JS/RSC transfer. `lib/explore.ts` and `lib/jobs.ts` are monolithic; migrate behind indexed content storage *before* the repository's 5,000-record threshold. Keep current canonical URLs.
2. **Actual dead modules (medium):** run the new graph inventory, inspect computed imports and Next.js conventions, compare production/tool/test reachability and confirm candidate usage before deleting. No unproven module removal.
3. **CSS ownership/overrides (medium):** `app/globals.css`, mobile/theme/UX layers need cascade-preserving review; do not delete duplicate-looking selectors without visual verification.
4. **Current-month live job feed (medium):** `lib/live-job-feed.ts` uses an October 2026-specific page estimate and assigns hardcoded `2026` to scraped day/month values. Verify the upstream archive conventions and design a safe year rollover/source-freshness strategy before editing.
5. **Analytics status (high for admin truthfulness):** direct hourly Google Search Console reporting, GSC Wizard ClickHouse settled-day reporting, GA4 visitors and PostHog events are **different sources**. Keep source and freshness metadata visible. Do not hide ingestion failures behind an unlabeled historical snapshot. Google publication lag cannot be removed by code cleanup.
6. **Security, published URLs, mobile UX and accessibility (needs verification):** review route-specific path/CSRF/session/privacy controls, source links, sitemaps, image loading, search interactions and 320px light/dark behavior with *focused* checks as changes are made.
7. **Unused dependencies/scripts and generated assets (needs verification):** static import reports are not enough to remove dependencies used by CLI, build, Workers or external integrations.
8. **Runtime before/after metrics (not measured):** no instrumented Cloudflare CPU time, RSC bundle, browser JavaScript or Web Vitals profile was obtained in this pass. Do not infer percentage speed-ups from source edits.

## How to continue safely

Use `docs/CODEBASE_CLEANUP_PROMPT.md` as the full execution contract. Before removing any candidate, collect direct usage proof and the smallest test validating that deletion. For this branch the direct checks are:
```bash
node --test tests/codebase-audit.test.mjs
npx tsx --test tests/catalog-hotpaths.test.ts
npx tsx --test tests/global-search-matching.test.ts
npm run audit:codebase
```
The last command is **read-only** and used to investigate candidates; do not put it into a broad always-on test matrix. No production deletion, migrations, data resets or deployment is authorized by this report.

**Acceptance bar:** a change is “completed” only once focused checks pass and it is merged; the overall audit remains open until high-risk items are individually investigated and verified.
