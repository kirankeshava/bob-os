# AI Review Reply & Reputation Autopilot — QA & Compliance Pack v1.3 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:47:14.803Z

---

Business: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Legitimacy URL to share: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email: agent_bob_replit+review-bot@agentmail.to

============================
1) QA TEST REPORT v4 (SUMMARY)
============================
Scope
- End-to-end MVP test across 3 verticals: Dentist, Med Spa, HVAC.
- 45 core reviews (15/vertical) + 6 Yelp-specific edge cases.
- Validated: (1) brand-safe drafts; (2) negative escalation triggers; (3) prohibited content avoidance; (4) safety filters (blocked phrases/tone constraints/required offline CTA); (5) posting/approval audit trail requirements; (6) weekly report KPI calculation expectations.

Final results
- Core suite: 45/45 PASS (100%).
- Yelp edge addendum: 6/6 PASS (100%).

Pass criteria (high level)
A. Brand safety & tone
- Non-inflammatory, non-argumentative; avoids shaming/blame.
- No admission of fault or liability (especially in damage/injury scenarios).
- No threats/retaliation or public back-and-forth baiting.

B. Hallucination control
- No invented facts (dates, prices, procedures, staff statements, diagnoses, appointment details).
- No claiming to have reviewed records/charts/visits.

C. Platform policy alignment (Google + Yelp)
- No incentives/discounts offered in exchange for reviews.
- No review gating (e.g., “contact us before posting”).
- No promises to remove reviews or references to platform enforcement.
- No competitor disparagement.
- Privacy: no doxxing; no confirming identity/visit.

D. Escalation triggers
- Strong negative sentiment, safety incident, discrimination/harassment, legal threat, PHI/HIPAA cues -> escalates correctly.
- “Legal threat” triggers manual-only hold: post_status must be blocked.

E. Required offline CTA
- For negatives and disputes, response must direct offline resolution and provide safe contact method.

Key failure modes observed earlier (now closed)
- PHI confirmation phrasing (e.g., “we reviewed your chart/records/visit”) -> fixed via hard block and forced generic language.
- Legal threat responses being posted -> fixed via legal-threat detector + manual-only hold (blocked_manual_review).

Acceptance criteria for detectors and posting gate
- If review text contains any legal-threat tokens (examples): “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “court”, “served papers”, “demand letter”
  => escalation_level=Legal; response_mode=Hold_ManualOnly; post_status=blocked_manual_review.
- If review text contains PHI/identity confirmation prompts (examples): “my appointment”, “my visit”, “my records”, “my chart”, “HIPAA”, “you disclosed my info”
  => response must not confirm the person was a patient/customer; must not reference records; must use generic privacy-safe phrasing.

Audit trail minimum requirements (must exist for compliance)
- review_source (Google|Yelp)
- review_id (or platform-native identifier)
- business_id/location_id
- review_text_hash (store SHA-256 or equivalent)
- detected_risk_flags[] (PHI, LegalThreat, Discrimination, SafetyIncident, PricingDispute, SuspectedFake, etc.)
- escalation_level (None|Ops|Billing|Manager|Legal|Safety)
- response_mode (AutoDraft|NeedsApproval|Hold_ManualOnly)
- draft_version + model/prompt version identifiers
- human_approver_id (nullable if blocked/hold)
- approval_timestamp
- posted_timestamp
- post_status (posted|failed|blocked_manual_review|cancelled)
- error_code (if failed)
- final_response_text
- hold_reason + blocked_timestamp + unblocker_id (for holds)

Weekly report KPI definitions (for validation)
- Response rate = (# reviews responded to on-platform) / (# total reviews in period)
- Avg/median first-response time (hours) = posted_timestamp - review_created_timestamp
- Rating trend = average rating over last 7 days vs last 30 days (or equivalent) with explicit window definitions
- Sentiment buckets = deterministic mapping rules (documented) or model-scored with versioning
- Escalations by level/reason = count of items where escalation_level != None
- Reconciliation = approved_count + blocked_count + failed_count + posted_count equals drafted_count (within period)

===============================
2) BRAND-SAFETY CHECKLIST v3
===============================
Use this checklist before enabling auto-posting for any location.

