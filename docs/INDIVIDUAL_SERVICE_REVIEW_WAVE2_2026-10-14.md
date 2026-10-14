# Individual Service Review — Wave 2 (14 October 2026)

Scope: **21 distinct pre-existing MyNigeriaGuide service URLs individually read and edited**. This is a substantive content review of their answers, requirements, steps and official source notes, not a claim that every portal transaction was personally completed. No new URL or pillar was created.

## Government/agency routes — 12 records

| Canonical slug | Specific correction or clarification | Primary source |
| --- | --- | --- |
| `cac-annual-returns` | Eligibility of pre-July-2025 business names; do not present forthcoming AI annual-return rollout as universally live | https://icrp.cac.gov.ng/ |
| `waec-lost-certificate` | WAEC does not replace ordinary lost certificates; separate statement, paid result confirmation and attestation | https://www.waecnigeria.org/faq |
| `nysc-foreign-trained-registration` | Uploaded credentials are followed by scheduled physical verification; explain when camp verification applies | https://www.nysc.gov.ng/foreignmobreg.html |
| `npc-child-birth-registration` | Account belongs to adult parent/guardian; child aged 0–17 may lack a NIN if parent/guardian has a valid NIN; prevent duplicate child registration | https://www.nationalpopulation.gov.ng/FAQs |
| `cac-certified-true-copy` | Correct entity/document choice; company CTC timetable 12 working hours **subject to complete submission/query resolution** | https://www.cac.gov.ng/services/service-timelines |
| `nysc-call-up-letter` | Dashboard vs institutional call-up printing; do not confuse orientation timetable with release of a personal letter | https://nysc.gov.ng/corpmob.html |
| `passport-change-marital-status` | All NIS-specific documents for marital-status change, in-person biometrics, foreign embassy route | https://immigration.gov.ng/passports/ |
| `fct-file-individual-tax-return` | Tax Returns → File Returns → New Return; assessment year/date, reference number and Parts A–D; old tutorial and current login URLs differ | https://fctirs.gov.ng/howto/steps-on-filling-return/ |
| `jamb-print-result` | Exact ₦1,000 result-slip service + ₦100 CBT charge; e-Facility access and payment caution | https://www.jamb.gov.ng/payment-Services |
| `npc-modify-birth-record` | NPC dashboard plus (+), third option Modify Record, avoid confusing print/download | https://www.nationalpopulation.gov.ng/FAQs |
| `verify-vehicle-number-plate` | FRSC NVIS plate-number form and submission; separate plate lookup from proof of vehicle ownership | https://nvis.frsc.gov.ng/VehicleManagement/VerifyPlateNo |
| `nafdac-product-verification` | Distinguish NAFDAC iRIMS Verify Product from new product registration and compare registration holder with package | https://services.nafdac.gov.ng/ |

## Commercial services — 9 records

| Canonical slug | Specific correction or clarification | Provider source |
| --- | --- | --- |
| `avon-provider-directory` | Provider lookup may load asynchronously; do not equate directory membership with coverage under every plan | https://app.avonhealthcare.com/find-my-provider |
| `moniepoint-pos-terminal` | ₦21,500 itemised into caution, logistics and year-one insurance; advertised delivery target is not guaranteed | https://www.moniepoint.com/ng/business/point-of-sale-terminal |
| `unity-business-account-opening` | Legal-name/RC matching; public account-creation form is a starting application, not a live funded account | https://corporate.unitybankng.com/account/create-account |
| `ups-track-package-nigeria` | Number-based tracking and status/exception checks; avoid scam payment links | https://www.ups.com/track |
| `uber-reserve-ride-nigeria` | Up to 30 days in advance, varying Economy/Premium wait times; availability and fee depend on location | https://help.uber.com/en/riders/article/i-need-help-with-a-reservation?nodeId=cabcfe4f-fa54-4f97-a687-5584d3e87f51 |
| `uber-request-ride-online-nigeria` | Browser flow through Uber's ride interface, rider-account login and request-for-someone-else route | https://www.uber.com/ng/en/ride/how-it-works/request-an-uber-ride-without-the-app/ |
| `sendbox-track-shipment-nigeria` | **Important:** Sendbox's tracking API documentation describes an authenticated developer endpoint, not a public tracking form; redirect ordinary users to their shipment account or sender | https://docs.sendbox.co/shipping/track-shipment |
| `hotelsng-add-hotel` | Free listing, permission requirement when submitting a hotel not owned, and follow-up process | https://hotels.ng/hotel/add |
| `cowrywise-withdraw-from-stash` | Same-BVN receiving bank, PIN and approximately 24-hour processing; fees can differ by transaction | https://help.cowrywise.com/en/articles/5744582-how-to-withdraw-from-stash |

## Method and limitations

For each named URL, inspect the existing canonical record, compare user-visible process claims to the supplied primary source, rewrite the first answer and sequential instructions, keep the real fee/deadline/coverage caveats, retain the official source and related links, and ensure claims and accessibility do not regress.

- Strong primary sources were directly reviewed for the substantive claims above.
- Certain authenticated or client-rendered flows (e.g. Unity Bank account creation, insurer directory search) do not expose their *entire signed-in workflow* through a public read-only audit. Wording about later steps is deliberately qualified rather than represented as an end-to-end tested transaction.
- Source snapshots are dated 14 October 2026. Prices, service eligibility, payment routes and company product terms can change without notice.
- **No comprehensive verification of all 668 static service records or other runtime-generated pages is claimed.** A separate catalogue-wide structural scan checks missing/duplicate records; the substantive external fact checks listed here apply to these 21 records only.
- Owner's change-scoped test policy remains. Test: `node --test tests/individual-service-actions-wave2-20261014.test.mjs`. No unrelated broad suites.

Pre-existing service pages retain their URLs. The four pillars remain Movies & Entertainment, Services, Tour Nigeria and Jobs & Careers.
