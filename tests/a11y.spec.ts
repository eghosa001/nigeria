import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const paths = ["/", "/services", "/fees", "/categories/education", "/services/passport-renewal", "/offices", "/assistant", "/privacy"];

for (const path of paths) {
  test("no serious accessibility violations on " + path, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const serious = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    );

    expect(
      serious,
      serious.map((violation) => violation.id + ": " + violation.help).join("\n"),
    ).toEqual([]);
  });
}
