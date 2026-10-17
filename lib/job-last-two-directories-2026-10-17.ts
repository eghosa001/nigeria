import type { CareerOpportunity } from "@/lib/jobs";

type DirectoryFindingReview = {
  route: string; source: string; summary: string; actions: [string,string,string,string,string];
  caution: string; link2: string;
};

/** Two original, issuer-cited company-level career corrections.
 * Third-party branded job boards are explicitly NOT treated as automatically
 * authorised or live. No individual job or deadline is invented.
 */
export const twoRemainingDirectoryReviews20261017: Record<string, DirectoryFindingReview> = {
  "promasidor-nigeria-careers": {
    "route": "https://promasidor.com/en/careers/",
    "source": "https://promasidor.com/en/",
    "summary": "Promasidor's official group Careers page publishes an employer-run Current Opportunities search with keyword, location and contract-type filters. Its earlier Nigeria contact URL was not a reliable recruitment landing page. Nigerian applicants must select an actual Nigeria-location listing before assuming any FMCG role or future graduate intake is open.",
    "actions": [
      "Open the issuer's official Promasidor Careers page, not the old local contact shortcut that no longer reliably shows job openings.",
      "Use the Current Opportunities search to filter Nigeria, the required city, and a relevant Full Time or Internship contract rather than copying a vacancy from another African market.",
      "Select a named Promasidor position, check the true duty station, degree or technical requirements, and use only the application control attached to that role.",
      "Where the site says JavaScript is required for listings, enable the normal browser script or consult Promasidor's verified company LinkedIn page; do not assume an empty static preview means there are no vacancies.",
      "Submit through the source-linked issuer job form if it is actually accepting candidates, retaining the role ID and receipt; never send documents to agents claiming to place applicants for a fee."
    ],
    "caution": "Promasidor's original global careers hub supplies candidate search filters; its corporate homepage directs users to the job portal and LinkedIn. These are employer-wide resources, not a verified current Nigeria posting or a universal application deadline.",
    "link2": "https://promasidor.com/en/careers/"
  },
  "palmpay-careers": {
    "route": "https://www.palmpay.com/",
    "source": "https://www.palmpay.com/",
    "summary": "PalmPay's official corporate website identifies PalmPay Limited as its Nigerian financial-services operator and includes a Careers link in its company navigation. Separately indexed PalmPay-branded recruitment boards contain many role titles, but their authority and current application flow must be confirmed from the company's own navigation before a candidate submits personal documents.",
    "actions": [
      "Open the actual PalmPay corporate site and choose the Careers link from its Company section, rather than accepting a paid recruitment invitation on messaging apps.",
      "Before following a PalmPay-branded application portal on another domain, confirm that PalmPay's company-owned Careers destination links to that recruitment provider.",
      "If a legitimate current PalmPay position appears, check whether the duty station is Lagos, another Nigerian state or an international office; similarly named sales and field-verification roles can have distinct territories.",
      "Read the selected position's minimum education, experience and employment arrangements carefully. Recruitment for PalmPay POS agent businesses is a different commercial journey from becoming a PalmPay employee.",
      "Use only an employer-authorised role application route and keep its confirmation; never pay anyone to arrange a PalmPay job interview or disclose identity documents to an unverified ATS."
    ],
    "caution": "PalmPay's official corporate site visibly offers a Careers entry, but an external PalmPay Limited–branded job board must not be called authenticated until the company-owned link is verified. This employer-wide guide does not confirm a particular vacancy deadline, pay or accepted application.",
    "link2": "https://palmpaylimited.jazz.co/"
  }
};

export function applyTwoRemainingDirectoryReviews20261017(item: CareerOpportunity): CareerOpportunity {
  const q=twoRemainingDirectoryReviews20261017[item.slug];
  if(!q || item.kind!=="career-page" || item.status!=="career-page") return item;
  const sourceList=[...item.sources];
  for (const url of [q.source,q.route]) {
    const i=sourceList.findIndex(x=>x.url===url);
    if(i>=0) sourceList[i]={...sourceList[i],lastChecked:"2026-10-17"};
    else sourceList.push({label:item.organization+" official corporate careers information",url,lastChecked:"2026-10-17"});
  }
  return {
    ...item,
    summary:q.summary,
    statusLabel:"Verified issuer careers entry — exact hiring status must be checked",
    officialUrl:q.route,
    officialUrlLabel:"Open the employer's own careers / company navigation",
    applicationSteps:q.actions,
    sourceNotes:[
      q.caution,
      "Original source checked 17 October 2026: "+q.source+" . A careers heading is not proof that any particular job still accepts applications.",
      "The original employer's link and candidate instructions are verified, not the success of any user application."
    ],
    nextMilestone:q.caution,
    deadline:undefined,
    posting:undefined,
    verifiedAt:"2026-10-17",
    sources:sourceList
  };
}

export function hasCompletedTwoRemainingDirectoryReviews20261017(item:CareerOpportunity, today:string):boolean {
  const q=twoRemainingDirectoryReviews20261017[item.slug];
  if(!q||item.kind!=="career-page"||item.status!=="career-page"||item.deadline||item.posting||
     item.officialUrl!==q.route||item.summary!==q.summary||item.nextMilestone!==q.caution)return false;
  const age=(Date.parse(today+"T00:00:00Z")-Date.parse(item.verifiedAt+"T00:00:00Z"))/86400000;
  if(!Number.isFinite(age)||age<0||age>14||item.applicationSteps.length!==5||
    !q.actions.every(action=>item.applicationSteps.includes(action))||
    !item.sourceNotes.includes(q.caution)||item.sourceNotes.length<3 ||
    item.qualifications.length<2||item.requirements.length<4)return false;
  return item.sources.some(s=>s.url===q.source&&s.lastChecked===item.verifiedAt);
}
