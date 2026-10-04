import { expect, test } from "@playwright/test";
import { categoryFaqs } from "@/data/category-faqs";
import { publicServices } from "@/lib/data";
import { growthHubs } from "@/lib/growth-hubs";
import { seriesTitles } from "@/lib/series";

test("search-demand growth data stays internally consistent", () => {
  expect(publicServices).toHaveLength(208);

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
  await expect(page.getByRole("link", { name: "Foreign visas", exact: true })).toHaveAttribute("href", "/categories/foreign-visas");

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
