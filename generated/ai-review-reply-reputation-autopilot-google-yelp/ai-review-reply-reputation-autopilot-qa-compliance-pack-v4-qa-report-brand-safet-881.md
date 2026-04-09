# AI Review Reply & Reputation Autopilot — QA & Compliance Pack v4 (QA Report + Brand Safety Checklist + Escalation Playbook + Approved Templates + Audit/Reporting Acceptance Criteria)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:49:11.977Z

---

Overview
This pack is a launch-readiness QA and compliance deliverable for “AI Review Reply & Reputation Autopilot” (Google Business Profile + Yelp). It is designed to prevent unsafe/hallucinated responses, policy violations, PHI/HIPAA exposure, and brand-risk outcomes. It includes: (1) QA test report summary and exit criteria; (2) brand-safety checklist; (3) escalation playbook; (4) approved response templates per vertical (dentist, med spa, HVAC) with platform notes; (5) audit-trail and weekly-report acceptance criteria.

Product/legitimacy references (for internal and customer-facing comms)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support email: agent_bob_replit+review-bot@agentmail.to

1) QA Test Report v4 (Summary)
Test scope
- Core suite: 45 reviews across 3 verticals (15 dentist, 15 med spa, 15 HVAC)
- Yelp addendum: 6 Yelp-specific edge cases (removal accusations, competitor comparisons, incentive bait, discount demands, “report to Yelp” threats, bait for public arguments)
Key risk categories tested
- PHI/HIPAA/medical privacy: any confirmation of patient relationship, visit details, records
- Medical claims: guarantees/outcome promises, contraindicated advice, treatment assertions
- Liability/legal: admissions of fault, “we caused damage,” “we broke,” “our tech messed up,” etc.
- Incentives: offering discounts/freebies in exchange for reviews; review gating/solicitation
- Doxxing/personal data: names, phone numbers, addresses, staff identification beyond role
- Harassment/discrimination: inflammatory tone; retaliation; threats; hate speech engagement
- Platform policy alignment: no removal promises; no competitor disparagement; no spam

Final results
- Core suite: 45/45 pass (100%) after guardrails
- Yelp addendum: 6/6 pass (100%)
Release-blocker exit criteria (must remain true)
P0 (block launch):
- Any response that confirms PHI/patient relationship or references records (“chart,” “file,” “visit,” “appointment details”) in a way that implies verified identity.
- Any medical outcome guarantee or definitive clinical claim.
- Any incentive/discount tied to leaving/changing/removing a review.
- Any response posted when escalation_level=Legal or response_mode=blocked_manual_review.
P1 (must be fixed within 24–48h):
- Missing offline CTA on negative reviews.
- Argumentative/accusatory tone, or any implication the reviewer is lying.
- Overly specific remediation promises (“we will refund you today”) without approval.

Required guardrails validated
- PHI hard block: phrases like “reviewed your chart/records/visit/appointment” force generic privacy-safe response.
- Legal-threat detector: “attorney/lawsuit/sue” triggers escalation_level=Legal and post_status=blocked_manual_review.
- Offline resolution CTA required for negative/neutral and all escalations.

2) Brand-Safety Checklist v3 (Tick-box, operational)
Use this checklist before approving or posting any response.

2.1 Universal “DO NOT” (Google + Yelp)
- Do not confirm identity or relationship (no “we remember your visit,” “as your dentist,” “your procedure”).
- Do not reference medical records, charts, appointment times, invoices, or treatment specifics.
- Do not provide medical advice, diagnosis, or guarantees (no “this will fix,” “permanent results,” “no risk”).
- Do not admit liability or fault (avoid “we broke,” “we caused,” “our mistake,” “we are negligent”).
- Do not request, offer, or imply incentives for reviews (no discounts, freebies, “contact us for a coupon”).
- Do not ask the reviewer to edit/remove the review or imply the platform will remove it.
- Do not disparage competitors or compare (“we’re better than X,” “their tech is bad”).
- Do not disclose personal data (names of staff beyond first name/role if user provided; never phone/email/address of individuals).
- Do not argue. Do not accuse the reviewer of lying/faking; use neutral language.

2.2 Required elements for safe negative-review responses
- Acknowledge feelings without validating disputed facts: “We’re sorry to hear you had a frustrating experience.”
- State privacy limitation (healthcare/med spa especially): “We can’t discuss details publicly.”
- Offer offline resolution path: phone/email request.
- Avoid commitments you can’t guarantee: “We’d like to learn more” vs “We will refund.”

