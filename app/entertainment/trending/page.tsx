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

const prioritySlugs = ["black-market-2026","agbara-nla-the-return","east-west-love-2026","first-lady-2026","pushing-30-2026","tele-x-zikora-2026","a-land-apart-2026","onibon-oje-2026","phoenix-fury-2026","wire-transfer-2026","mko-documentary-2026","oversabi-aunty"];

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
  </div></section></>);
}
