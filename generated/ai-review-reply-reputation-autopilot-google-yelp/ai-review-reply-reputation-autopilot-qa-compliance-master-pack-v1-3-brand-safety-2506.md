# AI Review Reply & Reputation Autopilot — QA & Compliance Master Pack v1.3 (Brand Safety, Policy Alignment, Escalation, Templates, Verification)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:27:12.819Z

---

# AI Review Reply & Reputation Autopilot — QA & Compliance Master Pack v1.3

Business legitimacy URL (share with customers/partners): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Support/ops email: agent_bob_replit+review-bot@agentmail.to

## 1) Scope & QA Result Summary
**Product:** AI drafts (and optionally posts) brand-safe responses to Google Business Profile (GBP) and Yelp reviews; escalates negative/high-risk reviews; produces weekly reputation KPIs.

**Test coverage:**
- Core suite: 45 reviews (15 dentist, 15 med spa, 15 HVAC) including edge cases: PHI/HIPAA, medical claims/outcomes, pricing/billing disputes, alleged harm/damage, legal threats, discrimination/harassment language, staff naming/doxxing attempts, competitor accusations, refund demands, and suspected fake reviews.
- Yelp addendum: +6 Yelp-specific edge cases (removal accusations, competitor comparisons, incentive baiting, “report to Yelp” threats, discount demands, baiting for public argument).

**Final pass rates (with guardrails enabled):**
- Core suite: **45/45 pass (100%)**
- Yelp addendum: **6/6 pass (100%)**

**Key safety gates added:**
1) **PHI/visit-confirmation hard block**: if review contains “chart/records/visit/appointment details” or attempts to confirm treatment, response must switch to generic phrasing; never confirm they were a patient.
2) **Legal-threat manual-only hold**: if “attorney/lawsuit/sue/legal action” present, system must set `response_mode=hold_manual_only`, `escalation_level=Legal`, and `post_status=blocked_manual_review`.

## 2) Platform Policy Alignment Matrix (Testable Rules)
### 2.1 Universal (GBP + Yelp)
**Must NOT:**
- Offer incentives/discounts/freebies in exchange for reviews or changes (“We’ll refund if you update/remove”).
- Admit liability (“It was our fault”, “We caused damage”) or make definitive factual concessions about disputed events.
- Disclose or confirm personal data (names, addresses, phone, appointment dates, treatment details). No doxxing.
- Engage in harassment, retaliation, threats, or inflammatory/argumentative tone.
- Make medical outcome guarantees (“permanent”, “guaranteed results”, “cured”) or diagnose.

**Must DO (for negatives):**
- Use calm, empathetic tone.
- Move resolution offline with a clear CTA (phone/email). Use support email above if needed.
- If high-risk (PHI/legal/safety), block posting and escalate.

### 2.2 Google Business Profile (GBP) response do/don’t
**Don’t:**
- Promise review removal or imply platform enforcement outcomes.
- Accuse reviewers of fraud or attack competitors.

**Do:**
- Keep responses short, helpful, and oriented to resolution.

### 2.3 Yelp response do/don’t
**Don’t:**
- Mention Yelp will remove a review, or argue about Yelp moderation/enforcement.
- Encourage “review gating” (asking only happy customers to review) or imply incentives.

**Do:**
- Invite offline contact without implying compensation.
- Avoid lengthy back-and-forth; one measured response then disengage.

## 3) Brand-Safety Checklist (Operational)
**Before generating/approving any response, confirm:**
1) No PHI confirmation: avoid “your visit”, “your procedure”, “your chart/records”, “we reviewed your file.”
2) No liability admission: avoid “we messed up”, “we caused”, “our fault.” Use neutral: “We’re sorry to hear about your experience.”
3) No medical guarantees/diagnosis: avoid outcomes or medical certainty.
4) No incentives/discounts: avoid “refund if you change review”, “discount next time.”
5) No personal data: no staff last names, no patient/customer identifiers, no appointment times.
6) No competitor disparagement.
7) Required negative CTA: invite direct contact (phone/email) and offer to investigate.
8) Tone: calm, respectful; never argumentative.
9) If legal threat/safety incident/PHI: **DO NOT POST**; escalate.

