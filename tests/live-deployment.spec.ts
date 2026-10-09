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

    const sitemapIndex = await request.get("/sitemap-index.xml");
    expect(sitemapIndex.ok()).toBeTruthy();
    const sitemapIndexText = await sitemapIndex.text();
    expect(sitemapIndexText).toContain("https://mynigeriaguide.com/sitemaps/services.xml");
    expect(sitemapIndexText).toContain("https://mynigeriaguide.com/sitemaps/youtube.xml");

    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    const robotsText = await robots.text();
    expect(robotsText).toContain("Sitemap: https://mynigeriaguide.com/sitemap-index.xml");
    expect(robotsText).not.toContain(".workers.dev");

    await page.goto("/");
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", /^https:\/\/mynigeriaguide\.com\/?$/);
    await expect(page.locator('script[src*="googletagmanager.com/gtag/js?id="]')).toHaveCount(0);
    await expect(page.locator('script[data-mynigeriaguide-posthog]')).toHaveCount(0);
  });

  test("production serves a live ads.txt and AdSense loader on monetised pages", async ({ page, request }) => {
    test.skip(!process.env.LIVE_BASE_URL, "Production-only AdSense delivery check.");

    const adsTxt = await request.get("/ads.txt");
    expect(adsTxt.status(), "ads.txt must stay live once AdSense is configured").toBe(200);
    expect(await adsTxt.text()).toContain("google.com, pub-7517898921176341, DIRECT, f08c47fec0942fa0");

    await page.goto("/services/jamb-direct-entry-2026");
    await expect(page.locator("script[src*='pagead2.googlesyndication.com/pagead/js/adsbygoogle.js']")).toHaveCount(1);

    const slots = await page.locator(".ad-container ins.adsbygoogle").evaluateAll((nodes) =>
      nodes.map((node) => (node as HTMLElement).dataset.adSlot ?? ""),
    );
    expect(slots).toContain("7134087198");
    expect(slots).toContain("8499139757");
  });

  test("public analytics initializes GA4 and the PostHog SDK", async ({ page }) => {
    test.skip(!process.env.LIVE_BASE_URL, "Production-only analytics check.");

    await page.addInitScript(() => {
      // GA4 is explicitly disabled for webdriver traffic by MyNigeriaGuide, so
      // override that one signal for the GA4 request assertion. Keep the
      // HeadlessChrome signals intact so PostHog's own bot filter prevents this
      // QA run from becoming a counted website visitor.
      Object.defineProperty(Navigator.prototype, "webdriver", {
        configurable: true,
        get: () => false,
      });
    });

    let collectUrl = "";
    await page.route(/https:\/\/[^/]*google-analytics\.com\/g\/collect.*/, async (route) => {
      collectUrl = route.request().url();
      await route.abort();
    });


    await page.goto("/");
    await expect(
      page.locator('script[data-mynigeriaguide-ga][src*="googletagmanager.com/gtag/js?id=G-J1SBV02XGN"]'),
    ).toHaveCount(1);
    await expect.poll(
      () => page.evaluate(() => (window as Window & { __mngPostHogInitialized?: boolean }).__mngPostHogInitialized),
      { timeout: 15_000 },
    ).toBe(true);
    await expect.poll(() => collectUrl, { timeout: 15_000 }).toContain("tid=G-J1SBV02XGN");
  });


  test("PostHog tracks initial and client-side pageviews without polluting production analytics", async ({ page }) => {
    test.skip(!process.env.LIVE_BASE_URL, "Production-only tracking transport check.");

    // Simulate an ordinary visitor while intercepting ALL event-ingestion calls,
    // so this test cannot generate fake PostHog or GA4 visitors.
    await page.addInitScript(() => {
      Object.defineProperty(Navigator.prototype, "webdriver", { configurable: true, get: () => false });
      Object.defineProperty(Navigator.prototype, "userAgent", {
        configurable: true,
        get: () => "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
      });
    });

    const posthogPageviews: string[] = [];
    const transportDiagnostics: Array<{ endpoint: string; bytes: number; shape: string; compression: string; parsed: number; error?: string }> = [];
    await page.route(/https:\/\/[^/]*posthog\.com\/.*/, async (route) => {
      const request = route.request();
      const pathname = new URL(request.url()).pathname;
      if (request.method() !== "POST" || !/^\/(?:e|batch|i\/v0\/e)\/?$/.test(pathname)) {
        return route.continue();
      }
      const body = request.postData() ?? "";
      const entry: (typeof transportDiagnostics)[number] = {
        endpoint: pathname,
        bytes: body.length,
        shape: body.trimStart().startsWith("{") ? "json" : body.includes("data=") ? "form" : "other",
        compression: new URLSearchParams(body).get("compression") ?? "",
        parsed: 0,
      };
      transportDiagnostics.push(entry);
      try {
        let payload: unknown;
        try {
          payload = JSON.parse(body);
        } catch {
          const form = new URLSearchParams(body);
          const encoded = form.get("data");
          if (!encoded) throw new Error("No ingestion data");
          const buffer = Buffer.from(encoded.replace(/ /g, "+"), "base64");
          try {
            payload = JSON.parse(buffer.toString("utf8"));
          } catch {
            const { gunzipSync } = await import("node:zlib");
            payload = JSON.parse(gunzipSync(buffer).toString("utf8"));
          }
        }
        const record = payload as { batch?: Array<{ event?: string; properties?: Record<string, string> }>; event?: string; properties?: Record<string, string> };
        const events = Array.isArray(payload) ? payload : Array.isArray(record.batch) ? record.batch : [record];
        for (const event of events as Array<{ event?: string; properties?: Record<string, string> }>) {
          if (event.event === "$pageview") {
            entry.parsed += 1;
            posthogPageviews.push(event.properties?.$pathname ?? new URL(event.properties?.$current_url ?? "https://mynigeriaguide.com/").pathname);
          }
        }
      } catch (error) {
        entry.error = error instanceof Error ? error.name : "unknown";
      }
      return route.fulfill({
        status: 200,
        headers: { "access-control-allow-origin": "*", "content-type": "application/json" },
        body: "{}",
      });
    });
    await page.route(/https:\/\/[^/]*google-analytics\.com\/g\/collect.*/, async (route) =>
      route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*" }, body: "" }),
    );

    await page.goto("/");
    await expect.poll(() => page.evaluate(() => (window as Window & { __mngPostHogLastTrackedPath?: string }).__mngPostHogLastTrackedPath), { timeout: 15_000 }).toBe("/");
    try {
      await expect.poll(() => posthogPageviews.filter((path) => path === "/").length, { timeout: 20_000 }).toBe(1);
    } catch {
      throw new Error("PostHog homepage event transport diagnostics (no payloads exposed): " + JSON.stringify(transportDiagnostics));
    }

    await page.locator('a[href="/services"]:visible').first().click();
    await expect(page).toHaveURL(/\/services\/?$/);
    await expect.poll(() => page.evaluate(() => (window as Window & { __mngPostHogLastTrackedPath?: string }).__mngPostHogLastTrackedPath), { timeout: 15_000 }).toBe("/services");
    await expect.poll(() => posthogPageviews.filter((path) => path === "/services").length, { timeout: 20_000 }).toBe(1);

    expect(posthogPageviews.filter((path) => path === "/")).toHaveLength(1);
    expect(posthogPageviews.filter((path) => path === "/services")).toHaveLength(1);
  });

  test("brand, navigation and core service route are live", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("MyNigeriaGuide", { exact: true }).first()).toBeVisible();
    await expect(page.locator('svg[aria-label="MyNigeriaGuide"]').first()).toBeVisible();
    await expect(page.getByLabel("What do you want to do?")).toBeVisible();

    await page.goto("/services/jamb-direct-entry-2026");
    await expect(page.getByRole("heading", { level: 1, name: /JAMB Direct Entry/i })).toBeVisible();
    await expect(page.getByText("How to get this service", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Online, physical or both?" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /What happens after .*JAMB Direct Entry/i })).toBeVisible();
  });

  
