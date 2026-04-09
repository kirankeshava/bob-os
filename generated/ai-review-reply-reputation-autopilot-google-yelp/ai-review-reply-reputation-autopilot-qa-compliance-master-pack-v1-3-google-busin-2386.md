# AI Review Reply & Reputation Autopilot — QA & Compliance Master Pack v1.3 (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T21:08:42.908Z

---

# QA & Compliance Master Pack v1.3
Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Website (for legitimacy in comms): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

## 1) Scope & Objective
This pack defines the brand-safety, hallucination-control, and platform-policy requirements for an MVP that drafts (and optionally posts) responses to Google Business Profile and Yelp reviews, escalates negative/high-risk reviews, and reports weekly reputation KPIs. The goal is to ensure responses are: (a) non-inflammatory and brand-safe; (b) compliant with Google/Yelp expectations; (c) safe in regulated contexts (healthcare/medical-like claims); (d) auditable with an approval/posting trail; and (e) accurately reported in weekly KPI summaries.

## 2) Test Suite & Final Results
### 2.1 Sample Review Corpus
Regression corpus size: 50 reviews across niches.
- Dentist: 20
- Med spa: 15
- HVAC: 15
Each review is tagged with risk flags: PHI/HIPAA, medical outcome claim, incentives/discount solicitation, doxxing/staff name, discrimination/harassment, competitor disparagement, refund/billing dispute, property damage, safety hazard, legal threat, suspected fake.

### 2.2 Pass/Fail Summary (final)
Core suite: 45/45 pass (100%)
Yelp-specific addendum: 6/6 pass (100%)
Expanded corpus items beyond the original 45 were used to confirm no regression in: offline-CTA inclusion, no-liability admission language, PHI non-confirmation, and legal-threat posting holds.

## 3) Hard Requirements (Brand Safety + Hallucination Control)
These requirements must be enforced BOTH:
1) pre-generation (prompt rules + template constraints)
2) post-generation (response linting + posting gate)

### 3.1 Non-negotiable prohibitions (must never appear)
A response must not:
- Confirm PHI or a patient/client relationship (e.g., “we saw you,” “your visit,” “your chart/records,” “we reviewed your file”).
- Contain medical outcome guarantees or imply clinical certainty (e.g., “this will cure,” “guaranteed results,” “permanent fix”).
- Admit liability or fault for damage/injury (e.g., “we caused,” “our technician broke,” “it’s our fault”).
- Offer incentives/discounts in exchange for reviews, edits, or removal (review gating/incentivization).
- Threaten, retaliate, shame, or argue with the reviewer.
- Doxx: include personal data (addresses, phone numbers, appointment dates/times, staff last names tied to incidents, etc.).
- Disparage competitors or accuse the reviewer of being a competitor (can say “we can’t find a record” but not “you’re a competitor lying”).
- Promise platform enforcement actions (e.g., “Yelp/Google will remove this,” “we reported you to Yelp and it will be taken down”).

### 3.2 Required elements (must appear in most replies)
- Thank/acknowledge sentiment.
- A neutral, non-admitting statement.
- An offline CTA: invite reviewer to contact the business privately (phone/email), especially for negatives.
- For negatives: an attempt to resolve + request for details offline.
- Maintain professional tone; no sarcasm; no “policy debate.”

## 4) Escalation & Posting Gates
### 4.1 Escalation levels
- Level 0: Safe to auto-draft; optional auto-post depending on account settings.
- Level 1 (Ops): service quality complaint, late/no-show, mild dissatisfaction → draft allowed; approval recommended.
- Level 2 (Billing): refund/pricing dispute → draft allowed; approval required.
- Level 3 (Safety): injury, property damage, dangerous work, harassment/discrimination → draft allowed with extra caution OR manual-only depending on phrasing; approval required.
- Level Legal (Manual-only hold): any legal threat language (“attorney,” “lawsuit,” “sue,” “legal action,” “my lawyer”) → MUST set response_mode = blocked_manual_review.
- Level PHI (Manual-only hold): any PHI/relationship confirmation risk (“chart,” “records,” “your visit,” “your appointment,” “we treated you”) → MUST set response_mode = blocked_manual_review OR force generic non-confirming language if allowed by policy.

