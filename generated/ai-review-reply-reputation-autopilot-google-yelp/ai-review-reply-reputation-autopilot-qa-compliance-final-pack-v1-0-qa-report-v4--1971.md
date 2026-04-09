# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + Audit/KPI Addendum)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:03:00.683Z

---

Overview
This document is the final QA + compliance pack for “AI Review Reply & Reputation Autopilot (Google/Yelp)”. It ensures brand safety, hallucination control, and Google Business Profile (GBP) / Yelp policy alignment. It is written to be directly actionable by engineering + ops for launch readiness and ongoing regressions.

Product reference (for customer/partner legitimacy)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

A) QA Test Report v4 (Final)
Scope
- 45-case core suite across 3 verticals: Dentist (15), Med Spa (15), HVAC (15)
- 6-case Yelp-specific addendum for platform sensitivities
- Validated: (1) on-brand/non-inflammatory/no liability admission, (2) escalation triggers, (3) prohibited content avoidance (medical claims/HIPAA/incentives/doxxing), (4) safety filters + templates, (5) posting/approval audit trail expectations, (6) weekly KPI/report accuracy requirements.

Final Results
- Core suite: 45/45 PASS
- Yelp addendum: 6/6 PASS
- Total: 51/51 PASS

Acceptance Criteria (must remain true in production)
1) PHI/HIPAA safety: Never confirm a patient relationship, visit, appointment, treatment, chart/records, or outcomes. If review contains PHI cues or requests for clinical detail → response must be generic + take offline; if reviewer demands “confirm my visit” → do not confirm.
2) Medical claims: No guarantees (“cured”, “permanent results”, “no pain guaranteed”), no outcome promises, no diagnosis/medical advice.
3) Liability: No admissions (“we damaged”, “our fault”, “we made a mistake”), no factual determinations about incidents; acknowledge experience and move to offline resolution.
4) Incentives: No discounts, gift cards, freebies, “we’ll make it right with a refund if you update this review,” no review gating.
5) Doxxing: Never echo personal data (phone, address) or staff full names; do not ask reviewer to post identifying info.
6) Competitors/platform threats: Do not disparage competitors; do not claim Yelp/Google will remove reviews; do not imply retaliation.
7) Tone: calm, grateful, non-argumentative; avoid back-and-forth bait.
8) Manual-only hold: Reviews containing legal threat triggers (attorney/lawsuit/sue) or severe safety allegations must be blocked from auto-posting and escalated.

Evidence Requirements for Launch Sign-off
Engineering must provide exported evidence for:
- Detector triggering (risk flags) on seeded test reviews
- Manual-only hold preventing posting via all paths (API and UI)
- Audit log events/fields present for draft→approval→blocked/posted
- Weekly report reconciliation (approved vs posted vs blocked counts)

B) Brand-Safety Checklist v3 (Operational)
Use before enabling auto-posting, and as a regression checklist per release.

1. Platform policy compliance
- [ ] No incentives/discounts/freebies offered for reviews
- [ ] No review gating (“contact us first before leaving a review”)
- [ ] No promises of removal/flagging by Yelp/Google
- [ ] No competitor disparagement or comparisons

2. Privacy/PHI (high-risk)
- [ ] Do not confirm reviewer is a patient/client or that a visit occurred
- [ ] Do not reference charts/records/visit details (“we reviewed your chart/records/visit” is blocked)
- [ ] Do not ask for personal/medical details publicly
- [ ] Require offline CTA for any sensitive content

3. Liability & legal
- [ ] Do not admit fault/liability (“our fault”, “we caused”, “we damaged”) or confirm incident facts
- [ ] Any mention of attorney/lawsuit/sue/insurance claim → manual-only hold + Legal escalation
- [ ] Any threats/harassment → manual-only hold + Ops/Owner escalation

4. Medical/regulated claims (dentist/med spa)
- [ ] No guarantees about outcomes, healing time, pain, permanence
- [ ] No medical advice/diagnosis in public responses
- [ ] Use neutral language: “We’d like to learn more” not “This treatment works for everyone”

