import test from "node:test";
import assert from "node:assert/strict";
import { verifiedDangoteOlamJobs20261012 as roles } from "../lib/job-growth-wave-14";

test("four unique directly linked employer jobs preserve qualifications and uncertainty", () => {
  assert.equal(roles.length, 4);
  assert.equal(new Set(roles.map(r => r.slug)).size, roles.length);
  assert.equal(roles.filter(r => /Ibese/.test(r.location)).length, 2);
  for (const r of roles) {
    assert.equal(r.kind, "vacancy");
    assert.equal(r.status, "open");
    assert.equal(r.verifiedAt, "2026-10-12");
    assert.equal(r.sources[0].url, r.officialUrl);
    assert.ok(r.qualifications.length >= 3 && r.applicationSteps.length >= 4 && r.sourceNotes.length >= 3);
    assert.ok(r.officialUrl.startsWith("https://careers."));
    assert.equal(r.deadline, undefined);
    assert.equal(r.jobPostingAuthorization, undefined);
  }
  assert.match(roles.find(r => r.slug.includes("olam"))!.location, /not specified/);
  assert.match(roles.find(r => r.slug.includes("technician"))!.qualifications.join(" "), /Trade Test II/);
});
