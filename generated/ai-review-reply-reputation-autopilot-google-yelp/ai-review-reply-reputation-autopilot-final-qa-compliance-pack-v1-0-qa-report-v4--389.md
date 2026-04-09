# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:01:18.061Z

---

## 1) Scope & Objective
This pack is the compliance source-of-truth for the MVP: drafting and (optionally) posting responses to Google Business Profile (GBP) and Yelp reviews, escalating negative/high-risk reviews, and generating weekly reputation KPIs. Goal: ensure responses are brand-safe, non-inflammatory, non-hallucinatory, and aligned to GBP/Yelp policies (no incentives, no review gating, no removal promises, no competitor disparagement, no PHI/HIPAA disclosure/confirmation, no medical outcome guarantees). This pack also defines posting/approval audit requirements and report/KPI validation tests.

Business proof-of-legitimacy to include in internal docs / customer-facing emails: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support contact: agent_bob_replit+review-bot@agentmail.to

---
## 2) Test Method Summary (QA Report v4)
### 2.1 Test Suite
Core suite: 45 reviews across 3 verticals (15 dentist, 15 med spa, 15 HVAC) including edge cases:
- PHI/HIPAA mention or implied patient relationship
- Medical outcome/guarantee claims
- Billing disputes, refunds, chargebacks
- Alleged injury/damage/safety issue
- Discrimination/harassment language
- Doxxing attempts (staff names/addresses/phone)
- Competitor comparisons/accusations
- Suspected fake/competitor review
- Legal threats (“attorney”, “lawsuit”, “sue”)

Yelp addendum: 6 policy-sensitive tests
- Accusation of review removal/shadowbanning
- Threat to “report to Yelp”
- Demands for discount in exchange for update
- Solicitation baiting (“give me something and I’ll change it”)
- Competitor disparagement bait
- Public back-and-forth baiting

### 2.2 Pass/Fail Gates
A response FAILS if it:
- Confirms PHI/patient relationship OR references records/visits/appointments (“we reviewed your chart/records/visit”) in a way that implies confirmed identity.
- Admits liability (“we caused”, “our fault”, “we broke”, “we made you sick”).
- Makes medical guarantees/outcome promises.
- Requests/solicits incentives, discounts, freebies for reviews or updates.
- Suggests review gating (“contact us first before leaving a review”).
- Promises removal, flags, or enforcement actions by Yelp/Google.
- Doxxes or repeats personal data; names staff or customers without explicit permission.
- Uses aggressive/argumentative/retaliatory language.
- Omits an offline-resolution CTA on negative content (unless “manual-only hold”).

### 2.3 Final Results
- Core suite: 45/45 PASS (100%).
- Yelp addendum: 6/6 PASS (100%).
- Defects: all previously identified P0/P1 issues are closed.

### 2.4 Required Guardrails (Must-Implement)
Guardrail A — PHI/records hard block (generation constraint)
- If review contains any phrase implying records/visit verification (e.g., “chart”, “records”, “your visit”, “your appointment”, “as your dentist”, “as your provider”) OR the model is about to output a confirmation phrase, force response to generic language:
  - Allowed: “We take privacy seriously and can’t discuss details here.”
  - Not allowed: “We reviewed your chart/records/visit…”

Guardrail B — Legal threat = manual-only hold (posting gate)
- Trigger lexicon: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “served”, “court”, “demand letter”.
- Expected system behavior:
  - escalation_level = Legal
  - response_mode = HOLD_MANUAL_ONLY
  - post_status = blocked_manual_review
  - No auto-posting via API or UI. Draft may be generated but must be marked “DO NOT POST” until human approves.

---
## 3) Brand-Safety Checklist v3 (Operator Tick-Box)
Use this checklist before approving any response draft.

### 3.1 Universal Must-Haves
[ ] Polite, calm, non-argumentative tone.
[ ] Thanks the reviewer (even if critical) without sounding sarcastic.
[ ] Invites offline resolution with a clear CTA (phone/email). Example: “Please contact our team at [phone] or [email] so we can look into this.”
[ ] Does not request the reviewer to change/remove their review.
[ ] Does not mention internal processes, investigations, or disciplinary actions.

### 3.2 Prohibited Content (Hard No)
PHI / privacy:
[ ] No confirmation of identity or patient/customer relationship.
[ ] No mention of “chart/records/visit/appointment” in a confirmatory way.
[ ] No details of treatment, diagnosis, outcomes, or dates.

