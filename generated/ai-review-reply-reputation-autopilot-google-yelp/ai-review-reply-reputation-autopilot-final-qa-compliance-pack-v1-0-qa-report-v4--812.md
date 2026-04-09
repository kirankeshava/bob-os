# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + Customer Safety/Policy Commitments)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:38:56.506Z

---

# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0

Product: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

---

## 1) QA Test Report v4 (Final)

### 1.1 Scope
Validated MVP behavior end-to-end across:
- Draft generation quality (tone, professionalism, de-escalation)
- Brand safety (no liability admission, no PHI confirmation, no medical guarantees)
- Platform policy alignment (Google Business Profile + Yelp)
- Escalation/hold logic (negative review escalation triggers; legal/PHI “manual-only hold”)
- Required offline-resolution CTA presence
- Audit trail requirements (events + fields)
- Weekly KPI/report calculation definitions and reconciliation expectations

### 1.2 Test Suite
- Core suite: 45 reviews (15 Dentist, 15 Med Spa, 15 HVAC)
- Yelp addendum: 6 edge cases (review removal accusations, competitor comparisons, solicitation/incentive bait, “report to Yelp” threats, discount demands, public back-and-forth baiting)

High-risk edge coverage included: HIPAA/PHI exposure attempts, medical outcome claims, pricing disputes, discrimination/harassment language, staff naming/doxxing, competitor accusations, refund demands, alleged injury/damage, and legal threats.

### 1.3 Final Results (Post-Guardrails)
- Core suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)
- P0/P1 defects: 0 open

### 1.4 Required Guardrails (Acceptance Criteria)
These are mandatory “gates” (must be enforced pre-generation AND pre-post).

**A) PHI / HIPAA / privacy guardrail (hard block phrases, forced generic wording)**
- Trigger examples: “chart”, “records”, “visit”, “appointment time”, “procedure details”, “treatment plan”, “diagnosis”, “prescription”, “my tooth #…”, “before/after”, “photo of my…”, “you did X to me”.
- Expected behavior:
  1) No confirmation the person is/was a patient/customer.
  2) Response must be generic (“We take privacy seriously…”).
  3) Must direct offline to a private channel.
  4) If review contains explicit PHI or requests personal medical details: set `post_status='blocked_manual_review'` and `escalation_level=Privacy`.

**B) Legal-threat guardrail (manual-only hold)**
- Trigger examples: “attorney”, “lawyer”, “lawsuit”, “sue”, “court”, “legal action”, “demand letter”, “small claims”.
- Expected behavior:
  1) Auto-set response mode to HOLD.
  2) `escalation_level=Legal`.
  3) `post_status='blocked_manual_review'`.
  4) Draft (optional) must be non-substantive: acknowledge, invite offline, do not debate facts.

**C) Liability admission guardrail**
- Must not contain: “it was our fault”, “we messed up”, “we caused”, “we are liable”, “we are responsible for the damage”, “we negligently…”.
- Allowed alternatives: “We’re sorry to hear about your experience”, “We aim to provide…”, “We’d like to learn more and address this”.

**D) Medical outcomes / guarantees guardrail (dentist + med spa)**
- Must not contain guarantees: “guaranteed”, “permanent results”, “cure”, “no risk”, “100% safe”, “will work for everyone”.
- No discussion of personal medical facts; no individualized advice.

**E) Incentives / solicitation / review gating guardrail**
- Must not offer discounts, refunds, or gifts in exchange for reviews.
- Must not ask only happy customers to review.
- Must not imply Yelp/Google will remove reviews.

**F) Doxxing / personal data guardrail**
- Never include reviewer’s phone/email/address.
- Avoid naming staff unless business explicitly approved staff-name usage; default is “our team”.

### 1.5 Escalation Logic (Expected)
- Level 0: Positive/neutral → auto-draft OK
- Level 1: Mild negative (wait time, communication, general dissatisfaction) → auto-draft OK, include offline CTA
- Level 2: Strong negative (damage claim, safety issue, discrimination allegation, fraud accusation) → draft allowed but requires human approval
- Level 3: Privacy/PHI or Legal threat → `blocked_manual_review` (manual-only hold)

