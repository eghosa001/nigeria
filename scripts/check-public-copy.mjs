/**
 * Small, dependency-free copy regression. Checks public page and component source only:
 * policy/admin/SEO implementation is deliberately not part of the public-copy standard.
 * Precise phrases avoid false positives for legitimate terms such as NIN records.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const forbidden = [
  [/\b(?:this page remains noindex|marked noindex)\b/i, "SEO indexing controls exposed to readers"],
  [/\bindependent search indexing\b/i, "SEO workflow exposed to readers"],
  [/\bduplicate keyword pages\b/i, "Internal keyword strategy exposed to readers"],
  [/\bfresh crawl hub\b/i, "Crawler terminology exposed to readers"],
  [/\beight places appear initially\b/i, "Internal pagination detail exposed to readers"],
  [/\bYouTube API resolved\b/i, "Third-party API status exposed to readers"],
  [/\bcatalog(?:ue)?[\u2019']?s metadata review\b/i, "Internal metadata review exposed to readers"],
  [/\breport backend\b/i, "Reporting infrastructure exposed to readers"],
  [/\bpersistent reporting is configured\b/i, "Reporting infrastructure exposed to readers"],
  [/\bJobs catalog has at least\b/i, "Internal employer-hub eligibility exposed to readers"],
  [/\bmovie-to-publisher relationships\b/i, "Catalog implementation exposed to readers"],
  [/\brecords already checked deeply enough\b/i, "Internal review status exposed to readers"],
  [/\bsource, freshness and duplicate checks\b/i, "Editorial workflow exposed to readers"],
  [/\bverified career records\b/i, "Internal row-count terminology exposed to readers"],
  [/\bverified job, recruitment or career records\b/i, "Internal row-count terminology exposed to readers"],
  [/\bbatch selector\b/i, "Technical pagination terminology exposed to readers"],
  [/\bautomated source monitoring continues\b/i, "Internal monitoring exposed to readers"],
];

function sources(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (dir === "app" && entry.name === "admin") return [];
      return sources(path);
    }
    if (dir === "components" && entry.name.startsWith("admin-")) return [];
    return /\.(?:tsx|jsx)$/.test(entry.name) ? [path] : [];
  });
}

const failures = [];
for (const path of [...sources("app"), ...sources("components")]) {
  // Ignore standalone implementation comments; the reader never sees them.
  const source = readFileSync(path, "utf8").replace(/^\s*\/\/[^\n]*/gm, "");
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
