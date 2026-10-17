# Search Console–driven SEO pass — 17 October 2026

Property: `sc-domain:mynigeriaguide.com`. Search type: Web. Settled reporting window: **17 September–14 October 2026**, inclusive. Source: connected Google Search Console via GSC Wizard (ClickHouse warehouse). Impression and click counts are observed Search Console metrics, **not** estimates of total search volume. Averages include rank variability and device/country mixes.

| Query | Impressions | Clicks | Avg. position | Canonical / intent |
| --- | ---: | ---: | ---: | --- |
| oversabi aunty cast | 996 | 6 | 10.19 | /entertainment/movies/oversabi-aunty |
| oversabi aunty nigerian movie | 768 | 15 | 8.03 | same |
| forevers not long enough movie | 808 | 0 | 7.14 | /entertainment/youtube/y2RkBwUYSvo; distinguish similar titles before altering canonical |
| spotify premium | 510 | 0 | 9.75 | /services/spotify-premium-nigeria; broad branded query is not necessarily a realistic target |
| aedc map refund | 404 | 0 | 9.07 | /services/aedc-map-refund |
| kainji dam | 253 | 0 | 8.50 | /explore/kainji-dam-guide |
| western union tracking | 161 | 0 | 7.09 | /services/western-union-track-transfer-nigeria |
| ibedc map refund | 121 | 0 | 8.45 | /services/ibedc-map-refund |

## Change scope

1. Homepage H1 now identifies its actual four topics (movies, services, travel and jobs), preserving the existing canonical, site description, primary navigation and no invented claims.
2. Oversabi Aunty search title addresses **cast + characters + official viewing options**. Snippet names only the cast-role assignments already checked on the same page. The description links to official listings, **not** guaranteed account playback or a free YouTube upload.
3. Spotify Premium Nigeria title uses local search intent and a year derived from the guide's actual verification year, not hard-coded prices. The page's verified fee detail and original source links remain unchanged.

## Follow-up targets — coordinate with other content agents

- **AEDC/IBEDC refunds:** the existing title and descriptions already match meter/refund/token intent. Wait for sufficient *post-update settled GSC data* before changing again. Reconfirm portals and eligibility, never invent refund timelines.
- **Kainji Dam:** the existing location/history headline and caveated visitor-access answers already match demand. Do not imply dam entry is open or invent a visitor fee.
- **Western Union tracking:** page already targets official MTCN lookup. Do not chase generic international tracking queries with false Nigeria-specific availability claims.
- **Forever Isn't Long Enough / Long Enough:** separate films and multiple movie/video paths exist. Inspect rendered robots, canonical, source identity and indexability before consolidating; avoid alternate title synonyms that may refer to different films.
- **New content:** prefer strengthening canonical hubs, actor profiles, verified official routes and internal links before generating thin keyword-variant pages. No fake update dates or automatically published new titles.

## Verification and measurement

- Run `node --test tests/gsc-targeted-seo-20261017.test.mjs` and the repository's change-scoped checks.
- On deployment, check the home H1, the two edited snippets, rendered canonical and metadata, and that historical guides retain the same URL.
- Compare **query+page** clicks, CTR, impressions and average positions after a full post-deploy settled interval (28 days is a useful comparison) against this 28-day baseline, accounting for indexing lag, external SERP changes and seasonality. CTR change cannot be attributed solely to title edits.
- Do not change robots, sitemaps or `lastmod` solely because a snippet was edited.
