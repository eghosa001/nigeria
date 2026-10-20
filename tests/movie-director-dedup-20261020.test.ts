import assert from "node:assert/strict";
import test from "node:test";
import { getMovieEditorialProfile } from "../lib/movie-editorial-profile-registry";
import { getEntertainmentTitle } from "../lib/entertainment";

test("The Man I Never Knew retains source-specific conflicting director evidence once", () => {
  const movie = getEntertainmentTitle("the-man-i-never-knew");
  const profile = getMovieEditorialProfile("the-man-i-never-knew");
  assert.ok(movie);
  assert.ok(profile);
  assert.equal(movie.directors?.length ?? 0, 0, "unverified director must remain uncredited");
  const sectionHeads = profile.sections.map(section => section.heading);
  assert.ok(sectionHeads.includes("Why the director credit is still unconfirmed"));
  assert.ok(!sectionHeads.includes("An original publisher is not a director credit"));
  const conflict = profile.sections.find(section => section.heading === "Why the director credit is still unconfirmed");
  assert.ok(conflict);
  assert.ok(conflict.paragraphs.some(p => /Uche Alexmoore.*Imaobong Udoh/.test(p)));
  assert.ok(profile.questions.some(item => /Why does The Man I Never Knew still have an unconfirmed director/.test(item.question)));
  assert.ok(!profile.questions.some(item => item.question === "Who directed The Man I Never Knew on Royal Arts TV?"));
  assert.ok(movie.watchLinks.some(link => link.platform === "YouTube"));
});

test("Director uncertainty cleanup is isolated to this film and not a sitewide review bypass", () => {
  for (const slug of ["what-love-is", "husband-or-dare"]) {
    const movie = getEntertainmentTitle(slug);
    const profile = getMovieEditorialProfile(slug);
    assert.ok(movie && profile);
    assert.equal(movie.directors?.length ?? 0, 0);
    assert.ok(profile.sections.length > 0);
  }
});
