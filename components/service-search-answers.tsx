import type { Service } from "@/lib/types";
import { getServiceSearchAnswers } from "@/lib/search-answers";

export function ServiceSearchAnswers({ service }: { service: Service }) {
  // The first five generated questions reprint the fee, route, requirements,
  // timeline and first step. Those facts belong in their dedicated sections.
  const answers = getServiceSearchAnswers(service).slice(5);
  if (!answers.length) return null;

  return (
    <section id="quick-answers" className="search-answer-section">
      <span className="section-number" aria-hidden="true">Q&A</span>
      <h2>Quick answers about {service.shortTitle}</h2>
      <p className="guide-section-intro">
        Additional questions specific to this service, not a second copy of the instructions above.
      </p>
      <div className="search-answer-grid">
        {answers.map((item) => (
          <article key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
