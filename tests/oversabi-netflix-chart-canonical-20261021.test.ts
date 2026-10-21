import assert from "node:assert/strict";
import test from "node:test";
import { getEntertainmentTitle } from "../lib/entertainment";

test("Oversabi Aunty keeps historical chart evidence separate from playback availability", () => {
  const movie = getEntertainmentTitle("oversabi-aunty");
  assert.ok(movie);
  assert.equal(movie.watchLinks.some(link => link.platform === "Netflix"), false);
  assert.equal(movie.watchLinks.filter(link => link.platform === "Kava").length, 1);
  assert.ok(movie.references?.some(ref =>
    ref.href === "https://www.netflix.com/tudum/top10/nigeria" &&
    /historical ranking/i.test(ref.note ?? "")
  ));
  assert.ok(movie.references?.every(ref => !ref.href.includes("/ng/title/82741545")));
});
