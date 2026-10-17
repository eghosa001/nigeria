import Link from "next/link";
import type { Service } from "@/lib/types";
import { selectServiceTaskComparisons } from "@/lib/service-task-comparison";
import styles from "./service-task-comparison.module.css";

/** First-party task comparison. Source dates and prices come only from underlying records. */
export function ServiceTaskComparison({
  services, heading = "Compare these services before you begin", limit = 6,
}: { services: Service[]; heading?: string; limit?: number }) {
  const chosen = selectServiceTaskComparisons(services, limit);
  if (chosen.length < 2) return null;

  return (
    <section className={styles.section} aria-label={heading}>
      <div className={styles.intro}>
        <span className="eyebrow">Choose the correct process</span>
        <h2>{heading}</h2>
        <p>These are different tasks, not interchangeable application forms. Compare the first
          requirement, the stated fee or uncertainty, and the starting action before
          opening the full guide. Information comes from the guide records and named sources.</p>
      </div>
      <div className={styles.grid}>
        {chosen.map(service => {
          const source = service.sources.find(entry => entry.url.startsWith("https://"));
          return (
            <article className={styles.card} key={service.slug}>
              <div className={styles.cardHead}>
                <h3><Link href={"/services/" + service.slug}>{service.shortTitle}</Link></h3>
                {service.status !== "verified" ? (
                  <span className={styles.caution}>
                    {service.status === "conflict" ? "Conflicting sources" : "Source review pending"}
                  </span>
                ) : null}
              </div>
              <dl className={styles.facts}>
                <div><dt>Before you start</dt><dd>{service.requirements[0]}</dd></div>
                <div><dt>Fee information</dt><dd>{service.feeLabel || "Fee not stated in this guide"}</dd></div>
                <div><dt>First action</dt><dd>{service.steps[0]}</dd></div>
              </dl>
              <div className={styles.actions}>
                <Link href={"/services/" + service.slug} className={styles.read}>
                  Read requirements and full steps <span aria-hidden="true">→</span>
                </Link>
                {source ? (
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className={styles.source}>
                    {source.label || "Original source"} <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
              <small className={styles.date}>
                Guide check recorded: <time dateTime={service.lastVerified}>{service.lastVerified}</time>.
                Recheck the official source for current fees, forms and opening dates.
              </small>
            </article>
          );
        })}
      </div>
      <p className={styles.note}>
        Comparing {chosen.length} tasks. Issuers control eligibility and application outcomes.
        MyNigeriaGuide is independent of the agencies listed here.
      </p>
    </section>
  );
}
