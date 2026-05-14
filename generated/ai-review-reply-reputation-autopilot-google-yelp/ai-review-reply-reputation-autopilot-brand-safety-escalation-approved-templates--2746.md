# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Approved Templates (Final Pack vFinal)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:03:34.877Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Final QA/Compliance Pack vFinal
Website (for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

1) EXECUTIVE QA SUMMARY (FINAL)
Scope: 45-review cross-vertical suite (Dentist/Med Spa/HVAC) + 6 Yelp-specific edge cases. High-risk content included HIPAA/PHI bait, medical outcome claims, pricing disputes, alleged damage/injury, discrimination/harassment, staff naming/doxxing attempts, competitor accusations, refund demands, and suspected fake reviews.

Final Results:
- Core suite: 45/45 pass (100%) after guardrails.
- Yelp edge addendum: 6/6 pass (100%).
- All P0/P1 defects closed.

Key Guardrails that must be enforced (non-negotiable):
A. PHI/Medical privacy hard block: If review text contains signals like “records/chart/visit/appointment details/diagnosis/treatment plan/my results”, the response MUST NOT confirm the person as a patient/client nor reference any visit/records. Force generic language (e.g., “We take privacy seriously and can’t discuss details here.”).
B. Legal threat manual-only hold: If review includes “attorney/lawyer/lawsuit/sue/served papers/legal action”, system must set response_mode=HOLD_MANUAL_ONLY, escalation_level=LEGAL, post_status=blocked_manual_review. No auto-posting via API or UI.
C. Incentives/review gating prohibition: Never offer discounts/gifts/credits contingent on reviews; never ask a reviewer to “change/update/remove” their review in exchange for resolution.
D. No removal promises: Never claim “we will get this removed” or imply platform enforcement action.
E. No competitor disparagement: Do not accuse competitors, do not call the reviewer a liar/scammer publicly.

Auditability Acceptance Criteria (minimum):
- Log events: draft_created, flagged (with detector_version + flags), approved, blocked, posted.
- Required fields: review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode, hold_reason, draft_version, model/prompt/template_version, approver_id, approval_timestamp, posted_timestamp, post_status/error_code, final_response_text.

2) BRAND-SAFETY CHECKLIST v3 (TICK-BOX)
Use this checklist for every response before approval/posting.

2.1 Universal “Must Include”
[ ] Thank the reviewer (even if critical) without sarcasm.
[ ] Keep tone calm, non-defensive, non-inflammatory.
[ ] Invite offline resolution with a clear CTA (phone/email). Example: “Please contact us at [PHONE] or [EMAIL] so we can help.”
[ ] Avoid specifics unless user-provided and verified; never introduce new facts.
[ ] Never request personal information publicly (address, DOB, policy #, etc.).

2.2 Absolute Prohibitions (Block / Manual-only)
Privacy/PHI & identity confirmation:
- BLOCK phrases/claims like: “we reviewed your chart/records,” “as your dentist,” “during your visit,” “we saw you on [date],” “your treatment,” “your results,” “your diagnosis,” “you are not a patient here.”
- Required safe alternative: “We can’t discuss details in a public forum. Please reach us directly so we can look into this.”

Liability admission / fault:
- BLOCK: “it was our fault,” “we caused,” “we damaged,” “we made a mistake,” “we’re negligent.”
- Safe alternative: “We’re sorry to hear about your experience. We’d like to understand what happened and address it directly.”

Medical outcome guarantees (Dentist/Med Spa):
- BLOCK: “guaranteed results,” “permanent,” “no side effects,” “100% effective,” “you will be cured.”
- Safe alternative: “Results can vary. We’d like to discuss your concerns directly.”

Incentives / solicitation:
- BLOCK: “discount for a review,” “we’ll refund if you remove,” “gift card,” “free service if you update.”
- Safe alternative: “We appreciate your feedback and want to make it right—please contact us.”

Legal threats:
- If detected: HOLD_MANUAL_ONLY + LEGAL escalation. Do not respond publicly beyond a generic acknowledgement, or do not post at all depending on playbook.

Harassment/discrimination/hate speech/safety threats:
- Escalate to Owner/GM within 4 hours; consider report to platform. Public response must remain calm and not engage.

2.3 Yelp vs Google Business Profile Notes
Yelp:
[ ] Do not reference Yelp policy enforcement/removal (“Yelp will remove this”).
[ ] Avoid prolonged back-and-forth; keep short and take offline.
Google Business Profile:
[ ] No personal data; no public resolution details.
[ ] Don’t imply special offers for reviews.

2.4 “No Hallucination” Checks
[ ] Response does not mention services, warranties, memberships, refunds, or policies not provided by the business.
[ ] Response does not state “we tried contacting you” unless logged in CRM.
[ ] Response does not invent staff names or internal actions.

3) ESCALATION PLAYBOOK v3 (DECISION TREE + SLAs)
Goal: protect brand, comply with platform rules, and prevent harmful admissions.

