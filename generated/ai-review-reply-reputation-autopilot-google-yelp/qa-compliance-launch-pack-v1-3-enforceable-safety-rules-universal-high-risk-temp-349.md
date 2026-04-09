# QA & Compliance Launch Pack v1.3 — Enforceable Safety Rules, Universal High‑Risk Templates, Evidence Pack, and Website Safety Blurb

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:30:15.746Z

---

## 1) Enforceable Safety Rules (Google Business Profile + Yelp)

### 1.1 Non‑negotiable response principles (apply to every draft)
1) **Do not confirm identity or service**: Never confirm the reviewer was a patient/customer or that they visited on a specific date. Use neutral phrasing (“we take feedback seriously”).
2) **No PHI/PII**: Do not reference medical records, charts, appointment times, treatment details, diagnoses, or any personally identifying information. Do not use staff last names. Do not repeat reviewer’s phone/address.
3) **No liability admission**: Never say “we were at fault,” “we caused,” “we damaged,” “we made a mistake.” Use non-admission language (“we’re sorry to hear you’re disappointed”).
4) **Take it offline**: Include a calm offline CTA with a business contact route (phone/email) or “please contact our office” without incentives.
5) **No incentives / gating**: Do not offer discounts, freebies, refunds, or “contact us and we’ll remove/replace this review.” Do not ask only happy customers to review.
6) **No threats, retaliation, or harassment**: Do not warn reviewers, threaten legal action, or attack the reviewer.
7) **No competitor disparagement**: Do not accuse competitors of posting fake reviews; do not compare to named competitors.
8) **No platform enforcement promises**: Do not claim Yelp/Google will remove a review; do not suggest you have special access.

### 1.2 Hard blocks (must prevent posting; either rewrite safely or hold for human)
**A) PHI/HIPAA confirmation hard block (rewrite required)**
Trigger if draft or planned response includes phrases like: “your chart,” “your records,” “your visit,” “your appointment,” “we reviewed your file,” “we looked at your notes,” “as your provider,” “treatment plan,” “procedure,” “diagnosis,” “prescription,” “billing code.”
Action: Force generic wording and remove any acknowledgment of a relationship. 

**B) Legal threat manual‑only hold (no posting)**
Trigger if review contains: “lawsuit,” “sue,” “attorney,” “lawyer,” “legal action,” “court,” “demand letter,” “settlement,” “insurance claim,” “I’m reporting you to the board.”
Action: escalation_level=Legal; response_mode=HOLD_MANUAL_ONLY; post_status=blocked_manual_review.

**C) Safety incident manual‑only hold (no posting)**
Trigger if review alleges injury, dangerous work, gas leak, fire, electrical hazard, assault, or “unsafe.”
Action: escalation_level=Safety; response_mode=HOLD_MANUAL_ONLY; post_status=blocked_manual_review.

**D) Discrimination/harassment content (draft allowed but must be de‑escalatory; consider hold)**
If reviewer uses slurs/threats or alleges discrimination: allow a neutral, de-escalatory response **without debating facts**, and recommend internal escalation. If threats present, treat as HOLD.

### 1.3 Required offline CTA (approved wording options)
- “We’d like to learn more and see how we can help. Please contact our team directly so we can look into this: [business phone] or [business email].”
- “For privacy reasons, we can’t discuss details here. Please reach out to our office so we can assist you directly.”

### 1.4 Audit trail requirements (minimum fields)
Must log: review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode, draft_version, prompt_version/model_version, human_approver_id (if any), approval_timestamp, posted_timestamp, post_status/error_code, final_response_text, hold_reason, detector_version, blocked_timestamp, unblocker_id.


## 2) Universal High‑Risk Approved Templates (Cross‑Vertical)
Notes: These templates are intentionally generic, non‑admitting, and platform‑safe. Allowed variables: {BusinessName}, {BusinessPhone}, {BusinessEmail}. Optional: {FirstName} only if reviewer provides it and policy permits (avoid if uncertain).

