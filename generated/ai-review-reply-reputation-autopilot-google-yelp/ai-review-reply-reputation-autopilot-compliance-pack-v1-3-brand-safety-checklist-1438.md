# AI Review Reply & Reputation Autopilot — Compliance Pack v1.3 (Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:12:35.594Z

---

# Compliance Pack v1.3
Business: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Reference URL (legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

## 1) Brand-Safety Checklist v3 (Operational, tick-box)
### A. Pre-generation inputs (review text hygiene)
- [ ] Do not store or display full reviewer personal data beyond what the platform provides (no enrichment).
- [ ] Hash raw review text for audit: `review_text_hash`.
- [ ] Detect and flag risk before drafting:
  - [ ] PHI/medical record references (e.g., “chart/records/visit/diagnosis/procedure”) ⇒ `risk_flag=PHI_RISK`.
  - [ ] Legal threats (“attorney/lawsuit/sue/court”) ⇒ `risk_flag=LEGAL_THREAT`.
  - [ ] Safety incident / injury (“hurt/injury/fire/gas leak/unsafe”) ⇒ `risk_flag=SAFETY_INCIDENT`.
  - [ ] Harassment/hate/discrimination slurs ⇒ `risk_flag=HARASSMENT`.
  - [ ] Extortion (“remove this or else”) ⇒ `risk_flag=EXTORTION`.

### B. Hard prohibitions (must never appear)
- [ ] No admission of liability: avoid “we are at fault”, “we caused”, “our mistake caused damage/injury”.
- [ ] No PHI confirmation: never confirm they are a patient/client or describe any visit/procedure.
  - Blocked phrases include: “your appointment”, “your visit”, “your treatment”, “we reviewed your chart/records”.
  - Allowed alternative: “We take feedback seriously and would like to learn more.”
- [ ] No medical guarantees/outcome claims (dentist/med spa): avoid “guarantee”, “cure”, “permanent results”.
- [ ] No incentives or solicitation: do not ask for positive reviews, offer discounts/gifts, or review-gate.
- [ ] No doxxing: never name staff involved in incidents; no phone/address beyond official business contact.
- [ ] No competitor disparagement or accusations.
- [ ] No promises about Yelp/Google enforcement/removal: never claim “we’ll get this removed”.

### C. Required elements (every response)
- [ ] Professional, calm tone; no sarcasm, blame, or arguments.
- [ ] Thank the reviewer (even if critical) unless harassment/extortion (then minimal neutral).
- [ ] Invite offline resolution with a specific CTA (email/phone), but do not request reviewer to edit/remove.
- [ ] Avoid pricing details unless the business explicitly verified and wants it public.
- [ ] Keep it short (typically 40–120 words) unless safety/legal hold.

### D. Posting gates (must be enforced both API + UI)
- [ ] If `risk_flag=LEGAL_THREAT` ⇒ `post_status=blocked_manual_review`, `escalation_level=Legal`, no auto-post.
- [ ] If `risk_flag=PHI_RISK` and draft contains any PHI-confirmation phrase ⇒ block + force generic rewrite.
- [ ] If harassment/slurs ⇒ allow only minimal neutral response or block for manual.

### E. Audit trail minimum fields (for every draft/decision)
- [ ] `review_source`, `review_id`, `business_id/location_id`, `review_text_hash`
- [ ] `detected_risk_flags[]`, `detector_version`, `prompt_version/model`
- [ ] `draft_version`, `final_response_text`
- [ ] `escalation_level`, `response_mode` (auto, needs_approval, blocked_manual_review)
- [ ] Events: `draft_created`, `flagged`, `approved`, `blocked`, `posted` with timestamps + actor IDs

## 2) Escalation Playbook v3 (Common negative scenarios)
### Severity levels
- Level 0: Positive/neutral ⇒ auto-draft OK.
- Level 1: Mild negative (service dissatisfaction) ⇒ auto-draft + offline CTA.
- Level 2: Strong negative (refund demand, alleged poor conduct) ⇒ needs approval by manager.
- Level 3: PHI risk / safety incident / harassment ⇒ manager + compliance review.
- Level 4: Legal threat ⇒ **DO NOT POST**; Legal same-day.

### Routing SLAs
- Safety incident/injury: Owner/GM <4h.
- Billing dispute/refund: Billing/Ops <24h.
- Service failure/quality: Ops <24h.
- Harassment/extortion: Owner/GM <24h.
- Legal threat: Legal same-day; keep internal notes.

### Evidence checklist (collect before replying when escalated)
- Review link + screenshot
- Work order/appointment metadata (internal only)
- Staff statements (internal only)
- Photos/invoices (internal only)
- Any prior comms with reviewer

### DO-NOT-POST conditions (automatic hold)
- Mentions attorney/lawsuit/sue/court ⇒ legal hold.
- Any request to discuss patient/client specifics publicly ⇒ PHI hold.
- Credible injury/safety hazard allegations ⇒ safety hold until facts verified.

### Recommended response principles by scenario
- Billing dispute: acknowledge concern, invite offline review, no public negotiation.
- Alleged damage (HVAC): avoid fault admission; invite inspection offline.
- Discrimination claim: acknowledge seriousness, escalate internally, invite direct contact.
- Suspected fake review: keep neutral, invite details offline, do not accuse.

## 3) Approved Response Templates v3 (Paste-ready)
Rules for all templates:
- Allowed variables: {BusinessName}, {SupportEmail}, {SupportPhone}, {City}
- Never include staff names, appointment details, diagnosis/treatment specifics, pricing promises, or “we reviewed your records”.
- Yelp note: do not mention Yelp moderation/removal; do not encourage review edits.

### A) Dentist (Google/Yelp)
**DENT-POS-01 (Positive)**
“Thank you for the kind words! We’re glad you had a great experience with {BusinessName}. If there’s ever anything we can do to help, please reach us at {SupportPhone} or {SupportEmail}.”

**DENT-MILDNEG-02 (Mild negative)**
“Thank you for the feedback. We aim to provide a respectful, comfortable experience, and we’d like to understand what happened. Please contact us at {SupportEmail} or {SupportPhone} so we can learn more and help.”

**DENT-STRONGNEG-03 (Strong negative / dissatisfaction)**
“We’re sorry to hear you’re upset. We take concerns seriously and would like to discuss this directly. Please email {SupportEmail} or call {SupportPhone} so we can look into your concerns and work toward a resolution.”

**DENT-PHI-04 (PHI-safe generic; use when review mentions treatment details)**
“Thank you for reaching out. For privacy reasons, we can’t discuss any details here, but we’d like to help. Please contact {SupportEmail} or {SupportPhone} and we’ll follow up directly.”

**DENT-FAKE-05 (Suspected fake)**
“Thanks for your comment. We’re unable to identify the situation from this post, but we’d like to understand more. Please contact {SupportEmail} or {SupportPhone} with any details so we can assist.”

**DENT-LEGALHOLD-06 (Legal threat ⇒ manual-only hold)**
Internal rule: do not post; set `blocked_manual_review`.

### B) Med Spa (Google/Yelp)
**SPA-POS-01**
“Thank you for your review! We appreciate you choosing {BusinessName} and we’re glad you enjoyed your experience. If you need anything, contact us at {SupportEmail} or {SupportPhone}.”

**SPA-MILDNEG-02**
“Thank you for the feedback. We strive for a professional, welcoming experience and would like to learn more. Please reach us at {SupportEmail} or {SupportPhone} so we can help.”

**SPA-RESULTS-03 (No outcome guarantees)**
“Thank you for sharing your concerns. Results can vary and we want to make sure your questions are addressed. Please contact {SupportEmail} or {SupportPhone} so we can discuss options directly.”

**SPA-SAFETY-04 (Reaction/incident mention)**
“We’re sorry to hear this and take it seriously. For privacy and to better assist, please contact {SupportEmail} or {SupportPhone} as soon as possible so our team can follow up directly.”

**SPA-FAKE-05**
“Thank you for your comment. We’d like to understand more, but we can’t identify the situation from this post. Please contact {SupportEmail} or {SupportPhone} so we can assist.”

**SPA-PHI-06**
“Thanks for reaching out. We can’t address personal details here, but we’d like to help. Please contact {SupportEmail} or {SupportPhone} and we’ll follow up directly.”

### C) HVAC (Google/Yelp)
**HVAC-POS-01**
“Thanks for the great review! We’re glad the team could help. If you ever need service in {City}, contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

**HVAC-LATE-02 (Scheduling/arrival issues)**
“Thank you for the feedback. We know timing matters and we’re sorry for the frustration. Please contact {SupportEmail} or {SupportPhone} so we can learn what happened and make it right.”

**HVAC-QUALITY-03 (Workmanship concern)**
“Thank you for letting us know. We take service quality seriously and would like to review this with you directly. Please contact {SupportEmail} or {SupportPhone} so we can help.”

**HVAC-DAMAGE-04 (Alleged damage—no liability admission)**
“We’re sorry to hear about your concern. We want to understand what happened and address it appropriately. Please contact {SupportEmail} or {SupportPhone} so we can gather details and follow up directly.”

**HVAC-SAFETY-05 (Gas leak/fire/unsafe)**
“We take safety concerns very seriously. Please contact us at {SupportPhone} or {SupportEmail} as soon as possible so we can follow up directly and ensure this is handled promptly.”

**HVAC-FAKE-06**
“Thanks for your comment. We’re unable to match this to our records from the information provided, but we’d like to help. Please contact {SupportEmail} or {SupportPhone} with details so we can look into it.”

## 4) QA Appendix: Detector coverage → required behavior/logging
- PHI_RISK detected ⇒ response must be generic/privacy-forward; never confirm patient/client; log `flagged` event.
- LEGAL_THREAT detected ⇒ `response_mode=blocked_manual_review`; emit `blocked` event with `hold_reason=LEGAL_THREAT`.
- INCENTIVE_LANGUAGE detected (e.g., “discount for review”) ⇒ block + rewrite; log `blocked` or `flagged`.
- COMPETITOR_DISPARAGEMENT risk ⇒ force neutral wording; never mention competitor; log `flagged`.
- Weekly report reconciliation must include counts: drafted, approved, posted, blocked_manual_review, and median response time for posted only.

End of Compliance Pack v1.3
