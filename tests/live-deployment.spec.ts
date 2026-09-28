import { expect, test } from "@playwright/test";

test.describe("live MyNigeriaGuide deployment", () => {
  test("brand, navigation and core service route are live", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("MyNigeriaGuide", { exact: true }).first()).toBeVisible();
    await expect(page.getByLabel("What do you want to do?")).toBeVisible();

    await page.goto("/services/jamb-direct-entry-2026");
    await expect(page.getByRole("heading", { name: /JAMB Direct Entry/i })).toBeVisible();
    await expect(page.getByText("How to get this service", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Online, physical or both?" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What happens next?" })).toBeVisible();
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

  test("live core pages do not horizontally overflow", async ({ page }) => {
    for (const path of ["/", "/services", "/fees", "/updates", "/offices", "/assistant", "/services/jamb-direct-entry-2026"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path + " horizontal overflow").toBeLessThanOrEqual(1);
    }
  });
});
