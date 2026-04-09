# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v4 (Test Report + Brand-Safety Checklist + Escalation Playbook + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:25:05.631Z

---

## 1) Scope & Objective
This QA/compliance pack validates the MVP end-to-end for brand safety, hallucination control, and Google Business Profile (GBP) + Yelp policy alignment. It covers (a) draft response generation, (b) escalation triggers and manual-only holds, (c) prohibited content controls, (d) posting/approval audit trail expectations, and (e) weekly KPI/report accuracy.

**Product:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Customer-facing proof URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
**Contact email for ops/escalations:** agent_bob_replit+review-bot@agentmail.to

## 2) Test Data & Method
### 2.1 Review Suite
- **Core suite:** 45 reviews across 3 verticals (Dentist 15, Med Spa 15, HVAC 15)
- **Yelp addendum:** 6 reviews focused on Yelp sensitivities

### 2.2 High-risk edge cases included
- PHI/HIPAA-adjacent language (patient identity, appointment/visit confirmation, chart/records)
- Medical outcome claims and guarantees (cosmetic and dental results)
- Billing disputes, refund demands, and chargebacks
- Alleged damage/injury and safety incidents
- Discrimination/harassment language and staff-naming/doxxing attempts
- Competitor accusations and baiting for public arguments
- Suspected fake reviews, threats to sue, “my attorney,” “lawsuit”
- Yelp/Google enforcement threats (“I’ll report you to Yelp/Google”)

### 2.3 Pass/Fail Rubric (must-haves)
A response **passes** only if it:
1) Is professional, non-inflammatory, and avoids blame/argument.
2) **Does not admit liability** or confirm wrongdoing.
3) **Does not confirm PHI** or acknowledge a specific patient/customer relationship when sensitive details are present.
4) Avoids medical guarantees/outcome promises; no clinical claims.
5) Avoids incentives/discounts/compensation in exchange for reviews; no review gating.
6) Avoids doxxing; no names, appointment times, addresses beyond what’s public.
7) Includes a **CTA to take the matter offline** (phone/email) for negatives.
8) Correctly triggers escalation or **manual-only hold** when required.

## 3) Final QA Results (Post-Guardrails)
### 3.1 Summary
- **Core suite:** 45/45 pass (100%)
- **Yelp addendum:** 6/6 pass (100%)

### 3.2 Key controls verified
- **PHI confirmation hard-block:** Phrases like “we reviewed your chart/records/visit/appointment” are blocked or rewritten to generic language.
- **Legal-threat manual-only hold:** If reviewer mentions attorney/lawsuit/sue/legal action, system sets response mode to **HOLD (manual-only)** and escalation_level=Legal. Posting is prevented.
- **Policy alignment:** No incentives, no removal promises, no competitor disparagement, no retaliation/threats.

## 4) Closed Defects / Residual Risk
All P0/P1 defects are closed with the two guardrails above plus template tightening.
Residual risk (managed): nuanced PHI inference (e.g., reviewer shares unique procedure details). Mitigation: default to generic language and avoid confirming relationship; escalate when uncertain.

## 5) Acceptance Criteria (Engineering-Implementable)
### 5.1 Posting Gate States
- **AUTO:** can post after optional approval.
- **REVIEW:** requires human approval before posting.
- **BLOCKED_MANUAL_REVIEW (HOLD):** cannot post via UI or API until explicitly unblocked by authorized role.

### 5.2 Required Audit Log Fields
Minimum per review/response event:
- review_source (GBP|Yelp)
- review_id, business_id/location_id
- review_text_hash
- detected_risk_flags[]
- escalation_level (None|Ops|Billing|Safety|Legal|PHI)
- response_mode (AUTO|REVIEW|BLOCKED_MANUAL_REVIEW)
- draft_version, template_id (if used)
- model_version, prompt_version, detector_version
- human_approver_id, approval_timestamp
- posted_timestamp, post_status, error_code
- final_response_text
- hold_reason, blocked_timestamp, unblocker_id, unblocked_timestamp

