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
  assert.equal(new Set(hrefs).size, 4);
  assert.match(movies, /slug: "tele-x-zikora-2026"/);
  assert.match(movies, /KHytYLBb_Zk/);
});
