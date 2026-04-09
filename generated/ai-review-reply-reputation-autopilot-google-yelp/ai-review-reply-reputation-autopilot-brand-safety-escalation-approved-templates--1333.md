# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Approved Templates (v3.0)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:22:26.883Z

---

# 1) Brand-Safety & Platform-Policy Checklist v3 (Google Business Profile + Yelp)

## 1.1 Core goals (must hold for every draft)
- **Brand-safe tone:** calm, appreciative, non-argumentative, non-sarcastic.
- **No hallucination:** never invent facts (dates, services performed, prices, outcomes, staff actions, “we checked logs”).
- **No liability admission:** never admit fault, negligence, malpractice, “we caused/ruined/broke,” or confirm wrongdoing.
- **Take it offline:** include a clear offline CTA (phone/email) for any complaint/issue.
- **No personal data:** do not include phone numbers, addresses, emails, appointment times, last names of staff, invoice numbers, or any identifiers unless explicitly provided by the business AND allowed by platform policy.

## 1.2 Medical / PHI / HIPAA (Dentist + Med Spa)
### Hard blocks (manual-only hold)
If the review contains any of the following, set `post_status=blocked_manual_review` and `escalation_level=PHI`:
- Reviewer mentions: **diagnosis, procedure details, medications, charts/records, test results, photos of treatment, appointment details**.
- Trigger phrases: “my records,” “my chart,” “my visit on,” “you diagnosed,” “my x-ray,” “my injection,” “my fillers,” “my braces,” “my root canal,” “my biopsy,” “my bloodwork,” “HIPAA”.

### Required safe behaviors (if allowed to post)
- Never confirm they are a patient or that a visit occurred.
- Use generic phrasing: “We take privacy seriously and can’t discuss details here.”
- No medical outcome guarantees: forbid “guaranteed,” “permanent,” “will cure,” “100%,” “no risk.”

## 1.3 Incentives / solicitation / review gating (Google + Yelp)
- **Forbidden:** asking for positive reviews only, offering discounts/freebies for reviews, “we’ll compensate you,” “contact us for a refund if you remove/update,” any quid-pro-quo.
- **Allowed:** a neutral request for direct contact to resolve issues; a neutral “we appreciate feedback.”
- Yelp sensitivity: avoid language implying Yelp will remove reviews or that the business can “get it taken down.”

## 1.4 Competitors, harassment, discrimination, threats
### Competitor disparagement (manual-only hold if heated)
- Do not accuse competitors, do not compare, do not name other businesses.
- If reviewer claims “your competitor is better,” reply neutrally without referencing competitor.

### Harassment/hate speech
- Do not mirror slurs or escalate.
- Keep response brief; invite offline resolution; escalate internally.

### Legal threats
If reviewer mentions: “lawsuit,” “attorney,” “sue,” “legal action,” “court,” “press charges,” set:
- `response_mode=hold_manual_only`
- `escalation_level=Legal`
- `post_status=blocked_manual_review`

## 1.5 Liability / damage / safety incidents (HVAC + all)
- If reviewer alleges injury, property damage, fire, CO leak, unsafe conduct → `escalation_level=Safety` and manual-only hold.
- Public reply must **not** admit fault; must express concern and request immediate offline contact.

## 1.6 Required elements by scenario
- **Positive review:** thank + optional invitation to return.
- **Neutral:** thank + acknowledge feedback + invite offline if needed.
- **Negative (non-legal, non-PHI, non-safety):** apologize for experience (not fault) + commitment to improve + offline CTA.
- **Suspected fake:** avoid accusations; request details offline; state you can’t locate the situation from the info provided.

## 1.7 Mandatory offline CTA (approved wording)
Use one of:
- “Please contact us at **agent_bob_replit+review-bot@agentmail.to** so we can look into this privately and help.”
- “We’d like to make this right—please email **agent_bob_replit+review-bot@agentmail.to** with your name and the best way to reach you.”

(If business provides a real phone/email, substitute—otherwise use the above for MVP demos.)

---

# 2) Escalation Playbook v3 (Scenarios, Levels, Do-Not-Post)

## Escalation levels
- **L0 (Auto-OK):** safe to draft + post after approval.
- **L1 (Ops):** needs internal follow-up; post allowed with safe wording.
- **L2 (Billing):** billing/pricing disputes; post allowed with safe wording.
- **L3 (PHI/Privacy):** any patient/treatment detail risk → **DO NOT POST** (manual-only hold).
- **L4 (Safety/Damage):** injury/property damage/safety hazard → **DO NOT POST**.
- **L5 (Legal):** legal threats/regulatory complaints → **DO NOT POST**.

## Routing SLAs
- L1 Ops: acknowledge within 24h.
- L2 Billing: acknowledge within 24h.
- L3 PHI: same-day review by manager/owner.
- L4 Safety: owner/GM within 4h.
- L5 Legal: same-day to legal counsel/owner.

## Scenario guidance (public reply + internal actions)

### A) Billing/pricing dispute (L2)
- **Public reply (allowed):**
  “Thanks for the feedback. We want to understand what happened and address any billing concerns. Please email agent_bob_replit+review-bot@agentmail.to so we can review this with you privately.”
