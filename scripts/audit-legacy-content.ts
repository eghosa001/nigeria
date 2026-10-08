/**
 * Full catalog screening of EXISTING records. Does not change pages, indexation,
 * advertisement state or editorial status. Every record gets a separate row.
 *
 * `tsx scripts/audit-legacy-content.ts --json` prints the full per-record
 * inventory for artifact storage. Other mode prints an actionable summary.
 *
 * Signals are risk flags, NOT plagiarism verdicts, human review or Ezoic approval.
 */
import { publicServices } from "../lib/data";
import { exploreGuides } from "../lib/explore";
import { explorePlaces } from "../lib/explore-places";
import { entertainmentTitles } from "../lib/entertainment";
import { entertainmentPeople } from "../lib/entertainment-extras";
import { seriesTitles } from "../lib/series";
import { jobOpportunities, isIndexableJobOpportunity } from "../lib/jobs";
import { careerGuides } from "../lib/career-guides";
import { youtubeMovieLibrary, indexableYouTubeMovies } from "../lib/youtube-library";
import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

type Pillar = "Services" | "Tour" | "Entertainment" | "Jobs";
type Group = "service-guide" | "tour-guide" | "tour-place" | "movie" | "series" | "person"
 | "job-listing" | "career-article" | "youtube-video";
type Issue = "no-cited-source" | "short-editorial-body" | "very-short-editorial-body"
 | "short-profile-body" | "indexable-video-minimal-context" | "unclear-video-indexability"
 | "duplicate-heading" | "duplicate-body" | "reused-paragraph" | "generic-fallback"
 | "missing-original-author-evidence" | "dated-source" | "unverified-media-rights";
type Row = {
  pillar: Pillar; group: Group; id: string; title: string; url: string | null;
  indexable: boolean; authoredWords: number; sourceCount: number;
  dateChecked: string | null; signal: "high-priority-review" | "needs-review" | "screened-without-critical-signal";
  issues: Issue[];
};
const today = new Date().toISOString().slice(0, 10);
const wordCount = (v: string) => (v.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) ?? []).length;
const canon = (s: string) => s.toLowerCase().replace(/\s+/g," ").replace(/[^a-z0-9 ]/g,"").trim();
const join = (...p: (string | undefined | null | string[])[]) =>
  p.flatMap(v => Array.isArray(v) ? v : [v]).filter((v): v is string => typeof v === "string").join(" ");
const hasIso = (v: string | null) => Boolean(v && /^\d{4}-\d{2}-\d{2}$/.test(v));
const daysOld = (d: string | null) => !hasIso(d) ? 99999 :
  Math.floor((Date.parse(today + "T00:00:00Z") - Date.parse(d! + "T00:00:00Z")) / 86400000);
