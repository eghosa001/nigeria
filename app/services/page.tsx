import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ServiceDirectory } from "@/components/service-directory";
import { categorySlug } from "@/lib/category";
import { categories } from "@/lib/data";
import { queryServiceDirectory, type ServiceDirectorySort, type ServiceDirectoryStatus } from "@/lib/service-query";

const popularServiceLinks = [
  // Prioritize distinct, useful tasks whose existing canonical pages are under-discovered.
  // Keep this compact; the full directory and category navigation remain below.
  { label: "JAMB profile code and recovery", href: "/services/jamb-profile-code" },
  { label: "JAMB CAPS admission status", href: "/services/jamb-caps" },
  { label: "WAEC result checker", href: "/services/waec-check-result" },
  { label: "NECO result checker", href: "/services/neco-check-result" },
  { label: "NYSC senate list", href: "/services/nysc-senate-list" },
  { label: "NYSC call-up letter", href: "/services/nysc-call-up-letter" },
  { label: "University admission, fees and portals", href: "/universities" },
  { label: "NELFUND student loan guidance", href: "/topics/nelfund" },
  { label: "Correct NIN date of birth", href: "/services/nin-date-of-birth-modification" },
  { label: "Nigeria individual tax registration", href: "/services/nrs-individual-tax-registration" },
  { label: "Money transfer reversal", href: "/services/momo-psb-wrong-transfer-reversal" },
  { label: "Air Peace online check-in", href: "/services/air-peace-online-check-in" },
  { label: "Pension and RSA processes", href: "/topics/pension-services-nigeria" },
  { label: "Find official Nigerian portals", href: "/official-portals" },
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
    title: "CAC, NYSC, NIN, Passport & WAEC Service Guides",
    description: "Check CAC registration fees and portal, NYSC Batch C status, NIN retrieval, passport renewal, WAEC results and official Nigeria service instructions.",
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
