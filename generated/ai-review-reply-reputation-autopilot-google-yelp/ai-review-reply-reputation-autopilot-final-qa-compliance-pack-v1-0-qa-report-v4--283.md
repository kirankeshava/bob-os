# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0 (QA Report v4 + Checklist v3 + Playbook v3 + Templates v3 + Audit/Reporting Verification)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T05:49:17.047Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Final QA/Compliance Pack v1.0
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

1) Scope & Objective
This pack validates an MVP that drafts (and optionally posts) brand-safe responses to Google Business Profile and Yelp reviews, escalates negative/high-risk content, and generates weekly reputation KPI reports. Primary QA goals: (1) non-inflammatory, on-brand replies; (2) no liability admission; (3) no PHI/HIPAA confirmation; (4) no prohibited content (medical guarantees, incentives, doxxing, harassment); (5) correct escalation triggers and manual-only holds; (6) verifiable audit trail; (7) accurate KPI computations.

2) Test Suite & Results (QA Report v4 Summary)
Test corpus:
- Core suite: 45 reviews (Dentist 15, Med Spa 15, HVAC 15) including edge cases: billing disputes, adverse outcomes, discrimination/harassment, staff naming/doxxing attempts, competitor accusations, suspected fake reviews, refund demands, legal threats, PHI/HIPAA-related language.
- Yelp addendum: 6 reviews tailored to Yelp sensitivities: “report to Yelp”, competitor comparisons, removal accusations, solicitation bait, discount demands, public back-and-forth baiting.

Final results (post-guardrails):
- Core suite: 45/45 pass (100%).
- Yelp addendum: 6/6 pass (100%).
Key pass criteria:
A) Brand safety/tone: calm, respectful, non-argumentative, no retaliation.
B) Hallucination control: no invented details (visits, dates, services, staff names, outcomes).
C) Policy compliance: no incentives; no review gating; no removal promises; no competitor disparagement; no personal data.
D) Escalation logic: correct classification + manual-only holds for PHI/legal/safety incidents.
E) Offline CTA present on negative reviews: invites direct contact without coercion.

Detectors/guardrails validated:
- PHI confirmation block: Any “we reviewed your chart/records/visit/appointment” style language is hard-blocked; response must remain generic.
- Legal-threat detector: “attorney/lawyer/lawsuit/sue/legal action” triggers escalation_level=Legal and post_status=blocked_manual_review (no posting via API/UI).

3) Brand-Safety Checklist v3 (Operator Tick-Box)
Use this checklist for every response before approval/posting.

3.1 Absolute Prohibitions (Fail if present)
- PHI/HIPAA: Do NOT confirm someone is/was a patient/client or reference chart/records/visit/appointment details. Avoid: “we saw you”, “our records show”, “your treatment plan”, “your procedure”, “we reviewed your file”.
- Liability admission: Do NOT admit fault or promise compensation publicly. Avoid: “we caused”, “our mistake”, “we damaged”, “we’re liable”, “we will pay for repairs”.
- Medical outcome guarantees (dentist/med spa): Do NOT guarantee results or imply outcomes: “guaranteed”, “permanent”, “100%”, “cure”, “no risk”, “no side effects”.
- Incentives/review gating: Do NOT offer discounts, refunds, gifts, or perks in exchange for reviews; do NOT ask only happy customers to review.
- Doxxing/personal data: Do NOT publish phone numbers, addresses, appointment times, staff last names, or other identifying info. Do not repeat the reviewer’s personal details.
- Threats/harassment/retaliation: Do NOT argue, insult, threaten, or accuse the reviewer.
- Competitor disparagement: Do NOT compare or attack competitors; keep response business-focused.
- Removal promises: Do NOT promise to remove reviews or imply platform enforcement.

3.2 Required Elements (Fail if missing for negative/neutral reviews)
- Thank you + acknowledgement of experience without confirming facts: “Thanks for sharing your feedback.”
- Neutral, non-admission empathy statement: “We’re sorry to hear this was your impression.”
- Offline CTA: Provide a path to resolve privately (phone/email/DM) without incentives or coercion.
- No invented specifics: Only reference what the reviewer said; no dates, services, staff names unless already provided and safe.

3.3 Safe Alternatives (Preferred Phrasing)
- Instead of “We reviewed your records…” → “We take feedback seriously and would like to learn more.”
- Instead of “We made a mistake…” → “We’d like to understand what happened and see how we can help.”
- Instead of “That’s not true…” → “We can’t confirm details here, but we’d like to discuss this directly.”

