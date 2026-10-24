import assert from "node:assert/strict";
import test from "node:test";
import { entertainmentTitles } from "../lib/entertainment";
import { getMovieEditorialProfile } from "../lib/movie-editorial-profile-registry";

test("Tele x Zikora 23 October release now has independent dated exhibitor evidence", () => {
  const film = entertainmentTitles.find(item => item.slug === "tele-x-zikora-2026");
  assert.ok(film);
  assert.ok(film.references?.some(s => s.href === "https://silverbirdcinemas.com/cinema/ikeja/" && s.lastChecked === "2026-10-24"));
  assert.ok(film.references?.some(s => s.href === "https://www.dreamparkcinemas.com/movies/tele-x-zikora/"));
  assert.equal(film.watchLinks[0].href, "https://silverbirdcinemas.com/cinema/ikeja/");
  assert.equal(film.watchLinks[0].access, "cinema");
  const profile = getMovieEditorialProfile(film.slug);
  assert.ok(profile);
  const prose = profile.sections.map(s => s.paragraphs.join(" ")).join(" ") + profile.questions.map(q => q.answer).join(" ");
  assert.match(prose, /24 October 2026/);
  assert.doesNotMatch(prose, /scheduled future release relative|has not reached its announced general opening/i);
  assert.equal(profile.roles.length, 0, "unverified character cast must not be guessed");
});

test("No Fury 2024 catalogue identity keeps 2026 cinema showing evidence distinct", () => {
  const film = entertainmentTitles.find(item => item.slug === "no-fury-2024");
  assert.ok(film);
  assert.equal(film.year, 2024, "do not silently rewrite historic catalogue identity");
  assert.equal(film.watchLinks[0].access, "cinema");
  assert.equal(film.watchLinks[0].href, "https://silverbirdcinemas.com/cinema/galleria/");
  assert.ok(film.references?.some(s => s.lastChecked === "2026-10-24" && s.href.includes("silverbirdcinemas.com")));
  const profile = getMovieEditorialProfile(film.slug);
  assert.ok(profile);
  assert.match(profile.sections.map(s => s.paragraphs.join(" ")).join(" "), /24 October/);
  assert.doesNotMatch(profile.sections.map(s => s.paragraphs.join(" ")).join(" "), /not proof that tickets already exist|no reliable.*cinema showtime was verified/i);
});

test("A Land Apart preserves original film evidence and links to a named exhibitor", () => {
  const film = entertainmentTitles.find(item => item.slug === "a-land-apart-2026");
  assert.ok(film);
  assert.ok(film.references?.some(s => s.href === "https://nile-redesign.cap.reachcinema.io/" && s.lastChecked === "2026-10-24"));
  assert.ok(film.references?.some(s => s.href === "https://silverbirdcinemas.com/cinema/ikeja/"));
  assert.equal(film.watchLinks[0].href, "https://silverbirdcinemas.com/cinema/ikeja/");
  assert.equal(film.watchLinks[0].access, "cinema");
  assert.ok(film.trailer?.href.includes("youtube.com"));
});
