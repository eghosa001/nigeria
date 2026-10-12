import test from "node:test";
import assert from "node:assert/strict";
import { queryUniversityDirectory, universitySearchSuggestions } from "../lib/university-search";
const profiles=[
{slug:"uniben",name:"University of Benin",abbreviation:"UNIBEN",city:"Benin City",state:"Edo State",academicSession:"2026/27",focus:"Admission and clearance"},
{slug:"lasu",name:"Lagos State University",abbreviation:"LASU",city:"Ojo",state:"Lagos State",academicSession:"2026/27",focus:"LACACA and fees"},
{slug:"unilag",name:"University of Lagos",abbreviation:"UNILAG",city:"Lagos",state:"Lagos State",academicSession:"2026/27",focus:"Post UTME"}];
const rows=new Map([
["uniben",{slug:"uniben",title:"UNIBEN admission",shortTitle:"UNIBEN",summary:"Student portal",searchTerms:["uniben clearance"]}],
["lasu",{slug:"lasu",title:"LASU admission",shortTitle:"LASU",summary:"LACACA clearance",searchTerms:["lasu school fees"]}],
["unilag",{slug:"unilag",title:"UNILAG admission",shortTitle:"UNILAG",summary:"post utme admission",searchTerms:["UNILAG post utme"]}]
]);
test("university search honors school, state and admission intent",()=>{
assert.deepEqual(queryUniversityDirectory(profiles,rows,"UNIBEN clearance").map(x=>x.slug),["uniben"]);
assert.deepEqual(queryUniversityDirectory(profiles,rows,"Lagos State").map(x=>x.slug),["lasu","unilag"]);
assert.deepEqual(queryUniversityDirectory(profiles,rows,"LACACA fees").map(x=>x.slug),["lasu"]);
assert.equal(queryUniversityDirectory(profiles,rows,"missing-school").length,0);
assert.equal(queryUniversityDirectory(profiles,rows,"").length,3);
});
test("suggestions preserve unique school abbreviations and states",()=>{
const s=universitySearchSuggestions(profiles);
assert.ok(s.includes("UNIBEN")&&s.includes("Lagos State"));
assert.equal(s.length,new Set(s).size);
});
