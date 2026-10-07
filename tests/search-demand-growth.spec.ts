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

  expect(seriesTitles).toHaveLength(6);
  expect(new Set(seriesTitles.map((item) => item.slug)).size).toBe(seriesTitles.length);

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
  for (const slug of ["festmint-abuja-2026", "african-sdgs-film-festival-abuja-2026", "all-africa-challenge-trophy-abuja-2026"]) {
    expect(exploreGuides.some((guide) => guide.slug === slug), slug).toBeTruthy();
  }
  expect(serviceSeoTitleTemplates["nafdac-medical-device-registration"]).toContain("Medical Device");
  expect(searchQueryOverrides["nafdac-medical-device-registration"]?.requirements).toContain("medical devices");
  expect(searchQueryOverrides["lagos-lasrra-registration"]?.fee).toContain("LASRRA");
});
