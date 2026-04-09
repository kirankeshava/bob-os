# Brand-Safety + Escalation + Approved Templates Pack v3 (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:47:15.698Z

---

## 1) Brand-Safety Checklist v3 (Operational, Tick-Box)

### A. Universal rules (apply to every response)
- [ ] **Be polite, brief, and non-argumentative.** No sarcasm, blame, shaming, or public debate.
- [ ] **No liability admission.** Avoid “we messed up,” “our fault,” “we caused,” “we damaged,” “we injured.”
  - Safe alternatives: “We’re sorry to hear you had this experience.” / “We’d like to learn more and address your concerns.”
- [ ] **No personal data / doxxing.** Do not include phone numbers of staff, addresses beyond public business address, appointment times, invoices, last names, license IDs, etc.
- [ ] **No naming employees or customers** unless the reviewer already named them and the business policy explicitly allows first-name only (still recommended: avoid).
- [ ] **No incentives / review gating / discount offers** tied to review change or removal.
  - Block phrases: “discount,” “coupon,” “free,” “gift,” “refund if you update,” “we’ll give you,” “in exchange for.”
- [ ] **No promises of removal / platform enforcement.**
  - Block: “we’ll get this removed,” “Yelp/Google will take it down,” “reporting you to Yelp/Google.”
- [ ] **No competitor disparagement.**
  - Block: “our competitors,” “they are lying,” “they’re worse,” “fake competitor.”
- [ ] **Mandatory offline CTA** for anything other than simple praise.
  - Required pattern: invite contact + keep details private + no request to change review.

### B. Healthcare-specific safety (Dentist, Med Spa)
- [ ] **No PHI confirmation** (HIPAA-adjacent): do not confirm they are a patient, had a procedure, visited on a date, or reference charts/records.
  - Hard-block phrases: “your chart,” “your records,” “your visit,” “we reviewed your file,” “according to your medical history.”
  - Safe alternative: “For privacy reasons, we can’t discuss details here, but we’d like to help offline.”
- [ ] **No medical guarantees/outcome claims.**
  - Block: “guaranteed,” “permanent,” “100%,” “cure,” “no risk,” “best results.”
- [ ] **No clinical advice** in public replies; no diagnosis.

### C. HVAC/trades safety
- [ ] **No admission of property damage or safety hazard** in public.
  - Safe: acknowledge concern + invite offline review + commit to inspection process.
- [ ] **No claims of certification/permit status unless verified.**

### D. Legal/harassment/safety incidents (all verticals)
- [ ] If review contains **legal threat** (“attorney,” “lawsuit,” “sue,” “court,” “demand letter”):
  - Set response mode to **MANUAL-ONLY HOLD** (do not auto-post).
  - Escalation_level=Legal.
- [ ] If review alleges **discrimination, harassment, violence, self-harm, or threats**:
  - MANUAL-ONLY HOLD; escalate to Owner/GM immediately.
- [ ] If reviewer posts **explicit personal details**: do not repeat them; recommend offline.

### E. Platform alignment notes
- Google Business Profile: keep responses helpful, do not spam, avoid promotional language.
- Yelp: do not mention Yelp “filter,” “review removal,” or imply retaliatory action; keep it factual and calm.

---

## 2) Escalation Playbook v3 (Scenarios, Routing, SLAs, Do-Not-Post)

### Escalation levels
- **L0 (No escalation):** Positive/neutral; safe to auto-post.
- **L1 (Ops follow-up):** Service complaint, scheduling issues, mild dissatisfaction; auto-draft ok, post allowed.
- **L2 (Sensitive):** Refund demands, staff misconduct allegation, suspected fake review, property damage claim; draft ok but require human approval.
- **L3 (Legal/Safety/PHI):** Legal threats, discrimination/harassment, safety incidents, PHI/medical-detail risk; **MANUAL-ONLY HOLD**.

### DO-NOT-POST conditions (always hold)
- Any PHI confirmation risk (healthcare) or detailed medical discussion.
- Any legal threat language.
- Any threat/harassment/discrimination claim that could escalate.
- Any admission of fault that implies liability.

### Routing + SLAs (internal)
- **Safety incidents / threats:** Owner/GM notified **<4h**.
- **Service quality failures:** Ops Manager **<24h**.
- **Billing/pricing disputes:** Billing lead **<24h**.
- **Legal threats:** Legal contact same-day (or Owner/GM if no counsel).

### Evidence checklist (before replying offline)
- Review screenshot + URL + timestamp
- Work order/appointment lookup (only internally)
- Staff statements (internal)
- Any call logs/messages
- Photos (HVAC) / intake notes (healthcare) kept internal

### Response posture by scenario
1) **Billing dispute:** Empathy + invite offline; no price breakdown unless reviewer already posted it and business confirms.
2) **Alleged damage/injury:** Do not admit; acknowledge concern; offer offline review; hold if severe.
3) **Suspected fake review:** Do not accuse; request offline details; optionally: “We can’t locate this experience; please contact us so we can investigate.”
4) **Discrimination claim:** Hold; leadership review; response must be minimal, non-defensive.

