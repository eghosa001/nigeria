import type { Metadata } from "next";
import Link from "next/link";
import { EntertainmentArtwork } from "@/components/entertainment-artwork";
import { ServiceSearch } from "@/components/search";
import { getCurrentHomeSocialTrends } from "@/data/home-social-trends";
import { canDisplayEntertainmentArtwork, entertainmentTitles, getFeaturedCast } from "@/lib/entertainment";
import { getEffectiveReleaseStatus } from "@/lib/content-freshness";
import { releaseItems } from "@/lib/entertainment-extras";
import { exploreGuides } from "@/lib/explore";
import { governmentOpportunities, privateOpportunities } from "@/lib/jobs";
import { getEffectiveJobStatus } from "@/lib/job-runtime";

export const metadata: Metadata = {
  title: "Nigerian Movies, Services, Travel & Jobs",
  description: "Discover Nigerian movies, practical service guidance, places to explore across Nigeria, and verified jobs and careers.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "MyNigeriaGuide",
    title: "Nigerian Movies, Services, Travel & Jobs",
    description: "Discover Nigerian movies, practical service guidance, places to explore across Nigeria, and verified jobs and careers.",
    url: "https://mynigeriaguide.com/",
  },
};

// Deadline-sensitive status must be evaluated on every request, not frozen at build time.
// Recruitment deadlines and trends must change at Nigerian midnight without a redeploy.
export const dynamic = "force-dynamic";

const quickServices = [
  { label: "JAMB portal guide", href: "/topics/jamb-2026" },
  { label: "NYSC portal guide", href: "/topics/nysc" },
  { label: "WAEC results", href: "/topics/waec" },
  { label: "NECO results", href: "/topics/neco" },
  { label: "NELFUND", href: "/topics/nelfund" },
  { label: "NIN services", href: "/topics/nin-corrections" },
  { label: "BVN services", href: "/topics/bvn" },
  { label: "CAC registration", href: "/topics/cac-business" },
  { label: "ECOWAS certificate", href: "/services/ecowas-travel-certificate" },
  { label: "Pension & RSA", href: "/topics/pension-services-nigeria" },
  { label: "Foreign visas", href: "/categories/foreign-visas" },
];

// Homepage previews feature distinct employers, not three programmes from
// the same recruiter. The full jobs directory still lists all verified roles.
function uniqueRecruiters<T extends { organization: string }>(items: T[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const name = item.organization.trim().replace(/\s+/g, " ").toLocaleLowerCase("en");
    if (seen.has(name)) return false;
    seen.add(name);
    return true;
  });
}

