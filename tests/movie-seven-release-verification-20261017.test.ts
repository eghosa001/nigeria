import test from "node:test";
import assert from "node:assert/strict";
import { getEntertainmentTitle } from "../lib/entertainment";
import { getMovieEditorialProfile } from "../lib/movie-editorial-profile-registry";
import { sevenFilmReleaseReviews20261017, sevenReviewedFilmSlugs20261017 } from "../lib/entertainment-release-verification-2026-10-17";

test("seven corrected films retain their canonical identities, evidence and authored context", () => {
  assert.equal(sevenReviewedFilmSlugs20261017.length, 7);
  assert.equal(new Set(sevenReviewedFilmSlugs20261017).size, 7);
  for (const slug of sevenReviewedFilmSlugs20261017) {
    const title = getEntertainmentTitle(slug);
    const profile = getMovieEditorialProfile(slug);
    const review = sevenFilmReleaseReviews20261017[slug];
    assert.ok(title, slug);
    assert.ok(profile, slug);
    if (review.synopsis) assert.equal(title.synopsis, review.synopsis, slug);
    const hrefs = (title.references ?? []).map(ref => ref.href);
    for (const source of review.sources) {
      assert.ok((title.references ?? []).some(ref => ref.href === source.href && ref.lastChecked === "2026-10-17"), slug);
    }
    assert.equal(new Set(hrefs).size, hrefs.length, slug);
    assert.ok(profile.sections.some(section => section.heading === review.heading &&
      section.paragraphs.join(" ") === review.paragraphs.join(" ")), slug);
    assert.ok(profile.questions.some(q => q.question === review.question.question && q.answer === review.question.answer), slug);
  }
});
test("no unauthorised or guessed watch action, director or release-date change is introduced", () => {
  for (const slug of ["abe-odale-2026", "long-enough-2026", "no-fury-2024", "colours-of-fire"]) {
    assert.equal(getEntertainmentTitle(slug)?.watchLinks.length, 0, slug);
  }
  assert.equal(getEntertainmentTitle("no-fury-2024")?.year, 2024);
  assert.match(getEntertainmentTitle("no-fury-2024")?.synopsis ?? "", /23 October 2026/);
  assert.equal(getEntertainmentTitle("what-love-is")?.directors?.length ?? 0, 0);
  assert.equal(getEntertainmentTitle("husband-or-dare")?.directors?.length ?? 0, 0);
  assert.equal(getEntertainmentTitle("the-man-i-never-knew")?.directors?.length ?? 0, 0);
  assert.ok(getEntertainmentTitle("long-enough-2026")?.references?.some(ref => ref.href.includes("15b2ecd8-a91a-4e80-87e8-e8674992edb4")));
});
