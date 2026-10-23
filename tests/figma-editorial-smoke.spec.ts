import { expect, test } from "@playwright/test";

// Scoped visual/navigation contract for the Figma-derived shared shell and home.
for (const size of [
  { name: "phone", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
]) {
  test(`editorial shell and functional homepage at ${size.name}`, async ({ page }) => {
    await page.setViewportSize({ width: size.width, height: size.height });
    await page.goto("/");

    const hero = page.locator(".minimal-home-hero");
    await expect(hero).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Nigerian movies, services, travel and jobs",
    );
    await expect(page.locator(".home-paths > a")).toHaveCount(4);

    // The design must add a real search route, not a decorative input.
    const form = page.locator(".mng-hero-search");
    await expect(form.getByRole("searchbox", { name: "Search MyNigeriaGuide" })).toBeVisible();
    await expect(form.getByRole("button", { name: "Search" })).toBeVisible();
    await expect(page.locator('.minimal-movie-card a[href^="/entertainment/movies/"]').first()).toBeVisible();

    const heroBackground = await hero.evaluate((element) => getComputedStyle(element).backgroundColor);
    expect(heroBackground).not.toBe("rgba(0, 0, 0, 0)");
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > window.innerWidth + 2
    );
    expect(overflow, "homepage should never scroll horizontally").toBe(false);

    if (size.width >= 921) {
      await expect(page.locator(".mng-home-cover")).toBeVisible();
      const columns = await page.locator(".minimal-home-hero-inner").evaluate(
        (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length
      );
      expect(columns).toBeGreaterThanOrEqual(2);
    } else {
      await expect(page.locator(".mobile-bottom-nav a")).toHaveCount(5);
    }

    // Dark mode must keep the editorial masthead and a readable hero.
    await page.evaluate(() => { document.documentElement.dataset.theme = "dark"; });
    const headerColor = await page.locator(".site-header").evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );
    expect(headerColor).toBe("rgb(11, 21, 26)");
    const darkCanvas = await hero.evaluate((element) => getComputedStyle(element).backgroundColor);
    expect(darkCanvas).toBe("rgb(17, 29, 34)");
  });
}