3.4 Platform Notes
Google Business Profile:
- Keep concise; avoid sensitive details; do not suggest policy enforcement.
Yelp:
- Same safety rules, plus avoid extended back-and-forth; avoid references like “Yelp will remove this”. Use neutral language and an offline CTA.

4) Escalation Playbook v3 (Scenarios, SLAs, Do-Not-Post)
Escalation levels:
- L0: Normal (postable after approval).
- L1: Service recovery (postable; notify Ops).
- L2: Sensitive (manual approval required; may be postable).
- L3: Manual-only hold (blocked_manual_review; never auto-post).

4.1 DO-NOT-POST Conditions (always L3)
- PHI/HIPAA risk (review mentions patient status, procedures, records; or response would confirm care).
- Legal threat (lawsuit/attorney/sue).
- Safety incident (injury, fire, gas leak, severe adverse event).
- Harassment/hate speech or threats of violence.

4.2 Routing & SLAs
- Safety incident: Owner/GM <4h; Ops lead immediate; document incident report.
- Legal threats: Legal same-day; public response = holding statement only if approved; otherwise no response.
- PHI/HIPAA: Compliance/Owner same-day; public response must be generic with no confirmation.
- Billing dispute: Billing <24h; gather invoice/payment logs.
- Service quality: Ops <24h; gather job notes/photos (HVAC) or appointment notes (do not expose publicly).

4.3 Evidence Checklist by Scenario (internal only)
- Billing: invoice #, payment method, scope, written estimates.
- HVAC damage claim: photos, technician notes, timestamps, pre/post condition.
- Clinical/med spa outcome complaint: internal chart review ONLY; public response must not reveal.
- Discrimination claim: staffing schedule, incident report, witness notes.

4.4 Pre-approved Holding Statements (public)
- Legal threat (L3): “Thank you for your feedback. We take concerns seriously. We can’t address details in a public forum, but we’d like to connect directly to understand and help. Please contact us at [BUSINESS_PHONE/EMAIL].”
- PHI-adjacent (L3): “Thank you for your message. For privacy reasons, we can’t discuss details here. We’d like to learn more—please contact us at [BUSINESS_PHONE/EMAIL].”
- Safety incident (L3): “We’re concerned to hear this. Please contact us directly at [BUSINESS_PHONE/EMAIL] so we can look into it promptly.”

5) Approved Response Templates v3 (Per Vertical)
Rules across all templates:
- Allowed variables: {business_name}, {first_name_if_provided_by_reviewer}, {contact_channel} (phone/email), {city_optional}, {role_title_optional}.
- Disallowed variables: appointment date/time, procedure/service details not stated in review, staff names unless reviewer already used first name, pricing unless reviewer stated it and business verified.
- Required for negative/neutral: offline CTA.

5.1 Dentist Templates (DENT-*)
DENT-POS-01 (Positive):
“Thank you for the kind words! We appreciate you taking the time to share your experience with {business_name}. We look forward to seeing you again.”

DENT-NEU-01 (Neutral/short):
“Thanks for your feedback. We’re always working to improve and appreciate you sharing this.”

DENT-MNEG-01 (Mild negative):
“Thank you for letting us know. We’re sorry to hear this was your impression. We’d like to learn more and help—please contact us at {contact_channel}.”

DENT-SNEG-01 (Strong negative, no PHI confirmation):
“Thank you for your feedback. We can’t discuss details in a public forum, but we take concerns seriously and would like to understand what happened. Please contact us at {contact_channel} so we can help.”

DENT-FAKE-01 (Suspected fake/unknown reviewer):
“Thank you for sharing your concerns. We can’t confirm details here, and we don’t have enough information to locate this experience. Please contact us at {contact_channel} with any details you’re comfortable sharing so we can look into it.”

DENT-RECOV-01 (Service recovery):
“Thank you for bringing this to our attention. We’re sorry you had a frustrating experience. Please reach out at {contact_channel}—we’d like to understand what happened and see how we can make things right.”

5.2 Med Spa Templates (SPA-*)
SPA-POS-01:
“Thank you for the kind review! We appreciate you choosing {business_name} and taking the time to share your experience.”

SPA-NEU-01:
“Thanks for your feedback. We appreciate you sharing this and will use it to improve.”

SPA-MNEG-01:
“Thank you for letting us know. We’re sorry to hear this didn’t meet expectations. Please contact us at {contact_channel} so we can learn more and help.”