## 4) Escalation Playbook v2 (Common Negative Scenarios)
### Escalation Levels
- **L0 (Auto-reply OK):** mild complaints, general dissatisfaction without specific allegations.
- **L1 (Ops follow-up):** service quality issues, scheduling, delays, basic billing confusion.
- **L2 (Manager/Owner urgent):** alleged damage to property, safety concerns, discrimination claims, threats/harassment.
- **Legal (Manual-only hold):** explicit legal threats, “attorney/lawsuit/sue”, demand letters.
- **PHI (Manual-only hold):** any review that includes/requests confirmation of treatment/medical details.

### Routing SLAs
- Safety incidents/discrimination threats: **Owner/GM < 4h**
- Service failures (HVAC no-show, poor work): **Ops < 24h**
- Billing disputes/refunds: **Billing < 24h**
- Legal threats: **Legal same-day** (manual-only hold)
- PHI: **Compliance/Owner same-day** (manual-only hold)

### DO NOT POST conditions
- Mentions of legal action/attorney.
- PHI confirmation risk.
- Active police/safety investigation.
- Any response that would require stating facts not verified.

## 5) Audit Trail & Posting/Approval Requirements
**Required log fields:**
- `review_source` (GBP|Yelp)
- `review_id`
- `business_id` / `location_id`
- `review_text_hash`
- `detected_risk_flags[]` (e.g., PHI, LEGAL_THREAT, INCENTIVE, COMPETITOR, DOXXING)
- `escalation_level` (L0/L1/L2/Legal/PHI)
- `response_mode` (auto_draft | requires_approval | hold_manual_only)
- `draft_version` + `model_version` + `prompt_version`
- `human_approver_id` + `approval_timestamp` (if approved)
- `post_status` (drafted|approved|posted|blocked_manual_review|error)
- `posted_timestamp` + `error_code` (if any)
- `final_response_text`
- Holds: `hold_reason`, `detector_version`, `blocked_timestamp`, `unblocker_id` (if unblocked)

**Required audit events:** `draft_created`, `flagged`, `approved`, `blocked`, `posted`, `post_failed`.

## 6) Weekly KPI Report Accuracy (Definitions)
- Response rate = responded_reviews / total_reviews
- Median first-response time (minutes/hours)
- SLA compliance % (responses within SLA window)
- Rating trend (7/30 days) and delta
- Sentiment buckets (pos/neutral/neg via deterministic rules + model tag with override capability)
- Escalations count by level and by reason
- Unresolved escalation aging (days open)
- Reconciliation: `approved_count = posted + blocked + pending` (must balance)

## 7) Approved Response Template Library v3 (Per Vertical)
**Global variable rules (ALL templates):**
Allowed: `{business_name}`, `{first_name_if_public_only}`, `{contact_phone}`, `{contact_email}`.
Disallowed: appointment dates, treatment details, pricing unless explicitly stated by reviewer and verified, staff last names, any PHI.

### 7.1 Dentist Templates (GBP/Yelp)
**DENT-01 Positive**
“Thank you for the kind words. We’re glad you had a great experience with our team. If you ever have questions or need anything, please reach out anytime.”

**DENT-02 Neutral/Short**
“Thanks for sharing your feedback. We appreciate you taking the time, and we’ll use it to keep improving.”

**DENT-03 Mild Negative (offline CTA)**
“We’re sorry to hear you felt disappointed. We’d like to learn more and see how we can help—please contact us at {contact_phone} or {contact_email} so we can follow up directly.”

**DENT-04 Strong Negative (no PHI, no admission)**
“Thank you for the feedback. We take concerns seriously and want to look into what happened. To protect privacy and understand the details, please contact {contact_phone} or {contact_email}. We’re committed to addressing this appropriately.”

**DENT-05 PHI-risk Safe Generic (forced if PHI flags)**
“Thanks for reaching out. We can’t discuss anything related to individual situations in a public forum. If you’d like, please contact {contact_phone} or {contact_email} so we can assist you directly.”

**DENT-06 Suspected Fake / Not a Patient (non-accusatory)**
“We take all feedback seriously. At the moment we can’t match this to our records based on the information here. Please contact {contact_email} so we can look into it and address any concerns.”

### 7.2 Med Spa Templates (GBP/Yelp)
**MS-01 Positive**
“Thank you for the review. We’re happy you enjoyed your experience and appreciate your support.”

**MS-02 Neutral**
“Thanks for taking the time to share feedback. We’re always working to improve and appreciate your input.”

**MS-03 Mild Negative (service experience)**
“We’re sorry to hear this didn’t meet expectations. We’d like to make it right—please contact {contact_phone} or {contact_email} so we can follow up.”

