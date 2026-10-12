import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const data = JSON.parse(readFileSync(new URL("../data/services-universities-wave2.json", import.meta.url),"utf8"));
test("university wave two has verified portal and fee-session distinctions", () => {
  assert.equal(data.length,4);
  assert.equal(new Set(data.map((s:{slug:string})=>s.slug)).size,4);
  for(const row of data) {
    assert.equal(row.status,"verified");
    assert.equal(row.category,"Education");
    assert.equal(row.lastVerified,"2026-10-12");
    assert.ok(row.sources.length>=2 && row.steps.length>=5 && row.requirements.length>=3);
    assert.ok(row.sources.every((s:{url:string})=>s.url.startsWith("https://")));
    assert.ok(/2026|session|invoice/i.test(row.feeNote));
    assert.ok(row.related.includes("jamb-caps"));
    assert.ok(row.searchTerms.some((k:string)=>/school fees/i.test(k)));
  }
});
