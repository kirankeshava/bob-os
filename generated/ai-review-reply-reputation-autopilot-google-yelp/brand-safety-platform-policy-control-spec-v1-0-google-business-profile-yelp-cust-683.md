# Brand Safety & Platform Policy Control Spec v1.0 (Google Business Profile + Yelp) + Customer Review Response Policy + Ops Escalation SOP

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:31:24.776Z

---

# AI Review Reply & Reputation Autopilot — Brand Safety & Platform Policy Control Spec v1.0

## 1) Scope & goal
This spec converts the QA findings into enforceable, testable controls that prevent policy violations and brand-safety failures when drafting and posting review replies on Google Business Profile (GBP) and Yelp.

**Primary risks to control**
- PHI/HIPAA / sensitive personal data disclosure or confirmation (healthcare verticals)
- Medical outcome claims/guarantees (med spa, dentist)
- Liability admission (damage/injury, negligence)
- Incentives / solicitation / review gating (GBP & Yelp)
- Doxxing (names, addresses, appointment details) and harassment/retaliation
- Competitor disparagement/comparisons
- Legal threats: “attorney/lawsuit/sue” → must not post automatically

**Required product behaviors**
- Brand-safe, non-inflammatory tone
- No hallucinated specifics (visit dates, procedures, pricing, identities)
- Negative review escalation triggers correctly
- Clear offline resolution CTA on negative/neutral replies
- Posting/approval audit trail and weekly KPI accuracy


## 2) Enforcement architecture (3 gates)
### Gate A — Pre-generation risk detector (classifier)
Runs on raw review text before LLM drafting.
Outputs:
- `risk_flags[]` (e.g., PHI, LegalThreat, SafetyIncident, DoxxingAttempt, IncentiveMention, Discrimination)
- `escalation_level` (None, Ops, Billing, Safety, PHI, Legal)
- `response_mode` (AutoDraftAllowed | AutoDraftButManualApproval | ManualOnlyHold)

**Hard rule:** if `response_mode=ManualOnlyHold`, the system may draft an *internal* suggested response for staff, but must not allow posting until explicitly unblocked by an authorized human with reason captured.

### Gate B — Post-generation sanitizer (LLM output filter)
Runs on generated draft. Blocks or rewrites disallowed content. If disallowed content cannot be removed safely, flip to `ManualOnlyHold`.

### Gate C — Pre-post gate (final policy gate)
Runs immediately before posting (UI and API). Re-checks:
- latest `response_mode`
- forbidden phrases
- missing required elements (offline CTA)
- platform-specific constraints

If fails → `post_status='blocked_manual_review'` and emit audit log events.


## 3) Detector triggers (minimum) & required behavior
### 3.1 PHI/HIPAA / sensitive healthcare info
**Trigger phrases (non-exhaustive):**
- “chart”, “records”, “visit”, “appointment”, “treatment”, “procedure”, “diagnosis”, “prescription”, “x-ray”, “billing code”, “insurance claim”
- Patient identifiers: full name + condition, date of visit, procedure details

**Required behavior:**
- Must not confirm the reviewer is/was a patient.
- Must not reference any records, charts, visits, or treatment specifics.
- Allowed: generic empathy + invite offline contact.

**Response mode:**
- If review text includes explicit medical details or identifiers → `ManualOnlyHold` with `escalation_level=PHI`.
- If vague healthcare complaint without identifiers → `AutoDraftButManualApproval`.

**Hard-block phrases in drafts:**
- “we reviewed your chart/records/visit/appointment”
- “as your dentist/clinician”
- “we performed [procedure]” unless the business user explicitly provides and verifies it for a non-healthcare vertical (still risky for dentist/med spa)


### 3.2 Medical outcome claims/guarantees (dentist/med spa)
**Triggers:** “guarantee”, “permanent results”, “cure”, “no side effects”, “100%”, “best results”, “FDA-approved” (unless verified and contextualized).

**Required behavior:**
- Never promise outcomes.
- Use safe language: “results vary”, “we aim to provide…”, “we’d like to learn more offline”.

**Response mode:** `AutoDraftButManualApproval` when review mentions outcomes/complications.


### 3.3 Liability admission (HVAC damage, injury, negligence)
**Triggers:** “you broke”, “damage”, “injury”, “hurt”, “fire”, “carbon monoxide”, “leak”, “flood”, “unsafe”, “negligent”, “your tech caused…”.

**Required behavior:**
- Do not admit fault (“we’re sorry we caused…”).
- Do not commit to reimbursement publicly.
- Acknowledge concern, state desire to investigate, move offline.

**Response mode:**
- Safety incident (CO leak, fire, gas smell) → `ManualOnlyHold` with `escalation_level=Safety`.
- Non-safety damage claim → `AutoDraftButManualApproval` with `escalation_level=Ops`.


### 3.4 Legal threats
**Triggers:** “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “court”, “demand letter”, “BBB” (treat as escalation).

**Required behavior:**
- Must not post automatically.
- Must not argue facts publicly.
- Route to Legal/Owner and hold.

**Response mode:** always `ManualOnlyHold` with `escalation_level=Legal`.


### 3.5 Incentives / solicitation / review gating (GBP + Yelp)
**Triggers:** “discount”, “coupon”, “free”, “gift card”, “we’ll refund if you remove”, “contact us for a deal”, “leave a review to get…”, “we’ll make it right if you change your rating”.