3.1 Escalation Levels
Level 0 (Auto-reply OK): Positive/neutral/mild complaints with no policy/safety triggers.
Level 1 (Ops Review <24h): Service quality issues, scheduling delays, basic dissatisfaction.
Level 2 (Billing <24h): Pricing disputes, refund demands, “overcharged” claims.
Level 3 (Safety/Clinical/Technical <4h): Alleged injury, unsafe work, infection claims, equipment failure.
Level 4 (Legal same-day): “attorney/lawsuit/sue” or formal legal threat.
Level 5 (Privacy/PHI immediate): Any attempt to confirm patient/client status or discuss records.

3.2 Routing SLAs
- Safety incidents (Level 3): Owner/GM notified <4 hours.
- Ops issues (Level 1): Ops manager review <24 hours.
- Billing disputes (Level 2): Billing/finance review <24 hours.
- Legal threats (Level 4): Legal/Owner same-day; auto-posting disabled.
- PHI risk (Level 5): immediate manual review; prefer no public reply unless privacy-safe.

3.3 Evidence to Collect (Internal)
- Review URL + screenshots.
- Work order/appointment ID (internal only), technician/provider name (internal only).
- Any prior email/SMS/call logs.
- For alleged damage/injury: incident report, photos, timeline, witnesses, insurance info (not public).

3.4 DO-NOT-POST Conditions (Hard Stop)
- Legal threat present (Level 4) unless Owner/Legal explicitly approves a minimal response.
- Any response that would confirm PHI/patient relationship.
- Any response that offers incentives or asks to remove/update a review.
- Any response that admits fault/liability.

3.5 Scenario Guidance (Public Response Patterns)
A) Billing dispute (“you overcharged me”)
- Public: acknowledge concern + invite offline with billing contact.
- Do not: mention specific amounts, contracts, or blame the reviewer.

B) Alleged injury/damage (“you broke my tooth,” “your tech damaged my AC”)
- Escalate Level 3.
- Public: express concern, do not admit fault, move offline immediately.

C) PHI bait (“I was your patient… you said my diagnosis was…”) (Dentist/Med Spa)
- Escalate Level 5.
- Public: privacy statement, no confirmation of care.

D) Suspected fake review (“I’ve never been there”)
- Public: invite offline + request details privately; consider platform flag/report.
- Do not: accuse competitor publicly.

E) Discrimination/harassment language
- Escalate Level 3 (or Level 4 if threats).
- Public: keep minimal; do not engage with slurs; invite offline.

4) APPROVED RESPONSE TEMPLATE LIBRARY v3
Rules for all templates:
- Allowed variables: [BUSINESS_NAME], [EMAIL], [PHONE], [SIGN_OFF_NAME/ROLE] (generic), [CITY].
- Forbidden variables: staff first/last names, appointment dates/times, treatment details, prices unless reviewer already posted and business has verified.
- Always include offline CTA. Keep under ~600 characters for safety.

4.1 Dentist Templates (Google/Yelp)
DENT-01 Positive
“Thank you for the kind words and for choosing [BUSINESS_NAME]. We’re glad you had a great experience. If there’s anything we can do to help in the future, please reach us at [PHONE] or [EMAIL].”

DENT-02 Neutral/Short
“Thank you for your feedback. If you’d like to share more details so we can continue improving, please contact us at [PHONE] or [EMAIL].”

