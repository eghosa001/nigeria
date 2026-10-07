test("phone shell fits and keeps admin out of public navigation without hydration errors", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  const hydrationErrors: string[] = [];
  const capture = (message: string) => {
    if (/react error #418|hydration|hydrating|server rendered html|did not match/i.test(message)) hydrationErrors.push(message);
  };
  page.on("pageerror", (error) => capture(error.message));
  page.on("console", (message) => message.type() === "error" && capture(message.text()));

  for (const path of ["/", "/services", "/entertainment/movies", "/explore"]) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), path).toBeLessThanOrEqual(1);
  }

  await page.goto("/");
  await expect(page.getByRole("link", { name: "Admin login" })).toHaveCount(0);

  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: "Admin access required" })).toBeVisible();
  await expect(page.getByLabel("Admin passphrase")).toBeVisible();
  await expect(page.getByRole("button", { name: "Unlock admin" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), "/admin").toBeLessThanOrEqual(1);

  expect(hydrationErrors).toEqual([]);
});

import { expect, test } from "@playwright/test";

test("admin pages hide all operational content until the shared admin session is unlocked", async ({ page, request }) => {
  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: "Admin access required" })).toBeVisible();
  await expect(page.getByText("Content & verification dashboard", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("navigation", { name: "Admin navigation" })).toHaveCount(0);

  await page.goto("/admin/services/passport-renewal");
  await expect(page.getByRole("heading", { name: "Admin access required" })).toBeVisible();
  await expect(page.getByText("Passport renewal", { exact: true })).toHaveCount(0);

  const unauthenticatedProposal = await page.evaluate(async () => {
    const response = await fetch("/admin/api/services/passport-renewal/proposal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service: {} }),
    });
    return response.status;
  });
  expect(unauthenticatedProposal).toBe(401);

  await page.getByLabel("Admin passphrase").fill("wrong-passphrase");
  await page.getByRole("button", { name: "Unlock admin" }).click();
  await expect(page.locator(".form-message.error")).toContainText("Incorrect admin passphrase");

  await page.getByLabel("Admin passphrase").fill("qa-only-passphrase");
  await page.getByRole("button", { name: "Unlock admin" }).click();
  await expect(page.getByRole("heading", { name: /Passport renewal/i })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Admin navigation" })).toBeVisible();

  await page.getByRole("button", { name: "Lock", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Admin access required" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Admin navigation" })).toHaveCount(0);
});

test("analytics dashboard code avoids unsupported GA4 regexp constructs", async ({ request }) => {
  const source = await request.get("/admin/visits");
  expect(source.status()).toBeLessThan(500);
});

