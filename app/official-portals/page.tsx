import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { agencies, publicServices } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Official Government & Service Portals for Nigerians",
  description: "Direct official websites for Nigerian public services and foreign visa authorities used by MyNigeriaGuide, linked to the verified guides that explain each process.",
  alternates: { canonical: "/official-portals" },
};

export default function OfficialPortalsPage() {
  const base = getSiteUrl();
  const rows = agencies.map((agency) => {
    const guides = publicServices.filter((service) => service.agencySlug === agency.slug);
    return { agency, guideCount: guides.length, categories: [...new Set(guides.map((service) => service.category))].sort() };
  });
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
        item: { "@type": "Organization", name: agency.name, url: agency.website },
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
          <p className="page-intro">Go directly to the authority behind a MyNigeriaGuide service. This includes Nigerian agencies and the official foreign authorities used for visa guides. MyNigeriaGuide is independent and never collects government application fees.</p>
          <div className="section-heading top-gap"><div><span className="eyebrow">Source transparency</span><h2>Authorities used by published guides</h2></div></div>
          <div className="service-grid">
            {rows.map(({ agency, guideCount, categories }) => (
              <article className="service-card" key={agency.slug}>
                <div className="card-topline"><span>{agency.shortName}</span><span>{guideCount} guide{guideCount === 1 ? "" : "s"}</span></div>
                <h3>{agency.name}</h3><p>{agency.description}</p>
                {categories.length ? <p><strong>Covered here:</strong> {categories.join(", ")}</p> : null}
                <div className="related-links"><a href={agency.website} target="_blank" rel="noreferrer">Open official website ↗</a><Link href={"/agencies/" + agency.slug}>View verified guides →</Link></div>
              </article>
            ))}
          </div>
          <div className="topic-trust-note"><strong>Before you pay or upload documents</strong><p>Open the exact service guide first when one is available. It separates the official instruction page from the transaction portal and shows the sources and last-checked date used for the explanation.</p><Link className="text-link" href="/services">Browse all verified service guides →</Link></div>
        </div>
      </section>
    </>
  );
}
