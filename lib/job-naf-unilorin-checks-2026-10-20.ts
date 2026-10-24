import type { CareerOpportunity } from "@/lib/jobs";

/**
 * Exact issuer records reviewed 20 October 2026.
 * No inferred reopening, examination date or application approval.
 */
export function applyNafAndUnilorinIssuerChecks20261020(job: CareerOpportunity): CareerOpportunity {
  if (job.slug === "nigerian-air-force-airmen-airwomen-recruitment-2026") {
    // The canonical record was reverified on 24 October with the issuer's
    // new 22 October BMTC aptitude-test invitation. Do not overwrite
    // its details with this older 20 October snapshot.
    return job;
  }
  if (job.slug === "unilorin-careers") {
    return {
      ...job,
      verifiedAt: "2026-10-20",
      summary: "The University of Ilorin recruitment portal currently describes academic, administrative and technical vacancies. Applicants can select a listed position, create an account, complete academic details and upload credentials; the issuer notes that technical positions require a computer proficiency test. Confirm the exact vacancy's current availability before submitting.",
      nextMilestone: "Use the University's current recruitment portal for the exact position. The site names professors, associate professors, lecturers, administrative officers, executive officers and technical roles, but does not establish a universal closing date for all categories.",
      requirements: [
        "Read the current official category-specific notice; the portal advertises academic, administrative and technical positions with different qualification requirements.",
        "Technical-role applicants should prepare for the computer proficiency test identified by the University's recruitment portal.",
        "Create an applicant account, complete the academic and personal profile, and upload only the documents required by the selected position.",
        "Confirm the selected role's closing date and receipt/confirmation with the issuer. The site does not publish one closing date for all categories.",
      ],
      applicationSteps: [
        "Open the University of Ilorin recruitment portal and choose a currently listed academic, administrative or technical position.",
        "Check its current eligibility and the official notice rather than applying based on a previous recruitment round.",
        "Create your applicant account, fill in personal and academic history, and upload your CV, certificates and other role-required documents.",
        "For technical positions, follow the listed computer proficiency test requirement and check any separate issuer instructions.",
        "Submit through the university portal, retain the acknowledgement if provided, and use recruitment@unilorin.edu.ng for technical support rather than an unofficial intermediary.",
      ],
      sourceNotes: [
        "Issuer portal rechecked 20 October 2026: it advertises academic, administrative and technical categories, an applicant account/profile upload sequence and a computer proficiency test for technical positions.",
        "The recruitment portal lists recruitment@unilorin.edu.ng for technical support. It does not confirm a common closing date or guaranteed submission for every role.",
      ],
      sources: job.sources.map(source => source.url === "https://careers.unilorin.edu.ng/"
        ? { ...source, lastChecked: "2026-10-20" } : source),
    };
  }
  return job;
}

/** A single source-specific and expiring UNILORIN employer-directory review. */
export function hasSourceMatchedUnilorinReview20261020(job: CareerOpportunity, today: string): boolean {
  if (job.slug !== "unilorin-careers" ||
      job.kind !== "career-page" || job.status !== "career-page" ||
      job.officialUrl !== "https://careers.unilorin.edu.ng/" ||
      job.verifiedAt !== "2026-10-20" || job.deadline || job.posting ||
      !job.summary.includes("academic, administrative and technical vacancies") ||
      !job.summary.includes("computer proficiency test") ||
      !job.sourceNotes.some(note => note.includes("Issuer portal rechecked 20 October 2026")) ||
      !job.applicationSteps.some(step => step.includes("recruitment@unilorin.edu.ng")) ||
      !job.requirements.some(step => step.includes("computer proficiency test")) ||
      job.applicationSteps.length !== 5 || job.requirements.length !== 4 ||
      !job.sources.some(source => source.url === "https://careers.unilorin.edu.ng/" &&
        source.lastChecked === "2026-10-20")) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(today) || today < "2026-10-20") return false;
  const days = (Date.parse(today + "T00:00:00Z") - Date.parse("2026-10-20T00:00:00Z")) / 86400000;
  return Number.isFinite(days) && days >= 0 && days <= 14;
}
