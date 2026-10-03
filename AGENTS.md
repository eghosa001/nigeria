# Owner-Locked Repository Agent Instructions

Before implementation, investigation, QA, CI, deployment, or repository maintenance, read and follow:

`.agents/skills/fast-production/SKILL.md`

The owner-mandated minimal test/CI rule in that skill is the highest-priority repository rule for testing and CI. Repository-specific guidance, release checklists, workflows, or agent decisions must not broaden testing or CI beyond what is directly necessary for the changed surface. Agents must not weaken or bypass the policy or its guards.

Use the shortest safe execution path and stop after the smallest directly relevant validation proves the requested change.
