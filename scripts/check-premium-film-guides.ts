// Change-scoped SEO quality gate: Netflix-listed and featured movies must
// retain source-backed, non-generic editorial profiles as the catalog grows.
import { entertainmentTitles } from "../lib/entertainment";
import { allMovieEditorialProfiles, movieEditorialCollections } from "../lib/movie-editorial-profile-registry";

const duplicateSlugs = new Set<string>();
const seen = new Set<string>();
for (const collection of movieEditorialCollections) {
  for (const slug of Object.keys(collection)) {
    if (seen.has(slug)) duplicateSlugs.add(slug);
    seen.add(slug);
  }
}
if (duplicateSlugs.size) throw new Error("Duplicate movie editorial slugs: " + [...duplicateSlugs].join(", "));

function words(input: string) {
  return input.trim().split(/\s+/).filter(Boolean).length;
}

const required = entertainmentTitles.filter(
  (title) => title.featured || title.watchLinks.some((link) => link.platform === "Netflix"),
);
const failures: string[] = [];
let netflixCount = 0;
let featuredCount = 0;
for (const title of required) {
  const netflix = title.watchLinks.some((link) => link.platform === "Netflix");
  if (netflix) netflixCount++;
  if (title.featured) featuredCount++;

  const prefix = title.slug + ": ";
  const profile = allMovieEditorialProfiles[title.slug];
  if (!profile) {
    failures.push(prefix + "popular titles require a researched editorial profile.");
    continue;
  }

  if (profile.sections.length < 2) failures.push(prefix + "needs at least two distinct editorial sections.");
  const headings = profile.sections.map((section) => section.heading.trim().toLowerCase());
  if (new Set(headings).size !== headings.length) failures.push(prefix + "repeated editorial section headings.");
  if (profile.sections.some((section) => section.paragraphs.length < 2)) failures.push(prefix + "editorial sections must contain at least two substantive paragraphs.");
  const editorialWords = profile.sections.reduce(
    (total, section) => total + words(section.paragraphs.join(" ")),
    0,
  );
  if (editorialWords < 125) failures.push(prefix + "editorial guide is too thin: " + editorialWords + " words.");
  if (profile.questions.length < 2) failures.push(prefix + "needs two distinct film-specific answers.");
  if (new Set(profile.questions.map((q) => q.question.trim().toLowerCase())).size !== profile.questions.length)
    failures.push(prefix + "repeated film questions.");
  if (profile.questions.some((q) => words(q.answer) < 7)) failures.push(prefix + "answer requires a meaningful, factual response.");
  if (profile.releaseDate && (!/^\d{4}-\d{2}-\d{2}$/.test(profile.releaseDate) || profile.releaseDate > new Date().toISOString().slice(0, 10)))
    failures.push(prefix + "publication date is malformed or later than source check date.");
  for (const role of profile.roles) {
    const norm = (name: string) => name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]/g, "");
    const actor = norm(role.actor);
    if (!title.cast.some((person) => norm(person) === actor || norm(person).startsWith(actor) || actor.startsWith(norm(person)))) {
      failures.push(prefix + "actor-to-character assignment is not represented in the documented cast: " + role.actor);
    }
    if (!role.character.trim()) failures.push(prefix + "character name is missing for " + role.actor);
  }
}
if (failures.length) throw new Error("Premium movie editorial quality:\n" + failures.join("\n"));
console.log(
  "Premium movie guides OK:",
  required.length + " distinct priority movies",
  "(" + netflixCount + " Netflix-listed, " + featuredCount + " featured)",
  "have original editorial coverage.",
);
