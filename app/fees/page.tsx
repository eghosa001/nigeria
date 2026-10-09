import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FeeDirectory } from "@/components/fee-directory";
import { JsonLd } from "@/components/json-ld";
import { publicServices } from "@/lib/data";
import { feeCategories, queryFeeDirectory } from "@/lib/fee-query";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nigeria government fees and service charges",
  description: "Browse source-linked Nigerian government service fees, charges and fee-status notes with last-checked dates and official portals.",
  alternates: { canonical: "/fees" },
};

export default function FeesPage() {
  const base = getSiteUrl();
  const initialResult = queryFeeDirectory();
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nigeria government fees and service charges",
    numberOfItems: publicServices.length,
    itemListElement: publicServices.slice(0, 50).map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.shortTitle,
      url: base + "/services/" + service.slug,
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <section className="section page-top">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Fees" }]} />
          <span className="eyebrow">Verified fee directory</span>
          <h1>Nigeria government fees and service charges</h1>
          <p className="page-intro">
            Search current fee figures and fee-status notes from MyNigeriaGuide's published service guides.
            Every row opens the full guide with its scope, requirements, last-checked date and official sources.
          </p>

          <div className="info-box fees-warning">
            Government charges can depend on applicant type, validity period, entity class or application route.
            Where official pages differ, MyNigeriaGuide follows the clearest current purpose-built source and keeps any older discrepancy visible in the guide notes.
          </div>

          <FeeDirectory initialResult={initialResult} categories={feeCategories} />
        </div>
      </section>
    </>
  );
}
