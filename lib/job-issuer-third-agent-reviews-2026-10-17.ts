import type { CareerOpportunity } from "@/lib/jobs";

// Issuer-specific 17 October 2026 reviews of pre-existing employer directory URLs.
// A careers page or visible job-list widget does not prove an actual open
// application, working submission, salary, role-specific deadline or shortlist.
type PortalReview = {
  url: string;
  route?: string;
  additional?: string;
  label: string;
  answer: string;
  steps: string[];
  guard: string;
};

export const thirdAgentIssuerReviews20261017: Record<string, PortalReview> = {
  "nigerian-ports-authority-careers": {
    "url": "https://nigerianports.gov.ng/faqs/",
    "label": "No recruitment underway according to NPA's official FAQ",
    "answer": "The Nigerian Ports Authority's recruitment FAQ explicitly answers 'Is NPA recruiting?' with 'At the moment, NO!' and says genuine vacancies appear only on official NPA channels. This guide is a verification route, not an application for an open port job.",
    "steps": [
      "Read NPA's own FAQ answer under recruitment before sharing any documents or paying anyone.",
      "Look for a later dated official NPA announcement naming the role, qualification and submission method; no such opportunity follows from the general FAQ.",
      "Do not treat WhatsApp vacancy forms or port-agent fee requests as authorised recruitment; NPA warns against unofficial intermediaries.",
      "If NPA issues a subsequent vacancy, follow its specific official advert rather than the FAQ as an application form."
    ],
    "guard": "The NPA FAQ presently says recruitment is not underway. No vacancy, closing date, application portal or recruitment payment is authenticated by this directory."
  },
  "faan-careers": {
    "url": "https://faan.gov.ng/career/",
    "route": "https://faan.gov.ng/career/",
    "label": "FAAN officially says it is not recruiting",
    "answer": "FAAN's own Career page currently displays 'FAAN NOT RECRUITING' and instructs the public to disregard recruitment links from other sources. It is a public fraud-warning page, not a 2026 vacancy submission portal.",
    "steps": [
      "Open the FAAN Career notice and read the current management recruitment disclaimer.",
      "Do not submit a CV, passport image or fee to a third-party FAAN job advertisement while the agency says there is no recruitment.",
      "Check future FAAN announcements for a specifically dated reversal and official application channel before preparing any application.",
      "Use an advertised official authority source, not a copied 'FAAN application form' circulating on social media."
    ],
    "guard": "No open FAAN vacancy is established by the 17 October 2026 issuer-page check. The Career page itself says it is not recruiting."
  },
  "nuprc-careers": {
    "url": "https://www.nuprc.gov.ng/media/news/8c4ad14201909f4a31d8da60",
    "label": "No NUPRC recruitment — official August 2026 scam warning",
    "answer": "NUPRC's 11 August 2026 official notice warns about fabricated, including AI-generated, employment letters and says categorically that no recruitment exercise is ongoing. The Commission has reported alleged recruitment fraud to law enforcement.",
    "steps": [
      "Read the NUPRC notice dated 11 August 2026; do not mistake a sample employment letter for a genuine offer.",
      "Reject requests for payment, 'processing' or shortlisting from anyone claiming to represent NUPRC.",
      "For any later recruitment, require a new named announcement on NUPRC's official channels showing role, rules and route.",
      "If a claimed employment letter cannot be reconciled with the Commission's own channel, do not share banking or identity details."
    ],
    "guard": "The cited source is an official dated disclaimer, not a guarantee about all future hiring; no currently authorised recruitment form is identified in it."
  },
  "nitda-careers": {
    "url": "https://nitda.gov.ng/disclaimer/",
    "label": "No current NITDA vacancies on official careers page",
    "answer": "NITDA's current Careers page explicitly says there are no vacancies and explains that future vacancies will be advertised in national newspapers and on the NITDA website. Earlier fake 'NITDA recruitment portal' sites were the subject of an agency warning.",
    "steps": [
      "Check the official NITDA Careers page, which currently says there are no advertised openings.",
      "Do not fill a purported NITDA recruitment portal linked by strangers or pay for registration.",
      "When a new vacancy is announced, compare it with NITDA's own notice and the advertised newspaper publication.",
      "Prepare only the qualifications and documents required by an actual NITDA-issued vacancy rather than a generic future-job checklist."
    ],
    "guard": "A recruitment-themed page on nitda.gov.ng is currently a no-vacancy notice, not a registration form. Older scam warnings should not be restyled as a new 2026 intake."
  },
  "cbn-careers": {
    "url": "https://www.cbn.gov.ng/faqs/",
    "label": "CBN employment FAQ — no universal recruitment window",
    "answer": "The CBN Human Resources FAQ identifies Accountancy, Banking/Finance, Business Administration, Economics, Sociology, Statistics, Computer Science and Law as core disciplines. It says age criteria depend on entry point, skills and experience; it does not advertise a universal 2026 application window.",
    "steps": [
      "Open CBN's FAQ and navigate to Human Resources to separate general recruitment rules from a specific vacancy.",
      "Identify which of CBN's published core disciplines matches your qualifications, then review any actual named role for its own eligibility.",
      "Do not copy a general age cut-off from unrelated civil-service adverts; CBN says its age requirements vary by entry route.",
      "Wait for a dated official CBN notice with an application method before uploading academic or identification documents."
    ],
    "guard": "The FAQ describes policy, not current vacancies; no recruitment deadline, application payment or public sign-up route is established by it."
  },
  "sec-nigeria-careers": {
    "url": "https://home.sec.gov.ng/about/careers/",
    "additional": "https://home.sec.gov.ng/about/careers/talk-to-us/",
    "label": "SEC careers information and enquiry — vacancy requires separate check",
    "answer": "Nigeria's Securities and Exchange Commission runs a Careers section separating Openings, Working With Us and Talk to Us. Its Talk to Us form is for job-related questions and does not itself submit an application to an advertised vacancy.",
    "steps": [
      "Use the SEC Careers Openings route to find a specifically advertised role rather than assuming the careers homepage is a live vacancy.",
      "If you have a question, use SEC's separate Talk to Us form and specify your area of interest, such as compliance, economics, law or market regulation.",
      "Do not treat a submitted enquiry as a job application; follow the role's own instructions if a vacancy is published.",
      "For any claim of an SEC application fee, verify it on SEC's original official pages before acting."
    ],
    "guard": "The enquiry form and general department catalogue do not prove that SEC has accepted a candidate's application or has a current advertised role."
  },
  "microsoft-nigeria-internships": {
    "url": "https://careers.microsoft.com/v2/global/en/internship_eligibility",
    "additional": "https://careers.microsoft.com/v2/global/en/universityinternship",
    "label": "Microsoft Nigeria internship eligibility — position-specific opening unverified",
    "answer": "Microsoft's Nigeria section lists University Interns Engineering and University Interns MCAPS. Both require enrolment in a bachelor's, master's, MBA or PhD programme, work eligibility in Nigeria, English fluency and at least one remaining semester after the internship. Eligibility is not proof of an available Lagos or Nigeria opening.",
    "steps": [
      "Read the Nigeria heading of Microsoft's internship eligibility page rather than applying requirements from the US or Europe sections.",
      "Verify that you still have at least one quarter or semester of study after the planned internship and have the right to work in Nigeria.",
      "Search Microsoft Careers for an actual internship listing specifying the country, team and opening date.",
      "Apply only through that listing and verify the exact additional skill, transcript and screening requirements there."
    ],
    "guard": "Nigeria eligibility does not mean any named internship is open. The popular US Explore and Discovery programme descriptions are not automatically Nigerian recruitment routes."
  },
  "seven-up-careers": {
    "url": "https://www.sevenup.org/career/",
    "label": "Seven-Up Careers has dynamically loaded openings — check an actual listing",
    "answer": "Seven-Up Bottling Company's official Career page contains a Current Openings section, but its publicly rendered text says 'Loading open positions...' instead of naming a confirmed vacancy. Applicant guidance must distinguish the jobs widget from a successfully loaded role.",
    "steps": [
      "Open Seven-Up's careers page and allow Current Openings to load; an empty or loading panel is not a published job.",
      "If a role appears, open it and check plant or office location, function, qualifications, date and actual Apply destination.",
      "Choose your sector carefully: FMCG manufacturing, commercial sales and corporate jobs have different prerequisites.",
      "If no named opening can be loaded, do not invent a '2026 graduate trainee' intake or use a social-media form."
    ],
    "guard": "The employer-page career description does not substantiate any currently accepting role without opening its exact advert."
  },
  "frieslandcampina-wamco-careers": {
    "url": "https://careers.frieslandcampina.com/nga/en/page/were-frieslandcampina-wamco",
    "label": "FrieslandCampina WAMCO jobs — Nigeria discipline filter",
    "answer": "FrieslandCampina's Nigeria WAMCO careers page separates Commercial & Business Development, Operations/Technology/Safety, Project Management, Supply Chain and Supporting Services. Its corporate story is not a Nigeria-specific job listing until the user selects a current vacancy.",
    "steps": [
      "Enter through the WAMCO Nigeria careers page, then choose the discipline relevant to your skills.",
      "Use View all jobs or View jobs and filter by location in Nigeria, rather than assuming the global job list is local.",
      "Read the exact role's manufacturing, logistics, engineering or commercial qualifications and closing instructions.",
      "If a discipline page shows no suitable Nigerian vacancy, treat it as career background rather than applying to a similarly named role abroad."
    ],
    "guard": "Brands and company history on the WAMCO page establish employer identity, not the number or status of today's Nigeria vacancies."
  },
  "aiico-insurance-careers": {
    "url": "https://www.aiicoplc.com/about-us/careers/vacancies",
    "label": "AIICO vacancy list — check individual role's missing closing date",
    "answer": "AIICO's official vacancies listing currently includes a Sales Officer post in Ibadan with lead-generation, client-management and branch-target duties. Its visible Closing date field does not provide a confirmed date, so this directory must not invent a deadline or describe every AIICO department as recruiting.",
    "steps": [
      "Open the specific Sales Officer card on AIICO's vacancies page and confirm Ibadan as the advertised job location.",
      "Read the sales responsibilities and the exact Apply route, rather than preparing for an unrelated actuarial or technology role.",
      "Because the listing's Closing date field has no clear published value, verify acceptance through AIICO's own application channel before relying on it.",
      "If exploring other functions, use AIICO's main Careers and talent-pool information separately from this Ibadan advert."
    ],
    "guard": "An AIICO listing can appear without a closing date; blank date does not mean rolling recruitment, and this page is not a blanket current-hiring claim."
  },
  "axa-mansard-careers": {
    "url": "https://corporate.axamansard.com/jobs/",
    "additional": "https://corporate.axamansard.com/careers/our-recruitment-process/",
    "label": "AXA Mansard job board — separate named roles and screening stages",
    "answer": "AXA Mansard's official jobs page distinguishes investment, insurance, health and distribution roles, with individual Lagos postings. AXA's recruitment-process page explains that screening can involve different assessments, tests and interviews depending on the position.",
    "steps": [
      "Use AXA Mansard's job board and open a named role to check the actual business line and Lagos-based duty station.",
      "Compare required experience for the selected analyst, reporting, health or distribution post; do not assume a universal insurance graduate application.",
      "Follow the role-specific Apply route and keep its acknowledgement; a generic careers page does not submit the application.",
      "If shortlisted, expect position-dependent testing, interviews or presentations rather than an identical company-wide selection sequence."
    ],
    "guard": "Relative labels such as 'Posted 1 day ago' change; this guide never converts them into a permanent deadline or promise of an interview."
  },
  "edo-state-edsiec-careers": {
    "url": "https://edsiec.edostate.gov.ng/career/",
    "label": "EDSIEC job directory — 2024 FAQ is not a live 2026 vacancy",
    "answer": "The Edo State Independent Electoral Commission's Careers page links to Current Openings, but its general FAQ still refers to 'Edo State Government recruitment 2024' and describes local-government requirements. That old FAQ cannot be treated as a current EDSIEC vacancy notice or a 2026 universal age limit.",
    "steps": [
      "Start at EDSIEC's official Careers page and select Current Openings; a general state employment FAQ does not list today's commission vacancies.",
      "For a named role, verify whether it is an EDSIEC appointment or a different Edo State/local-government service exercise.",
      "Use the advert's date, position, eligibility and employer-linked route; do not carry over the historic FAQ's 2024 age and document rules to every 2026 role.",
      "If no named role is current, do not upload credentials to a forwarded Edo recruitment form."
    ],
    "guard": "EDSIEC's retained 2024 recruitment FAQ is historical context; it does not authorise an active October 2026 application."
  },
  "unilorin-careers": {
    "url": "https://careers.unilorin.edu.ng/",
    "label": "UNILORIN recruitment portal — distinguish roles and application stages",
    "answer": "The University of Ilorin recruitment portal separates Academic, Administrative and Technical positions. Its published application flow is Find a Position, Create an Account, Complete Your Profile and Upload Documents. A general announcement header must still be checked against the exact current vacancy and its date.",
    "steps": [
      "Choose academic, administrative or technical recruitment in UNILORIN's original portal; the requirements differ by cadre.",
      "Open a dated Available Positions listing and confirm the role remains accepting submissions before creating an account.",
      "Complete personal and academic history, then upload the CV and certificates specified for the selected role.",
      "For a technical position, note the portal's stated computer-proficiency test and check the advert for subsequent screening instructions."
    ],
    "guard": "The portal's static 'currently accepting' wording may outlast a vacancy's deadline; only the specific dated posting proves its present status."
  },
  "lagos-state-civil-service-careers": {
    "url": "https://lagosstate.gov.ng/services/",
    "label": "Lagos State work-and-employment services — not a single open recruitment",
    "answer": "Lagos State's website has a Job Opportunities service category covering government recruitment, ferry-related recruitment and wider Lagos employment. The service category is a routing hub, not a single Civil Service Commission recruitment exercise.",
    "steps": [
      "Open the Lagos State Services area and choose Job Opportunities, then identify the particular ministry, agency or commission issuing the notice.",
      "Read the advertised role's appointing body, cadre, eligibility and closing date; other Lagos employment programmes have different rules.",
      "Check that the application domain is reachable from Lagos State's official service route before sharing ID or qualification documents.",
      "Do not treat all state-sponsored job or entrepreneurship resources as permanent pensionable civil-service openings."
    ],
    "guard": "A Job Opportunities category does not establish that a new Civil Service Commission recruitment is open today."
  },
  "dhl-nigeria-careers": {
    "url": "https://careers.dhl.com/",
    "label": "DHL global jobs — Nigeria filter required",
    "answer": "DHL's careers platform separates Frontline, Office and Students & Graduates. Its search results may show a no-results message or a Talent Community sign-up; neither is a current Nigerian warehouse, courier or trainee opening.",
    "steps": [
      "Enter DHL's official global careers portal and select Nigeria as the location before reading positions.",
      "Distinguish Frontline courier/warehouse work, Office functions and Student or Graduate internships; they use different employment criteria.",
      "Open the exact role's city, business unit, contract type and Apply destination, not a global job-category explainer.",
      "If the filtered search has no results, joining DHL Talent Community is an expression of interest, not a vacancy application."
    ],
    "guard": "A global DHL jobs total or category name is not evidence of a position accepting applications in Nigeria."
  },
  "plan-international-nigeria-careers": {
    "url": "https://jobs.plan-international.org/",
    "additional": "https://jobs.plan-international.org/go/Global-Hub-Location-Flexible/5498701/",
    "label": "Plan International Nigeria careers — eligibility differs for flexible hub roles",
    "answer": "Plan International's Global Hub 'Location Flexible' page says some posts can employ people from Nigeria where Plan has an employing office and the applicant has pre-existing rights to work and live. It explicitly warns that not every country where Plan operates can employ for every flexible role.",
    "steps": [
      "Search Plan International's authorised job board for Nigeria-based posts separately from 'Global Hub – Location Flexible' opportunities.",
      "For a flexible hub role, verify the advert permits employment in Nigeria and requires you already to have the legal right to work and live there.",
      "Check the role's safeguarding requirements, travel, contract and application closing date on its exact listing.",
      "Avoid interpreting 'global' or 'remote' as a universal work-from-anywhere guarantee; submit only on the employer's job portal."
    ],
    "guard": "An authorised Global Hub page establishes possible employment locations, not guaranteed Nigerian eligibility for any particular advertised role."
  },
  "wema-bank-careers": {
    "url": "https://www.wemabank.com/careers/what-we-do/",
    "label": "Wema Bank careers — teams and opportunities are different pages",
    "answer": "Wema's employer page describes working in Finance, Technology, Human Capital Management, Sales/Marketing, Customer Experience, Enterprise Risk and Legal Services, but the 'Why Join Wema' content is not a list of currently accepting roles.",
    "steps": [
      "Read Wema Bank's 'Why Join Wema' career description to identify the team that matches your background.",
      "Follow the bank's own Explore Opportunities link to a named vacancy or talent route, not the benefits section.",
      "Check the exact selected programme or job for location, experience, assessment and date before submitting a CV.",
      "Do not treat Wema's general workplace benefits or ALAT banking product description as an open recruitment announcement."
    ],
    "guard": "A bank careers information page provides employer context but does not validate a named 2026 graduate or experienced-hire vacancy."
  },
  "sterling-bank-careers": {
    "url": "https://sterling.ng/about/careers/jobs/",
    "label": "Sterling Bank job categories — open role must be verified individually",
    "answer": "Sterling Bank's issuer jobs page currently displays distinct Salesforce Growth Champions, Relationship Manager – Institutional Banking and Relationship Manager – Commercial Banking notices. It also offers a Talent Community, which is separate from applications to those specific jobs.",
    "steps": [
      "Read the Sterling Bank job board and choose a named notice; Salesforce and institutional or commercial Relationship Manager jobs are different roles.",
      "Verify region, eligibility and duties on the selected vacancy, because some notices cover multiple Nigerian zones.",
      "Use that notice's Learn more and actual application instructions rather than submitting information to a copied vacancy summary.",
      "Join the separate Talent Community only if you want employer updates; it is not an automatic application to each listed job."
    ],
    "guard": "The job-board listing can persist after a post closes; no universal salary, guaranteed opening date or bank-wide deadline is inferred from it."
  },
  "bua-group-careers": {
    "url": "https://buagroup.com/vacancies/",
    "label": "BUA Group says no current job openings",
    "answer": "BUA Group's own Vacancies page currently says 'We currently have no job openings'. Its employer information covers the wider food, infrastructure, mining and manufacturing group but should not be advertised as an active October 2026 application.",
    "steps": [
      "Open BUA's official Vacancies page and note its no-openings statement before spending time preparing an application.",
      "Use BUA's Careers information to understand the different group businesses without treating every subsidiary as a live recruiting unit.",
      "Check for a future BUA-issued role notice with a company, location, exact criteria and authorised application path.",
      "Do not send certificates or payment to 'BUA job registration' portals not linked from official group announcements."
    ],
    "guard": "No current vacancy is shown on the referenced employer page; do not represent its general careers section as a live group-wide hiring exercise."
  },
  "emzor-careers": {
    "url": "https://www.emzorpharma.com/job-vacancies/",
    "route": "https://www.emzorpharma.com/job-vacancies/",
    "label": "Emzor current job-vacancies page; reject old external email instructions",
    "answer": "Emzor's current Job Vacancies page groups quality, engineering, manufacturing, laboratory, HSE and production roles and explicitly says it never requests recruitment fees. Its older Vacancies archive contains an obsolete application instruction using a personal Gmail address; do not republish that address as an accepted new application route.",
    "steps": [
      "Use Emzor's current official Job Vacancies page and open the exact role, such as Production, Quality Control, R&D or Engineering.",
      "Confirm the role's actual education, discipline, worksite and submission process on the recent advert rather than copying an old dated vacancy.",
      "Treat the employer's official no-fee recruitment notice as controlling; ignore anyone charging for forms or interviews.",
      "Avoid sending CVs to the Gmail address present in an older vacancies archive; obtain the current application instruction through Emzor's official verified channels."
    ],
    "guard": "Official job-vacancies and archive pages differ. The latter contains an old personal-email instruction, which is not independently verified for October 2026 recruitment."
  }
};

