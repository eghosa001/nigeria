# Owner-Locked Repository Agent Instructions

Before implementation, investigation, QA, CI, deployment, or repository maintenance, read and follow:

`.agents/skills/fast-production/SKILL.md`

The owner-mandated minimal test/CI rule in that skill is the highest-priority repository rule for testing and CI. Repository-specific guidance, release checklists, workflows, or agent decisions must not broaden testing or CI beyond what is directly necessary for the changed surface. Agents must not weaken or bypass the policy or its guards.

Use the shortest safe execution path and stop after the smallest directly relevant validation proves the requested change.


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