test("phone layout fits and public pages do not hydrate with React mismatches", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });

  const hydrationErrors: string[] = [];
  const capture = (message: string) => {
    if (/react error #418|hydration|hydrating|server rendered html|did not match/i.test(message)) {
      hydrationErrors.push(message);
    }
  };
  page.on("pageerror", (error) => capture(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") capture(message.text());
  });

  for (const path of ["/", "/services", "/entertainment/movies", "/explore", "/services/jamb-direct-entry-2026"]) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path + " horizontal overflow at 360px").toBeLessThanOrEqual(1);
  }

  await page.goto("/");
  await expect(page.getByRole("link", { name: "Admin login" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Search MyNigeriaGuide" }).first()).toBeVisible();
  expect(hydrationErrors).toEqual([]);
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


  test("live visits dashboard is protected by Cloudflare Access", async ({ page, request }) => {
    test.skip(!process.env.LIVE_BASE_URL, "Production-only analytics protection check.");

    const response = await request.get("/admin/api/analytics?range=7d", {
      failOnStatusCode: false,
      maxRedirects: 0,
    });
    expect(response.status()).toBe(302);
    expect(response.headers().location).toMatch(
      /^https:\/\/[^/]+\.cloudflareaccess\.com\/cdn-cgi\/access\/login\//,
    );

    await page.goto("/admin/visits");
    await expect(page).toHaveURL(/\.cloudflareaccess\.com\/cdn-cgi\/access\/login\//);
    await expect(page).toHaveTitle(/Cloudflare Access/i);
  });


  test("live admin guide editor is protected by Cloudflare Access", async ({ page, request }) => {
    test.skip(!process.env.LIVE_BASE_URL, "Production-only admin editing protection check.");

    const response = await request.get("/admin/api/content-access", {
      failOnStatusCode: false,
      maxRedirects: 0,
    });
    expect(response.status()).toBe(302);
    expect(response.headers().location).toMatch(
      /^https:\/\/[^/]+\.cloudflareaccess\.com\/cdn-cgi\/access\/login\//,
    );

    await page.goto("/admin/services/passport-renewal");
    await expect(page).toHaveURL(/\.cloudflareaccess\.com\/cdn-cgi\/access\/login\//);
    await expect(page).toHaveTitle(/Cloudflare Access/i);
  });

  test("live core pages do not horizontally overflow", async ({ page }) => {
    for (const path of ["/", "/services", "/fees", "/updates", "/offices", "/assistant", "/services/jamb-direct-entry-2026"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path + " horizontal overflow").toBeLessThanOrEqual(1);
    }
  });
});
