# AI Review Reply & Reputation Autopilot — QA/Compliance Release Pack v1.3 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Templates Library v3 + Audit/Reporting Acceptance Criteria)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:53:46.310Z

---

## 1) Scope & Objective
Product: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). Goal: safely draft (and optionally post) review responses that are brand-safe, non-inflammatory, policy-aligned, and auditable. This pack documents QA results, safety controls, escalation rules, and the approved response templates for Dentist, Med Spa, and HVAC.

Business website (legitimacy proof for customers/internal reviewers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

## 2) Platform Policy Alignment (Google vs Yelp — testable constraints)
**Global rules (both platforms):**
- No incentives/discounts offered in exchange for reviews; no “review gating.”
- No promises to remove reviews; no implying control over platform enforcement.
- No doxxing: never repeat addresses, phone numbers, appointment times, staff schedules, or other personal data.
- No harassment/retaliation; no argumentative or accusatory tone.
- No competitor disparagement.

**Healthcare-specific (Dentist/Med Spa):**
- Never confirm patient relationship, visit, records, chart, treatment, appointment.
- No medical outcome guarantees (“you’ll be pain-free,” “guaranteed results,” etc.).
- No instructions that could be construed as medical advice; keep general and route offline.

**Yelp sensitivities (additional):**
- Avoid language implying Yelp will remove content or that the business can influence Yelp moderation.
- Avoid prolonged public back-and-forth; keep responses brief and move offline.

## 3) QA Test Suite & Results (QA Report v4)
### 3.1 Test coverage
- Core suite: 45 reviews total (15 Dentist, 15 Med Spa, 15 HVAC), including edge cases:
  - PHI/HIPAA bait (names, appointment dates, “my chart/records”), medical outcome claims
  - Billing disputes, refunds, no-show/late arrival, staff conduct, alleged damage/injury
  - Discrimination/harassment language, threats, legal threats (“lawsuit/attorney”), suspected fake reviews
  - Competitor accusations/comparisons, solicitation bait (“give me a discount and I’ll change review”)
- Yelp addendum: 6 additional cases:
  - Accusations of review removal/shadowban
  - Threats to “report to Yelp,” competitor comparisons, discount demands, public-baiting threads

### 3.2 Final results
- Core suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)

### 3.3 Key safety gates validated
- **PHI/relationship confirmation hard-block**: triggers when review contains or prompts phrases like “chart/records/visit/appointment/treated me on [date].” Expected: response must be generic and must not confirm any relationship; if it cannot comply, set to manual review.
- **Legal-threat manual-only hold**: triggers on “attorney/lawyer/lawsuit/sue/demand letter.” Expected: do not post; status=blocked_manual_review; escalation_level=Legal.
- **Required offline CTA** on negative and policy-risk reviews: response includes invitation to contact business privately, without requesting review changes.

## 4) Brand-Safety Checklist v3 (Operator + Engineering)
Use this checklist before approving or posting any response.

### 4.1 Absolute “DO NOT POST” conditions (must set blocked_manual_review)
- Legal threats (sue, attorney, lawsuit, demand letter).
- Any PHI/healthcare relationship confirmation risk where a safe generic reply cannot be guaranteed.
- Threats/harassment/violence or ongoing safety investigations.
- Active media inquiries or regulator complaints mentioned.

### 4.2 Forbidden content (must never appear)
- Incentives: “discount,” “free,” “gift card,” “refund if you change review,” “we’ll comp you for a 5-star.”
- Review gating: “contact us first before leaving a review.”
- Removal promises: “we’ll get this removed,” “Yelp/Google will delete this.”
- Liability admission: “we messed up,” “our fault,” “we caused the damage/injury.”
- PHI confirmation: “we reviewed your chart/records/visit,” “as your dentist,” “when you came in on Tuesday.”
- Medical guarantees: “guaranteed results,” “you’ll heal fast,” “permanent fix.”
- Doxxing: personal addresses/phone numbers/appointment details/staff schedules.
- Competitor disparagement: “they’re scammers,” “unlike [competitor].”

### 4.3 Required elements for safe responses
- Neutral, professional tone; no sarcasm.
- Acknowledgment of concern without admitting fault.
- Clear offline CTA: invite contact via phone/email (or “reach out privately”) to resolve.
- No requests to edit/remove the review.
- For healthcare: explicitly avoid confirming any relationship; speak generally (“Our office aims to…,” “We take feedback seriously.”).

