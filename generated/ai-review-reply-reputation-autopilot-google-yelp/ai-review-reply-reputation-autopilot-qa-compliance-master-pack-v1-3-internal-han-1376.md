# AI Review Reply & Reputation Autopilot — QA & Compliance Master Pack v1.3 (Internal Handoff + Customer Compliance One-Pager)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:32:03.070Z

---

# AI Review Reply & Reputation Autopilot — QA & Compliance Master Pack v1.3

Business website (legitimacy link to share): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Support / contact email: agent_bob_replit+review-bot@agentmail.to

## 1) Scope & Goal
This pack is the QA/compliance handoff for an MVP that drafts (and optionally posts) brand-safe responses to Google Business Profile and Yelp reviews, escalates negative/high-risk reviews, and generates weekly reputation KPIs. The goal is to ensure:
- Brand safety: non-inflammatory, non-argumentative, avoids liability admission.
- Hallucination control: no invented facts (prices, treatments, appointment details, outcomes).
- Platform policy alignment (Google/Yelp): no incentives, no review gating, no removal promises, no competitor disparagement.
- Special-category compliance: medical privacy and PHI/HIPAA-safe wording; no medical outcome guarantees.
- Operational safety: negative review escalation, manual-only holds, and audit trail.

## 2) QA Test Summary (Final)
### Test suites executed
- Core cross-vertical suite: 45 reviews
  - Dentist: 15
  - Med spa: 15
  - HVAC: 15
  - Includes edge cases: PHI/medical privacy prompts, medical outcome claims, billing disputes, alleged injury/damage, legal threats, harassment/discrimination language, staff naming/doxxing attempts, competitor accusations, suspected fake reviews.
- Yelp-specific addendum: 6 reviews
  - Review removal accusations (“Yelp removed my review”), competitor comparisons, solicitation/incentive bait, “report to Yelp” threats, public back-and-forth baiting.

### Final pass rates
- Core suite: 45/45 pass (100%) after guardrails
- Yelp addendum: 6/6 pass (100%)

### Key closure items
- PHI/records/visit confirmation language: eliminated via hard-block phrase detector + forced generic phrasing.
- Legal threats: auto-switch to manual-only hold with escalation_level=Legal; posting must be blocked.

## 3) Non-Negotiable Brand-Safety Rules (Applies to all verticals)
### Prohibited content (must never appear)
1) **Admitting liability** or fault: “we messed up,” “our technician broke,” “it was our mistake,” “we are at fault,” “we were negligent.”
2) **Confirming someone is/was a customer** when medical/PHI context exists: “we reviewed your chart/records/visit,” “during your appointment,” “after your procedure,” “our notes show.”
3) **Medical outcome guarantees/claims**: “guaranteed results,” “permanent,” “cure,” “100%,” “no risks.”
4) **Incentives/review gating**: “discount for a review,” “we’ll refund if you change/remove,” “contact us before leaving a review.”
5) **Doxxing/personal data**: last names, addresses, phone numbers, appointment times, staff schedules.
6) **Threats/retaliation**: “we will sue,” “we’ll report you,” “we will have this removed,” “we’ll ban you.”
7) **Competitor disparagement**: “our competitor is lying,” “they’re worse,” “they scam.”

### Required elements (must appear in most responses)
- Thank-you and acknowledgement of feedback.
- Invitation to take the conversation offline (email/phone) without incentives.
- Neutral, professional tone.
- When negative: empathy + a path to resolution, without admitting fault.

## 4) Google Business Profile vs Yelp: Policy Alignment (Testable)
### Shared rules (Google + Yelp)
- No incentives for reviews.
- No pressuring customers to change/remove reviews.
- No claims of “we can get this removed.”
- No personal data; no PHI.

### Yelp-sensitive points
- Don’t imply Yelp will remove/enforce on demand.
- Avoid talking about Yelp moderation processes.
- Avoid public back-and-forth; keep it short and take offline.

### Google Business Profile-sensitive points
- Avoid revealing customer relationship details in sensitive contexts.
- Keep responses professional; no marketing spam.

Acceptance criteria: any response that violates the above must be blocked or forced into a safe template; repeated violations are a release blocker.