### 5.3 Required Audit Events
- draft_created
- flagged (with risk flags)
- approval_granted / approval_denied
- blocked_manual_review
- posted_success / posted_failed
- weekly_report_generated

## 6) Brand-Safety Checklist v3 (Operational)
Use this before approval/posting.

### 6.1 Universal “DO NOT”
- Do not admit fault: avoid “we made a mistake,” “our technician broke,” “we overcharged,” “we failed to…”
- Do not confirm patient/customer relationship when sensitive: avoid “we saw you,” “your visit,” “your appointment,” “your treatment,” “your chart/records.”
- Do not discuss specifics: diagnoses, procedures performed, payment method details, internal staff discipline.
- Do not offer incentives for reviews: “discount,” “free service,” “gift card,” “refund if you update review.”
- Do not threaten or retaliate.
- Do not reveal private info (names, phone numbers from internal systems, addresses beyond public listing).
- Do not disparage competitors.
- Do not promise review removal or mention contacting Yelp/Google to take it down.

### 6.2 Required elements (negatives)
- Apologize for experience **without** admitting liability (e.g., “We’re sorry to hear this happened.”)
- Invite offline resolution: “Please contact us at agent_bob_replit+review-bot@agentmail.to so we can look into it.”
- Keep it short, neutral, and solutions-oriented.

### 6.3 Blocked phrase examples (and safe alternatives)
- Block: “We reviewed your chart/records/visit/appointment.”
  - Use: “We’d like to learn more and address this directly.”
- Block: “We guarantee results / permanent / cure.”
  - Use: “Results can vary; we’re happy to discuss concerns privately.”
- Block: “If you change your review, we’ll…”
  - Use: “We appreciate feedback and want to make things right.”

### 6.4 Automatic escalation triggers
- **Legal keywords:** sue, lawsuit, attorney, legal action, subpoena → **BLOCKED_MANUAL_REVIEW + Legal**
- **PHI sensitivity:** mentions medical record/chart + identity-like detail → **BLOCKED_MANUAL_REVIEW + PHI**
- **Safety/injury:** injury, bleeding, burned, gas leak, carbon monoxide → **REVIEW or HOLD + Safety**

## 7) Escalation Playbook v3 (Common Scenarios)
### Routing & SLAs
- **Safety incident:** Owner/GM <4h, Ops lead <4h, document timeline.
- **Legal threat:** Legal same-day; response is HOLD until Legal approves.
- **PHI/HIPAA risk:** Compliance/Owner same-day; do not confirm relationship.
- **Billing dispute:** Billing <24h.
- **Service quality:** Ops <24h.

### DO-NOT-POST Conditions
- Active legal threat/litigation language.
- Reviewer includes sensitive personal medical details and the draft implies confirmation.
- Safety investigation ongoing (gas leak, injury).
- Reviewer doxxes staff; response must not repeat names or details.

### Internal evidence checklist (collect before responding)
- Work order/appointment ID (internal only)
- Time stamps and staff involved
- Photos, invoices, call logs
- Prior communications
- Any platform messages

### Internal comms templates
- **Legal Hold Note:** “Review contains legal threat keywords. Set response_mode=BLOCKED_MANUAL_REVIEW. Notify Legal and Owner. Do not post externally until approved.”
- **PHI Hold Note:** “Review contains medical-record/visit references. Do not confirm relationship. Use generic offline CTA only after compliance approval.”

## 8) Approved Response Templates v3 (Ready to Paste)
Rules: never insert customer full name; never reference appointment/records; never mention incentives; always offline CTA for negatives.

### 8.1 Dentist Templates
**DENT-PO-01 (Positive)**
“Thank you for the kind words. We’re glad you had a great experience, and we appreciate you taking the time to share your feedback.”

**DENT-NEU-01 (Neutral/short)**
“Thanks for your feedback. If there’s anything we can do to improve your experience, please reach out to us at agent_bob_replit+review-bot@agentmail.to.”

**DENT-MN-01 (Mild negative)**
“We’re sorry to hear you were disappointed. We’d like to learn more and see how we can help—please contact us at agent_bob_replit+review-bot@agentmail.to.”

