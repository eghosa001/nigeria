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

test("Spotify guidance avoids government-application and imaginary reference instructions",()=>{
  const guidance=readFileSync("lib/service-guidance.ts","utf8");
  const match=guidance.match(/"spotify-premium-nigeria": \{[\s\S]*?\n  \},\n\};\n\nconst agencyFallback:/);
  assert.ok(match,"Spotify must have explicit provider-specific guidance");
  assert.match(match[0],/Manage your plan/);
  assert.match(match[0],/partner-billed/);
  assert.doesNotMatch(match[0],/government application slip or reference number required/);
  const page=readFileSync("app/services/[slug]/page.tsx","utf8");
  assert.doesNotMatch(page,/These government or agency pages were used/);
});
