# MyNigeriaGuide Search-Demand Growth Implementation Plan

**Status:** Active implementation plan  
**Created:** 2026-10-04  
**Owner:** MyNigeriaGuide  
**Working branch:** `seo/search-demand-roadmap-20261004`  
**Primary goal:** Grow qualified Google impressions and clicks by matching existing MyNigeriaGuide authority to high-demand Nigerian search intent, while adding only genuine content gaps and avoiding duplicate/cannibalizing pages.

---

## 1. Why this plan exists

MyNigeriaGuide already has substantial content coverage:

- 205 verified public service guides in `data/services.json`
- 84 curated Nigerian movie records in `lib/entertainment.ts`
- 33 jobs/career records in `lib/jobs.ts`
- 28 editorial Explore guides in `lib/explore.ts`
- a reusable topic-hub architecture in `lib/growth-hubs.ts`
- dedicated Jobs, Entertainment and Explore product surfaces

The main growth problem is therefore **not simply lack of URLs**. The highest-value work is to:

1. align existing pages with the exact search language Nigerians use;
2. concentrate authority through strong task/topic hubs;
3. fill only proven gaps with significant demand or strategic value;
4. publish trend-led entertainment and recruitment content quickly;
5. expose existing place data through useful location-intent pages;
6. measure indexing and query movement after each batch before creating more pages.

This document is the repository source of truth for that work. No phase should be treated as complete until its checklist is checked here.

---

## 2. Locked implementation rules

### 2.1 Repository execution rules

Follow `.agents/skills/fast-production/SKILL.md`.

For this roadmap:

- content-only changes get content/schema validation only;
- copy/navigation changes get only a focused check when needed;
- do not run the full test suite, repo-wide lint, typecheck, build or browser suite unless the changed surface directly requires it;
- never add broad CI just for this roadmap;
- stop once the changed surface is proven.

### 2.2 SEO/content rules

1. **No duplicate-intent pages.**  
   Do not create separate pages for near-identical searches such as “JAMB portal”, “JAMB login”, “JAMB portal login” and “JAMB login portal” unless user intent is genuinely different.

2. **Prefer updating existing canonical pages.**  
   If a verified guide already answers the search need, strengthen that page, its title/search terms, the relevant topic hub and internal links rather than creating another URL.

3. **Stable URLs.**  
   Avoid putting a year in a slug unless the thing itself is a specific annual exercise. Use titles/copy for the current year.

4. **Official-source-first service content.**  
   New government/service guidance must be supported by current official sources. Conflicting official information stays visible and must not be silently resolved.

5. **No piracy targeting.**  
   Entertainment pages can answer “where to watch” only through legitimate cinema, broadcaster, studio, YouTube, Netflix, Prime Video or other authorized sources.

6. **Trend pages must still be useful after the spike.**  
   Movie/series pages should retain evergreen cast, synopsis, release, platform, trailer and related-title value.

7. **No programmatic local-page spam.**  
   City/hotel/restaurant collection pages must contain enough verified places and meaningful editorial guidance to deserve indexing.

8. **Do not claim search-volume estimates as exact Google counts.**  
   Search demand is directional. Keyword databases disagree, and monthly volumes represent modeled averages rather than exact unique users.

---

## 3. Search-demand priorities

These are directional priorities based on the 2026 research pass and should be refreshed over time.

### Tier A — very high demand / existing coverage

| Search intent | Current site state | Implementation decision |
|---|---|---|
| JAMB portal / login | Strong JAMB guide inventory already exists | Strengthen one JAMB hub; do not create duplicate portal pages |
| JAMB CAPS | Existing `jamb-caps` guide | Retarget metadata/search terms and hub language |
| NYSC portal / login | Existing NYSC guide inventory | Strengthen NYSC hub; add missing journey guidance only when verified |
| WAEC result checker | Existing `waec-check-result` | Strengthen existing page + add WAEC hub |
| NECO result checker | Existing `neco-check-result` | Strengthen existing page + add NECO hub |
| BVN checking/retrieval | Existing `bvn-retrieval` | Retarget existing page; no competing “check BVN” page |
| NELFUND | Existing application/status/repayment guides | Add NELFUND hub |
| NIN modification | Existing NIN correction hub | Expand hub coverage and add genuine NIN-check gap separately |

