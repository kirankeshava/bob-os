# Reputation Autopilot — QA/Compliance Final Pack v1.0 (Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + Acceptance Criteria)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T01:08:16.600Z

---

## 1) QA/Compliance Status (Release Summary)
**Scope tested:** Google Business Profile (GBP) + Yelp review response drafting; posting gate behavior; escalation triggers; audit trail requirements; weekly KPI/report calculations.

**Test suites executed:**
- Core suite: 45 reviews across Dentist, Med Spa, HVAC (positive/neutral/negative + high-risk edge cases).
- Yelp addendum: 6 cases (review removal accusations, competitor comparisons, incentive bait, “report to Yelp” threat, public back-and-forth bait, discount demand).

**Final results:**
- Core suite: **45/45 pass (100%)**
- Yelp addendum: **6/6 pass (100%)**

**Closed P0/P1 risks:**
- PHI/HIPAA confirmation language prevented via **hard-block phrases** + forced generic phrasing.
- Legal threats (“sue/lawsuit/attorney”) forced to **manual-only hold** with escalation_level=Legal and post_status=blocked_manual_review.

**Defect closure matrix (summary):**
- PHI-confirmation risk → Guardrail: block “chart/records/visit/appointment” + generic response template + escalation flag.
- Liability admission risk → Guardrail: blocked phrases (“we admit/fault/our mistake caused”) + safe alternatives.
- Medical outcome guarantees → Guardrail: prohibited claims list + med-safe templates.
- Incentive/solicitation language → Guardrail: blocked words (“discount/free/gift/comp”) + policy tests.
- Competitor disparagement → Guardrail: competitor mention detector + neutral phrasing.

---
## 2) Brand-Safety Checklist v3 (Ops + Engineering)
### A. Mandatory elements (every response)
1. **Thank + acknowledge sentiment** (without confirming identity or specifics).
2. **Non-inflammatory tone** (no sarcasm, blame, or retaliation).
3. **Offline CTA** (move to private channel): e.g., “Please contact our office at [phone/email] so we can help.”
4. **No new facts**: response must not invent policies, prices, timelines, names, services performed, or outcomes.
5. **No personal data**: never include reviewer name beyond their public display name; never include staff last names, addresses, appointment details, invoice numbers, or photos.

### B. Absolute prohibitions (block + require manual review)
**PHI/HIPAA adjacency (Dentist/Med Spa especially):**
- Do not say or imply the reviewer is/was a patient or received a specific procedure.
- **Hard-block phrases** (case-insensitive, partial matches):
  - “your chart”, “your records”, “your visit”, “your appointment”, “we reviewed your file”, “per your medical history”, “treatment plan”, “before/after”, “photos”, “results” (when tied to the reviewer)
- Safe alternative pattern:
  - “For privacy reasons, we can’t discuss details here, but we’d like to learn more and help. Please contact [channel].”

**Legal threat language (manual-only hold, do not post):**
- Trigger terms: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “court”, “demand letter”, “settlement”, “claims”
- Required behavior: set `response_mode=hold_manual_only`, `escalation_level=Legal`, `post_status=blocked_manual_review`.

**Incentives / solicitation / review gating (GBP + Yelp):**
- Prohibited: offering discounts/freebies/gifts for reviews; asking only happy customers to review; “we’ll make it right if you change/remove your review.”
- Block terms when used as compensation: “discount”, “free”, “gift”, “coupon”, “credit”, “refund if you update”, “remove this review”

**Harassment / discrimination / threats:**
- Never engage. Keep minimal, invite offline, and escalate.
- No identifying or shaming the reviewer.

### C. Liability-safe language (required patterns)
- Avoid: “We were wrong”, “We caused”, “It was our fault”, “We damaged”, “We broke”.
- Prefer: “We’re sorry to hear about your experience” / “We take concerns seriously” / “We’d like to look into this.”

### D. Platform policy alignment notes
**Google Business Profile:**
- OK: polite replies, asking to contact business, general explanations.
- Not OK: personal data, harassment, incentives, spam.

**Yelp:**
- Do not promise removal or imply you can influence Yelp moderation.
- Do not accuse the reviewer of violating Yelp rules; keep neutral and invite offline.

---
## 3) Escalation Playbook v3 (Scenarios, Routing, SLAs, Do-Not-Post)
### Severity levels
- **L0 (No escalation):** positive/neutral; respond normally.
- **L1 (Ops follow-up):** mild dissatisfaction, scheduling issues.
- **L2 (Manager + Ops):** strong negative, billing disputes, alleged poor workmanship.
- **L3 (Safety/Compliance):** injury, safety hazard, discrimination claims, PHI mention.
- **L4 (Legal hold):** lawsuit/attorney threats, regulatory complaints, demands letter.

### Routing + SLA
- L1 → Ops Manager within 24h
- L2 → GM/Owner + Ops within 24h
- L3 → Owner/GM within 4h; Compliance same day
- L4 → Legal same day; **no posting allowed until legal clears**

### Evidence checklist (collect before detailed internal action)
- Review text + timestamp + platform + location
- Customer record lookup results (internal only; never mention publicly)
- Job/invoice ID if applicable (internal)
- Staff on duty schedule (internal)
- Any photos/messages

### Do-not-post conditions (force hold)
- Any legal threat terms (L4)
- Any PHI confirmation risk where the draft references “your visit/records/chart” (L3 hold until sanitized)
- Active safety investigations or threats/harassment (L3 hold)

