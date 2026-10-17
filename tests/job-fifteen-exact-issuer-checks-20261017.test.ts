import test from "node:test";
import assert from "node:assert/strict";
import { getJobOpportunity } from "../lib/jobs";
import { fifteenExactRoleReviews20261017, reviewedExactRoleSlugs20261017 } from "../lib/job-fifteen-exact-issuer-checks-2026-10-17";

test("fifteen original real-role guides explain exact employer evidence without fabricated closing dates", () => {
  assert.equal(reviewedExactRoleSlugs20261017.length, 15);
  assert.equal(new Set(reviewedExactRoleSlugs20261017).size, 15);
  for (const slug of reviewedExactRoleSlugs20261017) {
    const job = getJobOpportunity(slug);
    const checked = fifteenExactRoleReviews20261017[slug];
    assert.ok(job, slug + ": canonical job missing");
    assert.equal(job.kind, "vacancy", slug);
    assert.equal(job.status, "open", slug);
    assert.equal(job.deadline, undefined, slug);
    assert.equal(job.officialUrl, checked.issuerUrl, slug);
    assert.equal(job.verifiedAt, "2026-10-17", slug);
    assert.ok(job.statusLabel.includes("deadline"), slug);
    assert.equal(job.nextMilestone, checked.statusDetail, slug);
    assert.ok(job.sourceNotes.includes(checked.primaryDetail), slug);
    assert.ok(job.applicationSteps.includes(checked.applicantCheck), slug);
    assert.ok(job.applicationSteps.some(step => /immediately before applying/i.test(step)), slug);
    assert.ok(job.sources.some(source => source.url === checked.issuerUrl && source.lastChecked === "2026-10-17"), slug);
    assert.ok(!/rolling hiring/i.test(job.statusLabel), slug);
  }
});

test("checks keep technical requirements and stated salaries associated with the right roles", () => {
  assert.match(fifteenExactRoleReviews20261017["dangote-ibese-mechanical-technician-l12-2026"].primaryDetail, /Trade Test II plus sixteen years/);
  assert.match(fifteenExactRoleReviews20261017["fmn-golden-penny-power-electrical-maintenance-manager-apapa-2026"].primaryDetail, /11 kV switchgear/);
  assert.match(fifteenExactRoleReviews20261017["fmn-logistics-b2b-assistant-despatch-manager-lagos-2026"].primaryDetail, /three years/);
  assert.match(fifteenExactRoleReviews20261017["eha-medical-doctor-abuja-2026"].primaryDetail, /355,600/);
  assert.match(fifteenExactRoleReviews20261017["eha-pharmacist-abuja-2026"].primaryDetail, /181,440/);
  assert.equal(new Set(reviewedExactRoleSlugs20261017.map(slug => fifteenExactRoleReviews20261017[slug].issuerUrl)).size, 15);
});