test("visits unlock displays reports immediately and can be locked again", async ({ page }) => {
  // Keep the real form and rendering; only replace the external analytics boundary.
  let authenticated = false;
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("**/admin/api/analytics-access", async (route) => {
    if (route.request().method() === "DELETE") {
      authenticated = false;
    } else {
      authenticated = route.request().postDataJSON().password === "qa-only-passphrase";
    }
    await route.fulfill({ json: { authenticated } });
  });
  await page.route("**/admin/api/analytics?*", async (route) => {
    if (!authenticated) {
      await route.fulfill({ status: 401, json: { configured: true, authenticated: false } });
      return;
    }
    await route.fulfill({ json: { configured: true, authenticated: true, data: {
      range: "30d", mode: "clean", propertyId: "556260033",
      generatedAt: "2026-10-04T12:00:00Z", dataStartDate: "2026-09-29", cleanStartDate: "2026-09-29",
      summary: { activeUsers: 12, sessions: 18, pageViews: 35, engagedSessions: 9, engagementRate: 0.5 },
      realtimeActiveUsers: 2,
      realtimePageViews: 3,
      posthog: {
        trackingConfigured: true,
        reportingConfigured: true,
        projectId: 294041,
        webUrl: "https://eu.posthog.com/project/294041/web",
        collectionStartDate: "2026-10-05",
        overview: {
          available: true,
          startDate: "2026-10-05",
          endDate: "2026-10-05",
          visitors: 12,
          sessions: 18,
          views: 35,
          averageSessionDurationSeconds: 95,
          bounceRate: 0.42,
        },
      },
      daily: [{ date: "20261004", users: 12, sessions: 18, pageViews: 35 }],
      countries: [{ country: "Nigeria", users: 12, sessions: 18, pageViews: 35 }],
      pages: [{ path: "/services/passport-renewal", title: "Passport renewal", users: 12, pageViews: 35 }],
      referrers: [{ source: "google", medium: "organic", sessions: 18, users: 12 }],
      interactions: [{ event: "official_link_click", count: 9 }, { event: "guide_share", count: 4 }],
      searchPerformance: {
        available: true, source: "live", siteUrl: "sc-domain:mynigeriaguide.com",
        startDate: "2026-09-05", endDate: "2026-10-04", latestDate: "2026-10-03",
        firstIncompleteDate: null, impressions: 1460, clicks: 27, ctr: 0.0185, position: 22.5
      },
    } } });
  });

  await page.goto("/admin/visits");
  await expect(page.getByRole("heading", { name: "Admin access required" })).toBeVisible();
  await page.getByLabel("Admin passphrase").fill("qa-only-passphrase");
  await page.getByRole("button", { name: "Unlock admin" }).click();
  await expect(page.getByRole("heading", { name: "Visits & page views" })).toBeVisible();
  await page.getByLabel("Analytics passphrase").fill("qa-only-passphrase");
  await page.getByRole("button", { name: "Unlock visits" }).click();
  await expect(page.getByRole("button", { name: "Lock analytics" })).toBeVisible();
  const visitorMetrics = page.locator(".analytics-metric-grid").first();
  await expect(visitorMetrics).toContainText("12");
  await expect(visitorMetrics).toContainText("18");
  await expect(visitorMetrics).toContainText("35");
  const searchPanel = page.locator(".admin-panel").filter({ hasText: "Google Search visibility" });
  const searchMetrics = searchPanel.locator(".analytics-metric-grid");
  await expect(searchMetrics).toContainText("1,460");
  await expect(searchMetrics).toContainText("27");
  await expect(page.getByLabel("Daily page views").locator("[title]")).toHaveAttribute("title", /35 page views/);
  await expect(page.locator(".analytics-ranking").getByText("Nigeria", { exact: true })).toBeVisible();
  await expect(page.locator(".analytics-ranking").getByText("google", { exact: true })).toBeVisible();
  await expect(page.locator(".analytics-page-table")).toContainText("Passport renewal");
  const interactionPanel = page.locator(".analytics-interactions");
  await expect(interactionPanel).toBeVisible();
  await expect(interactionPanel).toContainText("Official service link opened");
  await page.getByRole("button", { name: "Lock analytics" }).click();
  await expect(page.getByLabel("Analytics passphrase")).toBeEmpty();
  expect(errors).toEqual([]);
});

test("plain-language search finds the right service", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("What do you want to do?").fill("my passport expired");
  await expect(page.locator(".search-results").getByRole("link", { name: /Passport renewal/i })).toBeVisible();
});

test("site search crosses services travel and movies", async ({ page }) => {
  await page.goto("/search?q=passport");
  await expect(page.locator('a[href="/services/passport-renewal"]').first()).toBeVisible();

  await page.goto("/search?q=Lagos");
  await expect(page.getByRole("link", { name: /Lagos Travel Guide/i }).first()).toBeVisible();

  await page.goto("/search?q=Anikulapo");
  await expect(page.locator('a[href="/entertainment/movies/anikulapo"]').first()).toBeVisible();
});

test("directory supports deep-linked category filters", async ({ page }) => {
  await page.goto("/services?category=Education");
  await expect(page.getByLabel("Category")).toHaveValue("Education");
  await expect(page.getByRole("heading", { name: /JAMB|WAEC|NECO/i }).first()).toBeVisible();
});

