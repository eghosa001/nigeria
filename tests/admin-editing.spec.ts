import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.setTimeout(15_000);

async function unlockAdmin(page: import("@playwright/test").Page) {
  await expect(page.getByRole("heading", { name: "Admin access required" })).toBeVisible();
  await page.getByLabel("Admin passphrase").fill("qa-only-passphrase");
  await page.getByRole("button", { name: "Unlock admin" }).click();
  await expect(page.getByLabel("Guide summary")).toBeVisible();
}

test("admin guide editing stays locked until the shared admin passphrase succeeds", async ({ page }) => {
  await page.goto("/admin/services/passport-renewal");

  await expect(page.getByRole("heading", { name: "Admin access required" })).toBeVisible();
  await expect(page.getByLabel("Guide summary")).toHaveCount(0);

  await page.getByLabel("Admin passphrase").fill("wrong");
  await page.getByRole("button", { name: "Unlock admin" }).click();
  await expect(page.getByText("Incorrect admin passphrase.")).toBeVisible();
  await expect(page.getByLabel("Guide summary")).toHaveCount(0);

  await page.getByLabel("Admin passphrase").fill("qa-only-passphrase");
  await page.getByRole("button", { name: "Unlock admin" }).click();

  await expect(page.getByLabel("Guide summary")).toBeVisible();
  await expect(page.getByRole("button", { name: "Create review change" })).toBeVisible();
});

test("admin editor allows normal spaces while typing list fields", async ({ page }) => {
  await page.goto("/admin/services/passport-renewal");
  await unlockAdmin(page);

  const requirements = page.getByLabel("Requirements — one per line");
  await requirements.fill("");
  await requirements.pressSequentially("Proof of address with normal spaces");

  await expect(requirements).toHaveValue("Proof of address with normal spaces");
});

test("admin editor creates a review proposal and does not claim to publish", async ({ page }) => {
  await page.route("**/admin/api/services/passport-renewal/proposal", async (route) => {
    expect(route.request().method()).toBe("POST");
    const body = route.request().postDataJSON();
    expect(body.service.slug).toBe("passport-renewal");
    expect(body.service.summary).toContain("review-flow test");
    await route.fulfill({
      status: 201,
      json: {
        pullRequestUrl: "https://github.com/eghosa001/nigeria/pull/999",
        pullRequestNumber: 999,
        branch: "admin/passport-renewal-test",
      },
    });
  });

  await page.goto("/admin/services/passport-renewal");
  await unlockAdmin(page);

  const summary = page.getByLabel("Guide summary");
  await summary.fill((await summary.inputValue()) + " review-flow test");
  await page.getByRole("button", { name: "Create review change" }).click();

  await expect(page.getByRole("link", { name: /Open pull request/i })).toHaveAttribute(
    "href",
    "https://github.com/eghosa001/nigeria/pull/999",
  );
  await expect(page.getByText(/Production has not changed yet/i)).toBeVisible();
  await expect(page.getByText(/published successfully/i)).toHaveCount(0);
});

test("authenticated admin editor has no serious accessibility violations", async ({ page }) => {
  await page.goto("/admin/services/passport-renewal");
  await unlockAdmin(page);
  await expect(page.getByLabel("Guide summary")).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );
  expect(serious, serious.map((violation) => violation.id + ": " + violation.help).join("\n")).toEqual([]);
});

test("admin editor remains usable at mobile width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/admin/services/passport-renewal");
  await unlockAdmin(page);

  await expect(page.getByLabel("Guide summary")).toBeVisible();
  await expect(page.getByRole("button", { name: "Create review change" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});


test("admin content API enforces authentication and validates requests before GitHub", async ({ page }) => {
  await page.goto("/admin/services/passport-renewal");

  const unauthenticated = await page.evaluate(async () => {
    const response = await fetch("/admin/api/services/passport-renewal/proposal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    return { status: response.status, body: await response.json() };
  });
  expect(unauthenticated.status).toBe(401);

  await unlockAdmin(page);
  await expect(page.getByLabel("Guide summary")).toBeVisible();

  const malformed = await page.evaluate(async () => {
    const response = await fetch("/admin/api/services/passport-renewal/proposal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{bad-json",
    });
    return response.status;
  });
  expect(malformed).toBe(400);

  const changedSlug = await page.evaluate(async () => {
    const response = await fetch("/admin/api/services/passport-renewal/proposal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service: {
          slug: "tampered-slug",
          title: "x",
          shortTitle: "x",
          summary: "x",
          category: "x",
          agencySlug: "x",
          feeLabel: "x",
          status: "review",
          lastVerified: "2026-09-28",
          requirements: ["x"],
          steps: ["x"],
          notes: ["x"],
          sources: [{ label: "x", agency: "x", url: "https://example.com", lastChecked: "2026-09-28" }],
          searchTerms: ["x"],
          related: [],
        },
      }),
    });
    return response.status;
  });
  expect(changedSlug).toBe(400);

  const unknown = await page.evaluate(async () => {
    const response = await fetch("/admin/api/services/not-a-real-guide/proposal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service: {} }),
    });
    return response.status;
  });
  expect(unknown).toBe(404);

  const tooLarge = await page.evaluate(async () => {
    const response = await fetch("/admin/api/services/passport-renewal/proposal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service: { summary: "x".repeat(190_000) } }),
    });
    return response.status;
  });
  expect(tooLarge).toBe(413);
});

