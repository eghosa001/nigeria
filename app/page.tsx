import type { Metadata } from "next";
import Link from "next/link";
import { EntertainmentArtwork } from "@/components/entertainment-artwork";
import { ServiceSearch } from "@/components/search";
import { myNigeriaGuideUpdates, updateTypeLabel } from "@/data/updates";
import { publicServiceListings, publicServices } from "@/lib/data";
import { entertainmentTitles, getFeaturedCast } from "@/lib/entertainment";
import { exploreGuides } from "@/lib/explore";

export const metadata: Metadata = {
  title: "Nigeria Services, Travel & Entertainment Guide",
  description: "Use MyNigeriaGuide for clear Nigerian service guidance, practical travel planning and official routes to Nigerian movies and entertainment.",
  alternates: { canonical: "/" },
};

const popularServices = [
  { label: "Passport renewal", href: "/services/passport-renewal" },
  { label: "NIN correction", href: "/services/nin-date-of-birth-modification" },
  { label: "Retrieve BVN", href: "/services/bvn-retrieval" },
  { label: "JAMB 2026", href: "/services/jamb-2026-utme-registration" },
  { label: "NYSC senate list", href: "/services/nysc-senate-list" },
  { label: "CAC registration", href: "/services/cac-business-name-registration" },
];

export default function HomePage() {
  const verifiedCount = publicServices.filter((service) => service.status === "verified").length;
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
            <h1>Services, travel and entertainment <span>in one Nigerian guide.</span></h1>
            <p className="hero-lead">
              Get something done, discover somewhere worth going, or find a Nigerian movie to watch — without navigating a site that feels like three unrelated products.
            </p>

            <div className="premium-home-actions">
              <Link className="button" href="/services">Browse services</Link>
              <Link className="button button-secondary" href="/explore">Explore Nigeria</Link>
              <Link className="button button-secondary" href="/entertainment/movies">Find a movie</Link>
            </div>

            <div className="home-trust-line" aria-label="MyNigeriaGuide principles">
              <span>Source-linked guidance</span>
              <span>Official destinations</span>
              <span>Freshness shown clearly</span>
            </div>
          </div>

          <aside className="home-launchpad" aria-label="Choose a MyNigeriaGuide section">
            <Link href="/services" className="home-launch-card service-launch-card">
              <span>01 · Get something done</span>
              <strong>Services</strong>
              <p>{verifiedCount} published guides covering identity, travel documents, education, business, banking, driving and more.</p>
              <i>Open services →</i>
            </Link>
            <Link href="/explore" className="home-launch-card explore-launch-card">
              <span>02 · Go somewhere</span>
              <strong>Explore Nigeria</strong>
              <p>{exploreGuides.length} city, destination and itinerary guides with practical planning details.</p>
              <i>Plan a trip →</i>
            </Link>
            <Link href="/entertainment" className="home-launch-card entertainment-launch-card">
              <span>03 · Watch something</span>
              <strong>Entertainment</strong>
              <p>{entertainmentTitles.length} curated movie pages plus official YouTube, streaming, cinema and release routes.</p>
              <i>Explore entertainment →</i>
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
                <span className="eyebrow">Explore Nigeria</span>
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

            <article className="home-pillar-panel entertainment-panel">
              <div className="home-pillar-panel-heading">
                <span className="eyebrow">Entertainment</span>
                <h3>Find a movie and know where to watch it.</h3>
                <p>Browse cast, genres, languages, availability notes and verified official watch routes.</p>
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
          </div>
        </div>
      </section>

      <section className="home-utility-strip" aria-label="Useful shortcuts">
        <div className="container home-utility-grid">
          <Link href="/fees"><span>Service planning</span><strong>Check fees</strong><i>→</i></Link>
          <Link href="/offices"><span>In-person help</span><strong>Find official offices</strong><i>→</i></Link>
          <Link href="/explore#places"><span>Travel discovery</span><strong>Browse places</strong><i>→</i></Link>
          <Link href="/entertainment/youtube"><span>Free entertainment</span><strong>Watch official YouTube movies</strong><i>→</i></Link>
          <Link href="/entertainment/cinemas"><span>Big screen</span><strong>Find cinemas</strong><i>→</i></Link>
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
