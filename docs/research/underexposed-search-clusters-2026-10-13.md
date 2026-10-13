# MyNigeriaGuide — neglected search clusters and crawl discovery

**Evidence date:** 13 October 2026  
**Performance window:** 4–10 October 2026, complete settled Search Console data available through 10 October.  
**Scope:** All four existing pillars. This work deliberately excludes repeat optimization of existing heavily revised winners such as Oversabi Aunty, the passport tracker and AEDC MAP refund.

## What the data actually demonstrates

- The site's reported daily organic impressions grew to **5,587 on 9 October** (80 clicks), then **5,144 on 10 October** (54 clicks). Traffic is too young to conclude that it has plateaued.
- Sitewide impression-count and indexation are not the same thing. A URL with zero impressions may be indexed but not selected for those searches; it may also be discovered but not yet crawled/indexed.
- The submitted sitemap index was last reported with **2,712 URLs**, **zero parse errors** and **zero warnings**. Search Console's zero indexed count in individual sitemap rows is inconsistent with actual indexed URL inspections and **must not** be treated as evidence that every URL is deindexed.
- The sitemap-performance query found the following **zero-impression URLs** for 4–10 October: Services **402/987**, Tour **101/298**, Jobs **150/248**, Movies **125/185**, YouTube **926/953**, Core **52/92**. Sitemap inventory changes over time; these denominators are a point-in-time snapshot. These are zero *Google Search appearances for the period*, not automatically failed indexation.
- Specific Google URL Inspection results: `/services/jamb-profile-code`, `/services/waec-check-result`, and `/topics/waec` were **unknown to Google**; `/jobs/graduate` and `/explore/lagos` were **discovered, currently not indexed**. As a positive control, `/entertainment/movies/lionheart` was **submitted and indexed** with successful fetch. This indicates a priority discovery/crawl backlog, **not a proven sitewide robots or canonical defect**.
- Created a focused 25-URL GSC Wizard Indexing Tracker covering existing high-value education, work, tour and movie paths. Tracker records inspections over time; it cannot request or guarantee Google indexing.

## Queue A: common task clusters missing search visibility

| Pillar | Existing destination (canonical) | Search intent to test, not claimed volume | Known observation |
| --- | --- | --- | --- |
| Services | `/topics/jamb-2026` and `/services/jamb-profile-code` | JAMB profile code, CAPS, post-exam admission | Profile-code URL unknown to Google |
| Services | `/topics/waec` and `/services/waec-check-result` | WAEC result checker, e-PIN, certificate | Both inspected URLs unknown to Google |
| Services | `/topics/nysc`, `/services/nysc-senate-list`, `/services/nysc-call-up-letter` | NYSC senate list and call-up letter | No Google impressions for selected service pages in the window |
| Services | `/universities` | School admissions, fees, clearance and student portals | Investigate institution-specific intent and indexing rather than cloning university pages |
| Jobs | `/jobs/graduate`, `/jobs/nysc`, `/jobs/engineering` | Graduate, PPA and engineering jobs | Graduate hub discovered but not indexed |
| Tour | `/explore/lagos`, `/explore/things-to-do-abuja` | City itineraries, places, visitor planning | Lagos guide discovered but not indexed |
| Tour | `/explore/lagos-abeokuta-ibadan-train-guide` | Train route and practical travel | No impressions in window |
| Entertainment | `/entertainment/cinemas` and distinct movie records in Movies sitemap | Cinemas and verified watch locations | No impressions for cinemas directory in window |

**Implemented in this PR:** Change the **Services directory's existing 14-link shortcut set** from repeatedly promoted winners to selected under-discovered education, identity, financial and transport tasks. All 14 destinations were verified present in their current, published sitemaps. This is a small, crawlable internal-link adjustment; it does not create duplicate pages, add boilerplate keywords, or expand the homepage.

## Queue B: existing impressions, no clicks — outside repeatedly edited winners

From **4–10 October**:

| Pillar | Canonical path | Impressions | Clicks | Avg. position |
| --- | --- | ---: | ---: | ---: |
| Services | `/services/nin-date-of-birth-modification` | 142 | 0 | 8.7 |
| Services | `/services/air-peace-online-check-in` | 109 | 0 | 8.4 |
| Services | `/services/western-union-track-transfer-nigeria` | 89 | 0 | 7.2 |
| Services | `/services/nrs-individual-tax-registration` | 88 | 0 | 6.8 |
| Services | `/services/momo-psb-wrong-transfer-reversal` | 86 | 0 | 7.2 |
| Jobs | `/jobs/guides/salary-expectation-nigeria` | 30 | 0 | 6.6 |
| Tour | `/explore/sokoto-state-travel-guide` | 26 | 0 | 6.0 |
| Entertainment | `/entertainment/movies/the-man-i-never-knew` | 113 | 0 | 4.1 |
| Entertainment | `/entertainment/movies/monica` | 94 | 0 | 8.0 |

A page with 0 clicks among 26 impressions should not automatically be rewritten. Compare query/page pairs, search intent, the *actual search result*, indexing state, and attribution before deciding which single existing canonical to change. These are **candidates**, not proof of poor content or a promise that copy changes improve CTR.

## Editorial decision rules

1. **Discovery first** for unknown/discovered URLs: confirm HTTP 200, indexable canonical, rendering, sitemap presence and crawlable parent links. Do not build duplicate URLs as a workaround. Observe URL Inspection again after Google has had time to crawl.
2. **One existing canonical per keyword intent cluster:** expand only demonstrably missing, useful material with verified primary evidence. Avoid multiple pages for minor phrase variants.
3. **Demand and CTR second** for indexed URLs: test the correct search intent and whether the SERP is dominated by the official portal, a video result, or a zero-click answer. Don't treat all zero-click impressions as fixable.
4. **Handle YouTube separately:** the 926 zero-impression URLs warrant quality/uniqueness/indexing-policy review, **not** indiscriminate internal links or mass indexation of duplicate video listings.
5. **No paid clicks, keyword stuffing, thin doorway pages, or bulk resubmission:** none fixes indexation sustainably. Preserve existing four pillars, canonical URLs, concise navigation and publishing policy.
6. **Next measurement:** compare *fully settled* seven-day, pillar-and-URL-level visibility with this baseline. Evaluate increases in the **count of distinct pages receiving impressions**, newly indexed URLs, relevant query diversity, and qualified clicks—not only overall CTR or the homepage's impressions.

## Limits and verification

This PR does **not** claim that Search Console's URL inspections cause indexing, that Google's indexing decisions can be forced, or that new Google clicks have already occurred. The only public-facing change is a modest, verified internal-link adjustment on the Services directory. All substantive article content remains unchanged; future revisions require page-specific primary sources, the publishing standard, and change-scoped checks.
