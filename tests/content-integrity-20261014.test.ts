import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getRequirementDetails } from "../lib/requirement-details";
import { getStepDetails } from "../lib/step-details";
import { getServiceJourney } from "../lib/journey";
import { getEffectiveJobStatus, getEffectiveStatusLabel } from "../lib/job-runtime";
import type { Service } from "../lib/types";
import type { CareerOpportunity } from "../lib/jobs";

const sampleService = (overrides: Partial<Service> = {}): Service => ({
  slug: "renew-drivers-licence",
  title: "Renew your licence",
  shortTitle: "Driver's licence renewal",
  summary: "Renew a driver's licence using the official application portal.",
  agencySlug: "frsc",
  category: "Transport",
  requirements: ["Existing licence number", "Applicant demographic details", "RSA/PFA account information"],
  steps: ["Open the application portal and select a processing centre.", "Review your details and submit the application."],
  notes: [],
  officialPortal: "https://example.gov.ng",
  ...overrides,
} as Service);

const source = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("requirement explanations never mistake identifiers for taxpayer IDs", () => {
  const details = getRequirementDetails(sampleService({
    requirements: ["Existing licence number", "Applicant demographic details", "RSA/PFA account information", "TIN"],
  }));
  for (const item of details.slice(0, 3)) {
    assert.doesNotMatch(item.why ?? "", /taxpayer/i);
  }
  assert.match(details[3].why ?? "", /taxpayer/);
});

test("unverified requirement explanations and step evidence remain absent", () => {
  const service = sampleService({
    requirements: ["An unusual unspecified eligibility condition"],
    steps: ["Read the general notice to understand the policy."],
  });
  const [requirement] = getRequirementDetails(service);
  assert.equal(requirement.why, undefined);
  assert.equal(requirement.whenUsed, undefined);
  assert.equal(requirement.format, undefined);
  const [step] = getStepDetails(service);
  assert.equal(step.checkpoint, undefined);
  assert.equal(step.keep, undefined);
});

test("processing centre selection online is not a compulsory in-person visit", () => {
  const service = sampleService();
  const online = getServiceJourney(service);
  assert.equal(online.mode, "online");
  const hybrid = getServiceJourney(sampleService({
    steps: [...service.steps, "Attend the processing centre for biometric capture."],
  }));
  assert.equal(hybrid.mode, "hybrid");
});

test("a passed Nigerian application deadline is no longer open", () => {
  const job = {
    slug: "dated",
    status: "open",
    statusLabel: "Applications open",
    deadline: "2026-10-13",
  } as CareerOpportunity;
  assert.equal(getEffectiveJobStatus(job, "2026-10-14"), "closed");
  assert.match(getEffectiveStatusLabel(job, "2026-10-14"), /closed unless officially extended/);
});

test("documentary people are subjects, not actor schema credits", () => {
  const catalog = source("lib/entertainment.ts");
  assert.match(catalog, /slug: "mko-documentary-2026",[\s\S]*?cast: \[\],[\s\S]*?subjects: \["Moshood Abiola"/);
  const moviePage = source("app/entertainment/movies/[slug]/page.tsx");
  assert.match(moviePage, /about: title\.subjects\?\.map/);
  assert.match(moviePage, /title\.subjects\?\.length \? "Historical subjects"/);
});

test("career and tour directories use intent-specific grouping", () => {
  const jobs = source("app/jobs/government/page.tsx");
  assert.match(jobs, /kind !== "programme"/);
  assert.match(jobs, /Government-backed training and development programmes/);
  const tour = source("app/explore/[slug]/page.tsx");
  assert.match(tour, /Which stops are covered by/);
  assert.match(tour, /before attending /);
});
