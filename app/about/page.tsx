import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About MyNigeriaGuide — Independent Nigerian Information Guides",
  description: "Learn how MyNigeriaGuide helps readers explore Nigerian movies, services, travel and jobs, and how to report corrections.",
};

export default function AboutPage() {
  return (
    <section className="section page-top">
      <div className="container narrow">
        <span className="eyebrow">About MyNigeriaGuide</span>
        <h1>Practical information for life in Nigeria</h1>
        <p className="page-intro">MyNigeriaGuide is an independent Nigerian information website covering four connected needs: movies and entertainment, everyday services, places to visit, and jobs and careers. We are not a government agency, employer, cinema or ticket seller.</p>
        <div className="policy-stack">
          <section><strong>1</strong><div><h2>Four useful starting points</h2><p>Explore <Link href="/entertainment">Nigerian movies</Link> and legitimate viewing options; follow <Link href="/services">service procedures</Link> through official portals; use <Link href="/explore">Tour Nigeria</Link> for practical destination planning; or research <Link href="/jobs">career opportunities</Link> and recruitment deadlines.</p></div></section>
          <section><strong>2</strong><div><h2>Information you can act on</h2><p>We aim to explain practical next steps, show relevant source links and make important dates and requirements easy to find. Check the linked official source before applying, paying or travelling.</p></div></section>
          <section><strong>3</strong><div><h2>What verification does — and does not — mean</h2><p>Dates and official links help readers assess a page, but they do not guarantee admission, job placement, available cinema tickets, safe travel or unchanged agency rules. The <Link href="/editorial-policy">editorial policy</Link> explains how corrections and conflicting information should be handled.</p></div></section>
          <section><strong>4</strong><div><h2>Contact and corrections</h2><p>See our <Link href="/corrections">corrections policy</Link> or <Link href="/contact">contact page</Link> to flag an error. Do not send identification numbers, bank cards, passwords or application credentials to MyNigeriaGuide. Government fees and job applications stay on the responsible organisation's channels.</p></div></section>
        </div>
      </div>
    </section>
  );
}
