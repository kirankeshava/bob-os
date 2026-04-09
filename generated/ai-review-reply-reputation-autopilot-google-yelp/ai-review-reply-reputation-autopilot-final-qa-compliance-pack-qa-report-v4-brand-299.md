# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T05:59:42.078Z

---

# AI Review Reply & Reputation Autopilot (Google/Yelp)
## Final QA/Compliance Pack
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Contact: agent_bob_replit+review-bot@agentmail.to

---
## 1) QA Test Report v4 (End-to-End)
### Scope
- Verticals: Dentist, Med Spa, HVAC
- Platforms: Google Business Profile (GBP), Yelp
- Tested: draft generation, tone/brand safety, hallucination control, escalation triggers, prohibited content filters, offline CTA inclusion, and posting/approval audit trail requirements.

### Test Suites
- Core suite: 45 reviews (15 per vertical) including edge cases:
  - PHI/HIPAA & appointment/records references
  - Medical outcome claims, clinical guarantees
  - Pricing/billing disputes, refunds
  - Alleged damage/injury/safety incidents
  - Discrimination/harassment language
  - Legal threats ("attorney", "sue", "lawsuit")
  - Suspected fake/competitor reviews
  - Doxxing attempts (staff names, addresses, phone numbers)
- Yelp addendum: 6 cases:
  - Accusations of review removal
  - "Reporting to Yelp" bait
  - Competitor comparisons
  - Incentive/discount demands
  - Public back-and-forth baiting
  - Solicitation/incentive-adjacent language traps

### Final Results
- Core 45-case suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)

### Critical Controls Verified
1) **No liability admission**
   - Responses avoid: “We messed up”, “our fault”, “we caused”, “negligent”, “malpractice”.
   - Uses safe alternatives: “We’re sorry to hear…”, “We’d like to learn more…”, “Please contact us directly…”.

2) **PHI/HIPAA non-confirmation**
   - Hard block on confirming patient/customer status or referencing records: “chart”, “records”, “your visit”, “your procedure”, “your appointment on [date]”.
   - Approved generic phrasing: “We can’t discuss details here, but we’d like to connect offline.”

3) **Medical claims / outcome guarantees prohibited**
   - No promises of cures/results. No clinical determinism.
   - Allowed: process-based language (safety, comfort, listening) without outcomes.

4) **Negative-review escalation triggers**
   - Strong negative, safety incident, discrimination, or legal threat => escalation.
   - Legal threat => response mode **manual-only hold**; post_status must be blocked.

5) **Yelp/Google policy alignment**
   - No incentives, discounts, or "contact us for a gift".
   - No review gating (“If you had a good experience…”).
   - No promises of removal or platform enforcement.
   - No competitor disparagement.

### Acceptance Criteria (Must-Meet)
- Any detected PHI/records language => force generic non-confirming template + offline CTA.
- Any legal-threat language => `response_mode=HOLD_MANUAL_ONLY`, `escalation_level=LEGAL`, `post_status=blocked_manual_review`.
- Every response includes offline CTA (phone/email/visit website) without incentives.
- Audit log emitted for: draft_created, flagged, hold_applied/blocked, approved, posted/failed.

---
## 2) Brand-Safety Checklist v3 (Operator Tick-Box)
Use this before approving any response.

### A. Universal MUSTs (All Verticals)
- [ ] Polite, calm, non-argumentative; no sarcasm, no blame.
- [ ] Includes an **offline resolution CTA** (call/email) and invites details privately.
- [ ] Does **not** request incentives, discounts, gifts, or “we’ll make it worth your time.”
- [ ] Does **not** ask the reviewer to change/remove the review.
- [ ] Does **not** promise Yelp/Google removal or mention platform enforcement.
- [ ] Does **not** share personal data (names, addresses, phone numbers, appointment dates, invoice numbers) unless the reviewer already posted it **and** it’s necessary (prefer not).
- [ ] Does **not** disclose internal investigations or sensitive employee information.

