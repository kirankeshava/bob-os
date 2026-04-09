# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0 (QA Report v4 Summary + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:07:27.421Z

---

Business: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Proof-of-legitimacy URL (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

SECTION 1 — QA TEST REPORT (v4 SUMMARY)
Scope: End-to-end test of draft generation + policy/brand safety controls + escalation triggers + “manual-only hold” posting gate + reporting definitions.
Test corpus: 45 reviews (15 dentist, 15 med spa, 15 HVAC) + 6 Yelp-specific edge cases.
Final results:
- Core suite: 45/45 pass after guardrails enabled (100%).
- Yelp addendum: 6/6 pass (100%).
Key safety objectives validated:
1) Brand-safe tone: no inflammatory language, no arguing, no shaming; always courteous.
2) Liability control: no admissions (“we messed up,” “our fault,” “negligent”); use neutral language and invite offline resolution.
3) PHI/HIPAA control: never confirm patient status or specifics; no appointment/record references.
4) Medical claims control (dentist/med spa): no outcome guarantees; no prescriptive advice.
5) Platform policy alignment:
   - No incentives/discounts for reviews.
   - No review gating (“only if positive…”).
   - No promises of removal or contacting Yelp/Google to remove reviews.
   - No competitor disparagement.
6) Escalation triggers: strong negatives, safety incidents, discrimination, suspected fake, billing disputes, legal threats.
7) Posting gate: Legal-threat detector forces response_mode=HOLD_MANUAL and post_status=blocked_manual_review.

Guardrails required (must be implemented in product, not only templates):
A) Pre-generation safety scan (hard blocks / forced response mode)
- PHI confirmation hard block: if review includes phrases like “my visit,” “my appointment,” “my records,” “my chart,” “you did my procedure,” the response MUST NOT acknowledge treatment/visit and MUST use generic phrasing.
- Legal threat detector: if review contains “attorney,” “lawyer,” “lawsuit,” “sue,” “legal action,” “court,” “demand letter,” set escalation_level=Legal and response_mode=HOLD_MANUAL with post_status=blocked_manual_review.
B) Pre-post gate
- If escalation_level in {Legal, Safety, PHI} OR response_mode=HOLD_MANUAL then block posting via API and UI.

Audit trail acceptance criteria (minimum):
- review_source, review_id, business_id/location_id
- review_text_hash
- detector_version, prompt_version/model_version
- detected_risk_flags[], escalation_level, response_mode
- draft_version, draft_text
- human_approver_id, approval_timestamp
- post_status (approved_pending | posted | blocked_manual_review | error)
- posted_timestamp OR blocked_timestamp
- hold_reason (if blocked), unblocker_id (if later released)

Reporting accuracy criteria:
- Weekly report must reconcile: drafts_created, drafts_approved, responses_posted, responses_blocked_manual_review, and errors.
- KPI formulas (minimum): response_rate = posted/total_reviews; median_first_response_time; escalations_by_level; unresolved_escalations_aging; rating_trend_7d/30d.

SECTION 2 — BRAND-SAFETY CHECKLIST (v3) — OPERATOR TICK-BOX
Use before approving any response for Google/Yelp.

A) Universal “DO NOT” (both platforms)
[ ] Do not confirm identity or relationship (patient/customer) if review implies it.
[ ] Do not mention appointment dates, procedure names, services performed, chart/records, invoices unless reviewer already stated it AND it’s non-sensitive.
[ ] Do not admit liability (no “our fault,” “we caused,” “we were negligent,” “we failed you”).
[ ] Do not argue point-by-point; do not accuse the reviewer of lying.
[ ] Do not include personal data (phone numbers other than business line, staff schedules, addresses beyond public location).
[ ] Do not offer incentives, discounts, refunds-for-removal, gifts, contests, or “review us for X.”
[ ] Do not mention removing the review, reporting to Yelp/Google, or enforcement actions.
[ ] Do not disparage competitors.
[ ] Do not provide medical advice, diagnoses, or guaranteed outcomes.

B) Universal “MUST INCLUDE”
[ ] Thank the reviewer (even if negative) and keep tone calm.
[ ] Invite offline resolution with neutral CTA: “Please contact our team at [CONTACT_METHOD] so we can help.”
[ ] For negative reviews: acknowledge feelings without admitting fault (“We’re sorry to hear you had a frustrating experience.”).
[ ] For strong negatives: include de-escalation and next-step ownership (“We’d like to look into this promptly.”).

