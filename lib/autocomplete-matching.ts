/**
 * Small, editorially vetted canonical-route suggestion set.
 * Do not add the whole content catalog to a client component: at scale,
 * published catalog search belongs behind an indexed, paginated server API.
 */
type SuggestedDestination = { label: string; aliases: string; pillar: string };

function normalise(value: string) {
  return value.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const questionWords = new Set(["how", "do", "does", "can", "i", "my", "the", "a", "an", "of", "to", "in", "for", "is", "are", "on", "with", "at"]);

export function matchCuratedSuggestions<T extends SuggestedDestination>(
  destinations: readonly T[],
  input: string,
  maxResults = 8,
): Array<T & { score: number }> {
  const query = normalise(input);
  const limit = Number.isFinite(maxResults) ? Math.max(0, Math.min(12, Math.floor(maxResults))) : 0;
  if (query.length < 2 || !limit) return [];

  // "cast of Sibe" and "how to check my BVN" should reach existing guides.
  // Retain all tokens if the query consists solely of question words.
  const words = query.split(/\s+/);
  const contentWords = words.filter((word) => !questionWords.has(word));
  const tokens = contentWords.length ? contentWords : words;
  const matches: Array<T & { score: number }> = [];
  for (const item of destinations) {
    const label = normalise(item.label);
    const aliases = normalise(item.aliases);
    const haystack = label + " " + aliases + " " + normalise(item.pillar);
    if (!tokens.every((token) => haystack.includes(token))) continue;

    const score =
      (label === query ? 120 : label.startsWith(query) ? 85 : label.includes(query) ? 65 : 0) +
      (aliases.includes(query) ? 45 : 0) +
      (tokens.every((token) => label.includes(token)) ? 30 : 0) +
      tokens.filter((token) => label.split(" ").includes(token)).length * 8 +
      10;

    // Keep the strongest eight without sorting or allocating a full catalog.
    const result = { ...item, score } as T & { score: number };
    let position = matches.findIndex((existing) =>
      score > existing.score || (score === existing.score && item.label.localeCompare(existing.label) < 0),
    );
    if (position < 0) position = matches.length;
    if (position < limit) matches.splice(position, 0, result);
    if (matches.length > limit) matches.pop();
  }
  return matches;
}
