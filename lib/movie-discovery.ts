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

  // Every movie in a named actor shelf must actually credit that performer.
  let actorShelves = 0;
  for (const actor of current.cast.slice(0, 8)) {
    if (actorShelves >= 2) break;
    const withActor = entertainmentTitles
      .filter((item) => !used.has(item.slug) && item.cast.some((name) => key(name) === key(actor)))
      .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
      .slice(0, 2);
    if (!withActor.length) continue;
    withActor.forEach((item) => used.add(item.slug));
    shelves.push({
      title: "More movies featuring " + actor,
      description: "Other films crediting " + actor + " in the cast.",
      items: withActor,
    });
    actorShelves += 1;
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
