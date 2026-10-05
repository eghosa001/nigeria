import { getEffectiveJobStatus } from "@/lib/job-runtime";
import { careerGuides } from "@/lib/career-guides";

function normalise(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function relevance(query: string, title: string, text: string) {
  const q = normalise(query);
  if (!q) return 0;

  const titleText = normalise(title);
  const haystack = normalise(title + " " + text);
  const tokens = q.split(/\s+/).filter(Boolean);

  if (!tokens.every((token) => haystack.includes(token))) return 0;

  let score = 10;
  if (titleText === q) score += 100;
  else if (titleText.startsWith(q)) score += 55;
  else if (titleText.includes(q)) score += 35;
  if (haystack.includes(q)) score += 18;

  for (const token of tokens) {
    if (titleText.split(" ").includes(token)) score += 10;
    else if (titleText.includes(token)) score += 6;
    else score += 2;
  }

  return score;
}

/**
 * Checked-in catalog adapter.
 *
 * This is intentionally an async boundary even while the catalogs are small.
 * When any pillar approaches the scale threshold in config/scale-targets.json,
 * replace the corresponding in-memory branch here with indexed CONTENT_DB
 * queries without changing the /search route or its result contract.
 */
export async function searchGlobalCatalog(query: string) {
  if (!query.trim()) {
    return {
      serviceResults: [],
      jobResults: [],
      careerGuideResults: [],
      exploreResults: [],
      placeResults: [],
      movieResults: [],
      seriesResults: [],
      peopleResults: [],
      youtubeResults: [],
      totalShown: 0,
    };
  }

  const [
    { publicServiceListings },
    { exploreGuides },
    { explorePlaces },
    { entertainmentTitles },
    { entertainmentPeople },
    { seriesTitles },
    { jobOpportunities },
    { default: generatedYouTubeData },
  ] = await Promise.all([
    import("@/lib/data"),
    import("@/lib/explore"),
    import("@/lib/explore-places"),
    import("@/lib/entertainment"),
    import("@/lib/entertainment-extras"),
    import("@/lib/series"),
    import("@/lib/jobs"),
    import("@/data/youtube-movies.generated.json"),
  ]);

  const generatedYouTubeMovies = generatedYouTubeData.movies;

  const serviceResults = publicServiceListings
    .map((item) => ({
      item,
      score: relevance(
        query,
        item.title,
        [item.shortTitle, item.summary, item.category, item.agencySlug, item.searchTerms.join(" "), item.searchText].join(" "),
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, 16)
    .map((entry) => entry.item);

  const careerGuideResults = careerGuides
    .map((guide) => ({
      item: guide,
      score: relevance(
        query,
        guide.title,
        [
          guide.description,
          guide.summary,
          guide.answer,
          ...guide.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])]),
        ].join(" "),
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, 6)
    .map((entry) => entry.item);

  const jobResults = jobOpportunities
    .map((item) => ({
      item,
      score: relevance(
        query,
        item.title,
        [item.organization, item.summary, item.sector, item.location, item.employmentType, item.audiences.join(" "), item.fields.join(" "), item.qualifications.join(" ")].join(" "),
      ) + (getEffectiveJobStatus(item) === "open" ? 24 : item.status === "career-page" ? 0 : -4),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, 8)
    .map((entry) => entry.item);

  const exploreResults = exploreGuides
    .map((item) => ({
      item,
      score: relevance(
        query,
        item.title,
        [
          item.shortTitle,
          item.region,
          item.kind,
          item.summary,
          item.bestFor.join(" "),
          item.highlights.map((highlight) => highlight.name + " " + highlight.detail).join(" "),
        ].join(" "),
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, 8)
    .map((entry) => entry.item);

  const placeResults = explorePlaces
    .map((item) => ({
      item,
      score: relevance(
        query,
        item.name,
        [item.kind, item.area, item.address, item.summary, item.cost, item.tags.join(" "), item.guideSlug].join(" "),
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
    .slice(0, 12)
    .map((entry) => entry.item);

  const movieResults = entertainmentTitles
    .map((item) => ({
      item,
      score: relevance(
        query,
        item.title,
        [item.synopsis, item.genres.join(" "), item.languages.join(" "), item.cast.join(" "), item.directors?.join(" ") ?? "", String(item.year)].join(" "),
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.item.year - a.item.year)
    .slice(0, 8)
    .map((entry) => entry.item);

  const seriesResults = seriesTitles
    .map((item) => ({
      item,
      score: relevance(
        query,
        item.title,
        [item.synopsis, item.genres.join(" "), item.languages.join(" "), item.cast.join(" "), item.creators?.join(" ") ?? "", String(item.year)].join(" "),
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.item.year - a.item.year)
    .slice(0, 8)
    .map((entry) => entry.item);

  const peopleResults = entertainmentPeople
    .map((item) => ({
      item,
      score: relevance(query, item.name, [item.roles.join(" "), item.summary].join(" ")),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
    .slice(0, 8)
    .map((entry) => entry.item);

  const youtubeResults = generatedYouTubeMovies
    .map((item) => ({
      item,
      score: relevance(
        query,
        item.title,
        [item.synopsis, item.cast.join(" "), item.channelName, String(item.year)].join(" "),
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.item.publishedAt.localeCompare(a.item.publishedAt))
    .slice(0, 8)
    .map((entry) => entry.item);

  return {
    serviceResults,
    jobResults,
    careerGuideResults,
    exploreResults,
    placeResults,
    movieResults,
    seriesResults,
    peopleResults,
    youtubeResults,
    totalShown:
      movieResults.length +
      seriesResults.length +
      peopleResults.length +
      youtubeResults.length +
      serviceResults.length +
      exploreResults.length +
      placeResults.length +
      jobResults.length +
      careerGuideResults.length,
  };
}
