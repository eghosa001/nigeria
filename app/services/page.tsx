import type { Metadata } from "next";
import Link from "next/link";
import { ServiceDirectory } from "@/components/service-directory";
import { categorySlug } from "@/lib/category";
import { categories, publicServiceListings } from "@/lib/data";

const popularServiceLinks = [
  { label: "CAC registration", href: "/topics/cac-business" },
  { label: "ECOWAS Travel Certificate", href: "/services/ecowas-travel-certificate" },
  { label: "ASIN registration", href: "/services/anambra-asin-registration" },
  { label: "NECO result token", href: "/services/neco-purchase-result-token" },
  { label: "NIP transfer status", href: "/services/nip-transfer-status" },
  { label: "Pension & RSA", href: "/topics/pension-services-nigeria" },
];

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services in Nigeria 2026: Government, Education, Travel, Banking & Business",
  description: "Find Nigerian government and everyday service guides, current fees, official portals, requirements and step-by-step application guidance for 2026.",
};

export const dynamic = "force-static";

export default function ServicesPage() {
  return (
    <section className="section page-top services-directory-page">
      <div className="container">
        <div className="minimal-directory-heading">
          <span className="eyebrow">Services</span>
          <h1>Service guides for Nigeria</h1>
          <p className="page-intro">Government processes, education, travel, banking, business and other practical services — search by what you need to do or choose a service area.</p>
          <form className="section-quick-search" action="/services#service-directory" method="get" role="search">
            <label>
              <span>Search services</span>
              <input type="search" name="q" placeholder="Passport, NIN, CAC, NYSC, visa…" />
            </label>
            <button type="submit">Search services</button>
          </form>
          <div className="minimal-inline-links" aria-label="Popular service guides">
            {popularServiceLinks.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </div>
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

        <div id="service-directory" className="section-search-target">
          <ServiceDirectory services={publicServiceListings} />
        </div>
      </div>
    </section>
  );
}
