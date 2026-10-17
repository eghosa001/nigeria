import type { CareerOpportunity } from "@/lib/jobs";

// Actual issuer-owned career destinations reviewed on 16 October 2026.
// An accessible portal is NOT proof of an open role, valid authenticated
// application, human review, future intake, or employer affiliation.
export const issuerPortalEvidence20261016: Record<string, {
  sourceUrl: string; fact: string; actions: [string, string, string];
}> = {
  "access-bank-early-careers": {
    sourceUrl: "https://careers.accessbankplc.com/jobs",
    fact: "Access Bank's employer job board has a live 'Search our open positions' control. The board is a directory; it is not evidence that the Entry Level Training Programme or a particular internship is accepting applications today.",
    actions: ["Use the Search our open positions control, then select the Nigeria location and the exact training, internship or vacancy title before applying.",
      "Check the role's eligibility, required degree, advertised location, closing date and its own Apply route; an Access Bank career-account sign-up is not an application to every opening.",
      "Do not apply to a discontinued trainee intake or guess an application deadline from the bank's general recruitment publicity."],
  },
  "gtbank-entry-level-careers": {
    sourceUrl: "https://www.gtbank.com/about/careers/career-opportunities",
    fact: "GTBank's official career-opportunities page loads recruitment details dynamically; its public landing-page response did not independently expose a verified, currently open Entry Level Programme application form.",
    actions: ["Open GTBank's career-opportunities page and allow its listings or linked application platform to load before deciding whether an entry-level programme is open.",
      "Only use a role-specific GTBank listing whose requirements, location, date and Apply destination are visible; preserve a copy of the final submission acknowledgement.",
      "If the employer page is blank or JavaScript-dependent, treat availability as unverified instead of sending CVs to an address inferred from another bank's process."],
  },
  "uba-careers-graduate-programme": {
    sourceUrl: "https://roa.ubagroup.com/about-uba/careers/career-application/",
    fact: "UBA describes its Academy and career development on its corporate careers page; those employer-background sections are not a live 2026 graduate recruitment announcement or a guaranteed graduate application form.",
    actions: ["Distinguish the UBA Academy employee-development information from an actual external trainee vacancy or programme intake.",
      "Follow an issuer-linked current recruitment notice only after checking the specific job title, country, eligibility, deadline and genuine application control.",
      "Do not interpret UBA's corporate recruitment philosophy or Academy marketing as proof that a 2026 trainee programme is open."],
  },
  "firstbank-graduate-trainee-careers": {
    sourceUrl: "https://firstbankgroup.com/ng/home/careers/jobs/",
    fact: "FirstBank separates a recurring Graduate Trainee Programme from experienced hires. Its official graduate description says candidates should be under 27 and hold at least a Second Class Lower degree or HND Upper Credit, but does not by itself establish a presently open intake.",
    actions: ["Choose graduate trainee or experienced-hire recruitment separately; the official graduate description gives the under-27 age threshold and minimum 2:2 / HND Upper Credit standard.",
      "Check whether FirstBank currently has a named intake or individual job with an application button; experienced-hire criteria come from that precise role.",
      "Annual programme descriptions are background, not a real-time opening or invitation to submit an unsolicited application."],
  },
  "stanbic-ibtc-careers": {
    sourceUrl: "https://www.stanbicibtc.com/nigeriaholdings/careers",
    fact: "Stanbic IBTC's Nigeria careers page explicitly points to a separate recruitment system. The corporate overview does not show that a particular graduate opening is currently accepting candidates.",
    actions: ["Use Stanbic IBTC's official careers page to enter the linked current-opportunities system rather than treating the brand overview as an application.",
      "On the resulting recruitment site, check country, job family, contract type, experience requirements and the exact application action.",
      "Do not assume Stanbic IBTC Holdings and every subsidiary have identical roles, hiring offices or one shared entry-level programme."],
  },
  "mtn-nigeria-careers": {
    sourceUrl: "https://www.mtn.ng/careers-home/",
    fact: "MTN Nigeria's careers home explains its employer culture and leads visitors to role discovery; the general page is not a verified opening for the advertised Global Graduate Programme.",
    actions: ["Follow MTN Nigeria's current vacancies link and select the advertised role or the specific graduate programme if one is explicitly listed.",
      "Compare the country, experience level, contract type, qualifications and any assessment instructions on that individual posting.",
      "Employer-brand stories and links to graduate-development programmes do not prove a Nigerian intake or an October 2026 deadline."],
  },
  "airtel-nigeria-careers": {
    sourceUrl: "https://www.airtel.com.ng/ng/about/careers",
    fact: "Airtel Nigeria publishes a distinction between current vacancies, its undergraduate internship and graduate internships. Its undergraduate programme normally runs July–September, with applications invited April–June; October is not evidence of an open undergraduate intake.",
    actions: ["For an advertised job, choose Airtel's official current openings link; for undergraduate industrial attachment, note the published April–June application period and July–September placement period.",
      "The employer separately publishes Vacancies@ng.airtel.com for unsolicited CVs. Treat that as a speculative contact, not a submitted application to a specific advertised vacancy.",
      "Do not describe an annual undergraduate application window as currently open in October or confuse a speculative emailed CV with a confirmed placement."],
  },
  "nestle-nigeria-careers": {
    sourceUrl: "https://www.nestle.com/jobs",
    fact: "Nestlé's corporate job site has a search and an existing-account route for checking the status of applications. This global site does not certify that an opening is based in Nigeria.",
    actions: ["Use Nestlé's job search and filter the country to Nigeria before claiming a Nigerian vacancy; identify a specific title and its location.",
      "Check requirements on the named vacancy and use the employer's candidate portal to submit, then track your application status if an account is created.",
      "Do not treat a global marketing page or an unrelated country vacancy as an available Nestlé Nigeria graduate slot."],
  },
  "kpmg-nigeria-careers": {
    sourceUrl: "https://apps.ng.kpmg.com/careers/",
    fact: "KPMG Nigeria's careers site provides separate Internship, Graduate Trainee and Experienced Hire paths. They are categories of opportunity, not proof of an open application for each category.",
    actions: ["Select KPMG Nigeria's Internship, Graduate Trainee or Experienced Hire category according to your eligibility, then check whether a role or current intake is actually listed.",
      "Read the selected process's degree, graduation date, experience, assessment and required-document rules directly before starting the issuer's application.",
      "Do not reuse eligibility or deadline information from an older KPMG graduate cohort as though it applied to every internship."],
  },
  "pwc-nigeria-careers": {
    sourceUrl: "https://www.pwc.com/ng/en/careers.html",
    fact: "PwC Nigeria directs graduates, experienced hires and subcontractors to distinct role searches. A category landing page does not itself prove a current Nigerian vacancy or graduate opening.",
    actions: ["Pick the official Graduates careers job search, Experienced careers job search or Subcontractors route appropriate to the actual work you want.",
      "Search the resulting vacancy list for Nigeria and open the individual posting to confirm assessment route, required credentials and final application date.",
      "Do not substitute a consulting subcontractor posting for a graduate role or claim all PwC pathways use the same portal."],
  },
  "shell-nigeria-careers": {
    sourceUrl: "https://www.shell.com.ng/careers.html",
    fact: "Shell Nigeria's employer careers page addresses students, graduates and experienced professionals, but the overview is not a live notice for an industrial-training placement or graduate scheme.",
    actions: ["Start from the Shell Nigeria career paths and choose students/graduates or experienced-professional opportunities before opening any application.",
      "Check the actual job's work country, discipline, eligibility and application process. Industrial training and employee jobs must not be conflated.",
      "Do not send confidential documents to recruiters who offer interviews or guaranteed placements outside Shell's documented process."],
  },
  "nlng-careers": {
    sourceUrl: "https://careers.nlng.com/",
    fact: "NLNG's official careers site describes its working culture and Nigeria LNG operations, including Bonny-linked services, but an organisation overview is not a named recruitment exercise.",
    actions: ["Use NLNG's own careers system to look for current individual jobs or graduate/trainee adverts instead of relying on a general 'join us' description.",
      "Read the precise site or work-location requirement before applying: Bonny-based operational jobs and other company functions are not automatically interchangeable.",
      "Do not assume an NLNG employee-benefits paragraph or Bonny Utilities overview signals an available graduate application form."],
  },
  "chevron-nigeria-careers": {
    sourceUrl: "https://careers.chevron.com/nigeria",
    fact: "Chevron's Nigeria careers overview identifies operations in Nigeria and explicitly says it never requests fees from job applicants. It is not a list of verified presently open vacancies.",
    actions: ["Use Chevron's recruitment search from the Nigeria careers page and locate a named Nigeria posting with a specific job number.",
      "Confirm the advertised work location and education/experience requirements; keep all communication within Chevron's stated recruitment process.",
      "Chevron explicitly warns it never seeks job-application fees. Treat anyone demanding a screening, training or offer-payment fee as suspicious."],
  },
  "totalenergies-nigeria-graduate-careers": {
    sourceUrl: "https://careers.totalenergies.com/",
    fact: "TotalEnergies' recruitment site is global, offering a job search across countries and business lines. A general site and company-wide Young Graduate publicity are not evidence of an active Nigeria programme intake.",
    actions: ["Use 'See all our offers' and filter for Nigeria or the exact country/worksite before selecting the role or a named Young Graduate scheme.",
      "Compare the posting's business line, contract, experience range and actual country eligibility, and apply only through its linked issuer route.",
      "Do not infer countrywide availability from global programme pages or invent October programme dates."],
  },
  "unilever-nigeria-careers": {
    sourceUrl: "https://careers.unilever.com/en/nigeria",
    fact: "Unilever Nigeria's country careers page identifies its Lagos Oregun office, while actual available roles are discovered through its job-search system; the local overview does not itself verify a graduate opening.",
    actions: ["Use Unilever's careers search and select Nigeria as the location; verify the role's office, factory/site or remote work arrangement from the precise posting.",
      "Check the role-specific experience requirements and application status before uploading a CV to the employer platform.",
      "The Lagos office address is employer context, not proof that every opportunity advertised globally is based in Oregun or open."],
  },
  "dangote-group-careers": {
    sourceUrl: "https://careers.dangote.com/",
    fact: "Dangote's employer portal provides a job-search area, a talent-network email update service and separate Dangote Academy information. Subscribing to job updates does not submit an application to any individual vacancy.",
    actions: ["Use the portal's specific job search or map to choose a vacancy and read its location, plant or head-office employer, title and qualifications.",
      "Where a role appears, use that role's own Apply button and keep the acknowledgement; check whether a Dangote Academy programme is a different application pathway.",
      "Registering for 'Get Job Updates' is not applying for a current plant job or joining Dangote Academy."],
  },
  "flutterwave-nigeria-careers": {
    sourceUrl: "https://flutterwave.com/ng/careers/vacancies",
    fact: "Flutterwave's live vacancies directory distinguishes Engineering, Data, Finance, Risk and Non Engineering roles, with locations including Nigeria and Abuja. A listed role's requirements and exact application may differ, and the directory changes as positions close.",
    actions: ["Choose one of Flutterwave's named roles rather than submitting an all-purpose 'Flutterwave application'; check the group, posting title and published country/location.",
      "Open that role's actual application to confirm qualifications and required documents; a role shown in a directory is not proof that a login-based form submission succeeded.",
      "Do not treat vacancies listed under 'Nigeria' as necessarily office-based in Lagos, and do not infer a salary or closing date the vacancy does not show."],
  },
  "paystack-nigeria-careers": {
    sourceUrl: "https://careers.paystack.com/jobs",
    fact: "Paystack's dedicated current-openings board uses a recruitment platform with privacy/cookie controls. Job cards on this board, not an old blog post, determine whether a Paystack position remains available.",
    actions: ["Open Paystack's current job openings site and inspect the actual vacancy card after handling the recruitment platform's cookie prompt.",
      "Check that the exact role is active and explicitly suitable for your country or work arrangement, then use its own Apply process.",
      "A candidate account, saved vacancy or consent to cookies does not constitute a submitted job application."],
  },
  "moniepoint-nigeria-careers": {
    sourceUrl: "https://moniepoint.com/careers",
    fact: "Moniepoint's employer careers page describes its four-stage hiring process: a preliminary call, technical assessment or case study, panel discussion and executive/final interview. Those are process expectations, not guaranteed stages for every role.",
    actions: ["Use Moniepoint's current vacancy links and inspect the job title, office/remote eligibility and required experience before applying.",
      "Prepare genuine work examples for a possible case study or technical screen, and read the specific role's assessment instructions rather than assuming every candidate gets all four interviews.",
      "Moniepoint's listed work-from-anywhere benefit is employer marketing and not proof that every particular opening can be performed from any country."],
  },
  "fidelity-bank-nigeria-careers": {
    sourceUrl: "https://www.fidelitybank.ng/careers/2/",
    fact: "Fidelity Bank's careers site distinguishes Graduate Trainee, Internships and Graduate Developer programmes. The category names and employer philosophy are not confirmation of an active recruitment window in October 2026.",
    actions: ["Choose the Fidelity Graduate Trainee, Internship or Graduate Developer route based on the specific current intake notice.",
      "Check programme eligibility, academic cut-off, available registration form and application closing date from that intake before sending documents.",
      "Do not assume one Fidelity graduate age rule or deadline applies to internships, developer programmes and experienced roles."],
  },
  "british-council-nigeria-careers": {
    sourceUrl: "https://www.britishcouncil.org.ng/about/jobs",
    fact: "The British Council Nigeria page directs applicants to its global recruitment service at careers.britishcouncil.org; the Nigeria information page is not itself an application or evidence of local vacancy availability.",
    actions: ["Use the official 'Current vacancies' link on the British Council Nigeria website to reach the responsible recruitment portal.",
      "Filter the final vacancies for Nigeria and the precise role; read contract type, eligibility, safeguarding checks and any relocation restrictions.",
      "A global British Council job listing is not automatically based in Nigeria, and the Nigeria information page does not accept a CV as an application."],
  },
  "unicef-nigeria-careers": {
    sourceUrl: "https://www.unicef.org/nigeria/opportunities",
    fact: "UNICEF Nigeria's official opportunities page lists vacancies, consultancies and internships separately and explicitly states it does not accept unsolicited CVs. At the 16 October 2026 check its visible Vacancies and Consultancies sections said 'No vacancies at this time'.",
    actions: ["Check UNICEF Nigeria's Vacancies, Consultancies and Internships sections separately; the source showed no listed Nigeria vacancies or consultancies at this check, which can change.",
      "Follow the actual role posting on UNICEF's official global employment platform if a new specific opening appears; check its duty station and application deadline.",
      "UNICEF explicitly does not accept unsolicited CVs. Do not direct applicants to email their resumes as though that would enter a UNICEF recruitment competition."],
  },
  "undp-careers-nigeria": {
    sourceUrl: "https://www.undp.org/careers/job-opportunities",
    fact: "UNDP's official job-opportunities page is international and describes the qualifications and values it seeks. It does not verify any particular currently open Nigeria job or deadline.",
    actions: ["Use UNDP's opportunity search to select Nigeria as duty station or a specific role if the employer lists one.",
      "Read the exact position's contract type, language skills, academic criteria and recruitment instructions; the general eligibility statement is not a reusable vacancy form.",
      "Do not label every UNDP global job an opportunity based in Nigeria or treat a generic UNDP employment page as a confirmed opening."],
  },
  "who-careers-nigeria": {
    sourceUrl: "https://www.who.int/careers",
    fact: "WHO's official careers page presents an international workforce and vacancy discovery route; the organisation-wide recruiting information does not prove an active Nigeria vacancy.",
    actions: ["Find WHO's actual job search from its careers page and filter the duty station to Nigeria or the particular country/region relevant to your application.",
      "Open the named posting for grade, contract type, competencies and any language/experience requirements before using its official application system.",
      "Do not advertise a permanent WHO Nigeria position, fee, or 2026 closing date merely from WHO's global careers homepage."],
  },
  "seplat-energy-careers": {
    sourceUrl: "https://www.seplatenergy.com/careers/career-opportunities/",
    fact: "Seplat Energy has a distinct official Career opportunities section. An accessible heading confirms the issuer's careers destination, but did not independently verify a currently accepting Nigerian graduate programme or specific vacancy.",
    actions: ["Use Seplat's Career opportunities section and look for a named recruitment notice or employer-linked vacancy before entering details.",
      "Compare any real role's work location, energy discipline, eligibility and listed application method with your experience before submitting.",
      "If the live page shows no individual vacancy or a closed cohort, treat it as a career-information source rather than claiming an open Seplat position."],
  },
};

