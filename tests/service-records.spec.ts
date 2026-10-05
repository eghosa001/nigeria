import { expect, test } from "@playwright/test";
import fs from "node:fs";
import { serializeServiceCatalog, validateServiceCatalog } from "@/lib/service-records";

const services = validateServiceCatalog(JSON.parse(fs.readFileSync(new URL("../data/services.json", import.meta.url), "utf8")));
const publicServices = services.filter((service) => service.status !== "review");

const expectedSlugs = [
  "passport-renewal",
  "first-nigerian-passport",
  "passport-change-of-data",
  "nin-enrolment",
  "nin-date-of-birth-modification",
  "new-drivers-licence",
  "renew-drivers-licence",
  "replace-lost-drivers-licence",
  "upgrade-drivers-licence-class",
  "cac-business-name-registration",
  "cac-company-registration",
  "cac-incorporated-trustee-registration",
  "cac-name-reservation",
  "cac-annual-returns",
  "jamb-profile-code",
  "jamb-2026-utme-registration",
  "jamb-retrieve-profile-code",
  "jamb-retrieve-lost-epin",
  "jamb-caps",
  "waec-check-result",
  "waec-digital-certificate",
  "waec-collect-certificate",
  "waec-confirm-result-nigeria",
  "waec-lost-certificate",
  "neco-2026-ssce-internal-registration",
  "neco-check-result",
  "neco-purchase-result-token",
  "neco-e-verify",
  "neco-payment",
  "nysc-registration-local",
  "nysc-foreign-trained-registration",
  "nysc-revalidation",
  "nysc-remobilization",
  "nysc-relocation",
  "nysc-lost-discharge-certificate",
  "nysc-lost-exemption-certificate",
  "npc-birth-attestation",
  "npc-child-birth-registration",
  "npc-digital-birth-certificate-reissuance",
  "npc-birth-certificate-reprint",
  "nrs-individual-tax-registration",
  "nrs-corporate-tax-registration",
  "nrs-tax-clearance-certificate",
  "cac-status-report",
  "cac-certified-true-copy",
  "jamb-direct-entry-2026",
  "jamb-reset-profile-password",
  "waec-correct-certificate-error",
  "waec-result-confirmation-overseas",
  "neco-institution-verification",
  "nysc-senate-list",
  "nysc-call-up-letter",
  "nysc-exemption-certificate",
  "npc-check-attestation-status",
  "nrs-self-tax-filing",
  "nrs-tax-payment",
  "nrs-refund-tracking",
  "passport-change-marital-status",
  "passport-name-change",
  "official-nigerian-passport",
  "passport-application-abroad",
  "fct-file-individual-tax-return",
  "fct-verify-tax-clearance",
  "edo-tax-id-access",
  "anambra-asin-registration",
  "lagos-payer-id",
  "lost-nigerian-passport",
  "nin-slip-reissue",
  "nin-name-modification",
  "nin-phone-modification",
  "nin-address-modification",
  "jamb-print-result",
  "jamb-admission-letter",
  "waec-withheld-result-complaint",
  "nysc-correct-date-of-birth",
  "nysc-correct-course-of-study",
  "npc-modify-birth-record",
  "bvn-enrolment",
  "bvn-retrieval",
  "non-resident-bvn",
  "ecowas-travel-certificate",
  "yellow-card",
  "nigeria-landing-exit-card",
  "police-character-certificate",
  "inec-pvc-status",
  "nigeria-evisa-application",
  "nigeria-tourism-visa",
  "nigeria-business-visa",
  "nigeria-visiting-visa",
  "nigeria-transit-visa",
  "nigeria-temporary-work-permit",
  "uk-standard-visitor-visa",
  "us-b1-b2-visitor-visa",
  "canada-visitor-visa",
  "france-schengen-short-stay-visa",
  "australia-visitor-visa-600",
  "uae-tourist-visa",
  "south-africa-holiday-visa",
  "ireland-short-stay-visit-visa",
  "germany-schengen-tourist-visa",
  "italy-schengen-tourist-visa",
  "spain-schengen-tourist-visa",
  "netherlands-schengen-visa",
  "turkiye-tourist-visa",
  "china-tourist-visa-nigeria",
  "neco-certificate-service",
  "nip-transfer-status",
  "vehicle-insurance-validation-ussd",
  "nin-sim-linkage",
  "check-nin-sim-linkage-status",
  "fix-failed-nin-sim-linkage",
  "nelfund-student-loan-application",
  "nelfund-loan-status-and-upkeep",
  "nelfund-loan-repayment",
  "electricity-prepaid-meter-application",
  "electricity-meter-paid-not-installed",
  "electricity-estimated-billing-dispute",
  "electricity-complaint-escalation",
  "electricity-tariff-band",
  "vehicle-registration-nvis",
  "verify-vehicle-number-plate",
  "vehicle-proof-of-ownership-verification",
  "nhia-gifship-enrolment",
  "nhia-find-right-health-plan",
  "nhia-private-sector-coverage",
  "pencom-open-rsa",
  "pencom-transfer-rsa",
  "pencom-unremitted-contributions",
  "tinted-glass-permit",
  "nafdac-product-registration",
  "nafdac-product-verification",
  "nafdac-product-renewal",
  "fccpc-consumer-complaint",
  "nhf-registration-and-contributions",
  "nhf-mortgage-loan",
  "nhf-contribution-refund",
  "customs-vehicle-duty-verification",
  "customs-846-non-standard-vin",
  "federal-marriage-application",
  "marriage-document-verification-and-ctc",
  "npc-death-registration",
  "nipo-trademark-registration",
  "nipo-patent-registration",
  "nipo-industrial-design-registration",
  "copyright-work-registration",
  "nepc-exporter-registration",
  "nepc-exporter-certificate-renewal-verification",
  "smedan-msme-registration",
  "bpp-contractor-registration",
  "soncap-import-certification",
  "son-mancap-certification",
  "son-product-registration",
  "nsitf-employer-registration",
  "nsitf-workplace-injury-claim",
  "nsitf-compliance-certificate",
  "nde-rhei-registration",
  "e-cerpac-application",
  "e-cerpac-renewal",
  "diaspora-contactless-passport-renewal",
  "pencom-job-loss-25-percent-withdrawal",
  "pencom-micro-pension-registration",
  "jamb-change-course-institution",
  "jamb-change-name",
  "jamb-correct-date-of-birth",
  "jamb-correct-gender",
  "jamb-correct-state-lga",
  "cbn-bank-complaint",
  "ncc-telecom-complaint",
  "fmbn-home-renovation-loan",
  "scuml-certificate-registration",
  "scuml-certificate-verification",
  "pencom-pension-clearance-certificate",
  "itf-employer-registration",
  "itf-compliance-certificate",
  "lagos-lasrra-registration",
  "lagos-land-use-charge",
  "lagos-tax-clearance-verification",
  "lagos-building-completion-certificate",
  "fct-tax-clearance-application",
  "ogun-taxpayer-registration",
  "ogun-tax-clearance-certificate",
  "rivers-rivtin-registration",
  "rivers-tax-clearance-certificate",
  "cac-change-director",
  "cac-change-registered-address",
  "cac-beneficial-ownership-psc",
  "inec-new-voter-registration",
  "inec-voter-transfer",
  "inec-update-voter-information",
  "inec-replace-lost-damaged-pvc",
  "inec-find-pvc-pickup-location",
  "inec-polling-unit-locator",
  "nigeria-embassy-netherlands-contact",
  "jamb-matriculation-list",
  "jamb-regularization-condonement",
  "cac-public-search",
  "bvn-validation",
  "bvn-data-update",
  "nrs-tax-id-retrieval",
  "passport-application-tracking",
  "drivers-licence-verification",
  "waec-2026-private-candidates-timetable",
  "neco-2026-timetable",
  "ninauth-nin-verification",
  "nabteb-result-checker",
  "check-nin-number",
  "unclaimed-dividends-nigeria",
  "jamb-examination-slip-2026",
  "passport-appointment",
  "passport-centre-availability",
  "passport-photo-compliance",
  "emergency-travel-certificate",
  "nafdac-food-product-registration",
  "nafdac-cosmetics-registration",
  "nafdac-medical-device-registration",
  "nafdac-drug-product-registration",
  "cac-change-company-name",
  "cac-increase-issued-share-capital",
  "cac-letter-good-standing",
  "cac-company-secretary-change",
  "cac-alter-memorandum-articles",
  "cac-private-to-public-reregistration",
  "cac-public-to-private-reregistration",
  "cac-reduce-issued-share-capital",
  "cac-return-of-allotment",
  "cac-register-company-charge",
  "cac-satisfy-company-charge",
  "cac-voluntary-striking-off",
  "nafdac-herbal-supplement-registration",
  "nafdac-pesticide-registration",
  "nafdac-animal-feed-registration",
  "mtn-esim-activation",
  "airtel-esim-activation",
  "glo-esim-activation",
  "moniepoint-personal-account",
  "moniepoint-ussd-banking",
  "firstbank-open-account",
  "uba-open-account",
  "access-bank-solo-account",
  "dstv-pay-reconnect",
  "dstv-change-package",
  "gotv-pay-reconnect",
  "air-peace-book-flight",
  "air-peace-online-check-in",
  "air-peace-reschedule-flight",
  "air-peace-extra-baggage",
  "air-peace-lost-baggage",
  "dhl-send-parcel-nigeria",
  "dhl-track-shipment-nigeria",
  "british-council-ielts-registration-nigeria",
  "idp-ielts-registration-nigeria",
  "gigm-book-bus-nigeria",
  "ekedp-pay-bill-buy-token",
  "ekedp-prepaid-meter-application",
  "starlink-activate-kit-nigeria",
  "starlink-reactivate-service-nigeria",
  "synlab-home-sample-collection",
  "synlab-pathprovider-results",
  "evercare-book-appointment",
  "paystack-business-activation-nigeria",
  "paystack-physical-terminal-nigeria",
  "leadway-buy-motor-insurance-online",
  "uber-driver-signup-nigeria",
  "bolt-driver-signup-nigeria",
  "smile-recharge-data-nigeria",
  "spectranet-recharge-renew-plan",
  "konga-return-refund",
  "konga-seller-registration",
  "jumia-seller-registration-nigeria",
  "gtbank-737-open-account",
  "gtbank-block-debit-card",
  "zenith-online-account-opening",
  "stanbic-bizsmart-account",
  "fidelity-business-account-online",
  "flutterwave-business-account-nigeria",
  "opay-account-opening-nigeria",
  "opay-emergency-lock-account-card",
  "kuda-personal-account-opening",
  "kuda-account-tier-upgrade",
  "ikeja-electric-pay-bill-buy-token",
  "ikeja-electric-prepaid-meter-application",
  "toefl-registration-nigeria",
  "gre-registration-nigeria",
  "pte-registration-nigeria",
  "gmat-registration-nigeria",
  "axa-mansard-third-party-motor-insurance",
  "gigl-send-parcel-nigeria",
  "gigl-track-shipment",
  "gigl-international-export-nigeria",
  "guo-book-bus-online",
  "guo-change-travel-date",
  "palmpay-account-registration",
  "kuda-business-account-opening",
  "aedc-pay-bill-buy-token",
  "aedc-map-meter-application",
  "aedc-map-refund",
  "ibedc-pay-bill-buy-token",
  "ibedc-map-meter-application",
  "ibedc-map-refund",
  "ibedc-band-a-compensation-token",
  "ecobank-xpress-account",
  "ecobank-classic-savings-account",
  "ecobank-xpress-point-agent",
  "ecobank-dormant-account-reactivation",
  "fcmb-online-savings-account",
  "fcmb-business-account-online",
  "alat-account-opening",
  "alat-debit-card-request-activation",
  "sterling-onebank-account-opening",
  "sterling-onebank-tier-upgrade",
  "hygeia-health-plan-purchase",
  "hygeia-provider-directory",] as const;
