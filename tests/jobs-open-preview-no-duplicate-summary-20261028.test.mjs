import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("Jobs homepage open preview does not repeat directory summaries", () => {
  const page = readFileSync("app/jobs/page.tsx", "utf8");
  const directory = readFileSync("components/jobs-directory.tsx", "utf8");
  const previewStart = page.indexOf("openPreview.map((item) => (");
  assert.ok(previewStart >= 0, "keep the open-now preview");
  const previewEnd = page.indexOf("</article>", previewStart);
  assert.ok(previewEnd > previewStart);
  const preview = page.slice(previewStart, previewEnd);
  assert.doesNotMatch(preview, /item\.summary/, "do not render the same descriptive paragraph twice on /jobs");
  assert.match(preview, /getEffectiveStatusLabel\(item\)/, "retain the application status");
  assert.match(preview, /item\.deadline/, "retain the closing date");
  assert.match(preview, /Requirements & apply/, "retain the action");
  assert.match(directory, /result\.items\.map/, "retain the full searchable directory");
  assert.match(directory, /<p>\{item\.summary\}<\/p>/, "retain the source-backed description once in the directory");
});
