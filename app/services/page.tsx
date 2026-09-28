import type { Metadata } from "next";
import Link from "next/link";
import { ServiceDirectory } from "@/components/service-directory";
import { categorySlug } from "@/lib/category";
import { categories, publicServices } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Government service directory",
  description: "Search and filter MyNigeriaGuide's source-linked government service guides.",
};

export const dynamic = "force-static";

export default function ServicesPage() {
  return (
    <section className="section page-top">
      <div className="container">
        <span className="eyebrow">Directory</span>
        <h1>Government service guides</h1>
        <p className="page-intro">
          Start with a service area below, or search by everyday language. Review-pending content never appears here.
        </p>

        <nav className="service-category-nav" aria-label="Browse service categories">
          {categories.map((category) => {
            const count = publicServices.filter((service) => service.category === category.name).length;
            return (
              <Link key={category.name} href={"/categories/" + categorySlug(category.name)} className={category.name === "Foreign visas" ? "featured" : undefined}>
                <strong>{category.name}</strong>
                <span>{count} guide{count === 1 ? "" : "s"}</span>
              </Link>
            );
          })}
        </nav>

        <ServiceDirectory services={publicServices} />
      </div>
    </section>
  );
}
