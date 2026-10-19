import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getCurrentHomeSocialTrends } from "../data/home-social-trends";
import { publicServices } from "../lib/data";
import { getDetailedServiceGuidance } from "../lib/service-guidance";
import { entertainmentTitles } from "../lib/entertainment";
import { exploreGuides } from "../lib/explore";
import { reviewedEventSlugs20261019 } from "../lib/explore-event-lifecycle-2026-10-19";
import { refreshedAdmissionsSlugs20261019 } from "../lib/service-admission-decisions-2026-10-19";
import { checkedClosedRecruitmentSlugs20261019 } from "../lib/jobs-closed-recruitment-2026-10-19";
import { jobOpportunities } from "../lib/jobs";

const service = (slug: string) => {
  const item = publicServices.find(s => s.slug === slug);
  assert.ok(item, slug + " must remain an indexable canonical service");
  return item;
};

test("four current trends are source-specific, distinct canonicals, not new pages", () => {
  const current = getCurrentHomeSocialTrends("2026-10-19");
  assert.equal(current.length, 4);
  assert.equal(new Set(current.map(t => t.pillar)).size, 4);
  assert.equal(new Set(current.map(t => t.href)).size, 4);
  assert.ok(current.some(t => t.href === "/services/neco-2026-ssce-external-registration"));
  assert.ok(current.some(t => t.href === "/explore/abuja-international-film-festival-2026"));
  assert.ok(current.some(t => t.href === "/entertainment/movies/tele-x-zikora-2026"));
  assert.ok(current.some(t => t.href === "/jobs/nigerian-army-92rri-2026"));
  assert.equal(getCurrentHomeSocialTrends("2026-10-27").some(t => t.href === "/jobs/nigerian-army-92rri-2026"), false);
});

test("JAMB candidate acceptance and paid letter printing remain two different tasks", () => {
  assert.equal(refreshedAdmissionsSlugs20261019.length, 2);
  const caps = service("jamb-caps");
  const letter = service("jamb-admission-letter");
  assert.match(caps.summary, /school.*notice.*not.*JAMB/i);
  assert.match(letter.summary, /provisional letter.*not.*JAMB/i);
  for (const item of [caps, letter]) {
    assert.equal(item.lastVerified, "2026-10-19");
    assert.ok(item.sources.some(s => s.url === "https://jamb.gov.ng/caps" && s.lastChecked === "2026-10-19"));
    const guidance = getDetailedServiceGuidance(item);
    assert.match(guidance.route.physicalTitle, /No compulsory|online service/);
    assert.match(guidance.route.fallbackDetail, /JAMB|institution/i);
  }
  assert.match(getDetailedServiceGuidance(caps).route.fallbackDetail, /O.level/i);
});

test("elapsed NIFAFEST does not invite readers to past sessions", () => {
  assert.equal(reviewedEventSlugs20261019.length, 2);
  const festival = exploreGuides.find(x => x.slug === "nifafest-abuja-2026");
  assert.ok(festival);
  assert.equal(festival.lastReviewed, "2026-10-19");
  assert.match(festival.summary, /dates have passed/);
  assert.ok(festival.planning.some(x => /Has the 2026 festival ended/i.test(x.label)));
  assert.ok(festival.planning.every(x => !/before travelling|register through the organiser|check.*today/i.test(x.label)));
  assert.ok(festival.sources?.some(s => s.href === "https://nifafest.com/") || festival.source?.href === "https://nifafest.com/");
});

test("Design Week uses separate verified Hall and citywide schedules", () => {
  const guide = exploreGuides.find(x => x.slug === "design-week-lagos-2026");
  assert.ok(guide);
  assert.equal(guide.lastReviewed, "2026-10-19");
  assert.ok(guide.sources?.some(s => s.href === "https://designweeklagos.com/"));
  assert.ok(guide.planning.some(p => p.detail.includes("22 October") && p.detail.includes("25 October")));
  assert.ok(guide.planning.some(p => p.detail.includes("ticket")));
});

test("Tele x Zikora release notice is not falsely sold as currently streaming", () => {
  const film = entertainmentTitles.find(x => x.slug === "tele-x-zikora-2026");
  assert.ok(film);
  assert.match(film.synopsis, /23 October 2026/);
  assert.match(film.synopsis, /not proof.*showtime/);
  assert.ok(film.references?.some(r => r.href === "https://www.oyamag.com/tele-x-zikora-teaser-first-look/"));
  assert.ok(film.watchLinks.every(link => link.access !== "full-movie"));
});

test("Kainji offers a useful fallback without suggesting unverified admission", () => {
  const guide = exploreGuides.find(x => x.slug === "kainji-dam-guide");
  assert.ok(guide);
  assert.ok(guide.planning.some(p => /operator cannot approve/i.test(p.label)));
  assert.ok(!guide.planning.some(p => /Are there verified tickets or public opening hours/.test(p.label)));
  assert.ok(guide.sources?.some(s => /mainstream\.com\.ng/.test(s.href)));
});

test("three stale government recruitments are issuer-confirmed closed with practical aftercare", () => {
  assert.equal(checkedClosedRecruitmentSlugs20261019.length, 3);
  for (const slug of checkedClosedRecruitmentSlugs20261019) {
    const job = jobOpportunities.find(j => j.slug === slug);
    assert.ok(job, slug);
    assert.equal(job.verifiedAt, "2026-10-19");
    assert.equal(job.status, "closed");
    assert.match(job.summary, /closed|ended|not.*newly|not.*accepting/i);
    assert.equal(job.applicationSteps.length, 5);
    assert.ok(job.sources.some(source => source.lastChecked === "2026-10-19"), slug);
    assert.ok(job.sourceNotes.some(note => note.includes("19 October 2026")), slug);
  }
});

test("decorative Jobs counters are not spoken twice", () => {
  const source = readFileSync(new URL("../app/jobs/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(source, /<ol className="job-steps">/);
  assert.match(source, /<span aria-hidden="true">\{index \+ 1\}<\/span>/);
});
