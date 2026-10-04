import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { getSeriesTitle, seriesLastChecked, seriesTitles } from "@/lib/series";
import { getSiteUrl } from "@/lib/site";

export const dynamic="force-static";
export const dynamicParams=false;

export function generateStaticParams(){
  return seriesTitles.map((item)=>({slug:item.slug}));
}

function accessLabel(access:string){
  if(access==="free-official") return "Free official upload";
  if(access==="subscription") return "Subscription";
  if(access==="broadcast") return "TV / broadcaster";
  return "Check current availability";
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const item=getSeriesTitle(slug);
  if(!item) return {};
  const description=`${item.title} (${item.year}) Nigerian series: cast, story, release status and official where-to-watch information. ${item.synopsis}`;
  return {
    title:item.title+" Nigerian Series: Cast, Episodes & Where to Watch",
    description,
    alternates:{canonical:"/entertainment/series/"+item.slug},
    openGraph:{title:item.title,description,type:"video.tv_show",url:"/entertainment/series/"+item.slug},
    twitter:{card:"summary",title:item.title,description}
  };
}

export default async function SeriesDetailPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const item=getSeriesTitle(slug);
  if(!item) notFound();
  const base=getSiteUrl();
  const pageUrl=base+"/entertainment/series/"+item.slug;
  const checked=seriesLastChecked(item);
  const related=seriesTitles
    .filter((candidate)=>candidate.slug!==item.slug)
    .map((candidate)=>({
      item:candidate,
      score:candidate.genres.filter((genre)=>item.genres.includes(genre)).length +
        candidate.languages.filter((language)=>item.languages.includes(language)).length
    }))
    .sort((a,b)=>b.score-a.score || a.item.title.localeCompare(b.item.title))
    .slice(0,3)
    .map((entry)=>entry.item);

  const ld={
    "@context":"https://schema.org",
    "@type":"TVSeries",
    name:item.title,
    description:item.synopsis,
    url:pageUrl,
    genre:item.genres,
    inLanguage:item.languages,
    actor:item.cast.map((name)=>({"@type":"Person",name})),
    creator:item.creators?.map((name)=>({"@type":"Person",name}))
  };

  return (
    <>
      <JsonLd data={ld}/>
      <section className="section page-top">
        <div className="container">
          <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Entertainment",href:"/entertainment"},{label:"Series",href:"/entertainment/series"},{label:item.title}]}/>
          <span className="eyebrow">{item.year} Nigerian series</span>
          <h1>{item.title}</h1>
          <p className="page-intro">{item.synopsis}</p>
          <div className="movie-detail-genres">{item.genres.map((genre)=><span key={genre}>{genre}</span>)}</div>
          <div className="movie-detail-actions">
            {item.watchLinks.map((link)=><a className="button" href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} ↗</a>)}
          </div>
          <small className="movie-freshness-note">Availability and sources checked {checked}.</small>
        </div>
      </section>

      <section className="section movie-detail-main">
        <div className="container movie-detail-layout">
          <article className="movie-detail-primary">
            <section>
              <span className="eyebrow">At a glance</span>
              <div className="movie-fact-grid">
                <article><span>Year</span><strong>{item.year}</strong></article>
                <article><span>Country</span><strong>{item.country}</strong></article>
                <article><span>Status</span><strong>{item.status}</strong></article>
                {item.premiereLabel?<article><span>Release</span><strong>{item.premiereLabel}</strong></article>:null}
                {item.episodeInfo?<article><span>Episodes / run</span><strong>{item.episodeInfo}</strong></article>:null}
                <article><span>Languages</span><strong>{item.languages.join(", ")}</strong></article>
                <article><span>Genres</span><strong>{item.genres.join(", ")}</strong></article>
              </div>
            </section>

            {item.cast.length?(
              <section>
                <span className="eyebrow">Cast</span>
                <h2>{item.title} cast</h2>
                <div className="movie-person-list">{item.cast.map((name)=><span key={name}>{name}</span>)}</div>
              </section>
            ):null}

            <section>
              <span className="eyebrow">Official availability</span>
              <h2>Where to watch {item.title}</h2>
              <div className="movie-watch-options">
                {item.watchLinks.map((link)=>(
                  <article key={link.href}>
                    <div><span>{link.platform}</span><strong>{link.label}</strong></div>
                    <dl>
                      <div><dt>Access</dt><dd>{accessLabel(link.access)}</dd></div>
                      <div><dt>Checked</dt><dd>{link.lastChecked}</dd></div>
                    </dl>
                    <p>{link.note}</p>
                    <a className="button" href={link.href} target="_blank" rel="noreferrer">Open official source ↗</a>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <span className="eyebrow">Artwork & rights</span>
              <h2>How visuals are handled</h2>
              <p className="movie-long-summary">{item.artworkNote}</p>
            </section>

            <section>
              <span className="eyebrow">Related series</span>
              <h2>Continue watching Nigerian series</h2>
              <div className="related-links">
                {related.map((candidate)=><Link href={"/entertainment/series/"+candidate.slug} key={candidate.slug}>{candidate.title} →</Link>)}
              </div>
            </section>

            <section>
              <span className="eyebrow">Sources</span>
              <h2>How this page was verified</h2>
              <div className="source-list">
                {item.sources.map((source)=><a href={source.url} target="_blank" rel="noreferrer" key={source.url}><strong>{source.label}</strong><span>Checked {source.lastChecked} ↗</span></a>)}
              </div>
            </section>
          </article>
          <aside className="movie-detail-sidebar">
            <div className="topic-trust-note">
              <strong>Legal viewing only</strong>
              <p>MyNigeriaGuide links to official broadcasters, rights-holder channels and licensed platforms. Availability can change after the date shown.</p>
            </div>
            <Link href="/entertainment/series" className="button button-secondary">Browse all series</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