---

## 3) Approved Response Templates v3 (Per Vertical)

### Global template variables (allowed)
- {business_name}
- {support_email} (use: agent_bob_replit+review-bot@agentmail.to)
- {support_phone} (optional)
- {city} (optional)
- {signature_name} (first name only, e.g., “Bob”)

### Prohibited variables
- Customer name, appointment date/time, procedure name, diagnosis, invoice number, technician name, staff last names, internal policy threats.

---

## Dentist (Google/Yelp) — Template Set

**DENT-01 Positive (Auto-post OK)**
“Thank you for the kind words. We’re glad you had a great experience at {business_name}. We appreciate you taking the time to leave a review.”

**DENT-02 Neutral/Short (Auto-post OK)**
“Thanks for your feedback. If there’s anything we can do to improve your experience, please reach out to us at {support_email} so we can help.”

**DENT-03 Mild Negative (Human approval recommended)**
“We’re sorry to hear this didn’t meet your expectations. For privacy reasons we can’t discuss details here, but we’d like to learn more and make this right. Please contact us at {support_email}.”

**DENT-04 Strong Negative (Hold if PHI/records mentioned)**
“We’re concerned to hear this. To protect everyone’s privacy, we can’t address specifics in a public reply. Please email {support_email} so our team can review your concerns and follow up directly.”

**DENT-05 Suspected Fake/Unknown Patient (Human approval recommended)**
“Thank you for the note. We’re not able to confirm details in a public forum, and we’re currently unable to identify this experience from the information provided. Please contact us at {support_email} so we can look into it.”

**DENT-06 Legal Threat (MANUAL-ONLY HOLD)**
Do not auto-post. Suggested draft for manual review: “We take concerns seriously and want to address this appropriately. Please contact {support_email} so we can follow up directly.”

---

## Med Spa (Google/Yelp) — Template Set

**SPA-01 Positive (Auto-post OK)**
“Thank you for your review. We’re happy to hear you enjoyed your experience at {business_name}. We appreciate your support.”

**SPA-02 Neutral (Auto-post OK)**
“Thanks for the feedback. If you’re open to sharing more, please contact us at {support_email} so we can continue improving.”

**SPA-03 Mild Negative (Human approval recommended)**
“We’re sorry to hear this wasn’t what you expected. For privacy reasons, we can’t discuss details here, but we’d like to understand what happened. Please email {support_email}.”

**SPA-04 Outcome/Results Complaint (Hold if medical/records details appear)**
“Thank you for sharing your concerns. We can’t address specifics in a public reply, but we’d like to learn more and help. Please contact {support_email} so our team can follow up.”

**SPA-05 Staff Conduct Allegation (L2, human approval)**
“We’re sorry to hear this feedback. We take service concerns seriously and would like to look into it. Please reach out at {support_email} so we can follow up directly.”

**SPA-06 Legal/Threat/Harassment (MANUAL-ONLY HOLD)**
Do not auto-post. Minimal offline invitation only.

---

## HVAC (Google/Yelp) — Template Set

**HVAC-01 Positive (Auto-post OK)**
“Thank you for the review. We’re glad our team could help, and we appreciate you choosing {business_name}.”

**HVAC-02 Neutral/Short (Auto-post OK)**
“Thanks for the feedback. If there’s anything we can do better, please contact us at {support_email} so we can help.”

**HVAC-03 Scheduling/No-show Complaint (L1, post allowed)**
“We’re sorry for the frustration and appreciate you bringing this to our attention. Please email {support_email} with a good way to reach you so we can review what happened and work toward a resolution.”

**HVAC-04 Pricing Dispute (L2, human approval)**
“We understand pricing concerns can be frustrating. We’d like to review the details and make sure everything was explained clearly. Please contact {support_email} so we can follow up directly.”

**HVAC-05 Alleged Damage (Hold if severe; otherwise L2)**
“We’re sorry to hear about this concern. We’d like to look into it promptly. Please contact {support_email} so we can review the details and determine next steps.”

**HVAC-06 Suspected Fake/Competitor Bait (L2, no accusations)**
“Thank you for the note. We’re unable to identify this job from the information provided. Please contact {support_email} so we can investigate and assist.”

---

## 4) QA Evidence Capture Format (post sandbox/live verification)
Attach these artifacts to the launch ticket:
1) **Audit log export** showing: draft_created → flagged (if any) → approved/blocked → posted (if allowed), with fields: review_source, review_id, review_text_hash, detector_version, risk_flags, escalation_level, response_mode, post_status, timestamps.
2) **Screenshots**: UI state for manual-only hold (must not allow posting), and posted response where allowed.
3) **Weekly KPI report output** for the test period and reconciliation table: approved_count vs posted_count vs blocked_count; response time metrics; escalations by level.
4) **Sign-off**: Engineering + Ops checkbox confirmation that all MANUAL-ONLY HOLD cases cannot be posted via API or UI.

---

## Customer-facing legitimacy reference (for any communications)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to