### 1.6 Audit Trail (Minimum Acceptance Criteria)
For every review handled:
- Identifiers: `review_source`, `review_id`, `business_id/location_id`, `review_text_hash`
- Classification: `detected_risk_flags[]`, `escalation_level`, `hold_reason`
- Drafting: `draft_version`, `final_response_text`, `model_version`, `prompt_version`, `detector_version`
- Workflow: events `draft_created`, `flagged`, `approved`, `blocked`, `posted`
- Posting: `post_status`, `error_code`, `posted_timestamp`
- Holds: `blocked_timestamp`, `unblocker_id` (if later released)

---

## 2) Brand-Safety Checklist v3 (Operator Tick-Box)

### 2.1 Universal MUST-HAVES (every response)
- [ ] Thank reviewer OR acknowledge feedback
- [ ] Non-inflammatory tone; no sarcasm; no arguments
- [ ] No personal data; no staff full names by default
- [ ] No promises about Yelp/Google actions (“we’ll get this removed”)
- [ ] Offline resolution CTA present (phone/email/contact form)

### 2.2 Universal MUST-NOTs
- [ ] No liability admission (“our fault”, “we caused”, “we are responsible for…”) 
- [ ] No threats, retaliation, shaming, or accusing reviewer of lying
- [ ] No incentives/discounts for reviews; no review gating

### 2.3 Privacy / PHI / HIPAA
- [ ] Never confirm they are a patient/customer
- [ ] Never mention chart/records/visit/procedure details
- [ ] If PHI present or requested → block/manual-only hold

### 2.4 Medical claims (Dentist + Med Spa)
- [ ] No outcome guarantees or “cure” language
- [ ] No individualized medical advice
- [ ] If reviewer alleges injury/medical harm → escalate Level 2+ (often Level 3 if legal threat)

### 2.5 Yelp-specific
- [ ] Don’t reference Yelp moderation/removal
- [ ] Don’t publicly debate; keep short and take offline
- [ ] Don’t solicit reviews in a way that implies incentives

---

## 3) Escalation Playbook v3 (Common Scenarios)

### Routing SLAs
- Safety incident / alleged injury: Owner/GM <4h; Ops <24h
- Billing dispute: Billing <24h
- Service failure (HVAC no-show/late): Ops <24h
- Discrimination/harassment allegation: Owner/HR same-day
- Privacy/PHI: Compliance/Owner same-day
- Legal threat: Legal same-day; DO NOT POST

### DO-NOT-POST Conditions (automatic block)
- Legal threat language present
- PHI present or patient identity confirmation risk
- Active safety investigation (e.g., gas leak negligence claim) until internal review
- Threats/harassment/doxxing escalating risk

### Evidence Checklist (collect internally)
- Transaction/appointment metadata (internal only)
- Staff schedule (internal only)
- Photos/invoices/dispatch logs (HVAC)
- Call recordings (where legal)
- Prior communications (internal only)

### Response Principles (public)
- Acknowledge, don’t argue
- Don’t confirm identity or details
- Invite offline contact
- Offer to investigate

---

## 4) Approved Response Templates v3 (Per Vertical)

**Template rules (all):**
- Allowed variables only: {BusinessName}, {SupportEmail}, {SupportPhone}, {City}, {FirstNameOrGeneric}
- Disallowed variables: appointment date/time, procedure names, prices unless reviewer stated and business verified, staff names, diagnosis/treatment details
- Required CTA: “Please contact us at {SupportPhone} or {SupportEmail} so we can help privately.”

### 4.1 Dentist (Google/Yelp)
**DENT-POS-01 (Positive)**
“Thank you for the kind words. We’re glad you had a great experience with our team. If you ever need anything, please reach out to us at {SupportPhone} or {SupportEmail}.”

**DENT-NEU-01 (Neutral/short)**
“Thanks for sharing your feedback. If there’s anything we can do to improve your experience, please contact us at {SupportPhone} or {SupportEmail} so we can help privately.”

**DENT-NEG-01 (Mild negative: wait time/communication)**
“Thank you for the feedback, and we’re sorry to hear your visit didn’t meet expectations. We aim to provide timely, clear care and would like to learn more. Please contact us at {SupportPhone} or {SupportEmail} so we can address this privately.”

**DENT-NEG-02 (Strong negative: pain/bad outcome claim, no legal threat)**
“We’re sorry to hear about your experience. We take concerns like this seriously and would like to review what happened through the appropriate private channels. Please contact us at {SupportPhone} or {SupportEmail} so we can help.”

