import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const g=JSON.parse(readFileSync("data/services-private-extended.json","utf8")).find(x=>x.slug==="western-union-track-transfer-nigeria");
test("Western Union Nigeria distinguishes official MTCN tracking from payout and fee scams",()=>{
  assert.ok(g);
  assert.equal(g.officialPortal,"https://www.westernunion.com/ng/en/receive-money.html");
  assert.equal(g.lastVerified,"2026-10-14");
  const t=[g.summary,g.feeNote,g.timeline,...g.steps,...g.notes].join(" ");
  for(const v of ["10-digit","MTCN","sender","cash pickup","bank-account","local-currency","government-issued ID","on hold","0700-34778-2668228","2019","release fee"]){
    assert.ok(t.toLowerCase().includes(v.toLowerCase()),v);
  }
  assert.ok(g.sources.some(s=>s.url.endsWith("/ng/en/legal/terms-conditions.html")));
  assert.ok(t.split(/\s+/).length>800);
  assert.ok(g.steps.some(s=>s.includes("Track Transfer")));
});
