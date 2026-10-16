import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const records = JSON.parse(readFileSync("data/services-scale-verified.json", "utf8"));
const entry = (slug) => records.find((record) => record.slug === slug);

test("Glo MNP guide discloses both official repeat-port figures and actual SMS", () => {
  const guide = entry("glo-port-number-to-glo");
  assert.ok(guide);
  const text = [guide.summary, guide.timeline, ...guide.notes, ...guide.steps].join(" ");
  assert.match(text, /45.day/i);
  assert.match(text, /90.day/i);
  assert.match(text, /conflict|disagree/i);
  assert.match(text, /PORT to 3232/i);
  assert.match(text, /seven.day/i);
  assert.match(guide.feeLabel, /free/i);
  assert.ok(guide.sources.some((source) => source.url.includes("consumer.ncc.gov.ng/articles/106-")));
  assert.ok(guide.sources.some((source) => source.url.includes("/faqs/35-")));
});

test("Glo lost-SIM guide retains Glo's fee, route, documents and safety", () => {
  const guide = entry("glo-sim-replacement");
  assert.ok(guide);
  assert.match(guide.feeLabel, /₦100/);
  const text = [guide.summary, ...guide.steps, ...guide.requirements, ...guide.notes].join(" ");
  assert.match(text, /Gloworld/i);
  assert.match(text, /police report/i);
  assert.match(text, /affidavit/i);
  assert.match(text, /Business/i);
  assert.match(text, /photocopy/i);
  assert.match(text, /seven.day/i);
  assert.match(text, /bank|OTP/i);
  assert.equal(guide.officialPortal, "https://www.gloworld.com/ng/self-care/");
});