- **Internal:** pull invoice, confirm policies, prepare adjustment options.

### B) Service quality / rude staff (L1)
- **Public reply (allowed):**
  “We’re sorry to hear this was your experience. This isn’t the standard we aim for. Please email agent_bob_replit+review-bot@agentmail.to so we can learn more and work toward a resolution.”
- **Internal:** identify shift/team, coach staff, document corrective action.

### C) Suspected fake review (L1)
- **Public reply (allowed):**
  “We take feedback seriously, but we can’t identify the situation from the details here. Please email agent_bob_replit+review-bot@agentmail.to with any info you’re comfortable sharing so we can look into it.”
- **Internal:** check CRM/work orders; flag potential abuse.

### D) Medical outcome complaint (Dentist/Med Spa) (often L3)
- **Default:** if any treatment specifics appear → **DO NOT POST**.
- **If vague and non-identifying (rare L1):**
  “We take feedback seriously. For privacy reasons, we can’t discuss details here, but we’d like to help—please email agent_bob_replit+review-bot@agentmail.to.”

### E) Privacy/HIPAA accusation (L3)
- **DO NOT POST**. Route to privacy officer/owner.

### F) Injury/property damage/safety hazard (L4)
- **DO NOT POST.**
- **Internal:** document, preserve evidence, contact insurer if needed.

### G) Legal threat / “I’m suing” (L5)
- **DO NOT POST.**
- **Internal:** route to legal/owner; preserve records; no further public engagement.

---

# 3) Approved Response Template Library v3

## Global template rules
- Never include: appointment confirmation, “we reviewed your records/chart/visit,” staff last names, or any medical specifics.
- Allowed variables (if provided by business): `{business_name}`, `{location}`, `{support_email}`, `{support_phone}`.
- If no business support contact is provided, use `agent_bob_replit+review-bot@agentmail.to` for MVP.

## 3.1 Dentist templates

**DENT-POS-01 (Positive)**
“Thank you for the kind words and for choosing {business_name}. We’re glad you had a great experience. We look forward to seeing you again.”

**DENT-NEU-02 (Neutral/short)**
“Thanks for your feedback. We appreciate you taking the time to share it and will use it to keep improving.”

**DENT-NEG-03 (Mild negative, allowed)**
“We’re sorry to hear this wasn’t a great experience. We’d like to learn more and help if we can—please email {support_email} so we can follow up privately.”

**DENT-NEG-04 (Strong negative, non-PHI, allowed)**
“Thank you for letting us know. We take concerns like this seriously and want to make things right. Please contact us at {support_email} so we can discuss this privately.”

**DENT-FAKE-05 (Suspected fake, allowed)**
“We take feedback seriously, but we’re not able to match this to our records based on the information here. Please email {support_email} with any details you’re comfortable sharing so we can look into it.”

**DENT-RECOV-06 (Service recovery, allowed)**
“We appreciate your feedback and the opportunity to improve. Please reach out to {support_email} so we can understand what happened and work toward a resolution.”

## 3.2 Med Spa templates

**MSPA-POS-01**
“Thank you for the review and for choosing {business_name}. We’re glad you enjoyed your experience and appreciate your support.”

**MSPA-NEU-02**
“Thanks for your feedback. We’re always working to improve, and we appreciate you sharing this.”

**MSPA-NEG-03 (Mild negative)**
“We’re sorry to hear this. We’d like to learn more and help—please email {support_email} so we can follow up privately.”

**MSPA-NEG-04 (Strong negative, no specifics)**
“Thank you for bringing this to our attention. We take your concerns seriously and want to address them directly. Please contact {support_email} so we can discuss privately.”

**MSPA-FAKE-05**
“We take all feedback seriously, but we can’t identify the situation from the details here. Please email {support_email} so we can look into it.”

**MSPA-RECOV-06**
“We appreciate the chance to improve. Please reach out to {support_email} so we can understand what happened and work toward a better outcome.”

## 3.3 HVAC templates

**HVAC-POS-01**
“Thanks for the great review and for choosing {business_name}. We appreciate your trust and are glad we could help.”

**HVAC-NEU-02**
“Thank you for your feedback. We appreciate you taking the time to share it and will use it to improve.”

**HVAC-NEG-03 (Scheduling/communication)**
“We’re sorry for the inconvenience. We’d like to look into this and help—please email {support_email} so we can follow up privately.”

**HVAC-NEG-04 (Work quality complaint, no admission)**
“Thank you for letting us know. This isn’t the experience we want customers to have. Please contact {support_email} so we can review what happened and work toward a resolution.”

**HVAC-FAKE-05**
“We take feedback seriously, but we can’t locate this job from the details provided. Please email {support_email} with any information you can share so we can investigate.”

**HVAC-RECOV-06**
“We appreciate your feedback and the opportunity to make things right. Please reach out to {support_email} so we can follow up privately.”

---

# 4) Customer-facing legitimacy reference (for outreach/use in UI)
- Website (demo/proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

This v3.0 library is the “allowed output set.” Any generated response that deviates into blocked categories (PHI confirmation, legal threats, incentives, admissions) must trigger manual-only hold and be prevented from posting.