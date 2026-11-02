import test from "node:test";
import assert from "node:assert/strict";
import { getJobOpportunity } from "../lib/jobs";
import { verifiedJobSlugs20261016 } from "../lib/job-verified-pathways-2026-10-16";
import { fifteenExactRoleReviews20261017, reviewedExactRoleSlugs20261017 } from "../lib/job-fifteen-exact-issuer-checks-2026-10-17";

test("fifteen original issuer reviews retain their evidence without keeping a retired vacancy open", () => {
  assert.equal(reviewedExactRoleSlugs20261017.length, 15);
  assert.equal(new Set(reviewedExactRoleSlugs20261017).size, 15);
  for (const slug of reviewedExactRoleSlugs20261017) {
    const job = getJobOpportunity(slug);
    const checked = fifteenExactRoleReviews20261017[slug];
    assert.ok(job, slug + ": canonical job missing");
    assert.equal(job.kind, "vacancy", slug);
    if (slug === "eha-medical-doctor-abuja-2026") {
      // The 17 October issuer observation remains historical evidence; the
      // same named vacancy returned 404 and was absent from the 23 October board.
      assert.equal(job.status, "unverified", slug);
      assert.equal(job.officialUrl, "https://erp.eha.ng/jobs", slug);
      assert.equal(job.verifiedAt, "2026-10-23", slug);
      assert.ok(job.sourceNotes.some(note => /Issuer check 23 October 2026/.test(note)), slug);
      assert.ok(job.sources.every(source => source.url !== checked.issuerUrl), slug);
      continue;
    }
    if (slug === "eha-registered-nurse-yaba-lagos-2026") {
      // 30 October issuer recheck supersedes the historical 17 October Apply control.
      assert.equal(job.status, "unverified", slug);
      assert.equal(job.officialUrl, "https://erp.eha.ng/jobs", slug);
      assert.equal(job.verifiedAt, "2026-10-30", slug);
      assert.ok(job.sources.every(source => source.url !== checked.issuerUrl), slug);
      assert.ok(job.sourceNotes.some(note => /27 September 2026/.test(note)), slug);
      continue;
    }
    assert.equal(job.status, "open", slug);
    assert.equal(job.deadline, undefined, slug);
    assert.equal(job.officialUrl, checked.issuerUrl, slug);
    const prior = verifiedJobSlugs20261016.includes(slug);
    assert.equal(job.verifiedAt, prior ? "2026-10-16" : "2026-10-17", slug);
    assert.ok(job.statusLabel.includes("deadline"), slug);
    assert.equal(job.nextMilestone, checked.statusDetail, slug);
    assert.ok(job.sourceNotes.includes(checked.primaryDetail), slug);
    assert.ok(job.applicationSteps.includes(checked.applicantCheck), slug);
    assert.ok(job.applicationSteps.some(step => /immediately before applying/i.test(step)), slug);
    assert.ok(job.sources.some(source => source.url === checked.issuerUrl && source.lastChecked === (prior ? "2026-10-16" : "2026-10-17")), slug);
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
