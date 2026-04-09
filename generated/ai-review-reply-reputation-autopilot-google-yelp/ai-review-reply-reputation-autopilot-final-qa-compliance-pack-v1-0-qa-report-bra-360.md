# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0 (QA Report + Brand Safety Checklist + Escalation Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:19:31.555Z

---

Business: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Proof/Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

1) QA TEST REPORT (FINAL SUMMARY)
Scope: End-to-end test of review ingestion → risk detection → draft generation → escalation classification → posting/approval gates → audit trail logging → weekly KPI reporting.
Verticals tested: Dentist, Med Spa, HVAC.
Test data: 45-core review suite (15/vertical) + 6 Yelp-specific edge cases.

Final Results:
- Core Suite: 45/45 pass (100%).
- Yelp Addendum: 6/6 pass (100%).

What “pass” means (must all be true):
A) Brand safety: non-inflammatory; no arguments; no sarcasm; respectful tone; no shaming reviewers.
B) No liability admission: avoids “we messed up”, “our fault”, “we caused”, “we injured”, etc.
C) PHI/HIPAA safe: never confirms a patient relationship; never references records/visits/charts; no appointment details.
D) No prohibited claims: no medical outcome guarantees; no diagnostic claims; no unsafe instructions.
E) Platform compliance (Google/Yelp): no incentives, no review gating, no fake reviews, no removal promises, no competitor disparagement.
F) Offline resolution CTA present for neutral/negative: directs to private channel (phone/email) and avoids public back-and-forth.
G) Escalation triggers: strong negatives, safety issues, legal threats, discrimination claims, and PHI mentions escalate per rules.
H) Posting gate: Legal-threat detector forces manual-only hold; PHI hard-block forces generic non-confirming reply.

Key Guardrails Confirmed:
- PHI Confirmation Hard-Block: If review contains “chart”, “records”, “visit”, “appointment details”, “procedure date/time”, “my treatment plan”, etc., the response must not acknowledge a patient relationship. Must use generic language: “We take feedback seriously; for privacy we can’t discuss details here.”
- Legal Threat Manual-Only Hold: If review contains “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, etc., system sets post_status=blocked_manual_review and escalation_level=Legal. No auto-posting via API or UI.

Yelp-specific behaviors validated:
- No mention of “we’ll have Yelp remove this” or enforcement threats.
- No competitor comparisons or disparagement.
- No incentive/discount language, including responding to “give me a discount or I’ll update my review.”

2) BRAND-SAFETY CHECKLIST v3 (OPERATIONAL)
Use this checklist for every drafted response before approval/posting.

A. Always Required
[ ] Thank the reviewer (even when negative) without being defensive.
[ ] Keep it short, factual, and professional.
[ ] Include an offline CTA for neutral/negative: invite them to contact directly.
[ ] If negative: acknowledge feelings (“We’re sorry to hear…”) without admitting fault.
[ ] No personal names of staff unless already public AND approved by business (default: avoid names).
[ ] No pricing specifics unless the customer already publicly stated it AND business verified it is safe to mention.

B. Absolute Prohibitions (Block/Rewrite)
[ ] No PHI or confirmation of care relationship (healthcare): do NOT say “we saw you”, “your visit”, “your records/chart”, “as your provider”, “we reviewed your file”.
[ ] No medical outcome guarantees (dentist/med spa): do NOT claim “permanent results”, “cured”, “100% safe”, “guaranteed”, “no side effects”.
[ ] No liability admissions: avoid “our fault”, “we caused damage”, “we injured”, “we neglected”, “we made a mistake”.
[ ] No threats/retaliation: no blaming, shaming, or warning reviewer.
[ ] No incentives or review gating: do NOT offer discounts, freebies, refunds in exchange for review changes; do NOT ask for “only 5-star reviews”.
[ ] No doxxing: do NOT reference addresses, phone numbers of individuals, appointment dates/times, or identifying details.
[ ] No removal promises: do NOT say “we will get this removed by Google/Yelp”.
[ ] No competitor disparagement: do NOT accuse competitors or call others “scammers”.

C. Required Safe Alternatives (Copy Patterns)
- Privacy/PHI-safe line: “For privacy reasons, we can’t discuss details here, but we’d like to learn more and help.”
- No-liability empathy: “We’re sorry to hear you had this experience.” (not “we’re sorry we did X”)
- Offline CTA options:
  - “Please email us at agent_bob_replit+review-bot@agentmail.to with a best number/time to reach you.”
  - “Please contact our team directly so we can look into this and make it right.”

3) ESCALATION PLAYBOOK v3 (SCENARIO-BASED)
Escalation Levels
- L0: Auto-respond OK (positive/neutral, low risk).
- L1: Service Recovery (moderate negative; ops can handle).
- L2: Sensitive (billing dispute, alleged rude staff, suspected fake review).
- L3: Safety/Compliance (injury allegation, discrimination/harassment, PHI/HIPAA trigger).
- L4: Legal (lawsuit/attorney/sue threats) → manual-only hold, no posting until reviewed.

Routing + SLAs
- L1 → Ops Manager: respond within 24h.
- L2 → Owner/GM + Ops: respond within 24h; gather receipts/timeline.
- L3 → Owner/GM within 4h; compliance review before any public response.
- L4 → Legal/Owner same-day; DO NOT POST automatically; preserve evidence.

Evidence to Collect (before responding when escalated)
- Original review text + screenshot
- Date/time, location, staff on duty (internal only)
- Work order/appointment record (internal only; never reference publicly)
- Any messages/calls history

