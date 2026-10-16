import test from "node:test";
import assert from "node:assert/strict";
import { jobOpportunities } from "../lib/jobs";
import { verifiedJobSlugs20261016 } from "../lib/job-verified-pathways-2026-10-16";

test("12 verified roles use exact issuer URLs and real registration instructions", () => {
  assert.equal(verifiedJobSlugs20261016.length, 12);
  assert.equal(new Set(verifiedJobSlugs20261016).size, 12);
  for (const slug of verifiedJobSlugs20261016) {
    const role = jobOpportunities.find((record) => record.slug === slug);
    assert.ok(role, slug);
    assert.equal(role?.kind, "vacancy", slug);
    assert.equal(role?.status, "open", slug);
    assert.equal(role?.verifiedAt, "2026-10-16", slug);
    assert.ok(role?.sources.some((source) => source.url === role.officialUrl && source.lastChecked === "2026-10-16"), slug);
    assert.ok(role?.applicationSteps.some((step) => step.includes("Apply")), slug);
    assert.ok(role?.applicationSteps.some((step) => step.includes("own work")), slug);
    assert.ok(!role?.deadline || role.deadline >= "2026-10-16", slug);
    if (role?.officialUrl.includes("fmnplc.e-recruiter.ng")) {
      assert.ok(role.applicationSteps.some((step) => step.includes("Computer Exposure") && step.includes("Referee")), slug);
      assert.ok(role.sources.some((source) => source.url === "https://fmnplc.e-recruiter.ng/"), slug);
    }
  }
});
