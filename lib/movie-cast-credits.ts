/**
 * A "featured" credit is a selection of the film's cast, not a separate
 * category of people. Character assignments are tracked independently.
 *
 * Do not infer cast from documentary subjects, directors, an uploader's name,
 * unverified title keywords, or the page's SEO/indexing status.
 */
export function documentedMovieCast(movie: { cast: readonly string[]; featuredCast?: readonly string[] }): string[] {
  const names: string[] = [];
  const normalize = (value: string) => value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en");
  const samePerson = (left: string, right: string) =>
    left === right || left.startsWith(right + "-") || right.startsWith(left + "-");

  for (const raw of [...movie.cast, ...(movie.featuredCast ?? [])]) {
    const name = raw.trim().replace(/\s+/g, " ");
    if (!name) continue;
    const key = normalize(name);
    if (!names.some(existing => samePerson(normalize(existing), key))) names.push(name);
  }
  return names;
}

export function leadMovieCast(movie: { cast: readonly string[]; featuredCast?: readonly string[] }, max = 3): string[] {
  const all = documentedMovieCast(movie);
  const featured = (movie.featuredCast ?? []).filter(name =>
    all.some(actor => actor.trim().toLocaleLowerCase("en") === name.trim().toLocaleLowerCase("en")
      || actor.trim().toLocaleLowerCase("en").startsWith(name.trim().toLocaleLowerCase("en") + "-")
      || name.trim().toLocaleLowerCase("en").startsWith(actor.trim().toLocaleLowerCase("en") + "-"))
  );
  const ordered = [...featured, ...all];
  const names: string[] = [];
  for (const value of ordered) {
    const normalized = value.trim().toLocaleLowerCase("en");
    if (!normalized) continue;
    const preferred = all.find(actor => actor.trim().toLocaleLowerCase("en") === normalized
      || actor.trim().toLocaleLowerCase("en").startsWith(normalized + "-")
      || normalized.startsWith(actor.trim().toLocaleLowerCase("en") + "-")) ?? value;
    if (!names.some(existing => existing.toLocaleLowerCase("en") === preferred.toLocaleLowerCase("en"))) names.push(preferred);
    if (names.length >= max) break;
  }
  return names;
}
