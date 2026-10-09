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
        <h1>Discover Nollywood movies by YouTube publisher.</h1>
        <p className="page-intro">
          Browse full-length Nigerian movies by publisher, explore familiar actors and open the original YouTube uploads.
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
                Explore full-length Nigerian movies shared by {hub.channel.name}, including recent releases and familiar actors.
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
