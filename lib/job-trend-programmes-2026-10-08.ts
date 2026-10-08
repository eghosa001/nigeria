import type { CareerOpportunity } from "@/lib/jobs";

// This is a skills/innovation programme, NOT a salaried vacancy.
// Deliberately no JobPosting schema: contestants are not being hired.
export const verifiedTrendProgrammes: CareerOpportunity[] = [
  {
    slug: "zenith-bank-zecathon-6-hackathon-2026",
    title: "Zenith Bank Zecathon 6.0 Hackathon 2026 — Eligibility & Application",
    organization: "Zenith Bank / Beyond Limits",
    kind: "programme",
    sector: "Private",
    status: "open",
    statusLabel: "Applications open until 13 October 2026",
    summary: "Apply for the 2026 Zenith Bank Zecathon 6.0 fintech hackathon as a team of 2–4 African innovators aged 20–35. Free applications close 13 October; selected teams attend a Lagos innovation sprint 20–22 October.",
    location: "Lagos, Nigeria (in-person for selected teams; online application)",
    employmentType: "Hackathon and innovation competition — not a paid job or recruitment",
    audiences: ["African developers", "Students aged 20–35", "Fintech innovators", "Designers", "Startup builders"],
    fields: ["Software Development", "Artificial Intelligence", "Fintech", "Digital Banking", "Product Design"],
    qualifications: [
      "All team members must be aged 20–35 and citizens of an African country, as specified by the hackathon organiser.",
      "A team of two to four people is required; solo submissions are not accepted.",
      "Applicants can be students, developers, designers, professionals or startup builders; the application is judged as an innovation proposal, not a vacancy CV screening."
    ],
    requirements: [
      "Choose an official challenge track and propose an original technology-led solution; published themes include POS analytics, alternative credit scoring, digital fraud, SME finance, banking inclusion and trust.",
      "Explain the practical problem, proposed product, target users, technological approach, feasibility, impact and scalability.",
      "Ensure the team owns the submitted intellectual property and that no participant has a disqualifying conflict of interest with programme organisers or judges.",
      "Plan your own Lagos accommodation and travel if shortlisted. The organiser says meals, refreshments, workspace and internet are provided for the hackathon, but not lodging.",
      "This listing is specifically for the Hackathon. The Startup Pitch Competition is for registered, growth-stage businesses with traction, and the Future Innovators Challenge targets secondary-school teams; their eligibility differs."
    ],
    documents: [
      "Team member names, relevant skills and roles (two to four participants).",
      "Project title, problem statement and a clear solution concept aligned to the chosen track.",
      "Presentation or pitch deck showing the intended users, AI/emerging-technology approach, feasibility and impact.",
      "Any additional attachments or registration answers required on the official organiser application form."
    ],
    applicationSteps: [
      "Open the official Zenith Bank Hackathon programme page from Beyond Limits and read its complete eligibility and track-specific rules.",
      "Form a team of two to four eligible members, select one track and agree on a specific problem the team can address.",
      "Prepare a short original proposal covering the problem, proposed AI/technology solution, impact, target users, implementation and each member's role.",
      "Follow the official Apply Now link from the organiser page. Check the form's fields, upload the requested pitch deck and submit by 13 October 2026.",
      "Watch the organiser's official announcements for selection results on 16 October. Selected teams should confirm travel and attendance arrangements for 20–22 October in Lagos.",
      "If shortlisted, check the published schedule for the 23 October semifinal demonstration and 28 October final pitch."
    ],
    officialUrl: "https://beyondlimits.global/zecathonhackathon/",
    officialUrlLabel: "Read rules and apply through the official Zecathon Hackathon page",
    verifiedAt: "2026-10-08",
    deadline: "2026-10-13",
    nextMilestone: "Selection notices: 16 October; Lagos hackathon: 20–22 October; semifinals: 23 October; final: 28 October 2026.",
    feeNote: "The organiser explicitly says participation is free. No application, interview or recruitment fees should be paid. This is a contest and does not offer guaranteed employment.",
    sourceNotes: [
      "The official Zecathon 6.0 landing page lists Hackathon, Startup Pitch and Future Innovators as separate programmes with different eligibility.",
      "The organiser's Hackathon page has conflicting prize figures in different blocks (₦70m and ₦90m). Do not treat either as a confirmed hackathon-specific amount; consult the organiser's latest written rules before relying on prize numbers.",
      "The application deadline, team size, age range, in-person location, participant expenses and submission stages are taken from the current organiser programme page.",
      "No JobPosting structured data applies because participants are competing, not applying for employment."
    ],
    sources: [
      { label: "Beyond Limits / Zenith Bank — Zecathon 6.0 official programme overview", url: "https://beyondlimits.global/zecathon6/landing/", lastChecked: "2026-10-08" },
      { label: "Beyond Limits / Zenith Bank — Hackathon rules, timeline and FAQs", url: "https://beyondlimits.global/zecathonhackathon/", lastChecked: "2026-10-08" },
      { label: "Beyond Limits / Zenith Bank — Startup Pitch eligibility (different track)", url: "https://beyondlimits.global/zecathonbusinesspitch/", lastChecked: "2026-10-08" }
    ]
  }
];
