# Brand Safety & Compliance Pack v3 — Checklist + Escalation Playbook + Approved Templates (Dentist/Med Spa/HVAC) + Guardrails Spec

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:14:22.247Z

---

# Brand Safety & Compliance Pack v3 (Google Business Profile + Yelp)
Business: AI Review Reply & Reputation Autopilot
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

## 1) Brand-Safety & Platform-Policy Checklist v3 (Operational)
Use this checklist for every drafted response (whether auto-posted or queued for approval). Items are written as testable, pass/fail controls.

### A. Universal “Must Have” (Google + Yelp)
1. **Polite, non-inflammatory tone** (no sarcasm, no blame, no arguing line-by-line).
2. **Thank the reviewer** (even for negatives) and acknowledge the experience generically (without confirming details).
3. **Offline resolution CTA required**: invite the reviewer to contact the business directly via phone/email/DM.
4. **No personal data**: do not include phone numbers, emails, addresses unless it’s the business’s official contact and already configured. Never include patient/client identifiers.
5. **No admissions of liability**: avoid language that admits fault or wrongdoing (“we messed up”, “our technician damaged…”, “we gave you the wrong medication”, “we violated…”).
6. **No promises of specific outcomes** (especially medical/health-related). No guarantees.
7. **No incentives/discounts for reviews**: do not offer compensation, refunds, credits, freebies, or discounts in exchange for changing/removing a review.
8. **No review gating**: do not ask only happy customers to leave reviews.
9. **No threats/retaliation**: never mention suing the reviewer, reporting them, banning them, or “we will take action”.
10. **No competitor disparagement**: do not insult or compare competitors.

### B. High-Risk Content Prohibitions (Hard Block / Manual-Only)
These require either (1) forced generic language with no details, or (2) manual-only hold.

#### PHI/PII and privacy (Dentist/Med Spa especially)
- **Hard block** any phrasing that confirms a person’s relationship with the business or specifics of care:
  - Block phrases/patterns: “your visit/appointment”, “your procedure”, “your treatment”, “your chart/records”, “we reviewed your records”, “we checked your file”, “as your provider”.
  - **Required safe alternative**: “We can’t discuss details here, but we’d like to connect privately to understand what happened.”
- Never mention diagnosis, medications, outcomes, test results, before/after, or any clinical detail.

#### Legal threats / litigation
- If review contains: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “court”, “demand letter”, “insurance claim” (injury/property) → **response mode = MANUAL-ONLY HOLD** and **escalation_level = Legal**.
- Allowed response (if posted at all) must be extremely generic, with no details and a request to contact privately.

#### Safety incidents / injury / property damage
- If review alleges injury, unsafe conduct, or property damage → **escalate** (Ops + Owner/GM). Avoid admissions; do not discuss facts publicly.

#### Hate/harassment/doxxing
- If review contains slurs, threats, or publishes staff names/addresses/phone numbers → **manual-only hold**; route to Owner/GM; consider platform report (outside this tool).

### C. Yelp-Specific Notes
Yelp is sensitive to:
- **Do not mention Yelp policy/enforcement** (no “Yelp will remove this”, “we reported you”).
- Avoid public back-and-forth. Keep short, calm, and offline.
- Do not solicit review edits in exchange for anything.

### D. Google Business Profile Notes
- Same prohibitions apply; keep responses factual, polite, and privacy-safe.
- Do not ask for personal info publicly.

### E. Deterministic Post-Generation Gates (Required)
Before a response can be eligible for auto-post:
1. **Blocked phrase scan** (liability admission, PHI confirmation, incentives, competitor disparagement).
2. **Required offline CTA present** (contact us privately).
3. **No staff/customer names** unless explicitly allowed by business policy (default: disallow).
4. **If detector flags Legal** → post_status must become `blocked_manual_review`.
5. **If PHI-risk detected** → force PHI-safe generic template (no specifics).

## 2) Escalation Playbook v3 (Scenarios, SLAs, Evidence, Do-Not-Post)
Escalation levels:
- **L0**: Auto-post allowed (low risk)
- **L1**: Human approval required (moderate risk)
- **L2**: Manual-only hold (high risk)
- **Legal**: Manual-only hold + legal review

### Scenario 1: Mild dissatisfaction (wait time, minor inconvenience)
- Level: L0–L1
- SLA: Ops/Manager within 24h if L1
- Evidence: schedule logs, staffing notes
- Response guidance: apologize generically, invite offline, no defensiveness.

