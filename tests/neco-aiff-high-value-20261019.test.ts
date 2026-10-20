import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { publicServices } from "../lib/data";
import { getDetailedServiceGuidance } from "../lib/service-guidance";
import { getServiceJourney, hasReviewedServiceJourney } from "../lib/journey";
import { exploreGuides } from "../lib/explore";
import { getCurrentHomeSocialTrends } from "../data/home-social-trends";

const neco = publicServices.find(s => s.slug === "neco-2026-ssce-external-registration");
const aiff = exploreGuides.find(g => g.slug === "abuja-international-film-festival-2026");

test("NECO External is an existing canonical enriched with first-party specific facts", () => {
  assert.ok(neco);
  assert.equal(neco.lastVerified, "2026-10-19");
  assert.match(neco.feeLabel, /₦30,000.*₦5,000.*₦43,000/);
  assert.match(neco.feeNote ?? "", /non-refundable/);
  assert.match(neco.feeNote ?? "", /Stamp duty.*Remita/);
  assert.equal(neco.steps.length, 7);
  const subjects = neco.steps[0];
  for (const subject of ["Accounting", "Agricultural Science", "Biology", "Chemistry",
    "Christian Religious Studies", "Civic Education", "Commerce", "Economics", "English Language",
    "General Mathematics", "Geography", "Government", "Islamic Studies",
    "Literature-in-English", "Marketing", "Physics"]) assert.ok(subjects.includes(subject), subject);
  assert.equal(neco.notes.filter(n => n.includes("The 16 subjects are")).length, 0);
  assert.match(neco.notes.join(" "), /Further Mathematics.*Technical Drawing/);
  assert.ok(neco.requirements.some(r => /neighbourhood.*cannot be changed/.test(r)));
  assert.ok(neco.steps.some(r => /referee.*signature and stamp/.test(r)));
  assert.ok(neco.steps.some(r => /fingerprint.*cybercafé/i.test(r)));
  assert.ok(neco.sources.some(s => s.url === "https://neco.gov.ng/" && s.lastChecked === "2026-10-19"));
});

test("NECO External journey does not mislead phone registrants into skipping biometrics", () => {
  assert.ok(neco);
  const journey = getServiceJourney(neco);
  assert.equal(hasReviewedServiceJourney(neco.slug), true);
  assert.equal(journey.mode, "hybrid");
  assert.equal(journey.physicalStatus, "required");
  assert.match(journey.physicalLabel, /cybercafé/);
  const details = getDetailedServiceGuidance(neco);
  assert.match(details.route.startTitle, /16 available subjects/);
  assert.match(details.route.physicalDetail, /fingerprints/);
  assert.match(details.route.fallbackDetail, /neighbourhood.*cannot be changed/i);
  const component = readFileSync(new URL("../components/service-journey.tsx", import.meta.url), "utf8");
  assert.match(component, /"neco-2026-ssce-external-registration"\].includes\(service.slug\)/);
});

test("Abuja festival visitor guide distinguishes official dated days, admission, venues and discrepancy", () => {
  assert.ok(aiff);
  assert.equal(aiff.lastReviewed, "2026-10-19");
  assert.equal(aiff.highlights.length, 6);
  assert.ok(aiff.highlights.some(h => h.name.includes("20 October")));
  assert.ok(aiff.highlights.some(h => h.name.includes("22 October") && /writing.*camera|writing.*cinematography|filmmaking/i.test(h.detail)));
  assert.ok(aiff.highlights.some(h => h.name.includes("24 October") && /awards/i.test(h.detail)));
  assert.match(aiff.summary, /20–24 October/);
  assert.match(aiff.summary, /20–25 October/);
  assert.ok(aiff.planning.some(p => /exact movie lineup/i.test(p.label)));
  assert.ok(aiff.planning.some(p => /buy a real ticket/i.test(p.label)));
  assert.ok(aiff.planning.some(p => /theme/i.test(p.label)));
  assert.equal(aiff.source?.href, "https://abujainternationalfilmfestival.org/aiff-2026-programme");
  assert.ok(aiff.sources?.some(s => s.href === "https://abujainternationalfilmfestival.org/23rd-aiff-screening-schedule"));
  assert.ok(aiff.sources?.some(s => s.href === "https://www.visitabuja.org/event/23rd-abuja-international-film-festival/"));
});

test("only the two verified new time-sensitive canonicals enter four-pillar front shelf", () => {
  const items = getCurrentHomeSocialTrends("2026-10-19");
  assert.equal(items.length, 4);
  assert.equal(new Set(items.map(i => i.pillar)).size, 4);
  assert.ok(items.some(i => i.href === "/services/neco-2026-ssce-external-registration"));
  assert.ok(items.some(i => i.href === "/explore/abuja-international-film-festival-2026"));
  assert.ok(!items.some(i => i.href === "/services/jamb-caps"));
  assert.ok(!items.some(i => i.href === "/explore/design-week-lagos-2026"));
  assert.ok(!getCurrentHomeSocialTrends("2026-10-27").some(i => i.href === "/explore/abuja-international-film-festival-2026"));
});
