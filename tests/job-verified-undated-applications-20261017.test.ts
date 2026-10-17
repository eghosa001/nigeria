import test from "node:test";
import assert from "node:assert/strict";
import { getJobOpportunity } from "../lib/jobs";
import {
  reviewedExactRoleSlugs20261017,
  hasVerifiedUndatedRoleApplicationReview20261017 as documented,
} from "../lib/job-fifteen-exact-issuer-checks-2026-10-17";

test("15 exact issuer Apply routes qualify only with current untampered source evidence", () => {
  assert.equal(reviewedExactRoleSlugs20261017.length, 15);
  for (const slug of reviewedExactRoleSlugs20261017) {
    const job = getJobOpportunity(slug);
    assert.ok(job, slug);
    assert.equal(documented(job, "2026-10-17"), true, slug);
    assert.equal(documented({ ...job, sources: [] }, "2026-10-17"), false, slug);
    assert.equal(documented({ ...job, applicationSteps: [] }, "2026-10-17"), false, slug);
    assert.equal(documented({ ...job, deadline: "2026-10-30" }, "2026-10-17"), false, slug);
    assert.equal(documented(job, "2026-11-02"), false, slug);
  }
  assert.equal(documented(getJobOpportunity("moniepoint-financial-planning-analyst")!, "2026-10-17"), false);
});