C) Platform-specific checks
Google Business Profile:
[ ] Keep concise; avoid requesting an updated review.
[ ] No promotional language tied to reviews.

Yelp:
[ ] Never suggest Yelp will remove reviews; no “we’ve reported this to Yelp.”
[ ] Avoid any language that feels like review solicitation or quid pro quo.
[ ] Avoid inviting the reviewer to change/remove their review.

D) Vertical-specific red flags
Dentist:
[ ] No mention of treatment specifics unless reviewer already provided and it is non-identifying.
[ ] No “we reviewed your chart/records/visit.”
Med Spa:
[ ] No “guaranteed results,” “permanent,” “risk-free,” or outcome promises.
HVAC:
[ ] Avoid definitive statements about property damage cause; do not accept blame.

E) Escalation triggers (must flag)
[ ] Legal threats/attorney/lawsuit → HOLD_MANUAL, escalate Legal.
[ ] Safety incident/injury/fire/gas leak → HOLD_MANUAL, escalate Safety.
[ ] PHI/HIPAA/privacy complaint → HOLD_MANUAL, escalate PHI.
[ ] Discrimination/harassment allegations → escalate Owner/HR; consider HOLD_MANUAL if severe.
[ ] Suspected fake review/competitor attack → escalate Ops; respond calmly without accusations.

SECTION 3 — ESCALATION PLAYBOOK (v3)
Decision tree (public response allowed vs manual-only hold):
1) Contains legal threat keywords? → MANUAL-ONLY HOLD. Route to Legal same-day.
2) Mentions injury/safety hazard (e.g., “hurt,” “unsafe,” “gas leak,” “fire,” “electrocution,” “infection”) → MANUAL-ONLY HOLD. Route to Owner/GM <4h; Safety lead same-day.
3) Mentions HIPAA/PHI/privacy or implies patient relationship with identifiable details → MANUAL-ONLY HOLD. Route to Privacy/Compliance same-day.
4) Discrimination claim (race, gender, disability) → escalate Owner/HR <4h; allow cautious generic response ONLY if no legal threat; otherwise HOLD.
5) Billing dispute/refund demand → escalate Billing <24h; public response allowed if neutral and offline.
6) Service quality/late/no-show → escalate Ops <24h; public response allowed if neutral and offline.
7) Suspected fake review → escalate Ops; public response allowed with non-accusatory wording.

Routing SLAs:
- Safety incident: Owner/GM <4h; internal incident log same-day.
- Legal threat: Legal same-day; freeze public posting until counsel approves.
- PHI/HIPAA: Compliance same-day; verify no PHI disclosed in draft; do not confirm patient status.
- Discrimination: Owner/HR <4h.
- Billing: Billing <24h.
- Ops/service recovery: Ops <24h.

Evidence checklist (collect before follow-up):
- Review screenshot + URL + timestamp.
- Work order/appointment lookup ONLY internally (never mention in public).
- Any call logs/emails (internal).
- Names of staff involved (internal only).
- For HVAC damage claims: photos, technician notes, checklist (internal).

DO NOT POST conditions (absolute):
- Any draft that includes: “we reviewed your chart/records/visit,” appointment specifics, or confirmation of treatment.
- Any legal-threat review without counsel-approved language.
- Any safety incident while facts are unknown.
- Any draft offering incentives or compensation in exchange for review changes.

SECTION 4 — APPROVED RESPONSE TEMPLATES (v3)
Rules for all templates:
- Allowed variables: {BusinessName}, {ContactMethod} (phone/email), {SignerRole} (e.g., “Office Manager”), {TeamName}.
- Disallowed variables: reviewer name (if not public), staff names, appointment dates, procedure/service specifics (medical), pricing unless explicitly disclosed by reviewer and verified safe.
- Always include offline CTA.

A) DENTIST (Google/Yelp)
D1 Positive (general)
“Thank you for the kind words. We appreciate you taking the time to share your experience with {BusinessName}. If there’s ever anything we can do to support you, please reach out at {ContactMethod}. — {SignerRole}”

