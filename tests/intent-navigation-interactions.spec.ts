import { expect, test } from "@playwright/test";

test("navigation keeps the shared shell and reaches every major pillar", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const destinations = [
    ["/services", /\/services$/],
    ["/explore", /\/explore$/],
    ["/entertainment/movies", /\/entertainment\/movies$/],
    ["/jobs", /\/jobs$/],
    ["/", /\/$/],
  ] as const;
  for (const [href, finalUrl] of destinations) {
    await page.locator('.mobile-bottom-nav a[href="' + href + '"]').click();
    await expect(page).toHaveURL(finalUrl);
    await expect(page.locator("main h1")).toHaveCount(1);
    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(horizontalOverflow).toBeLessThanOrEqual(1);
  }
  await expect(page.locator(".mobile-header-actions a[href='/saved']")).toBeVisible();
});

test("keyboard intent warms destinations but keeps ordinary accessible link navigation", async ({ page }) => {
  await page.goto("/");
  const link = page.locator('.primary-nav-main a[href="/services"]');
  await link.focus();
  await expect(link).toBeFocused();
  await link.press("Enter");
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator(".mng-route-announcer")).toHaveCount(1);
});
