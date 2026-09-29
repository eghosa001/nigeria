import type { Metadata } from "next";
import Link from "next/link";
import { categories, publicServices, services } from "@/lib/data";
import { entertainmentTitles } from "@/lib/entertainment";
import { entertainmentPeople, releaseItems } from "@/lib/entertainment-extras";
import { exploreGuides } from "@/lib/explore";
import { explorePlaces } from "@/lib/explore-places";
import { isReportBackendConfigured } from "@/lib/report-backend";
import { verifiedYouTubeMovieChannels } from "@/lib/youtube-movie-channels";
import { youtubeMovieLibrary } from "@/lib/youtube-library";

export const metadata: Metadata = { title: "Dashboard" };

function latest(values: string[]) {
  return values.reduce((current, value) => value > current ? value : current, "");
}

export default function AdminPage() {
  const verified = services.filter((service) => service.status === "verified");
  const conflicts = services.filter((service) => service.status === "conflict");
  const reviews = services.filter((service) => service.status === "review");
  const foreignVisas = publicServices.filter((service) => service.category === "Foreign visas");
  const sourceCount = new Set(services.flatMap((service) => service.sources.map((source) => source.url))).size;
  const backendConnected = isReportBackendConfigured();

  const categoryRows = categories
    .map((category) => ({
      name: category.name,
      count: publicServices.filter((service) => service.category === category.name).length,
    }))
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const movieFreshness = latest(entertainmentTitles.flatMap((title) => title.watchLinks.map((link) => link.lastChecked)));
  const travelFreshness = latest(exploreGuides.map((guide) => guide.lastReviewed));
  const serviceFreshness = latest(publicServices.map((service) => service.lastVerified));

  return (
    <section className="section page-top admin-page">
      <div className="container">
        <div className="admin-heading">
          <div>
            <span className="eyebrow">Operations</span>
            <h1>Platform operations dashboard</h1>
            <p className="page-intro">Manage and review the three public pillars of MyNigeriaGuide: movies, practical services and Tour Nigeria, with analytics and verification tools in one workspace.</p>
          </div>
          <span className={"db-state " + (backendConnected ? "connected" : "offline")}>
            {backendConnected ? "Correction backend connected" : "Read-only operations mode"}
          </span>
        </div>

        <div className="metric-grid">
          <div><strong>{youtubeMovieLibrary.length}</strong><span>YouTube movies</span></div>
          <div><strong>{entertainmentTitles.length}</strong><span>Curated movies</span></div>
          <div><strong>{publicServices.length}</strong><span>Service guides</span></div>
          <div><strong>{exploreGuides.length}</strong><span>Travel guides</span></div>
          <div><strong>{explorePlaces.length}</strong><span>Travel places</span></div>
          <div><strong>{sourceCount + verifiedYouTubeMovieChannels.length}</strong><span>Tracked sources</span></div>
        </div>

        <div className="admin-action-grid">
          <Link href="/admin/entertainment"><span>Movies</span><strong>Entertainment catalog</strong><small>Review curated titles, full YouTube movies, publishers, people and release freshness.</small><i>→</i></Link>
          <Link href="/admin/services"><span>Services</span><strong>Content library</strong><small>Search every service guide by category, status or keyword and inspect its full source record.</small><i>→</i></Link>
          <Link href="/admin/explore"><span>Tour Nigeria</span><strong>Travel catalog</strong><small>Review destination coverage, mapped places, costs, addresses and last-reviewed dates.</small><i>→</i></Link>
          <Link href="/admin/visits"><span>Audience</span><strong>Visits & discovery</strong><small>See traffic, countries, page views, referrers and the pages users are reaching.</small><i>→</i></Link>
        </div>

        <div className="admin-two-column">
          <section className="admin-panel">
            <div className="section-heading">
              <div><span className="eyebrow">Platform freshness</span><h2>Current review dates</h2></div>
              <Link href="/latest">Public latest hub →</Link>
            </div>
            <div className="admin-category-list">
              <Link href="/admin/entertainment"><span>Movies and entertainment</span><strong>{movieFreshness || "—"}</strong></Link>
              <Link href="/admin/services"><span>Service guidance</span><strong>{serviceFreshness || "—"}</strong></Link>
              <Link href="/admin/explore"><span>Tour Nigeria</span><strong>{travelFreshness || "—"}</strong></Link>
              <Link href="/admin/updates"><span>Release / update records</span><strong>{releaseItems.length}</strong></Link>
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Editorial queue</span><h2>Needs attention</h2></div></div>
            {reviews.length || conflicts.length ? (
              <div className="review-table">
                {[...reviews, ...conflicts].slice(0, 12).map((service) => (
                  <Link href={"/admin/services/" + service.slug} key={service.slug}>
                    <span><strong>{service.shortTitle}</strong><small>{service.category} · {service.agencySlug.toUpperCase()}</small></span>
                    <span>{service.status}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="admin-empty"><strong>No unresolved public conflicts.</strong><p>Review-status guides remain unpublished until verified.</p></div>
            )}
          </section>
        </div>

        <div className="admin-two-column top-gap">
          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Service coverage</span><h2>Largest categories</h2></div><Link href="/admin/services">All guides →</Link></div>
            <div className="admin-category-list">
              {categoryRows.slice(0, 10).map((row) => (
                <Link key={row.name} href={"/services?category=" + encodeURIComponent(row.name)}>
                  <span>{row.name}</span><strong>{row.count}</strong>
                </Link>
              ))}
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Discovery coverage</span><h2>Catalog relationships</h2></div></div>
            <div className="admin-category-list">
              <Link href="/admin/entertainment"><span>Approved YouTube publishers</span><strong>{verifiedYouTubeMovieChannels.length}</strong></Link>
              <Link href="/admin/entertainment"><span>Actor / filmmaker profiles</span><strong>{entertainmentPeople.length}</strong></Link>
              <Link href="/admin/explore"><span>Travel places with map-ready records</span><strong>{explorePlaces.length}</strong></Link>
              <Link href="/admin/foreign-visas"><span>Foreign visa guides</span><strong>{foreignVisas.length}</strong></Link>
              <Link href="/admin/sources"><span>Official service source URLs</span><strong>{sourceCount}</strong></Link>
            </div>
          </section>
        </div>

        <section className="admin-panel admin-safety-note top-gap">
          <span className="eyebrow">Protected operations</span>
          <h2>Admin access and publishing remain separated</h2>
          <p>The admin area is private. Service edits continue through review pull requests, while the newer movie and travel workspaces provide operational visibility without bypassing repository review and deployment checks.</p>
        </section>
      </div>
    </section>
  );
}
