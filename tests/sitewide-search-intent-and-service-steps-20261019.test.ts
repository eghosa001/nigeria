import assert from "node:assert/strict";
import test from "node:test";
import { getStepDetails, isPaymentAction } from "../lib/step-details";
import { compactSearchText } from "../lib/search-snippet";
import type { Service } from "../lib/types";

const details = (steps: string[]) => getStepDetails({
  slug: "synthetic-intent-control",
  steps,
} as Service);

test("reference, fee schedule, receipts and status are never labelled as payments", () => {
  const steps = [
    "Enter the application number and payment reference to look up the submitted record.",
    "Check your payment status on the official portal.",
    "Confirm the fee schedule and verify the details shown by the issuer.",
    "Find the Remita RRR on your existing payment receipt.",
    "Review the refund status and wait for the provider's decision.",
    "Complete the payment through the authorised gateway.",
    "Submit payment evidence by uploading your transaction receipt.",
    "Pay the correct application fee through the official checkout page.",
  ];
  const stages = details(steps);
  assert.deepEqual(stages.map((s) => s.stage), [
    "Verify details", "Follow up", "Verify details", "Verify details",
    "Follow up", "Payment", "Documents / upload", "Payment",
  ]);
  for (const i of [0, 1, 2, 3, 4, 6]) {
    assert.equal(isPaymentAction(steps[i]!), false, "not a new payment: " + steps[i]);
    assert.doesNotMatch(stages[i]!.checkpoint ?? "", /payment screen/i);
  }
  assert.match(stages[5]!.checkpoint ?? "", /payment screen/i);
  // Only the first identical payment caution is rendered.
  assert.equal(stages[7]!.checkpoint, undefined);
});

test("physical visits and uploads receive only applicable cautions", () => {
  const steps = details([
    "Choose a processing centre and upload your photograph online.",
    "Complete payment and book a biometric appointment.",
    "Visit the approved office to give biometrics.",
    "Track the application status using your reference number.",
  ]);
  assert.deepEqual(steps.map((x) => x.stage), [
    "Documents / upload", "Payment", "Physical / assisted stage", "Follow up",
  ]);
  assert.match(steps[2]!.checkpoint ?? "", /travelling/);
  assert.doesNotMatch(steps[3]!.checkpoint ?? "", /paying|travelling/);
});

test("search snippets are concise without splitting words or injecting an unwanted site suffix", () => {
  assert.equal(compactSearchText("  Nigerian   passport  tracking  ", 60), "Nigerian passport tracking");
  const long = compactSearchText("Oversabi Aunty (2025) cast, characters, official streaming availability and latest verified cinema information", 60);
  assert.ok(long.length <= 60);
  assert.ok(long.startsWith("Oversabi Aunty"));
  assert.ok(long.endsWith("…"));
});
