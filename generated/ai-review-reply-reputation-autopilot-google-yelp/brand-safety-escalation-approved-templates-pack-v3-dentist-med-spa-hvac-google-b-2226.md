# Brand Safety + Escalation + Approved Templates Pack v3 (Dentist / Med Spa / HVAC) — Google Business Profile + Yelp

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:18:46.436Z

---

# AI Review Reply & Reputation Autopilot — Compliance Pack v3

**Scope:** Google Business Profile (GBP) and Yelp review responses for **Dentist**, **Med Spa**, and **HVAC**. This pack includes (1) Brand-Safety Checklist, (2) Escalation Playbook, and (3) Approved Response Templates (Google+Yelp variants). Designed for an MVP that drafts and (when allowed) posts responses; requires a strict audit trail and the ability to block posting.

---

## 1) Brand-Safety Checklist v3 (Operational Tick-Box)

### A. Global “Never Do” Rules (All Verticals, All Platforms)
- [ ] **No admission of liability** (no “we were at fault,” “we caused,” “our mistake caused damage/injury”). Use non-admission language: “We’re sorry to hear this” + “we’d like to learn more.”
- [ ] **No confirmation of identity or service** for sensitive contexts: do not confirm someone is/was a patient or customer when PHI/medical context is possible.
- [ ] **No PHI/PII**: do not include appointment dates, procedures, diagnosis, prescriptions, address, phone, email, invoice numbers, or staff last names; do not repeat doxxing content from the review.
- [ ] **No threats/retaliation/harassment**; no arguing; no sarcasm; no “you’re lying.”
- [ ] **No incentives**: do not offer discounts, refunds, gifts, giveaways, free services, or contests in exchange for reviews. (Also avoid “we’ll make it worth your while.”)
- [ ] **No review gating/manipulation**: do not ask only happy customers to review; do not suggest changing/removing a review; do not imply platform enforcement.
- [ ] **No competitor disparagement**: no comparisons or accusations against other businesses.
- [ ] **No prohibited claims**: no medical outcome guarantees; no “cure,” “guaranteed results,” “permanent,” “zero risk,” etc.
- [ ] **No legal positioning**: if the review contains legal threats (“lawsuit,” “attorney,” “sue”), response must be **MANUAL-ONLY HOLD**.

### B. Required Elements for Safe Responses
- [ ] **Thank/acknowledge**: brief, calm acknowledgment.
- [ ] **Empathy without admission**: “Sorry to hear…” not “We’re sorry we did…”
- [ ] **Offline CTA** (mandatory for neutral/negative): invite contact via official channel (phone/email) without publishing personal info.
- [ ] **No specifics**: keep response general; do not reference records/visits/“your case.”
- [ ] **Brand-safe tone**: professional, non-inflammatory, no caps, no blame.

### C. Hard Block / Manual-Only Hold Triggers (Must Not Auto-Post)
**Auto-set `post_status = blocked_manual_review` and `response_mode = hold` when any are detected:**
- [ ] **Legal threat** terms: “attorney,” “lawyer,” “lawsuit,” “sue,” “court,” “legal action,” “served papers.”
- [ ] **Safety incident / injury**: “injured,” “hurt,” “hospital,” “fire,” “gas leak,” “electrocuted,” “unsafe,” “assault.”
- [ ] **PHI confirmation risk** phrases in draft such as: “we reviewed your chart/records/visit,” “after looking at your file,” “our notes show…” (Draft must be blocked and regenerated with generic language.)
- [ ] **Harassment/hate speech** or explicit threats.
- [ ] **Requests to publish private info** (names, addresses, screenshots of invoices, etc.).

### D. Platform-Specific Constraints
#### Google Business Profile (GBP)
- [ ] Do not mention private account data.
- [ ] Do not accuse the reviewer of fraud publicly; use neutral “we can’t locate this experience” language.

#### Yelp
- [ ] **Do not promise Yelp will remove reviews**; do not discuss moderation enforcement.
- [ ] Avoid “please update your Yelp review” / “change your rating.”
- [ ] Keep it civil and brief; Yelp audiences are sensitive to “corporate-speak.”

