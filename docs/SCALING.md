# MyNigeriaGuide scale plan

This repository is being built for the **Million-Search Expansion**: broad, high-quality coverage of the Nigerian search market across four pillars while keeping the site fast, indexable, maintainable and inexpensive to operate.

The numbers below are **architecture capacity and opportunity targets**, not traffic promises or publishing quotas. The site should be able to support this scale, but each pillar should only grow as far as real search demand and content quality justify.

## Site-wide compact page and quality rule

**Show less at once, not less useful information.** Every pillar landing page must remain scannable on a phone: lead with search and the most useful current actions; show roughly 3–8 featured cards and 8–12 directory records per visible page. Older items, long directories, market-source explanations and secondary filters belong behind pagination, focused category links or native expandable sections. Do not load or visibly stack 100 job cards at once. Avoid duplicate search forms, repeated explanation paragraphs and empty spacing.

Destination discovery must show genuinely different parts of Nigeria, not just the same few cities. Use existing canonical state/city/destination guides and mapped place records before creating a new URL. Every added attraction needs a credible primary source, specific place and state, usable maps/access context, honest variable cost and opening information, checked date, and an internal route to the appropriate guide. Do not fabricate visitor counts, prices, opening hours or trip safety. Check current travel/security advice.

Social trends are discovery leads, **not proof**. Verify a trend's factual claims and freshness independently; surface the strongest few useful topics on the homepage using existing canonical pages first. Expire temporary trends and avoid copying unverified social posts into destination pages.

This page-length rule applies to **Jobs, Tour, Movies and Services** including mobile layouts and detail pages. Keep the full useful SEO information available via details/related pages and semantic links rather than truncating source-backed answers.

### Thin-page publication gate (all four pillars)

- **Do not equate a record with an SEO-worthy page.** A verified employer URL, a YouTube watch link, a city name or a service title can appear in searchable directories without receiving its own indexed article.
- Template-only employer career portals must remain `noindex,follow` and absent from XML sitemaps until employer-specific processes, role types, eligibility and source evidence justify a distinct article. Do not turn a generic role board into a fabricated vacancy.
- YouTube videos with only a publisher/cast fallback and no substantiated plot remain browseable but `noindex,follow`, absent from detail-page sitemaps. Publisher hubs require multiple editorially substantive film guides before their hub may be indexed.
- Directory pagination and filter combinations are useful navigation but should not generate thousands of standalone thin SEO pages. Keep their links working while using canonical and indexing controls appropriately.
- **Editorial promotion requires verified original substance, not longer templated prose.** Reuse and strengthen canonical pages. Consolidate near-duplicates, correct errors, keep source/checked-at evidence and protect inbound links. A passing schema/CI check is not proof that every indexed page satisfies search-engine quality expectations.


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

These are long-range coverage ceilings. They must never be reached by creating thin, duplicate, doorway or unverified pages. If Services, Jobs, Tour or Entertainment runs out of distinct high-value search intent before its nominal number, stop below the number and keep improving the strongest pages instead.

## Quality-first SEO growth model

The unit of growth is a **useful search-intent cluster**, not a keyword and not a URL.

For every prospective page:

1. Identify the real query/task/entity cluster and the likely searcher goal.
2. Check whether an existing page can satisfy that intent better with an update. If yes, strengthen that page instead of creating another URL.
3. Consolidate synonyms and near-identical long-tail keywords into one authoritative canonical page.
4. Create a new page only when the intent or entity is materially distinct and enough verified information exists to make the page genuinely useful.
5. Build the page answer-first, then add evidence, detail, freshness/status, related questions and next actions.
6. Link it naturally into the site: parent hub/category, related sibling pages, and relevant downstream detail pages where available.
7. Keep weak or incomplete records out of the index until they meet the quality bar.

### Interlinking standard

Every indexable page should belong to a topic graph rather than exist alone.

- Detail pages link back to the strongest relevant pillar/category/topic hub.
- Hub pages surface their most useful child pages and important related clusters.
- Related-page links must be contextual and genuinely useful, not sitewide keyword stuffing.
- When a new page is published, update the most relevant existing pages/hubs so discovery works in both directions.
- Breadcrumbs, related-content modules and in-copy links should reinforce topical relationships without creating repetitive anchor-text spam.

### What success means

Success is not reaching 100,000 URLs. Success is increasing the number of high-quality pages that rank for valuable Nigerian search queries, improving impressions, clicks, CTR, average positions and useful on-site journeys while preserving trust and speed.

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
11. **Targets are not quotas.** Never create filler content to hit 20k/30k/100k. Stop at the number of pages the market and evidence can support.
12. **Keyword clusters, not keyword cloning.** Multiple keywords that mean the same thing should normally strengthen one canonical page.
13. **Interlink at publication time.** A new indexable page should update relevant hubs/related pages so it enters an intentional topic graph instead of becoming an orphan.

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
