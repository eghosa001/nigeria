import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getPublicService } from "../lib/data";
import { getServiceJourney, hasReviewedServiceJourney } from "../lib/journey";
import { generateMetadata as seriesMetadata } from "../app/entertainment/series/[slug]/page";
import { generateMetadata as filmMetadata } from "../app/entertainment/movies/[slug]/page";

test("reviewed service choices use only the authored service-specific route", () => {
  for (const slug of [
    "mtn-sim-swap-replacement",
    "nin-sim-linkage",
    "npc-child-birth-registration",
    "cac-company-registration",
    "gtbank-block-debit-card",
    "glo-sim-replacement",
  ]) {
    const service = getPublicService(slug);
    assert.ok(service, slug);
    assert.ok(hasReviewedServiceJourney(slug), slug);
    const route = getServiceJourney(service);
    assert.ok(route.alternativeLabel.length > 10, slug);
    assert.ok(route.alternativeDetail.length > 30, slug);
  }
  assert.equal(hasReviewedServiceJourney("unreviewed-service-slug"), false);
});

test("service route chooser uses primary and reviewed alternate routes without guessed alternatives", () => {
  const content = readFileSync("components/service-journey.tsx", "utf8");
  assert.match(content, /hasReviewedServiceJourney\(service.slug\)/);
  assert.match(content, /journey.alternativeLabel/);
  assert.match(content, /journey.alternativeDetail/);
  assert.match(content, /guidance.route.fallbackDetail/);
});

test("private job readiness is available only for verified open individual vacancies", () => {
  const page = readFileSync("app/jobs/[slug]/page.tsx", "utf8");
  assert.match(page, /item.kind === "vacancy" && effectiveStatus === "open"/);
  const widget = readFileSync("components/job-application-readiness.tsx", "utf8");
  assert.match(widget, /"use client"/);
  assert.match(widget, /checked=\{done\[index\]\}/);
  assert.match(widget, /useState<boolean\[\]>/);
  assert.doesNotMatch(widget, /fetch\(|localStorage|sessionStorage|trackEvent|sendBeacon/);
  assert.match(widget, /employer alone decides eligibility/);
});

test("series metadata stays concise while story details remain in on-page synopsis", async () => {
  for (const slug of ["afobaje-2026", "the-ten-2026", "once-upon-a-village"]) {
    const metadata = await seriesMetadata({ params: Promise.resolve({ slug }) });
    assert.ok(String(metadata.title).length < 48, slug);
    assert.ok(String(metadata.description).length <= 160, slug);
    assert.match(String(metadata.description), /cast, episodes and verified viewing sources/i, slug);
  }
});

test("high-visibility movie snippets do not imply unsupported directors or streams", async () => {
  const abe = await filmMetadata({ params: Promise.resolve({ slug: "abe-odale-2026" }) });
  assert.match(String(abe.description), /not been independently confirmed/);
  assert.ok(String(abe.title).length < 42);
  const man = await filmMetadata({ params: Promise.resolve({ slug: "the-man-i-never-knew" }) });
  assert.ok(String(man.title).length < 42);
});
