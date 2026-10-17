import type { CareerOpportunity } from "@/lib/jobs";

// Source-specific verified issuer hiring states, 17 October 2026.
// A company-wide careers directory is not a confirmed single open vacancy.
type IssuerEvidence = { url: string; answer: string; decisions: [string,string,string]; risk: string };
export const remainingDirectoryReviews20261017: Record<string, IssuerEvidence> = {
  "deloitte-nigeria-careers": {
    "url": "https://www.deloitte.com/ng/en/careers.html",
    "answer": "Deloitte Nigeria separates graduate and student recruitment from experienced professional opportunities. Its careers overview describes audit, consulting, financial and tax functions but does not show a single universal Nigeria intake or closing date.",
    "decisions": [
      "Open Deloitte Nigeria's careers area and select student or experienced hire before searching vacancies; their eligibility and assessment processes differ.",
      "Use the exact Deloitte Nigeria business unit and city when filtering, because a Deloitte network opportunity in another country does not automatically accept Nigerian applicants.",
      "For a graduate route, inspect the specific cohort notice and its qualification or NYSC rules instead of carrying over requirements from an older Deloitte intake."
    ],
    "risk": "Deloitte's careers hub is a general employer directory; only an issuer-posted job or programme notice can establish a current vacancy, its salary, and the closing date."
  },
  "microsoft-africa-development-center-careers": {
    "url": "https://www.microsoft.com/en-us/madc/join-us",
    "answer": "Microsoft Africa Development Center's Join Us page sends candidates to engineering openings and interview preparation; it does not promise that every Microsoft role shown globally is based in Lagos or open to Nigerian applicants.",
    "decisions": [
      "Use the Africa Development Center Join Us page to choose Open Positions rather than treating ADC's office description as a direct application form.",
      "On Microsoft Careers inspect each engineer, design or product job's published city, location flexibility and eligibility before applying; ADC recruitment may also cover Nairobi.",
      "Use Microsoft's interview-preparation guidance after applying to the exact requisition; a talent-community registration or recruiter message is not a submitted application."
    ],
    "risk": "The Africa Development Center careers gateway is not an individual vacancy, and the published employer page does not guarantee a Nigeria-specific intake or application deadline."
  },
  "oracle-careers-nigeria": {
    "url": "https://careers.oracle.com/en/sites/jobsearch",
    "answer": "Oracle's employer-owned job search separates consulting, enterprise technology, cloud, support and sales roles. Search the exact Nigerian work location and read the individual Oracle requisition instead of treating a global search result as Nigeria recruitment.",
    "decisions": [
      "Search Oracle's current jobsearch site with Nigeria or Lagos location filters before choosing the required role category.",
      "Compare technical certifications, domain experience, employment type and relocation or work-authorisation conditions shown in the exact requisition.",
      "Use the Oracle-owned Apply route and the candidate account for a selected role, rather than sending a CV to addresses copied from unofficial vacancy blogs."
    ],
    "risk": "The general Oracle recruitment search offers no universal Nigeria salary, employer-verified closing date or guaranteed availability of a local role."
  },
  "sap-careers-nigeria": {
    "url": "https://jobs.sap.com/go/SAP-Jobs-in-Africa/1307101/",
    "answer": "SAP runs an Africa-focused careers view while moving jobs between a new and an older SAP system. A vacancy missing from one site may require checking the linked former job search, but a talent-community subscription is not a role submission.",
    "decisions": [
      "Open the Africa job view and check the country and city on each SAP job before considering a Lagos or remote position.",
      "SAP's newer careers site points applicants to legacy openings during the transition; check both issuer-linked systems if the role is not in the first search.",
      "Review the exact job family, experience requirements, requisition ID and Apply destination before starting an application; a talent-community sign-up is only an alert."
    ],
    "risk": "SAP's employer statement says job listings are in transition across sites; do not claim all opportunities are in one search or that joining a talent community means applying."
  },
  "ibm-careers-nigeria": {
    "url": "https://www.ibm.com/careers/search",
    "answer": "IBM Careers provides a global search covering consulting, software, infrastructure, AI and cloud services, with a Nigeria location option. A regional Middle East/Africa job result is not automatically a Nigerian duty-station position.",
    "decisions": [
      "Use IBM Careers Search jobs to choose Nigeria as the country filter, then narrow the results by consulting, engineering or relevant business area.",
      "Open the exact role and inspect country, contract type, seniority and required tools or certifications before using the IBM application control.",
      "If the search returns only other African locations, avoid claiming a Lagos vacancy; consider job alerts while waiting for an official Nigeria listing."
    ],
    "risk": "IBM's career homepage describes company opportunities rather than a perpetual Nigerian recruitment exercise; only individual IBM requisitions can verify eligibility and deadlines."
  },
  "google-careers-nigeria": {
    "url": "https://www.google.com/about/careers/applications/jobs/results",
    "answer": "Google Careers is a worldwide searchable jobs catalogue with role, location, seniority, qualification and experience filters. Its unfiltered thousands of roles are not Nigeria openings; an actual Nigerian application requires selecting a job whose location includes Nigeria.",
    "decisions": [
      "Apply a Nigeria or Lagos location constraint on Google Careers first, then use relevant role and experience filters to narrow open requisitions.",
      "Read each Google job's exact minimum qualifications, work location and required years of experience rather than assuming the generic company search admits graduates.",
      "Apply through the selected official Google job details page and keep the applicant confirmation; a saved job search or shared vacancy preview is not a completed application."
    ],
    "risk": "Google's global result count does not represent Nigerian vacancies, and the site does not promise that an open search filter will return a role or accept an application."
  },
  "mastercard-careers-nigeria": {
    "url": "https://careers.mastercard.com/us/en/",
    "answer": "Mastercard, the global payments technology company, lists different engineering, cybersecurity, product and commercial jobs on its own careers platform. Nigeria relevance must be verified from the selected requisition and location, not the global portal header.",
    "decisions": [
      "Use the Mastercard employer careers search and choose Nigeria or Lagos before treating an opportunity as a local vacancy.",
      "Check job function, experience level, location and whether a candidate needs Nigeria work authorisation in the exact Mastercard posting.",
      "Use the Mastercard-owned Apply control on that selected role and check the application's acknowledgement; the company-wide search is only a directory."
    ],
    "risk": "Mastercard global jobs and the separately incorporated Mastercard Foundation have different employer identities and recruitment sites; do not mix their forms."
  },
  "visa-careers-africa": {
    "url": "https://corporate.visa.com/en/careers.html",
    "answer": "Visa's careers site separates new professionals from experienced payments and technology specialists, with a global location-based job search. Its own fraud guidance says legitimate recruiters use official @visa.com addresses and do not request money.",
    "decisions": [
      "Search Visa Careers for exact African country and duty-station filters before claiming a role is located in Nigeria.",
      "Compare the actual job's discipline, level, location and work-authorisation language, rather than assuming an Africa-wide advert accepts every Nigerian applicant.",
      "Check the sender domain and employer ATS before sending identity documents or completing interviews; Visa says it never requests recruitment payments."
    ],
    "risk": "Visa's recruitment-fraud warning specifically covers impersonation: even a role shared on social media is not an authentic vacancy without the exact Visa-owned listing."
  },
  "mastercard-foundation-careers": {
    "url": "https://mastercardfdn.org/en/careers-at-the-mastercard-foundation",
    "answer": "Mastercard Foundation is a nonprofit with a distinct careers portal from Mastercard's payments business. Its mission-led roles and recruitment-fraud notice require checking the Foundation's own application channel and actual African duty station.",
    "decisions": [
      "Open the Mastercard Foundation Careers page and its employer-authorised opportunities link, not Mastercard's separate technology-company careers site.",
      "Check whether the role is in Lagos, another African office, or remote, along with the required development, partnerships or operations background.",
      "Use the Foundation's official applicant flow and retain the submission receipt; decline offers that ask for interview fees or early payments."
    ],
    "risk": "The Foundation warns applicants about fraudulent recruitment contacts, and its general careers page does not promise a current Nigeria-only hiring campaign or fixed application deadline."
  },
  "renaissance-africa-energy-careers": {
    "url": "https://renaissanceafrica.com/careers",
    "answer": "Renaissance Africa Energy's careers area covers oil-and-gas technical and corporate pathways, including Port Harcourt-focused work and an interest or talent-pool route. Joining a talent pool is not equivalent to applying to an actual numbered vacancy.",
    "decisions": [
      "Open Renaissance Africa Energy's own Careers list and separate a specific advertised worksite job from a general talent-pool expression of interest.",
      "For field or engineering roles, check the actual Port Harcourt or operational location and any safety, permit or discipline credentials on that vacancy.",
      "Use only the employer-linked job application method and save its reference; a speculative CV sent to a generic contact does not prove a named role was submitted."
    ],
    "risk": "A live oil-and-gas career page does not confirm that all listed departments currently recruit; any worksite, project term or application cutoff needs an exact vacancy notice."
  },
  "standard-chartered-careers-nigeria": {
    "url": "https://www.sc.com/en/global-careers/",
    "answer": "Standard Chartered separates graduate and internship programmes from experienced banking jobs. Its actual job board publishes requisition-specific Lagos locations and posting-end dates, unlike the undated broad careers introduction.",
    "decisions": [
      "Choose Early Careers or Experienced Professionals from Standard Chartered's original careers hub before viewing positions.",
      "At jobs.standardchartered.com select Nigeria duty-station jobs and read the individual posting's requisition number, published closing date and employment level.",
      "For experienced investment or wealth roles, use the exact bank requisition and business area; do not mistake an internationally advertised graduate programme for a Lagos job."
    ],
    "risk": "The Bank's live recruitment pages can have distinct posting-end dates and work locations. This general directory must not borrow the deadline of another requisition."
  },
  "kuda-careers": {
    "url": "https://www.kuda.com/careers/",
    "answer": "Kuda's employer careers site introduces the fintech's values and provides a View our job openings action. The landing page does not on its own establish how many engineering, support, product or operations roles are currently accepting applications.",
    "decisions": [
      "Use View our job openings from Kuda's official careers page to reach its candidate-facing vacancy list rather than relying on a social-media screenshot.",
      "Filter each resulting Kuda role by Nigerian worksite, remote or hybrid status and compare its technical and experience requirements before submitting.",
      "Prepare the exact resume or portfolio relevant to the selected Kuda team, then use that requisition's authorised application process."
    ],
    "risk": "Kuda's marketing description is not a published opening; there is no fixed all-company deadline, no guaranteed intake and no requirement to pay an unofficial recruiter."
  },
  "opay-careers-nigeria": {
    "url": "https://careers.opayweb.com/",
    "answer": "OPay's employer-controlled Beyond Hiring portal lists separate Nigerian roles with individual application deadlines. On 17 October it displays dated adverts such as Graphic Designer and Events Manager; an unexpired advert is not approval for every applicant.",
    "decisions": [
      "Open OPay Beyond Hiring and use the search and location filters to identify the current exact Lagos, corporate or operations vacancy.",
      "Check the chosen posting's own Published and Deadline fields; some OPay jobs have a deadline while other jobs display none.",
      "Read the employer's duties and eligibility and proceed only through the role-specific Apply page, keeping the acknowledgement from the OPay system."
    ],
    "risk": "OPay's named Graphic Designer and Events Manager roles had different closing dates on the checked careers board; no single deadline or open-status assertion can be applied to the whole company."
  },
  "nomba-careers": {
    "url": "https://nomba.com/careers",
    "answer": "Nomba's company-controlled career pages conflict in the observed listings: its main roles page reports no open roles, while a Nomba-branded Zoho Recruit jobs directory lists separate recent positions. Candidates must verify the current canonical employer link before assuming either list is accepting new applications.",
    "decisions": [
      "Start with Nomba's own careers page and follow its current vacancy links; do not assume a search result from a recruiting mirror is authorised.",
      "Compare the role's title, experience, location and date across the Nomba website and any Nomba-linked Zoho Recruit destination, especially where the two listings disagree.",
      "If the employer main site says No open roles, contact the company's official careers route to verify a separately surfaced role before submitting sensitive documents."
    ],
    "risk": "The Nomba roles landing page reported no open roles during the check while a separate branded recruiting directory showed listings; the conflict requires further source confirmation before promising a working form."
  },
  "bat-nigeria-careers": {
    "url": "https://careers.bat.com/en/search-jobs/nigeria/1045/1/1",
    "answer": "British American Tobacco's Nigeria careers search offers a country-specific jobs filter but the visible results can include listings whose actual work location is elsewhere. A Nigeria category result does not override the location printed on the individual vacancy.",
    "decisions": [
      "Open BAT's official Nigeria search and compare each result's printed location with the country filter before selecting a job.",
      "Where a BAT result says Cape Town or another location, do not describe it as a Lagos job; read the exact contractual worksite and work-authorisation requirement.",
      "Apply through BAT's own requisition after verifying role family and current application stage; the generic results screen is not an applicant confirmation."
    ],
    "risk": "The checked employer results include location mismatches with the Nigeria category. Candidates must trust the exact listing's stated duty station, not a broad search heading."
  },
  "halliburton-nigeria-careers": {
    "url": "https://careers.halliburton.com/location/nigeria-jobs/543/2328926/2/2",
    "answer": "Halliburton's Nigeria jobs filter directs candidates into an international energy-services recruitment platform. Its technical, field engineering and maintenance requirements vary by position, and region search results should not be treated as a blanket Nigeria recruitment notice.",
    "decisions": [
      "Use the Halliburton Nigeria jobs landing page and verify that the exact selected title names a Nigerian worksite such as Port Harcourt.",
      "Check field-service rotation, licence, technical training, safety certifications and role grade on the individual description before applying.",
      "Use the Halliburton-owned job application profile and retain its submission acknowledgement; a global vacancy filter or job alert alone is not an application."
    ],
    "risk": "Halliburton's global country and category filter counts can change and may not reflect actual recruiting at every Nigerian facility on every date."
  },
  "oau-careers": {
    "url": "https://apply.oauife.edu.ng/",
    "answer": "Obafemi Awolowo University's recruitment portal still presents material from its 2025 academic and non-teaching hiring exercise, including interview notices. That historical portal is not evidence of a fresh 2026 application window.",
    "decisions": [
      "Read the OAU portal's notice date and recruitment year before selecting any academic, administrative or technical category.",
      "If the dashboard only gives 2025 shortlisting, CBT or interview instructions, use it for that concluded cohort's records, not to create a new 2026 application.",
      "For a later OAU notice, compare the vacancy department, qualifications and university-authorised application destination with a fresh dated public announcement."
    ],
    "risk": "The issuer site is explicitly headed OAU 2025 Job Application Portal; showing interview communications does not demonstrate an active new 2026 intake."
  },
  "eha-clinics-careers": {
    "url": "https://erp.eha.ng/jobs",
    "answer": "EHA Clinics operates an employer jobs board for clinical and corporate positions in Nigeria. The selected vacancy's site, current professional licence, NYSC completion and role-specific experience requirements determine eligibility, not a universal EHA form.",
    "decisions": [
      "Open EHA Clinics Job Offers and choose the exact nursing, physician, pharmacist or support vacancy by city and requisition title.",
      "For regulated clinical work, verify the correct current Nigerian professional registration and evidence of post-NYSC practice against the employer's listing.",
      "Complete the selected role's employer eligibility screening and confirm the official Apply transaction before treating the application as submitted."
    ],
    "risk": "An EHA Clinics listing can close or move even while the company's jobs dashboard remains visible; job-specific eligibility, remuneration and deadlines must not be generalised."
  }
};

