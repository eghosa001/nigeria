import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { documentedMovieCast, leadMovieCast } from "../lib/movie-cast-credits";
import { entertainmentTitles } from "../lib/entertainment";

const src = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("a featuring credit is part of cast, even with no character assignment", () => {
  const movie = { cast: ["Actor One", "Actor Two"], featuredCast: ["Actor Three", "Actor One"] };
  assert.deepEqual(documentedMovieCast(movie), ["Actor One", "Actor Two", "Actor Three"]);
  assert.deepEqual(leadMovieCast(movie), ["Actor Three", "Actor One", "Actor Two"]);
  assert.deepEqual(documentedMovieCast({ cast: [], featuredCast: ["Only Known Actor"] }), ["Only Known Actor"]);
  assert.deepEqual(documentedMovieCast({ cast: [], featuredCast: [] }), []);
});

test("alternate spelling does not create duplicate people", () => {
  const movie = {
    cast: ["Linda Ejiofor-Suleiman", "Lateef Adedimeji", "Omowunmi Dada"],
    featuredCast: ["Linda Ejiofor", "Omowunmi Dada"],
  };
  assert.deepEqual(documentedMovieCast(movie), movie.cast);
  assert.deepEqual(leadMovieCast(movie), ["Linda Ejiofor-Suleiman", "Omowunmi Dada", "Lateef Adedimeji"]);
});

test("all curated movie featured actors appear among displayed full cast credits", () => {
  for (const movie of entertainmentTitles) {
    const fullCast = documentedMovieCast(movie);
    const highlighted = leadMovieCast(movie);
    assert.ok(highlighted.length <= 3, movie.slug);
    for (const actor of highlighted) assert.ok(fullCast.includes(actor), movie.slug + " lost " + actor);
    assert.equal(new Set(fullCast.map(s => s.toLowerCase())).size, fullCast.length, movie.slug);
    if (movie.subjects?.length && !movie.cast.length && !movie.featuredCast?.length) {
      assert.deepEqual(fullCast, [], movie.slug + ": documentary subjects are not actors");
    }
  }
});

test("indexability never determines whether a recorded performer is shown as cast", () => {
  const youtube = src("app/entertainment/youtube/[videoId]/page.tsx");
  const curated = src("app/entertainment/movies/[slug]/page.tsx");
  const card = src("components/youtube-movie-card.tsx");
  assert.match(youtube, /const documentedCast = documentedMovieCast\(movie\)/);
  assert.match(youtube, /\{documentedCast\.length \? \(\s*<div className="movie-person-list">/);
  assert.match(youtube, /documentedCast\.map\(\(name\)/);
  assert.doesNotMatch(youtube, /\{indexable \? \(\s*<div className="movie-person-list">/);
  assert.match(youtube, /actor: documentedCast\.length/);
  assert.match(youtube, /<strong>Cast:<\/strong> \{featuredCast\.join/);
  assert.match(curated, /documentedCast\.map\(\(name\)/);
  assert.match(curated, /actor: documentedCast\.length/);
  assert.match(card, /leadMovieCast\(movie\)/);
  assert.match(card, /Cast: "/);
  assert.match(youtube, /No credited cast members have been independently confirmed/);
});

test("actor and character credits remain different kinds of evidence", () => {
  const curated = src("app/entertainment/movies/[slug]/page.tsx");
  assert.match(curated, /editorial\.roles\.length/);
  assert.match(curated, /Only character assignments independently confirmed/);
  assert.doesNotMatch(curated, /title\.subjects\?\.map\(\(name\) => \(\{ "@type": "Person", name \}\)\).*actor:/);
});

test("all film preview surfaces use the same actor source, including metadata on noindex pages", () => {
  const youtube = src("app/entertainment/youtube/[videoId]/page.tsx");
  const entertainment = src("app/entertainment/page.tsx");
  assert.match(youtube, /const castSummary = cast\.length/);
  assert.match(youtube, /Known cast: /);
  assert.match(youtube, /Cast credits have not been independently confirmed/);
  assert.doesNotMatch(youtube, /Cast details are not yet confirmed/);
  assert.doesNotMatch(youtube, /indexable\s*\?\s*\`\$\{movie\.title\} is/);
  assert.match(entertainment, /leadMovieCast\(title, 2\)/);
  assert.doesNotMatch(entertainment, /getFeaturedCast\(title\)/);
});

test("high-impression Royal Arts full-video guide leads to its matching sourced film credits", () => {
  const video = src("app/entertainment/youtube/[videoId]/page.tsx");
  const film = src("app/entertainment/movies/[slug]/page.tsx");
  assert.ok(entertainmentTitles.some((title) => title.slug === "forever-isnt-long-enough-2025"));
  assert.ok(video.includes('movie.videoId === "y2RkBwUYSvo"'));
  assert.ok(video.includes('href="/entertainment/movies/forever-isnt-long-enough-2025#cast"'));
  assert.ok(film.includes('<section id="cast">'), "linked cast section must exist");
  assert.ok(video.includes('"y2RkBwUYSvo": { title: "Watch Forever Isn\'t Long Enough'));
  assert.ok(!video.includes('canonical: "/entertainment/movies/forever-isnt-long-enough-2025"'),
    "video/watch and editorial pages retain their distinct canonical purposes");
});
