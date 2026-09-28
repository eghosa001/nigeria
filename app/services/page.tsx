import type { Metadata } from "next";
import { ServiceDirectory } from "@/components/service-directory";
import { publicServices } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Government service directory",
  description: "Search and filter MyNigeriaGuide's source-linked government service guides.",
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const categories = new Set(publicServices.map((service) => service.category));
  const initialCategory = params.category && categories.has(params.category) ? params.category : "all";

  return (
    <section className="section page-top">
      <div className="container">
        <span className="eyebrow">Directory</span>
        <h1>Government service guides</h1>
        <p className="page-intro">
          Search by everyday language, then filter by category or verification status. Review-pending content never appears here.
        </p>
        <ServiceDirectory
          services={publicServices}
          initialQuery={params.q ?? ""}
          initialCategory={initialCategory}
        />
      </div>
    </section>
  );
}