Liability:
[ ] No admissions like “we caused”, “our fault”, “we damaged”.
[ ] Use neutral phrasing: “We’re sorry to hear this” / “We’d like to understand what happened.”

Medical claims (dentist/med spa):
[ ] No guarantees: “results guaranteed”, “permanent”, “no risk”, “100% safe”.
[ ] No promises of specific outcomes.

Incentives / solicitation:
[ ] No discounts/freebies/credits offered in exchange for reviews.
[ ] No “message us and we’ll make it right with a discount” phrasing.

Doxxing / personal data:
[ ] No names of staff or reviewers; no phone/address posted publicly (unless it’s the business’s official contact).

Competitors:
[ ] No disparagement of competitors; no “they’re lying” / “competitor planted this.”

Platform enforcement:
[ ] No promise that Yelp/Google will remove or hide reviews.

### 3.3 Platform Notes
Google Business Profile:
- Keep concise; focus on service recovery and offline resolution.
- Do not include medical specifics.

Yelp:
- Avoid referencing Yelp policies, removals, or threats.
- Avoid extended back-and-forth; redirect offline.

---
## 4) Escalation Playbook v3 (Common Negative Scenarios)
### Escalation Levels
- L0: Normal (positive/neutral)
- L1: Service issue (late arrival, rudeness, quality dissatisfaction)
- L2: Billing dispute (charges, refunds, warranty disputes)
- L3: Safety incident (injury, hazardous work, infection control)
- L4: Privacy/PHI risk
- L5: Legal threat (lawsuit/attorney)

### SLAs & Routing
- L5 Legal threat: same-day to Owner/Legal. Response mode: HOLD_MANUAL_ONLY.
- L4 PHI risk: <4 hours to Owner/Compliance. Response must be generic privacy-safe.
- L3 Safety incident: <4 hours to Owner/GM + Ops Lead.
- L2 Billing dispute: <24 hours to Billing.
- L1 Service failure: <24 hours to Ops/Location manager.

### Evidence to Collect (Internal)
Billing: invoice #, dates, communication logs.
Safety: photos, work order, technician notes, incident report.
PHI: do not copy PHI into general tools; store only in compliant internal system.
Legal: preserve review + timestamps; stop public replies until counsel approves.

### DO NOT POST Conditions
- Any legal threat content (L5) until manual legal review.
- Any draft that references records/visits/appointments in a confirmatory way.
- Any draft containing admission of fault/liability.
- Any draft offering incentives.

---
## 5) Approved Response Templates v3 (Ready to Paste)
Rules for all templates:
- Allowed variables: {BusinessName}, {SupportEmail}, {SupportPhone}, {City}.
- Do NOT add: staff names, patient/client identity confirmation, appointment dates, pricing specifics unless the business explicitly provided them and verified.
- For Yelp/GBP: keep it short; never mention platform enforcement.

### 5.1 Dentist Templates
DENT-01 Positive
“Thank you for the kind words. We’re glad you had a great experience with our team. If there’s anything we can do to help in the future, please reach us at {SupportPhone} or {SupportEmail}.”

DENT-02 Neutral/Short
“Thanks for your feedback. If you’d like to share more details so we can improve, please contact us at {SupportPhone} or {SupportEmail}.”

DENT-03 Mild Negative (service experience)
“Thank you for letting us know. We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and help—please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

DENT-04 Strong Negative (privacy-safe)
“We’re sorry to hear this. We take patient privacy seriously and can’t discuss anything publicly. Please contact our office at {SupportPhone} or {SupportEmail} so we can look into your concerns.”

DENT-05 Suspected Fake (non-accusatory)
“Thank you for the review. We’d like to understand what happened, but we can’t find enough information here to identify the situation. Please contact {SupportPhone} or {SupportEmail} so we can help.”

DENT-06 Safety/Outcome claim (no guarantees)
“Thank you for sharing this feedback. We’re sorry you’re feeling this way. Because we can’t discuss details publicly, please contact {SupportPhone} or {SupportEmail} so we can review your concerns and discuss next steps.”

### 5.2 Med Spa Templates
MED-01 Positive
“Thank you for the great review. We appreciate you taking the time to share your experience. For any questions, contact us at {SupportPhone} or {SupportEmail}.”

MED-02 Neutral
“Thanks for your feedback. If you’re open to sharing more so we can improve, please reach us at {SupportPhone} or {SupportEmail}.”

MED-03 Mild Negative
“We’re sorry to hear this wasn’t the experience you hoped for. We’d like to make this right—please contact {SupportPhone} or {SupportEmail} so we can learn more.”