### 4.2 Manual-only hold: acceptance criteria
If flagged Legal or PHI high-risk:
- System MUST NOT post via API or UI.
- post_status MUST be 'blocked_manual_review'.
- hold_reason MUST be set (e.g., 'legal_threat_detected', 'phi_confirmation_risk').
- Escalation is created with SLA routing.

## 5) Audit Trail (Approval + Posting) — Required Log Schema
Minimum fields per review action:
- review_source (google|yelp)
- review_id
- business_id / location_id
- review_text_hash (sha256)
- review_rating (if available)
- detected_risk_flags[]
- escalation_level (0/1/2/3/Legal/PHI)
- response_mode (draft_only|needs_approval|blocked_manual_review|auto_post_allowed)
- draft_version
- final_response_text
- model_version / prompt_version / template_id
- human_approver_id (nullable)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (drafted|approved|posted|blocked_manual_review|error)
- error_code (nullable)
- detector_version
- hold_reason (nullable)
- blocked_timestamp (nullable)
- unblocker_id + unblock_timestamp (nullable)

Required events:
- draft_created
- flagged
- approved (if applicable)
- blocked (if applicable)
- posted (if applicable)

## 6) Weekly KPI Report — Definitions + Reconciliation Rules
KPIs must reconcile with the audit trail:
- Response rate = responded_reviews / total_reviews_received
  - responded_reviews counts posted responses only (post_status='posted')
  - blocked_manual_review does NOT count as responded
- First response time: difference between review_created_at and posted_timestamp (or approval_timestamp for “approval latency” as separate KPI)
- SLA compliance %: percent of reviews responded within target window (e.g., <24h)
- Sentiment buckets: derived from review rating + text classification; must not override star rating
- Escalations count: by escalation_level and by hold_reason
- Posted vs approved vs blocked reconciliation:
  - approved_count = post_status in ('approved','posted')
  - posted_count = post_status='posted'
  - blocked_count = post_status='blocked_manual_review'
  - approved_count must be >= posted_count

## 7) Approved Response Templates (Per Vertical, Policy-Safe)
All templates must:
- avoid PHI confirmation
- avoid medical outcomes guarantees
- avoid admissions of fault
- avoid incentives
- include offline CTA

### 7.1 Dentist (Google/Yelp)
**DENT-01 Positive**
“Thank you for the kind words. We’re glad you had a great experience with our team. If there’s ever anything we can do to help, please reach us at {{business_phone}} or {{business_email}}.”

**DENT-02 Neutral/Short**
“Thanks for taking the time to leave feedback. We appreciate it and are always working to improve. If you’re open to sharing more details, please contact us at {{business_phone}} so we can follow up.”

**DENT-03 Mild Negative (no PHI)**
“Thank you for your feedback. We’re sorry to hear you were disappointed. We can’t discuss details here, but we’d like to learn more and try to make things right—please contact our office at {{business_phone}} or {{business_email}}.”

**DENT-04 Strong Negative (service issue)**
“We’re sorry to hear this. We take concerns seriously and want to address them directly. Please contact {{business_phone}} and ask for the office manager so we can review what happened and work toward a resolution.”

**DENT-05 Suspected Fake / No Record**
“Thank you for the review. We take feedback seriously, but we’re not able to match this experience to our records based on the information provided. Please contact us at {{business_phone}} so we can understand the situation and assist.”

**DENT-06 Safety/Legal/PHI trigger**
(Do not post; manual-only hold. If forced to draft a placeholder for internal approval queue)
“Flagged for internal review due to sensitive content. Do not post publicly until approved.”

### 7.2 Med Spa
**SPA-01 Positive**
“Thank you for the wonderful feedback. We’re grateful you took the time to share your experience. If you ever have questions, please reach us at {{business_phone}}.”

**SPA-02 Neutral**
“Thanks for your feedback. We’re always looking for ways to improve. If you’re willing, please contact us at {{business_email}} so we can learn more.”

**SPA-03 Mild Negative**
“We’re sorry to hear you felt let down. We’d like to understand what happened and see how we can help. Please contact us directly at {{business_phone}} so we can follow up privately.”

**SPA-04 Strong Negative (no outcome claims)**
“Thank you for sharing this. We take your concerns seriously and want to address them directly. Please contact our manager at {{business_phone}} so we can review the situation and work toward a resolution.”

