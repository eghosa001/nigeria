# Tour D1 continuity audit — 12 October 2026

## Why this work exists

PR #317 introduced a safe, disabled D1 search adapter; it did **not** establish parity for the existing `explorePlaces` catalog. Static places frequently appear on multiple existing guides through reusable slug maps, while the original D1 schema stores only one `guide_slug` and omits `tags`, `mapQuery` and `costNote`. Silently importing rows would remove public associations and lose card context.

## Implemented

- `scripts/tour-migration-audit.ts` constructs a **read-only** canonical candidate manifest from the current checked-in records and every existing `getExplorePlacesForGuide` result.
- Preserves each guide's exact place order as `{placeSlug, guideSlug, position}`. Preserves optional tags, map query, cost and visitor metadata in a separate continuity payload.
- Detects duplicate slugs (even if apparently identical), missing evidence/checked dates, orphan guides, unsupported vague state mappings and missing shared-place identities. Missing state never defaults to an invented state.
- Every candidate is forcibly `editorialStatus: "draft"`; no date or source is treated as publication approval. `productionCutoverApproved` is always false pending explicit editorial and parity decisions.
- `scripts/check-tour-migration-readiness.ts` analyzes the actual current Tour catalog and prints record counts and blocker categories. **No database connection, SQL execution, schema application, staging copy or published record is created**.
- `cloudflare/d1/tour-place-continuity-schema.sql` is a checked-in, *unapplied* schema extension for card display extras and ordered cross-guide memberships. It refers to existing `tour_places` rows but does not publish or mutate them in production until separately executed.
- Focused tests prove duplicate slugs are not collapsed without review, ambiguous geography is not guessed, shared guide order is preserved, extra presentation data survives the projection and D1 publication remains blocked.

## Exact next activation requirements

1. Review the actual audit's unique-slug and ambiguous-state counts; reconcile any duplicates and non-unique venue identities without replacing canonical guide URLs.
2. Decide publication eligibility **per record** with primary evidence, freshness, rights and safety. Do not blanket-promote the static or verified catalog.
3. Inspect the live D1 schema first; if compatible, apply the *reviewed* continuity extension with an explicit database migration. Preserve rollback snapshots.
4. Import draft-only place candidates and guide memberships to a separate staging or explicitly approved D1 surface; verify original position, multi-guide lists, display tags/maps/cost notes, and indexed FTS search.
5. Cut over only when static vs D1 query/result parity (including location, source and ranking), guide rendering, sitemap/canonical parity, noindex rules, latency and rollback are proven. Do not activate `TOUR_PLACES_D1_CUTOVER` from this change.

This is a bounded migration-readiness milestone, not an announcement that the Tour D1 migration has happened or that million-record throughput has been measured.

## Search Console prioritization of existing pages

On the last settled 11 September–8 October query/page window, the existing `/services/check-nin-number` guide showed **32 impressions and zero clicks** for the exact search term `*346#`. That existing URL was retained, the answer-first summary now leads with dialling `*346#`, and the page has a clear NIMC-office alternative and accurate USSD fee caution. No duplicate indexed page. NIMC official `https://nimc.gov.ng/verify-profile` and `https://nimc.gov.ng/mobile-digital-id` were checked 12 October 2026. These historic impressions are **not** evidence that today's rewrite increased CTR.