2.3 Blocked phrase list (hard blocks / auto-manual)
Trigger “blocked_manual_review” or force a safe generic template when detected:
- PHI/records: “chart,” “medical record,” “records,” “we reviewed your file,” “your visit,” “your appointment,” “procedure on [date]”
- Legal: “attorney,” “lawyer,” “lawsuit,” “sue,” “served,” “legal action,” “demand letter”
- Incentives: “discount for review,” “free if you update,” “coupon for 5 stars,” “we’ll pay you”
- Removal promises: “we’ll get this removed,” “Yelp will delete,” “Google will take it down”

2.4 Platform-specific notes
Google Business Profile (GBP)
- Keep responses concise and professional; avoid personal data and sensitive details.
- Never imply special treatment for positive reviews.
Yelp
- Avoid anything that looks like solicitation or review gating.
- Do not discuss Yelp enforcement processes or claim you can remove reviews.

3) Escalation Playbook v3 (Scenarios, routing, SLAs, DO-NOT-POST)
Escalation levels
- L0: Standard (positive/neutral). Auto-draft OK.
- L1: Service recovery (mild negative). Auto-draft OK; offline CTA required.
- L2: High-risk complaint (strong negative, safety allegation, discrimination claim). Draft allowed but requires human approval.
- L3: PHI/privacy risk OR Legal threat. Response_mode=blocked_manual_review. Do not post.

Routing SLAs (internal)
- Billing/price dispute: Billing lead within 24h.
- Service quality/late/no-show: Ops manager within 24h.
- Safety incident/property damage/injury: Owner/GM within 4h.
- Discrimination/harassment allegation: Owner/HR same-day.
- Legal threats: Legal counsel same-day (L3, manual-only hold).
- PHI mention/identity claims: Compliance lead same-day (L3, manual-only hold).

Evidence checklist (collect before any public reply for L2/L3)
- Original review text + timestamp + platform link/review_id
- Customer record lookup result (only internally; never referenced publicly)
- Job/appointment notes, photos, invoices (HVAC)
- Incident report if safety/damage alleged
- Prior communications logs

DO-NOT-POST conditions (always)
- Mentions of records/PHI where reply could confirm relationship.
- Legal threats or active dispute where counsel has not approved.
- Safety investigation in progress.
- Any draft containing blocked phrases, incentives, or competitor disparagement.

4) Approved Response Templates v3 (per vertical)
Rules for all templates
- Allowed variables: {BusinessName}, {SupportEmail}, {SupportPhone}, {City}.
- Disallowed variables: reviewer name (unless already public and non-sensitive), appointment date/time, provider name, treatment details, invoice amounts unless confirmed and intentionally disclosed by business.
- All negative templates must include offline CTA.

4.1 Dentist templates (Google/Yelp safe)
DENT-POS-01 (Positive)
“Thank you for the kind words. We appreciate you taking the time to share your experience with {BusinessName}. If there’s ever anything we can do to help, please reach us at {SupportPhone}.”

DENT-NEU-01 (Neutral/short)
“Thanks for the feedback. We’re always working to improve. If you’re open to sharing more privately, please contact us at {SupportPhone} or {SupportEmail}.”

DENT-NEG-01 (Mild negative)
“We’re sorry to hear your experience didn’t meet expectations. We can’t discuss details here, but we’d like to understand what happened and see how we can help. Please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

DENT-NEG-02 (Strong negative)
“Thank you for bringing this to our attention. We take concerns like this seriously. For privacy reasons, we can’t address specifics publicly, but we’d like to look into this promptly. Please reach out to {SupportPhone} or {SupportEmail} so we can follow up.”

DENT-FAKE-01 (Suspected fake / no match)
“We take feedback seriously, but we can’t find enough information here to identify the situation. If you believe this relates to an interaction with {BusinessName}, please contact us at {SupportPhone} or {SupportEmail} so we can review your concerns privately.”

DENT-RECOV-01 (Service recovery)
“We appreciate you sharing this. We aim for respectful, timely care, and we’d like the chance to make things right. Please contact {SupportPhone} or {SupportEmail} so we can follow up offline.”

4.2 Med Spa templates
MEDSPA-POS-01
“Thank you for your feedback. We’re glad you had a great experience with {BusinessName}. If you have any questions in the future, please contact us at {SupportPhone}.”

MEDSPA-NEU-01
“Thanks for the review. We’re always working to improve. If you’d like to share more details privately, please reach us at {SupportEmail} or {SupportPhone}.”

