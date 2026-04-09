# AI Review Reply & Reputation Autopilot — Compliance Ops Pack v1.0 (Master Checklist + Escalation Decision Tree + Approved Templates v3 + Customer Disclaimers)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:20:16.698Z

---

# AI Review Reply & Reputation Autopilot — Compliance Ops Pack v1.0

**Product**: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)

**Public legitimacy URL (share with customers)**: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

**Support / compliance contact**: agent_bob_replit+review-bot@agentmail.to

---

## 1) Master Brand-Safety & Platform-Policy Checklist (Testable)

Use this as:
- **Pre-launch gate** (must pass all “P0/P1”)
- **Regression checklist** (run after model/prompt/template changes)
- **Ops checklist** (for approvers)

### A. Universal “Must Never Do” (P0)
1. **No PHI/PII confirmation**: Do not confirm or imply a relationship, visit, procedure, diagnosis, treatment, appointment, chart/records, insurance, or payment details.
   - **Hard-block phrases** (non-exhaustive): “your chart/records”, “your visit/appointment”, “as your provider”, “we treated you”, “we reviewed your file”, “according to our records”.
   - **Pass condition**: Response uses *generic* language: “We take feedback seriously” without confirming identity or care.
2. **No medical outcome guarantees or specific clinical claims** (dentist/med spa).
   - Block/avoid: “guaranteed results”, “permanent”, “cure”, “no risk”, “FDA-approved” unless verified and allowed.
   - Pass: Safe phrasing focuses on service values and invites offline contact.
3. **No admission of liability** (especially HVAC property damage, injury, malpractice).
   - Block/avoid: “we messed up”, “our fault”, “we broke”, “we caused”, “we should have”.
   - Pass: Use non-admission language: “We’re sorry you had this experience” + investigate offline.
4. **No incentives / discounts for reviews** (Google/Yelp).
   - Block/avoid: “discount”, “coupon”, “gift card”, “free service”, “refund if you update review”.
   - Pass: No compensation offered; no conditional language tied to review removal/changes.
5. **No harassment, retaliation, threats, or inflammatory tone**.
   - Pass: Professional, calm, short; avoids blaming reviewer.
6. **No doxxing / staff naming**.
   - Avoid posting staff full names, phone numbers, personal details.
   - Pass: “our team” / “management” language.
7. **No promises about platform enforcement** (Yelp/Google removal).
   - Avoid: “We’ll get Yelp to remove this,” “Google will delete this.”
   - Pass: If suspected fake, request offline contact and/or use platform’s reporting tools privately.

### B. Mandatory “Must Include” (P1)
1. **Offline resolution CTA** for any neutral/negative review.
   - Google-safe CTA: “Please contact our team at [phone/email] so we can help.”
   - Yelp-safe CTA: similar; avoid implying reviewer must change review.
2. **No PHI adjacency** for healthcare: Even “We’re glad your cleaning went well” is risky if it confirms a service.
   - Pass: Generic appreciation without care confirmation.
3. **Length & tone**: 2–6 sentences; no lecturing; no legalese unless legal hold.
4. **If legal threat keywords present** (“attorney”, “lawsuit”, “sue”, “legal action”):
   - Pass: Set **response_mode=manual-only hold** and **post_status='blocked_manual_review'**; route to Legal.

### C. Vertical-Specific Constraints
**Dentist / Med Spa**
- Never discuss diagnosis/treatment specifics; never request the reviewer share details publicly.
- Avoid “results may vary” debates in public; move offline.

**HVAC**
- Avoid technical blame statements (“We installed it wrong”).
- Avoid confirming address or job details.

