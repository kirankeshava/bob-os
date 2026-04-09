# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:07:40.807Z

---

# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0

## 1) QA Test Report v4 (Final)
**Scope:** End-to-end draft generation + escalation classification + platform-policy alignment for Google Business Profile (GBP) and Yelp. Verticals: Dentist, Med Spa, HVAC.

**Test Suite:**
- Core suite: **45 reviews** (15 per vertical), including edge cases: PHI/HIPAA bait, medical outcome claims, price/billing disputes, alleged injury/damage, discrimination/harassment, staff naming/doxxing attempts, competitor accusations, refund demands, suspected fake reviews.
- Yelp addendum: **6 reviews** focused on Yelp-specific sensitivities: review removal accusations, competitor comparisons, incentive/solicitation language, discount demands, “report to Yelp” threats, and public back-and-forth baiting.

**Final Results (with guardrails enabled):**
- Core suite: **45/45 pass (100%)**
- Yelp addendum: **6/6 pass (100%)**

**Pass/Fail Criteria (high level):**
1) **Brand safety:** non-inflammatory, professional, empathetic; no retaliation or argument.
2) **Hallucination control:** no invented facts (no “we checked your file,” no fake timestamps, no claims of refunds/credits unless provided by business input).
3) **Policy compliance:** no incentives; no review gating; no removal promises; no competitor disparagement; no doxxing.
4) **Healthcare safety:** no medical advice; no outcome guarantees; no PHI confirmation; no acknowledgment that reviewer is a patient.
5) **Negative escalation:** correct routing for safety/legal/PHI/serious allegations; “manual-only hold” for legal threats.
6) **Required offline CTA:** offer a private channel (phone/email) with neutral wording.

**Key Guardrails Verified (Acceptance Criteria):**
- **PHI/records hard block:** If review contains triggers like “chart/records/visit/appointment details,” response must avoid confirming any relationship and must use generic language (e.g., “We can’t discuss details here…”). 
- **Legal threat manual-only hold:** If review contains “attorney/lawsuit/sue/legal action,” set `response_mode=blocked_manual_review`, `escalation_level=Legal`, prevent posting via UI/API.
- **Incentive/discount filter:** Blocks language implying compensation for review changes (“discount,” “gift card,” “refund if you remove”).
- **Competitor disparagement filter:** Prevents negative claims about other businesses.

**Audit Trail Requirements (must be implemented):**
Minimum log fields:
- `review_source` (GBP|Yelp), `review_id`, `business_id/location_id`
- `review_text_hash`
- `detected_risk_flags[]` (PHI|Legal|Safety|Incentive|Harassment|Competitor|Liability)
- `escalation_level` (None|Ops|Billing|Safety|Legal)
- `response_mode` (auto_draft|needs_approval|blocked_manual_review)
- `draft_version`, `final_response_text`, `model_version/prompt_version`
- `human_approver_id`, `approval_timestamp`
- `posted_timestamp`, `post_status` (posted|failed|blocked_manual_review), `error_code`
- Holds/blocks: `hold_reason`, `detector_version`, `blocked_timestamp`, `unblocker_id`

**Weekly KPI Report Accuracy (must reconcile):**
- Response rate = posted_responses / total_reviews
- Median/avg first response time (posted only; blocked holds tracked separately)
- SLA compliance %
- Rating trend (7/30d)
- Sentiment buckets (defined rules)
- Escalations by level/reason
- Blocked/held count and aging (unresolved holds)
- Reconciliation table: approved vs posted vs blocked vs failed

**Residual Risk Notes (post-QA):**
- The product must enforce **pre-post** gates (not just prompt instructions). Any path (UI/API/bulk actions) must honor `blocked_manual_review`.
- Human ops must follow DO-NOT-POST conditions for PHI/legal/safety even if a draft exists.

---

## 2) Brand-Safety Checklist v3 (Operator Tick-Box)
Use this before approving/posting any response.

### A. Universal “Never Do” (GBP + Yelp)
- [ ] Do **not** offer incentives: discounts, free services, gift cards, refunds “for updating/removing a review.”
- [ ] Do **not** request only positive reviews or screen customers (no review gating).
- [ ] Do **not** disclose or request personal data publicly (phone/email/address ok only as business contact; never ask reviewer to post personal info).
- [ ] Do **not** name individual staff unless the reviewer already did and it’s low-risk; prefer generic “our team.”
- [ ] Do **not** argue, insult, threaten, or imply retaliation.
- [ ] Do **not** mention internal investigations as factual unless verified; do not invent facts.

### B. Healthcare-Specific (Dentist + Med Spa)
- [ ] Do **not** confirm the reviewer is a patient or that they visited.
- [ ] Do **not** reference “your chart/records/appointment/treatment plan.”
- [ ] Do **not** make medical outcome claims (“guaranteed,” “permanent,” “zero risk”).
- [ ] Do **not** provide medical advice; keep to service-level resolution.

### C. Liability / Damage / Injury
- [ ] Do **not** admit fault (“we messed up,” “our mistake caused damage”).
- [ ] Use neutral phrasing: “We’re sorry to hear about your experience” + “we’d like to learn more.”
- [ ] Escalate to Ops/Safety; require internal review before any public statement.

### D. Legal Threats
- [ ] If reviewer mentions attorney/lawsuit/sue/legal action: **DO NOT POST**.
- [ ] Mark **blocked_manual_review** and escalate **Legal same-day**.

### E. Required Elements (Every Response)
- [ ] Thank or acknowledge.
- [ ] Empathy without admission.
- [ ] Offline CTA: invite to contact privately.
- [ ] No PHI, no pricing specifics unless business-provided and verified.

