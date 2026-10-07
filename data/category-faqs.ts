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
    },
    {
      question: "How do I check my passport application status or find the earliest available processing centre?",
      answer: "The official NIS passport portal provides separate options to check application status/print a receipt and to check centre availability before booking or changing an appointment.",
      source: { label: "NIS Passport Application Portal", url: "https://passport.immigration.gov.ng/" },
      relatedSlugs: ["passport-renewal", "first-nigerian-passport", "passport-application-abroad"]
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
      question: "What document is needed for a NIN date-of-birth correction?",
      answer: "NIMC's current self-service guidance says applicants born after 1992 use a digitised NPC birth certificate, while applicants born before 1992 use a digitised NPC attestation certificate. Use the date-of-birth guide for the current payment and submission steps.",
      source: { label: "NIMC self-service modifications", url: "https://nimc.gov.ng/self-service-modifications/" },
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
      answer: "NIMC's NINAuth service now lets users download an official NIN slip directly in the app free of charge. NIMC separately lists fees for formal reissuance after loss, damage or theft. Losing the printed slip does not mean you should enrol for a new NIN.",
      source: { label: "NINAuth official NIN slip download guidance", url: "https://ninauth.nimc.gov.ng/news-room/download-your-nin-slip" },
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
    },
    {
      question: "Can a commercial driver start a driver's licence application entirely online?",
      answer: "FRSC says commercial-licence applications are not started from the public portal home page. The applicant should visit a capture centre with the required medical certificate and driving-school certificate so an FRSC operator can initiate the commercial application.",
      source: { label: "Nigeria Driver's Licence FAQ", url: "https://nigeriadriverslicence.frsc.gov.ng/faq" },
      relatedSlugs: ["new-drivers-licence"]
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
    },
    {
      question: "How long do CAC registration and post-registration services usually take?",
      answer: "CAC publishes service timelines rather than one universal turnaround time. Its current schedule lists different targets by service, including instant Status Reports and working-day targets for several post-registration requests. The clock can depend on receiving a complete application and resolving any query.",
      source: { label: "CAC service timelines", url: "https://www.cac.gov.ng/services/service-timelines" },
      relatedSlugs: ["cac-status-report", "cac-certified-true-copy", "cac-annual-returns"]
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
    },
    {
      question: "Can I pay cash directly to someone for JAMB registration or Direct Entry?",
      answer: "JAMB says its UTME and Direct Entry registration system is cashless. Obtain the required profile code/e-PIN through the approved channels and complete registration at an accredited CBT centre; do not hand an unofficial agent cash as a substitute for the official payment route.",
      source: { label: "JAMB FAQ", url: "https://www.jamb.gov.ng/FAQ" },
      relatedSlugs: ["jamb-2026-utme-registration", "jamb-direct-entry-2026", "jamb-profile-code"]
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
    },
    {
      question: "Can I use an NPC Temporary Attestation Number for a NIN date-of-birth modification?",
      answer: "No. NPC says the Temporary Attestation Number is for applicants without a NIN to use during NIN enrolment; it cannot be validated on the NIMC web modification portal for a date-of-birth change.",
      source: { label: "NPC Vital Registration FAQ", url: "https://nationalpopulation.gov.ng/faq-vitalreg" },
      relatedSlugs: ["npc-birth-attestation", "nin-date-of-birth-modification", "nin-enrolment"]
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
    },
    {
      question: "What is the new Nigerian Tax ID and does it replace the old TIN?",
      answer: "The JRB/NRS 2026 rollout introduced a 13-digit Tax ID for tax administration. For individuals it is linked to the NIN, while registered entities use their CAC registration number. The official announcement says the new Tax ID became effective from 1 January 2026, replacing previously issued TINs for this purpose, and can be retrieved through the official Tax ID portals.",
      source: { label: "Nigerian Tax ID rollout notice", url: "https://fctirs.gov.ng/nigerian-tax-id-portal-goes-live/" },
      relatedSlugs: ["nrs-individual-tax-registration", "nrs-corporate-tax-registration"]
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
      question: "How do I apply for an FCT Tax Clearance Certificate?",
      answer: "FCT-IRS requires a valid FCT tax record plus the applicable Form A, TCC application form, identity and prior income/tax evidence. Its FAQ states that issuance should take no more than 14 days when the application is complete and the tax position is in order.",
      source: { label: "FCT-IRS TCC checklist", url: "https://fctirs.gov.ng/tax-clearance-certificate-tcc-checklist/" },
      relatedSlugs: ["fct-tax-clearance-application", "fct-verify-tax-clearance"]
    },
    {
      question: "Who should register with LASRRA?",
      answer: "LASRRA states that anyone who resides in Lagos State and intends to remain for at least three months should be registered, irrespective of age, gender, ethnicity, religion or nationality.",
      source: { label: "LASRRA mandate", url: "https://www.lagosresidents.gov.ng/our-mandate/" },
      relatedSlugs: ["lagos-lasrra-registration"]
    },
    {
      question: "How do I pay Lagos Land Use Charge?",
      answer: "Retrieve the property bill through the official Lagos Land Use Charge service, confirm the property and amount, then use one of the state-approved payment channels. Keep the payment reference and check the portal afterward for the updated status.",
      source: { label: "Lagos Land Use Charge", url: "https://luc.lagosstate.gov.ng/" },
      relatedSlugs: ["lagos-land-use-charge"]
    },
    {
      question: "Can I verify a Lagos Tax Clearance Certificate online?",
      answer: "Yes. LIRS eTax provides a Tax Clearance Certificate verification field. Enter the certificate number and compare the returned record with the document you were given.",
      source: { label: "LIRS eTax", url: "https://etax.lirs.net/" },
      relatedSlugs: ["lagos-tax-clearance-verification", "lagos-payer-id"]
    },
    {
      question: "How long does Ogun State say an eTCC takes?",
      answer: "Ogun State IRS says an eTCC can be obtained within about 72 hours after payment and proper filing of the required documents. The certificate-processing service itself is listed as free.",
      source: { label: "Ogun IRS eTCC FAQ", url: "https://www.ogunstaterevenue.com/en/etcc" },
      relatedSlugs: ["ogun-tax-clearance-certificate", "ogun-taxpayer-registration"]
    },
    {
      question: "How do I get a Rivers State RIVTIN?",
      answer: "Rivers State IRS says to search for your existing name or company record in RIVTAMIS, register or update the information, confirm and activate the account, then obtain the RIVTIN. It states that account activation takes about 24 hours.",
      source: { label: "Rivers State IRS / RIVTAMIS", url: "https://riversbirs.gov.ng/" },
      relatedSlugs: ["rivers-rivtin-registration"]
    },
    {
      question: "Can I apply for a Rivers State TCC online?",
      answer: "Yes. RIVTAMIS supports individual Direct Assessment/TCC requests and corporate TCC requests, with tracking and public TCC verification. The exact flow depends on whether the taxpayer is applying personally or through an employer.",
      source: { label: "Rivers State IRS / RIVTAMIS", url: "https://riversbirs.gov.ng/" },
      relatedSlugs: ["rivers-tax-clearance-certificate", "rivers-rivtin-registration"]
    },
    {
      question: "What is an Anambra ASIN?",
      answer: "AIRS describes ASIN as a unique, one-time Anambra State identity number used to access state services and revenue processes. Use the official AIRS registration channel.",
      source: { label: "Anambra Internal Revenue Service", url: "https://airs.an.gov.ng/" },
      relatedSlugs: ["anambra-asin-registration"]
    },
    {
      question: "Are Edo Tax ID, Anambra ASIN, Lagos Payer ID and Rivers RIVTIN the same thing?",
      answer: "No. They belong to different state revenue systems. Use the identifier and service guide for the state whose tax or government process you are dealing with.",
      source: { label: "Lagos State Revenue Portal", url: "https://revenue.lagosstate.gov.ng/Login" },
      relatedSlugs: ["edo-tax-id-access", "anambra-asin-registration", "lagos-payer-id", "rivers-rivtin-registration"]
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
      question: "Is there a NIBSS BVN retrieval portal online?",
      answer: "NIBSS currently publishes *565*0# as its customer BVN retrieval method. Dial it from the phone number registered to the BVN; NIBSS lists a ₦20 service fee. If that registered line is unavailable, use your bank or the institution managing the BVN record instead of entering identity details into an unofficial lookup site.",
      source: { label: "NIBSS 565 USSD validation services", url: "https://nibss-plc.com.ng/ussd-validation-services/" },
      relatedSlugs: ["bvn-retrieval"]
    },
    {
      question: "How can I check whether a recent NIP bank transfer succeeded?",
      answer: "NIBSS provides the *565*5# NIP Transaction Tracker for transfers completed within the previous 48 hours. Use the sender's registered phone number, account number and transaction amount to check the status.",
      source: { label: "NIBSS 565 USSD validation services", url: "https://nibss-plc.com.ng/ussd-validation-services/" },
      relatedSlugs: ["nip-transfer-status"]
    },
    {
      question: "Can a Nigerian living abroad obtain a BVN remotely?",
      answer: "Yes. NIBSS's NRBVN platform is designed for eligible Nigerians in the diaspora to complete remote BVN enrolment and related non-resident onboarding without returning to Nigeria solely for the capture process.",
      source: { label: "NIBSS NRBVN", url: "https://nibss-plc.com.ng/nrbvn/" },
      relatedSlugs: ["non-resident-bvn"]
    },
    {
      question: "Can someone under 18 enrol for a BVN, and how often can the BVN-linked phone number be changed?",
      answer: "Under the CBN amendment effective 1 May 2026, only people aged 18 and above may enrol for a BVN. The same amendment says a BVN-linked phone number may be changed only once.",
      source: { label: "CBN reforms and BVN amendment", url: "https://www.cbn.gov.ng/AboutCBN/Reforms.html" },
      relatedSlugs: ["bvn-enrolment"]
    }
  ],
  "Investing": [
    {
      question: "How do I check whether I have unclaimed dividends in Nigeria?",
      answer: "Start with the Securities and Exchange Commission's official unclaimed-dividend search. Search the shareholder name and use the result to identify the company holding and the registrar responsible for the record before starting a claim.",
      source: { label: "SEC unclaimed-dividend search", url: "https://sec.gov.ng/non-mandated/" },
      relatedSlugs: ["unclaimed-dividends-nigeria"]
    },
    {
      question: "Why do I need to know the registrar before claiming a dividend?",
      answer: "Different public companies use different registrars. SEC's unclaimed-dividend search identifies the registrar attached to a matching holding so the investor can follow the correct mandate, documentation and follow-up route instead of sending documents to the wrong firm.",
      source: { label: "SEC FAQ on unclaimed-dividend retrieval", url: "https://home.sec.gov.ng/about/resources/frequently-asked-questions/faqs-on-unclaimed-dividends-retrieval-process/" },
      relatedSlugs: ["unclaimed-dividends-nigeria"]
    },
    {
      question: "Can I set up an e-Dividend mandate without visiting a registrar?",
      answer: "SEC's revamped e-Dividend Mandate Management System includes a self-service route for eligible investors. The exact verification steps can depend on the shareholder and bank record, so use SEC's current route and follow any registrar or bank validation shown for the holding.",
      source: { label: "SEC revamped e-Dividend system", url: "https://sec.gov.ng/for-investors/keep-track-of-circulars/revamped-e-dividend-mandate-management-system-portal/" },
      relatedSlugs: ["unclaimed-dividends-nigeria"]
    },
    {
      question: "Should I pay an agent just to find or claim an unclaimed dividend?",
      answer: "Begin with SEC's official search and the registrar identified for the holding. Do not send shareholder identity or bank information to an unverified intermediary, and confirm any requested payment through the official SEC, registrar or bank channel before proceeding.",
      source: { label: "SEC investor guidance", url: "https://sec.gov.ng/non-mandated/" },
      relatedSlugs: ["unclaimed-dividends-nigeria"]
    }
  ],
  "Insurance": [
    {
      question: "How can I check whether a vehicle insurance policy is valid?",
      answer: "NIBSS provides *565*11# as an official USSD validation service. Enter the vehicle registration number and the service returns the policy-validity information available for that registration.",
      source: { label: "NIBSS 565 USSD validation services", url: "https://nibss-plc.com.ng/ussd-validation-services/" },
      relatedSlugs: ["vehicle-insurance-validation-ussd"]
    },
    {
      question: "How much does the NIBSS vehicle-insurance validation check cost?",
      answer: "NIBSS currently states that the *565*11# validation lookup has a ₦20 service fee. Keep enough airtime on the line before starting the USSD session.",
      source: { label: "NIBSS 565 USSD validation services", url: "https://nibss-plc.com.ng/ussd-validation-services/" },
      relatedSlugs: ["vehicle-insurance-validation-ussd"]
    },
    {
      question: "What does 'vehicle registration number not found' mean on *565*11#?",
      answer: "NIBSS says this response can mean the registration number is invalid, the vehicle has never had valid insurance cover, or its previous cover expired more than one year ago. Recheck the registration number and contact the insurer if a current policy should exist.",
      source: { label: "NIBSS 565 USSD validation services", url: "https://nibss-plc.com.ng/ussd-validation-services/" },
      relatedSlugs: ["vehicle-insurance-validation-ussd"]
    },
    {
      question: "Does a successful *565*11# check replace the motor-insurance policy document?",
      answer: "No. The USSD service is a validation check for the registration number. Keep the insurer-issued policy evidence and use the insurer's own claims or correction process when you need policy servicing.",
      source: { label: "NIBSS 565 USSD validation services", url: "https://nibss-plc.com.ng/ussd-validation-services/" },
      relatedSlugs: ["vehicle-insurance-validation-ussd"]
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
    },
    {
      question: "Does Nigeria's Landing or Exit Card apply to transit passengers, and what if I lose my copy?",
      answer: "The NIS portal says the Landing/Exit Card is not intended for transit passengers. For covered travellers, a successful submission sends a copy by email; if the printed copy is lost, the emailed copy can be reprinted, and the portal also provides a last-card retrieval function.",
      source: { label: "NIS Landing and Exit Card FAQ", url: "https://lecard.immigration.gov.ng/faq" },
      relatedSlugs: ["nigeria-landing-exit-card", "nigeria-transit-visa"]
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
    },
    {
      question: "Can I transfer my voter registration, update my details or replace a lost or damaged PVC online?",
      answer: "INEC's CVR portal provides service paths for voter-information updates, transfers and lost/damaged PVC replacement. Availability can depend on the current registration exercise, so start from the live INEC portal and check whether the specific administrative service is open before submitting anything.",
      source: { label: "INEC CVR services portal", url: "https://cvr.inecnigeria.org/Public/getStarted" },
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
  ],
  "Telecommunications": [
    {
      "question": "Can I use *996# to check whether my NIN is linked to my SIM?",
      "answer": "Yes. NCC's SIM-NIN guidance identifies *996# as the self-service route for SIM-NIN functions, including checking linkage status. NCC also states that the *996# service is free.",
      "source": {
        "label": "NCC SIM-NIN Linkage FAQ",
        "url": "https://consumer.ncc.gov.ng/information-education/faqs/82-sim-nin-linkage"
      },
      "relatedSlugs": [
        "check-nin-sim-linkage-status",
        "nin-sim-linkage"
      ]
    },
    {
      "question": "What should I do if my SIM is registered in another person's name?",
      "answer": "Do not try to solve an ownership problem by attaching your NIN to another person's subscriber record. NCC guidance directs users to the mobile operator so the line can be properly re-registered or ownership can be addressed with the evidence the operator requests.",
      "source": {
        "label": "NCC SIM-NIN Linkage FAQ",
        "url": "https://consumer.ncc.gov.ng/information-education/faqs/82-sim-nin-linkage"
      },
      "relatedSlugs": [
        "fix-failed-nin-sim-linkage",
        "nin-sim-linkage"
      ]
    },
    {
      "question": "Why can NIN-to-SIM linkage fail even when my NIN is valid?",
      "answer": "A valid NIN can still fail linkage when the subscriber record and NIN identity data do not match or the operator cannot validate the record. Check the linkage status first, then correct the underlying NIMC or SIM-registration issue instead of repeatedly submitting the same mismatch.",
      "source": {
        "label": "NCC NIN and SIM Integration FAQ",
        "url": "https://www.ncc.gov.ng/media-center/public-notices/frequently-asked-questions-nin-and-sim-integration"
      },
      "relatedSlugs": [
        "fix-failed-nin-sim-linkage",
        "nin-name-modification"
      ]
    },
    {
      "question": "How many SIMs can I link to one NIN on the same network?",
      "answer": "NCC's current SIM-NIN FAQ says a subscriber may have up to four SIMs on one network linked to the same NIN. The lines still need to be correctly registered to that subscriber.",
      "source": {
        "label": "NCC SIM-NIN Linkage FAQ",
        "url": "https://consumer.ncc.gov.ng/information-education/faqs/82-sim-nin-linkage"
      },
      "relatedSlugs": [
        "nin-sim-linkage",
        "check-nin-sim-linkage-status"
      ]
    }
  ],
  "Student finance": [
    {
      "question": "Is the NELFUND student loan interest-free?",
      "answer": "NELFUND describes its student loan as interest-free. Apply through the official NELFUND student portal and use the dashboard rather than paying an agent to obtain or speed up a loan.",
      "source": {
        "label": "NELFUND student portal",
        "url": "https://portal.nelf.gov.ng/auth/welcome"
      },
      "relatedSlugs": [
        "nelfund-student-loan-application"
      ]
    },
    {
      "question": "Are NELFUND institutional charges and upkeep paid to the same place?",
      "answer": "No. NELFUND's application information separates the two: approved institutional charges are paid to the institution, while approved upkeep is paid to the student's bank account.",
      "source": {
        "label": "NELFUND official website",
        "url": "https://nelf.gov.ng/"
      },
      "relatedSlugs": [
        "nelfund-student-loan-application",
        "nelfund-loan-status-and-upkeep"
      ]
    },
    {
      "question": "When does NELFUND loan repayment start after NYSC?",
      "answer": "NELFUND's current terms state that a borrower who participated in NYSC begins repayment two years after completing NYSC. Borrowers should check the live terms again when their repayment period approaches.",
      "source": {
        "label": "NELFUND Terms and Conditions",
        "url": "https://nelf.gov.ng/terms"
      },
      "relatedSlugs": [
        "nelfund-loan-repayment"
      ]
    },
    {
      "question": "What does a self-employed NELFUND borrower need to do for repayment?",
      "answer": "NELFUND's terms require self-employed borrowers to keep the Fund updated with business information within the stated period, including the business address and other ownership, registration or banking details that apply. Early repayment in full or in part is also permitted.",
      "source": {
        "label": "NELFUND Terms and Conditions",
        "url": "https://nelf.gov.ng/terms"
      },
      "relatedSlugs": [
        "nelfund-loan-repayment",
        "nelfund-loan-status-and-upkeep"
      ]
    }
  ],
  "Electricity": [
    {
      "question": "How long should a paid MAP prepaid meter take to be installed?",
      "answer": "NERC's metering FAQ says a Meter Asset Provider meter should be installed within 10 working days after full payment. If that period passes, report the delay to the DisCo with the official payment evidence.",
      "source": {
        "label": "NERC Metering FAQ",
        "url": "https://nerc.gov.ng/faq/metering/"
      },
      "relatedSlugs": [
        "electricity-prepaid-meter-application",
        "electricity-meter-paid-not-installed"
      ]
    },
    {
      "question": "Can a DisCo give me any estimated bill it wants when I have no working meter?",
      "answer": "No. NERC's billing guidance applies capping and other rules to estimated billing. A meter fault, removal or delayed replacement does not give a DisCo unlimited discretion to invent an estimate.",
      "source": {
        "label": "NERC Billing FAQ",
        "url": "https://nerc.gov.ng/faq/billing/"
      },
      "relatedSlugs": [
        "electricity-estimated-billing-dispute",
        "electricity-prepaid-meter-application"
      ]
    },
    {
      "question": "What do electricity Bands A, B, C, D and E mean?",
      "answer": "Under NERC's service-based tariff framework, the bands correspond to minimum daily supply commitments: Band A at least 20 hours, B 16, C 12, D 8 and E 4. Confirm the band actually applied to your account on the bill, vending receipt or DisCo system.",
      "source": {
        "label": "NERC Electricity Tariffs FAQ",
        "url": "https://nerc.gov.ng/faq/electricity-tariffs/"
      },
      "relatedSlugs": [
        "electricity-tariff-band"
      ]
    },
    {
      "question": "Where do I escalate an electricity complaint that my DisCo has not resolved?",
      "answer": "Start with the DisCo Customer Complaints Unit and keep the acknowledgment. For unresolved cases, the next regulator now depends on location because some state electricity markets have transferred to state regulators; use NERC's current complaint-channel list to identify the right body.",
      "source": {
        "label": "NERC complaint channels",
        "url": "https://nerc.gov.ng/media/new-electricity-complaint-channels-for-15-states/"
      },
      "relatedSlugs": [
        "electricity-complaint-escalation",
        "electricity-estimated-billing-dispute"
      ]
    }
  ],
  "Health insurance": [
    {
      "question": "Which NHIA programme can a self-employed person or family use?",
      "answer": "NHIA identifies GIFSHIP as a route for people outside other compulsory arrangements, including self-employed people, individuals, families, small groups, retirees and other listed categories. Use Get Covered to confirm the programme that fits your situation.",
      "source": {
        "label": "NHIA GIFSHIP",
        "url": "https://www.nhia.gov.ng/service/land-insurance/"
      },
      "relatedSlugs": [
        "nhia-gifship-enrolment",
        "nhia-find-right-health-plan"
      ]
    },
    {
      "question": "How do I decide which NHIA programme applies to me?",
      "answer": "NHIA's Get Covered tool starts with employment status and whether coverage is for an individual, family or group. Use that route before paying so you do not enrol into a programme designed for a different category.",
      "source": {
        "label": "NHIA Get Covered",
        "url": "https://www.nhia.gov.ng/get-covered/"
      },
      "relatedSlugs": [
        "nhia-find-right-health-plan",
        "nhia-gifship-enrolment"
      ]
    },
    {
      "question": "Does NHIA have a programme for private-sector employees?",
      "answer": "Yes. NHIA describes OPSSHIP as its organised private-sector programme. The current programme page says eligible private companies enrol employees through NHIA, so an employee should confirm the employer's programme and provider rather than buying an unrelated card.",
      "source": {
        "label": "NHIA OPSSHIP",
        "url": "https://www.nhia.gov.ng/service/gifship/"
      },
      "relatedSlugs": [
        "nhia-private-sector-coverage"
      ]
    },
    {
      "question": "Can NHIA coverage include a spouse and children?",
      "answer": "NHIA's current private-sector information says employee coverage can include a spouse and up to four children under 18, with additional family-member rules depending on the programme. Confirm the exact dependant terms for the plan you are joining.",
      "source": {
        "label": "NHIA OPSSHIP",
        "url": "https://www.nhia.gov.ng/service/gifship/"
      },
      "relatedSlugs": [
        "nhia-private-sector-coverage",
        "nhia-gifship-enrolment"
      ]
    }
  ],
  "Pensions": [
    {
      "question": "Do I lose my Retirement Savings Account when I change jobs?",
      "answer": "No. PenCom states that the RSA remains the worker's account when employment changes. Give the existing RSA details to the new employer so future contributions continue to the correct account.",
      "source": {
        "label": "PenCom — RSA when changing jobs",
        "url": "https://www.pencom.gov.ng/what-happens-to-my-rsa-when-i-change-jobs/"
      },
      "relatedSlugs": [
        "pencom-open-rsa"
      ]
    },
    {
      "question": "Can I move my pension from one PFA to another?",
      "answer": "Yes. PenCom says an RSA holder can transfer from one Pension Fund Administrator to another once in a year without giving a reason, using the regulated RSA transfer process.",
      "source": {
        "label": "PenCom — Move RSA to another PFA",
        "url": "https://www.pencom.gov.ng/can-i-move-my-account-from-one-pfa-to-another/"
      },
      "relatedSlugs": [
        "pencom-transfer-rsa"
      ]
    },
    {
      "question": "What should I do if pension is deducted from my salary but not credited to my RSA?",
      "answer": "Check the PFA statement first and identify the missing months. Then reconcile with the employer/PFA and, if the employer has not remitted the contribution, complain to PenCom with the RSA PIN, PFA, employer identity and affected periods.",
      "source": {
        "label": "PenCom Guidance Note for Employees",
        "url": "https://www.pencom.gov.ng/guidance-note-employees-2/"
      },
      "relatedSlugs": [
        "pencom-unremitted-contributions"
      ]
    },
    {
      "question": "Do I need to open a new RSA when I move to another employer?",
      "answer": "No. An RSA is portable between jobs. Keep the same RSA unless you are using the regulated PFA-transfer process; creating another account is not the normal way to handle a job change.",
      "source": {
        "label": "PenCom — What is an RSA?",
        "url": "https://www.pencom.gov.ng/what-is-a-retirement-savings-account-rsa/"
      },
      "relatedSlugs": [
        "pencom-open-rsa",
        "pencom-transfer-rsa"
      ]
    },
    {
      "question": "Should I open a regular RSA or a Micro Pension account?",
      "answer": "Use the regular RSA route when you are covered by the Contributory Pension Scheme through employment. PenCom's Micro Pension Plan is designed for self-employed and informal-sector workers who need a pension route built around flexible contributions.",
      "source": {
        "label": "PenCom — Micro Pension",
        "url": "https://www.pencom.gov.ng/micro-pension/"
      },
      "relatedSlugs": [
        "pencom-open-rsa",
        "pencom-micro-pension-registration"
      ]
    },
    {
      "question": "Do I need NIN for RSA registration?",
      "answer": "Yes. Current RSA onboarding requires identity verification that includes NIN information. Complete the registration through a PenCom-licensed Pension Fund Administrator and use the same verified identity details throughout the process.",
      "source": {
        "label": "PenCom — Revised RSA Registration Guidelines",
        "url": "https://www.pencom.gov.ng/revised-guidelines-for-retirement-savings-account-rsa-registration/"
      },
      "relatedSlugs": [
        "pencom-open-rsa",
        "pencom-micro-pension-registration"
      ]
    }
  ],
  "Product regulation": [
    {
      "question": "Where should I start a NAFDAC product registration application?",
      "answer": "Start in NAFDAC's official NAPAMS system, choose New Product Registration and use the category that matches the regulated product. Food, cosmetics, medicines, water and medical devices can have different supporting requirements.",
      "source": {
        "label": "NAFDAC NAPAMS",
        "url": "https://registration.nafdac.gov.ng/Home/"
      },
      "relatedSlugs": [
        "nafdac-product-registration"
      ]
    },
    {
      "question": "Is a NAFDAC number printed on a label enough to prove a product is registered?",
      "answer": "No. A printed number can be copied or misused. Use NAFDAC's official verification service and compare the returned product and registration-holder information with the item in front of you.",
      "source": {
        "label": "NAFDAC Services Portal",
        "url": "https://services.nafdac.gov.ng/"
      },
      "relatedSlugs": [
        "nafdac-product-verification"
      ]
    },
    {
      "question": "How do I renew an older NAFDAC registration that is missing from NAPAMS?",
      "answer": "NAFDAC's online workflow provides a data-capture route for legacy products that are not yet present in the applicant's product listing. Bring the old record into the online system first, then use the renewal workflow rather than creating an unnecessary duplicate product.",
      "source": {
        "label": "NAFDAC NAPAMS",
        "url": "https://registration.nafdac.gov.ng/Home/"
      },
      "relatedSlugs": [
        "nafdac-product-renewal"
      ]
    },
    {
      "question": "Is there one NAFDAC registration fee for every kind of product?",
      "answer": "No. Charges depend on the product category and application. Use NAFDAC's current services/fee information and the invoice generated by the official application rather than relying on an old price shared by an agent.",
      "source": {
        "label": "NAFDAC Services Portal",
        "url": "https://services.nafdac.gov.ng/"
      },
      "relatedSlugs": [
        "nafdac-product-registration",
        "nafdac-product-renewal"
      ]
    }
  ],
  "Consumer protection": [
    {
      "question": "What evidence should I attach to an FCCPC consumer complaint?",
      "answer": "FCCPC asks consumers to provide information and documents relevant to the transaction. Useful evidence includes receipts, invoices, agreements, screenshots, correspondence and a short chronology showing what happened and what remedy you requested.",
      "source": {
        "label": "FCCPC Complaint Handling",
        "url": "https://fccpc.gov.ng/consumers/complaint-handling/"
      },
      "relatedSlugs": [
        "fccpc-consumer-complaint"
      ]
    },
    {
      "question": "How long can an FCCPC complaint take to resolve?",
      "answer": "FCCPC's complaint-handling guidance says resolution may take about 1–45 days, while more complex cases can take longer. Keep the tracking reference and respond promptly if additional evidence is requested.",
      "source": {
        "label": "FCCPC Complaint Handling",
        "url": "https://fccpc.gov.ng/consumers/complaint-handling/"
      },
      "relatedSlugs": [
        "fccpc-consumer-complaint"
      ]
    },
    {
      "question": "How do I track a complaint after submitting it to FCCPC?",
      "answer": "Keep the tracking code or acknowledgment generated after submission. FCCPC's complaint process allows the consumer to monitor the case and provide follow-up material when the Commission requests it.",
      "source": {
        "label": "FCCPC Complaint Handling",
        "url": "https://fccpc.gov.ng/consumers/complaint-handling/"
      },
      "relatedSlugs": [
        "fccpc-consumer-complaint"
      ]
    },
    {
      "question": "Can I submit an FCCPC complaint without visiting an office?",
      "answer": "Yes. FCCPC publishes an online complaint route and also recognises other official channels such as email, letters and walk-in contact. Use a channel that leaves a clear record and keep copies of every document submitted.",
      "source": {
        "label": "FCCPC Complaint Handling",
        "url": "https://fccpc.gov.ng/consumers/complaint-handling/"
      },
      "relatedSlugs": [
        "fccpc-consumer-complaint"
      ]
    }
  ],
  "Housing": [
    {
      "question": "How much is the standard NHF contribution?",
      "answer": "FMBN's NHF information states a contribution basis of 2.5% of monthly income for the applicable contributor class. Check the current FMBN rule for your employment status and verify that remittances are actually appearing on your contribution record.",
      "source": {
        "label": "FMBN NHF Scheme FAQ",
        "url": "https://fmbn.gov.ng/products/nhf-scheme/faqs"
      },
      "relatedSlugs": [
        "nhf-registration-and-contributions"
      ]
    },
    {
      "question": "How long must I contribute before applying for an NHF mortgage?",
      "answer": "FMBN's current NHF mortgage product page states that an applicant must have at least six months of continuous contributions. The mortgage still requires affordability, property and participating-mortgage-bank checks.",
      "source": {
        "label": "FMBN NHF Mortgage Loan",
        "url": "https://fmbn.gov.ng/products/nhf_mortgage_loan"
      },
      "relatedSlugs": [
        "nhf-mortgage-loan",
        "nhf-registration-and-contributions"
      ]
    },
    {
      "question": "What rate and maximum tenor does FMBN publish for the NHF mortgage?",
      "answer": "FMBN's current product page states that participating mortgage banks on-lend NHF mortgage funds to contributors at 6% per annum, with a maximum tenor of up to 30 years subject to eligibility and affordability.",
      "source": {
        "label": "FMBN NHF Mortgage Loan",
        "url": "https://fmbn.gov.ng/products/nhf_mortgage_loan"
      },
      "relatedSlugs": [
        "nhf-mortgage-loan"
      ]
    },
    {
      "question": "Can I automatically withdraw all my NHF contributions when I leave a job?",
      "answer": "Not simply because one employment ends. NHF refunds follow the eligibility conditions in the applicable NHF rules. Verify your contribution history and the current refund condition with FMBN before submitting a request.",
      "source": {
        "label": "FMBN NHF legal framework",
        "url": "https://fmbn.gov.ng/products/nhf-scheme/legal-framework"
      },
      "relatedSlugs": [
        "nhf-contribution-refund",
        "nhf-registration-and-contributions"
      ]
    }
  ],
  "Customs": [
    {
      "question": "What does the Customs Verification Management System check on a vehicle?",
      "answer": "CVMS allows a user to enter a vehicle VIN or chassis number and verify the customs clearance and duty-payment record. Nigeria Customs describes it as a way for individuals and businesses to confirm vehicle duty status before relying on a clearance claim.",
      "source": {
        "label": "Customs Verification Management System",
        "url": "https://cvms.nigeriatradehub.gov.ng/"
      },
      "relatedSlugs": [
        "customs-vehicle-duty-verification"
      ]
    },
    {
      "question": "What do I receive after a successful CVMS vehicle verification?",
      "answer": "The CVMS process says the user enters the VIN, completes the secure payment step and can download an official Customs Verification Receipt. The receipt includes verification information that can be checked instead of relying only on a seller's paper copy.",
      "source": {
        "label": "Customs Verification Management System",
        "url": "https://cvms.nigeriatradehub.gov.ng/"
      },
      "relatedSlugs": [
        "customs-vehicle-duty-verification"
      ]
    },
    {
      "question": "What is the Nigeria Customs 846 non-standard VIN portal for?",
      "answer": "The 846 portal is for the applicable Customs cases involving a non-standard or challenged VIN and uses an authorised declaration/assessment route. It is not a general shortcut for ordinary buyers to reduce customs duty.",
      "source": {
        "label": "Nigeria Customs 846 portal",
        "url": "https://846.customs.gov.ng/"
      },
      "relatedSlugs": [
        "customs-846-non-standard-vin"
      ]
    },
    {
      "question": "Does a successful Customs vehicle check also prove who owns the vehicle?",
      "answer": "No. Customs verification checks the import clearance/duty record. Ownership, Nigerian number-plate registration and motor insurance are separate records, so a used-vehicle buyer should verify each relevant record independently.",
      "source": {
        "label": "Nigeria Customs Service CVMS information",
        "url": "https://customs.gov.ng/"
      },
      "relatedSlugs": [
        "customs-vehicle-duty-verification",
        "vehicle-proof-of-ownership-verification",
        "verify-vehicle-number-plate"
      ]
    }
  ],
  "Employment & social protection": [
    {
      question: "Who pays the NSITF Employees' Compensation Scheme contribution?",
      answer: "NSITF describes the Employees' Compensation Scheme as employer-funded. Its current services page states that registered employers remit 1% of total monthly payroll, while the worker accesses statutory protection without paying an unofficial claims fee.",
      source: { label: "NSITF Services", url: "https://nsitf.gov.ng/services" },
      relatedSlugs: ["nsitf-employer-registration", "nsitf-workplace-injury-claim"]
    },
    {
      question: "What kinds of workplace problems can NSITF compensation cover?",
      answer: "NSITF lists work-related injury, occupational disease, disability and death among compensable scenarios, with benefits that can include medical treatment, income replacement, rehabilitation and dependant support depending on the case.",
      source: { label: "NSITF Compensation", url: "https://nsitf.gov.ng/compensation" },
      relatedSlugs: ["nsitf-workplace-injury-claim"]
    },
    {
      question: "How do I prove that an NSITF compliance certificate is genuine?",
      answer: "Use NSITF's official certificate-verification service rather than relying on a PDF or photocopy. The employer should also have a valid ECS registration and up-to-date contribution record before a yearly compliance certificate is issued.",
      source: { label: "NSITF Services", url: "https://nsitf.gov.ng/services" },
      relatedSlugs: ["nsitf-compliance-certificate", "nsitf-employer-registration"]
    },
    {
      question: "How do I apply for an NDE skills or employment programme in 2026?",
      answer: "Use the official NDE Job Creation Portal, complete the pre-enrolment assessment and then select an available RHEI scheme that matches your age, state and skill interest. The portal performs identity, BVN/bank, programme-availability and proximity checks.",
      source: { label: "NDE Job Creation Portal", url: "https://nderegistrationportal.ng/" },
      relatedSlugs: ["nde-rhei-registration"]
    }
  ]
};

export function getCategoryFaqs(category: string) {
  return categoryFaqs[category] ?? [];
}
