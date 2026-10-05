# Movies & Entertainment scale workstream

Branch: `scale-movies-entertainment`

Base commit: `79f494ed1700389ed79bfd18fe51f531d1847e91`

Long-range capacity target: **30,000 useful indexable entertainment URLs** within the MyNigeriaGuide Million-Search Expansion.

Read and obey `AGENTS.md`, `config/scale-targets.json`, and `docs/SCALING.md` before making changes.

## Non-negotiable SEO quality rule

The numeric URL target on this branch is a **capacity ceiling, not a quota**. Do not try to fill it.

Growth is driven by keyword and search-intent opportunities. Before creating a new URL:

- identify a real keyword/query cluster and the searcher's distinct goal;
- check whether an existing page can absorb that cluster and become stronger;
- consolidate synonyms and near-identical keyword variants into one canonical page;
- create a new indexable page only when the intent/entity is materially distinct and enough verified information exists to make it substantial;
- give the page an answer-first section, original useful detail, source/freshness evidence and natural internal links;
- link new pages into the relevant hub/category and update related existing pages so discovery works both ways;
- do not publish orphan pages, doorway pages, spun variants, location-keyword combinations with no unique value, or pages whose main purpose is increasing the URL count;
- keep incomplete candidates draft/non-indexed or merge them into a stronger page.

If the pillar exhausts genuinely distinct high-value search intent before the nominal target, **stop below the target**. Continue improving rankings, CTR, topical authority, freshness and internal linking instead.


## Scope

Own the Movies & Entertainment pillar only.

Primary surfaces:

- `/entertainment`
- `/entertainment/movies`
- `/entertainment/movies/[slug]`
- `/entertainment/series`
- `/entertainment/series/[slug]`
- `/entertainment/people`
- `/entertainment/people/[slug]`
- `/entertainment/releases`
- `/entertainment/trending`
- `/entertainment/youtube`
- cinema/platform discovery related to entertainment

Primary data/code ownership:

- `lib/entertainment.ts`
- `lib/entertainment-extras.ts`
- `lib/series.ts`
- `lib/youtube-library.ts`
- entertainment-specific components/routes/data/scripts
- entertainment-specific tests only

Avoid changing services, jobs or travel data unless absolutely required for a shared bug.

## Search demand strategy

Prioritise pages with proven or likely Nigerian demand:

1. current Nigerian/Nollywood movies;
2. cast searches;
3. actor/filmmaker pages;
4. release-date and where-to-watch intent;
5. official trailers and legal full movies;
6. cinema releases and upcoming titles;
7. Netflix/Prime/YouTube availability;
8. high-interest older films with persistent demand;
9. series and episode-level discovery only where each page has distinct value.

Current GSC signals to exploit include Nigerian movie/cast queries such as The Bride Switch, Love Always Wins, What Tomorrow Holds, In Every Lifetime, and similar titles already producing impressions.

## Content quality rules

Every indexable movie page should contain as much verified data as available:

- correct title and year;
- concise original synopsis;
- cast and featured cast;
- director/creator when verified;
- runtime where verified;
- genre/language;
- release/availability status;
- official or rights-safe watch/trailer source;
- current verification date;
- internal links to cast, related movies, platform/release pages.

Image priority remains:

1. approved/high-quality rights-safe poster;
2. lawful official/distributor/exhibitor source;
3. official YouTube trailer thumbnail only as a fallback;
4. original MyNigeriaGuide artwork when no safe source exists.

Do not use scraped copyrighted posters with unclear rights.

## UX rules

- Clicking any movie card goes to the internal detail page first.
- Movie names remain visible under artwork.
- Trailer embeds must not create excessive vertical empty space.
- Mobile fullscreen video should behave as well as the platform/browser permits.
- Search/filter pages must remain fast and paginated.

## Scale architecture

Do not attempt to reach 30,000 URLs by expanding one giant TypeScript object forever.

