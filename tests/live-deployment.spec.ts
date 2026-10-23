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

  test("production analytics bootstrap configures GA4 and PostHog without QA traffic", async ({ browser }) => {
    test.skip(!process.env.LIVE_BASE_URL, "Production-only analytics check.");

    // Production deliberately excludes HeadlessChrome and navigator.webdriver
    // so default Playwright contexts are NOT valid evidence that real visitors
    // can initialize GA4. Use an isolated ordinary user agent to exercise the
    // same branch as a normal reader, while intercepting ALL collection below.
    const context = await browser.newContext({
      baseURL: process.env.LIVE_BASE_URL,
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    });
    try {
      const page = await context.newPage();
      await page.addInitScript(() => {
        Object.defineProperty(Navigator.prototype, "webdriver", {
          configurable: true,
          get: () => false,
        });
      });

      // Never count our synthetic test as a real GA4 visitor, even if the
      // remote Google tag loads successfully. Block both GA4 and legacy
      // collection endpoints and all PostHog event POSTs.
      await page.route(/https:\/\/[^/]*google-analytics\.com\/(?:g\/collect|collect).*/, (route) =>
        route.fulfill({ status: 204, body: "" }),
      );
      await page.route(/https:\/\/[^/]*posthog\.com\/.*/, (route) => {
        if (route.request().method() === "POST") return route.abort();
        return route.continue();
      });

      await page.goto("/");
      await expect(
        page.locator('script[data-mynigeriaguide-ga][src*="googletagmanager.com/gtag/js?id=G-J1SBV02XGN"]'),
      ).toHaveCount(1);
      await expect.poll(() => page.evaluate(() => {
        const w = window as Window & typeof globalThis & {
          dataLayer?: IArguments[];
          __mngLastTrackedPath?: string;
        };
        return (w.dataLayer ?? []).some((row) => {
          const args = Array.from(row);
          return args[0] === "config" &&
            args[1] === "G-J1SBV02XGN" &&
            typeof args[2] === "object" &&
            args[2] != null &&
            (args[2] as { anonymize_ip?: boolean }).anonymize_ip === true;
        }) && w.__mngLastTrackedPath === "/";
      })).toBe(true);
      await expect.poll(
        () => page.evaluate(() => (window as Window & { __mngPostHogInitialized?: boolean }).__mngPostHogInitialized),
        { timeout: 15_000 },
      ).toBe(true);
      // This proves on-page configuration and delivery attempt, NOT that
      // Google processed any new live event: collection is intentionally blocked.
    } finally {
      await context.close();
    }
  });


  test("PostHog route instrumentation follows client-side navigation without generating QA visits", async ({ page }) => {
    test.skip(!process.env.LIVE_BASE_URL, "Production-only route instrumentation check.");

    // The SDK deliberately suppresses automated browser transport. Test that
    // the app invokes its tracker for each route, without impersonating a
    // real visitor or producing fake pageviews in PostHog/GA4.
    await page.addInitScript(() => {
      Object.defineProperty(Navigator.prototype, "webdriver", { configurable: true, get: () => false });
    });
    await page.route(/https:\/\/[^/]*posthog\.com\/.*/, async (route) => {
      if (route.request().method() === "POST") {
        return route.fulfill({
          status: 200,
          headers: { "access-control-allow-origin": "*", "content-type": "application/json" },
          body: "{}",
        });
      }
      return route.continue();
    });
    await page.route(/https:\/\/[^/]*google-analytics\.com\/g\/collect.*/, async (route) =>
      route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*" }, body: "" }),
    );

    await page.goto("/");
    await expect.poll(
      () => page.evaluate(() => (window as Window & { __mngPostHogLastTrackedPath?: string }).__mngPostHogLastTrackedPath),
      { timeout: 15_000 },
    ).toBe("/");

    await page.locator('a[href="/services"]:visible').first().click();
    await expect(page).toHaveURL(/\/services\/?$/);
    await expect.poll(
      () => page.evaluate(() => (window as Window & { __mngPostHogLastTrackedPath?: string }).__mngPostHogLastTrackedPath),
      { timeout: 15_000 },
    ).toBe("/services");
  });

  test("brand, navigation and core service route are live", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("MyNigeriaGuide", { exact: true }).first()).toBeVisible();
    await expect(page.locator('svg[aria-label="MyNigeriaGuide"]').first()).toBeVisible();
    await expect(page.getByLabel("What do you want to do?")).toBeVisible();

    await page.goto("/services/jamb-direct-entry-2026");
    await expect(page.getByRole("heading", { level: 1, name: /JAMB Direct Entry/i })).toBeVisible();
    // Reviewed alternative routes are intentionally placed behind a disclosure
    // to keep the service's step-by-step answer visible without duplication.
    const alternateRoutes = page.locator(".service-extra-routes");
    await expect(alternateRoutes.locator("summary")).toBeVisible();
    await alternateRoutes.locator("summary").click();
    await expect(alternateRoutes).toHaveAttribute("open", "");
    await expect(page.getByText("How to get this service", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Choose the correct application route" })).toBeVisible();
    await expect(page.locator('[data-journey-basis="individually-reviewed"]')).toBeVisible();
    const aftercare = page.locator(".service-extra-aftercare");
    await expect(aftercare.locator("summary")).toBeVisible();
    await aftercare.locator("summary").click();
    await expect(aftercare).toHaveAttribute("open", "");
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

test("fee pages distinguish official conflicts from verified amounts", async ({ page }) => {
    await page.goto("/services/nin-date-of-birth-modification");
    // NIMC publishes two different figures: it is misleading to assert that
    // this page is verified until the agency reconciles the contradiction.
    await expect(page.locator(".status-badge.status-conflict")).toContainText("Confirm current details");
    await expect(page.getByText("₦28,574", { exact: false }).first()).toBeVisible();
    await expect(page.locator(".conflict-alert")).toContainText("Confirm current details before payment");

    await page.goto("/services/nin-slip-reissue");
    // The current NIMC Fees table shows ₦600 / ₦1,000 while its older
    // re-issuance instruction still says ₦500. Preserve the real conflict.
    await expect(page.locator(".status-badge.status-conflict")).toContainText("Confirm current details");
    await expect(page.getByText("₦600", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("₦1,000", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("₦500", { exact: false }).first()).toBeVisible();
    await expect(page.locator(".conflict-alert")).toContainText("Confirm current details before payment");

    // WAEC's current category pricing and its older overseas FAQ disagree:
    // a conflict is the correct public status, not an obsolete "Verified".
    await page.goto("/services/waec-result-confirmation-overseas");
    await expect(page.locator(".status-badge.status-conflict")).toContainText("Confirm current details");
    await expect(page.getByText("₦39,000", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("₦52,000", { exact: false }).first()).toBeVisible();
    await expect(page.locator(".conflict-alert")).toContainText("Confirm current details before payment");
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


  test("new editorial radar remains protected by Cloudflare Access", async ({ page, request }) => {
    test.skip(!process.env.LIVE_BASE_URL, "Production-only admin protection check.");

    const response = await request.get("/admin/trends", {
      failOnStatusCode: false,
      maxRedirects: 0,
    });
    expect(response.status()).toBe(302);
    expect(response.headers().location).toMatch(
      /^https:\/\/[^/]+\.cloudflareaccess\.com\/cdn-cgi\/access\/login\//,
    );

    await page.goto("/admin/trends");
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


test("live public entry-route response timing is measured without a flaky absolute performance gate", async () => {
  test.skip(!process.env.LIVE_BASE_URL, "Production-only edge-latency sampling.");
  const base = process.env.LIVE_BASE_URL!;
  // Homepage hits alone do not explain origin-level CrUX TTFB: include the
  // four pillar entry routes, particularly Jobs and movie browse, to detect
  // always-dynamic rendering even when the homepage is served from cache.
  for (const route of ["/", "/latest", "/jobs", "/entertainment/movies", "/services", "/explore"]) {
    for (let visit = 1; visit <= 2; visit++) {
      const started = performance.now();
      const response = await fetch(base + route, {
        headers: { "user-agent": "MyNigeriaGuide live edge latency QA" },
        signal: AbortSignal.timeout(15000),
      });
      const firstByteMs = Math.round(performance.now() - started);
      const html = await response.text();
      const totalMs = Math.round(performance.now() - started);
      expect(response.ok, route).toBeTruthy();
      expect(html).toContain("MyNigeriaGuide");
      const cacheState = response.headers.get("x-vinext-cache") ??
        response.headers.get("cf-cache-status") ?? "not-exposed";
      const clientCachePolicy = response.headers.get("cache-control") ?? "not-exposed";
      // Observational monitoring: network, region, deployment and cold starts
      // influence results. Never hide occasional slow samples or pretend that
      // a two-request measurement provides a statistically valid p95.
      console.log(
        "[edge-latency] " + route + " sample=" + visit +
        " TTFB=" + firstByteMs + "ms total=" + totalMs +
        "ms cache=" + cacheState + " policy=" + clientCachePolicy + " bytes=" + html.length,
      );
    }
  }
});


test("live mobile first-paint metrics are sampled alongside edge timing", async ({ page }, testInfo) => {
  test.skip(!process.env.LIVE_BASE_URL || testInfo.project.name !== "live-mobile",
    "Production mobile-only Core Web Vitals observational sample.");

  await page.addInitScript(() => {
    const store = { lcp: 0, cls: 0, longestInteraction: 0 };
    Object.assign(window, { __mngVitalsProbe: store });
    if (typeof PerformanceObserver === "undefined") return;
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) store.lcp = entry.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
    } catch {}
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
          if (!shift.hadRecentInput) store.cls += shift.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    } catch {}
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const event = entry as PerformanceEntry & { duration: number; interactionId?: number };
          if (event.interactionId) store.longestInteraction = Math.max(store.longestInteraction, event.duration);
        }
      }).observe({ type: "event", buffered: true, durationThreshold: 16 } as PerformanceObserverInit & { durationThreshold: number });
    } catch {}
  });

  // Sample genuine production responses without imposing a synthetic traffic
  // spike. The mobile emulation comes from the existing Pixel 7 project.
  for (const route of ["/", "/jobs", "/entertainment/movies", "/explore"]) {
    const response = await page.goto(route, { waitUntil: "load" });
    expect(response?.ok(), route).toBe(true);
    await page.waitForTimeout(300);
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const fcp = performance.getEntriesByName("first-contentful-paint")[0];
      const probe = (window as Window & {
        __mngVitalsProbe?: { lcp: number; cls: number; longestInteraction: number }
      }).__mngVitalsProbe;
      return {
        ttfbMs: nav ? Math.round(nav.responseStart - nav.startTime) : null,
        fcpMs: fcp ? Math.round(fcp.startTime) : null,
        lcpMs: probe?.lcp ? Math.round(probe.lcp) : null,
        cls: probe ? Number(probe.cls.toFixed(4)) : null,
        observedInpMs: probe?.longestInteraction || null,
      };
    });
    // These are lab samples, not 28-day Chrome p75 field results. Recording
    // rather than hard-coding a pass prevents regional variance or CI CPU
    // contention from concealing actual regressions.
    console.log("[mobile-cwv-observation] " + route + " " + JSON.stringify(metrics));
    expect(metrics.ttfbMs, route + " must have browser navigation timing").not.toBeNull();
  }
});
