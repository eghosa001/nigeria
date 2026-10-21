import assert from "node:assert/strict";
import test from "node:test";
import { getOfficialServiceLinks } from "../lib/official-links";
import type { Service } from "../lib/types";

function refund(slug: string, portal: string): Service {
  return {
    slug,
    officialPortal: portal,
    sources: [
      {
        label: "NERC consumer complaint and escalation",
        url: "https://nerc.gov.ng/need-help/services/how-to-file-a-complaint/",
        lastChecked: "2026-10-20",
      },
    ],
  } as Service;
}

test("AEDC refund offers the actual meter lookup as the primary action, not NERC complaints", () => {
  const links = getOfficialServiceLinks(refund("aedc-map-refund", "https://maprefund.abujaelectricity.com/"));
  assert.equal(links.actionUrl, "https://maprefund.abujaelectricity.com/");
  assert.equal(links.guidanceUrl, "https://www.abujaelectricity.com/your-investment-returned-a-simple-guide-to-your-map-refund/");
  assert.match(links.actionLabel ?? "", /official service portal/);
});

test("IBEDC refund links to its official meter-token checker without a generic complaint link", () => {
  const links = getOfficialServiceLinks(refund("ibedc-map-refund", "https://www.ibedc.com/map-refund"));
  assert.equal(links.guidanceUrl, "https://www.ibedc.com/map-refund");
  assert.equal(links.actionUrl, undefined); // Same guidance/action URL is presented once.
  assert.match(links.guidanceLabel ?? "", /official service portal/);
});

test("no unrelated service gains permission to link to arbitrary transaction portals", () => {
  const links = getOfficialServiceLinks(refund("unrelated-service", "https://random-shop.example/checkout"));
  assert.equal(links.actionUrl, undefined);
});
