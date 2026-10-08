import type { Metadata } from "next";
import Link from "next/link";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site";

const reviewedAt = "2026-10-08";
const firstNight = "2026-10-05";
const lastNight = "2026-10-30";
const youtube = "https://www.youtube.com/@NathanielBasseyMain";
const instagram = "https://www.instagram.com/nathanielblow/";
const organiser = "https://www.instagram.com/hallelujahchallengelive/";

export const metadata: Metadata = {
  title: "Hallelujah Challenge October 2026: Time, Dates & Official Livestream",
  description:
    "The October 2026 Hallelujah Challenge runs 5–30 October at 11:59pm WAT. Find Nathaniel Bassey's official YouTube and Instagram livestream links and replay guidance.",
  alternates: { canonical: "/entertainment/hallelujah-challenge-october-2026" },
};

export const revalidate = 3600;

export default function HallelujahChallengeOctober2026Page() {
  const today = new Date().toISOString().slice(0, 10);
  const isOver = today > lastNight;
  const isUpcoming = today < firstNight;
  const eventStatus = isOver ? "The October edition has ended; check official replays"
    : isUpcoming ? "The October edition starts on 5 October"
    : "October edition is under way";
  const base = getSiteUrl();
  const url = base + "/entertainment/hallelujah-challenge-october-2026";

  // The sessions are nightly livestreams, not a continuous 26-day physical event.
  // Use truthful WebPage metadata instead of a misleading physical Event/location schema.
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Hallelujah Challenge October 2026 — dates, time and official livestream",
    description: metadata.description,
    url,
    dateModified: reviewedAt,
    isPartOf: { "@type": "WebSite", name: "MyNigeriaGuide", url: base },
    about: { "@type": "Event", name: "Hallelujah Challenge October 2026" },
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="section page-top">
        <div className="container">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Entertainment", href: "/entertainment" },
            { label: "Hallelujah Challenge October 2026" },
          ]} />
          <span className="eyebrow">Trending in Nigeria · online event</span>
          <h1>Hallelujah Challenge October 2026: dates, time and where to watch</h1>
          <p className="page-intro">
            Nathaniel Bassey's October Hallelujah Challenge runs nightly from 5 to 30 October 2026.
            The published start time is <strong>11:59 PM West Africa Time (WAT)</strong>, with
            official livestreams on YouTube, Instagram and other organiser-listed channels.
          </p>
          <AnswerFirst
            title={isOver ? "Where can you watch the October 2026 replays?" : "How do you join tonight?"}
            summary={isOver
              ? "The scheduled October 2026 livestream period has ended. Use Nathaniel Bassey's official channel to look for saved sessions and later announcements."
              : "Join through Nathaniel Bassey's official YouTube or Instagram account at 11:59 PM WAT. Open the live tab or current post rather than a third-party stream."}
            facts={[
              { label: "Dates", value: "5–30 October 2026" },
              { label: "Start time", value: "11:59 PM WAT each night (UTC+1)" },
              { label: "Format", value: "Online livestream; no physical venue" },
              { label: "Current status", value: eventStatus },
            ]}
            links={[
              { href: youtube, label: "Official YouTube", primary: true, external: true },
              { href: "#official-channels", label: "Watch options" },
              { href: "#questions", label: "Quick answers" },
            ]}
            note={"Programme checked " + reviewedAt + ". Check the organiser's latest posts for any same-day changes."}
          />
        </div>
      </section>

      <section className="section">
        <div className="container job-detail-layout">
          <article className="job-detail-content">
            <section id="official-channels">
              <span className="eyebrow">Where to watch</span>
              <h2>Use the official broadcast channels</h2>
              <p>These are the named organiser channels for this edition. A scheduled livestream may appear only close to the nightly start time.</p>
              <ul>
                <li><a href={youtube} target="_blank" rel="noreferrer">YouTube — Nathaniel Bassey Main (official channel) ↗</a></li>
                <li><a href={instagram} target="_blank" rel="noreferrer">Instagram — @nathanielblow ↗</a></li>
                <li><a href={organiser} target="_blank" rel="noreferrer">Instagram — Hallelujah Challenge announcements ↗</a></li>
              </ul>
              <p>Organiser posts also mention Facebook (Nathaniel Bassey Official) and Mixlr (nathanielblow). Follow links from the organiser's current profile instead of unverified copies.</p>
            </section>

            <section id="questions">
              <h2>Quick answers before you join</h2>
              <h3>What time is the Hallelujah Challenge in Nigeria?</h3>
              <p>11:59 PM WAT (UTC+1) nightly during the announced October 5–30 window. If you live outside Nigeria, convert from WAT rather than assuming your local clock is the same.</p>
              <h3>Is it in Lagos or Abuja?</h3>
              <p>This edition is advertised as a virtual gathering. You can watch from any location with access to the official stream; this guide does not imply a public in-person venue.</p>
              <h3>How do I watch a night I missed?</h3>
              <p>Check the official YouTube channel's live and video sections. Replay availability is controlled by the organiser, so not every session is guaranteed to remain online.</p>
              <h3>Do I need to register or pay for a ticket?</h3>
              <p>The organiser's published joining instructions point viewers to its social livestream channels, not a paid MyNigeriaGuide ticket. Beware of unsolicited payment links and accounts claiming to offer special access.</p>
            </section>

            <section>
              <h2>Verification and freshness</h2>
              <p>The organiser's October 2026 announcement specifies 5–30 October, 11:59 PM WAT, and its official broadcast accounts. The #HallelujahChallenge hashtag also appeared in Nigeria's publicly visible X trend history on 8 October. Trending rank can change quickly and does not imply endorsement by MyNigeriaGuide.</p>
              <ul>
                <li><a href={organiser} target="_blank" rel="noreferrer">Hallelujah Challenge organiser account ↗</a></li>
                <li><a href={youtube} target="_blank" rel="noreferrer">Nathaniel Bassey Main — official livestreams and replays ↗</a></li>
                <li><a href="https://trends24.in/nigeria/" target="_blank" rel="noreferrer">Nigeria X trend history — 8 October 2026 ↗</a></li>
              </ul>
              <p className="job-muted">Information reviewed: 8 October 2026. Follow the official channels for programme changes and later editions.</p>
            </section>
          </article>
          <aside className="job-detail-sidebar">
            <div className="job-sidebar-card">
              <strong>Explore more Nigerian entertainment</strong>
              <p><Link href="/entertainment">Movies & entertainment hub →</Link></p>
              <p><Link href="/entertainment/trending">Trending Nigerian movies →</Link></p>
              <p><Link href="/explore/events">In-person Nigerian events and festivals →</Link></p>
            </div>
            <div className="job-sidebar-card">
              <strong>Source safety</strong>
              <p>Use the official accounts. MyNigeriaGuide does not host, sell or collect access fees for this livestream.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
