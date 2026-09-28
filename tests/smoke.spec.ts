import { expect, test } from "@playwright/test";

test("visits unlock displays reports immediately and can be locked again", async ({ page }) => {
  // Keep the real form and rendering; only replace the external analytics boundary.
  let authenticated = false;
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("**/api/admin/analytics-access", async (route) => {
    if (route.request().method() === "DELETE") {
      authenticated = false;
    } else {
      authenticated = route.request().postDataJSON().password === "qa-only-passphrase";
    }
    await route.fulfill({ json: { authenticated } });
  });
  await page.route("**/api/admin/analytics?*", async (route) => {
    if (!authenticated) {
      await route.fulfill({ status: 401, json: { configured: true, authenticated: false } });
      return;
    }
    await route.fulfill({ json: { configured: true, authenticated: true, data: {
      range: "30d", generatedAt: "2026-09-28T12:00:00Z",
      summary: { activeUsers: 12, sessions: 18, pageViews: 35, engagedSessions: 9, engagementRate: 0.5 },
      realtimeActiveUsers: 2,
      daily: [{ date: "20260928", users: 12, sessions: 18, pageViews: 35 }],
      countries: [{ country: "Nigeria", users: 12, sessions: 18, pageViews: 35 }],
      pages: [{ path: "/services/passport-renewal", title: "Passport renewal", users: 12, pageViews: 35 }],
      referrers: [{ source: "google", medium: "organic", sessions: 18, users: 12 }],
    } } });
  });

  await page.goto("/admin/visits");
  await page.getByLabel("Analytics passphrase").fill("qa-only-passphrase");
  await page.getByRole("button", { name: "Unlock visits" }).click();
  await expect(page.getByRole("button", { name: "Lock analytics" })).toBeVisible();
  await expect(page.locator(".analytics-metric-grid")).toContainText("12");
  await expect(page.locator(".analytics-metric-grid")).toContainText("18");
  await expect(page.locator(".analytics-metric-grid")).toContainText("35");
  await expect(page.getByLabel("Daily page views").locator("[title]")).toHaveAttribute("title", /35 page views/);
  await expect(page.locator(".analytics-ranking").getByText("Nigeria", { exact: true })).toBeVisible();
  await expect(page.locator(".analytics-ranking").getByText("google", { exact: true })).toBeVisible();
  await expect(page.locator(".analytics-page-table")).toContainText("Passport renewal");
  await page.getByRole("button", { name: "Lock analytics" }).click();
  await expect(page.getByLabel("Analytics passphrase")).toBeEmpty();
  expect(errors).toEqual([]);
});

test("plain-language search finds the right service", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("What do you want to do?").fill("my passport expired");
  await expect(page.locator(".search-results").getByRole("link", { name: /Passport renewal/i })).toBeVisible();
});

test("directory supports deep-linked category filters", async ({ page }) => {
  await page.goto("/services?category=Education");
  await expect(page.getByLabel("Category")).toHaveValue("Education");
  await expect(page.getByRole("heading", { name: /JAMB|WAEC|NECO/i }).first()).toBeVisible();
});

test("service guides expose trust and sharing actions", async ({ page }) => {
  await page.goto("/services/passport-renewal");
  await expect(page.getByText("Verified", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Share" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Watch this guide" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Official sources" })).toBeVisible();
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

test("database-free launch never shows a dead correction form", async ({ page }) => {
  await page.goto("/services/passport-renewal");
  await expect(page.getByText("Persistent public submissions are not enabled yet")).toBeVisible();
  await expect(page.getByRole("button", { name: "Report an issue" })).toHaveCount(0);
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

test("health endpoint reports the published catalog", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.status).toBe("ok");
  expect(body.publicGuides).toBeGreaterThanOrEqual(106);
});

test("core pages do not overflow horizontally", async ({ page }) => {
  for (const path of ["/", "/services", "/fees", "/updates", "/categories/education", "/services/passport-renewal", "/offices", "/assistant"]) {
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

test("BVN change and Nigeria visa guides are discoverable", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("What do you want to do?").fill("change phone number on bvn");
  await expect(page.locator(".search-results").getByRole("link", { name: /Change BVN details/i })).toBeVisible();

  await page.getByLabel("What do you want to do?").fill("apply nigeria tourist visa");
  await expect(page.locator(".search-results").getByRole("link", { name: /Nigeria Tourism Visa/i })).toBeVisible();

  await page.goto("/services/nigeria-evisa-application");
  await expect(page.getByRole("heading", { name: "How to apply for a Nigeria e-Visa" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Step-by-step instructions" })).toBeVisible();

  await page.goto("/services/bvn-change-details");
  await expect(page.locator("#notes")).toContainText(/phone number may be changed only once/i);
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
  await expect(page.getByRole("heading", { name: "Government service guides" })).toBeVisible();
});

test("brand logo always returns home, including after process activity", async ({ page }) => {
  await page.goto("/services/bvn-enrolment");
  await page.getByRole("button", { name: /Start this process/i }).click();
  await page.getByRole("navigation", { name: "On this page" }).getByRole("link", { name: "Steps" }).click();
  await page.getByRole("link", { name: "MyNigeriaGuide home" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { name: /Get government services done/i })).toBeVisible();
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
