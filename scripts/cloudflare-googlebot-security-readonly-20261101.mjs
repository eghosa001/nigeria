/**
 * Cloudflare historical verified Googlebot / firewall response diagnostic.
 * Read only, owner-controlled PR branch. Intentionally never logs IPs,
 * tokens, full payloads or request headers. A Googlebot UA is spoofable:
 * counts without Cloudflare bot verification are not evidence of genuine Googlebot.
 */
const token=process.env.CLOUDFLARE_API_TOKEN;
const zone=process.env.CLOUDFLARE_ZONE_ID;
if(!token || !/^[a-f0-9]{32}$/i.test(zone||"")){
  console.log("Historical Googlebot security diagnostic unavailable: zone/token missing.");
  process.exit(0);
}
const endpoint="https://api.cloudflare.com/client/v4/graphql";
const dates=["2026-10-19","2026-10-20","2026-10-21","2026-10-22","2026-10-23","2026-10-28"];
async function graphql(query, date){
  const start=date+"T00:00:00Z";
  const end=new Date(Date.parse(start)+86400000).toISOString();
  try{
    const res=await fetch(endpoint,{
      method:"POST",
      headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"},
      body:JSON.stringify({query,variables:{zone,start,end}}),
      signal:AbortSignal.timeout(15000),
    });
    const data=await res.json().catch(()=>({}));
    if(!res.ok || data.errors?.length){
      const brief=(data.errors||[]).map(e=>String(e.message||"unknown").slice(0,150)).slice(0,2);
      return {error:"HTTP "+res.status+" "+JSON.stringify(brief)};
    }
    return {data:data.data?.viewer?.zones?.[0]||{}};
  }catch(error){return {error:"request "+(error?.name||"error")};}
}
const httpVerified=`query($zone:string!,$start:Time!,$end:Time!){
 viewer{zones(filter:{zoneTag:$zone}){
  httpRequestsAdaptiveGroups(
   filter:{datetime_geq:$start,datetime_lt:$end,requestSource:"eyeball",userAgent_like:"%Googlebot%"}
   limit:100,orderBy:[count_DESC]){
   count dimensions{edgeResponseStatus clientAsn botManagementVerifiedBot}
  }
 }}
}`;
const httpAsn=`query($zone:string!,$start:Time!,$end:Time!){
 viewer{zones(filter:{zoneTag:$zone}){
  httpRequestsAdaptiveGroups(
   filter:{datetime_geq:$start,datetime_lt:$end,requestSource:"eyeball",userAgent_like:"%Googlebot%"}
   limit:100,orderBy:[count_DESC]){
   count dimensions{edgeResponseStatus clientAsn securityAction}
  }
 }}
}`;
const httpMinimal=`query($zone:string!,$start:Time!,$end:Time!){
 viewer{zones(filter:{zoneTag:$zone}){
  httpRequestsAdaptiveGroups(
   filter:{datetime_geq:$start,datetime_lt:$end,requestSource:"eyeball",userAgent_like:"%Googlebot%"}
   limit:100,orderBy:[count_DESC]){
   count dimensions{edgeResponseStatus clientAsn}
  }
 }}
}`;
const waf=`query($zone:string!,$start:Time!,$end:Time!){
 viewer{zones(filter:{zoneTag:$zone}){
  firewallEventsAdaptive(
   filter:{datetime_geq:$start,datetime_lt:$end,userAgent_like:"%Googlebot%"}
   limit:500,orderBy:[datetime_DESC]){
    action source clientAsn clientRequestPath userAgent
   }
 }}
}`;
function reportHttp(date,mode,rows){
  const aggregate=new Map();
  for(const row of rows){
    const d=row.dimensions||{};
    const key=[d.edgeResponseStatus??"unknown",d.clientAsn??"unknown",
      Object.hasOwn(d,"botManagementVerifiedBot")?String(d.botManagementVerifiedBot):"not-available",
      d.securityAction??"unknown"].join(" | ");
    aggregate.set(key,(aggregate.get(key)||0)+Number(row.count||0));
  }
  console.log("Historical UA-matching requests "+date+" ["+mode+"] "+
    JSON.stringify([...aggregate.entries()].map(([key,count])=>({attributes:key,count}))));
}
for(const date of dates){
  // Try account-native verification; free plans may reject this dimension.
  let mode="verified";let a=await graphql(httpVerified,date);
  if(a.error){mode="security-action";a=await graphql(httpAsn,date);}
  if(a.error){mode="status+ASN only";a=await graphql(httpMinimal,date);}
  if(a.error)console.log("Historical UA-matching requests "+date+" unavailable "+a.error);
  else reportHttp(date,mode,a.data.httpRequestsAdaptiveGroups||[]);

  const w=await graphql(waf,date);
  if(w.error){
    console.log("Historical Googlebot-UA WAF events "+date+" unavailable "+w.error);
  }else{
    const rows=w.data.firewallEventsAdaptive||[];
    const aggregate=new Map();
    for(const event of rows){
      const key=[event.action||"unknown",event.source||"unknown",
        event.clientAsn||"unknown"].join(" | ");
      aggregate.set(key,(aggregate.get(key)||0)+1);
    }
    console.log("Historical Googlebot-UA WAF events "+date+
      " (up to latest 500 events; UA UNVERIFIED; action|source|ASN): "+
      JSON.stringify([...aggregate.entries()].map(([key,count])=>({key,count}))));
  }
}
console.log("No Cloudflare settings, rules, security policies, cache or data were changed.");
