import test from "node:test";
import assert from "node:assert/strict";
import { exploreGuides } from "../lib/explore";

test("Mambilla visitor guide separates Gembu, Kakara, waterfalls and protected forest", () => {
  const guide=exploreGuides.find(x=>x.slug==="mambilla-plateau-guide");
  assert.ok(guide);
  assert.equal(guide.lastReviewed,"2026-10-14");
  const text=[guide.summary,...guide.intro,...guide.highlights.map(x=>x.detail),...guide.planning.map(x=>x.detail)].join(" ");
  for(const term of ["Sardauna","Gembu","Kakara","Barup","Ngel Nyaki","Chappal Waddi","airstrip","permission","guide","rain"]){
    assert.ok(text.toLowerCase().includes(term.toLowerCase()),term);
  }
  assert.ok(text.split(/\s+/).length>800);
  assert.equal(guide.sources?.length,4);
  assert.ok(guide.source?.href.startsWith("https://fmino.gov.ng/"));
  assert.ok(guide.sources?.some(x=>x.href.includes("tarabatourism.org.ng")));
  assert.match(text,/no verified universally best week/i);
  assert.match(text,/not.*passenger flights/i);
});
