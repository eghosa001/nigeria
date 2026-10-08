import { expect, test } from "@playwright/test";

test("home jobs previews feature different employers instead of duplicate recruitment cards", async ({ page }) => {
  await page.goto("/");
  const featured = await page.locator(".home-job-feature-live-item b").allTextContents();
  const additional = await page.locator('.home-job-list > a[href^="/jobs/"]:not([href="/jobs/private"]) strong').allTextContents();
  const names = [...featured, ...additional].map((value) => value.trim().replace(/\s+/g, " ").toLowerCase());
  expect(names.length, "should show currently relevant recruitment sources").toBeGreaterThan(0);
  expect(new Set(names).size, "home recruitment preview should avoid repeat employers").toBe(names.length);
  await expect(page.locator('.home-jobs-grid a[href="/jobs/government"]')).toHaveCount(1);
});

test("flagship YouTube shelf publishes readable film titles and substantive copy", async ({ page }) => {
  await page.goto("/entertainment/movies");
  await expect(page.getByRole("heading", { name: "Featured Nigerian films on YouTube." })).toBeVisible();
  const cards = page.locator(".movie-preview-grid .youtube-movie-card");
  const count = await cards.count();
  expect(count, "a real curated shelf must have enough source-backed films").toBeGreaterThanOrEqual(4);
  expect(count).toBeLessThanOrEqual(10);
  const copy = await cards.evaluateAll((nodes) => nodes.map((card) => ({
    title: card.querySelector("h3")?.textContent?.trim() ?? "",
    synopsis: card.querySelector(".youtube-movie-description")?.textContent?.trim() ?? "",
  })));
  for (const { title, synopsis } of copy) {
    expect(title.length, title).toBeLessThanOrEqual(60);
    expect(synopsis.length, title).toBeGreaterThanOrEqual(110);
    expect(title, "YouTube publisher's SEO title must not become the film headline")
      .not.toMatch(/\||\b(?:full movies?|latest nigerian|yoruba movie)\b/i);
    expect(synopsis, "Promotional publisher copy must not appear in the editorial shelf")
      .not.toMatch(/stay glued|you.ll definitely|can't afford|must.watch|subscribe|this weekend|latest nollywood|latest nigerian|full movies?/i);
  }
});
