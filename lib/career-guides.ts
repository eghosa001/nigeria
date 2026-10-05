export type CareerGuideSource = {
  label: string;
  url: string;
  lastChecked: string;
};

export type CareerGuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type CareerGuide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  summary: string;
  answer: string;
  reviewedAt: string;
  facts: Array<{ label: string; value: string }>;
  sections: CareerGuideSection[];
  sources: CareerGuideSource[];
  relatedLinks: Array<{ href: string; label: string }>;
};

export const careerGuides: CareerGuide[] = [
  {
    slug: "cv-format-nigeria",
    title: "CV Format for Jobs in Nigeria",
    metaTitle: "CV Format in Nigeria: Practical 2026 Job Application Guide",
    description: "Build a clear Nigerian job CV for graduate and experienced roles: structure, achievements, NYSC, skills, file format and tailoring checklist.",
    summary: "A strong Nigerian CV should make your fit for one specific role obvious in seconds: clear contact details, a short targeted profile, evidence-led experience, education or NYSC where relevant, and skills that match the vacancy.",
    answer: "Use a clean, role-specific CV rather than one generic document for every application. Put the evidence most relevant to the vacancy near the top and remove details that do not help the employer assess your fit.",
    reviewedAt: "2026-10-05",
    facts: [
      { label: "Best starting point", value: "Tailor to one vacancy" },
      { label: "Core sections", value: "Profile · experience · education · skills" },
      { label: "NYSC", value: "Include status when relevant to eligibility" },
      { label: "File", value: "Use the format the employer requests" }
    ],
    sections: [
      {
        heading: "Build the top of the CV for a fast first read",
        paragraphs: [
          "Start with your name, reliable phone number, professional email address and a concise location line. Add LinkedIn or a portfolio only when it strengthens the application.",
          "Follow with a short professional profile that names the role family you are targeting and the strongest evidence you can offer. Avoid generic claims unless the next line proves them."
        ],
        bullets: [
          "Use the job title and vacancy language naturally where it accurately describes you.",
          "Keep personal data to what the application needs; do not add sensitive identifiers unless the employer explicitly requests them through a trusted process.",
          "A photograph, date of birth, marital status or state of origin should not be added by default simply because an old CV template contains them."
        ]
      },
      {
        heading: "Write experience as evidence, not a duty list",
        paragraphs: [
          "For each recent role, project, internship or leadership position, show what you handled and what changed because of your work. Numbers help when they are truthful.",
          "Graduates with limited formal employment can use SIWES, NYSC, final-year projects, volunteering, freelancing and relevant leadership work when those experiences demonstrate the skills the vacancy asks for."
        ],
        bullets: ["Lead bullets with strong actions and the result or purpose.", "Prioritise recent, relevant evidence.", "Do not invent metrics; a clear factual outcome is stronger than a fabricated percentage."]
      },
      {
        heading: "Handle education, NYSC, certifications and skills deliberately",
        paragraphs: [
          "List the qualification, institution and completion date clearly. If a graduate programme states an NYSC requirement, make your completed, exempted or current status easy to find.",
          "Separate technical tools, languages, licences and professional certifications from vague soft-skill lists."
        ],
        bullets: ["Include degree classification only when useful or requested.", "List active certifications with the correct awarding body.", "Do not claim proficiency in tools you cannot discuss in an interview."]
      },
      {
        heading: "Final submission check",
        paragraphs: [
          "Re-read the official vacancy before submitting. Check that your CV reflects the role you are actually applying for, not the last role you applied to.",
          "Use a professional filename such as Firstname-Lastname-CV.pdf when PDF is accepted. If the employer requests another format or an online profile, follow that instruction."
        ],
        bullets: ["Proofread names, dates, phone number and email address.", "Remove hidden comments, tracked changes and irrelevant pages.", "Confirm the application domain before uploading personal information."]
      }
    ],
    sources: [
      { label: "Access Bank Careers", url: "https://careers.accessbankplc.com/careers", lastChecked: "2026-10-05" },
      { label: "WHO — Apply for a Position", url: "https://www.who.int/careers/apply-for-a-position", lastChecked: "2026-10-05" }
    ],
    relatedLinks: [
      { href: "/jobs/guides/cover-letter-nigeria", label: "Write a matching cover letter" },
      { href: "/jobs/guides/graduate-job-application-checklist", label: "Graduate application checklist" },
      { href: "/jobs/graduate", label: "Browse graduate opportunities" }
    ]
  },
  {
    slug: "cover-letter-nigeria",
    title: "How to Write a Cover Letter for Jobs in Nigeria",
    metaTitle: "Cover Letter for Jobs in Nigeria: Structure & Practical Guide",
    description: "Write a tailored Nigerian job cover letter that connects your evidence to the vacancy without repeating your CV or using generic filler.",
    summary: "A useful cover letter answers three questions quickly: why this role, why this organisation, and what evidence shows you can do the work. It should add context to your CV rather than rewrite it.",
    answer: "Open with the exact role, connect two or three requirements to evidence from your experience, explain the employer-specific reason you are applying, then close with a clear professional next step.",
    reviewedAt: "2026-10-05",
    facts: [
      { label: "Purpose", value: "Connect your evidence to the vacancy" },
      { label: "Avoid", value: "Generic copy sent to every employer" },
      { label: "Best evidence", value: "2–3 role-relevant examples" },
      { label: "Submission", value: "Follow the employer's requested format" }
    ],
    sections: [
      {
        heading: "Start with the role and your strongest fit",
        paragraphs: [
          "Name the position and give the recruiter a concrete reason to continue reading. Your first paragraph should not become a long autobiography.",
          "If the vacancy has several major requirements, choose the strongest two or three that you can prove."
        ],
        bullets: ["Use the exact role title where possible.", "State your strongest relevant qualification or experience early.", "Avoid openings that only say you are passionate without explaining why you fit."]
      },
      {
        heading: "Use the middle to prove fit",
        paragraphs: [
          "Give short examples that connect your work, project, SIWES, NYSC or volunteer experience to the employer's needs.",
          "Add one employer-specific reason for applying: the team, product, public mission, sector, programme or type of work."
        ],
        bullets: ["Match your evidence to the published requirements.", "Use one strong example per paragraph.", "Do not claim inside knowledge about the company or role."]
      },
      {
        heading: "Close cleanly and follow the application instruction",
        paragraphs: [
          "End by reinforcing the value you can contribute and your interest in discussing the role. A professional closing is enough.",
          "Some employers collect a cover letter, some ask for a motivation statement, and others do not request one. Follow the official application form."
        ],
        bullets: ["Check the recipient or team name.", "Use the requested file type.", "Proofread the organisation name and role title especially carefully."]
      }
    ],
    sources: [
      { label: "WHO — Apply for a Position", url: "https://www.who.int/careers/apply-for-a-position", lastChecked: "2026-10-05" },
      { label: "UNICEF — Get Prepared for Your Job Search", url: "https://www.unicef.org/careers/get-prepared-search-jobs", lastChecked: "2026-10-05" },
      { label: "UNDP Recruitment Process", url: "https://www.undp.org/careers/our-recruitment-process", lastChecked: "2026-10-05" }
    ],
    relatedLinks: [
      { href: "/jobs/guides/cv-format-nigeria", label: "Build your CV first" },
      { href: "/jobs/guides/job-interview-questions-nigeria", label: "Prepare for interviews" },
      { href: "/jobs/open-now", label: "See jobs open now" }
    ]
  },
  {
    slug: "job-interview-questions-nigeria",
    title: "Job Interview Questions in Nigeria: How to Prepare",
    metaTitle: "Job Interview Questions in Nigeria: Practical Preparation Guide",
    description: "Prepare for common Nigerian graduate and professional interviews using role evidence, STAR examples, employer research and questions of your own.",
    summary: "Interview preparation is not memorising perfect answers. Build a small bank of truthful examples that show how you solve problems, work with people, learn, deliver results and handle setbacks.",
    answer: "Prepare concise evidence for the role's main competencies, practise a 60–90 second career introduction, research the employer from official sources and rehearse examples using situation, task, action and result.",
    reviewedAt: "2026-10-05",
    facts: [
      { label: "Prepare first", value: "Role requirements and employer facts" },
      { label: "Evidence method", value: "Situation · task · action · result" },
      { label: "Practise", value: "Out loud, not only in your head" },
      { label: "Ask", value: "Useful questions about the role and team" }
    ],
    sections: [
      {
        heading: "Prepare the questions you are most likely to face",
        paragraphs: [
          "A strong answer to tell me about yourself is a short career story: where you are now, the relevant experience that brought you here, and why this role is the logical next step.",
          "For why do you want to work here, use facts from the organisation's official site, product, programme or job description."
        ],
        bullets: ["Tell me about yourself.", "Why this role and this organisation?", "Describe a difficult problem or disagreement you handled.", "Tell us about a mistake or missed target and what changed.", "Give an example of leadership, teamwork or initiative."]
      },
      {
        heading: "Build a reusable evidence bank",
        paragraphs: [
          "Choose five to eight examples from work, school, NYSC, SIWES, projects or volunteering. For each one, note the context, responsibility, action and result.",
          "One example can answer several questions when it genuinely demonstrates different competencies, but do not force the same story into every answer."
        ],
        bullets: ["Use I when describing your own action even if the result came from a team.", "Quantify outcomes when accurate.", "Keep confidential employer or client details out of your answer."]
      },
      {
        heading: "Treat assessments and interview stages as one process",
        paragraphs: [
          "Large employers may use online tests, case exercises, group stages, technical interviews, panel interviews or medical checks. The sequence differs by employer.",
          "Before any assessment link, verify the sender and destination. Recruitment fraud can become more convincing after a candidate has submitted a real application."
        ]
      },
      {
        heading: "Prepare your own questions",
        paragraphs: [
          "Useful candidate questions help you understand how success is measured, what the first months look like, how the team works and what happens next.",
          "Use limited interview time to clarify the role rather than asking only questions already answered on the vacancy page."
        ]
      }
    ],
    sources: [
      { label: "Access Bank Careers", url: "https://careers.accessbankplc.com/careers", lastChecked: "2026-10-05" },
      { label: "The Coca-Cola Company Careers", url: "https://www.coca-colacompany.com/careers", lastChecked: "2026-10-05" }
    ],
    relatedLinks: [
      { href: "/jobs/guides/salary-expectation-nigeria", label: "Prepare for the salary question" },
      { href: "/jobs/guides/cv-format-nigeria", label: "Review the CV they will discuss" },
      { href: "/jobs", label: "Browse verified career pathways" }
    ]
  },
  {
    slug: "salary-expectation-nigeria",
    title: "How to Answer Salary Expectation Questions in Nigeria",
    metaTitle: "Salary Expectation in Nigeria: How to Answer in an Interview",
    description: "Handle salary-expectation questions without inventing a number: research the role, clarify total compensation, use a reasoned range and know when to ask for more context.",
    summary: "Your salary expectation should be a reasoned position, not a random number. Base it on the role, level, location, industry, scope and total compensation, while leaving room to discuss the full package.",
    answer: "If you have enough information, give a researched range and say it depends on the full responsibilities and total package. If you do not yet understand the level or benefits, ask for the employer's budgeted range before anchoring yourself.",
    reviewedAt: "2026-10-05",
    facts: [
      { label: "Before answering", value: "Understand role level and scope" },
      { label: "Research", value: "Use multiple recent salary signals" },
      { label: "Answer style", value: "Reasoned range, not a random figure" },
      { label: "Compare", value: "Total package, not base salary alone" }
    ],
    sections: [
      {
        heading: "Research the job, not just the title",
        paragraphs: [
          "The same job title can sit at very different levels across employers. Compare responsibilities, experience, budget or people responsibility, technical depth, location and sector.",
          "Use several recent signals where possible: comparable vacancies with published pay, credible salary platforms, professional networks and recruiters in the same market."
        ]
      },
      {
        heading: "Use a range you can explain",
        paragraphs: [
          "A concise answer can state that your range is based on the role's scope and your experience, while remaining open to the total package. The bottom of your range should still be a figure you would seriously consider.",
          "Do not inflate a range simply because you expect negotiation; a very wide range can also signal that you have not researched the level."
        ],
        bullets: ["Clarify monthly or annual and gross or net.", "Ask what benefits, bonus, pension, allowances or equity are included where relevant.", "Do not disclose fabricated competing offers or salary history."]
      },
      {
        heading: "If it is too early, ask for context",
        paragraphs: [
          "At an early screening stage you may not yet know enough about the role to price it accurately. It is reasonable to ask for the budgeted range or more detail about responsibilities.",
          "If a form requires a number, use your best researched estimate and note whether it asks for current salary, expected salary, monthly pay or annual compensation."
        ]
      },
      {
        heading: "Negotiate the written offer, not an imaginary package",
        paragraphs: [
          "Once an offer exists, compare base pay, variable pay, pension, health cover, leave, work location, commute or remote expectations, probation and review cycle.",
          "If you counter, tie the request to role scope, your evidence and market context. Keep the conversation professional even if you decline."
        ]
      }
    ],
    sources: [
      { label: "Indeed Career Guide — Salary Expectations", url: "https://www.indeed.com/career-advice/interviewing/interview-question-what-are-your-salary-expectations", lastChecked: "2026-10-05" },
      { label: "Access Bank Careers", url: "https://careers.accessbankplc.com/careers", lastChecked: "2026-10-05" }
    ],
    relatedLinks: [
      { href: "/jobs/guides/job-interview-questions-nigeria", label: "Interview preparation guide" },
      { href: "/jobs/guides/graduate-job-application-checklist", label: "Graduate application checklist" },
      { href: "/jobs/open-now", label: "See current opportunities" }
    ]
  },
  {
    slug: "graduate-job-application-checklist",
    title: "Graduate Job Application Checklist for Nigeria",
    metaTitle: "Graduate Job Application Checklist Nigeria: Before You Submit",
    description: "A practical checklist for Nigerian graduate jobs: eligibility, NYSC, CV, documents, application portal, assessments, fraud checks and follow-up.",
    summary: "Graduate applications are often rejected before interview because a basic eligibility condition, document or form field is missed. Check the official criteria first, then tailor the application and keep proof of what you submitted.",
    answer: "Before applying, confirm degree, class, NYSC, age or graduation-year rules exactly as published; prepare a tailored CV and requested documents; submit only through the official route; and save the vacancy and confirmation for later stages.",
    reviewedAt: "2026-10-05",
    facts: [
      { label: "First check", value: "Eligibility before application effort" },
      { label: "Common gate", value: "Degree · NYSC · experience · location" },
      { label: "Submit", value: "Only through the official recruitment route" },
      { label: "Keep", value: "Vacancy copy and confirmation" }
    ],
    sections: [
      {
        heading: "Confirm hard eligibility first",
        paragraphs: [
          "Read the official vacancy before editing your CV. Graduate programmes may use degree discipline, class, graduation year, NYSC status, professional qualification, location or work-authorisation rules as hard filters.",
          "Do not assume an older intake had the same criteria. Programme rules can change."
        ],
        bullets: ["Degree or discipline requirement", "Class of degree if stated", "NYSC status", "Graduation-year or age rule only when published", "Location or work-authorisation requirement"]
      },
      {
        heading: "Prepare the application package",
        paragraphs: [
          "Tailor your CV and prepare only the documents the application requests. Graduates can use SIWES, NYSC, projects, volunteering, competitions and leadership evidence when it demonstrates required skills.",
          "Keep document names professional and scans readable. Do not upload sensitive identifiers to a third-party form you cannot verify from the employer's own recruitment page."
        ]
      },
      {
        heading: "Submit carefully",
        paragraphs: [
          "Create the recruitment account with an email address and phone number you actively monitor. Enter dates and qualification details consistently with your documents.",
          "Before final submission, re-check the role title, location and every required field. Save the confirmation screen, email or application ID."
        ],
        bullets: ["Use the employer's official careers route.", "Do not pay for an application, test invitation, shortlist or appointment unless an official public process establishes a legitimate fee.", "Do not share passwords or one-time codes."]
      },
      {
        heading: "Prepare for the next stage immediately",
        paragraphs: [
          "Graduate recruitment can move into aptitude tests, assessment centres, interviews, document checks or medical stages. Keep the original vacancy because it is your best preparation guide.",
          "If you receive an invitation, verify the sender and destination before opening links or submitting more personal data."
        ]
      }
    ],
    sources: [
      { label: "Access Bank Early Careers", url: "https://careers.accessbankplc.com/careers", lastChecked: "2026-10-05" },
      { label: "Microsoft Internship Eligibility — Nigeria", url: "https://careers.microsoft.com/v2/global/en/internship_eligibility", lastChecked: "2026-10-05" },
      { label: "UNDP Recruitment Process", url: "https://www.undp.org/careers/our-recruitment-process", lastChecked: "2026-10-05" }
    ],
    relatedLinks: [
      { href: "/jobs/graduate", label: "Graduate jobs & trainee programmes" },
      { href: "/jobs/guides/cv-format-nigeria", label: "CV format guide" },
      { href: "/jobs/guides/job-interview-questions-nigeria", label: "Interview preparation" }
    ]
  },
  {
    slug: "nysc-cv-job-application",
    title: "NYSC CV and Job Application Guide",
    metaTitle: "NYSC CV Nigeria: How to Apply for Jobs During or After Service",
    description: "Build an NYSC-ready CV and apply for graduate jobs without misrepresenting your service status, experience or availability.",
    summary: "NYSC can strengthen a graduate application when you present your actual service status, PPA work, projects and measurable responsibilities clearly instead of treating the service year as a blank period.",
    answer: "State your NYSC status accurately, use your PPA and service projects as evidence where relevant, and check each employer's eligibility rule before applying because some programmes require completed service while others accept serving corps members.",
    reviewedAt: "2026-10-05",
    facts: [
      { label: "State clearly", value: "Serving · completed · exempted" },
      { label: "Use as evidence", value: "PPA work and service projects" },
      { label: "Check first", value: "Employer NYSC eligibility rule" },
      { label: "Never do", value: "Claim completion before it happens" }
    ],
    sections: [
      {
        heading: "Put your NYSC status where recruiters can understand it",
        paragraphs: [
          "If a vacancy has an NYSC requirement, make your status easy to find. Use a factual line such as NYSC completed with month and year, currently serving with expected completion month, or formally exempted where applicable.",
          "Do not change a serving status to completed because a deadline is close. Graduate programmes can verify documents later in the process."
        ]
      },
      {
        heading: "Turn your PPA into relevant experience",
        paragraphs: [
          "Describe responsibilities, projects and outcomes from your PPA the same way you would describe other work experience. Focus on what you did, the tools or processes you used and the result.",
          "Community development, technical projects, reporting, training, field work and leadership can also be useful when they demonstrate competencies the vacancy asks for."
        ],
        bullets: ["Use truthful outcomes.", "Prioritise experience related to the vacancy.", "Keep employer or patient/client information confidential."]
      },
      {
        heading: "Check programme eligibility before submitting",
        paragraphs: [
          "Some graduate employers require NYSC completion before application or resumption, while internships and other early-career opportunities may use different rules.",
          "Read the current official vacancy rather than relying on eligibility from an older recruitment cycle."
        ]
      }
    ],
    sources: [
      { label: "Access Bank Careers", url: "https://careers.accessbankplc.com/careers", lastChecked: "2026-10-05" },
      { label: "Microsoft Internship Eligibility", url: "https://careers.microsoft.com/v2/global/en/internship_eligibility", lastChecked: "2026-10-05" }
    ],
    relatedLinks: [
      { href: "/jobs/nysc", label: "NYSC opportunities" },
      { href: "/jobs/guides/cv-format-nigeria", label: "CV format guide" },
      { href: "/jobs/graduate", label: "Graduate jobs" }
    ]
  },
  {
    slug: "job-application-email-nigeria",
    title: "How to Write a Job Application Email in Nigeria",
    metaTitle: "Job Application Email Nigeria: Subject, Message & Attachment Checklist",
    description: "Write a concise job application email that identifies the role, proves fit, names the attachments and avoids common submission mistakes.",
    summary: "A job application email should help the recruiter identify your application quickly. Use the exact role in the subject, a short message linking your strongest evidence to the vacancy, and only the attachments requested by the employer.",
    answer: "Use the vacancy title or reference in the subject, introduce yourself in one sentence, give two or three relevant proof points, name the attached documents and close professionally. Follow the official vacancy instructions if they specify a different format.",
    reviewedAt: "2026-10-05",
    facts: [
      { label: "Subject", value: "Exact role or vacancy reference" },
      { label: "Body", value: "Short and role-specific" },
      { label: "Attachments", value: "Only what was requested" },
      { label: "Before send", value: "Verify the recipient/domain" }
    ],
    sections: [
      {
        heading: "Make the subject line sortable",
        paragraphs: [
          "Use the role title and vacancy reference when the employer provides one. Recruiters handling many applications should be able to identify your application without opening it.",
          "Avoid vague subjects such as Application, My CV or Job Request unless the employer explicitly asks for that wording."
        ]
      },
      {
        heading: "Keep the email body useful",
        paragraphs: [
          "State the role, your current professional or graduate status and the strongest evidence that matches the vacancy. Two or three concrete points are enough for most application emails.",
          "Do not paste your entire cover letter into the email unless the employer asks for the cover letter in the message body."
        ],
        bullets: ["Use the organisation's correct name.", "Mention the attachments.", "Use a phone number and email you monitor."]
      },
      {
        heading: "Check security and attachments before sending",
        paragraphs: [
          "Verify the recipient address against the official vacancy or employer domain. Recruitment scams frequently copy logos and job titles while changing the destination email.",
          "Open your attachments once before sending, use professional filenames and remove unrelated documents."
        ]
      }
    ],
    sources: [
      { label: "British Council Nigeria Job Opportunities", url: "https://www.britishcouncil.org.ng/about/jobs", lastChecked: "2026-10-05" },
      { label: "British Council Fake Job Alert", url: "https://www.britishcouncil.org.ng/fake-job-alert", lastChecked: "2026-10-05" }
    ],
    relatedLinks: [
      { href: "/jobs/guides/cover-letter-nigeria", label: "Cover letter guide" },
      { href: "/jobs/guides/cv-format-nigeria", label: "CV format guide" },
      { href: "/jobs/open-now", label: "Jobs open now" }
    ]
  },
  {
    slug: "graduate-aptitude-test-preparation",
    title: "Graduate Aptitude Test Preparation in Nigeria",
    metaTitle: "Graduate Aptitude Tests Nigeria: Practical Preparation Guide",
    description: "Prepare for graduate recruitment tests by understanding the employer stage, practising timed reasoning and verifying every assessment invitation.",
    summary: "Graduate tests usually reward familiarity with the test format, accurate reasoning under time pressure and careful reading. Preparation should start from the employer's current recruitment process, not a leaked-question promise.",
    answer: "Confirm the employer's assessment stage, practise timed numerical, verbal and logical reasoning where relevant, review the role's technical fundamentals and verify the assessment link before entering credentials.",
    reviewedAt: "2026-10-05",
    facts: [
      { label: "First step", value: "Confirm the real assessment stage" },
      { label: "Practise", value: "Timed reasoning under test conditions" },
      { label: "Technical roles", value: "Review job-specific fundamentals" },
      { label: "Avoid", value: "Paid 'guaranteed answers'" }
    ],
    sections: [
      {
        heading: "Work from the employer's process",
        paragraphs: [
          "Graduate recruitment can include online tests, coding exercises, case studies, group assessments or interviews. The sequence can change between recruitment cycles.",
          "Keep the original vacancy and official invitation so you know what the employer is assessing and which platform should host the test."
        ]
      },
      {
        heading: "Practise accuracy before speed",
        paragraphs: [
          "Use timed practice for the reasoning types relevant to the programme. Review mistakes after each session instead of only counting completed questions.",
          "For technical roles, add role-specific revision such as engineering principles, accounting concepts, software fundamentals or professional knowledge where the vacancy indicates it."
        ]
      },
      {
        heading: "Verify the invitation before signing in",
        paragraphs: [
          "A test invitation can be imitated by scammers. Check the sender, destination domain, recruitment stage and whether the employer actually uses the named platform.",
          "Do not pay someone for a test invitation, shortlist or guaranteed score."
        ]
      }
    ],
    sources: [
      { label: "UNDP Recruitment Process", url: "https://www.undp.org/careers/our-recruitment-process", lastChecked: "2026-10-05" },
      { label: "British Council Fake Job Alert", url: "https://www.britishcouncil.org.ng/fake-job-alert", lastChecked: "2026-10-05" }
    ],
    relatedLinks: [
      { href: "/jobs/guides/graduate-job-application-checklist", label: "Graduate application checklist" },
      { href: "/jobs/guides/job-interview-questions-nigeria", label: "Interview preparation" },
      { href: "/jobs/graduate", label: "Graduate programmes" }
    ]
  },
  {
    slug: "linkedin-profile-job-search-nigeria",
    title: "LinkedIn Profile for a Nigerian Job Search",
    metaTitle: "LinkedIn Profile for Jobs in Nigeria: Recruiter-Ready Checklist",
    description: "Make your LinkedIn profile easier for recruiters to understand with an accurate headline, experience evidence, relevant skills and current job preferences.",
    summary: "A useful LinkedIn profile is an accurate professional landing page, not a wall of repeated keywords. Recruiters need to understand your field, experience, evidence and relevant skills quickly.",
    answer: "Keep your headline, About, experience, education and skills current; use the terms that genuinely describe your work; add evidence to experience entries; and avoid keyword stuffing or inflating qualifications.",
    reviewedAt: "2026-10-05",
    facts: [
      { label: "Headline", value: "Field and genuine expertise" },
      { label: "Experience", value: "Evidence, not copied duties" },
      { label: "Skills", value: "Relevant and truthful" },
      { label: "Avoid", value: "Keyword stuffing" }
    ],
    sections: [
      {
        heading: "Make the top of the profile explain your professional direction",
        paragraphs: [
          "LinkedIn describes the profile as a professional landing page. Your headline can communicate an area of expertise rather than simply repeating your current job title.",
          "Keep location, education and current position accurate because job recommendations and recruiter searches can use profile information."
        ]
      },
      {
        heading: "Use experience and skills as evidence",
        paragraphs: [
          "Update experience entries with responsibilities and outcomes that reflect what you actually did. Add relevant skills that you can demonstrate.",
          "LinkedIn's recruiter tools can use explicit skills and skills inferred from profile text, so clear descriptions help more than repeating the same keyword."
        ],
        bullets: ["Use relevant projects and certifications.", "Keep dates consistent with your CV.", "Remove skills you no longer want to be hired for when they create noise."]
      },
      {
        heading: "Optimise without trying to game search",
        paragraphs: [
          "LinkedIn specifically recommends a rich, accurate and complete profile and warns against repetitive keyword stuffing and inflated experience or education.",
          "Your profile should still read naturally to a person who opens it after finding you in search."
        ]
      }
    ],
    sources: [
      { label: "LinkedIn Help — Create a Good Profile", url: "https://www.linkedin.com/help/linkedin/answer/a554351/edit-your-profile?lang=en", lastChecked: "2026-10-05" },
      { label: "LinkedIn Help — Profile Search Practices to Avoid", url: "https://www.linkedin.com/help/linkedin/answer/a526134", lastChecked: "2026-10-05" }
    ],
    relatedLinks: [
      { href: "/jobs/guides/cv-format-nigeria", label: "CV format guide" },
      { href: "/jobs/guides/job-interview-questions-nigeria", label: "Interview preparation" },
      { href: "/jobs", label: "Verified jobs directory" }
    ]
  },
  {
    slug: "job-scam-red-flags-nigeria",
    title: "Job Scam Red Flags in Nigeria",
    metaTitle: "Job Scam Red Flags Nigeria: Verify a Recruitment Offer Before Paying",
    description: "Check suspicious job offers for fake domains, upfront payments, unexpected offers, early requests for sensitive information and copied employer branding.",
    summary: "A professional-looking logo is not proof of a real job. Verify the vacancy through the employer's official website, check the sender and destination domain, and treat payment or urgent requests for financial information as major warning signs.",
    answer: "Before responding, independently find the employer's official careers page and confirm the vacancy. Do not pay for an application, shortlist, interview, training slot or appointment, and do not send banking details or identity documents to an unverified recruiter.",
    reviewedAt: "2026-10-05",
    facts: [
      { label: "Major red flag", value: "Payment for recruitment access" },
      { label: "Verify", value: "Employer website and email domain" },
      { label: "Be cautious", value: "Unexpected offers and urgent pressure" },
      { label: "Protect", value: "Banking and identity information" }
    ],
    sections: [
      {
        heading: "Check the vacancy outside the message you received",
        paragraphs: [
          "Do not use the link inside a suspicious email as your only verification method. Search for the organisation's official website independently and look for the vacancy or recruitment notice there.",
          "Check whether the sender uses the organisation's real domain and whether the application destination matches the official careers system."
        ]
      },
      {
        heading: "Treat payment and sensitive-data requests seriously",
        paragraphs: [
          "WFP states that it does not charge fees at any recruitment stage, and British Council Nigeria warns that legitimate recruitment does not require payment or early disclosure of sensitive financial information.",
          "Requests for bank details, passport or identity documents very early in an unverified process should trigger additional verification."
        ],
        bullets: ["Do not buy a shortlist.", "Do not pay for an interview slot.", "Do not share passwords or one-time codes.", "Contact the organisation through a separately verified channel."]
      },
      {
        heading: "Recognise pressure and impersonation tactics",
        paragraphs: [
          "Scam messages can copy logos, use job boards or social media and create urgency around a high salary or immediate offer.",
          "A real-looking document can still be fraudulent. Verify the role, domain, contact and recruitment stage before acting."
        ]
      }
    ],
    sources: [
      { label: "World Food Programme — Fraudulent Job Offers", url: "https://www.wfp.org/careers/fraudulent-job-offers", lastChecked: "2026-10-05" },
      { label: "British Council Nigeria — Fake Job Alert", url: "https://www.britishcouncil.org.ng/fake-job-alert", lastChecked: "2026-10-05" }
    ],
    relatedLinks: [
      { href: "/jobs", label: "Verified jobs directory" },
      { href: "/jobs/open-now", label: "Jobs open now" },
      { href: "/jobs/guides/graduate-job-application-checklist", label: "Application checklist" }
    ]
  }

];

export function getCareerGuide(slug: string) {
  return careerGuides.find((guide) => guide.slug === slug);
}
