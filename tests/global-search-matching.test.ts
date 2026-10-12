import assert from "node:assert/strict";
import { test } from "node:test";
import { searchGlobalCatalog, selectTopMatches } from "@/lib/global-search";
import { movieSearchCore } from "@/lib/movie-search-intent";
import { queryEntertainmentDirectory } from "@/lib/entertainment-query";

test("global search does not show unrelated open job listings", async () => {
  const results = await searchGlobalCatalog("qzxvnomatchingjobkeyword9081");
  assert.equal(results.jobResults.length, 0);
  assert.equal(results.totalShown, 0);
});

test("bounded YouTube search preview preserves scores, ties and top limit", () => {
  const entries = [
    { id: "z", score: 2 }, { id: "c", score: 5 },
    { id: "b", score: 5 }, { id: "skip", score: 0 },
    { id: "a", score: 5 }, { id: "d", score: 1 },
  ];
  const scored = (item: (typeof entries)[number]) => item.score;
  const tie = (a: (typeof entries)[number], b: (typeof entries)[number]) => a.id.localeCompare(b.id);
  assert.deepEqual(selectTopMatches(entries, scored, tie, 3).map((item) => item.id), ["a", "b", "c"]);
  assert.deepEqual(selectTopMatches(entries, scored, tie, 0), []);
});

test("Search Console film intents keep the actual title", () => {
  assert.equal(movieSearchCore("Oversabi Aunty cast"), "Oversabi Aunty");
  assert.equal(movieSearchCore("Oversabi Aunty Nigerian movie"), "Oversabi Aunty");
  assert.equal(movieSearchCore("Oversabi Aunty where to watch"), "Oversabi Aunty");
  assert.equal(movieSearchCore("Once Upon a Village full cast"), "Once Upon a Village");
  assert.equal(movieSearchCore("Where to watch Oversabi Aunty"), "Oversabi Aunty");
  assert.equal(movieSearchCore("Cast Away"), "Cast Away");
  assert.equal(movieSearchCore("cast"), "cast");
  assert.equal(movieSearchCore("where to watch"), "where to watch");
  assert.equal(movieSearchCore("cast of Oversabi Aunty"), "Oversabi Aunty");
  assert.equal(movieSearchCore("cast of sibe the movie"), "sibe");
  assert.equal(movieSearchCore("Sibe Nigerian movie cast"), "Sibe");
  assert.equal(movieSearchCore("Cast of"), "Cast of");
});

test("high-impression cast query finds the existing movie instead of a false empty result", async () => {
  const global = await searchGlobalCatalog("Oversabi Aunty cast");
  assert.ok(global.movieResults.some((movie) => movie.slug === "oversabi-aunty"));
  const directory = queryEntertainmentDirectory({ q: "Oversabi Aunty where to watch" });
  assert.ok(directory.items.some((movie) => movie.slug === "oversabi-aunty"));
  assert.ok((await searchGlobalCatalog("cast of Sibe")).movieResults.some((movie) => movie.slug === "sibe"));
  assert.ok(queryEntertainmentDirectory({ q: "Sibe the movie cast" }).items.some((movie) => movie.slug === "sibe"));
});

test("bounded previews preserve full-sort ranking and stable ties across growing catalogs", () => {
  const ranked = Array.from({ length: 560 }, (_, index) => ({
    title: ["B", "A", "C"][index % 3] + index,
    year: 2020 + (index % 7),
    score: index % 9 === 0 ? 0 : (index % 13) + 1,
  }));
  const score = (item: (typeof ranked)[number]) => item.score;
  const nameTie = (a: (typeof ranked)[number], b: (typeof ranked)[number]) => a.title.localeCompare(b.title);
  const yearTie = (a: (typeof ranked)[number], b: (typeof ranked)[number]) => b.year - a.year;
  for (const [tie, limit] of [[nameTie, 16], [yearTie, 8]] as const) {
    const expected = ranked.map((item) => ({ item, score: score(item) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || tie(a.item, b.item))
      .slice(0, limit).map(({ item }) => item);
    assert.deepEqual(selectTopMatches(ranked, score, tie, limit), expected);
  }
  assert.deepEqual(selectTopMatches(ranked, score, nameTie, 0), []);
});

test("scaled global search still finds existing canonical records across four pillars", async () => {
  const results = await searchGlobalCatalog("Nigeria");
  assert.ok(results.totalShown <= 90, "Search previews must remain bounded");
  assert.ok(results.serviceResults.length <= 16);
  assert.ok(results.jobResults.length <= 8);
  assert.ok(results.exploreResults.length <= 8);
  assert.ok(results.movieResults.length <= 8);
});
