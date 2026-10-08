# Search Console CTR improvement — 8 October 2026

Source: owner's GSC **Pages** export for 10 September–7 October 2026 (28 days); not a live API snapshot. **759** URLs received **10,394 impressions** and **183 clicks** (sitewide weighted CTR **1.76%**). **679** of these URLs had no recorded clicks. A GSC performance export does **not** measure the number of indexed URLs.

## Why these pages

The following existing canonical pages had **3,390 impressions and 37 clicks** combined (**1.09% CTR**). They already contain verified factual content, so this change improves their search-result title/description wording rather than duplicating guides or adding unverifiable claims.

| Existing URL suffix | Impressions | Clicks | Change |
| --- | ---: | ---: | --- |
| /entertainment/movies/oversabi-aunty | 2,100 | 27 | Cast, story and verified watch-link intent |
| /services/passport-application-tracking | 403 | 3 | Task-first passport tracking; both NIS lookup identifiers |
| /services/anambra-asin-registration | 266 | 3 | Anambra ASIN registration and official AIRS route |
| /services/ninauth-nin-verification | 180 | 2 | NINAuth Sharecode and QR verification |
| /services/nin-date-of-birth-modification | 119 | 0 | Source-checked NIMC fee and official modification portal |
| /services/nigeria-landing-exit-card | 118 | 0 | Free NIS arrival/departure form |
| /services/inec-replace-lost-damaged-pvc | 79 | 1 | INEC PVC replacement intent |
| /services/nrs-individual-tax-registration | 63 | 0 | NRS individual registration/self-service route |
| /services/lagos-lasrra-registration | 62 | 1 | Free Lagos resident registration and biometrics |

Service metadata overrides are in `data/service-seo-overrides.ts`; the movie override is in `app/entertainment/movies/[slug]/page.tsx`. Canonical URLs, on-page official sources, publication gates and existing content are unchanged.

## Follow-up measurement and guardrails

1. After production deployment and Google recrawl, compare this cohort's **page-filtered clicks, impressions, CTR and average position** over equal 28-day periods. Do not count unrecrawled days as a failed title test.
2. Export GSC **Queries** data for each high-impression page before further rewriting the title; page data alone does not identify the query mix or SERP features. Query filtering and real search intent come before additional changes.
3. Google's displayed snippets may differ from supplied metadata. Improved wording cannot guarantee a CTR increase, clicks, ranking gains or indexation.
4. Preserve indexability and canonical rules on YouTube video aliases and incomplete catalog entries; their historical impressions do not warrant creating duplicate movie articles.
5. Improve an existing source-verified canonical guide before considering a new URL. Avoid keyword variants, outdated costs, unsupported availability claims, thin pages and unverified trends.
6. Run only the two focused checks: `node --test tests/gsc-ctr-snippets.test.mjs`. Reverify any fee/availability statement with the official source before changing its SERP claim.
