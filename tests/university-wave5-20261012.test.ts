import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
const schoolRecords = JSON.parse(readFileSync(new URL("../data/services-universities-wave5.json",import.meta.url),"utf8"));
test("UNICAL and FUL 2026/27 admissions are documented without fictitious school fees",()=>{
  assert.equal(schoolRecords.length,2);
  assert.equal(new Set(schoolRecords.map((x: {slug:string})=>x.slug)).size,2);
  for (const s of schoolRecords) {
    assert.equal(s.category,"Education");
    assert.equal(s.lastVerified,"2026-10-12");
    assert.ok(s.sources.length>=3 && s.requirements.length>=4 && s.steps.length>=5);
    assert.ok(s.sources.every((x: {url:string})=>x.url.startsWith("https://")));
    assert.match(s.feeNote,/₦2,000/);
    assert.ok(s.related.includes("jamb-caps"));
  }
  assert.ok(schoolRecords[0].notes.some((x:string)=>/closed/i.test(x)));
  assert.match(schoolRecords[1].timeline,/26 October/);
});
