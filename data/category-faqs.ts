export type CategoryFaq = {
  question: string;
  answer: string;
  source: { label: string; url: string };
  relatedSlugs: string[];
};

export const categoryFaqs: Record<string, CategoryFaq[]> = {
  "Immigration": [
    {
      question: "Do I need a NIN before applying for or renewing a Nigerian passport?",
      answer: "Yes for the standard passport flows covered here. NIS starts fresh and renewal/reissue applications by verifying the applicant's NIN and date of birth. If the identity record is wrong, use the relevant NIN or passport data-correction route instead of entering conflicting details.",
      source: { label: "NIS standard passport guidance", url: "https://immigration.gov.ng/info-center/how-to-apply-for-standard-passport/" },
      relatedSlugs: ["first-nigerian-passport", "passport-renewal", "passport-change-of-data"]
    },
    {
      question: "Can I complete a Nigerian passport application entirely online?",
      answer: "The application, document upload, payment and appointment booking can start online, but NIS states that applicants must appear at the selected Immigration office for biometric capture.",
      source: { label: "NIS passport renewal guidance", url: "https://immigration.gov.ng/info-center/renewal-of-passport/" },
      relatedSlugs: ["passport-renewal", "first-nigerian-passport"]
    },
    {
      question: "What should I do if my Nigerian passport is lost or stolen?",
      answer: "Use the lost-passport replacement/reissue process rather than a normal expiry renewal. NIS requires supporting evidence for the loss, including a police extract and sworn affidavit, plus the other identity documents listed for replacement.",
      source: { label: "NIS lost passport replacement guidance", url: "https://immigration.gov.ng/info-center/how-to-apply-for-the-replacement-of-lost-passport/" },
      relatedSlugs: ["lost-nigerian-passport"]
    },
    {
      question: "Can a Nigerian abroad apply for a passport without returning to Nigeria?",
      answer: "Nigerians abroad should use the passport-abroad guide and the processing route for the relevant Nigerian mission or approved overseas passport centre. The exact appointment and biometric location depends on the country.",
      source: { label: "NIS passports information", url: "https://immigration.gov.ng/passports/" },
      relatedSlugs: ["passport-application-abroad"]
    }
  ],
  "Identity": [
    {
      question: "Which NIN details can be changed after enrolment?",
      answer: "NIMC lists names, date of birth, address, phone number and several place-of-birth/origin fields among the approved updatable fields. Each requested change needs the supporting evidence specified for that field.",
      source: { label: "NIMC NIN modifications guidance", url: "https://nimc.gov.ng/nin/nin-modifications-adults/" },
      relatedSlugs: ["nin-name-modification", "nin-date-of-birth-modification", "nin-phone-modification", "nin-address-modification"]
    },
    {
      question: "What document is needed for an adult NIN date-of-birth correction?",
      answer: "NIMC's adult modification guidance requires an NPC Letter of Attestation for applicants aged 18 and above, together with the other modification requirements shown by the official process.",
      source: { label: "NIMC NIN modifications guidance", url: "https://nimc.gov.ng/nin/nin-modifications-adults/" },
      relatedSlugs: ["nin-date-of-birth-modification", "npc-birth-attestation"]
    },
    {
      question: "Should I enrol for another NIN if my existing record has an error?",
      answer: "No. A NIN is a unique identity number. Use the appropriate NIMC modification service for an incorrect name, date of birth, phone number or address rather than creating a second identity record.",
      source: { label: "NIMC National Identification Number", url: "https://nimc.gov.ng/NIN" },
      relatedSlugs: ["nin-name-modification", "nin-date-of-birth-modification", "nin-phone-modification", "nin-address-modification"]
    },
    {
      question: "What if I have lost my NIN slip but still know my NIN?",
      answer: "Use the NIN slip reissue/download route. Losing the printed slip does not mean you should enrol for a new NIN.",
      source: { label: "NIMC NIN information", url: "https://nimc.gov.ng/NIN" },
      relatedSlugs: ["nin-slip-reissue", "nin-enrolment"]
    }
  ],
  "Driving": [
    {
      question: "Can someone else process my driver's licence for me?",
      answer: "No for the personal capture stages. FRSC's licence FAQ says the applicant must appear in person; the process includes identity checks and biometric capture.",
      source: { label: "Nigeria Driver's Licence FAQ", url: "https://nigeriadriverslicence.frsc.gov.ng/faq" },
      relatedSlugs: ["new-drivers-licence", "renew-drivers-licence"]
    },
    {
      question: "What is the difference between renewing and reissuing a driver's licence?",
      answer: "Use renewal when an existing licence is expiring or expired. Use reissue/replacement when a licence is lost, stolen, damaged or otherwise needs replacement. FRSC's portal exposes these as separate application paths.",
      source: { label: "Nigeria Driver's Licence portal", url: "https://nigeriadriverslicence.frsc.gov.ng/" },
      relatedSlugs: ["renew-drivers-licence", "replace-lost-drivers-licence"]
    },
    {
      question: "How do I add or upgrade a licence class?",
      answer: "FRSC says an upgrade is handled through renewal or reissue using the existing licence number. If the current licence is still valid, the FAQ directs applicants to reissue; if expired, use renewal.",
      source: { label: "Nigeria Driver's Licence FAQ", url: "https://nigeriadriverslicence.frsc.gov.ng/faq" },
      relatedSlugs: ["upgrade-drivers-licence-class"]
    },
    {
      question: "How do I track a driver's licence application?",
      answer: "Use the official Track DL Application Status option and provide the application ID or driver's licence number together with the applicant's date of birth.",
      source: { label: "Nigeria Driver's Licence FAQ", url: "https://nigeriadriverslicence.frsc.gov.ng/faq" },
      relatedSlugs: ["new-drivers-licence", "renew-drivers-licence", "replace-lost-drivers-licence"]
    }
  ],
  "Business": [
    {
      question: "Do I need a lawyer or accredited agent to register a business name?",
      answer: "CAC states that individual proprietors can register a business name without a legal practitioner, chartered accountant or chartered secretary. More complex company or trustee work may have different document and professional requirements.",
      source: { label: "CAC business name registration", url: "https://www.cac.gov.ng/services/business-name" },
      relatedSlugs: ["cac-business-name-registration"]
    },
    {
      question: "Do I need to reserve a name before registering with CAC?",
      answer: "CAC's company and business-name processes start with checking name availability and, where required by the selected registration flow, completing name reservation before the pre-registration filing.",
      source: { label: "CAC company registration", url: "https://www.cac.gov.ng/services/company-registration" },
      relatedSlugs: ["cac-name-reservation", "cac-company-registration", "cac-business-name-registration"]
    },
    {
      question: "Where do I file CAC annual returns?",
      answer: "Use the official Company Registration Portal. CAC publishes current annual-return notices there, so check the live portal for availability and any special instructions affecting older or newer registrations.",
      source: { label: "CAC Company Registration Portal", url: "https://icrp.cac.gov.ng/" },
      relatedSlugs: ["cac-annual-returns"]
    },
    {
      question: "Can I get electronic CAC certificates, status reports or certified copies online?",
      answer: "CAC's Company Registration Portal provides electronic registration documents and post-registration services. Use the exact guide for an e-certificate/status report or Certified True Copy so you choose the correct request.",
      source: { label: "CAC Company Registration Portal", url: "https://icrp.cac.gov.ng/" },
      relatedSlugs: ["cac-status-report", "cac-certified-true-copy", "cac-company-registration"]
    }
  ],
  "Education": [
    {
      question: "How do I generate a JAMB profile code?",
      answer: "JAMB's FAQ says to send NIN, a space and the 11-digit NIN to 55019 or 66019 from the phone number that will be tied to the candidate's JAMB record.",
      source: { label: "JAMB FAQ", url: "https://www.jamb.gov.ng/FAQ" },
      relatedSlugs: ["jamb-profile-code", "jamb-retrieve-profile-code"]
    },
    {
      question: "Can two JAMB candidates use the same phone number?",
      answer: "JAMB says two candidates cannot use the same mobile number for registration. The phone number becomes part of the candidate's transaction trail, so use a number the candidate can keep accessing.",
      source: { label: "JAMB FAQ", url: "https://www.jamb.gov.ng/FAQ" },
      relatedSlugs: ["jamb-profile-code", "jamb-2026-utme-registration"]
    },
    {
      question: "Can I register for JAMB more than once if I made a mistake?",
      answer: "No. JAMB says candidates must not register more than once. Use the Board's correction process for errors rather than buying another application.",
      source: { label: "JAMB FAQ", url: "https://www.jamb.gov.ng/FAQ" },
      relatedSlugs: ["jamb-2026-utme-registration", "jamb-direct-entry-2026"]
    },
    {
      question: "Can I combine WAEC school and private-candidate results for admission?",
      answer: "WAEC's Nigeria FAQ says School Candidate and Private Candidate WASSCE results can be combined for admission purposes, subject to the admission rules of the institution receiving them.",
      source: { label: "WAEC Nigeria FAQ", url: "https://www.waecnigeria.org/faq" },
      relatedSlugs: ["waec-check-result", "waec-digital-certificate"]
    },
    {
      question: "How do I correct an error on a WAEC certificate?",
      answer: "WAEC says a private candidate sends the amendment request directly to WAEC, while a school candidate routes the request through the school principal. The original certificate is part of the amendment process.",
      source: { label: "WAEC Nigeria FAQ", url: "https://www.waecnigeria.org/faq" },
      relatedSlugs: ["waec-correct-certificate-error"]
    },
    {
      question: "What do I need to check a NECO result?",
      answer: "The official NECO results portal asks for the examination year, examination type, result token and registration number. A token can be purchased from the portal when needed.",
      source: { label: "NECO Results Portal", url: "https://results.neco.gov.ng/" },
      relatedSlugs: ["neco-check-result", "neco-purchase-result-token"]
    }
  ],
  "Youth service": [
    {
      question: "What if my name is not on the NYSC Senate list?",
      answer: "NYSC says locally trained graduates can register only when their names are on the Senate/Academic Board Approved Result list submitted by their institution. NYSC directs candidates with a missing name to contact the institution.",
      source: { label: "NYSC FAQ", url: "https://www.nysc.gov.ng/faq.html" },
      relatedSlugs: ["nysc-senate-list", "nysc-registration-local"]
    },
    {
      question: "Do part-time graduates still register on the NYSC portal?",
      answer: "Yes. NYSC's FAQ says part-time graduates register when the portal opens so they can print their Exclusion Letter from the dashboard.",
      source: { label: "NYSC FAQ", url: "https://www.nysc.gov.ng/faq.html" },
      relatedSlugs: ["nysc-registration-local", "nysc-exemption-certificate"]
    },
    {
      question: "Which NYSC details can I correct after registration?",
      answer: "NYSC lists self-service corrections for name spelling/rearrangement, date of birth, course of study, class of degree and qualification. Some corrections depend on approval by the institution or other evidence, and NYSC says name correction is not for adding or removing names.",
      source: { label: "NYSC FAQ", url: "https://www.nysc.gov.ng/faq.html" },
      relatedSlugs: ["nysc-correct-date-of-birth", "nysc-correct-course-of-study"]
    },
    {
      question: "Do foreign-trained graduates need original documents at camp?",
      answer: "Yes. NYSC says foreign-trained prospective corps members should go to camp with the original documents uploaded during registration and translated versions where applicable.",
      source: { label: "NYSC FAQ", url: "https://www.nysc.gov.ng/faq.html" },
      relatedSlugs: ["nysc-foreign-trained-registration"]
    },
    {
      question: "Can I apply for relocation after camp?",
      answer: "NYSC lists relocation after camp among the self-service functions available on the prospective/corps member dashboard. Use the relocation guide for the current route and supporting evidence.",
      source: { label: "NYSC FAQ", url: "https://www.nysc.gov.ng/faq.html" },
      relatedSlugs: ["nysc-relocation"]
    }
  ],
  "Civil records": [
    {
      question: "What is the age difference between NPC birth registration and birth attestation?",
      answer: "NPC's FAQ states that birth registration is for ages 0 to 17, while birth attestation is for people aged 18 and above.",
      source: { label: "NPC Vital Registration FAQ", url: "https://www.nationalpopulation.gov.ng/faq-vitalreg" },
      relatedSlugs: ["npc-child-birth-registration", "npc-birth-attestation"]
    },
    {
      question: "Can I register a child who does not yet have a NIN?",
      answer: "NPC says yes. A child can be registered without a child NIN, but the parent or guardian must provide a valid NIN to complete the process.",
      source: { label: "NPC FAQ", url: "https://www.nationalpopulation.gov.ng/FAQs" },
      relatedSlugs: ["npc-child-birth-registration"]
    },
    {
      question: "How do I turn an old birth certificate into a digital certificate?",
      answer: "NPC directs holders of older birth certificates to the Certificate Reissuance service. Create or sign in to the NPC self-service account, link the required identity details and submit the reissuance request.",
      source: { label: "NPC FAQ", url: "https://www.nationalpopulation.gov.ng/FAQs" },
      relatedSlugs: ["npc-digital-birth-certificate-reissuance"]
    },
    {
      question: "Why does birth-attestation status show 'No Record Found'?",
      answer: "NPC says the status checker works after the birth-attestation process has been successfully completed. Keep the payment reference because NPC uses it to resume or check an application.",
      source: { label: "NPC Vital Registration FAQ", url: "https://www.nationalpopulation.gov.ng/faq-vitalreg" },
      relatedSlugs: ["npc-check-attestation-status", "npc-birth-attestation"]
    },
    {
      question: "Can I modify or reprint an NPC birth record?",
      answer: "NPC provides separate self-service routes for modification, certificate reprint and reissuance. The modification service states that only digitised birth attestation/registration records can be modified through that route.",
      source: { label: "NPC record modification service", url: "https://modification.nationalpopulation.gov.ng/" },
      relatedSlugs: ["npc-modify-birth-record", "npc-birth-certificate-reprint", "npc-digital-birth-certificate-reissuance"]
    }
  ],
  "Tax": [
    {
      question: "Which NRS registration option should I choose: individual, corporate or non-resident?",
      answer: "The NRS self-service registration page separates corporate entities, individuals, non-residents and free-trade-zone entities. Choose the category that matches the taxpayer being registered rather than creating the wrong profile type.",
      source: { label: "NRS taxpayer registration", url: "https://selfservice.nrs.gov.ng/registration" },
      relatedSlugs: ["nrs-individual-tax-registration", "nrs-corporate-tax-registration"]
    },
    {
      question: "Can I still use my old TaxPro Max credentials on the new NRS self-service system?",
      answer: "The current NRS self-service portal offers a TaxPro Max credential login path and a Rev360 credential setup path. Follow the option that matches the credentials you already have.",
      source: { label: "NRS Taxpayer Self-Service Portal", url: "https://selfservice.nrs.gov.ng/" },
      relatedSlugs: ["nrs-individual-tax-registration", "nrs-corporate-tax-registration"]
    },
    {
      question: "Where can I get or download an NRS tax clearance certificate?",
      answer: "The NRS self-service portal includes a Tax Clearance function. Use the tax-clearance guide for the current eligibility/status steps and download route.",
      source: { label: "NRS Taxpayer Self-Service Portal", url: "https://selfservice.nrs.gov.ng/" },
      relatedSlugs: ["nrs-tax-clearance-certificate"]
    },
    {
      question: "Can I track tax filing, payments and refunds from the same NRS portal?",
      answer: "The current self-service portal exposes self tax filing, payments, tax clearance, tax wallet, refunds and assessments from one account area.",
      source: { label: "NRS Taxpayer Self-Service Portal", url: "https://selfservice.nrs.gov.ng/" },
      relatedSlugs: ["nrs-self-tax-filing", "nrs-tax-payment", "nrs-refund-tracking"]
    }
  ],
  "State services": [
    {
      question: "How do I file an individual tax return in the FCT?",
      answer: "Use the FCT-IRS self-service portal and the Tax Returns > File Returns flow. The FCT guide on MyNigeriaGuide keeps the portal route and filing steps together.",
      source: { label: "FCT-IRS filing guide", url: "https://fctirs.gov.ng/faq/" },
      relatedSlugs: ["fct-file-individual-tax-return"]
    },
    {
      question: "How do I verify an FCT tax clearance certificate?",
      answer: "Use the official FCT-IRS verification route rather than relying on a screenshot or copy supplied by a third party. Compare the verification result with the certificate details.",
      source: { label: "FCT-IRS", url: "https://fctirs.gov.ng/" },
      relatedSlugs: ["fct-verify-tax-clearance"]
    },
    {
      question: "What is an Anambra ASIN?",
      answer: "AIRS describes ASIN as a unique, one-time Anambra State identity number used to access state services and revenue processes. Use the official AIRS registration channel.",
      source: { label: "Anambra Internal Revenue Service", url: "https://airs.an.gov.ng/" },
      relatedSlugs: ["anambra-asin-registration"]
    },
    {
      question: "Are Edo Tax ID, Anambra ASIN and Lagos Payer ID the same thing?",
      answer: "No. They belong to different state revenue systems. Use the guide for the state whose service or tax obligation you are dealing with instead of trying to reuse another state's identifier.",
      source: { label: "Lagos State Revenue Portal", url: "https://revenue.lagosstate.gov.ng/Login" },
      relatedSlugs: ["edo-tax-id-access", "anambra-asin-registration", "lagos-payer-id"]
    }
  ],
  "Banking": [
    {
      question: "How long after BVN enrolment should I expect a BVN?",
      answer: "NIBSS says a BVN can be obtained about 72 hours after enrolment once the enrolment data has synchronized with the NIBSS database.",
      source: { label: "NIBSS BVN enrolment help", url: "https://contactcentre.nibss-plc.com.ng/support/solutions/articles/47001264085-after-enrollment-when-will-the-data-subject-bvn-enrollee-obtain-the-bvn-" },
      relatedSlugs: ["bvn-enrolment"]
    },
    {
      question: "If I forget my BVN, do I need to enrol again?",
      answer: "No. Use an official retrieval route through your bank or the approved BVN retrieval process. BVN is designed as a single banking identity, so duplicate enrolment is not the solution to a forgotten number.",
      source: { label: "CBN BVN guidance", url: "https://www.cbn.gov.ng/PaymentsSystem/BVN.html" },
      relatedSlugs: ["bvn-retrieval"]
    },
    {
      question: "How do I change a wrong name, phone number or other BVN detail?",
      answer: "Use the bank or authorised update process described in the BVN change-details guide. The documents and verification needed depend on the field being corrected, so do not rely on an unofficial agent.",
      source: { label: "CBN BVN guidance", url: "https://www.cbn.gov.ng/PaymentsSystem/BVN.html" },
      relatedSlugs: ["bvn-change-details"]
    },
    {
      question: "Can a Nigerian living abroad obtain a BVN remotely?",
      answer: "Yes. NIBSS's NRBVN platform is designed for eligible Nigerians in the diaspora to complete remote BVN enrolment and related non-resident onboarding without returning to Nigeria solely for the capture process.",
      source: { label: "NIBSS NRBVN", url: "https://nibss-plc.com.ng/nrbvn/" },
      relatedSlugs: ["non-resident-bvn"]
    }
  ],
  "International travel": [
    {
      question: "Is a Yellow Card required for international travel into or out of Nigeria?",
      answer: "The Federal Ministry of Health and Social Welfare says Yellow Fever vaccination proof is mandatory for travellers entering or leaving Nigeria. Use the Yellow Card guide for registration, payment, vaccination and verification steps.",
      source: { label: "Federal Ministry of Health FAQ", url: "https://health.gov.ng/faqs/" },
      relatedSlugs: ["yellow-card"]
    },
    {
      question: "Where do I get or verify a Nigerian Yellow Card?",
      answer: "Register and pay through the official Yellow Card route, then use an officially designated Port Health office for the vaccination/card process. The Ministry says the card can be verified through the official portal or its QR code.",
      source: { label: "Federal Ministry of Health FAQ", url: "https://health.gov.ng/faqs/" },
      relatedSlugs: ["yellow-card"]
    },
    {
      question: "Who needs Nigeria's Landing or Exit Card and does it cost money?",
      answer: "NIS requires the relevant arrival/departure pre-processing through the Landing and Exit Card portal. The portal FAQ says the service is free and the card is generated after valid details are submitted.",
      source: { label: "NIS Landing and Exit Card FAQ", url: "https://lecard.immigration.gov.ng/faq" },
      relatedSlugs: ["nigeria-landing-exit-card"]
    },
    {
      question: "Can I change a Landing or Exit Card after submitting it?",
      answer: "The NIS portal FAQ says submitted information cannot be edited. If you made an error, submit the correct details again and use portal support if the issue persists.",
      source: { label: "NIS Landing and Exit Card FAQ", url: "https://lecard.immigration.gov.ng/faq" },
      relatedSlugs: ["nigeria-landing-exit-card"]
    },
    {
      question: "Can I extend a Nigerian short-stay e-Visa after arriving?",
      answer: "NIS states that short-stay e-Visa classes are not extendable beyond their stated duration. Travellers planning work or long-term residence should use the correct visa/residence route before travel.",
      source: { label: "NIS e-Visa information centre", url: "https://immigration.gov.ng/info-center/" },
      relatedSlugs: ["nigeria-evisa-application", "nigeria-tourism-visa", "nigeria-business-visa", "nigeria-visiting-visa"]
    },
    {
      question: "What should an e-Visa traveller carry to the Nigerian border?",
      answer: "NIS says travellers should carry the e-Visa approval/confirmation (printed or digital), the original passport used for the application and the required Landing Card.",
      source: { label: "NIS e-Visa border document FAQ", url: "https://immigration.gov.ng/?echo_kb_faq=do-i-need-to-present-physical-documents-at-the-airport" },
      relatedSlugs: ["nigeria-evisa-application", "nigeria-landing-exit-card"]
    },
    {
      question: "How long is an ECOWAS Travel Certificate valid?",
      answer: "NIS says the certificate is valid for travel within the ECOWAS sub-region for two years and can be renewed for a further two-year period. Separate replacement rules apply for a lost, stolen, mutilated or exhausted certificate.",
      source: { label: "NIS ECOWAS Travel Certificate", url: "https://immigration.gov.ng/ecowas-travel-certificate/" },
      relatedSlugs: ["ecowas-travel-certificate"]
    }
  ],
  "Police & security": [
    {
      question: "What is a Nigeria Police Character Certificate used for?",
      answer: "The Nigeria Police describes the PCC as a criminal-record/character check requested for purposes such as visas, employment and licensing.",
      source: { label: "Nigeria Police PCC validation notice", url: "https://www.npf.gov.ng/news/details/528" },
      relatedSlugs: ["police-character-certificate"]
    },
    {
      question: "Can I request a Police Character Certificate online?",
      answer: "Yes. POSSAP lets users create an account, request the Police Character Certificate service, submit the required information and make the official payment online before fulfilment.",
      source: { label: "POSSAP", url: "https://possap.gov.ng/" },
      relatedSlugs: ["police-character-certificate"]
    },
    {
      question: "How can I check if a Police Character Certificate is genuine?",
      answer: "NPF says to use POSSAP's Validate Document function and enter the certificate's unique document number. A genuine record should display the certificate details.",
      source: { label: "Nigeria Police PCC validation notice", url: "https://www.npf.gov.ng/news/details/528" },
      relatedSlugs: ["police-character-certificate"]
    },
    {
      question: "Should I pay an individual or agent directly for a Police Character Certificate?",
      answer: "Use the POSSAP request and payment flow so the transaction is attached to an official service request. Avoid personal-account payment requests that bypass the official portal.",
      source: { label: "POSSAP", url: "https://possap.gov.ng/" },
      relatedSlugs: ["police-character-certificate"]
    }
  ],
  "Civic services": [
    {
      question: "Who is eligible to register as a voter in Nigeria?",
      answer: "INEC's voter guidance says an eligible voter is a Nigerian citizen aged 18 or older who completes the required Continuous Voter Registration and biometric enrolment when the registration exercise is open.",
      source: { label: "INEC voter education FAQ", url: "https://inecnigeria.org/voters/education?tab=faqs" },
      relatedSlugs: ["inec-pvc-status"]
    },
    {
      question: "Can I check my PVC status even when a CVR exercise is not open?",
      answer: "INEC's current CVR portal keeps the registered-voter PVC status and collection-centre lookup available even when new registration is not active.",
      source: { label: "INEC CVR portal", url: "https://cvr.inecnigeria.org/" },
      relatedSlugs: ["inec-pvc-status"]
    },
    {
      question: "Should I register again if I already have an INEC voter record?",
      answer: "Do not create a duplicate record simply because you cannot immediately find or collect a PVC. Start with the existing-voter status lookup and use the appropriate INEC correction/transfer process when those services are available.",
      source: { label: "INEC CVR portal", url: "https://cvr.inecnigeria.org/" },
      relatedSlugs: ["inec-pvc-status"]
    },
    {
      question: "Where do I find my PVC collection centre?",
      answer: "Use INEC's official registered-voter/PVC lookup. The MyNigeriaGuide PVC-status page links to that administrative service and does not provide voting advice or candidate recommendations.",
      source: { label: "INEC CVR portal", url: "https://cvr.inecnigeria.org/" },
      relatedSlugs: ["inec-pvc-status"]
    }
  ],
  "Foreign visas": [
    {
      question: "Is there one bank-balance amount that guarantees a visitor visa?",
      answer: "No. Financial-evidence rules differ by destination and applicant circumstances. For example, Canada says the amount needed depends on trip length and accommodation, while the UK requires enough funds for the visit without publishing one universal balance that guarantees approval.",
      source: { label: "Canada visitor visa eligibility", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eligibility.html" },
      relatedSlugs: ["canada-visitor-visa", "uk-standard-visitor-visa"]
    },
    {
      question: "Do I need biometrics or an interview for a visitor visa?",
      answer: "It depends on the destination, visa type and applicant. Use the country guide on MyNigeriaGuide and then the linked official application system; do not assume another country's biometrics or interview rules apply.",
      source: { label: "U.S. visitor visa guidance", url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html" },
      relatedSlugs: ["us-b1-b2-visitor-visa", "canada-visitor-visa", "uk-standard-visitor-visa"]
    },
    {
      question: "Should I buy a non-refundable flight before my visa is approved?",
      answer: "Follow the exact travel-evidence wording in the destination's official checklist. If it asks for an itinerary or reservation, do not turn that into an unnecessary non-refundable purchase. If a destination explicitly requires a paid ticket, follow that destination-specific rule.",
      source: { label: "UK Standard Visitor guidance", url: "https://www.gov.uk/standard-visitor/apply-standard-visitor-visa" },
      relatedSlugs: ["uk-standard-visitor-visa", "france-schengen-short-stay-visa", "germany-schengen-tourist-visa"]
    },
    {
      question: "Can another person sponsor my visitor visa application?",
      answer: "Some destinations allow another person to fund the trip, but sponsorship does not replace the applicant's own required evidence. The sponsor relationship, funds and supporting documents must match the destination's official rules.",
      source: { label: "UK Standard Visitor eligibility", url: "https://www.gov.uk/standard-visitor" },
      relatedSlugs: ["uk-standard-visitor-visa", "canada-visitor-visa", "australia-visitor-visa-600"]
    },
    {
      question: "What should I do after a visa refusal?",
      answer: "Read the refusal or decision letter first. Appeal, administrative review, reconsideration and fresh-application rights differ by country and visa type. If you reapply, address the stated reason and disclose previous refusals whenever the form asks.",
      source: { label: "Canada visitor visa information", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/visitor-visa.html" },
      relatedSlugs: ["canada-visitor-visa", "uk-standard-visitor-visa", "us-b1-b2-visitor-visa"]
    },
    {
      question: "Does receiving a visitor visa guarantee that I will be admitted at the border?",
      answer: "No. A visa normally permits travel to the destination and a request for entry; border authorities can still check travel purpose, documents and admissibility conditions on arrival.",
      source: { label: "UK Standard Visitor guidance", url: "https://www.gov.uk/standard-visitor" },
      relatedSlugs: ["uk-standard-visitor-visa", "canada-visitor-visa", "australia-visitor-visa-600"]
    }
  ]
};

export function getCategoryFaqs(category: string) {
  return categoryFaqs[category] ?? [];
}