const representative = [
  {
    "slug": "passport-renewal",
    "status": "verified",
    "officialPortal": "https://passport.immigration.gov.ng/",
    "related": [
      "first-nigerian-passport",
      "passport-change-of-data"
    ],
    "sources": [
      "https://immigration.gov.ng/info-center/renewal-of-passport/",
      "https://immigration.gov.ng/passports/",
      "https://immigration.gov.ng/nigeria-immigration-service-announces-upward-review-of-nigerian-standard-passport-fees/",
      "https://immigration.gov.ng/wp-content/uploads/2025/10/SERVICE_LEVEL_AGREEMENT_2025_.pdf"
    ],
    "requirements": [
      "NIN slip",
      "Current passport booklet",
      "Valid email address for NIS communication",
      "For a simple expiry renewal, keep the NIN and current passport ready; if the request is actually a reissue for loss, damage or data change, use the dedicated guide because the supporting evidence changes with the reason"
    ],
    "steps": [
      "Sign in to the NIS passport application dashboard and choose Apply for Renewal/Reissue.",
      "Verify the NIN using the requested date-of-birth check, then enter the current passport details and review the NIN/passport data comparison.",
      "Select the processing centre and booklet size, upload an ICAO-compliant photograph and the supporting documents required for the application type.",
      "Review and submit the application, complete the official payment and book the biometric-enrolment appointment.",
      "Appear at the selected Immigration office for biometric data capture."
    ]
  },
  {
    "slug": "nin-date-of-birth-modification",
    "status": "verified",
    "officialPortal": "https://selfservicemodification.nimc.gov.ng/",
    "related": [],
    "sources": [
      "https://nimc.gov.ng/fees",
      "https://nimc.gov.ng/self-service-modifications/",
      "https://nimc.gov.ng/nin/nin-modifications-adults/"
    ],
    "requirements": [
      "Existing NIN",
      "Digitised NPC birth certificate for applicants born after 1992, or digitised NPC attestation certificate for applicants born before 1992",
      "Access to the NIMC self-service modification account or an official NIMC enrolment/modification centre",
      "Payment through the official NIMC modification route"
    ],
    "steps": [
      "Open NIMC's official self-service modification portal and verify your NIN/login details.",
      "Choose Date of Birth modification and complete the payment requested by the official portal.",
      "Enter and validate the NPC certificate or attestation details, then upload the required supporting document.",
      "Preview the change, submit the request and keep the modification transaction slip.",
      "Follow the approval status in the portal; after approval, download or print the updated NIN slip."
    ]
  },
  {
    "slug": "uk-standard-visitor-visa",
    "status": "verified",
    "officialPortal": "https://www.gov.uk/standard-visitor/apply-standard-visitor-visa",
    "related": [
      "canada-visitor-visa",
      "us-b1-b2-visitor-visa",
      "france-schengen-short-stay-visa"
    ],
    "sources": [
      "https://www.gov.uk/standard-visitor/apply-standard-visitor-visa",
      "https://www.gov.uk/find-a-visa-application-centre",
      "https://www.gov.uk/government/publications/uk-visa-requirements-list-for-carriers/uk-visa-requirements-for-international-carriers"
    ],
    "requirements": [
      "A valid Nigerian passport or travel document that remains valid for the whole UK stay",
      "Planned UK travel dates, where the applicant will stay and the estimated total trip cost",
      "Income and funding information, including annual income and the identity/details of anyone paying for the trip where applicable",
      "Evidence supporting the purpose of the visit, ability to support the trip and intention to leave the UK at the end of the visit",
      "Travel history, employer/contact information and UK family/host details where the online form asks for them",
      "For an applicant under 18: suitable travel/accommodation arrangements and written parent/guardian consent; an unaccompanied child also needs the parent/guardian's full contact details and evidence of the person/place where the child will stay",
      "Certified English or Welsh translations for any supporting document that is in another language"
    ],
    "steps": [
      "Confirm that the planned activity is permitted under the Standard Visitor route and that a Nigerian passport holder requires a UK visa before travel.",
      "Complete the official online Standard Visitor application with the travel dates, accommodation, funding, employment/family and immigration-history information that applies to the applicant.",
      "Upload or prepare the supporting evidence requested by UKVI, pay the official visa fee and use the application flow to book the visa application centre appointment.",
      "Attend the assigned UK visa application centre to prove identity with the passport, provide fingerprints and a photograph, and submit the supporting documents in the method shown by the application.",
      "Wait for the UKVI decision email and follow the instructions for accessing the visa/eVisa or any passport-related next step; do not book non-refundable travel until a decision is issued."
    ]
  },
  {
    "slug": "china-tourist-visa-nigeria",
    "status": "verified",
    "officialPortal": "https://www.visaforchina.cn/",
    "related": [
      "turkiye-tourist-visa",
      "uae-tourist-visa",
      "australia-visitor-visa-600"
    ],
    "sources": [
      "https://ng.china-embassy.gov.cn/eng/lsfw/zytz/202409/t20240906_11486896.htm"
    ],
    "requirements": [
      "Original passport with at least 6 months remaining validity and blank visa pages, plus a photocopy of the passport data page",
      "China Online Visa Application form completed online and printed, plus the confirmation page",
      "Recent colour passport photograph with white background meeting Chinese visa specifications",
      "For an L tourist visa, Nigerian citizens must join a tourist group of more than five people and the group must provide a tourism invitation letter issued by an authorised travel agency in China",
      "Travel itinerary and any other document the Chinese Embassy/Consulate or Visa Application Centre requests for the specific case",
      "Funds/payment for the visa fee and the separate China Visa Application Centre service charge"
    ],
    "steps": [
      "Confirm the correct Chinese visa category; for tourism, the Embassy's Nigeria guidance classifies it as an L visa and states a special group-tour requirement for Nigerian citizens.",
      "Complete the China Online Visa Application form, print the application and confirmation pages, and prepare the passport, photograph and authorised Chinese travel-agency group invitation required for the Nigerian L-visa route.",
      "Submit the application through the China Visa Application Centre in Abuja or Lagos using the centre's current submission/appointment procedure, pay the visa and centre service fees, and provide fingerprints where the current rules require them.",
      "Keep the CVAC receipt/tracking information while the application is assessed and promptly provide any additional material requested by the Embassy or Consulate General.",
      "Collect the passport through the centre after notification and verify the visa category, number of entries, validity and duration of stay before travelling."
    ]
  }
] as const;

