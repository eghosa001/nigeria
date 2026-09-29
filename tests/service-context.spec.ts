import { expect, test } from "@playwright/test";

test("researched category guidance appears inside the relevant service explanation", async ({ page }) => {
  await page.goto("/services/jamb-direct-entry-2026");
  const context = page.locator("#key-guidance");
  await expect(context.getByRole("heading", { name: "What you need to know before you continue" })).toBeVisible();
  await expect(context).toContainText(/cashless/i);

  await page.goto("/services/npc-birth-attestation");
  await expect(page.locator("#key-guidance")).toContainText(/Temporary Attestation Number/i);

  await page.goto("/services/passport-renewal");
  await expect(page.locator("#key-guidance")).toContainText(/application status/i);
});
