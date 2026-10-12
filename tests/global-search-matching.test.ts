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
});

test("high-impression cast query finds the existing movie instead of a false empty result", async () => {
  const global = await searchGlobalCatalog("Oversabi Aunty cast");
  assert.ok(global.movieResults.some((movie) => movie.slug === "oversabi-aunty"));
  const directory = queryEntertainmentDirectory({ q: "Oversabi Aunty where to watch" });
  assert.ok(directory.items.some((movie) => movie.slug === "oversabi-aunty"));
});
