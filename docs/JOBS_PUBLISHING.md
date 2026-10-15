# Jobs & Careers publication quality gate

**Effective 8 October 2026.** Applies to each new vacancy, graduate programme and recruitment exercise, and to old postings whenever they are reverified. Implemented by `scripts/check-jobs-content.ts` and its frozen legacy-record baseline (`data/job-publication-legacy-slugs.json`). Never append new slugs to that baseline.

## Before an opportunity can be published

1. **Real employer vacancy** — confirm the actual named opening and active application route using the employer/government's official HTTPS page. Do not transform a generic careers board into an invented opening. Check existing slugs and canonicals first: improve the existing page when intent matches.
2. **Current dates and requirements** — record when it was published (if known), last checked, deadline (if published), role-specific eligibility, required documents, recruitment fees and verifiable application steps. Expired vacancies must not appear open.
3. **Compensation research is mandatory, pay disclosure is not.** Check the actual employer page. If the employer publishes pay, add `remuneration` with the exact amount, currency, period, pay type, direct evidence URL and check date. Label employer-stated **gross** as gross, never as base. If pay is not published, record `publicationReview.payStatus: "not-published"`; do not invent estimates. `baseSalary` JSON-LD must only be emitted for verified employer-stated **base** pay; it is not required for a valid listing.
4. **Worksite research is mandatory, street/postcode disclosure is not.** Verify the exact city/locality and state/country of the worksite. Include street address and postcode only when the employer gives the actual work location, not a corporate HQ or an address found on unrelated maps. Record `publicationReview.worksiteStatus`: `"full-address"`, `"locality-only"`, `"region-only"`, or `"remote"`.
5. **Remote listings** — only classify a job as 100% remote when the employer says so, and record each eligible country. Never use a guessed Nigerian office to fill `jobLocation`.
6. **Structured-data eligibility** — `JobPosting` is reserved for current, individually verified, authorised vacancies, not directories, expired programmes, unknown localities or speculative jobs. Rich snippets are suppressed when actual city/remote eligibility is missing; the ordinary public page may still exist as a useful guide.
7. **Evidence and review** — for every *new or freshly reverified* vacancy, programme or recruitment exercise, add:
   `publicationReview: { evidenceUrl: "<actual employer source>", reviewedAt: "YYYY-MM-DD", payStatus: "employer-reported" | "not-published", worksiteStatus: "full-address" | "locality-only" | "region-only" | "remote" }`.
   The evidence URL must also be in `sources`. For disclosed remuneration, use the same employer source as the pay evidence.
8. **SEO and UX** — concise answer-first page with current status, salary if published, location, requirements, direct employer link, safety note and sources. No thin, overlapping or duplicate SEO pages. Never add schema content that is not visible to visitors.

Run the narrow Jobs content check after changing the catalog: `npx tsx scripts/check-jobs-content.ts`. Do not run unrelated tests or broaden CI. The validator rejects new records without publication review and verifies source consistency, schema location requirements, employer remuneration and expiration.

Google source: https://developers.google.com/search/docs/appearance/structured-data/job-posting
