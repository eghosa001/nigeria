import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { approvedYouTubeSourceCapacity, verifiedYouTubeMovieChannels } from "@/lib/youtube-movie-channels";

export const metadata: Metadata = {
  title: "Approved Nollywood YouTube Sources",
  description: "Producer, filmmaker and rightsholder YouTube channels approved for the MyNigeriaGuide full-movie importer.",
  alternates: { canonical: "/entertainment/youtube/sources" },
};

export default function YouTubeSourcesPage() {
  return (
    <section className="section page-top">
      <div className="container">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Entertainment", href: "/entertainment" },
          { label: "YouTube movies", href: "/entertainment/youtube" },
          { label: "Sources" },
        ]} />
        <span className="eyebrow">Publisher allowlist</span>
        <h1>Approved YouTube movie sources.</h1>
        <p className="page-intro">
          These channels are editorially approved as producer, filmmaker or rightsholder sources. The importer still requires an exact identity match from the official YouTube Data API before it trusts a channel.
        </p>

        <div className="category-summary">
          <div><strong>{verifiedYouTubeMovieChannels.length}</strong><span>approved channels</span></div>
          <div><strong>{approvedYouTubeSourceCapacity.toLocaleString()}+</strong><span>estimated full-movie capacity</span></div>
          <div><strong>0</strong><span>general-search channels accepted automatically</span></div>
        </div>

        <div className="service-grid">
          {verifiedYouTubeMovieChannels.map((source) => (
            <article className="service-card" key={source.slug}>
              <div className="card-topline">
                <span>Approved source</span>
                <span>Checked {source.lastChecked}</span>
              </div>
              <h3>{source.name}</h3>
              <p>{source.verificationBasis}</p>
              <div className="service-meta">
                <strong>~{source.estimatedMovieCount} discovery candidates</strong>
                {source.channelUrl ? <a href={source.channelUrl} target="_blank" rel="noreferrer">Official channel →</a> : <span>API identity pending</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
