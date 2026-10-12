import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const docs=JSON.parse(readFileSync(new URL("../data/services-universities-wave6.json",import.meta.url),"utf8"));
test("FUTO and FUTMINNA have distinct fee claims and original university sources",()=>{
  assert.equal(docs.length,2);
  assert.equal(new Set(docs.map((s:{slug:string})=>s.slug)).size,2);
  for(const school of docs){
    assert.equal(school.status,"verified");
    assert.equal(school.lastVerified,"2026-10-12");
    assert.equal(school.category,"Education");
    assert.ok(school.requirements.length>=3 && school.steps.length>=6);
    assert.ok(school.sources.length>=3 && school.sources.every((s:{url:string})=>s.url.startsWith("https://")));
    assert.ok(school.searchTerms.some((s:string)=>s.toLowerCase().includes("school fees")));
    assert.ok(school.related.includes("jamb-caps"));
  }
  assert.match(docs[0].summary,/O-level verification/i);
  assert.match(docs[1].feeNote,/₦2,000/);
});
