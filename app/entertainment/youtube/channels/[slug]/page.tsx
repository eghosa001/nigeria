import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { YouTubeMovieCard } from "@/components/youtube-movie-card";
import {
  getYouTubeChannelHub,
  indexableYouTubeChannelHubs,
} from "@/lib/youtube-channel-hubs";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return indexableYouTubeChannelHubs.map((hub) => ({ slug: hub.channel.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hub = getYouTubeChannelHub(slug);
  if (!hub) return {};

  return {
    title: hub.channel.name + " Movies on YouTube — Full Nigerian Movies",
    description:
      "Browse " + hub.movieCount + " full Nigerian movie guides from " + hub.channel.name +
      ", with cast, runtime, release year and verified YouTube source links.",
    alternates: { canonical: "/entertainment/youtube/channels/" + hub.channel.slug },
  };
}

export default async function YouTubeChannelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hub = getYouTubeChannelHub(slug);
  if (!hub) notFound();

  const recent = hub.movies.slice(0, 48);
  const base = getSiteUrl();
  const pageUrl = base + "/entertainment/youtube/channels/" + hub.channel.slug;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.channel.name + " full Nigerian movies",
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: hub.movieCount,
      itemListElement: recent.map((movie, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: movie.title,
        url: base + movie.internalHref,
      })),
    },
  };

  return (
    <section className="section page-top">
      <div className="container">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Entertainment", href: "/entertainment" },
          { label: "YouTube movies", href: "/entertainment/youtube" },
          { label: "Publishers", href: "/entertainment/youtube/channels" },
          { label: hub.channel.name },
        ]} />

        <span className="eyebrow">Approved YouTube publisher</span>
        <h1>{hub.channel.name} movies on YouTube.</h1>
        <p className="page-intro">
          MyNigeriaGuide currently links {hub.movieCount} complete full-length movie records from {hub.channel.name}.
          Open a movie guide first for cast, runtime and source details, then continue to the official YouTube upload.
        </p>

        <div className="quick-facts top-gap">
          <div><span>Full movie guides</span><strong>{hub.movieCount}</strong></div>
          <div><span>Latest year covered</span><strong>{hub.years[0] ?? "—"}</strong></div>
          <div><span>Source checked</span><strong>{hub.latestChecked}</strong></div>
          <div><span>Publisher status</span><strong>{hub.channel.channelId ? "YouTube API resolved" : "Approved source"}</strong></div>
        </div>

        {hub.recurringCast.length ? (
          <div className="info-box top-gap">
            <h2>Recurring cast in this catalog</h2>
            <p>{hub.recurringCast.map((item) => item.name + " (" + item.count + ")").join(" · ")}</p>
          </div>
        ) : null}

        <div className="section-heading top-gap">
          <div>
            <span className="eyebrow">Recent full movies</span>
            <h2>Latest indexed titles from {hub.channel.name}.</h2>
          </div>
          {hub.channel.channelUrl ? (
            <a href={hub.channel.channelUrl} target="_blank" rel="noreferrer">Official YouTube channel ↗</a>
          ) : null}
        </div>

        <div className="youtube-movie-grid">
          {recent.map((movie, index) => (
            <YouTubeMovieCard movie={movie} priority={index < 5} key={movie.videoId} />
          ))}
        </div>

        {hub.movieCount > recent.length ? (
          <div className="info-box top-gap">
            <p>
              This page highlights the latest {recent.length} films. The full {hub.movieCount}-movie set remains discoverable through the main
              YouTube catalog and its server-rendered pagination.
            </p>
            <Link className="text-link" href={{ pathname: "/entertainment/youtube", query: { channel: hub.channel.name } }}>
              Filter all {hub.channel.name} movies →
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
