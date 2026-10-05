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

The pillar has four complementary surfaces: the main /jobs discovery hub, /jobs/<slug> opportunity pages, /jobs/categories/<slug> industry hubs, and /jobs/guides/<slug> reusable career-task guides.

Global search includes individual opportunities and career guides. The jobs sitemap includes all four surfaces.

## Freshness and lifecycle

verifiedAt or reviewedAt shows when evidence was checked. open is reserved for an official source that currently exposes an application route or live vacancy. Use career-page when an organisation has a legitimate recruitment route but no specific live opening is being claimed.

International and NGO employers use the International sector instead of being mislabeled as private companies.

## Scale transition

Checked-in TypeScript is acceptable while the catalog is small. The main jobs directory currently sends the in-memory catalog to the browser, so the focused jobs check hard-stops before 1,000 records. Before the pillar approaches the repository's 5,000-record database threshold, move reads behind the prepared D1 content-store boundary with server pagination and indexed search while preserving canonical URLs.

Focused validation command: npm run check:jobs.

Do not substitute broad repository builds or unrelated suites when this focused check is sufficient.
