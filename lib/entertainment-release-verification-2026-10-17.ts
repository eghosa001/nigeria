import type { EntertainmentReferenceLink, EntertainmentTitle } from "@/lib/entertainment";

// Film-specific source checks, 17 October 2026. Source metadata and scheduled
// cinema dates never mean that an entire film has been viewed, that a ticket
// can be purchased now, or that a full-length upload has distribution rights.
// Avoid reassigning identical titles from unrelated films or social clips.
type FilmEvidence = {
  synopsis?: string;
  sources: EntertainmentReferenceLink[];
  heading: string;
  paragraphs: [string, string];
  question: { question: string; answer: string };
};

export const sevenFilmReleaseReviews20261017: Record<string, FilmEvidence> = {
  "abe-odale-2026": {
    synopsis: "Abe Odale (Blade of Betrayal) is an October 2026 Yoruba-language release written and produced by Omobolanle Salisu, directed by Wasiu Adeyanju and published on LibraTV on 11 October. Reported cast includes Mide Martins, Ayo Olaiya, Antar Laniyan, Omobolanle Salisu and Femi Adebayo. The film's precise plot, character-to-actor credits and a stable full-film watch URL remain unverified; the title's translation alone cannot establish its story.",
    sources: [
      { label: "LibraTV — original publisher's video channel", href: "https://www.youtube.com/channel/UCvpK1k1i23Xi5TM-ZDuSNDw/videos", lastChecked: "2026-10-17", note: "Original Yoruba-film publishing channel. The channel identifies the distributor; this is NOT an individually verified full-film video URL and is therefore not rendered as a Watch action." },
      { label: "Nollywood Times — 11 October Abe Odale premiere and production credits", href: "https://www.nollywoodtimes.com/2026/10/abe-odale-premieres-on-libratv-youtube.html", lastChecked: "2026-10-17", note: "12 October report confirms LibraTV's 11 October debut, writer/producer Omobolanle Salisu, director Wasiu Adeyanju and cast; character assignments and a specific film video URL are not stated." },
    ],
    heading: "The actual premiere and why the channel is not a direct Watch link",
    paragraphs: [
      "Reporting dated 12 October places Abe Odale's LibraTV premiere on Sunday 11 October 2026. It names Omobolanle Salisu as writer/producer, Wasiu Adeyanju as director and an ensemble including Mide Martins, Ayo Olaiya, Antar Laniyan and Femi Adebayo. This is more precise than describing the video as an unreleased trailer; it also avoids fictional character assignments or a scene-by-scene story borrowed from another Yoruba production.",
      "The original LibraTV channel has been identified, but the exact, separately verified full-film watch URL was not established in this check. The channel is listed as a source, not as a fake direct playback button. To locate it, search that issuer's videos for the full Yoruba title and compare the cast. An unrelated Abe Oru film with Mide Martins is not a substitute for Abe Odale.",
    ],
    question: { question: "Is Abe Odale released, and why isn't there a Watch button?", answer: "The film premiered on LibraTV on 11 October 2026 according to dated coverage. The distributor channel is linked, but an exact authorised full-film video URL has not been independently confirmed for the site's Watch control." },
  },
  "long-enough-2026": {
    synopsis: "Long Enough is Uche Nancy Update TV's 17 September 2026 romantic drama directed by Austin Onyema and led by Victory Michael, Prisma James and Jennifer Obodo. FilmFlux identifies the original issuer and a running time around 175 minutes. It is not Royal Arts TV's unrelated 2025 Forever Isn't Long Enough; a stable, directly checked YouTube video link for this exact upload remains unavailable.",
    sources: [
      { label: "FilmFlux — 17 September 2026 Long Enough full-film production record", href: "https://filmflux.app/movie/15b2ecd8-a91a-4e80-87e8-e8674992edb4-long-enough", lastChecked: "2026-10-17", note: "Exact Uche Nancy Update TV film, 2h55m catalogue runtime, director Austin Onyema, core cast, and named production crew." },
      { label: "Uche Nancy Update TV — original publisher's channel", href: "https://www.youtube.com/@UcheNancyUpdateTv/videos", lastChecked: "2026-10-17", note: "Original full-film publisher as independently corroborated by FilmFlux; channel videos listing alone does not provide an authenticated deep link to this one film." },
    ],
    heading: "Which Long Enough, and which premiere date?",
    paragraphs: [
      "FilmFlux's exact movie record identifies Long Enough as a 17 September 2026 release on Uche Nancy Update TV, directed by Austin Onyema, with Victory Michael, Prisma James, Jennifer Obodo and other performers. The crew listing credits Chinenye Anieze as writer and Uche Nancy as producer. One secondary entertainment report instead dates a debut to 16 September and refers to another upload channel; the issuer-indexed release takes precedence for identifying this original version.",
      "The site's separate Forever Isn't Long Enough page concerns Royal Arts TV's December 2025 film about Grace and her family. Those titles, casts and publishers must not share a player. Until the exact Uche Nancy Update TV full-film video is verified, this guide intentionally points to the publisher channel as a source rather than a guessed watch?v= link. A catalogue estimate of 175 minutes does not guarantee a fixed duration across every later edit.",
    ],
    question: { question: "Is this the 2025 Royal Arts TV film?", answer: "No. Long Enough (2026) is the Uche Nancy Update TV movie released 17 September, directed by Austin Onyema. Forever Isn't Long Enough (2025) is a different Royal Arts TV film." },
  },
  "no-fury-2024": {
    synopsis: "No Fury is an Akay Mason-directed drama-thriller starring Nse Ikpe-Etim and Jim Iyke. Its existing IMDb catalogue identity carries a 2024 year, but distributor and 2026 entertainment coverage date its Nigerian cinema release for 23 October 2026, still in the future as of this review. A planned cinema premiere is not proof of open showtimes or a legal streaming source, so current viewing availability remains unverified.",
    sources: [
      { label: "Nollywood.com — No Fury official Nigerian cinema release record", href: "https://www.nollywood.com/movies/no-fury", lastChecked: "2026-10-17", note: "Film-specific cast, writer Akay Mason and additional writers, director Akay Mason, and 23 October 2026 FilmOne theatrical release listing for Nigeria." },
      { label: "What Kept Me Up — October 2026 Nigerian cinema release guide", href: "https://whatkeptmeup.com/preview/new-in-nigeria-movies-and-tv-shows-to-watch-this-october-2026/", lastChecked: "2026-10-17", note: "Independent October schedule lists No Fury for 23 October 2026 cinemas, director Akay Mason and FilmOne distribution." },
    ],
    heading: "Why the 2024 catalogue record differs from the October 2026 cinema date",
    paragraphs: [
      "The guide's canonical /no-fury-2024 URL reflects an earlier IMDb catalogue year. Nigerian release records, however, schedule a theatrical opening for 23 October 2026 through FilmOne and credit Akay Mason as director. The latter is an announced local exhibition date, not proof that tickets already exist or that the film premiered in cinemas in 2024. This is an unresolved production-year versus release-year distinction, not two verified separate movies.",
      "The film features Jim Iyke, Nse Ikpe-Etim and a cast including Lilian Esoro and Tina Mba in a story about a marriage shaken by betrayal. No reliable full-film legal streaming destination or dated individual cinema showtime was verified on 17 October. Readers should consult FilmOne and their chosen cinema after the scheduled premiere rather than follow an unofficial upload claiming the complete movie.",
    ],
    question: { question: "Is No Fury already streaming, and which year is correct?", answer: "Its older IMDb record uses 2024, while Nollywood.com and Nigerian release reporting schedule a 23 October 2026 cinema debut. No authorised streaming source is currently verified." },
  },
  "colours-of-fire": {
    synopsis: "Colours of Fire is Niyi Akinmolayan's 2025 Nigerian fantasy about Akinbode, a warrior whose obligations conflict with his feelings for Moremi of a rival clan. Netflix Nigeria lists the title but explicitly marks it unavailable in Nigeria; Kava's own page excludes African territories. An independently discoverable upload or a cinema-era promotional listing is not proof of legal playable Nigeria availability.",
    sources: [
      { label: "Netflix Nigeria — local title is unavailable", href: "https://www.netflix.com/ng/title/82752912", lastChecked: "2026-10-17", note: "Netflix's Nigerian product page explicitly says the title is not available to watch in this country. A catalogue card is not a subscription viewing right." },
      { label: "Nollywood.com — Colours of Fire original cinema release and cast", href: "https://nollywood.com/movies/colours-of-fire", lastChecked: "2026-10-17", note: "Film-specific 24 December 2025 primary cinema release, Niyi Akinmolayan directing, Osas Ighodaro and Uzor Arukwe in the cast; past exhibition does not verify October 2026 showtimes." },
      { label: "Kava TV — provider's territory restriction", href: "https://kavatv.vhx.tv/colours-of-fire", lastChecked: "2026-10-17", note: "Kava's own film page explicitly restricts viewing to select regions outside Africa. Do not offer Kava as a Nigerian Watch button." },
    ],
    heading: "Why a Netflix title page and an internet upload do not equal Nigerian playback",
    paragraphs: [
      "Netflix's Nigeria title page currently reports Colours of Fire as unavailable in this country. Kava separately markets a version to selected regions outside Africa. Both are original provider statements about territory, so the existence of a searchable title on either service does not establish a playable account in Lagos or elsewhere in Nigeria.",
      "Nollywood.com's film page confirms a 24 December 2025 cinema release and director Niyi Akinmolayan; this is historical release context rather than current October 2026 cinema ticketing. A YouTube upload found by title is not used as a watch link without clear provenance and authorisation from the film's production or distributing rights holder. The site therefore keeps playback unverified rather than inventing accessibility.",
    ],
    question: { question: "Can I watch Colours of Fire on Netflix or Kava in Nigeria now?", answer: "No verified Nigerian playback is available from either source in this review: Netflix Nigeria explicitly says unavailable, while Kava excludes Africa. The film's 2025 cinema release does not establish current bookings." },
  },
  "husband-or-dare": {
    sources: [
      { label: "KieKieTV — original Husband or Dare full-length release", href: "https://www.youtube.com/watch?v=fJKF3JlGsBE", lastChecked: "2026-10-17", note: "Identified 1 October 2026 publisher release featuring the main ensemble. Channel ownership is not evidence of the film's director." },
      { label: "Social Discovery — KieKieTV publisher video listing, 1 October 2026", href: "https://socialdiscovery.app/en/youtube/themes/film-tv/tv-series", lastChecked: "2026-10-17", note: "Independent time-stamped publisher-channel discovery identifies the specific Husband or Dare video under KieKieTV. Does not name any director." },
    ],
    heading: "The publisher, the release and the missing director credit",
    paragraphs: [
      "The full-length Husband or Dare on KieKieTV is independently indexed as an 1 October 2026 release. The issuer video identifies the cast and relationship-drama premise, so the existing verified full-film link is retained rather than substituting an unrelated Truth or Dare title.",
      "KieKieTV is the film's publishing channel, not automatically its directing credit. Neither the cited original upload record nor the independently indexed page supplies a named director. The guide deliberately leaves the field blank until the on-screen credits or a film-specific production source is available.",
    ],
    question: { question: "Who directed Husband or Dare?", answer: "A director has not yet been verified from the original KieKieTV video or its film-specific supporting sources. KieKieTV is the publishing channel, not a confirmed director." },
  },
  "what-love-is": {
    sources: [
      { label: "Maurice Sam TV — original September 2026 What Love Is release", href: "https://www.youtube.com/watch?v=ORIBBpN7YMs", lastChecked: "2026-10-17", note: "Exact original Maurice Sam and Erica Nlewedim film; does not name a verified director." },
      { label: "IMDb — distinctly different 2007 American What Love Is film", href: "https://www.imdb.com/title/tt0439876/", lastChecked: "2026-10-17", note: "The Mars Callahan-directed 2007 US romantic comedy starring Cuba Gooding Jr. is NOT the September 2026 Maurice Sam / Erica Nlewedim Nigerian video." },
    ],
    heading: "Do not import the director of an unrelated film with this title",
    paragraphs: [
      "The What Love Is described here is the September 2026 Maurice Sam TV drama featuring Maurice Sam and Erica Nlewedim, centred on Paul, a photographer, and Gabriella, a fashion entrepreneur. The original channel provides a full-film release while the African Movies Database identifies supporting character names. Neither confirms a director in the source records examined.",
      "Search engines also return a 2007 American film called What Love Is directed by Mars Callahan and starring Cuba Gooding Jr. The US movie is unrelated to this Nigerian film. Borrowing its director credit to fill an empty field would misidentify the production, so the 2026 guide correctly retains an unconfirmed directing credit.",
    ],
    question: { question: "Did Mars Callahan direct the Maurice Sam What Love Is (2026)?", answer: "No attribution is supported. Mars Callahan directed a different US film of that title from 2007; the original 2026 Nigerian publisher and film-specific catalogue do not confirm a director." },
  },
  "the-man-i-never-knew": {
    sources: [
      { label: "FilmFlux — exact Royal Arts TV 2026 film release", href: "https://filmflux.app/movie/73b3559e-59aa-49f3-869f-74d69ca0a8e5-the-man-i-never-knew", lastChecked: "2026-10-17", note: "Identifies the 2026 94-minute Royal Arts TV release, lead cast and identity mystery; does not provide a definitive named director." },
      { label: "Nollywood Times — The Man I Never Knew September premiere", href: "https://www.nollywoodtimes.com/2026/09/the-man-i-never-knew-starring-toosweet.html", lastChecked: "2026-10-17", note: "25 September report describes the original Royal Arts TV movie with TooSweet Annan and Chisom Agoawuike but does not establish a director." },
    ],
    heading: "An original publisher is not a director credit",
    paragraphs: [
      "This guide concerns the 24 September 2026 Royal Arts TV romance/mystery featuring TooSweet Annan, Chisom Agoawuike and Mojoyin Fadaka. Mila recognises someone who resembles a former partner but he denies their history. The exact film is not an older, similarly titled production, and dramatic teasers are not evidence for an invented final twist.",
      "The available FilmFlux and dated release story identify Royal Arts TV as original publisher but do not establish who directed the production. Social-post tags such as #producer or generic references to a filmmaker cannot be safely assigned to a particular crew role for this exact movie. The guide should continue to show an unresolved director credit instead of attributing the film to its channel owner.",
    ],
    question: { question: "Who directed The Man I Never Knew on Royal Arts TV?", answer: "The exact-film publisher and referenced release coverage do not independently name a director. That credit remains unconfirmed pending a film-specific production credit or on-screen title." },
  },
};

export const sevenReviewedFilmSlugs20261017 = Object.keys(sevenFilmReleaseReviews20261017);

export function applyFilmReleaseReviews20261017(title: EntertainmentTitle): EntertainmentTitle {
  const review = sevenFilmReleaseReviews20261017[title.slug];
  if (!review) return title;
  const references = [...(title.references ?? [])];
  for (const source of review.sources) {
    const at = references.findIndex(prior => prior.href === source.href);
    if (at >= 0) references[at] = source;
    else references.push(source);
  }
  return { ...title, synopsis: review.synopsis ?? title.synopsis, references };
}
