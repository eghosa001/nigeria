import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const jobsHub = readFileSync(new URL("../app/jobs/page.tsx", import.meta.url), "utf8");

test("Jobs hub treats Founder Dojo's 19 October first-consideration deadline as past", () => {
  assert.match(jobsHub, /Deadline rechecked on the organiser’s official page 28 October 2026/);
  assert.match(jobsHub, /has passed its 19 October first-consideration date/);
  assert.match(jobsHub, /still lists 2 November 2026 as the final deadline/);
  assert.match(jobsHub, /confirm that submissions remain accepted before applying/);
  assert.match(jobsHub, /not<\/strong> salaried employment/);
  assert.doesNotMatch(jobsHub, /Apply by 19 October for first consideration/);
  assert.equal((jobsHub.match(/founder-dojo-imo-cohort-two-2026/g) ?? []).length, 1, "reuse the existing canonical job guide");
});

test("Jobs open-now preview does not repeat descriptions already in the directory", () => {
  const directory = readFileSync(new URL("../components/jobs-directory.tsx", import.meta.url), "utf8");
  const previewStart = jobsHub.indexOf("openPreview.map((item) => (");
  assert.ok(previewStart >= 0, "keep the open-now preview");
  const previewEnd = jobsHub.indexOf("</article>", previewStart);
  assert.ok(previewEnd > previewStart);
  const preview = jobsHub.slice(previewStart, previewEnd);
  assert.doesNotMatch(preview, /item\.summary/, "avoid a duplicate summary paragraph on the same page");
  assert.match(preview, /getEffectiveStatusLabel\(item\)/, "retain effective application status");
  assert.match(preview, /item\.deadline/, "retain closing dates");
  assert.match(preview, /Requirements & apply/, "retain the application link");
  assert.match(directory, /<p>\{item\.summary\}<\/p>/, "keep source-backed descriptions in the directory");
});