### 4.4 Blocked phrases (examples) + safe alternatives
- Block: “we reviewed your chart/records/visit/appointment” → Use: “We take feedback seriously and would like to learn more.”
- Block: “we’re sorry we caused…” → Use: “We’re sorry to hear you had this experience.”
- Block: “we’ll give you a discount/refund for…” → Use: “Please contact us so we can discuss options privately.”
- Block: “Yelp/Google will remove this” → Use: “We’d like to address your concerns offline.”

## 5) Escalation Playbook v3 (routing + SLAs + evidence)
### 5.1 Escalation levels
- Level 0: Positive/neutral — auto-draft, optional auto-post.
- Level 1: Mild negative — auto-draft, requires approval.
- Level 2: Strong negative/service failure/billing — requires approval; notify Ops/Billing.
- Level 3: Safety/PHI/discrimination — manual review required; route to Owner/GM.
- Level Legal: Legal threat — blocked_manual_review; route to Legal/Owner same-day.

### 5.2 Scenario routing & SLAs
- Billing dispute/refund: Billing lead <24h; evidence: invoice, call logs, policy.
- Service quality/late arrival: Ops lead <24h; evidence: schedule, technician notes.
- Alleged damage/injury: Owner/GM <4h; evidence: photos, work order, incident report.
- Discrimination/harassment allegation: Owner/HR <4h; evidence: staff statements, CCTV if applicable.
- PHI mention (healthcare): Owner/Compliance <4h; evidence: none in public response; keep internal only.
- Legal threat: Legal/Owner same-day; evidence: preserve review text, timestamps, prior comms; do not post.

### 5.3 Response mode mapping
- If legal trigger present → post_status must be blocked_manual_review; no public reply until Legal approves.
- If PHI trigger present → either (a) generic non-confirming reply OR (b) blocked_manual_review if model cannot comply.
- If reviewer demands incentives → decline; invite offline; never offer anything tied to the review.

## 6) Approved Response Templates Library v3 (per vertical)
Rules: allowed variables are strictly limited. Never insert patient/client names, appointment dates, chart details, or prices unless explicitly provided by the business and verified safe.

### 6.1 Dentist templates (Google/Yelp)
**DEN-POS-01 (Positive):**
“Thank you for the kind words. We appreciate you taking the time to share your feedback and we’re glad you had a great experience. If there’s ever anything we can do to support you, please reach out to our office.”

**DEN-NEU-01 (Neutral/short):**
“Thanks for your feedback. We’re always working to improve the experience we provide. If you’re open to sharing more details, please contact our office directly so we can learn and improve.”

**DEN-NEG-01 (Mild negative):**
“We’re sorry to hear you were disappointed. Our team aims to provide a respectful, high-quality experience for everyone. Please contact our office directly so we can better understand your concerns and see how we can help.”

**DEN-NEG-02 (Strong negative / service failure):**
“Thank you for sharing this feedback. We take concerns like this seriously and would like to learn more so we can address it appropriately. Please reach out to our office directly at your convenience so we can discuss next steps offline.”

**DEN-PHI-01 (PHI-safe generic, no confirmation):**
“We take privacy seriously and can’t discuss details in a public forum. If you’re comfortable, please contact our office directly so we can listen and help.”

**DEN-FAKE-01 (Suspected fake):**
“Thank you for the review. We take feedback seriously, but we’re unable to identify the situation from the details provided. Please contact our office directly so we can look into this and address any concerns appropriately.”

### 6.2 Med Spa templates
**SPA-POS-01 (Positive):**
“Thank you for the wonderful feedback. We appreciate you taking the time to share your experience. If you ever have questions or would like to share additional feedback, please contact our team directly.”

**SPA-NEU-01 (Neutral):**
“Thanks for your feedback. We’re always looking for ways to improve. Please reach out to our team directly if you’re willing to share more details so we can learn from your experience.”

**SPA-NEG-01 (Mild negative):**
“We’re sorry to hear this didn’t meet your expectations. Our goal is to provide a professional, comfortable experience for every guest. Please contact us directly so we can better understand what happened and see how we can help.”

