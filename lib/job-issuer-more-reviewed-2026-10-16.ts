import type { CareerOpportunity } from "@/lib/jobs";

// Twenty-five existing employer directories, independently checked against
// issuer-controlled pages on 16 October 2026. All dates are editorial evidence
// dates, not invented role openings, current filing windows or submission tests.
type IssuerReview = {
  url: string;
  extra: string | null;
  lead: string;
  steps: string[];
  guard: string;
};
export const checkedIssuerCareers20261016: Record<string, IssuerReview> = {
  "union-bank-nigeria-careers": {
    "url": "https://www.unionbankng.com/careers/",
    "extra": "https://www.unionbankng.com/support/faqs/",
    "lead": "Union Bank's careers page distinguishes its 2026 Management Trainee Programme and Tech Bootcamp from the separate experienced-hire job board. The landing page advertises applications, but the current closing date and eligibility depend on the actual selected programme or named role; the careers page alone is not a confirmed acceptance of a particular applicant.",
    "steps": [
      "Choose Management Trainee, Tech Bootcamp or Experienced Professionals, then follow that programme's separate official application or job-board link.",
      "For a bank role, review the vacancy's city, actual posting date and role-specific experience before uploading your CV; old job-board entries can remain searchable.",
      "Union Bank's published FAQ describes application, assessment and documentation as separate hiring stages. Keep the submission receipt and do not treat an automated email as a final offer.",
      "Check whether Union Bank's programme page takes you to its named recruitment partner rather than an unrelated clone form.",
      "If the programme-specific Apply link is no longer accepting entries, save the verified bank job-board page for later instead of recycling the previous intake deadline."
    ],
    "guard": "Union Bank says Jobberman is an appointed recruitment partner for the recruitment exercise; verify the handoff from the bank's own career page before sharing identity documents. An old board advert or management-trainee banner does not supply a universal deadline."
  },
  "suntrust-bank-careers": {
    "url": "https://suntrustng.com/careers-at-suntrust/",
    "extra": null,
    "lead": "SunTrust Bank does not provide a role-by-role apply form on the checked careers page. It invites interested candidates to send an updated profile to careers@suntrustng.com for consideration when opportunities become available and describes Sales and Marketing, Finance/Risk Management, e-commerce/e-channels and Support Services as business areas.",
    "steps": [
      "Read SunTrust's issuer careers page and distinguish its general expression-of-interest instruction from an advertised vacancy.",
      "If exploring future opportunities, contact only the bank's printed careers@suntrustng.com address with the updated profile it requests; do not infer a job title or closing date.",
      "For a vacancy advertised elsewhere, verify the exact title and eligibility on the bank's official communication before sending any other documents.",
      "Use the bank's careers email as an expression of interest only; do not claim you completed an online job application.",
      "If SunTrust replies with a specific position, confirm the sender's domain and role requirement against bank communications before responding with sensitive documents."
    ],
    "guard": "An email inviting candidate profiles is not an active recruitment exercise or guaranteed response. The page's 'Available Openings Below' heading did not itself verify a currently open named role."
  },
  "lotus-bank-careers": {
    "url": "https://lotusbank.com/careers",
    "extra": null,
    "lead": "LOTUS Bank's published career pathway is split into three distinct application forms: Information Technology (entry or middle level), non-IT entry level, and non-IT middle level. These categories matter because selecting a generic bank careers link without the correct form can route applicants to the wrong screening stream.",
    "steps": [
      "Open the bank's career page and choose IT versus non-IT before choosing your experience level.",
      "Follow only the form linked under that precise category, checking whether it is still accepting submissions and what documents or eligibility it asks for.",
      "If the page or form cannot be completed, do not claim your CV has entered a recruitment queue; use the bank's official contact channel to confirm.",
      "Check the bank's exact application-form domain before entering your details; unofficial mirrors can present invalid security certificates.",
      "If switching from an IT to a non-IT application, restart from the bank's original careers page so you do not reuse a form intended for another stream."
    ],
    "guard": "The careers page also links to educational material about non-interest banking; that course is not proof of a paid trainee job or a mandatory preapplication payment."
  },
  "premiumtrust-bank-careers": {
    "url": "https://premiumtrustbank.com/careers/",
    "extra": "https://careers.premiumtrustbank.com/",
    "lead": "PremiumTrust Bank publishes separate Graduate Trainee and Experienced Hire pathways. Its graduate system requests structured educational and NYSC information, while the experienced-hire page can list named roles with departmental and office detail. These are distinct application processes, not one open job for every candidate.",
    "steps": [
      "Decide between Graduate Trainee and Experienced Hire using PremiumTrust's own categories, rather than treating the general 'Apply Now' link as role-specific.",
      "For Graduate Trainee, open the bank-linked careers.premiumtrustbank.com form and review its degree, O-level and NYSC fields before giving information.",
      "For experienced roles, search the dedicated job-openings section, confirm the role and Lagos duty station if applicable, then use the corresponding Send CV or official apply route.",
      "For graduates, confirm the linked application system actually lets you submit and track your candidate record.",
      "For experienced-hire candidates, do not use graduate-only O-level or NYSC form fields as substitutes for the department's advertised qualifications."
    ],
    "guard": "The existence of a graduate registration form is not proof of a specific closing date or of an accepted submission. Do not apply using an impersonator bank domain."
  },
  "keystone-bank-careers": {
    "url": "https://www.keystonebankng.com/about-us/careers/",
    "extra": "https://www.keystonebankng.com/apply-for-a-vacancy/",
    "lead": "Keystone Bank's official careers information points applicants to a separate 'Apply for a role' page. That currently says there are no vacancies available. The general careers page describes eligibility and offers an interest form, but should not be represented as an active application to a specific opening.",
    "steps": [
      "Open the bank's Apply for a vacancy page first; do not treat the evergreen Join Us description as proof that recruiting is active.",
      "If Keystone publishes a named role later, check its own criteria page, which currently describes a bachelor's degree and age limits for entry-level vacancies. Confirm any rule in the new role rather than automatically applying old criteria.",
      "Without a visible job listing, save the official portal as a future reference instead of submitting CVs to social accounts advertising instant placements.",
      "At present the employer's vacancy-list page says none are available; close the application search rather than guessing an unpublished role.",
      "If new openings appear, compare their own dates and experience requirements with the bank's long-standing introductory employment guidance."
    ],
    "guard": "As reviewed, the bank's exact vacancy page explicitly says 'There are currently no vacancies available.' This is a dated observation, not a permanent ban on hiring."
  },
  "vetiva-careers": {
    "url": "https://vetiva.com/page/careers",
    "extra": "https://vetiva.com/form/careers",
    "lead": "Vetiva provides a structured general application form rather than a verifiable list of individually dated current positions on the reviewed landing page. Its form asks for an intended position, name, email, phone number, a CV attachment and cover letter; the maximum CV upload size shown is 10 MB.",
    "steps": [
      "Start from Vetiva's employer careers page, then use the linked form only if you have identified an appropriate position to apply for.",
      "Prepare the position name, a role-relevant CV not exceeding the form's displayed upload limit, and a targeted cover letter.",
      "After submitting, verify that the website gives a completion response; an on-screen form alone does not show that a role is open or a recruiter has received the file.",
      "If the role dropdown offers no relevant title, avoid submitting a CV as though a named vacancy exists.",
      "A submitted attachment is not an interview invitation; keep the exact application confirmation or seek the employer's recruitment-team guidance."
    ],
    "guard": "No closing date, guaranteed interview or Nigeria-wide vacancy count was independently established from the general form."
  },
  "chapel-hill-denham-careers": {
    "url": "https://chapelhilldenham.com/careers/",
    "extra": "https://chapelhilldenham.com/careers/management-development-programme/",
    "lead": "Chapel Hill Denham separates its Management Development Programme (MDP), internships and experienced hiring. The MDP page specifies at least a Second-Class Upper bachelor's degree and 0–3 years' experience, with professional qualifications advantageous. These MDP rules should not be copied to internships or experienced professional vacancies.",
    "steps": [
      "Choose an MDP, internship or experienced-hire entry route directly from the official careers page.",
      "For the MDP, compare your class of degree, experience and NYSC status with its own detailed programme page before following its application link.",
      "For internships, use the separate firm internships page, which describes investment banking, asset management, securities trading, sales and research rather than a generic office-placement guarantee.",
      "A dated MDP listing should be checked separately from the evergreen MDP description before relying on an Apply action.",
      "An internship contact route does not prove a professional full-time vacancy; use the firm's experienced-hire section for that different hiring path."
    ],
    "guard": "The firm has a named 2026 MDP listing on its recruiter-owned portal, but its deadline must be verified from that record; a programme page's Apply button does not establish perpetual admission."
  },
  "coronation-merchant-bank-careers": {
    "url": "https://www.coronationmb.com/careers/",
    "extra": null,
    "lead": "Coronation Merchant Bank's current official careers page explicitly reports no job openings available. It also describes banking, risk and digital financial-services career paths, staff development and remuneration, but those descriptions are employer information rather than live vacancies.",
    "steps": [
      "Read the 'There are currently No Job Openings Available' section before deciding whether you can apply.",
      "If a new vacancy appears in future, check the named position, duty station and required experience on Coronation's own page.",
      "Treat invitations from WhatsApp, paid screening agents or copied vacancy advertisements as unverified unless Coronation confirms the exact opening on its owned channel.",
      "The employer displays no available jobs in its own listing area; do not create a CV-to-vacancy instruction until that changes.",
      "If an external recruiter claims an imminent role, request a matching Coronation listing or a verified issuer confirmation before proceeding."
    ],
    "guard": "This is a careers directory with no listed opening on the checked issuer page, not a newly opened October 2026 recruitment drive."
  },
  "greenwich-merchant-bank-careers": {
    "url": "https://www.greenwichbankgroup.com/22careers/",
    "extra": null,
    "lead": "Greenwich Merchant Bank describes a specific Graduate Trainee Programme (GGTP) on its careers page. The displayed eligibility is at least a Second-Class Upper degree from an accredited full-time university programme and age 26 or younger at the commencement of recruitment. That does not establish that the GGTP is open today.",
    "steps": [
      "Open the Graduate Trainee Programme section and check the current Apply Now destination before submitting any personal details.",
      "Assess the displayed GGTP degree-class and age rules against your own eligibility; the programme's criteria do not apply automatically to experienced hires.",
      "Confirm whether the live destination contains a programme date, hiring cycle, deadline and successful submission response before treating the application as current.",
      "The Graduate Trainee eligibility rules reference the start of recruitment; check which actual intake date governs the age test.",
      "If the graduate form is absent or closed, do not assume the bank's general career statement opens a rolling experienced-hire programme."
    ],
    "guard": "Do not guess the next cohort or promise screening simply because the bank keeps its graduate-trainee information online."
  },
  "regency-alliance-careers": {
    "url": "https://regencyalliance.com/company-overview/careers/",
    "extra": "https://regencyalliance.com/career/vacancies/",
    "lead": "Regency Alliance's careers landing page contains generic 'Consulting WP' template wording unrelated to the insurer. Its distinct company vacancy table is more useful: it lists reference-numbered Marketing Executive, Franchise Administrator and Branch Manager positions with cities, but without sufficiently verified posting and closing dates to call all entries current.",
    "steps": [
      "Skip the generic Consulting WP paragraphs and use the insurer's separate Vacancies table to identify a named role.",
      "Match reference and city, for example a Lagos Marketing Executive or a branch-management posting in a specific state, before considering an application.",
      "Open each advertised vacancy's details and confirm whether the employer still accepts submissions and what documents are requested; ask the issuer if there is no date or functional Apply link.",
      "Use the reference code and specific advertised city from Regency's vacancy table when enquiring about an advertised job.",
      "If job details lead back to the placeholder content, independently verify the employer's recruiting contact instead of treating that page as a functioning application."
    ],
    "guard": "Unreplaced website template content and undated vacancy tables are editorial risks. A role visible in the table is not conclusive evidence of an accepting application form."
  },
  "prestige-assurance-careers": {
    "url": "https://prestigeassuranceplc.com/Careers/",
    "extra": "https://prestigeassuranceplc.com/Vacancies",
    "lead": "Prestige Assurance's Careers page says there are no open vacancies, but a separate issuer-hosted Vacancies page advertises a Head, Internal Audit & Control position in Lagos. These pages conflict; neither should be used to make an unqualified 'recruiting now' or 'no vacancies' claim without verifying with its recruitment team.",
    "steps": [
      "Check both the Careers and Vacancies sections on Prestige's own domain before choosing an advertised position.",
      "If interested in internal audit, inspect the named role's responsibilities and contact the issuer through the provided careers@prestigeassuranceplc.com channel to confirm that the notice is current.",
      "Use the employer-hosted application form only after confirming the role is accepting submissions, then retain any acknowledgement. The careers page lists screening, interview and offer as separate stages.",
      "Tell the issuer which of its contradictory careers pages you saw when asking whether the Head, Internal Audit position remains open.",
      "Until the issuer clarifies availability, do not quote an unverified deadline, recruitment batch or current application success rate."
    ],
    "guard": "As of the 16 October review, Prestige's two official pages disagree on vacancy availability. Treat the listed job as unconfirmed until the employer resolves this conflict."
  },
  "linkage-assurance-careers": {
    "url": "https://www.linkageassurance.com/careers/",
    "extra": null,
    "lead": "Linkage Assurance's official careers page displays specific roles, but the Audit Team Lead advertisement explicitly carries a 18 July 2025 deadline. Its presence on the webpage in October 2026 is not proof the old application has reopened, even if headings still say 'We Are Hiring'.",
    "steps": [
      "Look up the exact job title on Linkage's careers page and read its deadline field before using its Apply link.",
      "For the Audit Team Lead example, the issuer required an accounting or related degree, ACA and five years of insurance-audit experience; do not copy those criteria to unrelated underwriting positions.",
      "If a deadline has passed, seek a newer official publication or written employer confirmation rather than sending documents against the old listing.",
      "Keep the 18 July 2025 audit deadline attached to its original role instead of describing it as a new October posting.",
      "When an employer updates an advertisement, use the revised exact posting date and role link, not the older archived apply route."
    ],
    "guard": "The issuer's July 2025 closing date is in the past. Do not publish that dated role as an October 2026 open vacancy."
  },
  "cornerstone-insurance-careers": {
    "url": "https://cornerstone.com.ng/corporate/career.php",
    "extra": null,
    "lead": "Cornerstone Insurance's employer page describes audit and compliance, risk, law, business development, finance and operations pathways. It lists a Unit Manager role across major Nigerian towns/cities and says prospective candidates can contact its official human-capital email. The page also publishes baseline education/NYSC and aptitude-test guidance.",
    "steps": [
      "Use Cornerstone's own Vacancies section to identify Unit Manager or any other actual role and location, rather than applying against the category list.",
      "Review the issuer's employment-criteria section, including the HND/degree and NYSC language, and recheck the named vacancy for any more specific criteria.",
      "Where the issuer directs an application by email, use only the bank's company-domain instruction printed on that page and clearly state the position of interest.",
      "Confirm the named Unit Manager location or territory rather than interpreting the broad 'major towns/cities' statement as a guaranteed local vacancy.",
      "Where applicants are asked to email a CV, include the precise position and wait for issuer confirmation before expecting assessment or interviews."
    ],
    "guard": "The webpage does not verify a new October deadline, salary or guaranteed vacancy count for all towns. Use the specific opening and employer instructions before treating it as current."
  },
  "nem-insurance-careers": {
    "url": "https://nem-insurance.com/careers",
    "extra": null,
    "lead": "NEM Insurance's own careers page currently says 'No open roles at the moment.' It identifies an equal-opportunity workplace and staff-development culture, but those statements are not evidence that any individual job application is open.",
    "steps": [
      "Check the current openings area on the issuer careers page; as checked it has no available roles.",
      "Only when NEM publishes a named vacancy should candidates prepare its specific qualification documents and apply through the new issuer-listed route.",
      "Do not send recruitment fees, IDs or bank details to contacts advertising interviews when no matching NEM opportunity can be verified.",
      "Because the current issuer page states no openings, avoid uploading CVs through a third-party 'NEM recruitment 2026' form.",
      "Return to the employer's own listings for any later opening; do not infer a trainee programme from the staff culture section."
    ],
    "guard": "No active role was publicly listed on the checked employer page. Preserve the directory for future searches but do not market it as a vacancy."
  },
  "universal-insurance-careers": {
    "url": "https://universalinsuranceplc.com/career/",
    "extra": null,
    "lead": "Universal Insurance's careers page expressly says not to send an unsolicited résumé unless responding to a current vacancy publication. Its instruction is to name the actual position in the email subject or use its issuer-hosted form, not to send speculative CVs on the assumption that it maintains a permanent talent pool.",
    "steps": [
      "Confirm a specific currently published vacancy from Universal Insurance before preparing your CV; the issuer says unsolicited submissions cannot be retained.",
      "Follow the career page's role-specific email/form instruction and include the actual position title, not an invented generic trainee title.",
      "Verify the current role, location, salary requirement request and any deadline from the vacancy announcement; do not call the form proof of an active vacancy.",
      "The employer explicitly rejects unsolicited résumés, so do not send one without an active named vacancy.",
      "If an eligible role appears later, use its exact position title in the subject and check whether Universal asks for salary requirements."
    ],
    "guard": "Universal's published 'do not send your résumé unless responding to a current vacancy publication' warning controls over generic job-portal advice to email a CV at any time."
  },
  "veritas-kapital-careers": {
    "url": "https://www.veritaskapital.com/Career.html",
    "extra": null,
    "lead": "Veritas Kapital Assurance separates undergraduate internships, Graduate Hire, Experienced Hire and Alumni routes on its official career page. A Senior Management, Port Harcourt notice appears under Open Positions, but the generic page does not independently establish a current closing date or whether that role's application remains valid.",
    "steps": [
      "Choose undergraduate, recent graduate or experienced hiring according to the company's own career categories.",
      "For Graduate Hire, note that the employer's description is directed at recent graduates with less than three years' work experience; do not apply that benchmark to management jobs.",
      "If selecting the Port Harcourt senior-management listing, open its detailed employer notice and confirm responsibility, current apply route and vacancy deadline before sharing personal information.",
      "Distinguish an undergraduate internship from the 'less than three years' Graduate Hire route when reading requirements.",
      "For the Port Harcourt manager notice, verify whether its original date and application contact are still valid before sending supporting documents."
    ],
    "guard": "An employer's generic careers category or undated role does not certify that applications are currently being processed."
  },
  "consolidated-hallmark-careers": {
    "url": "https://www.ch-insure.com/career/",
    "extra": "https://www.ch-insure.com/careers-test-page/",
    "lead": "Consolidated Hallmark's career content mixes historic detailed postings and a separate Careers page that says 'Current Opening — No posts found'. One older call-centre advertisement specifies a closing date of 20 September 2019. The presence of archived role instructions must not be turned into a new current opening.",
    "steps": [
      "Check the employer's current-openings widget first; as reviewed the separate careers page displayed 'No posts found'.",
      "When viewing any older technical-underwriter or application-support description, check whether it has a present-day date and the issuer still accepts that exact role.",
      "If the role lacks a current application window, treat its published qualifications as historical examples of responsibilities, not an invitation to apply today.",
      "An archived advertisement with a 2019 closing date should be retained only for reference; do not reuse its old recruitment email as a new campaign.",
      "If the current-opening section continues to show no posts, tell applicants there is no verified role-specific submission route."
    ],
    "guard": "Do not recycle the 2019 deadline or historic company-domain application emails as a fresh 2026 recruitment notice without a newer issuer statement."
  },
  "aradel-holdings-careers": {
    "url": "https://www.aradel.com/careers/",
    "extra": "https://careers.aradel.com/",
    "lead": "Aradel Holdings operates a dedicated careers.aradel.com portal distinguishing early-career and experienced professionals. Its official recruitment-scam notice says legitimate openings appear on that portal or through a verified partner, Aradel charges no recruitment fees, and normal recruitment communications use @aradel.com email addresses.",
    "steps": [
      "Open Aradel's own careers.aradel.com job board rather than relying on a generic company-homepage link.",
      "Choose early-career/internship or experienced professional, then examine the exact role and field location before applying; the portal has carried Ogbele engineering notices.",
      "Submit only through the official role and treat any payment request or bank-card-information demand as fraudulent under Aradel's stated policy.",
      "Aradel's employer job portal and a later partner handoff must be verifiably connected; unannounced paid intermediaries are not authorised.",
      "Check for @aradel.com in legitimate communication and report suspicious payment or bank-detail requests to the contact published by Aradel."
    ],
    "guard": "Aradel explicitly says it never charges at application, interview or placement. Its portal may display a '2025/2026 Internship Program' banner, but a banner alone cannot establish whether applications remain open."
  },
  "rainoil-careers": {
    "url": "https://www.rainoil.com.ng/careers/",
    "extra": "https://www.rainoil.com.ng/careers/vacancies/",
    "lead": "Rainoil offers a company-specific vacancies page linked from its Careers landing page. The recruitment list is embedded and may not expose role details in a plain public page response. Its own warning says Rainoil does not authorise third parties to advertise vacancies or solicit applicants on its behalf; job updates should originate on company-owned pages or verified social channels.",
    "steps": [
      "Open Rainoil's official careers page and follow See Job Openings to its own vacancy listing.",
      "Check the embedded listing for a named current position and its application instructions; a blank embedded view should not be treated as a confirmed opening.",
      "Before sharing documents, compare any recruiter or paid application request with Rainoil's published anti-scam warning and official channels.",
      "If Rainoil's embedded vacancy list cannot be viewed on your device, recheck using the employer's own careers page rather than accepting an aggregator's copy.",
      "Reject payment requests and recruiters not published through the issuer's approved official channels, as Rainoil's own notice instructs."
    ],
    "guard": "Rainoil explicitly disavows external recruitment solicitors and unauthorised advertisements. Do not substitute third-party jobs aggregators for its official listing."
  },
  "egbin-power-careers": {
    "url": "https://egbin-power.com/careers/",
    "extra": null,
    "lead": "Egbin Power's own careers page routes candidates to an Oracle recruitment portal and says it reviews applications on a rolling basis. The phrase refers to its recruiting process; it does not show that every engineering, graduate or power-plant role is open indefinitely.",
    "steps": [
      "Begin at Egbin Power's own careers page and follow the employer-controlled Apply Now route to Oracle.",
      "Choose a specific opening and verify the employer, department, plant location and degree or experience requirements in the Oracle position detail.",
      "Finish the exact application and retain the confirmation before relying on a rolling-review statement; no single salary or deadline governs the whole employer directory.",
      "Verify the Oracle job ID and worksite against Egbin Power's original linked portal before preparing professional certificates.",
      "A rolling-review practice still requires an active application route for the chosen position; preserve its confirmation after applying."
    ],
    "guard": "The landing page's rolling-application wording must not be converted into a false role-specific deadline or a promise that any given position is accepting submissions."
  },
  "oriental-energy-careers": {
    "url": "https://orientalenergy.com.ng/careers/",
    "extra": null,
    "lead": "Oriental Energy Resources' careers page describes its indigenous oil-and-gas workforce, but instead of listing verified individual vacancies it directs readers to follow the company's LinkedIn presence for opportunities. It prominently warns against fraudulent employment offers in the company's name.",
    "steps": [
      "Read the official Oriental Energy careers page and its fraud warning before interacting with any advertised opportunity.",
      "Follow only the corporate social account reached from the company's page and verify any named opening with a company-owned announcement.",
      "Do not disclose financial information, pay placement fees or respond to unfamiliar intermediaries; Oriental Energy expressly warns these offers are fraudulent.",
      "Check the corporate LinkedIn link from the employer site itself rather than an impersonator page offering guaranteed contracts.",
      "The issuer's published fraud warning takes priority over unsolicited messages; stop if a recruiter requests personal financial details."
    ],
    "guard": "An employer statement to 'follow us on LinkedIn' is an update route, not a current vacancy, an application form or authorisation to pay anyone."
  },
  "sahara-group-careers": {
    "url": "https://www.sahara-group.com/careers/",
    "extra": null,
    "lead": "Sahara Group's career information distinguishes a graduate/young-professional talent pipeline from broader experienced roles. It describes Graduate Trainee programmes for recent graduates and young professionals with a maximum of two years' experience, but the programme explanation is not a confirmed recruitment intake for October 2026.",
    "steps": [
      "Begin with Sahara Group's Our Recruitment / Learnership Opportunities section to identify a specific advertised intake.",
      "Match your experience to the programme itself: the public graduate-trainee description cites no more than two years of work experience, which cannot be applied to senior energy roles.",
      "Follow an actual linked candidate portal or vacancy and check deadline, duty station and application acknowledgement before stating you have applied.",
      "Compare the applicant's work experience to the specific graduate programme's two-year limit, not to unrelated senior job descriptions.",
      "If a current programme intake is not shown, return to Sahara's careers hub for an official release instead of using stale enrollment links."
    ],
    "guard": "Do not infer a current graduate application window or a salary from Sahara's evergreen programme description."
  },
  "eterna-plc-careers": {
    "url": "https://eternaplc.com/career/",
    "extra": "https://eternaplc.com/career-form/",
    "lead": "Eterna Plc's Careers landing page describes professional development but does not identify a specific currently open position. Its separate Career Form describes collecting information for potential positions: this is an expression-of-interest process, not a guaranteed opening or an ongoing individual application.",
    "steps": [
      "Open Eterna's careers page and check whether it identifies a dated named role before preparing a role-specific submission.",
      "If instead using the Career Form, understand that it is for potential positions; do not describe it as an application for a named current opening.",
      "Confirm the form loads and accepts a submission through the issuer; the page's generic promise of future contact does not guarantee screening or a deadline.",
      "Use Eterna's general career form only with the understanding that it records interest for possible future roles.",
      "If an advert claims to be an active Eterna job, verify the actual position and its date against the issuer before completing an unrelated contact form."
    ],
    "guard": "Do not convert the issuer's future-opportunity form into an open-vacancy listing or invent a graduate cohort."
  },
  "guinness-nigeria-careers": {
    "url": "https://www.guinness-nigeria.com/careers/",
    "extra": "https://www.guinness-nigeria.com/careers/search-and-apply/",
    "lead": "Guinness Nigeria's careers pages separate graduate/internship routes from experienced roles and direct the actual global vacancy search through a Diageo recruitment portal. Commercial, supply, marketing, corporate-relations and HR pages are department descriptions, not proof of an open Nigerian role.",
    "steps": [
      "Use the employer's Search and Apply page and follow its actual Diageo job-search link, then filter the global jobs list to Nigeria and the target function.",
      "For undergraduates or recent graduates, inspect the distinct official Internships page rather than a full-time job advertised for an overseas location.",
      "Only submit from a named opening and read its location, age/experience or role requirements, closing date and compliance information before applying.",
      "Once handed to the global Diageo board, check the country and contractual employer on each role before assuming eligibility in Nigeria.",
      "Use the dedicated internship information for early-career opportunities, and do not extrapolate internships from the commercial or marketing function pages."
    ],
    "guard": "The company careers site has an age-gate notice in some browser paths; a blocked landing page or generic 'Find a Role' description does not establish a specific current opening."
  },
  "beta-glass-careers": {
    "url": "https://betaglass.com/our-society/join-our-global-team/",
    "extra": "https://www.betaglass.com/our-society/cv-form/",
    "lead": "Beta Glass's issuer careers page lists individually referenced vacancies, such as Financial Controller (0038) in Lagos, CTP Operator/Designer (0037) at the Ijebu-Ode Crown Plant and Cold End Manager (0035) in Agbara. Its instructions ask applicants to identify a job's reference code when sending a CV, and its separate CV form also supports general talent-community contact.",
    "steps": [
      "Open Beta Glass's own Job Vacancies section and choose the exact reference and plant or office location; do not describe a Delta or Ogun role as Lagos-based.",
      "Follow the role's description and use the issuer's CV form or stated submission route, quoting the reference number precisely.",
      "Confirm whether the chosen reference is still accepting candidates before treating an undated website listing as a guaranteed vacancy; distinguish Talent Community from a job application.",
      "Include the role's exact reference number such as 0038 or 0037 when contacting Beta Glass, as instructed by the employer.",
      "Check whether a location-specific factory job remains current before submitting a CV and distinguish the separate talent community from a named vacancy."
    ],
    "guard": "The page lists real role identifiers but does not supply universally verified closing dates. A talent-community CV upload is not a confirmed application to each vacancy."
  }
};

