import assert from "node:assert/strict";
import { test } from "node:test";
import { queryPublishedTourPlaces, safeTourFtsQuery, tourPlaceQueryPlan } from "../lib/tour-place-d1-repository";
import { createTourPlaceSearchStore } from "../lib/tour-place-search-store";

const published = {
  slug: "mambilla-lookout",
  guide_slug: "mambilla-plateau-guide",
  name: "Mambilla Highlands",
  kind: "nature",
  state_or_fct: "Taraba",
  city_or_area: "Gembu",
  address: "Gembu, Taraba State, Nigeria",
  summary: "Highland scenery and steep access roads.",
  cost_guidance: "Confirm access locally",
  hours: null,
  phone: null,
  website: null,
  source_url: "https://museum.ng/",
  source_name: "NCMM",
  checked_at: "2026-10-11",
  editorial_status: "published",
};

function dbFor(rows: object[], total = rows.length) {
  const calls: Array<{ sql: string; params: Array<string | number | null> }> = [];
  const db = {
    prepare(sql: string) {
      return {
        bind(...params: Array<string | number | null>) {
          calls.push({ sql, params });
          return {
            async first<T extends object>(): Promise<T | null> {
              return { total } as T;
            },
            async all<T extends object>(): Promise<{ results: T[] }> {
              return { results: rows as T[] };
            },
          };
        },
      };
    },
  };
  return { db, calls };
}

test("FTS tokens are length bound and operators cannot become MATCH syntax", () => {
  assert.equal(safeTourFtsQuery("Mambilla OR (Gembu)"), '"mambilla"* AND "or"* AND "gembu"*');
  assert.equal(safeTourFtsQuery('"; --'), "");
  assert.throws(() => safeTourFtsQuery("a".repeat(121)), /length/);
  const plan = tourPlaceQueryPlan({ q: "Mambilla", kind: "nature", guideSlug: "mambilla-plateau-guide" });
  assert.match(plan.countSql, /tour_place_search MATCH \?/);
  assert.match(plan.countSql, /p.editorial_status = 'published'/);
  assert.deepEqual(plan.params, ['"mambilla"*', "nature", "mambilla-plateau-guide"]);
  assert.throws(() => tourPlaceQueryPlan({ guideSlug: "../drafts" }), /slug/);
});

test("Tour D1 reader returns only published, source-backed bounded rows", async () => {
  const { db, calls } = dbFor([published]);
  const result = await queryPublishedTourPlaces(db, { q: "mambilla", pageSize: 12 });
  assert.equal(result.total, 1);
  assert.equal(result.places[0].guideSlug, "mambilla-plateau-guide");
  assert.equal(result.places[0].source.href, "https://museum.ng/");
  assert.equal(result.places[0].tags.length, 0);
  assert.match(calls[1].sql, /bm25\(tour_place_search\)/);
  assert.deepEqual(calls[1].params.slice(-2), [12, 0]);

  const store = createTourPlaceSearchStore({ mode: "d1", db });
  const resultStore = await store.search("mambilla");
  assert.equal(resultStore.mode, "d1");
  assert.equal(resultStore.places[0].slug, "mambilla-lookout");
});

test("Tour D1 fails closed for unpublished rows, unsafe sources and unbounded pages", async () => {
  for (const bad of [
    { ...published, editorial_status: "verified" },
    { ...published, editorial_status: "draft" },
    { ...published, source_url: "javascript:alert(1)" },
    { ...published, address: "" },
  ]) {
    await assert.rejects(() => queryPublishedTourPlaces(dbFor([bad]).db, { q: "Mambilla" }));
  }
  const oversized = dbFor([], 999999);
  await assert.rejects(() => queryPublishedTourPlaces(oversized.db, { pageSize: 999, page: 2000 }),
    /cursor/);
});