### Scenario 2: Service quality complaint (didn’t fix, poor workmanship)
- Level: L1
- SLA: Ops within 24h
- Evidence: work order, photos, communications
- Do-not-post: any admission of fault; any pricing dispute details.

### Scenario 3: Billing/pricing dispute
- Level: L1
- SLA: Billing within 24h
- Evidence: invoice, authorization, written estimates
- Response guidance: do not argue prices publicly; invite to billing team offline.

### Scenario 4: Alleged damage to property / injury
- Level: L2
- SLA: Owner/GM < 4h; Ops same-day
- Evidence: photos, incident report, timestamps, technician notes
- Do-not-post: admissions (“we damaged”), blame, technical explanations.

### Scenario 5: Safety issue (hazard, unsanitary conditions)
- Level: L2
- SLA: Owner/GM < 4h
- Evidence: safety logs, corrective actions
- Response: acknowledge concern generically, invite offline.

### Scenario 6: Discrimination/harassment allegations
- Level: L2
- SLA: Owner/GM same-day
- Evidence: staff statements, camera logs (if any)
- Do-not-post: arguing; naming staff; dismissing.

### Scenario 7: PHI/medical details mentioned (dentist/med spa)
- Level: L2 unless can be safely generalized with no confirmation
- SLA: Compliance lead/Owner same-day
- Evidence: none in public; handle privately
- Do-not-post: any confirmation of being a patient or details of care.

### Scenario 8: Medical outcome claims / guarantees requested
- Level: L1–L2 depending on content
- SLA: Clinical lead within 24h
- Do-not-post: “guarantee”, “permanent”, “no side effects”, “we’ll fix you”.

### Scenario 9: Suspected fake review / wrong business
- Level: L1
- SLA: Owner/Manager within 24h
- Evidence: customer records search (internal), but do not say publicly you checked
- Response: “We can’t locate details; please contact us privately so we can investigate.”

### Scenario 10: Legal threat (“I’m suing”, “my attorney…”) 
- Level: Legal (manual-only hold)
- SLA: Legal same-day
- Do-not-post: any detail, any admission, any negotiation.

## 3) Approved Response Templates v3 (Versioned, per vertical)
Rules for all templates:
- Allowed variables: {BusinessName}, {SupportEmailOrPhone}, {FirstNameOptional} (default off), {LocationOptional}.
- Never include patient/client appointment details.
- Never include pricing specifics unless user provides and has verified policy (default: do not).

### 3.1 Dentist Templates (Google + Yelp variants)
**DENT-01 Positive (L0)**
- Google: “Thank you for the kind words. We’re glad you had a great experience with {BusinessName}. If there’s ever anything we can do to support you, please reach out to us directly at {SupportEmailOrPhone}.”
- Yelp: “Thanks for the feedback. We appreciate you taking the time to share your experience with {BusinessName}. If you ever need anything, please contact us directly at {SupportEmailOrPhone}.”

**DENT-02 Neutral/short (L0)**
- “Thank you for your feedback. If you’d be open to sharing more details, we’d like to learn and improve—please contact {BusinessName} directly at {SupportEmailOrPhone}.”

**DENT-03 Mild negative (L1)**
- “Thank you for letting us know. We’re sorry to hear your experience didn’t meet expectations. We can’t discuss details publicly, but we’d like to understand what happened and help—please contact us at {SupportEmailOrPhone}.”

**DENT-04 Strong negative / upset tone (L1)**
- “We’re sorry you felt disappointed. Our goal is respectful, high-quality care. We can’t address specifics here, but we want to look into this promptly—please reach out to {BusinessName} at {SupportEmailOrPhone}.”

**DENT-05 PHI-risk (L2 safe generic, no confirmation)**
- “We take privacy seriously and can’t discuss anything related to an individual’s situation in a public forum. If you’d like us to review your concerns, please contact {BusinessName} directly at {SupportEmailOrPhone}.”

**DENT-06 Suspected fake/wrong office (L1)**
- “Thank you for posting. We’re having trouble matching this to our records based on what’s written here. If you believe this involves {BusinessName}, please contact us directly at {SupportEmailOrPhone} so we can investigate.”

### 3.2 Med Spa Templates (Google + Yelp variants)
**MEDSPA-01 Positive (L0)**
- “Thank you for the wonderful feedback. We’re glad you had a great experience at {BusinessName}. If we can help with anything in the future, please contact us directly at {SupportEmailOrPhone}.”

