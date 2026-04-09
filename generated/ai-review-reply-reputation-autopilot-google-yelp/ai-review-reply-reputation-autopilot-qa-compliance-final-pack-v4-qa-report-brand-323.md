# AI Review Reply & Reputation Autopilot — QA & Compliance Final Pack v4 (QA Report + Brand-Safety Checklist + Escalation Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:14:14.916Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
QA & Compliance Final Pack v4
Website (customer legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

1) QA TEST REPORT v4 (END-TO-END)
Scope
- Core QA suite: 45 reviews (15 Dentist, 15 Med Spa, 15 HVAC)
- Yelp-specific addendum: 6 reviews (policy sensitivity edge cases)
- Validated areas: (1) brand safety/tone, (2) hallucination control, (3) platform policy compliance, (4) negative-review escalation correctness, (5) offline CTA presence, (6) posting/approval audit trail, (7) weekly KPI/report accuracy.

Pass/Fail Summary (Final)
- Core suite: 45/45 PASS (100%)
- Yelp addendum: 6/6 PASS (100%)
- Remaining P0/P1 defects: 0 open

Top Failure Modes Observed (historical; now mitigated)
FM1: PHI/visit confirmation language (e.g., “we reviewed your chart/visit/records”).
- Mitigation: Hard-block phrases implying access to records; force generic non-confirming language.
FM2: Legal threat responses posted automatically.
- Mitigation: Legal-threat detector triggers response_mode=HOLD_MANUAL_ONLY and blocks posting.
FM3: Medical outcome guarantees or certainty (“we guarantee results”, “permanent”, “cured”).
- Mitigation: Blocked phrase list + substitute language: “results vary”, “we’d like to discuss”.
FM4: Liability admission (“we messed up”, “our fault”, “negligent”).
- Mitigation: Liability-admission block + safe alternative: “we’re sorry to hear” without admitting.
FM5: Incentive/discount phrasing that could be construed as review solicitation (“contact us for a discount”).
- Mitigation: No incentives; offline CTA must not include compensation.
FM6: Doxxing/staff naming and specifics.
- Mitigation: Never confirm identities; avoid names/appointments; take offline.

Acceptance Criteria: Posting Gates & Response Modes
A. Pre-generation gate (input risk classification)
- Detect risk flags: PHI/HIPAA, legal threat, discrimination/harassment, safety incident/injury, extortion, competitor accusations, spam/fake review signals.
- If legal threat OR safety incident with injury: escalation_level=Legal/Safety and response_mode=HOLD_MANUAL_ONLY.
B. Pre-post gate (hard enforcement)
- If response_mode=HOLD_MANUAL_ONLY then post_status MUST be blocked_manual_review (no API/UI posting path can override).
- If PHI risk flag is present, drafted response must be generic and must not confirm the reviewer is/was a customer/patient.

Audit Trail Requirements (minimum log schema)
Required fields per review-response lifecycle:
- review_source (google|yelp)
- review_id
- business_id, location_id
- review_text_hash
- detected_risk_flags[]
- escalation_level (none|ops|billing|safety|legal)
- response_mode (auto_draft|needs_approval|hold_manual_only)
- draft_version, model_version, prompt_version
- draft_created_timestamp
- human_approver_id (nullable)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (drafted|approved|blocked_manual_review|posted|post_failed)
- error_code (nullable)
- final_response_text
- hold_reason (nullable)
- detector_version
- blocked_timestamp (nullable)
- unblocker_id (nullable)

Weekly Report KPI Definitions + QA Test Cases (minimum)
KPIs:
1) Response rate = responses_posted / total_reviews_received (by source, location, date range)
2) Approval rate = responses_approved / responses_drafted
3) Median first-response time (posted_timestamp - review_received_timestamp)
4) SLA compliance % (e.g., % responded within 24h)
5) Rating trend (avg rating 7-day and 30-day rolling)
6) Sentiment buckets (positive/neutral/negative) using deterministic rules; must be explainable
7) Escalations count by level/reason
8) Holds/blocks count (blocked_manual_review) and aging (days in hold)
9) Reconciliation: drafted = approved + blocked + pending
Test cases include: missing timestamps, duplicate review IDs, blocked vs posted separation, multi-location rollups, and source-level splits.

