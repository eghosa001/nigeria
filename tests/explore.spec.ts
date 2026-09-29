import { expect, test } from "@playwright/test";

test("homepage exposes the platform pillars", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "What do you want to do in Nigeria?" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Tour Guide/ })).toHaveAttribute("href", "/explore");
  await expect(page.getByText("Entertainment Guide")).toBeVisible();
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
