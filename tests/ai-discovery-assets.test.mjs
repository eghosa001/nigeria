import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

test("AI search crawlers keep public access and private-path restrictions", () => {
  const robots = readFileSync("app/robots.ts", "utf8");
  for (const bot of ["OAI-SearchBot", "PerplexityBot", "Claude-SearchBot"]) {
    assert.ok(robots.includes(bot), bot + " is not declared");
  }
  assert.match(robots, /disallow:\s*restrictedPaths/g);
  assert.match(robots, /"\/admin", "\/api\/"/);
  assert.match(robots, /sitemap-index\.xml/);
});

test("AI navigation file references only established site sections", () => {
  const llms = readFileSync("public/llms.txt", "utf8");
  for (const path of ["/entertainment", "/services", "/explore", "/jobs", "/editorial-policy", "/corrections"]) {
    assert.ok(llms.includes("https://mynigeriaguide.com" + path), path);
  }
});