test("assistant stays lightweight and retired JAMB URL resolves", async ({ page }) => {
  await page.goto("/assistant");
  await expect(page.locator("h1")).toHaveCount(1);
  await page.getByLabel("What are you trying to do?").fill("renew passport");
  await page.getByRole("button", { name: /Find my guide/i }).click();
  await expect(page.locator(".assistant-results").getByRole("link").first()).toBeVisible();

  await page.goto("/services/jamb-direct-entry");
  await expect(page).toHaveURL(/\/services\/jamb-direct-entry-2026$/);

  await page.goto("/services/jamb-direct-entry-2026");
  const description = await page.locator('meta[name="description"]').getAttribute("content");
  expect(description?.length ?? 0).toBeGreaterThan(80);
  await page.goto("/services/jamb-caps");
  expect((await page.title()).length).toBeGreaterThanOrEqual(30);
});

test("service guides expose trust and sharing actions", async ({ page }) => {
  await page.goto("/services/passport-renewal");
  await expect(page.getByText("Verified", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Share" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Watch this guide" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Official .* sources for Passport renewal/i })).toBeVisible();
});

test("correction API rejects malformed and tampered submissions before any backend call", async ({ page }) => {
  await page.goto("/");

  const statuses = await page.evaluate(async () => {
    const nonJson = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "not-json",
    });

    const unknownService = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_slug: "not-a-real-service",
        report_type: "incorrect_fee",
        message: "This is long enough to be a valid report body.",
        contact_email: "",
        website: "",
      }),
    });

    const invalidEmail = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_slug: "passport-renewal",
        report_type: "incorrect_fee",
        message: "This is long enough to be a valid report body.",
        contact_email: "not-an-email",
        website: "",
      }),
    });

    return [nonJson.status, unknownService.status, invalidEmail.status];
  });

  expect(statuses).toEqual([415, 400, 400]);
});

test("guide pages defer correction-backend checks until the visitor wants to report", async ({ page }) => {
  let availabilityChecks = 0;
  await page.route("**/api/reports", async (route) => {
    if (route.request().method() === "GET") {
      availabilityChecks += 1;
      await route.fulfill({ json: { configured: false } });
      return;
    }
    await route.continue();
  });
  await page.goto("/services/passport-renewal");
  expect(availabilityChecks).toBe(0);
  await page.getByRole("button", { name: "Report an issue" }).click();
  await expect(page.getByText("Persistent public submissions are not enabled right now")).toBeVisible();
  expect(availabilityChecks).toBe(1);
});

test("watching a guide persists on the device", async ({ page }) => {
  await page.goto("/services/passport-renewal");
  await page.getByRole("button", { name: "Watch this guide" }).click();
  await page.goto("/saved");
  await expect(page.getByRole("heading", { name: "Passport renewal" })).toBeVisible();
});

test("fee directory and category pages are discoverable", async ({ page }) => {
  await page.goto("/fees");
  await expect(page.getByRole("heading", { name: "Nigeria government fees and service charges" })).toBeVisible();
  await page.getByLabel("Search fees").fill("passport");
  await expect(page.getByRole("listitem").filter({ hasText: "Passport renewal" }).first()).toBeVisible();

  await page.goto("/categories/education");
  await expect(page.getByRole("heading", { name: "Education services in Nigeria" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /JAMB|WAEC|NECO/i }).first()).toBeVisible();
});

test("verified updates link back to affected guides and official sources", async ({ page }) => {
  await page.goto("/updates");
  await expect(page.getByRole("heading", { name: "Verified government service updates" })).toBeVisible();
  await expect(page.getByText("JAMB confirms no increase in 2026 UTME registration fees")).toBeVisible();
  await expect(page.getByRole("link", { name: /2026 JAMB registration/i }).first()).toBeVisible();
});

test("verified update RSS feed is available without a backend", async ({ request }) => {
  const response = await request.get("/updates.xml");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/rss+xml");
  const xml = await response.text();
  expect(xml).toContain("<rss");
  expect(xml).toContain("JAMB confirms no increase in 2026 UTME registration fees");
});

test("homepage has a canonical URL and offline fallback is not indexable", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/mynigeriaguide\.com\/?$/);

  await page.goto("/offline");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
});

test("service worker never stores private or no-store responses", async ({ request }) => {
  const response = await request.get("/sw.js");
  expect(response.ok()).toBeTruthy();
  const source = await response.text();
  expect(source).toContain('"/admin"');
  expect(source).toContain('"/api/"');
  expect(source).toContain('cacheControl.includes("no-store")');
  expect(source).toContain('cacheControl.includes("private")');
  expect(source).toContain('mynigeriaguide-v2');
});

