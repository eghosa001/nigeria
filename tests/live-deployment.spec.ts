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
    await expect(page.locator('script[src*="googletagmanager.com/gtag/js?id="]')).toHaveCount(1);
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


  test("live visits dashboard is configured and protected", async ({ page, request }) => {
    test.skip(!process.env.LIVE_BASE_URL, "Production-only analytics configuration check.");

    const response = await request.get("/api/admin/analytics?range=7d", { failOnStatusCode: false });
    const body = await response.json() as {
      configured?: boolean;
      authenticated?: boolean;
      accessConfigured?: boolean;
      readConfigured?: boolean;
      trackingConfigured?: boolean;
    };
    expect(response.status(), "Analytics setup response: " + JSON.stringify(body)).toBe(401);
    expect(body.configured).toBe(true);
    expect(body.authenticated).toBe(false);

    await page.goto("/admin/visits");
    await expect(page.getByRole("heading", { name: "Admin access required" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Visits & page views" })).toHaveCount(0);
    await expect(page.getByLabel("Admin passphrase")).toBeVisible();
  });


  test("live admin guide editor is configured and protected", async ({ page, request }) => {
    test.skip(!process.env.LIVE_BASE_URL, "Production-only admin editing configuration check.");

    const response = await request.get("/api/admin/content-access", { failOnStatusCode: false });
    const body = await response.json() as {
      configured?: boolean;
      accessConfigured?: boolean;
      githubConfigured?: boolean;
      authenticated?: boolean;
    };

    expect(response.status(), "Admin editing setup response: " + JSON.stringify(body)).toBe(200);
    expect(body.configured).toBe(true);
    expect(body.accessConfigured).toBe(true);
    expect(body.githubConfigured).toBe(true);
    expect(body.authenticated).toBe(false);

    await page.goto("/admin/services/passport-renewal");
    await expect(page.getByRole("heading", { name: "Admin access required" })).toBeVisible();
    await expect(page.getByText("Passport renewal", { exact: true })).toHaveCount(0);
    await expect(page.getByLabel("Admin passphrase")).toBeVisible();
    await expect(page.getByText(/server configuration/i)).toHaveCount(0);
  });

  test("live core pages do not horizontally overflow", async ({ page }) => {
    for (const path of ["/", "/services", "/fees", "/updates", "/offices", "/assistant", "/services/jamb-direct-entry-2026"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path + " horizontal overflow").toBeLessThanOrEqual(1);
    }
  });
});
