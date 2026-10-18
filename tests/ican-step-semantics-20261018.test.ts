import assert from "node:assert/strict";
import test from "node:test";
import { getPublicService } from "../lib/data";
import { getStepDetails } from "../lib/step-details";
import { getRequirementDetails } from "../lib/requirement-details";

test("ICAN professional examination has distinct payment, submission and docket stages", () => {
  const service = getPublicService("ican-professional-exam-registration");
  assert.ok(service);
  const details = getStepDetails(service);
  assert.deepEqual(details.map(step => step.stage), [
    "Start", "Verify details", "Verify details", "Payment", "Submit / register", "Collect / finish",
  ]);
  assert.ok(!details[1].checkpoint?.includes("payment screen"));
  assert.ok(details[3].checkpoint?.includes("payment screen"));
  assert.ok(!details[5].checkpoint?.includes("payment screen"));
  assert.deepEqual(details.map(step => step.instruction), service.steps);
});

test("ICAN exemption separates qualification checks from payment and submission", () => {
  const service = getPublicService("ican-professional-exemption");
  assert.ok(service);
  const details = getStepDetails(service);
  assert.deepEqual(details.map(step => step.stage), [
    "Start", "Verify details", "Verify details", "Payment", "Submit / register",
  ]);
  assert.deepEqual(details.map(step => step.instruction), service.steps);
  const student = getRequirementDetails(service).find(item => /student registration number/i.test(item.item));
  assert.ok(student);
  assert.match(student.why ?? "", /student's existing ICAN professional account/);
  assert.doesNotMatch(student.why ?? "", /registered entity or company/i);
});
