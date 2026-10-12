# Search Console improvement decisions — 12 October 2026

**Input:** owner-provided GSC Pages and Queries CSV exports for **14 September–11 October 2026**; the accompanying performance trend screenshot. The exports contain **637 page rows** and **2,125 query rows**. Page rows sum to **8,183 impressions / 82 clicks** (1.00% observed CTR); query rows sum to **10,039 impressions / 104 clicks** (1.04% observed CTR). **These two extracted dimension totals do not reconcile** and must not be substituted for a property-wide performance total or added together. Exact date-level data and pre/post-deployment segmentation are not present in the CSVs. The screenshot alone does not establish per-day growth or the effectiveness of recent deployments.

This is an internal editorial queue, **not visitor-facing content**. Metrics below are Search Console impressions, not keyword search volumes. Distinct URLs and verified intent matter more than adding URLs.

| Canonical URL / query evidence | 28-day GSC page impressions / clicks / position | Decision on 12 October |
| --- | --- | --- |
| /entertainment/movies/oversabi-aunty — “oversabi aunty cast” (932 query impressions, 6 clicks) | 1,865 / 25 / 9.38 | The existing cast and regional availability summary was improved on 11 Oct. **Hold metadata steady** until there are settled post-deployment observations; do not spin up cast/where-to-watch doorway pages. |
| /entertainment/youtube/y2RkBwUYSvo — “forever isn't long enough” variants (including “long enough nigerian movie” 97 impressions) | 279 / 0 / 7.22 | Existing exact-film title, cast and original YouTube details already present. Review the correct title and potential intent mismatches on a later settled comparison; do not invent alternative film names. |
| /entertainment/youtube/X3HaWmJoSRU and /entertainment/youtube/Yu-QxqPDmXM — “once upon a village cast” (178 query impressions, 3 clicks) | 238 / 2 / 5.50 and 68 / 1 / 8.41 | **Changed:** link both official episode pages to the existing canonical series cast and episode guide. Do not duplicate the series and episode pages. |
| /services/anambra-asin-registration — “how to get asin number anambra state” (54 query impressions) | 225 / 2 / 8.42 | Canonical registration/lookup distinction already checked against AIRS sources on 12 Oct; **no repeat edit**. |
| /services/passport-application-tracking | 182 / 1 / 11.23 | NIS tracker already has two-identifier instructions checked 12 Oct; monitor without title churn. |
| /services/aedc-map-refund — “aedc map refund” (211 query impressions, 0 clicks) | 170 / 1 / 9.50 | Existing official meter checker/token instructions refreshed 11 Oct; maintain accurate promise (energy credit, not cash), then remeasure. |
| /services/spotify-premium-nigeria — “spotify premium” (259 query impressions, 0 clicks) | 145 / 0 / 9.70 | The official commercial brand often satisfies navigational intent. Current prices and checkout instructions were verified on 11 Oct; do not claim all generic-brand impressions can be won. |
| /explore/kainji-dam-guide — “kainji dam” (181 query impressions, 0 clicks) | 139 / 0 / 8.04 | Already has factual answer-first location, history and controlled visitor-access guidance; assess SERP intent before restructuring. |
| /services/ibedc-map-refund — “ibedc map refund” (51 query impressions, 0 clicks) | 72 / 0 / 8.50 | **Changed:** clearer IBEDC MAP refund checker and token-order title/description plus GSC-language questions. Existing IBEDC primary portal was last checked 5 Oct. |
| /services/western-union-track-transfer-nigeria — “western union tracking” (62 query impressions, 0 clicks) | 58 / 0 / 7.40 | **Changed:** MTCN-driven status-check title/description and official tracking questions. Existing Western Union source was last checked 5 Oct. |
| /services/pencom-open-rsa | 168 / 0 / 46.77 | Primarily a **ranking/intent gap**, not a high-position CTR fix; source-backed registration guide checked 12 Oct. Review further only with page-level query alignment evidence. |
| /services/cac-company-registration — “cac registration” (97 query impressions, 0 clicks) | 111 / 0 / 20.51 | Existing company-vs-business-name distinction refreshed 11 Oct; avoid cannibalising two separate legal intents. |

## Four-pillar reach (page export only)

- **Movies & Entertainment:** 148 rows, 4,049 impressions, 65 clicks. Keep verified cast + legal watch instructions above the fold, improve episode-to-series navigation.
- **Services:** 265 rows, 2,903 impressions, 15 clicks. Prioritise official action pages with existing top-ten rankings rather than launch new overlapping topics.
- **Tour Nigeria:** 84 rows, 590 impressions, 0 clicks. Reinforce access, map context and related city itineraries with factual primary sources; the highest existing Kainji page was already revised.
- **Jobs & Careers:** 55 rows, 253 impressions, 2 clicks. Preserve vacancy freshness, direct verified apply links and retired-job protections; weak impression sample is **not** evidence to fabricate more openings.

## Implementation and verification

- Files: `data/service-seo-overrides.ts`, `data/search-query-overrides.ts`, and `app/entertainment/youtube/[videoId]/page.tsx`. Existing canonical URLs, index/noindex, structured data, sitemap, source policies and ad positions are unchanged.
- Keep titles short and descriptions accurate. IBEDC tokens are energy credit, loaded oldest first; Western Union tracking requires the MTCN. No universal approval or payment timing is promised.
- Confirm inserted keys occur once, crosslink targets the existing cast anchor and snippets are below 155 characters. Do not run broad CI for copy/navigation-only changes.
- **Measure next** using *settled post-deployment data only*: compare each unchanged canonical URL's page impressions, clicks, CTR and average position over equivalent date windows. Separate branded navigational intent from informational intent and avoid attributing changes to a deployment when the report includes pre-change dates. If Google rewrites a snippet, do not infer it used the metadata.
