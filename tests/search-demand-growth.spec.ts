import { expect, test } from "@playwright/test";
import { categoryFaqs } from "@/data/category-faqs";
import { searchQueryOverrides } from "@/data/search-query-overrides";
import { serviceSeoTitleTemplates } from "@/data/service-seo-overrides";
import { publicServices } from "@/lib/data";
import { entertainmentTitles } from "@/lib/entertainment";
import { exploreGuides } from "@/lib/explore";
import { jobOpportunities } from "@/lib/jobs";
import { growthHubs } from "@/lib/growth-hubs";
import { seriesTitles } from "@/lib/series";

test("search-demand growth data stays internally consistent", () => {
  expect(publicServices).toHaveLength(212);

  for (const slug of ["check-nin-number", "unclaimed-dividends-nigeria", "jamb-examination-slip-2026", "neco-certificate-service"]) {
    expect(publicServices.some((service) => service.slug === slug), slug).toBeTruthy();
  }

  expect(categoryFaqs["Investing"]).toBeTruthy();
  expect(categoryFaqs["Investing"].length).toBeGreaterThanOrEqual(4);

  const jamb = growthHubs.find((hub) => hub.slug === "jamb-2026");
  expect(jamb).toBeTruthy();
  expect(jamb?.searches.some((item) => item.query === "JAMB CAPS" && item.serviceSlug === "jamb-caps")).toBeTruthy();
  expect(jamb?.searches.some((item) => item.query === "JAMB CAPS login" && item.serviceSlug === "jamb-caps")).toBeTruthy();

  const neco = growthHubs.find((hub) => hub.slug === "neco");
  expect(neco?.serviceSlugs).toContain("neco-certificate-service");

  const pension = growthHubs.find((hub) => hub.slug === "pension-services-nigeria");
  expect(pension?.title).toContain("Pension Registration Nigeria");
  expect(pension?.searches.some((item) => item.query === "RSA registration Nigeria" && item.serviceSlug === "pencom-open-rsa")).toBeTruthy();

  expect(seriesTitles).toHaveLength(7);
  expect(new Set(seriesTitles.map((item) => item.slug)).size).toBe(seriesTitles.length);
  expect(seriesTitles.some((item) => item.slug === "once-upon-a-village")).toBeTruthy();

  for (const slug of ["colours-of-fire", "king-of-thieves-2", "the-herd"]) {
    expect(entertainmentTitles.some((item) => item.slug === slug), slug).toBeTruthy();
  }
  for (const slug of ["snv-energy-advisor-abuja-2026", "snv-project-manager-abuja-2026"]) {
    expect(jobOpportunities.some((item) => item.slug === slug && item.status === "open"), slug).toBeTruthy();
  }
  expect(exploreGuides.some((guide) => guide.slug === "beneficial-ownership-asset-recovery-conference-2026")).toBeTruthy();
});

test("new search-demand routes are crawlable from their public surfaces", async ({ page, request }) => {
  const routes = [
    "/jobs/remote",
    "/entertainment/series",
    "/entertainment/series/koleoso",
    "/entertainment/movies/agbara-nla-the-return",
    "/entertainment/movies/first-lady-2026",
    "/explore/things-to-do-lagos",
    "/explore/things-to-do-abuja",
    "/services/check-nin-number",
    "/services/unclaimed-dividends-nigeria",
    "/services/jamb-examination-slip-2026",
    "/services/neco-certificate-service",
  ];

  for (const route of routes) {
    const response = await request.get(route, { failOnStatusCode: false });
    expect(response.status(), route).toBeLessThan(400);
  }

  await page.goto("/");
  await expect(page.locator('a[href="/categories/foreign-visas"]').first()).toBeVisible();

  await page.goto("/topics/jamb-2026");
  const jambSearches = page.locator(".topic-searches");
  await expect(jambSearches.getByRole("link", { name: "JAMB CAPS", exact: true })).toHaveAttribute("href", "/services/jamb-caps");
  await expect(jambSearches.getByRole("link", { name: "JAMB CAPS login", exact: true })).toHaveAttribute("href", "/services/jamb-caps");

  await page.goto("/topics/neco");
  await expect(page.getByRole("link", { name: /NECO certificate/i }).first()).toHaveAttribute("href", "/services/neco-certificate-service");

  await page.goto("/explore");
  await expect(page.locator('a[href="/explore/lagos"]').first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Things to do in Lagos/i }).first()).toHaveAttribute("href", "/explore/things-to-do-lagos");

  await page.goto("/entertainment");
  await expect(page.getByRole("link", { name: /TV & web series/i }).first()).toHaveAttribute("href", "/entertainment/series");
});

test("four pillars stay ordered and searchable from the homepage", async ({ page }) => {
  await page.goto("/");

  const order = await page.locator(".minimal-home-section").evaluateAll((nodes) =>
    nodes.map((node) => String(node.className)).filter((name) =>
      /minimal-home-(movies|services|tour|jobs)/.test(name),
    ),
  );

  expect(order.findIndex((name) => name.includes("minimal-home-movies"))).toBeLessThan(
    order.findIndex((name) => name.includes("minimal-home-services")),
  );
  expect(order.findIndex((name) => name.includes("minimal-home-services"))).toBeLessThan(
    order.findIndex((name) => name.includes("minimal-home-tour")),
  );
  expect(order.findIndex((name) => name.includes("minimal-home-tour"))).toBeLessThan(
    order.findIndex((name) => name.includes("minimal-home-jobs")),
  );

  await expect(page.locator('form[action="/entertainment/movies#curated-movies"]')).toBeVisible();
  await expect(page.locator('form[action="/explore#places"]')).toBeVisible();
  await expect(page.locator('form[action="/jobs#opportunities"]')).toBeVisible();
});

