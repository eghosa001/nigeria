export const serviceSeoTitleTemplates: Record<string, string> = {
  "ecowas-travel-certificate": "ECOWAS Travel Certificate Price {year}: Form & Requirements",
  "check-nin-number": "How to Check NIN {year}: *346# Retrieval Guide",
  "nin-phone-modification": "Change NIN Phone Number {year}: Fee, Police Report & Steps",
  "passport-change-of-data": "Nigerian Passport Change of Data {year}: Cost & Requirements",
  "npc-check-attestation-status": "NPC Birth Attestation Status {year}: Check & Download",
  "lost-nigerian-passport": "Lost Nigerian Passport {year}: Replacement & Requirements",
  "police-character-certificate": "Police Character Certificate Nigeria {year}: Cost & Apply",
  "nigeria-landing-exit-card": "Nigeria Landing & Exit Card {year}: Online Form & Guide",
  "passport-renewal": "Nigerian Passport Renewal {year}: Fee & Requirements",
  "npc-birth-attestation": "NPC Birth Attestation {year}: Requirements & Application",
  "jamb-admission-letter": "JAMB Admission Letter {year}: How to Print Online",
  "jamb-print-result": "JAMB Result {year}: Check & Print Result Slip",
  "jamb-examination-slip-2026": "JAMB Reprint {year}: Print Examination Slip & Venue",
  "waec-check-result": "WAEC Result Checker {year}: Check Result Online",
  "neco-check-result": "NECO Result Checker {year}: Check Result Online",
  "jamb-caps": "JAMB CAPS {year}: Check Admission Status & Accept Admission",
  "cac-company-registration": "CAC Company Registration {year}: Cost, Portal & Steps",
  "cac-business-name-registration": "CAC Business Name Registration {year}: Cost, Portal & Steps",
  "jamb-direct-entry-2026": "JAMB Direct Entry {year}: Form, Fee & Registration",
  "pencom-open-rsa": "Open Pension RSA in Nigeria {year}: Requirements & Steps",
  "pencom-transfer-rsa": "Transfer Pension PFA {year}: Requirements & Steps",
  "nrs-individual-tax-registration": "NRS Taxpayer Registration {year}: How to Register",
  "passport-name-change": "Passport Name Change Nigeria {year}: Requirements & Fees",
  "jamb-matriculation-list": "JAMB Matriculation List {year}: Check Your Name Online",
  "jamb-regularization-condonement": "JAMB Regularization {year}: Condonement Fee & Steps",
  "cac-public-search": "CAC Public Search {year}: Verify Company or Business",
  "bvn-validation": "BVN Validation {year}: Check a BVN with *565*1#",
  "bvn-data-update": "BVN Correction {year}: Update Name, DOB or Other Details",
  "nrs-tax-id-retrieval": "Nigeria Tax ID Retrieval {year}: Find Tax ID with NIN or CAC",
  "unclaimed-dividends-nigeria": "Unclaimed Dividends Nigeria {year}: Check & Claim",
  "passport-application-tracking": "Nigerian Passport Tracking {year}: Check Application Status",
  "drivers-licence-verification": "Driver's Licence Verification Nigeria {year}: Check Online",
  "waec-2026-private-candidates-timetable": "WAEC Timetable {year}: Private Candidates Second Series",
  "neco-2026-timetable": "NECO Timetable {year}: Download Official SSCE Timetable",
  "ninauth-nin-verification": "NIN Verification {year}: Use the Official NINAuth App",
  "nabteb-result-checker": "NABTEB Result Checker {year}: Check Result Online",
  "nelfund-student-loan-application": "NELFUND Portal {year}: Student Loan Application & Login",
  "nelfund-loan-status-and-upkeep": "NELFUND Status {year}: Loan & Upkeep Payment Guide",
  "anambra-asin-registration": "ASIN Registration Online {year}: Anambra Portal & Steps",
  "nip-transfer-status": "NIP Status Checker {year}: Check Bank Transfer Status",
  "lagos-lasrra-registration": "LASRRA Registration Online {year}: Lagos Portal & Steps",
  "customs-846-non-standard-vin": "Customs 846 e-Application {year}: Verify Non-Standard VIN",
  "bvn-retrieval": "How to Check BVN {year}: *565*0# Retrieval, Fee & Steps",
  "npc-child-birth-registration": "NPC Birth Registration {year}: Certificate, Portal & Steps",
  "scuml-certificate-registration": "SCUML Registration {year}: Login, Certificate & Status",
  "pencom-job-loss-25-percent-withdrawal": "25% Pension Withdrawal Nigeria {year}: Eligibility & Steps",
  "ogun-tax-clearance-certificate": "Ogun Tax Clearance Certificate {year}: eTCC, Fee & Verify",
};

export function getServiceSeoTitleOverride(slug: string, year: string) {
  const template = serviceSeoTitleTemplates[slug];
  return template ? template.replaceAll("{year}", year) : null;
}


export const serviceSeoDescriptionTemplates: Record<string, string> = {
  "nin-phone-modification": "Change the phone number on your NIN in {year}: ₦2,000 NIMC fee, police-report rule, requirements, steps and official self-service portal.",
  "nigeria-landing-exit-card": "Nigeria Landing & Exit Card {year}: who must complete it, what details you need, when to submit, and the official NIS online form. Free.",
  "anambra-asin-registration": "ASIN registration online {year}: Anambra AIRS portal, applicant types, requirements and step-by-step enumeration for individuals and businesses.",
  "passport-change-of-data": "Nigerian passport change of data {year}: requirements, supporting documents, fees/status, online application and biometric capture steps.",
  "cac-business-name-registration": "CAC business name registration {year}: name reservation, proprietor details, registration steps, fees and the official CAC CRP.",
  "passport-renewal": "Nigerian passport renewal {year}: current NIS fees, NIN and passport requirements, online reissue steps and official application portal.",
  "ecowas-travel-certificate": "ECOWAS Travel Certificate {year}: current price, requirements, application steps and the official Nigeria Immigration Service route.",
};

export function getServiceSeoDescriptionOverride(slug: string, year: string) {
  const template = serviceSeoDescriptionTemplates[slug];
  return template ? template.replaceAll("{year}", year) : null;
}
