import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { jobLocationFacets, jobProfessionFacets } from "../lib/job-facet-definitions";

const source = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("Jobs browser facet definitions retain every location and profession option", () => {
  assert.deepEqual(jobLocationFacets.map(({ slug }) => slug), ["lagos", "abuja", "ibadan", "kano"]);
  assert.deepEqual(jobProfessionFacets.map(({ slug }) => slug), [
    "engineering", "healthcare", "nursing", "pharmacy",
    "finance-accounting", "technology", "sales-marketing", "education-research",
    "logistics-supply-chain", "hr-admin-operations",
  ]);
  for (const facet of [...jobLocationFacets, ...jobProfessionFacets]) {
    assert.ok(facet.title && facet.shortTitle && facet.description && facet.terms.length, facet.slug);
  }
});

test("Jobs client does not load the giant server-only opportunity catalogue for select menus", () => {
  const client = source("components/jobs-directory.tsx");
  const definitions = source("lib/job-facet-definitions.ts");
  const server = source("lib/job-facets.ts");

  assert.ok(client.includes('import { jobLocationFacets, jobProfessionFacets } from "@/lib/job-facet-definitions"'));
  assert.ok(!client.includes('from "@/lib/job-facets"'));
  assert.ok(!definitions.includes('from "@/lib/jobs"'));
  assert.ok(!definitions.includes("jobOpportunities"));
  assert.ok(server.includes('export { jobLocationFacets, jobProfessionFacets } from "@/lib/job-facet-definitions"'));
  assert.ok(server.includes("const catalogItems = new WeakSet<CareerOpportunity>(jobOpportunities)"));
  assert.ok(server.includes("export function matchesJobLocation("));
  assert.ok(server.includes("export function matchesJobProfession("));
});
