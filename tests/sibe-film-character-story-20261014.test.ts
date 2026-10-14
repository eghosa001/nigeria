import test from "node:test";
import assert from "node:assert/strict";
import { entertainmentTitles } from "../lib/entertainment";
import { movieEditorialProfiles } from "../lib/movie-editorial-profiles";

test("Sibe movie profile distinguishes source-backed character roles from web-series credits", () => {
  const movie = entertainmentTitles.find((x) => x.slug === "sibe");
  const profile = movieEditorialProfiles.sibe;
  assert.ok(movie && profile);
  const roles = new Map(profile.roles.map((item) => [item.actor, item.character]));
  assert.equal(roles.get("Bimbo Ademoye"), "Sibe");
  assert.equal(roles.get("Uche Montana"), "Natasha");
  assert.equal(roles.get("Afeez Oyetoro"), "The Oracle");
  assert.equal(roles.has("Uzor Arukwe"), false, "original-series Bobo is not a verified 2026 film role");
  assert.ok(profile.sections.some((x) => x.heading.includes("web series")));
  assert.ok(profile.questions.some((x) => x.question.includes("where is the full movie")));
  assert.ok(movie.watchLinks.some((x) => x.href === "https://www.youtube.com/watch?v=HAk97psM9h0"));
  assert.ok(movie.references?.some((x) => x.href.includes("nta.ng") && x.lastChecked === "2026-10-14"));
});
