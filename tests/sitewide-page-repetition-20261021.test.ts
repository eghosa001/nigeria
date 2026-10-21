import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { leadAlreadyStatesFee, uniqueIntroParagraphs } from "../lib/reader-content-dedup";
import { auditPublicCatalogues, findDuplicatePassages } from "../scripts/audit-reader-repetition";

const read = (path: string) => readFileSync(path, "utf8");

test("a fee already explained by the opening paragraph is not printed in another card", () => {
  assert.equal(leadAlreadyStatesFee(
    "NIS lists ₦100,000 for 32 pages and ₦200,000 for 64 pages.",
    "Inside Nigeria: ₦100,000 (32 pages) or ₦200,000 (64 pages)"
  ), true);
  assert.equal(leadAlreadyStatesFee("This process is free and requires a visit.", "FREE"), true);
  assert.equal(leadAlreadyStatesFee("The ₦100,000 fee applies.", "₦100,000 and ₦200,000"), false);
  assert.equal(leadAlreadyStatesFee("Do not confuse a ₦30,000 correction with a renewal.",
    "₦100,000 renewal"), false);
  assert.equal(leadAlreadyStatesFee("Applicants should check prices.", "Prices vary by category"), false);
});

test("destination introductions suppress only identical or nearly identical paragraphs", () => {
  const summary = "You can visit this historic attraction from central Lagos after confirming access.";
  const detail = "You can visit this historic attraction from central Lagos after confirming access!";
  const distinct = "The operator should confirm gate hours because access may be restricted for local events.";
  assert.deepEqual(uniqueIntroParagraphs(summary, [detail, distinct, distinct]), [distinct]);
  assert.deepEqual(uniqueIntroParagraphs(summary, ["Access is available at some times; but ask the operator first."]), [
    "Access is available at some times; but ask the operator first.",
  ]);
});

test("source repetition scan groups duplicates on the same page, not across different pages", () => {
  const same = "This paragraph explains the verified application process and related required documents in detail.";
  const rows = [
    { pillar: "Services", url: "/services/one", recordKind: "service", text: same },
    { pillar: "Services", url: "/services/one", recordKind: "service", text: same },
    { pillar: "Services", url: "/services/two", recordKind: "service", text: same },
  ];
  assert.equal(findDuplicatePassages(rows).length, 1);
  assert.equal(findDuplicatePassages(rows)[0].url, "/services/one");
});

test("shared service template shows steps first, without a duplicate fee-status strip", () => {
  const page = read("app/services/[slug]/page.tsx");
  assert.ok(!page.includes("<ServiceStatusStrip"));
  assert.ok(page.includes("leadAlreadyStatesFee(service.summary, service.feeLabel)"));
  assert.ok(page.indexOf("<ServiceSteps service={service} />") < page.indexOf("<ServiceRequirements service={service} />"));
  assert.ok(page.indexOf("<ServiceRequirements service={service} />") < page.indexOf("<ServiceJourney service={service} />"));
  assert.ok(page.includes("<ServiceAftercare service={service} />"));
  assert.ok(page.includes("<ServiceScenarios service={service} />"));
  assert.ok(page.includes("<section id=\"official-sources\">"));
  assert.ok(page.includes("service.feeNote"));
  assert.ok(page.includes("service.notes.map"));
});

test("all-pillar templates keep unique evidence while avoiding observed duplicate introduction sections", () => {
  const tour = read("app/explore/[slug]/page.tsx");
  const jobs = read("app/jobs/[slug]/page.tsx");
  const nav = read("components/guide-quick-nav.tsx");
  assert.ok(tour.includes("uniqueIntroParagraphs(guide.summary, guide.intro)"));
  assert.ok(!jobs.includes('<div><small>Organisation</small><strong>{item.organization}</strong></div>'));
  assert.ok(nav.includes('disclosure.open = true'));
  assert.ok(nav.includes('["steps", "Steps"]'));
});

test("inventory all four content pillars and report remaining exact content repeats", () => {
  const report = auditPublicCatalogues();
  const expected = ["Services", "Tour Nigeria", "Movies & Entertainment", "Jobs & Careers"];
  for (const pillar of expected) assert.ok(report.byPillar.some((row) => row.pillar === pillar && row.urls > 0), pillar);
  assert.ok(report.uniqueCataloguedRoutes > 100);
  console.log("REPETITION_SITEWIDE_INVENTORY " + JSON.stringify({
    routes: report.uniqueCataloguedRoutes, sourceRecords: report.sourceRecordsInspected,
    exactRepeatFindings: report.exactRepeatFindings, byPillar: report.byPillar,
    topFindings: report.duplicates.slice(0, 8),
  }));
});
