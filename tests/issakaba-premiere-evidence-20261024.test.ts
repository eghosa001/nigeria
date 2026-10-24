import assert from "node:assert/strict";
import test from "node:test";
import { entertainmentTitles } from "../lib/entertainment";
import { getMovieEditorialProfile } from "../lib/movie-editorial-profile-registry";

test("Issakaba November premiere is sourced without false streaming availability", () => {
  const film = entertainmentTitles.find(item => item.slug === "issakaba-the-return-2026");
  assert.ok(film);
  assert.ok(film.references?.some(link => link.href.includes("guardian.ng/saturday-magazine/weekend-beats/issakaba-returns-25-years-after/")));
  assert.ok(film.references?.some(link => link.href.includes("vanguardngr.com/2026/10/moviegoers-in-frenzy")));
  assert.ok(film.watchLinks.every(link => link.access !== "full-movie"));
  const dossier = getMovieEditorialProfile(film.slug);
  assert.equal(dossier?.releaseDate, "2026-11-13");
  assert.ok(dossier?.sections.some(x => x.paragraphs.some(p => p.includes("24 October"))));
  assert.ok(dossier?.questions.some(x => x.answer.includes("24 October")));
});
