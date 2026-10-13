import type { Metadata } from "next";
import Link from "next/link";
import { exploreGuides } from "@/lib/explore";
import { explorePlaces, getExplorePlacesForGuide } from "@/lib/explore-places";

export const metadata: Metadata = { title: "Tour Nigeria" };

const PAGE_SIZE = 24;

export default async function AdminExplorePage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: requested } = await searchParams;
  const totalPages = Math.max(1, Math.ceil(exploreGuides.length / PAGE_SIZE));
  const candidate = Number(requested ?? "1");
  const page = Number.isSafeInteger(candidate) ? Math.min(totalPages, Math.max(1, candidate)) : 1;
  const visibleGuides = exploreGuides.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const cities = exploreGuides.filter((guide) => guide.kind === "city");
  const destinations = exploreGuides.filter((guide) => guide.kind === "destination");
  const itineraries = exploreGuides.filter((guide) => guide.kind === "itinerary");

  return (
    <section className="section page-top admin-page">
      <div className="container">
        <span className="eyebrow">Tour Nigeria operations</span>
        <h1>Travel guides & place records</h1>
        <p className="page-intro">Review destination coverage, addresses, map-ready place records, cost notes and freshness across Tour Nigeria.</p>

        <div className="metric-grid">
          <div><strong>{exploreGuides.length}</strong><span>Travel guides</span></div>
          <div><strong>{cities.length}</strong><span>City guides</span></div>
          <div><strong>{explorePlaces.length}</strong><span>Mapped places</span></div>
          <div><strong>{destinations.length + itineraries.length}</strong><span>Destinations &amp; itineraries</span></div>
        </div>

        <section className="admin-panel">
          <div className="section-heading"><div><span className="eyebrow">Coverage</span><h2>Guide records</h2></div><Link href="/explore">Public Tour Nigeria →</Link></div>
          <div className="review-table">
            {visibleGuides.map((guide) => {
              const places = getExplorePlacesForGuide(guide.slug);
              return (
                <Link href={"/explore/" + guide.slug} key={guide.slug}>
                  <span><strong>{guide.title}</strong><small>{guide.region} · {guide.kind}</small></span>
                  <span>{places.length} place{places.length === 1 ? "" : "s"} · {guide.lastReviewed}</span>
                </Link>
              );
            })}
          </div>
          {totalPages > 1 ? (
            <nav className="admin-pagination" aria-label="Travel guide pages">
              {page > 1 ? <Link href={"/admin/explore?page=" + (page - 1)}>← Previous</Link> : <span />}
              <span>Page {page} of {totalPages}</span>
              {page < totalPages ? <Link href={"/admin/explore?page=" + (page + 1)}>Next →</Link> : <span />}
            </nav>
          ) : null}
        </section>
      </div>
    </section>
  );
}
