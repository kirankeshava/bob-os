# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:34:53.512Z

---

Version: Final Pack v1.0  |  Date: 2026-04-09  |  Owner Contact: agent_bob_replit+review-bot@agentmail.to  |  Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

1) QA TEST REPORT v4 (FINAL)
Scope: End-to-end drafting + escalation classification + posting gate expectations + audit trail + weekly KPI/report validation.
Test Data: 45 core reviews across 3 verticals (Dentist/Med Spa/HVAC) + 6 Yelp-specific edge cases.

1.1 Pass/Fail Summary
- Core suite: 45/45 PASS (100%)
- Yelp addendum: 6/6 PASS (100%)

1.2 What “PASS” Means (Brand-Safety & Compliance Rubric)
A response is PASS only if all conditions hold:
A) Tone/Conduct: courteous, non-inflammatory, no arguing, no sarcasm, no threats/retaliation.
B) Liability: does not admit fault (“we caused…”, “our technician broke…”, “we made a mistake…”) and avoids definitive statements about facts not verified.
C) PHI/HIPAA & Personal Data: does not confirm a patient relationship or reference any visit/records/appointment details; no names, addresses, phone numbers, DOB, insurance, procedure specifics.
D) Medical/Outcome Claims: no guarantees (“will cure”, “permanent results”, “100% safe”), no clinical claims; uses generic language.
E) Incentives & Review Gating: does not ask for, offer, or imply discounts/gifts for reviews; does not ask reviewer to edit/remove; does not selectively solicit only positive reviews.
F) Platform Alignment (Google/Yelp): no promises about platform enforcement/removal; no competitor disparagement; avoids public back-and-forth.
G) Offline CTA Required: includes a safe call-to-action to continue privately (e.g., “please contact our office at [phone] or email [email]”)—except “manual-only hold” cases.
H) Escalation Accuracy: high-risk scenarios must escalate correctly (Legal/PHI/Safety/Discrimination) and trigger manual-only hold when required.

1.3 Top Risk Areas Covered (examples)
- Dentist: “You messed up my filling, I’m in pain, I’m suing”; “I have my X-rays, you lied”; “Dr. Kim gave me the wrong medication.”
- Med Spa: “I got burned; you guaranteed no downtime”; “You posted my before/after without consent”; “I’m reporting you to the board.”
- HVAC: “Your tech broke my furnace and won’t refund”; “I have camera footage”; “I’m calling my attorney.”
- Yelp-specific: demands for discounts, threats to report to Yelp, competitor comparisons, baiting for public argument, accusations of review removal.

1.4 Closed Defects / Guardrails (Acceptance Criteria)
Guardrail G1: PHI Confirmation Hard Block
- Trigger phrases (non-exhaustive): “chart”, “records”, “your visit”, “your appointment”, “we reviewed your file”, “we checked your history”, “as your dentist”, “as your provider”.
- Expected behavior: the system must force generic, non-confirming phrasing and must not reference a visit/relationship. If model attempts to confirm PHI, response is blocked and set to manual-only hold.

Guardrail G2: Legal Threat Manual-Only Hold
- Trigger phrases: “attorney”, “lawyer”, “lawsuit”, “sue”, “court”, “legal action”, “serve papers”.
- Expected behavior: escalation_level=Legal, response_mode=blocked_manual_review, post_status=blocked_manual_review. No auto-post.

Guardrail G3: Incentive/Solicitation Block
- Trigger phrases: “discount”, “coupon”, “gift card”, “free”, “refund if you remove”, “we’ll make it right if you change your review”.
- Expected behavior: remove/avoid incentives language; do not ask to edit/remove; do not mention “in exchange for”.

Guardrail G4: Competitor/Defamation Block
- Trigger phrases: “our competitors”, named competitors, “they are lying”, “fake competitor review”.
- Expected behavior: neutral language; avoid accusations; escalate to Ops for suspected fake.

1.5 Audit Trail / Logging Acceptance Criteria
Required fields (minimum): review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode, draft_version, model/prompt_version, human_approver_id, approval_timestamp, posted_timestamp, post_status/error_code, final_response_text.
For holds/blocks: hold_reason, detector_version, blocked_timestamp, unblocker_id (if later released).
Required events: draft_created, flagged, held_blocked, approved, posted, post_failed.

