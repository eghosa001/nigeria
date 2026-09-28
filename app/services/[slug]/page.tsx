import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CorrectionReport } from "@/components/correction-report";
import { JsonLd } from "@/components/json-ld";
import { ShareWatch } from "@/components/share-watch";
import { ServiceJourney } from "@/components/service-journey";
import { ServiceAftercare } from "@/components/service-aftercare";
import { StatusBadge } from "@/components/status-badge";
import { getAgency, getPublicService, publicServices } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export function generateStaticParams() {
  return publicServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getPublicService(slug);
  if (!service) return {};
  return {
    title: service.shortTitle,
    description: service.summary,
    alternates: { canonical: "/services/" + service.slug },
    openGraph: {
      title: service.title,
      description: service.summary,
      type: "article",
      url: "/services/" + service.slug,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getPublicService(slug);
  if (!service) notFound();

  const agency = getAgency(service.agencySlug);
  const related = publicServices
    .filter((item) =>
      item.slug !== service.slug &&
      (service.related.includes(item.slug) || item.category === service.category),
    )
    .sort((a, b) =>
      Number(service.related.includes(b.slug)) - Number(service.related.includes(a.slug)),
    )
    .slice(0, 4);
  const base = getSiteUrl();
  const pageUrl = base + "/services/" + service.slug;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.shortTitle },
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Services", item: base + "/services" },
      { "@type": "ListItem", position: 3, name: service.shortTitle, item: pageUrl },
    ],
  };

  const webpageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: service.title,
    description: service.summary,
    url: pageUrl,
    dateModified: service.lastVerified,
    isPartOf: { "@type": "WebSite", name: "MyNigeriaGuide", url: base },
    about: agency ? { "@type": "Organization", name: agency.name, url: agency.website } : undefined,
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd, webpageLd]} />
      <section className="guide-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <div className="guide-hero-grid">
            <div>
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
              <ShareWatch slug={service.slug} title={service.title} />
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
            <ServiceJourney service={service} />

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

            <ServiceAftercare service={service} />

            <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE} />

            <section>
              <h2>Important notes</h2>
              <ul>{service.notes.map((note) => <li key={note}>{note}</li>)}</ul>
            </section>

            <section>
              <h2>Common questions</h2>
              <div className="faq-list">
                <details>
                  <summary>How much does this service cost?</summary>
                  <p><strong>{service.feeLabel}</strong>{service.feeNote ? " — " + service.feeNote : "."}</p>
                </details>
                <details>
                  <summary>Where should I complete the application?</summary>
                  <p>{service.officialPortal ? "Use the official portal linked on this page. MyNigeriaGuide does not take government payments." : "Use the responsible agency's official website and contact channel."}</p>
                </details>
                <details>
                  <summary>How current is this guide?</summary>
                  <p>Its official sources were last checked on {service.lastVerified}. The source links are listed below so you can inspect them directly.</p>
                </details>
                <details>
                  <summary>Is MyNigeriaGuide an official government website?</summary>
                  <p>No. MyNigeriaGuide is an independent information service that links back to the responsible government agency.</p>
                </details>
              </div>
            </section>

            <section id="official-sources">
              <h2>Official sources</h2>
              <div className="source-list">
                {service.sources.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                    <span><strong>{source.label}</strong><small>{source.agency}</small></span>
                    <span>Checked {source.lastChecked} ↗</span>
                  </a>
                ))}
              </div>
            </section>

            <CorrectionReport serviceSlug={service.slug} />
          </article>

          <aside className="guide-sidebar">
            <div className="sidebar-card">
              <span>Responsible agency</span>
              <strong>{agency?.name}</strong>
              {agency ? <Link href={"/agencies/" + agency.slug}>View agency guides →</Link> : null}
            </div>
            <div className="sidebar-card">
              <span>Compare fees</span>
              <strong>Browse the verified fee directory.</strong>
              <Link href="/fees">View government fees →</Link>
            </div>
            <div className="sidebar-card">
              <span>Need an office?</span>
              <strong>Use live official location directories.</strong>
              <Link href="/offices">Find offices and centres →</Link>
            </div>
            <div className="sidebar-card safety-card">
              <span>Payment safety</span>
              <strong>MyNigeriaGuide never collects government fees.</strong>
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
