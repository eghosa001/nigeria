import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { indexableYouTubeChannelHubs } from "@/lib/youtube-channel-hubs";

export const metadata: Metadata = {
  title: "Nollywood YouTube Movie Channels",
  description: "Browse Nigerian movie publishers on YouTube with substantial full-length catalogs, verified source links and direct movie guides.",
  alternates: { canonical: "/entertainment/youtube/channels" },
};

export default function YouTubeChannelsPage() {
  const totalMovies = indexableYouTubeChannelHubs.reduce((sum, hub) => sum + hub.movieCount, 0);

  return (
    <section className="section page-top">
      <div className="container">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Entertainment", href: "/entertainment" },
          { label: "YouTube movies", href: "/entertainment/youtube" },
          { label: "Publishers" },
        ]} />

        <span className="eyebrow">YouTube publishers</span>
        <h1>Nollywood movie channels with substantial full-film catalogs.</h1>
        <p className="page-intro">
          These publisher pages are created only when MyNigeriaGuide has at least 10 complete full-length movie records from the approved channel.
          Together they connect {totalMovies.toLocaleString()} movie-to-publisher relationships.
        </p>

        <div className="service-grid top-gap">
          {indexableYouTubeChannelHubs.map((hub) => (
            <article className="service-card" key={hub.channel.slug}>
              <div className="card-topline">
                <span>{hub.movieCount} full movies</span>
                <span>Checked {hub.latestChecked}</span>
              </div>
              <h2>
                <Link href={"/entertainment/youtube/channels/" + hub.channel.slug}>{hub.channel.name}</Link>
              </h2>
              <p>
                Browse verified full-length Nigerian movie records from {hub.channel.name}, including recent releases and recurring cast.
              </p>
              <div className="service-meta">
                <strong>{hub.years.slice(0, 4).join(" · ")}</strong>
                <Link href={"/entertainment/youtube/channels/" + hub.channel.slug}>Open publisher →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
