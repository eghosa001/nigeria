export type ServiceLocationEntry = {
  agency: string;
  service: string;
  detail: string;
  address?: string;
  officialUrl: string;
  sourceLabel: string;
  checked: string;
  relatedServiceSlugs: string[];
};

export type ServiceLocationCity = {
  slug: string;
  city: string;
  state: string;
  title: string;
  description: string;
  lastVerified: string;
  entries: ServiceLocationEntry[];
};

const checked = "2026-10-03";
const jamb = "https://www.jamb.gov.ng/ContactUs";
const nimc = "https://nimc.gov.ng/contact-us";
const frsc = "https://www.nigeriadriverslicence.frsc.gov.ng/capturecenter";
const cac = "https://www.cac.gov.ng/about/state-offices-head";
const nis = "https://immigration.gov.ng/wp-content/uploads/2026/04/SERVICE-LEVEL-AGREEMENT-2026_.pdf";

function liveFinderEntries(city: string): ServiceLocationEntry[] {
  return [
    {
      agency: "NIMC",
      service: "NIN enrolment and modification centres",
      detail: "Use NIMC's official enrolment-centre directory for the current " + city + " location instead of relying on an old copied address.",
      officialUrl: nimc,
      sourceLabel: "NIMC official contact and enrolment-centre directory",
      checked,
      relatedServiceSlugs: ["nin-enrolment", "nin-name-modification", "nin-date-of-birth-modification"],
    },
    {
      agency: "FRSC",
      service: "Driver's licence capture centres",
      detail: "Use FRSC's live capture-centre finder and select the relevant state and LGA before travelling.",
      officialUrl: frsc,
      sourceLabel: "Nigeria Driver's Licence capture-centre finder",
      checked,
      relatedServiceSlugs: ["new-drivers-licence", "renew-drivers-licence"],
    },
    {
      agency: "Corporate Affairs Commission",
      service: "CAC state office route",
      detail: "CAC publishes its current state-office information. Registration and most post-registration filings begin through CAC's online portal.",
      officialUrl: cac,
      sourceLabel: "CAC official state offices page",
      checked,
      relatedServiceSlugs: ["cac-company-registration", "cac-business-name-registration", "cac-status-report"],
    },
  ];
}

