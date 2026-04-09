# Policy-to-Control Traceability Matrix + Brand-Safety Ruleset + Approved Templates v3 (Google Business Profile + Yelp | Dentist/Med Spa/HVAC)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:32:34.731Z

---

## 1) Platform Policy-to-Control Traceability Matrix (Testable)

This matrix ensures we can prove: (a) the system does not generate/propose policy-violating content, (b) it does not post when it shouldn’t, and (c) the audit trail captures who/what/why.

### A. Universal (Google + Yelp)
1. **No incentives / solicitation for positive reviews**
   - Risk: “Leave us a 5-star review for a discount/freebie.”
   - Control(s): Incentive detector (blocked phrases + semantic patterns) → force rewrite; if user insists, set `response_mode=manual_only_hold`.
   - Template rule: Never include discounts, giveaways, gift cards, “in exchange,” “reward,” “promotion.”
   - Audit: `detected_risk_flags` includes `INCENTIVE_LANGUAGE`; `post_status='blocked_manual_review'` if not resolved.
   - Test IDs: POL-INC-01..03.

2. **No admission of liability / wrongdoing**
   - Risk: “We messed up / we were negligent / we contaminated…”
   - Control(s): Liability admission blocklist + rewrite to non-admission empathy; escalate when safety/damage alleged.
   - Audit: `detected_risk_flags` includes `LIABILITY_RISK`; `escalation_level` >= Ops/Safety.
   - Test IDs: POL-LIAB-01..04.

3. **No doxxing / personal data**
   - Risk: naming staff with accusations; sharing phone/address details of reviewer; appointment times.
   - Control(s): PII/PHI detector; template prohibits full names; only generic “our team.”
   - Audit: `detected_risk_flags` includes `PII`; block + manual review if reviewer includes PII.
   - Test IDs: POL-PII-01..03.

4. **No harassment / inflammatory tone / retaliation**
   - Risk: arguing with reviewer, threatening, shaming.
   - Control(s): Tone constraint; “de-escalate + take offline” mandatory; “no accusations.”
   - Audit: `detected_risk_flags` includes `INFLAMMATORY_TONE` if model attempts.
   - Test IDs: POL-TONE-01..03.

5. **No competitor disparagement**
   - Risk: “Their business is shady; we’re better.”
   - Control(s): Competitor disparagement detector; rewrite to neutral.
   - Audit: `detected_risk_flags` includes `COMPETITOR_MENTION` when present; requires neutral handling.
   - Test IDs: POL-COMP-01..02.

### B. Google Business Profile specific
6. **No promises about removing reviews / manipulating review system**
   - Risk: “We’ll get this removed,” “Google will take it down.”
   - Control(s): Removal-promise detector; rewrite to “we’d like to learn more; contact us.”
   - Audit: `detected_risk_flags` includes `REMOVAL_PROMISE`.
   - Test IDs: GBP-REM-01..02.

### C. Yelp specific
7. **Avoid implying Yelp will remove content; avoid public back-and-forth**
   - Risk: “Yelp will investigate/remove,” extended arguments.
   - Control(s): Yelp-mode response: short, factual, offline CTA, no procedural claims about Yelp.
   - Audit: `review_source='Yelp'` enforces Yelp template set; `template_id` must be Yelp variant.
   - Test IDs: YELP-PROC-01..03.

8. **No review gating / selective solicitation**
   - Risk: “If happy leave a review; if unhappy contact us.”
   - Control(s): Review-gating detector; rewrite to a single consistent ask (offline contact) without directing to review platforms.
   - Audit: `detected_risk_flags` includes `REVIEW_GATING`.
   - Test IDs: YELP-GATE-01..02.

### D. Healthcare vertical overlay (Dentist + Med Spa)
9. **HIPAA/PHI: never confirm patient relationship or specifics**
   - Risk: “We reviewed your chart/visit,” “After your procedure…”
   - Control(s): PHI confirmation hard block: phrases like “your chart/records/visit/appointment,” “as your provider,” etc. → forced generic response; if reviewer includes PHI, escalate + manual-only hold.
   - Audit: `detected_risk_flags` includes `PHI_RISK`; `response_mode='manual_only_hold'` if explicit PHI or legal threat.
   - Test IDs: MED-PHI-01..06.

10. **No medical outcome guarantees**
   - Risk: “Guaranteed results,” “permanent cure,” “100% safe.”
   - Control(s): Medical-claims detector; rewrite to general commitment + invite offline.
   - Test IDs: MED-CLAIM-01..03.

11. **Safety incidents / injury claims**
   - Risk: reviewer alleges infection, burns, injury.
   - Control(s): Safety incident detector → `escalation_level=Safety` and manual-only hold depending on severity.
   - Test IDs: MED-SAFE-01..03.


## 2) Brand-Safety & Policy Ruleset (Engineer-Ready)

### 2.1 Deterministic precedence ordering (highest wins)
1. **LEGAL_THREAT** (lawsuit/attorney/sue/demand letter) → `response_mode=manual_only_hold`, `escalation_level=Legal`, `post_status='blocked_manual_review'`.
2. **PHI_EXPLICIT or PHI_CONFIRMATION_RISK** (chart/records/visit + healthcare context) → `response_mode=manual_only_hold` if explicit PHI; otherwise force PHI-safe generic wording.
3. **SAFETY_INCIDENT** (injury, fire, gas leak, infection, burns) → escalate Safety; allow draft only if generic + no admissions; otherwise manual hold.
4. **DISCRIMINATION/HARASSMENT** → manual-only hold if threats; else generic de-escalation.
5. **INCENTIVE / REVIEW_GATING / REMOVAL_PROMISE / COMPETITOR_DISPARAGEMENT** → rewrite + block if user insists.
6. **DEFAULT** → allowed to auto-draft.

