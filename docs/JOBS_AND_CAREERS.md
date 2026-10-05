# Jobs & Careers scaling rules

The Jobs & Careers pillar follows the repository's Million-Search quality gate. The long-range 20,000 URL figure is a capacity and opportunity ceiling, not a publishing quota.

## What deserves an indexable page

Publish a job or career page only when it represents a distinct employer, vacancy, recruitment cycle, career task or sector intent with enough evidence to answer the user's question well.

- Consolidate keyword variants into one canonical page.
- Keep employer career pages separate from time-limited vacancies.
- A live vacancy needs a responsible official source, current status and a checked date.
- When a vacancy closes, preserve useful recruitment-stage information where it still serves the same intent; never leave an expired Apply call to action.
- Career advice must be substantial, task-specific and source-aware. Do not generate city, role or keyword permutations unless the intent and evidence are genuinely different.
- Every indexable page must link to a parent hub and useful related pages.

## Content graph

The pillar has complementary canonical surfaces: the main /jobs discovery hub, /jobs/<slug> opportunity pages, /jobs/categories/<slug> industry hubs, /jobs/locations/<slug> inventory-backed location hubs, /jobs/professions/<slug> profession hubs, and /jobs/guides/<slug> reusable career-task guides.

Employer identity is normalized in code through lib/job-employers.ts. Multiple vacancies from one employer remain separate opportunity records while employer grouping drives contextual internal links.

Global search includes individual opportunities and career guides. The jobs sitemap includes all four surfaces.

## Freshness and lifecycle

verifiedAt or reviewedAt shows when evidence was checked. open is reserved for an official source that currently exposes an application route or live vacancy. Use career-page when an organisation has a legitimate recruitment route but no specific live opening is being claimed.

A stored open record with a published deadline is treated as closed immediately after that deadline by lib/job-runtime.ts. Jobs pages revalidate hourly so expired opportunities stop appearing in Open Now without waiting for a manual content edit. The focused validation also rejects a stored open record whose deadline has already passed.

Google JobPosting structured data is emitted only for a single vacancy with verified datePosted and location metadata. Broad employer career pages, multi-role recruitment exercises and programmes do not receive JobPosting markup.

International and NGO employers use the International sector instead of being mislabeled as private companies.

## Scale transition

Checked-in TypeScript is acceptable while the catalog is small. The main jobs directory still sends the in-memory catalog to the browser, so the focused jobs check now hard-stops before 500 records. Begin the D1 migration around 300 records instead of waiting for the global 5,000-record content threshold.

The normalized future schema is prepared in cloudflare/d1/jobs-scale-schema.sql: employers, job records, locations and profession facets are separate indexed entities while canonical public URLs remain unchanged. Move reads behind server pagination and indexed search before the hard stop.

Focused validation command: npm run check:jobs.

Do not substitute broad repository builds or unrelated suites when this focused check is sufficient.


## Analytics

Clicks from an opportunity page to an official employer application source emit `job_apply_click` through the existing GA4/PostHog client analytics layer with job slug, employer, effective status and destination host. This measures application intent without collecting application contents.


## Daily freshness audit

The `Jobs Freshness` workflow runs the focused Jobs validator every day. It does not crawl or mutate third-party sites. Its job is to catch data that has become stale by the passage of time: an open record older than the verification window, a passed deadline still stored as open, malformed lifecycle metadata, or a broken internal content graph.

The public UI is deadline-aware independently of the scheduled workflow, so a known deadline stops appearing under Open Now after it passes even before an editor changes the stored status.

## Time-sensitive discovery

`/jobs/new-this-week` uses the employer's original `datePosted`, not MyNigeriaGuide's verification date. `/jobs/closing-this-week` only includes effectively-open records with a published deadline in the next seven days. If either view has no qualifying inventory, its metadata is set to noindex while links remain usable for visitors.


## Scale-to-300 milestone

The checked-in Jobs catalog now targets 300 verified records. The 191-record expansion that takes the pillar from 109 to 300 is intentionally mixed: new employer/public recruitment pathways plus distinct vacancies that were visibly listed on responsible official job boards on 5 October 2026. A career pathway remains `career-page` unless a current vacancy is explicitly being claimed.

This milestone is the upper end of the comfortable checked-in catalog phase. Before another similarly large Jobs expansion, start the prepared D1/server-pagination migration described above so the browser catalog does not keep growing linearly. Do not turn the 20,000-URL capacity target into a page-generation quota.


## Legal and platform-safety rule

MyNigeriaGuide republishes factual recruitment data in its own words and links applicants back to the responsible organisation. It should not copy full employer job descriptions, proprietary images or logos without permission, bypass access controls, or collect applicant credentials on behalf of employers.

Google JobPosting rich-result markup is stricter than ordinary web publication. Third-party JobPosting markup is opt-in only when the record includes public evidence of employer authorization in `jobPostingAuthorization`. Having an official public vacancy URL is not, by itself, treated as permission to advertise the role with Google JobPosting structured data.

The `posting` metadata may still be retained for factual features such as New This Week. Without `jobPostingAuthorization`, `buildJobPostingJsonLd` returns null.

## Server pagination boundary

The Jobs directory no longer hydrates the full catalog into the browser. `/api/jobs` performs query, sector, status, location and profession filtering on the server and returns at most 24 directory cards by default. The browser receives only the current result page.

The canonical opportunity pages and sitemap remain unchanged. Checked-in TypeScript remains the current server-side source of truth at the 300-record milestone, while the prepared D1 schema remains the next storage migration. The focused validator now hard-stops before 1,000 in-memory records so D1 storage must be bound before that threshold.
