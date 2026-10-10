import { expect, test } from "@playwright/test";

// Regression for the user-reported white-card / white-heading bug.
// It is deliberately scoped to the movie browse discovery grid.
test("movie discovery contrast and layout remain readable in both themes", async ({ page }) => {
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/entertainment/movies");
    const grid = page.locator(".movie-discovery-grid");
    const cards = grid.locator(".movie-discovery-card");
    await expect(cards).toHaveCount(4);

    for (const theme of ["light", "dark"] as const) {
      await page.evaluate((value) => {
        document.documentElement.setAttribute("data-theme", value);
      }, theme);

      const result = await grid.evaluate((node) => {
        function channels(input: string): number[] {
          const numbers = input.match(/[\d.]+/g)?.map(Number) ?? [];
          return numbers.slice(0, 3);
        }
        function luminance(color: string) {
          const rgb = channels(color).map((v) => {
            const n = v / 255;
            return n <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4);
          });
          return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
        }
        function contrast(a: string, b: string) {
          const l1 = luminance(a);
          const l2 = luminance(b);
          return (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05);
        }

        const root = node as HTMLElement;
        const gridBox = root.getBoundingClientRect();
        const all = Array.from(root.querySelectorAll<HTMLElement>(".movie-discovery-card"));
        return {
          width: gridBox.width,
          noOverflow: root.scrollWidth <= root.clientWidth + 1 &&
            all.every((card) => card.getBoundingClientRect().right <= gridBox.right + 1),
          columns: new Set(all.map((card) => Math.round(card.getBoundingClientRect().left))).size,
          entries: all.map((card) => {
            const bg = getComputedStyle(card).backgroundColor;
            const heading = card.querySelector<HTMLElement>("h3")!;
            const body = card.querySelector<HTMLElement>("p")!;
            const links = Array.from(card.querySelectorAll<HTMLElement>("a"));
            return {
              headingContrast: contrast(getComputedStyle(heading).color, bg),
              textContrast: contrast(getComputedStyle(body).color, bg),
              links: links.map((link) => ({
                contrast: contrast(getComputedStyle(link).color, getComputedStyle(link).backgroundColor),
                height: link.getBoundingClientRect().height,
                href: (link as HTMLAnchorElement).getAttribute("href"),
              })),
            };
          }),
        };
      });

      expect(result.noOverflow, `${theme} at ${width}px should not overflow`).toBeTruthy();
      expect(result.columns, `grid columns at ${width}px`).toBe(width <= 620 ? 1 : width <= 1100 ? 2 : 4);
      for (const entry of result.entries) {
        expect(entry.headingContrast).toBeGreaterThanOrEqual(7);
        expect(entry.textContrast).toBeGreaterThanOrEqual(4.5);
        expect(entry.links.length).toBeGreaterThanOrEqual(2);
        for (const link of entry.links) {
          expect(link.contrast).toBeGreaterThanOrEqual(4.5);
          expect(link.height).toBeGreaterThanOrEqual(44);
          expect(link.href).toMatch(/^\/entertainment\//);
        }
      }
    }
  }

  await expect(page.getByRole("heading", { name: "Essential Nigerian films" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Lionheart/ }).first()).toHaveAttribute("href", "/entertainment/movies/lionheart");
});
