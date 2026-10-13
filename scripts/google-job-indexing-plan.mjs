/** Delta notifications only for validated, standalone JobPosting pages. */
const origin="https://mynigeriaguide.com";
export function planGoogleJobNotifications(records,previous=null,max=100){
  if(!Number.isInteger(max)||max<1||max>200)throw Error("Invalid cap");
  const old=previous?.version===1&&previous?.origin===origin&&previous.pages&&!Array.isArray(previous.pages)?previous.pages:{};
  const now={};
  for(const item of records){
    if(!item?.url?.startsWith(origin+"/jobs/")||!/^[a-f0-9]{64}$/.test(item.fingerprint??""))
      throw Error("Invalid candidate");
    const url=new URL(item.url);
    if(url.origin!==origin||url.search||url.hash||!/^\/jobs\/[a-z0-9-]+$/.test(url.pathname)||Object.hasOwn(now,item.url))
      throw Error("Uncanonical or duplicate job URL");
    now[item.url]=item.fingerprint;
  }
  const changed=Object.entries(now).filter(([url,fp])=>old[url]!==fp);
  const selected=changed.slice(0,max).map(([url])=>({url,type:"URL_UPDATED"}));
  const checkpoint={version:1,origin,pages:Object.fromEntries([
    ...Object.entries(old).filter(([url])=>Object.hasOwn(now,url)),
    ...selected.map(({url})=>[url,now[url]])
  ])};
  return {notifications:selected,pending:changed.length-selected.length,unchanged:Object.keys(now).length-changed.length,
    removed:Object.keys(old).filter(url=>!Object.hasOwn(now,url)).length,checkpoint};
}
