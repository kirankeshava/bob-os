# QA/Compliance Launch Pack v1.3 — Evidence Checklist + High-Risk Micro-Templates + Executive QA Summary

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:34:32.710Z

---

# AI Review Reply & Reputation Autopilot (Google/Yelp)
## QA/Compliance Launch Pack v1.3
**Website (legitimacy link):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1  
**Contact:** agent_bob_replit+review-bot@agentmail.to

---
## 1) Evidence Checklist (required for Go/No-Go sign-off)
This checklist defines exactly what artifacts QA/Ops must capture during the Runbook v1.2 execution and how each maps to acceptance criteria.

### A. Posting/Blocking Gates — Proof Required
1. **Manual-only hold prevents posting (API path)**
   - Evidence: API request/response logs showing `post_status='blocked_manual_review'` (or equivalent) when `escalation_level=Legal` OR PHI hard-block triggers.
   - Evidence: no outbound request sent to Google/Yelp posting endpoint (or an explicit “blocked before post” event).

2. **Manual-only hold prevents posting (UI path)**
   - Evidence: screenshot/video of UI attempting to post a held draft; system shows “Blocked—Manual Review” with hold_reason.
   - Evidence: audit log event `blocked` with timestamp.

3. **Approved flow posts successfully**
   - Evidence: 1–2 successful posts per platform with `post_status='posted'`, including `posted_timestamp`.
   - Evidence: platform-visible response screenshot (Google Business Profile/Yelp business account view).

4. **No auto-post without explicit approval**
   - Evidence: attempt to generate draft without approval; confirm post does not occur.
   - Evidence: audit event sequence `draft_created` → (optional `flagged`) → (must have) `approved` before `posted`.

### B. Audit Trail Completeness — Proof Required
Export log rows for at least 10 reviews (mix of positive/negative + at least 2 holds) containing:
- `review_source` (Google/Yelp)
- `review_id`
- `business_id` / `location_id`
- `review_text_hash`
- `detected_risk_flags` (array)
- `escalation_level` (None/ Ops/ Billing/ Safety/ Legal)
- `response_mode` (draft-only / auto-post / blocked_manual_review)
- `draft_version`
- `human_approver_id`
- `approval_timestamp`
- `posted_timestamp` (nullable)
- `post_status` + `error_code` (nullable)
- `final_response_text`
- `model_version` / `prompt_version`
- Holds/blocks: `hold_reason`, `detector_version`, `blocked_timestamp`, `unblocker_id` (nullable)

Acceptance criteria: **0 missing required fields** in exported rows; timestamps must be monotonically plausible (created ≤ approved ≤ posted; blocked has no posted_timestamp).

### C. Weekly KPI Report Reconciliation — Proof Required
Export the weekly report output (CSV/PDF/dashboard screenshot) and attach the underlying counts from logs for the same date range.
Required reconciliations:
- `responses_approved = responses_posted + responses_blocked + responses_pending`
- Response rate denominator matches platform review ingestion count for the range.
- Median/avg first-response time computed from `review_created_timestamp` to `posted_timestamp` (exclude blocked/pending unless spec says otherwise).
- Escalations counts by level match log query on `escalation_level`.

### D. Policy/Brand Safety Assertions — Proof Required
Provide 6–10 generated responses (not posted) demonstrating:
- **PHI safety:** no confirmation of patient/client relationship; no mention of “your visit/records/chart.”
- **No liability admission:** no “we caused/damaged/our fault,” no promises of compensation.
- **No incentives:** no discounts/credits for reviews; no review gating.
- **No competitor disparagement:** no accusations or negative statements about competitors.
- **Offline CTA present** in negative scenarios.

---
## 2) High-Risk Micro-Templates (Approved, cross-vertical)
These are “micro-templates” intended to override free-form generation when risk flags trigger. They are deliberately generic to avoid PHI/liability/policy violations.

**Global rules for all micro-templates**
- Do not use reviewer’s name.
- Do not mention appointment details, dates, procedure names, “your visit,” “your records,” “your chart,” or confirm they are a customer/patient.
- Do not admit fault or promise refunds/compensation publicly.
- Include offline CTA: phone/email or “please contact our office/team directly.”
- Never mention incentives, discounts, or anything “in exchange for” reviews.
- Never claim the platform will remove a review.

### MT-01: PHI/HIPAA Mention (Dentist/Med Spa)
**Use when:** reviewer mentions diagnosis/treatment/results OR requests staff discuss their care OR any PHI risk flag.
**Response:**
“Thank you for the feedback. For privacy reasons, we can’t discuss details in a public forum. We take concerns seriously and would like to help directly—please contact our office so we can look into this and work toward a resolution.”

