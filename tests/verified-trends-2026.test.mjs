import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const load = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8");
const services = JSON.parse(load("data/services.json"));
const jobs = load("lib/job-trend-programmes-2026-10-08.ts");
const events = load("lib/explore-trend-events-2026-10-08.ts");
const movies = load("lib/entertainment.ts");
const home = load("data/home-social-trends.ts");
const seo = load("data/service-seo-overrides.ts");

test("NECO external guide is distinct, actionable and sourced", () => {
  const slug = "neco-2026-ssce-external-registration";
  const candidate = services.filter((record) => record.slug === slug);
  assert.equal(candidate.length, 1);
  assert.ok(services.some((record) => record.slug === "neco-2026-ssce-internal-registration"));
  const guide = candidate[0];
  assert.equal(guide.officialPortal, "https://ssceexternal.neco.gov.ng/");
  assert.ok(guide.steps.length >= 6 && guide.requirements.length >= 5 && guide.notes.length >= 5);
  assert.ok(guide.sources.every((source) => new URL(source.url).hostname.endsWith("neco.gov.ng")));
  assert.match(guide.feeNote, /₦5,000.*surcharge|₦5,000 late/);
  assert.ok(seo.includes(`"${slug}"`));
});

test("hackathon is a fully sourced competition, not a fabricated vacancy", () => {
  assert.match(jobs, /slug: "zenith-bank-zecathon-6-hackathon-2026"/);
  assert.match(jobs, /kind: "programme"/);
  assert.match(jobs, /deadline: "2026-10-13"/);
  assert.match(jobs, /Teams of 2-4|team of two to four|team of 2–4/i);
  assert.match(jobs, /conflicting prize figures/);
  assert.doesNotMatch(jobs, /\bposting:\s*\{/);
  assert.match(load("lib/jobs.ts"), /\.\.\.verifiedTrendProgrammes/);
});

test("festival has clear travel value and separate virtual-stream route", () => {
  assert.match(events, /slug: "hallelujah-festival-lagos-october-2026"/);
  assert.match(events, /https:\/\/www\.hallelujahchallengelive\.com\/int/);
  assert.match(events, /exact address|venue street address/);
  assert.match(load("lib/explore.ts"), /\.\.\.verifiedTrendEvents/);
  assert.match(load("app/explore/[slug]/page.tsx"), /href="\/entertainment\/hallelujah-challenge-october-2026"/);
  assert.match(load("app/entertainment/hallelujah-challenge-october-2026/page.tsx"), /href="\/explore\/hallelujah-festival-lagos-october-2026"/);
});

test("current homepage trend set spans all four pillars and all canonical pages", () => {
  const expected = [
    ["Movies & Entertainment", "/entertainment/movies/tele-x-zikora-2026"],
    ["Services", "/services/neco-2026-ssce-external-registration"],
    ["Tour Nigeria", "/explore/hallelujah-festival-lagos-october-2026"],
    ["Jobs & Careers", "/jobs/zenith-bank-zecathon-6-hackathon-2026"],
  ];
  for (const [pillar, href] of expected) {
    assert.ok(home.includes(`pillar: "${pillar}"`));
    assert.ok(home.includes(`href: "${href}"`));
  }
  const hrefs = [...home.matchAll(/^    href: "([^"]+)",$/gm)].map((match) => match[1]);
  // The authored schedule can contain future replacements, while the rendered
  // homepage is still capped at one active canonical per pillar.
  assert.equal(new Set(hrefs).size, hrefs.length);
  assert.ok(hrefs.includes("/jobs/deloitte-nigeria-early-careers"));
  assert.ok(hrefs.includes("/jobs/guides/national-ai-innovation-challenge-2026"));
  assert.match(movies, /slug: "tele-x-zikora-2026"/);
  assert.match(movies, /KHytYLBb_Zk/);
});



test("October 10 programmes are unique, independently sourced and routed", () => {
  const added = load("lib/job-social-trends-2026-10-10.ts");
  for (const [slug, deadline, source] of [
    ["afdb-2027-internship-session-one", "2026-10-12", "afdb.org"],
    ["nova-bank-graduate-trainee-2026", "2026-10-15", "novabank.ng"],
    ["ebid-young-professionals-2026", "2026-10-30", "bidc-ebid.org"]
  ]) {
    assert.equal(added.split('slug: "' + slug + '"').length - 1, 1);
    assert.ok(added.includes('deadline: "' + deadline + '"'));
    assert.ok(added.includes(source));
    assert.ok(home.includes('href: "/jobs/' + slug + '"'));
  }
  assert.equal(added.includes('posting: {'), false);
  assert.ok(load("lib/jobs.ts").includes("...octoberVerifiedProgrammes"));
  assert.ok(added.includes("completed NYSC") || added.includes("Completed National Youth Service Corps"));
  assert.ok(added.includes("master's degree"));
});

test("new series and movie have unique catalog records and source destinations", () => {
  const shows = load("lib/series.ts");
  const movie = load("lib/entertainment-social-trends-2026-10-10.ts");
  for (const slug of ["sirrin-amarya-2026", "onu-ahia-nwanyi-2026"]) {
    assert.equal(shows.split('slug: "' + slug + '"').length - 1, 1);
  }
  assert.ok(shows.includes("independent.ng/africa-magic-announces-five-new-originals-for-october"));
  assert.ok(movie.includes('slug: "issakaba-the-return-2026"'));
  assert.ok(movie.includes("https://nollywood.com/movies/issakaba-the-return"));
  assert.equal(movie.includes("https://issakaba.com/"), false);
  assert.ok(movie.includes("2026-10-10"));
  assert.ok(load("lib/entertainment.ts").includes("...verifiedOctoberFilm"));
  assert.ok(load("lib/entertainment-extras.ts").includes("issakaba-the-return-2026-cinema"));
});

test("NYSC and Lagos guides are enriched at existing canonical URLs", () => {
  const local = services.find((record) => record.slug === "nysc-registration-local");
  const callup = services.find((record) => record.slug === "nysc-call-up-letter");
  assert.ok(local && callup);
  assert.equal(services.filter((record) => record.slug === local.slug).length, 1);
  assert.ok(local.notes.some((note) => note.includes("4–24 November 2026")));
  assert.ok(local.notes.some((note) => note.includes("not the online registration")));
  assert.ok(callup.notes.some((note) => note.includes("call-up letters")));
  assert.ok(local.sources.some((source) => source.url.includes("officialnyscng")));
  const tour = load("lib/explore.ts");
  for (const slug of ["felabration-2026", "design-week-lagos-2026"]) {
    assert.equal(tour.split('slug: "' + slug + '"').length - 1, 1);
  }
  assert.ok(tour.includes("Underground System 5"));
  assert.ok(tour.includes("₦3,000"));
  assert.ok(tour.includes("National Theatre — Design Week Lagos 22–25 October"));
});
