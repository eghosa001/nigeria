import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const homepage = readFileSync("app/page.tsx", "utf8");
const jobs = readFileSync("app/jobs/page.tsx", "utf8");
const entertainment = readFileSync("app/entertainment/page.tsx", "utf8");
const movies = readFileSync("app/entertainment/movies/[slug]/page.tsx", "utf8");
const serviceSeo = readFileSync("data/service-seo-overrides.ts", "utf8");

test("homepage H1 identifies its four actual search-intent pillars", () => {
  assert.match(homepage, /<h1>Nigerian movies, services, travel and jobs — made easier\.<\/h1>/);
  assert.match(jobs, /<h1>Jobs in Nigeria: know what is open and where to apply\.<\/h1>/);
  assert.match(entertainment, /<h1>Nigerian movies, casts and where to watch\.<\/h1>/);
});

test("Oversabi Aunty snippet names only verified actor-character pairs and avoids promising playback", () => {
  assert.match(movies, /Oversabi Aunty \(2025\) Cast, Characters & Where to Watch/);
  assert.match(movies, /Toyin Abraham as Toun, Enioluwa Adeoluwa as Chuka, Efe Irele as Seyi/);
  assert.match(movies, /Check official Netflix and Kava listings/);
});

test("Spotify Nigeria SERP title conveys geographic intent without freezing changing prices", () => {
  assert.match(serviceSeo, /"spotify-premium-nigeria": "Spotify Premium Nigeria \{year\}: Prices, Plans & Payment"/);
  assert.match(serviceSeo, /"spotify-premium-nigeria": "Compare Spotify Premium Nigeria prices:/);
});
