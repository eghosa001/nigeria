import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("ambiguous CAC registration search has one concise choice hub", () => {
  const hubs = readFileSync(new URL("../lib/growth-hubs.ts", import.meta.url), "utf8");
  const page = readFileSync(new URL("../app/topics/[slug]/page.tsx", import.meta.url), "utf8");
  const title = hubs.match(/slug: "cac-business",\s*title: "([^"]+)"/)?.[1];
  assert.ok(title && title.length <= 60 && /Business Name or Company/.test(title));
  for (const slug of ["cac-business-name-registration", "cac-company-registration", "cac-public-search"])
    assert.match(page, new RegExp('href="/services/' + slug + '"'));
  assert.match(page, /aria-label="Choose a CAC registration type"/);
});
