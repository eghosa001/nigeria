import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getEffectiveJobStatus, getEffectiveStatusLabel, getClosingSoonJobs, isEffectivelyOpen, todayIsoNigeria } from "../lib/job-runtime";
import { getCurrentHomeSocialTrends } from "../data/home-social-trends";
import { careerGuides } from "../lib/career-guides";
import { jobOpportunities } from "../lib/jobs";
import type { CareerOpportunity } from "../lib/jobs";

const source = (file: string) => readFileSync(new URL("../" + file, import.meta.url), "utf8");
const sample = { slug: "october-deadline", status: "open", statusLabel: "Applications open", deadline: "2026-10-08" } as CareerOpportunity;

test("Nigeria midnight changes expired openings without requiring a redeploy", () => {
  assert.equal(todayIsoNigeria(new Date("2026-10-08T22:59:59Z")), "2026-10-08");
  assert.equal(todayIsoNigeria(new Date("2026-10-08T23:00:00Z")), "2026-10-09");
  assert.equal(getEffectiveJobStatus(sample, "2026-10-08"), "open");
  assert.equal(getEffectiveJobStatus(sample, "2026-10-09"), "closed");
  assert.equal(isEffectivelyOpen(sample, "2026-10-09"), false);
  assert.match(getEffectiveStatusLabel(sample, "2026-10-09"), /deadline passed/i);
  assert.deepEqual(getClosingSoonJobs([sample], 7, "2026-10-09"), []);
  assert.equal(jobOpportunities.filter((item) => isEffectivelyOpen(item) && item.deadline && item.deadline < todayIsoNigeria()).length, 0);
});

test("all directly time-sensitive entry routes are request-rendered", () => {
  for (const path of ["app/page.tsx","app/jobs/page.tsx","app/jobs/open-now/page.tsx","app/jobs/deadlines/page.tsx","app/jobs/closing-this-week/page.tsx","app/jobs/[slug]/page.tsx","app/jobs/guides/[slug]/page.tsx","app/jobs/categories/[slug]/page.tsx","app/jobs/locations/[slug]/page.tsx","app/jobs/professions/[slug]/page.tsx","app/jobs/employers/[slug]/page.tsx","app/jobs/new-this-week/page.tsx","app/jobs/private/page.tsx","app/jobs/government/page.tsx","app/jobs/remote/page.tsx"]) {
    assert.match(source(path), /export const dynamic = "force-dynamic";/, path);
  }
  assert.match(source("app/api/jobs/route.ts"), /"Cache-Control": "no-store"/);
});

test("homepage keeps all pillars distinct and rotates temporary deadline trends", () => {
  const today = getCurrentHomeSocialTrends("2026-10-09");
  const jobs = today.filter((item) => item.pillar === "Jobs & Careers");
  assert.equal(jobs.length, 1);
  assert.equal(jobs[0]?.href, "/jobs/deloitte-nigeria-early-careers");
  assert.equal(new Set(today.map((item) => item.href)).size, today.length);
  assert.equal(new Set(today.map((item) => item.pillar)).size, today.length);
  assert.equal(getCurrentHomeSocialTrends("2026-10-10").find((item) => item.pillar === "Jobs & Careers")?.href, "/jobs/guides/national-ai-innovation-challenge-2026");
  assert.equal(getCurrentHomeSocialTrends("2026-10-13").find((item) => item.pillar === "Jobs & Careers")?.href, "/jobs/zenith-bank-zecathon-6-hackathon-2026");
  assert.equal(getCurrentHomeSocialTrends("2026-10-14").some((item) => item.pillar === "Jobs & Careers"), false);
});

test("challenge reuses one canonical verified guide, not a fabricated job vacancy", () => {
  const guide = careerGuides.filter((item) => item.slug === "national-ai-innovation-challenge-2026");
  assert.equal(guide.length, 1);
  assert.equal(guide[0].deadline, "2026-10-12");
  assert.ok(guide[0].sources.every((source) => source.url.startsWith("https://") && source.lastChecked === "2026-10-09"));
  assert.ok(guide[0].sections.length >= 6);
  assert.match(guide[0].answer, /working.*N-ATLAS/i);
});
