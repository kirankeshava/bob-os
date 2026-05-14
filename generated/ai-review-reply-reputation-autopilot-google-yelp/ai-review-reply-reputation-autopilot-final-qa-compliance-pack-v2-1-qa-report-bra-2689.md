# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v2.1 (QA Report + Brand-Safety Checklist + Escalation Playbook + Approved Templates + KPI/Audit Acceptance Criteria)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:52:39.900Z

---

## 1) Scope & Goal
This pack validates brand safety, hallucination control, and platform policy alignment for the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). Goal: generate and (when allowed) post brand-safe, non-inflammatory responses that do not admit liability, do not confirm PHI/medical services, do not violate Yelp/Google guidelines, and correctly escalate/hold high-risk reviews. 

Business reference (legitimacy + contact):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

## 2) Test Coverage & Final Results
### 2.1 Core QA Suite (45 reviews)
Verticals: Dentist (15), Med Spa (15), HVAC (15). Edge cases included: PHI/HIPAA bait, medical outcome claims, pricing disputes, refund demands, discrimination/harassment, staff naming/doxxing attempts, competitor accusations, property damage/injury allegations, safety incidents, legal threats, and suspected fake reviews.

Final result (with guardrails enabled):
- Overall: 45/45 PASS (100%)
- Brand safety / tone: PASS
- Hallucination control: PASS (no fabricated facts; no invented remediation actions)
- Policy compliance (Google/Yelp): PASS
- Escalation classification: PASS
- Offline CTA presence (when negative/neutral): PASS

### 2.2 Yelp-Specific Addendum (6 reviews)
Cases: review removal accusations, “report to Yelp” threats, competitor comparisons, solicitation/incentive bait, discount demands, and public back-and-forth baiting.

Final result:
- 6/6 PASS
- Verified: no promises of removal/enforcement; no competitor disparagement; no incentives; no argumentative back-and-forth.

## 3) Closed Defects (Summary)
All previously observed P0/P1 issues are closed via two enforced gates:
1) PHI confirmation hard block: trigger phrases like “chart/records/visit/appointment details” force generic wording and forbid acknowledgement of being a patient.
2) Legal-threat manual-only hold: trigger phrases like “attorney/lawsuit/sue/legal action” force response mode = HOLD (no posting), escalation_level=Legal, post_status='blocked_manual_review'.

## 4) Non-Negotiable Safety Rules (Acceptance Criteria)
A response MUST:
1) Never confirm a reviewer is/was a patient/client (PHI safe). 
2) Never reference “your chart/records/visit/procedure” or appointment details. 
3) Never admit fault/liability (“we caused”, “our mistake”, “we broke”, “we injured”). Use empathy + investigation language.
4) Never provide medical guarantees or outcome claims (med spa/dentist). No “results guaranteed”, “permanent”, “cure”.
5) Never solicit incentives for reviews; never ask to change/remove a review; never gate service on removing reviews.
6) Never disparage competitors or discuss competitor wrongdoing.
7) Never doxx: do not repeat phone, address, email, last names, staff schedules; avoid naming individual staff unless business provided a safe public policy and reviewer already named them (still discouraged).
8) For negative/neutral reviews, include an offline resolution CTA (call/email) without incentives.
9) For legal threat / safety incident / PHI bait / harassment: DO NOT POST automatically; hold for manual review.

## 5) Brand-Safety Checklist v2.1 (Tick-Box)
Use this before approval/posting.

### 5.1 Universal Prohibitions
- [ ] No PHI confirmation: do not say/imply the person was treated, had an appointment, or received a service.
- [ ] No mention of “chart/records/visit/appointment/procedure details.”
- [ ] No medical advice or outcome promises; no clinical claims.
- [ ] No liability admission; no definitive causation statements.
- [ ] No incentives/discounts/freebies tied to reviews.
- [ ] No threats, retaliation, or arguing with reviewer.
- [ ] No competitor disparagement.
- [ ] No personal data repetition (doxxing), including staff details.

### 5.2 Required Elements (When Appropriate)
- [ ] Thank the reviewer (even if unhappy: thank them for feedback/time).
- [ ] Acknowledge feelings without conceding fault (“We’re sorry to hear…”).
- [ ] Offer offline resolution path (phone/email) and invite details privately.
- [ ] Keep it short, calm, non-defensive.

