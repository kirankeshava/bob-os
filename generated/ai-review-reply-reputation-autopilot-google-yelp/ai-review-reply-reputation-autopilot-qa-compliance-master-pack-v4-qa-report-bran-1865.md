# AI Review Reply & Reputation Autopilot — QA/Compliance Master Pack v4 (QA Report + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + Customer-Facing Safety Overview)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:31:28.996Z

---

# AI Review Reply & Reputation Autopilot — QA/Compliance Master Pack v4
Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

## 1) QA Test Report v4 (Summary)
**Scope:** End-to-end draft generation + escalation classification + posting/approval gating expectations across 3 verticals (Dentist, Med Spa, HVAC) and 2 platforms (Google Business Profile, Yelp).

**Test suites executed:**
- Core suite: 45 reviews (15/vertical) including high-risk edge cases (PHI/HIPAA bait, medical outcome claims, billing disputes, discrimination/harassment, doxxing/staff named, competitor accusations, refund demands, suspected fake reviews).
- Yelp addendum: 6 edge cases (review removal accusations, competitor comparisons, incentive/discount bait, threats to “report to Yelp,” solicitation language, public back-and-forth baiting).

**Final results (with guardrails enabled):**
- Core suite: **45/45 pass (100%)**
- Yelp addendum: **6/6 pass (100%)**

**Pass criteria (must meet all):**
1. **Brand-safe tone:** calm, appreciative, non-argumentative; no shaming; no retaliation; no threats.
2. **No liability admission:** avoids “we caused,” “our fault,” “we were negligent,” or confirming wrongdoing.
3. **No PHI/HIPAA confirmation:** never confirms the reviewer is/was a patient, never references records/visit details, never cites treatment specifics.
4. **No prohibited content:** no medical guarantees/outcome claims; no incentives or discounts for reviews; no doxxing; no competitor disparagement; no defamatory allegations.
5. **Negative review handling:** always offers offline resolution CTA; escalates appropriately; legal-threat content triggers manual-only hold.
6. **Platform alignment:** no promises of review removal; no “Yelp will take it down;” no review gating language.
7. **Audit trail:** draft, flags, approvals, holds, and post status are fully logged for reconciliation.
8. **Weekly report accuracy:** KPIs reconcile approved vs posted vs blocked; response times computed correctly.

**Top historical failure modes (now mitigated):**
- PHI-adjacent acknowledgements (“we reviewed your chart/visit”)
- Legal threat handling without hold
- Medical outcome/guarantee phrasing (med spa/dentist)
- Incentive-adjacent phrasing (“we’ll make it right with a discount”)

**Hard guardrails (required):**
- **PHI hard-block phrases** (examples): “chart,” “records,” “your visit,” “your appointment details,” “treatment plan,” “we saw you on,” “our notes show.”
  - **Expected behavior:** force generic phrasing; remove any acknowledgement of patient relationship; keep offline CTA.
- **Legal-threat detector** (examples): “lawyer,” “attorney,” “lawsuit,” “sue,” “legal action,” “court,” “demand letter.”
  - **Expected behavior:** set `response_mode=manual_only_hold`, `escalation_level=Legal`, `post_status=blocked_manual_review`.

## 2) Posting/Approval & Audit-Trail Acceptance Criteria
**Required log fields (minimum):**
- `review_source` (google|yelp)
- `review_id`
- `business_id` / `location_id`
- `review_text_hash`
- `detected_risk_flags[]` (e.g., PHI, MedicalClaim, LegalThreat, Incentive, Doxxing, Harassment)
- `escalation_level` (None|Ops|Billing|Safety|Legal|PR)
- `response_mode` (auto_draft|auto_post|manual_only_hold)
- `draft_version` + `template_id` (if template used)
- `human_approver_id` + `approval_timestamp` (if approved)
- `post_status` (posted|scheduled|failed|blocked_manual_review)
- `post_error_code` (nullable)
- `posted_timestamp` (nullable)
- `final_response_text`
- `model_version` + `prompt_version` + `detector_version`
- Hold-specific: `hold_reason`, `blocked_timestamp`, `unblocker_id` (nullable)

**Required audit events:** `draft_created`, `flagged`, `held_blocked`, `approved`, `posted`, `post_failed`, `unblocked`.