### Tier B — genuine service gaps

| Gap | Planned treatment |
|---|---|
| Check/retrieve NIN number / NIN code | New verified service guide only after current NIMC route is confirmed |
| Unclaimed dividends in Nigeria | New SEC/registrar-based guide after official-source verification |
| JAMB examination-slip reprint | Add only if official JAMB workflow and current user intent justify a distinct page |
| Other high-volume service gaps | Add only after comparison against all 205 existing service slugs |

### Tier C — product/content expansion

| Area | Planned treatment |
|---|---|
| Nigerian TV/series | Add first-class `/entertainment/series` architecture |
| Current Nigerian releases | Add fast verified movie/series records and monthly release discovery |
| Remote jobs | Add a query-led jobs surface, not copied vacancies |
| Graduate jobs | Strengthen existing `/jobs/graduate` around active verified opportunities |
| Local search | Add curated Lagos/Abuja/hotel/restaurant collection pages when enough verified records exist |

---

## 4. Phase 1 — High-demand existing-service optimization

**Objective:** Capture more impressions from topics MyNigeriaGuide already covers well.

### 4.1 JAMB

**Existing assets:**

- `jamb-2026-utme-registration`
- `jamb-direct-entry-2026`
- `jamb-profile-code`
- `jamb-retrieve-profile-code`
- `jamb-retrieve-lost-epin`
- `jamb-caps`
- `jamb-print-result`
- `jamb-admission-letter`
- `jamb-change-course-institution`
- `jamb-change-name`
- `jamb-correct-date-of-birth`
- `jamb-correct-gender`
- `jamb-correct-state-lga`
- `jamb-matriculation-list`
- `jamb-regularization-condonement`

**Tasks:**

- [x] Rename/reposition the JAMB topic hub around “JAMB Portal 2026” intent while clearly remaining an independent guide.
- [x] Add hub search variants: JAMB portal, JAMB portal login, JAMB CAPS login, JAMB result checker, JAMB admission status and result printing.
- [x] Ensure `jamb-caps` metadata leads with “JAMB CAPS 2026”.
- [x] Ensure `jamb-print-result` targets JAMB-result/check/print intent without pretending MyNigeriaGuide is the official checker.
- [ ] Keep all routes pointing users to official JAMB actions.
- [ ] Review whether exam-slip/reprint intent is already covered; create a new guide only if the official workflow is distinct.

**Definition of done:** One authoritative hub routes each major JAMB intent to exactly one canonical guide and no new page duplicates an existing task.

### 4.2 NYSC

**Existing assets include:** local registration, foreign-trained registration, senate list, call-up letter, relocation, revalidation, remobilization, exemption, lost certificates and corrections.

**Tasks:**

- [x] Strengthen the NYSC hub title/description around “NYSC Portal / Login”.
- [x] Add exact hub search variants for NYSC portal, login, senate list, call-up letter, relocation and registration.
- [x] Expand hub `serviceSlugs` to include the complete verified NYSC journey already in `services.json`.
- [ ] Review missing corps-member journey topics such as camp/PPA/clearance only against official NYSC sources before adding pages.
- [ ] Avoid thin pages for login variants.

### 4.3 WAEC

- [x] Add a WAEC topic hub.
- [x] Route “WAEC result checker”, “check WAEC result”, “WAEC digital certificate”, certificate collection, result confirmation, withheld-result complaint, corrections and timetable intent to existing guides.
- [x] Strengthen `waec-check-result` metadata/search terms.
- [ ] Keep result-checker language clear that the actual result is checked at WAEC’s official service.

### 4.4 NECO

- [x] Add a NECO topic hub.
- [x] Route result checker, result token, e-verify, payment, certificate, institutional verification and timetable intents.
- [x] Strengthen `neco-check-result` metadata/search terms.
- [ ] Avoid creating a duplicate token/check-result page when existing pages cover the action.

