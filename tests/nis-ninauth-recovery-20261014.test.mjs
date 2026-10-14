import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const services=JSON.parse(readFileSync("data/services.json","utf8"));
const find=(slug)=>services.find(x=>x.slug===slug);

test("Nigeria immigration landing/exit card has safe identity, status, and recovery flow",()=>{
  const g=find("nigeria-landing-exit-card");
  assert.ok(g);
  assert.equal(g.officialPortal,"https://lecard.immigration.gov.ng/");
  assert.equal(g.lastVerified,"2026-10-14");
  const text=[g.summary,g.timeline,...g.steps,...g.notes].join(" ");
  for(const needle of ["24–48 hours","Nigerian passport","transit","pending","declined","expired","overstay","lecard@immigration.gov.ng","get-last-card"]){
    assert.ok(text.toLowerCase().includes(needle.toLowerCase()),needle);
  }
  assert.ok(g.sources.some(s=>s.url==="https://lecard.immigration.gov.ng/faq"));
  assert.ok(g.sources.some(s=>s.url==="https://lecard.immigration.gov.ng/get-last-card"));
  assert.ok(g.steps.some(s=>s.includes("Each")||s.includes("different"))||g.notes.some(s=>s.includes("individual applications")));
  assert.ok([g.summary,g.timeline,...g.steps,...g.notes].join(" ").split(/\s+/).length>750);
});

test("NINAuth covers NIMC free June 2026 slip, consent and temporary Sharecode",()=>{
  const g=find("ninauth-nin-verification");
  assert.ok(g);
  assert.equal(g.officialPortal,"https://ninauth.nimc.gov.ng/download");
  assert.equal(g.lastVerified,"2026-10-14");
  const text=[g.summary,g.timeline,g.feeNote,...g.steps,...g.notes].join(" ");
  for(const needle of ["Do More with NINAuth","NIN Slip","free","Sharecode","QR code","consent","first-time NIN"]){
    assert.ok(text.toLowerCase().includes(needle.toLowerCase()),needle);
  }
  assert.ok(g.sources.some(s=>s.url.endsWith("/news-room/download-your-nin-slip")));
  assert.ok(g.sources.some(s=>s.url.endsWith("/get-started")));
  assert.ok(text.split(/\s+/).length>750);
});
