import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nigerian Movies Coming in October 2026: Nollywood Release Calendar",
  description: "Confirmed Nigerian movie releases for October 2026, including Oversabi Aunty, MKO, First Lady, A Land Apart, Tele x Zikora, Phoenix Fury and Wire Transfer.",
  alternates: { canonical: "/entertainment/movies/october-2026" },
};

const releases = [
  {
    date: "1 October",
    title: "Agbara Nla: The Return",
    where: "Nigerian cinemas",
    detail: "Mount Zion's return to the Agbara Nla story arrives in cinemas with Mike Bamiloye returning as Isawuru.",
  },
  {
    date: "2 October",
    title: "MKO",
    where: "Nigerian cinemas",
    detail: "Ose Oyamendan's documentary examines MKO Abiola's life, business career, 1993 election and political legacy.",
  },
  {
    date: "2 October",
    title: "Oversabi Aunty",
    where: "Netflix",
    detail: "Toyin Abraham's comedy-drama moves from its cinema run to streaming. MyNigeriaGuide already has the cast and official watch page.",
    href: "/entertainment/movies/oversabi-aunty",
  },
  {
    date: "18 October",
    title: "First Lady",
    where: "Nigerian cinemas",
    detail: "A political drama led by Fehintola Olulana, with Desmond Elliot, Ibrahim Suleiman, Ngozi Nwosu and Jaiye Kuti.",
  },
  {
    date: "18 October",
    title: "Pushing 30",
    where: "Africa Magic Showcase",
    detail: "An ensemble dramedy about a 30-year-old tech founder whose birthday brunch exposes old rivalries, romance and career pressure.",
  },
  {
    date: "23 October",
    title: "A Land Apart",
    where: "Nigerian cinemas",
    detail: "Richard Mofe-Damijo, Princess Mufeedah and Daniel Etim Effiong star in a drama built around agriculture, inheritance and global power.",
  },
  {
    date: "23 October",
    title: "Tele x Zikora",
    where: "Nigerian cinemas",
    detail: "Mike Afolarin and Genoveva Umeh lead a university-set young-adult drama about ambition, identity and relationships.",
  },
  {
    date: "30 October",
    title: "Phoenix Fury",
    where: "Nigerian cinemas",
    detail: "Ifeoma Chukwuogo's revenge drama arrives in Nigeria and Ghana after its AFRIFF run.",
  },
  {
    date: "30 October",
    title: "Wire Transfer",
    where: "Nigerian cinemas",
    detail: "A crime thriller starring Hanks Anuku, Gideon Okeke, Deyemi Okanlawon, Mike Afolarin, Rita Edochie and Teddy A.",
  },
] as const;

export default function OctoberMoviesPage() {
  const base = getSiteUrl();
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nigerian movies coming in October 2026",
    numberOfItems: releases.length,
    itemListElement: releases.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <section className="section page-top">
        <div className="container">
          <span className="eyebrow">October 2026 release calendar</span>
          <h1>Nigerian movies coming this October.</h1>
          <p className="page-intro">
            A date-by-date guide to confirmed Nollywood and Nigeria-focused releases arriving in cinemas and on streaming platforms this month.
          </p>

          <div className="jobs-topic-links">
            <Link href="/entertainment/movies">Browse all movies</Link>
            <Link href="/latest">Latest across MyNigeriaGuide</Link>
          </div>

          <div className="updates-stack top-gap">
            {releases.map((item) => (
              <article className="update-card" key={item.date + item.title}>
                <div className="update-meta">
                  <time>{item.date}</time>
                  <span>{item.where}</span>
                </div>
                <h2>{item.href ? <Link href={item.href}>{item.title}</Link> : item.title}</h2>
                <p>{item.detail}</p>
                {item.href ? <Link className="text-link" href={item.href}>Cast & where to watch →</Link> : null}
              </article>
            ))}
          </div>

          <section className="jobs-editorial-note">
            <strong>Release information checked 4 October 2026</strong>
            <p>
              Release dates and availability can move. This calendar is based on confirmed Nigeria release information and should be rechecked close to each date.
            </p>
            <a href="https://whatkeptmeup.com/preview/new-in-nigeria-movies-and-tv-shows-to-watch-this-october-2026/" target="_blank" rel="noreferrer">
              Source release calendar ↗
            </a>
          </section>
        </div>
      </section>
    </>
  );
}
