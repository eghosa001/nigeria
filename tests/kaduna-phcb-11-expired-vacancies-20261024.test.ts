import assert from "node:assert/strict";
import test from "node:test";
import { jobOpportunities } from "../lib/jobs";
import { getEffectiveJobStatus } from "../lib/job-runtime";

const kadunaSlugs = [
  "kaduna-phcb-nursing-officer-grade-iii-2026",
  "kaduna-phcb-community-health-technician-2026",
  "kaduna-phcb-environmental-health-officer-grade-ii-2026",
  "kaduna-phcb-environmental-health-technician-2026",
  "kaduna-phcb-medical-laboratory-technician-2026",
  "kaduna-phcb-pharmacy-technician-2026",
  "kaduna-phcb-health-educator-2026",
  "kaduna-phcb-nutrition-officer-2026",
  "kaduna-phcb-health-information-management-technician-2026",
  "kaduna-phcb-community-health-assistant-2026",
  "kaduna-phcb-recruitment-2026",
] as const;

for (const slug of kadunaSlugs) {
  test(`Kaduna PHCB completed role ${slug} is a source-checked archive`, () => {
    const opportunity = jobOpportunities.find(j => j.slug === slug);
    assert.ok(opportunity, "canonical page missing");
    assert.equal(opportunity.status, "closed");
    assert.equal(opportunity.deadline, "2026-10-14");
    assert.equal(opportunity.verifiedAt, "2026-10-24");
    assert.equal(getEffectiveJobStatus(opportunity, "2026-10-24"), "closed");
    assert.match(opportunity.statusLabel ?? "", /closed/i);
    assert.match(opportunity.summary, /(no PHCB vacancy is open|no PHCB vacancies open)/i);
    assert.match(opportunity.nextMilestone ?? "", /(closed|ended)/i);
    assert.doesNotMatch(opportunity.applicationSteps.join(" "), /Submit the application through the official Apply control before|submit through the official Apply control|create or sign in to your reusable candidate profile/i);
    assert.ok(opportunity.sources.some(s => s.url === "https://recruitment.kdsg.gov.ng/" && s.lastChecked === "2026-10-24"));
    assert.ok(opportunity.officialUrlLabel?.includes("Kaduna"));
    if (slug !== "kaduna-phcb-recruitment-2026") {
      assert.equal(opportunity.kind, "vacancy");
      assert.ok(opportunity.posting?.jobTitle);
      assert.match(opportunity.employmentType, /CONHESS/);
      assert.ok(opportunity.qualifications.length > 0);
    } else {
      assert.equal(opportunity.kind, "recruitment-exercise");
    }
  });
}
