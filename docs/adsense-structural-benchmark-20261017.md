# MyNigeriaGuide structural benchmark — 17 October 2026

## Objective
Improve the likelihood of meeting Google's **unique value and navigation** expectations while the owner's already-submitted AdSense review proceeds. There is no known AdSense acceptance score or promised approval.

## Benchmarks and techniques
- **GOV.UK** (https://design-system.service.gov.uk/patterns/start-using-a-service/): Start from an intelligible service outcome; separate requirements, route, costs, and next steps. *Implemented:* existing service journey cards now expose an **individually researched alternative** on reviewed services. Inferred generic journeys remain explicitly general.
- **Indeed** (https://www.indeed.com/career-advice/finding-a-job/job-requirements): Emphasise employer qualifications and decisions. *Implemented:* a user-controlled preparation checklist on individual vacancies **only while the verified effective status is open**. No applicant data is collected or saved; employer controls eligibility.
- **Lonely Planet** (https://www.lonelyplanet.com/articles/things-to-know-before-traveling-to-lagos): Practical trip-building rather than attraction lists alone. *Implemented:* a contextual link from destination guides to the first-party trip planner, excluded for guides carrying a do-not-travel advisory.
- **IMDb** (https://help.imdb.com/article/imdb/new-features-updates/title-full-credits-redesign/GTYSEUDJJTCGW895): Separate cast, viewing and section navigation; retain provenance on disputed credits. *Maintained:* no forced verification on the four unresolved films.
- **Google AdSense** (https://support.google.com/adsense/answer/7299563): Original user value, clear navigation and material original contribution beyond third-party videos.

## Actual live audit — 50 high-traffic URLs
A live GSC Wizard on-page check across 50 URLs drawn from connected Search Console reporting found **46 indexable and 4 deliberately noindex** YouTube profiles that canonicalise to the richer film page. The automated tool labels the intentional noindex pages "critical"; this is **not a defect to reverse** without reviewing indexation intent. It reported 23 signals in total (some intentional, many title-length warnings). Notable actionable findings:
- Three series detail pages had overlong generated metadata descriptions and titles. Condensed SEO metadata while retaining the full editorial story in the body.
- The film profile titles for *The Man I Never Knew*, *Sister Agatha* and *My Housemate*, plus the October film listing, were longer than needed. Reduced their titles without deleting facts.
- The employer Organization structured-data check flagged missing logo on the Nigerian Army vacancy page. **Do not invent or reuse an unauthorised logo** to satisfy this diagnostic. Resolve only after identifying a lawful authoritative asset and correct schema requirement.
- All other audited content remains subject to human originality, source and rights checks.

This is a sampling and code-quality exercise, not proof that the other catalogue pages have been individually reviewed. The raw connected audit can be rerun and extended; performance data lags settlement.

## Release gates
- No fabricated agency alternatives or one-size-fits-all instructions.
- Live application state evaluated at request time, not based solely on historical employer pages.
- Frontend controls accessible on mobile, and no credential or applicant-detail collection.
- Publication audit must retain unresolved evidence reviews and zero new blockers.
- Browser, Cloudflare and deployment checks must pass before production merge.
