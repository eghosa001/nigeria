import assert from "node:assert/strict";
import test from "node:test";
import { getServiceJourney, isMandatoryPhysicalStep } from "../lib/journey";

test("AEDC refund supports portal access without a compulsory office visit", () => {
  const service = {
    slug: "aedc-map-refund",
    officialPortal: "https://maprefund.abujaelectricity.com/",
    steps: [
      "Open AEDC's official MAP Refund Portal and enter the correct prepaid meter number.",
      "Submit the meter number online to check for the refund token.",
      "If a refund notification is missing, email AEDC or contact a Customer Experience Centre; you do not have to visit a centre just to use the portal.",
    ],
  };
  const journey = getServiceJourney(service as Parameters<typeof getServiceJourney>[0]);
  assert.equal(journey.mode, "online");
  assert.equal(journey.physicalStatus, "not-stated");
  assert.equal(isMandatoryPhysicalStep(service.steps[2]), false);
});

test("mandatory appointments still require the physical journey", () => {
  const service = {
    slug: "example-mandatory-biometric-visit",
    officialPortal: "https://example.org/application",
    steps: ["Apply on the official portal.", "Attend a physical appointment at the designated centre to provide fingerprints."],
  };
  const journey = getServiceJourney(service as Parameters<typeof getServiceJourney>[0]);
  assert.equal(journey.mode, "hybrid");
  assert.equal(journey.physicalStatus, "required");
});
