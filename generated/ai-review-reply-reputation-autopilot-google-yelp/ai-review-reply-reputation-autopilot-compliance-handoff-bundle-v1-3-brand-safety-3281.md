# AI Review Reply & Reputation Autopilot — Compliance Handoff Bundle v1.3 (Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + Safety Ruleset)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:55:19.127Z

---

This document is an implementation-ready compliance bundle for the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). It is designed to minimize brand risk (inflammatory replies, liability admission, PHI/HIPAA issues, prohibited incentives) and to align with platform policies. Reference website for legitimacy in any customer-facing comms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1. Support email: agent_bob_replit+review-bot@agentmail.to.

A) BRAND-SAFETY CHECKLIST v3 (tick-box, must-pass before posting)
1. Tone & de-escalation
[ ] Response is calm, appreciative, non-argumentative; no sarcasm, blame, or “you’re wrong.”
[ ] No threats/retaliation (e.g., “we will report you,” “we’ll sue,” “you’ll be banned”).
[ ] Avoids public back-and-forth; invites offline resolution.
2. Liability & legal posture
[ ] No admission of fault/liability (ban: “we are at fault,” “our mistake caused,” “we damaged,” “we injured”).
[ ] If injury/damage alleged: acknowledge concern without admitting; escalate.
[ ] If legal threat present (attorney/lawsuit/sue): DO NOT POST; manual-only hold; escalate Legal.
3. Privacy/PHI/HIPAA (Dentist/Med Spa especially)
[ ] Never confirm the reviewer is a patient/client or discuss treatment/visit details.
[ ] Ban phrases implying record review: “we reviewed your chart/records/visit/appointment.”
[ ] No diagnosis, outcomes, medication/procedure specifics, before/after claims.
[ ] If reviewer discloses PHI: reply must stay generic and move offline.
4. Prohibited content (Google/Yelp aligned)
[ ] No incentives/discounts offered for reviews; no “review gating” or asking only happy customers.
[ ] No promises of removal or manipulation (“we’ll get Yelp/Google to remove this”).
[ ] No competitor disparagement or comparisons.
[ ] No personal data: names of staff/clients (unless business explicitly wants staff names and it’s safe), addresses, phone numbers of individuals.
5. Required elements
[ ] Includes an offline CTA: “Please contact us directly so we can help,” with business contact channel (phone/email) if allowed by customer.
[ ] For negative reviews: includes empathy + willingness to make it right + request for details offline.
6. Platform-specific notes
Google Business Profile:
[ ] Avoid promotional CTA that looks like review solicitation. Keep it service-recovery focused.
Yelp:
[ ] Do not mention Yelp policy/enforcement, do not argue about filtering/removal. Keep neutral and offline.

B) ESCALATION PLAYBOOK v3 (when to escalate + how to respond)
Escalation levels
L0: Normal (post allowed) – routine positive/neutral.
L1: Service recovery (post allowed) – mild/strong dissatisfaction, scheduling, wait time.
L2: Sensitive (post allowed after human approval) – billing dispute, refund demand, alleged rude staff, suspected fake review.
L3: High risk (manual-only hold; DO NOT POST) – PHI/HIPAA risk, discrimination/harassment, safety incident, property damage, injury claim.
L4: Legal (manual-only hold; DO NOT POST) – attorney/lawsuit/sue/threat of legal action.

Routing & SLAs (internal)
- Safety incident/injury/property damage: Owner/GM <4 hours; Ops same day.
- Billing dispute/refund: Billing <24 hours.
- Service quality/no-show/late arrival: Ops <24 hours.
- PHI/HIPAA mention: Privacy Officer/Owner same day; do not engage publicly beyond generic.
- Discrimination/harassment: Owner/HR same day; preserve evidence.
- Legal threats: Legal same day; freeze public response.

Evidence to collect (minimum)
- Screenshot of review + platform URL/review_id; date/time.
- Internal job/ticket/appointment lookup ONLY for internal use; never reference publicly.
- Any relevant invoices, call logs, technician notes, consent forms (med).
- Prior message history with reviewer (if any).

DO NOT POST conditions (auto-hold)
- Mentions of: “attorney,” “lawsuit,” “sue,” “legal action,” “court,” “demand letter.”
- Any response draft that includes PHI confirmation or record-review language: “chart,” “records,” “your visit,” “your appointment,” “procedure you received.”
- Active safety investigation; threats/harassment; doxxing; discrimination allegations requiring HR/legal handling.

C) LLM SAFETY RULESET (engineering-enforceable)
Implement as: (1) pre-generation classifier (risk flags + response_mode), (2) post-generation validator (blocked phrases + required elements), (3) pre-post gate that blocks manual-only holds.

1) Required offline CTA (must include at least one)
Allowed phrases:
- “Please contact us directly so we can look into this and help.”
- “We’d like to learn more—please reach out to our team directly.”
- “For privacy reasons, we can’t discuss details here; please contact us directly.”

