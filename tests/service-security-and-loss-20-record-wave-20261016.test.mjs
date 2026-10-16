import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const scale = JSON.parse(readFileSync("data/services-scale-verified.json", "utf8"));
const privateServices = JSON.parse(readFileSync("data/services-private-extended.json", "utf8"));
const government = JSON.parse(readFileSync("data/services.json", "utf8"));
const records = [...scale, ...privateServices, ...government];
const get = (slug) => records.find((x) => x.slug === slug);
const bank = [
  "gtbank-block-debit-card", "opay-emergency-lock-account-card",
  "sterling-emergency-block-account", "union-bank-debit-card-management",
  "keystone-emergency-account-block", "stanbic-emergency-account-block",
  "access-bank-block-account", "zenith-emergency-account-block",
  "fidelity-emergency-block", "union-bank-826-ussd",
  "stanbic-909-ussd-banking", "fidelity-770-ussd-banking",
];
const telco = ["mtn-sim-swap-replacement", "airtel-4g-sim-swap"];
const privateRecovery = [
  "smartcash-emergency-block-wallet", "uber-lost-item-nigeria", "bolt-lost-item-nigeria",
];
const documentRecovery = [
  "lost-nigerian-passport", "replace-lost-drivers-licence", "nysc-lost-discharge-certificate",
];
const all = [...bank, ...telco, ...privateRecovery, ...documentRecovery];

test("20 original established pages retain original slugs and verified primary sources", () => {
  assert.equal(all.length, 20);
  assert.equal(new Set(all).size, 20);
  for (const slug of all) {
    const x = get(slug);
    assert.ok(x, "Missing existing page: " + slug);
    assert.equal(x.lastVerified, "2026-10-16", slug);
    assert.ok(x.summary.length > 140, slug);
    assert.ok(x.requirements.length >= 3, slug);
    assert.ok(x.steps.length >= 5, slug);
    assert.ok(x.notes.length >= 3, slug);
    assert.ok(x.sources?.length > 0, slug);
    assert.ok(x.sources.every(s => s.url.startsWith("https://") && s.lastChecked === "2026-10-16"), slug);
  }
});

test("bank-specific emergency codes, restrictions, caveats and support remain distinct", () => {
  assert.match(get("gtbank-block-debit-card").summary, /\*737\*51\*10#/);
  assert.match(get("opay-emergency-lock-account-card").summary, /\*955\*131#.*\*955\*132#/);
  assert.match(get("sterling-emergency-block-account").summary, /prior USSD registration/i);
  assert.match(get("keystone-emergency-account-block").summary, /Post No Debit/i);
  assert.match(get("stanbic-emergency-account-block").summary, /\*909\*1\*911#/);
  assert.match(get("access-bank-block-account").summary, /PIN even when/i);
  assert.match(get("access-bank-block-account").steps.join(" "), /Third Party/);
  assert.match(get("zenith-emergency-account-block").summary, /\*966\*911#/);
  assert.match(get("fidelity-emergency-block").summary, /\*770\*911#.*\*770\*991#/);
  assert.match(get("union-bank-debit-card-management").summary, /\*826\*21#/);
  assert.match(get("smartcash-emergency-block-wallet").summary, /\*939\*911#/);
});

test("SIM, lost-item and lost-document guides preserve real safeguards", () => {
  const mtn = get("mtn-sim-swap-replacement");
  assert.match(mtn.steps.join(" "), /more than 30 days|over 30 days|more than 30days/i);
  assert.match(mtn.steps.join(" "), /90 days/);
  assert.match(get("airtel-4g-sim-swap").summary, /self-service SIM swap/);
  assert.match(get("uber-lost-item-nigeria").steps.join(" "), /help\.uber\.com/);
  assert.match(get("bolt-lost-item-nigeria").summary, /24 hours/);
  const ny = get("nysc-lost-discharge-certificate");
  assert.match(ny.summary, /does not reprint/i);
  assert.match(ny.summary, /Letter of Confirmation/i);
  assert.match(ny.feeNote, /₦20,000/);
  assert.match(get("replace-lost-drivers-licence").steps.join(" "), /Reissue of Driver.s Licence/i);
  assert.match(get("lost-nigerian-passport").steps.join(" "), /Renewal\/Re-issue Passport/);
});

test("shared journey has explicit verified exceptions for physical and USSD routes", () => {
  const source = readFileSync("lib/journey.ts", "utf8");
  for (const slug of [
    ...bank.filter(x => x !== "union-bank-debit-card-management"),
    ...telco, "smartcash-emergency-block-wallet", "nysc-lost-discharge-certificate",
  ]) {
    assert.ok(source.includes('"' + slug + '": {'), "Missing journey override: " + slug);
  }
  assert.match(source, /"mtn-sim-swap-replacement": \{\s*mode: "physical"/);
  assert.match(source, /"airtel-4g-sim-swap": \{\s*mode: "hybrid"/);
});
