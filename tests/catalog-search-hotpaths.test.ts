import assert from "node:assert/strict";
import { test } from "node:test";
import { publicServiceListings } from "@/lib/data";
import { scoreService, searchServices } from "@/lib/search";
import { jobSearchText, jobLocationFacets, getJobFacetOpportunities } from "@/lib/job-facets";
import { jobOpportunities } from "@/lib/jobs";
import { queryJobDirectory } from "@/lib/job-query";

test("prepared service search preserves individual scores, ranking and limits", () => {
  for (const query of ["passport renewal", "NIN correction", "JAMB", "unknown987"]) {
    const expected = publicServiceListings
      .map((service) => ({ service, score: scoreService(service, query) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.service.shortTitle.localeCompare(b.service.shortTitle))
      .slice(0, 12)
      .map(({ service, score }) => [service.slug, score]);
    const actual = searchServices(publicServiceListings, query, 12)
      .map(({ service, score }) => [service.slug, score]);
    assert.deepEqual(actual, expected, "mismatched service search for " + query);
  }
});

test("published jobs reuse exact search text without changing facet membership", () => {
  for (const item of jobOpportunities) {
    const expected = [
      item.title, item.organization, item.summary, item.location, item.employmentType,
      ...item.audiences, ...item.fields, ...item.qualifications,
    ].join(" ").toLowerCase();
    assert.equal(jobSearchText(item), expected);
    assert.equal(jobSearchText(item), expected);
  }
  const facet = jobLocationFacets[0];
  const matchingSlugs = jobOpportunities
    .filter((item) => facet.terms.some((term) => jobSearchText(item).includes(term.toLowerCase())))
    .map((item) => item.slug);
  assert.deepEqual(getJobFacetOpportunities(facet).map((item) => item.slug), matchingSlugs);
});

test("non-catalog job objects remain mutable and directory filtering remains correct", () => {
  const source = jobOpportunities[0];
  assert.ok(source);
  const standalone = { ...source, summary: "Before testing" };
  assert.ok(jobSearchText(standalone).includes("before testing"));
  standalone.summary = "After testing";
  assert.ok(jobSearchText(standalone).includes("after testing"));

  for (const q of ["engineering", "accounting", "unlikely-match-9957"]) {
    const results = queryJobDirectory({ q, pageSize: 24 });
    assert.ok(results.items.every((item) =>
      jobSearchText(jobOpportunities.find((job) => job.slug === item.slug)!).includes(q)
    ));
    assert.ok(results.items.length <= 24);
  }
});
