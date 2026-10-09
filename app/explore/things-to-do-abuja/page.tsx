import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { explorePlaceKindLabel, explorePlaces, googleMapsUrl } from "@/lib/explore-places";
import { getExploreGuide } from "@/lib/explore";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Things to Do in Abuja: Family, Couples & Tourist Attractions",
  description: "Discover Abuja attractions for families, couples and first-time visitors with realistic park, lake, landmark and one-day trip planning advice.",
  alternates: { canonical: "/explore/things-to-do-abuja" }
};

export default function Page() {
  const guide=getExploreGuide("abuja")!;
  const places=explorePlaces.filter((place)=>place.guideSlug==="abuja");
  const base=getSiteUrl();
  const ld={
    "@context":"https://schema.org",
    "@type":"ItemList",
    name:"Things to Do in Abuja: Family, Couples & Tourist Attractions",
    numberOfItems:places.length,
    itemListElement:places.map((place,index)=>({
      "@type":"ListItem",
      position:index+1,
      item:{
        "@type":place.kind==="restaurant"?"Restaurant":place.kind==="hotel"?"Hotel":"TouristAttraction",
        name:place.name,
        description:place.summary,
        address:place.address,
        url:base+"/explore/abuja#place-"+place.slug
      }
    }))
  };

  return (
    <>
      <JsonLd data={ld}/>
      <section className="section page-top">
        <div className="container">
          <Link href="/explore/abuja" className="back-link">← Abuja travel guide</Link>
          <span className="eyebrow">Things to do in Abuja</span>
          <h1>Things to Do in Abuja: Family, Couples & Tourist Attractions</h1>
          <p className="page-intro">Discover Abuja attractions for families, couples and first-time visitors with realistic park, lake, landmark and one-day trip planning advice.</p>
          <p className="hero-note">The places below are already part of the verified Abuja guide. Prices, hours and access can change, so confirm live details before travelling.</p>
        </div>
      </section>

      <section className="section" aria-label="Abuja practical trip choices">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">Plan around your needs</span><h2>Choose a Abuja outing that fits your trip.</h2><p>These are planning choices, not claims about fixed ticket prices or guaranteed activity availability.</p></div></div>
          <div className="home-updates-grid">
            <article className="home-update-card"><h3>Things to do in Abuja for kids and families</h3><p>Choose an easy daytime combination such as Millennium Park and a nearby suitable eating stop, or visit a lake-area attraction when its activity provider confirms safe age limits and supervision. Parks and waterfront operators have different opening rules and may charge for individual services. Check access before promising children a particular activity.</p></article>
            <article className="home-update-card"><h3>Places to visit in Abuja for couples</h3><p>A relaxed afternoon in a public park, a daylight lakeside walk or a gallery-and-meal plan can be simpler than several distant attractions. Jabi Lake and central Abuja should not automatically be bundled with a far-out excursion. Check operating hours, reservations and return transport when planning an evening outing.</p></article>
            <article className="home-update-card"><h3>How to explore Abuja as a tourist in one day</h3><p>Pick a city-centre landmark and an outdoor stop that fit the same transport window. View the National Mosque or National Christian Centre only from permitted visitor areas, respect services and photography policies, then allow time for a park or craft market. A full day trip to Gurara Falls belongs in a separate road itinerary.</p></article>
            <article className="home-update-card"><h3>Are Abuja attractions free?</h3><p>Do not assume a park, lake facility or museum has no entry or activity charge. The city includes public spaces and separately operated venues; confirm access, paid activities, parking and current security controls with each provider. Check rain forecasts before committing to outdoor outings.</p></article>
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
                  <Link href={"/explore/abuja#place-"+place.slug}>See in Abuja guide →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section premium-dark-section">
        <div className="container">
          <div className="section-heading section-heading-light">
            <div><span className="eyebrow">Plan the route</span><h2>Use the full Abuja guide for transport, timing and trip structure.</h2></div>
            <Link href="/explore/abuja">Open Abuja travel guide →</Link>
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
