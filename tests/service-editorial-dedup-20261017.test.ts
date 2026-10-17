import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
type Guide = { slug: string; requirements: string[]; steps: string[]; notes: string[]; sources: Array<{url:string}> };
const guides = JSON.parse(readFileSync("data/services.json", "utf8")) as Guide[];
const ids = [
  "nipo-industrial-design-registration",
  "npc-death-registration",
  "npc-child-birth-registration",
  "nin-date-of-birth-modification",
  "nrs-tax-payment",
  "nin-address-modification",
  "bvn-retrieval",
  "nysc-remobilization",
  "fct-file-individual-tax-return",
  "rivers-rivtin-registration",
  "cac-certified-true-copy",
  "pencom-job-loss-25-percent-withdrawal",
  "lagos-tax-clearance-verification",
  "waec-collect-certificate",
  "rivers-tax-clearance-certificate",
  "new-drivers-licence",
  "nin-phone-modification",
  "nepc-exporter-certificate-renewal-verification",
  "scuml-certificate-registration",
  "cac-company-registration",
  "nipo-trademark-registration"
];
const guideMap = new Map(guides.map(x=>[x.slug,x]));

test("the 21 editorially consolidated guides keep core facts and adequate task instructions", () => {
 assert.equal(ids.length, 21);
 for(const slug of ids) {
  const g=guideMap.get(slug); assert.ok(g, slug);
  assert.ok(g.requirements.length >= 2, slug+" prerequisites");
  assert.ok(g.steps.length >= 5, slug+" usable stages");
  assert.ok(g.notes.length >= 3, slug+" cautions");
  assert.ok(g.sources.length, slug+" issuer source links");
  for(const field of ["requirements","steps","notes"] as const) {
    const normalized=g[field].map(x=>x.toLowerCase().replace(/[^a-z0-9]+/g," ").trim());
    assert.equal(new Set(normalized).size,normalized.length,slug+" duplicate in "+field);
  }
 }
});

test("distinct process decisions survive consolidation and stay in actionable order", () => {
 const nysc = guideMap.get("nysc-remobilization")!;
 assert.match(nysc.steps[0], /revalidation/i);
 assert.match(nysc.steps[1], /application during an active/i);
 assert.match(nysc.steps[2], /previous call-up number/i);
 assert.match(nysc.steps[nysc.steps.length-1], /approval/i);
 const nipo = guideMap.get("nipo-trademark-registration")!;
 assert.match(nipo.steps[0], /similar marks/i);
 assert.match(nipo.steps[1], /accredited agents/i);
 assert.match(nipo.steps[2], /file the trademark application/i);
 const births = guideMap.get("npc-child-birth-registration")!;
 assert.ok(births.requirements.some(x=>/parent|guardian/i.test(x) && /email|NIN/i.test(x)));
 const fees = guideMap.get("nin-date-of-birth-modification")!;
 assert.ok(fees.notes.some(x=>/₦28,574/.test(x) && /₦15,000/.test(x)), "retain disputed official NIMC fees");
 const waiver = guideMap.get("waec-collect-certificate")!;
 assert.ok(waiver.steps.some(x=>/school candidates/i.test(x)));
 assert.ok(waiver.steps.some(x=>/private-candidate/i.test(x)));
});
