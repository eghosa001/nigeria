// Distinct user decisions sourced to each title's existing original episode,
// distributor or broadcaster record; no automatic update of a source check date.
// These notes do not claim a live playback, licensed poster, or full series watch.
export type SeriesReaderDecision = { answer: string; decision: string; limit: string };
export const seriesReaderDecisions20261017: Record<string, SeriesReaderDecision> = {
  "once-upon-a-village": {
    "answer": "Start with RuthKadiri247's verified Episode 1 upload and follow the publisher's numbered sequence; the page also links Part 3. FilmFlux's ten-part count was a 16 October catalogue snapshot, not an official promise that ten episodes remain the latest.",
    "decision": "Choose the publisher's original upload if you want to watch rather than a film-database entry. Its long instalments are closer to feature films than short television episodes; allow enough viewing time.",
    "limit": "A film database's instalment order does not verify later uploads or a complete season finale. Do not treat similarly named standalone films or fan edits as episodes published by RuthKadiri247."
  },
  "ordinary-people": {
    "answer": "Ordinary People is an eight-episode Moses Inwang crime series, launched in September 2026. The official Netflix Nigeria title URL identifies the series, but playback still depends on the signed-in account's region and current catalogue rights.",
    "decision": "Use the Netflix title page as the starting point, then check whether the play control is available to your account before choosing a plan solely for this series.",
    "limit": "A review of its Mirage Estate setting, cast or premiere date does not guarantee present Netflix Nigeria streaming access; a critic's assessment is not the programme's episode description."
  },
  "to-kill-a-monkey": {
    "answer": "Kemi Adetiba's To Kill a Monkey is a Nigerian crime thriller about Efemini's entry into cybercrime. Its exact Netflix title page, rather than a third-party full-episode upload, is the appropriate place to check current licensed access.",
    "decision": "Check the region-specific Netflix page and the episode list in a signed-in account. The series is fiction, not a how-to guide for online income or a documentary on named criminal cases.",
    "limit": "The existence of a Netflix title ID does not guarantee that every country or subscription tier currently allows playback; avoid unofficial mirror sites using the same poster."
  },
  "koleoso": {
    "answer": "Koleoso is Ibrahim Yekini's Yoruba supernatural serial distributed by Itelediconstudio. This guide links an authenticated Part 13 upload; it does not claim Part 13 is still the latest episode after the last recorded source check.",
    "decision": "If beginning from the start, navigate the publisher's numbered original uploads and confirm season versus part numbers before selecting the next instalment.",
    "limit": "Historical reporting about a popular title or a June 2026 Part 13 release cannot establish the number, availability or plot of every later episode. Do not mix re-edited clips into the original order."
  },
  "wata-shida": {
    "answer": "Wata Shida is a Hausa-language relationship and family drama. The verified viewing link is MURYAR HAUSA TV's Season 4 Episode 1, published in August 2026—not an episode-one link for the entire serial.",
    "decision": "For a newcomer, locate earlier original seasons on the same publisher channel before opening the linked Season 4 instalment; confirm the original uploader and exact episode label.",
    "limit": "A Season 4 title establishes a numbered instalment but does not prove a current complete-series playlist, an announced season-ending date or automatic access to every earlier episode."
  },
  "better-half-2026": {
    "answer": "Better Half premiered on Africa Magic Showcase (DStv channel 151) on 5 October 2026. The linked Africa Magic page is a broadcaster information hub, not a free full-episode player.",
    "decision": "Check the current DStv TV guide or available DStv Stream catch-up catalogue for Better Half and confirm that your plan includes channel 151 before arranging a viewing.",
    "limit": "The recorded 8:30 pm launch slot is not a verified permanent repeat schedule. A broadcaster page does not guarantee catch-up rights or streaming on a separate platform."
  },
  "the-ten-2026": {
    "answer": "The Ten is a thriller about ten kidnapping survivors reunited at a vigil. Its first Africa Magic Showcase broadcast was announced for 8 October 2026 at 8:30 pm on DStv 151; the guide links the channel hub only.",
    "decision": "Use the provider's current schedule or account-specific catch-up listings to find a repeat or playable episode; the numeral in the title refers to survivors, not a confirmed ten-episode order.",
    "limit": "Do not infer the full episode count, the mystery's ending, or free on-demand availability from a launch announcement or an Africa Magic channel link."
  },
  "afobaje-2026": {
    "answer": "Afobaje is a Yoruba-language supernatural royal mystery announced for Africa Magic Yoruba, DStv channel 157, beginning 10 October 2026. The original weekend 7 pm announcement is not a live future schedule.",
    "decision": "Search the current Africa Magic Yoruba TV listings for Afobaje and confirm your package access; the official channel hub is not itself a playable episode or theatre ticket.",
    "limit": "A general October slate does not prove current rerun dates, subtitles, a complete cast list or how many episodes have already aired."
  },
  "sirrin-amarya-2026": {
    "answer": "Sirrin Amarya (The Bride's Secret) is a Hausa mystery launched on Africa Magic Hausa channel 156 on 10 October 2026. Its announced 26-episode run should not be mistaken for 26 episodes already available today.",
    "decision": "Consult the live Africa Magic Hausa broadcast guide or supported DStv Stream account for the particular instalment; the broadcaster homepage is a programme gateway, not an episode URL.",
    "limit": "The original Saturday 8 pm launch and planned run cannot establish later repeat times, regional replay rights or the release of a season finale."
  },
  "onu-ahia-nwanyi-2026": {
    "answer": "Onu Ahia Nwanyi follows Nkem through a fictional Igbo bride-selection drama, announced for Africa Magic Igbo channel 159 from 10 October 2026. The broadcaster announcement does not provide a reliable complete cast or total episode count.",
    "decision": "Check today's Africa Magic Igbo DStv/GOtv guide for actual episode times; the source link opens the broadcaster's hub rather than a confirmed on-demand episode.",
    "limit": "Avoid assigning character actors from other Igbo dramas or converting the announced 7:30 pm premiere time into a promise of regular repeats or free viewing."
  }
};
