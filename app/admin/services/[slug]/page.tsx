import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgency, services } from "@/lib/data";
import { AdminServiceEditor } from "@/components/admin-service-editor";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return { title: service ? service.shortTitle : "Guide" };
}

export default async function AdminServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const agency = getAgency(service.agencySlug);

  return (
    <section className="section page-top admin-page">
      <div className="container">
        <div className="admin-detail-top">
          <div>
            <Link className="back-link" href="/admin/services">← All guides</Link>
            <span className="eyebrow">{service.category}</span>
            <h1>{service.shortTitle}</h1>
            <p className="page-intro">{service.summary}</p>
          </div>
          <div className="admin-detail-actions">
            {service.status !== "review" ? <Link className="button inline-button" href={"/services/" + service.slug}>Open public guide ↗</Link> : null}
            <span className={"admin-status admin-status-" + service.status}>{service.status}</span>
          </div>
        </div>

        <div className="admin-detail-metrics">
          <div><span>Agency</span><strong>{agency?.shortName ?? service.agencySlug.toUpperCase()}</strong></div>
          <div><span>Fee / status</span><strong>{service.feeLabel}</strong></div>
          <div><span>Checked</span><strong>{service.lastVerified}</strong></div>
          <div><span>Requirements</span><strong>{service.requirements.length}</strong></div>
          <div><span>Steps</span><strong>{service.steps.length}</strong></div>
          <div><span>Sources</span><strong>{service.sources.length}</strong></div>
        </div>

        <AdminServiceEditor service={service} />

        <div className="admin-detail-grid">
          <section className="admin-panel">
            <span className="eyebrow">Requirements</span>
            <h2>Documents, details & prerequisites</h2>
            <ol className="admin-content-list">{service.requirements.map((item) => <li key={item}>{item}</li>)}</ol>
          </section>

          <section className="admin-panel">
            <span className="eyebrow">Process</span>
            <h2>Application steps</h2>
            <ol className="admin-content-list">{service.steps.map((item) => <li key={item}>{item}</li>)}</ol>
          </section>

          <section className="admin-panel">
            <span className="eyebrow">Cautions</span>
            <h2>Important notes</h2>
            <ul className="admin-content-list">{service.notes.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="admin-panel">
            <span className="eyebrow">Verification</span>
            <h2>Official sources</h2>
            <div className="admin-source-list">
              {service.sources.map((source) => (
                <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                  <strong>{source.label}</strong>
                  <span>{source.agency}</span>
                  <small>Checked {source.lastChecked} ↗</small>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
