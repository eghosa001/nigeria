# Tour D1 read-parity seam — 12 October 2026

## Why this change is not a cutover

The current checked-in Tour catalog stores a place's original guide, tags, map search query and cost caveat, and reuses many locations in multiple guides. The first D1 read adapter did not reproduce tags/map/cost or shared guide membership, so switching it on would change public results. The production database's actual schema and row data have not been inspected here.

## Read-side parity improvements

- `lib/tour-place-d1-repository.ts` now reads `tour_place_display.tags_json/map_query/cost_note` from the already-prepared continuity extension (not yet applied in production).
- Searches by guide use `tour_place_guide_memberships` in a bounded published-only query; a place appears once regardless of how many guides reference it. For guide listings without a free-text query, preserve the canonical per-guide `position`; any unmapped rows sort after the reviewed memberships.
- Query counting and page selection bind parameters separately to avoid accidental SQL-filter mismatches. Only named published rows with HTTPS sources are exposed; malformed or large tags fail closed.
- Focused mock DB regression covers current FTS safety, bounded pages, shared guide matching, ordered SQL and the metadata round trip.

## Still blocked (production)

1. Live D1 schema inspection, migration/snapshot and reviewed extension application are required before testing the adapter against production data.
2. Run draft-only import in an isolated staging surface, reconcile unresolved and conflicting locations, review publication status individually.
3. Verify canonical path / details / pagination / result ordering, state-specific FTS, tag and source parity against representative real rows.
4. Plan and verify published-only D1 sitemap export / sharding / deletions in the actual publication workflow, plus rollback.
5. Only after all checks may `TOUR_PLACES_D1_CUTOVER` be explicitly enabled. It remains disabled in this change.

No schema was applied, no data was imported or approved, and no public sitemap was switched to a D1 source. This improves future migration correctness but does not claim million-record throughput.
