import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../app/explore/[slug]/page.tsx", import.meta.url), "utf8");

test("Moonshot search result is a conference and includes high-intent details", () => {
  const title = 'Moonshot by TechCabal 2026: Dates & Venue';
  assert.match(page, /moonshot-techcabal-lagos-2026"\) return "Moonshot by TechCabal 2026: Dates & Venue"/);
  assert.ok((title + " | MyNigeriaGuide").length <= 60);
  assert.doesNotMatch(title, /festival/i);
});

test("Moonshot search description is accurate without truncating before the CTA", () => {
  const description = page.match(/"moonshot-techcabal-lagos-2026": "([^"]+)"(?=,)/)?.[1];
  assert.ok(description);
  assert.ok(description.length <= 155);
  assert.match(description, /28–29 October 2026.*National Theatre, Lagos/);
  assert.match(description, /tickets.*programme.*transport/i);
});