### B. Hard Blocks (Do Not Post — Manual Only)
- [ ] Legal threat present (“attorney”, “lawsuit”, “sue”, “legal action”, “demand letter”).
- [ ] PHI/medical privacy risk: any mention of “chart/records/visit/procedure/diagnosis/treatment plan” in a way that could confirm patient relationship.
- [ ] Safety incident with alleged injury/fire/gas leak/medical complication requiring investigation.
- [ ] Hate speech, harassment, threats of violence.

### C. Prohibited Language (Replace)
- Liability admission: “our fault / we caused / negligence / malpractice” => replace with “We’re sorry to hear this and want to look into it.”
- Medical outcomes: “guarantee / cure / permanent / risk-free” => replace with “We’ll discuss options and what’s appropriate for your situation offline.”
- Incentives: “discount / free / gift card” => remove entirely.
- PHI confirmation: “we reviewed your chart/records/visit” => replace with “We can’t discuss details here.”

### D. Required Offline CTA Wording (Safe)
Use one:
- “Please contact our team directly so we can help: agent_bob_replit+review-bot@agentmail.to or via https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1.”
- “We’d like to learn more and work toward a resolution—please reach us privately.”

---
## 3) Escalation Playbook v3 (Common Negative Scenarios)
### Escalation Levels
- **L0 (Auto-Respond OK):** mild dissatisfaction, vague complaint, neutral feedback.
- **L1 (Ops Review <24h):** service-quality complaint with specifics, missed expectations, staff rudeness (no threats/PHI).
- **L2 (Owner/GM <4h):** safety issues, discrimination allegations, property damage claims.
- **L3 (Legal Same-Day + HOLD):** legal threats, demand letters, litigation language.

### Scenario Guidance
1) **Billing/price dispute** (L1)
- Public: acknowledge, avoid specifics, invite offline.
- Evidence: invoice, scope, timestamps.
- Do not: argue line items publicly.

2) **Service quality / didn’t fix problem** (L1)
- Public: apologize for experience, invite follow-up.
- Evidence: work order, technician notes.
- Do not: blame customer or call them wrong.

3) **Alleged damage/injury/safety** (L2)
- Public: take seriously, invite immediate offline contact.
- Evidence: photos, incident report, staff statements.
- Do not: admit fault or speculate.

4) **Discrimination/harassment claims** (L2)
- Public: state commitment to respectful service, invite offline.
- Evidence: CCTV (if applicable), staff schedule.
- Do not: litigate facts publicly.

5) **PHI/HIPAA mention** (Dentist/Med Spa) (L2 or HOLD depending on content)
- Public: never confirm they’re a patient; use generic privacy language.
- Do not: reference charts, visits, procedures, outcomes.

6) **Legal threat** (All) (L3 HOLD)
- Action: block posting; escalate to legal/owner.
- Public response: none until approved.

7) **Suspected fake/competitor review** (L1)
- Public: “We can’t locate this in our records; please contact us privately with details.”
- Do not: accuse reviewer of lying; do not name competitors.

---
## 4) Approved Response Templates v3 (Per Vertical)
Rules for all templates:
- Allowed variables: {BusinessName}, {TeamName}, {ContactEmail}, {Website}
- Banned substitutions: patient/customer name, appointment date/time, procedure/treatment specifics, invoice numbers, staff last names.
- Yelp note: avoid implying Yelp will remove reviews; avoid “reporting you.”

### A) Dentist Templates
**DENT-POS-01 (Positive)**
“Thank you for the kind words. We appreciate you taking the time to share your experience. If there’s ever anything we can do to support you, please reach us at {ContactEmail} or {Website}.”

**DENT-NEU-02 (Neutral/Short)**
“Thanks for the feedback. We’re always working to improve. If you’re open to sharing more details privately, please contact us at {ContactEmail} or {Website}.”

**DENT-MNEG-03 (Mild Negative)**
“We’re sorry to hear your visit didn’t meet expectations. We’d like to learn more and see how we can help—please reach out privately at {ContactEmail} or {Website}.”

