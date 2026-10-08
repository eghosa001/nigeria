import { expect, test } from "@playwright/test";
import { indexableYouTubeMovies } from "@/lib/youtube-library";

test("latest crawl hub prioritizes substantive films and index-ready guides", async ({ page }) => {
  await page.goto("/latest");

  for (const href of [
    "/services/nysc-senate-list",
    "/services/jamb-print-result",
    "/services/waec-check-result",
    "/services/cac-name-reservation",
    "/services/inec-pvc-status",
    "/explore/lagos",
    "/explore/obudu-mountain-resort",
    "/entertainment/movies/anikulapo",
  ]) {
    await expect(page.locator('a[href="' + href + '"]').first()).toHaveCount(1);
  }

  const filmLinks = await page.locator(".admin-panel")
    .filter({ has: page.getByRole("heading", { name: "YouTube movies" }) })
    .locator(".admin-category-list a")
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
  const approved = new Set(indexableYouTubeMovies.slice(0, 8).map((movie) => movie.internalHref));
  expect(filmLinks.length).toBeGreaterThan(0);
  expect(filmLinks.every((href) => href !== null && approved.has(href))).toBe(true);
});
