import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const guide=JSON.parse(readFileSync("data/services-private-extended.json","utf8")).find(x=>x.slug==="spotify-premium-nigeria");

test("Spotify guide distinguishes Nigerian renewal prices from temporary offers",()=>{
  assert.ok(guide);
  assert.equal(guide.officialPortal,"https://www.spotify.com/ng/premium/");
  for(const val of ["₦1,600","₦800","₦2,100","₦2,500"]){
    assert.ok(guide.feeLabel.includes(val),val);
  }
  assert.match(guide.feeNote,/31 October 2026/);
  assert.match(guide.notes.join(" "),/SheerID/);
  assert.match(guide.notes.join(" "),/zero-price trial/);
  assert.match(guide.steps.join(" "),/Cancel subscription/);
  assert.match(guide.steps.join(" "),/same-address eligibility/);
  assert.equal(guide.sources.length,3);
  assert.equal(guide.lastVerified,"2026-10-14");
  const words=[guide.summary,guide.feeNote,...guide.requirements,...guide.steps,...guide.notes].join(" ").split(/\s+/).length;
  assert.ok(words>=800);
});
