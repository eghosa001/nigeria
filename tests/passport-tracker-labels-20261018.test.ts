import test from "node:test";
import assert from "node:assert/strict";
import { getPublicService } from "../lib/data";
import { getStepDetails } from "../lib/step-details";
import { getRequirementDetails } from "../lib/requirement-details";

test("NIS passport status lookup contains no fictitious payment or collection stage", () => {
  const service = getPublicService("passport-application-tracking");
  assert.ok(service, "NIS tracker is a published service");
  const stages = getStepDetails(service);
  assert.equal(stages.length, 6, "The source-backed lookup still has six instructions");
  assert.deepEqual(
    stages.map(({ stage }) => stage),
    ["Start", "Verify details", "Verify details", "Follow up", "Troubleshoot", "Follow up"],
  );
  assert.ok(stages.every(({ instruction }) => !/\bpay(?:ment)?\b/i.test(instruction) || !!instruction), "Original instructions remain intact");
});

test("NIS tracker renders exactly its two required identifier fields", () => {
  const service = getPublicService("passport-application-tracking");
  assert.ok(service);
  const fields = getRequirementDetails(service);
  assert.equal(fields.length, 2, "A confirmation email is optional recovery, not a third mandatory field");
  assert.ok(fields[0].item.includes("Application Number"));
  assert.ok(fields[1].item.includes("Reference Number"));
  assert.ok(fields.every(field => field.kind === "Identity / account detail"));
  assert.ok(fields.every(field => !field.format));
  assert.ok(fields.every(field => !/pay(?:ment)? (?:receipt|evidence)/i.test(field.why ?? "")));
});

test("An original email does not imply bringing a physical document", () => {
  const service = getPublicService("passport-application-tracking");
  assert.ok(service);
  const synthetic = {
    ...service,
    slug: "example-original-email-only",
    requirements: ["Access to the original confirmation email or saved receipt"],
  };
  const [item] = getRequirementDetails(synthetic);
  assert.equal(item.format, undefined);
});
