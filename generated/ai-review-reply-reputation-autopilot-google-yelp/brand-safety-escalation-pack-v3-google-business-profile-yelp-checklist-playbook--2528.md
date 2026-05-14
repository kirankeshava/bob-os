# Brand Safety & Escalation Pack v3 (Google Business Profile + Yelp) — Checklist, Playbook, and Approved Templates (Dentist/Med Spa/HVAC)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:31:58.706Z

---

# AI Review Reply & Reputation Autopilot — Brand Safety & Escalation Pack v3
Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

## 1) Brand-Safety Checklist v3 (tick-box)
Use for **every** draft before approval and before posting. If any “HARD STOP” triggers, the system must set **post_status=blocked_manual_review** and require human handling.

### A. Platform policy (Google + Yelp) — HARD RULES
- [ ] No incentives/solicitation: **no discounts, freebies, gift cards, “mention this review,” “we’ll make it right with a deal,”** etc.
- [ ] No review gating: **do not ask only happy customers** to review; do not discourage negative reviews.
- [ ] No removal promises: do not claim you can “remove,” “take down,” “report to Yelp/Google,” or “get this deleted.”
- [ ] No competitor disparagement or comparisons (especially on Yelp): avoid “we’re better than X,” “unlike other clinics,” etc.
- [ ] No back-and-forth baiting: do not argue, insult, threaten, or accuse; do not call the reviewer a liar.

### B. Privacy/PHI/PII — HARD STOP
- [ ] Do **not** confirm the person is/was a patient/client/customer if medical/clinical context exists.
- [ ] Do **not** reference records/visit details: block phrases like “your chart/records/visit/appointment,” “we reviewed your file,” “our notes show…”.
- [ ] Do **not** include personal data (addresses, phone numbers, emails, full names of staff/patients). If reviewer doxxes, do not repeat it.
- [ ] For healthcare: no HIPAA/PHI confirmation; use generic wording: “We take privacy seriously and can’t discuss details here.”

### C. Liability and legal posture — HARD STOP
- [ ] Never admit fault or liability: avoid “we caused,” “it was our mistake,” “we broke/damaged,” “we were negligent.”
- [ ] If reviewer mentions **attorney, lawsuit, sue, legal action, demand letter, insurance claim**, then: **manual-only hold**, escalation_level=Legal, no public response unless counsel-approved.
- [ ] For alleged injury/safety incidents (shock, gas leak, infection, burn): treat as safety incident; escalate Owner/GM <4h.

### D. Medical and regulated claims (dentist/med spa)
- [ ] No guarantees/outcomes: ban “guaranteed,” “permanent,” “no risk,” “100%,” “best results.”
- [ ] No diagnosing or prescribing in replies. Keep it customer-service oriented.
- [ ] No claims of specific medical improvement (“we cured,” “you will heal faster”).

### E. Tone and de-escalation requirements
- [ ] Start with thanks/acknowledgement; keep calm, neutral, non-defensive.
- [ ] Offer offline resolution: include a **clear CTA to contact privately** (phone/email) without incentives.
- [ ] Avoid blame: no “you should have,” “you failed to,” “you misunderstood.”
- [ ] Avoid absolutes: prefer “we aim to,” “we strive to,” “we’d like to learn more.”

### F. Content integrity / hallucination control
- [ ] Do not invent facts: no staff names, no dates, no policy details unless provided by business.
- [ ] Do not claim actions taken (“we issued a refund,” “we replaced it”) unless verified.
- [ ] Keep to what’s known: mirror reviewer’s general issue; ask to continue offline.

### G. Required elements (normal cases)
- [ ] Thank reviewer.
- [ ] Apologize for experience **without admitting fault** (“Sorry to hear…”, “We’re sorry this was frustrating…”).
- [ ] Invite offline contact and provide the approved contact channel.
- [ ] Sign-off with role/brand (e.g., “— [Business Name] Team”).

### H. Posting & audit trail checks (must be logged)
- [ ] review_source + review_id captured.
- [ ] review_text_hash stored.
- [ ] detected_risk_flags recorded.
- [ ] escalation_level set correctly.
- [ ] response_mode one of: auto_draft, requires_approval, blocked_manual_review.
- [ ] human_approver_id + timestamps captured if posted.


