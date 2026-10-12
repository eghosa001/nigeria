/**
 * Keep ordinary film-intent suffixes from hiding an exact title in search.
 * A title (or a single-word search like "Cast") is never reduced to empty.
 * This is for matching, not for generating keyword-variant pages.
 */
const intentSuffixes = [
  /\s+cast\s+and\s+where\s+to\s+watch$/i,
  /\s+(?:full\s+)?cast(?:\s+and\s+crew)?$/i,
  /\s+where\s+to\s+watch$/i,
  /\s+(?:nigerian|nollywood)\s+movies?$/i,
  // Strip "the movie" before the generic "movie" suffix; otherwise
  // "Sibe the movie cast" wrongly normalizes to "Sibe the".
  /\s+the\s+movie$/i,
  /\s+(?:full\s+)?movies?$/i,
  /\s+(?:actors?|streaming)$/i,
];

export function movieSearchCore(query: string): string {
  const original = query.replace(/\s+/g, " ").trim();
  const withoutQuestionPrefix = original
    .replace(/^where\s+to\s+watch\s+/i, "")
    .replace(/^cast\s+of\s+/i, "");
  let current = withoutQuestionPrefix.trim() || original;

  // A search may end in more than one intent, e.g. "film cast Nigerian movie".
  for (let pass = 0; pass < 3; pass++) {
    const before = current;
    for (const pattern of intentSuffixes) {
      const candidate = current.replace(pattern, "").trim();
      if (candidate) current = candidate;
    }
    if (current === before) break;
  }
  return current;
}
