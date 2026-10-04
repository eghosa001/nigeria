import type { Metadata } from "next";
import Link from "next/link";
import { EntertainmentArtwork } from "@/components/entertainment-artwork";
import { ServiceSearch } from "@/components/search";
import { publicServiceListings } from "@/lib/data";
import { entertainmentTitles, getFeaturedCast } from "@/lib/entertainment";
import { exploreGuides } from "@/lib/explore";
import { governmentOpportunities, privateOpportunities } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Nigerian Movies, Services, Jobs & Travel Guide",
  description: "Discover Nigerian movies, practical service guidance, verified jobs and careers, and places to explore across Nigeria.",
  alternates: { canonical: "/" },
};

const quickServices = [
  { label: "JAMB portal guide", href: "/topics/jamb-2026" },
  { label: "NYSC portal guide", href: "/topics/nysc" },
  { label: "WAEC results", href: "/topics/waec" },
  { label: "NECO results", href: "/topics/neco" },
  { label: "NELFUND", href: "/topics/nelfund" },
  { label: "NIN services", href: "/topics/nin-corrections" },
  { label: "BVN services", href: "/topics/bvn" },
  { label: "CAC registration", href: "/topics/cac-business" },
  { label: "Foreign visas", href: "/categories/foreign-visas" },
];

export default function HomePage() {
  const movieHighlights = entertainmentTitles
    .filter((title) => title.watchLinks.some((link) => link.platform === "YouTube" && link.access === "full-movie"))
    .slice(0, 6);

  const travelHighlights = exploreGuides
    .filter((guide) => guide.kind === "city" || guide.kind === "destination")
    .slice(0, 3);

  const openGovernmentHighlights = governmentOpportunities
    .filter((item) => item.status === "open")
    .slice(0, 3);

  const activeGovernmentCount = governmentOpportunities.filter(
    (item) => item.status === "open" || item.status === "screening" || item.status === "training",
  ).length;

  return (
    <>
      <section className="minimal-home-hero">
        <div className="container minimal-home-hero-inner">
          <div className="minimal-home-copy">
            <span className="eyebrow">MyNigeriaGuide</span>
            <h1>Nigeria, easier to explore.</h1>
            <p>Watch Nigerian movies, handle essential services, find verified career opportunities, and discover places worth going.</p>
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
            <Link href="/jobs" className="home-path home-path-jobs">
              <span>Work</span>
              <strong>Jobs & Careers</strong>
              <small>Track verified recruitment, deadlines, graduate programmes and employer career routes.</small>
            </Link>
          </nav>
        </div>
      </section>

      <section className="home-trending-strip" aria-labelledby="home-trending-title">
        <div className="container">
          <div className="home-trending-heading">
            <div>
              <span className="eyebrow">Trending now</span>
              <h2 id="home-trending-title">Fresh things people are checking.</h2>
            </div>
            <Link href="/latest">See all latest updates →</Link>
          </div>
          <div className="home-trending-links">
            <Link href="/entertainment/movies/october-2026">
              <span>Movies</span>
              <strong>October 2026 Nigerian releases</strong>
            </Link>
            <Link href="/services/jamb-caps">
              <span>Services</span>
              <strong>JAMB 2026/27 CAPS admissions</strong>
            </Link>
            <Link href="/explore/detty-december-lagos-2026">
              <span>Tour Nigeria</span>
              <strong>Detty December Lagos 2026</strong>
            </Link>
            <Link href="/jobs/deadlines">
              <span>Jobs & Careers</span>
              <strong>Applications open now</strong>
            </Link>
          </div>
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
                  <EntertainmentArtwork title={title} showSourceLink={false} />
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

      <section className="minimal-home-section minimal-home-jobs" aria-labelledby="home-jobs-title">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Jobs & Careers</span>
              <h2 id="home-jobs-title">Know what is open before you apply.</h2>
            </div>
            <Link href="/jobs">Browse careers →</Link>
          </div>

          <div className="home-jobs-grid">
            <Link href="/jobs/government" className="home-job-feature">
              <div className="home-job-feature-summary">
                <span>Government tracker</span>
                <strong>{governmentOpportunities.length} verified recruitment guides</strong>
                <small>{activeGovernmentCount} recruitments are currently open or in an active later stage.</small>
              </div>

              <div className="home-job-feature-live">
                <span>Open now</span>
                {openGovernmentHighlights.map((item) => (
                  <div className="home-job-feature-live-item" key={item.slug}>
                    <b>{item.organization}</b>
                    <small>
                      {item.deadline
                        ? "Closes " + new Date(item.deadline + "T00:00:00Z").toLocaleDateString("en-NG", { day: "numeric", month: "short", timeZone: "UTC" })
                        : item.statusLabel}
                    </small>
                  </div>
                ))}
              </div>

              <b className="home-job-feature-cta">Open government tracker →</b>
            </Link>
            <div className="home-job-list">
              {governmentOpportunities.slice(0, 2).map((item) => (
                <Link href={"/jobs/" + item.slug} key={item.slug}>
                  <span>{item.statusLabel}</span>
                  <strong>{item.organization}</strong>
                  <small>{item.nextMilestone || item.summary}</small>
                </Link>
              ))}
              <Link href="/jobs/private">
                <span>Private institutions</span>
                <strong>{privateOpportunities.length} official employer career routes</strong>
                <small>Graduate programmes, SIWES, internships and professional opportunities.</small>
              </Link>
            </div>
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