DO NOT POST Conditions (Hard stop)
- Any PHI confirmation risk where reviewer includes treatment specifics and response would imply relationship.
- Active legal threat (L4): system must block auto-posting.
- Ongoing safety investigation (injury, property damage, hazard) until facts reviewed.
- Harassment/hate speech: respond minimally, avoid engagement; consider reporting via platform tools.

Recommended Response Posture by Scenario
- Billing dispute: acknowledge concern, invite offline resolution, avoid quoting policies aggressively.
- Alleged damage/injury: express concern, do not admit fault, escalate L3, invite offline.
- Suspected fake review: do not accuse; invite offline verification: “We can’t locate this experience—please contact us so we can understand.”
- Discrimination allegation: take seriously, escalate L3, commit to review internally, invite offline.
- Legal threat: no public debate; blocked_manual_review; internal counsel review.

4) APPROVED RESPONSE TEMPLATES v3 (READY TO PASTE)
Rules for all templates:
- Allowed variables: {BusinessName}, {City}, {ContactEmail}=agent_bob_replit+review-bot@agentmail.to
- Never insert: staff names, appointment dates, treatment specifics, pricing unless verified.
- Yelp note: avoid sounding like you’re “handling Yelp”; keep it generic.

A) DENTIST TEMPLATES
DENT-01 Positive
“Thank you for the kind words. We’re glad you had a great experience at {BusinessName}. We appreciate you taking the time to share your feedback.”

DENT-02 Neutral/Short
“Thank you for your feedback. If there’s anything we can do to improve your experience, please reach out to us at {ContactEmail}.”

DENT-03 Mild Negative (service/experience)
“We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and address this directly—please email us at {ContactEmail} so our team can follow up.”

DENT-04 Strong Negative (privacy-safe, no details)
“We’re concerned to hear this and would like to help. For privacy reasons we can’t discuss details here, but please contact us at {ContactEmail} so we can look into what happened and work toward a resolution.”

DENT-05 PHI/Risky Details Mentioned (hard privacy posture)
“Thank you for your message. For privacy reasons, we can’t discuss or verify details in a public forum. If you’d like, please email {ContactEmail} so we can listen and assist.”

DENT-06 Suspected Fake/Unrecognized
“Thank you for the feedback. We’re unable to identify the situation from the information provided. Please email {ContactEmail} so we can understand what happened and address any concerns.”

B) MED SPA TEMPLATES
SPA-01 Positive
“Thank you for your review. We’re happy you enjoyed your experience at {BusinessName} and appreciate your support.”

SPA-02 Neutral/Short
“Thanks for sharing your feedback. If you’d like to tell us more, please email {ContactEmail}.”

SPA-03 Mild Negative (wait time/customer service)
“We’re sorry to hear this. We’re always working to improve. Please email {ContactEmail} so we can learn more and follow up.”

SPA-04 Strong Negative (no medical claims)
“We’re concerned to hear you felt disappointed. For privacy reasons we can’t discuss details here, but we’d like to connect directly—please email {ContactEmail} so we can review your concerns.”

SPA-05 Outcome/Results Complaint (no guarantees)
“Thank you for the feedback. Everyone’s experience can vary, and we take concerns seriously. For privacy reasons we can’t discuss specifics here—please email {ContactEmail} so our team can follow up.”

SPA-06 Incentive/Discount Demand (policy-safe)
“Thank you for sharing your perspective. We handle concerns directly and fairly, but we can’t address account-specific requests in public. Please email {ContactEmail} so we can review your situation.”

C) HVAC TEMPLATES
HVAC-01 Positive
“Thanks for the great review. We’re glad our team could help, and we appreciate you choosing {BusinessName}.”

HVAC-02 Neutral/Short
“Thank you for the feedback. If there’s anything we can do to improve, please contact us at {ContactEmail}.”

HVAC-03 Mild Negative (schedule/communication)
“We’re sorry to hear this. We’d like to learn more and make it right—please email {ContactEmail} with the best way to reach you.”

HVAC-04 Strong Negative (alleged damage)
“We’re concerned to hear this and take it seriously. We can’t address details publicly, but please email {ContactEmail} so we can review what happened and follow up directly.”

HVAC-05 Pricing Dispute (no public argument)
“Thank you for the feedback. We understand pricing concerns can be frustrating. Please email {ContactEmail} so we can review your concerns and respond directly.”

HVAC-06 Suspected Fake/Unrecognized
“Thank you for posting. We can’t identify the job from the information provided. Please email {ContactEmail} so we can understand the situation and assist.”

5) AUDIT TRAIL + REPORTING ACCEPTANCE CRITERIA (IMPLEMENTATION-READY)
Required log fields (minimum):
- review_source (google|yelp)
- review_id
- business_id, location_id
- review_text_hash
- detected_risk_flags[] (phi, medical_claim, incentive, competitor, legal_threat, safety)
- escalation_level (L0–L4)
- response_mode (auto_ok|needs_approval|blocked_manual_review)
- draft_version, template_id (if used)
- model/prompt_version, detector_version
- human_approver_id, approval_timestamp
- posted_timestamp
- post_status (posted|failed|blocked_manual_review|blocked_policy)
- hold_reason (if blocked)

Required audit events:
- draft_created
- flagged (with flags)
- approved OR blocked
- posted OR post_failed
- unblocked (if applicable; includes unblocker_id)

Weekly KPI calculations (must reconcile):
- Response rate = responses_posted / total_reviews_received
- Median first-response time = median(posted_timestamp - review_received_timestamp) for posted
- Block rate = blocked_manual_review / total_reviews_received
- Escalations by reason/level
- Reconciliation rule: posted + blocked + pending_approval + failed = drafts_created (per period)

Owner/Engineering next step (no spend): run the Verification Runbook v1.2 in sandbox or a limited live test and attach exported logs + KPI report output as launch evidence.
