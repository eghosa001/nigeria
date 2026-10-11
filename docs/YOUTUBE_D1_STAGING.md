# YouTube catalog → D1: verified, offline migration preparation

**Status:** Staging import workflow [38134241304](https://github.com/eghosa001/nigeria/actions/runs/38134241304) completed successfully. The imported snapshot contains 3,690 movies, publisher sources and FTS entries. This is staging data, not publication. Production `wrangler.jsonc` has no D1 binding.

## Server query integration (11 October 2026)

The directory, numbered directory pages and detail/metadata readers now use
`lib/youtube-server-store.ts`. Its explicit default is **static** and preserves
the existing results, canonicals, redirects, metadata, noindex decisions and
cache/static-generation settings. There is no environment-variable switch that
can accidentally attach staging to visitors.

`createYouTubeServerStore({ mode: 'd1', db })` accepts an injected binding for
controlled server validation. It uses parameterized FTS5 search, exact publisher
filtering, 48-row pages, deterministic ordering and the existing detail
normalizer/curated redirects. Public D1 queries require `published`; empty
results, missing records and errors never silently fall back to static data
that could resurrect withdrawn records. Rollback is the explicit static mode.
The separately named staging reader is internal only and has no public endpoint.

Focused evidence:

- SQLite executes the actual query SQL to cover FTS, injection-like inputs,
  page boundaries, stable ordering and exclusion of every non-published status.
- Static server-adapter comparisons preserve existing directory/detail data and
  indexability inputs; published D1 detail normalization is checked separately.
- `scripts/check-youtube-d1-types.mjs` checks the affected server dependency graph
  and syntax of the three changed templates, without building the whole site.
- The integration-only PR CI invokes `scripts/verify-youtube-d1-queries.ts` with
  repository Cloudflare credentials. It verifies the exact staging identity,
  reads all source payloads and publisher evidence in bounded pages, compares
  sampled query results to SQLite, and records D1 rows-read, SQL/wall timings and
  query plans in the `youtube-d1-query-evidence` artifact. It sends SELECT and
  EXPLAIN queries only; no import, schema change, status update or deployment.
- No broad test suite or duplicate post-merge staging probe is added. The
  existing owner policy guard remains intact.

### Cutover remains blocked, not implicitly approved

The current FTS search uses literal Unicode words combined with AND and BM25
ranking. Legacy search uses a contiguous substring of normalized display text
and title-first ranking. These are **not equivalent** (partial words, phrase
ordering, title cleanup, normalized synopses and curated overlays differ).
The remote report exposes comparison results; matching raw-source/SQLite
results does not establish public search parity.

Before activating D1, resolve or approve those semantics and account for curated
records missing from the source import, alternate/related sources, publisher
options, totals, sitemap inventory and static numbered-page generation. Review
the measured query plans: FTS is indexed, while date sorting and JSON publisher
filtering may require dedicated indexes before growth. Offset pages are bounded
to 1,000; larger inventories need a cursor strategy preserving public URLs.

A real production database ID/binding, publication decisions for reviewed
records, an incremental sync strategy, Workers cache/runtime verification and
explicit production cutover approval are still required. **Do not copy draft
statuses to public, bind the staging UUID to production, or claim a production
speedup from staging SQL timings.** Visual/retention scores and production D1
performance remain unverified.

## Why now

The official YouTube source currently has **3,690 movie records**. MyNigeriaGuide already uses a compressed, lossless Worker listing artifact and 16 on-demand movie detail shards. Those reduce bundle input, but the public listing is still eventually limited by bundling a large static catalog. The site's `docs/SCALING.md` requires content-store migration *before* 5,000 records. The existing generic D1 schema (`cloudflare/d1/content-scale-schema.sql`) contains stable canonical paths, editorial status, source history, indexes and FTS5.

## What is implemented

The new `scripts/export-youtube-d1.mjs` reads **authoritative checked-in YouTube movie source data**, validates IDs/watch links/source-check dates, rejects duplicates and emits bounded, deterministic SQL batches plus a SHA-256 manifest.

- Records use existing public canonical paths `/entertainment/youtube/<videoId>`. No redirects or SEO URLs change.
- Full original record JSON is retained in `payload_json`; publisher watch links are stored in `content_sources`. Cast/publisher search terms are indexed by the generic content FTS5.
- **All newly inserted records start at editorial_status `draft`**, regardless of being source-verified. This does not assert that metadata is publication-ready and cannot accidentally expose thin/pending-review records.
- Inserts are additive and idempotent. Existing canonical records, manually approved editorial statuses and existing publisher-source entries are never overwritten by this initial migration.
- Each chunk includes at most **40 movie records** and has its own SQLite transaction. All 3,690 movies would generate 93 batches. Neither a database connection nor a Cloudflare credential is embedded in the exporter.
- Source review candidates remain safely in the existing checked-in and detail-sharded source files. Review candidates are **not** promoted to public database records by this importer.

## Non-writing preview

```bash
node scripts/export-youtube-d1.mjs --dry-run
```

Output reports the source record count, SQL chunk count and estimated SQL bytes. Nothing is written or deployed.

## Authorized staging database — guarded import via GitHub Actions

The owner-provided database configuration has been registered **only** in `wrangler.d1-staging.jsonc`:

- Database: `mynigeriaguide-content-staging`
- Database UUID: `47fdffad-9513-484f-94be-4b176662cc71`
- Binding: `DB` (matches the configuration supplied by the owner)

The staging-only configuration has a distinct Worker name and is **never included in the production `wrangler.jsonc`**. The public D1 read adapter accepts an injected binding and is not yet connected to production. A future active production binding may be named `CONTENT_DB` only after a separately approved cutover.

A new **manual-only** GitHub Actions workflow named **YouTube D1 Staging Import (manual only)** can inspect or populate this database. Nothing runs automatically when a pull request is merged.

1. Open GitHub → repository `eghosa001/nigeria` → **Actions** → **YouTube D1 Staging Import (manual only)** → **Run workflow**.
2. First choose `inspect`; leave confirmation blank. This checks the configured Cloudflare account, verifies the exact staging database name and ID, and reads whether the `content_items` schema exists. **This mode never writes to D1.**
3. Only after the inspection succeeds, run the workflow again choosing `import`, and enter **`IMPORT_STAGING_ONLY`** in the confirmation field. This explicitly approves writes **only to the staging database**, not the public site or production database.
4. The workflow uses the existing GitHub Actions secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, which must belong to the correct Cloudflare account and include D1 read/edit permissions. **Never paste the token into a chat or repository file.**
5. The importer validates the account-listed remote database ID before executing SQL. It exports and verifies original movie records, creates the existing content schema in staging, writes up to 40 records per batch, and verifies the final counts. Re-running is idempotent and does not change manually published statuses.
6. The existing YouTube source JSON, 16 detail shards, 2.13 MB packed runtime listing, canonical links, index/noindex decisions, AdSense and analytics remain **unchanged** in production.

**D1 compatibility:** The existing offline export has explicit SQLite `BEGIN TRANSACTION`, `COMMIT`, and `PRAGMA foreign_keys = ON` controls; Cloudflare D1 operates using implicit transactions and rejects such controls in imported SQL. The staging runner safely strips only the known control lines from temporary copies, retaining the existing reviewed source export and schema unchanged. It rejects any unexpected export format. See [Cloudflare D1 import documentation](https://developers.cloudflare.com/d1/best-practices/import-export-data/).

If the GitHub workflow says required Cloudflare secrets are missing or lacks D1 permissions, set the secrets in GitHub Settings → Secrets and variables → Actions, granting only required Cloudflare permissions. Do **not** change production Worker bindings as a workaround.

### Command-line alternative for an authorized operator

From a checkout with dependencies installed and authenticated Wrangler environment variables:

```bash
node scripts/youtube-d1-staging-runner.mjs --inspect
CONFIRM_YOUTUBE_D1_IMPORT=IMPORT_STAGING_ONLY node scripts/youtube-d1-staging-runner.mjs --import
```

The commands perform the same explicit DB-ID verification and operate **only against the registered staging D1**. Do not run the second command until `--inspect` succeeds.

### Read-only status verification after import

```sql
SELECT COUNT(*) FROM content_items
WHERE pillar='movies_entertainment' AND kind='youtube-movie';

SELECT COUNT(*) FROM content_sources AS s
JOIN content_items AS i ON i.id=s.content_id
WHERE i.pillar='movies_entertainment' AND i.kind='youtube-movie';
```

An empty staging DB populated from the checked-in snapshot should contain 3,690 movie records and corresponding publisher sources. Never mistake this staging import for publishing: every newly inserted movie remains **draft**.


## Next validation gate: full offline source parity and typed D1 reads

`tests/youtube-d1-full-parity.test.mjs` now constructs the complete exported catalog inside **temporary in-memory SQLite** using the existing D1 schema. It checks **every** movie's canonical URL, full JSON payload, source publisher/watch URL, dates, draft status, source count, FTS row count, foreign keys, SQLite integrity, and idempotent re-import preserving an existing editorial publication decision. The temporary files are deleted when the test finishes.

`lib/youtube-d1-repository.ts` is a small server-only, **read-only** D1 binding interface. It accepts an explicitly supplied, real D1 binding; it does not import a Cloudflare account, provision a database, or change the public website. The public-safe record read requires `editorial_status = 'published'`; the separately named staging-read function can inspect draft source records for migration verification. Both validate the exact video ID, canonical path and trusted watch URL. A staging health function returns status counts only.

When a real D1 instance is provisioned, vinext on Cloudflare Workers supports accessing its binding using `import { env } from "cloudflare:workers"` in **server-only code**. The owner's staging D1 ID has now been registered separately as `DB` in `wrangler.d1-staging.jsonc`. Do **not** edit the public production Worker config or introduce a real-user route switch yet. Staging code can pass `env.CONTENT_DB` into the repository boundary, compare results against checked-in records and observe SQL latency.

These added checks establish offline SQL/export correctness and a production-safe read API, **not** a successful Cloudflare D1 connection, database migration, runtime cutover or measured real-user loading improvement.

## Required work before production cutover

1. Inspect the owner-supplied staging D1 via the manual GitHub Actions workflow, then explicitly import the source records there. No production binding is added here.
2. Run real D1 staging import, read back metadata/payload/source parity, and measure SQL rows-read and query times with pagination and FTS5. Preserve title-search semantics or explicitly test and document changed behavior.
3. Introduce a server-side content repository with bounded D1 queries. Switch one public route at a time behind an explicit feature flag, keeping the checked-in catalog as a safe fallback until verified. D1 never feeds arbitrary raw data to visitors.
4. Keep current canonical URLs, sitemap and index/noindex editorial rules exactly intact; verify the active Workers runtime before a public cutover.
5. Design an **incremental sync updater** that preserves human editorial changes and source verification history. Today's first-import tool deliberately never updates existing records.
6. Record observed Cloudflare cold-start, Worker CPU, rows-read and real-page Web Vitals; do not claim speedups without a paired measurement.

The focused test `node --test scripts/export-youtube-d1.test.mjs` executes the existing D1 schema and generated fixture SQL against ephemeral in-memory SQLite, tests FTS5, stable URLs, full JSON integrity, idempotency and injection-safe escaping. It never contacts a database service.