const issuerPortalTitles20261016: Record<string, string> = {
  "access-bank-early-careers": "Access Bank Careers: Find Actual Vacancies and Early-Career Intakes",
  "gtbank-entry-level-careers": "GTBank Careers: Verify an Active Entry-Level Application",
  "uba-careers-graduate-programme": "UBA Careers: Recruitment Notices vs UBA Academy",
  "firstbank-graduate-trainee-careers": "FirstBank Careers: Graduate Trainee Rules and Actual Openings",
  "stanbic-ibtc-careers": "Stanbic IBTC Careers: Find Nigerian Roles on the Recruitment Platform",
  "mtn-nigeria-careers": "MTN Nigeria Careers: Check Live Vacancies and Graduate Intakes",
  "airtel-nigeria-careers": "Airtel Nigeria Careers: Vacancies, Undergraduate Internships and Timing",
  "nestle-nigeria-careers": "Nestlé Careers: Filter for Actual Nigeria Vacancies",
  "kpmg-nigeria-careers": "KPMG Nigeria Careers: Internship, Graduate Trainee or Experienced Hire",
  "pwc-nigeria-careers": "PwC Nigeria Careers: Graduate, Experienced and Contract Routes",
  "shell-nigeria-careers": "Shell Nigeria Careers: Graduate, Student Training and Professional Routes",
  "nlng-careers": "Nigeria LNG Careers: Check Real Roles and Worksites",
  "chevron-nigeria-careers": "Chevron Nigeria Careers: Actual Vacancies and Fee Scam Warning",
  "totalenergies-nigeria-graduate-careers": "TotalEnergies Careers: Verify Nigeria Roles and Young Graduate Intake",
  "unilever-nigeria-careers": "Unilever Nigeria Careers: Find Nigeria-Based Jobs",
  "dangote-group-careers": "Dangote Careers: Apply to a Specific Job, Not Job Alerts",
  "flutterwave-nigeria-careers": "Flutterwave Careers: Check Individual Nigeria Job Listings",
  "paystack-nigeria-careers": "Paystack Careers: Check the Actual Current Job Board",
  "moniepoint-nigeria-careers": "Moniepoint Careers: Vacancies and Interview Process",
  "fidelity-bank-nigeria-careers": "Fidelity Bank Careers: Separate Trainee, Developer and Internship",
  "british-council-nigeria-careers": "British Council Nigeria Jobs: Check the Official Vacancy System",
  "unicef-nigeria-careers": "UNICEF Nigeria Opportunities: Check Vacancies, Consultancies and Internships",
  "undp-careers-nigeria": "UNDP Careers: Find Roles with Nigeria as Duty Station",
  "who-careers-nigeria": "WHO Careers: Verify Nigeria-Based Vacancies",
  "seplat-energy-careers": "Seplat Energy Careers: Check Whether an Actual Vacancy Is Open"
};