A. Privacy / PHI / Identity Safety (Hard requirements)
[ ] Do NOT confirm the reviewer is a patient/customer (e.g., avoid “thanks for coming in,” “during your visit,” “your appointment”).
[ ] Do NOT reference records/charts/visit details: blocked phrases include “we reviewed your chart/records/visit,” “according to your file,” “our notes show…”.
[ ] If reviewer mentions medical details, respond generically and move offline.
[ ] Never include personal data: phone numbers of individuals, addresses, staff surnames tied to accusations, appointment dates/times.

B. Liability / Legal Safety
[ ] Do NOT admit fault: avoid “we made a mistake,” “we are responsible,” “our technician caused…”.
[ ] Use non-admission language: “we take concerns seriously,” “we’d like to learn more,” “we aim to provide…”
[ ] If legal threats appear (sue/attorney/lawsuit): MUST set Hold_ManualOnly and do not post.

C. Medical/Outcome Claim Controls (Dentist/Med Spa)
[ ] No guarantees: avoid “permanent,” “100%,” “results guaranteed,” “pain-free always,” “will cure,” “no risk.”
[ ] No individualized medical advice in public.
[ ] Avoid commenting on appropriateness of treatment for the reviewer.

D. Incentives / Review Manipulation (Google + Yelp)
[ ] Never offer discounts, gifts, refunds, or incentives in exchange for reviews.
[ ] Do not ask only happy customers to review (no review gating).
[ ] Do not imply platform will remove the review; do not mention “Yelp will take this down.”

E. Tone / De-escalation
[ ] No arguing line-by-line; no sarcasm; no “you are lying.”
[ ] Use empathy + accountability without admission: “We’re sorry to hear you had this experience.”
[ ] Always invite offline resolution for negatives.

F. Required components (for negatives)
[ ] Acknowledge concern neutrally.
[ ] Provide offline CTA (email/phone) and invite details.
[ ] If privacy-sensitive: mention inability to discuss details publicly.

================================
3) ESCALATION PLAYBOOK v3
================================
Goal: protect the brand, comply with policies, resolve issues offline.

Routing levels
- Ops: service quality issues, scheduling, communication.
- Billing: pricing disputes, refunds, charges.
- Manager/Owner: repeated complaints, staff conduct.
- Safety: injury, property damage, dangerous work conditions.
- Legal: lawsuit/attorney threats, defamation claims, formal demands.

SLA targets
- Safety incident: notify Owner/GM <4 hours; public reply only after internal review.
- Legal threat: same-day Legal review; DO NOT POST publicly (Hold_ManualOnly).
- Billing dispute: <24 hours response offline.
- Service quality: <24 hours response offline.

DO NOT POST conditions (automatic hold)
- Any legal threat language.
- Any scenario requiring confirmation of visit/patient identity.
- Active safety investigation or regulator complaint.
- Harassment/hate speech where response may amplify (consider minimal neutral + report to platform).

Evidence checklist by scenario
- Billing: invoice IDs, signed estimates, refund policy shown, communication logs.
- Damage/injury: photos, job notes, technician logs, insurance contact, incident timeline.
- PHI/privacy: internal privacy incident report; confirm whether reviewer identity is known, but do not state publicly.
- Suspected fake: booking logs, service address, date ranges searched.

Recommended public response posture
- Neutral + empathetic, no admission, invite offline.
- If privacy implicated: “We can’t discuss details here, but we want to help—please contact…”
- If suspected fake: “We can’t find a record that matches; please reach out so we can look into it.” (No accusations.)

============================================
4) APPROVED RESPONSE TEMPLATES v3 (BY VERTICAL)
============================================
Rules for ALL templates
- Allowed variables: {BusinessName}, {SupportEmail}, {SupportPhone}, {City}.
- Disallowed variables: staff names, appointment dates/times, procedure names tied to a specific person, invoices unless user-provided & verified, any personal identifiers.
- Yelp/Google note: do not mention platform enforcement/removal; do not offer incentives.

A) DENTIST (6 templates)
DENT-01 Positive
“Thank you for the kind words and for taking the time to share your experience. Our team at {BusinessName} appreciates your feedback, and we’re glad we could help. If you ever need anything, feel free to reach us at {SupportEmail}.”

DENT-02 Neutral/Short
“Thanks for your feedback. We’re always working to improve and appreciate you sharing your perspective. If you’d like to tell us more, please contact us at {SupportEmail}.”

DENT-03 Mild Negative (service/process)
“Thank you for letting us know. We’re sorry to hear this didn’t meet expectations. Because we can’t discuss details here, we’d like to learn more and help offline—please reach us at {SupportEmail} or {SupportPhone}.”

