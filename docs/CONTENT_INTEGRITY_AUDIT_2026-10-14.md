# MyNigeriaGuide — cross-pillar content-integrity audit

14 October 2026. Scope: public-site examples and source-level inspection of the shared Services, Movies & Entertainment, Tour Nigeria and Jobs & Careers renderers. This is **not** a claim that every published page has been individually fact-checked.

## Confirmed defects and fixes in this change

| Priority | Evidence / root cause | Change | Verification |
| --- | --- | --- | --- |
| P0 | Service requirement purpose matching used the unbounded regular expression `tax id|tin|asin|payer id`; substrings inside unrelated descriptions could be treated as tax identifiers and described as locating a taxpayer. Examples reported on NIN enrolment, driver licensing and pension guides. | Token-bounded tax-ID matching; omit unverified purposes, step matching and document formats. | Focused test for unrelated requirements vs standalone TIN. |
| P0 | Expired opportunities can remain visible on archive/mixed collection pages. | Explicit closed label after the Nigerian-local deadline; open opportunities sort before expired entries. Existing request-time `getEffectiveJobStatus` is retained; do not delete history or hide post-deadline follow-up. | Focused expired-on-14-October test. |
| P1 | `MKO` listed historical subjects as movie cast, including `actor` schema. | Move historical figures to `subjects`; render a subjects section and emit `about`, not `actor`. Avoid generic “starring” language on documentary pages. | Focused documentary metadata/source test. |
| P1 | Several Services components repeated requirements, fees, generic FAQs, and artificially generated evidence text. | Condense generic FAQ disclosures, remove unsupported “keep screenshot/payment receipt” copy, make step explanation optional, put first step in answer-first summary, correct free NIN enrolment aftercare. | Focused empty-evidence test. |
| P1 | A page could imply compulsory physical attendance solely because a supporting paragraph mentioned `centre`, `office` or `collection`. | Infer compulsory attendance from actual step instructions and verbs; do not misinterpret selecting a processing centre online. | Online vs hybrid test. |
| P1 | Job profession/location filters scanned description and qualifications, matching incidental terms. Internships included all source notes; government development programmes shared the recruitment list. | Profession matches role/field, location matches actual location, internship matches role/audience/field; segregate government-backed development programmes and exclude them from job recommendations. | Inspect relevant collection pages with example search intents. |
| P2 | Itinerary and event pages inherited destination-specific generic questions such as “What should I see in [itinerary name]?” | Generate itinerary-stop and event-activity questions, action-specific preparation labels and headers. | Focused source/intent test. |

## Additional cross-pillar review findings

- **Services**: The data-backed step/requirement list should remain complete even when the source cannot support an explanation. “Why needed” and original/copy/upload must never be invented. The last-verified date is not proof that a fee or portal still works today.
- **Movies**: Only verified performers may appear in `Movie.actor`. Subjects, narrators, archival material, interviewees and performers need distinct credit types before expanding documentary records. Official YouTube full releases should not inherit generic subscription warnings.
- **Tour**: Distinguish event attendance, itineraries and destinations. Prioritize actionable verified venue/transport/access details; unknown prices and access should remain unknown rather than filled with estimates.
- **Jobs**: An expired application may have a valuable follow-up page, but is not an open vacancy. Development/mentorship programmes should be clearly separated from employment. Validate the employer's live source before stating that applications are open.

## Editorial work not proven by this source-level patch

1. Verify every changing fee, government rule, salary, opening hour, application window, legal streaming right, film performer/character credit and travel access claim against primary sources **record by record**; correct or unpublish anything unsupported. The NIMC DOB modification page already notes inconsistent official NIMC fee pages; do not silently force one amount.
2. Inspect the full published URL inventory for broken outbound links, duplicate intent/canonicals, orphaned destinations, thin generic pages, incorrectly populated `FAQPage`, `JobPosting`, `Movie` or `BreadcrumbList` markup, and missing source timestamps.
3. Check mobile, tablet and desktop interaction, contrast, keyboard navigation, touch targets, Core Web Vitals, ad layout shift and user navigation in light and dark modes; these were not measured in this change.
4. Verify live Cloudflare deployment and caches against the merged commit; a GitHub source correction is not a deployed-site verification.

Do not assign a universal “9/10” score without live measurements or treat published content counts as proof of quality. Preserve the existing four-pillar structure and owner-required change-scoped CI policy.
