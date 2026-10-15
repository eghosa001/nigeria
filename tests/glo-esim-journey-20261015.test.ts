import assert from "node:assert/strict";
import test from "node:test";
import { getPublicService } from "../lib/data";
import { getServiceJourney } from "../lib/journey";
import { getDetailedServiceGuidance } from "../lib/service-guidance";
import { getRequirementDetails } from "../lib/requirement-details";

test("Glo eSIM needs an authorised outlet, not a supposed online application", () => {
  const service = getPublicService("glo-esim-activation");
  assert.ok(service);
  const route = getServiceJourney(service);
  assert.equal(route.mode, "physical");
  assert.equal(route.onlineAvailable, false);
  assert.equal(route.physicalStatus, "required");
  const guidance = getDetailedServiceGuidance(service);
  assert.match(guidance.route.physicalDetail, /NIN.*QR|QR.*NIN/i);
  assert.match(guidance.route.startDetail, /Gloworld|Glo outlet/);
  assert.doesNotMatch(guidance.route.physicalDetail, /No compulsory walk-in/i);
});

test("Glo eSIM requirements explain EID and the data plan accurately", () => {
  const service = getPublicService("glo-esim-activation");
  assert.ok(service);
  const detail = getRequirementDetails(service);
  const eid = detail.find((x) => /\bEID\b/.test(x.item));
  const plan = detail.find((x) => /₦1,500|data.plan/i.test(x.item));
  assert.match(eid?.why ?? "", /compatibility/i);
  assert.doesNotMatch(eid?.why ?? "", /SMS, OTP/);
  assert.match(plan?.why ?? "", /qualifying data plan/i);
});
