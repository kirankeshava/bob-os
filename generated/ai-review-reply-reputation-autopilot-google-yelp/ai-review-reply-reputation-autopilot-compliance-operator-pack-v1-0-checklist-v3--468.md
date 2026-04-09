# AI Review Reply & Reputation Autopilot — Compliance Operator Pack v1.0 (Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + Policy Matrix + QA Closure)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:19:37.749Z

---

## 1) Brand-Safety Checklist v3 (Tick-box)
Use this before approving/posting any response. If any “HARD STOP” condition triggers, set status=blocked_manual_review and escalate.

### A. HARD STOP (Manual-only hold; do not post)
- [ ] Mentions legal action: “attorney/lawyer”, “lawsuit”, “sue”, “served”, “demand letter”, “court”, “BBB complaint” + legal threats.
- [ ] Any PHI/HIPAA risk (healthcare): reviewer names a patient, procedure, diagnosis, appointment, insurance, or staff references “your visit/records/chart/x-ray”.
- [ ] Safety incident with injury/property damage allegation requiring investigation: “hurt/injured”, “fire”, “gas leak”, “carbon monoxide”, “flood”, “damage to my home”, “burned”, “electrical hazard”.
- [ ] Harassment/hate speech/violent threats or self-harm content.
- [ ] Requests for personal data exchange publicly (phone/email/address), or reviewer posts personal data that must not be repeated.

### B. Prohibited content (must never appear)
- [ ] **No incentives/solicitation:** “discount”, “coupon”, “free”, “gift card”, “refund if you remove/update”, “we’ll compensate for a 5-star review”.
- [ ] **No review gating:** “Only leave a review if satisfied”, “Contact us before reviewing”.
- [ ] **No removal promises:** “We can get Yelp/Google to remove this”, “We reported you and it will be taken down”.
- [ ] **No competitor disparagement:** “Our competitor is worse”, “They’re lying”.
- [ ] **No liability admission:** “We were at fault”, “We caused…”, “We made a mistake that…”, “We neglected…”.
- [ ] **No medical outcome guarantees:** “guaranteed results”, “permanent”, “cure”, “100% safe”, “no risk”.
- [ ] **No PHI confirmation:** “We reviewed your chart/records/visit”, “As your dentist…”, “We saw you on [date]”.
- [ ] **No doxxing:** never repeat or confirm addresses, full names, phone numbers, invoices, appointment times.

### C. Required response elements (when posting is allowed)
- [ ] Polite, non-argumentative, non-inflammatory tone.
- [ ] Thank the reviewer (even if negative) without sarcasm.
- [ ] For negatives: acknowledge experience *without admitting facts*: “We’re sorry to hear you felt…”
- [ ] Move offline: provide a contact path (phone/email) and request details privately.
  - Use business contact: **agent_bob_replit+review-bot@agentmail.to**
- [ ] No specifics about the reviewer’s situation unless already explicitly in the review and not sensitive.
- [ ] If suspected fake: neutral wording, invite offline verification, no accusations.

### D. Phrase blocks (never use; replace with safe alternatives)
- Block: “we reviewed your records/chart/visit/appointment” → Use: “We can’t discuss details here, but we’d like to look into this privately.”
- Block: “you’re wrong/that didn’t happen” → Use: “We understand perspectives can differ; we’d like to learn more.”
- Block: “refund/discount for updating/removing” → Use: “Please contact us so we can address your concerns.”
- Block: “we reported you to Yelp/Google” → Use: “If you’re open to it, please contact us directly to discuss.”

---
## 2) Escalation Playbook v3 (Decision Tree + SLAs)

