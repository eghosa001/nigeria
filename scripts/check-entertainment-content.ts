import { entertainmentTitles } from "../lib/entertainment";
import { entertainmentPeople, personEditorialProfiles, hasIndexablePersonEditorial } from "../lib/entertainment-extras";
import { youtubeEditorialDossiers } from "../lib/youtube-editorial-dossiers";
import { discoverableYouTubeMovies, hasSubstantiveYouTubeSynopsis, indexableYouTubeMovies, isIndexableYouTubeMovie, generatedYouTubeMovies, getYouTubeMovieById } from "../lib/youtube-library";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

// A linked movie article is not, by itself, evidence for an individual's
// biography. The three dossiers below were researched against individually
// identified interviews, cultural institutions and distributors.
const independentlyResearchedPeople = ["femi-adebayo", "kunle-afolayan", "timini-egbuson"];
for (const slug of independentlyResearchedPeople) {
  const dossier = personEditorialProfiles[slug];
  assert(Boolean(dossier) && hasIndexablePersonEditorial(slug),
    slug + " requires substantial original author commentary, per-section source references and three independent domains.");
  assert(dossier.sections.every(section => section.sources.length > 0),
    slug + " missing citation mapping for a biography section.");
  const citations = new Set(dossier.sections.flatMap(section => section.sources));
  assert(citations.size >= 2, slug + " needs independently verifiable career history.");
  const phrases = dossier.sections.flatMap(section => section.paragraphs);
  assert(new Set(phrases).size === phrases.length, slug + " contains repeated biography paragraphs.");
}
// Profiles beyond the researched set remain in the people directory for
// navigation, but are deliberately noindex and absent from XML sitemaps.
for (const person of entertainmentPeople) {
  assert(hasIndexablePersonEditorial(person.slug) === independentlyResearchedPeople.includes(person.slug),
    person.slug + " must not become indexable merely by inheriting a linked movie's source.");
}

assert(entertainmentTitles.length > 0, "Entertainment catalog cannot be empty.");
assert(
  new Set(entertainmentTitles.map((title) => title.slug)).size === entertainmentTitles.length,
  "Entertainment slugs must be unique.",
);

for (const title of entertainmentTitles) {
  const prefix = title.slug + ": ";

  assert(title.title.trim().length > 1, prefix + "title is required.");
  assert(title.synopsis.trim().length >= 60, prefix + "synopsis must provide substantial original context.");
  // Documentaries can be sourced through identified real-world subjects;
  // demanding actors would encourage mislabelled historical figures.
  assert(
    title.cast.length > 0 || (title.genres.includes("Documentary") && Boolean(title.subjects?.length)),
    prefix + "cast evidence or documentary subject evidence is required for curated movie pages.",
  );
  assert(title.genres.length > 0, prefix + "at least one genre is required.");
  assert(title.languages.length > 0, prefix + "at least one language is required.");

  const references = title.references ?? [];
  const hasEvidence =
    title.watchLinks.length > 0 ||
    Boolean(title.trailer) ||
    Boolean(title.sourcePreview) ||
    Boolean(title.artwork) ||
    references.length > 0;

  assert(
    hasEvidence,
    prefix + "must have a verifiable watch, trailer, promotional-source, artwork-rights or reference route before publication.",
  );

  for (const link of title.watchLinks) {
    assert(link.href.startsWith("https://"), prefix + "watch link must use HTTPS.");
    assert(isoDate.test(link.lastChecked), prefix + "watch link needs an ISO lastChecked date.");
    assert(link.note.trim().length > 15, prefix + "watch link must explain current availability.");
  }

  if (title.trailer) {
    assert(title.trailer.href.startsWith("https://"), prefix + "trailer must use HTTPS.");
    assert(isoDate.test(title.trailer.lastChecked), prefix + "trailer needs an ISO lastChecked date.");
  }

  if (title.sourcePreview) {
    assert(title.sourcePreview.url.startsWith("https://"), prefix + "source preview image must use HTTPS.");
    assert(title.sourcePreview.sourceUrl.startsWith("https://"), prefix + "source preview page must use HTTPS.");
    assert(isoDate.test(title.sourcePreview.lastChecked), prefix + "source preview needs an ISO lastChecked date.");
  }

  if (title.artwork) {
    assert(title.artwork.url.startsWith("https://"), prefix + "approved artwork must use HTTPS.");
    assert(title.artwork.sourceUrl.startsWith("https://"), prefix + "artwork rights source must use HTTPS.");
    assert(isoDate.test(title.artwork.lastChecked), prefix + "approved artwork needs an ISO lastChecked date.");
  }

  for (const reference of references) {
    assert(reference.href.startsWith("https://"), prefix + "verification reference must use HTTPS.");
    assert(isoDate.test(reference.lastChecked), prefix + "verification reference needs an ISO lastChecked date.");
    assert(reference.label.trim().length > 4, prefix + "verification reference needs a useful label.");
  }

  if (title.watchLinks.length === 0) {
    assert(
      references.length > 0 || Boolean(title.trailer) || Boolean(title.sourcePreview),
      prefix + "a title without a current watch link needs visible evidence that verifies the record without implying availability.",
    );
  }
}