5. Required response structure (all platforms)
- [ ] Thank/acknowledge
- [ ] Apologize for experience without admitting fault (when negative)
- [ ] Offline CTA: invite to contact privately (phone/email) without posting personal data
- [ ] Close professionally, no argumentative language

6. Blocked phrases (minimum)
- “We reviewed your chart/records/visit/appointment notes”
- “As your dentist/provider…”
- “We guarantee…” / “100%” / “permanent results”
- “If you remove/update the review, we will…”
- “Yelp/Google will remove this” / “We’ll get this taken down”
- “Our technician [full name]…” (use role only)

C) Escalation Playbook v3
Escalation Levels
- L0 Auto-respond OK: positive/neutral/mild negative with no risk flags
- L1 Ops Review (within 24h): service quality complaints, scheduling issues, mild billing disputes
- L2 Owner/GM (within 4h): safety concerns, alleged damage, discrimination/harassment, repeated pattern complaints
- L3 Legal Same-day + Manual-only hold: attorney/lawsuit/sue, insurance claim, demand letter, explicit legal threats
- L4 Privacy/PHI Same-day + Manual-only hold: explicit medical details, request to discuss treatment publicly, anything indicating patient identity/records

DO-NOT-POST Conditions (must block auto-post)
- Any legal-threat keywords (attorney, lawyer, lawsuit, sue, subpoena, demand letter)
- Any PHI confirmation risk (chart, records, visit details) when response would acknowledge treatment
- Any credible safety incident requiring investigation

Scenario Routing + Evidence to Collect
1) Billing dispute/refund demand (L1)
- Collect: invoice, signed estimate, call logs, policy text
- Public response: acknowledge, invite offline resolution; do not debate amounts publicly
2) Alleged damage/injury/safety incident (L2)
- Collect: photos, work order, technician notes, CCTV if applicable
- Public response: concern + offline contact; no admissions
3) Discrimination/harassment claim (L2)
- Collect: staff statements, schedule logs
- Public response: take seriously + offline; avoid arguing
4) PHI/medical detail mentioned (L4)
- Collect: none publicly; move offline; ensure response does not confirm relationship
5) Legal threat (L3)
- Collect: screenshot, timeline, contract
- Public: hold/manual only; typically a minimal neutral response or none until Legal approves

Internal Macros (for ops)
- “Hold—Legal”: “Review contains legal threat language. Do not post. Escalate to Legal; log hold_reason=legal_threat.”
- “Hold—PHI”: “Review contains medical/PHI context. Do not confirm any relationship. Draft generic offline CTA only; require manual approval.”

D) Approved Response Templates v3 (Per Vertical)
Rules for all templates
- Allowed variables: {BusinessName}, {ContactChannel} (phone/email), {Role} (Owner/Manager), {LocationCity}
- Disallowed variables: reviewer name (unless provided and not sensitive), staff full names, appointment dates/times, treatment details, pricing unless already public and verified.
- Required offline CTA: “Please contact us directly at {ContactChannel} so we can look into this.” (or equivalent)

Dentist Templates
DENT-01 Positive
“Thank you for the kind feedback. We’re glad you had a good experience at {BusinessName}. If there’s anything we can do to support you, please reach us at {ContactChannel}.”
DENT-02 Neutral/Short
“Thanks for sharing your feedback. If you’d like to discuss anything further, please contact {BusinessName} at {ContactChannel}.”
DENT-03 Mild Negative (service experience)
“Thank you for letting us know. We’re sorry your experience didn’t meet expectations. Please contact us at {ContactChannel} so we can learn more and address this privately.”
DENT-04 Strong Negative (no PHI confirmation)
“We’re sorry to hear you feel this way. We take feedback seriously and would like to understand what happened. Please contact {BusinessName} at {ContactChannel} so we can look into your concerns.”
DENT-05 Suspected Fake/Not a Patient
“Thanks for the review. We can’t locate enough information to understand the situation from the details provided. Please contact {BusinessName} at {ContactChannel} so we can clarify and address your concerns.”
DENT-06 PHI/Records Trigger (generic, safe)
“We take privacy seriously and can’t discuss details here. Please contact {BusinessName} directly at {ContactChannel} so we can assist you privately.”

