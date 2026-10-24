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
    if (slug === "eha-medical-doctor-abuja-2026") {
      // The old exact issuer vacancy later returned 404 and the employer
      // removed it from its board. The dated 23-Oct closed/unverified finding
      // supersedes the archived 17-Oct Apply-route observation.
      assert.equal(job.status, "unverified");
      assert.equal(job.verifiedAt, "2026-10-23");
      assert.equal(documented(job, "2026-10-17"), false);
      assert.equal(documented(job, "2026-10-24"), false);
      continue;
    }
    if (slug === "eha-registered-nurse-yaba-lagos-2026" ||
        slug === "eha-pharmacist-abuja-2026") {
      // The legacy 17-Oct exact-source review is superseded by a new 24-Oct
      // issuer-board confirmation; it must not masquerade as an old-date check.
      assert.equal(documented(job, "2026-10-17"), false, slug);
      assert.equal(job.verifiedAt, "2026-10-24", slug);
      assert.ok(job.sources.some(source => source.url === job.officialUrl && source.lastChecked === "2026-10-24"));
      continue;
    }
    assert.equal(documented(job, "2026-10-17"), true, slug);
    assert.equal(documented({ ...job, sources: [] }, "2026-10-17"), false, slug);
    assert.equal(documented({ ...job, applicationSteps: [] }, "2026-10-17"), false, slug);
    assert.equal(documented({ ...job, deadline: "2026-10-30" }, "2026-10-17"), false, slug);
    assert.equal(documented(job, "2026-11-02"), false, slug);
  }
  assert.equal(documented(getJobOpportunity("moniepoint-financial-planning-analyst")!, "2026-10-17"), false);
});
