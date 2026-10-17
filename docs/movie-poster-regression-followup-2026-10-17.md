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

## Full-catalogue audit and final source repair (October 17)

A follow-up user report prompted a **whole-catalogue runtime audit rather than further batches**. The imported TypeScript registry (measured by GitHub CI, not a source-text scan) is the canonical `entertainmentTitles` catalogue contains **147 titles**, of which **112** had a pre-regression image path (`sourcePreview`, documented artwork, official trailer or full-film YouTube link). The other **35** originally had no external movie picture and already displayed generated first-party artwork. The earlier repairs restored the eligible media for 109 titles. This final pass adds properly linked video previews for two of the three remaining films:

- `a-land-apart-2026`: source-cited [A LAND APART_OFFICIAL TRAILER (2026)](https://www.youtube.com/watch?v=qMoZdjkCAb4) embedded in the [Nile Entertainment October 2026 release coverage](https://whatkeptmeup.com/nigerian-film-news/nile-entertainment-october-2026-releases/). Its video thumbnail is a linked trailer preview, not permission to republish the mirrored database poster.
- `phoenix-fury-2026`: source-cited [original Phoenix Fury movie teaser](https://www.youtube.com/watch?v=TGFvzpk27s4), embedded in the same dated cinema-distributor roundup. This record is specifically the original teaser and must not be confused with the later October 2026 theatrical trailer.

**Current catalogue reconciliation:** **111/112 previous source-backed tiles now have an eligible external image path**; the **only remaining exception is `wire-transfer-2026`**, whose pre-regression image came solely from an independent movie database and for which the rights to republish that poster have not been verified. Publisher Silverbird Film Distribution's September 2026 social promotion establishes that a film trailer exists, but no direct, independently source-checked *official* YouTube film trailer URL has been proven for this title. Do not invent one, treat an unrelated video as this film, or reclassify an editorial-database mirror as licensed.

A new exhaustive regression in the existing movie-media audit test rechecks **all 147 records**, the number of previous media paths, the number of eligible recovered preview paths, the exact remaining exception, both new trailer IDs, and homepage/catalogue/detail use of the shared display component. The original inline illustrated poster remains a visual fallback for all titles, including Wire Transfer and the 35 without documented external imagery.

This confirms code data and eligibility paths, **not** the live remote image server's response on every visitor's device; external CDNs can be offline or impose hotlink protections. The existing remote image component retains alternate-host retries and a readable fallback for those cases.
