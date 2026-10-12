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
  tags_json: '["mountains","highlands","viewpoints"]',
  map_query: "Mambilla Plateau Gembu Nigeria",
  cost_note: "Arrange local access in advance",
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
  assert.deepEqual(result.places[0].tags, ["mountains", "highlands", "viewpoints"]);
  assert.equal(result.places[0].mapQuery, "Mambilla Plateau Gembu Nigeria");
  assert.equal(result.places[0].costNote, "Arrange local access in advance");
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

test("shared guide membership is indexed without duplicating source records", async () => {
  const plan = tourPlaceQueryPlan({ guideSlug: "north-highlands-guide", pageSize: 10 });
  assert.match(plan.countSql, /EXISTS \(/);
  assert.match(plan.countSql, /tour_place_guide_memberships/);
  assert.match(plan.pageSql, /LEFT JOIN tour_place_display/);
  assert.match(plan.pageSql, /gm\.position/);
  assert.deepEqual(plan.params, ["north-highlands-guide", "north-highlands-guide"]);
  assert.deepEqual(plan.pageParams, ["north-highlands-guide", ...plan.params]);
  const { db, calls } = dbFor([published]);
  const result = await queryPublishedTourPlaces(db, { guideSlug: "north-highlands-guide" });
  assert.equal(result.places[0].slug, published.slug);
  assert.deepEqual(calls[1].params, ["north-highlands-guide", ...plan.params, 12, 0]);
});

test("published D1 records reject malformed or bloated continuity tags", async () => {
  for (const tags_json of ['invalid', '{"tags":[]}', '["valid",1]', JSON.stringify(Array(31).fill("repeat"))]) {
    await assert.rejects(
      () => queryPublishedTourPlaces(dbFor([{...published,tags_json}]).db),
      /Invalid Tour D1/,
    );
  }
});