**SPA-05 Suspected Fake**
“Thank you for the feedback. We’re not able to identify this experience from the information provided. Please contact us at {{business_phone}} so we can understand and assist.”

**SPA-06 Safety/Legal/PHI trigger**
Manual-only hold (same as DENT-06).

### 7.3 HVAC
**HVAC-01 Positive**
“Thank you for the great review. We appreciate the opportunity to help and are glad you were satisfied with our service. If you need anything else, contact us at {{business_phone}}.”

**HVAC-02 Neutral**
“Thanks for the feedback. We’re always working to improve. If you can share more details, please reach us at {{business_email}} so we can follow up.”

**HVAC-03 Mild Negative**
“We’re sorry to hear this. We’d like to learn more and see how we can help. Please contact us at {{business_phone}} and we’ll follow up directly.”

**HVAC-04 Strong Negative (no liability admission)**
“Thank you for letting us know. We take concerns seriously and want to address this promptly. Please contact our office at {{business_phone}} so we can review the situation and discuss next steps.”

**HVAC-05 Suspected Fake**
“Thank you for the review. We’re unable to match this experience to our service records based on the information provided. Please contact us at {{business_phone}} so we can understand what happened and assist.”

**HVAC-06 Safety/Legal trigger**
Manual-only hold.

## 8) Brand-Safety Checklist (Operator Tick-Box)
Before approval/posting, confirm:
- [ ] No PHI confirmation (no “your visit/appointment/records/chart”)
- [ ] No medical guarantees or outcome promises
- [ ] No admission of fault/liability
- [ ] No incentives/discounts offered for review changes
- [ ] No removal promises (“Yelp/Google will remove”)
- [ ] No competitor disparagement
- [ ] No personal data (names + details that identify individuals)
- [ ] Offline CTA included for negatives
- [ ] Calm, non-argumentative tone
- [ ] If legal threat present → blocked_manual_review
- [ ] If PHI high-risk present → blocked_manual_review

## 9) Escalation Playbook (Common Negative Scenarios)
### 9.1 Billing/refund dispute
Routing: Billing (SLA <24h)
Public reply: acknowledge + invite offline; do not debate amounts publicly.
Evidence to collect: invoice, call log, service agreement.

### 9.2 Damage/injury/safety hazard
Routing: Owner/GM (SLA <4h) + Safety
Public reply: empathize; do not admit fault; move offline.
Do-not-post conditions: any mention of injury requiring care, insurance claims, or legal threats → manual-only hold.

### 9.3 Discrimination/harassment allegations
Routing: Owner/HR (SLA <4h)
Public reply: serious acknowledgement; request offline contact; avoid details.

### 9.4 PHI/HIPAA mention (health contexts)
Routing: Compliance/Owner (SLA <4h)
System behavior: manual-only hold if any relationship confirmation risk detected.

### 9.5 Legal threat
Routing: Legal/Owner (same-day)
System behavior: manual-only hold; do not post.

## 10) Customer-Facing Safety & Compliance Disclosure (Onboarding Snippet)
“Our system drafts professional, brand-safe responses to public reviews and can escalate sensitive situations for human review. To protect your business and customers, we will not publish responses to reviews that include legal threats or potentially sensitive personal/medical information. In those cases, the review will be flagged as ‘Manual Review Required’ and held from posting until you approve. We also avoid incentives, review gating, competitor comments, and any language that could admit fault or disclose private details. All drafts, approvals, and posting actions are logged for auditing and weekly reporting.”

## 11) Go/No-Go Launch Gate (Exit Criteria)
Launch is “GO” only if all are true:
- Detectors: PHI + legal threat + incentives + competitor disparagement triggers pass unit tests
- Posting gates: blocked_manual_review prevents posting via UI and API
- Audit logs: all required fields/events emitted in at least 10 end-to-end trials
- Weekly KPIs: reconciliation matches audit logs (posted vs approved vs blocked)
- Template library: only approved templates active; prompt cannot override prohibitions

---
Versioning
- Master Pack: v1.3
- Templates: v2
- Playbook: v2
- Checklist: v2
- Runbook: v1.2 (referenced for execution)
