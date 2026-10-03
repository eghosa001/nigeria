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
    online: "Can I apply for an ECOWAS Travel Certificate online?",
    timeline: "How long does an ECOWAS Travel Certificate take in Nigeria?",
    start: "How do I apply for an ECOWAS Travel Certificate in Nigeria?",
  },
  "lost-nigerian-passport": {
    fee: "How much does it cost to replace a lost Nigerian passport?",
    requirements: "What documents do I need to replace a lost Nigerian passport?",
    online: "Can I report and replace a lost Nigerian passport online?",
    timeline: "How long does replacement of a lost Nigerian passport take?",
    start: "What should I do if my Nigerian passport is lost?",
  },
  "new-drivers-licence": {
    fee: "How much is a new driver's licence in Nigeria?",
    requirements: "What are the requirements for a new Nigerian driver's licence?",
    online: "Can I apply for a Nigerian driver's licence online?",
    timeline: "How long does a new Nigerian driver's licence take?",
    start: "How do I get a new driver's licence in Nigeria?",
  },
  "nin-date-of-birth-modification": {
    fee: "How much is NIN date of birth correction?",
    requirements: "What do I need to change my date of birth on NIN?",
    online: "Can I change my NIN date of birth online?",
    timeline: "How long does NIN date of birth modification take?",
    start: "How do I correct my date of birth on NIN?",
  },
  "nin-phone-modification": {
    fee: "How much is NIN phone number modification?",
    requirements: "What do I need to change my phone number on NIN?",
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
    fee: "How much does Nigerian passport change of data cost?",
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
};
