# Production D1 registration and cutover evidence

Verified 11 October 2026 against PR #304, source snapshot
`2026-10-10T18:19:44.727Z`, and staging database
`47fdffad-9513-484f-94be-4b176662cc71`. This report supersedes older
statements in YOUTUBE_D1_STAGING.md that production has no binding.

## Completed infrastructure work

- Confirmed Cloudflare account `19a03bec57c0277e01e1e70e241576af` contains
  `mynigeriaguide-content-production`, UUID
  `73b4490a-5242-4c31-be8d-36ba0c327d3c`, in WEUR.
- Inspected the previously empty database, then applied the existing
  `cloudflare/d1/content-scale-schema.sql` using authenticated Wrangler.
  Only the foreign-key pragma was replaced because D1 enforces it already.
  No source rows, publication decisions or staging drafts were copied.
- Read back all 40 non-internal schema objects and matched their type, name
  and SQL exactly against a fresh SQLite application of the checked-in schema.
  Content, sources, refresh queue, jobs and tour tables all contain zero rows;
  `PRAGMA foreign_key_check` returned no violations.
- Ran the actual production build once to verify this changed deployment
  surface. `dist/server/wrangler.json` retains the exact `CONTENT_DB` name,
  database name and UUID. The postbuild script now rejects missing, changed
  or duplicate generated bindings instead of writing a deploy pointer.
- Reproduced and fixed the staging runner's obsolete rejection of every
  production binding. Only the exact registered, separate production identity
  is accepted; unexpected bindings and staging identity collisions fail.
- CI uses dependency-free guard/config tests for this exact registration
  surface. Other runtime/config changes and an active D1 adapter do not qualify
  for this shortcut. Existing owner policy protection is unchanged.

## Read-only parity findings: cutover blocked

The remote staging probe verified all **3,690** source payloads, canonical paths,
publisher watch links and checked dates. All **3,690 are drafts**; public D1
queries return zero published rows. Actual D1 query results matched the SQLite
oracle, but do not match the public static adapter:

| Query | D1 staged total | Static total | Same page IDs/order |
| --- | ---: | ---: | --- |
| Directory page 1 | 3,203 | 3,209 | yes |
| Directory page 2 | 3,203 | 3,209 | no |
| Last-page clamp | 3,203 | 3,209 | no |
| love | 873 | 893 | no |
| Ruth Kadiri | 81 | 73 | no |
| BOLAJI OGUNMOLA TV | 16 | 15 | no |

The 59 read-only queries recorded a maximum 11,070 rows read and maximum
69.1998 ms SQL duration. These are staging observations, not production speed
claims. Plans use FTS but also temporary ordering trees. Preserve legacy
substring/ranking semantics or explicitly resolve the behavior change; reconcile
normalization, curated overlays, duplicates and publisher filters before cutover.

Eight focused repository/query/server tests pass, including publication boundary,
FTS inputs, pagination, static detail parity and no fallback on missing D1 rows.
Across source records, an additional read-only detail comparison found 3,204
exact projected detail matches and 3,689 matching detail indexability decisions.
This is not complete detail parity. Five curated directory records are absent
from the raw import: `XO3_GT1BKPI`, `yuDQCaeGCwk`, `i9xzI3A_jjE`,
`xK9YDX2G2NQ`, `_KFL0VJYJBc`. Preserve their existing movie canonicals.

## Editorial disposition of the imported snapshot

Applying existing normalization, curated precedence, discovery and noindex rules
to all source IDs yields:

| Disposition | Records | Meaning |
| --- | ---: | --- |
| Editorial review candidate | 960 | Already indexable under existing static rules; individual publishing evidence still required |
| Preserve existing noindex listing | 2,244 | Useful discovery metadata, not a newly approved indexable article |
| Hold incomplete metadata | 486 | Missing usable cast/metadata after normalization; keep unpublished |

The static directory has 3,209 entries and 965 indexable entries, including five
curated entries outside the import. These counts describe current behavior,
not a certification of editorial quality. **Zero records were newly approved
for production publication.** No existing URL was deindexed or changed.

Per docs/PUBLISHING_STANDARD.md, each candidate needs an auditable individual
decision covering canonical intent/duplicates, primary factual and legal-watch
evidence, originality/useful film context, current availability, image-use rights,
accurate credits and related navigation. Source API metadata or the existing
110-character synopsis check alone does not establish those facts. Preserve
listing-only noindex decisions; do not bulk promote drafts. Five unresolved
publisher-identity skips remain tracked in issue #281. Catalog-refresh PR #301
must be reconciled before using a later snapshot.

## Remaining release gates

1. Resolve the measured search/list/detail differences, curated-only inventory,
   source overlays and bounded query plans; preserve exact canonicals and noindex.
2. Complete individual editorial decisions and a reviewed publication manifest;
   populate only approved production content, never a blanket staging copy.
3. Establish incremental refresh semantics preserving editorial work and evidence.
4. Verify runtime binding, cache behavior, numbered pages, sitemap inventory,
   AdSense and analytics on the actual candidate deployment before activation.
5. Perform controlled activation with rollback and focused live checks only after
   those gates pass. The owner has authorized safe cutover; missing evidence,
   not a need for repeat permission, is the blocker.

The public store remains explicitly `mode: 'static'`. Architecture parity is
below the release target; production D1 runtime, visual UX and measured retention
remain unverified. No live D1 cutover or sitewide 9+/10 claim is made.