**SPA-NEG-02 (Strong negative/outcome dissatisfaction without guarantees):**
“Thank you for sharing your concerns. We take this seriously and would like to learn more so we can address it appropriately. Please contact our team directly so we can discuss your feedback offline.”

**SPA-PHI-01 (Privacy-first):**
“We take privacy seriously and can’t discuss details here. Please contact our team directly so we can listen and help.”

**SPA-FAKE-01 (Suspected fake):**
“We take feedback seriously, but we’re unable to match this experience to our records based on what’s shared here. Please contact us directly so we can look into it and address any concerns.”

### 6.3 HVAC templates
**HVAC-POS-01 (Positive):**
“Thank you for the great review. We appreciate the opportunity to help and we’re glad you had a positive experience. If you need anything in the future, we’re here to help.”

**HVAC-NEU-01 (Neutral):**
“Thanks for your feedback. We’re always working to improve. If you’re willing, please contact us directly with any details so we can learn and do better.”

**HVAC-NEG-01 (Mild negative):**
“We’re sorry to hear you were disappointed. We aim to provide timely, professional service. Please contact us directly so we can understand what happened and work toward a resolution offline.”

**HVAC-NEG-02 (Strong negative / alleged damage):**
“Thank you for bringing this to our attention. We take concerns like this seriously and would like to learn more. Please contact us directly so we can review the details and address this appropriately offline.”

**HVAC-BILL-01 (Billing dispute):**
“Thanks for the feedback. We understand billing concerns can be frustrating. Please contact our office directly so we can review the details with you and clarify next steps offline.”

**HVAC-FAKE-01 (Suspected fake):**
“We take feedback seriously, but we’re unable to identify the situation from the information provided. Please contact us directly with details so we can look into it and help.”

## 7) Posting/Approval Audit Trail — Acceptance Criteria
### 7.1 Required log schema fields
- review_source (google|yelp)
- review_id, business_id, location_id
- review_text_hash
- detected_risk_flags[] (e.g., PHI, LegalThreat, IncentiveBait, CompetitorMention)
- escalation_level (0|1|2|3|Legal)
- response_mode (auto|needs_approval|blocked_manual_review)
- draft_version, model_version, prompt_version, detector_version
- human_approver_id, approval_timestamp
- posted_timestamp
- post_status (drafted|approved|blocked_manual_review|posted|failed)
- error_code (if failed)
- final_response_text
- hold_reason, blocked_timestamp, unblocker_id (if unblocked)

### 7.2 Required audit events
- draft_created
- flagged (with flags)
- approval_granted OR approval_denied
- blocked (manual-only hold)
- posted OR post_failed

### 7.3 Posting gate rules
- If response_mode=blocked_manual_review → system must prevent posting via API and UI.
- If escalation_level=Legal → always blocked_manual_review.

## 8) Weekly Reputation KPI Report — Accuracy Requirements
### 8.1 KPI definitions (minimum)
- Response rate = responded_reviews / total_reviews (by platform + combined)
- Median/avg first-response time (draft_created or posted depending on definition; must be consistent)
- % within SLA (e.g., <24h)
- Rating trend (7/30-day average; must specify aggregation method)
- Sentiment buckets (rule-based or model-based; must store version)
- Escalations count by level and reason
- Unresolved escalations aging
- Reconciliation: approved vs posted vs blocked vs failed

### 8.2 KPI test vectors
- If 10 reviews, 6 posted, 2 blocked_manual_review, 2 pending approval:
  - responded_reviews must clarify whether “blocked” counts as responded (recommended: no).
  - reconciliation must show: drafted=10, approved=6, posted=6, blocked=2, pending=2.

## 9) Go/No-Go Exit Criteria
Go only if:
- Posting gate blocks all blocked_manual_review across API + UI.
- Audit logs contain all required fields for 20 consecutive actions (draft→flag→approve/block→post).
- Weekly report reconciles counts exactly with audit logs for a 7-day window.
- No templates generate forbidden content under any variable substitution allowed.

## 10) Next-step Verification (sandbox or limited live)
- If sandbox exists: execute the runbook against 10 reviews (mix of positive/negative/legal/PHI).
- If no sandbox: limited live test on one low-risk internal location, max 3–5 posts, plus 2 blocked_manual_review attempts to prove posting prevention.

End of Release Pack v1.3.