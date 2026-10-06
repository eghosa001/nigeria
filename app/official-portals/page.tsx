import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { agencies, publicServices } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: { absolute: "Official Service Portals for Nigerians | MyNigeriaGuide" },
  description: "Direct official websites for Nigerian public agencies, private service providers and foreign authorities, linked to MyNigeriaGuide's verified process guides.",
  alternates: { canonical: "/official-portals" },
};

export default function OfficialPortalsPage() {
  const base = getSiteUrl();
  const rows = agencies
    .map((agency) => {
      const guides = publicServices.filter((service) => service.agencySlug === agency.slug);
      return { agency, guideCount: guides.length, categories: [...new Set(guides.map((service) => service.category))].sort() };
    })
    .filter((row) => row.guideCount > 0)
    .sort((a, b) => b.guideCount - a.guideCount || a.agency.name.localeCompare(b.agency.name));
  const featuredRows = rows.slice(0, 24);
  const moreRows = rows.slice(24);
  const directoryLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Official Government & Service Portals for Nigerians",
    description: metadata.description,
    url: base + "/official-portals",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: rows.length,
      itemListElement: rows.map(({ agency }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: agency.name,
        url: base + "/agencies/" + agency.slug,
      })),
    },
  };
  return (
    <>
      <JsonLd data={directoryLd} />
      <section className="section page-top">
        <div className="container">
          <span className="eyebrow">Official source directory</span>
          <h1>Official government and service portals</h1>
          <p className="page-intro">Go directly to the organisation responsible for a MyNigeriaGuide process. This directory includes Nigerian public agencies, regulated and private service providers, and foreign authorities used for travel and visa guides. MyNigeriaGuide is independent and does not collect provider application fees.</p>
          <div className="section-heading top-gap"><div><span className="eyebrow">Source transparency</span><h2>Most-covered official sources</h2></div><span>{rows.length} organisations</span></div>
          <div className="service-grid">
            {featuredRows.map(({ agency, guideCount, categories }) => (
              <article className="service-card" key={agency.slug}>
                <div className="card-topline"><span>{agency.shortName}</span><span>{guideCount} guide{guideCount === 1 ? "" : "s"}</span></div>
                <h3>{agency.name}</h3><p>{agency.description}</p>
                {categories.length ? <p><strong>Covered here:</strong> {categories.slice(0, 4).join(", ")}{categories.length > 4 ? " +" + (categories.length - 4) + " more" : ""}</p> : null}
                <div className="related-links"><a href={agency.website} target="_blank" rel="noreferrer">Open official website ↗</a><Link href={"/agencies/" + agency.slug}>View verified guides →</Link></div>
              </article>
            ))}
          </div>
          {moreRows.length ? (
            <details className="browse-disclosure top-gap">
              <summary>Browse {moreRows.length} more official sources</summary>
              <div className="disclosure-link-grid">
                {moreRows.map(({ agency, guideCount }) => (
                  <Link href={"/agencies/" + agency.slug} key={agency.slug}>
                    {agency.shortName} · {guideCount} guide{guideCount === 1 ? "" : "s"}
                  </Link>
                ))}
              </div>
            </details>
          ) : null}
          <div className="topic-trust-note"><strong>Before you pay or upload documents</strong><p>Open the exact service guide first when one is available. It separates the official instruction page from the transaction portal and shows the sources and last-checked date used for the explanation.</p><Link className="text-link" href="/services">Browse all verified service guides →</Link></div>
        </div>
      </section>
    </>
  );
}