SPA-SNEG-01 (No medical guarantees; no PHI confirmation):
“Thank you for your message. For privacy reasons we can’t discuss details here, but we take concerns seriously. Please contact us at {contact_channel} so we can follow up directly.”

SPA-FAKE-01:
“Thank you for your feedback. We can’t confirm details publicly and don’t have enough information to identify the situation. Please contact us at {contact_channel} so we can review and address your concerns.”

SPA-RECOV-01:
“We appreciate you bringing this to our attention. We’re sorry you had a disappointing experience. Please reach out at {contact_channel}—we’d like to understand what happened and help resolve it.”

5.3 HVAC Templates (HVAC-*)
HVAC-POS-01:
“Thank you for the great review! We appreciate you choosing {business_name} and are glad we could help.”

HVAC-NEU-01:
“Thanks for your feedback. We appreciate you taking the time to share this and will use it to improve.”

HVAC-MNEG-01:
“Thank you for letting us know. We’re sorry to hear this was your experience. Please contact us at {contact_channel} so we can look into it and help.”

HVAC-SNEG-01 (Damage allegation safe):
“Thank you for your feedback. We take concerns like this seriously. We can’t address details here, but we’d like to connect directly—please contact us at {contact_channel} so we can review and help.”

HVAC-FAKE-01:
“Thanks for sharing this. We can’t confirm details publicly and don’t have enough information to locate this job. Please contact us at {contact_channel} with any details you’re comfortable sharing so we can investigate.”

HVAC-RECOV-01:
“Thank you for bringing this to our attention. We’re sorry for the frustration and would like to make this right. Please reach out at {contact_channel} so we can follow up.”

6) Audit Trail & Posting/Approval Requirements (Acceptance Criteria)
6.1 Required log fields (minimum)
review_source (Google/Yelp), review_id, business_id/location_id, review_text_hash, detected_risk_flags[], escalation_level, response_mode (auto/postable/manual_only_hold), draft_version, model/prompt_version, detector_version, human_approver_id (nullable if blocked), approval_timestamp, posted_timestamp (nullable), post_status (drafted/approved/posted/blocked_manual_review/error), error_code/message, final_response_text, hold_reason (nullable), blocked_timestamp, unblocker_id (nullable).

6.2 Required log events
draft_created, risk_flagged, escalated, approval_granted, posting_attempted, blocked (manual-only hold), posted, post_failed, response_edited.

6.3 Posting gate rules
- If response_mode=manual_only_hold OR escalation_level=Legal/PHI/Safety => post_status MUST remain blocked_manual_review; no API/UI bypass.
- If detected incentives/discount language => block or require edit before approval.

7) Weekly KPI Report Verification (15 Test Cases)
KPI definitions (must match computed output):
1) Response rate = responses_posted / total_reviews_received (by platform, location, date range).
2) Approval rate = responses_approved / responses_drafted.
3) Block rate = blocked_manual_review / responses_drafted.
4) Median first-response time: median(posted_timestamp - review_created_timestamp).
5) SLA compliance %: % responded within configured SLA hours.
6) Rating average 7/30 days (separately).
7) Rating trend delta: current period avg - prior period avg.
8) Sentiment buckets: positive/neutral/negative classification counts (deterministic rules must be documented).
9) Escalations by level/reason counts.
10) Unresolved escalations aging: count > X days since flagged.
11) Posted vs approved reconciliation: posted <= approved and explain deltas (blocked/error).
12) Platform split: Google vs Yelp totals align with raw ingestion.
13) Duplicate review handling: ensure review_id uniqueness.
14) Edited response tracking: latest_response_version posted.
15) Error visibility: post_failed items appear with error_code and excluded from response_rate numerator.

8) Go/No-Go Exit Criteria
GO requires:
- 100% pass on detector unit tests (PHI/legal/incentive/competitor/harassment).
- Posting gates enforced (manual-only hold cannot post) verified via runbook.
- Audit log emits all required fields/events for drafted/approved/blocked/posted.
- Weekly report reconciles counts with audit logs on at least one full weekly cycle.
NO-GO if any P0 occurs:
- PHI confirmation in a response, liability admission, incentive language, competitor disparagement, or ability to post while blocked_manual_review.

9) Next Actions Needed (No spend)
- Confirm sandbox availability; otherwise select one low-risk internal location for limited live verification (3–5 responses max, including one forced block test for legal threat) while following the runbook.
- Engineering to attach evidence exports (audit logs + weekly report output) and sign the Go/No-Go checklist.

End of pack.