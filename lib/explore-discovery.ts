import { exploreGuides, type ExploreGuide } from "@/lib/explore";

const key = (value: string) => value.trim().toLocaleLowerCase("en");

/** Avoid unrelated locations appearing just because they occur nearby in a data file. */
export function getRelatedExploreGuides(current: ExploreGuide, limit = 4) {
  const interests = new Set(current.bestFor.map(key));
  return exploreGuides
    .filter((guide) => guide.slug !== current.slug)
    .map((guide) => {
      const sameRegion = guide.region === current.region;
      const commonInterests = guide.bestFor.filter((value) => interests.has(key(value)));
      const sameKind = guide.kind === current.kind;
      const score = (sameRegion ? 7 : 0) + commonInterests.length * 4 + (sameKind ? 1 : 0);
      return {
        guide,
        score,
        reason: sameRegion ? "Also in " + current.region :
          commonInterests.length ? "Shared interest: " + commonInterests[0] : "Similar guide",
      };
    })
    .filter(({ score }) => score >= 4)
    .sort((a, b) => b.score - a.score || a.guide.shortTitle.localeCompare(b.guide.shortTitle))
    .slice(0, limit);
}

