import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { GET } from "../app/api/explore/places/route";
import { publicExplorePlaceDirectory } from "../lib/explore-directory-payload";
import { exploreGuides } from "../lib/explore";

const read = (file: string) => readFileSync(new URL("../" + file, import.meta.url), "utf8");

test("on-demand API preserves all public places and source-private fields stay server-side", async () => {
  const response = GET();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("cache-control") ?? "", /s-maxage=300/);
  assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/);
  const body = (await response.json()) as { places: typeof publicExplorePlaceDirectory };
  assert.equal(body.places.length, publicExplorePlaceDirectory.length);
  assert.ok(body.places.length > 8, "the complete catalogue must stay available on demand");
  const restaurant = body.places.find((place) => place.name.includes("BluCabana"));
  assert.ok(restaurant, "existing deep-search records must remain reachable");
  assert.match(restaurant.address, /Shehu Yar'Adua/i);
  for (const place of body.places) {
    assert.deepEqual(
      Object.keys(place).filter((field) => !["slug", "guideSlug", "name", "kind", "area", "address", "summary", "cost", "mapQuery", "tags"].includes(field)),
      [],
      place.slug + ": no private editorial/source fields in public JSON",
    );
  }
});

test("initial Tour HTML hydrates just eight ranked places and an eight-destination JSON-LD shelf", () => {
  const guidePriority = new Map(exploreGuides.map((guide) => [guide.slug, guide.kind]));
  const priority = { destination: 0, city: 1, itinerary: 2, event: 3 } as const;
  const initial = [...publicExplorePlaceDirectory].sort((a, b) =>
    priority[guidePriority.get(a.guideSlug) ?? "event"] -
    priority[guidePriority.get(b.guideSlug) ?? "event"]).slice(0, 8);
  assert.equal(initial.length, 8);
  assert.ok(initial.every((place) => guidePriority.get(place.guideSlug) === "destination"),
    "default shelf should prioritize destination places as before");
  const page = read("app/explore/page.tsx");
  assert.match(page, /initialDirectoryPlaces = \[\.\.\.publicExplorePlaceDirectory\]/);
  assert.match(page, /\.slice\(0, 8\)/);
  assert.match(page, /places=\{initialDirectoryPlaces\}/);
  assert.match(page, /totalCount=\{publicExplorePlaceDirectory.length\}/);
  assert.match(page, /itemListElement: featuredDestinations\.map/);
  assert.doesNotMatch(page, /places=\{explorePlaces\.map/);
  assert.doesNotMatch(page, /itemListElement: exploreGuides\.map/);
});

test("mobile Show more and searching load catalogue only after interaction", () => {
  const client = read("components/explore-place-directory.tsx");
  assert.match(client, /const needsCatalogue = Boolean\(query\.trim\(\) \|\|/);
  assert.match(client, /fetch\("\/api\/explore\/places", \{ signal: controller\.signal \}\)/);
  assert.match(client, /if \(!needsCatalogue \|\| allPlaces\) return/);
  assert.match(client, /const showingPreview = !allPlaces/);
  assert.match(client, /disabled=\{needsCatalogue && allPlaces === null\}/);
  assert.match(client, /Try loading places again/);
  assert.match(client, /Google Maps ↗/);
  assert.match(client, /Same destination/);
});