### 4.5 BVN

- [x] Retitle/reposition BVN hub around “How to Check/Retrieve BVN”.
- [x] Add search variants “how to check BVN”, “check BVN”, “retrieve BVN”, USSD retrieval, validation and correction.
- [x] Strengthen `bvn-retrieval` SEO title/search terms rather than creating a competing page.

### 4.6 NELFUND

- [x] Add NELFUND topic hub.
- [x] Route NELFUND portal/login/student-loan intent to application, status/upkeep and repayment guides.
- [ ] Add any institutional verification/troubleshooting page only if supported by official NELFUND material and not already answered in an existing guide.

### 4.7 NIN

- [x] Expand the existing NIN hub beyond only “corrections”.
- [x] Include enrolment, verification, slip reissue, SIM linkage and modifications.
- [ ] Keep the planned “check NIN number/NIN code” page separate only if current official NIMC guidance proves a distinct user task.

---

## 5. Phase 2 — Genuine new service gaps

### 5.1 Check NIN number / NIN code

**Proposed slug:** `check-nin-number`

Before implementation:

- [ ] Verify the current NIMC-supported method(s) from official NIMC material.
- [ ] Confirm whether USSD, NIMC app, portal or enrolment-centre routes are current in October 2026.
- [ ] Do not copy obsolete third-party “code to check NIN” instructions.
- [ ] Add official sources and last-checked dates.
- [ ] Add internal links from the NIN hub and relevant NIN guides.
- [ ] Add SEO title/search terms only after the route is verified.

### 5.2 Unclaimed dividends

**Proposed slug:** `unclaimed-dividends-nigeria`

Before implementation:

- [ ] Verify SEC Nigeria’s current unclaimed-dividend lookup/claim route.
- [ ] Document e-dividend mandate only from SEC/official registrar/bank guidance.
- [ ] Explain how to identify the correct registrar.
- [ ] Include scam warning and source links.
- [ ] Link to any related identity/bank services only when useful.

### 5.3 JAMB exam slip/reprint

- [ ] Verify whether the current official JAMB workflow is sufficiently distinct from result printing.
- [ ] If distinct, create one canonical guide.
- [ ] If not distinct, strengthen the existing JAMB page instead.

---

## 6. Phase 3 — Jobs & careers search expansion

### 6.1 Preserve the current verified-jobs model

The current model is strong because records use:

- responsible organization;
- official URL;
- application status;
- verified date;
- deadline/next milestone;
- requirements;
- official source notes.

Do not replace it with scraped vacancy spam.

### 6.2 Remote Jobs in Nigeria

**Planned route:** `/jobs/remote`

- [ ] Add a useful remote-jobs landing surface.
- [ ] Separate Nigerian remote roles from global roles that explicitly accept Nigerian applicants.
- [ ] Reuse verified employer/job data where possible.
- [ ] Do not manufacture or mirror stale vacancies.
- [ ] Include applicant-safety guidance.
- [ ] Add structured metadata and internal links from `/jobs`.

### 6.3 Graduate jobs

Existing: `/jobs/graduate`

- [ ] Retarget metadata/copy around “graduate jobs in Nigeria” and “graduate trainee jobs”.
- [ ] Surface currently open verified opportunities first.
- [ ] Keep closed programme pages useful by showing current status/next cycle rather than deleting them.

### 6.4 Recruitment lifecycle SEO

For government recruitment pages:

- [ ] Keep one durable URL per recruitment programme/organization where feasible.
- [ ] Update that page through application → shortlist → screening → exam → documentation → training/closed.
- [ ] Avoid spinning up separate thin “shortlist PDF” pages unless intent and official source require a distinct resource.
- [ ] Update title/status copy when the stage changes.

---

## 7. Phase 4 — Nigerian TV/series as a first-class entertainment product

**Objective:** Fix the largest entertainment-architecture gap.

### 7.1 Architecture

Add:

- [ ] `/entertainment/series`
- [ ] `/entertainment/series/[slug]`
- [ ] a typed series data model
- [ ] series sitemap inclusion
- [ ] entertainment homepage navigation to Series
- [ ] related series/movie/person links where data supports them

### 7.2 Series record requirements

Every indexable series record should contain, where verifiable:

- title;
- slug;
- year;
- synopsis;
- country;
- genres;
- cast;
- platform/network;
- premiere/release date;
- number of seasons/episodes when confirmed;
- status;
- official trailer/source;
- legal where-to-watch destination;
- poster/artwork rights/source treatment;
- last-verified date.

### 7.3 Priority backfill

- [ ] Koleoso
- [ ] Koleoso Part 6 / Part 7 represented correctly without creating nonsensical duplicate franchise pages
- [ ] Wata Shida
- [ ] Better Half
- [ ] The Ten
- [ ] other currently trending Nigerian series verified during implementation

### 7.4 Search intent

Series pages should naturally answer:

- cast;
- release/premiere date;
- episodes;
- season information;
- trailer;
- where to watch legally;
- plot/synopsis;
- related titles.

No unauthorized streaming/download links.

---

## 8. Phase 5 — Trending Nigerian movies and release pipeline

### 8.1 Current-priority titles

Research/verify before adding:

- [ ] Agbara Nla: The Return
- [ ] MKO
- [ ] First Lady
- [ ] Pushing 30
- [ ] A Land Apart
- [ ] Tele x Zikora
- [ ] Phoenix Fury
- [ ] Wire Transfer
- [ ] To Kill a Monkey

Skip a title if reliable/official information is insufficient.

### 8.2 Monthly release pages

Existing example: `/entertainment/movies/october-2026`

- [ ] Keep monthly release pages current.
- [ ] Link each confirmed title to its durable movie/series page.
- [ ] Do not leave unverified dates presented as confirmed.
- [ ] Make monthly pages useful for “new Nigerian movies” and “Nollywood releases” intent.

### 8.3 Fast-publish workflow

For a trending title:

1. verify title/release with studio, distributor, cinema, streamer or strong primary/industry source;
2. create/update durable title record;
3. add official trailer/watch source;
4. expose through Releases and relevant monthly page;
5. link cast/person pages where they already exist;
6. refresh metadata when cinema → streaming availability changes.

---

## 9. Phase 6 — Explore/local search expansion

### 9.1 Use existing place data

Do not create a new place database if `lib/explore-places.ts` already contains suitable records.

### 9.2 High-intent curated collection pages

Potential routes, only when enough verified entries exist:

- [ ] Cheap hotels in Ikeja
- [ ] Hotels near Lagos airport
- [ ] Hotels in Victoria Island
- [ ] Restaurants in Lekki
- [ ] Restaurants in Victoria Island
- [ ] Beaches in Lagos
- [ ] Things to do in Lagos
- [ ] Things to do in Abuja

### 9.3 Minimum quality bar

An indexable local collection should include:

- a meaningful editorial introduction;
- enough relevant verified places to justify the collection;
- area/address context;
- cost/price guidance where known;
- transport/access advice;
- who the area/collection is best for;
- internal links to city guides and individual place context;
- last-verified or source context where applicable.

Do not generate thousands of location permutations.

---

## 10. Phase 7 — Internal linking, sitemap and discovery

For every new hub or major surface:

- [ ] Include it in the sitemap generation path.
- [ ] Link to it from at least one crawlable high-level page.
- [ ] Add relevant cross-links from child pages where architecture permits.
- [ ] Keep canonicals stable.
- [ ] Avoid orphan pages.
- [ ] Confirm robots/indexability only for the changed routes.
- [ ] Do not mass-submit unchanged URLs.

For existing service optimization:

- [ ] Preserve existing canonical URLs.
- [ ] Update topic-hub queries to match actual user wording.
- [ ] Keep one task → one strongest guide mapping.

---

## 11. Phase 8 — Search Console measurement loop

### Baseline

