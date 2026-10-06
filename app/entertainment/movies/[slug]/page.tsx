import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AnswerFirst } from "@/components/answer-first";
import { EntertainmentArtwork } from "@/components/entertainment-artwork";
import { JsonLd } from "@/components/json-ld";
import { LazyYouTubePlayer } from "@/components/lazy-youtube-player";
import { AdSlot } from "@/components/ad-slot";
import { AD_SLOTS } from "@/lib/adsense-config";
import { canDisplayEntertainmentArtwork, entertainmentTitles, getEntertainmentTitle, getFeaturedCast, type EntertainmentTitle, type WatchLink } from "@/lib/entertainment";
import { entertainmentPeople, getPlatformGuide } from "@/lib/entertainment-extras";
import { getYouTubeMovieById, getYouTubeVideoId } from "@/lib/youtube-library";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return entertainmentTitles.map((title) => ({ slug: title.slug }));
}

function videoIdFromUrl(href: string) {
  try {
    const url = new URL(href);
    if (url.hostname === "youtu.be") return url.pathname.slice(1);
    if (url.hostname.endsWith("youtube.com")) return url.searchParams.get("v");
  } catch {}
  return null;
}

const movieSeoOverrides: Record<string, { title: string; description?: string }> = {
  "holy-matrimony": {
    title: "Holy Matrimony Nigerian Movie: Cast & Full Movie",
    description: "Holy Matrimony cast, 143-minute runtime and official Frederick Leonard TV full movie, starring Frederick Leonard, Onyi Alex and Nini Mbonu.",
  },
  "one-more-night": {
    title: "One More Night Nigerian Movie: Cast & Full Movie",
    description: "One More Night cast, 129-minute runtime and official Frederick Leonard TV full movie, starring Frederick Leonard and Cynthia Clarke.",
  },
  "once-upon-a-village-3": {
    title: "Once Upon a Village 3 Cast & Full Movie",
    description: "Once Upon a Village 3 cast, 99-minute runtime and official RuthKadiri247 full movie, featuring Deza the Great, Prisma James and Fessa Ajoku.",
  },
  "one-string-attached": {
    title: "One String Attached Cast & Full Movie",
    description: "One String Attached cast, 131-minute runtime and official Uchenna Mbunabo TV full movie, starring Uche Montana, Chike Daniels and Caroline Igbe.",
  },
  "our-perfect-match": {
    title: "Our Perfect Match Nigerian Movie: Cast & Full Movie",
    description: "Our Perfect Match cast, story, 120-minute runtime and official Blessing Obasi TV full movie, starring Stan Nze and Sona Uche.",
  },
  "black-market-2026": { title: "Black Market 2026 Cast, Runtime & Where to Watch", description: "Black Market 2026 cast, director, 100-minute runtime, story and current Nigerian cinema availability for Fatimah Binta Gimsay's crime drama." },
  "east-west-love-2026": { title: "East West Love 2026 Cast & Cinema Release", description: "East West Love cast, story, director and current 9 October 2026 release information for the Nigeria-Kenya romantic comedy." },
  "onibon-oje-2026": { title: "Onibọn Oje 2026 Cast & Cinema Release", description: "Onibọn Oje cast, directors, story and official 23 October 2026 Nigerian cinema release information for the Yoruba epic." },
  "wire-transfer-2026": { title: "Wire Transfer 2026 Cast & Cinema Release", description: "Wire Transfer cast, story, director and current 30 October 2026 Nigerian cinema release information for the crime thriller." },
  "mko-documentary-2026": { title: "MKO Documentary 2026: Cinema Release & Story", description: "MKO documentary story, director, 108-minute runtime and current Nigerian cinema release information for Ose Oyamendan's film." },
  "no-fury-2024": { title: "No Fury Cast, Story & Movie Details", description: "No Fury cast, story and director details for Akay Mason's 2024 Nigerian drama, romance and thriller starring Nse Ikpe-Etim and Jim Iyke." },
  "agbara-nla-the-return": {
    title: "Agbara Nla: The Return Cast, Cinema Release & Where to Watch",
    description: "Agbara Nla: The Return cast, story, runtime, directors and current Nigerian cinema availability for the 2026 Mount Zion film."
  },
  "first-lady-2026": {
    title: "First Lady 2026: Cast, Story & Cinema Release",
    description: "First Lady 2026 cast, story, director and official October cinema-release information for the Nigerian political drama."
  },
  "phoenix-fury-2026": {
    title: "Phoenix Fury 2026: Cast, Story & Cinema Release",
    description: "Phoenix Fury cast, story, director and current Nigeria/Ghana cinema-release information for Ifeoma Nkiruka Chukwuogo's revenge drama."
  },
  "a-land-apart-2026": {
    title: "A Land Apart 2026: Cast, Story & Cinema Release",
    description: "A Land Apart cast, story, runtime and current cinema-release information for Pever Bem's Nigerian alternate-history drama."
  },
  "tele-x-zikora-2026": {
    title: "Tele x Zikora 2026: Cast, Story & Cinema Release",
    description: "Tele x Zikora cast, story, director and current cinema-release information for the Nigerian university-set coming-of-age drama."
  },
  "pushing-30-2026": {
    title: "Pushing 30 2026: Story & Where to Watch",
    description: "Pushing 30 story and current Africa Magic Showcase premiere information for the Nigerian friendship and adulthood dramedy."
  },
  "millionaire-until-morning": {
    title: "Millionaire Until Morning Cast & Full Movie",
    description: "Millionaire Until Morning cast, story, runtime and the official Omoni Oboli TV full-movie link. Starring Chris Attoh, Sophia Chisom and Chimsom Chuka.",
  },
  "the-man-i-never-knew": {
    title: "The Man I Never Knew: Cast & Full Movie on YouTube",
    description: "The Man I Never Knew cast, story and the official Royal Arts TV full-movie link. Starring TooSweet Annan, Chisom Agoawuike and Mojoyin Fadaka.",
  },
  "pieces-that-fit": {
    title: "Pieces That Fit: Cast & Full Movie on YouTube",
    description: "Pieces That Fit cast, story and the official Omoni Oboli TV full-movie link, with Micheal Dappa, Ekama Etim-Inyang, Ehis Perfect and Floyd Igbo.",
  },
  "oversabi-aunty": {
    title: "Oversabi Aunty Nigerian Movie: Cast & Where to Watch",
    description: "Oversabi Aunty Nigerian movie cast, story, 127-minute runtime and official Netflix Nigeria availability. Starring Toyin Abraham, Mike Ezuruonye and Enioluwa Adeoluwa.",
  },
  "bowale": {
    title: "Bowale Nigerian Movie: Cast & Full Movie",
    description: "Bowale cast, story, 121-minute runtime and the official BIODUNSTEPHEN TV full-movie link. Starring BamBam Olawumi, Bobby Ekpe and Jude Chukwuka.",
  },
  "sister-agatha": {
    title: "Sister Agatha Nigerian Movie: Cast & Full Movie",
    description: "Sister Agatha cast, story, 108-minute runtime and the official full-movie link. Starring Blessing Obasi, Kiekie, Michael Ejoor and Kenzy Udosen.",
  },
  "my-housemate": {
    title: "My Housemate Nigerian Movie: Cast & Full Movie",
    description: "My Housemate cast, story, 81-minute runtime and the official Bolaji Ogunmola TV full-movie link, starring Bolaji Ogunmola and Nosa Rex.",
  },
  "all-things-equal": {
    title: "All Things Equal Nigerian Movie: Cast & Full Movie",
    description: "All Things Equal cast, story, 95-minute runtime and the official Sarian Martin TV full-movie link, starring Sarian Martin and Daniel Etim Effiong.",
  },
  "gingerrr": {
    title: "Gingerrr Cast & Where to Watch on Netflix",
    description: "Gingerrr cast, story and official Netflix link. Starring Bukunmi Adeaga-Ilori, Bisola Aiyeola, Wumi Toriola, Bolaji Ogunmola and Odunlade Adekola.",
  },
  "forever-found": {
    title: "Forever Found Nigerian Movie: Cast & Full Movie",
    description: "Forever Found cast, story, 108-minute runtime and official full-movie link, with Chinenye Nnebe, John Ekanem, Chioma Nwosu and Amaka Ndukwe.",
  },
  "the-bride-switch": {
    title: "The Bride Switch Cast & Full Movie on YouTube",
    description: "The Bride Switch cast, story, 159-minute runtime and official Omoni Oboli TV full movie. Starring Toluwani George, Eddie Watson and Thelma Chukwunwem.",
  },
  "love-always-wins-2026": {
    title: "Love Always Wins Cast & Full Movie on YouTube",
    description: "Love Always Wins cast, story and official Uduak Isong TV full movie, starring Omeche Oko, Bryan Okoye and Jeffery Nortey.",
  },
  "what-tomorrow-holds-2026": {
    title: "What Tomorrow Holds Cast & Full Movie on YouTube",
    description: "What Tomorrow Holds cast, story, 107-minute runtime and official Sandra Okunzuwa TV full movie, with Chioma Nwosu, Sandra Okunzuwa and Kalu Ikeagwu.",
  },
  "in-every-lifetime": {
    title: "In Every Lifetime Cast & Full Movie on YouTube",
    description: "In Every Lifetime cast, story, 95-minute runtime and official Ego Nwosu TV full movie, starring Daniel Etim Effiong, Ego Nwosu and Shaznay Okawa.",
  },
  "beauty-in-scars-2026": {
    title: "Beauty In Scars Cast & Full Movie on YouTube",
    description: "Beauty In Scars cast, story, 142-minute runtime and official Uchenna Mbunabo TV full movie, starring Naya Pratt, Emeka Ike and Ochanya John-Enenche.",
  },
};

