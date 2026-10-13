import type { Metadata } from "next";
import Link from "next/link";
import { TripBudgetPlanner } from "@/components/trip-budget-planner";

export const metadata: Metadata = {
  title: "Nigeria Trip Budget Planner",
  description: "Estimate travel, accommodation, meals, activities and local transport costs for your Nigeria trip using your own quotes, and share your budget.",
  alternates: { canonical: "/explore/trip-planner" },
};

const startingPoints = [
  { label: "Lagos", href: "/explore/lagos" },
  { label: "Abuja", href: "/explore/abuja" },
  { label: "Benin City", href: "/explore/benin-city" },
  { label: "Yankari Game Reserve", href: "/explore/yankari-game-reserve" },
  { label: "Obudu Mountain Resort", href: "/explore/obudu-mountain-resort" },
  { label: "Lagos–Ibadan by train", href: "/explore/lagos-abeokuta-ibadan-train-guide" },
] as const;

export default function TripPlannerPage() {
  return (
    <>
      <section className="section page-top trip-planner-hero">
        <div className="container">
          <span className="eyebrow">Tour Nigeria / Plan a trip</span>
          <h1>Build a budget before you travel.</h1>
          <p className="page-intro">Enter your own current prices to estimate the cost for your group. This calculator does not guess hotel rates, entry fees or transport fares.</p>
          <Link href="/explore">← Browse destinations</Link>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <TripBudgetPlanner />
          <div className="trip-planner-routes">
            <h2>Find a destination or route</h2>
            <p>Read practical destination guides, then fill the calculator with prices you confirm with providers.</p>
            <div className="feature-guide-actions">
              {startingPoints.map((item) => <Link href={item.href} key={item.href}>{item.label} <span aria-hidden="true">↗</span></Link>)}
            </div>
            <p><Link href="/explore">Explore more Nigerian destinations →</Link></p>
          </div>
        </div>
      </section>
    </>
  );
}
