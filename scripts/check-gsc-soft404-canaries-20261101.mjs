/**
 * Read-only live parity probe for URLs Google classified Soft 404 on its
 * historic 17–19 Oct 2026 MOBILE crawls. A spoofed UA is NOT verified Googlebot
 * and cannot replace Search Console's Test Live URL rendered screenshot.
 */
import { createHash } from "node:crypto";
import {
  validateIndexableHtml, getArticleText
} from "./check-googlebot-crawl-parity.mjs";

const pages = [
  { slug:"/services/waec-collect-certificate", words:["WAEC","certificate"] },
  { slug:"/services/nysc-correct-date-of-birth", words:["NYSC","date of birth"] },
  { slug:"/services/jamb-profile-code", words:["JAMB","profile code"] },
];
const agents = {
  browser:"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36",
  googlebotMobile:"Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.69 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  googlebotDesktop:"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
};
async function get(url,agent) {
 const res=await fetch(url,{headers:{"user-agent":agent,accept:"text/html,application/xhtml+xml"},
  redirect:"follow",signal:AbortSignal.timeout(20000)});
 const html=await res.text();
 return {status:res.status,headers:res.headers,html,finalUrl:res.url};
}
function mainTextInitial(html) {
 const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||"";
 return main.replace(/<(script|style|template|svg)\b[^>]*>[\s\S]*?<\/\1>/gi," ")
  .replace(/<[^>]*>/g," ").replace(/&(?:amp|nbsp|quot|gt|lt);/gi," ").replace(/\s+/g," ").trim();
}
let errors=0;
for(const page of pages){
 const url="https://mynigeriaguide.com"+page.slug;
 const summaries=[];
 for(const [kind,agent] of Object.entries(agents)){
  try{
   const r=await get(url,agent);
   if(r.finalUrl!==url)throw new Error("unexpected redirect "+r.finalUrl);
   const metadata=validateIndexableHtml({...r,canonical:url,requireHeadMetadata:true});
   const article=getArticleText(r.html);
   if(article.length<500)throw new Error("too little article text ("+article.length+")");
   for(const word of page.words)if(!article.toLowerCase().includes(word.toLowerCase())){
    throw new Error("expected topic text missing: "+word);
   }
   const mainText=mainTextInitial(r.html);
   const fallback=/(Opening your guide|mng-page-loading|<template[^>]+id=["']B:)/i.test(r.html);
   const hiddenBoundary=/<div[^>]+hidden[^>]+id=["']S:\d+/i.test(r.html);
   const item={page:page.slug,agent:kind,http:r.status,headTitle:metadata.title,
    bytes:Buffer.byteLength(r.html),bodyTextChars:article.length,
    articleSHA256:createHash("sha256").update(article).digest("hex").slice(0,12),
    initialMainChars:mainText.length,hasLoadingFallback:fallback,hasSuspenseResolution:hiddenBoundary,
    canonical:metadata.canonical,cache:r.headers.get("cf-cache-status"),
    age:r.headers.get("age"),robotTag:r.headers.get("x-robots-tag")};
   console.log("SOFT404_LIVE_PROBE "+JSON.stringify(item));
   summaries.push({kind,article,metadata});
  }catch(e){errors++;console.error("SOFT404_PROBE_FAILURE "+page.slug+" "+kind+" "+e.message);}
 }
 if(summaries.length===3){
  const normalized = summaries.map(x=>x.article.replace(/\bChecked \d+ days? ago\b/g,"Checked [relative]"));
  if(new Set(normalized).size!==1){
   console.log("SOFT404_POSSIBLE_VARIANT_CONTENT "+
    JSON.stringify({page:page.slug,lengths:normalized.map(x=>x.length),
      hashes:normalized.map(x=>createHash("sha256").update(x).digest("hex").slice(0,12))}));
   // Log possible cache variation without failing: relative timestamps,
   // other visitor-specific labels may legitimately differ.
  }else console.log("SOFT404_IDENTICAL_ARTICLE_ACROSS_USER_AGENTS "+page.slug);
 }
}
if(errors)process.exitCode=1;
else console.log("Soft404 live HTML, substantive text and crawler-like UA metadata checks passed; cannot reproduce Google's historical rendering or guarantee indexing.");