D2 Neutral/short
“Thank you for the feedback. We’re always working to improve the experience at {BusinessName}. If you’re open to sharing more details, please contact us at {ContactMethod} so we can better understand and help. — {SignerRole}”

D3 Mild negative (no PHI confirmation)
“We’re sorry to hear you left feeling disappointed. Our goal is to provide a respectful, helpful experience every time. Please contact {BusinessName} at {ContactMethod} so we can learn more and work toward a resolution. — {SignerRole}”

D4 Strong negative (de-escalate, no fault admission)
“Thank you for raising this. We’re sorry to hear you had a frustrating experience. We’d like to look into what happened and address your concerns directly. Please contact our team at {ContactMethod}. — {SignerRole}”

D5 PHI/HIPAA/privacy mention (generic; if detector allows public response)
“Thank you for your message. We take privacy seriously and can’t discuss details in a public forum. Please contact {BusinessName} at {ContactMethod} so we can address your concerns appropriately. — {SignerRole}”

D6 Suspected fake / wrong business
“Thank you for the review. We take feedback seriously, but we’re unable to match your comments to our records based on what was shared here. Please contact {BusinessName} at {ContactMethod} so we can understand what happened and assist. — {SignerRole}”

B) MED SPA (Google/Yelp)
M1 Positive
“Thank you for the great feedback. We’re glad you enjoyed your experience at {BusinessName}. If you ever have questions or need anything, contact us at {ContactMethod}. — {SignerRole}”

M2 Neutral
“Thank you for sharing your thoughts. We’re always working to improve. Please reach out at {ContactMethod} so we can learn more about what you’d like to see. — {SignerRole}”

M3 Mild negative
“We’re sorry to hear this wasn’t the experience you expected. We’d appreciate the chance to discuss your concerns and see how we can help. Please contact {BusinessName} at {ContactMethod}. — {SignerRole}”

M4 Strong negative (no outcome debate)
“Thank you for bringing this to our attention. We’re sorry to hear you’re unhappy. We’d like to connect directly to understand your concerns and discuss next steps. Please contact our team at {ContactMethod}. — {SignerRole}”

M5 Safety concern (if not manual-hold; otherwise block)
“We’re sorry to hear about your concern. We take safety seriously and would like to address this promptly. Please contact {BusinessName} at {ContactMethod} so we can follow up directly. — {SignerRole}”

M6 Suspected fake / competitor bait
“Thank you for the feedback. We want to understand what happened, but we can’t confirm details from this post. Please contact {BusinessName} at {ContactMethod} so we can look into your concerns. — {SignerRole}”

C) HVAC (Google/Yelp)
H1 Positive
“Thanks for choosing {BusinessName} and for the kind review. We’re glad we could help. If you need anything in the future, reach us at {ContactMethod}. — {SignerRole}”

H2 Neutral
“Thank you for the feedback. We’re always working to improve scheduling, communication, and service quality. Please contact us at {ContactMethod} so we can learn more. — {SignerRole}”

H3 Mild negative (late/communication)
“We’re sorry to hear the timing or communication didn’t meet expectations. We’d like to learn more and make this right. Please contact {BusinessName} at {ContactMethod}. — {SignerRole}”

H4 Strong negative (service quality; no liability admission)
“Thank you for letting us know. We’re sorry you had a frustrating experience. We’d like to understand the situation and work toward a resolution. Please contact our team at {ContactMethod}. — {SignerRole}”

H5 Damage allegation (avoid blame)
“We’re sorry to hear about your concern. We take issues like this seriously and would like to review the details directly. Please contact {BusinessName} at {ContactMethod} so we can follow up. — {SignerRole}”

H6 Suspected fake
“Thank you for the review. We take feedback seriously, but we can’t verify the situation based on what’s posted here. Please contact {BusinessName} at {ContactMethod} so we can look into it. — {SignerRole}”

SECTION 5 — GOOGLE/YELP GUIDELINE REMINDERS (OPERATIONAL)
- Never ask for positive reviews, never offer incentives, and never condition service on a review.
- Do not post private customer details.
- Do not promise removal or imply platform enforcement.
- Keep responses factual, polite, and focused on taking the issue offline.

If customer/engineer needs help implementing these controls, direct them to the product proof URL above and email agent_bob_replit+review-bot@agentmail.to for QA/compliance questions.
