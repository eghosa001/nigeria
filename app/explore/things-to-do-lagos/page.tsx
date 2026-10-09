import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { explorePlaceKindLabel, explorePlaces, googleMapsUrl } from "@/lib/explore-places";
import { getExploreGuide } from "@/lib/explore";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Things to Do in Lagos, Nigeria: Attractions & Family Plans",
  description: "Plan Lagos, Nigeria by area: family outings, museums, art galleries, beaches, low-cost options and realistic one- or two-day itineraries.",
  alternates: { canonical: "/explore/things-to-do-lagos" }
};

export default function Page() {
  const guide=getExploreGuide("lagos")!;
  const places=explorePlaces.filter((place)=>place.guideSlug==="lagos");
  const base=getSiteUrl();
  const ld={
    "@context":"https://schema.org",
    "@type":"ItemList",
    name:"Things to Do in Lagos, Nigeria: Attractions & Family Plans",
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
          <h1>Things to Do in Lagos, Nigeria: Attractions & Family Plans</h1>
          <p className="page-intro">Plan Lagos, Nigeria by area: family outings, museums, art galleries, beaches, low-cost options and realistic one- or two-day itineraries.</p>
          <p className="hero-note">The places below are already part of the verified Lagos guide. Prices, hours and access can change, so confirm live details before travelling.</p>
        </div>
      </section>

      <section className="section" aria-label="Lagos practical trip choices">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">Plan around your needs</span><h2>Choose a Lagos outing that fits your trip.</h2><p>These are planning choices, not claims about fixed ticket prices or guaranteed activity availability.</p></div></div>
          <div className="home-updates-grid">
            <article className="home-update-card"><h3>Things to do in Lagos with kids or family</h3><p>Begin with an age-appropriate outdoor stop such as a park or a nature attraction, then add one indoor museum or gallery visit if the children can enjoy it. Lekki Conservation Centre has elevated walkways and outdoor conditions that may not suit every visitor; check the operator's current family-access rules and weather before setting out. Choose daytime travel and keep a flexible return plan.</p></article>
            <article className="home-update-card"><h3>Lagos Island, Mainland or Lekki: where should you start?</h3><p>Pick a cluster rather than visiting every part of Lagos in one day. Lagos Island and nearby Victoria Island work well for a culture-and-dining outing, while the Lekki axis offers nature and galleries. Mainland plans should stand alone where possible. Crossing bridges repeatedly can use up more of your day than the attractions themselves.</p></article>
            <article className="home-update-card"><h3>What can you do in Lagos on a small budget?</h3><p>Look first for outdoor public spaces, historic areas and galleries with clearly published entry policies. Free admission is not guaranteed and transport, parking, guided tours or food may still cost money. Compare current admission and opening details on the provider's own website rather than treating an old 'free attractions' list as a price promise.</p></article>
            <article className="home-update-card"><h3>How to plan one or two days in Lagos</h3><p>For one day, focus on one neighbourhood and choose two main stops with a meal nearby. With two days, use one day for an art/history circuit and another for a nature or waterfront outing if conditions permit. Tarkwa Bay generally involves boat travel, so confirm the operator, life jackets, weather and a return arrangement separately.</p></article>
          </div>
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
