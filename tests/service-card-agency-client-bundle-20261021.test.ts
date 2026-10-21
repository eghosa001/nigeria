import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { agencies, getAgency } from "../lib/agency-directory";
import { agencies as catalogAgencies, getAgency as catalogGetAgency } from "../lib/data";

const source = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("agency directory preserves every source and lookup after extraction", () => {
  assert.ok(agencies.length > 80, "the agency directory must not be abbreviated");
  assert.strictEqual(catalogAgencies, agencies);
  for (const agency of agencies) {
    assert.ok(agency.slug && agency.shortName, agency.slug);
    assert.strictEqual(catalogGetAgency(agency.slug), getAgency(agency.slug));
    assert.equal(getAgency(agency.slug)?.shortName, agencies.find((entry) => entry.slug === agency.slug)?.shortName);
  }
  assert.equal(getAgency("nonexistent-agency"), undefined);
});

test("client service cards must not import the entire editorial services catalogue", () => {
  const component = source("components/service-card.tsx");
  const isolated = source("lib/agency-directory.ts");
  assert.ok(component.includes('import { getAgency } from "@/lib/agency-directory"'));
  assert.ok(!component.includes('import { getAgency } from "@/lib/data"'));
  assert.ok(!isolated.includes('from "@/lib/data"'));
  assert.ok(!isolated.includes('data/services.json'));
  assert.ok(!isolated.includes('validateServiceCatalog'));
  assert.ok(isolated.includes("if (!agencyBySlug.has(agency.slug))"));
  assert.ok(component.includes("agency?.shortName"), "preserve the exact visible agency label");
});
