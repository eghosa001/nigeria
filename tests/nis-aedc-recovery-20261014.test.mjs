import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const read = (file, slug) => JSON.parse(readFileSync(file, "utf8")).find((record) => record.slug === slug);

test("passport tracking requires both NIS IDs and separates receipt recovery", () => {
  const guide = read("data/services.json", "passport-application-tracking");
  assert.equal(guide.officialPortal, "https://track.immigration.gov.ng/");
  assert.match(guide.steps.join(" "), /Application Number.*Reference Number/s);
  assert.match(guide.steps.join(" "), /Payment Status\/Print Receipt.*date of birth or email/s);
  assert.match(guide.notes.join(" "), /dedicated passport tracker still requires both/);
  assert.ok(guide.sources.some((s) => s.url.startsWith("https://passport.immigration.gov.ng/search/")));
  assert.equal(guide.lastVerified, "2026-10-14");
});

test("AEDC MAP guide explains electricity token, missing-notification and official support", () => {
  const guide = read("data/services-scale-verified.json", "aedc-map-refund");
  assert.equal(guide.officialPortal, "https://maprefund.abujaelectricity.com/");
  assert.match(guide.summary, /20-digit token—not cash/);
  assert.match(guide.steps.join(" "), /map.refund@abujaelectricity.com/);
  assert.match(guide.steps.join(" "), /08039070070/);
  assert.match(guide.notes.join(" "), /SMS and email/);
  assert.equal(guide.lastVerified, "2026-10-14");
});
