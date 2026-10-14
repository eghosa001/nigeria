import assert from "node:assert/strict";
import test from "node:test";
import { getPublicService } from "../lib/data";
import { getDetailedServiceGuidance } from "../lib/service-guidance";
import { getRequirementDetails } from "../lib/requirement-details";
import { readFileSync } from "node:fs";

const readPage=()=>readFileSync("components/service-journey.tsx","utf8");

test("NIS free Landing/Exit Card never borrows paid passport fallback or evidence",()=>{
  const service=getPublicService("nigeria-landing-exit-card");
  assert.ok(service);
  const guidance=getDetailedServiceGuidance(service);
  const text=JSON.stringify(guidance);
  assert.match(text,/LECARD|Landing or Exit Card/i);
  assert.match(text,/get-last-card|Get Your Last Card/);
  assert.match(text,/lecard@immigration.gov.ng/);
  assert.doesNotMatch(text,/keep the application reference, payment receipt|official passport office.contact route/i);
  assert.match(readPage(),/service.slug !== "nigeria-landing-exit-card"/);
});

test("NINAuth and Airtel each show correct exact source-specific next action",()=>{
  const nimc=getPublicService("ninauth-nin-verification");
  const airtel=getPublicService("airtel-esim-activation");
  assert.ok(nimc && airtel);
  const n=getDetailedServiceGuidance(nimc),a=getDetailedServiceGuidance(airtel);
  assert.match(JSON.stringify(n),/Do More with NINAuth/);
  assert.match(JSON.stringify(n),/Sharecode/);
  assert.doesNotMatch(JSON.stringify(n),/NIMC centre.*payment/);
  assert.match(JSON.stringify(a),/EID/);
  assert.match(JSON.stringify(a),/Airtel Centre/);
  assert.match(JSON.stringify(a),/single-use QR/);
});

test("INEC replacement panel cites the current in-person legal rule",()=>{
  const s=getPublicService("inec-replace-lost-damaged-pvc");
  assert.ok(s);
  const details=JSON.stringify(getDetailedServiceGuidance(s));
  assert.match(details,/Electoral Act 2026/);
  assert.match(details,/90.day/);
  assert.match(details,/in person/);
  assert.match(details,/iccc@inec.gov.ng/);
});

test("requirements never explain a tax identifier as a taxpayer record on unrelated agencies",()=>{
  const s=getPublicService("nigeria-landing-exit-card");
  const taxAgency=getPublicService("anambra-asin-registration");
  assert.ok(s && taxAgency);
  const nonTax=getRequirementDetails({...s, requirements:["A taxpayer identification number if requested for unrelated identity checks"]});
  assert.ok(nonTax.every(item=>!item.why?.includes("taxpayer record")));
  const tax=getRequirementDetails({...taxAgency,requirements:["ASIN or taxpayer identification number"]});
  assert.ok(tax.some(item=>item.why?.includes("taxpayer record")));
});
