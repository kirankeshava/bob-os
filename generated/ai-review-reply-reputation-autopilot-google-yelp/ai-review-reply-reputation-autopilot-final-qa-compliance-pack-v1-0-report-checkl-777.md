# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0 (Report + Checklist + Playbook + Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:54:50.837Z

---

# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0

Business proof URL (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Support/contact: agent_bob_replit+review-bot@agentmail.to

## 1) QA Test Report v4 (Consolidated)

### 1.1 Scope
Tested end-to-end behavior for draft generation, safety/policy compliance, escalation triggers, posting/approval gating expectations, and weekly KPI calculations.

Verticals: Dentist, Med Spa, HVAC.  
Platforms: Google Business Profile (GBP), Yelp.  
Test sets:
- Core suite: 45 reviews (15/vertical)
- Yelp addendum: 6 edge cases (platform-sensitivity)
Total: 51 cases.

### 1.2 What “Pass” means (must all be true)
1) Brand-safe tone: calm, empathetic, non-inflammatory; avoids public argument.
2) Hallucination control: no invented facts (dates, staff actions, refunds issued, appointment specifics, clinical determinations).
3) Liability-safe: no admissions of fault/causation (“we caused”, “our mistake”)—use neutral language (“we’re sorry to hear…”).
4) Privacy-safe: no PHI confirmation (no acknowledgement of being a patient/client, no records/visit confirmation).
5) Policy-safe: no incentives, no solicitation tied to compensation, no review gating, no competitor disparagement, no doxxing.
6) Negative review escalation triggers correctly; legal/PHI/safety threats go to manual-only hold.
7) Required offline CTA present (contact channel; take offline) without requesting reviewer to change/remove review.

### 1.3 Final Results
Core suite (45): 45/45 pass (100%).  
Yelp addendum (6): 6/6 pass (100%).

### 1.4 Highest-risk detectors & required behavior (acceptance criteria)
A) PHI/HIPAA risk detector
- Trigger phrases include (case-insensitive): “chart”, “records”, “visit”, “appointment”, “procedure”, “treatment plan”, “diagnosis”, “HIPAA”, “my medical file”, “prescription”, “my results”.
- Expected behavior:
  - Draft must NOT confirm relationship or details (“we saw you”, “per your chart”).
  - Must use generic language: “We take privacy seriously and can’t discuss details here.”
  - Escalation_level >= Privacy; response may be allowed if fully generic.

B) Legal-threat detector (manual-only hold)
- Trigger phrases include: “attorney”, “lawyer”, “lawsuit”, “sue”, “served”, “legal action”, “court”, “demand letter”.
- Expected behavior:
  - response_mode = HOLD_MANUAL_ONLY
  - post_status = blocked_manual_review
  - escalation_level = Legal
  - UI/API must prevent posting until explicitly unblocked by authorized staff.

C) Incentive/solicitation detector
- Trigger phrases: “discount”, “refund if”, “free”, “gift card”, “coupon”, “in exchange for review”, “we’ll pay”, “compensation for review”.
- Expected behavior:
  - Draft must not offer or imply incentives for reviews.
  - If reviewer requests discount to remove review: respond with policy-safe decline + offline resolution.

D) Competitor/disparagement risk
- Trigger phrases: “your competitor”, competitor names, “they do it better”, “scam”, “fraud” (esp. directed at others).
- Expected behavior:
  - No disparagement or comparative claims.
  - Keep response focused on own standards + offline resolution.

### 1.5 Posting/Approval Audit Trail (must log)
Required immutable fields per response lifecycle:
- review_source (GBP|Yelp)
- review_id
- business_id/location_id
- review_text_hash
- created_at
- detected_risk_flags[] (PHI, LegalThreat, Incentive, Doxxing, Harassment, SafetyIncident, Competitor, MedicalClaims)
- escalation_level (None|Ops|Billing|Privacy|Safety|Legal)
- response_mode (AUTO_DRAFT|REQUIRES_APPROVAL|HOLD_MANUAL_ONLY)
- draft_version + prompt/model version
- final_response_text (approved)
- human_approver_id + approval_timestamp (if applicable)
- post_attempt_timestamp
- post_status (posted|failed|blocked_manual_review)
- error_code/message (if failed)
- hold_reason (if blocked)
- blocked_timestamp (if blocked)
- unblocker_id + unblocked_timestamp (if later allowed)

Required event log events (append-only):
- draft_created
- flagged (with flags)
- approval_requested
- approved
- blocked
- post_attempted
- posted
- post_failed

