import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const service=JSON.parse(readFileSync("data/services.json","utf8")).find(x=>x.slug==="anambra-asin-registration");

test("ASIN registration clearly separates creation, recovery, login, payments and contact", () => {
  assert.ok(service);
  assert.equal(service.officialPortal,"https://tax.services.an.gov.ng/create-asin");
  assert.equal(service.lastVerified,"2026-10-14");
  assert.ok(service.steps.some(x=>x.includes("/asin/search")));
  assert.ok(service.steps.some(x=>x.includes("/auth/login")));
  assert.ok(service.steps.some(x=>x.includes("07066727750")));
  assert.ok(service.summary.includes("ASIN is not the same as your federal NIN"));
  assert.ok(service.notes.some(x=>x.includes("historical administrative estimate")));
  assert.ok(service.sources.some(x=>x.url.includes("anambrastate.gov.ng/get-asin")));
  assert.ok(service.sources.some(x=>x.url.includes("smart.anambrastate.gov.ng/services/asin")));
  const words=[service.summary,service.timeline,service.feeNote,...service.steps,...service.notes,...service.requirements].join(" ").split(/\s+/).length;
  assert.ok(words>=800,"reviewed answer should contain enough distinct actionable content");
});
