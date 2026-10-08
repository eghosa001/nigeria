# Verified current topics — 8 October 2026

This editorial batch is **not** a licence to publish every social-media hashtag. It adds value to the site's four established pillars and reuses canonicals first.

| User need / canonical page | Decision | Source check |
| --- | --- | --- |
| NECO 2026 SSCE External registration | New **Services** guide because the current SSCE Internal registration page covers *schools*, not private candidates. Add real registration workflow, published date window, two NECO sources and timetable/fee uncertainty. | https://neco.gov.ng/?page_id=27 and https://ssceexternal.neco.gov.ng/ |
| Zecathon 6.0 Hackathon | New **Jobs & Careers** programme guide because there was no existing page; label unmistakably **competition, not employment**. Include applicant criteria, team size, application instructions, challenges, venue/travel costs and published timetable; do not add JobPosting schema. | https://beyondlimits.global/zecathonhackathon/ and https://beyondlimits.global/zecathon6/landing/ |
| Hallelujah Festival Lagos | New **Tour Nigeria** event guide: unlike the existing virtual nightly Hallelujah Challenge, this is a confirmed in-person 30 October event. Source exact free entry and Ikeja area, state venue street address and gate time are still unannounced, and link both guides. | https://www.hallelujahchallengelive.com/int |
| Tele x Zikora | **Strengthen existing** Movie details; verified official studio teaser, core cast, release date and distributor attribution, not a duplicate. | https://www.youtube.com/watch?v=KHytYLBb_Zk |
| Homepage | Four compact cards, one per pillar, with dated expiry; links only to verified, already-written internal canonical detail pages. | `data/home-social-trends.ts` |

**Excluded pending better evidence or relevance:** NNPC's short-term petrol offer is important news, but the current Services architecture is an actionable service-guide library, not a general news feed; no reliable station-level discount/eligibility workflow was available. Peller/Jarvis personal-life gossip is not a film, series, concert or practical service guide. OJISE would require an independently checked film record and official distribution path before an indexable detail page. Studio launch and generic social food hashtags do not justify thin Jobs or Tour pages.

## Disclosure and indexing guardrails

- **NECO**: External fee is *not* copied from the different SSCE Internal exam. The explicit ₦5,000 is an **extra late charge**, not the full exam price. Re-check the primary source close to the normal and late deadlines (26 October and 3 November).
- **Zecathon**: The organiser's Hackathon page contains inconsistent ₦70m/₦90m prize blocks, and its other programmes have different eligibility. Do not headline a specific track prize until the organiser resolves that conflict. Expire the homepage application card on 13 October; the archive guide may still accurately explain the concluded process.
- **Festival**: Do not invent a physical venue address, exact opening time, ticket link or accommodation package. The official visitor FAQ says free attendance and no supplied lodging. When an exact venue is published, re-verify and update before adding a map pin.
- **Movie**: The production teaser is not a full film. Keep the current release as an announced **future** cinema date and link to the legitimate source rather than any pirated stream.
- **Homepage**: After expiry, trend cards automatically disappear. A separate quality review should repopulate with fresh verifiable topics rather than keep stale promotional placements.

## Focused QA

Run `node --test tests/verified-trends-2026.test.mjs`, `npm run check:service-catalog`, `npm run check:jobs`, `npm run check:explore` and `npm run check:entertainment-content`. Keep other unrelated CI minimized unless required by the protected-branch pipeline. Successful CI does not replace a post-deployment phone/browser review.

No duplicate destination pages, source-free gossip posts, speculative ticket sales, or false JobPosting schema are allowed.
