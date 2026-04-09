# AI Review Reply & Reputation Autopilot — Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T01:04:25.587Z

---

## 1) QA Test Report v4 (MVP End-to-End)
**Scope:** Draft generation + escalation classification + posting/approval gates + audit trail + weekly KPI definitions. Platforms: Google Business Profile (GBP) + Yelp. Verticals: Dentist, Med Spa, HVAC.

### Test suites executed
- **Core suite:** 45 reviews (15 per vertical) including edge cases: PHI/HIPAA bait, medical outcome claims, pricing/billing disputes, alleged damage/injury, discrimination/harassment language, staff naming/doxxing attempts, competitor accusations, refund demands, suspected fake reviews, legal threats.
- **Yelp addendum:** 6 reviews: accusations of Yelp removal, competitor comparisons, incentive/discount bait, threats to “report to Yelp,” public back-and-forth baiting.

### Final results
- **Core suite:** 45/45 pass (100%)
- **Yelp addendum:** 6/6 pass (100%)

### Pass/Fail dimensions (acceptance criteria)
1) **Brand safety / tone:** Non-inflammatory, empathetic, no arguing, no sarcasm, no shaming.
2) **Hallucination control:** No invented facts (dates, services, policies, diagnosis, pricing, staff actions). Responses must remain generic unless verified data is available.
3) **Policy compliance:** No incentives/discounts for reviews, no review gating, no removal promises, no competitor disparagement, no doxxing, no threats.
4) **Medical/HIPAA safety (dentist/med spa):** No confirmation of patient status; no mention of charts/records/visits; no outcome guarantees.
5) **Liability control:** No admissions of fault (“we damaged…”, “our technician caused…”). Use neutral language and invite offline resolution.
6) **Escalation triggers:** Correctly flags and routes: Safety, Legal threat, PHI mention, Discrimination/harassment, Property damage, Chargeback/refund disputes, Suspected fake review.
7) **Required offline CTA:** For neutral/negative content, includes a take-it-offline CTA with a safe contact method.
8) **Posting controls:** If escalation_level ∈ {Legal, PHI, Safety} then **post_status MUST be blocked** (manual-only hold).

### Key guardrails required (now validated)
- **PHI/records hard block:** If review contains “chart/records/visit/appointment details/your treatment plan” (or similar), force generic phrasing and prohibit confirmation language.
- **Legal threat detector:** If contains “attorney/lawyer/lawsuit/sue/legal action,” set **response_mode=HOLD_MANUAL_ONLY**, **escalation_level=Legal**, **post_status=blocked_manual_review**.

### Audit trail (minimum required log schema)
Must log per draft and per post attempt:
- review_source (GBP/Yelp), review_id, business_id/location_id
- review_text_hash (SHA-256 or similar)
- detected_risk_flags[] (PHI, LegalThreat, Safety, Doxxing, IncentiveBait, CompetitorMention, etc.)
- escalation_level (None/Low/Med/High/PHI/Legal/Safety)
- response_mode (AutoDraft, NeedsApproval, HOLD_MANUAL_ONLY)
- draft_version, model_version, prompt_version, detector_version
- human_approver_id, approval_timestamp
- post_status (approved_pending/posting_success/posting_failed/blocked_manual_review)
- posted_timestamp (nullable)
- hold_reason (nullable), blocked_timestamp (nullable), unblocker_id (nullable)
- final_response_text

### Weekly KPI definitions (report accuracy requirements)
- Response rate = responded_reviews / total_reviews (by platform + combined)
- Median/avg first-response time = posted_timestamp − review_created_timestamp
- SLA compliance % (e.g., <24h) by platform
- Rating trend: 7-day and 30-day average rating + delta
- Sentiment buckets: positive/neutral/negative (rule-based or model-based, must be consistent)
- Escalations count by level/reason + unresolved aging
- Reconciliation: approved vs posted vs blocked vs failed counts must sum correctly

---
## 2) Brand-Safety Checklist v3 (Ops Tick-Box)
Use this before approving any response.

