import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";

test("public robots.txt is a static asset with private-path exclusions and three sitemap feeds", () => {
  assert.equal(existsSync("app/robots.ts"), false, "No runtime metadata route may shadow the static crawler asset");
  const robots = readFileSync("public/robots.txt", "utf8");
  const groups = robots.split(/\n\s*\n/).filter((group) => /User-agent:/i.test(group));
  const expectedAgents = ["*", "OAI-SearchBot", "PerplexityBot", "Claude-SearchBot", "Claude-User"];
  assert.equal(groups.length, expectedAgents.length);
  for (let index = 0; index < expectedAgents.length; index++) {
    assert.match(groups[index], new RegExp("User-agent: " + expectedAgents[index].replace("*", "\\*"), "i"));
    assert.match(groups[index], /Allow: \/(?:\n|$)/);
    assert.match(groups[index], /Disallow: \/admin/);
    assert.match(groups[index], /Disallow: \/api\//);
  }
  for (const feed of ["sitemap-index.xml", "recent-pages.xml", "video-sitemap.xml"]) {
    assert.ok(robots.includes("Sitemap: https://mynigeriaguide.com/" + feed), feed);
  }
  assert.equal(robots.endsWith("\n"), true);
});

test("AI navigation file references only established site sections", () => {
  const llms = readFileSync("public/llms.txt", "utf8");
  for (const path of ["/entertainment", "/services", "/explore", "/jobs", "/editorial-policy", "/corrections"]) {
    assert.ok(llms.includes("https://mynigeriaguide.com" + path), path);
  }
});
