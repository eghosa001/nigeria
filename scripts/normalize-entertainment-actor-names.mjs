import fs from "node:fs";

const path = "data/youtube-movies.generated.json";
const generated = JSON.parse(fs.readFileSync(path, "utf8"));

function key(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ").toLowerCase();
}

function isMixedCase(value) {
  return /[A-Z]/.test(value) && /[a-z]/.test(value);
}

const variants = new Map();
for (const movie of generated.movies ?? []) {
  for (const raw of movie.cast ?? []) {
    const name = String(raw).trim().replace(/\s+/g, " ");
    const k = key(name);
    if (!k) continue;
    if (!variants.has(k)) variants.set(k, new Map());
    const counts = variants.get(k);
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
}

const canonical = new Map();
for (const [k, counts] of variants) {
  const ranked = [...counts.entries()].sort((a, b) => {
    const mixedA = isMixedCase(a[0]) ? 1 : 0;
    const mixedB = isMixedCase(b[0]) ? 1 : 0;
    if (mixedA !== mixedB) return mixedB - mixedA;
    if (a[1] !== b[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0]);
  });
  canonical.set(k, ranked[0][0]);
}

let changedMovies = 0;
let changedNames = 0;

for (const movie of generated.movies ?? []) {
  const before = JSON.stringify(movie.cast ?? []);
  const seen = new Set();
  const cast = [];

  for (const raw of movie.cast ?? []) {
    const k = key(raw);
    if (!k || seen.has(k)) continue;
    seen.add(k);
    const name = canonical.get(k) ?? String(raw).trim();
    if (name !== raw) changedNames++;
    cast.push(name);
  }

  movie.cast = cast;
  movie.featuredCast = cast.slice(0, 3);

  if (JSON.stringify(cast) !== before) changedMovies++;
}

fs.writeFileSync(path, JSON.stringify(generated, null, 2) + "\n");
console.log(
  "Normalized actor casing in",
  changedMovies,
  "movies;",
  changedNames,
  "cast entries changed;",
  canonical.size,
  "case-insensitive actor keys retained.",
);
