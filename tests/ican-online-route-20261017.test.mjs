import test from "node:test";
import assert from "node:assert/strict";
import { getServiceJourney } from "../lib/journey.ts";
import { getReviewedIcanGuidance } from "../lib/ican-route-guidance-2026-10-17.ts";

for (const slug of ["ican-professional-exam-registration", "ican-professional-exemption"]) {
  test(slug + " has source-specific online application guidance", () => {
    const j = getServiceJourney({ slug, steps: [], officialPortal: "https://icanportal.org/professional" });
    const g = getReviewedIcanGuidance(slug);
    assert.equal(j.mode, "online");
    assert.equal(j.physicalStatus, "not-stated");
    assert.match(g.route.physicalDetail, /online|form/i);
    assert.ok(g.aftercare.length >= 2);
  });
}
test("exam submission and exemption approval are distinct", () => {
  const exam = getReviewedIcanGuidance("ican-professional-exam-registration");
  const exemption = getReviewedIcanGuidance("ican-professional-exemption");
  assert.match(exam.route.startDetail, /submit the entry/i);
  assert.match(exemption.route.fallbackDetail, /not refundable/i);
});
