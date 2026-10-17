import type { Service } from "@/lib/types";

/**
 * Individually authored failure-mode analyses for existing high-intent service
 * guides. These are conditional reader decisions, not simulated tests or an
 * assertion that forms/fees are presently available. Source provenance remains
 * on the underlying guide; only use where that guide carries issuer sources.
 */
export type ServiceScenario = {
  situation: string;
  reasoning: string;
  verification: string;
  alternativeSlug: string | null;
};
export const serviceScenarioDossiers: Record<string, ServiceScenario[]> = {
  "passport-renewal": [
    {
      "situation": "You cannot produce the existing passport booklet",
      "reasoning": "Do not simply select an ordinary renewal because the booklet has expired. A passport that was lost or stolen belongs on the NIS replacement route, which may request incident evidence and has different handling.",
      "verification": "Before paying, establish whether you can present the old booklet for the biometric visit. If not, read the lost-passport process first.",
      "alternativeSlug": "lost-nigerian-passport"
    },
    {
      "situation": "Your NIN and passport carry different names or birth dates",
      "reasoning": "Identify which underlying record is actually wrong before submitting another application. Editing the renewal form does not itself correct the NIMC record or authorise a passport data change.",
      "verification": "Compare the original passport, NIN and civil evidence. If the passport needs changing, use NIS correction of data rather than a standard renewal.",
      "alternativeSlug": "passport-change-of-data"
    },
    {
      "situation": "You paid but have no appointment or collection date",
      "reasoning": "A payment receipt is not biometric enrolment, and the published reissue service target starts after enrolment. It cannot be used to promise a collection date from the day you paid.",
      "verification": "Locate the acknowledgement and booking details first; use the separate tracking route to check actual processing before arranging travel.",
      "alternativeSlug": "passport-application-tracking"
    }
  ],
  "passport-application-tracking": [
    {
      "situation": "Your payment is successful, but the passport tracker finds no record",
      "reasoning": "The payment/receipt search and the passport-production tracker are different NIS services. A successful charge does not establish that enrolment occurred or a booklet is in production.",
      "verification": "Use the application and reference numbers from the same acknowledgement. Check the original receipt route separately rather than treating its result as passport readiness.",
      "alternativeSlug": "passport-renewal"
    },
    {
      "situation": "Two NIS numbers look interchangeable on your screenshots",
      "reasoning": "An Application Number and Reference Number label different fields in the dedicated tracking form. A payment transaction identifier may be neither of them.",
      "verification": "Return to the original NIS confirmation, copy each field into its matching input, and do not borrow identifiers from another submission.",
      "alternativeSlug": null
    },
    {
      "situation": "A travel agent says your passport is ready because the receipt exists",
      "reasoning": "Do not plan a fixed collection date from payment alone. The right next action depends on the current official status and whether NIS has completed the in-person requirements.",
      "verification": "Wait for an NIS status or office collection instruction; do not forward both identifiers to an unverified intermediary.",
      "alternativeSlug": null
    }
  ],
  "nin-date-of-birth-modification": [
    {
      "situation": "Your birth certificate disagrees with the date you want on NIN",
      "reasoning": "Resolve which civil record is authoritative before initiating a paid modification. Uploading an unsupported date into NIMC can create further mismatches with JAMB, passport and bank identity records.",
      "verification": "Check the correct NPC certificate or eligible attestation first; do not submit two inconsistent versions of your date of birth.",
      "alternativeSlug": null
    },
    {
      "situation": "Two NIMC pages give different modification prices",
      "reasoning": "The conflicting NIMC figures should remain visible, not averaged or silently replaced. The applicable request and payment invoice are what need checking, not an agent's quoted 'standard price'.",
      "verification": "Confirm the live authorised NIMC invoice and payment purpose before paying. If the official pages still disagree, ask NIMC to clarify.",
      "alternativeSlug": null
    },
    {
      "situation": "You paid for a correction but the old date still appears",
      "reasoning": "Payment, submission, approval and issuance of an updated slip are separate stages. Starting a duplicate paid correction may make it harder to identify the original pending request.",
      "verification": "Track the original transaction and verify NIMC approval. Only then use the applicable updated-slip or reissue route.",
      "alternativeSlug": "nin-slip-reissue"
    }
  ],
  "nin-sim-linkage": [
    {
      "situation": "The SIM is registered to a family member, but you own the phone",
      "reasoning": "Using the handset is not the same as being the registered subscriber. Linking your own NIN to another person's registered SIM is not a substitute for correcting the operator's ownership record.",
      "verification": "Ask the network about its authorised ownership or re-registration process instead of submitting a borrowed identity.",
      "alternativeSlug": null
    },
    {
      "situation": "Your NIN is valid, but linkage still fails",
      "reasoning": "A valid NIN does not guarantee that the mobile operator's SIM-registration details match the NIMC identity. The failure may be in the operator's customer record rather than the NIN itself.",
      "verification": "Ask the operator which recorded field fails validation; correct the relevant system through its issuer rather than buying another NIN.",
      "alternativeSlug": null
    },
    {
      "situation": "You submitted the number but never received a final linkage confirmation",
      "reasoning": "A submitted request is not the same as a validated link. Repeating the initial submission does not tell you which stage is outstanding.",
      "verification": "Check the operator's recorded linkage status first and retain the official failure reason, then follow its correction procedure.",
      "alternativeSlug": "check-nin-sim-linkage-status"
    }
  ],
  "nin-slip-reissue": [
    {
      "situation": "You know your eleven-digit NIN, but the paper slip is gone",
      "reasoning": "A missing slip is a document-replacement problem, not a request for a second identity number. Do not start new NIN enrolment to recover paper evidence.",
      "verification": "Identify the legitimate reissue route and any loss-specific documents NIMC asks for; keep the existing NIN unchanged.",
      "alternativeSlug": "check-nin-number"
    },
    {
      "situation": "Your slip is damaged rather than lost or just updated",
      "reasoning": "NIMC describes different evidence for damage, theft/loss and a reissue after a data modification. Choosing the wrong payment purpose can leave you with an unusable receipt.",
      "verification": "Match your actual reason to the official evidence list before generating an invoice; a post-modification request needs the modification record.",
      "alternativeSlug": null
    },
    {
      "situation": "The published reissue fee differs across NIMC pages",
      "reasoning": "An old page and a dedicated fees table currently disagree. Do not claim a single confirmed fee simply because a third-party blog repeats it.",
      "verification": "Check the exact purpose and amount generated by the authorised NIMC/Remita route and retain the official receipt.",
      "alternativeSlug": null
    }
  ],
  "jamb-profile-code": [
    {
      "situation": "A parent, sibling or cybercafé offers you a spare phone number",
      "reasoning": "The number used to obtain a JAMB profile code becomes tied to the candidate's record. Sharing a number can create later recovery and identity problems even if the first SMS succeeds.",
      "verification": "Use a number you control for later transactions and verify the NIN belongs to the actual candidate before paying for an e-PIN.",
      "alternativeSlug": null
    },
    {
      "situation": "The SMS returned a profile code, but you have not registered",
      "reasoning": "A JAMB profile code establishes a candidate identifier; it is not the paid e-PIN and does not confirm completed UTME or Direct Entry registration.",
      "verification": "Keep the code and linked SIM. Follow the separate e-PIN and accredited-centre registration stages only when the current exercise permits.",
      "alternativeSlug": "jamb-2026-utme-registration"
    },
    {
      "situation": "The text fails or returns a different identity",
      "reasoning": "Repeatedly buying registration products is not a remedy for a phone/NIN biodata mismatch. The fault must be isolated before the candidate reaches a CBT centre.",
      "verification": "Check the exact NIN format, airtime and linked number; use JAMB support or the responsible identity issuer if the biodata itself is wrong.",
      "alternativeSlug": null
    }
  ],
  "jamb-caps": [
    {
      "situation": "Your school lists you as admitted, but CAPS says no offer",
      "reasoning": "A school screening list and a JAMB-recognised CAPS offer are not interchangeable records. Do not act as though an unshown CAPS offer has been accepted.",
      "verification": "Verify the selected admission year and O-level upload, then ask the institution's admission office about the JAMB processing stage.",
      "alternativeSlug": null
    },
    {
      "situation": "The CAPS login asks you to reset an institution-issued password",
      "reasoning": "That screen belongs to institution staff, not the candidate e-Facility flow. The presence of an official JAMB logo does not make every login usable with a student's credentials.",
      "verification": "Return to the candidate's own e-Facility dashboard, then choose the admission service available for that record.",
      "alternativeSlug": null
    },
    {
      "situation": "You accepted an offer but need a printable admission letter",
      "reasoning": "Acceptance and paid issuance of an admission letter are different transactions. A screenshot of CAPS status is not automatically the formal document requested by a school.",
      "verification": "Check whether the institution specifically asks for the JAMB Admission Letter, and use that separate official service if needed.",
      "alternativeSlug": "jamb-admission-letter"
    }
  ],
  "waec-check-result": [
    {
      "situation": "Your candidate number is right but the result search returns nothing",
      "reasoning": "A correct number can still be looked up against the wrong examination year or school/private-candidate type. More card purchases will not fix a mismatched search category.",
      "verification": "Compare the result-checker form with the candidate's examination record, including type and year, before trying the PIN again.",
      "alternativeSlug": null
    },
    {
      "situation": "You can see grades, but a university requests formal confirmation",
      "reasoning": "An online result display answers 'what grades are recorded?' It is not automatically an institution-addressed result confirmation or the original certificate.",
      "verification": "Ask the receiving institution which exact document it accepts and follow WAEC's separate confirmation/certificate service where required.",
      "alternativeSlug": null
    },
    {
      "situation": "The card has been used repeatedly and now fails",
      "reasoning": "A voucher-use limit is different from a missing candidate result. Do not tell the applicant the result has been withheld solely because a checker card stopped working.",
      "verification": "Check the permitted card uses and official WAEC instructions before purchasing another PIN.",
      "alternativeSlug": null
    }
  ],
  "neco-check-result": [
    {
      "situation": "A valid token returns no record for a candidate",
      "reasoning": "Result tokens and the examination session are separate inputs. A registration number from one NECO exam type will not necessarily work in a different session.",
      "verification": "Re-check the registration number, exact exam type and examination year against the candidate's original exam documents before buying a second token.",
      "alternativeSlug": null
    },
    {
      "situation": "You paid for a token but have not opened any result",
      "reasoning": "Purchasing a token is not the same as checking the candidate's result or obtaining an issued certificate. Each is a separate step and has different evidence.",
      "verification": "Find the token in the official purchase account or receipt and enter it into the NECO Results Portal instead of paying again.",
      "alternativeSlug": null
    },
    {
      "situation": "An employer needs a certificate, not a screenshot",
      "reasoning": "The online result view can help you inspect recorded grades, but does not by itself prove that the formal certificate or issuing-organisation verification has been supplied.",
      "verification": "Ask for the required certificate or direct verification route rather than submitting a result-checker screenshot as if it were the same document.",
      "alternativeSlug": null
    }
  ],
  "bvn-retrieval": [
    {
      "situation": "The phone number was used by more than one BVN holder",
      "reasoning": "NIBSS does not return an individual BVN over *565*0# where the phone number corresponds to multiple BVNs. Another paid attempt from that number does not resolve which record to reveal.",
      "verification": "Use the bank's identity-verified retrieval process rather than repeated USSD deductions.",
      "alternativeSlug": null
    },
    {
      "situation": "You changed or lost the phone number used for BVN enrolment",
      "reasoning": "The retrieval code checks the previously registered telephone line, not every active SIM linked to your bank account. A working new number may return no BVN.",
      "verification": "Ask an authorised bank for the supported recovery or demographic amendment route, with ID; do not register a fresh BVN to retrieve an existing one.",
      "alternativeSlug": "bvn-data-update"
    },
    {
      "situation": "A website offers BVN 'verification' when you only forgot yours",
      "reasoning": "Retrieval (*565*0#) and validation (*565*1#) answer different questions. Validation checking a name is not a recovery service or proof of bank-account ownership.",
      "verification": "Choose retrieval for your own forgotten number. Never enter BVN details on a third-party recovery form.",
      "alternativeSlug": "bvn-validation"
    }
  ],
  "cac-business-name-registration": [
    {
      "situation": "CAC reserved your proposed name but no business certificate appears",
      "reasoning": "Name reservation provides an AV Code for the next step; it is not the completed business-name registration. The registration application still requires proprietor details, uploads and its own approval status.",
      "verification": "Use the AV Code with Register New Business, then check the registration dashboard for Approved before describing the business as registered.",
      "alternativeSlug": null
    },
    {
      "situation": "Your application shows Queried rather than Approved",
      "reasoning": "A query calls for a specific amendment, not an entirely new business registration or an agent's special clearing fee.",
      "verification": "Use Action → View Query History to read CAC's actual objection, then Modify Application and submit the corrected record.",
      "alternativeSlug": null
    },
    {
      "situation": "One proprietor uploaded ID but the others did not",
      "reasoning": "On the new iCRP, selecting image files is not enough if a proprietor's document set has not been saved. Missing one person's photo or signature can leave an otherwise complete form deficient.",
      "verification": "Check that identification, photograph and signature were added for each named proprietor before the final preview.",
      "alternativeSlug": null
    }
  ],
  "cac-company-registration": [
    {
      "situation": "You want a trading name for yourself, not necessarily a new company",
      "reasoning": "A company incorporation application and a business-name filing create different types of registered entities and have different information requirements. Do not pay for incorporation solely because a name search succeeded.",
      "verification": "Decide the entity structure first; if you only need a business name, compare CAC's separate proprietor route before proceeding.",
      "alternativeSlug": "cac-business-name-registration"
    },
    {
      "situation": "Your AV Code was accepted but company incorporation still says Pending",
      "reasoning": "CAC's FAQ distinguishes automated business-name registration from company applications that remain manually reviewed. An instant name approval is not an instant company approval.",
      "verification": "Wait for the actual incorporation status or reply to an official query. Download a company certificate only when CAC makes it available.",
      "alternativeSlug": null
    },
    {
      "situation": "Shareholder details and proposed control records do not match",
      "reasoning": "Unlike a basic name search, a company filing records legal officers and ownership information. Inconsistent officer/share details should be reconciled before paying and declaring the filing ready.",
      "verification": "Use the selected entity type's actual CAC form and review director, shareholder and beneficial-ownership information against the supporting records.",
      "alternativeSlug": null
    }
  ],
  "nysc-senate-list": [
    {
      "situation": "You graduated but the Senate List checker shows no matching name",
      "reasoning": "Graduation and institutional submission to NYSC are different milestones. A missing record should not be 'fixed' by paying a third-party portal to add your name.",
      "verification": "Give the matriculation and identity details to your school's Student Affairs or mobilisation office and ask which upload or correction stage remains outstanding.",
      "alternativeSlug": null
    },
    {
      "situation": "The record is present under inconsistent personal details",
      "reasoning": "A visible entry with incorrect surname, date of birth or matriculation number is not a reason to register with a second identity.",
      "verification": "Ask the institution how it corrects its submitted mobilisation record before beginning the NYSC registration stage.",
      "alternativeSlug": null
    },
    {
      "situation": "Your name is on the Senate List, but registration is not open",
      "reasoning": "Presence on a list is an eligibility prerequisite, not a promise that the next mobilisation window has started.",
      "verification": "Monitor NYSC's official registration notice and use the matching details when an active registration window opens.",
      "alternativeSlug": null
    }
  ],
  "nysc-call-up-letter": [
    {
      "situation": "Your dashboard contains a call-up number but no printable letter",
      "reasoning": "The number and the released deployment letter can appear at different stages. A displayed number does not imply that camp allocation details have been published.",
      "verification": "Wait for NYSC's official letter release and use the printing or institution-collection route applicable to your registration.",
      "alternativeSlug": null
    },
    {
      "situation": "You saw a camp timetable shared online, but the print button is absent",
      "reasoning": "An orientation date announcement is general scheduling information; it is not proof that your individual call-up letter is issued.",
      "verification": "Check the official NYSC dashboard for your record rather than buying an unofficial letter or relying on an undated screenshot.",
      "alternativeSlug": null
    },
    {
      "situation": "A forwarded camp list conflicts with the address on your letter",
      "reasoning": "Your own issued letter specifies the assigned state, venue and reporting instructions; a group-chat list cannot replace it.",
      "verification": "Read the individual letter and NYSC's latest authorised correction or change notice before travelling.",
      "alternativeSlug": null
    }
  ]
};

export function getServiceScenarioDossier(service: Service): ServiceScenario[] {
  if (!service.sources.length) return [];
  return serviceScenarioDossiers[service.slug] ?? [];
}
