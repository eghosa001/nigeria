import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../app/jobs/[slug]/page.tsx", import.meta.url), "utf8");
const jobs = readFileSync(new URL("../lib/jobs.ts", import.meta.url), "utf8");

test("GSC-priority Jobs snippets remain concise and differentiate vacancy from career directory", () => {
  const map = page.split("const jobSeoOverrides: Record<string, { title: string; description: string }> = {")[1]?.split("\n};")[0];
  assert.ok(map);
  for (const slug of ["lagos-state-civil-service-careers", "nigerian-army-92rri-2026"]) {
    const block = map.match(new RegExp('"' + slug + '": \\{\\s*title: "([^"]+)",\\s*description: "([^"]+)"'));
    assert.ok(block, slug);
    assert.ok(block[1].length <= 58, slug + " title");
    assert.ok(block[2].length <= 155, slug + " description");
    assert.ok(jobs.includes('slug: "' + slug + '"'), slug + " is a real, canonical Jobs record");
  }
  assert.match(map, /Lagos.*Job Opportunities directory/);
  assert.match(map, /Army 92RRI.*application is free/);
  assert.match(page, /title: seoOverride\?\.title \?\? compactJobSnippet/);
});
