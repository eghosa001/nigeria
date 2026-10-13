import test from "node:test";
import assert from "node:assert/strict";
import {planGoogleJobNotifications as plan} from "./google-job-indexing-plan.mjs";
const origin="https://mynigeriaguide.com";
const job=(slug,char)=>({url:origin+"/jobs/"+slug,fingerprint:char.repeat(64)});
test("new, unchanged and updated verified job delta",()=>{
 const first=plan([job("real-vacancy","a")]);
 assert.equal(first.notifications.length,1);
 assert.equal(plan([job("real-vacancy","a")],first.checkpoint).notifications.length,0);
 assert.equal(plan([job("real-vacancy","b")],first.checkpoint).notifications.length,1);
});
test("expired jobs do not falsely report URL_DELETED",()=>{
 const previous=plan([job("old-vacancy","a")]).checkpoint;
 const next=plan([],previous);
 assert.equal(next.removed,1);assert.deepEqual(next.notifications,[]);
});
test("bounded requests do not checkpoint unsubmitted pages",()=>{
 const p=plan([job("one","a"),job("two","b")],null,1);
 assert.equal(p.pending,1);assert.equal(Object.keys(p.checkpoint.pages).length,1);
});
test("reject non-job and URL duplicate records",()=>{
 assert.throws(()=>plan([{url:origin+"/services/nin",fingerprint:"a".repeat(64)}]));
 assert.throws(()=>plan([job("x","a"),job("x","b")]));
});
