/**
 * Optional Cloudflare Crawler Hints enablement: verify zone identity before
 * touching exactly the crawler_hints setting. Fails closed for unsupported API.
 */
const token=process.env.CLOUDFLARE_API_TOKEN;
const zoneId=process.env.CLOUDFLARE_ZONE_ID;
if(!token||!zoneId){
  console.log("Crawler Hints still requires account action: select mynigeriaguide.com in Cloudflare > Caching > Configuration > Crawler Hints > Enable.");
}else{
  if(!/^[a-f0-9]{32}$/.test(zoneId))throw new Error("Invalid Cloudflare zone ID");
  const endpoint="https://api.cloudflare.com/client/v4/zones/"+zoneId;
  const headers={Authorization:"Bearer "+token,"Content-Type":"application/json"};
  async function api(url,options={}){
    const res=await fetch(url,{headers,...options,signal:AbortSignal.timeout(16000)});
    const body=await res.json().catch(()=>({}));
    if(!res.ok||!body.success)throw new Error("Cloudflare denied "+new URL(url).pathname+
      " (HTTP "+res.status+"). Use Caching > Configuration in the dashboard.");
    return body.result;
  }
  const zone=await api(endpoint);
  if(zone.name!=="mynigeriaguide.com")throw new Error("Cloudflare zone mismatch; no changes made");
  const settingUrl=endpoint+"/settings/crawler_hints";
  const setting=await api(settingUrl);
  if(setting.value==="on"){
    console.log("Crawler Hints is already enabled.");
  }else{
    if(setting.editable===false)throw new Error("Crawler Hints cannot be edited with this token");
    await api(settingUrl,{method:"PATCH",body:JSON.stringify({value:"on"})});
    const verified=await api(settingUrl);
    if(verified.value!=="on")throw new Error("Crawler Hints activation was not confirmed");
    console.log("Crawler Hints enabled and confirmed for mynigeriaguide.com");
  }
}
