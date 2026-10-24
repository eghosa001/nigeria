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
    status: "closed",
    statusLabel: "2026 Hackathon application window closed 13 October",
    summary: "The Zenith Bank Zecathon 6.0 Hackathon's free application window closed on 13 October 2026. The organiser invited African innovators aged 20–35 to apply in teams of two to four, scheduled the Lagos sprint for 20–22 October and listed the final pitch for 28 October. This is an archived contest guide, not an open job or registration offer.",
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
      "For those shortlisted before the deadline, the organiser's original terms placed Lagos travel and accommodation with participants and offered meals, workspace and internet. These historical logistics do not establish a new attendance window.",
      "This listing is specifically for the Hackathon. The Startup Pitch Competition is for registered, growth-stage businesses with traction, and the Future Innovators Challenge targets secondary-school teams; their eligibility differs."
    ],
    documents: [
      "Team member names, relevant skills and roles (two to four participants).",
      "Project title, problem statement and a clear solution concept aligned to the chosen track.",
      "Presentation or pitch deck showing the intended users, AI/emerging-technology approach, feasibility and impact.",
      "Any additional attachments or registration answers required on the official organiser application form."
    ],
    applicationSteps: [
      "Read Beyond Limits' official Zenith Bank Hackathon rules as a record of the concluded 2026 application window.",
      "The 2026 hackathon required teams of two to four eligible members; future editions may set different requirements.",
      "Review the 2026 selection criteria to understand the original proposal, technology, impact and team-role requirements.",
      "Do not submit documents to an old Apply Now button or copied registration form: the official application period ended 13 October 2026.",
      "The organiser scheduled selection notices for 16 October and the Lagos sprint for 20–22 October. The published schedule alone does not verify which teams attended.",
      "The published semifinal date of 23 October has passed; the organiser lists a final pitch for 28 October 2026. Check current organiser announcements for finalists, access or event changes rather than assuming results."
    ],
    officialUrl: "https://beyondlimits.global/zecathonhackathon/",
    officialUrlLabel: "Read official Zecathon Hackathon 2026 archive and schedule",
    verifiedAt: "2026-10-24",
    deadline: "2026-10-13",
    nextMilestone: "The 13 October application deadline and 20–23 October sprint/semifinal schedule are past; the organiser lists a 28 October 2026 final pitch, subject to any fresh programme notice.",
    feeNote: "The organiser explicitly says participation is free. No application, interview or recruitment fees should be paid. This is a contest and does not offer guaranteed employment.",
    sourceNotes: [
      "The official Zecathon 6.0 landing page lists Hackathon, Startup Pitch and Future Innovators as separate programmes with different eligibility.",
      "The organiser's Hackathon page has conflicting prize figures in different blocks (₦70m and ₦90m). Do not treat either as a confirmed hackathon-specific amount; consult the organiser's latest written rules before relying on prize numbers.",
      "The concluded 2026 application deadline, team size, ages, Lagos location and participant costs are drawn from the official organiser page checked 24 October; its still-visible Apply links do not reopen applications.",
      "No JobPosting structured data applies because participants are competing, not applying for employment."
    ],
    sources: [
      { label: "Beyond Limits / Zenith Bank — Zecathon 6.0 official programme overview", url: "https://beyondlimits.global/zecathon6/landing/", lastChecked: "2026-10-24" },
      { label: "Beyond Limits / Zenith Bank — Hackathon rules, timeline and FAQs", url: "https://beyondlimits.global/zecathonhackathon/", lastChecked: "2026-10-24" },
      { label: "Beyond Limits / Zenith Bank — Startup Pitch eligibility (different track)", url: "https://beyondlimits.global/zecathonbusinesspitch/", lastChecked: "2026-10-24" }
    ]
  }
];
