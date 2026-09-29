import type { Metadata } from "next";
import Link from "next/link";
import { ServiceDirectory } from "@/components/service-directory";
import { categorySlug } from "@/lib/category";
import { categories, publicServiceListings, publicServices } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Nigeria service directory",
  description: "Search and filter MyNigeriaGuide's source-linked Nigerian service guides, including identity, travel, education, banking, business, driving and other practical processes.",
};

export const dynamic = "force-static";

export default function ServicesPage() {
  return (
    <section className="section page-top services-directory-page">
      <div className="container">
        <div className="directory-page-heading">
          <div>
            <span className="eyebrow">Services</span>
            <h1>Government service guides</h1>
            <p className="page-intro">
              Government services are the current core of this directory, but the structure is designed for practical non-government services too. Start with a service area or search by everyday language.
            </p>
          </div>
          <div className="directory-page-note">
            <strong>What you get in a guide</strong>
            <span>Requirements</span>
            <span>Fees and timing</span>
            <span>Official portals</span>
            <span>What happens next</span>
          </div>
        </div>

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

        <ServiceDirectory services={publicServiceListings} />
      </div>
    </section>
  );
}
