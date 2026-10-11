# Nigeria social and search intelligence — editorial operating guide

Updated: **11 October 2026**. Responsible area: MyNigeriaGuide content and SEO.

## Input sources, in priority order

1. **X/Twitter:** public posts surfaced by legitimate search providers and dated, individually attributed observations. An ordinary indexed post is not evidence of an X trend, national ranking or view count. The public Trends24 timeline can be read for individual contextual checks, but **Trends24 forbids automated scraping, bulk storage or republishing**; do not target it with Firecrawl or scheduled scripts. No automated GetDayTrends harvesting without express permission.
2. **Primary verification:** NYSC, CAC, NIMC, government ministries, employer career sites, film distributors, artist/film publisher accounts and event organisers. Check dates, state and city, eligibility, fees, availability, venue and source recency.
3. **News and secondary verification:** Exa and Firecrawl search for current reputable Nigerian reporting. Cross-check with original records, especially recruitment and government services.
4. **Search intent:** the existing Nigeria-localized Google Autocomplete sampling workflow and GSC query data. Autocomplete has **no search-volume field**; X appearances are not Google traffic estimates.

## Connected research monitoring

Firecrawl account search monitor, **MyNigeriaGuide — Verified Nigeria Four-Pillar Trend Watch**, searches daily at **08:00 Africa/Lagos** with a 7-day discovery horizon. It scans service, film, tourism, careers and X-origin search leads. This monitor runs in the connected Firecrawl account, **not in the public website or GitHub Actions**. It does not have repository write permissions or a publication webhook. The historical checks are research leads, not an auto-populated feed. Use Exa interactively as an independent discovery route.

### Review rules

- Record the original URL, dated observation, publication date, last checked day, and a short expiry date for any claim of recency.
- Explicitly distinguish a post or public trend observation from an official fact. No invented X volume, sentiment, influence or Nigerian popularity rank.
- Reuse the existing canonical Movies, Services, Tour, Jobs page. Link news to the existing guide before adding a new page.
- Political controversy, unverified celebrity rumours, sensitive safety allegations, spam, financial promotions and recruitment adverts without official confirmation must not become factual guides.
- Check that tourism attractions have correct geographic areas and safe-access notes; no invented ticket price.
- Check employer-hosted job deadlines and whether a role is graduate or experienced. Expired jobs must leave homepage rotation.
- Keep all four pillars represented in the dated brief. Display source links and distinguish verified updates from X observations. Avoid bulk reproductions of third-party trends tables.

## What is published

- **`data/nigeria-trend-brief.ts`:** manually reviewed, date-bounded, cited items across four pillars, rendered on **`/latest`**.
- **`data/updates.ts`:** verifiable service change notices.
- **`/entertainment/social-trends`:** Nigeria X observations, Facebook/TikTok examples, and video chart context, with disclaimers.
- **`/explore`:** official national tourism season programme and canonical state/city guide links.

The static site's latest page is a **published editorial snapshot** rather than a live Firecrawl stream. Fresh monitoring results require independent verification and a normal focused PR before they affect public pages.