### MT-02: Legal Threat / Attorney / Lawsuit
**Use when:** “attorney/lawyer/lawsuit/sue/court/legal action” detected.
**System behavior:** `response_mode='blocked_manual_review'`, `escalation_level='Legal'`, **DO NOT POST**.
**Draft (internal only):**
“We’re sorry to hear this. We take concerns seriously and want to address them appropriately. Please contact our management team directly so we can route this to the right person.”

### MT-03: Discrimination / Harassment Allegation
**Use when:** allegations of racism/sexism/discrimination, harassment, hate speech.
**Response:**
“Thank you for raising this. We take these concerns extremely seriously and want to understand what happened. Please contact our management team directly so we can look into this promptly and follow up.”

### MT-04: Injury / Safety Incident / Property Damage Claim (HVAC + general)
**Use when:** “injury,” “unsafe,” “gas leak,” “fire,” “damage,” “broke,” “ruined,” “flood,” etc.
**Response:**
“Thank you for letting us know. We take safety and service concerns seriously and want to review this promptly. Please contact our team directly so we can gather the details and work toward a resolution.”

### MT-05: Refund / Billing Dispute Demand
**Use when:** refund demand, chargeback threats, “overcharged,” “scam,” billing issues.
**Response:**
“Thank you for the feedback. We’d like to review the account details and make sure this is handled appropriately. Please contact our billing team directly so we can look into this and help.”

### MT-06: Competitor Accusation / “You’re worse than X” / Comparison Bait
**Use when:** competitor comparisons or bait to disparage others.
**Response:**
“Thank you for sharing your perspective. We’re always working to improve and would like to learn more about what we could have done better. Please contact our team directly so we can discuss and address your concerns.”

### MT-07: Suspected Fake Review / Not a Customer
**Use when:** “never used you,” wrong business, suspicious claims.
**Response:**
“Thank you for the review. We can’t locate a record that matches this description. Please contact our team directly with any details you’re comfortable sharing so we can investigate and address this appropriately.”

### MT-08: Yelp Threat (“I’m reporting you to Yelp”) / Review Removal Accusation
**Use when:** “Yelp will take this down,” “you removed my review,” “I’ll report you.”
**Response:**
“Thank you for the feedback. We’d like to understand what happened and address your concerns directly. Please contact our team so we can look into this and help.”

### MT-09: Public Back-and-Forth Bait / Profanity
**Use when:** reviewer is inflammatory, insulting, or invites argument.
**Response:**
“Thank you for sharing your feedback. We’d like to help, but it’s best handled directly. Please contact our team so we can understand the issue and work toward a resolution.”

---
## 3) Executive QA Summary (paste-ready for PRD / launch note)
### Scope
- End-to-end QA of MVP draft generation + escalation + posting/approval gating + reporting definitions.
- Tested across 3 verticals: Dentist, Med Spa, HVAC.
- Platform alignment: Google Business Profile and Yelp response policy constraints.

### Test Suites Executed
- **Core suite:** 45 sample reviews (15 per vertical), including edge cases: PHI/HIPAA risk, medical outcome claims, pricing disputes, discrimination allegations, doxxing attempts, competitor accusations, refund demands, suspected fake reviews, property damage claims, safety incidents, and legal threats.
- **Yelp addendum:** 6 additional Yelp-specific edge cases (review removal accusations, solicitation/incentive bait, competitor comparisons, threats to report to Yelp).

### Final Results
- Core suite: **45/45 pass (100%)** after guardrails.
- Yelp addendum: **6/6 pass (100%)**.
- All previously identified **P0/P1 defects closed** via:
  1) PHI confirmation hard-block (forbids “your visit/records/chart” acknowledgements; forces generic privacy wording)
  2) Legal-threat detector → **manual-only hold** (`post_status='blocked_manual_review'`, `escalation_level='Legal'`) with DO NOT POST

### Brand Safety & Hallucination Controls (implemented as acceptance criteria)
- No admission of liability.
- No confirmation of patient/client relationship; no appointment/procedure specifics.
- No medical outcome guarantees.
- No incentives/discounts in exchange for reviews; no review gating.
- No competitor disparagement.
- Negative scenarios require offline CTA.

### Audit Trail & Reporting Requirements
- Mandatory log schema for traceability (review hashes, flags, escalation, approvals, posting status, model/prompt versions).
- Weekly KPI reconciliation rules: approved vs posted vs blocked vs pending; response time calculations; escalations counts.

### Remaining Operational Dependency (non-financial)
- Select test environment to execute Runbook v1.2 and capture evidence exports:
  - Preferred: sandbox/test environment for Google Business Profile and Yelp.
  - If none: limited live test on a single low-risk internal location (3–5 responses max) using the evidence checklist above.

### Go/No-Go Exit Criteria (summary)
- Manual-only holds prevent posting via API and UI.
- Audit logs complete with required fields/events.
- Weekly KPI report reconciles exactly to logs.
- High-risk micro-templates trigger correctly and remain policy-safe.