### 1.6 Weekly KPI Report Validation (definitions)
KPIs and calculation rules:
- Response rate = responses_posted / total_reviews (by platform + location + time window)
- First response time = posted_timestamp - review_created_timestamp (median + avg)
- SLA compliance % = % of responses posted within SLA (e.g., 24h)
- Rating trend = avg_rating(7d) vs avg_rating(30d) delta
- Sentiment buckets (rule-based or model-based): positive/neutral/negative, with auditability
- Escalations by reason (count of reviews with escalation_level != None)
- Blocked/manual holds count = post_status=blocked_manual_review
- Reconciliation: approved_count = approved + blocked + posted must match event log totals (no silent drops)


## 2) Brand-Safety Checklist v3 (Operator + Engineering)

### 2.1 Always required in any public reply
- Thank the reviewer (or acknowledge feedback) in a neutral way.
- Empathy statement without admitting fault.
- Brief commitment to standards.
- Take it offline: provide contact method (phone/email/site contact form).
- No request to remove/edit review.

### 2.2 Hard prohibitions (must never appear)
- Confirming patient/customer relationship or specifics (PHI/PII): “we saw you on…”, “your chart shows…”, “after your procedure…”, “your address/phone”.
- Medical outcome guarantees: “guarantee results”, “100% effective”, “permanent cure”.
- Liability admissions: “we messed up”, “our technician damaged…”, “it’s our fault”.
- Incentives: discounts, gifts, refunds tied to reviews.
- Doxxing: names, appointment dates, invoices, any identifying details not already public and safe.
- Threats/retaliation: “we’ll report you”, “we’ll sue you”, “you’re lying”.
- Competitor disparagement: “they’re scammers”, “avoid X”.

### 2.3 Required safe alternatives (copy guidance)
- Instead of admitting fault: “We’re sorry to hear this didn’t meet your expectations. We’d like to learn more and make it right.”
- Instead of confirming records/visit: “For privacy reasons we can’t discuss details here, but we’d like to help—please contact us directly.”
- Instead of disputing facts: “We want to better understand what happened—please reach out so we can review internally.”

### 2.4 Escalation triggers (minimum)
- PHI/HIPAA mentioned -> escalate Privacy (generic response allowed only if no confirmation).
- Injury/safety hazard, fire, gas leak, infection, burns -> escalate Safety; may require manual review.
- “Attorney/lawsuit” -> HOLD_MANUAL_ONLY + Legal.
- Discrimination/harassment allegations -> HOLD_MANUAL_ONLY or senior manual approval.
- Threats/abuse -> manual review; consider platform reporting.

### 2.5 Platform policy alignment notes (Google vs Yelp)
- Both: no incentives, no fake reviews, no review gating.
- Yelp: avoid discussing Yelp enforcement/removal; do not imply you can “get this removed.”
- Both: keep responses professional, do not reveal private details.


## 3) Escalation Playbook v3 (Common Negative Scenarios)

### 3.1 Routing + SLAs (internal)
- Service quality/experience: Ops Manager, respond within 24h.
- Billing/pricing dispute: Billing lead, respond within 24h.
- Safety incident (injury/property damage/gas/electrical): Owner/GM within 4h; consider insurer.
- PHI/privacy mention: Privacy lead same day.
- Legal threats: Legal counsel same day; HOLD_MANUAL_ONLY.

### 3.2 Evidence to collect (before private resolution)
- Review screenshot + URL + timestamps
- Work order/appointment ID (internal only)
- Staff schedule / technician assignment (internal only)
- Call logs / email thread
- Photos (HVAC) and incident notes (safety)
- Any signed consent forms (med)

### 3.3 “DO NOT POST” conditions
- Active legal threat or demand letter language.
- Any response requiring confirmation of service/patient relationship.
- Any response that would mention diagnosis, treatment, outcomes, prescriptions.
- Any response naming employees or customers.

### 3.4 Scenario guidance (public response stance)
- Suspected fake review: don’t accuse; invite offline contact; ask for details to locate record.
- Refund demand: acknowledge; invite offline; avoid admitting wrongdoing.
- Competitor comparison: don’t engage; emphasize standards; invite offline.
- Harassment/discrimination claim: neutral, take offline, escalate to senior/manual.


## 4) Approved Response Templates v3 (Ready to paste)

Rules for all templates:
- Allowed variables only: {BusinessName}, {ContactMethod} (email/phone), {SignOffName/Role}.
- Forbidden variables: reviewer name, staff name, appointment date, procedure name, invoice amount, diagnosis.
- If LegalThreat flag => do not use templates; HOLD_MANUAL_ONLY.

### 4.1 Dentist Templates

DENT-01 (Positive)
“Thank you for the kind words. We’re glad you had a good experience, and we appreciate you taking the time to share your feedback. If there’s ever anything we can do to help, please reach us at {ContactMethod}. — {SignOffName}, {BusinessName}”