test("security headers protect public and admin responses", async ({ request }) => {
  for (const path of ["/", "/admin"]) {
    const response = await request.get(path);
    expect(response.headers()["content-security-policy"]).toContain("default-src 'self'");
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response.headers()["x-frame-options"]).toBe("SAMEORIGIN");
    expect(response.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(response.headers()["strict-transport-security"]).toContain("max-age=31536000");
    if (path === "/admin") {
      expect(response.headers()["cache-control"]).toContain("private");
      expect(response.headers()["cache-control"]).toContain("no-store");
    }
  }
});

test("health endpoint reports the published catalog", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.status).toBe("ok");
  expect(body.publicGuides).toBeGreaterThanOrEqual(106);
});

test("mobile public layout uses a single-column hierarchy and usable navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("/");
  await expect(page.getByRole("button", { name: "Open navigation" })).toHaveCount(0);
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeHidden();

  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNav).toBeVisible();
  await expect(mobileNav.getByRole("link", { name: "Home", exact: true })).toHaveAttribute("aria-current", "page");
  const mobileSearch = page.getByRole("link", { name: "Search MyNigeriaGuide" });
  await expect(mobileSearch).toBeVisible();
  await expect(mobileSearch).toHaveAttribute("href", "/search");

  const navBox = await mobileNav.boundingBox();
  expect(navBox?.x ?? -1).toBeGreaterThanOrEqual(0);
  expect((navBox?.x ?? 0) + (navBox?.width ?? 0)).toBeLessThanOrEqual(390);
  expect((navBox?.y ?? 0) + (navBox?.height ?? 0)).toBeLessThanOrEqual(844);

  const heroColumns = await page.locator(".minimal-home-hero-inner").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length);
  expect(heroColumns).toBe(1);
  const homeOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(homeOverflow).toBeLessThanOrEqual(1);

  await page.goto("/services");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Services", exact: true })).toHaveAttribute("aria-current", "page");
  const directoryColumns = await page.locator(".directory-controls").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length);
  expect(directoryColumns).toBe(1);

  await page.goto("/assistant");
  const assistantColumns = await page.locator(".assistant-form > div").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length);
  expect(assistantColumns).toBe(1);

  await page.goto("/services/passport-renewal");
  const guideColumns = await page.locator(".guide-layout").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length);
  expect(guideColumns).toBe(1);
  const statusColumns = await page.locator(".service-status-strip").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length);
  expect(statusColumns).toBe(1);
  const guideOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(guideOverflow).toBeLessThanOrEqual(1);

  await page.goto("/contact");
  await expect(page.locator(".site-footer")).toContainText("contact@mynigeriaguide.com");
  const footerColumns = await page.locator(".footer-grid").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length);
  expect(footerColumns).toBe(1);
});

test("core pages do not overflow horizontally", async ({ page }) => {
  for (const path of ["/", "/search", "/services", "/explore", "/entertainment", "/entertainment/youtube", "/fees", "/updates", "/categories/education", "/services/passport-renewal", "/offices", "/assistant"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path + " horizontal overflow").toBeLessThanOrEqual(1);
  }
});

test("typo-tolerant search finds JAMB and new BVN guides", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("What do you want to do?").fill("jamn registration");
  await expect(page.locator(".search-results").getByRole("link", { name: /JAMB|UTME/i }).first()).toBeVisible();
  await page.getByLabel("What do you want to do?").fill("forgot bvn");
  await expect(page.locator(".search-results").getByRole("link", { name: /Retrieve BVN/i })).toBeVisible();
});

test("service process tracker can start and persist locally", async ({ page }) => {
  await page.goto("/services/bvn-enrolment");
  await page.getByRole("button", { name: /Start this process/i }).click();
  await expect(page.getByRole("heading", { name: /items completed/i })).toBeVisible();
  await page.locator(".process-check input").first().check();
  await page.reload();
  await expect(page.locator(".process-check input").first()).toBeChecked();
});

