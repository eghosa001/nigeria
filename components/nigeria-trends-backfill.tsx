import Link from "next/link";
import {
  nigeriaTrendsBackfill20261018,
  type NigeriaBackfillPillar,
} from "@/data/nigeria-trends-backfill-2026-10-18";

const PILLARS: NigeriaBackfillPillar[] = [
  "Movies & Entertainment", "Services", "Tour Nigeria", "Jobs & Careers",
];

export function NigeriaTrendsBackfill({ compact = false }: { compact?: boolean }) {
  return (
    <section className="top-gap" id="nigeria-october-trends" aria-labelledby="nigeria-october-trends-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Nigeria · 11–18 October 2026 · Reviewed 18 October</span>
          <h2 id="nigeria-october-trends-heading">Verified culture, services, events and career updates</h2>
          <p>
            A dated catch-up of independently documented social conversations,
            official updates and published opportunities. Only items supported by
            original issuers or identified independent reporting are included.
            These are not live X, TikTok or Instagram trend rankings.
          </p>
        </div>
        {compact ? <Link href="/latest#nigeria-october-trends">All four categories →</Link> : null}
      </div>
      {PILLARS.map((pillar) => {
        const all = nigeriaTrendsBackfill20261018
          .filter((item) => item.pillar === pillar)
          .sort((a, b) => b.observedOn.localeCompare(a.observedOn));
        // The Entertainment / Social Trends page only previews two per pillar;
        // the Latest page displays the full source-verified backfill.
        const visible = compact ? all.slice(0, 2) : all;
        return (
          <div className="top-gap" key={pillar}>
            <h3>{pillar}</h3>
            <div className="home-category-grid compact-category-grid">
              {visible.map((item) => (
                <article className="home-category-card" key={item.id}>
                  <span className="eyebrow">{item.observedOn} · {item.evidence}</span>
                  <h4>{item.title}</h4>
                  <p>{item.takeaway}</p>
                  <p><strong>What to check:</strong> {item.readerAction}</p>
                  <div className="minimal-inline-links">
                    <Link href={item.href}>{item.label} →</Link>
                    <a href={item.sourceUrl} rel="noopener noreferrer" target="_blank">{item.sourceName} ↗</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      })}
      <p className="job-muted top-gap">
        Editorial backfill completed on 18 October 2026. Recorded dates describe
        publication, programme timing or checks—not proof of current availability.
        Closed events are kept as historical coverage. Job opportunities must be
        reconfirmed on the original employer page before applying.
      </p>
    </section>
  );
}
