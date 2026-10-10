import test from "node:test";
import assert from "node:assert/strict";
import { selectRecentHomeMovies } from "../lib/home-movie-highlights";
import type { EntertainmentTitle } from "../lib/entertainment";
import type { ReleaseItem } from "../lib/entertainment-extras";

function film(slug: string, year: number, featured = false): EntertainmentTitle {
  return {
    slug, title: slug, year, format: "movie", genres: ["Drama"], languages: ["English"],
    synopsis: "An independently sourced Nigerian feature film with a detailed synopsis and verified creator credits.",
    cast: ["Cast Member"], featured,
    trailer: { label: "Official trailer", href: "https://www.youtube.com/watch?v=abc123xyz00",
      platform: "YouTube", lastChecked: "2026-10-10" },
    watchLinks: [],
  };
}

function release(title: string, startDate: string): ReleaseItem {
  return {
    id: title, title, kind: "cinema", status: "upcoming", startDate,
    dateLabel: startDate, platform: "Nigerian cinemas",
    summary: "Official source-backed release", officialUrl: "https://example.org/",
    lastChecked: "2026-10-10",
  };
}

test("recent years outrank pinned old classics and preserve input", () => {
  const movies = [film("king-of-boys", 2018, true), film("chief-daddy", 2018, true),
    film("current-release", 2026), film("last-year", 2025)];
  assert.deepEqual(selectRecentHomeMovies(movies, [], "2026-10-10", 3).map((x) => x.slug),
    ["current-release", "last-year", "king-of-boys"]);
  assert.equal(movies[0].slug, "king-of-boys");
});

test("a dated recent release outranks undated releases of the same year", () => {
  const movies = [film("older-wave", 2026), film("october-film", 2026), film("early-film", 2026)];
  const dates = [release("october-film", "2026-10-02"), release("early-film", "2026-08-01")];
  assert.deepEqual(selectRecentHomeMovies(movies, dates, "2026-10-10").map((x) => x.slug),
    ["october-film", "early-film", "older-wave"]);
});

test("upcoming movies do not appear before their official release date", () => {
  const movies = [film("issakaba-the-return", 2026), film("released-film", 2026)];
  assert.deepEqual(selectRecentHomeMovies(movies, [release("issakaba-the-return", "2026-11-13")],
    "2026-10-10").map((x) => x.slug), ["released-film"]);
});

test("release matching respects year for films with the same name", () => {
  const movies = [film("Forever Yours", 2025), film("Forever Yours", 2026), film("released", 2026)];
  assert.deepEqual(selectRecentHomeMovies(movies, [release("Forever Yours", "2026-11-20")],
    "2026-10-10").map((x) => x.year), [2026, 2025]);
});

test("no unsourced preview, future film year or empty cast is featured", () => {
  const noPreview = { ...film("no-preview", 2026), trailer: undefined };
  const noCast = { ...film("no-cast", 2026), cast: [] };
  assert.deepEqual(selectRecentHomeMovies([noPreview, noCast, film("future", 2027),
    film("verified", 2026)], [], "2026-10-10").map((x) => x.slug), ["verified"]);
});