export function applyThirdAgentIssuerReviews20261017(item: CareerOpportunity): CareerOpportunity {
  const review = thirdAgentIssuerReviews20261017[item.slug];
  if (!review) return item;
  const sources = [...item.sources];
  for (const url of [review.url, review.additional].filter((value): value is string => Boolean(value))) {
    const index = sources.findIndex(source => source.url === url);
    if (index >= 0) sources[index] = { ...sources[index], lastChecked: "2026-10-17" };
    else sources.push({ label: item.organization + " original issuer recruitment information", url, lastChecked: "2026-10-17" });
  }
  return {
    ...item,
    kind: "career-page",
    status: "career-page",
    statusLabel: review.label,
    summary: review.answer,
    officialUrl: review.route ?? item.officialUrl,
    officialUrlLabel: review.route ? "Read the issuer's official career or vacancy notice" : item.officialUrlLabel,
    applicationSteps: review.steps,
    // A portal guide should never publish an expired company-wide deadline
    // or render one unverified JobPosting as if it were a named opening.
    posting: undefined,
    deadline: undefined,
    nextMilestone: review.guard,
    sourceNotes: [
      review.guard,
      "Source desk-check: 17 October 2026. The employer's career directory must not be mistaken for an open named vacancy or a submitted application.",
      "Specific issuer page: " + review.url,
    ],
    sources,
    verifiedAt: "2026-10-17",
  };
}
