import assert from "node:assert/strict";
import { test } from "node:test";
import { entertainmentTitles } from "@/lib/entertainment";
import { exploreGuides } from "@/lib/explore";
import { getRelatedServiceReason, getRelatedServices } from "@/lib/internal-links";
import { getEffectiveJobStatus } from "@/lib/job-runtime";
import { jobOpportunities } from "@/lib/jobs";
import { publicServices } from "@/lib/data";
import { getMovieRecommendationShelves } from "@/lib/movie-discovery";
import { getRelatedExploreGuides } from "@/lib/explore-discovery";
import { getSimilarOpenJobs } from "@/lib/job-discovery";
import { queryJobDirectory } from "@/lib/job-query";
import { queryServiceDirectory } from "@/lib/service-query";

test("movie shelves are relevant, unique and never link to the current movie", () => {
  for (const movie of entertainmentTitles.slice(0, 12)) {
    const shelves = getMovieRecommendationShelves(movie);
    const slugs = shelves.flatMap((shelf) => shelf.items.map((item) => item.slug));
    assert.equal(new Set(slugs).size, slugs.length);
    assert.ok(!slugs.includes(movie.slug));
    assert.ok(shelves.every((shelf) => shelf.items.length > 0 && shelf.items.length <= 3));
  }
});

test("related job suggestions contain only open roles from distinct other employers", () => {
  const current = jobOpportunities.find((item) => item.fields.length > 0);
  assert.ok(current);
  const candidates = getSimilarOpenJobs(current, 4, "2026-10-09");
  assert.ok(candidates.every(({ item }) => getEffectiveJobStatus(item, "2026-10-09") === "open"));
  assert.ok(candidates.every(({ item }) => item.organization !== current.organization));
  assert.equal(new Set(candidates.map(({ item }) => item.organization)).size, candidates.length);
  const narrow = queryJobDirectory({ q: current.title });
  assert.ok((narrow.recommendations ?? []).every((item) => !narrow.items.some((match) => match.slug === item.slug)));
});

test("related services and travel guides have distinct canonical destinations", () => {
  const service = publicServices[0];
  const relatedServices = getRelatedServices(service);
  assert.ok(relatedServices.every((item) => item.slug !== service.slug));
  assert.equal(new Set(relatedServices.map((item) => item.slug)).size, relatedServices.length);
  assert.ok(relatedServices.every((item) => getRelatedServiceReason(service, item).length > 0));
  const searchedServices = queryServiceDirectory({ q: service.shortTitle });
  assert.ok((searchedServices.recommendations ?? []).every((item) => !searchedServices.items.some((match) => match.slug === item.slug)));
  const guide = exploreGuides[0];
  const travel = getRelatedExploreGuides(guide);
  assert.ok(travel.every(({ guide: item, score }) => item.slug !== guide.slug && score >= 4));
  assert.equal(new Set(travel.map(({ guide: item }) => item.slug)).size, travel.length);
});
