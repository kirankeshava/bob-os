# AI Review Reply & Reputation Autopilot — Brand Safety Guardrails v1.1 (Template Validation Notes + Approval Gates + Weekly QA SOP)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:50:13.185Z

---

# AI Review Reply & Reputation Autopilot — Brand Safety Guardrails v1.1

**Product:** AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)

**Customer-facing proof URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

**Support / escalation email:** agent_bob_replit+review-bot@agentmail.to

## 1) Objective (Minimum Viable Safety for First Customers)
We must prevent replies that:
- Admit fault or liability, create legal exposure, or inflame conflict
- Contain HIPAA/medical specifics or any protected health information (PHI)
- Offer incentives for reviews (violates Google/Yelp policies)
- Include personal data (doxxing, addresses, phone numbers, order IDs, names beyond first name)
- Make unverifiable claims, defame, accuse, or identify alleged criminals

This v1.1 spec focuses on **hard gates** (approval/escalation) + **safe response structures** that can ship immediately.

## 2) Mandatory Response Structure (All Replies)
Every drafted reply must follow this order:
1. **Thank/acknowledge** (neutral, no admissions)
2. **Brief empathy** (especially for negatives; avoid agreeing to specific allegations)
3. **Commitment to resolution** (offline)
4. **Offline contact channel** (phone/email/DM). Use: **agent_bob_replit+review-bot@agentmail.to** until client email is configured.
5. **Close** (business name/team signature)

Hard rules:
- No discussion of refunds, disciplinary actions, termination, medical outcomes, legal theories, or internal policy details.
- No identifying the reviewer as a customer/patient/client.

## 3) Template Library Validation — Findings & Required Edits
A spot-check was run across the 50 templates against red-team categories (fraud/theft, discrimination, HIPAA, extortion, legal threats, PII). **Most templates pass**, but these common edits are required:

### A. Remove implied admissions of fault
**Risk phrases found/likely in negatives:**
- “We’re sorry we messed up” / “We failed you” / “This was our mistake”

**Replace with safer alternates:**
- “We’re sorry to hear about your experience.”
- “We take feedback seriously and want to understand what happened.”

### B. Remove any incentive language
**Blocked:**
- “Discount,” “coupon,” “free,” “gift card,” “on us,” “we’ll comp” (when tied to reviews)

**Replace with:**
- “Please contact us so we can look into this and make it right.”

### C. HIPAA / medical specifics (medical/dental templates)
**Risk:** confirming they are a patient, describing procedures, outcomes, diagnoses.

**Allowed:**
- Generic: “We can’t discuss details here, but we’d like to connect privately.”

**Required template adjustment (medical/dental negatives):**
- Always include: “For privacy reasons, we can’t address specifics here.”

### D. Defamation / accusations (fraud/theft/discrimination)
**Rule:** never call the reviewer a liar or claim the review is fake; avoid naming staff.

**Safe framing:**
- “We’d like to review this. Please contact us directly so we can investigate.”

### E. PII protection
**Remove placeholders that invite PII** like “share your order number here.”

**Replace with:**
- “Please email us with details so we can locate the record.”

## 4) Approval Gate + Confidence Scoring (Implementation Spec)
### A. Sentiment-based gating (hard rule)
- **Negative (1–2 stars or negative sentiment):** `requires_human_approval = true` (default for early customers)
- **Neutral (3 stars / mixed):** approval optional; autopost allowed only if confidence high and no triggers
- **Positive (4–5 stars):** autopost allowed if confidence high and no triggers

### B. Escalation triggers (force “needs human rewrite”)
Set `needs_human_rewrite=true` and `escalate=true` if any detected:
- Legal threats (“lawsuit”, “attorney”, “police”, “sue”) or demand letters
- Discrimination/hate speech allegations
- Fraud/theft/scam allegations
- Medical outcomes, injury, medication, diagnosis, or anything suggesting PHI/HIPAA
- Violence/self-harm threats
- Doxxing/PII in the review text
- Extortion (“remove this review unless…”, “pay me or…”) or incentive discussions

### C. Confidence scoring (0–100)
A draft gets a `confidence_score` computed from:
- Policy compliance checks passed (PII/HIPAA/incentives/admissions) (+40)
- Tone match (professional, calm, not defensive) (+20)
- Mandatory structure present (+20)
- Specificity safe (no unverified claims) (+20)

**Thresholds:**
- `>=85`: eligible for autopost (only if not negative and no triggers)
- `70–84`: `needs_human_rewrite=true`
- `<70`: refuse to draft; escalate

## 5) Weekly QA Sampling SOP (Ops)
**Goal:** catch drift, ensure compliance, and create a defensible record.

### A. What to review each week
1. **100% of escalations** (any `escalate=true`)
2. **100% of negative reviews** (1–2 star or negative sentiment) until client opts out in writing
3. **10% random sample** of autoposted replies (min 10 replies if volume allows)

### B. QA checklist (pass/fail)
Fail if any:
- Mentions incentives, discounts, or compensation tied to reviews
- Admits fault/liability (“we caused”, “our negligence”, “we overcharged you”)
- Contains PHI/medical specifics or confirms patient relationship
- Contains PII (email/phone/address/order ID/full name) in public reply
- Argues with reviewer, insults, sarcasm, or threats
- Makes unverifiable claims (“we’ve never had that happen”)

### C. Remediation workflow
- If already posted and unsafe: **notify client immediately** via agent_bob_replit+review-bot@agentmail.to and recommend edit/removal.
- Update blocked phrases list + retrain prompt constraints.
- Log incident in audit log with `incident=true` and root cause.

## 6) Audit Log Requirements (MVP)
Log every event in the lifecycle:
- `review_ingested`
- `draft_generated`
- `policy_check_passed/failed`
- `human_approved/rejected`
- `posted`
- `edited`
- `escalated`

Minimum fields:
- `event_id`, `timestamp_utc`, `client_id`, `platform` (google|yelp)
- `review_id`, `review_rating`, `review_text_hash`
- `draft_text`, `final_text`
- `confidence_score`, `needs_human_rewrite`, `requires_human_approval`, `escalate`
- `policy_flags[]` (e.g., HIPAA_RISK, INCENTIVE_RISK)
- `model_name`, `prompt_version`, `template_id`
- `actor` (system|human), `approver_name`

Retention: 12 months minimum.

## 7) Red-Team Suite (How to Use)
Run adversarial cases before enabling autopost for any new client:
- Feed each red-team review into the drafting pipeline.
- Expected outcome must be one of:
  - safe draft + approval gate triggered (for negative)
  - refusal + escalate (for legal/HIPAA/violence/PII)

Document pass/fail with reasons and update prompt or templates accordingly.

## 8) Customer-facing Safety Promise (blurb)
“We use brand-safe reply templates and strict policies to avoid incentives, private data, or sensitive medical details. Negative reviews are escalated for human approval by default. For questions, email agent_bob_replit+review-bot@agentmail.to. Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”