### 2.2 Required components in any auto-drafted response
- Thank/acknowledge (no sarcasm).
- Empathy + general statement (no admissions).
- **Offline CTA**: ask to contact via phone/email (business-configurable) and/or “message us” without referencing incentives.
- No personal identifiers; no appointment details; no pricing claims unless verified and explicitly provided.

### 2.3 Hard blocked phrase patterns (non-exhaustive)
- Liability: “we were negligent,” “our fault,” “we caused,” “we damaged,” “we broke,” “we poisoned.”
- PHI confirmation: “your chart,” “your records,” “your visit,” “your appointment,” “as your dentist/doctor/provider,” “we saw you on [date].”
- Incentives: “discount,” “coupon,” “gift card,” “free,” “in exchange for,” “reward for review.”
- Review gating: “If you’re happy… leave a review; if not… contact us.”
- Removal promise: “we’ll get this removed,” “Yelp/Google will take it down,” “we reported you to Yelp.”

### 2.4 Required safe alternatives
- Replace admissions with: “We’re sorry to hear you had this experience. We’d like to learn more and address it directly.”
- Replace PHI mention with: “To protect privacy, we can’t discuss details here, but we’d like to connect directly.”
- Replace procedural claims with: “If you’re willing, please contact us so we can look into it.”

### 2.5 Audit trail requirements (must be logged)
- `review_source`, `review_id`, `review_text_hash`, `detected_risk_flags[]`, `response_mode`, `escalation_level`, `template_id`, `draft_version`, `model/prompt_version`, `human_approver_id`, `approval_timestamp`, `post_status`, `blocked_timestamp`, `hold_reason`, `posted_timestamp`, `final_response_text`.


## 3) Approved Response Templates v3 (Per Vertical, Per Platform)

**Global allowed variables (if present in config):**
- `{business_name}` (required)
- `{contact_phone}` OR `{contact_email}` (at least one required)
- `{city}` (optional)

**Forbidden variables:** reviewer name, staff name, appointment date/time, treatment/procedure name, diagnosis, pricing unless verified, any PHI.

### 3.1 Dentist (Google)
**DENT-GBP-POS-01 (Positive)**
“Thank you for the kind words. We’re glad you had a great experience with our team at {business_name}. If there’s anything we can do for you in the future, please don’t hesitate to reach out.”

**DENT-GBP-NEG-STR-01 (Strong negative; privacy-safe)**
“We’re sorry to hear this. We take feedback seriously, and we’d like to learn more so we can address your concerns. For privacy reasons, we can’t discuss details here—please contact {business_name} at {contact_phone} or {contact_email} so we can follow up directly.”

**DENT-GBP-FAKE-01 (Suspected fake/not a patient; neutral)**
“Thank you for the feedback. We’re not able to confirm any details publicly. We’d like to look into this—please contact {business_name} at {contact_phone} or {contact_email} with any information that can help us identify the situation.”

### 3.2 Dentist (Yelp)
**DENT-YELP-NEG-STR-01 (Short, de-escalating)**
“We’re sorry to hear you feel this way. We’d like to learn more and address your concerns directly. Please contact {business_name} at {contact_phone} or {contact_email}.”

**DENT-YELP-PHI-01 (Reviewer includes PHI; still public-safe)**
“Thank you for your message. To protect privacy, we can’t discuss details here. Please contact {business_name} at {contact_phone} or {contact_email} so we can follow up.”

### 3.3 Med Spa (Google)
**MEDSPA-GBP-POS-01**
“Thank you for your review. We appreciate you choosing {business_name}, and we’re glad you had a positive experience with our team.”

**MEDSPA-GBP-SAFE-INCIDENT-01 (Alleged injury/burn; no admission)**
“We’re sorry to hear this and we take safety concerns very seriously. We’d like to connect directly to understand what happened and determine next steps. Please contact {business_name} at {contact_phone} or {contact_email}. For privacy reasons, we can’t discuss details here.”

### 3.4 Med Spa (Yelp)
**MEDSPA-YELP-NEG-STR-01 (Short + offline CTA)**
“We’re sorry to hear about your experience. We’d like to learn more and help address your concerns. Please contact {business_name} at {contact_phone} or {contact_email}.”

### 3.5 HVAC (Google)
**HVAC-GBP-POS-01**
“Thanks for the review. We appreciate the opportunity to help, and we’re glad our team could take care of it. Thank you for choosing {business_name}.”

**HVAC-GBP-DAMAGE-01 (Alleged damage; no admission + escalate Ops)**
“We’re sorry to hear this. We want to understand what happened and make sure it’s addressed appropriately. Please contact {business_name} at {contact_phone} or {contact_email} so we can follow up directly.”

### 3.6 HVAC (Yelp)
**HVAC-YELP-NEG-STR-01**
“We’re sorry to hear about your experience. We’d like to learn more and help resolve this—please contact {business_name} at {contact_phone} or {contact_email}.”


## 4) Customer-facing compliance note (for onboarding / trust)
If you need a short legitimacy/compliance blurb for prospects:
“AI Review Reply & Reputation Autopilot drafts brand-safe responses and flags high-risk reviews for human review. It avoids medical/privacy disclosures, incentives, and argumentative language, and maintains an audit trail of approvals and posting. Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 | Contact: agent_bob_replit+review-bot@agentmail.to”
