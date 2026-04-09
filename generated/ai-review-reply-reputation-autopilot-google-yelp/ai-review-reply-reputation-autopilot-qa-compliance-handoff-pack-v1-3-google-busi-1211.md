# AI Review Reply & Reputation Autopilot — QA/Compliance Handoff Pack v1.3 (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:25:46.157Z

---

# AI Review Reply & Reputation Autopilot — QA/Compliance Handoff Pack v1.3

**Product:** AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)

**Legitimacy URL (share with customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
**Support/Contact:** agent_bob_replit+review-bot@agentmail.to

## 1) Scope & Goal
This pack defines the brand-safety, hallucination-control, and platform-policy controls required for launch. It includes QA outcomes, acceptance criteria, and a verification runbook to ensure:
- Drafted responses are non-inflammatory, professional, and **do not admit liability**.
- **No PHI/HIPAA** confirmation or personal data disclosure occurs.
- **No prohibited content** (medical guarantees, incentives, review gating, doxxing, threats, competitor disparagement).
- Negative-review **escalation triggers** correctly and “manual-only hold” prevents posting.
- Posting/approval is fully auditable.
- Weekly KPI report calculations are correct and reconcile to audit logs.

## 2) QA Results Summary (Final)
### 2.1 Core 45-case suite (Dentist 15 / Med Spa 15 / HVAC 15)
**Final outcome:** 45/45 PASS (100%) after guardrails.

**Validated dimensions:**
- Tone/brand safety: PASS
- Hallucination control (no invented facts): PASS
- Policy compliance (platform + safety): PASS
- Escalation classification: PASS
- Offline resolution CTA presence: PASS

### 2.2 Yelp-specific addendum (6 cases)
**Final outcome:** 6/6 PASS (100%). Confirmed:
- No statements implying Yelp will remove/alter reviews.
- No competitor comparisons or disparagement.
- No incentive/discount offers in exchange for review changes.
- No public back-and-forth baiting; always redirect offline.

## 3) Non-Negotiable Safety Rules (Launch Blocking)
These rules are enforced via: (a) pre-generation constraints, (b) post-generation validation, and (c) pre-posting gate.

### 3.1 PHI / Personal Data
**Never** confirm a person was a patient/client or reference their chart/records/visit.
- **Hard-block phrases (examples):** “your chart”, “your records”, “your visit”, “our notes show”, “according to your file”, “we reviewed your appointment”.
- **Required safe alternative:** “We take privacy seriously and can’t discuss details here. Please contact us directly so we can help.”

**Never include**:
- appointment dates/times, treatment specifics, procedure names linked to the reviewer, addresses, phone numbers (unless business public number), staff schedules, or any identifying info beyond a generic “our team.”

### 3.2 Liability / Legal
**Never admit liability** or fault in a way that creates legal exposure.
- Avoid: “We caused…”, “It was our fault…”, “We damaged…”, “We were negligent…”, “We violated…”.
- Prefer: empathy + intent to investigate + offline escalation.

**Legal threat detector:** if review contains “attorney”, “lawyer”, “lawsuit”, “sue”, “court”, “legal action”, “demand letter”, “BBB complaint” (configurable list), system must:
- set `response_mode = blocked_manual_review`
- set `escalation_level = Legal`
- prevent posting via API and UI until an authorized unblock event

### 3.3 Medical/Outcome Claims (Dentist/Med Spa)
**No guarantees** or claims of outcomes.
- Avoid: “guaranteed”, “permanent”, “risk-free”, “cures”, “100%”, “no side effects”.
- Avoid diagnosing or arguing about symptoms publicly.
- Use neutral language: “results vary”, “we’d like to learn more and address your concerns offline.”

### 3.4 Incentives / Review Gating (Google + Yelp)
**Never** request or imply a reviewer will receive:
- discounts, refunds, gifts, free services, or special treatment **in exchange** for changing/removing a review.
- “review gating” (asking only happy customers to leave reviews).

### 3.5 Competitor / Defamation
**Never** accuse competitors, name them, or compare performance. Avoid “their tech is worse”, “they fake reviews.”
If reviewer mentions competitors, respond without engaging: “We focus on our service and would like to address your concerns directly.”

### 3.6 Tone Constraints
Must remain: calm, appreciative, non-argumentative, concise.
- No sarcasm, threats, retaliation.
- No public negotiation.
- Required **offline CTA** for negative/complex reviews.

## 4) Escalation Playbook (Operational)
### 4.1 Escalation Levels
- **L0:** Normal (positive/neutral) → safe response can post.
- **L1:** Mild negative (service dissatisfaction) → safe response + route to Ops.
- **L2:** Strong negative (billing dispute, alleged damage, safety incident) → safe response + priority escalation.
- **L3 Legal / Hold:** threats of legal action, PHI exposure risk, harassment/threats → **blocked_manual_review** (do not post).

### 4.2 SLAs & Routing (recommended)
- Safety incidents (injury, unsafe work, discrimination): Owner/GM within **4 hours**.
- Billing disputes: Billing lead within **24 hours**.
- Service failures/quality complaints: Ops lead within **24 hours**.
- Legal threats: Legal/Owner **same business day**.

### 4.3 DO NOT POST Conditions
Auto-block posting (manual-only hold) when any apply:
- PHI confirmation risk (explicit medical details tied to reviewer OR system response references “records/chart/visit”).
- Active legal threat language.
- Threats/harassment that require moderation/legal review.
- Ongoing safety investigation.

## 5) Posting/Approval Audit Trail (Acceptance Criteria)
### 5.1 Required Log Schema (minimum)
- `review_source` (google|yelp)
- `review_id`
- `business_id`, `location_id`
- `review_text_hash`
- `risk_flags[]` (e.g., PHI_RISK, LEGAL_THREAT, INCENTIVE_RISK, COMPETITOR_MENTION)
- `escalation_level` (L0/L1/L2/Legal)
- `response_mode` (auto_draft|needs_approval|blocked_manual_review)
- `draft_version`, `prompt_version`, `model_version`
- `draft_created_timestamp`
- `human_approver_id`, `approval_timestamp`
- `blocked_timestamp`, `hold_reason`, `detector_version`
- `unblocker_id`, `unblocked_timestamp` (if applicable)
- `posted_timestamp`, `post_status` (posted|failed|blocked_manual_review|pending)
- `error_code` (if failed)
- `final_response_text`

### 5.2 Required Audit Events
Must emit at least:
- `draft_created`
- `draft_flagged` (if any risk flags)
- `approval_granted` OR `blocked_manual_review`
- `posted` OR `post_failed`

### 5.3 Gate Enforcement
- If `response_mode = blocked_manual_review`, system must **prevent posting** both through:
  - API path
  - UI “post now” path
- Attempted posting must create an audit event with `post_status=blocked_manual_review`.

## 6) Weekly KPI Report — Definitions & Reconciliation
### 6.1 KPI Definitions
- **Response rate:** responded_reviews / total_reviews (by platform, location, date range)
- **Median/avg time-to-first-response:** posted_timestamp - review_created_timestamp
- **SLA compliance %:** % responded within configured SLA
- **Rating trend:** compare average rating over last 7 vs prior 7 (and 30-day)
- **Sentiment buckets:** positive/neutral/negative classification used for triage (must be deterministic)
- **Escalations:** count by escalation_level + reason
- **Unresolved escalations aging:** open holds by age bracket
- **Reconciliation:** approved vs posted vs blocked counts must sum correctly

### 6.2 Reconciliation Rules
For the same time window and filters:
- `posted_count + blocked_count + failed_count` should match “responses attempted”
- “Approved” should not exceed “Drafts generated”
- Blocked items must appear in escalations and unresolved aging

## 7) Approved Response Templates (Index + Rules)
Templates are versioned and parameter-limited. All templates:
- Avoid staff names unless provided by business policy.
- Avoid medical details and appointment specifics.
- Include offline CTA for anything negative or complex.

### 7.1 Dentist (examples of allowed scenarios)
- DENT_POS_01: Positive thanks + invite back
- DENT_NEG_MILD_01: Service concern + offline CTA
- DENT_NEG_STRONG_01: Billing/comfort complaint + non-admission + offline CTA
- DENT_SUS_FAKE_01: Suspected fake review (no accusation) + offline CTA
- DENT_PHI_HOLD_01: PHI risk → **blocked_manual_review** (no posting)

### 7.2 Med Spa
- SPA_POS_01
- SPA_NEG_MILD_01
- SPA_OUTCOME_SAFE_01 (no results guarantees)
- SPA_SUS_FAKE_01
- SPA_PHI_HOLD_01 (blocked)

### 7.3 HVAC
- HVAC_POS_01
- HVAC_SCHED_ISSUE_01 (late/no-show)
- HVAC_DAMAGE_CLAIM_01 (alleged damage → escalate)
- HVAC_SAFETY_01 (gas/electrical safety allegation → urgent)
- HVAC_SUS_FAKE_01

## 8) Platform Policy Alignment Matrix (Do/Don’t)
### 8.1 Google Business Profile
**Do:** be courteous, address concerns, keep it factual and privacy-safe.  
**Don’t:** ask for or offer incentives for reviews; disclose personal data; post inflammatory content.

### 8.2 Yelp
**Do:** keep responses helpful, don’t speculate about the reviewer identity.  
**Don’t:** suggest Yelp will remove reviews; solicit reviews with incentives; engage in public arguments; disparage competitors.

## 9) Engineering Sign-off (Go/No-Go Exit Criteria)
Launch is **GO** only if all are true:
1) All detectors pass unit tests (PHI/legal/incentive/competitor/liability).
2) `blocked_manual_review` prevents posting in API + UI.
3) Audit log schema + events are emitted for every draft/flag/approve/block/post.
4) Weekly KPI report matches reconciliation rules across at least two test windows.
5) Regression suite (45 core + 6 Yelp addendum) remains 100% pass.

## 10) Customer-Facing Safety & Policy Assurance (Sales/Outreach Snippet)
“Our AI Review Reply & Reputation Autopilot drafts brand-safe responses for Google Business Profile and Yelp, flags high-risk reviews for human handling (e.g., legal threats or privacy-sensitive situations), and keeps an approval + posting audit trail. We do not solicit incentives for reviews, we avoid medical outcome claims, and we route sensitive issues offline. You can review our product overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1. Questions or compliance requirements? Email us at agent_bob_replit+review-bot@agentmail.to.”

---
**Versioning:** v1.3 (supersedes v1.2 runbook + prior checklist/playbook/template indexes)
