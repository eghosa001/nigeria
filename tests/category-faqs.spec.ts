import { expect, test } from "@playwright/test";
import { categoryFaqs } from "@/data/category-faqs";
import { categories, publicServices } from "@/lib/data";

test("every published category has researched FAQ coverage with valid guide links", () => {
  const publicSlugs = new Set(publicServices.map((service) => service.slug));

  for (const category of categories) {
    const faqs = categoryFaqs[category.name];
    expect(faqs, category.name).toBeTruthy();
    expect(faqs.length, category.name).toBeGreaterThanOrEqual(4);

    const questions = new Set<string>();
    for (const faq of faqs) {
      expect(faq.question.trim().length, category.name).toBeGreaterThan(12);
      expect(faq.answer.trim().length, faq.question).toBeGreaterThan(40);
      expect(faq.source.url, faq.question).toMatch(/^https:\/\//);
      expect(faq.source.label.trim().length, faq.question).toBeGreaterThan(2);
      expect(questions.has(faq.question), faq.question).toBeFalsy();
      questions.add(faq.question);

      for (const slug of faq.relatedSlugs) {
        expect(publicSlugs.has(slug), `${category.name}: ${slug}`).toBeTruthy();
      }
    }
  }
});

test("category FAQs render with official and internal links", async ({ page }) => {
  await page.goto("/categories/education");
  await expect(page.getByRole("heading", { name: "Education questions people commonly ask" })).toBeVisible();
  await page.getByText("How do I generate a JAMB profile code?", { exact: true }).click();
  await expect(page.getByRole("link", { name: "JAMB profile code" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Official source: JAMB FAQ/ })).toHaveAttribute("href", "https://www.jamb.gov.ng/FAQ");
});
