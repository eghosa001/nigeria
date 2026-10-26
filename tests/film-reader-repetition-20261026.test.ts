import assert from "node:assert/strict";
import test from "node:test";
import { distinctLongEnoughEditorialProfiles } from "../lib/movie-editorial-profiles-long-enough-2026-10-15";
import { getAdditionalMovieCrewCredits, getVisibleMovieEditorial } from "../lib/movie-editorial-presentation";

test("2025 Royal Arts film keeps only non-repeated visitor findings", () => {
  const original = distinctLongEnoughEditorialProfiles["forever-isnt-long-enough-2025"];
  assert.equal(original.sections.length, 3, "source dossier remains intact for audits");
  assert.equal(original.questions.length, 3);
  const visible = getVisibleMovieEditorial("forever-isnt-long-enough-2025", original);
  assert.deepEqual(visible.sections.map(s => s.heading), [
    "Grace's estranged aunt",
    "Character credits still unconfirmed",
  ]);
  assert.equal(visible.questions.length, 0, "cast, identity and watch facts already appear in their own sections");
  const displayed = visible.sections.flatMap(s => s.paragraphs).join(" ");
  assert.match(displayed, /aunt who had also experienced rejection/);
  assert.match(displayed, /neither checked source conclusively assigns an actor/);
  assert.doesNotMatch(displayed, /Victory Michael|Prisma James|2026 movie Long Enough/);
});

test("other movie dossiers retain their individual editorial questions", () => {
  const profile = distinctLongEnoughEditorialProfiles["forever-isnt-long-enough-2025"];
  const visible = getVisibleMovieEditorial("unrelated-movie", profile);
  assert.equal(visible.sections.length, profile.sections.length);
  assert.equal(visible.questions.length, profile.questions.length);
});

test("same director is not printed twice, while distinct crew roles remain", () => {
  const crew = [
    { role: "Director", name: "Uche Alexmoore" },
    { role: "Director (Plex credit)", name: "Uche Alexmoore" },
    { role: "Producer", name: "Uche Alexmoore" },
    { role: "Co-director", name: "Another Person" },
  ];
  assert.deepEqual(getAdditionalMovieCrewCredits(["Uche Alexmoore"], crew), crew.slice(2));
  assert.deepEqual(getAdditionalMovieCrewCredits([], crew), crew);
});
