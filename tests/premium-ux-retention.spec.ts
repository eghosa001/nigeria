import { expect, test } from "@playwright/test";

test("movie and destination bookmarks survive navigation and reload", async ({ page }) => {
  await page.goto("/entertainment/movies/oversabi-aunty");
  const movie = page.getByRole("button", { name: /save for later: oversabi aunty/i });
  await movie.click();
  await expect(page.getByRole("button", { name: /remove from saved: oversabi aunty/i })).toHaveAttribute("aria-pressed", "true");

  await page.goto("/explore/lagos");
  await page.getByRole("button", { name: /save for later:/i }).click();
  await page.goto("/saved");
  await expect(page.getByRole("heading", { name: "Saved movies, places & jobs" })).toBeVisible();
  await expect(page.locator('.personal-library a[href="/entertainment/movies/oversabi-aunty"]')).toBeVisible();
  await expect(page.locator('.personal-library a[href="/explore/lagos"]')).toBeVisible();

  await page.reload();
  await expect(page.locator('.personal-library a[href="/explore/lagos"]')).toBeVisible();
  await page.getByRole("button", { name: /remove oversabi aunty from saved/i }).click();
  await expect(page.locator('.personal-library a[href="/entertainment/movies/oversabi-aunty"]')).toHaveCount(0);
});

test("verified jobs appear before optional external batches", async ({ page }) => {
  let externalCalls = 0;
  await page.route("**/api/jobs/live?*", (route) => { externalCalls++; return route.abort(); });
  await page.goto("/jobs");
  await expect(page.locator("#opportunities")).toBeVisible();
  const order = await page.evaluate(() => {
    const verified = document.querySelector("#opportunities");
    const external = document.querySelector(".jobs-live-market-section");
    return Boolean(verified && external && (verified.compareDocumentPosition(external) & Node.DOCUMENT_POSITION_FOLLOWING));
  });
  expect(order).toBe(true);
  expect(externalCalls).toBe(0);
  await page.getByText("Browse external vacancies").click();
  await expect.poll(() => externalCalls).toBeGreaterThan(0);
});

test("main landing pages use visitor language and avoid long mobile overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/", "/explore", "/jobs", "/services", "/entertainment"]) {
    await page.goto(path);
    const size = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    expect(size[0], path).toBeLessThanOrEqual(size[1] + 1);
  }
  await expect(page.locator(".mobile-bottom-nav a")).toHaveCount(5);
  await page.goto("/explore");
  await expect(page.getByText(/Eight places appear initially/)).toBeVisible();
});
