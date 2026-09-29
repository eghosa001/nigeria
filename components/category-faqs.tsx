import Link from "next/link";
import { getCategoryFaqs } from "@/data/category-faqs";
import { publicServices } from "@/lib/data";

export function CategoryFaqs({ category }: { category: string }) {
  const faqs = getCategoryFaqs(category);
  if (!faqs.length) return null;

  return (
    <section className="category-faqs" aria-labelledby="category-faq-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Frequently asked questions</span>
          <h2 id="category-faq-title">{category} questions people commonly ask</h2>
        </div>
      </div>
      <p className="page-intro">
        Direct answers checked against official agency guidance, with links to the exact MyNigeriaGuide process when you need the full steps.
      </p>
      <div className="faq-list">
        {faqs.map((faq) => {
          const related = faq.relatedSlugs
            .map((slug) => publicServices.find((service) => service.slug === slug))
            .filter((service): service is NonNullable<typeof service> => Boolean(service));

          return (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <div className="faq-answer">
                <p>{faq.answer}</p>
                {related.length ? (
                  <p>
                    <strong>Relevant guides: </strong>
                    {related.map((service, index) => (
                      <span key={service.slug}>
                        {index ? " · " : ""}
                        <Link href={"/services/" + service.slug}>{service.shortTitle}</Link>
                      </span>
                    ))}
                  </p>
                ) : null}
                <p>
                  <a href={faq.source.url} target="_blank" rel="noreferrer">
                    Official source: {faq.source.label} ↗
                  </a>
                </p>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