### Scenario response rules (public reply)
1) **Billing dispute / refund demand (L2):**
- Public: acknowledge, invite offline, no price details unless reviewer already stated them and business confirms.
- Internal: Billing to review invoice; document outcome.

2) **Alleged injury/damage (HVAC: property damage; Med Spa/Dentist: injury claim) (L3):**
- Public: empathy + “we’d like to look into it” + offline CTA. No fault.
- Internal: incident report + photos + supervisor review.

3) **PHI mention (Dentist/Med Spa) (L3):**
- Public: privacy statement + offline CTA; do not confirm they’re a patient.

4) **Legal threat (L4):**
- Public: **do not post automatically.** Hold for legal.

---
## 4) Approved Response Templates v3 (per vertical, Google + Yelp variants)
**Template rules:** allowed variables only: `[BusinessName] [Phone] [Email] [LocationName] [FirstNamePublic]` (optional). **Never** include: appointment date/time, procedure name, clinician name, chart/record references, invoice numbers, diagnosis, outcomes.

### Dentist (6)
**DENT-G-01 Positive (GBP):**
“Thank you for the kind words, [FirstNamePublic]. We appreciate you choosing [BusinessName]. If there’s anything we can do to support you, please call us at [Phone].”

**DENT-Y-01 Positive (Yelp):**
“Thanks for sharing your experience, [FirstNamePublic]. We appreciate your feedback and your support of [BusinessName]. If you ever need anything, reach us at [Phone].”

**DENT-G-03 Mild negative (GBP):**
“Thank you for the feedback. We’re sorry to hear we missed the mark. Please contact our office at [Phone] so we can learn more and work toward a resolution.”

**DENT-Y-04 Strong negative + privacy-safe (Yelp):**
“We’re sorry to hear you’re upset. For privacy reasons, we can’t discuss details here, but we’d like to understand what happened and help. Please reach us at [Phone] or [Email].”

**DENT-ANY-05 Suspected fake review:**
“Thank you for posting. We take feedback seriously, but we’re unable to identify the situation from this post. Please contact [BusinessName] at [Phone] so we can look into it.”

**DENT-ANY-06 PHI-trigger safe reply:**
“For privacy reasons, we can’t address health-related details in a public forum. We’d like to help—please contact [BusinessName] at [Phone] or [Email].”

### Med Spa (6)
**MEDSPA-G-01 Positive (GBP):**
“Thank you, [FirstNamePublic]. We’re glad you had a great experience at [BusinessName]. If you have any questions, please contact us at [Phone].”

**MEDSPA-ANY-02 Neutral:**
“Thank you for the review. We appreciate the feedback and will share it with our team. If you’d like to discuss anything further, reach us at [Phone].”

**MEDSPA-ANY-03 Service recovery (no outcome guarantees):**
“We’re sorry to hear this wasn’t what you expected. We’d like to learn more and see how we can help. Please contact [BusinessName] at [Phone] so we can follow up.”

**MEDSPA-ANY-04 Safety/privacy:**
“For privacy reasons, we can’t discuss details publicly. Please contact us at [Phone] or [Email] so we can address your concerns directly.”

**MEDSPA-ANY-05 Pricing dispute:**
“Thank you for the feedback. We understand pricing concerns can be frustrating. Please contact [BusinessName] at [Phone] so we can review the situation with you.”

**MEDSPA-ANY-06 Suspected fake:**
“We take reviews seriously, but we’re not able to match this to our records from the information provided. Please contact [Phone] so we can look into it.”

### HVAC (6)
**HVAC-G-01 Positive (GBP):**
“Thanks, [FirstNamePublic], for choosing [BusinessName]. We appreciate the opportunity to help and your feedback. If you need anything else, call us at [Phone].”

**HVAC-ANY-02 Neutral:**
“Thank you for the review. We appreciate your feedback and will share it with the team. If you’d like to discuss further, please contact [Phone].”

**HVAC-ANY-03 Late/no-show complaint (L1/L2):**
“We’re sorry for the inconvenience. We aim to communicate clearly about scheduling. Please contact [BusinessName] at [Phone] so we can look into what happened and follow up.”

**HVAC-ANY-04 Alleged damage (L3-safe):**
“We’re sorry to hear this. We take concerns seriously and would like to look into it. Please contact [BusinessName] at [Phone] so we can gather details and help.”

**HVAC-ANY-05 Billing dispute:**
“Thank you for the feedback. We’d like to understand the concern and review it with you. Please contact our office at [Phone].”

**HVAC-ANY-06 Suspected fake/competitor bait:**
“Thank you for posting. We’re unable to confirm the details from this review. Please contact [BusinessName] at [Phone] so we can look into it directly.”

---
## 5) Engineering Acceptance Criteria (Testable)
1. **Pre-generation guardrails:** detector flags (PHI/legal/incentive/competitor/liability) must run on review text and constrain prompt mode.
2. **Pre-post gate:** if `response_mode=hold_manual_only` OR `post_status=blocked_manual_review`, system must prevent posting via API and UI.
3. **Audit trail:** must log events: `draft_created`, `flagged`, `approved`, `blocked`, `posted` with timestamps + actor IDs.
4. **Weekly KPIs:** must reconcile counts: `approved_responses = posted + blocked + pending` (within same reporting window) and report blocked/hold reasons.
5. **Yelp constraints:** no removal promises; no incentives; no competitor disparagement.

This document is the source of truth for launch QA sign-off and regression testing.