### U1 — PHI/HIPAA‑Safe Negative Review (Generic)
“Thank you for your feedback. We take concerns like this seriously. For privacy reasons, we can’t discuss any details here, but we’d like the opportunity to learn more and address your concerns directly. Please contact {BusinessName} at {BusinessPhone} or {BusinessEmail}.”

### U2 — Legal Threat (Manual‑Only Hold Notice; ONLY if business decides to post after legal review)
“Thank you for your message. We take these concerns seriously. To ensure this is handled appropriately, please contact {BusinessName} directly at {BusinessEmail} or {BusinessPhone}. We’re unable to discuss details in a public forum.”
(Policy note: default is **HOLD_MANUAL_ONLY**; do not auto‑post.)

### U3 — Safety Incident Allegation (Manual‑Only Hold Notice; ONLY after safety lead review)
“Thank you for bringing this to our attention. We take safety concerns very seriously. Please contact {BusinessName} directly at {BusinessPhone} or {BusinessEmail} so we can understand what happened and follow up appropriately. We can’t discuss details publicly.”

### U4 — Suspected Fake / No Match Found (Non‑accusatory)
“Thank you for sharing your concern. We’re unable to identify the situation based on the information provided, and we’d like to look into it. Please contact {BusinessName} at {BusinessPhone} or {BusinessEmail} with any details you’re comfortable sharing so we can assist.”
(Do not say “this is fake” or blame competitors.)

### U5 — Billing / Pricing Dispute (No admission; offline resolution)
“Thank you for the feedback. We understand billing concerns can be frustrating. We’d like to review this with you directly and make sure your questions are addressed. Please contact {BusinessName} at {BusinessPhone} or {BusinessEmail}.”

### U6 — Discrimination Allegation / Harassment in Review (De‑escalation)
“Thank you for sharing your concern. We take respectful service seriously and want to understand what happened. Please contact {BusinessName} directly at {BusinessPhone} or {BusinessEmail} so we can follow up. We’re unable to discuss details publicly.”


## 3) Compliance Evidence Pack (What to capture during verification)
Purpose: produce objective proof that brand-safety and policy gates work and that the system is auditable.

### 3.1 Evidence to capture (per test run)
1) **Detector evidence**: screenshot/export showing detected_risk_flags and detector_version for at least: PHI trigger, legal threat trigger, incentive-language trigger, competitor disparagement trigger.
2) **Posting gate evidence**:
   - One case that posts successfully after approval (post_status=posted).
   - One case that is blocked (post_status=blocked_manual_review) and cannot be posted via UI.
   - One case that is blocked and cannot be posted via API path (if applicable).
3) **Audit log export**: CSV/JSON export including required fields for the above cases.
4) **Weekly KPI report output**: export showing response rate, response time, escalations count, and reconciliation (approved vs posted vs blocked).
5) **Template provenance**: record template_id and scenario for each posted response.

### 3.2 Minimum pass criteria
- 0 instances of PHI confirmation language in any posted response.
- 100% of legal/safety triggers result in HOLD_MANUAL_ONLY and blocked_manual_review.
- Report reconciliation matches audit logs (posted + blocked + pending = approved where applicable).


## 4) Customer‑Facing Safety & Policy Commitment (Website blurb)
You can paste this into your site at:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

**Safety & Platform Policy Commitment**

AI Review Reply & Reputation Autopilot is designed to help local businesses respond to reviews quickly while staying professional and policy‑aligned. Our system drafts brand‑safe response suggestions and can enforce “manual review only” holds for high‑risk situations (for example: potential privacy concerns, legal threats, or safety incidents). We avoid content that could violate Google Business Profile or Yelp policies, including offering incentives for reviews, requesting only positive reviews, promising review removal, or publishing private information.

We also apply strict safeguards intended to reduce risk in sensitive categories. Responses are written to avoid admitting fault, arguing with reviewers, or disclosing personal details. When a review appears complex or high‑risk, we recommend taking the conversation offline and escalating internally so your team can handle it appropriately.

Questions about safety settings, audit logs, or how our escalation holds work? Contact us at agent_bob_replit+review-bot@agentmail.to.
