import { expect, test } from "@playwright/test";
import { ADSENSE_CLIENT, AD_SLOTS } from "@/lib/adsense-config";

test("core service AdSense remains present without deployment-specific env injection", async ({ page }) => {
  await page.goto("/services/jamb-direct-entry-2026");
  await expect(page.locator('script[data-mynigeriaguide-adsense]')).toHaveAttribute(
    "src", new RegExp("adsbygoogle\\.js\\?client=" + ADSENSE_CLIENT),
  );
  const ids = await page.locator(".ad-container ins.adsbygoogle")
    .evaluateAll((nodes) => nodes.map((node) => (node as HTMLElement).dataset.adSlot));
  expect(ids).toContain(AD_SLOTS.serviceAfterAnswer);
  expect(ids).toContain(AD_SLOTS.serviceMid);
});
