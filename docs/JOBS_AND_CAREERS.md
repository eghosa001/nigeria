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

Google JobPosting structured data is emitted only for a single vacancy that also has recorded public evidence of employer authorization, verified datePosted and location metadata. Broad employer career pages, multi-role recruitment exercises and programmes do not receive JobPosting markup.

International and NGO employers use the International sector instead of being mislabeled as private companies.

## Scale transition

Checked-in TypeScript is acceptable while the catalog remains moderate. The public Jobs directory is already server-paginated through /api/jobs, so the browser receives only the current result page instead of the entire catalog.

The normalized future schema is prepared in cloudflare/d1/jobs-scale-schema.sql. Bind D1 before the in-memory server catalog approaches the focused 1,000-record hard stop; employer, job, location and profession entities should move without changing canonical public URLs.

Focused validation command: npm run check:jobs.

Do not substitute broad repository builds or unrelated suites when this focused check is sufficient.


## Analytics

Clicks from an opportunity page to an official employer application source emit `job_apply_click` through the existing GA4/PostHog client analytics layer with job slug, employer, effective status and destination host. This measures application intent without collecting application contents.


## Daily freshness audit

The `Jobs Freshness` workflow runs the focused Jobs validator every day and on Jobs-content pull requests. It also performs a focused external-link audit of Jobs/Careers source URLs. HTTP 404/410 responses and DNS-not-found failures are treated as definitive breakages; access blocks, rate limits and transient server errors are surfaced for human review rather than misclassified as dead links.

The public UI is deadline-aware independently of the scheduled workflow, so a known deadline stops appearing under Open Now after it passes even before an editor changes the stored status.

## Time-sensitive discovery

`/jobs/new-this-week` uses the employer's original `datePosted`, not MyNigeriaGuide's verification date. `/jobs/closing-this-week` only includes effectively-open records with a published deadline in the next seven days. If either view has no qualifying inventory, its metadata is set to noindex while links remain usable for visitors.


## Quality correction after the 300-record wave

The site briefly reached 300 Jobs records, but the quality review found that 109 individual role pages had been generated from employer board titles without distinct role-detail URLs or enough role-specific requirements. Those pages violated this document's own quality rule.

They are no longer published as indexable vacancy pages. Their old URLs permanently redirect to the relevant employer career portal so visitors and search engines do not hit dead pages. Employer-wide career pages remain only when there is a responsible official career/recruitment source, and the UI now labels them as employer portals rather than pretending they have one universal set of vacancy qualifications.

The 300 figure remains a future scale target, not a quota. Rebuild toward it only with distinct official role sources, substantive role-specific requirements, concrete application steps and working source links.


## Legal and platform-safety rule

MyNigeriaGuide republishes factual recruitment data in its own words and links applicants back to the responsible organisation. It should not copy full employer job descriptions, proprietary images or logos without permission, bypass access controls, or collect applicant credentials on behalf of employers.

Google JobPosting rich-result markup is stricter than ordinary web publication. Third-party JobPosting markup is opt-in only when the record includes public evidence of employer authorization in `jobPostingAuthorization`. Having an official public vacancy URL is not, by itself, treated as permission to advertise the role with Google JobPosting structured data.

The `posting` metadata may still be retained for factual features such as New This Week. Without `jobPostingAuthorization`, `buildJobPostingJsonLd` returns null.

## Server pagination boundary

The Jobs directory no longer hydrates the full catalog into the browser. `/api/jobs` performs query, sector, status, location and profession filtering on the server and returns at most 24 directory cards by default. The browser receives only the current result page.

Canonical high-quality opportunity pages and sitemap coverage remain unchanged. Retired thin vacancy URLs permanently redirect to their employer portal instead of returning 404. Checked-in TypeScript remains the current server-side source of truth while the prepared D1 schema remains the next storage migration. The focused validator hard-stops before 1,000 in-memory records so D1 storage must be bound before that threshold.


## Source reliability rule

An official URL is not sufficient if ordinary users cannot reach it safely. The focused Jobs link audit treats HTTP 404/410, true DNS-not-found, expired TLS certificates and certificate hostname mismatches as failures. Anti-bot 403/429, temporary 5xx responses and transient DNS resolution errors remain review warnings.

The Dana Group career portal is intentionally retired from the active Jobs catalog because the employer's visible career information page currently routes its "View Jobs" action to a host with an expired TLS certificate. Dana's former MyNigeriaGuide career/vacancy URLs permanently redirect to the FMCG & Manufacturing hub until a safe official application route is available.
