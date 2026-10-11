# YouTube catalog → D1: verified, offline migration preparation

**Status:** SQL export tool ready for staging; **NO database created, bound, migrated, enabled or queried in production**. This is an infrastructure prerequisite for MyNigeriaGuide's existing 5,000-record content-store threshold, not an assertion that pages are already database-backed.

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

## Deliberate, later staging import (requires a real owner-approved D1 database)

**Never invent or hardcode a Cloudflare D1 database ID or bind the production Worker to an unverified database.** When a real staging D1 database is created and authorized:

```bash
node scripts/export-youtube-d1.mjs --output-dir /tmp/mynigeriaguide-youtube-d1
```

The export folder must initially be empty. Review `manifest.json` and import files; apply `cloudflare/d1/content-scale-schema.sql` to the **staging** D1 instance first. Apply `part-*.sql` in numerical order in the same explicitly selected staging database using the current Cloudflare Wrangler D1 CLI. Do not use the site's production database name until staging counts and source parity are verified.

Read-only checks after staging import:

```sql
SELECT count(*) FROM content_items
WHERE pillar='movies_entertainment' AND kind='youtube-movie';

SELECT count(*) FROM content_sources AS s
JOIN content_items AS i ON i.id=s.content_id
WHERE i.pillar='movies_entertainment' AND i.kind='youtube-movie';

SELECT count(*) FROM content_items
WHERE pillar='movies_entertainment' AND kind='youtube-movie'
  AND editorial_status != 'draft';
```

Initial import of an empty staging database should yield **3,690** movie records, corresponding publisher sources, and **zero automatically published records**. Existing staging data may change the latter two totals; investigate differences rather than automatically deleting anything.

## Next validation gate: full offline source parity and typed D1 reads

`tests/youtube-d1-full-parity.test.mjs` now constructs the complete exported catalog inside **temporary in-memory SQLite** using the existing D1 schema. It checks **every** movie's canonical URL, full JSON payload, source publisher/watch URL, dates, draft status, source count, FTS row count, foreign keys, SQLite integrity, and idempotent re-import preserving an existing editorial publication decision. The temporary files are deleted when the test finishes.

`lib/youtube-d1-repository.ts` is a small server-only, **read-only** D1 binding interface. It accepts an explicitly supplied, real D1 binding; it does not import a Cloudflare account, provision a database, or change the public website. The public-safe record read requires `editorial_status = 'published'`; the separately named staging-read function can inspect draft source records for migration verification. Both validate the exact video ID, canonical path and trusted watch URL. A staging health function returns status counts only.

When a real D1 instance is provisioned, vinext on Cloudflare Workers supports accessing its binding using `import { env } from "cloudflare:workers"` in **server-only code**. Bind only the owner's actual staging D1 ID as `CONTENT_DB` after it is explicitly created; do **not** guess an ID or edit this project's production Worker config yet. Staging code can pass `env.CONTENT_DB` into the repository boundary, compare results against checked-in records and observe SQL latency.

These added checks establish offline SQL/export correctness and a production-safe read API, **not** a successful Cloudflare D1 connection, database migration, runtime cutover or measured real-user loading improvement.

## Required work before production cutover

1. Provision the actual D1 database and `CONTENT_DB` binding with permission from the owner. No such binding is added here.
2. Run real D1 staging import, read back metadata/payload/source parity, and measure SQL rows-read and query times with pagination and FTS5. Preserve title-search semantics or explicitly test and document changed behavior.
3. Introduce a server-side content repository with bounded D1 queries. Switch one public route at a time behind an explicit feature flag, keeping the checked-in catalog as a safe fallback until verified. D1 never feeds arbitrary raw data to visitors.
4. Keep current canonical URLs, sitemap and index/noindex editorial rules exactly intact; verify the active Workers runtime before a public cutover.
5. Design an **incremental sync updater** that preserves human editorial changes and source verification history. Today's first-import tool deliberately never updates existing records.
6. Record observed Cloudflare cold-start, Worker CPU, rows-read and real-page Web Vitals; do not claim speedups without a paired measurement.

The focused test `node --test scripts/export-youtube-d1.test.mjs` executes the existing D1 schema and generated fixture SQL against ephemeral in-memory SQLite, tests FTS5, stable URLs, full JSON integrity, idempotency and injection-safe escaping. It never contacts a database service.
