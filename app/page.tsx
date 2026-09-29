import type { Metadata } from "next";
import Link from "next/link";
import { EntertainmentArtwork } from "@/components/entertainment-artwork";
import { ServiceSearch } from "@/components/search";
import { publicServiceListings } from "@/lib/data";
import { entertainmentTitles, getFeaturedCast } from "@/lib/entertainment";
import { exploreGuides } from "@/lib/explore";

export const metadata: Metadata = {
  title: "Nigerian Movies, Services & Travel Guide",
  description: "Discover Nigerian movies, practical service guidance and places to explore across Nigeria in one clear guide.",
  alternates: { canonical: "/" },
};

const quickServices = [
  { label: "Passport renewal", href: "/services/passport-renewal" },
  { label: "NIN correction", href: "/services/nin-date-of-birth-modification" },
  { label: "JAMB", href: "/services/jamb-2026-utme-registration" },
  { label: "Foreign visas", href: "/categories/foreign-visas" },
];

export default function HomePage() {
  const movieHighlights = entertainmentTitles
    .filter((title) => title.watchLinks.some((link) => link.platform === "YouTube" && link.access === "full-movie"))
    .slice(0, 6);

  const travelHighlights = exploreGuides
    .filter((guide) => guide.kind === "city" || guide.kind === "destination")
    .slice(0, 3);

  return (
    <>
      <section className="minimal-home-hero">
        <div className="container minimal-home-hero-inner">
          <div className="minimal-home-copy">
            <span className="eyebrow">MyNigeriaGuide</span>
            <h1>Nigeria, easier to explore.</h1>
            <p>Watch Nigerian movies, handle essential services, and find places worth going.</p>
          </div>

          <nav className="home-paths" aria-label="Start with MyNigeriaGuide">
            <Link href="/entertainment/movies" className="home-path home-path-movies">
              <span>Watch</span>
              <strong>Movies</strong>
              <small>Find Nigerian films and official places to watch.</small>
            </Link>
            <Link href="/services" className="home-path home-path-services">
              <span>Do</span>
              <strong>Services</strong>
              <small>Clear steps for documents, applications and everyday processes.</small>
            </Link>
            <Link href="/explore" className="home-path home-path-tour">
              <span>Go</span>
              <strong>Tour Nigeria</strong>
              <small>Discover cities, places, food, stays and practical trip details.</small>
            </Link>
          </nav>
        </div>
      </section>

      <section className="minimal-home-section minimal-home-movies" aria-labelledby="home-movies-title">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Movies</span>
              <h2 id="home-movies-title">What to watch.</h2>
            </div>
            <Link href="/entertainment/movies">Browse movies →</Link>
          </div>

          <div className="minimal-movie-row">
            {movieHighlights.map((title) => (
              <article className="minimal-movie-card" key={title.slug}>
                <Link href={"/entertainment/movies/" + title.slug} aria-label={"Open " + title.title}>
                  <EntertainmentArtwork title={title} />
                </Link>
                <div>
                  <h3><Link href={"/entertainment/movies/" + title.slug}>{title.title}</Link></h3>
                  <p>{title.year} · {getFeaturedCast(title).slice(0, 2).join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="minimal-inline-links">
            <Link href="/entertainment/youtube">Free on YouTube</Link>
            <Link href="/entertainment/releases">New &amp; upcoming</Link>
            <Link href="/entertainment/cinemas">Cinemas</Link>
          </div>
        </div>
      </section>

      <section className="minimal-home-section minimal-home-services" aria-labelledby="home-services-title">
        <div className="container minimal-split">
          <div className="minimal-section-copy">
            <span className="eyebrow">Services</span>
            <h2 id="home-services-title">Find the process you need.</h2>
            <p>Search in plain language. Open a guide only when you need the details.</p>
            <div className="minimal-inline-links">
              {quickServices.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            </div>
          </div>

          <div className="minimal-service-search">
            <ServiceSearch services={publicServiceListings} />
          </div>
        </div>
      </section>

      <section className="minimal-home-section minimal-home-tour" aria-labelledby="home-tour-title">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Tour Nigeria</span>
              <h2 id="home-tour-title">Where to go next.</h2>
            </div>
            <Link href="/explore">Explore Nigeria →</Link>
          </div>

          <div className="minimal-travel-grid">
            {travelHighlights.map((guide) => (
              <Link href={"/explore/" + guide.slug} className="minimal-travel-card" key={guide.slug}>
                <span>{guide.region}</span>
                <strong>{guide.shortTitle}</strong>
                <small>{guide.kind === "city" ? "City guide" : "Destination guide"} →</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
