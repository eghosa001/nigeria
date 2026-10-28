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