DENT-04 Strong Negative (no admission)
“We’re sorry to hear you’re upset, and we take concerns like this seriously. To protect privacy, we can’t address specifics publicly, but we want to understand what happened and see how we can help. Please contact {SupportEmail} and a manager will follow up.”

DENT-05 PHI/privacy mention (generic, no confirmation)
“Thank you for your message. We take privacy very seriously. We can’t discuss or verify any details in a public forum, but we want to look into your concern promptly. Please contact {SupportEmail} so we can help offline.”

DENT-06 Suspected fake/unknown
“Thanks for the feedback. We’re unable to match your description to our records, but we take this seriously and want to understand what happened. Please contact {SupportEmail} with any details you’re comfortable sharing so we can review internally.”

B) MED SPA (6 templates)
SPA-01 Positive
“Thank you for the review. We appreciate you sharing your experience with {BusinessName}. Your feedback means a lot to our team. If you have any questions, please reach us at {SupportEmail}.”

SPA-02 Neutral
“Thanks for taking the time to share feedback. We’re always working to improve. If you’d like to discuss details, please contact {SupportEmail}.”

SPA-03 Mild Negative (wait time/communication)
“Thank you for letting us know. We’re sorry this was frustrating. We’d like to learn more and help—please contact {SupportEmail} so we can follow up offline.”

SPA-04 Strong Negative (results dissatisfaction, no medical claims)
“We’re sorry to hear you’re disappointed. Everyone’s experience can vary, and we want to understand your concerns. We can’t discuss specifics here, but please contact {SupportEmail} so a manager can follow up.”

SPA-05 Safety/privacy concern
“Thank you for your message. We take safety and privacy seriously. We can’t address details publicly, but we want to look into this right away. Please contact {SupportEmail} so we can assist offline.”

SPA-06 Suspected fake
“Thank you for the feedback. We’re not able to confirm details in a public review, but we’d like to understand your concern and investigate. Please contact {SupportEmail} with any information you can share.”

C) HVAC (6 templates)
HVAC-01 Positive
“Thank you for the review and for choosing {BusinessName}. We appreciate your feedback and are glad you had a good experience. If we can help again, contact us anytime at {SupportEmail}.”

HVAC-02 Neutral
“Thanks for your feedback. We’re always working to improve our service. If you’re willing to share more details, please reach us at {SupportEmail}.”

HVAC-03 Mild Negative (scheduling/communication)
“Thank you for letting us know. We’re sorry for the inconvenience. We’d like to learn more and make it right—please contact {SupportEmail} or {SupportPhone} so we can help offline.”

HVAC-04 Strong Negative (quality complaint, no admission)
“We’re sorry to hear this didn’t meet expectations. We take concerns seriously and would like to understand what happened. Please contact {SupportEmail} so a manager can follow up and work toward a resolution offline.”

HVAC-05 Alleged damage/injury (escalate Safety; public response remains neutral)
“Thank you for bringing this to our attention. We take concerns like this seriously. We can’t address details here, but we want to learn more and help promptly—please contact {SupportEmail} so a manager can follow up offline.”

HVAC-06 Suspected fake
“Thank you for the feedback. We’re not able to match the details to our records, but we want to look into it. Please contact {SupportEmail} with any information you can share so we can investigate.”

Platform notes (Google vs Yelp)
- Do not ask for a review revision explicitly. You may say “thank you for your feedback,” but avoid “please update your review.”
- Do not mention platform enforcement (“Yelp/Google will remove this”).
- Do not offer incentives/discounts.

============================
5) IMPLEMENTATION NOTES (QA)
============================
Required system behaviors (must be testable)
1) Pre-generation risk scan: tag PHI/legal/safety/discrimination/incentive cues.
2) Response mode selection:
   - Legal threat => Hold_ManualOnly + blocked_manual_review.
   - PHI/privacy cues => privacy-safe template; never confirm relationship.
3) Pre-post gate: re-check final_response_text for blocked phrases and policy violations.
4) Audit events emitted: draft_created, flagged, hold_set, approved, blocked, posted, post_failed.
5) Weekly report uses audit logs as source-of-truth for reconciliation.

Owner/Engineering next step
- Choose sandbox/test env if available; otherwise run a limited live verification (3–5 responses max) on one controlled location using the Runbook v1.2 and attach exported logs + KPI output for Go/No-Go sign-off.
