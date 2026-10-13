/** Register production sitemaps with verified Bing Webmaster Tools using JSON REST. */
const root="https://mynigeriaguide.com", siteUrl=root+"/";
const feeds=[root+"/sitemap-index.xml",root+"/recent-pages.xml",root+"/video-sitemap.xml"];
const key=process.env.BING_WEBMASTER_API_KEY?.trim();
if(!key){ console.log("BLOCKED: BING_WEBMASTER_API_KEY not configured.");process.exitCode=2;}
else for(const feedUrl of feeds){
  const source=await fetch(feedUrl,{signal:AbortSignal.timeout(15000)});
  if(source.status!==200||new URL(source.url).origin!==root)throw Error("Unreachable feed: "+feedUrl);
  const xml=await source.text();
  if(!/<(?:sitemapindex|rss|urlset)(?:\s|>)/.test(xml))throw Error("Invalid feed: "+feedUrl);
  const endpoint=new URL("https://ssl.bing.com/webmaster/api.svc/json/SubmitFeed");
  endpoint.searchParams.set("apikey",key);
  const response=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},
    body:JSON.stringify({siteUrl,feedUrl}),signal:AbortSignal.timeout(20000)});
  if(!response.ok)throw Error("Bing registration failed for "+new URL(feedUrl).pathname+": HTTP "+response.status);
  console.log("Bing registered "+new URL(feedUrl).pathname+" (HTTP "+response.status+").");
}