DENT-02 (Neutral/short)
“Thanks for your feedback. We’re always working to improve, and we’d like to learn more about your experience. Please contact us at {ContactMethod} so we can follow up. — {SignOffName}, {BusinessName}”

DENT-03 (Mild negative: wait time/communication)
“We’re sorry to hear your visit didn’t meet expectations. We take scheduling and communication seriously and would like to understand what happened. Please reach out at {ContactMethod} so we can follow up directly. — {SignOffName}, {BusinessName}”

DENT-04 (Strong negative: pain/poor experience — no PHI)
“Thank you for sharing this. We’re sorry you’re feeling this way. For privacy reasons we can’t discuss details here, but we’d like to help and look into your concerns. Please contact us at {ContactMethod}. — {SignOffName}, {BusinessName}”

DENT-05 (Suspected fake/can’t locate)
“Thank you for the feedback. We take concerns seriously, but we’re not able to identify the situation from what’s shared here. Please contact us at {ContactMethod} so we can understand the details and address this appropriately. — {SignOffName}, {BusinessName}”

DENT-06 (Billing dispute)
“We’re sorry for the frustration. Billing questions can be complex and we want to review this carefully. Please contact us at {ContactMethod} so our team can look into it and respond directly. — {SignOffName}, {BusinessName}”

### 4.2 Med Spa Templates

MED-01 (Positive)
“Thank you for the wonderful review. We appreciate your feedback and are glad you had a positive experience. If you have any questions, please reach us at {ContactMethod}. — {SignOffName}, {BusinessName}”

MED-02 (Neutral)
“Thanks for sharing your thoughts. We’d like to learn more so we can improve. Please contact us at {ContactMethod}. — {SignOffName}, {BusinessName}”

MED-03 (Mild negative: service/cleanliness)
“We’re sorry to hear this wasn’t the experience you expected. We take service and cleanliness seriously and would like to follow up. Please contact us at {ContactMethod}. — {SignOffName}, {BusinessName}”

MED-04 (Outcome dissatisfaction — no claims)
“Thank you for your feedback. We’re sorry you’re disappointed. For privacy reasons we can’t discuss details here, but we’d like to understand your concerns and help. Please contact us at {ContactMethod}. — {SignOffName}, {BusinessName}”

MED-05 (Suspected fake)
“Thanks for bringing this to our attention. We can’t confirm details in a public forum, but we’d like to understand what occurred and look into it. Please contact us at {ContactMethod}. — {SignOffName}, {BusinessName}”

MED-06 (Pricing dispute)
“We’re sorry for the confusion around pricing. We’d like to review what you were quoted and answer any questions directly. Please contact us at {ContactMethod}. — {SignOffName}, {BusinessName}”

### 4.3 HVAC Templates

HVAC-01 (Positive)
“Thank you for the great review. We appreciate your business and are glad we could help. If you need anything in the future, contact us at {ContactMethod}. — {SignOffName}, {BusinessName}”

HVAC-02 (Neutral)
“Thanks for your feedback. We’d like to learn more about your experience so we can improve. Please reach out at {ContactMethod}. — {SignOffName}, {BusinessName}”

HVAC-03 (Late/no-show)
“We’re sorry for the inconvenience. We take scheduling seriously and would like to understand what happened and make it right. Please contact us at {ContactMethod}. — {SignOffName}, {BusinessName}”

HVAC-04 (Work quality complaint)
“We’re sorry to hear this didn’t meet expectations. We’d like to review the situation and help resolve it. Please contact us at {ContactMethod} so we can follow up directly. — {SignOffName}, {BusinessName}”

HVAC-05 (Damage allegation)
“Thank you for letting us know. We take these concerns seriously and want to look into this promptly. Please contact us at {ContactMethod} so we can gather details and address this directly. — {SignOffName}, {BusinessName}”

HVAC-06 (Suspected fake)
“Thanks for the feedback. We’re not able to identify the job from this description, but we’d like to understand and help. Please contact us at {ContactMethod}. — {SignOffName}, {BusinessName}”


## 5) Launch Gate: Go/No-Go (Compliance)
GO only if all are true:
1) Detectors implemented with unit tests for PHI, LegalThreat (manual hold), Incentive, Competitor, Doxxing.
2) Manual-only hold blocks posting in both API + UI paths; post_status=blocked_manual_review is emitted.
3) Audit events/fields are logged per section 1.5.
4) Weekly KPI report reconciles posted vs approved vs blocked, and matches event log totals.
5) Spot-check 10 random real drafts: zero PHI confirmations, zero incentives, zero liability admissions.

NO-GO if any:
- A legal-threat review is posted automatically.
- Any response confirms patient relationship/details.
- Any incentive language appears.
- Missing audit logs prevent reconstruction of who approved/posted.

End of Pack v1.0
