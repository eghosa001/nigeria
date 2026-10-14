import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const services=JSON.parse(readFileSync("data/services.json","utf8"));
for(const slug of ["inec-replace-lost-damaged-pvc","inec-voter-transfer","inec-update-voter-information"]){
  test(slug+" respects INEC closed CVR window while explaining available historic flow",()=>{
    const g=services.find(x=>x.slug===slug);
    assert.ok(g);
    assert.equal(g.lastVerified,"2026-10-14");
    const t=[g.summary,...g.steps,...g.notes].join(" ");
    assert.match(t,/CVR.*(closed|ended)|registration.*closed/i);
    assert.match(t,/separate.*(menu|directory)|menu.*does not|service.*directory/i);
    assert.ok(g.sources.some(x=>x.url==="https://cvr.inecnigeria.org/"));
    assert.ok(g.sources.some(x=>x.url==="https://cvr.inecnigeria.org/Public/getStarted"));
    assert.ok(g.steps.some(x=>/reopens|reopen|announces|open/i.test(x)));
    assert.ok(g.steps.some(x=>/voter.*(status|verification)|verify|lookup|record/i.test(x)));
  });
}
test("replacement respects 2026 Electoral Act, rejects stale online-only advice",()=>{
  const g=services.find(x=>x.slug==="inec-replace-lost-damaged-pvc");
  const t=[...g.requirements,...g.steps,...g.notes].join(" ");
  assert.match(t,/section 18/i);
  assert.match(t,/90 days before polling day/i);
  assert.match(t,/in person/i);
  assert.match(t,/two self photographs/i);
  assert.match(t,/lost.*damaged/i);
  assert.match(t,/request receipt|application receipt|application slip/i);
  assert.match(t,/REPLACEMENT/);
  assert.match(t,/iccc@inec.gov.ng/);
  assert.ok(g.sources.some(s=>s.url==="https://nass.gov.ng/documents/download/11248"));
  assert.ok(g.sources.every(s=>!s.url.includes("wp1.inecnigeria.org")));
});
