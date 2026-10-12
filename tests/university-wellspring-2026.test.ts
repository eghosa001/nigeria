import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const list=JSON.parse(readFileSync(new URL("../data/services-wellspring-2026.json",import.meta.url),"utf8"));
test("Wellspring 2026/27 official tuition remains distinct from additional charges",()=>{
 assert.equal(list.length,1);
 const s=list[0];
 assert.equal(s.slug,"wellspring-university-2026-fees-admissions");
 assert.equal(s.lastVerified,"2026-10-12");
 assert.match(s.feeNote,/Nursing ₦1,506,600/);
 assert.match(s.feeNote,/acceptance|hostel|clinical/i);
 assert.ok(s.sources.length>=3);
 assert.ok(s.steps.length>=5);
 assert.equal(s.status,"verified");
});
