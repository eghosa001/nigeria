import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { validHref, kindFor } from "../lib/personal-library-storage";

test("saved and recently visited guide identities remain functional after migration", () => {
  for (const [legacy, current, kind] of [
    ["/entertainment/movies/oversabi-aunty", "/guides/movies/oversabi-aunty", "movie"],
    ["/explore/benin-city", "/guides/travel/benin-city", "travel"],
    ["/jobs/nigerian-army-92rri-2026", "/guides/jobs/nigerian-army-92rri-2026", "job"],
  ]) {
    assert.ok(validHref(legacy));
    assert.ok(validHref(current));
    assert.equal(kindFor(current), kind);
  }
  assert.equal(validHref("/admin"), false);
});

test("header's primary and mobile navigation cover all new SEO guide families", () => {
  const header = readFileSync("components/site-header.tsx", "utf8");
  for (const family of ["services", "movies", "series", "videos", "travel", "jobs",
    "people", "platforms", "youtube-channels", "categories", "agencies", "topics",
    "locations", "employers", "careers", "job-locations", "job-professions", "job-categories"]) {
    assert.ok(header.includes('"/guides/' + family + '"'), family);
  }
});