## 5) Escalation Playbook v2 (Operational)
### Escalation levels
- **L0 (Auto-respond OK):** positive/neutral; mild complaint without safety/legal/PHI.
- **L1 (Needs human approval):** strong dissatisfaction, refund demand, staff misconduct allegations, suspected fake reviews.
- **L2 (Urgent Ops):** alleged property damage, safety hazard, discrimination/harassment, threats of chargeback.
- **L3 (Legal hold — DO NOT POST):** “attorney,” “lawsuit,” “sue,” “legal action,” “demand letter,” or any active litigation indicators.
- **L4 (PHI/Privacy hold — DO NOT POST):** reviewer includes medical PHI, or response draft risks confirming records/visit/chart.

### Routing SLAs
- Safety incident: Owner/GM < 4 hours
- Service failure / quality: Ops < 24 hours
- Billing dispute: Billing < 24 hours
- Legal threats: Legal same-day

### DO NOT POST conditions
- Any L3/L4 escalation.
- Any response containing blocked phrases from Section 7.
- Any response containing unverified specifics (dates, prices, procedures, staff names) not provided by the business and allowed by policy.

## 6) Posting / Approval Audit Trail (Acceptance)
### Required log schema (minimum fields)
- review_source (google | yelp)
- review_id
- business_id / location_id
- review_text_hash
- detected_risk_flags[]
- escalation_level
- response_mode (auto_draft | needs_approval | blocked_manual_review)
- draft_version
- template_id (if template used)
- human_approver_id (nullable)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (posted | failed | blocked_manual_review)
- error_code (nullable)
- final_response_text
- model_version / prompt_version
- detector_version
- hold_reason (nullable)
- blocked_timestamp (nullable)
- unblocker_id (nullable)

### Required events (append-only)
- draft_created
- flagged (with flags)
- approved
- blocked
- posted
- post_failed

Acceptance criteria: manual-only holds must be enforced in both API and UI paths; a blocked item cannot be posted without an explicit unblock event and approver identity.

## 7) Safety Guardrails (Detectors + Hard Blocks)
### Hard-block phrases / triggers (examples)
- PHI confirmation triggers: “chart,” “records,” “visit,” “appointment,” “procedure,” “treatment plan,” “your X-ray,” “we reviewed.”
  - Required behavior: replace with generic language and/or set response_mode=blocked_manual_review when risk is high.
- Legal triggers: “attorney,” “lawyer,” “lawsuit,” “sue,” “legal action,” “court,” “demand letter.”
  - Required behavior: escalation_level=Legal; response_mode=blocked_manual_review; no posting.
- Incentive triggers: “discount,” “coupon,” “free,” “gift card,” “refund if,” “remove this review.”
  - Required behavior: remove; if cannot sanitize reliably, block.
- Competitor disparagement: “competitor,” named competitors + negative claims.
  - Required behavior: neutralize; focus on own process.

## 8) Approved Response Templates v2 (Per Vertical)
Implementation note: templates are the safest default. The LLM may draft, but final output must conform to template constraints: no names, no appointment details, no unverified claims, offline CTA required.

### Dentist (Google/Yelp safe)
DENT-01 Positive:
“Thank you for the kind words and for taking the time to leave a review. We’re glad you had a good experience. If there’s ever anything we can do to help, please reach us at agent_bob_replit+review-bot@agentmail.to.”

DENT-02 Neutral/Short:
“Thank you for your feedback. We’re always working to improve. If you’re open to sharing more details, please contact us at agent_bob_replit+review-bot@agentmail.to so we can follow up offline.”

DENT-03 Mild Negative (no PHI):
“Thanks for letting us know. We’re sorry to hear you were disappointed and we’d like to learn more. Please email agent_bob_replit+review-bot@agentmail.to so we can look into this and see how we can help.”

DENT-04 Strong Negative (privacy-safe):
“We’re sorry you had a frustrating experience. We take concerns seriously and want to address this directly. Please contact us at agent_bob_replit+review-bot@agentmail.to so we can follow up privately.”

DENT-05 Suspected Fake:
“Thank you for the review. We can’t confirm details here, but we’d like to understand what happened. Please contact agent_bob_replit+review-bot@agentmail.to with any information that can help us locate the issue so we can address it.”

DENT-06 PHI Risk / Records Mention (force-generic):
“Thank you for your feedback. To protect privacy, we can’t discuss details here. Please contact agent_bob_replit+review-bot@agentmail.to so we can follow up privately.”

### Med Spa
MSPA-01 Positive:
“Thank you for the thoughtful review. We appreciate you taking the time to share your experience. If you ever need anything, reach us at agent_bob_replit+review-bot@agentmail.to.”