test("structured service catalog preserves every current guide", () => {
  expect(services).toHaveLength(312);
  expect(publicServices).toHaveLength(312);
  expect(services.map((service) => service.slug)).toEqual(expectedSlugs);
  for (const expected of representative) {
    const actual = services.find((service) => service.slug === expected.slug);
    expect(actual).toBeTruthy();
    expect(actual?.status).toBe(expected.status);
    expect(actual?.officialPortal).toBe(expected.officialPortal);
    expect(actual?.related).toEqual(expected.related);
    expect(actual?.sources.map((source) => source.url)).toEqual(expected.sources);
    expect(actual?.requirements).toEqual(expected.requirements);
    expect(actual?.steps).toEqual(expected.steps);
  }
});

test("catalog validation rejects malformed records and duplicate slugs", () => {
  const valid = services.slice(0, 2).map((service) => structuredClone(service));

  expect(() => validateServiceCatalog([{ ...valid[0], status: "published" }])).toThrow();
  expect(() => validateServiceCatalog([{ ...valid[0], slug: "" }])).toThrow();
  expect(() => validateServiceCatalog([{ ...valid[0], sources: [{ ...valid[0].sources[0], url: "http://example.com" }] }])).toThrow();
  expect(() => validateServiceCatalog([valid[0], { ...valid[1], slug: valid[0].slug }])).toThrow(/duplicate/i);
});

test("catalog serialization is deterministic and round-trips", () => {
  const serialized = serializeServiceCatalog(services);
  expect(serialized.endsWith("\n")).toBe(true);
  expect(serialized).toBe(JSON.stringify(services, null, 2) + "\n");
  expect(validateServiceCatalog(JSON.parse(serialized))).toEqual(services);
});


test("NIBSS USSD utility services are public and the generic BVN-change guide is removed", async ({ page }) => {
  await page.goto("/services/nip-transfer-status");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("NIP transfer");
  await expect(page.getByText("*565*5#", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("₦20", { exact: false }).first()).toBeVisible();

  await page.goto("/services/vehicle-insurance-validation-ussd");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("vehicle insurance");
  await expect(page.getByText("*565*11#", { exact: false }).first()).toBeVisible();

  await page.goto("/services/bvn-change-details");
  await expect(page).toHaveURL(/\/topics\/bvn$/);
  await expect(page.getByRole("heading", { name: /How to Check BVN/i })).toBeVisible();
});
