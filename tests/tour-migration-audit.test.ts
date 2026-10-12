import assert from "node:assert/strict";
import { test } from "node:test";
import type { ExploreGuide } from "../lib/explore";
import type { ExplorePlace } from "../lib/explore-places";
import { buildTourMigrationAudit, exactTourState, exactStateFromTourAddress } from "../scripts/tour-migration-audit";

const guide = (slug: string, region: string): ExploreGuide => ({
  slug, title: slug, shortTitle: slug, kind: "destination", region,
  summary: "Summary", intro: [], bestFor: [], highlights: [], planning: [],
  lastReviewed: "2026-10-11",
});
const place = (slug: string, guideSlug: string): ExplorePlace => ({
  slug, guideSlug, name: "Historic Museum", kind: "attraction", area: "Centre",
  address: "Benin City, Edo State", summary: "Local museum with verified background",
  cost: "Confirm locally", costNote: "Special exhibitions may vary",
  mapQuery: "Historic Museum Benin", tags: ["heritage", "museum"],
  source: { label: "Museum primary source", href: "https://museum.ng" },
  checkedAt: "2026-10-11",
});

test("migration snapshot preserves every shared guide link, metadata and draft-only status", () => {
  const guides = [guide("benin-city", "Edo State"), guide("edo-heritage", "Edo State")];
  const entry = place("national-museum-benin", "benin-city");
  const result = buildTourMigrationAudit([entry], guides,
    (slug) => slug === "benin-city" || slug === "edo-heritage" ? [entry] : []);
  assert.equal(result.sourceCount, 1);
  assert.equal(result.uniqueCount, 1);
  assert.equal(result.membershipCount, 2);
  assert.deepEqual(result.memberships.map(({ guideSlug, position }) => [guideSlug, position]),
    [["benin-city", 0], ["edo-heritage", 0]]);
  assert.equal(result.candidates[0].editorialStatus, "draft");
  assert.equal(result.candidates[0].stateOrFct, "Edo");
  assert.deepEqual(result.candidates[0].legacyExtras.tags, ["heritage", "museum"]);
  assert.equal(result.candidates[0].legacyExtras.mapQuery, "Historic Museum Benin");
  assert.equal(result.candidates[0].legacyExtras.costNote, "Special exhibitions may vary");
  assert.deepEqual(result.problems, []);
  assert.equal(result.productionCutoverApproved, false);
});

test("ambiguous state, duplicate slug and broken evidence block cutover instead of guessing", () => {
  const guides = [guide("national-journey", "South-South Nigeria"), guide("state-guide", "Benin City")];
  const p = place("national-museum-benin", "national-journey");
  const dup = place("national-museum-benin", "state-guide");
  const invalid = { ...p, slug: "unsafe-entry", source: { label: "", href: "http://example.com" } };
  const result = buildTourMigrationAudit([p, dup, invalid], guides,
    (slug) => slug === "national-journey" ? [p, invalid] : [dup]);
  assert.equal(result.problemsByReason.duplicate_slug_conflict, 1);
  assert.equal(result.problemsByReason.unmapped_state, 2);
  assert.equal(result.problemsByReason.missing_source, 1);
  assert.equal(result.sourceCount, 3);
  assert.equal(result.uniqueCount, 2);
  assert.equal(result.membershipCount, 3);
  assert.equal(result.candidates.filter((candidate) => candidate.editorialStatus === "draft").length, 2);
  assert.equal(result.productionCutoverApproved, false);
});

test("state names only resolve with unambiguous administrative evidence", () => {
  assert.equal(exactTourState("Taraba State"), "Taraba");
  assert.equal(exactTourState("Federal Capital Territory"), "Federal Capital Territory");
  assert.equal(exactTourState("Lagos"), "Lagos");
  assert.equal(exactTourState("Southwest Nigeria"), null);
  assert.equal(exactTourState("Abuja and Nasarawa"), null);
});

test("administrative address resolves mixed-region guide without guessing a state", () => {
  const guides = [guide("weekend-trips", "South West Nigeria")];
  const lagos = { ...place("badagry-heritage-district", "weekend-trips"), address: "Badagry, Lagos State" };
  const ogun = { ...place("olumo-rock", "weekend-trips"), address: "Ikija, Abeokuta, Ogun State" };
  const multi = { ...place("two-state-park", "weekend-trips"), address: "Park, Niger and Kwara States, Nigeria" };
  const report = buildTourMigrationAudit([lagos, ogun, multi], guides, () => [lagos, ogun, multi]);
  assert.deepEqual(report.candidates.map(item => item.stateOrFct), ["Lagos", "Ogun", null]);
  assert.equal(report.problemsByReason.unmapped_state, 1);
  assert.equal(report.resolvedFromAddressCount, 2);
  assert.equal(report.productionCutoverApproved, false);
});

test("an explicit conflicting state stays a blocker", () => {
  const guides = [guide("ibadan", "Oyo State")];
  const entry = { ...place("conflicting-venue", "ibadan"), address: "Victoria Island, Lagos State" };
  const report = buildTourMigrationAudit([entry], guides, () => [entry]);
  assert.equal(report.problemsByReason.conflicting_state, 1);
  assert.equal(report.resolvedFromAddressCount, 0);
  assert.equal(report.candidates[0].editorialStatus, "draft");
  assert.equal(report.productionCutoverApproved, false);
});

test("administrative address evidence is exact; broad/multiple regions are not normalized", () => {
  assert.equal(exactStateFromTourAddress("Zuma Rock, Niger State, Nigeria"), "Niger");
  assert.equal(exactStateFromTourAddress("Serti, Taraba State, Nigeria"), "Taraba");
  assert.equal(exactStateFromTourAddress("Gashaka, Taraba and Adamawa States"), null);
  assert.equal(exactStateFromTourAddress("Nigeria"), null);
  assert.equal(exactStateFromTourAddress("Niger and Kwara States, Nigeria"), null);
  assert.equal(exactStateFromTourAddress("Badagry, Lagos State; Abeokuta, Ogun State"), null);
});
