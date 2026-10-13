import {readFile,writeFile,appendFile} from "node:fs/promises";
import {createSign} from "node:crypto";
import {planGoogleJobNotifications} from "./google-job-indexing-plan.mjs";
const secret=process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON;
const federatedToken=process.env.GOOGLE_INDEXING_ACCESS_TOKEN;
// Prefer short-lived GitHub OIDC credentials over downloadable service account keys.
const summary=async line=>{if(process.env.GITHUB_STEP_SUMMARY)
  await appendFile(process.env.GITHUB_STEP_SUMMARY,line+"\n")};
if(!secret&&!federatedToken){
 console.log("Google JobPosting Indexing API inactive: configure GitHub OIDC Workload Identity Federation or authorized service account credentials.");
 await summary("Google JobPosting Indexing API inactive: authorize OIDC Workload Identity Federation and Search Console Owner.");
}else{
 let sa=null;
 if(!federatedToken){
  sa=JSON.parse(secret);
  if(sa.type!=="service_account"||!sa.private_key?.includes("BEGIN PRIVATE KEY")||
     !sa.client_email?.endsWith(".iam.gserviceaccount.com")||
     sa.token_uri!=="https://oauth2.googleapis.com/token")throw Error("Invalid service account credentials");
 }
 const manifest=JSON.parse(await readFile(".discovery/google-eligible-jobs.json","utf8"));
 let old=null;
 try{old=JSON.parse(await readFile(".discovery/google-indexing-state.json","utf8"))}
 catch(e){if(e.code!=="ENOENT")throw e}
 const plan=planGoogleJobNotifications(manifest,old,100);
 console.log("Google Jobs: "+plan.notifications.length+" changed; "+plan.unchanged+" unchanged; "+
    plan.pending+" deferred; "+plan.removed+" no longer eligible (not deleted).");
 if(plan.notifications.length){
  let token=federatedToken;
  if(!token){
   const now=Math.floor(Date.now()/1000);
   const unsigned=Buffer.from(JSON.stringify({alg:"RS256",typ:"JWT"})).toString("base64url")+"."+
     Buffer.from(JSON.stringify({iss:sa.client_email,scope:"https://www.googleapis.com/auth/indexing",
     aud:"https://oauth2.googleapis.com/token",iat:now,exp:now+3300})).toString("base64url");
   const signer=createSign("RSA-SHA256");signer.update(unsigned);
   const jwt=unsigned+"."+signer.sign(sa.private_key,"base64url");
   const auth=await fetch(sa.token_uri,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},
     body:new URLSearchParams({grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",assertion:jwt}),
     signal:AbortSignal.timeout(20000)});
   if(!auth.ok)throw Error("Google OAuth failure: HTTP "+auth.status);
   token=(await auth.json()).access_token;
  }
  if(!token)throw Error("Missing OAuth access token");
  for(const notification of plan.notifications){
   const res=await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish",{
    method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},
    body:JSON.stringify(notification),signal:AbortSignal.timeout(18000)});
   if(!res.ok)throw Error("Google Indexing API HTTP "+res.status+
    " for "+notification.url+"; review account, owner status and quota");
  }
  console.log("Google accepted "+plan.notifications.length+" job update notifications (not indexing guarantees).");
 }
 await writeFile(".discovery/google-indexing-state.json",JSON.stringify(plan.checkpoint)+"\n");
 await summary("Google JobPosting notifications accepted: "+plan.notifications.length+
  "; unchanged: "+plan.unchanged+"; deferred: "+plan.pending+"; no-longer-eligible not falsely deleted: "+plan.removed);
}
