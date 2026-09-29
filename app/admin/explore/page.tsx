import type { Metadata } from "next";
import Link from "next/link";
import { exploreGuides } from "@/lib/explore";
import { explorePlaces, getExplorePlacesForGuide } from "@/lib/explore-places";

export const metadata: Metadata = { title: "Tour Nigeria" };

export default function AdminExplorePage() {
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
          <div><strong>{destinations.length}</strong><span>Destinations</span></div>
          <div><strong>{itineraries.length}</strong><span>Itineraries</span></div>
          <div><strong>{explorePlaces.length}</strong><span>Places</span></div>
          <div><strong>{new Set(exploreGuides.map((guide) => guide.region)).size}</strong><span>Regions covered</span></div>
        </div>

        <section className="admin-panel">
          <div className="section-heading"><div><span className="eyebrow">Coverage</span><h2>Guide records</h2></div><Link href="/explore">Public Tour Nigeria →</Link></div>
          <div className="review-table">
            {exploreGuides.map((guide) => {
              const places = getExplorePlacesForGuide(guide.slug);
              return (
                <Link href={"/explore/" + guide.slug} key={guide.slug}>
                  <span><strong>{guide.title}</strong><small>{guide.region} · {guide.kind}</small></span>
                  <span>{places.length} place{places.length === 1 ? "" : "s"} · {guide.lastReviewed}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
