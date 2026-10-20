import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import retiredJobRoutes from "../data/job-retired-redirects.json";
import { getJobOpportunity, jobOpportunities } from "../lib/jobs";

const oldSlug = "federal-university-lafia-staff-recruitment-2026";
const canonical = "federal-university-lafia-recruitment-2026";

test("one published FULAFIA recruitment exercise, with a permanent historic redirect", () => {
  assert.equal(jobOpportunities.filter(item =>
    item.organization === "Federal University of Lafia" &&
    item.kind === "recruitment-exercise").length, 1);
  assert.equal(getJobOpportunity(oldSlug), undefined);
  const redirect = retiredJobRoutes.find(x => x.sourceSlug === oldSlug);
  assert.ok(redirect);
  assert.equal(redirect.destinationPath, "/jobs/" + canonical);
  const source = readFileSync(new URL("../lib/jobs.ts", import.meta.url), "utf8");
  assert.match(source, /duplicateIssuerJobAliases/);
  assert.match(source, /"federal-university-lafia-staff-recruitment-2026"/);
});

test("FCC 404 and absent directory listing do not falsely assert active FULAFIA intake", () => {
  const record = getJobOpportunity(canonical);
  assert.ok(record);
  assert.equal(record.status, "unverified");
  assert.equal(record.deadline, "2026-10-28");
  assert.equal(record.verifiedAt, "2026-10-20");
  assert.match(record.summary, /earlier FCC listing returned HTTP 404/);
  assert.match(record.summary, /current acceptance needs direct confirmation/);
  assert.ok(record.sourceNotes.some(x => /FCC individual detail returned HTTP 404/.test(x)));
  assert.ok(record.sources.some(x => x.url === "https://careers.fulafia.edu.ng/" && x.lastChecked === "2026-10-20"));
  assert.ok(record.sources.some(x => x.url === "https://fcc.gov.ng/recruitment/" && x.lastChecked === "2026-10-20"));
  assert.equal(record.sources.some(x => x.url.includes("/job-listings/")), false);
  assert.ok(record.applicationSteps.some(x => /missing|unavailable|HTTP 404/.test(x)));
});
