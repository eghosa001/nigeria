# MyNigeriaGuide — evidence-driven SEO execution

**Policy:** implement useful, verified improvements whenever their required data and tooling are available. Do not impose an artificial month-by-month publishing roadmap, recurring page-count quota, or date by which the site must reach an arbitrary URL/traffic figure. The number of source-verified, useful search intents governs the number of pages.

This plan replaces fixed rollout stages and horizon-specific traffic predictions. The existing [publishing rules](PUBLISHING_STANDARD.md), [scaling safeguards](SCALING.md), source/rights policy, and change-scoped testing requirement remain authoritative. Source verification dates, real application deadlines, expiry dates and operational monitoring remain required; they are **not scaling deadlines**.

## Already built / reuse instead of rebuilding

- Four public content pillars and compact mobile-first landing pages.
- Canonical guides, sources, editorial review and expiration/verification controls.
- Per-content-type sharded XML sitemaps, robots directives, metadata, structured data and a noindex site-search route.
- Search Console and analytics pathways; GA4/PostHog describe user activity, while Search Console describes Google Search performance with its own reporting delay.
- Google Suggest research and protected source-labelled trend review. Social claims require independent verification.
- Production Cloudflare `CONTENT_DB` binding and enabled YouTube D1 cutover. Do not provision duplicate databases or assume other pillars are already database-backed.
- Search input hardening, aggregate search interaction measurement, curated canonical autocomplete and sitemap duplicate/freshness guards in the SEO architecture PR.

## Implement on evidence, not on dates

| Evidence / need | Direct action | Release evidence |
| --- | --- | --- |
| Important canonical is blocked, missing from sitemap or returns wrong status | Fix crawlability, redirect, canonical or sitemap inclusion in the existing URL | Production HTTP status, canonical HTML, generated XML and focused regression |
| Existing search query receives useful impressions but weak CTR | Compare intent with actual page and SERP, improve factual answer, title/snippet and internal links without changing the canonical unnecessarily | Settled page/query comparison, reviewed copy and regression; no CTR guarantee |
| Multiple pages satisfy the same intent | Strengthen the best canonical, 301 redirect real duplicates and fix related links | Redirect status, sitemap de-duplication and zero broken references |
| A high-value user task is missing | Use source-verifiable content to improve an existing hub first; publish a distinct page only when unique user value exists | Independent source verification, original answer, related links and publishing gate |
| Global search cannot find a known page | Improve curated canonical aliases and results; log aggregate no-results and destination selection without raw personal queries | Search and accessibility tests; inspect anonymized results |
| Newly published D1-only pages become eligible for indexation | Implement and validate database-backed sitemap export synced with the same publication status as server rendering | Content/status parity, no drafts or expired canonicals, reversible release |
| Travel destination/city has too few genuinely useful stops | Add independently verified locations to existing city/state guides and mapped-place records, not automatically one URL per stop | Official/source evidence, location accuracy, directions, nearby links and map checks |
| New films/jobs/events are actually released or open | Verify official publication/application routes, refresh or expire the appropriate canonical and feature only current content | Source status, dates, rights and link checks |
| Search or page speed suffers under actual load | Inspect bottleneck, optimize indexed queries, cache and page payloads before any architectural split | Representative performance, Worker/D1 usage and rollback validation |

## Four-pillar content execution

**Services:** keep official portal, fee, eligibility, requirements, steps, troubleshooting, verified/reviewed dates and actual task completion ahead of keyword volume. Improve JAMB, NYSC, WAEC, NECO, NIN, BVN, passport, CAC, NELFUND and other existing canonical hubs from observed demand. Never copy an official site verbatim or pretend to be the responsible agency.

**Jobs & Careers:** distinguish active vacancies, programmes and enduring career guides. Preserve employer evidence, deadlines, salary/location provenance, scam warnings and an honest closed state. Index a new vacancy only when the listing itself qualifies for a distinct useful page.

**Tour Nigeria:** improve coverage within existing city/state guides, prioritizing visitor intent, verified places across different areas, access, practical itinerary routes, cost uncertainty, safety and honest operating hours. A mapped place is a data record first and becomes a separately indexed page only if it passes the publication gate.

**Movies & Entertainment:** keep correct credits, original synopses, verifiable release status, legal watch/trailer links, publisher-approved media rights and internal connections among movies/actors/genres/languages. Promote genuinely new movies from verified sources, but do not claim that every social post is trending or publish duplicate watch-where pages.

## Search, index and conversion standards

- Existing canonical URL is the default; no keyword/variant/location doorway clones.
- Maintain crawlable links, appropriate breadcrumb/JSON-LD and unique intent-aware title and description.
- Sitemap `lastmod` means significant content change, not a crawler/verification heartbeat. Omit it when the edit date is unknown.
- Keep internal result/filter pages noindex; do not block discovery of real canonical content.
- Search suggestions only link to existing published canonical destinations. Provide keyboard/touch navigation and do not log raw searches as analytics custom events.
- Distinguish catalog records from indexable pages and sessions from clicks/impressions.
- Record evidence for claims, errors and content updates internally; do not show SEO/admin jargon to visitors.
- Follow the most important observable issue, not an artificial release cadence. Stop adding pages when verified distinct demand or original value is absent.

## Acceptance, without a calendar

A change is complete only after: source and current-main checks; smallest relevant unit/content test; typecheck/build when touched; PR/browser/Cloudflare smoke when relevant; canonical/sitemap parity when touched; and production verification after deployment. Preserve rollback options for database-backed publication.

**Not automatic:** Search Console data release, crawling/indexing by Google, traffic increases, D1-only sitemap export, and verified 10M-pageview handling. Those require external evidence or a separate actual implementation, never a promised date.