**MEDSPA-02 Neutral (L0)**
- “Thanks for your review. We appreciate the feedback and would love to learn more—please reach out to {BusinessName} at {SupportEmailOrPhone}.”

**MEDSPA-03 Mild negative (L1)**
- “We’re sorry to hear this. We can’t discuss details publicly, but we’d like the chance to understand and address your concerns. Please contact {BusinessName} directly at {SupportEmailOrPhone}.”

**MEDSPA-04 Outcome/expectation complaint (L1)**
- “Thank you for sharing your concerns. Results and expectations can vary, and we want to make sure we understand what happened. We can’t discuss details here, but please contact us at {SupportEmailOrPhone} so we can help.”

**MEDSPA-05 Privacy/PHI safe response (L2)**
- “We take privacy seriously and can’t comment publicly on any individual’s services. If you’d like to speak with us, please contact {BusinessName} at {SupportEmailOrPhone}.”

**MEDSPA-06 Suspected fake/wrong business (L1)**
- “Thanks for posting. We’re unable to identify this situation from the information provided. Please contact {BusinessName} at {SupportEmailOrPhone} so we can look into it.”

### 3.3 HVAC Templates (Google + Yelp variants)
**HVAC-01 Positive (L0)**
- “Thank you for the review. We appreciate you choosing {BusinessName}. If you ever need help again, contact us at {SupportEmailOrPhone}.”

**HVAC-02 Neutral (L0)**
- “Thanks for your feedback. If you’re willing to share more detail so we can improve, please contact {BusinessName} at {SupportEmailOrPhone}.”

**HVAC-03 Mild negative (L1)**
- “We’re sorry to hear this didn’t meet expectations. We’d like to understand what happened and make it right. Please reach out to {BusinessName} at {SupportEmailOrPhone} so we can help.”

**HVAC-04 Strong negative / workmanship complaint (L1)**
- “Thank you for raising this. We take service concerns seriously and want to review what occurred. Please contact us directly at {SupportEmailOrPhone} so we can investigate and work toward a resolution.”

**HVAC-05 Alleged damage/safety concern (L2 generic)**
- “We’re concerned to read this and want to look into it promptly. We can’t resolve this publicly, but please contact {BusinessName} at {SupportEmailOrPhone} so a manager can follow up.”

**HVAC-06 Suspected fake/wrong company (L1)**
- “Thank you for the feedback. We’re not able to match this to our jobs from what’s written here. Please contact {BusinessName} at {SupportEmailOrPhone} so we can verify details and assist.”

## 4) Hallucination-Control & Guardrails Spec v1 (Implementation Notes)
### A. Prompt constraints (required)
- Never fabricate details (dates, procedures, staff names, pricing, policies).
- Never claim to have checked internal records (“we reviewed your chart/invoice/work order”).
- If user has not provided a fact, response must remain generic.

### B. Detectors and expected actions
1. **PHI confirmation detector** (terms: “chart”, “records”, “visit”, “appointment”, “treatment”, “procedure”, “patient”, etc.).
   - Action: swap to PHI-safe generic template; remove any confirming language.
2. **Legal threat detector** (“attorney”, “lawsuit”, “sue”, “court”, “legal action”).
   - Action: set `response_mode=hold_manual_only`, `escalation_level=Legal`, `post_status=blocked_manual_review`.
3. **Incentives detector** (“discount”, “gift card”, “free”, “refund if you update”, “comp”).
   - Action: remove incentive language; if originates from business-side instruction, block and require manual approval.
4. **Liability admission detector** (“our fault”, “we damaged”, “we caused”).
   - Action: rewrite to non-admission, generic concern + offline CTA; if severe (injury/damage) escalate to L2.
5. **Competitor disparagement detector** (“unlike X”, “they’re scammers”).
   - Action: remove competitor references; keep neutral.

### C. Required audit events (for compliance traceability)
- `draft_created`, `risk_flagged`, `template_applied`, `approved`, `blocked_manual_review`, `posted`, `post_failed`.
- Each must include: timestamps, actor (system/user), detector_version, prompt/model version, and response text hash.

---
This Pack v3 is intended to be used as (1) a regression standard, (2) engineering acceptance criteria, and (3) an operator playbook. It aligns with Google Business Profile and Yelp expectations by avoiding incentives/review gating, preventing privacy violations, keeping responses non-defamatory, and routing legal/PHI/safety issues to manual-only handling.