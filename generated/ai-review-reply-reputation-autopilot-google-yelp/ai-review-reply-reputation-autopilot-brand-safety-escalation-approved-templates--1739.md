# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Approved Templates Pack v3.0

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:53:59.373Z

---

# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Approved Templates Pack v3.0

**Scope:** Google Business Profile + Yelp review responses for **Dentist, Med Spa, HVAC**. This pack is the operational “source of truth” for: (1) brand safety constraints, (2) escalation rules, (3) approved templates, and (4) LLM guardrails to prevent hallucination/policy issues.

---
## 1) Brand-Safety Checklist v3 (QA tick-box)
Use this checklist before approving any response (and as automated gates where possible).

### A. Absolute prohibitions (FAIL if present)
- ☐ **PHI/PII confirmation**: confirms a person is/was a patient/client or references charts/records/visit details (e.g., “your appointment,” “your chart,” “we reviewed your records,” procedure names tied to identity).
- ☐ **Medical outcome guarantees** (Dentist/Med Spa): “guaranteed,” “permanent,” “cure,” “no risk,” “results guaranteed,” before/after promises.
- ☐ **Liability admission**: “we were at fault,” “our technician caused,” “we damaged,” “we made a mistake” (use neutral language; escalate internally).
- ☐ **Incentives / solicitation**: discounts, gifts, refunds-for-review, “contact us for a special offer,” or any review gating.
- ☐ **Threats/retaliation**: hostile tone, shaming, “we will report you,” “we’ll sue,” “we’ll expose.”
- ☐ **Doxxing / staff identification**: full names, private contact details, addresses, or identifying employee schedules.
- ☐ **Competitor disparagement**: insulting competitors, implying competitor is lying/fraudulent.

### B. Required elements (FAIL if missing on negative/neutral)
- ☐ **Polite, non-inflammatory** tone; no sarcasm; no arguing point-by-point.
- ☐ **Offline CTA**: invite to contact via phone/email (provided by the business), not via public thread.
- ☐ **Non-admission framing**: “We’re sorry to hear…” / “We’d like to learn more” rather than accepting blame.
- ☐ **No new facts** invented. If details are unknown, response stays generic.

### C. Platform-specific constraints
**Google Business Profile (GBP):**
- ☐ Avoid “we can remove this review” or implying platform enforcement.
- ☐ Do not disclose private customer data.

**Yelp:**
- ☐ No mention of Yelp policy enforcement or promises of removal.
- ☐ No solicitation/incentive language.
- ☐ Avoid prolonged back-and-forth; one calm response + offline CTA.

### D. Auto-hold / manual-only conditions (DO NOT POST)
- ☐ Legal threat words: “lawsuit,” “attorney,” “sue,” “legal action,” “served papers.”
- ☐ Safety incident: injury, fire, gas leak, assault, harassment, discrimination allegations.
- ☐ PHI/clinical specifics: any review text includes procedure + dates + identity hints; response must not confirm.

---
## 2) LLM Safety & Hallucination Control Ruleset (implementation-ready)
These are deterministic rules to apply **pre-generation**, **post-generation**, and **pre-post**.

### A. Response mode overrides (highest priority)
1. If review contains legal-threat detector hit → `response_mode = MANUAL_ONLY_HOLD`, `escalation_level = LEGAL`, `post_status = blocked_manual_review`.
2. If review contains PHI/clinical identifiers or “records/chart/visit/appointment” → force **generic** healthcare-safe response template and block any confirmation phrasing.
3. If review alleges injury/property damage/safety hazard → `response_mode = ESCALATE_HIGH`, allow only neutral holding statement + offline CTA, no fault.