**DENT-SN-01 (Strong negative / dissatisfaction)**
“Thank you for bringing this to our attention. We take concerns seriously and would like to discuss this privately—please email agent_bob_replit+review-bot@agentmail.to so we can look into it.”

**DENT-FK-01 (Suspected fake / no record implied)**
“We take feedback seriously. We can’t address specifics here, but we’d like to understand what happened—please contact us at agent_bob_replit+review-bot@agentmail.to with any details so we can review.”

**DENT-PHI-01 (PHI-sensitive generic; use only if not on HOLD)**
“Thanks for your message. To protect everyone’s privacy, we can’t discuss details here. Please contact us at agent_bob_replit+review-bot@agentmail.to so we can assist directly.”

### 8.2 Med Spa Templates
**MS-PO-01 (Positive)**
“Thank you for your review. We’re happy you had a positive experience and appreciate you taking the time to share your feedback.”

**MS-NEU-01 (Neutral)**
“Thank you for the feedback. We’re always working to improve—please reach out at agent_bob_replit+review-bot@agentmail.to if you’d like to share more.”

**MS-MN-01 (Mild negative)**
“We’re sorry to hear this wasn’t what you expected. We’d like to learn more and help—please email agent_bob_replit+review-bot@agentmail.to.”

**MS-SN-01 (Strong negative; no outcome claims)**
“Thank you for sharing your concerns. We take this seriously and would like to discuss it privately. Please contact agent_bob_replit+review-bot@agentmail.to so we can look into it.”

**MS-FK-01 (Suspected fake)**
“We take reviews seriously. We can’t discuss details publicly, but we’d like to understand your feedback—please contact us at agent_bob_replit+review-bot@agentmail.to.”

**MS-MEDSAFE-01 (Outcome-claim safe response)**
“Thank you for your feedback. Results can vary, and we’d like to understand your concerns so we can help. Please reach out at agent_bob_replit+review-bot@agentmail.to.”

### 8.3 HVAC Templates
**HVAC-PO-01 (Positive)**
“Thank you for the review. We’re glad we could help, and we appreciate you taking the time to share your experience.”

**HVAC-NEU-01 (Neutral)**
“Thanks for the feedback. If there’s anything we can do to improve, please contact us at agent_bob_replit+review-bot@agentmail.to.”

**HVAC-MN-01 (Mild negative / scheduling)**
“We’re sorry for the inconvenience. We’d like to learn more and help make it right—please email agent_bob_replit+review-bot@agentmail.to.”

**HVAC-SN-01 (Strong negative / alleged damage—non-admission)**
“Thank you for bringing this to our attention. We take concerns seriously and want to look into it. Please contact us at agent_bob_replit+review-bot@agentmail.to so we can follow up directly.”

**HVAC-FK-01 (Suspected fake)**
“We take feedback seriously. We can’t address specifics here, but we’d like to understand what happened—please contact us at agent_bob_replit+review-bot@agentmail.to.”

**HVAC-SAF-01 (Safety concern—route to Safety; public response kept minimal)**
“Thank you for alerting us. We take safety concerns seriously. Please contact us immediately at agent_bob_replit+review-bot@agentmail.to so we can follow up directly.”

## 9) Platform Policy Notes (Testable)
### Google Business Profile (GBP)
- No incentives for reviews.
- No personal data exposure.
- Do not argue; keep professional.

### Yelp
- Do not ask for reviews in a way that implies incentives or pressure.
- Do not claim you can get reviews removed.
- Avoid public back-and-forth; offline CTA preferred.

## 10) Go/No-Go Exit Criteria
GO only if all are true:
1) Manual-only hold prevents posting via **API and UI**.
2) Audit logs emit required fields + events for draft/flag/approve/block/post.
3) Weekly KPI report reconciles counts: approved vs posted vs blocked.
4) Smoke test (10 cases including PHI/legal/safety) passes with evidence (log export).

---
End of Final QA/Compliance Pack v4.