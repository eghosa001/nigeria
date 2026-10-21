import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("homepage keeps all four pillar navigation links but avoids bulk auto-prefetch", () => {
  const homepage = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(homepage, /<nav className="home-paths" aria-label="Start with MyNigeriaGuide">/);

  const pillars = [
    ["/entertainment/movies", "home-path-movies"],
    ["/services", "home-path-services"],
    ["/explore", "home-path-tour"],
    ["/jobs", "home-path-jobs"],
  ];
  for (const [path, section] of pillars) {
    const link = `<Link href="${path}" prefetch={false} className="home-path ${section}">`;
    assert.ok(homepage.includes(link), "Home must keep clickable " + path + " without speculative route fetches");
  }
  assert.equal((homepage.match(/prefetch=\\{false\\} className="home-path /g) ?? []).length, 4);
});