### B. Blocked phrases (reject draft if present; regenerate with safe alternative)
- PHI confirmation: “your appointment,” “your visit,” “your chart,” “your records,” “as your dentist,” “we treated you,” “we saw you,” “we reviewed your file.”
- Liability admission: “we caused,” “we damaged,” “our fault,” “we were negligent,” “we messed up.”
- Incentives: “discount,” “coupon,” “free,” “gift card,” “refund if,” “in exchange for,” “leave us a review and.”
- Retaliation: “we will report,” “we will sue,” “defamation,” “take this down or.”
- Competitor attacks: “they are lying,” “scam,” “fraud” (about competitors or reviewers).

### C. Forced-safe substitutions (examples)
- Replace “we reviewed your records” → “We take feedback seriously and would like to learn more.”
- Replace “we’re at fault” → “We’re sorry to hear this and want to look into it.”

### D. No-new-facts constraint (hallucination control)
- Allowed: acknowledging emotion, inviting offline contact, stating general process (“we aim to be on time”).
- Disallowed unless verified/user-provided: specific dates, staff names, pricing, diagnosis, treatment details, warranty terms.

---
## 3) Escalation Playbook v3 (triage + routing)
**Goal:** protect brand, avoid policy violations, resolve offline.

### Escalation levels
- **L0 (Auto-respond OK):** positive/neutral; mild dissatisfaction without safety/legal/PHI.
- **L1 (Ops follow-up):** strong negative service complaint, repeated issues, refund request (no legal threat).
- **L2 (High risk):** alleged damage/injury/safety issue, discrimination/harassment claim.
- **LEGAL (Manual-only hold):** explicit legal threats/attorney/lawsuit.

### Routing SLAs
- **LEGAL:** same business day to owner/manager + counsel contact (if any). Public response: hold/manual-only.
- **L2:** owner/GM < 4 hours. Collect evidence immediately.
- **L1:** billing/ops < 24 hours.
- **L0:** within 1–2 business days.

### Evidence checklist (internal)
- Review screenshot + URL + timestamp
- Job/appointment lookup (internal only)
- Any photos, invoices, call logs
- Staff statements (internal)

### Do-not-post conditions
- Any draft that confirms customer relationship in healthcare contexts.
- Any draft that admits fault or discusses compensation publicly.
- Any legal-threat case (always manual-only hold).

### Public response patterns by scenario (high-level)
- **Billing dispute:** empathize + invite offline + no pricing details.
- **Service quality:** apologize for experience (not fault) + offer offline resolution.
- **Alleged damage/injury:** concern + commitment to investigate + offline immediate contact; no blame.
- **Discrimination/harassment:** take seriously + offline escalation + no debate.
- **Suspected fake review:** polite + request offline details + no accusation.

---
## 4) Approved Response Templates v3 (per vertical)
**Template rules:**
- Variables allowed: `{BusinessName}`, `{SupportEmail}`, `{SupportPhone}`, `{RepFirstName}`.
- Banned variables: reviewer name, staff full names, appointment dates, procedure names, prices (unless verified and approved), address details.
- Always keep to 2–5 sentences; end with offline CTA.

### 4.1 Dentist (GBP + Yelp)
**D-DEN-01 Positive**
“Thank you for taking the time to share this. We’re glad you had a good experience with {BusinessName}. If there’s ever anything we can do to help, please reach us at {SupportPhone} or {SupportEmail}.”

**D-DEN-02 Neutral/short**
“Thanks for your feedback. We’re always working to improve the experience at {BusinessName}. If you’re open to sharing details, please contact us at {SupportPhone} or {SupportEmail}.”

**D-DEN-03 Mild negative (no PHI confirmation)**
“We’re sorry to hear this didn’t meet expectations. We’d like to learn more and see how we can help—please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

**D-DEN-04 Strong negative (no liability, no PHI)**
“We’re concerned to hear this and would like to look into what happened. Please reach out to {BusinessName} at {SupportPhone} or {SupportEmail} so we can address this directly.”

**D-DEN-05 Suspected fake / can’t locate**
“Thank you for the note. We take feedback seriously, but we’re not able to identify the situation from what’s shared here. Please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can understand and assist.”