**Non-bypassable gate:** If `response_mode=manual_only_hold`, posting must be prevented in **both UI and API** paths.

## 3) Weekly KPI Report — Definitions (Must Match Logs)
- **Response rate %:** responded_reviews / total_reviews (by platform + location + period)
- **First response time:** `posted_timestamp - review_created_timestamp` (or `approved_timestamp` for approval SLA)
- **SLA compliance %:** % responses posted within target window (e.g., 24h)
- **Rating trend:** rolling average (7-day, 30-day)
- **Sentiment buckets:** positive/neutral/negative (rule-based or model; must be consistent and auditable)
- **Escalations:** count by `escalation_level` and by `risk_flag`
- **Blocked/held:** count of `post_status=blocked_manual_review` with aging (days held)
- **Reconciliation:** `approved_count = posted + blocked + failed + pending` (no silent drops)

## 4) Brand-Safety Checklist v3 (Operator Tick-Box)
Use this before approving any response.

### A. Always required
- [ ] Thanks reviewer (even if critical) without sarcasm.
- [ ] Uses neutral, professional tone; no arguing.
- [ ] Includes **offline CTA** (call/email) for anything non-trivially positive.
- [ ] Does **not** request incentives or offer discounts tied to reviews.

### B. Never do (hard fail)
- [ ] Admit fault/liability: “we messed up,” “our negligence,” “we caused damage,” “it’s our fault.”
- [ ] Confirm PHI/patient relationship or details: “your visit,” “your chart,” “we reviewed your records,” “we performed your procedure.”
- [ ] Medical guarantees/outcomes: “permanent,” “guaranteed,” “no side effects,” “100%,” “will cure.”
- [ ] Doxxing: staff full names (unless business policy allows), addresses, phone numbers of individuals, appointment times.
- [ ] Competitor disparagement: “they’re scammers,” “they do illegal work.”
- [ ] Promises of review removal or platform enforcement: “Yelp will remove this,” “Google will take it down.”

### C. Mandatory escalation triggers
- [ ] **Legal threat terms present** → manual-only hold + Legal escalation.
- [ ] Alleged injury/safety incident → Safety escalation; keep response generic and offline.
- [ ] PHI bait or detailed medical claims → manual-only hold if cannot respond generically.
- [ ] Harassment/hate speech → PR/Safety escalation; keep response short and non-engaging.

### D. Safe alternatives (copy blocks)
- Replace PHI confirmation with: “We can’t discuss details here, but we’d like to learn more and address your concerns.”
- Replace liability admission with: “We’re sorry to hear this didn’t meet expectations. We’d like to look into it and help.”
- Replace outcome promises with: “Results can vary. We’re happy to discuss options privately.”

## 5) Escalation Playbook v3 (Common Scenarios)
**Decision tree:**
1) Any “lawyer/sue/legal action” → **DO NOT POST** (manual-only hold) → Legal same-day.
2) Any safety/injury allegation (burn, infection, property damage, gas leak, electrical hazard) → respond minimally + offline CTA → Safety/Owner <4h.
3) Billing dispute/refund demand → Billing <24h; never argue line items publicly.
4) Suspected fake/competitor → Ops/Owner <24h; respond neutrally; invite offline; do not accuse.
5) PHI/medical detail bait → respond generically; never confirm relationship; if cannot, hold.

**Internal SLAs:**
- Safety incidents: Owner/GM <4h
- Legal threats: Legal same-day
- Service failures: Ops <24h
- Billing: Billing <24h
- Suspected fake: Owner/Ops <24h

**Evidence checklist:** screenshots, timestamps, job/appointment internal record (internal only), staff statements, any photos, call logs. Never paste evidence into public response.

## 6) Approved Response Templates v3 (Per Vertical)
Rules for variables: Allowed: {business_name}, {first_name_if_provided_by_reviewer_only}, {contact_channel}, {general_location}. Disallowed: appointment dates/times, treatment details, pricing unless reviewer stated and business verified, any PHI.

### 6.1 Dentist Templates (Google/Yelp-safe)
**DENT-POS-01 (Positive)**
“Thank you for your kind words. We’re glad you had a great experience with {business_name}. We appreciate you taking the time to share this.”

**DENT-NEU-01 (Neutral/short)**
“Thanks for the feedback. We’re always working to improve and appreciate you sharing your experience with {business_name}.”

