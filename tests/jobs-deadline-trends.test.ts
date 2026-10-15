import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getEffectiveJobStatus, getEffectiveStatusLabel, getClosingSoonJobs, isEffectivelyOpen, pickDistinctEmployerPreview, todayIsoNigeria } from "../lib/job-runtime";
import { getCurrentHomeSocialTrends } from "../data/home-social-trends";
import { careerGuides } from "../lib/career-guides";
import { isIndexableJobOpportunity, jobOpportunities } from "../lib/jobs";
import type { CareerOpportunity } from "../lib/jobs";

const source = (file: string) => readFileSync(new URL("../" + file, import.meta.url), "utf8");
const sample = { slug: "october-deadline", kind: "vacancy", status: "open", statusLabel: "Applications open", verifiedAt: "2026-10-08", deadline: "2026-10-08" } as CareerOpportunity;

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

test("a one-off role with no deadline is automatically unverified after 14 days without a fresh official source check", () => {
  const vacancy = { ...sample, slug: "rolling-open-vacancy", deadline: undefined, verifiedAt: "2026-10-01" };
  assert.equal(getEffectiveJobStatus(vacancy, "2026-10-15"), "open");
  assert.equal(getEffectiveJobStatus(vacancy, "2026-10-16"), "unverified");
  assert.equal(isEffectivelyOpen(vacancy, "2026-10-16"), false);
  assert.match(getEffectiveStatusLabel(vacancy, "2026-10-16"), /not reverified/i);
  assert.equal(getEffectiveJobStatus({ ...vacancy, verifiedAt: "" }, "2026-10-15"), "unverified");
  assert.equal(getEffectiveJobStatus({ ...vacancy, verifiedAt: "2026-11-01" }, "2026-10-15"), "unverified");
  assert.equal(getEffectiveJobStatus({ ...vacancy, verifiedAt: "2026-10-14" }, "2026-10-15"), "open");
  assert.equal(getEffectiveJobStatus({ ...vacancy, status: "closed" }, "2026-10-16"), "closed");
  assert.equal(getEffectiveJobStatus({ ...vacancy, kind: "programme" }, "2026-10-16"), "open");
});

test("stale individual vacancies lose index eligibility when the current Nigerian day advances", () => {
  const old = { ...sample, slug: "stale-rolling-job", deadline: undefined, verifiedAt: "2020-01-01" };
  assert.equal(isIndexableJobOpportunity(old), false);
  assert.equal(isIndexableJobOpportunity({ ...old, status: "unverified" }), false);
  assert.equal(isIndexableJobOpportunity({ ...old, status: "closed" }), false);
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
  assert.equal(getCurrentHomeSocialTrends("2026-10-10").find((item) => item.pillar === "Jobs & Careers")?.href, "/jobs/afdb-2027-internship-session-one");
  assert.equal(getCurrentHomeSocialTrends("2026-10-12").find((item) => item.pillar === "Jobs & Careers")?.href, "/jobs/afdb-2027-internship-session-one");
  assert.equal(getCurrentHomeSocialTrends("2026-10-13").find((item) => item.pillar === "Jobs & Careers")?.href, "/jobs/nova-bank-graduate-trainee-2026");
  assert.equal(getCurrentHomeSocialTrends("2026-10-15").find((item) => item.pillar === "Jobs & Careers")?.href, "/jobs/nova-bank-graduate-trainee-2026");
  assert.equal(getCurrentHomeSocialTrends("2026-10-16").find((item) => item.pillar === "Jobs & Careers")?.href, "/jobs/ebid-young-professionals-2026");
  assert.equal(getCurrentHomeSocialTrends("2026-10-30").find((item) => item.pillar === "Jobs & Careers")?.href, "/jobs/ebid-young-professionals-2026");
  assert.equal(getCurrentHomeSocialTrends("2026-10-31").some((item) => item.pillar === "Jobs & Careers"), false);
  assert.equal(getCurrentHomeSocialTrends("2026-10-10").find((item) => item.pillar === "Tour Nigeria")?.href, "/explore/felabration-2026");
  assert.equal(getCurrentHomeSocialTrends("2026-10-13").find((item) => item.pillar === "Tour Nigeria")?.href, "/explore/ofala-onitsha-2026");
  assert.equal(getCurrentHomeSocialTrends("2026-10-17").find((item) => item.pillar === "Tour Nigeria")?.href, "/explore/ofala-onitsha-2026");
  assert.equal(getCurrentHomeSocialTrends("2026-10-18").find((item) => item.pillar === "Tour Nigeria")?.href, "/explore/ecowas-food-cultural-festival-benin-2026");
  assert.equal(getCurrentHomeSocialTrends("2026-10-31").find((item) => item.pillar === "Tour Nigeria")?.href, "/explore/ecowas-food-cultural-festival-benin-2026");
  assert.equal(getCurrentHomeSocialTrends("2026-11-01").find((item) => item.pillar === "Tour Nigeria")?.href, "/explore/benin-royal-coronation-anniversary-2026");
  assert.equal(getCurrentHomeSocialTrends("2026-11-21").find((item) => item.pillar === "Tour Nigeria")?.href, "/explore/benin-royal-coronation-anniversary-2026");
  assert.equal(getCurrentHomeSocialTrends("2026-11-22").some((item) => item.pillar === "Tour Nigeria"), false);
});

test("challenge reuses one canonical verified guide, not a fabricated job vacancy", () => {
  const guide = careerGuides.filter((item) => item.slug === "national-ai-innovation-challenge-2026");
  assert.equal(guide.length, 1);
  assert.equal(guide[0].deadline, "2026-10-12");
  assert.ok(guide[0].sources.every((source) => source.url.startsWith("https://") && source.lastChecked === "2026-10-09"));
  assert.ok(guide[0].sections.length >= 6);
  assert.match(guide[0].answer, /working.*N-ATLAS/i);
});

test("compact Jobs preview keeps one opportunity per employer", () => {
  const opportunities = [
    { organization: "Kaduna PHCB", slug: "role-a" },
    { organization: " kaduna  phcb ", slug: "role-b" },
    { organization: "FirstBank", slug: "role-c" },
    { organization: "Moniepoint", slug: "role-d" },
  ];
  assert.deepEqual(pickDistinctEmployerPreview(opportunities, 3).map((item) => item.slug), ["role-a", "role-c", "role-d"]);
});
