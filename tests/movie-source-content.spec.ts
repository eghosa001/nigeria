import { expect, test } from "@playwright/test";

test("Pushing 30 shows source-backed Osaze film details and an accurate premiere", async ({ page }) => {
  const response = await page.goto("/entertainment/movies/pushing-30-2026");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { name: "Pushing 30", exact: true }).first()).toBeVisible();
  await expect(page.locator("body")).toContainText("Osaze Imafidon");
  await expect(page.locator("body")).not.toContainText("expectations surrounding her circle");
  await expect(page.locator("body")).toContainText("18 October 2026");
  await expect(page.locator('a[href="https://www.oyamag.com/pushing-30-producer-mayowa-mula-on-building-a-home-for-young-nigerian-stories/"]')).toHaveCount(1);
});