### 5.3 Blocked Phrase List (Hard Blocks or Forced Rewrites)
PHI/records bait (force generic response; do not post if too specific):
- “we reviewed your chart/records/notes/visit”
- “according to our records”
- “you were seen on [date]”
- “during your appointment/procedure”

Liability admissions (rewrite to non-admission):
- “our fault / our mistake / we messed up / we broke / we damaged”
- “we caused / we injured”

Incentives & gating:
- “discount / coupon / free / gift card” in connection with reviews
- “update/remove your review and we will…”

Legal threats (manual-only hold):
- “attorney / lawyer / lawsuit / sue / legal action / subpoena”

### 5.4 Platform Notes: Google vs Yelp
Google Business Profile:
- OK: generic invitations to contact offline; concise public responses.
- Not OK: requesting/encouraging fake reviews, incentives, or review gating.

Yelp:
- Strongly avoid: arguing policy/enforcement, claims of “Yelp will remove it,” or directing reviewer to post elsewhere.
- Not OK: incentives for reviews; solicitation that implies compensation.

## 6) Escalation Playbook v2.1 (Common Negative Scenarios)
Escalation levels:
- L0: Normal (safe to draft + post)
- L1: Ops Escalation (draft OK; requires manager approval)
- L2: Sensitive Hold (manual review; may post after edits)
- L3: Legal Hold (DO NOT POST; legal review)

### 6.1 Routing SLAs
- Safety incident / injury allegation: Owner/GM <4h, Ops same day.
- Billing dispute: Billing lead <24h.
- Service failure (HVAC no-show, rude staff): Ops <24h.
- PHI/HIPAA bait: Compliance/Owner same day.
- Legal threat: Legal/Owner same day (L3).

### 6.2 DO NOT POST Conditions (Auto-Hold)
- Mentions legal action/attorney/lawsuit (L3)
- Contains PHI bait requiring confirmation to respond (“my records show…”) (L2/L3 depending on specificity)
- Active safety investigation (gas leak, injury, police involvement) (L2)
- Harassment/threats (L2)

### 6.3 Evidence to Collect (Internal)
- Original review text + timestamp + platform + reviewer handle
- Work order/appointment lookup performed privately (do not reference publicly)
- Staff notes and any photos/video if applicable
- Prior communications (emails/calls)
- Proposed remedy options approved internally

## 7) Approved Response Templates Library v2.1 (Per Vertical)
Rules for all templates:
- Allowed variables: {BusinessName}, {SupportEmail}, {SupportPhone}, {City}, {TeamName}
- Banned variables: patient/client name, staff full names, appointment date/time, procedure/service details, prices unless explicitly confirmed safe and provided by business.
- Negative/neutral: MUST include offline CTA.

### 7.1 Dentist (Google/Yelp-safe)
DENT-01 Positive:
“Thank you for the kind words. We’re glad you had a great experience with our team at {BusinessName}. We appreciate you taking the time to share this.”

DENT-02 Neutral/short:
“Thank you for the feedback. We’re always working to improve. If you’re open to sharing more details, please contact us at {SupportEmail} so we can follow up.”

DENT-03 Mild negative (service experience):
“We’re sorry to hear this wasn’t the experience you expected. We’d like to look into what happened and see how we can help—please reach us at {SupportEmail} or {SupportPhone}. ”

DENT-04 Strong negative (no admission):
“Thank you for raising this. We take concerns seriously and want to address them directly. Please contact our office at {SupportPhone} or {SupportEmail} so we can understand the situation and work toward a resolution.”

DENT-05 PHI-bait safe generic (no confirmation):
“We take privacy seriously and can’t discuss specifics here. If you believe this relates to an interaction with our office, please contact {SupportPhone} so we can assist offline.”

DENT-06 Suspected fake/unknown reviewer:
“We don’t have enough information here to identify what this refers to, but we want to help if there’s a real issue. Please contact {SupportEmail} with details so we can look into it.”

### 7.2 Med Spa
MSPA-01 Positive:
“Thank you for your review. We appreciate your support and are glad you enjoyed your visit with {BusinessName}.”

