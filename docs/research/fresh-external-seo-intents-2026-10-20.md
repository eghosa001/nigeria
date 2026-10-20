# Fresh, four-pillar keyword discovery — 20 October 2026

## Sources researched today (external to the site)

- Google Search Central, documentation updates, 1 October 2026: new guidance for generative-AI-assisted content and evaluation. https://developers.google.com/search/updates
- Google Search Central, *Optimizing your website for generative AI features on Google Search*: technical crawlability, original non-commodity answers, query fan-out and unique usefulness; AEO/GEO is not a separate ranking hack. https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central, *Influencing title links*: concise, descriptive, page-specific titles; avoid keyword repetition and dated boilerplate. https://developers.google.com/search/docs/appearance/title-link
- Google Search Central, *Control your snippets*: unique, human-readable descriptions can be generated from accurate, page-specific database facts; meta descriptions do **not** control Google's displayed snippets. https://developers.google.com/search/docs/appearance/snippet
- Google Trends Trending Now Nigeria, sampled 20 October: https://trends.google.com/trending?geo=NG. The returned major football fixtures do **not** fit the four pillars; exclude them rather than create opportunistic content. The Trends interface is dynamic and its values must not be treated as constant.
- Nigerian Revenue Service official Tax ID retrieval portal: https://taxid.nrs.gov.ng/ (individual NIN and organisation CAC/RC lookup choices; no government fee or outcome claims inferred here).
- Detty December Fest official 2026 schedule: https://dettydecfest.com/events/ (18–30 December; 18 December opening), with ticketing evidence at https://tix.dot360.co/discover.
- Nigerian film discovery, October 2026: https://www.bellanaija.com/2026/10/nollywood-movies-cinemas-october-2026/ and https://whatkeptmeup.com/preview/new-in-nigeria-movies-and-tv-shows-to-watch-this-october-2026/. These are editorial coverage, not search volumes or evidence of licensed streaming.
- Google Search Console (private connected property) inspected separately for landing-page fit. **Raw Search Console user/business data are not committed here.**

## Practical keyword families for the next Nigeria-localized Google Suggest sample

| Pillar | New sample seeds | Existing search intent to strengthen (no automatic URL creation) |
| --- | --- | --- |
| Services | `nigeria tax id retrieval nin cac`, `nigerian passport tracking status`, `nigeria landing exit card online`, `nigerian police character certificate diaspora` | Task-based official lookup and tracking, distinct from payment status, with fields and troubleshooting backed by the responsible issuer |
| Tour Nigeria | `detty december fest lagos tickets`, `wizkid detty december 2026`, `design week lagos october 2026` | Organiser-announced event dates, venues, tickets, travel decisions; existing event canonicals before any new page |
| Jobs & Careers | `nysc ppa opportunities nigeria`, `graduate trainee nigeria applications 2026`, `official civil service recruitment nigeria` | Genuine role vs general employer/career portal, eligibility, dated vacancy status, official application route |
| Movies & Entertainment | `october 2026 nollywood cinema movies`, `nollywood movie cast 2026`, `where to watch new nigerian movies legally` | Correctly identified releases, credited cast and official availability; do not create cast/watch keyword variants |

**Evidence boundary:** these are **seed phrases**, chosen after external research. They are not proven Google Autocomplete predictions, monthly search-volume estimates, trends, or ranking results. The collector fetches actual Nigeria-localized Google Suggest suggestions on execution and stores sourced evidence in a short-lived workflow artifact. New publications still require specific primary sources, source dates and original reader value.

## Applied site changes

1. Services: generic metadata titles use the actual user action (tracking, correction, booking, application, payment/refund), without inventing a new edition year from `lastVerified` or implying every task has a fee. Explicit editorial title overrides and current service descriptions remain unchanged.
2. Tour: generic city/destination/itinerary titles describe the visitor task without stamping the review year on evergreen places, and without asserting that a count of imported map records equals currently visitable attractions. Source-verified event titles retain their explicit years.
3. Live weekly autocomplete sampling adds **new** seeds across the four pillars, still reporting only what the external service returns. No automatic publication, generation of keyword-variant pages, change to redirects/canonicals, or bulk metadata-keywords stuffing.

## Validation and interpretation

The focused test is `node --test tests/seo-search-demand-20261020.test.mjs`. A source-labeled keyword research artifact is expected only when the existing Tuesday Google Suggest workflow runs. No claim of an immediate ranking increase, 5,000 recrawls, or changes to the pages already indexed by Google. Evaluate observed page+query CTR and impressions using equally settled periods after deployment.