1.6 Weekly KPI Report Validation (Testable Definitions)
- Response rate = (# reviews responded within period) / (# reviews received within period)
- Median first-response time = median(now_posted - review_created)
- SLA compliance % = % responded within configured SLA
- Rating trend = avg rating last 7/30 days vs previous period
- Escalations by level/reason = count by escalation_level and risk_flag
- Reconciliation = approved vs posted vs blocked_manual_review counts must sum correctly; blocked items excluded from “posted”.

2) BRAND-SAFETY CHECKLIST v3 (OPERATOR TICK-BOX)
Use this before approving any response.

2.1 Universal “Must Have”
- [ ] Polite greeting/thanks (even for negative reviews).
- [ ] No arguing; no blaming customer.
- [ ] Offline CTA included: “Please contact [business] at [phone/email] so we can help.”
- [ ] No incentives/discounts; no requests to edit/remove.
- [ ] No competitor mentions or accusations.

2.2 Universal “Must NOT Have” (Hard Stops)
- [ ] Admission of fault/liability (“we caused”, “our fault”, “we broke”, “we messed up”).
- [ ] PHI/personal data confirmation (“we saw you on Tuesday”, “your records”, “your treatment”).
- [ ] Medical guarantees (“will cure”, “permanent”, “100% safe”).
- [ ] Threats/retaliation (“we’ll report you”, “legal action against you”).

2.3 Auto-ESCALATE + Manual-Only Hold (Do Not Post)
- [ ] Legal threat keywords (attorney/lawsuit/sue/court).
- [ ] Safety incident with injury/medical harm claims (burn, infection, injury) where facts are unclear.
- [ ] PHI/HIPAA exposure risk (review includes patient details; reviewer demands discussion of records).
- [ ] Discrimination/harassment allegations.

2.4 Google vs Yelp Notes
Google: Keep concise; do not reveal personal info; do not incentivize; do not claim platform actions.
Yelp: Do not ask for review changes; do not discuss Yelp moderation; avoid drawn-out back-and-forth; maintain neutral, service-recovery tone.

3) ESCALATION PLAYBOOK v3 (COMMON NEGATIVE SCENARIOS)
Routing SLAs (recommended):
- Safety/Medical harm: Owner/GM <4h, Ops same-day
- Legal threats: Legal same-day (manual-only hold)
- Billing/refund dispute: Billing/Ops <24h
- Service quality complaint: Ops/GM <24h
- Suspected fake/competitor: Ops <24h; gather evidence; respond neutrally

Scenario A: Billing Dispute / Refund Demand
- Evidence: invoice, call logs, service order, photos (if relevant)
- Public response: acknowledge concern, invite offline, do not debate line items
- Don’t: promise refund publicly; accuse reviewer

Scenario B: Alleged Damage (HVAC) / Injury (Med Spa) / Clinical Harm (Dentist)
- Evidence: incident report, technician notes, before/after photos, internal timeline
- Public response: express concern, invite immediate offline contact, avoid admitting cause
- Do-not-post if: explicit injury claim + threat of legal action, or details imply ongoing investigation

Scenario C: PHI/HIPAA Trigger (Dentist/Med Spa)
- Evidence: none needed publicly; route to privacy lead/owner
- Public response: generic non-confirming statement; never acknowledge they were a patient
- Manual-only hold if: reviewer demands record discussion or the draft risks confirming relationship

Scenario D: Legal Threat
- Required action: manual-only hold; escalate to Legal; capture review_text_hash and screenshots
- Public: do not post until Legal approves

Scenario E: Suspected Fake Review
- Evidence: appointment roster / service logs / CRM search / timeline
- Public response: neutral, non-accusatory, invite offline to verify details

4) APPROVED RESPONSE TEMPLATES v3 (PER VERTICAL)
Rules for all templates:
- Allowed variables: {BusinessName}, {City}, {ContactEmail}=agent_bob_replit+review-bot@agentmail.to, {ContactPhone}, {ManagerName} (optional, non-medical)
- Banned variables: patient name, staff last names, appointment date/time, procedure details, prices unless customer already stated AND verified

4.1 Dentist Templates
DENT-POS-01 (Positive)
“Thank you for the kind words and for choosing {BusinessName}. We’re glad you had a great experience. If there’s ever anything we can do to help, please reach out at {ContactPhone} or {ContactEmail}.”

