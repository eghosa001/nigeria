import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";

const fromRepo = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("passport tracker links directly to the verified NIS form", () => {
  const portal = fromRepo("lib/official-links.ts");
  const catalog = fromRepo("data/services.json");
  assert.ok(portal.includes('"track.immigration.gov.ng"'));
  assert.ok(catalog.includes('"slug": "passport-application-tracking"'));
  assert.ok(catalog.includes('"officialPortal": "https://track.immigration.gov.ng/"'));
  assert.ok(portal.includes("isTransactionPortal(service.officialPortal)"));
});

test("Army recruitment title fits the shared site title suffix", () => {
  const jobPage = fromRepo("app/jobs/[slug]/page.tsx");
  const heading = jobPage.split('"nigerian-army-92rri-2026": {')[1]?.split('title: "')[1]?.split('"')[0];
  assert.ok(heading);
  assert.ok((heading + " | MyNigeriaGuide").length <= 60);
  assert.ok(heading.includes("Nigerian Army 92RRI 2026"));
});

test("only descriptive movie heroes get high priority; backdrops remain decorative", () => {
  const component = fromRepo("components/entertainment-artwork.tsx");
  const priority = 'fetchPriority={variant === "hero" ? "high" : "auto"}';
  assert.equal(component.split(priority).length - 1, 4);
  assert.equal(component.split('alt=""').length - 1, 2);
});

