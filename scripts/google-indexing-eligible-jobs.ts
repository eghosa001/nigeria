import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { jobOpportunities,isIndexableJobOpportunity } from "../lib/jobs";
import { buildJobPostingJsonLd,isEffectivelyOpen } from "../lib/job-runtime";
import { productionSiteUrl } from "../lib/site";

const output=process.env.GOOGLE_JOB_MANIFEST||".discovery/google-eligible-jobs.json";
const entries=jobOpportunities.filter(job=>
  isIndexableJobOpportunity(job)&&isEffectivelyOpen(job)&&job.kind==="vacancy"&&
  Boolean(job.posting&&job.jobPostingAuthorization&&
    job.jobPostingAuthorization.publicEvidenceUrl.startsWith("https://")&&
    job.jobPostingAuthorization.verifiedAt&&job.posting.datePosted)
).map(job=>{
  const url=productionSiteUrl+"/jobs/"+job.slug;
  const schema=buildJobPostingJsonLd(job,url);
  if(!schema)return null;
  const fingerprint=createHash("sha256").update(JSON.stringify({
    schema,verifiedAt:job.verifiedAt,evidence:job.jobPostingAuthorization,sources:job.sources
  })).digest("hex");
  return {url,fingerprint};
}).filter((x):x is {url:string;fingerprint:string}=>Boolean(x))
  .sort((a,b)=>a.url.localeCompare(b.url));
await mkdir(".discovery",{recursive:true});
await writeFile(output,JSON.stringify(entries)+"\n");
console.log("Verified eligible active JobPosting URLs: "+entries.length);
