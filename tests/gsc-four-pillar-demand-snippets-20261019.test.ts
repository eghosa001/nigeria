import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { getPublicService } from "../lib/data";
import { getServiceSeoTitleOverride, getServiceSeoDescriptionOverride } from "../data/service-seo-overrides";

const serviceSlugs = [
  "smartcash-wallet-upgrade", "airtel-esim-activation", "fcmb-business-account-online",
  "uba-open-account", "smartcash-wallet-opening", "united-nigeria-online-check-in",
  "dstv-streaming-subscription-nigeria", "palmpay-account-registration",
  "united-nigeria-change-booking", "ican-professional-induction",
  "synlab-pathprovider-results", "wakanow-book-flight-nigeria",
  "soncap-import-certification", "air-peace-book-flight",
  "dhl-track-shipment-nigeria", "ikeja-electric-prepaid-meter-application",
  "glo-esim-activation", "stanbic-pension-rsa-statement",
  "momo-psb-wallet-opening", "opay-account-opening-nigeria", "cfa-exam-deferral",
];

test("GSC-prioritised official-service snippets are canonical, source-backed and untruncated", () => {
  for (const slug of serviceSlugs) {
    const service = getPublicService(slug);
    assert.ok(service, "Published guide missing: " + slug);
    assert.ok(service.sources?.length, "Issuer sources missing: " + slug);
    const year = service.lastVerified.slice(0, 4);
    const title = getServiceSeoTitleOverride(slug, year);
    const description = getServiceSeoDescriptionOverride(slug, year);
    assert.ok(title && description, "Missing title or description: " + slug);
    assert.ok(title.length <= 60, "Title too long: " + slug + " " + title.length);
    assert.ok(description.length <= 155, "Description too long: " + slug + " " + description.length);
    assert.doesNotMatch(title, /\{year\}/);
    assert.doesNotMatch(description, /\{year\}/);
  }
});

test("career and Tour canonical detail routes use factual, concise search snippets", () => {
  const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
  const tour = read("app/explore/[slug]/page.tsx");
  const careers = read("app/jobs/guides/[slug]/page.tsx");
  for (const slug of ["nigeria-rainforest-guide", "nigeria-hills-mountains-guide", "ilorin"]) {
    assert.match(tour, new RegExp('guide.slug === "' + slug + '"'));
    assert.match(tour, new RegExp('"' + slug + '":'));
  }
  assert.match(careers, /title: \{ absolute: compactSearchText\(guide.metaTitle, 60\) \}/);
  assert.match(careers, /description: compactSearchText\(guide.description, 155\)/);
  assert.match(careers, /canonical: "\/jobs\/guides\/" \+ guide.slug/);
});