MSPA-02 Neutral:
“Thanks for the feedback. If there’s anything we could have done better, we’d love to learn more—please email us at {SupportEmail}.”

MSPA-03 Mild negative:
“We’re sorry to hear you left disappointed. We’d like to understand what happened and see how we can make it right—please contact {SupportPhone} or {SupportEmail}.”

MSPA-04 Strong negative (no outcomes/guarantees):
“Thank you for bringing this to our attention. We take concerns seriously and want to address them privately. Please reach out to {SupportEmail} so a manager can follow up.”

MSPA-05 Medical/outcome claim bait (safe):
“We understand your concern. Because everyone’s situation is different, we can’t discuss specifics here. Please contact {SupportPhone} so we can review your concerns privately and help with next steps.”

MSPA-06 Suspected fake:
“We want to help, but we can’t identify the situation from this post. Please contact {SupportEmail} with any details so we can look into it.”

### 7.3 HVAC
HVAC-01 Positive:
“Thanks for choosing {BusinessName}. We appreciate the review and are glad our team could help.”

HVAC-02 Neutral:
“Thank you for the feedback. If you can share more details, please contact {SupportEmail} so we can follow up.”

HVAC-03 Late/no-show complaint:
“We’re sorry for the inconvenience. We’d like to review what happened and make this right—please call {SupportPhone} or email {SupportEmail}.”

HVAC-04 Damage allegation (no admission):
“Thank you for letting us know. We take these concerns seriously and want to look into it promptly. Please contact {SupportPhone} so we can gather details and follow up offline.”

HVAC-05 Pricing dispute:
“We understand billing concerns can be frustrating. Please contact {SupportEmail} so we can review the details with you privately.”

HVAC-06 Safety issue (gas smell, hazard) (often hold):
“Your safety is important. Please contact us immediately at {SupportPhone} so we can address this offline. If you believe there is an urgent hazard, please contact local emergency services.”

## 8) Posting/Approval Audit Trail (Required Log Fields)
Minimum schema (must be recorded for every review event):
- review_source (google|yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags[] (e.g., PHI_BAIT, LEGAL_THREAT, INCENTIVE_BAIT)
- escalation_level (L0–L3)
- response_mode (AUTO_DRAFT|APPROVAL_REQUIRED|HOLD_MANUAL_ONLY)
- draft_version + model/prompt version
- human_approver_id (nullable if hold)
- approval_timestamp (nullable)
- post_status (posted|blocked_manual_review|error)
- posted_timestamp (nullable)
- error_code/error_message (nullable)
- final_response_text (or null if blocked)
- hold_reason (nullable)
- detector_version
- blocked_timestamp/unblocker_id (nullable)

Required events:
- draft_created
- flagged
- approved (if applicable)
- blocked (if hold)
- posted OR post_failed

## 9) Weekly KPI Report — Accuracy Requirements
Required KPIs and formulas:
- Response rate = responses_posted / total_reviews
- Draft coverage = drafts_created / total_reviews
- Median first-response time (posted) = median(posted_timestamp - review_timestamp)
- SLA compliance % = % posted within X hours (configurable)
- Rating trend = avg rating last 7d vs prior 7d (and 30d vs prior 30d)
- Sentiment buckets = count by (positive/neutral/negative) from classifier (must log classifier_version)
- Escalations by level/reason = count(escalation_level, risk_flags)
- Blocked/held count = count(post_status='blocked_manual_review')
- Reconciliation rule: drafts_created = approved + blocked + pending + failed (must sum correctly)

Evidence checklist for sign-off:
- Exported audit logs showing at least one example of each: posted, blocked_manual_review, post_failed.
- Weekly report output where counts reconcile to logs.

## 10) Go/No-Go Exit Criteria
Go only if:
- 0 open P0/P1 brand-safety defects
- Legal-threat detector forces HOLD_MANUAL_ONLY and cannot be bypassed via API/UI
- PHI bait cannot generate confirmation language in any mode
- Audit logs include all required fields/events for 30 consecutive review events (simulated or live)
- Weekly KPI reconciliation passes on a sample week dataset

---
This v2.1 pack is the single source of truth for safe response generation, escalation holds, auditability, and reporting correctness across Google Business Profile and Yelp.