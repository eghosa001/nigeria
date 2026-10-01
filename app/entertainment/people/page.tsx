import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { entertainmentPeople } from "@/lib/entertainment-extras";

export const metadata: Metadata = {
  title: "Nigerian Actors, Directors & Filmmakers",
  description: "Browse Nigerian actors, directors and filmmakers connected to movies in the MyNigeriaGuide entertainment catalog.",
  alternates: { canonical: "/entertainment/people" },
};

export default function EntertainmentPeoplePage() {
  return (
    <section className="section page-top">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Entertainment", href: "/entertainment" }, { label: "People" }]} />
        <span className="eyebrow">Actors &amp; filmmakers</span>
        <h1>The people behind the titles.</h1>
        <div className="service-grid top-gap">
          {entertainmentPeople.map((person) => (
            <article className="service-card" key={person.slug}>
              <div className="card-topline"><span>{person.roles.join(" · ")}</span></div>
              <h3><Link href={"/entertainment/people/" + person.slug}>{person.name}</Link></h3>
              <p>{person.summary}</p>
              <div className="service-meta"><strong>{person.knownForSlugs.length} linked title{person.knownForSlugs.length === 1 ? "" : "s"}</strong><Link href={"/entertainment/people/" + person.slug}>Open profile →</Link></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
