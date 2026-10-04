import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { seriesTitles } from "@/lib/series";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nigerian TV Series 2026: Nollywood, Kannywood & Where to Watch",
  description: "Browse Nigerian TV and web series with verified release status, cast information and official places to watch.",
  alternates: { canonical: "/entertainment/series" }
};

export default function SeriesPage() {
  const base=getSiteUrl();
  const upcoming=seriesTitles.filter((item)=>item.status==="upcoming");
  const available=seriesTitles.filter((item)=>item.status!=="upcoming");

  const ld={
    "@context":"https://schema.org",
    "@type":"CollectionPage",
    name:"Nigerian TV Series",
    description:metadata.description,
    url:base+"/entertainment/series",
    isPartOf:{"@type":"WebSite",name:"MyNigeriaGuide",url:base},
    mainEntity:{
      "@type":"ItemList",
      numberOfItems:seriesTitles.length,
      itemListElement:seriesTitles.map((item,index)=>({
        "@type":"ListItem",position:index+1,name:item.title,url:base+"/entertainment/series/"+item.slug
      }))
    }
  };

  return (
    <>
      <JsonLd data={ld}/>
      <section className="section page-top minimal-section-hero">
        <div className="container">
          <Link href="/entertainment" className="back-link">← Entertainment</Link>
          <span className="eyebrow">Nigerian series</span>
          <h1>Stories worth following beyond one movie.</h1>
          <p className="page-intro">Nollywood, Yoruba and Hausa series with current release information and links only to identifiable official platforms or rights-holder channels.</p>
          <div className="minimal-inline-links">
            <a href="#available">Watch now</a>
            <a href="#upcoming">Upcoming</a>
            <Link href="/entertainment/movies">Movies</Link>
          </div>
        </div>
      </section>

      <section className="section" id="available">
        <div className="container">
          <div className="minimal-section-heading"><div><span className="eyebrow">Available / ongoing</span><h2>Start with a verified series.</h2></div></div>
          <div className="home-category-grid compact-category-grid">
            {available.map((item)=>(
              <Link className="home-category-card" href={"/entertainment/series/"+item.slug} key={item.slug}>
                <span>{item.year} · {item.languages.join(" / ")}</span>
                <strong>{item.title}</strong>
                <small>{item.synopsis}</small>
                <i>{item.status==="ongoing"?"Follow series":"Open series"} →</i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {upcoming.length?(
        <section className="section" id="upcoming">
          <div className="container">
            <div className="minimal-section-heading"><div><span className="eyebrow">Coming next</span><h2>Upcoming Nigerian series.</h2></div></div>
            <div className="home-category-grid compact-category-grid">
              {upcoming.map((item)=>(
                <Link className="home-category-card" href={"/entertainment/series/"+item.slug} key={item.slug}>
                  <span>{item.premiereLabel}</span>
                  <strong>{item.title}</strong>
                  <small>{item.synopsis}</small>
                  <i>Release details →</i>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ):null}
    </>
  );
}
