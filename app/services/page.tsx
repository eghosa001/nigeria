import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ServiceDirectory } from "@/components/service-directory";
import { categorySlug } from "@/lib/category";
import { categories } from "@/lib/data";
import { queryServiceDirectory, type ServiceDirectorySort, type ServiceDirectoryStatus } from "@/lib/service-query";

const popularServiceLinks = [
  { label: "CAC registration", href: "/topics/cac-business" },
  { label: "Nigeria Tax ID / TIN", href: "/services/nrs-tax-id-retrieval" },
  { label: "Landing & Exit Card", href: "/services/nigeria-landing-exit-card" },
  { label: "ASIN registration", href: "/services/anambra-asin-registration" },
  { label: "NIN phone correction", href: "/services/nin-phone-modification" },
  { label: "NIN Share Code / NINAuth", href: "/services/ninauth-nin-verification" },
  { label: "Track passport application", href: "/services/passport-application-tracking" },
  { label: "ECOWAS Travel Certificate", href: "/services/ecowas-travel-certificate" },
];

const featuredServiceCategories = ["Identity", "Education", "Immigration", "Business", "Foreign visas", "State services"];

type ServiceSearchParams = {
  q?: string;
  category?: string;
  status?: string;
  sort?: string;
  page?: string;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<ServiceSearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const filtered = Boolean(
    (params.q ?? "").trim() ||
    (params.category ?? "").trim() ||
    (params.status ?? "").trim() ||
    (params.sort ?? "").trim() ||
    Number(params.page ?? "1") > 1
  );

  return {
    alternates: { canonical: "/services" },
    title: "Nigeria Services: Fees & Official Portals",
    description: "Find Nigerian government and everyday service guides, current fees, official portals, requirements and step-by-step application guidance for 2026.",
    robots: filtered ? { index: false, follow: true } : undefined,
  };
}

export const revalidate = 3600;

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<ServiceSearchParams>;
}) {
  const params = await searchParams;
  const categoryNames = categories.map((category) => category.name);
  const primaryCategories = featuredServiceCategories
    .map((name) => categories.find((category) => category.name === name))
    .filter((category): category is (typeof categories)[number] => Boolean(category));
  const primaryCategoryNames = new Set(primaryCategories.map((category) => category.name));
  const remainingCategories = categories.filter((category) => !primaryCategoryNames.has(category.name));
  const initialCategory = params.category && categoryNames.includes(params.category) ? params.category : "all";
  const initialStatus = ["verified", "conflict"].includes(params.status ?? "")
    ? params.status as ServiceDirectoryStatus
    : "all";
  const initialSort = ["az", "recent"].includes(params.sort ?? "")
    ? params.sort as ServiceDirectorySort
    : "relevance";
  const initialPage = Math.max(1, Number(params.page ?? "1") || 1);
  const filteredMode = Boolean(
    (params.q ?? "").trim() ||
    initialCategory !== "all" ||
    initialStatus !== "all" ||
    initialSort !== "relevance"
  );

  if (!filteredMode && initialPage > 1) {
    redirect("/services/page/" + initialPage);
  }

  const initialResult = queryServiceDirectory({
    q: params.q,
    category: initialCategory,
    status: initialStatus,
    sort: initialSort,
    page: initialPage,
  });

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

        <nav className="service-category-nav minimal-category-nav service-category-featured" aria-label="Popular service categories">
          {primaryCategories.map((category) => (
            <Link
              key={category.name}
              href={"/categories/" + categorySlug(category.name)}
              className={category.name === "Foreign visas" ? "featured" : undefined}
            >
              <strong>{category.name}</strong>
            </Link>
          ))}
        </nav>

        <details className="browse-disclosure service-category-disclosure">
          <summary>Browse all {categories.length} service categories</summary>
          <nav className="disclosure-link-grid" aria-label="All service categories">
            {remainingCategories.map((category) => (
              <Link key={category.name} href={"/categories/" + categorySlug(category.name)}>
                {category.name}
              </Link>
            ))}
          </nav>
        </details>

        <div id="service-directory" className="section-search-target">
          <ServiceDirectory
            initialResult={initialResult}
            categories={categoryNames}
            initialQuery={params.q ?? ""}
            initialCategory={initialCategory}
            initialStatus={initialStatus}
            initialSort={initialSort}
          />
        </div>
      </div>
    </section>
  );
}
