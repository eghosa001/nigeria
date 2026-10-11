import assert from "node:assert/strict";
import { test } from "node:test";
import { searchGlobalCatalog } from "@/lib/global-search";

test("global search does not show unrelated open job listings", async () => {
  const results = await searchGlobalCatalog("qzxvnomatchingjobkeyword9081");
  assert.equal(results.jobResults.length, 0);
  assert.equal(results.totalShown, 0);
});
