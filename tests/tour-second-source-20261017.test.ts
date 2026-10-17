import test from "node:test";
import assert from "node:assert/strict";
import { exploreGuides, getExploreGuide } from "../lib/explore";
import { secondSourceTourDecisions20261017, secondSourceTourSlugs20261017 } from "../lib/explore-second-source-decisions-2026-10-17";

test("eleven original Tour guides retain canonical URLs and show source-backed visitor decisions", () => {
  assert.equal(secondSourceTourSlugs20261017.length, 11);
  assert.equal(new Set(secondSourceTourSlugs20261017).size, 30);
  for (const slug of secondSourceTourSlugs20261017) {
    const review = secondSourceTourDecisions20261017[slug];
    const guide = getExploreGuide(slug);
    assert.ok(guide, slug);
    assert.equal(exploreGuides.filter(g => g.slug === slug).length, 1, slug);
    assert.equal(guide.lastReviewed, "2026-10-17", slug);
    assert.ok(guide.intro.includes(review.context), slug);
    assert.ok(guide.planning.some(x => x.label === review.planning.label && x.detail === review.planning.detail), slug);
    if (review.summary) assert.equal(guide.summary, review.summary, slug);
    const links = [guide.source?.href, ...(guide.sources ?? []).map(x => x.href)].filter((x): x is string => Boolean(x));
    assert.ok(links.includes(review.source.href), slug + ": missing independent original source");
    assert.ok((guide.sources ?? []).length >= 1, slug + ": previously single-source publication still lacks a second citation");
    assert.equal(new Set(links).size, links.length, slug + ": duplicate links");
  }
});

test("critical remote-access and historic place decisions survive all concurrent Tour changes", () => {
  const textOf = (slug: string) => {
    const guide = getExploreGuide(slug);
    assert.ok(guide, slug);
    return [guide.summary, ...guide.intro, ...guide.planning.map(x => x.detail)].join(" ");
  };
  assert.match(textOf("royal-niger-akassa-guide"), /riverine Bayelsa/i);
  assert.match(textOf("eggon-hills-guide"), /Alogani Hills/);
  assert.match(textOf("ebomi-lake-guide"), /Ipesi Akoko/);
  assert.match(textOf("enemabia-warm-spring-guide"), /Benue/);
  assert.match(textOf("ibom-tropicana-guide"), /construction project/i);
});
