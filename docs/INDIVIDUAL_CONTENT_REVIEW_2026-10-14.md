# Individual content reviews — 14 October 2026

This log distinguishes **record-level checks against identified public sources** from automated structural validation. A source-backed edit is not a guarantee that a dynamic price, vacancy or facility will remain unchanged later. This is **not** a certification that every MyNigeriaGuide page has individually been independently fact-checked.

## Source-backed individually reviewed records

| Pillar | Canonical slug | Review and correction | Supporting primary or publication record |
| --- | --- | --- | --- |
| Services | `passport-renewal` | Replace generic summary with concrete domestic fee bands, correct online + biometric next steps, add diaspora distinction | [NIS passport fees announcement](https://immigration.gov.ng/nigeria-immigration-service-announces-upward-review-of-nigerian-standard-passport-fees/) |
| Services | `renew-drivers-licence` | Explain renew-vs-reissue, fee bands and application/collection stages without imposing unverified BIR payment | [FRSC licence FAQ](https://nigeriadriverslicence.frsc.gov.ng/faq) |
| Services | `jamb-profile-code` | Put `NIN 00123456789` → 55019/66019 in the first sentence | [JAMB FAQ](https://www.jamb.gov.ng/FAQ) |
| Services | `jamb-retrieve-lost-epin` | Put `UTMEPIN` action first; distinguish from `DEPIN` | [JAMB handbook](https://jamb.gov.ng/PDFs/2024/Centres_Handbook.pdf) |
| Services | `waec-collect-certificate` | Distinguish school vs private candidate collection points | [WAEC FAQ](https://www.waecnigeria.org/faq) |
| Services | `nysc-lost-exemption-certificate` | State **no reprint**, Letter of Confirmation, and exact home/foreign-trained request routes | [NYSC exemption certification](https://www.nysc.gov.ng/certcollectexp.html) |
| Services | `nin-date-of-birth-modification` | Remove repeated warnings and explicitly flag the differing NIMC published figures instead of asserting consensus | [NIMC Fees](https://nimc.gov.ng/fees) and [adult modification](https://nimc.gov.ng/nin/nin-modifications-adults/); JavaScript-only pages prevent fresh independent numerical confirmation |
| Services | `jamb-2026-utme-registration` | Put the 2026 prices and candidate sequence in the first answer; clarify historical cycle ≠ currently open applications | 2026 JAMB training manual already attached to the guide; [JAMB FAQ](https://www.jamb.gov.ng/FAQ) |
| Services | `neco-check-result` | Clarify exact four inputs, token-purchase option and status uncertainty | [NECO Results Portal](https://results.neco.gov.ng/) |
| Movies & Entertainment | `what-love-is` | Confirm two credited leads and original Maurice Sam TV film; do not invent other cast/character credits | [Maurice Sam TV original upload](https://www.youtube.com/watch?v=ORIBBpN7YMs) |
| Movies & Entertainment | `love-on-credit-2026` | Add genuine film-specific cast, original publisher, 4 October release, director, producer and verified technical crew; leave unsourced character roles unassigned | [FilmFlux film-level record](https://filmflux.app/movie/1289e5ca-44a0-4efb-b8cb-6b0f17fa3de4-love-on-credit) |
| Tour Nigeria | `obudu-mountain-resort` | Rewrite for Obanliku location, current concession vs actual facility operation, travel, booking, cable car, price/access decisions | [Cross River State 8 August concession announcement](https://news2.crossriverstate.gov.ng/obudu-ranch-concession-will-transform-obanliku-create-jobs-boost-tourism-gov-otu/) |
| Tour Nigeria | `lagos-abeokuta-ibadan-train-guide` | Add both day-specific Lagos departures and Ibadan returns; maintain official schedule-not-live distinction | [Nigerian Railway Corporation schedules](https://nrc.gov.ng/schedules/) |
| Jobs & Careers | `eha-dental-assistant-lagos-2026` | Document Sangotedo location, qualifying diploma/licence, actual employer-posted gross pay and benefit terms; link via current directory because the old individual URL intermittently returns 404 | [EHA jobs directory](https://erp.eha.ng/jobs) and [Dental Assistant listing](https://erp.eha.ng/jobs/dental-assistant-lagos-585) |
| Jobs & Careers | `eha-pharmacist-abuja-2026` | Document exact location, employer-posted gross pay and minimum two years' post-NYSC pharmacy experience and practice licence | [EHA Pharmacist listing](https://erp.eha.ng/jobs/pharmacist-546) |

**Total individually reviewed and modified in this pass: 15 records.** Primary sources were checked directly where accessible. The NIMC numerical contradiction remains unresolved and is explicitly presented as such. The JAMB 2026 price derives from the previously sourced 2026 manual rather than a live new registration notice.

## Structural per-record audit (not independent fact checking)

All **668 entries** across the six checked-in service JSON collections were evaluated individually for duplicate slugs, missing source records, review date coverage, extremely short summaries, missing notes, very short steps and unlinked portal instructions. Before the edits, the scan found:
- Zero duplicate service slugs and zero wholly source-free records in those six files.
- Four unusually brief summaries (all four addressed in this pass).
- Twenty-one entries containing at least one short step. Short steps are a manual triage signal, **not** proof of misinformation.
- A preliminary repeated-word heuristic flagged many notes but is too imprecise to classify them as duplicates; it must not trigger automatic rewrites.

The six JSON collections do not equal the complete rendered website. Additional generated/runtime service records and thousands of YouTube details, movie dossiers, tour place records, and jobs require their own individual evidence checks.

## Still unverified, not scored as passed

- Every claim on every remaining live URL, current streaming access, every recruitment application form, all dynamic fees, live tourist admission and railway departure operations.
- Every page's actual 320/360/390/768/1280px layout, mobile controls, dark mode, Core Web Vitals, accessibility and realistic visitor retention.
- A comprehensive sitewide link crawl and human-level proofreading of every record; automated structural checks are not substitutes.

The owner-mandated four pillars, existing canonicals, source links, no-invented-facts rule and minimal change-scoped testing policy remain in effect.
