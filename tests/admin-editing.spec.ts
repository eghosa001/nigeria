import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.setTimeout(10_000);

test("admin guide editing stays locked until the shared admin passphrase succeeds", async ({ page }) => {
  await page.goto("/admin/services/passport-renewal");

  await expect(page.getByLabel("Admin passphrase")).toBeVisible();
  await expect(page.getByLabel("Guide summary")).toHaveCount(0);

  await page.getByLabel("Admin passphrase").fill("wrong");
  await page.getByRole("button", { name: "Unlock editing" }).click();
  await expect(page.getByText("Incorrect admin passphrase.")).toBeVisible();
  await expect(page.getByLabel("Guide summary")).toHaveCount(0);

  await page.getByLabel("Admin passphrase").fill("qa-only-passphrase");
  await page.getByRole("button", { name: "Unlock editing" }).click();

  await expect(page.getByLabel("Guide summary")).toBeVisible();
  await expect(page.getByRole("button", { name: "Create review change" })).toBeVisible();
});

test("admin editor creates a review proposal and does not claim to publish", async ({ page }) => {
  await page.route("**/api/admin/services/passport-renewal/proposal", async (route) => {
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
  await page.getByLabel("Admin passphrase").fill("qa-only-passphrase");
  await page.getByRole("button", { name: "Unlock editing" }).click();

  const summary = page.getByLabel("Guide summary");
  await summary.fill((await summary.inputValue()) + " review-flow test");
  await page.getByRole("button", { name: "Create review change" }).click();

  await expect(page.getByRole("link", { name: /Open pull request/i })).toHaveAttribute(
    "href",
    "https://github.com/eghosa001/nigeria/pull/999",
  );
  await expect(page.getByText(/Production has not changed yet/i)).toBeVisible();
  await expect(page.getByText(/published/i)).not.toContainText("published successfully");
});

test("authenticated admin editor has no serious accessibility violations", async ({ page }) => {
  await page.goto("/admin/services/passport-renewal");
  await page.getByLabel("Admin passphrase").fill("qa-only-passphrase");
  await page.getByRole("button", { name: "Unlock editing" }).click();
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
  await page.getByLabel("Admin passphrase").fill("qa-only-passphrase");
  await page.getByRole("button", { name: "Unlock editing" }).click();

  await expect(page.getByLabel("Guide summary")).toBeVisible();
  await expect(page.getByRole("button", { name: "Create review change" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
