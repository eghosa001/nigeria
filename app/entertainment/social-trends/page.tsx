import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "YouTube Trends in Nigeria: Music, Film & Social Media",
  description: "Nigeria's YouTube trending videos and music in October 2026, plus TikTok, Instagram, Facebook and X context. Dated chart snapshots, sources and verified guides.",
  alternates: { canonical: "/entertainment/social-trends" },
};

const videoSnapshot = [
  { name: "Blaqbonez — Ikebe 3000 (feat. Asake)", type: "Music video", detail: "Listed at No. 1 on the Nigeria YouTube trending-video snapshot." },
  { name: "OJISE", type: "Film trailer", detail: "A trailer ranked near the top. A trailer alone does not establish release or streaming availability." },
  { name: "Ayra Starr — Heaven Baby (feat. ZAYN)", type: "Music video", detail: "Appeared among the leading videos in the same Nigeria chart snapshot." },
  { name: "Akpan & Oduma: Love & Chaos", type: "Comedy teaser", detail: "The teaser appeared on the Nigeria video chart; check the publisher for episode or release information." },
  { name: "RED RULES 2", type: "Nollywood trailer", detail: "Listed fifth in the Nigeria YouTube trending-video chart on 11 October; a trailer is not a verified full-film release." },
  { name: "Kizz Daniel — Owo Oluwa", type: "Music video", detail: "Featured among the listed trending Nigerian videos." },
];

const weeklyMusic = [
  { name: "B4 B4 — Davido, Mayorkun & FOLA", note: "No. 1 in the chart for the week of 5 October" },
  { name: "ILOME — Seyi Vibez", note: "No. 2 in the chart for the week of 5 October" },
  { name: "Baba — Hotkeed & Zlatan", note: "No. 3 in the chart for the week of 5 October" },
  { name: "Oh No — Rema", note: "No. 4 in the chart for the week of 5 October" },
];

const platforms = [
  {
    name: "TikTok",
    reach: "47.8 million adults",
    guidance: "Short videos and remixed sounds travel quickly, but an individual challenge is not established as trending in Nigeria without current, Nigeria-specific evidence.",
  },
  {
    name: "Facebook",
    reach: "38.0 million people",
    guidance: "Look for credited Nigerian event, entertainment and community publishers. Verify dates and ticket/payment links with organisers.",
  },
  {
    name: "Instagram",
    reach: "10.0 million people",
    guidance: "Reels, artist posts and official film accounts can confirm a creative campaign; repost counts cannot confirm a cinema or streaming release.",
  },
  {
    name: "X",
    reach: "6.95 million people",
    guidance: "Fast-moving discussions are useful leads, not primary evidence. Confirm job vacancies, public-service announcements and event details at official sources.",
  },
];

/** Dated, independently traceable observations — do not combine the different platforms into a single ranking. */
const nigeriaSocialSignals = [
  {
    platform: "X · Nigeria timeline · 11 October 2026",
    title: "#HallelujahChallenge appeared in the early-hours Nigeria trends",
    detail: "Trends24's archived Nigeria timeline listed the hashtag during the early hours of 11 October. This is an observed X trend at those times, not an official impression count or a claim it stayed ranked all day.",
    sourceLabel: "Nigeria X trends timeline",
    sourceUrl: "https://trends24.in/nigeria/",
    internalHref: "/entertainment/hallelujah-challenge-october-2026",
    internalLabel: "Verified organiser schedule",
  },
  {
    platform: "X · Nigeria timeline · 11 October 2026",
    title: "#LeadwayLifestyleFair appeared on the Nigeria timeline",
    detail: "The name appeared in the late-morning Nigeria snapshot; the X trend alone does not establish its venue, programme or ticket status. Check organisers directly before travelling.",
    sourceLabel: "Trends24 Nigeria timeline",
    sourceUrl: "https://trends24.in/nigeria/",
    internalHref: "/explore/events",
    internalLabel: "Find source-verified local events",
  },
  {
    platform: "Facebook · local events roundup · 5–11 October 2026",
    title: "Abuja events and creator meetups discussed on Facebook",
    detail: "NairaDiaryTV published an Abuja event-discovery roundup for 5–11 October. It is evidence of an actual public Facebook post, not proof of virality, ticket availability or final programme details.",
    sourceLabel: "NairaDiaryTV public Facebook roundup",
    sourceUrl: "https://www.facebook.com/nairadiarytv/posts/top-10-events-happening-in-abuja-this-week-5th-11th-october-2026from-business-an/1106586705662923/",
    internalHref: "/explore/abuja",
    internalLabel: "Plan an Abuja city visit",
  },
  {
    platform: "TikTok · Nigerian creator reporting · 3 October 2026",
    title: "Flavour's Genesis and Kay Kay's Bere Mole among reported short-video sounds",
    detail: "YNaija's 3 October Nigerian TikTok/Instagram sound roundup documents local creators using these audios. Treat them as editorially observed examples, NOT a live Nigeria-wide TikTok ranking or independently measured view count.",
    sourceLabel: "YNaija — 3 October sounds roundup",
    sourceUrl: "https://ynaija.com/top-10-trending-sounds-from-tiktok-and-instagram/",
    internalHref: "/entertainment",
    internalLabel: "Explore Nigerian entertainment",
  },
];

