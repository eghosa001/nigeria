# Owner-Locked Repository Agent Instructions

Before implementation, investigation, QA, CI, deployment, or repository maintenance, read and follow:

`.agents/skills/fast-production/SKILL.md`

The owner-mandated minimal test/CI rule in that skill is the highest-priority repository rule for testing and CI. Repository-specific guidance, release checklists, workflows, or agent decisions must not broaden testing or CI beyond what is directly necessary for the changed surface. Agents must not weaken or bypass the policy or its guards.

Use the shortest safe execution path and stop after the smallest directly relevant validation proves the requested change.


## Million-Search scale contract

MyNigeriaGuide is being grown for the four-pillar Million-Search Expansion. Before adding a large catalog, search surface, sitemap, media workflow, or storage feature, read:

- `config/scale-targets.json`
- `docs/SCALING.md`

Owner scale targets are:

- 100,000 useful indexable public URLs across the four pillars.
- Movies & Entertainment: 30,000.
- Services: 20,000.
- Tour Nigeria: 30,000.
- Jobs & Careers: 20,000.
- Architecture for 10,000,000 monthly pageviews with headroom to 50,000,000.
- Storage/query architecture for at least 1,000,000 underlying content records.

These are **capacity and opportunity targets, not quotas and not traffic guarantees**. A pillar may legitimately stop far below its numeric target if the remaining search demand does not support distinct, high-quality pages. Never manufacture pages to fill a target.

All future additions must assume this scale. Do not introduce a design that requires an entire large pillar catalog to be compiled into one Worker module, shipped to the browser, or scanned client-side. Checked-in TS/JSON is acceptable while catalogs are small, but a pillar must move behind the scale content-store/data-access path before it crosses 5,000 records. Preserve canonical URLs when storage changes.

Do not chase the numeric target with thin, duplicate, doorway, scraped, unverified, or low-value pages. Each indexable page must serve distinct user intent, follow the answer-first rule, keep source/freshness evidence, and add meaningful internal navigation.

### Consolidated content and publisher-readiness rules

**Read and follow `docs/PUBLISHING_STANDARD.md` before every new or updated public content page.** It is the single source of truth for originality, non-scraping, source credibility, quality/depth, Ezoic/AdSense publisher preparation, answer-first publishing, topical fit, appropriate index/noindex controls, anti-duplication and trending editorial decisions. No new parallel content rule lists. Scale targets never override its publication gate.

Sitemaps must remain sharded at 20,000 URLs per file or fewer; new growth directories use server pagination, not 1,000+ items per browser payload.

## Permanent premium 9+/10 experience requirement

**Owner requirement:** Every future addition to any of MyNigeriaGuide's four pillars, shared UI, visitor journey, content database and public website must maintain the evidence-backed premium standard in `docs/PREMIUM_UX_STANDARD.md`. **Read it before creating or modifying public-facing pages or experiences.**

- The release target is **9+/10 in each applicable category**, not a 9+ average: architecture, navigation/interactions, phone/tablet/desktop usability, information hierarchy, editorial authenticity, verified trust/safety, visual accessibility, performance and visitor utility/retention.
- New pages must be short and useful above the fold, with natural language, verified original content, clear action, easy internal navigation and distinct design intent. Do not publish site-growth targets, SEO-process descriptions, boilerplate or generic AI-style filler as visitor content.
- Search the **latest deployed inventory and main branch** before expanding. Upgrade existing canonical pages instead of duplicating intent, and coordinate with concurrent open PRs.
- All relevant buttons, forms, searches, mobile menus, save actions and long-page navigation must actually work. Check narrow changed surfaces at representative small/mobile and large layouts plus light/dark as relevant; visible UI must not overlap, clip or overflow.
- Score only what evidence supports. `>=9`, `below 9` and `unverified` must be distinguished; never declare the whole website or observed visitor retention at 9+ based solely on code, metadata or passing CI.
- Protect this standard for **all future additions and edits**. If a directly relevant quality check fails or any category falls below target, address that defect before calling the change complete.

**Minimal CI/test policy still outranks this requirement.** The 9+ requirement does **not** authorize broad CI or irrelevant test matrices; use only the minimum directly affected checks under `.agents/skills/fast-production/SKILL.md`.

## Answer-first content rule

The canonical answer-first **content** requirements are in `docs/PUBLISHING_STANDARD.md`. The screen hierarchy and mobile behavior remain in `docs/PREMIUM_UX_STANDARD.md`. Do not add duplicate rule blocks here.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
