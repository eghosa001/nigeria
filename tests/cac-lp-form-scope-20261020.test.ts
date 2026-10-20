import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

type Guide = {
  slug: string;
  summary: string;
  requirements: string[];
  steps: string[];
  notes: string[];
  lastVerified: string;
  sources: Array<{ url: string; lastChecked: string }>;
};
const guides = JSON.parse(readFileSync(new URL("../data/services-cac-partnerships.json", import.meta.url), "utf8")) as Guide[];
const find = (slug: string) => guides.find(g => g.slug === slug);
const regulations = "https://news.cac.gov.ng/wp-content/uploads/2021/01/REGULATIONS-2021.pdf";

test("CAC LP 05 cannot be presented as a form for adding or removing partners", () => {
  assert.equal(guides.length, 12);
  const guide = find("cac-lp-change-partners");
  assert.ok(guide);
  assert.match(guide.summary, /excludes adding or removing a partner/);
  assert.ok(guide.steps.some(step => /Do not select CAC\/LP 05 for adding or removing a partner/.test(step)));
  assert.ok(guide.steps.some(step => /seven days/i.test(step)));
  assert.ok(guide.requirements.some(x => /confirm the current transaction route/i.test(x)));
  assert.equal(guide.lastVerified, "2026-10-20");
  assert.ok(guide.sources.some(s => s.url === regulations && s.lastChecked === "2026-10-20"));
});

test("CAC LP 02 separates a principal-address change from branch notice and LLP address", () => {
  const guide = find("cac-lp-change-business-address");
  assert.ok(guide);
  assert.match(guide.summary, /principal place of business.*branch-address change.*new branch/);
  assert.ok(guide.steps.some(s => /Do not use the LLP registered-office form for an LP/i.test(s)));
  assert.ok(guide.steps.some(s => /general partner/.test(s)));
  assert.ok(guide.notes.some(s => /branch-specific timing/.test(s)));
  assert.equal(guide.lastVerified, "2026-10-20");
  assert.ok(guide.sources.some(s => s.url === regulations && s.lastChecked === "2026-10-20"));
});

test("unresearched other LP and LLP filings retain their original issuer check dates", () => {
  for (const guide of guides) {
    if (["cac-lp-change-partners", "cac-lp-change-business-address"].includes(guide.slug)) continue;
    assert.notEqual(guide.lastVerified, "2026-10-20", guide.slug + " was not individually rechecked");
  }
});
