# MyNigeriaGuide Agent Instructions

For implementation, bug fixing, QA, deployment, admin, content-integration, or production-readiness tasks, read and follow:

`.agents/skills/fast-production/SKILL.md`

This repository prioritizes shortest-path delivery with risk-based tests.

Key defaults:
- use subagents for genuinely independent work only when a real subagent runner exists;
- otherwise parallelize safe tool calls without searching repeatedly for subagent tooling;
- inspect the smallest relevant surface;
- make the fix once, add the smallest useful regression test, and run focused tests;
- run full required gates once on the final candidate, not after every small edit;
- avoid repeated workflow polling;
- squash-merge large branch work;
- keep public rendering KV-free;
- keep secrets out of GitHub;
- when an external configuration blocker is proven, stop code churn and identify the exact missing setting.

User instructions in the current task override these defaults.
