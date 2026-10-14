import assert from "node:assert/strict";
import test from "node:test";
import { movieEditorialProfilesOctober20261013 } from "../lib/movie-editorial-profiles-october-2026-10-13";
import { verifiedOctoberMovieReleases20261013 } from "../lib/entertainment-october-releases-2026-10-13";

test("Matters of the Heart roles and sources are record-specific and avoid settling disputed spelling", () => {
  const film = verifiedOctoberMovieReleases20261013.find((item) => item.slug === "matters-of-the-heart-2026");
  const profile = movieEditorialProfilesOctober20261013["matters-of-the-heart-2026"];
  assert.ok(film && profile);
  assert.ok(film.cast.includes("Amanda Neo"));
  assert.ok(film.references?.some((ref) => ref.href === "https://www.nollywood.com/movies/matters-of-the-heart"));
  assert.ok(film.references?.some((ref) => ref.href === "https://africanmoviedb.com/title/matters-of-the-heart-2026"));
  assert.deepEqual(
    profile.roles.filter((role) => ["Timini Egbuson", "Audrey Harrison", "Amanda Neo"].includes(role.actor))
      .map((role) => role.character),
    ["Hakeem", "Sophia", "Joy"],
  );
  assert.match(profile.roles.find((role) => role.actor === "Sarian Martin")?.character ?? "", /Carissa \/ Charissa/);
});
