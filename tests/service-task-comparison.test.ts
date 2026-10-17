import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import type { Service } from "../lib/types";
import { selectServiceTaskComparisons } from "../lib/service-task-comparison";

function makeService(slug: string, agencySlug: string, source = "https://example.org/source"): Service {
  return {
    slug, agencySlug, category: "Test", title: slug, shortTitle: slug,
    summary: "A source-specific service for testing.",
    feeLabel: "Not published by the responsible issuer", status: "review",
    lastVerified: "2026-10-17", requirements: ["A valid source-linked record"],
    steps: ["Visit the responsible issuer's current official service page."],
    notes: [], sources: source ? [{ label: "Issuer", agency: agencySlug, url: source, lastChecked: "2026-10-17" }] : [],
    searchTerms: [], related: [],
  };
}

test("choose varied real tasks before filling repeated-issuer slots", () => {
  const rows = [
    makeService("a1", "issuer-a"), makeService("a2", "issuer-a"),
    makeService("b1", "issuer-b"), makeService("b2", "issuer-b"),
    makeService("c1", "issuer-c"),
  ];
  assert.deepEqual(selectServiceTaskComparisons(rows, 3).map(s => s.slug), ["a1", "b1", "c1"]);
  assert.deepEqual(selectServiceTaskComparisons(rows, 4).map(s => s.slug), ["a1", "b1", "c1", "a2"]);
});

test("never pad with unsourced or incomplete service records", () => {
  const valid = makeService("valid", "agency");
  const unsourced = makeService("no-source", "agency-other", "");
  const missingSteps = { ...makeService("no-step", "agency-third"), steps: [] };
  assert.deepEqual(selectServiceTaskComparisons([valid, unsourced, missingSteps, { ...valid }], 8), [valid]);
  assert.deepEqual(selectServiceTaskComparisons([valid], 0), []);
});

test("all three hub page types expose source-based task comparison with no false agency logo", () => {
  for (const path of [
    "app/categories/[slug]/page.tsx",
    "app/topics/[slug]/page.tsx",
    "app/agencies/[slug]/page.tsx",
  ]) assert.match(readFileSync(path, "utf8"), /<ServiceTaskComparison/);
  const component = readFileSync("components/service-task-comparison.tsx", "utf8");
  for (const name of ["service.feeLabel", "service.requirements[0]", "service.steps[0]", "service.lastVerified"])
    assert.ok(component.includes(name), name);
  assert.match(component, /service.status !== "verified"/);
  const agency = readFileSync("app/agencies/[slug]/page.tsx", "utf8");
  assert.doesNotMatch(agency, /logo:\s*base\s*\+\s*"\/icon\.svg"/);
  assert.match(agency, /Independent agency guide/);
});
