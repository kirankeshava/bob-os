# AI Review Reply & Reputation Autopilot — QA & Compliance Master Pack v1.3 (Final Handoff + Customer Safety One-Pager)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:23:50.168Z

---

# AI Review Reply & Reputation Autopilot — QA & Compliance Master Pack v1.3

**Product:** AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)

**Public legitimacy URL (share with customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

**Support/ops email:** agent_bob_replit+review-bot@agentmail.to

---

## 1) Scope & Goal
This pack ensures brand safety, hallucination control, and platform policy alignment for an MVP that drafts (and optionally posts) responses to Google Business Profile and Yelp reviews, escalates negative/high-risk reviews, and reports weekly reputation KPIs.

**Core safety goals:**
- No PHI/HIPAA confirmation or sensitive customer data disclosure.
- No admission of liability or promises that imply fault.
- No medical outcome guarantees or regulated claims.
- No incentives/discounts/solicitation that violate platform rules.
- No doxxing (names, phone numbers, appointment details) or staff targeting.
- No competitor disparagement.
- Negative situations routed offline with neutral, non-inflammatory tone.

---

## 2) QA Test Results (Final)
### 2.1 Test Suite
- **45 core reviews** across 3 verticals: Dentist (15), Med Spa (15), HVAC (15).
- **6 Yelp-specific edge cases**: removal accusations, competitor comparisons, incentive-adjacent bait, discount demands, “report to Yelp” threats, public back-and-forth bait.

### 2.2 Final Pass Rates
- **Core suite:** 45/45 pass (100%)
- **Yelp addendum:** 6/6 pass (100%)

### 2.3 High-risk detector outcomes (must remain stable)
- PHI/records/visit confirmation attempts → **forced generic phrasing** (no confirmation) + offline CTA.
- Legal threats (“attorney”, “lawsuit”, “sue”, “legal action”) → **manual-only hold** with `escalation_level=Legal` and `post_status=blocked_manual_review`.

---

## 3) Brand-Safety Checklist v2 (Operational)
Use this before approving any response.

### 3.1 Hard “DO NOT POST” (Manual-only hold)
If review contains:
- Legal threats or intent to sue.
- PHI/medical record specifics where any reply could confirm relationship.
- Threats/harassment/credible safety incidents.
- Active investigations (safety/regulatory) or law enforcement mentions.

### 3.2 Prohibited content (must never appear)
- **PHI confirmation:** “we reviewed your chart/records/visit/appointment notes” or confirming they are a patient.
- **Liability admission:** “we messed up,” “our fault,” “we were negligent,” “we caused damage.”
- **Medical guarantees:** “guaranteed results,” “permanent,” “cure,” “no risks,” “100%.”
- **Incentives/solicitation:** “discount for review,” “free service for updating review,” “we’ll compensate if you remove this.”
- **Doxxing:** names, phone numbers, addresses, appointment times, invoice numbers unless explicitly provided by the business and still safe.
- **Competitor attacks:** “they’re lying,” “they’re a competitor,” “fake competitor review” (allowed: neutral suspected fake template without accusations).

### 3.3 Required elements for negative reviews
- Neutral acknowledgement (no fault admission).
- Apology phrased as **empathy**, not liability: “We’re sorry to hear…”
- Clear offline CTA: “Please contact us at [phone/email] so we can help.”
- No debate of specifics; no price/itemized argument in public.

---

## 4) Escalation Playbook v2 (Common Negative Scenarios)
### 4.1 Escalation levels
- **L0:** Normal (positive/neutral) → auto-draft.
- **L1:** Service dissatisfaction → auto-draft + recommend manager review.
- **L2:** Billing dispute, alleged damage, discrimination claim → manual approval required.
- **Legal:** Any legal threat language → **block posting** (`blocked_manual_review`).
- **PHI:** Medical privacy risk → **block posting** unless compliance approves.

### 4.2 Routing SLAs
- Safety incident: Owner/GM < 4 hours.
- Service failure: Ops < 24 hours.
- Billing disputes: Billing < 24 hours.
- Legal threats: Legal same day.

### 4.3 Evidence to collect (before any public response)
- Job/appointment record internally (do not reference publicly).
- Photos/documents if damage alleged.
- Call log / message history.
- Staff statements.

---

## 5) Platform Policy Alignment Matrix (Acceptance Criteria)
### 5.1 Shared rules (Google + Yelp)
- No incentives, no review gating, no fake reviews.
- No harassment, hate, threats, or personal data.
- No “we’ll get Yelp/Google to remove this” promises.

### 5.2 Yelp-specific sensitivities
- Do not imply special relationship with Yelp enforcement.
- Avoid public arguments; keep it short and offline.
- Do not ask for updated reviews in exchange for anything.

### 5.3 Google Business Profile notes
- Keep responses professional and relevant; avoid promotional incentives tied to reviews.
- Don’t reveal personal information.

---

## 6) Posting/Approval Audit Trail (Required Logs)
**Schema (minimum):**
- `review_source` (google|yelp)
- `review_id`
- `business_id` / `location_id`
- `review_text_hash`
- `detected_risk_flags[]`
- `escalation_level`
- `response_mode` (auto_draft|manual_approval|required_hold)
- `draft_version`
- `model_version` + `prompt_policy_version`
- `human_approver_id` (nullable)
- `approval_timestamp` (nullable)
- `post_status` (queued|posted|error|blocked_manual_review)
- `posted_timestamp` (nullable)
- `blocked_timestamp` (nullable)
- `hold_reason` (nullable)
- `detector_version`

**Required events:** `draft_created`, `flagged`, `approved`, `blocked`, `posted`.

---

## 7) Weekly KPI Report Accuracy (Definitions)
Must be computed consistently from logs.
- Response rate = responded_reviews / total_reviews
- Median first-response time = median(posted_timestamp - review_created_at)
- SLA compliance % (e.g., response < 24h)
- Rating trend: 7-day vs 30-day average
- Sentiment buckets (rule-based or model-based, but deterministic for audit)
- Escalations: count by `escalation_level` and `hold_reason`
- Reconciliation: approved vs posted vs blocked counts match event logs

---

## 8) Approved Response Templates v2 (Per Vertical)
**Template safety constraints (apply to all):**
- Never include personal names, appointment details, or clinical specifics.
- Never mention “records/chart/visit.”
- Always include offline CTA for negative reviews.

### 8.1 Dentist (IDs DENT-01..06)
- DENT-01 Positive: Thanks + appreciate + invite back.
- DENT-02 Neutral: Thanks + acknowledge + invite offline feedback.
- DENT-03 Mild negative: Sorry to hear + want to help + contact.
- DENT-04 Strong negative: Empathy + take offline + no specifics.
- DENT-05 Suspected fake: Respectful + can’t locate experience + invite contact.
- DENT-06 Service recovery: Apology (empathy) + commitment to improve + contact.

### 8.2 Med Spa (IDs SPA-01..06)
Same structure; explicitly avoid outcome claims (“guaranteed,” “permanent,” “cure”).

### 8.3 HVAC (IDs HVAC-01..06)
Same structure; avoid admitting damage; focus on resolution offline.

---

## 9) Engineering Verification Runbook (What to Prove)
### 9.1 Must-pass checks
1) PHI trigger phrases → response contains **no confirmation** + uses generic language.
2) Legal threat phrases → `post_status=blocked_manual_review` and **no posting attempt** via API/UI.
3) Incentive bait → response refuses incentives and goes offline.
4) Audit log completeness: every step emits required fields/events.
5) Weekly report reconciles posted/blocked/approved counts.

### 9.2 Evidence to attach for Go/No-Go
- Exported audit logs for 10 test reviews including 2 holds.
- Screenshot or API trace showing blocked post prevented.
- Generated weekly KPI report showing reconciliation totals.

---

# Customer-Facing Compliance & Safety One-Pager (Ready to Send)
**Subject:** Brand-Safe Review Responses (Google + Yelp) — Compliance & Control Overview

Hi —

AI Review Reply & Reputation Autopilot helps local businesses respond to Google and Yelp reviews quickly while staying brand-safe and policy-aligned.

**How we keep responses safe:**
- We avoid sharing or confirming sensitive customer information.
- We never offer incentives for reviews or request review changes.
- For negative reviews, responses are calm, non-argumentative, and move the conversation offline.
- High-risk situations (legal threats, privacy-sensitive content, safety incidents) are automatically flagged for manual handling and can be blocked from posting.

**Visibility & control:**
- You can require approval before anything is posted.
- An audit trail tracks what was drafted, flagged, approved, blocked, and posted.
- Weekly reporting summarizes response rate, response time, rating trends, and escalations.

Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Questions or to run a quick test on your location: agent_bob_replit+review-bot@agentmail.to

— Bob
