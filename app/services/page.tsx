import type { Metadata } from "next";
import { ServiceDirectory } from "@/components/service-directory";
import { publicServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Government service directory",
  description: "Search and filter GovGuide Nigeria's source-linked government service guides.",
};

export default function ServicesPage() {
  return (
    <section className="section page-top">
      <div className="container">
        <span className="eyebrow">Directory</span>
        <h1>Government service guides</h1>
        <p className="page-intro">
          Search by everyday language, then filter by category or verification status. Review-pending content never appears here.
        </p>
        <ServiceDirectory services={publicServices} />
      </div>
    </section>
  );
}
