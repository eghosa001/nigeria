import type { DetailedServiceGuidance } from "@/lib/service-guidance";

// Source-specific reader decisions, checked against ICAN's own 2026
// professional-student, examination and exemption pages on 17 October 2026.
// Neither online form proves successful payment or applicant approval.
const reviewed: Record<string, DetailedServiceGuidance> = {
  "ican-professional-exam-registration": {
    route: {
      startTitle: "Check exam and subscription status before paying",
      startDetail: "At icanportal.org/professional/newexams, choose eligible papers and the examination centre, confirm the current diet's instructions, pay online and submit the entry. The November 10–12 exam dates are not the registration cutoff; paying alone does not submit the exam form.",
      physicalTitle: "Selecting an exam centre is not a registration-office visit",
      physicalDetail: "ICAN's online entry form contains an Examination Centre selector. Attendance at that centre is for the actual exam, not an additional registration appointment.",
      fallbackTitle: "If subscription or payment blocks the form",
      fallbackDetail: "Keep the official transaction reference, check the student's financial status and contact ICAN support before another payment. The May 2026 notice required online payment, while an older FAQ still mentions bank PayDirect; use the current diet notice.",
    },
    aftercare: [
      { title: "Confirm entry separately from payment", detail: "Keep the payment receipt and completed exam-entry acknowledgement. A card debit is not proof of a submitted entry." },
      { title: "Retrieve the actual exam docket", detail: "When released, use icanportal.org/professional/docket with your registration number and payment reference/PIN. Verify papers, centre and identity before travel." },
    ],
  },
  "ican-professional-exemption": {
    route: {
      startTitle: "Match your qualification to ICAN's exemption table",
      startDetail: "Before paying, compare your qualification and institution accreditation with ICAN's exemption guide. The form at icanportal.org/professional/Exemptions asks for registration/PIN, referee membership number, school, discipline and qualification year.",
      physicalTitle: "The checked exemption application form is online",
      physicalDetail: "ICAN's public exemption form does not establish a mandatory office visit for every applicant. Ask ICAN if your individual qualification needs further verification.",
      fallbackTitle: "If your category or fee is unclear",
      fallbackDetail: "Stop before payment. ICAN warns that a wrong exemption payment is not refundable. Seek an official category assessment and wait for approved status before skipping any exam papers.",
    },
    aftercare: [
      { title: "Keep application evidence", detail: "Save the official payment reference and exemption submission acknowledgement; neither alone is proof of approval." },
      { title: "Verify approved papers", detail: "Compare the granted exemption with the papers available in your student Examination Status before the next exam diet." },
    ],
  },
};

export function getReviewedIcanGuidance(slug: string): DetailedServiceGuidance | undefined {
  return reviewed[slug];
}
