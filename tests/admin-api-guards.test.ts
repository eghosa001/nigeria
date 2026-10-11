import assert from "node:assert/strict";
import { test } from "node:test";
import { legacyRouteResponse, protectedAdminApi, sameOrigin } from "../lib/admin-api-guards";

const request = (path: string, headers: Record<string, string> = {}) =>
  new Request("https://mynigeriaguide.com" + path, { headers });

test("only /admin/api paths can use protected admin handlers", () => {
  assert.equal(protectedAdminApi(request("/admin/api/access")), true);
  assert.equal(protectedAdminApi(request("/api/admin/access")), false);
  assert.equal(protectedAdminApi(request("/admin/other")), false);
  assert.equal(legacyRouteResponse().status, 404);
});

test("same-origin guard rejects cross-site and missing origin", () => {
  assert.equal(sameOrigin(request("/admin/api/access", { "Sec-Fetch-Site": "cross-site" })), false);
  assert.equal(sameOrigin(request("/admin/api/access")), false);
  assert.equal(sameOrigin(request("/admin/api/access", { "Origin": "https://attacker.example" })), false);
});

test("same-origin guard supports browser and forwarded requests", () => {
  assert.equal(sameOrigin(request("/admin/api/access", { "Sec-Fetch-Site": "same-origin" })), true);
  assert.equal(sameOrigin(request("/admin/api/access", { Origin: "https://mynigeriaguide.com" })), true);
  assert.equal(sameOrigin(request("/admin/api/access", {
    Origin: "https://mynigeriaguide.com",
    "X-Forwarded-Host": "mynigeriaguide.com",
    "X-Forwarded-Proto": "https",
  })), true);
});
