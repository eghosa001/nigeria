import { expect, test } from "@playwright/test";

test.describe("live MyNigeriaGuide deployment", () => {
  test("custom domain owns SEO discovery and public analytics", async ({ page, request }) => {
    test.skip(!process.env.LIVE_BASE_URL, "Production-only custom-domain check.");

    expect(process.env.LIVE_BASE_URL).toBe("https://mynigeriaguide.com");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    const sitemapText = await sitemap.text();
    expect(sitemapText).toContain("https://mynigeriaguide.com/");
    expect(sitemapText).not.toContain(".workers.dev");

    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    const robotsText = await robots.text();
    expect(robotsText).toContain("Sitemap: https://mynigeriaguide.com/sitemap.xml");
    expect(robotsText).not.toContain(".workers.dev");

    await page.goto("/");
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", /^https:\/\/mynigeriaguide\.com\/?$/);
    await expect(page.locator('script[src*="googletagmanager.com/gtag/js?id="]')).toHaveCount(0);
  });

  test("brand, navigation and core service route are live", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("MyNigeriaGuide", { exact: true }).first()).toBeVisible();
    await expect(page.locator('svg[aria-label="MyNigeriaGuide"]').first()).toBeVisible();
    await expect(page.getByLabel("What do you want to do?")).toBeVisible();

    await page.goto("/services/jamb-direct-entry-2026");
    await expect(page.getByRole("heading", { name: /JAMB Direct Entry/i })).toBeVisible();
    await expect(page.getByText("How to get this service", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Online, physical or both?" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What exactly happens next?" })).toBeVisible();
  });

  test("resolved fee guides no longer show conflict warnings", async ({ page }) => {
    const cases = [
      ["/services/nin-date-of-birth-modification", "₦28,574"],
      ["/services/nin-slip-reissue", "₦600"],
      ["/services/waec-result-confirmation-overseas", "₦39,000"],
    ] as const;

    for (const [path, fee] of cases) {
      await page.goto(path);
      await expect(page.getByText("Verified", { exact: true }).first()).toBeVisible();
      await expect(page.getByText(fee, { exact: false }).first()).toBeVisible();
      await expect(page.getByText(/Official sources conflict|Official sources currently disagree/i)).toHaveCount(0);
    }
  });


  test("Cloudflare Access protects admin UI and admin APIs", async ({ request }) => {
    test.skip(!process.env.LIVE_BASE_URL, "Production-only Cloudflare Access check.");

    for (const path of [
      "/admin/visits",
      "/admin/services/passport-renewal",
      "/api/admin/analytics?range=7d",
      "/api/admin/content-access",
    ]) {
      const response = await request.get(path, {
        failOnStatusCode: false,
        maxRedirects: 0,
      });

      const location = response.headers()["location"] ?? "";
      const isAccessRedirect =
        response.status() >= 300 &&
        response.status() < 400 &&
        /cloudflareaccess\.com|\/cdn-cgi\/access\/login/i.test(location);
      const isAccessDeny = [401, 403].includes(response.status());

      expect(
        isAccessRedirect || isAccessDeny,
        `${path} must be blocked by Cloudflare Access before the application. status=${response.status()} location=${location}`,
      ).toBeTruthy();
    }
  });

  test("live core pages do not horizontally overflow", async ({ page }) => {
    for (const path of ["/", "/services", "/fees", "/updates", "/offices", "/assistant", "/services/jamb-direct-entry-2026"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path + " horizontal overflow").toBeLessThanOrEqual(1);
    }
  });
});
