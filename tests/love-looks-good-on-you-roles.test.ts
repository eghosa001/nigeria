import assert from "node:assert/strict";
import test from "node:test";
import { movieEditorialProfilesOctober20261013 } from "../lib/movie-editorial-profiles-october-2026-10-13";
import { verifiedOctoberMovieReleases20261013 } from "../lib/entertainment-october-releases-2026-10-13";

test("Love Looks Good on You credits match cited character-role evidence", () => {
  const profile = movieEditorialProfilesOctober20261013["love-looks-good-on-you-2026"];
  const film = verifiedOctoberMovieReleases20261013.find((x) => x.slug === "love-looks-good-on-you-2026");
  assert.ok(profile && film);
  const roles = new Map(profile.roles.map((role) => [role.actor, role.character]));
  assert.equal(roles.get("Bamike Olawunmi-Adenibuyan"), "Darling");
  assert.equal(roles.get("Michael Dappa"), "Uzor");
  assert.equal(roles.get("Symon Oko"), "Remi");
  assert.equal(roles.get("Margaret Echeghe"), "Olivia");
  assert.ok(film.cast.includes("Paul Utomi"));
  assert.ok(film.cast.includes("Margaret Echeghe"));
  assert.ok(film.references?.some((source) => source.href === "https://www.nollywood.com/movies/love-looks-good-on-you" && source.lastChecked === "2026-10-14"));
  assert.equal(film.watchLinks.length, 0, "do not invent unverified full-movie URL");
});
