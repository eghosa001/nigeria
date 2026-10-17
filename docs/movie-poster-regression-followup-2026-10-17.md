# October 17, 2026 — Movie poster regression follow-up

## Source of the remaining difference

The earlier code in PR #563 displayed `sourcePreview` artwork or a direct YouTube trailer/full-film thumbnail when available. PR #563 removed both types. PR #578 restored the two pathways but accidentally made `publisherUrl` mandatory for YouTube full films. This property is optional in the canonical `WatchLink` interface. Many carefully sourced records have a direct film URL and last-checked date but store the channel name in `publisher` or the editor's `note`, without a channel profile URL.

The scoped correction restores **20 existing films' source-linked YouTube thumbnails** using their unchanged direct watch links and verification dates. No title, genre, film credit, watch URL, source date or rights statement has been invented or newly marked verified. The media helper still enforces YouTube HTTPS hostnames, a valid 11-character video ID, `platform === "YouTube"`, `access === "full-movie"`, and a nonempty prior `lastChecked` field. Approved/licensed art remains higher priority, with original editorial illustration the last-resort visual fallback. The regressions in `tests/adsense-media-rights-and-service-specificity-20261017.test.ts` explicitly name all 20 recovered source-backed titles.

## Exceptions deliberately not restored automatically

Three previous promotional stills were links mirrored by an independent movie database, not approved rights records or an official distributor/producer image source:

- `wire-transfer-2026` — African Movies Database mirror branded Kuros Studios.
- `phoenix-fury-2026` — African Movies Database mirror branded Fizzy K Pictures.
- `a-land-apart-2026` — African Movies Database mirror branded Take 7 Media.

Attribution and branding do **not** prove that the publisher authorized third-party republishing. The current rights-sensitive image path therefore keeps first-party artwork (or a qualified official YouTube trailer thumbnail) for those until separate permission or a qualifying primary promotional source is documented. Nothing was silently discarded: original `sourcePreview` metadata and links are retained for a future rights review.

This is a source-record and UI-rendering correction, not a real-time verification of publisher image network responses; the shared image component already retries legitimate YouTube thumbnail endpoints and displays a readable fallback on failure.