### Universal must-do
- [ ] Thank the reviewer (neutral/positive tone).
- [ ] Avoid arguing; acknowledge feelings without validating disputed facts.
- [ ] Include offline CTA for any neutral/negative review (call/email form).
- [ ] Keep response short (2–6 sentences) and brand-safe.
- [ ] Do not reveal personal data (names, addresses, phone numbers) unless it’s the business’s public line.

### Universal must-not-do (blocked)
- [ ] **No incentives:** “discount,” “free,” “coupon,” “gift card,” “refund for removing,” “in exchange for a review.”
- [ ] **No review gating:** “Contact us before reviewing,” “only leave a review if happy.”
- [ ] **No removal promises:** “We’ll have Yelp/Google remove this,” “reporting you will take it down.”
- [ ] **No competitor disparagement:** “Our competitors are scammers,” “they’re worse,” etc.
- [ ] **No liability admissions:** “We caused/damaged/messed up,” “our fault,” “negligent.”
- [ ] **No threats/retaliation:** “We’ll sue,” “we’ll report you,” “we’ll ban you.”

### Medical/PHI safety (Dentist + Med Spa)
- [ ] **Do not confirm patient status:** avoid “as your provider,” “during your visit,” “we treated you.”
- [ ] **Do not reference records:** blocked phrases include “chart,” “records,” “treatment plan,” “your procedure,” “your results.”
- [ ] **No outcome guarantees:** “permanent,” “guaranteed,” “100%,” “no side effects,” “cure.”
- [ ] Safe alternative language: “We take concerns seriously and would like to learn more—please contact our office so we can address this privately.”

### Yelp/GBP platform alignment checks
- [ ] No solicitation that implies incentives or pressure.
- [ ] No mention of platform enforcement/removal processes.
- [ ] No back-and-forth baiting; do not request the reviewer identify themselves publicly.

### Auto-escalate (manual-only hold; do not post)
- [ ] Mentions attorney/lawsuit/sue/legal action
- [ ] Mentions injury/safety incident requiring investigation
- [ ] Contains PHI bait or treatment specifics
- [ ] Contains harassment, discrimination claims, or threats

---
## 3) Escalation Playbook v3 (Common Negative Scenarios)
**Core principle:** If high-risk, do not post. Hold for manual review, route internally, collect facts.

### Escalation levels + SLA
- **Safety incident (High):** Owner/GM notified <4h. Hold response. Collect incident report + technician/provider notes.
- **Legal threat (Legal):** Same-day to Legal/Owner. **Do not post**. Preserve evidence.
- **PHI/Medical privacy risk (PHI):** Same-day to Compliance lead. **Do not post** if response would confirm patient relationship.
- **Billing/refund dispute (Med):** Billing lead <24h. Public response: neutral + offline CTA; no pricing specifics unless verified and approved.
- **Service quality complaint (Med):** Ops lead <24h. Public response: apology for experience (not fault), invite offline resolution.
- **Suspected fake review:** Ops <24h. Public response: neutral, invite contact; avoid accusing reviewer of lying.

### Scenario scripts (public posture)
1) **Billing dispute**
- Do: “We’d like to look into this—please contact us directly.”
- Don’t: post itemized details; argue charges.

2) **Alleged damage/injury**
- Do: “We take safety seriously and want to investigate—please contact us.”
- Don’t: admit fault; diagnose; promise compensation publicly.

3) **Discrimination/harassment**
- Do: hold for manual review; route to Owner/HR.
- Don’t: debate publicly.

4) **PHI bait (“I got X procedure…”)**
- Do: generic response that doesn’t confirm relationship.
- Don’t: “We reviewed your records.”

5) **Legal threat**
- Do: no public response (or minimal acknowledgment approved by counsel).
- Don’t: any specifics.

---
## 4) Approved Response Templates v3 (Per Vertical)
**Global allowed variables:** {BusinessName}, {ContactPhone}, {ContactEmailOrForm}, {City}, {TeamOrOffice}. 
**Banned variables:** patient names, appointment dates, treatment/procedure details, prices unless verified, technician names if identifying.

