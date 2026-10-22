import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { entertainmentTitles } from "../lib/entertainment";
import { queryEntertainmentDirectory, ENTERTAINMENT_DIRECTORY_PAGE_SIZE } from "../lib/entertainment-query";
import { toMovieDirectoryCard } from "../lib/movie-directory-card";
import { canDisplayClientEntertainmentArtwork } from "../lib/entertainment-client-artwork";
import { getSourceLinkedFilmPreview, getVerifiedYouTubePreview } from "../lib/movie-media-previews";
import { leadMovieCast } from "../lib/movie-cast-credits";

const source = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("movies directory keeps the exact default ranking and visible fields without sending full citations", () => {
  const result = queryEntertainmentDirectory();
  const original = [...entertainmentTitles].sort((a, b) =>
    b.year - a.year || a.title.localeCompare(b.title)
  ).slice(0, ENTERTAINMENT_DIRECTORY_PAGE_SIZE);
  assert.deepEqual(result.items.map((item) => item.slug), original.map((item) => item.slug));
  assert.equal(result.total, entertainmentTitles.length);
  for (const [index, item] of result.items.entries()) {
    const movie = original[index];
    for (const key of ["slug", "title", "year", "genres", "languages", "synopsis", "cast", "featuredCast", "runtimeMinutes", "artwork", "sourcePreview", "trailer"] as const) {
      assert.deepEqual(item[key], movie[key], movie.slug + ": " + key);
    }
    assert.equal(Object.hasOwn(item, "references"), false, "no verbose source citations in browser");
    assert.equal(Object.hasOwn(item, "directors"), false, "no unused credits in directory payload");
    assert.equal(Object.hasOwn(item, "subjects"), false, "no documentary subjects in directory payload");
    assert.equal(Object.hasOwn(item, "format"), false, "no unused format in directory payload");
    assert.deepEqual(item.watchLinks.map(({ platform }) => platform), movie.watchLinks.map(({ platform }) => platform));
    for (const link of item.watchLinks) {
      assert.equal(Object.hasOwn(link, "note"), false);
      assert.equal(Object.hasOwn(link, "publisherUrl"), false);
      assert.equal(Object.hasOwn(link, "label"), false);
    }
    assert.deepEqual(leadMovieCast(item), leadMovieCast(movie));
    assert.equal(canDisplayClientEntertainmentArtwork(item), canDisplayClientEntertainmentArtwork(movie));
    assert.deepEqual(getVerifiedYouTubePreview(item), getVerifiedYouTubePreview(movie));
    assert.deepEqual(getSourceLinkedFilmPreview(item), getSourceLinkedFilmPreview(movie));
  }
  const originalBytes = Buffer.byteLength(JSON.stringify(original));
  const compactBytes = Buffer.byteLength(JSON.stringify(result.items));
  assert.ok(compactBytes < originalBytes,
    "browser RSC payload should be smaller than full editorial movie records");
  console.info("[movie-directory-payload] default 30-card JSON:", originalBytes,
    "bytes original vs", compactBytes, "bytes compact; reduction",
    ((1 - compactBytes / originalBytes) * 100).toFixed(1) + "%");
});

test("movie searching and platform filters still run against the full server catalogue", () => {
  const queries = [
    { q: "love" },
    { q: "drama" },
    { platform: "YouTube" as const },
    { sort: "oldest" as const },
    { sort: "az" as const },
    { page: 2 },
  ];
  for (const query of queries) {
    const result = queryEntertainmentDirectory(query);
    assert.ok(result.items.length > 0, JSON.stringify(query));
    assert.ok(result.total >= result.items.length);
    for (const item of result.items) {
      const original = entertainmentTitles.find((title) => title.slug === item.slug);
      assert.ok(original);
      assert.deepEqual(item, toMovieDirectoryCard(original));
      assert.ok(!Object.hasOwn(item, "references"));
    }
  }
});

test("movie detail pages keep the original verified sources and rights rules", () => {
  const query = source("lib/entertainment-query.ts");
  const pagination = source("lib/entertainment-pagination.ts");
  const details = source("app/entertainment/movies/[slug]/page.tsx");
  assert.ok(query.includes("items: rows.slice(start, start + pageSize).map(toMovieDirectoryCard)"));
  assert.ok(pagination.includes('import { entertainmentTitles } from "@/lib/entertainment"'));
  assert.ok(details.includes('from "@/lib/entertainment"'), "film detail must retain the full source catalogue");
  const projection = source("lib/movie-directory-card.ts");
  assert.ok(!projection.includes("references: title.references"));
  assert.ok(!projection.includes("note: link.note"));
  assert.ok(!projection.includes("publisherUrl: link.publisherUrl"));
});