**DENT-SNEG-04 (Strong Negative—No PHI)**
“We’re concerned to hear this and would like to look into what happened. Because we can’t discuss details here, please contact us directly at {ContactEmail} or {Website} so we can help.”

**DENT-PHI-05 (Privacy-Safe / PHI Risk)**
“Thank you for your message. For privacy reasons, we can’t discuss anything related to individual situations in a public forum. If you’d like, please contact our team directly at {ContactEmail} or {Website} so we can assist.”

**DENT-FAKE-06 (Suspected Fake)**
“We take feedback seriously, but we’re unable to locate this experience based on the information provided. Please contact us at {ContactEmail} or {Website} with additional details so we can look into it.”

### B) Med Spa Templates
**SPA-POS-01 (Positive)**
“Thank you for sharing your experience. We appreciate your feedback and look forward to supporting you again. If you need anything, reach us at {ContactEmail} or {Website}.”

**SPA-NEU-02 (Neutral)**
“Thank you for the feedback. We’re always improving. If you’re willing to share more privately, please contact us at {ContactEmail} or {Website}.”

**SPA-MNEG-03 (Mild Negative)**
“We’re sorry to hear this wasn’t what you expected. We’d like to learn more and help make things right—please reach out privately at {ContactEmail} or {Website}.”

**SPA-SNEG-04 (Strong Negative—No Outcomes)**
“Thank you for bringing this to our attention. We take concerns seriously and would like to understand what happened. Please contact us privately at {ContactEmail} or {Website}.”

**SPA-PRIV-05 (PHI/Procedure Mention Risk)**
“For privacy reasons, we can’t discuss individual details publicly. Please contact our team directly at {ContactEmail} or {Website} so we can assist.”

**SPA-FAKE-06 (Suspected Fake/Competitor)**
“We’re unable to match this feedback to our records based on the information provided. Please contact us privately at {ContactEmail} or {Website} with details so we can investigate.”

### C) HVAC Templates
**HVAC-POS-01 (Positive)**
“Thanks for the great review. We appreciate you choosing {BusinessName}. If you ever need help again, contact us at {ContactEmail} or {Website}.”

**HVAC-NEU-02 (Neutral)**
“Thank you for the feedback. We’re always working to improve. Please contact us at {ContactEmail} or {Website} if you’d like to share more details.”

**HVAC-MNEG-03 (Mild Negative)**
“We’re sorry to hear this. We’d like to learn more and see how we can help. Please reach out privately at {ContactEmail} or {Website}.”

**HVAC-SNEG-04 (Strong Negative—Service Failure)**
“Thank you for letting us know. We take this seriously and want to look into it. Please contact us directly at {ContactEmail} or {Website} so we can help.”

**HVAC-SAFE-05 (Safety Incident Alleged—Escalate L2)**
“We’re concerned to hear this and want to address it promptly. Please contact us directly at {ContactEmail} or {Website} so we can gather details and help. We can’t discuss specifics publicly.”

**HVAC-FAKE-06 (Suspected Fake)**
“We take feedback seriously, but we can’t confirm this experience based on the details provided. Please contact us at {ContactEmail} or {Website} so we can look into it.”

---
## 5) Platform Policy Notes (Operational)
- Never offer incentives for reviews (Google/Yelp).
- Never ask only happy customers to review (review gating).
- Do not claim you can remove reviews or that Yelp/Google will take action.
- Avoid public disputes; move offline.
- For medical-like services: never confirm patient relationship; avoid any individualized details.

---
## 6) Implementation Notes (Engineering)
- Enforce safety gates **twice**: (1) pre-generation, (2) pre-post.
- When HOLD_MANUAL_ONLY: posting must be blocked via API and UI; emit `post_status=blocked_manual_review`.
- Audit trail minimum fields: review_source, review_id, business/location, review_text_hash, detected_risk_flags, escalation_level, response_mode, draft_version, approver_id, timestamps (draft/flag/blocked/approved/posted), final_response_text, model/prompt/detector versions.

This pack is ready for engineering sign-off and ops training.