### Severity Levels
- **L0 – Normal:** positive/neutral, no risk flags. Autopost allowed after human approval (or auto-approve if configured).
- **L1 – Mild negative:** service dissatisfaction, wait times, rudeness (no legal/PHI/safety). Post allowed with offline CTA.
- **L2 – Strong negative:** demands refund, claims incompetence, threatens bad PR (no legal/PHI/safety). Post allowed with careful non-admission language + offline CTA.
- **L3 – Investigation required:** property damage allegation, discrimination claim, repeated pattern accusations, suspected fraud. Default to manual review; may post a minimal holding statement if no HARD STOP.
- **L4 – HARD STOP:** legal threats, PHI/HIPAA, safety injury, harassment/violent threats. **blocked_manual_review**; do not post.

### Routing & SLAs
- L0: Ops/Front Desk same-day.
- L1: Ops Manager <24h.
- L2: Owner/GM <24h (or department lead).
- L3: Owner/GM <4h; gather evidence before responding.
- L4: Legal/Compliance same-day; internal incident log immediately.

### Evidence checklist (collect before response for L2+)
- Who/what/when: job ID/appointment ID (internal only), staff involved, timestamps.
- Any photos, invoices, call logs.
- Prior communications.
- For medical: ensure **no PHI is used in public**.

### Scenario guidance
1) **Billing dispute / refund demand (L2)**
- Public response pattern: acknowledge, avoid numbers unless verified and user already posted, move offline.
- Do not: argue line-by-line, disclose charges.

2) **Staff rudeness / wait time (L1/L2)**
- Apologize for experience, state you’re reviewing internally (without “we investigated your visit”).
- Offer offline channel.

3) **Alleged damage/injury (L3/L4 depending on severity)**
- If safety hazard/injury: L4 hold.
- Otherwise L3: minimal response + request offline contact; do not admit.

4) **Discrimination/harassment allegation (L3)**
- Acknowledge seriousness, state commitment to respectful service, invite offline discussion, escalate internally.

5) **Suspected fake/competitor review (L2/L3)**
- Never accuse. Say you can’t locate the experience and invite contact to verify.

6) **Medical outcome complaint (Dentist/Med Spa) (L2/L4 if PHI)**
- Never confirm patient relationship.
- Use: “We can’t discuss details here. Please contact us so we can address this.”

### “DO NOT POST” conditions recap
- Any PHI confirmation risk, legal threats, safety injury, or harassment → blocked_manual_review.

---
## 3) Platform Policy Alignment Matrix (Google Business Profile vs Yelp)

### Universal (Both)
- No incentives for reviews.
- No review gating.
- No personal data disclosure.
- No threats/retaliation.
- Keep responses respectful; do not escalate conflict.

### Google Business Profile notes (operational criteria)
- OK to invite offline contact; avoid promotional offers tied to reviews.
- Do not claim you can remove reviews.
- Avoid disclosing customer relationship in healthcare contexts.

### Yelp notes (operational criteria)
- Avoid language that implies review manipulation: “please update/remove your review”.
- Do not mention Yelp enforcement actions or promise takedowns.
- Keep responses factual, calm, and short; do not argue.

Acceptance criteria (testable)
- Response contains **no**: discount/incentive terms; removal promises; competitor insults; PHI confirmation.
- Negative responses include an offline CTA and a non-admission acknowledgment.

---
## 4) Approved Response Templates v3 (Per vertical)
**Rules for all templates:**
- Allowed variables: {BusinessName}, {ContactEmail}, {Phone}, {City}, {TeamName}
- Disallowed variables: customer name, appointment date/time, procedure/service details (healthcare), invoice totals unless user posted and verified.
- Required: offline CTA for neutral/negative.

### A) Dentist Templates (DENT-*)
**DENT-POS-01 (Positive)**
“Thank you for the kind words and for choosing {BusinessName}. We’re glad you had a great experience, and we appreciate you taking the time to share this.”

**DENT-NEU-01 (Neutral/short)**
“Thanks for your feedback. If there’s anything we can do to improve your experience, please reach us at {ContactEmail} so we can help.”

**DENT-NEG-01 (Mild negative)**
“We’re sorry to hear you felt disappointed. We take feedback seriously and would like to understand what happened. Please contact us at {ContactEmail} so we can discuss this privately.”