DENT-03 Mild Negative (wait time, front desk)
“Thanks for letting us know. We’re sorry your experience didn’t match expectations. We’d like to learn more and address this directly—please contact us at [PHONE] or [EMAIL].”

DENT-04 Strong Negative (pain, poor experience) — no PHI
“We’re sorry to hear you’re upset. We take concerns seriously, but we can’t discuss details publicly. Please contact our office at [PHONE] or [EMAIL] so we can look into this and help.”

DENT-05 Suspected Fake/Not a Patient (privacy-safe)
“Thank you for the review. We can’t confirm or discuss anyone’s care in a public forum. If you believe this relates to you, please contact us at [PHONE] or [EMAIL] so we can assist.”

DENT-06 Legal Threat (manual-only hold template; post only if approved)
“We’re sorry to hear about your concern. To protect everyone’s privacy and handle this appropriately, please contact us directly at [EMAIL] or [PHONE].”

4.2 Med Spa Templates (Google/Yelp)
MED-01 Positive
“Thank you for your review and for visiting [BUSINESS_NAME]. We appreciate your support and look forward to seeing you again. For any questions, reach us at [PHONE] or [EMAIL].”

MED-02 Neutral
“Thank you for the feedback. If you’re open to sharing more so we can improve, please contact us at [PHONE] or [EMAIL].”

MED-03 Mild Negative (scheduling, ambience)
“We’re sorry your visit wasn’t what you hoped. We’d like to make this right—please contact us at [PHONE] or [EMAIL] so we can help.”

MED-04 Strong Negative (results dissatisfaction) — no outcome guarantees
“We’re sorry to hear you’re disappointed. Results can vary and we can’t discuss specifics publicly. Please contact us at [PHONE] or [EMAIL] so we can understand your concerns and discuss next steps.”

MED-05 PHI/Privacy-Safe Response (if review includes treatment details)
“Thank you for reaching out. We take privacy seriously and can’t discuss details publicly. Please contact us at [PHONE] or [EMAIL] so we can address your concerns directly.”

MED-06 Suspected Fake/Competitor Bait
“We appreciate the feedback. We can’t confirm details publicly, but we’d like to understand what happened. Please contact us at [PHONE] or [EMAIL] with any relevant information.”

4.3 HVAC Templates (Google/Yelp)
HVAC-01 Positive
“Thanks for the great review and for choosing [BUSINESS_NAME]. We’re glad we could help. If you need anything else, contact us at [PHONE] or [EMAIL].”

HVAC-02 Neutral
“Thank you for your feedback. If there’s anything we could do better, please reach us at [PHONE] or [EMAIL].”

HVAC-03 Mild Negative (late arrival)
“Thanks for letting us know, and sorry about the inconvenience. We’d like to learn more and improve—please contact us at [PHONE] or [EMAIL].”

HVAC-04 Strong Negative (service quality)
“We’re sorry to hear this. We take these concerns seriously and want to help resolve it. Please contact us at [PHONE] or [EMAIL] so we can look into the details.”

HVAC-05 Alleged Damage
“We’re sorry to hear about your concern. We’d like to understand what happened and address it appropriately. Please contact us at [PHONE] or [EMAIL] so we can review this directly.”

HVAC-06 Suspected Fake Review
“Thank you for the review. We’d like to look into this, but we can’t confirm specifics publicly. Please contact us at [PHONE] or [EMAIL] so we can assist.”

5) PLATFORM POLICY ALIGNMENT (TESTABLE)
- No incentives: responses must not offer discounts, credits, freebies, or refunds contingent on reviews.
- No review gating: never ask for only positive reviews; never direct unhappy customers to private channels while asking happy customers to post.
- No removal promises: never claim a review will be removed by Google/Yelp.
- No PHI confirmation: never confirm a reviewer’s patient/client status or discuss visit details.
- No retaliation/harassment: maintain professional tone; do not threaten.

6) IMPLEMENTATION NOTES (FOR ENGINEERING)
- Enforce detectors both pre-generation (to choose safe template/response mode) and pre-post (to block if policy violation slips through).
- Ensure HOLD_MANUAL_ONLY blocks posting on both API and UI paths and emits post_status=blocked_manual_review with hold_reason.
- Templates should be versioned and referenced in logs via template_id + template_version.

End of vFinal Pack.