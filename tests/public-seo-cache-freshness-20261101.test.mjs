import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The October 2026 crawler incident exposed long-lived vinext response-cache
// entries. Next.js client Cache-Control headers alone do not cap ISR storage.
const staticGuideRoutes = [
  ["app/services/[slug]/page.tsx", 3600],
  ["app/entertainment/movies/[slug]/page.tsx", 3600],
  ["app/entertainment/series/[slug]/page.tsx", 3600],
  ["app/explore/[slug]/page.tsx", 1800],
];

test("public static guides have bounded vinext ISR HTML lifetimes", () => {
  for (const [path, maximum] of staticGuideRoutes) {
    const source = readFileSync(new URL("../" + path, import.meta.url), "utf8");
    assert.match(source, /export const dynamic\s*=\s*"force-static"\s*;/, path);
    const match = source.match(/export const revalidate\s*=\s*(\d+)\s*;/);
    assert.ok(match, path + " must explicitly declare a revalidation interval");
    const seconds = Number(match[1]);
    assert.ok(seconds > 0 && seconds <= maximum, path + " has an unbounded or unexpectedly long ISR lifetime");
  }
});

test("deadline-sensitive Jobs details remain dynamic", () => {
  const source = readFileSync(new URL("../app/jobs/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(source, /export const dynamic\s*=\s*"force-dynamic"\s*;/);
});
