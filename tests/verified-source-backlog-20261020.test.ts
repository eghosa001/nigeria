import assert from "node:assert/strict";
import test from "node:test";
import { getJobOpportunity } from "../lib/jobs";
import { getEffectiveJobStatus } from "../lib/job-runtime";
import { issuerRecheckedRoles20261020 } from "../lib/job-october-issuer-rechecks-2026-10-20";
import { verifiedEmployerBoards20261020 } from "../lib/job-employer-board-rechecks-2026-10-20";
import { getEntertainmentTitle } from "../lib/entertainment";

test("only individually checked employer records gain a new verification date", () => {
  assert.deepEqual([...issuerRecheckedRoles20261020].sort(), [
    "coronation-graduate-trainee-2026",
    "uniben-teaching-non-teaching-recruitment-2026",
    "unilag-professorial-chair-2026",
  ]);
  for (const slug of issuerRecheckedRoles20261020) {
    const job = getJobOpportunity(slug);
    assert.ok(job, slug);
    assert.equal(job.verifiedAt, "2026-10-20", slug);
    assert.ok(job.sources.some(source => source.lastChecked === "2026-10-20"), slug);
  }
});

test("UNIBEN original six-week application window stays closed, with no fictitious extension", () => {
  const job = getJobOpportunity("uniben-teaching-non-teaching-recruitment-2026");
  assert.ok(job);
  assert.equal(job.status, "closed");
  assert.equal(job.deadline, "2026-10-08");
  assert.match(job.summary, /original 27 August 2026.*six weeks/i);
  assert.ok(job.applicationSteps.every(step => !/submit within the six-week/i.test(step)));
  assert.match(job.nextMilestone ?? "", /not an extension for new applications/i);
});

test("UNILAG closes on 20 October, and runtime automatically treats it as closed thereafter", () => {
  const job = getJobOpportunity("unilag-professorial-chair-2026");
  assert.ok(job);
  assert.equal(job.deadline, "2026-10-20");
  assert.equal(getEffectiveJobStatus(job, "2026-10-21"), "closed");
  assert.match(job.summary, /acknowledgement slip/i);
});

test("Coronation programme remains qualified by source, not guaranteed form acceptance", () => {
  const job = getJobOpportunity("coronation-graduate-trainee-2026");
  assert.ok(job);
  assert.equal(job.status, "open");
  assert.equal(job.deadline, undefined);
  assert.match(job.nextMilestone ?? "", /Apply Now links.*nine named pathways/i);
  assert.match(job.nextMilestone ?? "", /no single application deadline/i);
});

test("Oversabi Aunty routes viewers to evidenced Kava listing, not unavailable Netflix playback", () => {
  const movie = getEntertainmentTitle("oversabi-aunty");
  assert.ok(movie);
  assert.equal(movie.watchLinks.some(link => link.platform === "Netflix"), false);
  assert.equal(movie.watchLinks.length, 1);
  assert.equal(movie.watchLinks[0].platform, "Kava");
  assert.equal(movie.watchLinks[0].href, "https://watch.kava.tv/oversabi-aunty");
  assert.equal(movie.watchLinks[0].lastChecked, "2026-10-20");
  assert.ok(movie.references?.some(ref => ref.href === "https://www.netflix.com/tudum/top10/nigeria" && /historical ranking/i.test(ref.note ?? "")));
  assert.ok(movie.cast.length >= 3);
});

test("five current employer boards replace expired role observations, without altering unrelated jobs", () => {
  assert.equal(verifiedEmployerBoards20261020.length, 5);
  for (const slug of verifiedEmployerBoards20261020) {
    const job = getJobOpportunity(slug);
    assert.ok(job, slug);
    assert.equal(job.verifiedAt, "2026-10-20", slug);
    assert.ok(job.sources.some(source => source.url === job.officialUrl &&
      source.lastChecked === "2026-10-20"), slug);
    assert.ok(job.sourceNotes.every(note => !note.includes("5 October 2026")), slug);
  }
  const emzor = getJobOpportunity("emzor-careers");
  assert.ok(emzor);
  assert.equal(emzor.officialUrl, "https://www.emzorpharma.com/job-vacancies/");
  assert.match(emzor.summary, /quality, production, engineering, HSE and laboratory/i);
  assert.ok(emzor.sourceNotes.some(note => /no payment is requested/i.test(note)));

  const aiico = getJobOpportunity("aiico-insurance-careers");
  assert.ok(aiico);
  assert.match(aiico.summary, /Data Analyst and Data & Analytics Engineer/i);
  assert.doesNotMatch(aiico.summary, /Sales Officer/i);

  const bat = getJobOpportunity("bat-nigeria-careers");
  assert.ok(bat);
  assert.match(bat.summary, /Sourcing Executive.*Lagos/i);
});