const youtubePresentationHype = /\b(captivating|blockbuster|ultimate|unmissable|must[- ]watch|will make your day|will blow your mind|edge of your seat|don['’]?t miss|do not miss|watch now|subscribe|like and share|filled with|latest nigerian movies?)\b/i;
const youtubeListingCopy = /\b(full movie|complete movie|official full movie|latest full movies?|nollywood movies? 20\d{2}|nigerian movies? 20\d{2})\b/i;

for (const movie of generatedYouTubeMovies) {
  const prefix = "YouTube " + movie.videoId + ": ";
  const neutralFallback = movie.synopsis.includes(" is a full-length Nigerian film published by ");

  assert(movie.title.trim().length > 1, prefix + "clean title is required.");
  assert(!/\p{Extended_Pictographic}/u.test(movie.title), prefix + "title must not expose decorative emoji.");
  assert(!youtubeListingCopy.test(movie.title), prefix + "title must not expose raw listing metadata.");

  if (!neutralFallback) {
    assert(!/\p{Extended_Pictographic}/u.test(movie.synopsis), prefix + "synopsis must not expose promotional emoji.");
    assert(!youtubePresentationHype.test(movie.synopsis), prefix + "synopsis must not expose promotional publisher copy.");
    assert(!youtubeListingCopy.test(movie.synopsis), prefix + "synopsis must not expose raw listing metadata.");
  }

  for (const name of movie.cast) {
    assert(!/^[a-z]\s*[-–—]\s*/i.test(name), prefix + "cast must not expose parser prefixes.");
    assert(!/\b(movie|film|youtube|channel|subscribe|20\d{2})\b/i.test(name), prefix + "cast contains non-person metadata.");
  }
}

// Previously reported short story summaries have individually sourced,
// film-specific context now. Guard against replacing them with generic blurbs.
const reviewedStorySlugs = [
  "oloture", "plus-one", "swallow", "citation", "elesin-oba",
  "chief-daddy", "chief-daddy-2", "king-of-boys", "merry-men-3",
  "hijack-93", "afamefuna", "amina", "the-long-way-home", "monica-2",
  "just-before-forever", "benevolence", "ajosepo-the-gathering",
  "love-in-a-pandemic", "ijakumo", "a-place-with-you",
];
for (const slug of reviewedStorySlugs) {
  const film = entertainmentTitles.find((item) => item.slug === slug);
  assert(Boolean(film), slug + ": editorial film profile must remain available.");
  const storyWords = film!.synopsis.trim().split(/\s+/).length;
  assert(storyWords >= 70, slug + ": a verified film-specific story guide must not regress to one-sentence boilerplate.");
}
for (const slug of ["plus-one", "the-long-way-home", "monica-2", "just-before-forever", "a-place-with-you"]) {
  const film = entertainmentTitles.find((item) => item.slug === slug);
  assert((film?.references?.length ?? 0) > 0,
    slug + ": preserve independent film-specific evidence for published story context.");
}

// The Netflix Nigeria title page explicitly reports regional unavailability.
// Preserve the film record and its evidence, but do not advertise playback.
const unavailableColoursOfFire = entertainmentTitles.find((movie) => movie.slug === "colours-of-fire");
assert(unavailableColoursOfFire?.watchLinks.length === 0 &&
  unavailableColoursOfFire.references?.some((reference) =>
    reference.href === "https://www.netflix.com/ng/title/82752912" &&
    /unavailable/i.test(reference.note ?? "")),
  "Colours of Fire must not advertise Netflix Nigeria playback while the official page says unavailable.");

const officialLoveRelease = entertainmentTitles.find((movie) => movie.slug === "love-looks-good-on-you-2026");
assert(officialLoveRelease?.watchLinks.some((link) => link.platform === "YouTube" &&
  link.access === "full-movie" && link.href === "https://www.youtube.com/watch?v=tCa7-acZ9uM"),
  "Reviewed Love Looks Good on You page must point to the publisher upload.");
assert(getYouTubeMovieById("tCa7-acZ9uM")?.source === "curated",
  "Official YouTube release must resolve to the researched movie canonical, not a competing autogenerated page.");

assert(!hasSubstantiveYouTubeSynopsis({ synopsis: "Sample is a full-length Nigerian film published by Sample TV. Featured cast includes One Two." }), "Publisher/cast boilerplate must never qualify as substantive plot.");
assert(hasSubstantiveYouTubeSynopsis({ synopsis: "A young designer returns to her hometown after her father's sudden disappearance and discovers conflicting family histories. The confrontation forces a difficult choice between protecting her siblings and telling the truth." }), "Substantive story context should remain SEO-eligible.");
assert(indexableYouTubeMovies.every((movie) => hasSubstantiveYouTubeSynopsis(movie)), "Only substantive YouTube profiles may be indexed.");
assert(indexableYouTubeMovies.every((movie) => movie.source === "curated" || Boolean(youtubeEditorialDossiers[movie.videoId])), "Standalone indexable YouTube pages must have an individually authored editorial dossier.");
assert(discoverableYouTubeMovies.some((movie) => movie.source === "youtube-api" && !isIndexableYouTubeMovie(movie)), "Unreviewed YouTube films must remain discoverable but not indexable.");
assert(discoverableYouTubeMovies.every((movie) => hasSubstantiveYouTubeSynopsis(movie) || !isIndexableYouTubeMovie(movie)), "Thin movie listings must remain discoverable but noindexed.");

console.log(
  "Entertainment content OK:",
  entertainmentTitles.length + " curated titles meet the publication evidence gate.",
);


// Film-specific 2026 director corrections must not drift onto similarly titled releases.
const verifiedDirectorEvidence = [
  ["irreplaceable", "Modupe Fakorede", "tt33341685"],
  ["pieces-that-fit", "Magnifique Ecrivaine", "/movies/pieces-that-fit"],
  ["lisabi-the-uprising", "Niyi Akinmolayan", "tt33255000"],
  ["all-things-equal", "Omoruyi Efosa Emmanuel", "/movies/all-things-equal"],
  ["monica", "Omoruyi Efosa Emmanuel", "tt40923799"],
  ["my-housemate", "Great Valentine Edochie", "/movies/my-housemate"],
  ["forever-found", "Uche Alexmoore", "/movies/forever-found"],
  ["sister-agatha", "Tobe Nosike", "/movies/sister-agatha"],
] as const;
for (const [slug, director, sourceFragment] of verifiedDirectorEvidence) {
  const film = entertainmentTitles.find((item) => item.slug === slug);
  assert(film?.directors?.includes(director), slug + ": expected source-backed director missing.");
  assert(film.references?.some((ref) => ref.href.includes(sourceFragment)),
    slug + ": exact film-credit reference missing.");
}
