import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const services = JSON.parse(readFileSync(new URL("../data/services.json", import.meta.url), "utf8"));
const getService = (slug: string) => services.find((item: {slug:string}) => item.slug === slug);

test("existing RSA and passport routes have distinct, official next actions", () => {
  const rsa = getService("pencom-open-rsa");
  assert.equal(rsa.officialPortal, "https://www.pencom.gov.ng/pension-fund-administrators/");
  assert.ok(rsa.steps.some((s: string) => /existing RSA PIN/i.test(s)));
  assert.ok(rsa.notes.some((s: string) => /coerce/i.test(s)));
  const tracking = getService("passport-application-tracking");
  assert.equal(tracking.officialPortal, "https://track.immigration.gov.ng/");
  assert.ok(tracking.steps.some((s: string) => /Application Number/i.test(s)));
  assert.ok(tracking.steps.some((s: string) => /Reference Number/i.test(s)));
  assert.ok(tracking.notes.some((s: string) => /payment|collection/i.test(s)));
});
