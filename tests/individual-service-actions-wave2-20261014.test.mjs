import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const files = ["data/services.json", "data/services-scale-verified.json", "data/services-private-extended.json"];
const catalog = files.flatMap((file) => JSON.parse(readFileSync(new URL("../" + file, import.meta.url), "utf8")));
const ids = [
  "cac-annual-returns", "waec-lost-certificate", "nysc-foreign-trained-registration",
  "npc-child-birth-registration", "cac-certified-true-copy", "nysc-call-up-letter",
  "passport-change-marital-status", "fct-file-individual-tax-return", "jamb-print-result",
  "npc-modify-birth-record", "verify-vehicle-number-plate", "nafdac-product-verification",
  "avon-provider-directory", "moniepoint-pos-terminal", "unity-business-account-opening",
  "ups-track-package-nigeria", "uber-reserve-ride-nigeria",
  "uber-request-ride-online-nigeria", "sendbox-track-shipment-nigeria",
  "hotelsng-add-hotel", "cowrywise-withdraw-from-stash"
];
const get = (slug) => {
  const records = catalog.filter((item) => item.slug === slug);
  assert.equal(records.length, 1, slug + " must have one canonical record");
  return records[0];
};

test("all 21 checked records have concise actionable answers and a useful step sequence", () => {
  for (const slug of ids) {
    const item = get(slug);
    assert.ok(item.summary.length >= 120, slug + " lacks a useful answer-first summary");
    assert.ok(item.steps.length >= 4, slug + " lacks a complete task sequence");
    assert.ok(item.steps.every((step) => step.length >= 45), slug + " has an unclear process step");
    assert.ok(item.sources.length, slug + " lacks a provider/agency source");
    assert.match(item.lastVerified, /^2026-10-(?:1[4-9]|2\\d|3[01])$/, slug + " review date");
  }
});

test("government records preserve verified service-specific identity and document requirements", () => {
  const npc = get("npc-child-birth-registration");
  assert.match(npc.summary, /child without a NIN/i);
  assert.match(npc.requirements.join(" "), /parent\/guardian NIN/);
  assert.match(npc.requirements.join(" "), /without one/);
  assert.match(get("passport-change-marital-status").requirements.join(" "), /marriage certificate/i);
  assert.match(get("fct-file-individual-tax-return").steps.join(" "), /Returns Reference Number/);
  assert.match(get("nysc-foreign-trained-registration").steps.join(" "), /physical verification/i);
  assert.match(get("jamb-print-result").summary, /₦1,000.*₦100/);
  assert.match(get("nafdac-product-verification").steps.join(" "), /Verify Now/);
});

test("private service guides distinguish official user flows and uncertain availability", () => {
  assert.match(get("sendbox-track-shipment-nigeria").notes.join(" "), /authorisation key/);
  assert.match(get("uber-reserve-ride-nigeria").notes.join(" "), /30 days/);
  assert.match(get("moniepoint-pos-terminal").summary, /₦21,500/);
  assert.match(get("avon-provider-directory").steps.join(" "), /temporarily shows zero/i);
  assert.match(get("hotelsng-add-hotel").summary, /for free/);
  assert.match(get("cowrywise-withdraw-from-stash").summary, /linked to your own BVN/i);
});

test("source-backed copy rejects generic non-actions across the individually edited records", () => {
  const vague = /follow (?:the )?(?:portal|official|process)|complete (?:the )?(?:process|registration)|as instructed|where required|details requested by|through the .* process/i;
  for (const slug of ids) {
    for (const [index, step] of get(slug).steps.entries()) {
      assert.doesNotMatch(step, vague, slug + " step " + (index + 1));
    }
  }
});
