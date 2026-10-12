import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
const rows=JSON.parse(readFileSync(new URL("../data/services-universities-wave4.json",import.meta.url),"utf8"));
test("official university wave four preserves fee and screening context",()=>{
 assert.equal(rows.length,4);
 assert.equal(new Set(rows.map((r: {slug:string})=>r.slug)).size,4);
 for(const r of rows) {
  assert.equal(r.lastVerified,"2026-10-12");
  assert.equal(r.status,"verified");
  assert.equal(r.category,"Education");
  assert.ok(r.requirements.length>=3&&r.steps.length>=5&&r.notes.length>=3);
  assert.ok(r.sources.length>=2&&r.sources.every((x:{url:string})=>x.url.startsWith("https://")));
  assert.ok(r.searchTerms.some((term:string)=>term.includes("school fees")));
  assert.ok(r.related.includes("jamb-caps"));
  assert.match(r.feeNote,/university|current|2026|programme|tuition/i);
 }
 assert.match(rows.find((r:{slug:string})=>r.slug.startsWith("abu-zaria"))!.notes.join(" "),/8 October 2026/);
 assert.match(rows.find((r:{slug:string})=>r.slug.startsWith("fuoye"))!.feeNote,/programme-specific/);
});