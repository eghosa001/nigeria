"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const groups = [
  { id:"banking", title:"BVN & banking", text:"Get, retrieve, correct or use BVN from abroad.", options:[["Get my first BVN","bvn-enrolment"],["Change/correct BVN details","bvn-change-details"],["I forgot my BVN","bvn-retrieval"],["I live outside Nigeria","non-resident-bvn"]] },
  { id:"foreign-visas", title:"Foreign visas", text:"Apply from Nigeria to visit another country.", options:[["United Kingdom","uk-standard-visitor-visa"],["United States","us-b1-b2-visitor-visa"],["Canada","canada-visitor-visa"],["France / Schengen","france-schengen-short-stay-visa"],["Germany","germany-schengen-tourist-visa"],["Italy","italy-schengen-tourist-visa"],["Spain","spain-schengen-tourist-visa"],["Netherlands","netherlands-schengen-visa"],["UAE / Dubai","uae-tourist-visa"],["South Africa","south-africa-holiday-visa"],["Ireland","ireland-short-stay-visit-visa"],["Türkiye","turkiye-tourist-visa"],["China","china-tourist-visa-nigeria"],["Australia","australia-visitor-visa-600"]] },
  { id:"travel", title:"Nigeria travel", text:"Nigeria visas, travel documents and border/health requirements.", options:[["Apply for a Nigeria visa","nigeria-evisa-application"],["Tourist visa for Nigeria","nigeria-tourism-visa"],["Business visa for Nigeria","nigeria-business-visa"],["Visit family/friends in Nigeria","nigeria-visiting-visa"],["Transit through Nigeria","nigeria-transit-visa"],["Travel within ECOWAS","ecowas-travel-certificate"],["Get a Yellow Card","yellow-card"],["Landing / Exit Card for Nigeria","nigeria-landing-exit-card"],["Renew my Nigerian passport","passport-renewal"]] },
  { id:"passport", title:"Passport", text:"Choose the passport situation that matches you.", options:[["First Nigerian passport","first-nigerian-passport"],["Renew / reissue passport","passport-renewal"],["My passport is lost","lost-nigerian-passport"],["Change my name","passport-name-change"]] },
  { id:"identity", title:"NIN & identity", text:"NIMC enrolment and record corrections.", options:[["Get a NIN","nin-enrolment"],["Correct date of birth","nin-date-of-birth-modification"],["Change phone number","nin-phone-modification"],["Reissue my NIN slip","nin-slip-reissue"]] },
  { id:"education", title:"School & youth service", text:"JAMB, WAEC, NECO and NYSC.", options:[["Register for JAMB UTME","jamb-2026-utme-registration"],["JAMB Direct Entry","jamb-direct-entry-2026"],["Check WAEC result","waec-check-result"],["Check NECO result","neco-check-result"],["NYSC registration","nysc-registration-local"]] },
  { id:"business", title:"Business & company", text:"CAC registration and company records.", options:[["Register a business name","cac-business-name-registration"],["Register a company","cac-company-registration"],["Get CAC status report","cac-status-report"]] },
  { id:"driving", title:"Driving & licence", text:"Get, renew or replace a Nigerian driver's licence.", options:[["Get a new driver's licence","new-drivers-licence"],["Renew driver's licence","renew-drivers-licence"],["Replace lost driver's licence","replace-lost-drivers-licence"]] },
  { id:"civil", title:"Birth & civil records", text:"Birth registration, certificates and attestation.", options:[["Register a birth","npc-birth-registration"],["Reissue digital birth certificate","npc-digital-birth-certificate-reissuance"],["Reprint birth certificate","npc-birth-certificate-reprint"],["Check birth attestation status","npc-check-attestation-status"]] },
  { id:"tax", title:"Tax services", text:"Federal taxpayer registration, filing and payment.", options:[["Register as a taxpayer","nrs-taxpayer-registration"],["File tax return","nrs-self-tax-filing"],["Pay tax","nrs-tax-payment"],["Track a refund","nrs-refund-tracking"]] },
  { id:"state", title:"State services", text:"Selected state tax and payer identity services.", options:[["Get Anambra ASIN","anambra-asin-registration"],["Get Lagos Payer ID","lagos-payer-id"],["Edo Tax ID","edo-tax-id-registration"]] },
  { id:"police", title:"Police & security", text:"Police certificates and official verification routes.", options:[["Get Police Character Certificate","police-character-certificate"]] },
  { id:"civic", title:"PVC & voter record", text:"Check an existing PVC record and collection centre.", options:[["Check my PVC status","inec-pvc-status"]] },
] as const;

export function RouteWizard({ availableSlugs }: { availableSlugs: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const available = useMemo(() => new Set(availableSlugs), [availableSlugs]);
  const group = groups.find((item) => item.id === selected);
  return (
    <div className="route-wizard">
      <div className="route-wizard-head">
        <div><span className="eyebrow">Find a service</span><h2>What are you trying to do?</h2><p>Choose one area, then pick the situation that matches you. This is the single service finder for the homepage.</p></div>
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
