import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { movieEditorialProfiles } from "../lib/movie-editorial-profiles";

test("Part 3 video cast uses existing reviewed role credits and links to series", () => {
  const roles = movieEditorialProfiles["once-upon-a-village-3"]?.roles ?? [];
  const cast = new Map(roles.map((entry) => [entry.actor, entry.character]));
  assert.equal(cast.get("Deza The Great"), "Chairman Jeffery");
  assert.equal(cast.get("Prisma James"), "Lilian");
  assert.equal(cast.get("Annabel Apara"), "Enoh");
  const page = readFileSync("app/entertainment/youtube/[videoId]/page.tsx", "utf8");
  assert.match(page, /movie\.videoId === "X3HaWmJoSRU"/);
  assert.match(page, /partThreeRoles\.map/);
  assert.match(page, /entertainment\/series\/once-upon-a-village#cast/);
  assert.match(page, /Deza The Great \(Chairman Jeffery\)/);
});