export default function SocialTrendsPage() {
  const base = getSiteUrl();
  const url = base + "/entertainment/social-trends";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "YouTube and social media trends in Nigeria — October 2026",
    description: "Source-checked Nigerian YouTube and social media discovery, with dated chart snapshots.",
    url,
    dateModified: "2026-10-11",
    isPartOf: { "@type": "WebSite", name: "MyNigeriaGuide", url: base },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: videoSnapshot.map((item, index) => ({
        "@type": "ListItem", position: index + 1, name: item.name,
      })),
    },
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <section className="section page-top">
        <div className="container">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Entertainment", href: "/entertainment" },
            { label: "YouTube & social trends" },
          ]} />
          <span className="eyebrow">Nigeria · Sources checked 11 October 2026</span>
          <h1>YouTube and social media trends in Nigeria</h1>
          <p className="page-intro">
            See what Nigeria-focused video charts showed this week, discover music and film previews,
            and learn how to follow entertainment conversations on TikTok, Facebook, Instagram and X
            without confusing popularity with verified facts.
          </p>
          <p className="job-muted">
            This is a dated editorial snapshot, not a live social-media feed. Chart positions can
            change at any time. The audience figures below are advertising-reach estimates from
            late 2025, published in the Digital 2026 Nigeria report, not October 2026 active-user counts.
          </p>

          <section className="top-gap" aria-labelledby="youtube-video-trends">
            <span className="eyebrow">YouTube Nigeria · 11 October 2026 snapshot</span>
            <h2 id="youtube-video-trends">Videos drawing attention</h2>
            <p>The following appeared in the Nigeria trending-video chart observed on 11 October.
              These are chart observations, not claims about all-time popularity or full-film availability.</p>
            <div className="home-category-grid compact-category-grid">
              {videoSnapshot.map((item) => (
                <article className="home-category-card" key={item.name}>
                  <span>{item.type}</span>
                  <h3>{item.name}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
            <p>
              <a href="https://kworb.net/youtube/trending/ng.html" target="_blank" rel="noopener noreferrer">
                Open the Nigeria YouTube chart and check current positions ↗
              </a>
            </p>
            <div className="minimal-inline-links">
              <Link href="/entertainment/trending">Current Nigerian movie trailers</Link>
              <Link href="/entertainment/youtube">Verified full Nigerian movies on YouTube</Link>
              <Link href="/entertainment/youtube/channels">Browse film publishers</Link>
            </div>
          </section>

          <section className="top-gap" aria-labelledby="weekly-music">
            <span className="eyebrow">YouTube music · Chart week of 5 October 2026</span>
            <h2 id="weekly-music">Songs with strong Nigerian viewership</h2>
            <p>A weekly music ranking measures a different period and category from the trending-video snapshot above. Do not combine the two into one ranking.</p>
            <div className="home-category-grid compact-category-grid">
              {weeklyMusic.map((item) => (
                <article className="home-category-card" key={item.name}>
                  <strong>{item.name}</strong>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
            <p><a href="https://soundcharts.com/en/charts/youtube/nigeria" target="_blank" rel="noopener noreferrer">View the chart source and reporting period ↗</a></p>
          </section>

          <section className="top-gap" aria-labelledby="verified-platform-signals">
            <span className="eyebrow">X · Facebook · TikTok · dated Nigeria signals</span>
            <h2 id="verified-platform-signals">What public platform evidence actually shows</h2>
            <p>These are dated observations from public Nigeria-specific trend histories, publisher posts and Nigerian editorial coverage — not pooled engagement totals. Each card names its evidence and links to a relevant MyNigeriaGuide guide.</p>
            <div className="home-category-grid compact-category-grid">
              {nigeriaSocialSignals.map((signal) => (
                <article className="home-category-card" key={signal.title}>
                  <span>{signal.platform}</span>
                  <h3>{signal.title}</h3>
                  <p>{signal.detail}</p>
                  <div className="minimal-inline-links">
                    <Link href={signal.internalHref}>{signal.internalLabel} →</Link>
                    <a href={signal.sourceUrl} target="_blank" rel="noopener noreferrer">{signal.sourceLabel} ↗</a>
                  </div>
                </article>
              ))}
            </div>
            <p className="job-muted">TikTok's anonymous public Creative Center rankings do not currently expose a dependable Nigeria-specific national top-hashtag feed. A global chart or a page that ignores the NG filter is not evidence of a Nigerian trend. Facebook does not offer a public national trending ranking here; publisher posts are attributed individually.</p>
          </section>

          <section className="top-gap" aria-labelledby="social-platforms">
            <span className="eyebrow">TikTok · Facebook · Instagram · X</span>
            <h2 id="social-platforms">How to verify Nigerian social-media trends</h2>
            <p>
              These platforms publish different audience estimates, surfaces and recommendation
              signals. Advertising reach is not unique monthly users, and a global viral hashtag
              should not be described as Nigerian unless Nigerian activity has been established.
            </p>
            <div className="home-category-grid compact-category-grid">
              {platforms.map((platform) => (
                <article className="home-category-card" key={platform.name}>
                  <span>Digital 2026 Nigeria · late-2025 ad reach</span>
                  <h3>{platform.name}</h3>
                  <strong>{platform.reach}</strong>
                  <p>{platform.guidance}</p>
                </article>
              ))}
            </div>
            <p><a href="https://datareportal.com/reports/digital-2026-nigeria" target="_blank" rel="noopener noreferrer">Read Nigeria's original digital-audience methodology ↗</a></p>
          </section>

          <section className="top-gap" aria-labelledby="social-example">
            <span className="eyebrow">Instagram · YouTube · Facebook · October 2026</span>
            <h2 id="social-example">A verified social conversation: Hallelujah Challenge</h2>
            <p>
              The October Hallelujah Challenge runs from 5 to 30 October, with an
              11:59 pm West Africa Time daily broadcast across social platforms.
              Organisers also advertise a separate, free festival in Ikeja on
              30 October. The broadcast and the physical event are different;
              check the organiser's instructions before travelling.
            </p>
            <div className="minimal-inline-links">
              <Link href="/entertainment/hallelujah-challenge-october-2026">October broadcast schedule and official links</Link>
              <Link href="/explore/hallelujah-festival-lagos-october-2026">Festival location and visitor information</Link>
            </div>
            <p>
              <a href="https://www.hallelujahchallengelive.com/int" target="_blank" rel="noopener noreferrer">
                Official organiser information for the 30 October event ↗
              </a>
            </p>
          </section>

          <section className="top-gap" aria-labelledby="social-creators">
            <span className="eyebrow">Social media and creator events · 10 October 2026</span>
            <h2 id="social-creators">SMFest Abuja: verified creator and tech event</h2>
            <p>
              SMFest Abuja's organiser lists its main event for 17–18 October 2026
              at Family Worship Centre, Wuye, Abuja, from 9 am, under the
              AdvantageX theme. This is a verifiable offline event for social-media
              creators and digital entrepreneurs, not evidence that a particular
              hashtag is currently trending on TikTok or Instagram.
            </p>
            <div className="minimal-inline-links">
              <Link href="/explore/smfest-abuja-2026">Dates, venue and visitor planning</Link>
              <Link href="/jobs/guides/job-scam-red-flags-nigeria">Check suspicious creator and job offers</Link>
            </div>
            <p><a href="https://smfest.org/" target="_blank" rel="noopener noreferrer">Confirm the live SMFest programme with the organiser ↗</a></p>
          </section>

          <section className="top-gap" aria-labelledby="beyond-trends">
            <span className="eyebrow">Useful beyond the viral moment</span>
            <h2 id="beyond-trends">Turn a trending post into a reliable answer</h2>
            <p>
              Before sharing a trailer, find the official uploader and distinguish a teaser from
              a playable full movie. Before travelling to a viral event, check organiser dates,
              venue and entry requirements. Before applying to a vacancy circulating online,
              confirm the deadline and use the employer's application page, never a payment agent.
            </p>
            <div className="minimal-inline-links">
              <Link href="/entertainment/movies">Movie casts, stories and watching links</Link>
              <Link href="/entertainment/releases">Nigerian release calendar</Link>
              <Link href="/explore/events">Verified Nigerian events</Link>
              <Link href="/jobs/open-now">Currently open jobs</Link>
              <Link href="/services">Official Nigerian services</Link>
            </div>
          </section>

          <section className="top-gap" aria-labelledby="sources">
            <h2 id="sources">Sources and freshness</h2>
            <p>
              The Nigeria trending-video snapshot was checked 11 October 2026 using Kworb's
              public YouTube chart. The weekly music examples use Soundcharts' chart for the
              week of 5 October 2026. Digital-audience figures come from DataReportal's
              Digital 2026 Nigeria report, which uses late-2025 observations.
              Rankings and audience estimates are not directly comparable.
            </p>
            <p className="job-muted">
              Last editorial review: 11 October 2026. The dated rankings should be
              replaced or archived when a newer, verified snapshot is published.
              Follow the linked sources for up-to-date platform activity.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
