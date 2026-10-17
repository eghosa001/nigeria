import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const servicesPage = readFileSync("app/services/page.tsx", "utf8");
const moviesPage = readFileSync("app/entertainment/movies/page.tsx", "utf8");
const services = ["data/services.json", "data/services-scale-verified.json", "data/services-private-extended.json"]
  .flatMap((path) => JSON.parse(readFileSync(path, "utf8")));
const movieCatalog = readFileSync("lib/entertainment.ts", "utf8");

test("Search Console-priority service links point at published catalog records", () => {
  const slugs = [
    "waec-collect-certificate",
    "aedc-map-refund",
    "ibedc-map-refund",
    "western-union-track-transfer-nigeria",
    "spotify-premium-nigeria",
  ];
  for (const slug of slugs) {
    assert.equal(services.filter((record) => record.slug === slug && record.status === "verified").length, 1, slug);
    assert.ok(servicesPage.includes('href: "/services/' + slug + '"'), "Missing direct hub link: " + slug);
  }
});

test("Nollywood discovery page makes its topic clear and links to real cast editorial", () => {
  assert.match(moviesPage, /<h1>Nollywood movies: casts, genres and where to watch\.<\/h1>/);
  assert.match(moviesPage, /href="\/entertainment\/movies\/oversabi-aunty"/);
  assert.match(movieCatalog, /slug: "oversabi-aunty"/);
});
