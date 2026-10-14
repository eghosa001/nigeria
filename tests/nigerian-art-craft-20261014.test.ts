import test from "node:test";
import assert from "node:assert/strict";
import { exploreGuides } from "../lib/explore";

test("national craft guide distinguishes real cities, crafts, heritage and visitor permission",()=>{
  const g=exploreGuides.find(x=>x.slug==="nigeria-art-craft-guide");
  assert.ok(g);
  assert.equal(g.lastReviewed,"2026-10-14");
  assert.equal(g.sources?.length,6);
  const t=[g.summary,...g.intro,...g.highlights.map(x=>x.detail),...g.planning.map(x=>x.detail)].join(" ");
  for(const phrase of ["Lagos","Igun","Benin City","Itoku","Abeokuta","Osogbo","Suleja","Ladi Kwali","UNESCO","photography","permission","handmade","adire","bronze"]){
    assert.ok(t.toLowerCase().includes(phrase.toLowerCase()),phrase);
  }
  assert.ok(t.split(/\s+/).length>=900);
  assert.ok(g.sources?.some(x=>x.href.includes("whc.unesco.org/en/list/1118/")));
  assert.ok(g.sources?.some(x=>x.href.includes("si.edu/object/bowl")));
  assert.ok(g.source?.href.startsWith("https://edostate.gov.ng/"));
  assert.match(t,/not.*walking route/i);
});
