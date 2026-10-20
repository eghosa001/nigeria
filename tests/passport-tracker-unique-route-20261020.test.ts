import assert from "node:assert/strict";
import test from "node:test";
import { publicServices } from "../lib/data";
import { getDetailedServiceGuidance, hasExplicitServiceGuidance } from "../lib/service-guidance";

test("NIS passport tracker answers identifier choice before showing individual steps", () => {
  const guide = publicServices.find(item => item.slug === "passport-application-tracking");
  assert.ok(guide, "the existing passport tracking guide must remain public");
  assert.ok(hasExplicitServiceGuidance(guide.slug));
  const guidance = getDetailedServiceGuidance(guide);
  assert.match(guidance.route.startTitle, /both NIS tracking numbers/i);
  assert.match(guidance.route.startDetail, /Application Number and Reference Number.*same NIS application/i);
  assert.notEqual(guidance.route.startDetail, guide.steps[0], "do not repeat step one as the introduction");
  assert.match(guidance.route.fallbackDetail, /Payment Status\/Print Receipt.*does not confirm/i);
  assert.match(guidance.route.physicalDetail, /online/i);
  assert.ok(guidance.aftercare.some(item => /collection/i.test(item.detail)));
  assert.ok(guide.steps[0].includes("track.immigration.gov.ng"));
  assert.ok(guide.sources.some(item => item.url === "https://track.immigration.gov.ng/"));
});
