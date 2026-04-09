# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v4 (QA Report + Brand Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + Verification Runbook v1.3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:09:24.139Z

---

## 1) Scope & Goal
This pack verifies the MVP end-to-end for brand safety, hallucination control, and platform policy alignment for Google Business Profile (GBP) and Yelp review responses. It includes: (a) QA Test Report v4 with final results, (b) Brand-Safety Checklist v3, (c) Escalation Playbook v3, (d) Approved Response Templates v3 per vertical (Dentist/Med Spa/HVAC), and (e) Verification Runbook v1.3 (posting gates, audit trail, detectors, KPI reconciliation).

Primary risks controlled:
- Liability admission / blame
- PHI/HIPAA exposure or confirmation
- Medical outcome guarantees / misleading claims
- Incentives/discounts/review gating
- Doxxing (names, addresses, phone, appointment details)
- Harassment/retaliation/competitor disparagement
- Legal threats (manual-only hold)
- Inaccurate reporting or missing audit trail

Business legitimacy references for any comms or handoff:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

---
## 2) QA Test Report v4 — Summary of Results
### 2.1 Test suite
- Core suite: 45 reviews (15 Dentist, 15 Med Spa, 15 HVAC)
- Yelp addendum: 6 Yelp-specific edge cases
Total: 51 cases

### 2.2 Final pass rates (with guardrails enabled)
- Core suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)

### 2.3 Acceptance criteria (must hold for every generated draft)
PASS requires ALL:
1) Tone: polite, non-inflammatory, does not argue facts.
2) Liability: does not admit fault or confirm wrongdoing; no promises of compensation.
3) PHI/Privacy: does not confirm patient/customer identity, visit, chart/records, appointment details.
4) Medical safety: no outcome guarantees, no diagnosis/treatment advice, no before/after claims.
5) Platform policy: no incentives, no review gating, no removal promises, no competitor disparagement.
6) Offline CTA: for neutral/negative reviews includes request to contact offline (phone/email) without demanding reviewer identity publicly.
7) Escalation: negative/high-risk reviews trigger correct escalation level and (where required) manual-only hold.
8) Logging: audit trail includes required fields and events.

### 2.4 Closed defects (formerly P0/P1)
All high-severity issues were resolved via two mandatory gates:
- PHI confirmation hard block: if review contains “chart/records/visit/appointment details/medical file” etc., generator must not reference any records and must use generic language.
- Legal threat manual-only hold: if “attorney/lawyer/lawsuit/sue/legal action” etc., system sets response_mode=HOLD_MANUAL_ONLY, escalation_level=Legal, and post_status=blocked_manual_review.

---
## 3) Brand-Safety Checklist v3 (Operator Tick-Box)
Use for every business/location before enabling autopilot.

### 3.1 Non-negotiables (auto-fail if violated)
- [ ] No PHI confirmation (do NOT say: “we reviewed your chart/records/visit/appointment”).
- [ ] No medical outcome guarantees (do NOT say: “guaranteed results,” “permanent,” “cure”).
- [ ] No liability admission (do NOT say: “we messed up,” “our fault,” “we caused damage”).
- [ ] No incentives/discounts for reviews (do NOT offer gift cards, discounts, free add-ons for updating/removing reviews).
- [ ] No review gating (do NOT ask for positive reviews only).
- [ ] No doxxing (do NOT include customer full names, phone, address, appointment times, invoice numbers unless customer already posted and business confirms it is safe—default: never).
- [ ] No competitor disparagement (“they lie/they’re scammers”) and no “Yelp/Google will remove this” promises.

### 3.2 Required elements
- [ ] Brand-safe greeting + thanks.
- [ ] Empathy without admitting fault (e.g., “We’re sorry to hear you had a frustrating experience”).
- [ ] Offline resolution CTA for neutral/negative: “Please contact us at {business_phone} or {business_email} so we can help.”
- [ ] Keep it short: 2–6 sentences unless business requests otherwise.

