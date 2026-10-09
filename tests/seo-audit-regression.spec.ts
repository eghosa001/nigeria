import { expect, test } from "@playwright/test";

test("homepage finds services without embedding the whole service catalog", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("What do you want to do?").fill("passport renewal");
  await expect(page.locator(".search-results a[href^='/services/']").first()).toBeVisible();
  const embedded = await page.locator('script[type="application/json"]').allTextContents();
  expect(embedded.join("").length).toBeLessThan(400_000);
});

test("device watchlist loads saved service details on demand", async ({ page, request }) => {
  const response = await request.get("/api/services?q=passport&pageSize=1");
  expect(response.ok()).toBe(true);
  const { items } = await response.json();
  const slug = items[0].slug as string;
  await page.addInitScript((value) => localStorage.setItem("mynigeriaguide:watchlist", JSON.stringify([value])), slug);
  await page.goto("/saved");
  await expect(page.locator('.saved-guide-wrap a[href="/services/' + slug + '"]')).toBeVisible();
});

test("movie artwork has intrinsic image dimensions", async ({ page }) => {
  await page.goto("/entertainment/movies");
  const images = page.locator(".entertainment-artwork img, .youtube-movie-card img");
  expect(await images.count()).toBeGreaterThan(0);
  expect(await images.evaluateAll((items) => items.every((node) =>
    Number(node.getAttribute("width")) > 0 && Number(node.getAttribute("height")) > 0
  ))).toBe(true);
});
