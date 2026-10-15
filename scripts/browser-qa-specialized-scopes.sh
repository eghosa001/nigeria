#!/usr/bin/env bash
# Source this file inside Browser QA's scope-detection shell. It sees the
# existing $changed and $GITHUB_OUTPUT values and may exit the calling step
# when an isolated content/workstream guard applies. No generated traffic.
# Release notices only change the published entertainment release shelf.
# Do not run stale unrelated service/Jobs growth-baseline assertions.
release_shelf_trigger="$(printf '%s\n' "$changed" | grep -E '^(lib/entertainment-extras\.ts$|app/entertainment/releases/page\.tsx$|tests/release-shelf\.spec\.ts$)' || true)"
non_release_shelf="$(printf '%s\n' "$changed" | grep -Ev '^(lib/entertainment-extras\.ts$|app/entertainment/releases/page\.tsx$|tests/release-shelf\.spec\.ts$|\.github/workflows/ui-qa\.yml$)' || true)"
if [ -n "$release_shelf_trigger" ] && [ -z "$non_release_shelf" ]; then
  echo "run=true" >> "$GITHUB_OUTPUT"
  echo "mode=release-shelf" >> "$GITHUB_OUTPUT"
  echo "Release-content-only changes; run date, source and public shelf browser assertions."
  exit 0
fi

youtube_directory_trigger="$(printf '%s\n' "$changed" | grep -E '^(app/entertainment/youtube/page\.tsx$|lib/youtube-directory-query\.ts$|tests/youtube-directory-query\.test\.ts$|scripts/bench-youtube-directory\.ts$)' || true)"
non_youtube_directory="$(printf '%s\n' "$changed" | grep -Ev '^(docs/|\.github/workflows/(ci|ui-qa|cloudflare-qa)\.yml$|app/entertainment/youtube/page\.tsx$|lib/youtube-directory-query\.ts$|tests/youtube-directory-query\.test\.ts$|scripts/bench-youtube-directory\.ts$)' || true)"
if [ -n "$youtube_directory_trigger" ] && [ -z "$non_youtube_directory" ]; then
  echo "run=true" >> "$GITHUB_OUTPUT"
  echo "mode=youtube-directory" >> "$GITHUB_OUTPUT"
  echo "Run only the affected YouTube movie directory browser regression."
  exit 0
fi

# The large generated source is now decoded from a lossless compact
# artifact. CI checks all source records; one Workers browser smoke
# tests the server route. Avoid a second browser/build matrix.
# The staged D1 read adapter is not wired into a public route; CI
# executes precise SQLite and type checks without browser packaging.
# Staging-only D1 CLI/import configuration has no public UI or Worker
# runtime changes. Its guard tests run in the narrow CI job.
d1_staging_trigger="$(printf '%s\n' "$changed" | grep -E '^(wrangler\.d1-staging\.jsonc$|\.github/workflows/youtube-d1-staging\.yml$|scripts/youtube-d1-staging-runner\.mjs$|tests/youtube-d1-staging-runner\.test\.mjs$)' || true)"
non_d1_staging="$(printf '%s\n' "$changed" | grep -Ev '^(docs/|\.github/workflows/(ci|ui-qa|cloudflare-qa|youtube-d1-staging)\.yml$|wrangler\.d1-staging\.jsonc$|scripts/youtube-d1-staging-runner\.mjs$|tests/youtube-d1-staging-runner\.test\.mjs$)' || true)"
if [ -n "$d1_staging_trigger" ] && [ -z "$non_d1_staging" ]; then
  echo "run=false" >> "$GITHUB_OUTPUT"
  echo "mode=youtube-d1-staging" >> "$GITHUB_OUTPUT"
  echo "Staging-only D1 tooling verified through focused unit checks in CI."
  exit 0
fi

youtube_d1_trigger="$(printf '%s\n' "$changed" | grep -E '^(lib/youtube-d1-repository\.ts$|tests/(youtube-d1-repository\.test\.ts|youtube-d1-full-parity\.test\.mjs)$|scripts/(export-youtube-d1(\.test)?\.mjs|verify-youtube-d1-sqlite\.py)$)' || true)"
non_youtube_d1="$(printf '%s\n' "$changed" | grep -Ev '^(docs/|\.github/workflows/(ci|ui-qa|cloudflare-qa)\.yml$|lib/youtube-d1-repository\.ts$|tests/(youtube-d1-repository\.test\.ts|youtube-d1-full-parity\.test\.mjs)$|scripts/(export-youtube-d1(\.test)?\.mjs|verify-youtube-d1-sqlite\.py)$)' || true)"
if [ -n "$youtube_d1_trigger" ] && [ -z "$non_youtube_d1" ]; then
  echo "run=false" >> "$GITHUB_OUTPUT"
  echo "mode=youtube-d1" >> "$GITHUB_OUTPUT"
  echo "Offline D1 read adapter is validated in focused CI; no runtime route changed."
  exit 0
