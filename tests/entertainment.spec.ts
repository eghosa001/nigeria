import { expect, test } from "@playwright/test";

test("entertainment catalog filters by platform", async ({ page }) => {
  await page.goto("/entertainment/movies");
  await expect(page.locator(".service-card")).toHaveCount(6);
  await page.getByLabel("Where to watch").selectOption("YouTube");
  await expect(page.locator(".service-card")).toHaveCount(2);
});

test("movie detail exposes an official watch link", async ({ page }) => {
  await page.goto("/entertainment/movies/anikulapo");
  await expect(page.getByRole("heading", { name: "Aníkúlápó" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Watch on Netflix/ })).toHaveAttribute("href", /netflix\.com/);
});
