# Existing MyNigeriaGuide content — whole-catalog editorial audit

**Audit date:** 9 October 2026. **Scope:** all current connected-repository catalog records, not an independent crawl of every live rendered route. **Conclusion: the existing published catalog has NOT demonstrated full compliance with the consolidated publishing standard.**

## Exact automated inventory

The change-scoped audit screened **4,811 current catalog records individually**: **2,189 potentially indexable detail records** and **2,622 nonindexable/directory or supporting records**. The earlier 2,163 figure omitted the career guides and person profiles; this expanded review includes them and also separately counts Tour places, nonindexable Jobs and nonindexable YouTube records.

| Existing content group | All records | Indexable details | Median unique source-field words on indexable details | <500 unique source-field words | Strong automated risk flags |
| --- | ---: | ---: | ---: | ---: | ---: |
| Service guides | 672 | 672 | 243 | 672 | 75 |
| Tour guides | 292 | 292 | 157 | 292 | 200 |
| Tour place entries (embedded supporting records) | 303 | 0 | — | — | 0 |
| Curated movie pages | 138 | 138 | 38 | 138 | 0 |
| Series pages | 8 | 8 | 49 | 8 | 0 |
| Entertainment person pages | 16 | 16 | 13 | 16 | 16 |
| Job opportunity / employer records | 237 | 158 | 229 | 157 | 0 |
| Career articles | 10 | 10 | 272 | 10 | 0 |
| Non-curated YouTube video records | 3,135 | 895 | 28 | 895 | 895 |
| **Total** | **4,811** | **2,189** | — | — | — |

These are approximated **page-specific authored record words**, not final rendered length, originality/plagiarism findings, or automatic violation of a publisher's minimum. Source-backed short **job listings** can be appropriately concise without becoming 1,000-word essays. By contrast, **editorial articles** with low source-specific detail warrant substantial improvement.

## Repeated or missing-evidence signals

- **974** indexable editorial guides/articles contained fewer than 500 distinctive source-field words (672 Services + 292 Tour guides + 10 Career articles).
- **895** indexable, non-curated YouTube film details had fewer than 100 source-body words even though their current indexability logic treats a synopsis of **110 characters** as substantively sufficient. This is the strongest systematic risk. Do not assume a YouTube link plus a brief synopsis meets a publisher's article-quality rules.
- **16** person detail records had no inline cited sources in their own records and a median of only 13 source-body words. Their movie credits may give surrounding context, but the person pages require human/source-informed inspection before being treated as substantial biographical articles.
- **45** indexable records triggered exact repeated-body flags; **24** repeated-heading flags and **108** long-paragraph-reuse flags. These may include legitimate references, but warrant review for near-duplicate or copy-paste publication.
- **138** curated movie profiles lacked positive permission evidence in the `artwork.status === "approved"` field checked by this script. **This is not proof that every film displays an infringing image**, since some have no artwork or other approved preview routes; it is a reminder to inspect what each page actually renders and the media-use evidence.
- **16** indexable records had date-age warnings in this particular source-field audit. A date warning is not a proof that facts are outdated; primary-source rechecks are required.
- **2,622** nonindexable/supporting records were still scanned for obvious record-level problems. The audit did **not** forcibly index or deindex any record.

## Current pass/fail determination

**Not pass as a whole.** The repo has basic structural/source validators and reasonable indexation exceptions for many YouTube and employer-only pages. But **passing CI is not equivalent to meeting Ezoic's standards for original long-form editorial content**.

- **Evidence of a real article-quality problem:** extremely short source-specific biographies and short text on indexed YouTube detail pages; light authored detail in every tour and service article.
- **What remains unverified:** actual rendered article word counts, text originality/plagiarism against the web, permitted image usage, real editor attribution, page-by-page factual accuracy, indexation in Google, ad density/consent and live production behavior.
- Existing About, Contact, Privacy, Terms, Editorial and Corrections source files exist. They must still be checked for current accuracy and functional live links.
- The automated inventory covers recorded content in the four pillars, including the full video catalog. It does **not** claim exhaustive inspection of hand-written static hubs, landing pages or actual HTML output from every URL. A separate production crawl would be needed for that.

## Remediation order — no fake filler or indiscriminate mass noindex

1. **Indexed YouTube detail pages:** strengthen truly unique, source-verifiable movie information first, prioritize pages with search impressions and legal viewing routes, and re-evaluate whether the current 110-character test is sufficient to justify indexation. Hold weaker records to directory discovery, not a fabricated 800-word essay. Preserve canonical links.
2. **Entertainment people:** add verified career context, filmographies and source attribution to the existing 16 canonical pages, or reconsider their standalone indexing. Do not manufacture personal biographies.
3. **Tour guides:** provide source-specific, geographically sound transport, budget, logistics and practical itinerary value; prioritize pages with ranking potential and user demand.
4. **Services guides and career articles:** strengthen user-specific decision points, official processes, mistakes, timelines and practical original explanation. Improve important existing URLs rather than creating new keyword copies.
5. **Repeated prose and movie asset review:** inspect the 45 exact-body collisions, 108 reused long passages and movie artwork permissions; resolve them individually based on evidence.
6. **Monitor jobs appropriately:** keep verified closed/open status and employer URL integrity; legitimate short job listings need not become long articles. More substantive career guidance belongs in canonical job-learning articles.

## Owner workload and deliverable

Per the permanent `docs/PUBLISHING_STANDARD.md` rule, **the owner is not expected to proofread every page**. Agents can run this report, triage evidence-backed records, correct low-risk issues, and escalate only copyright/conflict/high-risk cases. Every alteration should be checked against the live/main inventory and managed without duplicating or deindexing existing canonical content simply to improve a count.

**Run:** `./node_modules/.bin/tsx scripts/audit-legacy-content.ts --json`.

**Audit artifact:** GitHub Actions Publisher Readiness Audit — PR #245. The JSON contains the **complete 4,811-row review inventory** with severity labels and reason codes. This is a **review queue, not a verified certification report**.