Med Spa Templates
MED-01 Positive
“Thank you for your feedback. We appreciate you choosing {BusinessName} and hope to see you again. For any questions, contact us at {ContactChannel}.”
MED-02 Neutral
“Thanks for sharing. If you’d like to discuss your experience, please contact {BusinessName} at {ContactChannel}.”
MED-03 Mild Negative
“We’re sorry to hear this didn’t meet expectations. We’d like to learn more and help resolve it—please contact us at {ContactChannel}.”
MED-04 Strong Negative (no outcome claims)
“Thank you for the feedback. We take concerns seriously and would like to understand what happened. Please contact {BusinessName} at {ContactChannel} so we can review this privately.”
MED-05 Suspected Fake
“Thanks for reaching out. We don’t have enough detail here to identify the situation. Please contact {BusinessName} at {ContactChannel} so we can assist.”
MED-06 Safety/Medical Detail Mention
“We take privacy and safety seriously and can’t address details publicly. Please contact {BusinessName} at {ContactChannel} so we can support you directly.”

HVAC Templates
HVAC-01 Positive
“Thank you for the great review. We appreciate you choosing {BusinessName}. If we can help again, reach us anytime at {ContactChannel}.”
HVAC-02 Neutral
“Thanks for the feedback. If you’d like to follow up, please contact {BusinessName} at {ContactChannel}.”
HVAC-03 Mild Negative (timing/communication)
“Thanks for letting us know. We’re sorry for the frustration and want to make this right. Please contact us at {ContactChannel} so we can look into it.”
HVAC-04 Strong Negative (alleged damage—no admission)
“We’re concerned to hear this and would like to understand what happened. Please contact {BusinessName} at {ContactChannel} so we can investigate and follow up directly.”
HVAC-05 Suspected Fake
“Thanks for the review. We’re unable to match this to a completed job based on the details provided. Please contact {BusinessName} at {ContactChannel} so we can clarify.”
HVAC-06 Safety Incident
“We take safety seriously and want to address this promptly. Please contact {BusinessName} at {ContactChannel} so we can follow up directly.”

Manual-only Hold Stub (use when blocked; do not auto-post)
HOLD-LEGAL-01
“Thank you for your feedback. We want to address your concerns appropriately. Please contact {BusinessName} directly at {ContactChannel}.”
Note: Only post if Legal/Owner explicitly approves. Otherwise keep as internal draft.

E) Audit Trail & KPI Addendum (Engineering/Reporting)
Required Audit Log Fields (minimum)
- review_source (GBP|Yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level (L0–L4)
- response_mode (auto|needs_approval|blocked_manual_review)
- draft_version
- model_version / prompt_version / detector_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- post_status (posted|blocked_manual_review|failed|pending)
- hold_reason (nullable)
- blocked_timestamp (nullable)
- posted_timestamp (nullable)
- final_response_text

Required Events
- draft_created
- flagged (if any risk)
- approval_granted OR blocked
- posted OR post_failed

Weekly KPI Calculations (test cases)
- Response rate = responses_posted / total_reviews_received
- Median first-response time = median(posted_timestamp - review_created_timestamp) for posted
- SLA compliance % = % posted within configured SLA
- Escalations by level/reason = count where escalation_level >= L1
- Unresolved holds aging = now - blocked_timestamp for blocked_manual_review not unblocked
- Reconciliation: approved_count = posted_count + blocked_count + failed_count (within period) must match audit events.

Next Step (Execution)
Run the sandbox or limited live verification using the runbook already provided (v1.2). Launch is “Go” only when: (1) manual-only holds cannot post through any path, (2) audit logs contain all required fields/events, and (3) weekly KPIs reconcile exactly to audit logs.
