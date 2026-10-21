import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { publicServiceListings } from "../lib/data";
import { queryServiceDirectory } from "../lib/service-query";

test("public service directory omits internal search-index fields from page and API results", () => {
  const result = queryServiceDirectory({ page: 1, pageSize: 24 });
  assert.ok(result.items.length > 0);
  assert.ok(result.total >= result.items.length);
  for (const item of result.items) {
    assert.ok(item.slug && item.shortTitle && item.summary && item.agencySlug && item.category);
    assert.ok(!Object.hasOwn(item, "searchText"));
    assert.ok(!Object.hasOwn(item, "searchTerms"));
    const source = publicServiceListings.find((entry) => entry.slug === item.slug);
    assert.ok(source, "published service must still originate from the verified catalog");
    for (const key of ["slug", "title", "shortTitle", "summary", "category", "agencySlug", "feeLabel", "status", "lastVerified"]) {
      assert.deepEqual(item[key as keyof typeof item], source[key as keyof typeof source], "preserve display field " + key);
    }
  }
});

test("server-side full-text searches, filters and recommendations still return complete card fields", () => {
  const queries = [
    { q: "passport", pageSize: 12 },
    { q: "jamb", pageSize: 12 },
    { category: "Education", pageSize: 12 },
    { sort: "az" as const, pageSize: 12 },
    { sort: "recent" as const, pageSize: 12 },
    { page: 2, pageSize: 12 },
  ];
  for (const query of queries) {
    const result = queryServiceDirectory(query);
    assert.ok(result.items.length, JSON.stringify(query));
    for (const item of [...result.items, ...(result.recommendations ?? [])]) {
      assert.ok(!Object.hasOwn(item, "searchText"), "never send private search index");
      assert.ok(!Object.hasOwn(item, "searchTerms"), "never send internal search synonyms");
      assert.ok(item.slug && item.shortTitle && item.summary && item.agencySlug, "keep original display card");
    }
  }
});

test("the service directory constructs the response only after full-index matching", () => {
  const source = readFileSync(new URL("../lib/service-query.ts", import.meta.url), "utf8");
  assert.ok(source.includes("rows = searchServices(rows, q, rows.length)"));
  assert.ok(source.includes("items: rows.slice(start, start + pageSize).map(toDirectoryItem)"));
  assert.ok(source.includes("recommendations: recommendations.map(toDirectoryItem)"));
});
