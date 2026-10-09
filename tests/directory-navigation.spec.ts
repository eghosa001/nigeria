import { expect, test } from "@playwright/test";

test("services search uses the paginated server directory", async ({ page }) => {
  await page.goto("/services");
  await page.getByLabel("Search guides").fill("passport renewal");
  await expect(page).toHaveURL(/q=passport(?:%20|\+)renewal/);
  await expect(page.locator(".service-grid")).toContainText(/passport/i);
});

test("failed service search offers retry without stale results", async ({ page }) => {
  await page.goto("/services");
  let fail = true;
  await page.route("**/api/services?**", async (route) => {
    if (fail) await route.fulfill({ status: 503, body: "Unavailable" });
    else await route.continue();
  });
  await page.getByLabel("Search guides").fill("passport renewal");
  await expect(page.getByRole("alert")).toContainText("Retry the search");
  await expect(page.locator(".service-grid")).toHaveCount(0);
  fail = false;
  await page.getByRole("button", { name: "Retry search" }).click();
  await expect(page.locator(".service-grid")).toContainText(/passport/i);
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test("movie search uses the paginated server directory", async ({ page }) => {
  await page.goto("/entertainment/movies");
  await page.getByLabel("Search movies").last().fill("Black Market");
  await expect(page).toHaveURL(/q=Black(?:%20|\+)Market/);
  await expect(page.locator(".movie-grid")).toContainText("Black Market");
});


test("mobile primary navigation stays focused and keeps Saved in the header", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/explore");
  await expect(page.locator(".mobile-bottom-nav a")).toHaveCount(5);
  await expect(page.locator(".mobile-bottom-nav")).toContainText("Home");
  await expect(page.locator(".mobile-bottom-nav")).toContainText("Movies");
  await expect(page.locator(".mobile-bottom-nav")).toContainText("Services");
  await expect(page.locator(".mobile-bottom-nav")).toContainText("Tour");
  await expect(page.locator(".mobile-bottom-nav")).toContainText("Jobs");
  await expect(page.locator(".mobile-header-actions a[href='/saved']")).toBeVisible();
  await expect(page.locator(".section-nav-inner nav a")).toHaveCount(4);
});

test("crowded landing-page link groups use progressive disclosure", async ({ page }) => {
  await page.goto("/explore");
  await expect(page.getByText("More ways to explore")).toBeVisible();
  await expect(page.getByText("Choose a state or the FCT")).toBeVisible();

  await page.goto("/services");
  await expect(page.getByText(/Browse all \d+ service categories/)).toBeVisible();

  await page.goto("/jobs");
  await expect(page.getByText("Browse by industry, location, profession & career tools")).toBeVisible();
});


test("decluttered landing pages do not overflow on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/explore", "/services", "/jobs", "/entertainment"]) {
    await page.goto(path);
    const widths = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(widths.content, path + " should not overflow horizontally").toBeLessThanOrEqual(widths.viewport + 1);
  }
});