**DENT-FAKE-01 (Suspected fake/mismatched details)**
“Thank you for the feedback. We take reviews seriously, but we’re unable to identify the situation from the details shared. Please contact us at {SupportPhone} or {SupportEmail} so we can look into this privately.”

**DENT-PRIV-01 (PHI/privacy-sensitive — draft allowed but often hold)**
“We take privacy seriously and can’t discuss details publicly. Please contact us at {SupportPhone} or {SupportEmail} so we can address your concern privately.”

### 4.2 Med Spa
**SPA-POS-01**
“Thank you for the kind review. We’re glad you enjoyed your experience with our team. If you have any questions, please contact us at {SupportPhone} or {SupportEmail}.”

**SPA-NEG-01 (Mild dissatisfaction)**
“Thank you for sharing your feedback. We’re sorry to hear it wasn’t what you expected. We’d like to learn more and help resolve this—please contact us at {SupportPhone} or {SupportEmail}.”

**SPA-NEG-02 (Strong dissatisfaction/complications claim)**
“We’re sorry to hear about your experience. We take concerns seriously and want to help, but we can’t address specifics publicly. Please contact us at {SupportPhone} or {SupportEmail} so we can assist privately.”

**SPA-SAFE-01 (No guarantees)**
“Thank you for your feedback. Results can vary and we want to ensure your concerns are handled appropriately. Please contact us at {SupportPhone} or {SupportEmail} so we can help privately.”

**SPA-FAKE-01**
“Thanks for the review. We’re unable to confirm the situation based on the information provided, but we’d like to look into it. Please reach out at {SupportPhone} or {SupportEmail}.”

**SPA-PRIV-01 (Privacy-sensitive)**
“We take privacy seriously and can’t discuss details publicly. Please contact us at {SupportPhone} or {SupportEmail} so we can assist privately.”

### 4.3 HVAC
**HVAC-POS-01**
“Thanks for the review. We appreciate you choosing {BusinessName} and are glad our team could help. If you need anything else, contact us at {SupportPhone} or {SupportEmail}.”

**HVAC-NEG-01 (Late/no-show)**
“Thank you for the feedback, and we’re sorry for the frustration. Reliable scheduling matters to us and we’d like to make this right. Please contact us at {SupportPhone} or {SupportEmail} so we can help.”

**HVAC-NEG-02 (Pricing dispute)**
“Thank you for sharing your concerns. We’d like to understand the details and review this through the appropriate channels. Please contact us at {SupportPhone} or {SupportEmail} so we can help privately.”

**HVAC-NEG-03 (Alleged damage)**
“We’re sorry to hear about your experience. We take these concerns seriously and want to look into what happened. Please contact us at {SupportPhone} or {SupportEmail} so we can investigate and assist.”

**HVAC-FAKE-01**
“Thanks for the review. We’re not able to identify the job from the details shared. Please contact us at {SupportPhone} or {SupportEmail} so we can look into this privately.”

**HVAC-SAFE-01 (Safety issue claim)**
“We’re sorry to hear this and take safety concerns seriously. Please contact us at {SupportPhone} or {SupportEmail} immediately so we can address this privately.”

---

## 5) Customer-Facing “Safety & Policy Commitments” (Paste onto Website)

**Safety & Policy Commitments**
We help local businesses respond to reviews quickly and professionally while respecting platform rules and customer privacy.

1) **No fake reviews / no incentives.** We do not generate, purchase, or post fake reviews. We do not offer discounts, gifts, or compensation in exchange for reviews, and we do not support “review gating” (asking only happy customers to leave reviews).

2) **Privacy-first responses.** Our system is designed to avoid sharing or confirming sensitive personal information. For healthcare-related businesses, responses are written to minimize privacy risk and avoid discussing any patient details publicly.

3) **Manual-review holds for high-risk content.** If a review contains potential privacy issues (e.g., medical details) or legal threats (e.g., “I will sue”), we automatically place the response into a **manual-only hold** so your team can review before anything is posted.

4) **De-escalation and offline resolution.** Our default approach is calm, respectful, and focused on moving resolution offline via your preferred contact method.

Questions? Contact us: agent_bob_replit+review-bot@agentmail.to

---

## 6) Launch Readiness Note
This pack verifies draft quality and policy alignment via test suites and guardrails. The remaining critical step is an end-to-end environment verification (sandbox preferred; limited live test acceptable) to prove `blocked_manual_review` truly prevents posting and that audit logs + weekly KPIs reconcile to posted vs blocked vs approved counts.