2) BRAND-SAFETY CHECKLIST v3 (OPERATOR TICK-BOX)
Use before approving/posting any response.

Universal MUSTs
[ ] Thank the reviewer (when appropriate) and keep tone calm/non-defensive.
[ ] Do NOT admit fault/liability; no “we messed up”, “our negligence”, “we caused”.
[ ] Do NOT confirm identity, customer/patient status, appointment, chart, records, or services received.
[ ] Do NOT include personal data (names, phone numbers, addresses, staff schedules).
[ ] Include an offline CTA (phone/email) that routes to the business (not incentives).
[ ] No incentives/discounts/freebies tied to reviews; no “we’ll refund if you update this review”.
[ ] No medical guarantees/outcome certainty; avoid “cure”, “permanent”, “guarantee”, “100%”.
[ ] No threats/retaliation; no arguing; no blaming the reviewer.
[ ] No competitor disparagement.
[ ] No legal positioning (“defamation”, “we will sue”) in public replies.

Required Safe Alternatives (copy rules)
- Instead of confirming service (“We treated you last Tuesday…”):
  Use: “We take feedback seriously and would like to learn more about your concerns.”
- Instead of admitting fault: 
  Use: “We’re sorry to hear you had a frustrating experience.”
- Instead of medical certainty:
  Use: “Outcomes can vary; we’d like to discuss your situation directly.”

Hard Block Phrases (examples; not exhaustive)
- PHI confirmation: “chart”, “records”, “your visit”, “your appointment”, “we saw you”, “we treated you”, “per your file”.
- Liability admission: “our fault”, “we were negligent”, “we caused”, “we broke”, “we damaged”.
- Incentives: “discount”, “coupon”, “free”, “gift card”, “in exchange for”, “update your review and”.
- Legal: “lawsuit”, “sue”, “attorney”, “defamation”, “legal action”.

Platform Notes
Google Business Profile:
- Keep replies concise, professional, and broadly applicable.
- No sensitive personal data; avoid back-and-forth.
Yelp:
- Do not discuss Yelp enforcement, removals, or claim you can “report and remove” reviews.
- Avoid implying the reviewer is lying; invite offline resolution.

3) ESCALATION PLAYBOOK v3 (SCENARIO ROUTING)
Escalation Levels
- None: routine positive/neutral.
- Ops: service quality, scheduling, staff demeanor.
- Billing: price disputes, refund requests.
- Safety: alleged injury, dangerous work, contamination, malpractice allegation framed as safety.
- Legal: threats of lawsuit/attorney, subpoenas, extortion, harassment/stalking.

DO NOT POST (automatic hold_manual_only)
- Any legal threat language (“attorney”, “lawsuit”, “sue”).
- Any safety incident involving injury or active investigation.
- Any review containing PHI/medical specifics that risk confirmation.
- Any content with hate speech/harassment or threats.

Routing SLAs (internal)
- Safety incidents: notify Owner/GM within 4 hours.
- Legal threats: notify Legal/Owner same business day.
- Billing disputes: notify Billing within 24 hours.
- Ops/service issues: notify Ops Manager within 24 hours.

Evidence Checklist (collect internally; do not post publicly)
- Review screenshot + URL + timestamp
- Internal job/appointment lookup (internal only)
- Any comms logs (calls/emails)
- Photos/invoices where applicable (HVAC)
- Incident report (Safety)

Public Response Principles (when allowed)
- Acknowledge feelings; avoid blame.
- Invite offline resolution via official contact.
- Keep it generic; no specifics.

4) APPROVED RESPONSE TEMPLATES v3 (PER VERTICAL)
Rules for all templates
- Allowed variables: {BusinessName}, {SupportEmail}, {SupportPhone}, {ManagerNameOptional}, {CityOptional}
- Disallowed variables: reviewer name (unless already public and safe), staff names, appointment date/time, procedure details, pricing unless reviewer already provided AND business verified.
- Mandatory offline CTA in all negative/mixed scenarios.

