import { expect, test } from "@playwright/test";

test("services search uses the paginated server directory", async ({ page }) => {
  await page.goto("/services");
  await page.getByLabel("Search guides").fill("passport renewal");
  await expect(page).toHaveURL(/q=passport(?:%20|\+)renewal/);
  await expect(page.locator(".service-grid")).toContainText(/passport/i);
});

test("movie search uses the paginated server directory", async ({ page }) => {
  await page.goto("/entertainment/movies");
  await page.getByLabel("Search movies").last().fill("Black Market");
  await expect(page).toHaveURL(/q=Black(?:%20|\+)Market/);
  await expect(page.locator(".movie-grid")).toContainText("Black Market");
});
