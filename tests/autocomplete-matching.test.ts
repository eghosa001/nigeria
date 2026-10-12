import test from "node:test";
import assert from "node:assert/strict";
import { matchCuratedSuggestions } from "@/lib/autocomplete-matching";

const routes = [
  { label: "Sibe 2026 movie cast", aliases: "cast of sibe the movie bimbo ademoye", pillar: "Movies", href: "/entertainment/movies/sibe" },
  { label: "Nigerian passport renewal", aliases: "how to renew nigerian passport online", pillar: "Services", href: "/services/passport-renewal" },
  { label: "Mambilla Plateau and Gembu", aliases: "mambilla plateau taraba gembu tea estates", pillar: "Tour", href: "/explore/mambilla-plateau-guide" },
  { label: "Lagos State Civil Service careers", aliases: "lagos state civil service commission recruitment 2026", pillar: "Jobs", href: "/jobs/lagos-state-civil-service-careers" },
] as const;

test("natural-language autocomplete finds existing canonical routes across all four pillars", () => {
  const queries = [
    ["cast of Sibe the movie", "/entertainment/movies/sibe"],
    ["how to renew my Nigerian passport", "/services/passport-renewal"],
    ["mambilla plateau gembu", "/explore/mambilla-plateau-guide"],
    ["lagos state civil service commission recruitment 2026", "/jobs/lagos-state-civil-service-careers"],
  ] as const;
  for (const [query, expectedHref] of queries)
    assert.equal(matchCuratedSuggestions(routes, query)[0]?.href, expectedHref, query);
});

test("autocomplete bounds results, handles accents and keeps unrelated searches empty", () => {
  const accented = matchCuratedSuggestions(routes, "LÁGOS state civil service");
  assert.equal(accented[0]?.href, "/jobs/lagos-state-civil-service-careers");
  assert.deepEqual(matchCuratedSuggestions(routes, "zzzxxyynorecord"), []);
  assert.deepEqual(matchCuratedSuggestions(routes, ""), []);
  assert.equal(matchCuratedSuggestions(routes, "a").length, 0);
  assert.equal(matchCuratedSuggestions(routes, "movie", 0).length, 0);
  assert.ok(matchCuratedSuggestions(routes, "movie", 500).length <= 12);
});