export const issuerPortalFollowUp20261016: Record<string, [string, string]> = {
  "access-bank-early-careers": [
    "If the Access board shows no early-career intake, bookmark that specific category and check the employer again instead of completing an unofficial graduate form.",
    "Record the exact Access Bank requisition title and application confirmation when the employer opens a specific vacancy; this is what distinguishes a submitted role from a saved search."
  ],
  "gtbank-entry-level-careers": [
    "If the GTBank page only shows a loading indicator, allow scripts and try the employer's own navigation; do not assume an invisible job listing is open or closed.",
    "When an actual GTBank vacancy appears, record its employer-hosted final destination and application evidence before sharing the role with another applicant."
  ],
  "uba-careers-graduate-programme": [
    "The UBA Academy is employee learning and career development; do not use an Academy enrolment description as evidence of external recruitment eligibility.",
    "If an advertised UBA position is for another African country, check that country's labour and applicant-residency conditions before submitting from Nigeria."
  ],
  "firstbank-graduate-trainee-careers": [
    "The below-27 and 2:2/HND Upper Credit standard belongs to FirstBank's described Graduate Trainee Programme, not automatically to experienced hires.",
    "If no current FirstBank trainee intake is published, use the experienced-hire job list only if your own work experience meets a named vacancy."
  ],
  "stanbic-ibtc-careers": [
    "After following Stanbic's linked recruiting system, retain the specific reference identifier so another group's similarly named opening is not mistaken for yours.",
    "If a search returns no Nigerian role in your discipline, avoid filling unrelated Standard Bank Group country applications just to create an account."
  ],
  "mtn-nigeria-careers": [
    "Separate a permanent MTN Nigeria network/operations role from a graduate-development programme, which may use different country and experience eligibility.",
    "If the MTN Nigeria careers home provides only employer culture and no job-specific Apply link, treat the vacancy as unverified and check the issuer again later."
  ],
  "airtel-nigeria-careers": [
    "For October enquiries about undergraduate internship, verify whether Airtel has published an exception to its Apr–Jun application window before preparing a supposed 'open now' form.",
    "If you use Airtel's employer-published unsolicited CV address, label the message speculative and do not claim you have entered any named Airtel vacancy selection."
  ],
  "nestle-nigeria-careers": [
    "A Nestlé 'global' job listing may have a different country's visa or residency rule; Nigerian nationality alone does not establish eligibility.",
    "After submitting a named Nestlé job, use the employer's application-status feature rather than sending duplicate applications through unsanctioned recruiting sites."
  ],
  "kpmg-nigeria-careers": [
    "Do not reuse an internship's student eligibility for KPMG's graduate or experienced categories: select the track shown in the actual open advert.",
    "If the preferred KPMG Nigeria career category contains only a description and no intake notice, hold off on presenting it as a 2026 application deadline."
  ],
  "pwc-nigeria-careers": [
    "An independently contracted PwC engagement and an employee recruitment are different relationships; apply through the matching official route.",
    "If a graduate search redirects to the global PwC site, reapply its Nigeria location filter and read the exact job's country eligibility before proceeding."
  ],
  "shell-nigeria-careers": [
    "For SIWES, check Shell's separate Nigerian student industrial-training eligibility and institution requirements, not the experienced-hire listing.",
    "A third-party request to pay for a Shell placement or submit identity documents outside the recruitment domain should be verified through Shell's official applicant help route."
  ],
  "nlng-careers": [
    "If NLNG's careers home shows no current Bonny or mainland opening, do not treat its corporate introduction as an invitation to submit a resume.",
    "For an actual plant vacancy, verify worksite, rotation and travel arrangements from the precise job details rather than the company's Bonny infrastructure descriptions."
  ],
  "chevron-nigeria-careers": [
    "Cross-check a claimed Chevron Nigerian role against the actual employer requisition instead of trusting unsolicited messages or copied branded letters.",
    "Do not pay an 'interview processing' or travel deposit; Chevron explicitly warns that it never seeks fees from candidates."
  ],
  "totalenergies-nigeria-graduate-careers": [
    "Before applying to a TotalEnergies Young Graduate posting, check the named country, degree year, location and programme criteria in the active advert.",
    "If the vacancy is on a different national careers market, don't re-label it as an available Nigeria application because the multinational operates there."
  ],
  "unilever-nigeria-careers": [
    "Use the precise Unilever role's worksite field to distinguish Lagos office work from factory and field postings.",
    "If the Unilever country landing page has only employer information, the next useful step is a job-search filter, not an invented graduate-application URL."
  ],
  "dangote-group-careers": [
    "Use the plant/city and business-unit filters: an Ibese cement maintenance vacancy is not the same as a Lagos head-office finance role.",
    "After selecting a Dangote role, save its individual job URL and employer-generated submission confirmation, not merely an email from the talent newsletter."
  ],
  "flutterwave-nigeria-careers": [
    "The Flutterwave vacancies board distinguishes Abuja from generic Nigeria locations; do not substitute Abuja or Lagos as a location without the actual role detail.",
    "A Node.js engineering role, fraud-risk analyst and non-engineering account role have materially different screening; tailor proof to the specific duties."
  ],
  "paystack-nigeria-careers": [
    "Check whether Paystack's candidate platform displays a role's actual application deadline or closes its form; a cached job card can outlive the vacancy.",
    "When multiple Paystack role listings look similar, keep the exact posting identifier and location shown on the final employer page."
  ],
  "moniepoint-nigeria-careers": [
    "Prepare accurate examples for a potential Moniepoint case study; the employer's listed interview stages are indicative and can vary with the team.",
    "Verify a remote designation and hiring-country restriction in the specific Moniepoint job, not by relying on a general 'work from anywhere' benefits claim."
  ],
  "fidelity-bank-nigeria-careers": [
    "Graduate Developer is not the same training route as Fidelity's Graduate Trainee or undergraduate internship; compare each intake's entry requirements separately.",
    "If Fidelity's overview has no active programme registration link, don't assign an application closing date based on previous cohorts or recruiter posts."
  ],
  "british-council-nigeria-careers": [
    "The British Council's global vacancy site contains multiple countries; confirm Nigeria as the actual job location before describing a vacancy as local.",
    "A safeguarding or background check requirement should come from the actual British Council role, not a made-up requirement for every applicant."
  ],
  "unicef-nigeria-careers": [
    "UNICEF's Nigeria page may change after this check: revisit the Vacancies or Consultancies section for a named posting before treating 'No vacancies at this time' as out of date.",
    "If a UNICEF opportunity is only on the global portal, confirm the duty station and employment type; UNICEF says unsolicited CVs are not accepted."
  ],
  "undp-careers-nigeria": [
    "UNDP staff appointments, consultant tenders and other engagement types may have different submission methods; read the selected role's own instructions.",
    "Do not mistake a global UNDP success story or Nigeria country programme article for a specific recruitment notice."
  ],
  "who-careers-nigeria": [
    "A WHO listing for the African Region is not automatically a Nigeria duty-station job; verify the named duty station and contractual level.",
    "Only a WHO recruitment-system confirmation demonstrates that a job application was submitted; reading WHO's careers overview does not."
  ],
  "seplat-energy-careers": [
    "For a Seplat field role, confirm the named facility and required safety credentials rather than inferring these from Seplat's oil and gas profile.",
    "If Seplat's employer page does not contain an active vacancy form, do not invent an application address or reuse an expired graduate-cohort link."
  ]
};

