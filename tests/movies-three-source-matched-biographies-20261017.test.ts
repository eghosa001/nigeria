import test from "node:test";
import assert from "node:assert/strict";
import { entertainmentPeople, getPersonEditorialProfile, hasIndexablePersonEditorial } from "../lib/entertainment-extras";
import { hasCompletedAttributableBiographyReview, reviewedBiographyEvidence20261017 } from "../lib/entertainment-biography-evidence-2026-10-17";

const today = "2026-10-17";
test("three existing indexable biographies have individually attributable original evidence", () => {
  assert.equal(Object.keys(reviewedBiographyEvidence20261017).length, 3);
  for (const slug of ["femi-adebayo", "kunle-afolayan", "timini-egbuson"]) {
    const person = entertainmentPeople.find(p => p.slug === slug);
    const dossier = getPersonEditorialProfile(slug);
    assert.ok(person && dossier && hasIndexablePersonEditorial(slug), slug);
    assert.ok(hasCompletedAttributableBiographyReview(person, dossier, today), slug);
  }
});

test("stale, changed, uncited or unrelated biographies retain the review finding", () => {
  const person = entertainmentPeople.find(p => p.slug === "kunle-afolayan");
  const dossier = getPersonEditorialProfile("kunle-afolayan");
  assert.ok(person && dossier);
  const qualifies = hasCompletedAttributableBiographyReview;
  assert.equal(qualifies(person, {...dossier, lastReviewed:"2026-08-01"},today),false);
  assert.equal(qualifies(person, {...dossier, sources:dossier.sources.slice(1)},today),false);
  assert.equal(qualifies(person, {...dossier, sources:dossier.sources.map(s=>({...s,lastChecked:"2026-06-01"}))},today),false);
  assert.equal(qualifies(person, {...dossier, intro:["Generic career biography"]},today),false);
  assert.equal(qualifies(person, {...dossier, sections:dossier.sections.slice(0,2)},today),false);
  assert.equal(qualifies({...person,name:"Incorrect actor"},dossier,today),false);
  assert.equal(qualifies(person,dossier,"2026-10-01"),false);
  const unreviewed = entertainmentPeople.find(p => p.slug === "nancy-isime");
  assert.ok(unreviewed);
  assert.equal(qualifies(unreviewed,getPersonEditorialProfile(unreviewed.slug),today),false);
});