export const serviceLocationCities: ServiceLocationCity[] = [
  {
    slug: "lagos-government-service-offices",
    city: "Lagos",
    state: "Lagos State",
    title: "Government Service Offices in Lagos",
    description: "Official routes for JAMB, Nigerian passport, NIN, driver's-licence and CAC services in Lagos.",
    lastVerified: checked,
    entries: [
      {
        agency: "JAMB",
        service: "JAMB Lagos annex",
        detail: "JAMB's current contact directory lists its Lagos National Headquarters Annex.",
        address: "11 Ojora Road, Ikoyi, Lagos, Lagos State",
        officialUrl: jamb,
        sourceLabel: "JAMB official contact directory",
        checked,
        relatedServiceSlugs: ["jamb-2026-utme-registration", "jamb-direct-entry-2026", "jamb-caps"],
      },
      {
        agency: "Nigeria Immigration Service",
        service: "Passport offices in Lagos",
        detail: "The NIS 2026 Service Level Agreement lists Lagos passport offices at Ikoyi, Festac and Alausa. Follow the office and appointment shown in your NIS application.",
        officialUrl: nis,
        sourceLabel: "NIS 2026 Service Level Agreement",
        checked,
        relatedServiceSlugs: ["passport-renewal", "first-nigerian-passport"],
      },
      ...liveFinderEntries("Lagos"),
    ],
  },
  {
    slug: "abuja-government-service-offices",
    city: "Abuja",
    state: "Federal Capital Territory",
    title: "Government Service Offices in Abuja",
    description: "Official routes for JAMB, NIN, driver's-licence and CAC services in Abuja.",
    lastVerified: checked,
    entries: [
      {
        agency: "JAMB",
        service: "JAMB FCT and zonal office",
        detail: "JAMB's current contact directory lists its FCT/Zonal Office in Kado Sabo.",
        address: "JAMB Close, off Jonathan Oghenero Esin Street, Kado Sabo, opposite Kado Fish Market, Abuja",
        officialUrl: jamb,
        sourceLabel: "JAMB official contact directory",
        checked,
        relatedServiceSlugs: ["jamb-2026-utme-registration", "jamb-direct-entry-2026", "jamb-caps"],
      },
      {
        agency: "NIMC",
        service: "NIMC headquarters and enrolment-centre directory",
        detail: "NIMC publishes its Abuja headquarters contact and links to the nationwide enrolment-centre directory.",
        address: "11 Sokode Crescent, off Dalaba Street, Zone 5, Wuse, Abuja",
        officialUrl: nimc,
        sourceLabel: "NIMC official contact page",
        checked,
        relatedServiceSlugs: ["nin-enrolment", "nin-name-modification", "nin-date-of-birth-modification"],
      },
      {
        agency: "FRSC",
        service: "Driver's licence capture centres",
        detail: "Use FRSC's live capture-centre finder and select the FCT before travelling.",
        officialUrl: frsc,
        sourceLabel: "Nigeria Driver's Licence capture-centre finder",
        checked,
        relatedServiceSlugs: ["new-drivers-licence", "renew-drivers-licence"],
      },
      {
        agency: "Corporate Affairs Commission",
        service: "CAC Abuja office route",
        detail: "CAC publishes its official Abuja contact and online filing routes.",
        officialUrl: "https://www.cac.gov.ng/",
        sourceLabel: "CAC official website",
        checked,
        relatedServiceSlugs: ["cac-company-registration", "cac-business-name-registration", "cac-status-report"],
      },
    ],
  },
  {
    slug: "benin-city-government-service-offices",
    city: "Benin City",
    state: "Edo State",
    title: "Government Service Offices in Benin City",
    description: "Official routes for JAMB, passport, NIN, driver's-licence and CAC services in Benin City.",
    lastVerified: checked,
    entries: [
      {
        agency: "JAMB",
        service: "JAMB Edo Zonal Office",
        detail: "JAMB's current contact directory lists the Edo Zonal Office in Benin City.",
        address: "Blessed Avenue, off Limit Road, off Sapele Road, G.R.A., Benin City, Edo State",
        officialUrl: jamb,
        sourceLabel: "JAMB official contact directory",
        checked,
        relatedServiceSlugs: ["jamb-2026-utme-registration", "jamb-direct-entry-2026", "jamb-caps"],
      },
      {
        agency: "Nigeria Immigration Service",
        service: "Edo Passport Office",
        detail: "The NIS 2026 Service Level Agreement lists the Edo Passport Office in Benin City.",
        officialUrl: nis,
        sourceLabel: "NIS 2026 Service Level Agreement",
        checked,
        relatedServiceSlugs: ["passport-renewal", "first-nigerian-passport"],
      },
      ...liveFinderEntries("Benin City"),
    ],
  },
  {
    slug: "port-harcourt-government-service-offices",
    city: "Port Harcourt",
    state: "Rivers State",
    title: "Government Service Offices in Port Harcourt",
    description: "Official routes for JAMB, passport, NIN, driver's-licence and CAC services in Port Harcourt.",
    lastVerified: checked,
    entries: [
      {
        agency: "JAMB",
        service: "JAMB Rivers Zonal Office",
        detail: "JAMB's current contact directory lists the Rivers Zonal Office in Port Harcourt.",
        address: "No. 10 Aba Road, opposite Abali Park, Port Harcourt, Rivers State",
        officialUrl: jamb,
        sourceLabel: "JAMB official contact directory",
        checked,
        relatedServiceSlugs: ["jamb-2026-utme-registration", "jamb-direct-entry-2026", "jamb-caps"],
      },
      {
        agency: "Nigeria Immigration Service",
        service: "Rivers Passport Office",
        detail: "The NIS 2026 Service Level Agreement lists the Rivers Passport Office in Port Harcourt.",
        officialUrl: nis,
        sourceLabel: "NIS 2026 Service Level Agreement",
        checked,
        relatedServiceSlugs: ["passport-renewal", "first-nigerian-passport"],
      },
      ...liveFinderEntries("Port Harcourt"),
    ],
  },
  {
    slug: "kano-government-service-offices",
    city: "Kano",
    state: "Kano State",
    title: "Government Service Offices in Kano",
    description: "Official routes for JAMB, passport, NIN, driver's-licence and CAC services in Kano.",
    lastVerified: checked,
    entries: [
      {
        agency: "JAMB",
        service: "JAMB Kano Zonal Office",
        detail: "JAMB's current contact directory lists its Kano Zonal Office in Kumbotso LGA.",
        address: "Adjacent Kano State Legislative Quarters, Km. 12, along Maiduguri Road, Farawa, Kumbotso LGA, Kano State",
        officialUrl: jamb,
        sourceLabel: "JAMB official contact directory",
        checked,
        relatedServiceSlugs: ["jamb-2026-utme-registration", "jamb-direct-entry-2026", "jamb-caps"],
      },
      {
        agency: "Nigeria Immigration Service",
        service: "Kano Passport Office",
        detail: "The NIS 2026 Service Level Agreement lists the Kano Passport Office.",
        officialUrl: nis,
        sourceLabel: "NIS 2026 Service Level Agreement",
        checked,
        relatedServiceSlugs: ["passport-renewal", "first-nigerian-passport"],
      },
      ...liveFinderEntries("Kano"),
    ],
  },
];

export function getServiceLocationCity(slug: string) {
  return serviceLocationCities.find((city) => city.slug === slug);
}