## 2) Escalation Playbook v3 (what to do for negative scenarios)
**Escalation levels:**
- **L0 (Auto/Normal):** routine positive/neutral/mild complaints.
- **L1 (Ops/Billing):** service quality, scheduling, rude staff claims, billing disputes.
- **L2 (Owner/GM):** safety incidents, discrimination/harassment claims, serious allegations, repeat patterns.
- **L3 (Legal):** legal threats, explicit demand letters, “my attorney,” “I will sue,” insurance claims.

### Routing SLAs
- L1 Ops/Billing: acknowledge internally <24h; propose resolution plan <48h.
- L2 Owner/GM: respond internally <4h for safety; otherwise <24h.
- L3 Legal: same-day; **do not post publicly** until approved.

### DO NOT POST conditions (public response blocked)
- PHI/clinical details present or reviewer identity confirmation risk.
- Legal threat language present.
- Active safety investigation where public response could prejudice facts.
- Reviewer posts personal data; do not repeat—escalate.

### Evidence collection checklist (internal)
- Review URL + screenshot.
- Order/invoice/work order reference (internal only).
- Staff involved (internal only).
- Timeline (internal only).
- Prior communications.

### Scenario guidance (public response posture)
1) **Billing dispute (L1 Billing)**
- Public: empathize, invite offline to review account; no policy lecturing.
- Internal: verify charges, propose adjustment if warranted.

2) **Service quality / rude staff (L1 Ops)**
- Public: apologize for frustration; commit to learning; offline contact.
- Internal: pull schedule, training note, follow-up call.

3) **Alleged damage/injury/safety (L2 Owner/GM)**
- Public: acknowledge concern; do not admit; ask to contact directly.
- Internal: incident report, photos, vendor notes; determine next steps.

4) **Discrimination/harassment claim (L2 Owner/GM)**
- Public: take seriously; invite offline; avoid debate.
- Internal: HR review, witness statements.

5) **Suspected fake review/competitor (L1 Ops; sometimes L2)**
- Public: polite, minimal; do not accuse; invite offline for details.
- Internal: check records; report via platform tools (outside autopilot).

6) **Legal threat (L3 Legal)**
- Public: **blocked_manual_review**. If counsel approves, use a minimal neutral response.

### Internal escalation message templates (copy/paste)
**To Billing (L1):**
Subject: Review Escalation — Billing Dispute
Body: A new review alleges a billing issue. Please verify the invoice/account internally and propose a resolution plan within 48h. Do not share customer details publicly. Link: {review_url}. Risk flags: {flags}.

**To Owner/GM (L2 Safety/Serious):**
Subject: Urgent Review Escalation — Safety/Serious Allegation
Body: A review alleges a safety/serious incident. Please acknowledge internally within 4h and initiate an incident review. Public response must avoid liability admission. Link: {review_url}. Flags: {flags}.

**To Legal (L3):**
Subject: Legal Hold — Review Contains Legal Threat
Body: Review includes legal threat language ({trigger_terms}). System set blocked_manual_review. Please advise whether to post any response and provide approved wording. Link: {review_url}. Flags: {flags}.


## 3) Approved Response Templates v3 (per vertical)
**Global allowed variables:** {business_name}, {contact_email} (or phone if provided by business), {signoff_role}.
**Disallowed variables:** reviewer name (unless only first name and already public and approved), staff names, appointment dates, procedure details, invoice amounts unless verified and pre-approved.

### 3A) Dentist (Google/Yelp)
**DEN-POS-01 (Positive)**
“Thank you for the kind words. We’re glad you had a great experience. If there’s ever anything we can do to help, please reach out at {contact_email}. — {business_name} Team”

**DEN-NEU-02 (Neutral/short)**
“Thank you for your feedback. We’re always working to improve, and we’d appreciate the chance to learn more. Please contact us at {contact_email}. — {business_name} Team”

**DEN-NEG-03 (Mild negative: wait time/communication)**
“Thank you for sharing this. We’re sorry to hear your experience was frustrating. We take feedback seriously and would like to learn more so we can improve. Please contact us at {contact_email}. — {business_name} Team”

**DEN-NEG-04 (Strong negative, privacy-safe)**
“We’re sorry to hear about your concerns. For privacy reasons, we can’t discuss details here, but we’d like the opportunity to address this directly. Please reach out at {contact_email}. — {business_name} Team”

