import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

test("INEC new-voter guide displays closed CVR status before legacy registration buttons", () => {
  const all = JSON.parse(readFileSync(new URL("../data/services.json", import.meta.url), "utf8"));
  const service = all.find((row: { slug: string }) => row.slug === "inec-new-voter-registration");
  assert.ok(service);
  assert.equal(service.lastVerified, "2026-10-24");
  assert.equal(service.officialPortal, "https://cvr.inecnigeria.org/");
  assert.match(service.summary, /has ended/);
  assert.match(service.summary, /legacy|older service directory/i);
  assert.match(service.steps[0], /24 October 2026/);
  assert.match(service.steps[1], /If INEC is accepting new registrations/);
  assert.ok(service.sources.some((s: { url: string; lastChecked: string }) =>
    s.url === "https://cvr.inecnigeria.org/" && s.lastChecked === "2026-10-24"));
  assert.doesNotMatch(service.summary, /registrations? (?:is|are) open/);
});
