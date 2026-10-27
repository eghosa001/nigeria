import test from "node:test";
import assert from "node:assert/strict";
import { publicServices } from "../lib/data";

test("NECO timetable keeps one dated registration warning, not two copies", () => {
  const guide = publicServices.find((service) => service.slug === "neco-2026-timetable");
  assert.ok(guide, "Existing canonical timetable guide must remain present");
  const datedWarnings = guide.notes.filter(
    (note) => note.includes("26 October 2026") && note.includes("₦5,000"),
  );
  assert.equal(datedWarnings.length, 1, "Do not repeat the same late-fee explanation across editorial layers");
  assert.match(datedWarnings[0], /registration deadline|normal registration/i);
  assert.match(datedWarnings[0], /not the exam's timetable end date/i);
  assert.ok(
    guide.notes.some((note) => /subject paper, time, centre arrangements/.test(note)),
    "Keep the practical subject-level timetable decision",
  );
  assert.equal(guide.lastVerified, "2026-10-17", "Do not invent a new source-review date");
  assert.ok(guide.sources.some((source) =>
    source.url === "https://ssceexternal.neco.gov.ng/" && source.lastChecked === "2026-10-17"
  ));
});
