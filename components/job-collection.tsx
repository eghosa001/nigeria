import Link from "next/link";
import type { CareerOpportunity } from "@/lib/jobs";
import { getEffectiveJobStatus, getEffectiveStatusLabel } from "@/lib/job-runtime";

export function JobCollection({
  opportunities,
  emptyText = "No verified opportunities match this collection yet.",
}: {
  opportunities: CareerOpportunity[];
  emptyText?: string;
}) {
  if (!opportunities.length) {
    return <div className="jobs-empty"><strong>{emptyText}</strong></div>;
  }

  return (
    <div className="jobs-card-grid">
      {opportunities.map((item) => (
        <article className={"job-card" + (getEffectiveJobStatus(item) === "open" ? " job-card-open" : "")} key={item.slug}>
          <div className="job-card-top">
            <span className={"job-status job-status-" + getEffectiveJobStatus(item)}>{getEffectiveStatusLabel(item)}</span>
            <span>{item.sector}</span>
          </div>
          <div className="job-card-body">
            <p className="job-organisation">{item.organization}</p>
            <h2><Link href={"/jobs/" + item.slug}>{item.title}</Link></h2>
            <p>{item.summary}</p>
            <div className="job-tags">
              {item.fields.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
          <div className="job-card-footer">
            <span>
              {item.deadline
                ? "Deadline " + new Date(item.deadline + "T00:00:00Z").toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
                : "Checked " + item.verifiedAt}
            </span>
            <Link href={"/jobs/" + item.slug}>Requirements →</Link>
          </div>
        </article>
      ))}
    </div>
  );
}
