import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const corpus = JSON.parse(readFileSync("docs/research/nigeria-keyword-opportunities-2026-10-20.json", "utf8"));
const form = readFileSync("components/global-search-form.tsx", "utf8");

test("research archive holds 1,894 unique keywords with honest provenance", () => {
  assert.equal(corpus.rows.length, 1894);
  assert.equal(new Set(corpus.rows.map((row) => row.q)).size, 1894);
  assert.equal(corpus.rows.filter((row) => row.evidence === "google_suggest").length, 198);
  assert.equal(corpus.rows.filter((row) => row.evidence === "editorial_hypothesis").length, 1696);
  assert.deepEqual(
    Object.fromEntries(["Services", "Tour Nigeria", "Jobs & Careers", "Movies & Entertainment"]
      .map((pillar) => [pillar, corpus.rows.filter((row) => row.pillar === pillar).length])),
    { Services: 621, "Tour Nigeria": 449, "Jobs & Careers": 410, "Movies & Entertainment": 414 },
  );
  assert.ok(corpus.rows.every((row) => row.source.startsWith("https://")));
  assert.match(corpus.statusPolicy, /Never automatically publish/);
});

test("evidenced search language points to existing guides rather than keyword landing pages", () => {
  const routes = [
    ["/services/check-nin-number", "how to retrieve nin number"],
    ["/topics/nin-corrections", "nimc self service portal login"],
    ["/services/nin-phone-modification", "nin phone number change"],
    ["/services/bvn-data-update", "bvn date of birth correction online"],
    ["/services/nigeria-landing-exit-card", "nigeria exit card when to apply"],
    ["/services/police-character-certificate", "nigerian police character certificate online application"],
    ["/services/nrs-tax-id-retrieval", "tax id retrieval portal nigeria"],
    ["/explore/things-to-do-lagos", "places to visit in lagos for free"],
    ["/explore/abeokuta", "olumo rock history"],
    ["/jobs/graduate", "graduate trainee programs nigeria"],
    ["/entertainment/platforms/netflix", "nollywood action movies on netflix"],
  ];
  for (const [href, phrase] of routes) {
    const lines = form.split("\n").filter((line) => line.includes('href: "' + href + '"'));
    assert.equal(lines.length, 1, "Expected one canonical suggestion: " + href);
    assert.ok(lines[0].includes(phrase), "Missing alias for " + href + ": " + phrase);
    assert.ok(corpus.rows.some((row) => row.q === phrase && row.evidence === "google_suggest"), "Unverified phrase: " + phrase);
  }
  assert.ok(!form.includes("docs/research/nigeria-keyword-opportunities"));
  assert.ok(!form.includes("Google Suggest\\n  //"), "No literal escaped newlines in source comments");
});