**MS-04 Strong Negative (no outcomes, no guarantees)**
“Thank you for bringing this to our attention. We’d like to understand your concerns and help resolve them. Please reach out at {contact_phone} or {contact_email} so we can discuss directly.”

**MS-05 Medical/outcome claim deflection (no clinical debate)**
“We’re sorry you’re feeling frustrated. We can’t discuss individual circumstances publicly, but we’d like to help. Please contact {contact_email} so we can follow up directly.”

**MS-06 Suspected Fake (non-inflammatory)**
“We take feedback seriously. We’re unable to confirm details publicly, and we’d like to look into this. Please contact {contact_email} with any relevant information so we can assist.”

### 7.3 HVAC Templates (GBP/Yelp)
**HVAC-01 Positive**
“Thanks for the great review. We appreciate your business and are glad our team could help.”

**HVAC-02 Neutral**
“Thank you for the feedback. We appreciate you taking the time and will share this with our team.”

**HVAC-03 Mild Negative (scheduling/communication)**
“We’re sorry for the inconvenience. We’d like to learn more and make this right—please contact {contact_phone} or {contact_email} so we can follow up.”

**HVAC-04 Strong Negative (alleged damage; no admission)**
“We take concerns like this seriously and want to look into it. Please contact {contact_phone} or {contact_email} so we can review the details and address this directly.”

**HVAC-05 Pricing dispute (no arguing numbers publicly)**
“Thanks for the feedback. We understand pricing questions can be frustrating. Please contact {contact_email} so we can review your concerns and clarify the details directly.”

**HVAC-06 Suspected Fake (no accusation)**
“We take all feedback seriously. We’re unable to locate this based on the information here. Please contact {contact_email} so we can look into it and assist.”

## 8) Detector / Unit-Test Specification (Minimum)
**Flags and expected outcomes:**
- `PHI_RISK`: keywords like “my records/chart”, “my appointment”, “my visit”, treatment specifics, patient ID. Outcome: force template DENT-05/MS-05; set `response_mode=hold_manual_only` if the draft would otherwise confirm.
- `LEGAL_THREAT`: “attorney”, “lawsuit”, “sue”, “legal action”, “served papers”. Outcome: `post_status=blocked_manual_review`, `escalation_level=Legal`, no auto-post.
- `INCENTIVE_LANGUAGE`: “discount”, “free”, “refund if you change review”, “gift card”. Outcome: remove incentive text; if user requested incentive, set `response_mode=requires_approval`.
- `COMPETITOR_DISPARAGEMENT`: competitor mentions + insults. Outcome: neutralize; never echo allegations.
- `DOXXING`: phone/address/staff personal identifiers. Outcome: redact; set `response_mode=requires_approval`.

## 9) Ops Escalation Ticket Form (Copy/Paste)
**Subject:** Review Escalation — {source} — {location} — {flag(s)} — {date}

**Review link/ID:** {review_id or URL}
**Source:** GBP / Yelp
**Star rating:** {1-5}
**Reviewer handle:** {public name}
**Review text (verbatim):**
{paste}

**Detected flags:** PHI / LEGAL_THREAT / SAFETY / BILLING / DISCRIMINATION / DAMAGE / FAKE_SUSPECTED
**Escalation level:** L1 / L2 / Legal / PHI
**Do-not-post?** Yes/No (if Yes, reason)

**Evidence to collect (checklist):**
- Work order / invoice ID (if applicable)
- Call logs / scheduling notes
- Technician/clinician notes (internal only; do NOT paste PHI into public tools)
- Photos (HVAC damage claims)
- Prior communication threads

**Owner:** {name}
**SLA:** {<4h / <24h / same-day}
**Proposed public response (if allowed):**
{draft}

## 10) Go/No-Go Launch Gate Rubric (Objective Exit Criteria)
**GO only if all are true:**
1) Posting gate: `blocked_manual_review` cannot be posted via UI or API.
2) Audit logs emit required fields + events for drafted/flagged/blocked/posted.
3) KPI reconciliation balances within tolerance: approved = posted + blocked + pending.
4) Detector unit tests pass for PHI + legal threats + incentives + doxxing.
5) Templates v3 are the only public-facing defaults; no freeform generation without safety filters.

---
If you need to reach ops for coordination or to report an issue: agent_bob_replit+review-bot@agentmail.to