**D-DEN-06 PHI-sensitive (forced generic; use when review mentions treatment specifics)**
“Thank you for your feedback. For privacy reasons, we can’t discuss details here, but we’d like to learn more and help. Please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

**D-DEN-HOLD-LEGAL Manual-only hold (do not post automatically)**
“Thank you for raising this. We take concerns seriously and would like to address them directly. Please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

### 4.2 Med Spa (GBP + Yelp)
**D-MSPA-01 Positive**
“Thank you for the kind words. We’re happy you enjoyed your experience at {BusinessName}. If you need anything, reach us at {SupportPhone} or {SupportEmail}.”

**D-MSPA-02 Neutral**
“Thanks for sharing your feedback. We’re always working to improve at {BusinessName}. If you’re willing, please contact us at {SupportPhone} or {SupportEmail} with details.”

**D-MSPA-03 Mild negative**
“We’re sorry to hear this. We’d like to learn more and help resolve it—please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

**D-MSPA-04 Strong negative (no outcome claims)**
“We’re concerned to hear this and want to look into it. Please reach out to {BusinessName} at {SupportPhone} or {SupportEmail} so we can address this directly.”

**D-MSPA-05 Suspected fake**
“Thank you for the feedback. We can’t confirm details here, but we’d like to understand what happened. Please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

**D-MSPA-06 Privacy-safe (if review mentions treatments/results)**
“Thanks for your message. For privacy reasons, we can’t discuss specifics in a public forum. Please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can help.”

**D-MSPA-HOLD-LEGAL Manual-only hold**
“Thank you for your message. We’d like to address this directly—please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

### 4.3 HVAC (GBP + Yelp)
**D-HVAC-01 Positive**
“Thank you for the review. We’re glad you had a great experience with {BusinessName}. If you need anything in the future, please reach us at {SupportPhone} or {SupportEmail}.”

**D-HVAC-02 Neutral**
“Thanks for your feedback. We’re always working to improve. If you can share more details, please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

**D-HVAC-03 Mild negative (lateness/communication)**
“We’re sorry to hear this. We’d like to understand what happened and make it right—please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

**D-HVAC-04 Strong negative (alleged poor work; no liability)**
“We’re concerned to hear this and want to look into it. Please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can review the situation and help.”

**D-HVAC-05 Alleged damage/safety issue (L2 escalate; neutral holding)**
“Thank you for bringing this to our attention. We take safety concerns seriously and want to look into this right away. Please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can address it directly.”

**D-HVAC-06 Suspected fake**
“Thank you for the feedback. We’d like to understand more, but we can’t identify the situation from what’s shared here. Please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

**D-HVAC-HOLD-LEGAL Manual-only hold**
“Thank you for your message. Please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can address this directly.”

---
## 5) Audit trail requirements (minimum)
Every draft/decision/post must be logged for compliance.
- `review_source` (Google|Yelp)
- `review_id`
- `review_text_hash`
- `detected_risk_flags[]` (phi, legal, safety, incentive, competitor, harassment, etc.)
- `response_mode` (auto|escalate|manual_only_hold)
- `escalation_level` (L0|L1|L2|LEGAL)
- `template_id` (if template used)
- `draft_text`, `final_text`
- `human_approver_id`, `approval_timestamp`
- `post_status` (posted|failed|blocked_manual_review)
- `posted_timestamp` (if posted)
- `hold_reason`, `blocked_timestamp`, `unblocker_id` (if held)
- `model_version`, `prompt_version`, `detector_version`

---
## 6) Customer-facing compliance note (optional to include in onboarding)
“We never post incentives, never discuss private customer details, and we route legal/safety/privacy-sensitive reviews to manual review before anything is posted. Public replies are designed to be calm, brand-safe, and to move resolution offline.”

Website for legitimacy (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support contact: agent_bob_replit+review-bot@agentmail.to
