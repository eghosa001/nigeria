import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { canDisplayEntertainmentArtwork, entertainmentTitles } from "../lib/entertainment";
import { canDisplayClientEntertainmentArtwork } from "../lib/entertainment-client-artwork";
import { documentedMovieCast, leadMovieCast } from "../lib/movie-cast-credits";

const src = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("interactive movie tiles load no runtime module from the large editorial catalogue", () => {
  const artwork = src("components/entertainment-artwork.tsx");
  const catalog = src("components/entertainment-catalog.tsx");
  assert.match(catalog, /import type \{ EntertainmentPlatform \} from "@\/lib\/entertainment"/);
  assert.doesNotMatch(catalog, /import \{ getFeaturedCast.*from "@\/lib\/entertainment"/);
  assert.match(catalog, /import \{ leadMovieCast \} from "@\/lib\/movie-cast-credits"/);
  assert.match(artwork, /import type \{ EntertainmentTitle \} from "@\/lib\/entertainment"/);
  assert.match(artwork, /from "@\/lib\/entertainment-client-artwork"/);
  assert.doesNotMatch(artwork, /import \{ canDisplayEntertainmentArtwork \} from "@\/lib\/entertainment"/);
  assert.match(catalog, /<strong>Cast:<\/strong>/);
});

test("small browser rights check exactly matches source-side media permissions", () => {
  for (const movie of entertainmentTitles) {
    assert.equal(canDisplayClientEntertainmentArtwork(movie), canDisplayEntertainmentArtwork(movie), movie.slug);
  }
  const movie = entertainmentTitles[0];
  const approved = {
    ...movie,
    artwork: {
      status: "approved" as const, url: "https://example.org/art.jpg",
      sourceUrl: "https://example.org/rights", credit: "Press", licenseNote: "Permitted",
      lastChecked: "2026-10-19", usageBasis: "direct-permission" as const,
    },
  };
  assert.equal(canDisplayClientEntertainmentArtwork(approved), true);
  assert.equal(canDisplayClientEntertainmentArtwork({ ...approved, artwork: { ...approved.artwork, licenseNote: "" } }), false);
  assert.equal(canDisplayClientEntertainmentArtwork({ ...approved, artwork: { ...approved.artwork, status: "pending" as never } }), false);
});

test("movie previews display no invented actors, and choose existing verified names", () => {
  for (const movie of entertainmentTitles) {
    const known = documentedMovieCast(movie);
    const featured = leadMovieCast(movie);
    assert.ok(featured.every(name => known.includes(name)), movie.slug);
    assert.ok(featured.length <= 3);
  }
  assert.deepEqual(leadMovieCast({ cast: [], featuredCast: [] }), []);
});
