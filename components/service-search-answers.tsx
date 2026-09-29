import type { Service } from "@/lib/types";
import { getServiceSearchAnswers } from "@/lib/search-answers";

export function ServiceSearchAnswers({ service }: { service: Service }) {
  const answers = getServiceSearchAnswers(service);

  return (
    <section id="quick-answers" className="search-answer-section">
      <span className="section-number" aria-hidden="true">Q&A</span>
      <h2>Quick answers about {service.shortTitle}</h2>
      <p className="guide-section-intro">
        Direct answers to the questions people commonly search for, using the same verified fee, requirements, route and timeline shown in this guide.
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