**DENT-NEG-01 (Mild negative: wait time/communication)**
“Thank you for the feedback. We’re sorry to hear this didn’t meet expectations. We can’t discuss details here, but we’d like to understand what happened and help—please contact us at {contact_channel}.”

**DENT-NEG-02 (Strong negative: pain/bedside manner allegation)**
“We’re sorry to hear you’re feeling this way. We can’t address specifics in a public forum, but we take concerns seriously and would like to review this directly. Please reach out at {contact_channel} so we can help.”

**DENT-FAKE-01 (Suspected fake/never a patient)**
“Thank you for posting. We can’t find enough information here to identify the situation, and we’d like to look into it. Please contact {business_name} at {contact_channel} so we can understand and address your concerns.”

**DENT-ESC-LEGAL-01 (Legal threat present — manual-only hold)**
“(DO NOT AUTO-POST) Hold for manual review: Legal threat language detected. Route to Legal. If posting is later approved, use a minimal, non-admitting response with offline contact only.”

### 6.2 Med Spa Templates
**SPA-POS-01**
“Thank you for the review. We’re so glad you enjoyed your experience at {business_name}. We appreciate you taking the time to share your feedback.”

**SPA-NEG-01 (Expectation mismatch)**
“Thank you for the feedback. We’re sorry this wasn’t what you expected. We can’t discuss details here, but we’d like to learn more and make it right—please contact us at {contact_channel}.”

**SPA-MED-CLAIM-01 (Reviewer claims medical outcome/complication)**
“Thank you for sharing your concern. We can’t address specifics publicly, and results can vary from person to person. Please contact us at {contact_channel} so we can understand what happened and discuss next steps.”

**SPA-STAFF-01 (Rude staff allegation)**
“We’re sorry to hear about your experience. This isn’t the standard we aim for. Please reach out at {contact_channel} so our team can follow up and address this directly.”

**SPA-FAKE-01**
“Thanks for posting. We’d like to look into this, but we can’t identify the situation from the details provided. Please contact us at {contact_channel}.”

**SPA-ESC-LEGAL-01 (Hold)**
“(DO NOT AUTO-POST) Manual-only hold. Route to Legal same-day.”

### 6.3 HVAC Templates
**HVAC-POS-01**
“Thank you for the review. We’re glad our team could help, and we appreciate you choosing {business_name}.”

**HVAC-NEG-01 (Scheduling/late arrival)**
“Thanks for the feedback. We’re sorry for the inconvenience. We’d like to understand what happened and improve—please contact us at {contact_channel} so we can follow up.”

**HVAC-NEG-02 (Pricing dispute)**
“Thank you for sharing this. We can’t discuss billing details publicly, but we want to review your concerns and help resolve them. Please contact us at {contact_channel}.”

**HVAC-DAMAGE-01 (Alleged property damage)**
“We’re sorry to hear about this concern. We take these reports seriously and would like to look into it promptly. Please contact us at {contact_channel} so we can gather details and follow up.”

**HVAC-SAFETY-01 (Gas leak/electrical hazard allegation)**
“Thank you for bringing this to our attention. Safety is our top priority. Please contact us at {contact_channel} right away so we can escalate this internally and follow up.”

**HVAC-ESC-LEGAL-01 (Hold)**
“(DO NOT AUTO-POST) Manual-only hold. Route to Legal same-day.”

## 7) Customer-Facing Compliance & Safety Overview (One-Pager)
AI Review Reply & Reputation Autopilot is designed to help local businesses respond to reviews quickly while staying brand-safe and platform-compliant.

**What it does:** drafts professional responses, flags risky reviews for escalation, and provides weekly KPI reporting (response rate, response time, ratings trend, and escalation counts).

**Safety by design:**
- We avoid confirming any private customer relationship or personal details in public replies.
- We do not admit liability, argue with reviewers, or post inflammatory language.
- We do not solicit incentivized reviews or recommend review gating.
- Reviews containing legal threats or highly sensitive content can be automatically placed into “manual-only hold” so nothing posts without human approval.

**Platforms:** responses are written to align with Google Business Profile and Yelp guidance (no incentives, no removal promises, no competitor disparagement).

Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/contact: agent_bob_replit+review-bot@agentmail.to
