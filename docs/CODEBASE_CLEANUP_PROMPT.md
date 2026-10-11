# MyNigeriaGuide — Full Codebase Cleanup & Optimization Execution Prompt

**Owner-approved scope:** All four existing pillars (Movies & Entertainment, Services Guide, Tour Nigeria, Jobs & Careers), shared UX, admin, analytics, SEO, build/deployment and data pipelines. **Scope is an audit plus safe, independently verified improvements — not a license to delete content, change product behavior, or run every test.**

## Copy/paste execution prompt

> Act as the principal engineer, security reviewer, performance engineer, accessibility lead and release maintainer for `eghosa001/nigeria`, which deploys MyNigeriaGuide to Cloudflare Workers using Next.js 16 and vinext.
>
> **Goal:** Find and correct demonstrably dead or redundant code, repeated work, fragile interactions, slow pathways, oversized payloads, weak type-safety, security/privacy mistakes, stale-data confusion and maintenance debt while keeping the existing four-pillar user experience, URLs, business logic and growth capacity intact. Complete the work in focused, reviewable patches with measurable before/after evidence. Do not merely write suggestions.
>
> **Mandatory safety rules:** Read `AGENTS.md` and `.agents/skills/fast-production/SKILL.md` first. The owner's locked minimal testing/CI policy remains in force, even for this repository-wide review. Never disable/expand broad automatic CI or weaken its guard. Read `docs/PUBLISHING_STANDARD.md` and `docs/PREMIUM_UX_STANDARD.md` before changing public content or UI. Treat `config/scale-targets.json` and `docs/SCALING.md` as architecture constraints, not content quotas. Preserve Cloudflare Access, admin cookies/permissions, per-host production analytics filters, GSC API/ClickHouse data provenance, PostHog, GA4, AdSense settings, official links, citation/source policy and current canonical URLs. Never delete Google/GSC Wizard accounts, Cloudflare infrastructure, production data, migration history, secrets, stored performance history or essential verification keys.
>
> **Phase 1 — Inventory and proof.**
> 1. Compare current `main` against open PRs and latest merged work before touching any file. Inventory all tracked files, code size by area, large generated catalogs, package dependencies, route entrypoints, worker bindings, database schemas, scripts, workflows, public assets and operational integration points.
> 2. Run `node scripts/audit-codebase.mjs --json` as a *read-only* inventory. Classify reported unreferenced modules as **suspected**, not dead. Confirm each candidate by tracing its references through Next.js file-based routing, type-only imports, dynamic imports, JSON manifests, package scripts, Cloudflare/Workers config, scripts, tests, CSS imports, scheduled workflows and user-facing URLs. Remove a module only if the route/module/export is provably unreachable and no external contract depends on it.
> 3. Audit package dependencies and scripts for use by production, dev, test, or CLI before pruning. Treat generated JSON, shard modules and runtime registration files as **active until proven otherwise**. Check duplication at the *semantic* level; don't flatten content records or merge distinct canonical destinations. Record a baseline and risk/priority for each confirmed finding.
>
> **Phase 2 — Architecture and performance.**
> 4. Review server/client boundaries and React hydration, route prefetch strategy, dynamic vs static rendering, URL pagination, server props and RSC payload sizes, import fan-out, cold-start pressure and Worker bundle growth. Avoid bundling entire pillar catalogs into browser code; keep the adapter boundary for future D1/FTS/content-store migration before the 5,000-record threshold.
> 5. Profile or instrument only affected hot paths: global search normalization/ranking, jobs/services/movie directory filters, city/venue discovery, YouTube approval/dedup and sharded detail lookup, recommendations, sitemap generation and analytics queries. Replace repeated invariant work with bounded indexing/memoization where semantics remain identical; never cache personalized/admin/private responses publicly.
> 6. Check upstream network calls for timeouts, concurrency, rate limits, retry/backoff, non-200 handling, bot-friendly source behavior, cache-control alignment and safe degraded state. Respect provider quotas. Never fabricate “live” data by replaying snapshots or mistaking GA4 visitors for GSC clicks.
> 7. Review CSS ownership/cascade across globals/mobile/theme/UX layers: eliminate only proven duplicate declarations, preserve mobile layouts, reduced-motion preferences, dark/light readability, touch targets and accessibility.
>
> **Phase 3 — Function, quality and trust.**
> 8. Follow user journeys across all four pillars and common pages: mobile/desktop navigation, forms, search/autosuggest, filter/clear/pagination, detail→watch/apply/official source, saved items, share, breadcrumbs, back/forward, sticky controls, theme, slow networks and errors. Any fix gets the smallest necessary regression check.
> 9. Validate on-page SEO and correctness: canonical/robots, noindex filtered pages, SSR content, structured-data accuracy, OG previews, sharded sitemap discovery, redirects, broken outbound links, IndexNow, Search Console status labels and page-specific intent. Avoid duplicate or thin pages. Content editing requires source/freshness verification; never bulk-delete content just to reduce files.
> 10. Review authentication/session cookies, admin route aliases, origin/CSRF controls, secret management, token logging, API payload bounds, public data exposure, PII/analytics consent, CSP and error leakage. Do not inadvertently open `/api/admin/*` outside protected `/admin/api/*`.
> 11. Review accessibility, keyboard navigation, semantic headings, focus, contrast, motion, tap targets, image alt/crop, screen-reader states and 320px mobile overflow. Confirm route-specific visual quality on a relevant viewport/theme only when the changed surface demands it.
> 12. Check maintainability: naming, types, defensive handling, data contracts, duplicate utilities, unused exports, brittle hardcoded dates, accidental stale statuses, commented-out code, source attribution, operational docs and owner configuration.
>
> **Phase 4 — Controlled implementation and verification.**
> 13. Split identified work into small PRs by independent risk: (A) proven dead/duplicated code, (B) read-only hot-path performance, (C) admin/security & analytics truthfulness, (D) site UI/CSS, (E) content/indexing, (F) build/CI/dependencies. Do not co-mingle unrelated user-visible behavior. Commit only changes that are explainable and reversible.
> 14. For each changed surface, state the previous behavior, invariant, edited files, measurable improvement and regression risk. Run one short focused unit/integration test or small appropriate static check, then stop. Only broaden when changed code directly crosses those boundaries. Do not launch a full Playwright matrix, full CI, sitewide URL crawl, mass import, release build or deploy simply for confidence.
> 15. Preserve all indexed URLs and publication data. Verify meaningful metrics (CPU/work per request, sorted-array allocations, memory/import size, bundle/RSC bytes, API latency, availability, page LCP/INP/CLS) *only where measurable*; write “not measured” instead of inventing speed gains.
> 16. Before declaring complete, publish an evidence table for each objective: **fixed**, **confirmed safe and kept**, **needs follow-up**, or **not verified**. Include a precise list of PRs, code changes, tests actually run and any remaining risks. Never claim a full production audit or 9+/10 score without corresponding evidence.
>
> **Do not do:** automatic deletion based on text search; reset GSC Wizard/ClickHouse; erase stored history; remove verification/ads/analytics integration; rewrite the site or launch new pillars; insert unverified sources; merge giant experimental PRs; change live production secrets; replace CSS cascade blindly; run broad irrelevant tests.

## Success criteria

- Every changed behavior has an explicit contract and directly relevant passing check.
- No confirmed broken route, auth regression, canonical change, broken official link, SEO visibility loss or analytics mislabel is introduced.
- Confirmed duplicated or unreachable code is reduced; other suspected dead modules are retained pending proof.
- Repeated catalog-wide work is cached or indexed only when input data is immutable and results match prior output.
- A traceable audit report records measured inventory, high-risk remaining issues and limits of verification.

**Execution status:** This prompt is a living plan. Findings and completed fixes are tracked in `docs/CODEBASE_AUDIT_2026-10-11.md`. A repository-wide inventory is not equivalent to having reviewed every runtime path; do not mark the overall exercise finished prematurely.
