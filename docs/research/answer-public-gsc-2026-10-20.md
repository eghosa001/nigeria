# Search-intent implementation — 20 October 2026

## Scope and provenance
Connected GSC Wizard, property `sc-domain:mynigeriaguide.com`, Web search, settled 21 September–18 October 2026. Property totals: **716 clicks**, **59,144 impressions**, **1.21% CTR**. These are observed appearances of our pages in Google Search, *not* estimated Nigeria-wide search volumes. Queries may be anonymised or missing from the reported query rows.

This pass follows `docs/PUBLISHING_STANDARD.md`, leaves the four pillar canonicals intact and makes **no new thin landing pages**, inferred fees, invented reviews, or speculative cast assignments. A simple variant of a Google query is not evidence that a second URL should exist.

## Edits
| Pillar | Existing canonical | Change | Evidence |
| --- | --- | --- | --- |
| Services | `/services/aedc-map-refund` | Add DisCo complaint ticket/Consumer Forum escalation to already documented meter/token recovery | [NERC MAP FAQ](https://nerc.gov.ng/faq/metering/), [NERC complaint procedure](https://nerc.gov.ng/need-help/services/how-to-file-a-complaint/) |
| Services | `/services/ibedc-map-refund` | Same NERC escalation without changing IBEDC-specific oldest-token-first rule | Same |
| Services | `/services/passport-application-tracking` | Explain the January 2026 NIS **PRODUCED** status and safe next step, distinct from payment or issuance | [Official NIS tracker](https://track.immigration.gov.ng/), [NIS announcement reported by Channels](https://www.channelstv.com/2026/01/15/nis-updates-passport-tracking-system-amid-public-outcry-over-delay/) |
| Jobs | Government & public service topic | Practical FCSC vacancy authenticity, official deadline, and recruitment-payment warning | [Federal Ministry of Information, 21 Aug 2026](https://fmino.gov.ng/fcsc-debunks-unauthorised-recruitment-links-urges-public-to-verify-information-through-official-channels/) |
| Tour | `/explore/detty-december-lagos-2026` | Avoid redundant year in search title and answer venue/date/entry-price search | [Organiser calendar](https://dettydecfest.com/events/), [DOT TIX opening ticket](https://tix.dot360.co/event/detty-december-festival-grand-opening-event) |
| Entertainment | `/entertainment/movies/forever-isnt-long-enough-2025` | Put verified cast and original Royal Arts source before generic catalogue wording | Existing verified publisher credits and separate film profile; distinct from 2026 `Long Enough` |

The AEDC, IBEDC and passport-tracking guide records were **substantively reverified on 20 October 2026** against newly cited regulator and issuer-reporting evidence, so their record-level `lastVerified` fields match the newly added source checks. Unrelated records and prose-only changes received no verification-date resets.

## Important measured search demands and deliberately held edits
| Search, settled through 18 Oct | GSC impressions/clicks | Reason not to force another modification |
| --- | --- | --- |
| `oversabi aunty cast` | 1,009 / 6 | The canonical already has sourced actor-to-character assignments, a targeted snippet and official viewing distinctions. Wait for a full post-change comparison; no padding. |
| `aedc map refund` | 616 / 0 | Add genuinely useful dispute resolution instead of repeatedly rewriting its already targeted title. |
| `ibedc map refund` | 164 / 0 | Same; preserve exact token-order instructions. |
| `forevers not long enough movie` | 993 / 0 | Search users reach a separate 2025 curated film and noindex/canonical video path. Keep film identities separate, make the movie metadata useful; **do not** merge with distinct `Long Enough (2026)`. |
| `kainji dam` | 260 / 0 | The canonical already correctly answers location, 1968 commissioning, 760 MW nameplate power and restricted visitor access. Do not invent entry fees or promise access. |
| `western union tracking` | 235 / 0 | Existing canonical already provides genuine 10-digit MTCN, official site, pickup identity and scam guidance; broad worldwide searches may not intend a Nigeria guide. |
| `once upon a village 3` | 119 / 0 | Existing official RuthKadiri247 video and reviewed cast metadata; don't create third duplicate page. |

## Measurement plan
After deployment and a full settled 28-day observation window, compare **query + landing page**, not isolated query totals: clicks, impressions, CTR, position, and the specific new metadata displayed in Google. Recheck official portals and concert tickets whenever they change. Report no improvement unless the data supports one.

## Focused validation
`node --test tests/gsc-answer-public-20261020.test.mjs`. No repo-wide testing warranted for targeted data, copy, and metadata edits.
