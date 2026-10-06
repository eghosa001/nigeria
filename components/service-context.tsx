import type { Service } from "@/lib/types";
import { categoryFaqs } from "@/data/category-faqs";

export function ServiceContext({ service }: { service: Service }) {
  const facts = (categoryFaqs[service.category] ?? []).filter((item) =>
    item.relatedSlugs.includes(service.slug),
  );

  if (!facts.length) return null;

  return (
    <section id="key-guidance" className="service-context">
      <span className="section-number" aria-hidden="true">Key</span>
      <h2>What to know before starting {service.shortTitle}</h2>
      <p className="guide-section-intro">
        Important details for {service.shortTitle} that affect how you apply, what route to use, or what to avoid.
      </p>
      <div className="service-context-grid">
        {facts.map((fact) => (
          <article key={fact.question}>
            <h3>{fact.question}</h3>
            <p>{fact.answer}</p>
            <a href={fact.source.url} target="_blank" rel="noreferrer">
              Verify with {fact.source.label} ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
