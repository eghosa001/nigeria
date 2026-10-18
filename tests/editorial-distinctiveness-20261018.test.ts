import assert from "node:assert/strict";
import test from "node:test";
import { getMovieEditorialProfile } from "../lib/movie-editorial-profile-registry";
import { getExploreGuide } from "../lib/explore";

test("Oversabi Aunty offers film-specific cultural and production context, without repeating watch-card claims", () => {
  const film = getMovieEditorialProfile("oversabi-aunty");
  assert.ok(film);
  const section = film.sections.find(section => /oversabi means/i.test(section.heading));
  assert.ok(section);
  const prose = section.paragraphs.join(" ");
  assert.match(prose, /Nigerian Pidgin/);
  assert.match(prose, /Shola Ayorinde/);
  assert.doesNotMatch(prose, /Netflix.*Top 10|Kava.*Subscribe/);
  assert.ok(film.roles.some(item => item.actor === "Toyin Abraham" && item.character === "Toun"));
});

test("Kainji guide distinguishes physical plant specifications from current conditions and tour permissions", () => {
  const guide = getExploreGuide("kainji-dam-guide");
  assert.ok(guide);
  const text = guide.intro.join(" ");
  assert.match(text, /15,000 million cubic metres/);
  assert.match(text, /330 kV/);
  assert.match(text, /not today's water volume/);
  assert.ok(guide.planning.some(item => /tourists/.test(item.label)));
  assert.ok(guide.planning.some(item => /tickets/.test(item.label)));
});
