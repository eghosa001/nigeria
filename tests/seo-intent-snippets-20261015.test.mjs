import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const jobs = readFileSync("app/jobs/[slug]/page.tsx", "utf8");
const tours = readFileSync("app/explore/[slug]/page.tsx", "utf8");
const movies = readFileSync("app/entertainment/movies/[slug]/page.tsx", "utf8");

test("search-demand metadata retains direct intent and avoids fake vacancy claims", () => {
  assert.match(jobs, /WHO Careers Nigeria: Official Recruitment Portal/);
  assert.match(jobs, /Check live vacancies, eligibility/);
  assert.match(jobs, /CapitalSage SageForge Graduate Programme 2026/);
});

test("tourism and film snippet titles are compact and describe the right page", () => {
  assert.match(tours, /Famous Nigerian Landmarks: Locations & Visitor Guide/);
  assert.match(tours, /Kainji Dam Nigeria: Location, History & Power Facts/);
  assert.match(movies, /Monica Nigerian Movie: Cast & Full Film/);
});
