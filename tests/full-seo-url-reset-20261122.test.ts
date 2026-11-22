import assert from "node:assert/strict";
import test from "node:test";
import { canonicalGuidePath, canonicalGuideUrl, guideRedirects, guideRewrites } from "../lib/seo-routes";

test("full SEO rebuild maps every original content family to new guide URLs", () => {
  const routes = [
    ["/services/jamb-profile-code", "/guides/services/jamb-profile-code"],
    ["/entertainment/movies/oversabi-aunty", "/guides/movies/oversabi-aunty"],
    ["/entertainment/series/afobaje-2026", "/guides/series/afobaje-2026"],
    ["/entertainment/youtube/HW69iUPK7j0", "/guides/videos/HW69iUPK7j0"],
    ["/explore/benin-city", "/guides/travel/benin-city"],
    ["/jobs/nigerian-army-92rri-2026", "/guides/jobs/nigerian-army-92rri-2026"],
    ["/agencies/npc", "/guides/agencies/npc"],
    ["/categories/education", "/guides/categories/education"],
    ["/topics/nelfund", "/guides/topics/nelfund"],
    ["/locations/benin-city", "/guides/locations/benin-city"],
    ["/jobs/employers/google", "/guides/employers/google"],
    ["/jobs/guides/graduate-cv", "/guides/careers/graduate-cv"],
    ["/jobs/locations/lagos", "/guides/job-locations/lagos"],
    ["/jobs/professions/software-engineering", "/guides/job-professions/software-engineering"],
    ["/jobs/categories/technology", "/guides/job-categories/technology"],
    ["/entertainment/people/toyin-abraham", "/guides/people/toyin-abraham"],
    ["/entertainment/platforms/netflix", "/guides/platforms/netflix"],
    ["/entertainment/youtube/channels/bimbo-ademoye", "/guides/youtube-channels/bimbo-ademoye"],
  ];
  for (const [original, expected] of routes) {
    assert.equal(canonicalGuidePath(original), expected, original);
    assert.equal(canonicalGuideUrl("https://mynigeriaguide.com" + original), "https://mynigeriaguide.com" + expected);
  }
});

test("editorial hubs and static utility routes remain reachable", () => {
  for (const path of [
    "/", "/services", "/services/page/2", "/explore", "/explore/events",
    "/explore/trip-planner", "/explore/things-to-do-abuja", "/jobs",
    "/jobs/remote", "/jobs/government", "/jobs/new-this-week",
    "/entertainment/movies", "/entertainment/movies/october-2026",
    "/entertainment/movies/page/2", "/entertainment/youtube/channels",
    "/admin", "/api/health",
  ]) assert.equal(canonicalGuidePath(path), path, path);
});

test("legacy requests are redirected, new requests rewritten internally", () => {
  const redirects = guideRedirects();
  const rewrites = guideRewrites();
  assert.equal(redirects.length, 18);
  assert.equal(rewrites.length, 18);
  assert.ok(redirects.every((rule) => rule.permanent && rule.source.startsWith("/") && rule.destination.startsWith("/guides/")));
  assert.ok(rewrites.every((rule) => rule.source.startsWith("/guides/") && !rule.destination.startsWith("/guides/")));
});
