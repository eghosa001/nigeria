import { test } from "node:test";
import assert from "node:assert/strict";
import { auditSharedStructure, validateLanding, validateTemplate, contracts, landingContracts } from "./shared-page-structure.mjs";

test("every existing shared detail template and pillar landing has the required information order and anchor targets", () => {
  assert.deepEqual(auditSharedStructure(), []);
});

test("a missing required section or an in-page dead link fails publication", () => {
  const template = {
    name: "Example", collection: "records.map",
    required: ["AnswerFirst"], targets: ["requirements"]
  };
  assert.match(validateTemplate(template, 'function generateStaticParams(){return records.map(x=>x)}; <AnswerFirst/> <a href="#requirements">Requirements</a>').join(" "), /missing section/);
  const landing = { name: "Example", anchors: ["list"], required: ["Search"] };
  assert.deepEqual(validateLanding(landing, '<Search/><div id="list"/><a href="#list">List</a>'), []);
  assert.match(validateLanding(landing, '<Search/><div id="list"/><a href="#missing">Missing</a>').join(" "), /broken in-page link/);
});

test("contracts cover every primary pillar and supporting catalogue type", () => {
  const names = contracts.map((x) => x.name);
  for (const name of ["Services", "Jobs", "Tour", "Movies", "TV series", "Career guides", "People profiles", "YouTube movies"])
    assert.ok(names.includes(name), name);
  assert.equal(landingContracts.length, 4);
});