const followUp = [
  "Before sending personal data, reread the exact original employer requisition for its duty station, eligibility, application deadline and currently accepting form.",
  "If a named role is accepting applications, submit through the issuer-owned Apply control and retain the system receipt. Never pay an intermediary for an interview or placement."
];

export function applyRemainingDirectoryReviews20261017(item: CareerOpportunity): CareerOpportunity {
  const review=remainingDirectoryReviews20261017[item.slug];
  if(!review || item.kind!=="career-page" || item.status!=="career-page" || item.officialUrl!==review.url) return item;
  const sources=[...item.sources];
  const i=sources.findIndex(x=>x.url===review.url);
  if(i>=0) sources[i]={...sources[i],lastChecked:"2026-10-17"};
  else sources.push({label:item.organization+" original employer recruitment entry point",url:review.url,lastChecked:"2026-10-17"});
  return {
    ...item,
    summary:review.answer,
    statusLabel:"Issuer careers directory reviewed 17 October — verify an exact live role",
    verifiedAt:"2026-10-17",
    posting:undefined,
    deadline:undefined,
    applicationSteps:[...review.decisions,...followUp],
    nextMilestone:review.risk,
    sourceNotes:[review.risk,
      "Individual employer-specific application instructions checked 17 October 2026. This does not authenticate a successful application, a future company-wide intake, or a vacancy form."],
    sources
  };
}

export function hasCompletedRemainingDirectoryReview(item:CareerOpportunity, now:string):boolean{
  const x=remainingDirectoryReviews20261017[item.slug];
  if(!x || item.kind!=="career-page"||item.status!=="career-page"||item.posting||item.deadline||item.officialUrl!==x.url) return false;
  const days=(Date.parse(now+"T00:00:00Z")-Date.parse(item.verifiedAt+"T00:00:00Z"))/86400000;
  if(!Number.isFinite(days)||days<0||days>14)return false;
  const steps=[...x.decisions,...followUp];
  if(item.summary!==x.answer||item.statusLabel!=="Issuer careers directory reviewed 17 October — verify an exact live role"||
    item.nextMilestone!==x.risk||!item.sourceNotes.includes(x.risk)||
    item.applicationSteps.length!==steps.length||!steps.every(s=>item.applicationSteps.includes(s))||
    new Set(item.applicationSteps).size!==steps.length||
    item.requirements.length<3||item.qualifications.length<2) return false;
  return item.sources.some(s=>s.url===x.url&&s.lastChecked===item.verifiedAt);
}
