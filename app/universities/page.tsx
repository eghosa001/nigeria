import type { Metadata } from "next";
import Link from "next/link";
import { publicServices } from "@/lib/data";
import { universityProfiles } from "@/lib/university-profiles";

export const metadata: Metadata = {
  title: "Nigerian University Admissions, Fees, Portals & Clearance",
  description: "Compare official university admission processes, screening fees by session, student portals, school charges and clearance guidance for UNIBEN, UI, UNN, UNILAG and LASU.",
  alternates: { canonical: "/universities" },
};
export const revalidate = 3600;

export default function UniversityDirectoryPage() {
  const bySlug = new Map(publicServices.map((service) => [service.slug, service]));
  return (
    <>
      <section className="section page-top minimal-section-hero">
        <div className="container">
          <span className="eyebrow">Education & admissions</span>
          <h1>University fees, admission & student portals.</h1>
          <p className="page-intro">Find the official next step for admission, screening, acceptance, clearance and fee payments. Amounts and deadlines are labelled by academic session because a screening charge is not your school fee.</p>
          <form className="section-quick-search" action="/services" method="get" role="search">
            <label><span>Search universities or procedures</span><input name="q" type="search" placeholder="UNIBEN clearance, LASU LACACA, UNN fees…" /></label>
            <button type="submit">Search</button>
          </form>
          <div className="minimal-inline-links">
            <Link href="/services/jamb-caps">JAMB CAPS admission</Link>
            <Link href="/services/jamb-admission-letter">Print admission letter</Link>
            <Link href="/services/nelfund-student-loan-application">Student loans</Link>
            <Link href="/services/jamb-matriculation-list">Matriculation list</Link>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="universities-heading">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Official university guides</span>
              <h2 id="universities-heading">Choose a university.</h2>
              <p>Each guide explains the fee type, session, application status, portal, documents and what to do after an offer.</p>
            </div>
          </div>
          <div className="jobs-open-grid">
            {universityProfiles.map((profile) => {
              const service = bySlug.get(profile.slug);
              if (!service) return null;
              return (
                <article className="job-card" key={profile.slug}>
                  <div className="job-card-top"><span>{profile.state}</span><span>{profile.abbreviation}</span></div>
                  <div className="job-card-body">
                    <h3><Link href={"/services/" + service.slug}>{profile.name}</Link></h3>
                    <p>{profile.city} · {profile.academicSession}</p>
                    <p>{service.summary}</p>
                    <p><strong>Fee guidance:</strong> {service.feeLabel}</p>
                  </div>
                  <div className="job-card-footer">
                    <span>Official information checked {service.lastVerified}</span>
                    <Link href={"/services/" + service.slug}>Portals, documents & steps →</Link>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="page-intro">Only the universities with individually checked official processes are included in this directory. For another school, verify its own notice and invoice rather than applying fees from a different institution.</p>
        </div>
      </section>
    </>
  );
}