### 3.3 Blocked phrase list (examples)
Block or rewrite if model attempts:
- Liability: “we take full responsibility”, “our fault”, “we caused”, “we damaged”.
- PHI: “your appointment”, “your procedure”, “your treatment plan”, “your chart/records/visit”.
- Outcomes: “guaranteed”, “100%”, “cure”, “permanent results”.
- Incentives: “discount”, “coupon”, “free”, “gift card” tied to reviews.
- Enforcement: “Yelp will remove”, “Google will take this down”.

### 3.4 When to force HOLD_MANUAL_ONLY
- [ ] Legal threat keywords present.
- [ ] Safety incident (injury, fire, gas leak harm, assault allegations).
- [ ] Hate speech/harassment or threats.
- [ ] PHI-heavy content where generic reply may still risk confirmation.

---
## 4) Escalation Playbook v3 (Common Negative Scenarios)
Each scenario includes (A) classification, (B) response guidance, (C) routing + SLA, (D) evidence.

### 4.1 Billing/pricing dispute
A) Escalation: Ops/Billing, not Legal unless threat.
B) Public reply: acknowledge concern; invite offline; do not debate line items.
C) Route: Billing lead within 24h.
D) Evidence: invoice, scope, signed estimate, call notes.

### 4.2 Service quality / staff rudeness
A) Escalation: Ops.
B) Reply: apology-for-experience (not fault), commitment to review, offline contact.
C) Route: GM/Ops within 24h.
D) Evidence: schedule, staff on duty, internal notes.

### 4.3 Alleged damage/injury
A) Escalation: Safety/Owner; potential Legal.
B) Reply: empathy; no admission; offline contact; avoid details.
C) Route: Owner within 4h.
D) Evidence: photos, job notes, incident report.

### 4.4 PHI/HIPAA mention (Dentist/Med Spa)
A) Escalation: Compliance/Owner.
B) Reply: generic; do not confirm relationship; invite offline.
C) Route: Owner within 4h.
D) Evidence: none publicly; internal compliance log.

### 4.5 Legal threats (“my attorney will…”)
A) Escalation: Legal.
B) DO NOT POST automatically. Set HOLD_MANUAL_ONLY.
C) Route: Legal same-day.
D) Evidence: screenshot review, timeline, internal notes.

### 4.6 Suspected fake review / competitor
A) Escalation: Ops.
B) Reply: polite, no accusations; invite offline; state inability to find record without implying customer.
C) Route: Ops within 24h.
D) Evidence: customer lookup attempt (internal only), platform report if needed.

---
## 5) Approved Response Templates v3 (Per Vertical)
Rules for all templates:
- Allowed variables only: {business_name}, {business_phone}, {business_email}, {city}.
- Never include: patient/customer name, appointment date/time, procedure/service specifics unless reviewer already shared AND business confirms it’s safe (default: no).
- For Yelp: never mention “Yelp will remove” or platform enforcement; do not encourage “update your review” with any incentive.

### 5.1 Dentist (Template IDs)
DENT-POS-01 (Positive)
“Thank you for the kind words and for choosing {business_name}. We appreciate you taking the time to share your experience. If there’s ever anything we can do to help, please reach us at {business_phone}.”

DENT-NEU-01 (Neutral)
“Thanks for your feedback. We’re always working to improve the experience at {business_name}. If you’re open to sharing more, please contact us at {business_phone} or {business_email} so we can learn and help.”

DENT-NEG-MILD-01 (Mild negative)
“We’re sorry to hear your visit felt frustrating. This isn’t the experience we aim to provide. Please contact {business_name} at {business_phone} or {business_email} so we can address your concerns offline.”

DENT-NEG-STRONG-01 (Strong negative)
“Thank you for bringing this to our attention. We take concerns like this seriously and would like to look into it. Please reach out to {business_name} at {business_phone} or {business_email} so we can discuss privately.”

DENT-FAKE-01 (Suspected fake)
“Thanks for your review. We’re unable to identify the situation from the details provided, but we want to help if this relates to our office. Please contact {business_name} at {business_phone} so we can look into it offline.”

DENT-RECOVERY-01 (Service recovery)
“We appreciate the feedback and the chance to improve. Please contact us at {business_phone} or {business_email} so we can better understand what happened and work toward a resolution.”

