import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";
import { getAgency, getService, services } from "@/lib/data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.shortTitle,
    description: service.summary,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const agency = getAgency(service.agencySlug);
  const related = service.related.map(getService).filter(Boolean);

  return (
    <>
      <section className="guide-hero">
        <div className="container guide-hero-grid">
          <div>
            <Link className="back-link" href="/services">← All services</Link>
            <div className="guide-meta">
              <span>{service.category}</span>
              <span>•</span>
              <span>{agency?.shortName}</span>
            </div>
            <h1>{service.title}</h1>
            <p>{service.summary}</p>
            <div className="guide-badges">
              <StatusBadge status={service.status} />
              <span className="checked-date">Checked {service.lastVerified}</span>
            </div>
          </div>
          <aside className="fee-card">
            <span>Official fee status</span>
            <strong>{service.feeLabel}</strong>
            {service.feeNote ? <p>{service.feeNote}</p> : null}
            {service.officialPortal ? (
              <a className="button" href={service.officialPortal} target="_blank" rel="noreferrer">
                Open official portal ↗
              </a>
            ) : null}
          </aside>
        </div>
      </section>

      {service.status === "conflict" ? (
        <div className="container conflict-alert">
          <strong>⚠ Official sources currently disagree</strong>
          <p>We are showing the conflict instead of silently choosing a figure. Confirm the amount on the official payment channel before paying.</p>
        </div>
      ) : null}

      <section className="section">
        <div className="container guide-layout">
          <article className="guide-content">
            <section>
              <h2>What you need</h2>
              <ul className="checklist">
                {service.requirements.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section>
              <h2>Steps</h2>
              <ol className="steps">
                {service.steps.map((step, index) => (
                  <li key={step}><span>{index + 1}</span><p>{step}</p></li>
                ))}
              </ol>
            </section>

            {service.timeline ? (
              <section>
                <h2>Official service timeline</h2>
                <div className="info-box">{service.timeline}</div>
              </section>
            ) : null}

            <section>
              <h2>Important notes</h2>
              <ul>
                {service.notes.map((note) => <li key={note}>{note}</li>)}
              </ul>
            </section>

            <section>
              <h2>Official sources</h2>
              <div className="source-list">
                {service.sources.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                    <span>
                      <strong>{source.label}</strong>
                      <small>{source.agency}</small>
                    </span>
                    <span>
                      Checked {source.lastChecked} ↗
                    </span>
                  </a>
                ))}
              </div>
            </section>
          </article>

          <aside className="guide-sidebar">
            <div className="sidebar-card">
              <span>Responsible agency</span>
              <strong>{agency?.name}</strong>
              {agency ? <Link href={"/agencies/" + agency.slug}>View agency guides →</Link> : null}
            </div>
            <div className="sidebar-card safety-card">
              <span>Payment safety</span>
              <strong>GovGuide never collects government fees.</strong>
              <p>Use only the official portal or payment method published by the responsible agency.</p>
            </div>
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className="section section-muted">
          <div className="container">
            <h2>Related services</h2>
            <div className="related-links">
              {related.map((item) => item ? <Link key={item.slug} href={"/services/" + item.slug}>{item.shortTitle} →</Link> : null)}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
