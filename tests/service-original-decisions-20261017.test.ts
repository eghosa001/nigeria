import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { publicServices } from "../lib/data";
import { getServiceScenarioDossier, serviceScenarioDossiers } from "../lib/service-scenario-dossiers-2026-10-17";

const slugs = Object.keys(serviceScenarioDossiers);
const bySlug = new Map(publicServices.map(service => [service.slug, service]));

test("every individually written problem-solving dossier refers to a real sourced published guide", () => {
  assert.equal(slugs.length, 14);
  let cases = 0;
  for (const slug of slugs) {
    const service = bySlug.get(slug);
    assert.ok(service, slug + " must exist in the published service catalogue");
    assert.ok(service.sources.length > 0, slug + " must retain its official issuer sources");
    const dossier = getServiceScenarioDossier(service);
    assert.equal(dossier.length, 3, slug + " needs individually distinct decision branches");
    const situations = new Set<string>();
    for (const scenario of dossier) {
      cases++;
      assert.ok(scenario.situation.length >= 24, slug + " situation has to be specific");
      assert.ok(scenario.reasoning.length >= 95, slug + " needs an actual explanation");
      assert.ok(scenario.verification.length >= 65, slug + " needs a useful checkpoint");
      assert.ok(!situations.has(scenario.situation.toLowerCase()), slug + " duplicate situations");
      situations.add(scenario.situation.toLowerCase());
      assert.doesNotMatch(scenario.reasoning, /I personally visited|our investigators interviewed|we tested the live form/i);
      if (scenario.alternativeSlug) {
        const alternate = bySlug.get(scenario.alternativeSlug);
        assert.ok(alternate, slug + " routes to missing guide " + scenario.alternativeSlug);
        assert.notEqual(alternate.slug, slug, "alternative must resolve to another task");
      }
    }
  }
  assert.equal(cases, 42);
});

test("dossiers are not manufactured on unsourced or unrelated pages", () => {
  const service = bySlug.get("passport-renewal");
  assert.ok(service);
  assert.deepEqual(getServiceScenarioDossier({ ...service, sources: [] }), []);
  const ordinary = bySlug.get("ninauth-nin-verification");
  assert.ok(ordinary);
  assert.deepEqual(getServiceScenarioDossier(ordinary), []);
});

test("rendered guide offers accessible navigation, actual source disclosure and no imaginary approvals", () => {
  const page = readFileSync("app/services/[slug]/page.tsx", "utf8");
  const nav = readFileSync("components/guide-quick-nav.tsx", "utf8");
  const component = readFileSync("components/service-scenarios.tsx", "utf8");
  assert.match(page, /<ServiceScenarios service=\{service\}/);
  assert.match(nav, /showScenarios\s*\?/);
  assert.match(component, /id="case-guidance"/);
  assert.match(component, /href="#official-sources"/);
  assert.match(component, /service\.lastVerified/);
  assert.match(component, /getPublicService\(scenario\.alternativeSlug\)/);
  assert.match(component, /not accounts of people/);
});