test("global search includes individual Tour Nigeria places", async ({ page }) => {
  await page.goto("/search?q=restaurant");
  await expect(page.locator(".global-search-group").filter({ hasText: "Tour places" })).toBeVisible();
});


test("fresh crawl hub exposes series and current events directly", async ({ page }) => {
  await page.goto("/latest");
  await expect(page.locator('a[href^="/entertainment/series/"]').first()).toBeVisible();

  await page.goto("/explore");
  await expect(page.locator('a[href^="/explore/"]').filter({ hasText: /SMFest|NIFAFEST|Film Festival|Food Fair|Carnival/i }).first()).toBeVisible();
});


test("wave 8 expands verified demand across all four pillars", () => {
  for (const slug of ["a-ride-forever-2026", "stuck-with-you-2025"]) {
    expect(entertainmentTitles.some((item) => item.slug === slug), slug).toBeTruthy();
  }
  for (const slug of ["opay-nigeria-careers", "palmpay-careers", "mastercard-careers-nigeria", "visa-careers-africa"]) {
    expect(jobOpportunities.some((item) => item.slug === slug && item.status === "career-page"), slug).toBeTruthy();
  }
  for (const slug of ["abuja-study-abroad-expo-2026", "legacy-building-conference-abuja-2026", "abuja-international-afrojazz-festival-2026"]) {
    expect(exploreGuides.some((guide) => guide.slug === slug), slug).toBeTruthy();
  }
  expect(serviceSeoTitleTemplates["nafdac-medical-device-registration"]).toContain("Medical Device");
  expect(searchQueryOverrides["nafdac-medical-device-registration"]?.requirements).toContain("medical devices");
  expect(searchQueryOverrides["lagos-lasrra-registration"]?.fee).toContain("LASRRA");
});


test("wave 9 deepens all four pillars without creating thin duplicates", () => {
  for (const slug of ["third-party-risk", "our-perfect-match", "one-string-attached"]) {
    expect(entertainmentTitles.some((item) => item.slug === slug), slug).toBeTruthy();
  }
  for (const duplicateSlug of ["third-party-risk-2026", "our-perfect-match-2026", "one-string-attached-2023"]) {
    expect(entertainmentTitles.some((item) => item.slug === duplicateSlug), duplicateSlug).toBeFalsy();
  }

  for (const slug of ["oracle-careers-nigeria", "sap-careers-nigeria", "ibm-careers-nigeria", "google-careers-nigeria"]) {
    expect(jobOpportunities.some((item) => item.slug === slug && item.status === "career-page"), slug).toBeTruthy();
  }

  for (const slug of ["10th-afrigeo-symposium-abuja-2026", "cocoa-xp-dotti-abuja-2026", "fashion-fables-runway-africa-abuja-2026"]) {
    expect(exploreGuides.some((guide) => guide.slug === slug), slug).toBeTruthy();
  }

  const nafdac = growthHubs.find((hub) => hub.slug === "nafdac-registration-nigeria");
  expect(nafdac?.serviceSlugs).toContain("nafdac-medical-device-registration");
  expect(nafdac?.serviceSlugs).toContain("nafdac-cosmetics-registration");

  const visaAppointments = growthHubs.find((hub) => hub.slug === "visa-appointments-nigeria");
  expect(visaAppointments?.serviceSlugs).toContain("vfs-canada-biometrics-appointment-nigeria");
  expect(visaAppointments?.serviceSlugs).toContain("tlscontact-france-visa-appointment-nigeria");

  const exams = growthHubs.find((hub) => hub.slug === "professional-exams-certifications-nigeria");
  expect(exams?.serviceSlugs).toContain("aws-certification-exam-scheduling");
  expect(exams?.serviceSlugs).toContain("british-council-ielts-registration-nigeria");
});


test("wave 10 converts live GSC demand into stronger four-pillar coverage", () => {
  for (const slug of ["celebrity-crush-2024", "holy-matrimony", "one-more-night", "a-hold-on-me-2024"]) {
    expect(entertainmentTitles.some((item) => item.slug === slug), slug).toBeTruthy();
  }
  for (const duplicateSlug of ["holy-matrimony-2024", "one-more-night-2025"]) {
    expect(entertainmentTitles.some((item) => item.slug === duplicateSlug), duplicateSlug).toBeFalsy();
  }

  for (const slug of ["deloitte-nigeria-careers", "microsoft-africa-development-center-careers"]) {
    expect(jobOpportunities.some((item) => item.slug === slug && item.status === "career-page"), slug).toBeTruthy();
  }

  expect(serviceSeoTitleTemplates["ninauth-nin-verification"]).toContain("Sharecode");
  expect(serviceSeoTitleTemplates["passport-application-tracking"]).toContain("NIS Tracker");
  expect(searchQueryOverrides["anambra-asin-registration"]?.start).toContain("ASIN number");
  expect(searchQueryOverrides["ninauth-nin-verification"]?.online).toContain("Sharecode");

  expect(exploreGuides.find((guide) => guide.slug === "calabar")?.title).toContain("Places to Visit");
  expect(exploreGuides.find((guide) => guide.slug === "nigeria-landmarks-places-to-visit")?.title).toContain("Places to Visit in Nigeria");
});
