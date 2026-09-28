import type { Service, Source } from "@/lib/types";

export type OfficialServiceLinks = {
  guidanceUrl?: string;
  guidanceLabel?: string;
  actionUrl?: string;
  actionLabel?: string;
};

const exactGuidanceOverrides: Record<string, string> = {
  "passport-renewal": "https://immigration.gov.ng/info-center/renewal-of-passport/",
  "first-nigerian-passport": "https://immigration.gov.ng/info-center/how-to-apply-for-standard-passport/",
  "passport-change-of-data": "https://immigration.gov.ng/passports/",
  "passport-change-marital-status": "https://immigration.gov.ng/passports/",
  "passport-name-change": "https://immigration.gov.ng/passports/",
  "lost-nigerian-passport": "https://immigration.gov.ng/info-center/how-to-apply-for-the-replacement-of-lost-passport/",
  "official-nigerian-passport": "https://immigration.gov.ng/passports/",
  "nin-date-of-birth-modification": "https://nimc.gov.ng/self-service-modifications/",
  "nin-name-modification": "https://nimc.gov.ng/self-service-modifications/",
  "nin-phone-modification": "https://nimc.gov.ng/self-service-modifications/",
  "nin-address-modification": "https://nimc.gov.ng/self-service-modifications/",
  "nin-slip-reissue": "https://nimc.gov.ng/nin/nin-slip-reissuance",
  "jamb-profile-code": "https://www.jamb.gov.ng/FAQ",
  "jamb-retrieve-profile-code": "https://www.jamb.gov.ng/FAQ",
  "jamb-retrieve-lost-epin": "https://www.jamb.gov.ng/FAQ",
  "jamb-reset-profile-password": "https://www.jamb.gov.ng/FAQ",
  "jamb-2026-utme-registration": "https://www.jamb.gov.ng/PDFs/2026/2026%20TRAINING%20MANUAL%20%20final.pdf",
  "jamb-direct-entry-2026": "https://www.jamb.gov.ng/PDFs/2026/2026%20TRAINING%20MANUAL%20%20final.pdf",
  "waec-collect-certificate": "https://waecnigeria.org/faq",
  "waec-lost-certificate": "https://waecnigeria.org/faq",
  "waec-correct-certificate-error": "https://waecnigeria.org/faq",
  "nysc-registration-local": "https://platforms.nysc.gov.ng/mobreg.html",
  "nysc-foreign-trained-registration": "https://nysc.gov.ng/foreignmobreg.html",
  "nysc-relocation": "https://www.nysc.gov.ng/corpmob.html",
  "nysc-call-up-letter": "https://www.nysc.gov.ng/corpmob.html",
  "nysc-correct-date-of-birth": "https://platforms.nysc.gov.ng/correctdob.html",
  "nysc-correct-course-of-study": "https://www.nysc.gov.ng/correctcourse.html",
  "npc-child-birth-registration": "https://www.nationalpopulation.gov.ng/faq-vitalreg",
  "npc-digital-birth-certificate-reissuance": "https://www.reissuance.nationalpopulation.gov.ng/",
  "npc-birth-certificate-reprint": "https://www.certificatereprint.nationalpopulation.gov.ng/",
  "nigeria-tourism-visa": "https://immigration.gov.ng/info-center/tourism-visa-f5a/",
  "nigeria-business-visa": "https://immigration.gov.ng/info-center/business-single-entry-visa-f4a/",
  "nigeria-visiting-visa": "https://immigration.gov.ng/info-center/visiting-single-entry-visa-f6a/",
  "nigeria-transit-visa": "https://immigration.gov.ng/info-center/transit-visa-f3b/",
  "nigeria-temporary-work-permit": "https://immigration.gov.ng/info-center/temporary-work-permit-twp-visa-r10a/",
  "ecowas-travel-certificate": "https://immigration.gov.ng/ecowas-travel-certificate/",
  "yellow-card": "https://health.gov.ng/faqs/",
  "nigeria-landing-exit-card": "https://immigration.gov.ng/lecard/",
  "fct-file-individual-tax-return": "https://fctirs.gov.ng/howto/steps-on-filling-return/",
  "fct-verify-tax-clearance": "https://fctirs.gov.ng/howto/tcc-verification/",
};

const actionOverrides: Record<string, string | null> = {
  "passport-renewal": "https://passport.immigration.gov.ng/",
  "first-nigerian-passport": "https://passport.immigration.gov.ng/",
  "passport-change-of-data": "https://passport.immigration.gov.ng/",
  "passport-change-marital-status": "https://passport.immigration.gov.ng/",
  "passport-name-change": "https://passport.immigration.gov.ng/",
  "lost-nigerian-passport": "https://passport.immigration.gov.ng/",
  "nin-date-of-birth-modification": "https://selfservicemodification.nimc.gov.ng/",
  "nin-name-modification": "https://selfservicemodification.nimc.gov.ng/",
  "nin-phone-modification": "https://selfservicemodification.nimc.gov.ng/",
  "nin-address-modification": "https://selfservicemodification.nimc.gov.ng/",
  "jamb-profile-code": null,
  "jamb-2026-utme-registration": null,
  "jamb-direct-entry-2026": null,
  "jamb-retrieve-profile-code": null,
  "jamb-retrieve-lost-epin": null,
  "jamb-reset-profile-password": null,
  "waec-collect-certificate": null,
  "waec-lost-certificate": null,
  "waec-correct-certificate-error": null,
  "npc-digital-birth-certificate-reissuance": "https://www.reissuance.nationalpopulation.gov.ng/",
  "npc-birth-certificate-reprint": "https://www.certificatereprint.nationalpopulation.gov.ng/",
};

