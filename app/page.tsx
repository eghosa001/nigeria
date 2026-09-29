import type { Metadata } from "next";
import Link from "next/link";
import { EntertainmentArtwork } from "@/components/entertainment-artwork";
import { ServiceSearch } from "@/components/search";
import { myNigeriaGuideUpdates, updateTypeLabel } from "@/data/updates";
import { publicServiceListings } from "@/lib/data";
import { entertainmentTitles, getFeaturedCast } from "@/lib/entertainment";
import { exploreGuides } from "@/lib/explore";

export const metadata: Metadata = {
  title: "Nigerian Movies, Services & Travel Guide",
  description: "Discover Nigerian movies first, then practical service guidance and travel ideas across Nigeria, with official routes and source-linked information.",
  alternates: { canonical: "/" },
};

const popularServices = [
  { label: "Passport renewal", href: "/services/passport-renewal" },
  { label: "NIN correction", href: "/services/nin-date-of-birth-modification" },
  { label: "Retrieve BVN", href: "/services/bvn-retrieval" },
  { label: "JAMB 2026", href: "/services/jamb-2026-utme-registration" },
  { label: "NYSC senate list", href: "/services/nysc-senate-list" },
  { label: "CAC registration", href: "/services/cac-business-name-registration" },
  { label: "Foreign visas", href: "/categories/foreign-visas" },
];

