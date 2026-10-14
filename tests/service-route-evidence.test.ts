import assert from "node:assert/strict";
import test from "node:test";
import { getServiceJourney } from "../lib/journey";
import type { Service } from "../lib/types";

function service(steps: string[], options: {portal?: boolean; notes?: string[]} = {}) {
  return {
    slug: "test-guidance",
    summary: "Guide to an official service.",
    requirements: ["Valid institution choices"],
    notes: options.notes ?? [],
    steps,
    officialPortal: options.portal ? "https://example.gov.ng/application" : undefined,
  } as unknown as Service;
}

test("choosing a JAMB institution or booking biometrics online does not prove a compulsory visit", () => {
  const journey = getServiceJourney(service([
    "Sign in to the JAMB portal and choose Change of Course or Institution.",
    "Submit your course and institution changes online.",
    "Book a biometric appointment through the portal if requested.",
  ], { portal: true, notes: ["Use the institution website for future admission status."] }));
  assert.equal(journey.mode, "online");
  assert.equal(journey.physicalStatus, "not-stated");
  assert.doesNotMatch(journey.physicalLabel, /required|may still apply/i);
});

test("actual CBT centre attendance and fingerprint capture remain a required hybrid stage", () => {
  const journey = getServiceJourney(service([
    "Register on the application portal.",
    "Attend the accredited CBT centre for biometric and fingerprint capture.",
  ], { portal: true }));
  assert.equal(journey.mode, "hybrid");
  assert.equal(journey.physicalStatus, "required");
});

test("incidental agency and website mentions do not manufacture an online process", () => {
  const journey = getServiceJourney(service([
    "Contact the agency to confirm eligibility.",
    "Check the list of documents described by the agency.",
  ], { notes: ["The responsible institution has a website and an office."] }));
  assert.equal(journey.mode, "agency-guided");
  assert.equal(journey.onlineAvailable, false);
});