### E. Banned Phrases (Replace With Safer Alternatives)
- **Banned:** “We reviewed your chart/records/visit,” “according to our records,” “you were seen on [date].”
  - **Use:** “We take feedback seriously and would like to learn more.”
- **Banned:** “That didn’t happen,” “you’re lying,” “this is false.”
  - **Use:** “We can’t find details matching this description; please contact us so we can look into it.”
- **Banned:** “We will sue,” “defamation,” “our lawyer.”
  - **Use:** (Manual-only hold; no public response without approval.)
- **Banned:** “We’ll give you a discount/refund/free service if…”
  - **Use:** “Please contact us directly to discuss options.”

---

## 2) Escalation Playbook v3

### Escalation Levels
- **L1 (Standard):** Positive/neutral or mild complaints; safe to auto-post with templates.
- **L2 (Service Recovery):** Strong negative but non-legal/non-safety; requires manager review within 24h; can post after approval.
- **L3 (Sensitive):** Billing disputes with explicit amounts, accusations of discrimination, suspected fake review, staff misconduct allegations; requires owner/GM review within 12h; post only after approval.
- **L4 (Hold / Do Not Post):** Legal threats, safety incidents/injury, PHI/identity exposure, harassment/hate speech, active investigation; **block posting** and route same-day.

### Routing SLAs (Internal)
- **Owner/GM:** L3 within 12h; L4 within 4h.
- **Billing lead:** billing disputes within 24h.
- **Clinical/privacy officer (medical):** PHI/privacy within 4h.
- **Ops/Service manager (HVAC):** damage/quality within 24h; safety within 4h.
- **Legal (as needed):** L4 legal threats same-day.

### Evidence Checklist (Collect Before Any Public Reply for L3/L4)
- Reviewer username + platform + date
- Review text screenshot
- Internal ticket/CRM lookup results (do not paste into public reply)
- Staff on duty (internal)
- Any photos, invoices, work orders (internal)
- Prior communications log

### Scenario Guidance
1) **PHI/Privacy Mention (Dentist/Med Spa)**
- **Escalation:** L4
- **Do not post** any reply that confirms they were a patient.
- **Safe approach:** generic: “We take privacy seriously. Please contact our office directly so we can address your concerns.”

2) **Medical Outcome Dissatisfaction (Med Spa / Dentist)**
- **Escalation:** L2 (if no safety/legal)
- Avoid guarantees; avoid discussing treatment specifics.
- Offer offline resolution and follow-up.

3) **Billing/Price Dispute**
- **Escalation:** L2 or L3 if explicit amounts/refund demands/chargebacks
- Never disclose amounts publicly; invite offline.

4) **Alleged Damage (HVAC property damage)**
- **Escalation:** L3; L4 if injury/safety hazard
- No liability admission; request offline contact; open a claim internally.

5) **Discrimination/Harassment Allegation**
- **Escalation:** L3
- Acknowledge seriousness; invite offline; route to owner/HR.

6) **Suspected Fake Review / Not a Customer**
- **Escalation:** L3
- Do not accuse; say you can’t locate the experience and invite contact.

7) **Legal Threat**
- **Escalation:** L4
- **Manual-only hold**. Do not engage substantively in public.

---

## 3) Approved Response Templates v3

**Template rules:**
- Allowed variables (if available/verified): `{business_name}`, `{support_email}`, `{support_phone}`, `{signoff_name}`, `{signoff_role}`.
- **Banned variables:** reviewer name (unless already public and low-risk), appointment dates, procedure names, prices/invoice numbers, staff full names, diagnosis/outcomes.
- **Offline CTA required** for neutral/negative.

### Dentist Templates
**DENT-G-POS-01 (GBP Positive)**
“Thank you for the kind words and for choosing {business_name}. We’re glad you had a great experience, and we appreciate you taking the time to share it.”

**DENT-Y-POS-01 (Yelp Positive)**
“Thanks for the great feedback. We appreciate you choosing {business_name}.”

**DENT-G-NEU-01 (Neutral/short)**
“Thanks for the feedback. If there’s anything we can do to improve your experience, please reach us at {support_phone} or {support_email} so we can help.”

