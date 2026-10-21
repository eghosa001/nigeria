import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { getPublicService } from "../lib/data";
import { getServiceIntentShortcuts } from "../lib/service-intent-shortcuts";

const targets = {
  "aedc-map-refund": { count: 2, steps: [5, 6] },
  "ibedc-map-refund": { count: 3, steps: [3, 5, 6] },
  "passport-application-tracking": { count: 3, steps: [5, 7] },
  "anambra-asin-registration": { count: 3, steps: [] },
};

test("four observed high-demand services route to existing steps and cited official pages", () => {
  for (const [slug, expected] of Object.entries(targets)) {
    const service = getPublicService(slug);
    assert.ok(service, "published source record " + slug);
    const actions = getServiceIntentShortcuts(service);
    assert.equal(actions.length, expected.count, slug + " approved distinct actions");
    assert.equal(new Set(actions.map((action) => action.href)).size, actions.length, "no repeated actions");
    for (const index of expected.steps) {
      assert.ok(service.steps[index - 1], slug + " documented step " + index);
      assert.ok(actions.some((item) => item.href === "#service-step-" + index), slug + " anchor " + index);
    }
    for (const action of actions) {
      if (action.external) {
        assert.ok(service.sources.some((s) => s.url === action.href), slug + " source-backed URL " + action.href);
        assert.ok(action.href.startsWith("https://"));
        assert.notEqual(action.href, service.officialPortal, "primary action not reprinted");
      } else {
        assert.match(action.href, /^#service-step-[1-9]\d*$/);
        const stepIndex = Number(action.href.split("-").pop());
        assert.ok(service.steps[stepIndex - 1], "valid target " + action.href);
      }
    }
  }
});

test("passport receipt search is never treated as an application tracking result", () => {
  const service = getPublicService("passport-application-tracking")!;
  const actions = getServiceIntentShortcuts(service);
  const receipt = actions.find((action) => action.label.includes("payment receipt"));
  assert.ok(receipt?.external);
  assert.ok(receipt.href.includes("passport.immigration.gov.ng/search/"));
  assert.notEqual(receipt.href, "https://track.immigration.gov.ng/");
  assert.match(service.steps[4], /payment status|print receipt/i);
  assert.match(service.steps[6], /produced|collection/i);
});

test("MAP and ASIN quick paths reflect the documented tasks, not invented fees or eligibility", () => {
  const aedc = getPublicService("aedc-map-refund")!;
  const ibedc = getPublicService("ibedc-map-refund")!;
  const asin = getPublicService("anambra-asin-registration")!;
  assert.match(aedc.steps[4], /refund notification|token fails|missing/i);
  assert.match(aedc.steps[5], /complaint|escalation/i);
  assert.match(ibedc.steps[2], /oldest|ascending/i);
  assert.match(ibedc.steps[4], /unrecognised|does not load|missing/i);
  const links = getServiceIntentShortcuts(asin);
  assert.ok(links.some((link) => link.href.includes("/asin/search")));
  assert.ok(links.some((link) => link.href.includes("/auth/login")));
  assert.ok(links.some((link) => link.href.includes("smart.anambrastate.gov.ng/pay")));
});

test("single canonical service template renders navigable step anchors without duplicate body copy", () => {
  const page = readFileSync("app/services/[slug]/page.tsx", "utf8");
  const steps = readFileSync("components/service-steps.tsx", "utf8");
  const chooser = readFileSync("components/service-intent-shortcuts.tsx", "utf8");
  assert.ok(page.includes("<ServiceIntentShortcuts service={service} />"));
  assert.ok(page.indexOf("<ServiceIntentShortcuts service={service} />") < page.indexOf("<ServiceSteps service={service} />"));
  assert.ok(steps.includes('id={"service-step-" + (index + 1)}'));
  assert.ok(chooser.includes('aria-label="Other actions for this service"'));
  assert.ok(chooser.includes('rel="noopener noreferrer"'));
  assert.ok(!chooser.includes("service.summary") && !chooser.includes("service.feeLabel"));
});
