import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Representative public entry points. Changing a specific detail screen still
// requires a focused test of that detail, not this whole-site smoke substitute.
const hubs = [
  { path: "/", active: "/" },
  { path: "/entertainment/movies", active: "/entertainment/movies" },
  { path: "/services", active: "/services" },
  { path: "/explore", active: "/explore" },
  { path: "/jobs", active: "/jobs" },
] as const;

test("four-pillar entry points fit compact phones, tablets and desktop", async ({ page }) => {
  for (const width of [320, 360, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 860 });
    for (const { path, active } of hubs) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      const audit = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
        h1: document.querySelectorAll("main h1").length,
      }));
      expect(audit.h1, path + " must have exactly one primary heading").toBe(1);
      expect(audit.scroll, path + " must not overflow at " + width + "px").toBeLessThanOrEqual(audit.viewport + 1);
      if (width <= 390) {
        await expect(page.locator(".mobile-bottom-nav a")).toHaveCount(5);
        await expect(page.locator('.mobile-bottom-nav a[href="' + active + '"]'))
          .toHaveAttribute("aria-current", "page");
      }
    }
  }
});

test("the four discovery pages lead with user tasks, not AI or SEO production jargon", async ({ page }) => {
  for (const { path } of hubs.filter((item) => item.path !== "/")) {
    await page.goto(path);
    const main = await page.locator("main").innerText();
    expect(main, path).not.toMatch(/(?:thin|duplicate) SEO pages|search engines (?:find|discover|crawl)|inventory floor|AI.generated articles|our content (?:strategy|pipeline)/i);
    const title = await page.title();
    expect(title.length, path + " title length").toBeLessThanOrEqual(65);
    expect(title, path).toContain("MyNigeriaGuide");
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description?.length ?? 0, path + " description length").toBeGreaterThanOrEqual(80);
    expect(description?.length ?? 0, path + " description length").toBeLessThanOrEqual(170);
  }
});

test("representative public paths meet WCAG 2.1 AA automatic accessibility checks", async ({ page }) => {
  for (const path of ["/", "/entertainment/movies", "/services", "/explore", "/jobs"]) {
    await page.goto(path);
    const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const serious = audit.violations.filter((item) => ["critical", "serious"].includes(item.impact ?? ""));
    expect(serious.map((item) => ({ id: item.id, impact: item.impact, nodes: item.nodes.length })), path + " serious accessibility findings").toEqual([]);
  }
});
