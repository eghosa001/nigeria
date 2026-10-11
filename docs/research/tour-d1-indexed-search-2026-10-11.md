# Tour Nigeria indexed D1 search: guarded adapter and CTR improvements (11 October 2026)

## What is implemented

- The **production database is already registered** as `CONTENT_DB`; the existing content-scale schema includes `tour_places` and the FTS5 `tour_place_search` table with insert/update/delete triggers.
- The new `lib/tour-place-d1-repository.ts` runs prepared, bounded, **published-only** Tour place queries using FTS5 for text and indexed column filters for guide, kind and state. User text is converted into quoted phrase-prefix terms rather than FTS syntax. Queries never pull an entire D1 table into Worker memory. Returned records require source URLs, publication identity and last-checked evidence.
- `lib/tour-place-search-store.ts` is a server-only adapter for the global-search Tour place preview. Without an explicit **`TOUR_PLACES_D1_CUTOVER=enabled`** production setting, it continues using the current static catalog. When enabled, unavailable D1 binding or missing published data does **not** silently resurrect drafts from checked-in data.
- Static previews keep their previous score and tie order, using bounded top-12 selection. Tour D1 previews use indexed, bounded top-12 queries. The rest of the static Tour guide, client directory, sitemap and related-links surfaces remain unchanged.

## Why production cutover is not enabled

An adapter is **not** an editorially reviewed migration. The existing `tour_places` schema does not yet represent all static Tour fields and shared-guide relationships, and no individually reviewed/published Tour corpus or parity proof has been produced. Enabling it today could change results or hide places. Keep `TOUR_PLACES_D1_CUTOVER` unset. This PR does **not** execute a migration, create a database, copy staging drafts, change Worker settings or publish unreviewed content.

To cut over later using the existing schema, first document the source-to-row mapping and publication manifest, preserve duplicate/shared guide associations and current canonical guide URLs, independently review source/freshness/access/image/cost claims, import only approved records without promoting drafts by status, and compare D1 filtered search and ordering to existing public results. **All** affected public Tour surfaces must read from the same authoritative published corpus before removing static assets; publish D1-only canonical pages only once their detail rendering and sitemap paths are verified. Run only the changed-surface parity/rollback, D1 rows-read and latency checks, then activate the isolated flag; rollback is unsetting it.

This is a concrete first indexed read boundary, **not** a claim of supporting 1 million live records or of a completed Tour migration. The 5,000 checked-in record threshold and `docs/SCALING.md` still apply.

## Existing pages with settled search demand

GSC Wizard `sc-domain:mynigeriaguide.com`, settled through **2026-10-08**, showed:
- `mambilla plateau` — `/explore/mambilla-plateau-guide`: 22 impressions, zero clicks, average position 11.64.
- `dufuna canoe` — `/explore/dufuna-canoe-heritage-guide`: 26 impressions, zero clicks, average position 7.42.

Both canonicals gain precise titles and answer-first FAQs addressing location, practical trip access and heritage access uncertainty. No invented ticket price, open-now claim, road safety guarantee or second indexed page. NCMM confirms the Dufuna Canoe is more than 8,000 years old (`https://museum.ng/faq/`); exhibition availability is deliberately not asserted. The Mambilla guide continues to emphasize Taraba/Gembu location and local road/security checks. These are **pre-change** impressions, not verified resulting SEO uplift.

### Minimal validation
Focus on FTS5 query safety, published-only records, bounded result size, reader fail-closed behavior, stable static search results, two URL/title/FAQ changes, and no D1 binding/config modification. Follow `.agents/skills/fast-production/SKILL.md` (do not run an unnecessary full suite).
