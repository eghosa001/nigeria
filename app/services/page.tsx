import type { Metadata } from "next";
import Link from "next/link";
import { ServiceDirectory } from "@/components/service-directory";
import { categorySlug } from "@/lib/category";
import { categories, publicServiceListings } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Nigeria service directory",
  description: "Search source-linked Nigerian service guides for fees, requirements, official portals and practical application steps.",
};

export const dynamic = "force-static";

export default function ServicesPage() {
  return (
    <section className="section page-top services-directory-page">
      <div className="container">
        <div className="minimal-directory-heading">
          <span className="eyebrow">Services</span>
          <h1>Government service guides</h1>
          <p className="page-intro">Search by what you need to do, or choose a service area.</p>
        </div>

        <nav className="service-category-nav minimal-category-nav" aria-label="Browse service categories">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={"/categories/" + categorySlug(category.name)}
              className={category.name === "Foreign visas" ? "featured" : undefined}
            >
              <strong>{category.name}</strong>
            </Link>
          ))}
        </nav>

        <ServiceDirectory services={publicServiceListings} />
      </div>
    </section>
  );
}
