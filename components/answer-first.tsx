import Link from "next/link";

export type AnswerFirstFact = {
  label: string;
  value: string;
};

export type AnswerFirstLink = {
  href: string;
  label: string;
  external?: boolean;
  primary?: boolean;
};

export function AnswerFirst({
  eyebrow = "Start here",
  title,
  summary,
  facts,
  links = [],
  note,
}: {
  eyebrow?: string;
  title: string;
  summary: string;
  facts: AnswerFirstFact[];
  links?: AnswerFirstLink[];
  note?: string;
}) {
  const visibleFacts = facts.filter((item) => item.value.trim()).slice(0, 4);

  return (
    <section className="answer-first" aria-label={title}>
      <div className="answer-first-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{summary}</p>
        {links.length ? (
          <div className="answer-first-actions">
            {links.map((link) =>
              link.external ? (
                <a
                  key={link.href + link.label}
                  className={link.primary ? "answer-first-action is-primary" : "answer-first-action"}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <Link
                  key={link.href + link.label}
                  className={link.primary ? "answer-first-action is-primary" : "answer-first-action"}
                  href={link.href}
                >
                  {link.label} <span aria-hidden="true">→</span>
                </Link>
              ),
            )}
          </div>
        ) : null}
        {note ? <small className="answer-first-note">{note}</small> : null}
      </div>

      <dl className="answer-first-facts">
        {visibleFacts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
