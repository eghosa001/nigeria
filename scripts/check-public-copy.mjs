/**
 * Small, dependency-free copy regression. Checks public page and component source only:
 * policy/admin/SEO implementation is deliberately not part of the public-copy standard.
 * Precise phrases avoid false positives for legitimate terms such as NIN records.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const forbidden = [
  [/noindex/i, "SEO indexing controls exposed to readers"],
  [/independent search indexing/i, "SEO workflow exposed to readers"],
  [/duplicate keyword pages/i, "Internal keyword strategy exposed to readers"],
  [/YouTube API resolved/i, "Third-party API status exposed to readers"],
  [/catalog(?:ue)?[\u2019']?s metadata review/i, "Internal metadata review exposed to readers"],
  [/report backend/i, "Reporting infrastructure exposed to readers"],
  [/persistent reporting is configured/i, "Reporting infrastructure exposed to readers"],
  [/Jobs catalog has at least/i, "Internal employer-hub eligibility exposed to readers"],
  [/movie-to-publisher relationships/i, "Catalog implementation exposed to readers"],
  [/records already checked deeply enough/i, "Internal review status exposed to readers"],
  [/source, freshness and duplicate checks/i, "Editorial workflow exposed to readers"],
  [/verified career records/i, "Internal row-count terminology exposed to readers"],
  [/verified job, recruitment or career records/i, "Internal row-count terminology exposed to readers"],
  [/batch selector/i, "Technical pagination terminology exposed to readers"],
  [/automated source monitoring continues/i, "Internal monitoring exposed to readers"],
];

function sources(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (dir === "app" && entry.name === "admin") return [];
      return sources(path);
    }
    return /\.(?:tsx|jsx)$/.test(entry.name) ? [path] : [];
  });
}

const failures = [];
for (const path of [...sources("app"), ...sources("components")]) {
  const source = readFileSync(path, "utf8");
  for (const [pattern, issue] of forbidden) {
    const match = source.match(pattern);
    if (match?.index !== undefined) {
      const line = source.slice(0, match.index).split("\n").length;
      failures.push(path + ":" + line + " — " + issue);
    }
  }
}

if (failures.length) {
  console.error("Public copy boundary violations:\n" + failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Reader-facing copy boundary passed.");
}
