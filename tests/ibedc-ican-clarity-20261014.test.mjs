import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

function guide(path, slug) {
  return JSON.parse(readFileSync(path, "utf8")).find((x) => x.slug === slug);
}

test("IBEDC MAP refund provides meter-specific evidence, ordered tokens and support", () => {
  const g=guide("data/services-scale-verified.json", "ibedc-map-refund");
  assert.equal(g.officialPortal, "https://www.ibedc.com/map-refund");
  assert.match(g.steps.join(" "), /oldest outstanding token first/);
  assert.match(g.steps.join(" "), /07001239999/);
  assert.match(g.notes.join(" "), /36-month.*individual eligibility/s);
  assert.match(g.summary, /not paid as cash/);
  assert.equal(g.lastVerified,"2026-10-14");
});

test("ICAN distinguishes November exam from May diet and payment from enrolment", () => {
  const g=guide("data/services-private-extended.json","ican-professional-exam-registration");
  assert.match(g.timeline, /10–12 November 2026/);
  assert.match(g.timeline, /not the registration cutoff/);
  assert.match(g.notes.join(" "), /May 2026.*bank\/PayDirect/s);
  assert.match(g.steps.join(" "), /payment alone is not enrolment/);
  assert.ok(g.sources.some((s) => s.url.endsWith("PE_MAY_2026_ADVERT.pdf") && s.label.includes("historical")));
  assert.equal(g.lastVerified,"2026-10-14");
});
