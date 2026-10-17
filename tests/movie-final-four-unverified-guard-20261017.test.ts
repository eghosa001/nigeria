import test from "node:test";
import assert from "node:assert/strict";
import { getEntertainmentTitle } from "../lib/entertainment";

test("unconfirmed film directors remain absent from published movie metadata", () => {
  for (const slug of ["husband-or-dare", "the-man-i-never-knew", "what-love-is"]) {
    const film = getEntertainmentTitle(slug);
    assert.ok(film, slug);
    assert.equal(film.directors?.length ?? 0, 0, slug);
  }
});

test("Abe Odale has no unverified film-specific watch link", () => {
  const film = getEntertainmentTitle("abe-odale-2026");
  assert.ok(film);
  assert.equal(film.watchLinks.length, 0);
});