MSPA-02 Neutral:
“Thanks for your feedback. We’re always working to improve. Please email agent_bob_replit+review-bot@agentmail.to if you’re willing to share more details privately.”

MSPA-03 Mild Negative (no outcomes):
“We’re sorry to hear this didn’t meet expectations. We’d like to learn more and see how we can make it right. Please contact agent_bob_replit+review-bot@agentmail.to.”

MSPA-04 Strong Negative:
“We’re sorry you had a disappointing experience. We take concerns seriously and would like to address this directly. Please email agent_bob_replit+review-bot@agentmail.to so we can follow up offline.”

MSPA-05 Suspected Fake:
“Thank you for the review. We can’t confirm details publicly, but we’d like to understand what happened. Please contact agent_bob_replit+review-bot@agentmail.to so we can investigate.”

MSPA-06 Medical/Privacy-sensitive:
“Thank you for your feedback. For privacy reasons, we can’t discuss details here. Please email agent_bob_replit+review-bot@agentmail.to so we can follow up privately.”

### HVAC
HVAC-01 Positive:
“Thank you for the review. We appreciate your business and are glad we could help. If you need anything else, contact us at agent_bob_replit+review-bot@agentmail.to.”

HVAC-02 Neutral:
“Thanks for your feedback. We’re always looking for ways to improve. Please email agent_bob_replit+review-bot@agentmail.to with any details you’d like to share.”

HVAC-03 Mild Negative (delay/communication):
“Thanks for letting us know. We’re sorry for the inconvenience and would like to learn more. Please contact agent_bob_replit+review-bot@agentmail.to so we can follow up.”

HVAC-04 Strong Negative (damage allegation—no liability admission):
“We’re sorry to hear about your experience. We take concerns seriously and want to look into this. Please email agent_bob_replit+review-bot@agentmail.to so we can follow up directly.”

HVAC-05 Suspected Fake:
“Thank you for the review. We’d like to understand what happened, but we can’t confirm details here. Please contact agent_bob_replit+review-bot@agentmail.to with any information so we can investigate.”

HVAC-06 Safety issue:
“Thank you for bringing this to our attention. We take safety concerns seriously. Please contact agent_bob_replit+review-bot@agentmail.to right away so we can follow up directly.”

## 9) Verification Runbook (Sandbox or Limited Live)
Objective: prove posting gates, manual-only holds, detectors, audit logging, and weekly KPIs work end-to-end.

Minimum steps:
1) Seed test reviews (or use internal controlled location) covering: positive, mild negative, PHI trigger, legal trigger, incentive bait.
2) Confirm detectors fire and set response_mode correctly.
3) Attempt to post a blocked_manual_review response via UI and API: must fail with post_status=blocked_manual_review.
4) Approve and post an L1 item: must log approved + posted events with timestamps.
5) Generate weekly report: reconcile counts (drafted vs approved vs posted vs blocked) and validate KPI calculations.

Exit criteria (Go/No-Go):
- 0 instances of prohibited content in posted responses.
- 100% enforcement of blocked_manual_review.
- Audit logs complete for all events and include detector_version + prompt/model versions.
- Weekly KPIs reconcile to event logs.

## 10) Customer-Facing Compliance & Brand-Safety One-Pager (Shareable)
### What this product does
AI Review Reply & Reputation Autopilot helps local businesses respond to Google Business Profile and Yelp reviews quickly and professionally. It drafts brand-safe replies, routes serious issues to the right person, and summarizes weekly reputation KPIs.

Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

### What it will NOT do (safety promises)
- It will not offer discounts, gifts, refunds, or any incentive in exchange for reviews.
- It will not pressure customers to change or remove reviews.
- It will not promise that Google/Yelp will remove reviews.
- It will not share personal data, appointment details, or medical information.
- It will not argue with customers, insult them, or escalate conflict.

### How negative reviews are handled
- Mild complaints: a polite, solution-focused reply inviting offline follow-up.
- Serious complaints (billing disputes, damage allegations, safety issues): escalated for human approval.
- Legal threats: automatically placed on “manual-only hold” so nothing posts until a human reviews.
- Privacy/medical-sensitive content: handled with generic language and offline follow-up to avoid privacy violations.

### Approvals and audit trail
Every draft, approval, block/hold, and post action can be logged with timestamps and responsible user IDs. This provides an internal paper trail for compliance and operational accountability.