const rows: Row[] = [];
const records: Array<{ row: Row; body: string }> = [];
const editorialGroups: Group[] = ["service-guide","tour-guide","career-article"];
const profileGroups: Group[] = ["movie","series","person","youtube-video"];
function add(arg: Omit<Row, "authoredWords" | "issues" | "signal"> & { body: string; hasProvenRights?: boolean }) {
  const authoredWords = wordCount(arg.body);
  const issues: Issue[] = [];
  if (arg.sourceCount === 0) issues.push("no-cited-source");
  if (arg.indexable && editorialGroups.includes(arg.group) && authoredWords < 500) {
    issues.push("short-editorial-body");
    if (authoredWords < 180) issues.push("very-short-editorial-body");
  }
  if (arg.indexable && profileGroups.includes(arg.group) && authoredWords < 100)
    issues.push("short-profile-body");
  if (arg.indexable && arg.group === "youtube-video" && authoredWords < 100)
    issues.push("indexable-video-minimal-context");
  if (arg.group === "youtube-video" && / is a full-length Nigerian film published by /i.test(arg.body))
    issues.push("generic-fallback");
  if (arg.indexable && arg.group === "movie" && !arg.hasProvenRights)
    issues.push("unverified-media-rights");
  if (arg.indexable && daysOld(arg.dateChecked) > (arg.group === "job-listing" ? 14 : 60))
    issues.push("dated-source");
  const { body: _, hasProvenRights: __, ...fields } = arg;
  const row: Row = { ...fields, authoredWords, issues, signal: "screened-without-critical-signal" };
  rows.push(row); records.push({ row, body: arg.body });
}
for(const s of publicServices){
  add({pillar:"Services",group:"service-guide",id:s.slug,title:s.title,url:"/services/"+s.slug,indexable:true,
    body:join(s.summary,s.requirements,s.steps,s.notes,s.feeNote,s.timeline),sourceCount:s.sources.length,dateChecked:s.lastVerified});
}
for(const g of exploreGuides){
  add({pillar:"Tour",group:"tour-guide",id:g.slug,title:g.title,url:"/explore/"+g.slug,indexable:true,
    body:join(g.summary,g.intro,g.highlights.map(x=>x.detail),g.planning.map(x=>x.detail)),
    sourceCount:g.source?1:0,dateChecked:g.lastReviewed});
}
// Place records supplement Tour landing/guide pages; these do not automatically
// represent separately indexable articles.
for(const p of explorePlaces){
  add({pillar:"Tour",group:"tour-place",id:p.slug,title:p.name,url:null,indexable:false,
    body:join(p.summary,p.address,p.cost,p.costNote,p.hours),sourceCount:p.source?1:0,dateChecked:p.checkedAt});
}
for(const m of entertainmentTitles){
  add({pillar:"Entertainment",group:"movie",id:m.slug,title:m.title,
    url:"/entertainment/movies/"+m.slug,indexable:true,
    body:join(m.synopsis,m.watchLinks.map(x=>x.note),m.references?.map(x=>x.note)),
    sourceCount:m.watchLinks.length+(m.references?.length??0)+(m.trailer?1:0)+(m.sourcePreview?1:0),
    dateChecked:m.references?.map(x=>x.lastChecked).sort().at(-1) ??
      m.watchLinks.map(x=>x.lastChecked).sort().at(-1) ?? m.trailer?.lastChecked ?? null,
    hasProvenRights: Boolean(m.artwork && m.artwork.status === "approved")});
}
for(const s of seriesTitles){
  add({pillar:"Entertainment",group:"series",id:s.slug,title:s.title,url:"/entertainment/series/"+s.slug,indexable:true,
    body:join(s.synopsis,s.episodeInfo,s.premiereLabel,s.watchLinks.map(x=>x.note)),
    sourceCount:s.sources.length,dateChecked:s.sources.map(x=>x.lastChecked).sort().at(-1) ?? null});
}
for(const p of entertainmentPeople){
  add({pillar:"Entertainment",group:"person",id:p.slug,title:p.name,url:"/entertainment/people/"+p.slug,indexable:true,
    body:join(p.summary),sourceCount:0,dateChecked:null});
}
for(const j of jobOpportunities){
  add({pillar:"Jobs",group:"job-listing",id:j.slug,title:j.title,url:isIndexableJobOpportunity(j)?"/jobs/"+j.slug:null,
    indexable:isIndexableJobOpportunity(j),
    body:join(j.summary,j.qualifications,j.requirements,j.documents,j.applicationSteps,j.feeNote,j.nextMilestone,j.sourceNotes),
    sourceCount:j.sources.length,dateChecked:j.verifiedAt});
}
for(const g of careerGuides){
  add({pillar:"Jobs",group:"career-article",id:g.slug,title:g.title,url:"/jobs/guides/"+g.slug,indexable:true,
    body:join(g.summary,g.answer,g.facts.map(x=>x.value),g.sections.flatMap(x=>[...x.paragraphs,...(x.bullets??[])])),
    sourceCount:g.sources.length,dateChecked:g.reviewedAt});
}
const indexed = new Set(indexableYouTubeMovies.map(x=>x.videoId));
for(const y of youtubeMovieLibrary){
  if(y.source === "curated") continue; // canonical link to the curated movie page
  add({pillar:"Entertainment",group:"youtube-video",id:y.videoId,title:y.title,
    url:indexed.has(y.videoId)?"/entertainment/youtube/"+y.videoId:null,
    indexable:indexed.has(y.videoId),body:join(y.synopsis),sourceCount:y.videoUrl?1:0,dateChecked:y.lastChecked});
}
// A title collision is only a review lead. Some legitimate names repeat.
// Body collisions and >110 character paragraph reuse are stronger signals.
const titles = new Map<string, Row[]>();
const bodies = new Map<string, Row[]>();
const paragraphs = new Map<string, Set<string>>();
for(const {row,body} of records) {
  const titleKey = row.group+":"+canon(row.title);
  titles.set(titleKey,[...(titles.get(titleKey)??[]),row]);
  if(wordCount(body)>=40) {
    const bodyKey=row.group+":"+canon(body);
    bodies.set(bodyKey,[...(bodies.get(bodyKey)??[]),row]);
  }
  for(const p of body.split(/\n|(?<=[.!?])\s+(?=[A-Z])/).map(p=>p.trim()).filter(p=>p.length>=155)){
    const key=canon(p);
    if(key.length < 100) continue;
    const set=paragraphs.get(key)??new Set<string>();
    set.add(row.group+":"+row.id);
    paragraphs.set(key,set);
  }
}
const duplicateTitles = [...titles.values()].filter(xs=>xs.length>1);
const duplicateBodies = [...bodies.values()].filter(xs=>xs.length>1);
const repeatedParagraphs = [...paragraphs.values()].filter(x=>x.size>=3);
for(const xs of duplicateTitles)for(const x of xs) if(!x.issues.includes("duplicate-heading"))x.issues.push("duplicate-heading");
for(const xs of duplicateBodies)for(const x of xs) if(!x.issues.includes("duplicate-body"))x.issues.push("duplicate-body");
const reusedRowKeys=new Set(repeatedParagraphs.flatMap(set=>[...set]));
for(const row of rows)if(reusedRowKeys.has(row.group+":"+row.id))row.issues.push("reused-paragraph");
for(const row of rows){
  const critical = row.issues.some(x=>["no-cited-source","very-short-editorial-body","indexable-video-minimal-context","duplicate-body"].includes(x));
  row.signal=critical ? "high-priority-review" : row.issues.length ? "needs-review" : "screened-without-critical-signal";
}
const groups=[...new Set(rows.map(x=>x.group))].map(group=>{
  const a=rows.filter(x=>x.group===group);
  const indexable=a.filter(x=>x.indexable);
  const sorted=indexable.map(x=>x.authoredWords).sort((a,b)=>a-b);
  return {group,records:a.length,indexable:indexable.length,nonindexable:a.length-indexable.length,
    medianSourceWords:sorted.length?sorted[Math.floor(sorted.length/2)]:null,
    under150:indexable.filter(x=>x.authoredWords<150).length,
    under500:indexable.filter(x=>x.authoredWords<500).length,
    sourceMissing:indexable.filter(x=>x.sourceCount===0).length,
    highPriority:indexable.filter(x=>x.signal==="high-priority-review").length,
    review:indexable.filter(x=>x.signal==="needs-review").length,
    screened:indexable.filter(x=>x.signal==="screened-without-critical-signal").length};
});
const issueCounts=Object.fromEntries([...new Set(rows.flatMap(x=>x.issues))].sort()
 .map(key=>[key,rows.filter(x=>x.indexable&&x.issues.includes(key)).length]));