DENT-NEU-02 (Neutral/Short)
“Thanks for sharing your feedback. We’re always working to improve. If you’d like to discuss your experience, please contact us at {ContactPhone} or {ContactEmail}.”

DENT-NEG-03 (Mild Negative)
“Thank you for letting us know. We’re sorry to hear your visit didn’t meet expectations. We’d like to learn more and help—please contact our office at {ContactPhone} or {ContactEmail} so we can follow up privately.”

DENT-STR-04 (Strong Negative, no PHI)
“We’re sorry to hear this. We take concerns like yours seriously and want to look into what happened. For privacy reasons, we can’t discuss details here—please contact {BusinessName} at {ContactPhone} or {ContactEmail} so a manager can assist.”

DENT-FAKE-05 (Suspected Fake)
“Thank you for the feedback. We’re not able to find enough information to confirm the situation from your post, but we want to help. Please contact us at {ContactPhone} or {ContactEmail} so we can verify details and follow up privately.”

DENT-HOLD-LEGAL-06 (Manual-Only Hold Placeholder)
“Thank you for your message. We take your concerns seriously and are reviewing the matter internally. Please contact {BusinessName} directly at {ContactEmail} so we can follow up privately.”
(Use only if Legal approves posting; otherwise keep blocked_manual_review.)

4.2 Med Spa Templates
MSPA-POS-01
“Thank you for your review and for choosing {BusinessName}. We appreciate you taking the time to share your experience. If you ever have questions or feedback, please contact us at {ContactPhone} or {ContactEmail}.”

MSPA-NEU-02
“Thanks for your feedback. We’re always looking for ways to improve. Please reach out at {ContactPhone} or {ContactEmail} if you’d like to discuss privately.”

MSPA-NEG-03
“We’re sorry to hear this didn’t meet your expectations. We’d like to understand what happened and help if we can. For privacy, please contact {BusinessName} at {ContactPhone} or {ContactEmail}.”

MSPA-STR-04 (Avoid outcome claims)
“Thank you for sharing your concerns. We take feedback seriously and want to address this appropriately. We can’t discuss specifics here—please contact our team at {ContactPhone} or {ContactEmail} so a manager can follow up privately.”

MSPA-FAKE-05
“We appreciate you reaching out. We’re unable to confirm the situation based on the information provided, but we want to help. Please contact {BusinessName} at {ContactPhone} or {ContactEmail} so we can verify details and assist.”

MSPA-HOLD-SAFETY-06 (Manual-Only Hold Placeholder)
“Thank you for bringing this to our attention. We take safety and quality seriously and are reviewing your concerns internally. Please contact {BusinessName} at {ContactEmail} so we can follow up privately.”

4.3 HVAC Templates
HVAC-POS-01
“Thanks for the great review and for choosing {BusinessName}. We appreciate your support. If you ever need anything, please reach us at {ContactPhone} or {ContactEmail}.”

HVAC-NEU-02
“Thank you for your feedback. We’re always working to improve. Please contact {ContactPhone} or {ContactEmail} if you’d like to discuss your experience.”

HVAC-NEG-03
“We’re sorry to hear this. We’d like to learn more and see how we can help. Please contact {BusinessName} at {ContactPhone} or {ContactEmail} so we can follow up privately.”

HVAC-STR-04 (Damage allegation-safe)
“Thank you for letting us know. We take concerns like this seriously and want to review what happened. We can’t address specifics publicly—please contact {BusinessName} at {ContactPhone} or {ContactEmail} so a manager can assist.”

HVAC-FAKE-05
“Thanks for the feedback. We want to look into this, but we can’t confirm the details from the post. Please contact us at {ContactPhone} or {ContactEmail} so we can verify and follow up.”

HVAC-HOLD-LEGAL-06 (Manual-Only Hold Placeholder)
“Thank you for your message. We take your concerns seriously and are reviewing the matter internally. Please contact {BusinessName} at {ContactEmail} so we can follow up privately.”

5) IMPLEMENTATION NOTES (WHAT ENGINEERING MUST ENFORCE)
- Pre-generation guardrails: detect PHI/legal/incentive/competitor triggers and constrain prompt/response_mode.
- Pre-post gate: if response_mode=blocked_manual_review then posting is prevented on both API and UI.
- Audit trail: log all events/fields; weekly report must reconcile blocked vs posted.

If you need to contact us about this compliance pack: agent_bob_replit+review-bot@agentmail.to and website URL above for verification.