export default function HomePage() {
  const travelHighlights = exploreGuides
    .filter((guide) => guide.kind === "city" || guide.kind === "destination")
    .slice(0, 4);
  const movieHighlights = entertainmentTitles
    .filter((title) => title.watchLinks.some((link) => link.platform === "YouTube" && link.access === "full-movie"))
    .slice(0, 4);

  return (
    <>
      <section className="hero home-hero premium-home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="hero-kicker-dot" aria-hidden="true" />
              One practical guide to Nigeria
            </div>
            <h1>Movies, services and places to explore <span>in one Nigerian guide.</span></h1>
            <p className="hero-lead">
              Find a Nigerian movie first, then get something done or discover somewhere worth going — all inside one consistent guide.
            </p>

            <div className="premium-home-actions">
              <Link className="button" href="/entertainment/movies">Find a movie</Link>
              <Link className="button button-secondary" href="/services">Browse services</Link>
              <Link className="button button-secondary" href="/explore">Tour Nigeria</Link>
            </div>

            <div className="home-trust-line" aria-label="MyNigeriaGuide principles">
              <span>Source-linked guidance</span>
              <span>Official destinations</span>
              <span>Freshness shown clearly</span>
            </div>
          </div>

          <aside className="home-launchpad" aria-label="Choose a MyNigeriaGuide section">
            <Link href="/entertainment/movies" className="home-launch-card entertainment-launch-card">
              <span>01 · Watch something</span>
              <strong>Movies</strong>
              <p>Browse Nigerian films with images, cast details, descriptions and official places to watch.</p>
              <i>Find a movie →</i>
            </Link>
            <Link href="/services" className="home-launch-card service-launch-card">
              <span>02 · Get something done</span>
              <strong>Services</strong>
              <p>Follow clear requirements, costs, official links and next steps for practical Nigerian services.</p>
              <i>Open services →</i>
            </Link>
            <Link href="/explore" className="home-launch-card explore-launch-card">
              <span>03 · Go somewhere</span>
              <strong>Tour Nigeria</strong>
              <p>Plan cities, destinations and places with practical location, timing, transport and cost details.</p>
              <i>Plan a trip →</i>
            </Link>
          </aside>
        </div>
      </section>

      <section className="section home-discovery-section" aria-labelledby="home-discovery-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Start anywhere</span>
              <h2 id="home-discovery-title">Three clear ways into MyNigeriaGuide.</h2>
              <p className="section-lead">Each area has its own focused tools and navigation, while the overall site keeps the same visual system.</p>
            </div>
          </div>

          <div className="home-pillar-showcase-grid">
            <article className="home-pillar-panel entertainment-panel">
              <div className="home-pillar-panel-heading">
                <span className="eyebrow">Movies</span>
                <h3>Find something worth watching.</h3>
                <p>Browse images, cast, descriptions, genres and verified official watch routes without opening multiple sites.</p>
              </div>
              <div className="home-movie-mini-grid">
                {movieHighlights.map((title) => (
                  <article key={title.slug} className="home-movie-mini-card">
                    <EntertainmentArtwork title={title} />
                    <Link href={"/entertainment/movies/" + title.slug}>
                      <strong>{title.title}</strong>
                      <small>{title.year} · {getFeaturedCast(title).slice(0, 2).join(" · ")}</small>
                    </Link>
                  </article>
                ))}
              </div>
              <Link className="home-panel-cta" href="/entertainment/movies">Browse movies →</Link>
            </article>

            <article className="home-pillar-panel services-panel">
              <div className="home-pillar-panel-heading">
                <span className="eyebrow">Services</span>
                <h3>Find the process you need.</h3>
                <p>Search by the words you would naturally use, then follow requirements, costs, official links and next steps.</p>
              </div>
              <ServiceSearch services={publicServiceListings} />
              <div className="home-panel-links">
                {popularServices.map((item) => <Link key={item.href} href={item.href}>{item.label}<span>→</span></Link>)}
              </div>
              <Link className="home-panel-cta" href="/services">Browse all services →</Link>
            </article>

            <article className="home-pillar-panel explore-panel">
              <div className="home-pillar-panel-heading">
                <span className="eyebrow">Tour Nigeria</span>
                <h3>Choose a city or destination.</h3>
                <p>Move from inspiration to useful planning details: places, timing, transport, addresses, maps and cost notes.</p>
              </div>
              <div className="home-panel-links home-travel-links">
                {travelHighlights.map((guide) => (
                  <Link href={"/explore/" + guide.slug} key={guide.slug}>
                    <span><strong>{guide.shortTitle}</strong><small>{guide.region} · {guide.kind}</small></span>
                    <b>→</b>
                  </Link>
                ))}
              </div>
              <Link className="home-panel-cta" href="/explore">Explore destinations →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="home-utility-strip" aria-label="Useful shortcuts">
        <div className="container home-utility-grid">
          <Link href="/entertainment/youtube"><span>Watch free</span><strong>Official YouTube movies</strong><i>→</i></Link>
          <Link href="/entertainment/releases"><span>Movie discovery</span><strong>New & upcoming</strong><i>→</i></Link>
          <Link href="/fees"><span>Service planning</span><strong>Check fees</strong><i>→</i></Link>
          <Link href="/offices"><span>In-person help</span><strong>Find official offices</strong><i>→</i></Link>
          <Link href="/explore#places"><span>Tour Nigeria</span><strong>Browse places</strong><i>→</i></Link>
          <Link href="/saved"><span>Come back later</span><strong>Saved guides</strong><i>→</i></Link>
        </div>
      </section>

      <section className="section premium-dark-section">
        <div className="container">
          <div className="section-heading section-heading-light">
            <div>
              <span className="eyebrow">Verified service changes</span>
              <h2>Important process updates, without taking over the homepage.</h2>
              <p className="section-lead">Public-service rules change more often than travel inspiration or movie metadata, so the latest verified changes stay easy to reach here.</p>
            </div>
            <Link href="/updates">View all updates <span aria-hidden="true">→</span></Link>
          </div>
          <div className="home-updates-grid">
            {myNigeriaGuideUpdates.slice(0, 3).map((update) => (
              <article className="home-update-card" key={update.id}>
                <div>
                  <span>{updateTypeLabel(update.type)}</span>
                  <time dateTime={update.date}>{update.date}</time>
                </div>
                <h3>{update.title}</h3>
                <p>{update.summary}</p>
                <Link href={"/updates#" + update.id}>Read verified update →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-platform-principles">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">One consistent platform</span>
              <h2>Useful information stays close to the action.</h2>
            </div>
          </div>
          <div className="proof-grid">
            <div><span aria-hidden="true">01</span><strong>Clear hierarchy</strong><small>Three top-level areas instead of a crowded menu.</small></div>
            <div><span aria-hidden="true">02</span><strong>Context navigation</strong><small>Each section shows the most useful routes for that task.</small></div>
            <div><span aria-hidden="true">03</span><strong>Official destinations</strong><small>Applications, bookings and playback stay with the source.</small></div>
            <div><span aria-hidden="true">04</span><strong>Mobile-first scanning</strong><small>Cards, filters and details collapse cleanly on small screens.</small></div>
          </div>
        </div>
      </section>
    </>
  );
}
