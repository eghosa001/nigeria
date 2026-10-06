export type SearchQueryOverride = Partial<{
  fee: string;
  requirements: string;
  online: string;
  timeline: string;
  start: string;
}>;

/**
 * Populate only from real Search Console query wording once impressions exist.
 * Answers remain derived from verified Service data; this layer changes wording only.
 */
export const searchQueryOverrides: Record<string, SearchQueryOverride> = {
  "nin-enrolment": {
    fee: "Is NIN registration free in Nigeria?",
    requirements: "What do I need for NIN registration or enrolment?",
    online: "Where is the official NIMC NIN registration route?",
    timeline: "How long does NIN registration and NIN slip collection take?",
    start: "How do I register for a NIN in Nigeria?",
  },
  "nrs-tax-id-retrieval": {
    fee: "Is Nigerian Tax ID or TIN retrieval free?",
    requirements: "What do I need to retrieve my Nigerian Tax ID with NIN or CAC?",
    online: "Where is the official Nigerian Tax ID or TIN portal?",
    timeline: "How long does Tax ID retrieval take in Nigeria?",
    start: "How do I retrieve my Tax ID or TIN in Nigeria?",
  },
  "jamb-caps": {
    fee: "Is there a fee to check admission status on JAMB CAPS?",
    requirements: "What do I need to check JAMB CAPS admission status?",
    online: "Where is the official JAMB CAPS login for 2026/2027?",
    timeline: "When should I check JAMB CAPS for admission?",
    start: "How do I check and accept admission on JAMB CAPS?",
  },
  "cac-business-name-registration": {
    fee: "How much is CAC business name registration?",
    requirements: "What documents do I need for CAC business name registration?",
    online: "Where is the official CAC registration portal?",
    timeline: "How long does CAC business name registration take?",
    start: "How do I register a business name with CAC?",
  },
  "cac-company-registration": {
    fee: "How much is CAC company registration and payment?",
    requirements: "What CAC registration form and documents do I need?",
    online: "Can I complete the CAC registration process online?",
    timeline: "How long does CAC company registration take?",
    start: "What is the CAC registration process?",
  },
  "cac-status-report": {
    fee: "How much does a CAC status report cost?",
    requirements: "What do I need to get a CAC report?",
    online: "Can I get a CAC status report online?",
    timeline: "How long does a CAC status report take?",
    start: "How do I get a CAC report or status report?",
  },
  "ecowas-travel-certificate": {
    fee: "How much is the ECOWAS Travel Certificate in Nigeria?",
    requirements: "What are the requirements for an ECOWAS Travel Certificate?",
    online: "Where is the ECOWAS Travel Certificate application form?",
    timeline: "How long does an ECOWAS Travel Certificate take in Nigeria?",
    start: "How do I apply for an ECOWAS Travel Certificate in Nigeria?",
  },
  "lost-nigerian-passport": {
    fee: "How much does it cost to replace a lost Nigerian passport?",
    requirements: "What documents do I need to replace a lost Nigerian passport?",
    online: "Can I replace a lost Nigerian passport online?",
    timeline: "How long does replacement of a lost Nigerian passport take?",
    start: "Where do I start replacing a lost Nigerian passport?",
  },
  "new-drivers-licence": {
    fee: "How much is a new driver's licence in Nigeria?",
    requirements: "What are the requirements for a new Nigerian driver's licence?",
    online: "Can I apply for a Nigerian driver's licence online?",
    timeline: "How long does a new Nigerian driver's licence take?",
    start: "How do I get a new driver's licence in Nigeria?",
  },
  "nin-date-of-birth-modification": {
    fee: "How much is correction of date of birth on NIN?",
    requirements: "What do I need to change my date of birth on NIN?",
    online: "Can I change my NIN date of birth online?",
    timeline: "How long does NIN date of birth modification take?",
    start: "How do I correct my date of birth on NIN?",
  },
  "nin-phone-modification": {
    fee: "How much is NIN phone number modification?",
    requirements: "Do I need a police report for NIN phone number change?",
    online: "Can I change my NIN phone number online?",
    timeline: "How long does NIN phone number modification take?",
    start: "How do I change the phone number on my NIN?",
  },
  "nysc-relocation": {
    fee: "How much does NYSC relocation cost?",
    requirements: "What documents are needed for NYSC relocation?",
    online: "Can I apply for NYSC relocation online?",
    timeline: "How long does NYSC relocation take?",
    start: "How do I apply for NYSC relocation?",
  },
  "passport-change-of-data": {
    fee: "How much is change of data on a Nigerian passport?",
    requirements: "What documents are needed to change data on a Nigerian passport?",
    online: "Can I change Nigerian passport data online?",
    timeline: "How long does Nigerian passport data correction take?",
    start: "How do I change or correct data on my Nigerian passport?",
  },
  "npc-check-attestation-status": {
    fee: "Is there a fee to check NPC birth attestation status?",
    requirements: "What do I need to check my NPC attestation status?",
    online: "Can I check NPC birth attestation status online?",
    timeline: "How long does NPC birth attestation approval take?",
    start: "How do I check my NPC birth attestation status?",
  },
  "nrs-refund-tracking": {
    fee: "Is there a fee to track an NRS tax refund?",
    requirements: "What do I need to track an NRS tax refund?",
    online: "Can I track my NRS tax refund online?",
    timeline: "How long does an NRS tax refund take?",
    start: "How do I track a tax refund on the NRS portal?",
  },
  "china-tourist-visa-nigeria": {
    fee: "How much is a China tourist visa from Nigeria?",
    requirements: "What are the China tourist visa requirements for Nigerians?",
    online: "Can Nigerians apply for a China tourist visa online?",
    timeline: "How long does a China visa take in Nigeria?",
    start: "How do I apply for a China tourist visa from Nigeria?",
  },
  "police-character-certificate": {
    fee: "How much is a Police Character Certificate in Nigeria for diaspora applicants?",
    requirements: "What do I need for a Nigerian Police Character Certificate?",
    online: "Can I apply for a Police Character Certificate online through POSSAP?",
    timeline: "How long does a Nigerian Police Character Certificate take?",
    start: "How do I get a Police Character Certificate in Nigeria?",
  },
  "nigeria-landing-exit-card": {
    online: "Can I complete the Nigeria landing and exit card online?",
    start: "How do I complete Nigeria's landing and exit card?",
  },
  "bvn-retrieval": {
    fee: "How much does it cost to retrieve my BVN?",
    online: "Can I retrieve BVN from the NIBSS online portal or by USSD?",
    start: "How do I retrieve my BVN number?",
  },
  "jamb-direct-entry-2026": {
    fee: "How much is the JAMB Direct Entry form for 2026?",
    requirements: "What do I need for JAMB Direct Entry registration?",
    start: "How do I get the JAMB Direct Entry form for 2026?",
  },
  "pencom-open-rsa": {
    requirements: "Do I need NIN for RSA registration?",
    online: "Can I open an RSA online?",
    start: "How do I register for an RSA pension account in Nigeria?",
  },
  "pencom-transfer-rsa": {
    requirements: "What do I need to transfer my pension PFA?",
    start: "How do I transfer my pension PFA?",
  },
  "npc-birth-attestation": {
    requirements: "What do I need for NPC birth attestation?",
    online: "Can I apply for NPC birth attestation online?",
    start: "How do I get a birth attestation from the National Population Commission?",
  },
  "passport-renewal": {
    fee: "How much is Nigerian passport renewal?",
    requirements: "What do I need to renew a Nigerian passport?",
    online: "Can I renew my Nigerian passport online?",
    timeline: "How long does Nigerian passport renewal take?",
    start: "How do I renew my Nigerian passport?",
  },
  "anambra-asin-registration": {
    requirements: "What do I need for ASIN registration?",
    online: "Can I complete ASIN registration online?",
    start: "Where is the ASIN registration online portal?",
  },
  "nip-transfer-status": {
    online: "Can I check NIP transfer status online?",
    start: "How do I use the NIP status checker?",
  },
  "customs-846-non-standard-vin": {
    requirements: "What do I need for a Customs 846 e-Application?",
    online: "Can I complete the Customs 846 verification online?",
    start: "Where is the Customs 846 e-Application verification portal?",
  },
  "scuml-certificate-registration": {
    requirements: "What do I need for SCUML registration?",
    online: "Can I complete SCUML registration online?",
    start: "Where do I log in for SCUML registration?",
  },
  "pencom-job-loss-25-percent-withdrawal": {
    requirements: "What are the requirements for 25 percent pension withdrawal?",
    start: "How do I apply for a 25 percent pension withdrawal after job loss?",
  },
  "passport-application-tracking": {
    online: "Can I track my Nigerian passport application online?",
    start: "How do I check my Nigerian passport application status?",
  },
  "inec-replace-lost-damaged-pvc": {
    requirements: "What do I need to replace a lost or damaged PVC?",
    online: "Can I replace a lost or damaged PVC online?",
    start: "How do I replace a lost or damaged PVC with INEC?",
  },
  "inec-voter-transfer": {
    requirements: "What do I need to transfer my INEC voter registration?",
    online: "Can I transfer my voter registration online?",
    start: "How do I transfer my INEC voter registration to a new location?",
  },
  "ninauth-nin-verification": {
    requirements: "What do I need to verify my identity with NINAuth?",
    online: "Can I verify or share my NIN identity with the NINAuth app?",
    start: "How do I use NINAuth for NIN verification?",
  },
  "ogun-tax-clearance-certificate": {
    requirements: "What do I need for an Ogun State tax clearance certificate?",
    online: "Can I apply for or verify an Ogun eTCC online?",
    start: "How do I get an Ogun State tax clearance certificate?",
  },
  "neco-purchase-result-token": {
    requirements: "What do I need to buy a NECO result token?",
    online: "Can I purchase a NECO result token online?",
    start: "How do I buy a NECO result token on the official portal?",
  },
  "pencom-micro-pension-registration": {
    requirements: "What do I need for Micro Pension account registration?",
    online: "Can I register for Micro Pension through a licensed PFA?",
    start: "How do I register for a Micro Pension account in Nigeria?",
  },
};