let routes:string[]=[];
try {routes=execFileSync("git",["ls-files","app/**/page.tsx"],{encoding:"utf8"})
 .split("\n").filter(Boolean);}catch{/*report limit*/}
const trust=["app/about/page.tsx","app/contact/page.tsx","app/privacy/page.tsx","app/editorial-policy/page.tsx",
 "app/corrections/page.tsx","app/terms/page.tsx"];
const coverage={
 allCatalogRecords:rows.length,
 indexableCatalogRecords:rows.filter(x=>x.indexable).length,
 nonindexableSupportingRecords:rows.filter(x=>!x.indexable).length,
 appPageRouteFiles:routes.length,
 staticAndHubsNotIndividuallyInspected:routes.filter(p=>!p.includes("[")).length,
 trustPagesPresent:trust.filter(existsSync),
 trustPagesMissing:trust.filter(p=>!existsSync(p)),
 sampledLiveRenderedPages:0
};
const reviewQueue=rows.filter(x=>x.indexable&&x.signal==="high-priority-review")
 .sort((a,b)=>a.authoredWords-b.authoredWords).slice(0,50)
 .map(({pillar,group,url,authoredWords,issues})=>({pillar,group,url,authoredWords,issues}));
const audit={
 date:today,ref:"MyNigeriaGuide connected main/PR source",methodology:"All imported/published catalog records screened individually; words are authored source fields, NOT rendered length, human validation, plagiarism verification or Ezoic certification",
 coverage,groups,issueCounts,
 duplicateTitleGroups:duplicateTitles.length,
 duplicateBodyGroups:duplicateBodies.length,
 reusedLongPhraseGroups:repeatedParagraphs.length,
 indexableIssues:rows.filter(x=>x.indexable&&x.issues.length>0).length,
 indexableWithoutAutomatedFlags:rows.filter(x=>x.indexable&&!x.issues.length).length,
 riskQueueFirst50:reviewQueue,
 limitations:["No automatic legal-rights adjudication or plagiarism verdict.",
 "References and YouTube/watch links are existence-only, not remotely reverified as current.",
 "Rendered pages, static informational routes, actual schema, mobile ads and search indexation not verified.",
 "Word-depth bands are non-binding on directory listings and concise fact/reference profiles.",
 "Human-editor attribution and publisher eligibility not verified."],
 rows
};
if(process.argv.includes("--json"))console.log(JSON.stringify(audit,null,2));
else{
 console.log("Legacy content audit",today,JSON.stringify(coverage));
 for(const g of groups) console.log(JSON.stringify(g));
 console.log("Issues",JSON.stringify(issueCounts),"duplicate titles",duplicateTitles.length,"duplicate bodies",duplicateBodies.length);
 console.log("High priority examples:",JSON.stringify(reviewQueue.slice(0,12)));
 console.log("All records screened; NO automatic conclusion that Ezoic requirements are met.");
}