**DEN-FAKE-05 (Suspected fake/no record—no accusation)**
“Thank you for your review. We’d like to understand what happened, but we can’t identify the situation from what’s shared here. Please contact us at {contact_email} so we can look into it. — {business_name} Team”

**DEN-LEGAL-06 (Legal threat—manual only, if counsel approves)**
“Thank you for your message. We take concerns seriously and would like to address this directly. Please contact us at {contact_email}. — {business_name} Team”
(Only post if Legal approves; otherwise blocked.)

### 3B) Med Spa (Google/Yelp)
**SPA-POS-01 (Positive)**
“Thank you for the review. We’re happy you enjoyed your experience. If you ever have questions or feedback, reach us at {contact_email}. — {business_name} Team”

**SPA-NEU-02 (Neutral)**
“Thank you for your feedback. We’d like to learn more and see how we can improve. Please contact us at {contact_email}. — {business_name} Team”

**SPA-NEG-03 (Mild negative: scheduling/front desk)**
“We’re sorry to hear this was frustrating. We strive to provide a smooth experience and would appreciate the chance to make it right. Please contact us at {contact_email}. — {business_name} Team”

**SPA-NEG-04 (Results dissatisfaction—no guarantees/medical claims)**
“Thank you for sharing your feedback. We’re sorry you’re unhappy with your experience. We’d like to discuss your concerns directly and see how we can help. Please contact us at {contact_email}. — {business_name} Team”

**SPA-PRIV-05 (Privacy/PHI risk)**
“For privacy reasons, we can’t discuss details in a public forum. We take your concerns seriously and would like to connect directly. Please reach out at {contact_email}. — {business_name} Team”

**SPA-FAKE-06 (Suspected fake)**
“Thank you for your review. We want to understand what happened, but we can’t confirm details publicly. Please contact us at {contact_email} so we can look into this. — {business_name} Team”

### 3C) HVAC (Google/Yelp)
**HVAC-POS-01 (Positive)**
“Thanks for the review. We appreciate your business and are glad we could help. If you need anything else, contact us at {contact_email}. — {business_name} Team”

**HVAC-NEU-02 (Neutral)**
“Thank you for the feedback. We’re always improving and would like to learn more about your experience. Please reach out at {contact_email}. — {business_name} Team”

**HVAC-NEG-03 (Late/No-show)**
“We’re sorry to hear about the scheduling issue. We aim to be on time and communicate clearly. Please contact us at {contact_email} so we can look into this and follow up. — {business_name} Team”

**HVAC-NEG-04 (Quality concern / callback request)**
“Thank you for letting us know. We’re sorry this was frustrating and would like to make it right. Please contact us at {contact_email} so we can review the situation and next steps. — {business_name} Team”

**HVAC-DAMAGE-05 (Alleged damage—no admission)**
“We’re sorry to hear about your concern. We take this seriously and would like to learn more so we can review what happened. Please contact us at {contact_email}. — {business_name} Team”

**HVAC-FAKE-06 (Suspected fake—no accusation)**
“Thank you for your review. We’d like to understand this better, but we can’t identify the job from what’s shared here. Please contact us at {contact_email} so we can look into it. — {business_name} Team”


## 4) Policy Alignment Appendix (testable acceptance criteria)
### Google Business Profile
- Must not include incentives for reviews or imply rewards.
- Must not reveal personal info.
- Should be professional; avoid spam/promotional excess.

### Yelp
- Avoid “platform enforcement” statements (no promises about removals).
- Avoid public arguments and competitor call-outs.
- Keep replies helpful and non-transactional; no incentives.

### Examples of banned vs safe phrasing
- Banned: “We reviewed your chart and you were late.”
  Safe: “We can’t discuss details here, but we’d like to learn more—please contact us at {contact_email}.”
- Banned: “We’ll give you 20% off to fix this.”
  Safe: “Please contact us so we can address your concerns directly.”
- Banned: “This is a fake review from a competitor.”
  Safe: “We’d like to understand what happened—please contact us so we can look into it.”

## 5) Operational note (how to use this pack)
1) Generate draft → run checklist gates.
2) If HARD STOP: set blocked_manual_review, escalate per playbook.
3) If not blocked: require approval for negative reviews; post only after approval.
4) Log all events/fields required for audit trail and weekly KPI reconciliation.