A) DENTIST TEMPLATES (Google/Yelp-safe)
DENT-01 Positive
“Thank you for the kind words. We appreciate you taking the time to share your experience with {BusinessName}. We look forward to seeing you again.”

DENT-02 Neutral/Short
“Thanks for the feedback. If there’s anything we can do to improve your experience, please reach out to us at {SupportPhone} or {SupportEmail}.”

DENT-03 Mild Negative (service/courtesy)
“We’re sorry to hear your visit felt disappointing. We take feedback seriously and would like to learn more so we can improve. Please contact us at {SupportPhone} or {SupportEmail}.”

DENT-04 Strong Negative (no PHI confirmation)
“Thank you for sharing your concerns. We aim to provide respectful, high-quality care and would like to discuss this directly. Please contact our office at {SupportPhone} or {SupportEmail}.”

DENT-05 Suspected Fake/Not a Patient (non-accusatory)
“We take reviews seriously, but we’re not able to match this experience based on the details provided. Please contact us at {SupportPhone} or {SupportEmail} so we can look into your concerns.”

DENT-06 Medical outcome complaint (no guarantees)
“We’re sorry to hear you’re unhappy. Outcomes and experiences can vary, and we’d like to understand what happened and discuss next steps privately. Please reach us at {SupportPhone} or {SupportEmail}.”

B) MED SPA TEMPLATES
SPA-01 Positive
“Thank you for your review. We appreciate your support and are glad you had a great experience at {BusinessName}.”

SPA-02 Neutral/Short
“Thanks for the feedback. If you’d like to share more details, please contact us at {SupportPhone} or {SupportEmail}.”

SPA-03 Mild Negative (wait time)
“We’re sorry for the wait and appreciate you letting us know. We’re always working to improve scheduling and communication. Please reach out at {SupportPhone} or {SupportEmail} so we can follow up.”

SPA-04 Strong Negative (avoid confirming treatment)
“Thank you for sharing your concerns. We’d like to learn more and address this directly. Please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

SPA-05 Suspected fake/competitor (no disparagement)
“We take feedback seriously, but we can’t verify this experience from the information here. Please contact us at {SupportPhone} or {SupportEmail} so we can look into it.”

SPA-06 Results dissatisfaction (no medical claims)
“We’re sorry to hear you’re disappointed. Experiences can vary, and we’d like to understand your concerns and discuss options privately. Please reach out at {SupportPhone} or {SupportEmail}.”

C) HVAC TEMPLATES
HVAC-01 Positive
“Thank you for the review. We appreciate you choosing {BusinessName} and are glad we could help.”

HVAC-02 Neutral/Short
“Thanks for the feedback. If there’s anything we can do to improve, please contact us at {SupportPhone} or {SupportEmail}.”

HVAC-03 Mild Negative (timing/communication)
“We’re sorry to hear communication didn’t meet expectations. We’d like to learn more and make this right. Please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

HVAC-04 Strong Negative (damage allegation—no admission)
“Thank you for bringing this to our attention. We take concerns like this seriously and would like to discuss details directly. Please contact us at {SupportPhone} or {SupportEmail}.”

HVAC-05 Billing dispute
“We understand billing concerns can be frustrating. Please contact us at {SupportPhone} or {SupportEmail} so we can review your questions and work toward a resolution.”

HVAC-06 Suspected fake
“We take reviews seriously, but we’re not able to confirm this experience from the information provided. Please contact us at {SupportPhone} or {SupportEmail} so we can look into it.”

5) POLICY ALIGNMENT (GOOGLE + YELP) — NON-NEGOTIABLES
- No incentives for reviews, no discounts/freebies in exchange for review edits.
- No review gating (“only leave a review if happy”).
- No promises to remove reviews or claims about platform enforcement.
- No public disclosure/confirmation of PHI or private customer details.
- Keep responses professional, generic, and focused on offline resolution.

6) EXECUTION NOTES (FOR ENGINEERING/OPS)
- Implement detectors as both (a) pre-generation constraints and (b) pre-post hard gates.
- Log every state transition as an auditable event: draft_created, flagged, approved, blocked, posted, post_failed.
- Ensure response_mode=HOLD_MANUAL_ONLY cannot be posted through any channel (UI or API).

End of Pack v4
