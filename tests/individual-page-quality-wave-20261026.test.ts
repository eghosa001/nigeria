import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { getPublicService } from "../lib/data";
import { getStepDetails, isPaymentAction } from "../lib/step-details";
import { getRequirementDetails } from "../lib/requirement-details";

const guide = (slug: string) => {
  const service = getPublicService(slug);
  assert.ok(service, "Missing public guide " + slug);
  return service;
};

test("four individually checked services retain the 26 October review through editorial overlays", () => {
  for (const slug of ["nabteb-result-checker", "nysc-relocation", "nrs-tax-id-retrieval", "e-cerpac-application"]) {
    assert.equal(guide(slug).lastVerified, "2026-10-26", slug);
  }
});

test("NABTEB separates the serial prefix from PIN and shows no repeated requirement explanation", () => {
  const service = guide("nabteb-result-checker");
  assert.match(service.steps.join(" "), /letter followed by digits/);
  assert.match(service.steps.join(" "), /separate 12-digit PIN/);
  const requirements = getRequirementDetails(service);
  assert.equal(requirements.length, service.requirements.length);
  const explanations = requirements.map((detail) => detail.why).filter(Boolean);
  assert.equal(new Set(explanations).size, explanations.length);
});

test("NYSC relocation gives actual policy windows, safe official links and no bogus Payment step", () => {
  const service = guide("nysc-relocation");
  assert.match(service.notes.join(" "), /three months after orientation/);
  assert.match(service.notes.join(" "), /six months into the service year/);
  assert.ok(service.sources.some((source) => source.url === "https://www.nysc.gov.ng/corpmob.html"));
  assert.ok(service.sources.every((source) => !source.url.includes("platforms.nysc.gov.ng")));
  assert.ok(getStepDetails(service).every((step) => step.stage !== "Payment"));
  assert.equal(isPaymentAction("If approved, follow the official relocation instruction rather than paying a third party to change the posting."), false);
  assert.equal(isPaymentAction("Pay the official fee on the agency website and retain the receipt."), true);
});

test("NRS retrieval explains ID matching and correct 13-digit output without second-identity advice", () => {
  const service = guide("nrs-tax-id-retrieval");
  assert.match(service.steps.join(" "), /13-digit Tax ID/);
  assert.match(service.steps.join(" "), /first name, surname and date of birth/);
  assert.match(service.notes.join(" "), /not tax payment or tax clearance/);
});

test("NIS e-CERPAC distinguishes no-fee categories from payable classes", () => {
  const service = guide("e-cerpac-application");
  assert.ok(service.sources.some((source) => source.url.endsWith("type=R4A")));
  assert.ok(service.sources.some((source) => source.url.endsWith("type=R5A")));
  assert.match(service.steps.join(" "), /no fee is required/);
  assert.match(service.requirements.join(" "), /R4A government and R5A international NGO/);
  assert.equal(getStepDetails(service)[3]?.stage, "Check class fee");
});

test("common service pages do not repeat empty boilerplate before the actual steps and checklist", () => {
  const steps = readFileSync("components/service-steps.tsx", "utf8");
  const requirements = readFileSync("components/service-requirements.tsx", "utf8");
  assert.doesNotMatch(steps, /Follow these instructions in order\. Use the requirements checklist below/);
  assert.doesNotMatch(requirements, /Prepare the documents needed for the steps above\. Formats are specified/);
  assert.match(steps, /Steps for \{service\.shortTitle\}/);
  assert.match(steps, /No application submission is needed to read NECO/);
  assert.match(requirements, /This public timetable download does not require a payment/);
});
