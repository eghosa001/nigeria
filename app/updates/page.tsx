import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AnswerFirst } from "@/components/answer-first";
import { JsonLd } from "@/components/json-ld";
import { myNigeriaGuideUpdates, updateTypeLabel } from "@/data/updates";
import { getPublicService } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nigeria Government Service Updates 2026",
  description: "Dated, source-linked updates to Nigerian government service fees, registration processes and official guidance.",
  alternates: { canonical: "/updates" },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date + "T00:00:00Z"));
}

export default function UpdatesPage() {
  const base = getSiteUrl();
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nigeria government service updates",
    numberOfItems: myNigeriaGuideUpdates.length,
    itemListElement: myNigeriaGuideUpdates.map((update, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: update.title,
      url: base + "/updates#" + update.id,
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <section className="section page-top">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Updates" }]} />
          <span className="eyebrow">Change tracker</span>
          <h1>Verified government service updates</h1>
          <p className="page-intro">
            Important fee, process and official-guidance changes that affect MyNigeriaGuide services.
            Every entry is dated and links to the government source used to verify it.
          </p>
          <AnswerFirst
            title="What changed in Nigerian services?"
            summary={myNigeriaGuideUpdates[0]?.summary ?? "Track verified fee, process and official-guidance changes from Nigerian government sources."}
            facts={[
              { label: "Updates tracked", value: String(myNigeriaGuideUpdates.length) },
              { label: "Latest date", value: myNigeriaGuideUpdates[0]?.date ?? "See the dated updates below" },
              { label: "Source standard", value: "Official government sources" },
              { label: "Best action", value: "Open the affected service guide" },
            ]}
            links={[{ href: "#verified-updates", label: "See latest updates", primary: true }]}
            note="Each entry links to the official source and the MyNigeriaGuide pages affected by the change."
          />
          <a className="text-link rss-link" href="/updates.xml">Subscribe to verified updates via RSS →</a>

          <div className="updates-stack" id="verified-updates">
            {myNigeriaGuideUpdates.map((update) => {
              const services = update.affectedServices.map(getPublicService).filter(Boolean);
              return (
                <article id={update.id} className="update-card" key={update.id}>
                  <div className="update-meta">
                    <span className={"update-type update-type-" + update.type}>{updateTypeLabel(update.type)}</span>
                    <time dateTime={update.date}>{formatDate(update.date)}</time>
                    <span>{update.agency}</span>
                  </div>
                  <h2>{update.title}</h2>
                  <p>{update.summary}</p>

                  {services.length ? (
                    <div className="update-services">
                      <strong>Affected MyNigeriaGuide pages</strong>
                      <div>
                        {services.map((service) =>
                          service ? <Link key={service.slug} href={"/services/" + service.slug}>{service.shortTitle} →</Link> : null,
                        )}
                      </div>
                    </div>
                  ) : null}

                  <a className="update-source" href={update.sourceUrl} target="_blank" rel="noreferrer">
                    Official source: {update.sourceLabel} ↗
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
