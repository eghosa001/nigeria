---
name: fast-production
description: Shortest-path execution for MyNigeriaGuide code, fixes, QA, and deployment work. Use for implementation, bug fixes, production hardening, admin changes, content integrations, UI fixes, CI failures, and deploy verification.
---

# Fast Production Execution

## Objective

Finish the requested task correctly in the fewest practical tool calls, commits, test runs, and deployment cycles.

Optimize for:
1. correctness of the requested change;
2. shortest path to a usable production result;
3. only the tests that can catch realistic regressions;
4. minimal commits/deploys;
5. parallel work when it actually shortens the critical path.

Do not optimize for process ceremony.

## Mandatory first-pass classification

Classify the request immediately:

### A. Micro change
Examples: copy, one link, one image, one CSS adjustment, one isolated guard, documentation.

Rules:
- inspect only the directly relevant file(s);
- patch directly;
- run no test if the change cannot affect runtime behavior;
- otherwise run one focused test;
- do not create a long plan;
- do not create a feature branch unless required by branch protection;
- use one commit.

### B. Normal feature/fix
Examples: one component/API route plus tests, one navigation flow, one admin feature.

Rules:
- inspect the smallest dependency surface;
- implement in one pass;
- run the most relevant focused test first;
- run required project gates once at the end;
- target 1-2 commits before squash merge.

### C. Cross-cutting/high-risk change
Examples: data migration, auth/security boundary, deployment architecture, shared schema.

Rules:
- use a feature branch;
- lock invariants with focused tests;
- divide independent work into parallel tracks;
- run full required gates once after integration;
- squash merge after green.

Do not treat a micro or normal change as a cross-cutting project.

## Subagents and parallelism

Use subagents only when there are at least two genuinely independent workstreams.

Good splits:
- implementation vs. regression-test authoring;
- backend/API vs. UI;
- code change vs. security review;
- content migration vs. parity verification.

Rules:
- if a real subagent runner is available, dispatch independent tracks immediately;
- prefer 2-4 agents, not many tiny agents;
- give each agent a non-overlapping file/goal scope;
- one coordinator owns integration and merge;
- if no subagent runner exists, do not spend repeated tool calls looking for one;
- instead parallelize safe reads/checks/tool calls in the current session;
- never claim subagents were used when no subagent runner was available.

## Inspection discipline

Before editing:
- inspect the exact files named by the failure/request;
- inspect direct imports/dependencies only when needed;
- use search once to find unknown locations;
- stop searching when the implementation path is clear.

Do not:
- repeatedly reread unchanged files;
- scan the whole repository for a local issue;
- reopen logs that already established the cause;
- keep investigating after an external configuration blocker is conclusively identified.

## Fix discipline

When the cause is known:
1. patch the cause;
2. add or adjust the smallest regression test that would have caught it;
3. run that focused test;
4. proceed to the final required gate.

Do not create extra refactors unless they remove a blocker or materially reduce risk.

Prefer bulk related fixes in one patch over one-file-at-a-time churn.

## Testing matrix

Run tests based on risk, not habit.

### Documentation/comments/agent instructions only
- no runtime tests.

### CSS/layout/copy/navigation-only
- focused browser test for the affected route/device.
- full Browser QA only if it is a merge requirement.

### Pure data/content
- schema/content validation;
- source/link check only when URLs/sources changed.

### API/server logic
- focused API/unit/integration regression;
- typecheck.

### Auth/security/write path
- focused negative tests: unauthenticated, malformed, forbidden, oversized/tampered request;
- one positive-path test using mocks/stubs where external credentials are required;
- required runtime/browser gate once at the end.

### Cross-cutting/shared data model
- migration/parity invariant test;
- typecheck/content check;
- full required CI once after integration.

## Test-run limits

- Do not rerun a passing unchanged suite.
- Do not run the full suite after every small patch.
- Run focused RED/GREEN tests during implementation.
- Run the complete required project gates once on the final candidate.
- After a tiny test-only or docs-only follow-up, rerun only gates that can be affected.
- If CI already runs the exact same test, do not duplicate it manually unless debugging a failure.

## Workflow polling rules

Repeated polling is a major source of delay.

Rules:
- never poll the same workflow status repeatedly with no intervening work;
- batch all workflow statuses into one call when possible;
- after starting CI, use the time to inspect code, review diffs, prepare the next safe change, or verify external config;
- do not make more than 2 consecutive status-only checks for the same run;
- when logs are available, read the failing step once and act on the concrete failure;
- do not keep polling superseded commits—only validate the latest head SHA.

## Commit and deployment discipline

- Prefer one implementation commit for micro changes.
- Prefer 1-2 logical commits for normal work.
- For large branch work, squash merge to keep `main` clean.
- Avoid commits that only say “continue”, “retry”, or split one obvious fix unnecessarily.
- Do not trigger extra deployments for intermediate cosmetic changes.
- Merge only the final green candidate.
- After merge, verify the exact deployed SHA once.

## External configuration blockers

Examples: Cloudflare secret, GA4 access, DNS, API credentials, Play Console permissions.

When an external blocker is proven:
1. record the exact missing setting/permission;
2. stop modifying unrelated code;
3. if a connector can set it, do so;
4. if no connector can set it, give the shortest exact user action required;
5. keep automated guardrails in place so the system turns green immediately after the setting is fixed.

Do not spend repeated cycles trying to solve an account-level secret with repository code.

## Production verification

For MyNigeriaGuide, prefer this order:
1. focused regression for the changed behavior;
2. CI/type/content/build gate relevant to the change;
3. Cloudflare Runtime QA if runtime behavior changed;
4. Browser QA if user-facing behavior changed;
5. Live Deployment QA only after merge/deploy.

If all required gates on the exact final SHA are green, merge/deploy without additional redundant checks.

## Stop conditions

Stop work and report completion when:
- requested behavior is implemented;
- relevant regression test passes;
- required repository gates for the changed risk are green;
- exact production SHA is verified when deployment was part of the task.

Do not continue polishing unrelated areas after these conditions are met.

## Communication

Keep updates short and outcome-focused:
- what was found;
- what changed;
- which exact gate is currently blocking completion.

Do not narrate every poll, file read, or internal operation.

## MyNigeriaGuide-specific invariants

Always preserve:
- KV-free public rendering unless the user explicitly changes that architecture;
- all published service slugs unless intentionally changed;
- structured source/verification data;
- review-first admin content changes;
- secrets outside GitHub;
- existing live analytics protection;
- official-source link specificity.

When editing service data, validate catalog parity and only run source/link checks if service sources or official URLs changed.