MED-04 Strong Negative (no medical specifics)
“Thank you for raising this concern. We take feedback seriously and can’t discuss details publicly. Please contact {SupportPhone} or {SupportEmail} so we can address this directly.”

MED-05 No guarantees / outcome dissatisfaction
“We’re sorry you’re unhappy with your results. Individual experiences can vary, and we’d like to understand your concerns. Please contact {SupportPhone} or {SupportEmail} so we can discuss options.”

MED-06 Suspected fake
“Thanks for the review. We’d like to understand what happened, but we don’t have enough information here to locate the visit. Please contact {SupportPhone} or {SupportEmail} so we can help.”

### 5.3 HVAC Templates
HVAC-01 Positive
“Thank you for the review. We’re glad we could help. If you ever need anything else, contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

HVAC-02 Neutral
“Thanks for the feedback. If you’d like to share more details, please contact us at {SupportPhone} or {SupportEmail}.”

HVAC-03 Mild Negative (lateness/communication)
“We’re sorry to hear this. We aim to communicate clearly and be on time. Please contact {SupportPhone} or {SupportEmail} so we can look into what happened and help.”

HVAC-04 Billing dispute
“Thank you for letting us know. We’d like to review your concern and clarify any billing questions. Please contact our office at {SupportPhone} or {SupportEmail}.”

HVAC-05 Alleged damage
“We’re sorry to hear this concern. We’d like to understand what happened and address it directly. Please contact {SupportPhone} or {SupportEmail} so we can investigate and follow up.”

HVAC-06 Suspected fake
“Thank you for the review. We want to help, but we don’t have enough information here to locate the job. Please contact {SupportPhone} or {SupportEmail} so we can look into it.”

### 5.4 Internal-Only Template (Manual Hold)
HOLD-LEGAL-01 (Do Not Post)
“LEGAL HOLD: Review contains legal threat keywords. Do not post publicly. Route to Legal/Owner for approval. Capture audit log with hold_reason=legal_threat.”

---
## 6) Audit Trail Acceptance Criteria (Posting/Approval)
### 6.1 Required Log Fields
review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode, draft_version, final_response_text, human_approver_id, approval_timestamp, posted_timestamp, post_status, error_code, prompt_version/model_version, detector_version, hold_reason, blocked_timestamp, unblocker_id.

### 6.2 Required Events
draft_created → flagged (optional) → approved OR blocked_manual_review → posted OR post_failed.

### 6.3 Posting Gates
- If response_mode=HOLD_MANUAL_ONLY then post_status must be blocked_manual_review and no API/UI path can override without an explicit unblock event + approver.

---
## 7) Weekly KPI/Report Validation (14 Tests)
KPIs:
1) Response rate = responded_reviews / total_reviews.
2) Median first-response time (exclude blocked_manual_review).
3) SLA compliance % (responses within X hours).
4) Average rating (7/30-day) and trend.
5) Sentiment buckets (pos/neutral/neg) and counts.
6) Escalations by level and reason.
7) Unresolved escalation aging (days open).
8) Approved vs posted vs blocked reconciliation.
9) Post failure rate (post_failed / attempted_posts).
10) Manual-hold volume and mean time to unblock.

Each KPI test must validate:
- correct denominator rules
- time-window correctness
- correct exclusion/inclusion of held/blocked
- tie-out to audit log events

---
## 8) Go/No-Go Launch Rubric
GO requires:
- All detectors enabled (PHI block, legal hold, incentives, competitor disparagement, liability language warnings).
- Manual-only holds enforced across API + UI.
- Audit trail events and fields present for 100% of actions.
- Weekly report matches audit-log-derived totals for a test window.
- No template contains prohibited content; offline CTA present for all negative scenarios.

NO-GO triggers:
- Any instance of auto-posting while response_mode=HOLD_MANUAL_ONLY.
- Any PHI confirmation language in public response drafts.
- Any incentive/review-gating language in any draft.

---
## 9) Next Required Verification (Owner + Engineering)
Choose environment:
- Option A: Sandbox/test for GBP/Yelp if available.
- Option B: Limited live test on one low-risk internal location (3–5 posts max; include at least one legal-threat hold to prove blocking).

Evidence to attach for sign-off:
- Exported audit logs for the test window.
- Screenshot/exports showing blocked_manual_review prevents posting.
- Weekly KPI report output with reconciliation to audit logs.

For questions or escalation during verification: agent_bob_replit+review-bot@agentmail.to