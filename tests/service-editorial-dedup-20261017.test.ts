import assert from "node:assert/strict";
import test from "node:test";
// Shared-page repetition regressions also run with this existing focused editorial suite.
import "./sitewide-page-repetition-20261021.test";
import "./gsc-service-intent-routes-20261021.test";
import { readFileSync, readdirSync } from "node:fs";
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
    const normalized: string[] = (g[field] as string[]).map((value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim());
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


test("all published service catalogue files avoid repeated long article passages", () => {
  // Short shared field labels, legal names and requirements can recur;
  // repeated paragraphs are a different editorial problem.
  const catalogues = readdirSync("data").filter(file => /^services(?:-[a-z0-9-]+)?\.json$/.test(file));
  const seen = new Map<string, string>();
  let records = 0;
  for (const filename of catalogues) {
    const items = JSON.parse(readFileSync("data/" + filename, "utf8")) as Array<{
      slug: string; summary: string; steps: string[]; notes: string[];
    }>;
    if (!Array.isArray(items)) continue;
    records += items.length;
    for (const entry of items) {
      for (const field of ["summary", "steps", "notes"] as const) {
        const values = field === "summary" ? [entry.summary] : entry[field] ?? [];
        for (const value of values) {
          if (typeof value !== "string" || value.length < 80) continue;
          const normalized = value.toLocaleLowerCase("en").replace(/\s+/g, " ").trim().replace(/[.!]+$/g, "");
          const owner = seen.get(normalized);
          assert.ok(!owner, `Repeated ${field} paragraph on ${entry.slug} (${filename}); first on ${owner}`);
          seen.set(normalized, entry.slug + " / " + field);
        }
      }
    }
  }
  assert.ok(records >= 650, "The audit must cover the entire service catalogue, not a small curated subset");
});

test("NERC's full 2026 state-transfer notice and short announcement discrepancy are clearly distinguished", () => {
  const meter = guideMap.get("electricity-meter-paid-not-installed")!;
  const billing = guideMap.get("electricity-estimated-billing-dispute")!;
  const escalation = guideMap.get("electricity-complaint-escalation")!;
  const band = guideMap.get("electricity-tariff-band")!;
  for (const guide of [meter, billing, escalation, band]) {
    assert.ok(guide, "Each electricity user task keeps its own guide");
    assert.ok(guide.steps.length >= 7, guide.slug + " lost required task steps");
    assert.ok(guide.notes.length >= 3, guide.slug + " lost source-specific cautions");
    assert.ok(guide.sources.some(x => x.url.includes("/update-on-electricity-regulation-transition-to-state-electricity-regulators/")));
  }
  const jurisdiction = escalation.notes.join(" ");
  assert.match(jurisdiction, /15 states/);
  assert.match(jurisdiction, /Anambra/);
  assert.match(jurisdiction, /shorter NERC complaint-channel post lists only 14/);
  assert.match(meter.notes.join(" "), /ten working days/i);
  assert.match(billing.notes.join(" "), /billing month/i);
  assert.match(band.notes.join(" "), /hours of supply/i);
});

test("NECO public timetable keeps one registration deadline warning and distinct paper guidance", async () => {
  const { publicServices } = await import("../lib/data");
  const guide = publicServices.find((service) => service.slug === "neco-2026-timetable");
  assert.ok(guide, "Existing canonical timetable guide must remain present");
  const datedWarnings = guide.notes.filter(
    (note) => note.includes("26 October 2026") && note.includes("₦5,000"),
  );
  assert.equal(datedWarnings.length, 1, "No duplicate late-fee paragraphs across source and editorial overlay");
  assert.match(datedWarnings[0], /registration deadline|normal registration/i);
  assert.ok(
    guide.notes.some((note) => /subject paper, time, centre arrangements/.test(note)),
    "Preserve practical subject-level timetable instructions",
  );
  assert.equal(guide.lastVerified, "2026-10-17", "Deletion is not a new issuer recheck");
});
