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

test("homepage trends require evidence of momentum, not a four-pillar quota", () => {
  // Issuer notices, scheduled events and job deadlines remain useful guides,
  // but are not promoted as viral stories without independently verified momentum.
  assert.deepEqual(getCurrentHomeSocialTrends("2026-10-19"), []);
  const current = getCurrentHomeSocialTrends("2026-10-23");
  assert.deepEqual(current.map(item => item.href), ["/entertainment/movies/agbara-nla-the-return"]);
  assert.ok(current.every(item => item.momentumEvidence?.primaryUrl && item.momentumEvidence.corroborationUrl));
  assert.equal(getCurrentHomeSocialTrends("2026-10-29").length, 0);
  const homepage = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(homepage, /socialTrends\.length > 0 &&/);
  const styles = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /\.home-trending-links a:only-child\s*\{[^}]*grid-column: 1 \/ -1;/);
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
  const governmentSlugs = checkedClosedRecruitmentSlugs20261019.filter(slug => slug !== "reckitt-nigeria-management-trainee-2026");
  assert.equal(governmentSlugs.length, 3);
  for (const slug of governmentSlugs) {
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

test("Reckitt Trailblazers 5.0 is filled; historic requirements do not imply open applications", () => {
  const slug = "reckitt-nigeria-management-trainee-2026";
  assert.ok(checkedClosedRecruitmentSlugs20261019.includes(slug));
  const job = jobOpportunities.find(item => item.slug === slug);
  assert.ok(job);
  assert.equal(job.status, "closed");
  assert.equal(job.verifiedAt, "2026-10-20");
  assert.match(job.summary, /position has been filled|not accepting applications/i);
  assert.match(job.nextMilestone ?? "", /filled.*20 October 2026/i);
  assert.ok(job.applicationSteps.some(step => /Do not upload|Do not pay|Do not.*personal/i.test(step)));
  assert.ok(job.sources.some(source => source.url.includes("careers.reckitt.com/job/") && source.lastChecked === "2026-10-20"));
  assert.ok(job.sourceNotes.some(note => /position has been filled/i.test(note)));
});

test("decorative Jobs counters are not spoken twice", () => {
  const source = readFileSync(new URL("../app/jobs/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(source, /<ol className="job-steps">/);
  assert.match(source, /<span aria-hidden="true">\{index \+ 1\}<\/span>/);
});

test("23 October Agbara Nla feature uses dated distributor evidence and the existing film URL", () => {
  const current = getCurrentHomeSocialTrends("2026-10-23");
  assert.equal(current.length, 1);
  assert.equal(new Set(current.map(item => item.pillar)).size, 1);
  const trend = current.find(item => item.href === "/entertainment/movies/agbara-nla-the-return");
  assert.ok(trend);
  assert.match(trend.title, /₦354\.5m/i);
  assert.equal(getCurrentHomeSocialTrends("2026-10-29").some(item => item.href === trend.href), false);
  const film = entertainmentTitles.find(item => item.slug === "agbara-nla-the-return");
  assert.ok(film);
  assert.match(film.synopsis, /20 October 2026.*₦354\.5 million/);
  assert.match(film.synopsis, /distributor figures/i);
  assert.ok(film.references?.some(source => source.href === "https://www.instagram.com/p/Dera0nJoS4N/"));
  assert.ok(film.references?.some(source => source.href.includes("punchng.com/agbara-nla-grosses-n307m")));
  assert.equal(film.watchLinks.some(link => link.access === "full-movie"), false);
});
