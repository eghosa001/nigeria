import test from "node:test";
import assert from "node:assert/strict";
import { entertainmentTitles } from "../lib/entertainment";
import { allMovieEditorialProfiles } from "../lib/movie-editorial-profile-registry";
import { filmCreditAndAvailabilityReviews20261017 } from "../lib/entertainment-director-and-territory-evidence-2026-10-17";

test("8 movie credit and availability decisions keep canonical IDs, links and original dossier context", () => {
  const entries = Object.entries(filmCreditAndAvailabilityReviews20261017);
  assert.equal(entries.length, 8);
  for (const [slug, review] of entries) {
    const titles = entertainmentTitles.filter(film => film.slug === slug);
    assert.equal(titles.length, 1, slug + ": one title");
    const title = titles[0];
    const sourceUrls = [ ...(title.references ?? []).map(ref => ref.href) ];
    for (const ref of review.references) {
      assert.ok(sourceUrls.includes(ref.href), slug + ": evidence URL");
      assert.ok(title.references?.find(item => item.href === ref.href)?.lastChecked === "2026-10-17");
    }
    assert.equal(new Set(sourceUrls).size, sourceUrls.length, slug + ": sources not duplicated");
    if (review.directors) assert.deepEqual(title.directors, review.directors, slug + ": exact director");
    const editorial = allMovieEditorialProfiles[slug];
    assert.ok(editorial, slug + ": existing dossier");
    assert.ok(editorial.sections.some(part => part.heading === review.editorial.heading && part.paragraphs.join(" ").includes(review.editorial.paragraphs[0])), slug + ": original reader value");
    assert.ok(editorial.questions.some(item => item.question === review.editorial.question.question), slug + ": answered user question");
  }
});
test("a theatre, publisher-channel or Africa-blocked catalog is not a Nigerian watch link", () => {
  for (const slug of ["abe-odale-2026","long-enough-2026","colours-of-fire"]) {
    const film = entertainmentTitles.find(movie => movie.slug === slug);
    assert.ok(film, slug);
    assert.equal(film.watchLinks.length, 0, slug + ": no fabricated playable source");
  }
  for (const slug of ["what-love-is", "the-man-i-never-knew"]) {
    const film = entertainmentTitles.find(movie => movie.slug === slug);
    assert.ok(film);
    assert.equal(film.directors?.length ?? 0, 0, slug + ": unresolved credit stays unresolved");
  }
  assert.equal(entertainmentTitles.find(movie => movie.slug === "colours-of-fire")?.references?.some(ref => ref.href === "https://kavatv.vhx.tv/colours-of-fire"), true);
});
