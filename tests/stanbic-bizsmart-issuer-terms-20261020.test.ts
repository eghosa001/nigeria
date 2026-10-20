import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
const records = JSON.parse(readFileSync(new URL("../data/services-scale-verified.json", import.meta.url), "utf8")) as Array<{
 slug: string; status: string; lastVerified: string; feeLabel: string; feeNote: string;
 steps: string[]; notes: string[]; sources: Array<{url:string;lastChecked:string}>;
}>;
const product = "https://www.stanbicibtcbank.com/nigeriabank/business/products-and-services/bank-with-us/business-bank-accounts/biz-smart-account";
const terms = "https://www.stanbicibtcbank.com/static_file/Nigeria/nigeriabank/Business/Products/Bank%20With%20Us/Business%20Bank%20Accounts/Biz%20Smart/Biz%20Smart%20Account%20Terms%20%26%20Conditions.pdf";

test("Stanbic Biz Smart reveals true first-party ₦20k versus ₦5k opening-deposit conflict", () => {
 const record = records.find(x => x.slug === "stanbic-bizsmart-account");
 assert.ok(record);
 assert.equal(record.status, "conflict");
 assert.equal(record.lastVerified, "2026-10-20");
 assert.match(record.feeNote, /live Biz Smart product page lists ₦20,000/);
 assert.match(record.feeNote, /Conditions PDF.*₦5,000/);
 assert.match(record.feeNote, /₦5,000 is locked/);
 assert.match(record.feeNote, /daily balance.*separate condition/);
 assert.ok(record.steps.some(s => /confirm the currently applicable deposit/.test(s)));
 assert.ok(record.notes.some(s => /cheque book is restricted/.test(s)));
 assert.ok(record.sources.some(s => s.url === product && s.lastChecked === "2026-10-20"));
 assert.ok(record.sources.some(s => s.url === terms && s.lastChecked === "2026-10-20"));
 assert.equal(record.sources.length, 2);
 assert.ok(!record.feeNote.includes("₦10,000"));
});

test("No other bank or public-service record gets an unearned recheck date", () => {
 assert.equal(records.filter(x=>x.slug==="stanbic-bizsmart-account").length,1);
 assert.deepEqual(records.filter(x=>x.lastVerified==="2026-10-20").map(x=>x.slug).sort(),
   ["stanbic-bizsmart-account", "aedc-map-refund", "ibedc-map-refund"].sort());
});