function movieImageUrl(title: EntertainmentTitle, base: string) {
  if (canDisplayEntertainmentArtwork(title) && title.artwork) return title.artwork.url;
  if (title.sourcePreview?.url) return title.sourcePreview.url;

  const fullMovie = title.watchLinks.find((link) => link.platform === "YouTube" && link.access === "full-movie");
  const source = title.trailer ?? fullMovie;
  const videoId = source ? videoIdFromUrl(source.href) : null;
  if (videoId) return "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg";

  return base + "/entertainment/poster/" + encodeURIComponent(title.slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = getEntertainmentTitle(slug);
  if (!title) return {};
  const base = getSiteUrl();
  const image = movieImageUrl(title, base);
  const featuredCast = getFeaturedCast(title).slice(0, 4);
  const override = movieSeoOverrides[title.slug];
  const description = override?.description ?? `${title.title} is a ${title.year} Nigerian movie. ${featuredCast.length ? "Cast includes " + featuredCast.join(", ") + ". " : ""}${title.synopsis}`;

  return {
    title: override?.title ?? title.title + " Nigerian Movie: Cast & Where to Watch",
    description,
    alternates: { canonical: "/entertainment/movies/" + title.slug },
    openGraph: {
      type: "video.movie",
      title: title.title,
      description,
      url: "/entertainment/movies/" + title.slug,
      images: image ? [{ url: image, alt: title.title + " artwork" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: title.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

function personHref(name: string) {
  const person = entertainmentPeople.find((item) => item.name === name);
  return person ? "/entertainment/people/" + person.slug : null;
}

function accessLabel(access: string) {
  if (access === "full-movie") return "Free full movie";
  if (access === "subscription") return "Subscription";
  if (access === "rent-or-buy") return "Rent or buy";
  if (access === "subscription-or-rent") return "Subscription or rental";
  if (access === "cinema") return "Cinema ticket / showtime";
  if (access === "broadcast") return "TV / broadcaster";
  return "Official platform";
}

export default async function MovieDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = getEntertainmentTitle(slug);
  if (!title) notFound();

  const availabilityLinks: WatchLink[] = [];
  const seenAvailability = new Set<string>();
  for (const link of title.watchLinks) {
    if (link.platform !== "YouTube") {
      if (!seenAvailability.has(link.href)) {
        availabilityLinks.push(link);
        seenAvailability.add(link.href);
      }
      continue;
    }

    const videoId = getYouTubeVideoId(link.href);
    const libraryMovie = videoId ? getYouTubeMovieById(videoId) : undefined;
    const primary = libraryMovie ? {
      ...link,
      publisher: link.publisher ?? libraryMovie.channelName,
      publisherUrl: link.publisherUrl ?? libraryMovie.channelUrl,
    } : link;
    if (!seenAvailability.has(primary.href)) {
      availabilityLinks.push(primary);
      seenAvailability.add(primary.href);
    }
    for (const source of libraryMovie?.alternateSources ?? []) {
      if (seenAvailability.has(source.videoUrl)) continue;
      availabilityLinks.push({
        platform: "YouTube",
        label: "Watch on " + source.channelName,
        href: source.videoUrl,
        access: "full-movie",
        lastChecked: source.lastChecked,
        note: "Alternate approved full-movie upload from " + source.channelName + ".",
        publisher: source.channelName,
        publisherUrl: source.channelUrl,
      });
      seenAvailability.add(source.videoUrl);
    }
  }

  const base = getSiteUrl();
  const pageUrl = base + "/entertainment/movies/" + title.slug;
  const allCheckedDates = [
    ...availabilityLinks.map((link) => link.lastChecked),
    ...(title.trailer ? [title.trailer.lastChecked] : []),
    ...(title.references ?? []).map((link) => link.lastChecked),
  ];
  const lastChecked = allCheckedDates.reduce((latest, value) => value > latest ? value : latest, "");
  const platforms = [...new Set(availabilityLinks.map((link) => link.platform))];
  const watchHereSource = availabilityLinks.find((link) => link.platform === "YouTube" && link.access === "full-movie");
  const watchHereVideoId = watchHereSource ? getYouTubeVideoId(watchHereSource.href) : null;
  const featuredCast = getFeaturedCast(title);
  const image = movieImageUrl(title, base);
  const movieQuestions = [
    {
      question: "Who is in the " + title.title + " cast?",
      answer: title.cast.length
        ? title.title + " features " + title.cast.slice(0, 6).join(", ") + (title.cast.length > 6 ? " and other cast members listed below." : ".")
        : "The verified cast list is still being expanded.",
    },
    {
      question: "Where can I watch " + title.title + "?",
      answer: platforms.length
        ? "As checked on " + (lastChecked || "the latest source review") + ", " + title.title + " is linked to " + platforms.join(" and ") + " through the verified official availability section on this page."
        : "As of " + (lastChecked || "the latest source review") + ", no current official streaming, broadcast or cinema availability has been verified for " + title.title + ".",
    },
    ...(title.runtimeMinutes ? [{
      question: "How long is " + title.title + "?",
      answer: title.title + " has a verified runtime of " + title.runtimeMinutes + " minutes.",
    }] : []),
  ];

  const movieLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: title.title,
    description: title.synopsis,
    url: pageUrl,
    genre: title.genres,
    inLanguage: title.languages,
    actor: title.cast.map((name) => ({ "@type": "Person", name })),
    director: title.directors?.map((name) => ({ "@type": "Person", name })),
    image: image || undefined,
    countryOfOrigin: { "@type": "Country", name: "Nigeria" },
    dateModified: lastChecked || undefined,
    sameAs: [
      ...availabilityLinks.map((link) => link.href),
      ...(title.references ?? []).map((link) => link.href),
    ],
    duration: title.runtimeMinutes ? "PT" + title.runtimeMinutes + "M" : undefined,
    potentialAction: availabilityLinks.length
      ? availabilityLinks.map((link) => ({ "@type": "WatchAction", target: link.href }))
      : undefined,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: movieQuestions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Entertainment", item: base + "/entertainment" },
      { "@type": "ListItem", position: 3, name: "Movies", item: base + "/entertainment/movies" },
      { "@type": "ListItem", position: 4, name: title.title, item: pageUrl },
    ],
  };

  const related = entertainmentTitles
    .filter((item) => item.slug !== title.slug && item.genres.some((genre) => title.genres.includes(genre)))
    .slice(0, 4);

  return (
    <>
      <JsonLd data={[movieLd, breadcrumbLd, faqLd]} />

      <section className="movie-detail-hero">
        <div className="container">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Entertainment", href: "/entertainment" },
            { label: "Movies", href: "/entertainment/movies" },
            { label: title.title },
          ]} />

          <div className="movie-detail-hero-grid">
            <div className="movie-detail-artwork">
              <EntertainmentArtwork title={title} variant="hero" showSourceLink />
            </div>

            <div className="movie-detail-copy">
              <span className="eyebrow">{title.year} Nigerian movie</span>
              <h1>{title.title}</h1>
              <div className="movie-detail-factline">
                <span>Nigeria</span>
                <span>{title.year}</span>
                {title.runtimeMinutes ? <span>{title.runtimeMinutes} min</span> : null}
                <span>{title.languages.join(" / ")}</span>
                <span>{platforms.length ? platforms.join(" / ") : "Availability not currently verified"}</span>
              </div>
              <p className="movie-detail-synopsis">{title.synopsis}</p>
              <p className="movie-hero-cast"><strong>Featuring:</strong> {featuredCast.join(" · ")}</p>

              <div className="movie-detail-genres">
                {title.genres.map((genre) => <span key={genre}>{genre}</span>)}
              </div>

              <div className="movie-detail-actions">
                {watchHereVideoId ? <a className="button" href="#watch-here">Watch here</a> : null}
                {availabilityLinks.slice(0, 3).map((link) => (
                  <a className="button" href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                    {link.label} ↗
                  </a>
                ))}
                {title.trailer ? (
                  <a className="button button-secondary" href={title.trailer.href} target="_blank" rel="noreferrer">
                    Official trailer ↗
                  </a>
                ) : null}
              </div>
              <small className="movie-freshness-note">Sources checked {lastChecked || "not yet recorded"}.</small>
            </div>
          </div>

          <AnswerFirst
            eyebrow="Quick answer"
            title={"Quick facts about " + title.title}
            summary={title.synopsis}
            facts={[
              { label: "Country / year", value: "Nigeria · " + title.year },
              { label: "Where to watch", value: platforms.length ? platforms.join(" / ") : "No current official platform listed" },
              { label: "Featured cast", value: featuredCast.slice(0, 3).join(", ") || "See the full cast below" },
              { label: "Availability checked", value: lastChecked || "See current source links" },
            ]}
            links={[
              { href: "#cast", label: "See cast" },
              { href: "#watch", label: "Where to watch" },
              ...(watchHereVideoId ? [{ href: "#watch-here", label: "Watch here", primary: true }] : []),
              ...(!watchHereVideoId && availabilityLinks[0] ? [{ href: availabilityLinks[0].href, label: availabilityLinks[0].label, external: true, primary: true }] : []),
            ]}
            note="The essentials are above. The sections below add the full cast, verified source details and related movies."
          />
        </div>
      </section>

      <nav className="movie-detail-subnav" aria-label="Movie page sections">
        <div className="container">
          <a href="#overview">Overview</a>
          <a href="#cast">Cast & crew</a>
          <a href="#watch">Where to watch</a>
          {title.trailer ? <a href="#trailer">Trailer</a> : null}
          <a href="#related">Related movies</a>
        </div>
      </nav>

      <section className="section movie-detail-main" id="overview">
        <div className="container movie-detail-layout">
          <article className="movie-detail-primary">
            <section className="movie-overview-section">
              <span className="eyebrow">About the movie</span>
              <h2>{title.title}: story and quick details</h2>
              <p className="movie-long-summary">{title.synopsis}</p>
</section>

            <section>
              <span className="eyebrow">At a glance</span>
              <div className="movie-fact-grid">
                <article><span>Country</span><strong>Nigeria</strong></article>
                <article><span>Release year</span><strong>{title.year}</strong></article>
                <article><span>Format</span><strong>Feature film</strong></article>
                {title.runtimeMinutes ? <article><span>Runtime</span><strong>{title.runtimeMinutes} minutes</strong></article> : null}
                <article><span>Languages</span><strong>{title.languages.join(", ")}</strong></article>
                <article><span>Genres</span><strong>{title.genres.join(", ")}</strong></article>
                <article><span>Official platforms</span><strong>{platforms.length ? platforms.join(", ") : "No current official viewing platform verified"}</strong></article>
                <article><span>Availability / sources checked</span><strong>{lastChecked || "Not recorded"}</strong></article>
              </div>
            </section>

            <section>
              <span className="eyebrow">Popular questions</span>
              <h2>Quick answers about {title.title}</h2>
              <div className="search-answer-grid">
                {movieQuestions.map((item) => (
                  <article key={item.question}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="cast">
              <span className="eyebrow">Cast & crew</span>
              <h2>{title.title} cast and crew</h2>

              {title.directors?.length ? (
                <div className="movie-credit-group">
                  <h3>Director{title.directors.length > 1 ? "s" : ""}</h3>
                  <div className="movie-person-list">
                    {title.directors.map((name) => {
                      const href = personHref(name);
                      return href ? <Link href={href} key={name}>{name}<span>View profile →</span></Link> : <span key={name}>{name}</span>;
                    })}
                  </div>
                </div>
              ) : null}

              <div className="movie-credit-group">
                <h3>Full cast</h3>
                <div className="movie-person-list">
                  {title.cast.map((name) => {
                    const href = personHref(name);
                    return href ? <Link href={href} key={name}>{name}<span>View profile →</span></Link> : <span key={name}>{name}</span>;
                  })}
                </div>
              </div>
            </section>

            <AdSlot slot={AD_SLOTS.movieAfterCast} label="Advertisement" />

            <section id="watch">
              <span className="eyebrow">Official availability</span>
              <h2>Where to watch {title.title}</h2>
              {!availabilityLinks.length ? (
                <p className="movie-long-summary">
                  No current official streaming, broadcast or cinema link is verified for this title. The references below verify the movie record without implying that it is available to watch there.
                </p>
              ) : null}
              {watchHereVideoId && watchHereSource ? (
                <div id="watch-here" className="movie-watch-here">
                  <LazyYouTubePlayer
                    videoId={watchHereVideoId}
                    title={title.title}
                    sourceUrl={watchHereSource.href}
                    publisher={watchHereSource.publisher}
                  />
                </div>
              ) : null}
              <div className="movie-watch-options">
                {availabilityLinks.map((link) => {
                  const platformGuide = getPlatformGuide(link.platform);
                  return (
                    <article key={link.href}>
                      <div>
                        <span>{link.platform}</span>
                        <strong>{link.label}</strong>
                      </div>
                      <dl>
                        <div><dt>Access</dt><dd>{accessLabel(link.access)}</dd></div>
                        {link.publisher ? <div><dt>Publisher</dt><dd>{link.publisherUrl ? <a href={link.publisherUrl} target="_blank" rel="noreferrer">{link.publisher} ↗</a> : link.publisher}</dd></div> : null}
                        {platformGuide?.offlineLabel ? <div><dt>Offline</dt><dd>{platformGuide.offlineHelpUrl ? <a href={platformGuide.offlineHelpUrl} target="_blank" rel="noreferrer">{platformGuide.offlineLabel} ↗</a> : platformGuide.offlineLabel}</dd></div> : null}
                        <div><dt>Checked</dt><dd>{link.lastChecked}</dd></div>
                      </dl>
                      <a className="button" href={link.href} target="_blank" rel="noreferrer">Open official source ↗</a>
                    </article>
                  );
                })}
              </div>
              {(title.references ?? []).length ? (
                <div className="movie-reference-sources">
                  <h3>Verification sources for {title.title}</h3>
                  {(title.references ?? []).map((reference) => (
                    <article key={reference.href}>
                      <div>
                        <span>Reference</span>
                        <strong>{reference.label}</strong>
                      </div>
                      {reference.note ? <p>{reference.note}</p> : null}
                      <small>Checked {reference.lastChecked}</small>
                      <a className="button button-secondary" href={reference.href} target="_blank" rel="noreferrer">Open verification source ↗</a>
                    </article>
                  ))}
                </div>
              ) : null}
            </section>

            <AdSlot slot={AD_SLOTS.movieAfterWatch} label="Advertisement" />

            {title.trailer ? (
              <section id="trailer">
                <span className="eyebrow">Preview</span>
                <h2>Official trailer for {title.title}</h2>
                <div className="movie-trailer-card">
                  <div>
                    <strong>{title.trailer.label}</strong>
                    <span>
                      {title.trailer.publisherUrl ? (
                        <a href={title.trailer.publisherUrl} target="_blank" rel="noreferrer">{title.trailer.publisher} ↗</a>
                      ) : title.trailer.publisher ?? "YouTube"}
                      {" · checked " + title.trailer.lastChecked}
                    </span>
                  </div>
                  <a className="button button-secondary" href={title.trailer.href} target="_blank" rel="noreferrer">Watch trailer ↗</a>
                </div>
              </section>
            ) : null}

</article>

          <aside className="movie-detail-sidebar">
            <div className="sidebar-card movie-sidebar-card">
              <span>Quick facts</span>
              <strong>{title.title}</strong>
              <dl>
                <div><dt>Country</dt><dd>Nigeria</dd></div>
                <div><dt>Year</dt><dd>{title.year}</dd></div>
                <div><dt>Language</dt><dd>{title.languages.join(", ")}</dd></div>
                {title.runtimeMinutes ? <div><dt>Runtime</dt><dd>{title.runtimeMinutes} min</dd></div> : null}
                <div><dt>Genre</dt><dd>{title.genres.slice(0, 3).join(", ")}</dd></div>
              </dl>
            </div>
            <div className="sidebar-card">
              <span>Keep exploring</span>
              <div className="related-links">
                <Link href="/entertainment/movies">All movies →</Link>
                <Link href="/entertainment/youtube">Free YouTube movies →</Link>
                <Link href="/entertainment/releases">New & upcoming →</Link>
                <Link href="/entertainment/cinemas">Cinemas →</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section movie-related-section" id="related">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">More like this</span>
              <h2>Related Nigerian movies.</h2>
            </div>
            <Link href="/entertainment/movies">Browse the full catalog →</Link>
          </div>

          <div className="movie-grid movie-related-grid">
            {related.map((item) => (
              <article className="movie-tile movie-card-clickable" key={item.slug}>
                <Link className="movie-card-hitarea" href={"/entertainment/movies/" + item.slug} aria-label={"View details for " + item.title} />
                <EntertainmentArtwork title={item} />
                <div className="movie-tile-meta"><span>{item.year}</span><span>{item.languages.slice(0, 1).join("")}</span></div>
                <h3><Link href={"/entertainment/movies/" + item.slug}>{item.title}</Link></h3>
                <p className="movie-tile-description">{item.synopsis}</p>
                <p className="movie-card-cast"><strong>Featuring:</strong> {getFeaturedCast(item).join(" · ")}</p>
                <div className="movie-tile-footer"><span>{item.genres.slice(0, 2).join(" · ")}</span><Link href={"/entertainment/movies/" + item.slug}>Details →</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
