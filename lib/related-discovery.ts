import { entertainmentTitles, type EntertainmentTitle } from "@/lib/entertainment";
import { exploreGuides, type ExploreGuide } from "@/lib/explore";
import { jobOpportunities, type CareerOpportunity } from "@/lib/jobs";
import { getEffectiveJobStatus, todayIsoNigeria } from "@/lib/job-runtime";

const key = (value: string) => value.trim().toLocaleLowerCase("en");

function overlap(values: string[], other: Set<string>) {
  return values.reduce((total, value) => total + (other.has(key(value)) ? 1 : 0), 0);
}

/** Recommend actual, still-open opportunities from other employers, not expired listings or generic portals. */
export function getSimilarOpenJobs(current: CareerOpportunity, limit = 4, today = todayIsoNigeria()) {
  const fields = new Set(current.fields.map(key));
  const audiences = new Set(current.audiences.map(key));
  const topics = new Set((current.topicSlugs ?? []).map(key));
  const candidates = jobOpportunities
    .filter((item) =>
      item.slug !== current.slug &&
      key(item.organization) !== key(current.organization) &&
      item.kind !== "career-page" &&
      item.status !== "career-page" &&
      getEffectiveJobStatus(item, today) === "open"
    )
    .map((item) => {
      const sharedFields = overlap(item.fields, fields);
      const sharedAudiences = overlap(item.audiences, audiences);
      const sharedTopics = overlap(item.topicSlugs ?? [], topics);
      const score = sharedFields * 5 + sharedTopics * 5 + sharedAudiences * 3 +
        (item.sector === current.sector ? 2 : 0) +
        (item.location === current.location ? 1 : 0);
      const reason = sharedFields ? "Related field: " + item.fields.find((field) => fields.has(key(field)))
        : sharedTopics ? "Related career area"
          : sharedAudiences ? "Similar applicant eligibility"
            : "Same sector";
      return { item, score, reason };
    })
    .filter(({ score }) => score >= 5)
    .sort((a, b) => b.score - a.score || b.item.verifiedAt.localeCompare(a.item.verifiedAt) ||
      a.item.title.localeCompare(b.item.title));

  const seenEmployers = new Set<string>();
  return candidates.filter(({ item }) => {
    const employer = key(item.organization);
    if (seenEmployers.has(employer)) return false;
    seenEmployers.add(employer);
    return true;
  }).slice(0, limit);
}

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

function officialPublishers(title: EntertainmentTitle) {
  return title.watchLinks
    .filter((link) => link.platform === "YouTube" && link.access === "full-movie" && link.publisher)
    .map((link) => key(link.publisher as string));
}

export type MovieRecommendationShelf = {
  title: string;
  description: string;
  items: EntertainmentTitle[];
};

/** A few explainable, nonduplicated paths into the existing canonical movie catalog. */
export function getMovieRecommendationShelves(current: EntertainmentTitle): MovieRecommendationShelf[] {
  const used = new Set([current.slug]);
  const publishers = new Set(officialPublishers(current));
  const cast = new Set(current.cast.map(key));
  const genres = new Set(current.genres.filter((genre) => key(genre) !== "nollywood").map(key));
  const shelves: MovieRecommendationShelf[] = [];

  const fromPublisher = publishers.size
    ? entertainmentTitles
      .filter((item) => !used.has(item.slug) && officialPublishers(item).some((publisher) => publishers.has(publisher)))
      .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
      .slice(0, 3)
    : [];
  if (fromPublisher.length) {
    fromPublisher.forEach((item) => used.add(item.slug));
    const label = current.watchLinks.find((link) => link.platform === "YouTube" && link.publisher)?.publisher;
    shelves.push({
      title: "More movies from " + (label ?? "this channel"),
      description: "Other official releases listed from this publisher.",
      items: fromPublisher,
    });
  }

  const sharedCast = entertainmentTitles
    .filter((item) => !used.has(item.slug))
    .map((item) => ({ item, shared: overlap(item.cast, cast) }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || b.item.year - a.item.year)
    .slice(0, 3).map(({ item }) => item);
  if (sharedCast.length) {
    sharedCast.forEach((item) => used.add(item.slug));
    const firstShared = current.cast.find((name) => sharedCast.some((item) => item.cast.some((actor) => key(actor) === key(name))));
    shelves.push({
      title: firstShared ? "More movies featuring " + firstShared : "More with this cast",
      description: "Explore other films with actors from this movie.",
      items: sharedCast,
    });
  }

  const sameGenre = entertainmentTitles
    .filter((item) => !used.has(item.slug))
    .map((item) => ({ item, shared: overlap(item.genres, genres) }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || b.item.year - a.item.year)
    .slice(0, 3).map(({ item }) => item);
  if (sameGenre.length) {
    shelves.push({
      title: "Similar Nigerian movies",
      description: "Different stories sharing this movie's genres.",
      items: sameGenre,
    });
  }

  return shelves;
}