2) Blocked phrase families (hard block, regenerate with safe alternative)
Liability admission (examples):
- “we are at fault,” “our fault,” “we caused,” “we damaged,” “we broke,” “we injured,” “we harmed.”
PHI/record confirmation (examples):
- “we reviewed your chart,” “we checked your records,” “we looked at your visit,” “after reviewing your appointment,” “as your dentist/clinician.”
Medical guarantees (examples):
- “guaranteed results,” “permanent,” “cure,” “no risk,” “100%.”
Incentives/solicitation (examples):
- “discount,” “coupon,” “free,” “gift card,” “we’ll compensate you for a review,” “update your review and we’ll…”.
Removal promises (examples):
- “we’ll have this removed,” “Yelp/Google will take it down,” “we’ll report you to Yelp to remove.”
Competitor disparagement (examples):
- “unlike [competitor],” “they are scammers,” “their work is worse.”

3) Detector triggers → required system actions
- legal_threat_detector: if contains attorney/lawsuit/sue/court/legal action → response_mode=HOLD_MANUAL_ONLY; escalation_level=Legal; post_status=blocked_manual_review; require hold_reason.
- phi_detector: if contains chart/records/visit/appointment/procedure OR reviewer mentions diagnosis/treatment specifics → response_mode=ALLOW_DRAFT_BUT_FORCE_GENERIC (or HOLD if system cannot comply); add risk_flag=PHI.
- incentive_detector: discount/free/gift card/update review for X → block + regenerate; risk_flag=INCENTIVE.
- competitor_detector: competitor names/comparisons → block + regenerate; risk_flag=COMPETITOR.

D) APPROVED RESPONSE TEMPLATES v3 (versioned, per vertical)
Global variable policy (all verticals)
Allowed variables: {business_name}, {city}, {contact_channel_generic} (e.g., “call our office,” “contact our team”), {signoff_role} (e.g., “Team,” “Owner”).
Forbidden substitutions: patient/client name, staff name (unless owner-approved), appointment date/time, procedure name, invoice totals unless verified and explicitly provided by reviewer, any medical advice.

Dentist (DENT-*)
DENT-01 Positive
“Thank you for the kind words. We’re glad you had a great experience with {business_name}. We appreciate you taking the time to share this feedback.”
DENT-02 Neutral/short
“Thanks for your feedback. If there’s anything we can do to improve your next experience, please contact us directly so we can help.”
DENT-03 Mild negative (wait time)
“Thank you for letting us know. We’re sorry your experience didn’t meet expectations. Please contact us directly so we can learn more and work to make this right.”
DENT-04 Strong negative (service quality)
“We’re concerned to hear this and would like to understand what happened. For privacy reasons, we can’t discuss details here—please contact us directly so we can look into this and help.”
DENT-05 PHI-sensitive (reviewer mentions treatment details)
“Thank you for your message. To protect privacy, we can’t discuss any details here. Please contact us directly so we can address your concerns.”
DENT-06 Suspected fake/non-customer
“We take feedback seriously and would like to look into this. Please contact us directly with any details you’re comfortable sharing so we can investigate.”

Med Spa (SPA-*)
SPA-01 Positive
“Thank you for your review. We’re happy you had a great experience with {business_name} and appreciate your feedback.”
SPA-02 Neutral
“Thanks for sharing your experience. If you have suggestions for how we can improve, please contact us directly.”
SPA-03 Mild negative (front desk)
“Thank you for the feedback. We’re sorry to hear this. Please contact us directly so we can learn more and address it with our team.”
SPA-04 Strong negative (results dissatisfaction—no medical claims)
“We’re sorry your experience didn’t meet expectations. We’d like to learn more and help resolve this. For privacy reasons, please contact us directly.”
SPA-05 Safety/complication mention (auto-escalate)
“Thank you for letting us know—your concerns are important. For privacy and safety, please contact us directly as soon as possible so we can assist.” (System: escalation L3; may require manual approval.)
SPA-06 Suspected fake
“We’d like to look into this, but we can’t verify details here. Please contact us directly so we can investigate and help.”

HVAC (HVAC-*)
HVAC-01 Positive
“Thanks for the great review. We appreciate you choosing {business_name} and we’re glad we could help.”
HVAC-02 Neutral
“Thank you for your feedback. If anything didn’t meet expectations, please contact us directly so we can help.”
HVAC-03 Mild negative (scheduling)
“We’re sorry for the inconvenience. Please contact us directly so we can learn more and work on a solution.”
HVAC-04 Strong negative (service quality)
“We’re concerned to hear this. Please contact us directly so we can look into what happened and help resolve it.”
HVAC-05 Property damage allegation (auto-escalate)
“Thank you for bringing this to our attention. We take concerns like this seriously and would like to investigate. Please contact us directly so we can assist.” (System: escalation L3; avoid admitting fault.)
HVAC-06 Suspected fake
“We take feedback seriously and would like to investigate. Please contact us directly with any details so we can look into this.”

E) Implementation reminders (audit trail)
For every draft and action, log: review_source, review_id, review_text_hash, detected_risk_flags, escalation_level, response_mode (ALLOW | REQUIRE_HUMAN_APPROVAL | HOLD_MANUAL_ONLY), draft_version, approver_id, approval_timestamp, post_status (posted | blocked_manual_review | error), and final_response_text. Weekly KPIs must reconcile approved vs posted vs blocked.

Owner/Engineering next step: confirm sandbox availability for GBP/Yelp; otherwise run the limited live protocol (3–5 posts max on a low-risk internal location) using the previously produced QA Launch Verification Runbook v1.2, exporting logs + KPI report output as evidence for go/no-go sign-off.