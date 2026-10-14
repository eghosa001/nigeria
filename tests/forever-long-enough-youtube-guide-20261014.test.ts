import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { youtubeEditorialDossiers } from "../lib/youtube-editorial-dossiers";

test("Forever Isn't Long Enough guide preserves original publisher and 2025 date", () => {
  const d=youtubeEditorialDossiers.y2RkBwUYSvo;
  assert.ok(d);
  assert.ok(d.heading.includes("2025"));
  assert.ok(d.paragraphs.join(" ").includes("19 December 2025"));
  assert.ok(d.paragraphs.join(" ").includes("estranged aunt"));
  assert.ok(d.castNotes.includes("Michael Dappa") && d.castNotes.includes("Inem King"));
  assert.ok(d.castNotes.includes("deliberately not inferred"));
  assert.ok(d.sources.some(x=>x.href==="https://www.youtube.com/watch?v=y2RkBwUYSvo"));
  assert.ok(d.sources.some(x=>x.href.includes("watch.plex.tv")));
  assert.ok(d.questions.length>=3);
});

test("video detail page presents dossier only for eligible movies with source links", () => {
  const page=readFileSync("app/entertainment/youtube/[videoId]/page.tsx","utf8");
  assert.match(page,/editorialDossier && indexable/);
  assert.match(page,/editorialDossier\.paragraphs\.map/);
  assert.match(page,/editorialDossier\.sources\.map/);
  assert.match(page,/Forever Isn't Long Enough \(2025\): Cast, Plot & Full Film/);
});
