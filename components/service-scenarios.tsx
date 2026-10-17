import Link from "next/link";
import type { Service } from "@/lib/types";
import { getPublicService } from "@/lib/data";
import { getServiceScenarioDossier } from "@/lib/service-scenario-dossiers-2026-10-17";
import styles from "./service-scenarios.module.css";

/**
 * Editorial recovery decisions, never a generic auto-generated FAQ.
 * Avoid presenting these examples as firsthand user interviews or live form tests.
 */
export function ServiceScenarios({ service }: { service: Service }) {
  const scenarios = getServiceScenarioDossier(service);
  if (!scenarios.length) return null;
  return (
    <section id="case-guidance" className={styles.section} aria-labelledby="case-guidance-title">
      <div className={styles.heading}>
        <span className="eyebrow">Solve the right problem</span>
        <h2 id="case-guidance-title">If your {service.shortTitle.toLowerCase()} case is different</h2>
        <p>These are practical decisions drawn from the documented process, not accounts of people
          we interviewed or outcomes we tested. Choose the situation closest to yours,
          then check the original issuer instructions before paying or submitting anything.</p>
      </div>
      <div className={styles.cards}>
        {scenarios.map((scenario) => {
          const alternate = scenario.alternativeSlug
            ? getPublicService(scenario.alternativeSlug)
            : null;
          return (
            <article key={scenario.situation} className={styles.card}>
              <h3>{scenario.situation}</h3>
              <p>{scenario.reasoning}</p>
              <div className={styles.checkpoint}>
                <strong>Check before you proceed</strong>
                <p>{scenario.verification}</p>
              </div>
              {alternate ? (
                <Link className={styles.link} href={"/services/" + alternate.slug}>
                  Compare the {alternate.shortTitle} process <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </article>
          );
        })}
      </div>
      <p className={styles.provenance}>
        Editorial decision guide based on the official documents linked in this article
        (recorded check: <time dateTime={service.lastVerified}>{service.lastVerified}</time>).
        See <a href="#official-sources">the original sources</a> for current forms, requirements and fees.
      </p>
    </section>
  );
}
