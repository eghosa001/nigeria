import { expect, test } from "@playwright/test";
import { getServiceSeoDescriptionOverride, getServiceSeoTitleOverride } from "@/data/service-seo-overrides";
import { searchQueryOverrides } from "@/data/search-query-overrides";

test("high-impression GSC service intents keep concise, verified snippets", () => {
  const slugs = [
    "passport-application-tracking",
    "anambra-asin-registration",
    "ninauth-nin-verification",
    "nigeria-landing-exit-card",
    "cac-company-registration",
    "police-character-certificate",
    "nin-date-of-birth-modification",
    "pencom-open-rsa",
    "passport-change-of-data",
    "nrs-individual-tax-registration",
    "bvn-data-update",
    "inec-replace-lost-damaged-pvc",
  ];
  const titles = slugs.map((slug) => {
    const title = getServiceSeoTitleOverride(slug, "2026");
    const description = getServiceSeoDescriptionOverride(slug, "2026");
    expect(title, slug).toBeTruthy();
    expect(description, slug).toBeTruthy();
    expect(title!.length, slug).toBeLessThanOrEqual(60);
    expect(description!.length, slug).toBeLessThanOrEqual(155);
    return title;
  });
  expect(new Set(titles).size).toBe(titles.length);
  expect(searchQueryOverrides["passport-application-tracking"]?.online).toContain("NIS passport tracking portal");
  expect(searchQueryOverrides["anambra-asin-registration"]?.online).toContain("ASIN registration portal");
  expect(searchQueryOverrides["ninauth-nin-verification"]?.online).toContain("NIN Share Code");
});