### D. Audit Trail & Posting Gates (Acceptance Criteria)
**Every review** must produce an audit record including:
- review_source (Google/Yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags[]
- escalation_level (None, L1 Ops, L2 Billing, L3 Safety, Legal)
- response_mode (auto_draft, requires_approval, blocked_manual_review)
- draft_version + model/prompt/template version
- human_approver_id (if approved)
- approval_timestamp
- posted_timestamp
- post_status (posted / failed / blocked_manual_review)
- hold_reason + blocked_timestamp (if blocked)

**Gate rule**: If response_mode=blocked_manual_review, the system must prevent posting via **both UI and API**.

---

## 2) Escalation Decision Tree + Playbook (Operational)

### Escalation Levels
- **None**: Positive/neutral, no risk flags.
- **L1 Ops**: Service quality complaint, scheduling issues, rude staff claims (non-discriminatory), “not satisfied”.
- **L2 Billing**: Charges, refunds, pricing disputes, warranty disputes.
- **L3 Safety**: Injury, unsafe conditions, property damage allegations, harassment/discrimination claims, threats of violence.
- **Legal (Manual-Only Hold)**: Mentions attorney/lawsuit/sue, demands for settlement, cease-and-desist tone, explicit defamation claims.

### Decision Tree (Fast)
1. **Contains legal keywords?** → Set **Legal + blocked_manual_review**. Do not post. Notify Legal same-day.
2. **Contains PHI/medical specifics OR asks business to confirm details?** → Force generic response; if reviewer requests PHI confirmation, set **requires_approval** and consider **blocked_manual_review** for high-risk.
3. **Alleges injury, unsafe work, property damage, discrimination/harassment** → **L3 Safety** + requires_approval (or manual hold if severe/ongoing investigation).
4. **Mentions billing/refunds/insurance/charges** → **L2 Billing** + requires_approval.
5. **General dissatisfaction** → **L1 Ops** + requires_approval.

### Routing & SLAs
- **L1 Ops**: Ops Manager/GM within **24h**.
- **L2 Billing**: Billing/Owner within **24h**.
- **L3 Safety**: Owner/GM within **4h**.
- **Legal**: Legal/Owner **same business day**.

### Do-Not-Post Conditions (Hard)
- Active litigation threat or attorney involvement.
- Any response that would confirm PHI/relationship.
- Any response that includes admission of fault/liability.
- Any response offering incentives/discounts.

### Evidence to Collect (Internal)
- Review URL + screenshot
- Timeline of events (internal)
- Work order/appointment reference (internal only)
- Staff statements
- Any photos/invoices (HVAC)

---

## 3) Approved Response Templates v3 (Per Vertical)

**Global variable rules (all templates)**
- Allowed: {BusinessName}, {City}, {SupportEmail}, {SupportPhone}, {SignoffNameOrRole}
- Not allowed: reviewer name, staff names, appointment dates, procedure names, prices unless verified and explicitly approved.
- Mandatory for neutral/negative: include **offline CTA** (email/phone).

### A) Dentist Templates (Google/Yelp)
**DENT-POS-01 (Positive)**
“Thank you for the kind words. We appreciate you taking the time to share your feedback, and we’ll be sure to pass it along to our team. — {BusinessName}”

**DENT-NEU-01 (Neutral/short)**
“Thanks for the feedback. We’re always working to improve the experience we provide. If you’re open to it, please contact us at {SupportEmail} so we can learn more. — {BusinessName}”

**DENT-NEG-01 (Mild negative)**
“We’re sorry to hear this didn’t meet expectations. We take feedback seriously and would like to understand what happened. Please reach us at {SupportEmail} or {SupportPhone} so we can help. — {BusinessName}”

**DENT-NEG-02 (Strong negative / upset reviewer)**
“Thank you for sharing this. We’re concerned to hear about your experience and want to look into it promptly. For privacy and to better assist, please contact our team at {SupportEmail} or {SupportPhone}. — {BusinessName}”

**DENT-FAKE-01 (Suspected fake / not found)**
“Thank you for the review. We can’t confirm details here, but we’d like to look into this. Please contact {SupportEmail} with a phone number to reach you, and our team will follow up. — {BusinessName}”

**DENT-HIPAA-01 (PHI bait / reviewer overshares)**
“Thank you for your message. To protect privacy, we can’t discuss details in a public forum, but we’d like to help. Please contact us at {SupportEmail} or {SupportPhone}. — {BusinessName}”

### B) Med Spa Templates (Google/Yelp)
**MEDSPA-POS-01**
“Thank you for the great review. We appreciate your feedback and are glad you took the time to share it. — {BusinessName}”

**MEDSPA-NEU-01**
“Thanks for the feedback. We’re always working to improve. If you’re willing, please contact us at {SupportEmail} so we can learn more. — {BusinessName}”

**MEDSPA-NEG-01 (Service/process complaint)**
“We’re sorry to hear this. We’d like to understand what happened and see how we can make it right. Please reach out at {SupportEmail} or {SupportPhone}. — {BusinessName}”

**MEDSPA-NEG-02 (Results dissatisfaction without claims)**
“Thank you for sharing your experience. We want to address your concerns and discuss options privately. Please contact us at {SupportEmail} or {SupportPhone}. — {BusinessName}”

**MEDSPA-FAKE-01**
“Thank you for the review. We can’t discuss or confirm details here, but we’d like to look into this. Please contact {SupportEmail} so we can follow up. — {BusinessName}”

**MEDSPA-SAFETY-01 (Adverse reaction allegation; no admission)**
“We’re sorry to hear you’re feeling this way and we take safety concerns seriously. We’d like to connect promptly to understand what’s going on and help. Please contact us at {SupportPhone} or {SupportEmail}. — {BusinessName}”

### C) HVAC Templates (Google/Yelp)
**HVAC-POS-01**
“Thank you for the review. We appreciate your business and your feedback, and we’ll share this with the team. — {BusinessName}”

**HVAC-NEU-01**
“Thanks for the feedback. We’re always working to improve our service and communication. Please contact us at {SupportEmail} so we can learn more. — {BusinessName}”

**HVAC-NEG-01 (Scheduling/communication)**
“We’re sorry to hear this. We’d like to understand what happened and improve. Please reach out at {SupportEmail} or {SupportPhone} so we can help. — {BusinessName}”

**HVAC-NEG-02 (Work quality complaint; avoid liability)**
“Thank you for letting us know. We take concerns like this seriously and would like to review the situation. Please contact us at {SupportEmail} or {SupportPhone} so we can assist. — {BusinessName}”

**HVAC-DAMAGE-01 (Property damage allegation; no admission)**
“We’re concerned to hear this and want to look into it right away. Please contact us at {SupportPhone} or {SupportEmail} so we can gather details and help. — {BusinessName}”

**HVAC-FAKE-01**
“Thank you for the review. We’d like to look into this, but we can’t confirm details publicly. Please contact {SupportEmail} with a way to reach you. — {BusinessName}”

---

## 4) Customer-Facing Disclaimers (Paste-ready for UI / Emails)

### A) “How this autopilot stays policy-safe” (short)
“We draft responses designed to be respectful and policy-safe for Google Business Profile and Yelp. To protect privacy, drafts avoid confirming customer relationships or discussing sensitive details in public replies. Negative reviews may be flagged for approval or placed on hold for manual review. Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 or contact agent_bob_replit+review-bot@agentmail.to.”

### B) “No incentives / no review gating” (explicit)
“This tool will not recommend offering discounts, gifts, refunds, or any incentives in exchange for reviews, and it does not support ‘review gating’ (only asking happy customers to post). These practices can violate Google/Yelp policies.”

### C) “Manual-only hold” explanation
“Some reviews (e.g., legal threats, safety incidents, or privacy-sensitive situations) are automatically set to **Manual-Only Hold**. While on hold, replies cannot be posted until a human approves next steps. This is to protect your business and keep responses brand-safe.”

---

## 5) Minimum Go/No-Go Exit Criteria (Ops)
Go-live requires:
1. Posting gate verified: blocked_manual_review cannot post via UI or API.
2. Audit logs include required fields for: drafted, flagged, approved, blocked, posted.
3. Templates v3 are the default for the 3 verticals and cannot be edited to include blocked phrases without warning/hold.
4. Weekly KPI report reconciles: approved vs posted vs blocked counts match audit logs.

End of document.