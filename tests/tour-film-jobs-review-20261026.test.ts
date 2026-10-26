import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { getExploreGuide } from "../lib/explore";
import { getEntertainmentTitle } from "../lib/entertainment";
import { getJobOpportunity } from "../lib/jobs";
import { getEffectiveJobStatus } from "../lib/job-runtime";

test("Hallelujah Festival decision records actual organiser FAQ facts without inventing an address", () => {
  const event = getExploreGuide("hallelujah-festival-lagos-october-2026");
  assert.ok(event);
  assert.equal(event.lastReviewed, "2026-10-26");
  assert.match(event.intro.join(" "), /not published an exact venue address/);
  assert.match(event.highlights.map(x => x.detail).join(" "), /first-come, first-served/);
  assert.match(event.highlights.map(x => x.detail).join(" "), /food and drinks at the venue will be sold/);
  assert.match(event.planning.map(x => x.detail).join(" "), /medical staff/);
  assert.match(event.planning.map(x => x.detail).join(" "), /streamed on Nathaniel Bassey's official channels/);
  assert.ok(event.source?.href === "https://www.hallelujahchallengelive.com/int");
});

test("Abe Odale cast includes Femi Adebayo without inventing character roles or unlicensed playback", () => {
  const movie = getEntertainmentTitle("abe-odale-2026");
  assert.ok(movie);
  assert.ok(movie.cast.includes("Femi Adebayo"));
  assert.ok(movie.cast.includes("Omobolanle Salisu"));
  assert.ok(movie.directors?.includes("Wasiu Adeyanju"));
  assert.match(movie.synopsis, /11 October 2026/);
  assert.match(movie.synopsis, /no plot or character assignments are invented/i);
  assert.equal(movie.watchLinks.length, 0);
  assert.ok(movie.references?.some(x => x.lastChecked === "2026-10-26" && /nollywoodtimes.com/.test(x.href)));
});

test("archived or unconfirmed roles stay informational rather than appearing open", () => {
  const snv = getJobOpportunity("snv-energy-advisor-abuja-2026");
  const fulafia = getJobOpportunity("federal-university-lafia-recruitment-2026");
  assert.ok(snv && fulafia);
  assert.equal(getEffectiveJobStatus(snv, "2026-10-26"), "closed");
  assert.equal(getEffectiveJobStatus(fulafia, "2026-10-26"), "unverified");
  const jobs = readFileSync("app/jobs/[slug]/page.tsx", "utf8");
  assert.match(jobs, /Previous application steps and status for /);
  assert.match(jobs, /Application availability and official sources for /);
  assert.match(jobs, /Original employer notice — applications closed/);
});

test("tour events and movie credits no longer repeat generic or misleading editorial headings", () => {
  const tour = readFileSync("app/explore/[slug]/page.tsx", "utf8");
  const movies = readFileSync("app/entertainment/movies/[slug]/page.tsx", "utf8");
  assert.match(tour, /guide.kind === "event" \? "Event details for "/);
  assert.doesNotMatch(movies, /Other documented performers appear in the cast list above without guessed roles/);
  assert.match(movies, /The cited film-specific sources do not confirm a director/);
});
