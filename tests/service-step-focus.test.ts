import assert from "node:assert/strict";
import test from "node:test";
import { getStepDetails } from "../lib/step-details";
import type { Service } from "../lib/types";

function details(steps: string[]) {
  return getStepDetails({ steps, requirements: [] } as unknown as Service);
}

test("selecting a centre and booking biometrics online is not an in-person stage", () => {
  const steps = details([
    "Select the processing centre and upload the supporting documents on the portal.",
    "Review the application, complete payment and book the biometric appointment.",
    "Appear at the selected Immigration office for biometric data capture.",
  ]);
  assert.deepEqual(steps.map((s) => s.stage), ["Documents / upload", "Payment", "Physical / assisted stage"]);
  assert.match(steps[2].checkpoint ?? "", /before travelling/);
  assert.doesNotMatch(steps[0].checkpoint ?? "", /before travelling/);
});

test("generic reminders are rendered once without dropping process instructions", () => {
  const steps = details([
    "Pay the official application fee.",
    "Pay the required supplementary processing fee.",
    "Submit the complete application online.",
    "Submit supporting evidence for the application.",
  ]);
  assert.equal(steps.length, 4);
  assert.equal(steps[1].checkpoint, undefined);
  assert.equal(steps[1].keep, undefined);
  assert.ok(steps[0].checkpoint);
  assert.ok(steps[2].keep);
});