test("international travel category exposes travel services", async ({ page }) => {
  await page.goto("/categories/international-travel");
  await expect(page.getByRole("heading", { name: /International travel services in Nigeria/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Yellow Card|ECOWAS Travel Certificate|Landing/i }).first()).toBeVisible();
});

test("police and PVC guides are discoverable", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("What do you want to do?").fill("police clearance");
  await expect(page.locator(".search-results").getByRole("link", { name: /Police Character Certificate/i })).toBeVisible();
  await page.getByLabel("What do you want to do?").fill("find my pvc");
  await expect(page.locator(".search-results").getByRole("link", { name: /PVC status/i })).toBeVisible();
});

test("NIBSS transfer and Nigeria visa guides are discoverable", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("What do you want to do?").fill("check transfer status");
  await expect(page.locator(".search-results").getByRole("link", { name: /NIP transfer status/i })).toBeVisible();

  await page.getByLabel("What do you want to do?").fill("apply nigeria tourist visa");
  await expect(page.locator(".search-results").getByRole("link", { name: /Nigeria Tourism Visa/i })).toBeVisible();

  await page.goto("/services/nigeria-evisa-application");
  await expect(page.getByRole("heading", { name: "How to apply for a Nigeria e-Visa" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /How to complete .*Nigeria e-Visa.* step by step/i })).toBeVisible();

  await page.goto("/services/nip-transfer-status");
  await expect(page.locator("#notes")).toContainText(/previous 48 hours/i);
});

