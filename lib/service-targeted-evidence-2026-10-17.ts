import type { Service } from "@/lib/types";

// October 17 issuer evidence for 20 existing services. No new pages, new fees,
// fabricated outcomes, changed indexability or altered primary portal routes.
type Amendment = { answer: string; action: string; caution: string; source: string };
export const targetedServiceEvidence20261017: Record<string, Amendment> = {
  "nelfund-student-loan-application": {
    "answer": "NELFUND's student loan is interest-free but repayable, not a grant. The approved amount may include institutional charges and separate upkeep. An account login or school record match does not establish that funding has been approved or disbursed.",
    "action": "Before accepting the loan declaration, read the Fund's terms on repayment, employer updates and the approved fee/upkeep amounts, then keep the application reference for separate disbursement follow-up.",
    "caution": "NELFUND's terms distinguish the institution receiving approved fees from the student's upkeep account. A student's upkeep entry can still be pending after a school-fee transfer; do not pay an agent to 'release' either component.",
    "source": "https://www.nelf.gov.ng/terms"
  },
  "nigeria-business-visa": {
    "answer": "The Nigerian NIS F4A business visa allows short meetings, training, trade fairs, negotiations and job interviews—not work in Nigerian employment. It is single-entry and grants up to 30 days' stay during a 90-day visa-validity window.",
    "action": "After approval, compare the entry validity and permitted stay printed on the F4A certificate. Carry the Nigerian company's invitation and CAC certificate when travelling rather than relying on a hotel reservation alone.",
    "caution": "The NIS F4A page prohibits employment. For hands-on maintenance or project installation, the host should check whether the R10 Temporary Work Permit is appropriate instead of describing technical work as a meeting.",
    "source": "https://immigration.gov.ng/info-center/business-single-entry-visa-f4a/"
  },
  "nigeria-tourism-visa": {
    "answer": "The NIS F5A visa is for tourism only, allowing a non-extendable 30-day single-entry stay inside its 90-day validity. Travellers should check exemptions such as ECOWAS before applying and provide the required return ticket, stay address and financial evidence.",
    "action": "For each travelling child, compare the passport, birth certificate and parent/guardian consent required by NIS; an adult's F5A certificate does not automatically cover children travelling on separate passports.",
    "caution": "NIS's tourism requirements call for a 180-day bank statement, unlike the transit F3B category's 30-day funds statement. The 90-day visa-validity period is not a permission to remain for 90 days.",
    "source": "https://immigration.gov.ng/info-center/tourism-visa-f5a/"
  },
  "nigeria-visiting-visa": {
    "answer": "The NIS F6A Visiting Visa covers social visits to relatives or friends, with a host letter accepting immigration responsibility. The host must provide a Nigerian passport copy or, if not a Nigerian citizen, lawful residence-permit evidence.",
    "action": "Before submitting F6A, match the host's invitation, Nigerian address and identifying document. A hotel booking or invitation mentioning only friendship does not replace the host's accepted immigration-responsibility statement.",
    "caution": "F6A is distinct from F4A business activity: it is single-entry for a maximum 30-day stay during 90-day validity and prohibits employment. NIS also asks for a 180-day bank statement and minor-travel documents when applicable.",
    "source": "https://immigration.gov.ng/info-center/visiting-single-entry-visa-f6a/"
  },
  "nigeria-transit-visa": {
    "answer": "Nigeria's F3B visa is for travellers who must enter Nigeria during an onward journey, with a permitted stay no longer than seven days. Travellers staying airside on a qualifying connection should first check separate transit-without-visa rules.",
    "action": "Confirm with the airline whether baggage collection, an overnight hotel or a separate ticket requires passing Nigerian border control. If entering, match the F3B dates against the onward ticket and final-destination entry permission.",
    "caution": "NIS lists a 30-day bank statement, onward ticket and destination visa where relevant. F3B is not a short-term business or employment visa and cannot be extended merely because a flight changes.",
    "source": "https://immigration.gov.ng/info-center/transit-visa-f3b/"
  },
  "nigeria-temporary-work-permit": {
    "answer": "The R10 Temporary Work Permit is for foreign experts performing invited short, specialised assignments such as equipment installation, repairs or technical audits. The Nigerian host must first obtain Comptroller-General immigration pre-approval.",
    "action": "Obtain the NIS Visa Authority Letter from the inviting company before arranging travel, and compare its approved project and dates with the visa application rather than relying only on a private contract or job offer.",
    "caution": "NIS describes a single-entry assignment of up to 30 days; any possible extension requires an actual immigration decision. R10 is not a general route for taking up indefinite salaried employment in Nigeria.",
    "source": "https://immigration.gov.ng/info-center/temporary-work-permit-twp-visa-r10a/"
  },
  "e-cerpac-application": {
    "answer": "Choose the exact e-CERPAC residence class before applying: NIS lists categories for expatriate employees, free-zone workers, government/NGO staff, students and spouses of Nigerian citizens, each with a different document checklist.",
    "action": "On the official requirements page, open the applicant's exact R2A, R3A, R4A, R5A, R6A, R7A or N1A category and confirm whether the application is for a principal resident or dependant before uploading evidence.",
    "caution": "NIS's N1A page explicitly says no fee is required for a spouse-of-Nigerian-citizen application. Do not quote a general employee residence-permit charge to a spouse using N1A or treat an entry visa as residence approval.",
    "source": "https://cerpac.immigration.gov.ng/requirements?type=N1A"
  },
  "diaspora-contactless-passport-renewal": {
    "answer": "Eligible Nigerians abroad may renew through NIS Mobile contactless biometrics. NIS's April 2026 SLA lists an additional $100 contactless fee plus the overseas passport-booklet fee; enrolment success is separate from uploading a selfie or paying.",
    "action": "Confirm the specific Nigerian mission's current passport-booklet submission address and self-addressed envelope requirements before sending the original document; retain the payment receipt and app enrolment confirmation.",
    "caution": "The NIS 21-day target begins after successful enrolment where no local objection arises. Domestic renewal charges and timelines must not be copied into the diaspora contactless route.",
    "source": "https://immigration.gov.ng/wp-content/uploads/2026/04/SERVICE-LEVEL-AGREEMENT-2026_.pdf"
  },
  "passport-application-abroad": {
    "answer": "The NIS passport gateway distinguishes Apply from outside Nigeria from the domestic application. Nigerians abroad should select the embassy or consulate serving their location and follow mission-specific booking, document and biometric requirements.",
    "action": "Before attending or mailing anything to a Nigerian mission, match the passport category, existing booklet, NIN and appointment confirmation against that mission's current published instructions.",
    "caution": "A domestic 'Check Centre Availability' preview does not reserve an overseas appointment. Contactless renewal is a separate eligibility-dependent NIS Mobile process, not a blanket exemption from in-person collection or checks.",
    "source": "https://immigration.gov.ng/passports/"
  },
  "passport-centre-availability": {
    "answer": "The NIS domestic 'Check Centre Availability' tool is an advance view of the earliest available appointment dates, not a booking. Only the separate Book Appointment step after a valid application can produce an actual slot.",
    "action": "Compare centre locations with the earliest displayed date, then complete the correct Fresh, Renewal or Correction of Data transaction and save the booked appointment notice from the genuine NIS application.",
    "caution": "Dates can change between a preview and an actual booking. The same portal also offers Test Photo Upload, which only checks file compliance and does not waive the biometric appointment.",
    "source": "https://passport.immigration.gov.ng/"
  },
  "nrs-refund-tracking": {
    "answer": "The NRS taxpayer self-service homepage places refunds inside a logged-in Refunds section labelled 'Track requests'. This is different from the Payments and Tax Wallet tools; the public page does not promise a payment date or publish a universal refund reference format.",
    "action": "If an existing refund is not shown, verify the taxpayer identity and whether the refund was submitted under the correct company or individual login, then seek NRS support before opening a duplicate request.",
    "caution": "NRS displays SSO, TaxPro Max and Rev360 login routes. A legitimate refund process should take place within the authorised taxpayer account, not by paying a third party to unlock an alleged refund.",
    "source": "https://selfservice.nrs.gov.ng/"
  },
  "nrs-corporate-tax-registration": {
    "answer": "NRS Corporate registration is for businesses incorporated with CAC under CAMA. Individuals, Non-Residents and Free Trade Zone entities have separate application choices, so an owner should not use their personal NIN as a substitute for a corporate account.",
    "action": "Compare company name, CAC registration details and authorised contact before submitting the Corporate form; if interrupted, choose Continue Registration using the original Registration ID.",
    "caution": "The NRS category page explicitly separates registered corporate entities from FTZ and non-resident registrants. Selecting a business label on the first screen is not confirmation that taxpayer registration, filing or compliance is complete.",
    "source": "https://selfservice.nrs.gov.ng/registration"
  },
  "nrs-individual-tax-registration": {
    "answer": "The NRS Individuals route is for NIN-based taxpayer registration, while Corporate, Non-Resident and Free Trade Zone have their own entry points. Tax category choice must reflect the applicant's legal circumstances rather than a convenient form name.",
    "action": "Use NRS Continue Registration with the saved Registration ID after an interrupted attempt and later confirm that the harmonised Tax ID belongs to the same NIN-linked legal identity.",
    "caution": "NRS lists non-resident persons under its Individuals description while also showing a separate Non-Resident button. Applicants unsure of the appropriate category should clarify tax status with NRS instead of creating competing registrations.",
    "source": "https://selfservice.nrs.gov.ng/registration"
  },
  "nrs-tax-clearance-certificate": {
    "answer": "The NRS portal labels Tax Clearance 'Download TCCs', distinct from Self Tax Filing, Payments and Assessments. A taxpayer who has registered but not met applicable filing and compliance requirements is not automatically entitled to a downloadable certificate.",
    "action": "When the TCC is unavailable, inspect the correct account's assessment and return status before attempting payment; verify any tax liability in NRS rather than sending an outside 'certificate processing' fee.",
    "caution": "The public taxpayer homepage does not give one universal processing time or TCC fee. NRS SSO and legacy TaxPro Max/Rev360 are sign-in options, not independent ways to generate additional Tax IDs.",
    "source": "https://selfservice.nrs.gov.ng/"
  },
  "nrs-tax-id-retrieval": {
    "answer": "Tax ID retrieval confirms a harmonised existing taxpayer identity: NIN with matching name/date of birth for individuals and CAC record for companies. It is distinct from taxpayer registration and does not prove that taxes have been paid.",
    "action": "If the NRS retrieval rejects the record, compare individual first name, surname and birth date with NIMC—or the corporate name and RC number with CAC—before submitting again or asking NRS/JRB to resolve the mismatch.",
    "caution": "The official portal requires consent to identity verification and includes Individual, Corporate and Others sections. Do not upload another person's NIN or request a second Tax ID to bypass a record-matching problem.",
    "source": "https://taxid.nrs.gov.ng/how-it-works"
  },
  "fct-tax-clearance-application": {
    "answer": "FCT-IRS's TCC checklist separates PAYE employees from self-employed/business applicants. Employees require Form A/Form 802 and employer declaration/remittance evidence where applicable; the agency's published 14-day service target presumes a complete and valid tax position.",
    "action": "Salaried applicants should obtain the employer's Form H1/Form G and three-year income records before filing. Independent earners should use the appropriate business or partnership checklist rather than substituting a payslip for taxable income evidence.",
    "caution": "FCT-IRS describes processing as free, but unpaid tax liabilities are not waived. The published 14-day target is not a guarantee when PAYE remittances or taxpayer identity records require assessment.",
    "source": "https://fctirs.gov.ng/tax-clearance-certificate-tcc-checklist/"
  },
  "ogun-tax-clearance-certificate": {
    "answer": "Ogun State's eTCC covers the three preceding tax years and is issued to individuals whose paid tax record is verified. OGIRS says ordinary certificate processing is free and that its 72-hour target applies only after correct payment and document submission.",
    "action": "Salaried workers should request a three-year employer income/remittance letter; self-employed applicants should take payment receipts for those years to their respective Ogun assessment authority.",
    "caution": "The OGIRS FAQ separates free ordinary issue from replacing a lost eTCC: the latter requires police report and affidavit and lists a ₦2,500 reissue charge. Do not confuse tax payment with a processing fee.",
    "source": "https://www.ogunstaterevenue.com/en/etcc"
  },
  "tinted-glass-permit": {
    "answer": "POSSAP is the police's official tinted-glass permit application route. The process checks the applicant, vehicle identity, ownership documents and biometrics; payment of an application invoice is not itself a valid police permit.",
    "action": "Compare the registration number and VIN on the vehicle licence and ownership record before submitting, then retain the POSSAP invoice and official biometric/permit status rather than relying on a payment screenshot.",
    "caution": "Official police announcements and relevant court proceedings can affect current enforcement. Applicants should verify the latest police position rather than assuming an old 2025 or early-2026 social-media deadline is still binding.",
    "source": "https://possap.gov.ng/"
  },
  "yellow-card": {
    "answer": "The Yellow Card is the International Certificate of Vaccination for yellow fever, not a card that can be bought as a substitute for immunisation. The NCDC advises taking the vaccine at least ten days before qualifying international travel.",
    "action": "Before vaccination, disclose pregnancy, immune suppression, relevant allergies and older age to a Port Health clinician; if vaccination is medically unsafe, ask about the correct clinical exemption and destination-entry implications.",
    "caution": "The NCDC says one dose usually provides lifelong protection. However, passport details and travel-entry requirements should still be verified, and an official e-card must correspond to legitimate vaccination records.",
    "source": "https://www.ncdc.gov.ng/news/200/yellow-fever-faqs"
  },
  "lagos-building-completion-certificate": {
    "answer": "LASBCA issues the Lagos Certificate of Completion and Fitness for Habitation/Use only after satisfactory final construction inspection. An approved development plan, green sticker or contractor's handover note is not the completed-building certificate.",
    "action": "Arrange final inspection through LASBCA with the approved plan and responsible architect/engineer, resolve any cited structural or safety defect, and verify the issued certificate using the building-plan and certificate numbers.",
    "caution": "LASBCA's FAQ says the owner must send a completion notice for final inspection; the independent online Verify Certificate service is not the same as permission to occupy a building that has not passed inspection.",
    "source": "https://lasbca.lagosstate.gov.ng/lasbca-verify/"
  }
};

export function applyTargetedServiceEvidence20261017(service: Service): Service {
  const item = targetedServiceEvidence20261017[service.slug];
  if (!item) return service;
  const sources = [...service.sources];
  if (!sources.some(source => source.url === item.source)) sources.push({
    agency: service.agencySlug.toUpperCase(),
    label: service.agencySlug.toUpperCase() + " original issuer evidence",
    url: item.source, lastChecked: "2026-10-17"
  });
  return {
    ...service,
    summary: item.answer,
    steps: service.steps.includes(item.action) ? service.steps : [...service.steps, item.action],
    notes: service.notes.includes(item.caution) ? service.notes : [...service.notes, item.caution],
    sources,
    // A new evidence link does not prove every existing field was verified again.
    lastVerified: service.lastVerified
  };
}
