import { entertainmentTitles } from "../lib/entertainment";
import { generatedYouTubeMovies } from "../lib/youtube-library";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

assert(entertainmentTitles.length > 0, "Entertainment catalog cannot be empty.");
assert(
  new Set(entertainmentTitles.map((title) => title.slug)).size === entertainmentTitles.length,
  "Entertainment slugs must be unique.",
);

for (const title of entertainmentTitles) {
  const prefix = title.slug + ": ";

  assert(title.title.trim().length > 1, prefix + "title is required.");
  assert(title.synopsis.trim().length >= 60, prefix + "synopsis must provide substantial original context.");
  assert(title.cast.length > 0, prefix + "cast evidence is required for curated movie pages.");
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
  assert(movie.title.trim().length > 1, prefix + "clean title is required.");
  assert(!/\p{Extended_Pictographic}/u.test(movie.title), prefix + "title must not expose decorative emoji.");
  assert(!/\p{Extended_Pictographic}/u.test(movie.synopsis), prefix + "synopsis must not expose promotional emoji.");
  assert(!youtubePresentationHype.test(movie.synopsis), prefix + "synopsis must not expose promotional publisher copy.");
  assert(!youtubeListingCopy.test(movie.synopsis), prefix + "synopsis must not expose raw listing metadata.");
  for (const name of movie.cast) {
    assert(!/^[a-z]\s*[-–—]\s*/i.test(name), prefix + "cast must not expose parser prefixes.");
    assert(!/\b(movie|film|youtube|channel|subscribe|20\d{2})\b/i.test(name), prefix + "cast contains non-person metadata.");
  }
}

console.log(
  "Entertainment content OK:",
  entertainmentTitles.length + " curated titles meet the publication evidence gate.",
);
