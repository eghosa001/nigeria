import assert from "node:assert/strict";
import test from "node:test";
import { entertainmentTitles } from "../lib/entertainment";
import { getMovieEditorialProfile } from "../lib/movie-editorial-profile-registry";

test("Onibọn Oje credits and showing status follow real exhibitors on 24 October 2026", () => {
  const film = entertainmentTitles.find(item => item.slug === "onibon-oje-2026");
  assert.ok(film);
  assert.ok(film.cast.includes("Bose Akinola"));
  assert.ok(!film.cast.includes("Bola Akinola"));
  assert.ok(film.languages.includes("Yoruba"));
  assert.ok(film.languages.includes("English"));
  assert.ok(film.references?.some(source => source.href === "https://silverbirdcinemas.com/movie/onibon-oje/" && source.lastChecked === "2026-10-24"));
  assert.ok(film.references?.some(source => source.href.includes("filmworldcinemas.com/showtime/")));
  assert.equal(film.watchLinks[0].href, "https://silverbirdcinemas.com/movie/onibon-oje/");
  assert.equal(film.watchLinks[0].access, "cinema");
  const editorial = getMovieEditorialProfile(film.slug);
  assert.ok(editorial);
  const text = [editorial.sections.map(section => section.paragraphs.join(" ")).join(" "), editorial.questions.map(q => q.answer).join(" ")].join(" ");
  assert.match(text, /24 October/);
  assert.match(text, /now list cinema screenings|Now Showing/);
  assert.doesNotMatch(text, /future opening|Bola Akinola|scheduled for cinema release on 23 October/);
  assert.ok(!editorial.roles.length, "unverified actor-character mappings should stay absent");
});