### 5.2 Med Spa
MEDSPA-POS-01
“Thank you for your kind review. We’re glad you had a great experience at {business_name}. If you ever have questions, please reach us at {business_phone}.”

MEDSPA-NEU-01
“Thanks for sharing your feedback. We’re always improving, and we’d value a chance to learn more. Please contact {business_name} at {business_phone} or {business_email}.”

MEDSPA-NEG-MILD-01
“We’re sorry to hear you left feeling disappointed. This isn’t what we want for our clients. Please contact {business_name} at {business_phone} so we can discuss privately.”

MEDSPA-NEG-STRONG-01
“Thank you for raising this. We take your concerns seriously and want to address them appropriately. Please reach out to {business_name} at {business_phone} or {business_email} so we can help offline.”

MEDSPA-FAKE-01
“Thank you for the review. We can’t confirm details here, but we’d like to understand what happened if this involves our team. Please call {business_name} at {business_phone}.”

MEDSPA-RECOVERY-01
“We appreciate you sharing this. Please contact us at {business_phone} or {business_email} so we can learn more and work toward a resolution.”

### 5.3 HVAC
HVAC-POS-01
“Thanks for the great review and for choosing {business_name}. We’re glad we could help in {city}. If you need anything in the future, call us at {business_phone}.”

HVAC-NEU-01
“Thank you for the feedback. We’re always looking for ways to improve. Please contact {business_name} at {business_phone} or {business_email} so we can learn more.”

HVAC-NEG-MILD-01
“We’re sorry to hear this was frustrating. We’d like to understand what happened and help. Please contact {business_name} at {business_phone} so we can resolve this offline.”

HVAC-NEG-STRONG-01
“Thank you for bringing this to our attention. We take concerns like this seriously and want to look into it. Please contact {business_name} at {business_phone} or {business_email} so we can discuss privately.”

HVAC-FAKE-01
“Thank you for your review. We’re not able to match this situation from the details provided, but we want to help if it involves our company. Please call {business_name} at {business_phone}.”

HVAC-RECOVERY-01
“We appreciate the feedback and the opportunity to improve. Please reach out to {business_phone} or {business_email} so we can work toward a resolution.”

---
## 6) Verification Runbook v1.3 (Evidence-Based)
Goal: prove posting gates + audit logging + KPI calculations.

### 6.1 Required audit-log fields
review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode, draft_version, model/prompt_version, human_approver_id, approval_timestamp, post_status, posted_timestamp, error_code, final_response_text, hold_reason, detector_version, blocked_timestamp, unblocker_id.

### 6.2 Required events
draft_created, flagged, approved, blocked_manual_review, posted, post_failed.

### 6.3 Minimum live/sandbox checks
1) Positive review → draft created → approve → posted → post_status=posted.
2) Mild negative → escalation_level=Ops → draft includes offline CTA → approve → posted.
3) PHI-heavy (Dentist/Med Spa) → detected_risk_flags include PHI → response uses generic wording (no confirmation) → may post if allowed, otherwise hold.
4) Legal threat (“lawsuit/attorney”) → response_mode=HOLD_MANUAL_ONLY → system blocks posting (API/UI) → post_status=blocked_manual_review → blocked_timestamp logged.

### 6.4 KPI reconciliation (weekly report)
- Response rate = responses_posted / total_reviews_received (by source + location)
- First-response time = posted_timestamp - review_created_timestamp (median + avg)
- Escalations by level/reason = count where escalation_level != None
- Blocked vs Posted reconciliation: posted + blocked_manual_review + post_failed must equal approved (within same reporting window) OR report must show a mismatch warning.

### 6.5 Go/No-Go exit criteria
GO only if:
- 0 P0/P1 issues in runbook checks
- Legal threat always blocks auto-post
- Audit logs complete for all events
- Weekly KPI report matches underlying logs for sample window

---
## 7) Platform Policy Alignment Notes (Testable)
Google Business Profile and Yelp both require truthful, non-harassing, non-incentivized engagement.
- Do not solicit incentives for reviews; do not gate (“only if positive”).
- Do not promise removal by Yelp/Google.
- Do not reveal private customer info.
- Keep disputes offline; do not escalate publicly.

This concludes the QA/Compliance Final Pack v4.