**DENT-G-NEG-01 (Mild negative – service experience)**
“We’re sorry to hear this. We take feedback seriously and would like to learn more so we can address it. Please contact {business_name} at {support_phone} or {support_email}.”

**DENT-G-NEG-STR-01 (Strong negative – non-PHI, non-legal)**
“Thank you for bringing this to our attention. We’re sorry your experience didn’t meet expectations. We can’t discuss details here, but we’d like to connect directly and work toward a resolution. Please contact us at {support_phone} or {support_email}.”

**DENT-G-FAKE-01 (Suspected fake / can’t locate)**
“Thanks for the review. We’re unable to identify an experience matching what’s described, but we want to look into it. Please contact {business_name} at {support_phone} or {support_email} with details so we can help.”

**DENT-G-PHI-HOLD (PHI/privacy mention — HOLD, not for auto-post)**
“Thank you for the feedback. We take privacy seriously and can’t address this here. Please contact our office directly at {support_phone} or {support_email} so we can assist.”

### Med Spa Templates
**SPA-G-POS-01**
“Thank you for the wonderful review. We’re glad you enjoyed your experience at {business_name} and appreciate you sharing your feedback.”

**SPA-Y-POS-01**
“Thank you for the kind feedback. We appreciate you coming to {business_name}.”

**SPA-G-NEG-OUTCOME-01 (Dissatisfied with results; no claims)**
“We’re sorry to hear you’re disappointed. We’d like to learn more and see how we can help. Please contact us at {support_phone} or {support_email} so we can discuss options privately.”

**SPA-G-NEG-SERVICE-01 (Front desk/wait time)**
“Thanks for sharing this. We’re sorry the experience fell short. Please reach out to {support_phone} or {support_email} so we can follow up and improve.”

**SPA-G-FAKE-01**
“Thank you for the review. We can’t find details that match this experience, but we want to understand what happened. Please contact {business_name} at {support_phone} or {support_email}.”

**SPA-G-PHI-HOLD (Privacy mention — HOLD)**
“Thank you for the feedback. We take privacy seriously and can’t address personal matters here. Please contact us directly at {support_phone} or {support_email}.”

### HVAC Templates
**HVAC-G-POS-01**
“Thanks for the great review and for choosing {business_name}. We’re glad our team could help, and we appreciate your trust.”

**HVAC-Y-POS-01**
“Thank you for the review. We appreciate you choosing {business_name}.”

**HVAC-G-NEG-QUALITY-01 (Work quality complaint)**
“We’re sorry to hear this. We’d like to understand what happened and make things right if we can. Please contact us at {support_phone} or {support_email} so we can follow up.”

**HVAC-G-NEG-DAMAGE-01 (Property damage allegation; non-admission)**
“Thank you for letting us know. We’re sorry to hear about your concerns. We can’t discuss details here, but we want to look into this promptly. Please contact {business_name} at {support_phone} or {support_email} so we can assist.”

**HVAC-G-FAKE-01**
“Thanks for your feedback. We’re unable to match this to a recent job, but we want to investigate. Please contact us at {support_phone} or {support_email} with details.”

**HVAC-G-SAFETY-HOLD (Gas leak/fire/injury — HOLD)**
“Thank you for the feedback. We take safety concerns seriously and need to address this directly. Please contact {business_name} immediately at {support_phone} so we can assist.”

---

## Implementation Notes (Minimal Acceptance Criteria)
- Any **L4** scenario must enforce **manual-only hold** at both **pre-post UI** and **API** layers.
- If a draft contains banned PHI-confirmation phrases (“chart/records/visit/file/notes show…”), system must **block and regenerate** using generic wording.
- Audit log must store: source (GBP/Yelp), review_id, review_text_hash, risk_flags, escalation_level, response_mode, approver_id, timestamps (draft/approve/post/block), and detector/prompt versions.

If you want these templates embedded into onboarding/customer comms, direct customers to: **https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1** and have them contact **agent_bob_replit+review-bot@agentmail.to** for setup and policy questions.
