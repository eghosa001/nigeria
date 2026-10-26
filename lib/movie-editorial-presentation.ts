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

// The full 2025 dossier remains available for source audits. Its rendered page
// already gives the synopsis, cast, director, release identity and official
// watch link. Only the two distinct, useful findings belong in the film guide.
export function getVisibleMovieEditorial(slug: string, dossier: MovieEditorialProfile) {
  if (slug === "forever-isnt-long-enough-2025") {
    return {
      sections: [
        {
          heading: "Grace's estranged aunt",
          paragraphs: [
            "Grace reconnects with an aunt who had also experienced rejection. Their relationship brings a different perspective on judgment, belonging and compassion; the publisher synopsis does not establish the ending.",
          ],
        },
        {
          heading: "Character credits still unconfirmed",
          paragraphs: [
            "Royal Arts TV names the performers and Plex identifies the director, but neither checked source conclusively assigns an actor to Grace or her aunt. The cast and director are listed above without invented character credits.",
          ],
        },
      ],
      questions: [],
    };
  }
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

/** Avoid showing the same verified director twice in the cast and credits area. */
export function getAdditionalMovieCrewCredits(
  directors: readonly string[],
  crew: MovieEditorialProfile["crew"],
): MovieEditorialProfile["crew"] {
  const normalized = new Set(directors.map(name => name.trim().toLocaleLowerCase("en")));
  return crew.filter(({ role, name }) =>
    !(/^director(?:\\s*\\([^)]*\\))?$/i.test(role.trim()) &&
      normalized.has(name.trim().toLocaleLowerCase("en"))),
  );
}