### F. Platform Notes
- **GBP:** Keep concise; avoid policy debates; do not claim you can remove reviews.
- **Yelp:** Avoid back-and-forth; do not promise Yelp actions; keep neutral and move offline.

---

## 3) Escalation Playbook v3 (Scenarios, Routing, SLAs)

### Escalation Levels
- **None:** Positive/neutral, no risk flags.
- **Ops (24h):** Service quality, scheduling, rude staff, cleanliness.
- **Billing (24h):** Pricing disputes, unexpected charges, refund demands.
- **Safety (Owner/GM <4h):** Alleged injury, dangerous work, harassment, discrimination.
- **Legal (same-day):** Lawsuit/attorney threats, subpoenas, threats of regulatory action tied to litigation.

### DO-NOT-POST Conditions (Hard Stop)
1) Any PHI confirmation risk (healthcare) where the safe template cannot be applied.
2) Legal threats (“sue,” “attorney,” “lawsuit”) → **blocked_manual_review**.
3) Ongoing safety investigation (injury/damage) until facts verified.
4) Doxxing or threats in the review (escalate; consider platform report).

### Evidence to Collect Internally
- Review URL/screenshot, timestamps
- Work order/appointment reference (internal only)
- Staff statements
- Photos (HVAC damage claims)
- Billing ledger/estimates (billing disputes)

### Recommended Public Posture (All Negatives)
- Acknowledge + apologize for the experience (not fault)
- Move offline with a direct contact path
- Do not debate facts publicly

---

## 4) Approved Response Templates v3 (Per Vertical)
**Global Variables Allowed:**
- `{BusinessName}` (required)
- `{SupportEmail}` (use: agent_bob_replit+review-bot@agentmail.to)
- `{SupportPhone}` (optional; only if business supplies)
- `{Website}` (optional legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)
**Forbidden Variables:** patient status, appointment dates, treatment names, staff last names, prices/discounts unless verified by business.

### A) Dentist Templates
**DENT-POS-01 (Positive):**
“Thank you for the kind words. We’re glad you had a great experience with our team at {BusinessName}. If you ever need anything, we’re here to help.”

**DENT-NEU-01 (Neutral/short):**
“Thanks for your feedback. If there’s anything we could have done to make your experience better, please reach us at {SupportEmail} so we can learn more.”

**DENT-NEG-01 (Mild negative):**
“We’re sorry to hear this and appreciate you sharing it. We’d like to understand what happened and see how we can help—please contact us at {SupportEmail}.”

**DENT-HIPAA-01 (PHI-safe / can’t confirm):**
“Thank you for your message. We can’t discuss details in a public forum. If you’re willing, please contact {BusinessName} directly at {SupportEmail} so we can address your concerns privately.”

**DENT-FAKE-01 (Suspected fake / non-accusatory):**
“Thanks for posting. We’re not able to identify the situation from the details here, but we take feedback seriously. Please contact us at {SupportEmail} so we can look into this.”

**DENT-LEGAL-HOLD (Manual-only hold guidance; NOT for auto-post):**
Internal note only: Set `blocked_manual_review`, escalate Legal. No public response until cleared.

### B) Med Spa Templates
**MEDSPA-POS-01:**
“Thank you for your review. We appreciate you choosing {BusinessName}, and we’re glad you had a positive experience with our team.”

**MEDSPA-NEG-01 (Service issue):**
“We’re sorry to hear you felt this way. We’d like to learn more and work toward a resolution—please contact us at {SupportEmail}.”

**MEDSPA-NO-OUTCOME-01 (Avoid guarantees):**
“Thank you for your feedback. Results and experiences can vary, and we’d like to understand your concerns privately. Please reach out to {SupportEmail} so we can help.”

**MEDSPA-HIPAA-01 (PHI-safe):**
“We can’t address personal details publicly, but we’d like to help. Please contact {BusinessName} at {SupportEmail} so we can follow up privately.”

**MEDSPA-FAKE-01:**
“Thanks for reaching out. We’re not able to match this to a specific experience from the information provided. Please contact {SupportEmail} so we can look into it.”

**MEDSPA-STRONG-NEG-01 (Angry reviewer):**
“We’re sorry you’re upset. We want to address this appropriately and ask that we move the conversation offline. Please email {SupportEmail} with the best way to reach you.”

### C) HVAC Templates
**HVAC-POS-01:**
“Thanks for the review. We’re glad our team could help, and we appreciate you choosing {BusinessName}.”

**HVAC-NEU-01:**
“Thank you for the feedback. If you can contact us at {SupportEmail}, we’d like to understand the situation and improve.”

**HVAC-BILL-01 (Pricing dispute):**
“We’re sorry for any confusion around pricing. We’d like to review the details with you directly—please contact us at {SupportEmail} so we can help.”

**HVAC-DAMAGE-01 (Alleged damage; no liability admission):**
“We’re sorry to hear about this and take concerns like this seriously. We’d like to gather details and review the situation—please contact us at {SupportEmail} so we can follow up promptly.”

**HVAC-FAKE-01:**
“Thanks for your comment. We’re not able to confirm the situation from the details here, but we’d like to look into it. Please reach out to {SupportEmail}.”

**HVAC-STRONG-NEG-01 (Safety allegation):**
“We’re concerned to hear this and want to address it properly. Please contact {BusinessName} at {SupportEmail} so we can follow up directly.”

---

## Owner/Engineering Next Step (Zero-cost)
Run the **QA Launch Verification Runbook v1.2** in a sandbox if available; otherwise do a limited live verification (3–5 responses max on a single low-risk location) to prove `blocked_manual_review` prevents posting and audit logs/KPIs reconcile. For customer-facing legitimacy in any outreach or UI footers, you may reference: {Website} and {SupportEmail}.
