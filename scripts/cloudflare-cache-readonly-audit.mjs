// One-shot, read-only Cloudflare account/zone cache configuration inspection.
// Run only on the owner-controlled diagnostic branch, never on outside forks.
// Do not print credentials or unrestricted Cloudflare configuration payloads.
const token = process.env.CLOUDFLARE_API_TOKEN;
let account = process.env.CLOUDFLARE_ACCOUNT_ID;
let zone = process.env.CLOUDFLARE_ZONE_ID;
const base = "https://api.cloudflare.com/client/v4/";
if (!token) {
  console.log("Cloudflare policy read: unavailable (repository CLOUDFLARE_API_TOKEN not set)");
  process.exit(0);
}
async function call(method, path, body, label) {
  try {
    const response = await fetch(base + path, {
      method, headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: AbortSignal.timeout(15000),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) {
      console.log(label + ": HTTP " + response.status + " / Cloudflare error codes " +
        JSON.stringify((data.errors || []).map(e => e.code)).slice(0, 350));
      return null;
    }
    return data.result ?? null;
  } catch (error) {
    console.log(label + ": request failed (" + error.name + ")");
    return null;
  }
}
function settings(rule) {
  const p = rule.action_parameters || {};
  return {
    name: (rule.description || rule.name || "").slice(0, 160),
    action: rule.action,
    enabled: rule.enabled !== false,
    expression: (rule.expression || "").slice(0, 600),
    cache: p.cache,
    edge_ttl: p.edge_ttl,
    browser_ttl: p.browser_ttl,
    serve_stale: p.serve_stale,
    cache_key: p.cache_key,
  };
}
if (!zone) {
  const zones = await call("GET", "zones?name=mynigeriaguide.com", null, "Zone lookup");
  const selected = Array.isArray(zones) ? zones.find(x => x.name === "mynigeriaguide.com") : undefined;
  zone = selected?.id;
  if (!account && selected?.account?.id) {
    account = selected.account.id;
    console.log("Account identity resolved from the authorized zone lookup.");
  }
}
if (zone) {
  const cache = await call("GET", "zones/" + zone + "/rulesets/phases/http_request_cache_settings/entrypoint", null, "Zone cache rule entrypoint");
  if (cache) console.log("Zone active cache rules: " + JSON.stringify((cache.rules || []).map(settings)));
  const pages = await call("GET", "zones/" + zone + "/pagerules?per_page=100", null, "Legacy page rules");
  if (pages) console.log("Zone legacy page rules: " + JSON.stringify(pages.map(p => ({
    status: p.status, priority: p.priority,
    targets: (p.targets || []).map(t => t.constraint?.value),
    actions: (p.actions || []).filter(a => ["cache_level","edge_cache_ttl","browser_cache_ttl","cache_deception_armour"].includes(a.id)),
  }))));
  const all = await call("GET", "zones/" + zone + "/rulesets", null, "Zone ruleset inventory");
  if (all) console.log("Zone caching phases present: " + JSON.stringify(all
    .filter(r => /cache/i.test(r.phase || "")).map(r => ({phase: r.phase, name: r.name, kind: r.kind}))));
} else {
  console.log("Zone ID not available: cannot inspect zone Cache Rules/Page Rules using present credentials");
}
if (account) {
  const cache = await call("GET", "accounts/" + account +
    "/rulesets/phases/http_request_cache_settings/entrypoint", null, "Account cache rule entrypoint");
  if (cache) console.log("Account active cache rules: " + JSON.stringify((cache.rules || []).map(settings)));
  const urls = [
    "https://mynigeriaguide.com/explore/design-week-lagos-2026",
    "https://mynigeriaguide.com/entertainment/series/afobaje-2026",
    "https://mynigeriaguide.com/jobs/nigerian-army-92rri-2026",
  ];
  for (const url of urls) {
    const trace = await call("POST", "accounts/" + account + "/request-tracer/trace",
      { method: "GET", url, headers: { "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" }, skip_response: true },
      "Cloudflare Trace " + new URL(url).pathname);
    if (!trace) continue;
    console.log("Simulated request Trace " + new URL(url).pathname + ": " + JSON.stringify(
      (trace.trace || []).filter(t => t.matched || /cache|page.rule|worker/i.test(t.name || t.description || t.type || ""))
        .map(t => ({type: t.type, name: t.name, description: t.description, action: t.action,
          matched: t.matched, expression: (t.expression || "").slice(0,400),
          action_parameters: t.action_parameters?.edge_ttl ? { edge_ttl: t.action_parameters.edge_ttl } : undefined }))
    ).slice(0,8000));
  }
} else {
  console.log("Cloudflare account ID not configured: skipping account rules/Trace");
}

if (zone) {
  const query = `query($zone: string!, $start: Time!, $end: Time!) {
    viewer { zones(filter: { zoneTag: $zone }) {
      httpRequestsAdaptiveGroups(
        filter: { datetime_geq: $start, datetime_lt: $end, requestSource: "eyeball",
          userAgent_like: "%Googlebot%" }
        limit: 50, orderBy: [count_DESC]) {
        count dimensions { edgeResponseStatus cacheStatus }
      }
    } }
  }`;
  for (const date of ["2026-10-19", "2026-10-20", "2026-10-21", "2026-10-22", "2026-10-28"]) {
    const end = new Date(Date.parse(date + "T00:00:00Z") + 86400000).toISOString();
    try {
      const response = await fetch(base + "graphql", {
        method: "POST", headers: {Authorization: "Bearer " + token, "Content-Type": "application/json"},
        body: JSON.stringify({ query, variables: {zone, start: date + "T00:00:00Z", end} }),
        signal: AbortSignal.timeout(12000)
      });
      const value = await response.json();
      const errors = (value.errors || []).map(e => String(e.message).slice(0, 180));
      if (!response.ok || errors.length) {
        console.log("Historical crawler analytics " + date + ": unavailable HTTP " + response.status + " " + JSON.stringify(errors));
        continue;
      }
      const data = value.data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups || [];
      console.log("Historical crawler analytics " + date + " (UA string match only, not verified bot): " +
        JSON.stringify(data.map(x => ({count:x.count, status:x.dimensions?.edgeResponseStatus,
          cache:x.dimensions?.cacheStatus}))));
    } catch (err) {
      console.log("Historical crawler analytics " + date + ": connection error " + err.name);
    }
  }
}


if (zone) {
  const query = `query($zone: string!, $start: Time!, $end: Time!) {
    viewer { zones(filter: { zoneTag: $zone }) {
      crawler: httpRequestsAdaptiveGroups(
        filter: { datetime_geq:$start, datetime_lt:$end, requestSource:"eyeball",
          userAgent_like:"%Googlebot%" }
        limit:35, orderBy:[count_DESC]) {
        count dimensions { clientRequestPath edgeResponseStatus }
      }
      errors: httpRequestsAdaptiveGroups(
        filter: { datetime_geq:$start, datetime_lt:$end, requestSource:"eyeball",
          edgeResponseStatus_geq:500 }
        limit:10, orderBy:[count_DESC]) {
        count dimensions { edgeResponseStatus }
      }
    } }
  }`;
  for (const date of ["2026-10-19", "2026-10-20", "2026-10-21", "2026-10-22", "2026-10-28"]) {
    const end = new Date(Date.parse(date + "T00:00:00Z") + 86400000).toISOString();
    try {
      const response = await fetch(base + "graphql", {
        method:"POST", headers:{Authorization:"Bearer " + token, "Content-Type":"application/json"},
        body:JSON.stringify({query,variables:{zone,start:date+"T00:00:00Z",end}}),
        signal:AbortSignal.timeout(15000)
      });
      const value = await response.json();
      if (!response.ok || value.errors?.length) {
        console.log("Historical path/error check " + date + ": unavailable HTTP " + response.status + " " +
          JSON.stringify((value.errors||[]).map(e=>String(e.message).slice(0,150))));
        continue;
      }
      const z=value.data?.viewer?.zones?.[0]||{};
      console.log("Historical crawler top paths " + date + ": " + JSON.stringify((z.crawler||[])
        .map(x=>({path:x.dimensions.clientRequestPath,status:x.dimensions.edgeResponseStatus,count:x.count}))));
      console.log("Historical overall site 5xx " + date + ": " + JSON.stringify((z.errors||[])
        .map(x=>({status:x.dimensions.edgeResponseStatus,count:x.count}))));
    } catch(error) {
      console.log("Historical path/error check " + date + ": connection error "+error.name);
    }
  }
}

console.log("Cloudflare audit complete. GET requests plus POST read-only simulated Trace; no configuration writes.");
