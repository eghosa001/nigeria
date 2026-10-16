import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const services = JSON.parse(readFileSync("data/services-scale-verified.json", "utf8"));
const get = (slug) => services.find((item) => item.slug === slug);

test("UBA card blocking uses provider's dedicated card code, not an assumed whole-account freeze", () => {
  const page = get("uba-block-debit-card");
  assert.ok(page);
  assert.match(page.summary, /\*919\*10#/);
  assert.match(page.feeNote, /₦5/);
  assert.match(page.notes.join(" "), /\*919\*911#/);
  assert.match(page.notes.join(" "), /\*919\*9#/);
  assert.match(page.steps.join(" "), /card does not|card block does not|Blocking a card does not|does not certify/i);
  assert.match(page.steps.join(" "), /unauthorised|fraud/i);
});

test("UBA freeze guide exposes conflicting official classifications and safe support route", () => {
  const page = get("uba-freeze-account");
  assert.ok(page);
  assert.match(page.summary, /Freeze Online Transactions/i);
  assert.match(page.summary, /third-party debit-card/i);
  assert.match(page.notes.join(" "), /conflict|discrepancy/i);
  assert.match(page.steps.join(" "), /Block My Account/);
  assert.match(page.steps.join(" "), /FREEZE ACCOUNT/);
  assert.match(page.steps.join(" "), /confirmation|reference/i);
  assert.doesNotMatch(page.summary, /\*919\*911# (?:will|always) freeze every/i);
});

test("UBA 919 overview does not conflate three emergency security codes", () => {
  const page = get("uba-919-ussd-banking");
  assert.ok(page);
  const details = [page.summary, ...page.steps].join(" ");
  assert.match(details, /\*919\*10#/);
  assert.match(details, /\*919\*9#/);
  assert.match(details, /\*919\*911#/);
  assert.match(details, /online-transaction|online transactions/i);
  for (const item of [page, get("uba-block-debit-card"), get("uba-freeze-account")]) {
    assert.equal(item.lastVerified, "2026-10-16");
    assert.ok(item.sources.some((s) => s.url.endsWith("/919-ussd-banking/")));
    assert.ok(item.sources.some((s) => s.url.endsWith("/self-service/")));
    assert.ok(item.sources.every((s) => s.lastChecked === "2026-10-16"));
  }
});
