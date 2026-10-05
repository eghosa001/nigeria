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

These are design and coverage targets, not traffic guarantees.

All future additions must assume this scale. Do not introduce a design that requires an entire large pillar catalog to be compiled into one Worker module, shipped to the browser, or scanned client-side. Checked-in TS/JSON is acceptable while catalogs are small, but a pillar must move behind the scale content-store/data-access path before it crosses 5,000 records. Preserve canonical URLs when storage changes.

Do not chase the numeric target with thin, duplicate, doorway, scraped, unverified, or low-value pages. Each indexable page must serve distinct user intent, follow the answer-first rule, keep source/freshness evidence, and add meaningful internal navigation.

Sitemaps must remain sharded at 20,000 URLs per file or fewer. New high-growth directories should use server-side pagination/query boundaries and must not send more than 1,000 catalog records to a browser route.


## Answer-first content rule

For high-intent public pages reached from search (service guides, movies, YouTube titles, travel guides, jobs, agency/category/topic hubs, and future equivalents), put the user's likely answer before long-form detail.

- The first content screen must state the main answer or decision clearly.
- Surface the most important facts (such as cost/status, requirements, availability, cast/runtime, location/deadline, or top places) before background exposition.
- Provide an obvious next action or internal jump so the visitor can continue immediately.
- Keep verification/source context visible without forcing the user to read the full article.
- Do not add long generic introductions above the useful answer.
- New high-intent templates should reuse the shared `AnswerFirst` pattern or preserve the same hierarchy intentionally.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