test("admin editing session can be explicitly locked", async ({ page }) => {
  await page.goto("/admin/services/passport-renewal");
  await unlockAdmin(page);
  await expect(page.getByLabel("Guide summary")).toBeVisible();

  await page.getByRole("button", { name: "Lock", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Admin access required" })).toBeVisible();

  const state = await page.evaluate(async () => {
    const response = await fetch("/admin/api/content-access", { cache: "no-store" });
    return await response.json();
  });
  expect(state.authenticated).toBe(false);
});


test("legacy admin API aliases stay closed outside the Cloudflare Access path", async ({ request }) => {
  const headers = { "Content-Type": "application/json", "Sec-Fetch-Site": "same-origin" };
  expect((await request.post("/api/admin/access", { headers, data: { password: "qa-only-passphrase" } })).status()).toBe(404);
  expect((await request.get("/api/admin/content-access")).status()).toBe(404);
  expect((await request.get("/api/admin/analytics")).status()).toBe(404);
  expect((await request.post("/api/admin/services/passport-renewal/proposal", { headers, data: { service: {} } })).status()).toBe(404);
});

test("admin auth rejects cross-origin and non-JSON requests", async ({ request }) => {
  const crossOrigin = await request.post("/admin/api/access", {
    headers: { "Content-Type": "application/json", "Sec-Fetch-Site": "cross-site", Origin: "https://attacker.example" },
    data: { password: "qa-only-passphrase" },
  });
  expect(crossOrigin.status()).toBe(403);

  const wrongType = await request.post("/admin/api/access", {
    headers: { "Content-Type": "text/plain", "Sec-Fetch-Site": "same-origin" },
    data: "qa-only-passphrase",
  });
  expect(wrongType.status()).toBe(415);

  const analyticsCrossOrigin = await request.post("/admin/api/analytics-access", {
    headers: { "Content-Type": "application/json", "Sec-Fetch-Site": "cross-site", Origin: "https://attacker.example" },
    data: { password: "qa-only-passphrase" },
  });
  expect(analyticsCrossOrigin.status()).toBe(403);
});

test("admin session cookie is least-privilege and hardened", async ({ request }) => {
  const response = await request.post("/admin/api/access", {
    headers: { "Content-Type": "application/json", "Sec-Fetch-Site": "same-origin" },
    data: { password: "qa-only-passphrase" },
  });
  expect(response.status()).toBe(200);
  const cookie = response.headers()["set-cookie"];
  expect(cookie).toMatch(/Path=\/admin(?:;|$)/i);
  expect(cookie).toMatch(/HttpOnly/i);
  expect(cookie).toMatch(/Secure/i);
  expect(cookie).toMatch(/SameSite=Strict/i);
});

test("editor re-locks if its signed session expires before submit", async ({ page }) => {
  await page.goto("/admin/services/passport-renewal");
  await unlockAdmin(page);
  await page.route("**/admin/api/services/passport-renewal/proposal", (route) =>
    route.fulfill({ status: 401, json: { error: "Admin authentication required." } }),
  );
  const summary = page.getByLabel("Guide summary");
  await summary.fill((await summary.inputValue()) + " session-expiry-test");
  await page.getByRole("button", { name: "Create review change" }).click();
  await expect(page.getByRole("heading", { name: "Unlock guide editing" })).toBeVisible();
  await expect(page.getByText("Your admin editing session expired. Unlock editing and try again.")).toBeVisible();
});