const transactionHosts = new Set([
  "passport.immigration.gov.ng",
  "passportintl.immigration.gov.ng",
  "selfservicemodification.nimc.gov.ng",
  "nigeriadriverslicence.frsc.gov.ng",
  "www.nigeriadriverslicence.frsc.gov.ng",
  "icrp.cac.gov.ng",
  "efacility.jamb.gov.ng",
  "jamb.gov.ng",
  "www.waecdirect.org",
  "portal.waec.org",
  "results.neco.gov.ng",
  "everify.neco.gov.ng",
  "payments.neco.gov.ng",
  "ssceinternal.neco.gov.ng",
  "portal.nysc.org.ng",
  "attestation.nationalpopulation.gov.ng",
  "www.reissuance.nationalpopulation.gov.ng",
  "reissuance.nationalpopulation.gov.ng",
  "www.certificatereprint.nationalpopulation.gov.ng",
  "certificatereprint.nationalpopulation.gov.ng",
  "selfservice.nrs.gov.ng",
  "taxporta.fctirs.gov.ng",
  "eras.eirs.gov.ng",
  "tax.services.an.gov.ng",
  "revenue.lagosstate.gov.ng",
  "yellowcard.health.gov.ng",
  "lecard.immigration.gov.ng",
  "possap.gov.ng",
  "cvr.inecnigeria.org",
  "visa.immigration.gov.ng",
  "portal.immigration.gov.ng",
]);

const genericAgencyHosts = new Set([
  "immigration.gov.ng", "www.immigration.gov.ng",
  "nimc.gov.ng", "www.nimc.gov.ng",
  "cbn.gov.ng", "www.cbn.gov.ng",
  "health.gov.ng", "www.health.gov.ng",
  "npf.gov.ng", "www.npf.gov.ng",
  "inecnigeria.org", "www.inecnigeria.org",
  "frsc.gov.ng", "www.frsc.gov.ng",
  "cac.gov.ng", "www.cac.gov.ng",
  "jamb.gov.ng", "www.jamb.gov.ng",
  "waecnigeria.org", "www.waecnigeria.org",
  "neco.gov.ng", "www.neco.gov.ng",
  "nysc.gov.ng", "www.nysc.gov.ng",
  "nationalpopulation.gov.ng", "www.nationalpopulation.gov.ng",
  "nrs.gov.ng", "www.nrs.gov.ng",
  "fctirs.gov.ng", "www.fctirs.gov.ng",
  "eirs.gov.ng", "www.eirs.gov.ng",
  "airs.an.gov.ng", "www.airs.an.gov.ng",
  "revenue.lagosstate.gov.ng",
]);

function normalized(raw: string) {
  try {
    const url = new URL(raw);
    url.hash = "";
    return url.toString();
  } catch {
    return raw;
  }
}

function isGenericHomepage(raw: string) {
  try {
    const url = new URL(raw);
    return genericAgencyHosts.has(url.host) && (url.pathname === "/" || url.pathname === "");
  } catch {
    return false;
  }
}

function sourceScore(source: Source) {
  try {
    const url = new URL(source.url);
    const segments = url.pathname.split("/").filter(Boolean).length;
    let score = segments * 10;
    const label = source.label.toLowerCase();
    if (/official website|home page|homepage/.test(label)) score -= 40;
    if (/fee|timeline|service level agreement|schedule/.test(label)) score -= 12;
    if (/faq|requirements|guidance|registration|modification|certificate|passport|visa|result|licence|verification/.test(label)) score += 8;
    if (url.pathname.toLowerCase().endsWith(".pdf")) score += 2;
    return score;
  } catch {
    return -100;
  }
}

function bestGuidanceSource(service: Service) {
  const candidates = service.sources
    .filter((source) => !isGenericHomepage(source.url))
    .sort((a, b) => sourceScore(b) - sourceScore(a));
  return candidates[0];
}

function isTransactionPortal(raw: string) {
  try {
    const url = new URL(raw);
    return transactionHosts.has(url.host);
  } catch {
    return false;
  }
}

export function getOfficialServiceLinks(service: Service): OfficialServiceLinks {
  const guidanceOverride = exactGuidanceOverrides[service.slug];
  const source = bestGuidanceSource(service);
  const guidanceUrl = guidanceOverride ?? source?.url;

  let actionUrl: string | undefined;
  if (Object.prototype.hasOwnProperty.call(actionOverrides, service.slug)) {
    actionUrl = actionOverrides[service.slug] ?? undefined;
  } else if (service.officialPortal && !isGenericHomepage(service.officialPortal) && isTransactionPortal(service.officialPortal)) {
    actionUrl = service.officialPortal;
  }

  const same = guidanceUrl && actionUrl && normalized(guidanceUrl) === normalized(actionUrl);
  const samePortalLabel = same && actionUrl ? "Open the official service portal ↗" : undefined;

  return {
    guidanceUrl,
    guidanceLabel: guidanceUrl
      ? (samePortalLabel ?? (guidanceOverride ? "Open exact official instructions ↗" : "Open official service guidance ↗"))
      : undefined,
    actionUrl: same ? undefined : actionUrl,
    actionLabel: actionUrl && !same ? "Start on the official service portal ↗" : undefined,
  };
}
