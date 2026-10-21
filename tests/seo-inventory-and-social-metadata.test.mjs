import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { identifyPage, mapSeoInventory, recordsToCsv } from "../scripts/seo-inventory-utils.mjs";

test("sitemap inventory separates the four pillars without inventing keyword evidence", () => {
  assert.deepEqual(identifyPage("https://mynigeriaguide.com/jobs/example"), ["Jobs & Careers", "jobs/career detail"]);
  assert.deepEqual(identifyPage("https://mynigeriaguide.com/services/example"), ["Services Guide", "service guide"]);
  assert.deepEqual(identifyPage("https://mynigeriaguide.com/explore/example"), ["Tour Nigeria", "travel detail"]);
  assert.deepEqual(identifyPage("https://mynigeriaguide.com/entertainment/movies/example"), ["Movies & Entertainment", "movie detail"]);
  const pages = [
    { url: "https://mynigeriaguide.com/services/one", status: 200, indexable: true, title: "Guide One", description: 'Steps for "One"', canonical: "https://mynigeriaguide.com/services/one", issues: [], schema: { types: ["WebPage"] } },
    { url: "https://mynigeriaguide.com/services/two", status: 200, indexable: true, title: "Guide One", description: "Second guide", issues: [] },
  ];
  const records = mapSeoInventory(pages, { duplicateTitles: [{ text: "guide one", urls: pages.map((p) => p.url) }] }, "2026-10-21T00:00:00Z");
  assert.equal(records.length, 2);
  assert.equal(records[0].primary_keyword, "");
  assert.equal(records[0].new_title, "");
  assert.equal(records[0].validation_status, "review required");
  assert.match(records[0].reason_for_modification, /duplicate-title/);
  const csv = recordsToCsv(records);
  assert.match(csv, /"Steps for ""One"""/);
  assert.equal(csv.trim().split("\n").length, 3);
});

test("clean metadata is preserved and Google indexing is never inferred from sitemap eligibility", () => {
  const page = {
    url: "https://mynigeriaguide.com/explore/benin-city",
    status: 200, indexable: true, title: "Benin City: Places to Visit",
    description: "Benin City visitor guide", issues: [], schema: { types: ["TouristDestination"] }
  };
  const row = mapSeoInventory([page], {}, "2026-10-21")[0];
  assert.equal(row.new_title, row.previous_title);
  assert.equal(row.new_description, row.previous_description);
  assert.match(row.indexing_eligibility, /indexing unverified/);
  assert.equal(row.deployment_status, "unchanged (snapshot)");
});

test("jobs expose route-specific OG and X tags; empty travel-place inventories do not claim a count", () => {
  const jobs = readFileSync("app/jobs/[slug]/page.tsx", "utf8");
  const explore = readFileSync("app/explore/[slug]/page.tsx", "utf8");
  const crawler = readFileSync("scripts/audit-all-sitemap-urls.mjs", "utf8");
  assert.match(jobs, /openGraph:\s*\{/);
  assert.match(jobs, /title: seoTitle,\s*description: seoDescription/);
  assert.match(jobs, /twitter:\s*\{/);
  assert.match(explore, /guide\.kind === "city" && cityPlaces\.length > 0/);
  assert.match(crawler, /metadata-inventory\.csv/);
});

test("linked off-sitemap noindex pages remain distinguishable from missing canonical candidates", () => {
  const linkedPages = [
    {
      url: "https://mynigeriaguide.com/agencies/aedc", status: 200, indexable: false,
      title: "AEDC services", description: "Summary of AEDC services",
      canonical: "https://mynigeriaguide.com/agencies/aedc", issues: [],
    },
    {
      url: "https://mynigeriaguide.com/entertainment/special-film", status: 200, indexable: true,
      title: "Special Film", description: "An original movie guide",
      canonical: "https://mynigeriaguide.com/entertainment/special-film",
      issues: [{ code: "indexable-url-absent-from-sitemap", severity: "medium" }],
    },
  ];
  const rows = mapSeoInventory(linkedPages, {}, "2026-10-21", "internal-link");
  assert.match(rows[0].indexing_eligibility, /off sitemap; noindex/);
  assert.match(rows[1].indexing_eligibility, /off sitemap; indexing unverified/);
  assert.doesNotMatch(rows[0].indexing_eligibility, /in sitemap/);
  assert.equal(rows[1].new_title, "Special Film");
});

test("the crawler exports distinct linked-route evidence and retains the sitemap-only QA baseline", () => {
  const source = readFileSync("scripts/audit-all-sitemap-urls.mjs", "utf8");
  assert.match(source, /linked-page-inventory\.csv/);
  assert.match(source, /linked-pages\.json/);
  assert.match(source, /indexable-url-absent-from-sitemap/);
  assert.match(source, /issue\.code !== "sitemap-noindex"/);
  assert.match(source, /metadata-inventory\.csv/);
});

test("linked discovery audits HTML pages without misclassifying XML resources", () => {
  const source = readFileSync("scripts/audit-all-sitemap-urls.mjs", "utf8");
  const predicateLine = source.split("\n").find((line) => line.includes("const htmlDestination ="));
  assert.ok(predicateLine);
  const isHtml = new Function("URL", predicateLine + "\nreturn htmlDestination;")(URL);
  assert.equal(isHtml("https://mynigeriaguide.com/agencies/aedc"), true);
  assert.equal(isHtml("https://mynigeriaguide.com/updates.xml"), false);
  assert.equal(isHtml("https://mynigeriaguide.com/site-icon.png"), false);
});