Recent exports showed the site had only recently begun receiving meaningful impressions. The connected GSC feed can lag behind exported data, so use the freshest reliable source for each review.

### After each deployed batch

Review after enough Google processing time rather than immediately rewriting pages.

Track:

- impressions;
- clicks;
- CTR;
- average position;
- queries newly entering positions 1–20;
- pages with impressions but zero clicks;
- pages with increasing impressions;
- cannibalization;
- discovered/indexed sitemap counts.

### Decision rules

- **Position 4–15 + meaningful impressions:** improve snippet/title/content before creating another URL.
- **Position 15–40:** strengthen topical/internal-link support and intent match.
- **Multiple pages ranking for one identical intent:** consolidate/retarget.
- **No impressions because page is not discovered/indexed:** fix discovery/indexing before rewriting content repeatedly.
- **Trend has passed:** keep durable value; do not delete useful URLs solely because search volume declined.

---

## 12. Implementation batches

### Batch A — existing-service hubs and query alignment

- [x] JAMB hub update
- [x] NYSC hub update
- [x] BVN hub update
- [x] NIN hub expansion
- [x] WAEC hub
- [x] NECO hub
- [x] NELFUND hub
- [x] related service SEO/search-term adjustments

**Validation:** content references resolve to existing public service slugs; focused content/schema validation only.

### Batch B — verified service gaps

- [ ] Check NIN number
- [ ] Unclaimed dividends
- [ ] JAMB slip/reprint decision + implementation if warranted

**Validation:** changed guide schema + changed official links/sources only.

### Batch C — jobs

- [ ] Remote jobs surface
- [ ] Graduate jobs search-intent improvement
- [ ] jobs-home internal linking

**Validation:** focused jobs route/data checks only.

### Batch D — series architecture

- [ ] typed series model
- [ ] series index
- [ ] series detail route
- [ ] entertainment nav
- [ ] sitemap integration
- [ ] initial verified series records

**Validation:** focused series route/data checks.

### Batch E — current entertainment population

- [ ] priority movie records
- [ ] priority series records
- [ ] current release page updates
- [ ] legal trailer/watch links

**Validation:** changed entertainment data/source checks only.

### Batch F — local-search collections

- [ ] first Lagos collection pages
- [ ] first Abuja collection pages where data supports them
- [ ] Explore navigation/internal links

**Validation:** focused collection/filter data checks.

### Batch G — measurement follow-up

- [ ] inspect fresh GSC queries/pages
- [ ] record winners/weak pages
- [ ] prioritize CTR/rank improvements
- [ ] add only newly proven gaps

---

## 13. Definition of overall completion

This roadmap is complete only when:

- [ ] every Batch A–F item is either implemented or explicitly marked “rejected/deferred” with a reason;
- [ ] all major JAMB/NYSC/WAEC/NECO/BVN/NIN/NELFUND intents map to one canonical MyNigeriaGuide destination;
- [ ] the NIN-check and unclaimed-dividend gaps have been verified and either implemented or rejected with source-based reasons;
- [ ] Remote Jobs exists or is explicitly rejected for a documented reason;
- [ ] Nigerian TV/series has first-class architecture and verified initial content;
- [ ] current entertainment releases have a repeatable update path;
- [ ] high-intent local collections exist only where the underlying data is sufficient;
- [ ] new hubs/routes are crawlable and included in discovery/sitemap architecture;
- [ ] post-deployment GSC measurement has been performed and the next iteration is based on real query data;
- [ ] no broad test/CI policy was added or run merely for this project.

---

## 14. Current implementation log

### 2026-10-04

- [x] Batch A focused validation: all topic-hub service references resolve, hub slugs are unique, homepage topic links resolve and SEO-title-map formatting is clean.
- [x] High-demand hubs now exposed from the homepage quick-service links.
- [x] Repository inventory reviewed.
- [x] Existing service, job, movie and Explore coverage compared against search-demand research.
- [x] Duplicate-page avoidance rules defined.
- [x] Detailed repository roadmap created.
- [x] Batch A core hub/query-alignment implementation completed.
