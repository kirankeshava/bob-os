# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:44:42.417Z

---

## 1) Scope & Goal
This pack is the final QA/compliance handoff for **AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)**. The objective is to ensure: (1) responses are brand-safe and non-inflammatory; (2) negative reviews escalate correctly; (3) outputs comply with Google/Yelp policies (no incentives, no fake reviews, no removal promises, no competitor disparagement); (4) hallucination/PHI controls prevent confirming private facts; (5) posting/approval audit trail supports accountability; (6) weekly KPI reporting is accurate and reconcilable.

Customer legitimacy references (for any external comms):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

---
## 2) Test Suite Summary (End-to-End)
### 2.1 Core suite (45 reviews)
- **Dentist:** 15 cases (positive, neutral, billing dispute, pain/injury allegation, HIPAA/PHI bait, “you ruined my teeth”, legal threats, doxxing attempts, discriminatory language, suspected fake)
- **Med Spa:** 15 cases (outcome claims, adverse reaction, medical claims bait, pricing/refund dispute, staff name callouts, “you botched me”, legal threats, suspected fake)
- **HVAC:** 15 cases (property damage, safety hazard, overcharge claims, no-show/late arrival, warranty disputes, competitor mention, suspected fake)

### 2.2 Yelp-specific addendum (6 reviews)
Edge cases validated:
- “Yelp removed my review / you’ll get this taken down” accusations
- Competitor comparisons and baiting
- Incentive/discount demands
- Threats to report the business to Yelp
- Back-and-forth baiting (“reply publicly and I’ll post screenshots”)
- Solicitation-adjacent language traps

### 2.3 Final results
- **Core suite:** 45/45 pass (100%)
- **Yelp addendum:** 6/6 pass (100%)

---
## 3) Brand Safety / Hallucination Controls — Required Behaviors
### 3.1 Non-negotiable response rules
Every public response MUST:
1) Be polite, concise, non-argumentative.
2) Avoid admitting liability or fault (no “we caused”, “our mistake”, “we messed up”).
3) Avoid confirming service relationship if sensitive (health contexts especially): do not confirm patient/client identity or details.
4) Avoid medical outcome guarantees or claims.
5) Avoid incentives/discounts tied to reviews.
6) Avoid doxxing: never repeat addresses, phone numbers, last names, staff schedules.
7) Include an **offline resolution CTA** (phone/email) in all neutral/negative scenarios.
8) If legal threat detected: **manual-only hold** (do not post).

### 3.2 “Never invent” hallucination list (must be enforced)
The system must not fabricate or infer:
- That the reviewer was a patient/client/customer.
- Appointment dates/times, procedures, diagnosis, treatment plan, chart/records.
- Prices/discounts unless explicitly and verifiably provided by the business user.
- Staff actions, internal investigation results, camera footage outcomes.
- That a refund was issued or denied.

Implementation note: enforce with (a) prompt constraints, (b) pre-post safety scan for banned phrases, (c) source-of-truth variables only.

---
## 4) Posting Gate & Audit Trail Acceptance Criteria
### 4.1 Required states
- draft_created
- flagged (with risk_flags)
- approved (human approval where required)
- blocked_manual_review (system-enforced hold)
- posted (successful)
- post_failed (with error_code)

