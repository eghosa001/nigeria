import type { Metadata } from "next";
import Link from "next/link";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { entertainmentTitles } from "@/lib/entertainment";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trending Nigerian Movies October 2026: Cast & Where to Watch",
  description: "Current and upcoming Nigerian movie releases for October 2026, with cast, release dates and verified cinema or streaming links.",
  alternates: { canonical: "/entertainment/trending" },
};

const prioritySlugs = ["black-market-2026","agbara-nla-the-return","east-west-love-2026","first-lady-2026","pushing-30-2026","tele-x-zikora-2026","a-land-apart-2026","onibon-oje-2026","phoenix-fury-2026","wire-transfer-2026","mko-documentary-2026","oversabi-aunty","long-enough-2026","forever-yours-2026","once-upon-a-village-3"];

export default function TrendingMoviesPage() {
  const items = prioritySlugs.map((slug) => entertainmentTitles.find((item) => item.slug === slug)).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const base = getSiteUrl();
  const ld = {"@context":"https://schema.org","@type":"CollectionPage",name:"Trending Nigerian movies — October 2026",url:base+"/entertainment/trending",mainEntity:{"@type":"ItemList",itemListElement:items.map((item,index)=>({"@type":"ListItem",position:index+1,name:item.title,url:base+"/entertainment/movies/"+item.slug}))}};
  return (<><JsonLd data={ld} /><section className="section page-top"><div className="container">
    <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Entertainment",href:"/entertainment"},{label:"Trending movies"}]} />
    <span className="eyebrow">October 2026 movie watch</span><h1>Trending and upcoming Nigerian movies</h1>
    <p className="page-intro">A current release watchlist built around films people are searching for now and titles arriving later this month.</p>
    <AnswerFirst title="Start with the films that have a current release signal" summary="Black Market and MKO are already in their October release window, while First Lady, Onibọn Oje, Phoenix Fury, Wire Transfer and other titles have upcoming dates to watch." facts={[{label:"Current list",value:String(items.length)+" movie guides"},{label:"Main month",value:"October 2026"},{label:"Each page includes",value:"Cast · story · where to watch"},{label:"Source rule",value:"Verified release/platform links"}]} links={[{href:"/entertainment/movies",label:"Browse all movies"},{href:"/entertainment/releases",label:"Release calendar",primary:true}]} note="Release dates and cinema schedules can change. Each movie page shows the source/link freshness used for that title." />
    <div className="home-category-grid compact-category-grid">{items.map((item)=><Link className="home-category-card" href={"/entertainment/movies/"+item.slug} key={item.slug}><span>{item.year} · {item.genres.slice(0,2).join(" · ")}</span><strong>{item.title}</strong><small>{item.cast.slice(0,3).join(", ")}</small><i>Cast & where to watch →</i></Link>)}</div>
    <section className="top-gap" aria-labelledby="youtube-trailers">
      <div className="minimal-section-heading">
        <div>
          <span className="eyebrow">YouTube Nigeria · 9 October 2026</span>
          <h2 id="youtube-trailers">Trailers attracting attention this week</h2>
          <p>
            These video previews appeared in a third-party snapshot of Nigeria&apos;s YouTube trending chart.
            A trending trailer is not proof that a full film is available, and a video title
            is not evidence of a confirmed release date or full cast.
          </p>
        </div>
      </div>
      <div className="home-category-grid compact-category-grid">
        <article className="home-category-card">
          <span>Trailer · YouTube</span>
          <h3>OJISE</h3>
          <p>A trailer titled &ldquo;OJISE Trailer | Showing this Friday&rdquo; appeared near the top of the chart. Check the uploader&apos;s current description for the release and viewing route; do not assume a full film is online.</p>
          <a href="https://youtu.be/Hmvy2rX49So" target="_blank" rel="noopener noreferrer">Watch the trailer on YouTube ↗</a>
        </article>
        <article className="home-category-card">
          <span>Trailer · YouTube</span>
          <h3>Trials of Olaide Part 2</h3>
          <p>The video is promoted as a story involving love, betrayal and survival. The chart confirms attention to the trailer, not a verified release date, distribution platform or availability of the complete film.</p>
          <a href="https://youtu.be/Q5vqmJywp6Q" target="_blank" rel="noopener noreferrer">Watch the trailer on YouTube ↗</a>
        </article>
        <article className="home-category-card">
          <span>Teaser · YouTube</span>
          <h3>Akpan &amp; Oduma: Love &amp; Chaos</h3>
          <p>The teaser centres its promotion on relationship and political humour. Check its publisher for episode or film details before relying on any claimed screening, date or subscription requirement.</p>
          <a href="https://youtu.be/9ejg-J_-8Us" target="_blank" rel="noopener noreferrer">Watch the teaser on YouTube ↗</a>
        </article>
      </div>
      <p className="job-muted top-gap">
        Chart observation checked 9 October 2026:{" "}
        <a href="https://kworb.net/youtube/trending/ng.html" target="_blank" rel="noopener noreferrer">Kworb Nigeria YouTube trend snapshot ↗</a>.
        Trends can change during the day. These clips are linked to their YouTube uploads and are not hosted by MyNigeriaGuide.
      </p>
      <p className="top-gap"><Link href="/entertainment/social-trends">Explore the latest Nigeria YouTube music chart and verified social-media context →</Link></p>
    </section>
  </div></section></>);
}
