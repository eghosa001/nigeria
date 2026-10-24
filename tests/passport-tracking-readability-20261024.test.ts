import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getPublicService } from "../lib/data";
import { getStepDetails } from "../lib/step-details";

const read = (path: string) => readFileSync(path, "utf8");

test("passport tracking has a short status-check layout without repeated application advice", () => {
  const page = read("app/services/[slug]/page.tsx");
  const nav = read("components/guide-quick-nav.tsx");

  assert.match(page, /const isPassportTrackingOnly = service\.slug === "passport-application-tracking"/);
  assert.match(page, /const hasOtherRoutes = !isPassportTrackingOnly/);
  assert.match(page, /const hasAftercare = !isPassportTrackingOnly &&/);
  assert.match(page, /const hasScenarios = !isPassportTrackingOnly &&/);
  assert.ok(page.includes("<GuideQuickNav showOtherRoutes={hasOtherRoutes}"));
  assert.ok(page.includes("{hasOtherRoutes ? ("));
  assert.ok(page.includes("{hasScenarios ? ("));
  assert.ok(page.includes("{!isPassportTrackingOnly ? <ProcessTracker service={service} /> : null}"));
  assert.ok(nav.includes("showOtherRoutes = true"));
  assert.ok(nav.includes("...(showOtherRoutes ? [items[2]] : [])"));
});

test("the passport checker keeps official steps and does not invent a receipt to retain", () => {
  const service = getPublicService("passport-application-tracking");
  assert.ok(service, "published NIS tracking guide exists");
  const steps = getStepDetails(service);
  assert.ok(steps.some((step) => step.instruction.includes("Application Number")));
  assert.ok(steps.some((step) => step.instruction.includes("Reference Number")));
  assert.ok(steps.some((step) => step.instruction.includes("View Application Status")));
  assert.ok(steps.every((step) => !step.keep), "no generic evidence-keeping filler");
  assert.equal(service.officialPortal, "https://track.immigration.gov.ng/");
});