fi

youtube_runtime_trigger="$(printf '%s\n' "$changed" | grep -E '^(lib/(youtube-library|youtube-detail)\.ts$|data/youtube-runtime-catalog\.generated\.json$|scripts/build-youtube-runtime-catalog\.mjs$|tests/(youtube-runtime-catalog\.test\.mjs|youtube-review-lazy\.test\.ts)$)' || true)"
non_youtube_runtime="$(printf '%s\n' "$changed" | grep -Ev '^(docs/|\.github/workflows/(ci|ui-qa|cloudflare-qa|youtube-entertainment-sync)\.yml$|playwright\.cloudflare\.config\.ts$|lib/(youtube-library|youtube-detail)\.ts$|data/youtube-runtime-catalog\.generated\.json$|scripts/build-youtube-runtime-catalog\.mjs$|tests/(youtube-runtime-catalog\.test\.mjs|youtube-review-lazy\.test\.ts)$)' || true)"
if [ -n "$youtube_runtime_trigger" ] && [ -z "$non_youtube_runtime" ]; then
  echo "run=false" >> "$GITHUB_OUTPUT"
  echo "mode=youtube-runtime" >> "$GITHUB_OUTPUT"
  echo "Lossless catalog parity runs in CI; one Workers directory smoke runs separately."
  exit 0
fi

# Catalog/search maintenance and proven orphan removal cannot change
# a rendered component. CI has focused tests; skip browser install/build.
maintenance_trigger="$(printf '%s\n' "$changed" | grep -E '^(scripts/audit-codebase\.mjs$|tests/(codebase-audit\.test\.mjs|catalog-hotpaths\.test\.ts|global-search-matching\.test\.ts)$|components/(adsense|route-wizard)\.tsx$|lib/(global-search|entertainment-query|entertainment-pagination|youtube-movie-channels)\.ts$)' || true)"
non_maintenance="$(printf '%s\n' "$changed" | grep -Ev '^(docs/|package\.json$|\.github/workflows/(ci|ui-qa|cloudflare-qa)\.yml$|scripts/audit-codebase\.mjs$|tests/(codebase-audit\.test\.mjs|catalog-hotpaths\.test\.ts|global-search-matching\.test\.ts)$|components/(adsense|route-wizard)\.tsx$|lib/(global-search|entertainment-query|entertainment-pagination|youtube-movie-channels)\.ts$)' || true)"
if [ -n "$maintenance_trigger" ] && [ -z "$non_maintenance" ]; then
  echo "run=false" >> "$GITHUB_OUTPUT"
  echo "mode=maintenance" >> "$GITHUB_OUTPUT"
  echo "Focused maintenance tests run in CI; no browser-runtime change."
  exit 0
fi

# Service/job catalog search internals preserve public results via
# a focused equivalence test; avoid unrelated browser packaging.
catalog_hotpath_trigger="$(printf '%s\n' "$changed" | grep -E '^(lib/(search|job-query|job-facets)\.ts$|tests/catalog-search-hotpaths\.test\.ts$|scripts/bench-catalog-search\.ts$)' || true)"
non_catalog_hotpath="$(printf '%s\n' "$changed" | grep -Ev '^(docs/|\.github/workflows/(ci|ui-qa|cloudflare-qa)\.yml$|lib/(search|job-query|job-facets)\.ts$|tests/catalog-search-hotpaths\.test\.ts$|scripts/bench-catalog-search\.ts$)' || true)"
if [ -n "$catalog_hotpath_trigger" ] && [ -z "$non_catalog_hotpath" ]; then
  echo "run=false" >> "$GITHUB_OUTPUT"
  echo "mode=catalog-hotpath" >> "$GITHUB_OUTPUT"
  echo "Search-result equivalence is covered by the catalog CI test."
  exit 0
fi

# Tour guide/place lookup internals have exact-output parity coverage
# in CI; do not rebuild the site or run unrelated browser suites.
tour_lookup_trigger="$(printf '%s\n' "$changed" | grep -E '^(tests/tour-lookup-index\.test\.ts$|scripts/bench-tour-lookup\.ts$)' || true)"
non_tour_lookup="$(printf '%s\n' "$changed" | grep -Ev '^(docs/|\.github/workflows/(ci|ui-qa|cloudflare-qa)\.yml$|lib/(explore|explore-places)\.ts$|tests/tour-lookup-index\.test\.ts$|scripts/bench-tour-lookup\.ts$)' || true)"
if [ -n "$tour_lookup_trigger" ] && [ -z "$non_tour_lookup" ]; then
  echo "run=false" >> "$GITHUB_OUTPUT"
  echo "mode=tour-lookup" >> "$GITHUB_OUTPUT"
  echo "Focused indexed Tour lookup regression runs in CI."
  exit 0
fi


