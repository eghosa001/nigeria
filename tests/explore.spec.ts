import { expect, test } from "@playwright/test";

test("homepage exposes movies first, then services, then tour", async ({ page }) => {
  await page.goto("/");
  const paths = page.locator(".home-paths .home-path");
  await expect(paths).toHaveCount(3);
  await expect(paths.nth(0)).toContainText("Movies");
  await expect(paths.nth(0)).toHaveAttribute("href", "/entertainment/movies");
  await expect(paths.nth(1)).toContainText("Services");
  await expect(paths.nth(1)).toHaveAttribute("href", "/services");
  await expect(paths.nth(2)).toContainText("Tour Nigeria");
  await expect(paths.nth(2)).toHaveAttribute("href", "/explore");
});

test("Explore Nigeria hub and city guide are navigable", async ({ page }) => {
  await page.goto("/explore");
  await expect(page.getByRole("heading", { name: /Plan the trip/ })).toBeVisible();
  await page.getByRole("link", { name: /Lagos/ }).first().click();
  await expect(page).toHaveURL(/\/explore\/lagos$/);
  await expect(page.getByRole("heading", { name: "Lagos Travel Guide" })).toBeVisible();
});


test("travel directory exposes addresses, costs and Google Maps links", async ({ page }) => {
  await page.goto("/explore");
  const search = page.getByLabel("Search places");
  await search.fill("BluCabana");
  const card = page.locator(".explore-place-card").filter({ hasText: "BluCabana Restaurant & Cafe" });
  await expect(card).toBeVisible();
  await expect(card).toContainText("1322 Shehu Yar'Adua Way");
  await expect(card).toContainText("₦7,000");
  await expect(card.getByRole("link", { name: /Google Maps/ })).toHaveAttribute("href", /google\.com\/maps\/search/);
});

test("city guide keeps place verification and map actions visible", async ({ page }) => {
  await page.goto("/explore/lagos");
  await expect(page.getByRole("heading", { name: "Places to visit, eat & stay." })).toBeVisible();
  const nok = page.locator("#place-nok-by-alara");
  await expect(nok).toContainText("₦45,000–₦70,000");
  await expect(nok.getByRole("link", { name: /Open in Google Maps/ })).toHaveAttribute("target", "_blank");
  await expect(nok).toContainText("Checked 2026-09-29");
});



test("Ondo highlights expands with new map-ready coastal and nature places", async ({ page }) => {
  await page.goto("/explore/ondo-state-highlights");
  for (const id of ["place-araromi-seaside", "place-ebomi-lake-ipesi", "place-igbokoda-waterfront-ondo"]) {
    const card = page.locator("#" + id);
    await expect(card).toBeVisible();
    await expect(card.getByRole("link", { name: /Open in Google Maps/ })).toHaveAttribute("href", /google\.com\/maps\/search/);
    await expect(card).toContainText("Checked 2026-09-29");
  }
});

test("travel directory exposes the expanded Ondo place records", async ({ page }) => {
  await page.goto("/explore");
  const search = page.getByLabel("Search places");

  for (const place of ["Araromi Seaside", "Ebomi Lake", "Igbokoda Waterfront"]) {
    await search.fill(place);
    await expect(page.locator(".explore-place-card").filter({ hasText: place })).toBeVisible();
  }
});


test("national landmarks guide reuses verified place records", async ({ page }) => {
  await page.goto("/explore/nigeria-landmarks-places-to-visit");
  await expect(page.getByRole("heading", { name: "Landmarks & Places to Visit in Nigeria" })).toBeVisible();
  for (const id of ["place-olumo-rock", "place-osun-osogbo-sacred-grove", "place-yankari-game-reserve-main", "place-zuma-rock"]) {
    const card = page.locator("#" + id);
    await expect(card).toBeVisible();
    await expect(card.getByRole("link", { name: /Open in Google Maps/ })).toHaveAttribute("href", /google\.com\/maps\/search/);
  }
});