MEDSPA-NEG-01 (No outcomes guarantees)
“We’re sorry to hear you’re disappointed. We can’t discuss details publicly, but we’d like to learn more and address your concerns. Please contact {SupportPhone} or {SupportEmail}.”

MEDSPA-NEG-02 (Strong negative)
“Thank you for letting us know. We take your concerns seriously. For privacy reasons we can’t comment on specifics here, but we’d like to follow up promptly. Please contact {SupportPhone} or {SupportEmail}.”

MEDSPA-FAKE-01
“We take reviews seriously, but we don’t have enough information here to identify the situation. Please contact {SupportEmail} so we can look into your concerns privately.”

MEDSPA-RECOV-01
“We appreciate the feedback and the chance to improve. We’d like to connect offline to better understand what happened and see how we can help. Please reach us at {SupportPhone}.”

4.3 HVAC templates
HVAC-POS-01
“Thank you for the review. We appreciate you choosing {BusinessName} and are glad we could help. If you ever need us again, you can reach us at {SupportPhone}.”

HVAC-NEU-01
“Thanks for the feedback. If you’re open to sharing more details so we can improve, please contact {SupportPhone} or {SupportEmail}.”

HVAC-NEG-01 (Mild)
“We’re sorry to hear this wasn’t a better experience. We’d like to learn more and see what we can do to help. Please reach out to {SupportPhone} or {SupportEmail} so we can follow up.”

HVAC-NEG-02 (Strong; no liability admission)
“Thank you for bringing this to our attention. We take concerns about service quality and safety seriously. Please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can look into this and follow up directly.”

HVAC-FAKE-01
“We take this seriously, but we can’t identify the job from this post. Please contact us at {SupportPhone} with any details you’re comfortable sharing so we can review and respond offline.”

HVAC-RECOV-01 (Service recovery)
“We appreciate the chance to improve. If you contact us at {SupportPhone}, we’ll have a manager follow up to better understand what happened and address your concerns.”

5) Audit Trail + Posting/Approval Acceptance Criteria
Goal: every draft/flag/approval/post/hold must be traceable for compliance and weekly KPI accuracy.

5.1 Required log fields (minimum)
- review_source (google|yelp)
- review_id (platform id)
- business_id, location_id
- review_timestamp
- review_text_hash (hash of original text)
- detected_risk_flags (array)
- escalation_level (L0–L3)
- response_mode (auto|needs_approval|blocked_manual_review)
- template_id_used (or “freeform”) and draft_version
- model_version + prompt_version (traceability)
- human_approver_id (nullable), approval_timestamp (nullable)
- post_attempt_timestamp (nullable)
- post_status (posted|failed|blocked_manual_review|not_attempted)
- error_code/error_message (if failed)
- final_response_text
- blocked_timestamp, hold_reason, detector_version (if blocked)
- unblocker_id, unblocked_timestamp (if later allowed)

5.2 Required audit events
- draft_created
- flagged (with flags)
- approval_requested
- approved OR rejected
- post_attempted
- posted OR blocked_manual_review OR post_failed

5.3 Posting gate acceptance criteria (must pass)
- If response_mode=blocked_manual_review, system must prevent posting through both API and UI and must emit post_status=blocked_manual_review.
- If escalation_level=Legal, response_mode must be blocked_manual_review by default.
- Any draft containing blocked phrases must either (a) be rewritten into a privacy-safe generic template without PHI confirmation, or (b) be blocked for manual review depending on rule severity.

6) Weekly Reputation KPI Definitions (for report accuracy)
- Response rate = (# reviews with post_status=posted) / (# total reviews received)
- First response time (median/avg) = posted_timestamp - review_timestamp (for posted only)
- SLA compliance % = % of reviews responded within configured SLA window (e.g., 48h)
- Escalations count by level/reason = count by escalation_level + flag categories
- Blocked count = # post_status=blocked_manual_review
- Reconciliation check: posted + blocked_manual_review + not_attempted/failed must equal total drafts created for the period; approved must be >= posted.

Go/No-Go (QA sign-off requirements)
GO only if:
- 0 P0 and 0 P1 open.
- Posting gate blocks all Legal/PHI holds (verified by logs).
- Audit schema fields/events are present and exportable.
- Weekly report reconciles (approved vs posted vs blocked) without gaps.
NO-GO if:
- Any PHI confirmation slips through.
- Any incentive language appears.
- Any Legal escalation can be posted.

Owner/Engineering next step
Confirm whether there is a sandbox/test environment for Google Business Profile and Yelp. If not, run a limited live verification on a single low-risk internal location using the runbook, then attach exported logs and the generated weekly report output as evidence for final sign-off.