export const verifiedPortalSlugs20261016 = Object.keys(issuerPortalEvidence20261016);

export function applyIssuerPortalResearch20261016(item: CareerOpportunity): CareerOpportunity {
  const checked = issuerPortalEvidence20261016[item.slug];
  if (!checked || item.kind !== "career-page" || item.officialUrl !== checked.sourceUrl) return item;
  const originalSourceFound = item.sources.some(source => source.url === checked.sourceUrl);
  return {
    ...item,
    kind: "career-page",
    status: "career-page",
    title: issuerPortalTitles20261016[item.slug] ?? item.title,
    deadline: undefined,
    nextMilestone: undefined,
    statusLabel: "Issuer careers directory checked 16 October 2026 — individual opening unverified",
    verifiedAt: "2026-10-16",
    summary: checked.fact,
    // Three distinct employer-researched decisions replace the repetitive
    // fallback application script. The article's official URL is already
    // presented as its primary action, so do not repeat it as filler.
    applicationSteps: [...checked.actions, ...issuerPortalFollowUp20261016[item.slug]],
    sourceNotes: item.sourceNotes,
    sources: originalSourceFound
      ? item.sources.map(source => source.url === checked.sourceUrl
          ? { ...source, lastChecked: "2026-10-16" }
          : source)
      : [...item.sources, { label: `${item.organization} official career source`, url: checked.sourceUrl, lastChecked: "2026-10-16" }],
  };
}