**DENT-NEG-02 (Strong negative; no PHI confirmation)**
“Thank you for sharing your concerns. We can’t address details in a public forum, but we want to look into this and make things right where possible. Please email {ContactEmail} with a good way to reach you.”

**DENT-FAKE-01 (Suspected fake/unmatched)**
“Thank you for the review. We’re unable to identify the situation from what’s written here, but we’d like to understand and address any real concern. Please contact {ContactEmail} so we can follow up directly.”

**DENT-REC-01 (Service recovery)**
“We appreciate you bringing this to our attention. Our goal is a respectful, high-quality experience for everyone. Please reach out at {ContactEmail} so we can learn more and work toward a resolution.”

### B) Med Spa Templates (MED-*)
**MED-POS-01**
“Thank you for the wonderful feedback. We’re happy you enjoyed your experience at {BusinessName} and we appreciate your support.”

**MED-NEU-01**
“Thanks for your review. If you’re open to sharing more, please email us at {ContactEmail} so we can continue improving.”

**MED-NEG-01 (Mild negative)**
“We’re sorry to hear this didn’t meet your expectations. We’d like to learn more and help if we can—please contact {ContactEmail} so we can discuss privately.”

**MED-NEG-02 (Strong negative; no outcomes/guarantees)**
“Thank you for raising your concerns. We can’t discuss details here, but we take this seriously and want to understand what happened. Please reach us at {ContactEmail} with your preferred contact information.”

**MED-FAKE-01**
“We appreciate you sharing this. We’re not able to confirm details publicly, and we can’t locate the situation from this review alone. Please contact {ContactEmail} so we can look into it.”

**MED-REC-01**
“Our team aims to provide a safe, professional experience. We’d like the opportunity to discuss your feedback and see what we can do next—please email {ContactEmail}.”

### C) HVAC Templates (HVAC-*)
**HVAC-POS-01**
“Thank you for the great review and for choosing {BusinessName}. We appreciate your trust and we’re glad we could help.”

**HVAC-NEU-01**
“Thanks for the feedback. If there’s anything we can clarify or improve, please contact us at {ContactEmail}.”

**HVAC-NEG-01 (Mild negative)**
“We’re sorry to hear you weren’t satisfied. We’d like to understand what happened and see how we can help—please email {ContactEmail} with the best way to reach you.”

**HVAC-NEG-02 (Strong negative; avoid blame/liability)**
“Thank you for sharing your concerns. We take this seriously and want to review what occurred. Please contact {ContactEmail} so we can discuss details privately and work toward a resolution.”

**HVAC-FAKE-01**
“Thanks for the review. We’re unable to match this to a service interaction based on the information provided, but we’d like to understand and address any real issue. Please reach us at {ContactEmail}.”

**HVAC-REC-01 (Service recovery)**
“We appreciate you bringing this to our attention. Our goal is clear communication and quality work. Please contact {ContactEmail} so we can follow up and make this right where possible.”

---
## 5) QA Closure Addendum (Regression + Versioning)

### Regression triggers (must re-run suite)
- Any change to prompts/system instructions.
- Any change to blocked phrase lists or detectors.
- Any change to template text or allowed variables.
- Any change to posting/approval gates or audit logging.

### Versioning rules
- Templates: semantic version (e.g., v3.0). Increment minor for wording tweaks, major for policy behavior changes.
- Detectors/blocked phrases: versioned list with changelog and effective date.
- Audit trail: schema version; backward compatibility required for KPI reports.

### Required evidence for compliance sign-off
- Exported audit logs showing: draft_created → flagged/hold (if any) → approved/blocked → posted.
- Weekly report output with reconciliation: approved vs posted vs blocked counts match logs.
- Pass report: 45-case core suite + Yelp edge addendum at 100% post-change.

---
## Reference (for customer-facing legitimacy in any comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to
