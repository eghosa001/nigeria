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
  await expect(page.locator('[aria-labelledby="saved-across-pillars"] a[href="/entertainment/movies/oversabi-aunty"]')).toHaveCount(0);
  // Unsaving does not erase local browsing history.
  await expect(page.locator('[aria-labelledby="recently-visited"] a[href="/entertainment/movies/oversabi-aunty"]')).toBeVisible();
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
  await expect(page.locator(".tour-photo-card img")).toHaveCount(4);
  await expect(page.locator(".tour-photo-credit a[href*='creativecommons.org']")).toHaveCount(4);
});

test("travel detail photography is credited and actually loads", async ({ page }) => {
  await page.goto("/explore/obudu-mountain-resort");
  const figure = page.locator(".tour-guide-photo");
  await expect(figure.locator("img")).toHaveAttribute("alt", /Obudu Mountain Resort/);
  await expect(figure.locator('a[href*="commons.wikimedia.org/wiki/File:"]')).toBeVisible();
  await expect(figure.locator('a[href*="creativecommons.org/licenses/by-sa/4.0/"]')).toBeVisible();
  await expect.poll(
    () => figure.locator("img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    { timeout: 20_000 },
  ).toBe(true);
});


test("homepage service autocomplete loads results on demand", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("What do you want to do?").fill("passport renewal");
  await expect(page.locator(".search-results a[href^='/services/']").first()).toBeVisible();
});

test("watched service is retrieved without embedding all service records", async ({ page, request }) => {
  const result = await request.get("/api/services?q=passport&pageSize=1");
  expect(result.ok()).toBe(true);
  const slug = (await result.json()).items[0].slug as string;
  await page.addInitScript((value) => localStorage.setItem("mynigeriaguide:watchlist", JSON.stringify([value])), slug);
  await page.goto("/saved");
  await expect(page.locator('.saved-guide-wrap a[href="/services/' + slug + '"]')).toBeVisible();
});

test("poster and thumbnail images reserve intrinsic dimensions", async ({ page }) => {
  await page.goto("/entertainment/movies");
  const images = page.locator(".entertainment-artwork img, .youtube-movie-card img");
  expect(await images.count()).toBeGreaterThan(0);
  expect(await images.evaluateAll((nodes) => nodes.every((node) =>
    Number(node.getAttribute("width")) > 0 && Number(node.getAttribute("height")) > 0
  ))).toBe(true);
});
