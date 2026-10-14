import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const s=JSON.parse(readFileSync("data/services-scale-verified.json","utf8")).find(x=>x.slug==="airtel-esim-activation");
test("Airtel Nigeria eSIM is free, official service centre, single-use QR and manufacturer routes",()=>{
  assert.ok(s);
  assert.equal(s.lastVerified,"2026-10-14");
  assert.equal(s.officialPortal,"https://www.airtel.com.ng/ng/personal/services/sim-services/esim");
  assert.match(s.feeLabel,/Free/);
  const t=[s.summary,s.feeNote,...s.requirements,...s.steps,...s.notes].join(" ");
  for(const phrase of ["EID","IMEI","iPhone","Samsung","Google Pixel","Wi-Fi","single-use","service centre","300","fresh SIM swap"]){
    assert.ok(t.toLowerCase().includes(phrase.toLowerCase()),phrase);
  }
  assert.ok(t.split(/\s+/).length>800);
  assert.ok(s.steps.some(x=>x.includes("confirms")||x.includes("new QR and swap")));
  assert.equal(s.sources.length,1);
});
