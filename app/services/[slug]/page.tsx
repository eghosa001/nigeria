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
              <span>Current fee / status</span>
              <strong>{service.feeLabel}</strong>
              {service.feeNote ? <p>{service.feeNote}</p> : null}
              {service.officialPortal ? (
                <a className="button" href={service.officialPortal} target="_blank" rel="noreferrer">
                  Continue on official portal ↗
                </a>
              ) : null}
              <small>MyNigeriaGuide does not collect this payment.</small>
            </aside>
          </div>
        </div>
      </section>

      {service.status === "conflict" ? (
        <div className="container conflict-alert">
          <strong>Confirm current details before payment</strong>
          <p>Two official pages currently differ on this detail. Use the latest linked official payment or application channel to confirm the amount before paying.</p>
        </div>
      ) : null}

      <section className="section guide-main-section">
        <div className="container guide-layout">
          <article className="guide-content">
            <nav className="guide-quick-nav" aria-label="On this page">
              <span>On this page</span>
              <a href="#journey">Route</a>
              <a href="#requirements">Requirements</a>
              <a href="#steps">Steps</a>
              <a href="#after-submit">After submission</a>
              <a href="#official-sources">Sources</a>
            </nav>

            <ServiceJourney service={service} />

            <section id="requirements">
              <span className="section-number" aria-hidden="true">01</span>
              <h2>What you need</h2>
              <ul className="checklist">
                {service.requirements.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section id="steps">
              <span className="section-number" aria-hidden="true">02</span>
              <h2>Steps</h2>
              <ol className="steps">
                {service.steps.map((step, index) => (
                  <li key={step}><span>{index + 1}</span><p>{step}</p></li>
                ))}
              </ol>
            </section>

            <ServiceAftercare service={service} />

            <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE} />

            <section id="notes">
              <span className="section-number" aria-hidden="true">03</span>
              <h2>Important notes</h2>
              <ul>{service.notes.map((note) => <li key={note}>{note}</li>)}</ul>
            </section>

            <section id="questions">
              <span className="section-number" aria-hidden="true">04</span>
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
              <span className="section-number" aria-hidden="true">05</span>
              <h2>Official sources</h2>
              <p className="source-intro">These are the government or agency pages used to verify this guide. Open them directly whenever you want to confirm the source.</p>
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
            <div className="sidebar-card sidebar-agency">
              <span>Responsible agency</span>
              <strong>{agency?.name}</strong>
              {agency ? <Link href={"/agencies/" + agency.slug}>View agency guides →</Link> : null}
            </div>
            <div className="sidebar-card">
              <span>Compare fees</span>
              <strong>Check the verified fee directory.</strong>
              <Link href="/fees">View government fees →</Link>
            </div>
            <div className="sidebar-card">
              <span>Need an office?</span>
              <strong>Use live official location directories.</strong>
              <Link href="/offices">Find offices and centres →</Link>
            </div>
            <div className="sidebar-card safety-card">
              <span>Payment safety</span>
              <strong>Pay only through the responsible agency.</strong>
              <p>MyNigeriaGuide never collects government application fees or asks for your password, card PIN or NIN.</p>
            </div>
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className="section related-section">
          <div className="container">
            <span className="eyebrow">Keep going</span>
            <h2>Related services</h2>
            <div className="related-links">
              {related.map((item) => item ? <Link key={item.slug} href={"/services/" + item.slug}>{item.shortTitle} <span aria-hidden="true">→</span></Link> : null)}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
