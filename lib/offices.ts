export type OfficeDirectory = {
  agency: string;
  service: string;
  coverage: string;
  description: string;
  directoryUrl: string;
  sourceLabel: string;
  checked: string;
};

export const officeDirectories: OfficeDirectory[] = [
  {
    agency: "Central Bank of Nigeria / authorised BVN channels",
    service: "BVN enrolment routes",
    coverage: "Nationwide",
    description: "CBN says BVN enrolment is available through banks, while its SANEF guidance confirms BVN enrolment is also provided through authorised agent locations.",
    directoryUrl: "https://www.cbn.gov.ng/DFD/energy/sanef.html",
    sourceLabel: "CBN SANEF and BVN guidance",
    checked: "2026-09-28",
  },
  {
    agency: "Federal Ministry of Health and Social Welfare",
    service: "Yellow Card / Port Health route",
    coverage: "Designated Port Health offices",
    description: "Register and pay on the official Yellow Card portal before attending a designated Port Health Services office.",
    directoryUrl: "https://yellowcard.health.gov.ng",
    sourceLabel: "Federal Ministry of Health Port Health guidance",
    checked: "2026-09-28",
  },
  {
    agency: "Federal Capital Territory Internal Revenue Service (FCT-IRS)",
    service: "FCT tax offices",
    coverage: "Federal Capital Territory",
    description: "FCT-IRS publishes a live contact page with tax-office addresses across Abuja and the Area Councils.",
    directoryUrl: "https://fctirs.gov.ng/contact-us/",
    sourceLabel: "FCT-IRS official office directory",
    checked: "2026-09-28",
  },
  {
    agency: "Federal Road Safety Corps (FRSC)",
    service: "Driver's licence capture centres",
    coverage: "State and LGA search",
    description: "Use FRSC's live capture-centre search rather than a copied address list.",
    directoryUrl: "https://www.nigeriadriverslicence.frsc.gov.ng/capturecenter",
    sourceLabel: "Official Nigeria Driver's Licence capture-centre finder",
    checked: "2026-09-28",
  },
  {
    agency: "Joint Admissions and Matriculation Board (JAMB)",
    service: "JAMB state, zonal and annex offices",
    coverage: "Nationwide",
    description: "JAMB's official contact directory lists headquarters, annexes, zonal offices and state offices.",
    directoryUrl: "https://www.jamb.gov.ng/ContactUs",
    sourceLabel: "JAMB official contact and office directory",
    checked: "2026-09-28",
  },
  {
    agency: "National Identity Management Commission (NIMC)",
    service: "NIN enrolment centres",
    coverage: "Nationwide",
    description: "NIMC's official contact page links to its nationwide enrolment-centre directory.",
    directoryUrl: "https://nimc.gov.ng/contact-us",
    sourceLabel: "NIMC official contact and enrolment-centre directory",
    checked: "2026-09-28",
  },
  {
    agency: "Nigeria Immigration Service (NIS)",
    service: "Passport offices",
    coverage: "Nationwide",
    description: "NIS publishes passport-office addresses and contacts in its current Service Level Agreement.",
    directoryUrl: "https://immigration.gov.ng/wp-content/uploads/2026/04/SERVICE-LEVEL-AGREEMENT-2026_.pdf",
    sourceLabel: "NIS 2026 Service Level Agreement",
    checked: "2026-09-28",
  },
  {
    agency: "Corporate Affairs Commission (CAC)",
    service: "CAC state offices",
    coverage: "State offices",
    description: "CAC publishes its state-office leadership and official office information from the Commission's website.",
    directoryUrl: "https://www.cac.gov.ng/about/state-offices-head",
    sourceLabel: "CAC official state offices page",
    checked: "2026-09-28",
  },
];
