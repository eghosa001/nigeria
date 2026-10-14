import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";

const fromRepo = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("passport tracker links directly to the verified NIS tracking form", () => {
  const portal = fromRepo("lib/official-links.ts");
  const catalog = fromRepo("data/services.json");
  assert.match(portal, /"track\\.immigration\\.gov\\.ng"/);
  assert.match(catalog, /"slug": "passport-application-tracking"[\\s\\S]*?"officialPortal": "https:\\/\\/track\\.immigration\\.gov\\.ng\\/"/);
  assert.match(portal, /isTransactionPortal\\(service\\.officialPortal\\)/);
});

test("92RRI recruitment metadata fits the site title template", () => {
  const jobPage = fromRepo("app/jobs/[slug]/page.tsx");
  const heading = jobPage.match(/"nigerian-army-92rri-2026": \\{\\s*title: "([^"]+)"/)?.[1];
  assert.ok(heading);
  assert.ok((heading + " | MyNigeriaGuide").length <= 60);
  assert.match(heading, /Nigerian Army 92RRI 2026/);
});

test("movie hero images get priority without adding redundant accessible backdrops", () => {
  const component = fromRepo("components/entertainment-artwork.tsx");
  assert.equal(component.match(/fetchPriority=\\{variant === "hero" \\? "high" : "auto"\\}/g)?.length, 4);
  assert.equal(component.match(/alt=""\\s+aria-hidden="true"/g)?.length, 2);
});
