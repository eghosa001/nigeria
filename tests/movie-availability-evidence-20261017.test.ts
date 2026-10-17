import test from "node:test";
import assert from "node:assert/strict";
import { getEntertainmentTitle } from "../lib/entertainment";
import { documentedMovieAvailabilityVerdict } from "../lib/movie-availability-evidence-2026-10-17";

test("two exact-title verifiable negative/future outcomes resolve only matching flags", () => {
  for (const slug of ["colours-of-fire", "no-fury-2024"]) {
    const film = getEntertainmentTitle(slug);
    assert.ok(film, slug);
    assert.equal(film.watchLinks.length, 0);
    const verdict = documentedMovieAvailabilityVerdict(film, "2026-10-17");
    assert.ok(verdict, slug + ": original issuer evidence missing");
    assert.equal(verdict.evidence.length, 2);
    assert.ok(verdict.evidence.every(link=>film.references?.some(s=>s.href===link.href && s.lastChecked==="2026-10-17")));
    assert.equal(documentedMovieAvailabilityVerdict({...film,references:[]}, "2026-10-17"), undefined);
    assert.equal(documentedMovieAvailabilityVerdict({...film,watchLinks:[{} as typeof film.watchLinks[number]]}, "2026-10-17"), undefined);
    assert.equal(documentedMovieAvailabilityVerdict(film, "2026-11-10"), undefined);
  }
  const noFury=getEntertainmentTitle("no-fury-2024");
  assert.ok(noFury);
  assert.equal(documentedMovieAvailabilityVerdict(noFury, "2026-10-23"),undefined,
    "Future cinema evidence must stop clearing after release day");
  const remaining=getEntertainmentTitle("long-enough-2026");
  assert.ok(remaining);
  assert.equal(documentedMovieAvailabilityVerdict(remaining,"2026-10-17"),undefined);
});
