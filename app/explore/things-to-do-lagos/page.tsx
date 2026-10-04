import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { explorePlaceKindLabel, explorePlaces, googleMapsUrl } from "@/lib/explore-places";
import { getExploreGuide } from "@/lib/explore";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Things to Do in Lagos 2026: Attractions, Food & Places to Visit",
  description: "Plan things to do in Lagos with verified attractions, nature stops, restaurants and a stay option, with addresses, cost guidance and links back to the full Lagos travel guide.",
  alternates: { canonical: "/explore/things-to-do-lagos" }
};

export default function Page() {
  const guide=getExploreGuide("lagos")!;
  const places=explorePlaces.filter((place)=>place.guideSlug==="lagos");
  const base=getSiteUrl();
  const ld={
    "@context":"https://schema.org",
    "@type":"ItemList",
    name:"Things to Do in Lagos 2026: Attractions, Food & Places to Visit",
    numberOfItems:places.length,
    itemListElement:places.map((place,index)=>({
      "@type":"ListItem",
      position:index+1,
      item:{
        "@type":place.kind==="restaurant"?"Restaurant":place.kind==="hotel"?"Hotel":"TouristAttraction",
        name:place.name,
        description:place.summary,
        address:place.address,
        url:base+"/explore/lagos#place-"+place.slug
      }
    }))
  };

  return (
    <>
      <JsonLd data={ld}/>
      <section className="section page-top">
        <div className="container">
          <Link href="/explore/lagos" className="back-link">← Lagos travel guide</Link>
          <span className="eyebrow">Things to do in Lagos</span>
          <h1>Things to Do in Lagos 2026: Attractions, Food & Places to Visit.</h1>
          <p className="page-intro">Plan things to do in Lagos with verified attractions, nature stops, restaurants and a stay option, with addresses, cost guidance and links back to the full Lagos travel guide.</p>
          <p className="hero-note">The places below are already part of the verified Lagos guide. Prices, hours and access can change, so confirm live details before travelling.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="explore-place-grid">
            {places.map((place)=>(
              <article className="explore-place-card explore-place-card-detail" key={place.slug}>
                <div className="explore-place-topline"><span>{explorePlaceKindLabel[place.kind]}</span><small>Checked {place.checkedAt}</small></div>
                <h2>{place.name}</h2>
                <p>{place.summary}</p>
                <dl>
                  <div><dt>Area</dt><dd>{place.area}</dd></div>
                  <div><dt>Address</dt><dd>{place.address}</dd></div>
                  <div><dt>Cost</dt><dd>{place.cost}</dd></div>
                  {place.hours?<div><dt>Hours</dt><dd>{place.hours}</dd></div>:null}
                </dl>
                <div className="explore-place-actions">
                  <a href={googleMapsUrl(place)} target="_blank" rel="noreferrer">Open in Google Maps ↗</a>
                  <Link href={"/explore/lagos#place-"+place.slug}>See in Lagos guide →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section premium-dark-section">
        <div className="container">
          <div className="section-heading section-heading-light">
            <div><span className="eyebrow">Plan the route</span><h2>Use the full Lagos guide for transport, timing and trip structure.</h2></div>
            <Link href="/explore/lagos">Open Lagos travel guide →</Link>
          </div>
          <div className="home-updates-grid">
            {guide.planning.slice(0,4).map((item)=>(
              <article className="home-update-card" key={item.label}><div><span>Plan</span></div><h3>{item.label}</h3><p>{item.detail}</p></article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