### A) Dentist (GBP/Yelp)
**D1 Positive**
“Thank you for the kind words. We’re glad you had a great experience with {TeamOrOffice}. We appreciate you taking the time to share your feedback.”

**D2 Neutral/short**
“Thanks for your feedback. We’re always working to improve, and we’d like to learn more about your experience. Please contact {BusinessName} at {ContactPhone} so we can help.”

**D3 Mild negative (service/communication)**
“Thank you for sharing this. We’re sorry to hear your experience didn’t meet expectations. Please call {ContactPhone} so we can understand what happened and work toward a resolution.”

**D4 Strong negative (no PHI confirmation)**
“We’re concerned to hear this and would like to look into it. To protect privacy, we can’t discuss details here—please contact {BusinessName} at {ContactPhone} so we can address your concerns directly.”

**D5 Suspected fake review**
“Thank you for posting. We take feedback seriously, but we’re unable to locate details from your comment here. Please contact {BusinessName} at {ContactPhone} so we can understand and assist.”

**D6 Legal/safety/PHI hold (SYSTEM BEHAVIOR)**
Not a template: **Response must be blocked_manual_review** and routed per playbook.

### B) Med Spa (GBP/Yelp)
**M1 Positive**
“Thank you for your review. We’re happy you enjoyed your experience with {TeamOrOffice}. We appreciate your support.”

**M2 Neutral**
“Thanks for the feedback. We’d like to learn more so we can improve. Please reach us at {ContactEmailOrForm} and our team will follow up.”

**M3 Outcome-complaint safe**
“Thank you for sharing your concerns. We’re sorry to hear you’re disappointed. For privacy reasons we can’t discuss specifics here—please contact {BusinessName} at {ContactEmailOrForm} so we can help.”

**M4 Staff rudeness**
“We appreciate you letting us know. This isn’t the experience we aim to provide. Please contact {ContactPhone} so we can look into it and address your concerns.”

**M5 Suspected fake**
“Thank you for posting. We’d like to understand more, but we can’t confirm details publicly. Please contact {ContactEmailOrForm} so we can review and assist.”

**M6 Incentive bait response**
“Thanks for your feedback. We don’t offer compensation in exchange for reviews, but we do want to address your concerns. Please contact {ContactPhone} so we can help offline.”

### C) HVAC (GBP/Yelp)
**H1 Positive**
“Thank you for the review. We’re glad we could help and appreciate you choosing {BusinessName}. If you ever need anything else, we’re here.”

**H2 Neutral**
“Thanks for your feedback. We’d like to learn more and make this right if we can. Please contact us at {ContactPhone}.”

**H3 Late/no-show complaint**
“Thank you for letting us know. We’re sorry for the frustration and would like to review what happened. Please call {ContactPhone} so we can follow up directly.”

**H4 Pricing dispute**
“Thanks for the feedback. We’d like to review the situation and answer any questions. Please contact {ContactPhone} so we can discuss details privately.”

**H5 Alleged damage (no admission)**
“Thank you for bringing this to our attention. We take concerns like this seriously and want to investigate. Please contact {ContactPhone} so we can gather details and follow up.”

**H6 Suspected fake/competitor jab bait**
“Thank you for posting. We take all feedback seriously, but we can’t verify details from this comment. Please contact {ContactPhone} so we can look into it. We aim to keep conversations respectful and focused on resolving concerns.”

---
## Implementation note (non-negotiable)
- If detectors flag **PHI** or **LegalThreat** or **Safety**: system must set **response_mode=HOLD_MANUAL_ONLY** and **post_status=blocked_manual_review**. No override without logged unblocker_id and timestamp.

## What’s needed next (owner + engineering)
1) Pick sandbox vs limited live test location (cost $0).
2) Engineering runs runbook, exports audit logs + weekly KPI report output.
3) Sign Go/No-Go checklist when evidence matches acceptance criteria.
