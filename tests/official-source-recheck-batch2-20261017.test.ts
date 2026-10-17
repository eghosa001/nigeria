import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const rows=JSON.parse(readFileSync("data/services.json","utf8"));
test("eight reviewed guides have real recorded issuer source dates",()=>{
  const names=["nigeria-evisa-application","nigeria-temporary-work-permit","us-b1-b2-visitor-visa","germany-schengen-tourist-visa","netherlands-schengen-visa","waec-2026-private-candidates-timetable","neco-2026-timetable","jamb-regularization-condonement"];
  for(const slug of names){const item=rows.find((x)=>x.slug===slug);assert.ok(item,slug);assert.equal(item.lastVerified,"2026-10-17");assert.ok(item.sources.every((x)=>x.lastChecked==="2026-10-17"));}
});
