import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { canonicalGuidePath } from "../lib/seo-routes";

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === "admin" ? [] : sourceFiles(file);
    return file.endsWith(".tsx") ? [file] : [];
  });
}

test("public React navigation consistently goes through one-hop canonical NextLink", () => {
  const directLinkImports = [...sourceFiles("app"), ...sourceFiles("components")]
    .filter((file) => file !== "components/canonical-link.tsx" &&
      !file.startsWith("components/admin-") &&
      /import\s+Link\s+from\s+["']next\/link["']/.test(readFileSync(file, "utf8")));
  assert.deepEqual(directLinkImports, [],
    "Update public components to import '@/components/canonical-link' instead of 'next/link'");
});

test("legacy guide paths go direct without rewriting hubs, utilities or user query hashes", () => {
  const pairs = [
    ["/services/waec-check-result#steps", "/guides/services/waec-check-result#steps"],
    ["/explore/benin-city?view=map", "/guides/travel/benin-city?view=map"],
    ["/jobs/engineering", "/jobs/engineering"],
    ["/entertainment/movies/page/2", "/entertainment/movies/page/2"],
    ["/explore/events", "/explore/events"],
    ["https://portal.nysc.org.ng/", "https://portal.nysc.org.ng/"],
    ["#eligibility", "#eligibility"],
  ];
  for (const [source, expected] of pairs) {
    assert.equal(canonicalGuidePath(source), expected, source);
  }
});
