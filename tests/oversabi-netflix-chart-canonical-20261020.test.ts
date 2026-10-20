import assert from "node:assert/strict";
import test from "node:test";
import { getEntertainmentTitle } from "../lib/entertainment";

test("Oversabi Aunty points to live first-party Netflix ranking, not dead title URL", () => {
  const title = getEntertainmentTitle("oversabi-aunty");
  assert.ok(title);
  assert.equal(title.references?.length, 4);
  assert.ok(title.references?.some(ref =>
    ref.href === "https://www.netflix.com/tudum/top10/nigeria" &&
    ref.lastChecked === "2026-10-20" &&
    /historical ranking/i.test(ref.note ?? "")));
  assert.ok(title.references?.every(ref => !ref.href.includes("/ng/title/82741545")));
  assert.equal(title.watchLinks.filter(x => x.platform === "Netflix").length, 0);
  assert.equal(title.watchLinks.filter(x => x.platform === "Kava").length, 1);
  assert.ok(title.directors?.includes("Toyin Abraham"));
  assert.ok(title.cast.length >= 5);
});
