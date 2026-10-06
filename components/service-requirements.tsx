import type { Service } from "@/lib/types";
import { getRequirementDetails } from "@/lib/requirement-details";

export function ServiceRequirements({ service }: { service: Service }) {
  const requirements = getRequirementDetails(service);
  const counts = requirements.reduce<Record<string, number>>((summary, item) => {
    summary[item.kind] = (summary[item.kind] ?? 0) + 1;
    return summary;
  }, {});

  return (
    <section id="requirements">
      <span className="section-number" aria-hidden="true">01</span>
      <h2>Requirements for {service.shortTitle}</h2>
      <p className="guide-section-intro">
        This is the complete pre-start checklist for {service.shortTitle}. Each item below explains what it is for,
        where it enters the process and whether the official source actually specifies an original, copy or upload.
      </p>

      <div className="requirement-summary" aria-label="Requirement categories">
        {Object.entries(counts).map(([kind, count]) => (
          <span key={kind}><strong>{count}</strong> {kind}{count === 1 ? "" : "s"}</span>
        ))}
      </div>

      <div className="requirement-detail-list">
        {requirements.map((requirement, index) => (
          <article className="requirement-detail-card" key={requirement.item}>
            <div className="requirement-detail-heading">
              <span className="requirement-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <span className="requirement-kind">{requirement.kind}</span>
                <h3>{requirement.item}</h3>
              </div>
            </div>
            <dl>
              <div>
                <dt>Why you need it</dt>
                <dd>{requirement.why}</dd>
              </div>
              <div>
                <dt>Where it is used</dt>
                <dd>{requirement.whenUsed}</dd>
              </div>
              <div>
                <dt>Original, copy or upload?</dt>
                <dd>{requirement.format}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