**Required behavior:**
- Never request a review in exchange for anything.
- Never ask a reviewer to remove/update their review.
- Allowed: “We’d like to connect to learn more.”

**Response mode:** `AutoDraftButManualApproval` if reviewer mentions discount demands; otherwise allowed but must not include incentive language.


### 3.6 Doxxing / personal data
**Triggers:** phone numbers, addresses, staff last names, appointment times, invoice numbers, license numbers (when tied to a person), screenshots.

**Required behavior:**
- Do not repeat personal data.
- Use generic references (“our team”, “a team member”).

**Response mode:** `AutoDraftButManualApproval` at minimum; `ManualOnlyHold` if the draft risks repeating identifiers.


### 3.7 Harassment, discrimination, hate speech
**Triggers:** slurs, discriminatory accusations, threats.

**Required behavior:**
- Do not mirror language.
- De-escalate, invite offline, and if threats present escalate to Safety/Legal.


## 4) Required response structure rules
### 4.1 Universal rules (all platforms)
- Be polite, calm, short.
- No admissions of liability.
- No mention of internal investigations, records, or “we checked your account” (especially healthcare).
- No competitor attacks.
- No incentives.

### 4.2 Offline CTA requirement
For neutral/negative reviews, replies must include an offline path:
- “Please contact us at [phone/email] so we can look into this.”
- Provide the business support email if configured.

### 4.3 Platform notes
**GBP:** Keep concise; do not offer incentives; do not ask for review changes.
**Yelp:** Same; additionally avoid implying Yelp will remove reviews or that you can influence moderation. Do not publicly debate Yelp policies.


## 5) Audit trail (must log)
### 5.1 Entities & fields
Minimum per review response:
- `review_source` (GBP|Yelp)
- `review_id`
- `business_id` / `location_id`
- `review_text_hash`
- `risk_flags[]`
- `detector_version`
- `escalation_level`
- `response_mode`
- `draft_version` and `prompt_version/model_version`
- `draft_created_timestamp`
- `human_approver_id` (nullable)
- `approval_timestamp` (nullable)
- `post_attempt_timestamp` (nullable)
- `post_status` (approved|posted|blocked_manual_review|failed)
- `error_code` (if failed)
- `blocked_timestamp` + `hold_reason` (if held/blocked)
- `unblocker_id` + `unblocked_timestamp` (if unblocked)
- `final_response_text`

### 5.2 Required events
Emit append-only events:
- `draft_created`
- `flagged`
- `approved`
- `blocked`
- `posted`
- `post_failed`


## 6) Weekly KPI calculations (acceptance)
- Response rate = responded_reviews / total_reviews
- Median and average first-response time
- SLA compliance % (configurable)
- Rating trend (7/30-day)
- Sentiment buckets (at minimum: positive/neutral/negative) based on rating or classifier
- Escalations: count by `escalation_level` and `hold_reason`
- Reconciliation: `approved` vs `posted` vs `blocked_manual_review` must sum to total attempted actions


---

# Customer-Facing “Review Response Policy” (publish internally)
**Purpose:** Keep our public responses professional, safe, and compliant with platform rules.

1) **We never share personal or private information.** Do not mention appointment dates, services received, medical details, invoices, addresses, or names. For healthcare-related reviews, do not confirm someone is a patient.

2) **We don’t argue online.** If a review is negative, we acknowledge the concern and invite the customer to contact us directly so we can help.

3) **No incentives, no review gating.** We will not offer discounts, refunds, gifts, or any benefit in exchange for a review, and we will not ask anyone to remove or change their review.

4) **No admissions of fault.** If a complaint involves damage, injury, or a safety issue, we do not admit liability publicly. We escalate internally and respond only after review.

5) **Legal threats are handled offline.** If a review mentions attorneys or lawsuits, we pause public posting and route it to management.

**Official support contact:** agent_bob_replit+review-bot@agentmail.to
**Business website:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1


---

# Ops Escalation SOP (what to do when the system flags a review)
## Roles & SLAs
- **Owner/GM:** safety incidents & legal threats — acknowledge within 4 hours
- **Ops Manager:** service failures, technician/staff conduct — within 24 hours
- **Billing Lead:** billing disputes/charges — within 24 hours
- **Compliance/Clinic Manager (healthcare):** PHI/HIPAA-related — same business day

## “Do Not Post” conditions (must hold)
- PHI/HIPAA risk (mentions chart/records/visit, identifiable medical details)
- Legal threat (attorney/lawsuit/sue)
- Safety incident (gas smell, fire, CO, injury)
- Harassment/threats that could escalate (route internally first)

## Evidence checklist by scenario
- **Billing dispute:** invoice/receipt, timestamps, notes, refund policy
- **Service quality:** work order, photos, call logs, assigned staff
- **Damage claim:** before/after photos, technician notes, insurance guidance (internal)
- **Healthcare complaint:** do not access/share PHI in public; document internally only
- **Legal threat:** capture screenshot, preserve logs, route to legal/owner; no public debate

## Posting guidance once cleared
- Keep reply under ~4–6 sentences.
- Acknowledge, apologize for experience (not fault), invite offline contact.
- Never mention incentives or ask for review changes.
- Use approved templates only; fill variables without adding identifying details.

## Required logging
Every escalation must result in:
- `risk_flags`, `escalation_level`, `response_mode`
- `hold_reason` if held
- `approver_id` when approved
- `post_status` and timestamps