### 4.2 Minimum required log schema
Each response attempt must log:
- review_source (google|yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags[]
- escalation_level (None|Ops|Billing|Safety|Legal|PHI)
- response_mode (auto_post|requires_approval|blocked_manual_review)
- draft_version
- model_version / prompt_version / detector_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (posted|blocked_manual_review|post_failed)
- error_code (nullable)
- final_response_text
- hold_reason (nullable)
- blocked_timestamp (nullable)
- unblocker_id + unblock_timestamp (nullable)

### 4.3 Gate rules (testable)
- If **legal threat** detected (e.g., “attorney”, “lawsuit”, “sue”, “served papers”): response_mode=blocked_manual_review; escalation_level=Legal; no posting via API/UI.
- If **PHI/records confirmation bait** detected (e.g., “chart”, “records”, “visit”, “HIPAA”): response must not confirm relationship; must use generic phrasing; if it cannot comply, must block.
- If **doxxing** detected: remove personal identifiers from draft; if reviewer includes them, do not repeat.

---
## 5) Weekly KPI Report — Definitions & Accuracy Checks
### 5.1 KPI definitions
- Response rate = responses_posted / total_reviews_received (per platform, per location)
- First response time (median/avg) = posted_timestamp - review_created_timestamp
- SLA compliance % = % responses with first_response_time <= SLA threshold (e.g., 24h)
- Rating trend = avg_rating (7d vs 30d) and delta
- Sentiment buckets = positive/neutral/negative based on review star + keyword heuristic (or model label, but must be consistent)
- Escalations count = number flagged by escalation_level and reason
- Unresolved escalation aging = now - flagged_timestamp where unresolved
- Reconciliation table: approved vs posted vs blocked_manual_review vs post_failed

### 5.2 Report must reconcile
Counts in weekly report must match audit log aggregates for the same time window.

---
## 6) Brand-Safety Checklist v3 (Operational Tick-Box)
Use this before approving any response.

### 6.1 Universal checks (Google + Yelp)
- [ ] Tone is calm, respectful, non-sarcastic, non-argumentative
- [ ] No blaming the reviewer; no threats/retaliation
- [ ] No liability admission (no “we caused”, “our fault”)
- [ ] No promises of outcomes (“guarantee”, “will fix everything”)
- [ ] No mention of internal confidential facts (records, footage, staff discipline)
- [ ] No personal data repeated (phone/address/last name/medical details)
- [ ] Offline CTA included for any neutral/negative: “please contact us at …”
- [ ] If legal threat keywords present: response is blocked_manual_review; do not post

### 6.2 Healthcare-specific (Dentist + Med Spa)
- [ ] No confirmation of patient relationship (“we saw you”, “your visit”, “your chart/records”)
- [ ] No diagnosis/treatment discussion
- [ ] No medical outcome claims or guarantees
- [ ] Use generic phrasing: “We take feedback seriously” rather than “Regarding your procedure…”

### 6.3 Platform policy checks
**Google Business Profile**
- [ ] No incentives/discounts for reviews
- [ ] No request to “change/remove your review”
- [ ] No irrelevant promotional content in dispute replies

**Yelp**
- [ ] No promises about Yelp moderation/removal (“Yelp will delete this”)
- [ ] No review gating language
- [ ] No competitor disparagement

### 6.4 Blocked phrases (hard block or auto-rewrite)
- “we reviewed your chart/records/visit”
- “as your dentist/provider”
- “we admit/our fault/we caused”
- “we guarantee” / “100% results”
- “we’ll give you a discount/freebie” tied to review
- “we will have Yelp/Google remove this”
- Any explicit legal sparring: “see you in court”

---
## 7) Escalation Playbook v3 (Common Negative Scenarios)
### 7.1 Escalation levels & SLAs
- Ops: respond within 24h; resolve within 3 business days
- Billing: respond within 24h; provide internal invoice review within 2 business days
- Safety (injury/damage/hazard): notify Owner/GM <4h; begin investigation same day
- PHI: immediate manual review; do not confirm relationship; consider blocking
- Legal: same-day routing to legal counsel; public response typically **do not post** until reviewed

### 7.2 Do-not-post conditions
Do not post (block_manual_review) if review includes:
- Lawsuit/attorney threats
- Demands for public disclosure of records/medical details
- Active safety investigation requiring factual determinations
- Harassment that escalates risk (threats of violence)

### 7.3 Evidence checklist (internal)
- Billing: invoice, scope of work, signed estimate
- Service quality: work order, technician notes, appointment logs
- Safety/property damage: photos, incident report, insurance contact (if applicable)
- Healthcare: keep internal notes private; do not reference records publicly

---
## 8) Approved Response Templates v3 (Per Vertical)
Rules for all templates:
- Variables allowed: {business_name}, {first_name_or_team} (no last names), {public_phone}, {public_email}, {location_city}
- Prohibited variables: appointment date/time, procedure name, invoice amount unless user verified, patient/client identity, “chart/records” references

### 8.1 Dentist (Google/Yelp)
**DENT-POS-01 (Positive)**
“Thank you for the kind words. We’re glad you had a great experience with {business_name}. If there’s ever anything we can do to help, feel free to reach us at {public_phone}.”

**DENT-NEU-01 (Neutral/brief)**
“Thanks for sharing your feedback. We’re always working to improve. If you’re open to it, please contact {business_name} at {public_phone} so we can learn more.”

**DENT-NEG-MILD-01 (Wait time/communication)**
“Thank you for the feedback. We’re sorry to hear your experience didn’t meet expectations. Please call {business_name} at {public_phone} so we can better understand what happened and work toward a resolution.”

**DENT-NEG-STRONG-01 (Pain/poor outcome allegation — no PHI confirmation)**
“Thank you for reaching out. We take concerns like this seriously and want to look into what happened. For privacy reasons, we can’t discuss details here—please contact {business_name} directly at {public_phone} so our team can help.”

**DENT-FAKE-01 (Suspected fake/non-customer — non-accusatory)**
“Thank you for the note. We can’t match this experience based on the information provided, but we’d like to understand more. Please contact {business_name} at {public_phone} so we can look into it.”

**DENT-LEGAL-HOLD (Legal threat)**
System action: block_manual_review. Suggested internal-only draft (not auto-posted): “We take all feedback seriously. Please contact our office at {public_phone} so we can route your message to the appropriate team.”

### 8.2 Med Spa (Google/Yelp)
**SPA-POS-01**
“Thank you for your review. We appreciate you choosing {business_name} and we’re glad you enjoyed your visit. If you need anything, reach us at {public_phone}.”

**SPA-NEG-REACTION-01 (Adverse reaction claim — privacy safe)**
“Thank you for sharing this. We’re sorry to hear you’re having concerns. For privacy reasons we can’t discuss details here—please contact {business_name} at {public_phone} as soon as possible so we can support you.”

**SPA-BILLING-01**
“Thanks for the feedback. We’d like to review what happened and make sure everything is explained clearly. Please contact {business_name} at {public_phone} and we’ll help.”

**SPA-FAKE-01**
“Thank you for the message. We want to understand more, but we can’t identify the experience from this post. Please reach out to {business_name} at {public_phone} so we can look into it.”

### 8.3 HVAC (Google/Yelp)
**HVAC-POS-01**
“Thanks for choosing {business_name}. We appreciate your feedback and are glad we could help. If you need anything else, call us at {public_phone}.”

**HVAC-NOSHOW-01**
“Thank you for the feedback, and we’re sorry for the inconvenience. We’d like to look into scheduling and make it right. Please contact {business_name} at {public_phone}.”

**HVAC-DAMAGE-01 (Property damage allegation — no liability admission)**
“Thank you for bringing this to our attention. We take concerns like this seriously and want to review the details. Please contact {business_name} at {public_phone} so we can follow up directly.”

**HVAC-PRICING-01**
“Thank you for the feedback. We aim to be transparent about pricing and scope of work. Please contact {business_name} at {public_phone} so we can review your concerns and clarify the details.”

**HVAC-FAKE-01**
“Thanks for the note. We’d like to understand more, but we can’t identify the service from this post. Please contact {business_name} at {public_phone} so we can look into it.”

---
## 9) Launch Gate (Go/No-Go)
Go only if all are true:
1) Detectors pass unit tests (legal, PHI/records bait, incentives, doxxing, competitor disparagement).
2) Manual-only hold prevents posting through API and UI.
3) Audit logs include all required fields/events for posted/blocked/failed.
4) Weekly KPI report reconciles with audit logs for a test window.

No-Go if:
- Any PHI confirmation occurs in healthcare vertical outputs.
- Any legal-threat review is posted.
- Any incentive language appears.
- Audit trail cannot prove who approved/posted and why holds occurred.

---
## 10) Owner/Engineering Next Step
Choose verification environment:
- Sandbox (preferred, $0 if available), OR
- Limited live test on one internal/low-risk location (3–5 posts max, $0) using the runbook; ensure blocked_manual_review cases are included to validate prevention.
