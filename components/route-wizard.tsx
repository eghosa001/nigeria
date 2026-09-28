"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Service } from "@/lib/types";

const groups = [
  { id:"banking", title:"BVN & banking", text:"Get, retrieve or use BVN from abroad.", options:[["Get my first BVN","bvn-enrolment"],["I forgot my BVN","bvn-retrieval"],["I live outside Nigeria","non-resident-bvn"]] },
  { id:"travel", title:"International travel", text:"Travel documents and border/health requirements.", options:[["Travel within ECOWAS","ecowas-travel-certificate"],["Get a Yellow Card","yellow-card"],["Landing / Exit Card for Nigeria","nigeria-landing-exit-card"],["Renew my Nigerian passport","passport-renewal"]] },
  { id:"passport", title:"Passport", text:"Choose the passport situation that matches you.", options:[["First Nigerian passport","first-nigerian-passport"],["Renew / reissue passport","passport-renewal"],["My passport is lost","lost-nigerian-passport"],["Change my name","passport-name-change"]] },
  { id:"identity", title:"NIN & identity", text:"NIMC enrolment and record corrections.", options:[["Get a NIN","nin-enrolment"],["Correct date of birth","nin-date-of-birth-modification"],["Change phone number","nin-phone-modification"],["Reissue my NIN slip","nin-slip-reissue"]] },
  { id:"education", title:"School & youth service", text:"JAMB, WAEC, NECO and NYSC.", options:[["Register for JAMB UTME","jamb-2026-utme-registration"],["JAMB Direct Entry","jamb-direct-entry-2026"],["Check WAEC result","waec-check-result"],["Check NECO result","neco-check-result"],["NYSC registration","nysc-registration-local"]] },
  { id:"business", title:"Business & company", text:"CAC registration and company records.", options:[["Register a business name","cac-business-name-registration"],["Register a company","cac-company-registration"],["Get CAC status report","cac-status-report"]] },
] as const;

export function RouteWizard({ services }: { services: Service[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const available = useMemo(() => new Set(services.map((service) => service.slug)), [services]);
  const group = groups.find((item) => item.id === selected);
  return (
    <div className="route-wizard">
      <div className="route-wizard-head">
        <div><span className="eyebrow">What applies to me?</span><h2>Choose your situation, not government terminology.</h2><p>Answer one simple question and go straight to the guide that matches what you are trying to do.</p></div>
        {group ? <button type="button" onClick={() => setSelected(null)}>← Change topic</button> : null}
      </div>
      {!group ? (
        <div className="route-wizard-grid">{groups.map((item) => <button type="button" key={item.id} onClick={() => setSelected(item.id)}><strong>{item.title}</strong><span>{item.text}</span><i aria-hidden="true">→</i></button>)}</div>
      ) : (
        <div className="route-wizard-options"><h3>{group.title}</h3>{group.options.filter(([, slug]) => available.has(slug)).map(([label, slug]) => <Link href={"/services/" + slug} key={slug}>{label}<span aria-hidden="true">→</span></Link>)}</div>
      )}
    </div>
  );
}