export default function HomePage() {
  const socialTrends = getCurrentHomeSocialTrends();
  const releaseByTitle = new Map(
    releaseItems.map((item) => [item.title.trim().toLowerCase(), item] as const),
  );

  // Prioritise durable Nigerian films; week-old releases remain in the separate trends feed.
  const evergreenHomepageSlugs = ["king-of-boys", "chief-daddy", "citation", "swallow", "jagun-jagun", "a-tribe-called-judah"];
  const movieHighlights = entertainmentTitles
    .filter((title) => {
      const hasUsableArtwork =
        canDisplayEntertainmentArtwork(title) ||
        Boolean(title.sourcePreview) ||
        Boolean(title.trailer) ||
        title.watchLinks.some((link) => link.platform === "YouTube" && link.access === "full-movie");

      if (!hasUsableArtwork) return false;

      const release = releaseByTitle.get(title.title.trim().toLowerCase());
      return !release || getEffectiveReleaseStatus(release) !== "upcoming";
    })
    .sort((a, b) => {
      const aPick = evergreenHomepageSlugs.indexOf(a.slug);
      const bPick = evergreenHomepageSlugs.indexOf(b.slug);
      if (aPick !== -1 || bPick !== -1) {
        if (aPick === -1) return 1;
        if (bPick === -1) return -1;
        return aPick - bPick;
      }
      return a.title.localeCompare(b.title);
    })
    .slice(0, 6);

  // A compact cross-region selection rather than the first three catalog entries.
  const travelHighlights = ["lagos", "abuja", "kano", "obudu-mountain-resort", "yankari-game-reserve", "anambra-heritage-circuit"]
    .flatMap((slug) => exploreGuides.filter((guide) => guide.slug === slug));

  const activeGovernmentOpportunities = governmentOpportunities.filter(
    (item) => ["open", "screening", "training"].includes(getEffectiveJobStatus(item)),
  );
  const openGovernmentHighlights = uniqueRecruiters(
    activeGovernmentOpportunities
      .filter((item) => getEffectiveJobStatus(item) === "open")
      .sort((a, b) => (a.deadline ?? "9999-12-31").localeCompare(b.deadline ?? "9999-12-31")),
  ).slice(0, 3);
  const featuredOrganizations = new Set(
    openGovernmentHighlights.map((item) => item.organization.trim().toLocaleLowerCase("en")),
  );
  const secondaryGovernmentHighlights = uniqueRecruiters(
    activeGovernmentOpportunities.filter(
      (item) => !featuredOrganizations.has(item.organization.trim().toLocaleLowerCase("en")),
    ),
  ).slice(0, 2);
  const activeGovernmentCount = activeGovernmentOpportunities.length;

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
              <h2 id="home-trending-title">Trending across Nigeria right now.</h2>
            </div>
            <Link href="/latest">See all latest updates →</Link>
          </div>
          <div className="home-trending-links">
            {socialTrends.map((trend) => (
              <Link href={trend.href} key={trend.href}>
                <span>{trend.pillar}</span>
                <strong>{trend.title}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="minimal-home-section minimal-home-movies" aria-labelledby="home-movies-title">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Movies</span>
              <h2 id="home-movies-title">Explore Nigerian films, beyond this week's trends.</h2>
            </div>
            <Link href="/entertainment/movies">Browse movies →</Link>
          </div>

          <form className="section-quick-search" action="/entertainment/movies#curated-movies" method="get" role="search">
            <label>
              <span>Search movies & entertainment</span>
              <input type="search" name="q" placeholder="Movie, actor, genre or language…" />
            </label>
            <button type="submit">Search movies</button>
          </form>

          <div className="minimal-movie-row">
            {movieHighlights.map((title) => (
              <article className="minimal-movie-card movie-card-clickable" key={title.slug}>
                <Link className="movie-card-hitarea" href={"/entertainment/movies/" + title.slug} aria-label={"View details for " + title.title} />
                <Link href={"/entertainment/movies/" + title.slug} aria-label={"Open " + title.title}>
                  <EntertainmentArtwork title={title} showSourceLink={false} />
                </Link>
                <div className="minimal-movie-card-copy">
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
            <ServiceSearch />
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

          <form className="section-quick-search" action="/explore#places" method="get" role="search">
            <label>
              <span>Search Tour Nigeria</span>
              <input type="search" name="q" placeholder="City, hotel, restaurant or attraction…" />
            </label>
            <button type="submit">Search places</button>
          </form>

          <div className="minimal-travel-grid">
            {travelHighlights.map((guide) => (
              <Link href={"/explore/" + guide.slug} className="minimal-travel-card" key={guide.slug}>
                <span>{guide.region}</span>
                <strong>{guide.shortTitle}</strong>
                <small>{guide.kind === "city" ? "City guide" : "Destination guide"} →</small>
              </Link>
            ))}
          </div>

          <div className="minimal-inline-links" aria-label="Tour Nigeria shortcuts">
            <Link href="/explore/events">Events & festivals</Link>
            <Link href="/explore/things-to-do-lagos">Things to do in Lagos</Link>
            <Link href="/explore/things-to-do-abuja">Things to do in Abuja</Link>
            <Link href="/explore/calabar-carnival-2026">Calabar Carnival 2026</Link>
            <Link href="/explore/detty-december-lagos-2026">Detty December Lagos</Link>
            <Link href="/explore?q=restaurant#places">Restaurants</Link>
            <Link href="/explore?q=hotel#places">Hotels & stays</Link>
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

          <form className="section-quick-search" action="/jobs#opportunities" method="get" role="search">
            <label>
              <span>Search jobs & careers</span>
              <input type="search" name="q" placeholder="Employer, role, qualification or field…" />
            </label>
            <button type="submit">Search jobs</button>
          </form>

          <div className="minimal-inline-links" aria-label="Popular recruitment and career guides">
            <Link href="/jobs/nigerian-army-92rri-2026">Army 92RRI recruitment status</Link>
            <Link href="/jobs/remote">Remote jobs in Nigeria</Link>
          </div>

          <div className="home-jobs-grid">
            <Link href="/jobs/government" className="home-job-feature">
              <div className="home-job-feature-summary">
                <span>Government tracker</span>
                <strong>{governmentOpportunities.length} verified recruitment guides</strong>
                <small>{activeGovernmentCount} opportunities are currently open or in an active later stage.</small>
              </div>

              <div className="home-job-feature-live">
                <span>{openGovernmentHighlights.length ? "Open now" : "Open opportunities"}</span>
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
              {secondaryGovernmentHighlights.map((item) => (
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


    </>
  );
}