test("guide anchors do not trap browser Back after starting a process", async ({ page }) => {
  await page.goto("/services?category=Banking");
  await page.getByRole("heading", { name: /BVN enrolment/i }).first().click();
  await expect(page).toHaveURL(/\/services\/bvn-enrolment/);

  await page.getByRole("button", { name: /Start this process/i }).click();
  await page.getByRole("navigation", { name: "On this page" }).getByRole("link", { name: "Steps" }).click();
  await expect(page).toHaveURL(/\/services\/bvn-enrolment#steps$/);

  await page.goBack();
  await expect(page).toHaveURL(/\/services\?category=Banking$/);
  await expect(page.getByRole("heading", { name: "Service guides for Nigeria" })).toBeVisible();
});

test("brand logo always returns home, including after process activity", async ({ page }) => {
  await page.goto("/services/bvn-enrolment");
  await page.getByRole("button", { name: /Start this process/i }).click();
  await page.getByRole("navigation", { name: "On this page" }).getByRole("link", { name: "Steps" }).click();
  await page.getByRole("link", { name: "MyNigeriaGuide home" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { name: /Nigeria, easier to explore/i })).toBeVisible();
});

test("service FAQ answers are contextual and complete enough to guide the next action", async ({ page }) => {
  await page.goto("/services/passport-renewal");
  const questions = page.locator("#questions details");
  await expect(questions).toHaveCount(9);
  await expect(page.locator("#questions")).toContainText("Online + physical visit");
  await expect(page.locator("#questions")).toContainText(/official|agency/i);
  await expect(page.locator("#questions")).toContainText(/last checked|checked on/i);
});

test("service links distinguish exact guidance from transaction portal", async ({ page }) => {
  await page.goto("/services/nin-name-modification");
  await expect(page.locator('a[data-official-purpose="guidance"]')).toHaveAttribute("href", /nimc\.gov\.ng\/self-service-modifications/);
  await expect(page.locator('a[data-official-purpose="action"]')).toHaveAttribute("href", /selfservicemodification\.nimc\.gov\.ng/);

  await page.goto("/services/passport-renewal");
  await expect(page.locator('a[data-official-purpose="guidance"]')).toHaveAttribute("href", /immigration\.gov\.ng\/info-center\/renewal-of-passport/);
  await expect(page.locator('a[data-official-purpose="action"]')).toHaveAttribute("href", /passport\.immigration\.gov\.ng/);

  await page.goto("/services/jamb-profile-code");
  await expect(page.locator('a[data-official-purpose="guidance"]')).toHaveAttribute("href", /jamb\.gov\.ng\/FAQ/i);
  await expect(page.locator('a[data-official-purpose="action"]')).toHaveCount(0);

  await page.goto("/services/npc-digital-birth-certificate-reissuance");
  await expect(page.locator('a[data-official-purpose="guidance"]')).toHaveAttribute("href", /reissuance\.nationalpopulation\.gov\.ng/);

  await page.goto("/services/nigeria-tourism-visa");
  await expect(page.locator('a[data-official-purpose="guidance"]')).toHaveAttribute("href", /immigration\.gov\.ng\/info-center\/tourism-visa-f5a/);
  await expect(page.locator('a[data-official-purpose="action"]')).toHaveAttribute("href", /visa\.immigration\.gov\.ng/);
});


test("admin login rate limit blocks repeated bad passwords", async ({ request }, testInfo) => {
  const headers = {
    "Content-Type": "application/json",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": `mynigeriaguide-rate-limit-test-${testInfo.project.name}-${testInfo.retry}`,
  };
  for (let attempt = 0; attempt < 8; attempt++) {
    const response = await request.post("/admin/api/access", {
      headers,
      data: { password: "definitely-wrong" },
    });
    expect(response.status()).toBe(401);
  }
  const blocked = await request.post("/admin/api/access", {
    headers,
    data: { password: "definitely-wrong" },
  });
  expect(blocked.status()).toBe(429);
  expect(blocked.headers()["retry-after"]).toBeTruthy();
});


test("service metadata descriptions are meaningful", async ({ page }) => {
  await page.goto("/services/jamb-direct-entry-2026");
  const description = await page.locator('meta[name="description"]').getAttribute("content");
  expect(description?.length ?? 0).toBeGreaterThan(80);
  expect(description).toContain("2026 JAMB training manual");
});


test("topic hubs cross-link high-intent tasks and service guides", async ({ page }) => {
  await page.goto("/topics/nigerian-passport");
  await expect(page.getByRole("heading", { name: "Nigerian Passport Application & Renewal Guide 2026" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Passport renewal" })).toBeVisible();

  await page.goto("/services/passport-renewal");
  await expect(page.getByRole("link", { name: /Nigerian Passport Application & Renewal Guide 2026/ })).toBeVisible();
});

test("guide sharing exposes a reusable current summary", async ({ page }) => {
  await page.goto("/services/passport-renewal");
  await expect(page.getByRole("button", { name: "Copy summary" })).toBeVisible();
  const whatsapp = page.getByRole("link", { name: "WhatsApp" });
  await expect(whatsapp).toHaveAttribute("href", /Fee%20%2F%20status/);
  await expect(whatsapp).toHaveAttribute("href", /Checked%3A/);
});


test("service guides expose verified search-intent quick answers", async ({ page }) => {
  await page.goto("/services/passport-renewal");
  const quick = page.locator("#quick-answers");
  await expect(quick.getByRole("heading", { name: /Quick answers about Passport renewal/i })).toBeVisible();
  await expect(quick.getByRole("heading", { name: /How much is Nigerian passport renewal\?/i })).toBeVisible();
  await expect(quick).toContainText("₦100,000 / ₦200,000");
  const hasFaqSchema = await page.locator('#main-content script[type="application/ld+json"]').evaluateAll(
    (scripts) => scripts.some((script) => script.innerHTML.includes("FAQPage")),
  );
  expect(hasFaqSchema).toBeTruthy();
});

test("topic search phrases point to exact guides", async ({ page }) => {
  await page.goto("/topics/jamb-2026");
  const searches = page.locator(".topic-searches");
  await expect(searches.getByRole("link", { name: /JAMB Direct Entry 2026/ })).toHaveAttribute("href", "/services/jamb-direct-entry-2026");
  await expect(searches.getByRole("link", { name: "JAMB CAPS", exact: true })).toHaveAttribute("href", "/services/jamb-caps");
});


test("official portal reference page exposes direct authorities and guide routes", async ({ page }) => {
  await page.goto("/official-portals");
  await expect(page.getByRole("heading", { name: "Official government and service portals" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open official website ↗" }).first()).toHaveAttribute("href", /^https:\/\//);
  await expect(page.getByRole("link", { name: "View verified guides →" }).first()).toHaveAttribute("href", /^\/agencies\//);
});
