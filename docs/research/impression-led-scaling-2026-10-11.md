# Impression-led improvements and bounded global search — 11 October 2026

## Settled search performance, not live traffic

Connected GSC Wizard ClickHouse for `sc-domain:mynigeriaguide.com` returned settled data **through 8 October 2026**, with query/page coverage 11 September–8 October. No later SEO performance is implied. Decisions are based on the existing canonical URLs, not new keyword-variant pages.

| Observed query and existing URL | Impressions | Clicks | Published change |
| --- | ---: | ---: | --- |
| spotify premium — `/services/spotify-premium-nigeria` | 59 | 0 | Official NG price comparison, plan eligibility, checkout guidance, clear snippet |
| aedc map refund — `/services/aedc-map-refund` | 47 | 0 | Official refund-status checker with meter-number steps and token fallback |
| cac registration — `/services/cac-company-registration` | 71 | 0 | Separate limited-company incorporation from business-name process |
| cac registration — `/services/cac-business-name-registration` | 19 | 0 | Retain its distinct legal intent; no duplicate generic landing page |
| oversabi aunty cast — `/entertainment/movies/oversabi-aunty` | 919 | 6 | Already improved under PR #315; wait for post-merge settled evaluation |
| kainji dam — `/explore/kainji-dam-guide` | 96 | 0 | Already has source-backed separate visitor-access guidance; no duplicate guide |

These figures are pre-edit query/page observations, **not** keyword search volumes or measured improvement.

## Evidence and publication decisions

- **AEDC** primary sources: `https://maprefund.abujaelectricity.com/` (meter lookup) and `https://www.abujaelectricity.com/your-investment-returned-a-simple-guide-to-your-map-refund/` (1 July 2026 token instructions and contact email). No cash or universal refund date claims.
- **Spotify**: `https://www.spotify.com/ng/premium/` showed monthly Nigeria prices of ₦1,600 Individual, ₦800 Student, ₦2,100 Duo and ₦2,500 Family on 11 October 2026. Promotions vary and expire, so readers must confirm live checkout.
- **CAC**: `https://www.cac.gov.ng/services/company-registration` and `https://www.cac.gov.ng/services/business-name` explain different legal registration types. Keep their own canonicals and the existing `/topics/cac-business` entrypoint.
- Editorial outcomes: update three verified records and existing answer-first guides, add two local typeahead routes, **create no new indexable URLs**. Any new page must follow `docs/PUBLISHING_STANDARD.md` and `docs/PREMIUM_UX_STANDARD.md`; never pad content to meet URL targets.

## Scalability boundary

The global search's generated YouTube preview previously mapped, sorted and sliced every matching item for only eight results. A bounded `selectTopMatches` one-pass top-K selection now retains only up to eight relevant candidates, preserving the previous ranking/tie order and avoiding allocating/sorting all matches. It remains O(N) over static data: **not** a million-record search solution.

Use the existing indexed `CONTENT_DB` service/repository architecture when catalogs reach the mandatory 5,000-record migration threshold. Server pagination, per-record publication gates and sharded sitemaps remain required. Do not bundle a million records in browser or Worker memory. The minimal regression test covers score, ties and limits, without a full-site benchmark.

## Evaluation

Before attributing results, compare the **same canonical URLs** using settled, post-deploy Search Console page/query CTR, impressions and position; monitor changes in competing CAC pages rather than pursuing an extra keyword landing page. Check actual usability and source freshness separately; CI alone cannot substantiate a 9+/10 visual score.
