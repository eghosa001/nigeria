# MyNigeriaGuide scale plan

This repository is being built for the **Million-Search Expansion**: broad, high-quality coverage of the Nigerian search market across four pillars while keeping the site fast, indexable, maintainable and inexpensive to operate.

The numbers below are architecture targets, not traffic promises.

## Target operating scale

The source of truth is `config/scale-targets.json`.

- Addressable search market: **millions of monthly searches** across many query clusters.
- Design target: **10 million monthly pageviews** with headroom to **50 million**.
- Public SEO target: **100,000 useful indexable URLs**.
- Storage/query architecture: support at least **1,000,000 underlying content records** without compiling them all into the Worker bundle.
- Movies & Entertainment: **30,000** useful indexable URLs.
- Services: **20,000** useful indexable URLs.
- Tour Nigeria: **30,000** useful indexable URLs.
- Jobs & Careers: **20,000** useful indexable URLs.

These are long-range coverage targets. They must never be reached by creating thin, duplicate, doorway or unverified pages.

## Scale rules for every new feature

1. **Do not assume the whole catalog fits in memory or in the browser.** New list/search experiences must have a server-side pagination/query path.
2. **Do not make catalog growth increase the Worker bundle forever.** Checked-in TS/JSON remains acceptable during the current small-catalog phase, but a pillar must move to the content store before it crosses 5,000 records.
3. **Do not send more than 1,000 catalog records to a browser route.** Prefer 20–30 rows per server response.
4. **Preserve canonical URLs during storage migrations.** Moving a record from a checked-in file to D1 must not change its public URL, metadata, structured data, internal links or source-verification history.
5. **Shard sitemaps early.** MyNigeriaGuide uses 20,000 URLs per sitemap file to keep comfortable headroom below protocol limits.
6. **Cache public reads.** Public detail pages and catalog pages should be CDN-cacheable where freshness permits. Admin/write paths remain private/no-store.
7. **Keep media out of the application bundle.** At scale, owned/generated images belong in R2 or another asset store. Third-party media must continue to follow the site's rights/source policy.
8. **Search must use an indexed data source at scale.** D1 FTS5 is the planned first search backend; do not implement full-table substring scans for large catalogs.
9. **Freshness is a first-class field.** Jobs need expiry, services need verification dates, movies need availability checks, and travel/events need reviewed dates.
10. **Quality outranks count.** New pages need distinct user intent, a useful answer-first section, real source evidence and meaningful internal links.

## Storage roadmap

### Phase A — current / first thousands

Use the existing checked-in verified datasets while keeping public URLs stable. Sitemaps are sharded automatically and the scale contract is enforced by a focused check.

### Phase B — 5,000 to 100,000+ records per growing catalog

Move high-growth catalogs to Cloudflare D1 behind a repository/data-access boundary.

The prepared schema is at:

`cloudflare/d1/content-scale-schema.sql`

It supports:

- pillar/type/status fields;
- stable canonical paths;
- source and verification records;
- publish/stale/expired lifecycle fields;
- indexed common filters;
- FTS5 full-text search.

Do not create the production D1 binding with a guessed ID. Create the database in the owner's Cloudflare account, then bind it as `CONTENT_DB` and migrate one content type at a time.

### Phase C — high traffic

At sustained high traffic:

- cache read-heavy public pages at Cloudflare;
- use D1 indexes and inspect rows-read/query latency;
- move media to R2;
- use scheduled/queued refresh jobs for jobs, releases, events and source verification;
- split databases by workload only if measured D1 contention requires it.

## Sitemap model

`lib/sitemap-sections.ts` keeps stable first-shard URLs such as:

`/sitemaps/services.xml`

When a section grows beyond 20,000 URLs, additional files are emitted as:

`/sitemaps/services-2.xml`
`/sitemaps/services-3.xml`

This avoids changing the existing first sitemap URL while allowing each pillar to grow safely.

## Progress check

Run only when the scale/storage/sitemap surface changes:

```bash
npm run check:scale
```

It reports current pillar counts and verifies the scale contract and sitemap shard limits. It is intentionally focused and does not replace the owner's minimal-test/CI policy.
