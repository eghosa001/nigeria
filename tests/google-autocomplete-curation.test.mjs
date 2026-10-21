import assert from "node:assert/strict";
import test from "node:test";
import { classifySuggestion, curate } from "../tools/google-autocomplete-curation.mjs";

test("remove obvious foreign-location crossovers without suppressing local planning phrases", () => {
  assert.equal(classifySuggestion("places to visit in calabarzon").status, "exclude");
  assert.equal(classifySuggestion("how to replace a pvc pipe").status, "exclude");
  assert.equal(classifySuggestion("tourist attractions in calabar nigeria").status, "candidate");
  assert.equal(classifySuggestion("nigerian passport appointment in london").status, "candidate");
});

test("old-date, unverifiable availability and thin ambiguous searches go to review", () => {
  assert.equal(classifySuggestion("best nollywood movies 2025").status, "review");
  assert.equal(classifySuggestion("how to check WAEC result without scratch card").status, "review");
  assert.equal(classifySuggestion("nigerian passport renewal requirements").status, "candidate");
});

test("only observed Google Suggest output becomes a unique candidate, never its raw seed", () => {
  const c = curate({
    rows: [
      { pillar: "services", seed: "nysc registration", suggestions: ["NYSC registration requirements", "   NYSC   registration requirements  "] },
      { pillar: "services", seed: "nysc call up letter", suggestions: ["NYSC registration requirements", "NYSC call up letter printing"] },
      { pillar: "tour", seed: "places to visit in calabar", suggestions: ["places to visit in calabarzon"] },
    ],
  });
  assert.equal(c.length, 3);
  assert.equal(c.filter((x) => x.status === "candidate").length, 2);
  assert.equal(c.find((x) => x.query === "nysc registration requirements").seeds, "nysc call up letter | nysc registration");
  assert.equal(c.find((x) => x.query === "places to visit in calabarzon").status, "exclude");
});

test("suggest existing canonical pages only when a same-pillar GSC anchor is observed", async () => {
  const { suggestExistingPage } = await import("../tools/google-autocomplete-curation.mjs");
  const lookup = (pillar, query, status = "candidate") => suggestExistingPage({ pillar, query, status });
  assert.equal(lookup("services", "aedc map refund token").url,
    "https://mynigeriaguide.com/services/aedc-map-refund");
  assert.equal(lookup("services", "ibedc map refund portal").url,
    "https://mynigeriaguide.com/services/ibedc-map-refund");
  assert.equal(lookup("services", "nigerian passport tracking status").url,
    "https://mynigeriaguide.com/services/passport-application-tracking");
  assert.equal(lookup("services", "how to get anambra asin online").url,
    "https://mynigeriaguide.com/services/anambra-asin-registration");
  assert.equal(lookup("entertainment", "oversabi aunty cast").url,
    "https://mynigeriaguide.com/entertainment/movies/oversabi-aunty");
  assert.equal(lookup("services", "oversabi aunty cast"), null);
  assert.equal(lookup("entertainment", "once upon a village cast"), null);
  assert.equal(lookup("services", "passport tracking"), null);
  assert.equal(lookup("services", "how to renew nigerian passport"), null);
  assert.equal(lookup("services", "aedc map refund", "review"), null);
  assert.equal(lookup("services", "how to replace a pvc pipe", "exclude"), null);
});
