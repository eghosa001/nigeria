import { expect, test } from "@playwright/test";

test("nine source-reviewed October releases provide accurate current date and viewing guidance", async ({ page }) => {
  await page.goto("/entertainment/releases");
  const checked = [
    ["A Land Apart", "Announced Nigerian cinema release: 23 October 2026"],
    ["Afobaje", "Africa Magic Yoruba debut scheduled 10 October 2026, 7 PM"],
    ["Better Half", "Premiered 5 October 2026 at 8:30 PM"],
    ["First Lady", "Distributor-announced cinema release: 16 October 2026"],
    ["Phoenix Fury", "Reported Nigerian cinema release: 30 October 2026"],
    ["Pushing 30", "Africa Magic Showcase premiere scheduled 18 October 2026, 8 PM"],
    ["Tele x Zikora", "Film-account-announced Nigerian cinema release: 23 October 2026"],
    ["The Ten", "Scheduled 8 October 2026 at 8:30 PM"],
    ["Wire Transfer", "Silverbird Cinemas-announced release: 30 October 2026"],
  ] as const;

  for (const [title, date] of checked) {
    const card = page.locator("article.service-card").filter({
      has: page.getByRole("heading", { name: title, exact: true }),
    });
    await expect(card, title).toHaveCount(1);
    await expect(card).toContainText(date);
    await expect(card).toContainText("Checked 2026-10-15");
  }

  const wire = page.locator("article.service-card").filter({
    has: page.getByRole("heading", { name: "Wire Transfer", exact: true }),
  });
  await expect(wire.getByRole("link", { name: /Release information/i })).toHaveAttribute(
    "href", "https://x.com/SilverbCinemas/status/2110329723457057117"
  );
});

test("expired Viva showtimes stay archived and are not represented as current screenings", async ({ page }) => {
  await page.goto("/entertainment/releases");
  const card = page.locator("article.service-card").filter({
    has: page.getByRole("heading", { name: "Behind The Scenes", exact: true }),
  });
  await expect(card).toHaveCount(1);
  await expect(card).toContainText("Past showtimes");
  await expect(card).toContainText("Previously listed showtimes: 8–14 October 2026");
  await expect(card).toContainText("a current session is not independently confirmed");
});
