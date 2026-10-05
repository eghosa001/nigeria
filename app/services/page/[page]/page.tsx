import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ServiceCard } from "@/components/service-card";
import { getServiceDirectoryPageCount, queryServiceDirectory } from "@/lib/service-query";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, getServiceDirectoryPageCount() - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const page = Number((await params).page);
  const pageCount = getServiceDirectoryPageCount();
  if (!Number.isInteger(page) || page < 2 || page > pageCount) {
    return { robots: { index: false, follow: true } };
  }

  return {
    title: "Nigeria Service Guides — Page " + page,
    description: "Browse page " + page + " of verified Nigerian service guides with requirements, fees, steps and official sources.",
    alternates: { canonical: "/services/page/" + page },
  };
}

export default async function ServicePaginationPage({ params }: { params: Promise<{ page: string }> }) {
  const page = Number((await params).page);
  const result = queryServiceDirectory({ page });
  if (!Number.isInteger(page) || page < 2 || page > result.totalPages) notFound();

  const previousHref = page === 2 ? "/services" : "/services/page/" + (page - 1);
  const nextHref = page < result.totalPages ? "/services/page/" + (page + 1) : null;

  return (
    <section className="section page-top services-directory-page">
      <div className="container">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Page " + page },
        ]} />

        <div className="minimal-directory-heading">
          <span className="eyebrow">Services</span>
          <h1>Browse more Nigerian service guides.</h1>
          <p className="page-intro">Page {page} of verified public service guides.</p>
          <div className="minimal-inline-links">
            <Link href="/services">Search all services</Link>
            <Link href="/official-portals">Official portals</Link>
            <Link href="/fees">Fees</Link>
            <Link href="/locations">Locations</Link>
          </div>
        </div>

        <div className="service-grid">
          {result.items.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>

        <nav className="jobs-pagination" aria-label="Service directory pages">
          <Link prefetch={false} href={previousHref}>← Previous</Link>
          <span>Page {page} of {result.totalPages}</span>
          {nextHref ? <Link prefetch={false} href={nextHref}>Next →</Link> : <span />}
        </nav>
      </div>
    </section>
  );
}