export const checkedIssuerCareerSlugs20261016 = Object.keys(checkedIssuerCareers20261016);

// Applied after earlier 25- and 9-employer overlays: one source of truth for
// these disjoint slugs. Do not overwrite earlier unrelated corrections.
export function applyMoreIssuerCareerReviews20261016(item: CareerOpportunity): CareerOpportunity {
  const review = checkedIssuerCareers20261016[item.slug];
  if (!review || item.kind !== "career-page" || item.officialUrl !== review.url) return item;
  const sources = [...item.sources];
  for (const url of [review.url, review.extra].filter((value): value is string => Boolean(value))) {
    const position = sources.findIndex(source => source.url === url);
    if (position !== -1) {
      sources[position] = { ...sources[position], lastChecked: "2026-10-16" };
    } else {
      sources.push({
        label: item.organization + " original employer careers / vacancy information",
        url, lastChecked: "2026-10-16"
      });
    }
  }
  return {
    ...item,
    kind: "career-page",
    status: "career-page",
    statusLabel: "Issuer career directory reviewed 16 October 2026 — verify named roles",
    verifiedAt: "2026-10-16",
    deadline: undefined,
    nextMilestone: undefined,
    summary: review.lead,
    applicationSteps: review.steps,
    sourceNotes: [
      review.guard,
      "Source review date: 16 October 2026. Job boards, linked forms and dates can change; a company careers page alone never proves a specific vacancy is currently accepting applications.",
      "Original issuer destination reviewed: " + review.url + (review.extra ? "; related issuer page: " + review.extra : "; the issuer page alone did not supply an additional role-specific source."),
    ],
    sources,
  };
}
