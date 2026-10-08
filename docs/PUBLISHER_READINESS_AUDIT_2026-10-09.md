# MyNigeriaGuide — Ezoic/AdSense publisher-readiness screening

**Audit data collected 8–9 October 2026 from PR #243** by the read-only catalog script (`npm run audit:publisher`). Status: **NOT VERIFIED AS EZOIC-READY**. Automated record counts do not substitute for a rendered page inspection, plagiarism/licensing review, human author verification, AdSense/MCM consent assessment or actual traffic eligibility.

## Source-authored content inventory

The audit inspects all published service, tour, curated film/series, indexable job and indexable non-curated YouTube **catalog records**. The source-body word estimate counts each record's *stored specific explanatory fields* only. It intentionally excludes generic template paragraphs, auto-generated FAQs, navigation, citations/credits, metadata, site chrome and ad labels. This is **not** the number of visible words on any page and is **not** a plagiarism score.

| Pillar | Records measured | Median authored source words | <150 | <300 | >500 | 800+ | Single source |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Services | 672 | 243 | 31 | 608 | 0 | 0 | 146 |
| Tour Nigeria | 292 | 157 | 133 | 287 | 0 | 0 | 292 |
| Curated movies | 138 | 38 | 138 | 138 | 0 | 0 | 60 |
| Series | 8 | 49 | 8 | 8 | 0 | 0 | 2 |
| Indexable jobs | 158 | 229 | 18 | 137 | 1 | 0 | 99 |
| Indexable non-curated YouTube movies | 895 | 28 | 895 | 895 | 0 | 0 | 895 |
| **Total** | **2,163** | — | — | — | **1** | **0** | — |

No analyzed record had zero recorded source links **under the script's permissive definition**. For movies, a trailer, watch link or supplied preview can count as a source signal; a source URL alone is *not* verification of claims or original editorial analysis.

The readings are a **strong warning of limited authored editorial substance** in many indexed/probably indexed content categories. They do **not prove** every page is under 500 rendered words. The templates can add more display text, but adding repeated template wording is not a substitute for distinctive editorial value.

## Priority remediation (not automated word stuffing)

1. **Entertainment & YouTube:** first review the 895 currently indexable imported video detail pages (median 28 authored words) and the 138 curated film pages (median 38). Verify real distinct plot/production/viewing analysis and legal imagery. Improve high-search-demand canonical films first; keep catalog browsing functional and avoid mass deindexing on a word-count threshold alone. Upgrade or exclude media-only pages from monetization after a *manual* audit.
2. **Tour Nigeria:** audit substantive planning in 292 guides (median 157 authored words); source-specific itinerary, verified transport, cost ranges, accessibility and location advice are more useful than generic paragraphs. One source per guide is not inherently wrong, but add independent and primary confirmations where available.
3. **Services:** prioritize high-impression tasks with actual first-hand explanatory decision value, official fees, pitfalls, timelines and corrective paths. The 672 service records have a higher median (243) but still no >500 record-field entries. Be explicit that templated step explanations don't prove a genuine 800-word article.
4. **Jobs & Careers:** classify the 158 indexable job records as **listings/programme facts**, not 1,000-word editorial posts. Keep role status, direct official application links, legitimate programme eligibility and source freshness first; separate substantive career advice into original evergreen guides. Never extend closed vacancies just to reach a word goal.
5. **Trust/attribution:** About, Contact, Privacy, Terms, Editorial Policy and Corrections source files exist. About and Editorial Policy have been updated to represent all four pillars and originality expectations. **Named authors/qualified editorial reviewers, copyright clearance and actual human edits are still unverified.** Do not invent people or claims of manual review.
6. **External monetization and traffic:** verify actual monthly active users in GA4, Google MCM/AdSense/consent and Ezoic status. Ezoic's general 250k MAU requirement and selective Incubator option remain **external eligibility questions**, independent of article depth.

## What the audit cannot conclude

The repository check does not crawl every hub, directory, utility route, topic page, published production URL or the exact rendered content of these 2,163 records. It cannot test whether writing is scraped or AI-unedited, whether movie imagery is lawfully licensed, whether all 895 YouTube detail pages are truly indexable in Google, whether ads are excessive on mobile, or whether a named person edited the page. Those require a separately evidenced real-page audit and owner editorial review.

Ezoic guidance suggests **more than 15 excellent editorial articles above 500 words**, with roughly **800–1,000 useful words** often a strong aim for articles, but not artificially padded listings. This audit does **not** substantiate 15 qualifying articles; do not claim qualification based on sitewide page count.

## Standing standard and rerun

All future content additions follow **`docs/PUBLISHING_STANDARD.md`** as a single canonical publishing policy, in addition to the owner-locked minimal CI rule and the separate premium UX standard. The new audit command is repeatable, and a path-scoped workflow stores JSON for an editor to triage. Recheck content after genuine rewrites, not after adding boilerplate.

Official references:
- https://support.ezoic.com/kb/article/ezoic-content-guidelines
- https://support.ezoic.com/kb/article/getting-started-ezoics-requirements
- https://support.ezoic.com/kb/article/ezoic-incubator-program
