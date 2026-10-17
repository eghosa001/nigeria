import assert from "node:assert/strict";
import test from "node:test";
import { getMovieEditorialProfile } from "../lib/movie-editorial-profile-registry";
import { getEntertainmentTitle } from "../lib/entertainment";

const reviewed = [
  { slug: "the-long-way-home", directors: ["Reuben Reng", "Uche Montana"], words: ["pregnancy", "betrayal", "4 July"] },
  { slug: "the-merger", directors: ["Best Okoduwa"], roles: [["Uche Montana", "Natalie"], ["Timini Egbuson", "Theo"]], words: ["merger", "negotiat", "professional"] },
  { slug: "just-before-forever", directors: ["Omoruyi Efosa Emmanuel"], words: ["11 August", "FilmFlux", "Maurice Sam TV"] },
  { slug: "monica", directors: ["Omoruyi Efosa Emmanuel"], roles: [["Uche Montana", "Monica"], ["John Tyler Ekanem", "Pascal"]], words: ["IMDb", "Monica 2", "Karyn Udeh"] },
  { slug: "forever-found", directors: ["Uche Alexmoore"], roles: [["Chinenye Nnebe", "Lilian"], ["John Ekanem", "Adewale"]], words: ["Lilian", "Adewale", "Nollywood.com"] },
  { slug: "all-things-equal", directors: ["Omoruyi Efosa Emmanuel"], roles: [["Sarian Martin", "Christy"], ["Daniel Etim Effiong", "Jude"]], words: ["financial", "marriage", "Nollywood.com"] },
] as const;

test("six original movie guides reconcile current sourced credit records with the visible prose", () => {
  for (const item of reviewed) {
    const movie = getEntertainmentTitle(item.slug);
    const dossier = getMovieEditorialProfile(item.slug);
    assert.ok(movie, item.slug + ": existing canonical film must exist");
    assert.ok(dossier, item.slug + ": existing researched dossier must render");
    assert.ok(movie.references && movie.references.length > 0,
      item.slug + ": production attribution requires film-specific evidence links");
    const fullText = dossier.sections.flatMap(s => s.paragraphs).join(" ");
    for (const director of item.directors) {
      assert.ok(movie.directors?.some(name => name === director),
        item.slug + ": credited film director must match source-checked canonical movie");
      assert.ok(fullText.includes(director),
        item.slug + ": prose must not claim director unknown while canonical credits name one");
    }
    for (const word of item.words) {
      assert.ok(fullText.toLowerCase().includes(word.toLowerCase()),
        item.slug + ": missing distinctive topic " + word);
    }
    assert.doesNotMatch(fullText,
      /(?:no verified director|director.{0,25}not independently established|no title-specific evidence to claim a director|no confirmed director|not establish.{0,25}director|character names and director have not)/i,
      item.slug + ": outdated denial of now-attributed production credit");
    for (const [actor, character] of ("roles" in item ? item.roles : [])) {
      assert.ok(dossier.roles.some(role => role.actor === actor && role.character === character),
        item.slug + ": keep film-specific corroborated roles, not guesses");
    }
  }
});

test("The Merger must not describe its documented corporate-merger premise as unverified", () => {
  const text = getMovieEditorialProfile("the-merger")!.sections
    .flatMap(section => section.paragraphs).join(" ");
  assert.doesNotMatch(text, /does not support asserting a specific corporate acquisition|not a documented corporate merger/i);
  assert.match(text, /Theo|Theophilus/);
  assert.match(text, /Natalie/);
});
