import assert from "node:assert/strict";
import { test } from "node:test";
import { searchGlobalCatalog, selectTopMatches } from "@/lib/global-search";

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
