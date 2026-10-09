import { entertainmentTitles, type EntertainmentTitle } from "@/lib/entertainment";

const key = (value: string) => value.trim().toLocaleLowerCase("en");
function overlap(values: string[], other: Set<string>) {
  return values.reduce((total, value) => total + (other.has(key(value)) ? 1 : 0), 0);
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