Before this pillar exceeds **5,000 catalog records**, migrate the growing catalog behind the content-store/data-access boundary described in `docs/SCALING.md`, using `CONTENT_DB`/D1 and indexed search.

Preserve existing canonical paths during migration.

Do not send more than 1,000 entertainment records to a browser route. Prefer server-side pages of about 30 results.

## Expansion milestones

### Milestone 1 — demand capture

- fill missing titles already showing in GSC;
- expand current 2025–2026 Nigerian releases;
- expand cast/people coverage;
- improve internal links among movie, actor, release and platform pages.

### Milestone 2 — catalog depth

Build toward thousands of high-quality titles/people/watch pages without duplicate intent.

### Milestone 3 — database-backed scale

Move the high-growth catalog to D1 before the repository threshold is crossed.

### Milestone 4 — 30,000 useful URLs

Reach the long-range target only through distinct, source-backed pages that deserve indexing.

## Merge-conflict boundary

Prefer entertainment-only files. Do not edit:

- `config/scale-targets.json`
- `AGENTS.md`
- shared scale documentation
- services/jobs/travel datasets

unless a critical shared fix is required.

If a shared file must change, keep the change minimal and commit it separately so it can be reconciled during merge.

## Inherited MyNigeriaGuide requirements

These requirements come from the existing production standard and must be preserved while scaling.

### Crawlability, SEO and internal linking

- Movie, series, people and YouTube catalogs must remain crawlable from server-rendered/static HTML links. Do not rely on JS-only “Show more” discovery or sitemap-only discovery.
- Keep direct detail links, canonical URLs, breadcrumbs and static Previous/Next pagination where pagination is used.
- New detail pages must be linked from the strongest relevant hub, cast/person pages, release/platform pages and genuinely related titles where available; update existing pages so discovery works both ways.
- Add only valid structured data that matches visible content: Movie/VideoObject/Person/BreadcrumbList or equivalents as appropriate.
- New public pages must enter the correct sitemap and existing IndexNow/Bing discovery flow without breaking canonical sitemap behavior.
- Use Search Console query/impression data to prioritise ranking quick wins before speculative catalog expansion.

### Artwork, trailers and watch behavior

- Every public movie should have visual coverage. Preferred order: permitted high-quality official/approved poster or artwork → lawful distributor/exhibitor/publisher artwork → official YouTube trailer thumbnail as a last external fallback → original MyNigeriaGuide visual.
- Do not use an image with unclear rights merely because it looks better.
- Keep the movie title visibly rendered with the card; artwork must fit its container without awkward cropping/over-expansion.
- Clicking a movie card/poster must open the internal MyNigeriaGuide details page first, never jump directly to YouTube or another platform.
- Watch/trailer availability must come from a verified source. If a source is unavailable or uncertain, suppress source-dependent UI/SEO claims rather than inventing them.
- Embedded trailers should avoid wasted vertical space; mobile fullscreen should behave as landscape where the platform/browser supports it.

### Mobile, theme and performance

- Phone-first: every entertainment page, filter, card, cast section and player must fit small screens cleanly with no text overflow.
- Preserve complete dark-mode readability across cards, forms, filters, badges, search, navigation and hover/focus states; do not introduce hard-coded light backgrounds.
- Do not introduce hydration errors or large client-side catalog payloads. Preserve the site's strong mobile SEO/accessibility/performance baseline.
- Keep AdSense below useful answer/detail content; never place an ad above the answer-first content, and automated-browser QA must not be distorted by ad loading.

### Editorial standard

- Keep current verification dates on watch links, trailers and artwork sources.
- Do not fabricate cast, runtime, director, release date or platform availability.
- Prefer primary publisher/distributor/platform sources; clearly distinguish editorial/database evidence from official availability.
- Original summaries must add value and must not copy publisher descriptions verbatim.

## Validation

Follow the owner's minimal-test rule. Run only directly relevant entertainment/data checks. Do not manually run the full repository suite.
