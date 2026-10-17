import type { MovieEditorialProfile } from "@/lib/movie-editorial-profiles";

// Keep the source dossiers intact for audits and further fact-checking.
// Reader-facing text need not repeat an identical source uncertainty
// in multiple add-on sections and FAQ items.
const repeatedAbeSections = new Set([
  "How to identify the original LibraTV release",
  "The actual premiere and why the channel is not a direct Watch link",
]);
const repeatedAbeQuestions = new Set([
  "Where was Abe Odale released and is its exact full-film link confirmed here?",
  "Is Abe Odale released, and why isn't there a Watch button?",
]);

export function getVisibleMovieEditorial(slug: string, dossier: MovieEditorialProfile) {
  if (slug !== "abe-odale-2026") {
    return { sections: dossier.sections, questions: dossier.questions };
  }
  // The verified release and the missing direct-video URL are both retained in
  // the film's main analysis, remaining Watch Q&A and source / availability area.
  return {
    sections: dossier.sections.filter(part => !repeatedAbeSections.has(part.heading)),
    questions: dossier.questions.filter(part => !repeatedAbeQuestions.has(part.question)),
  };
}
