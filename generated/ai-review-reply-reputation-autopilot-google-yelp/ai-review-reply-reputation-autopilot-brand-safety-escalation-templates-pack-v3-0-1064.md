# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Templates Pack v3.0 (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:19:26.245Z

---

Business reference
- Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

PART A — BRAND-SAFETY CHECKLIST v3.0 (tick-box)
Use this checklist for every drafted response BEFORE approval/posting. If any “FAIL” item triggers, set post_status=blocked_manual_review and escalate.

A1. Platform policy alignment (Google Business Profile + Yelp)
[ ] No incentives: response does NOT offer discounts, refunds-for-removal, freebies, giveaways, “DM for a deal,” or any compensation tied to reviews. (FAIL)
[ ] No review gating: does NOT ask for only positive reviews or direct unhappy customers elsewhere. (FAIL)
[ ] No removal promises: does NOT claim “we will get this removed” or imply platform enforcement influence. (FAIL)
[ ] No competitor disparagement: does NOT insult or speculate about competitors. (FAIL)
[ ] No solicitation spam: no links or phone numbers unless business-approved; keep CTA minimal and offline-focused.

A2. PHI/Privacy/HIPAA-safe (dentist/med spa especially)
[ ] No PHI confirmation: do NOT confirm they are/were a patient/client or reference visits/appointments. (FAIL)
[ ] Hard-block phrases (force generic wording + escalation if present): “chart,” “records,” “your visit,” “your treatment,” “your appointment,” “procedure,” “diagnosis,” “results,” “before/after,” “I reviewed your file.” (FAIL)
[ ] Do not name staff or the reviewer; do not reference dates/times, room numbers, invoices, or any identifying details.
[ ] Use generic language: “We take privacy seriously and can’t discuss details here.”

A3. Liability, admissions, and legal posture
[ ] No admission of fault or liability: avoid “we messed up,” “our negligence,” “we caused,” “we are at fault.” (FAIL)
[ ] Avoid definitive factual claims you cannot verify: no fabricated investigations, refunds issued, or actions taken.
[ ] If legal threat/attorney/sue mentioned: MUST set manual-only hold (no posting) + escalation_level=Legal. (FAIL if posted)

A4. Tone and de-escalation
[ ] Non-inflammatory: no sarcasm, blame, lecturing, or “you’re wrong.”
[ ] Acknowledge feelings without conceding facts: “I’m sorry to hear you had this experience.”
[ ] Keep it concise; avoid back-and-forth baiting.

A5. Required elements (must be present unless manual-hold)
[ ] Thank you (or acknowledgment) + short empathy line (for negative).
[ ] Offline CTA: invite contact via direct channel (phone/email) to resolve privately.
[ ] No sensitive details; no medical outcomes; no pricing specifics unless the business has verified and explicitly wants it included.

A6. Content prohibitions / blocked claims
[ ] No medical outcome guarantees (med spa/dentist): “guaranteed,” “permanent,” “no risk,” “cure,” “results in X days.” (FAIL)
[ ] No discriminatory/harassing language or retaliation.
[ ] No doxxing: no addresses beyond business address, no personal phone numbers/emails, no staff last names.

PART B — ESCALATION PLAYBOOK v3.0 (routing + SLAs + what to post)

Escalation levels
- L0: Routine (post approved template; no escalation)
- L1: Service recovery needed (ops attention; post safe response + offline CTA)
- L2: Safety/Serious allegation (rapid internal review; cautious response)
- L3: Legal / PHI / Threat (DO NOT POST; manual-only hold)

Routing + SLAs (recommended)
- Billing/charges/refunds: Billing lead within 24h (L1)
- Service quality, missed appointment, rudeness: Ops/GM within 24h (L1)
- Alleged injury, property damage, safety hazard: Owner/GM within 4h (L2)
- Discrimination/harassment by staff: Owner/HR within 4h (L2)
- PHI/privacy mentions or requests for details: Compliance owner within 4h (L3 if any PHI confirmation risk)
- Legal threat (“sue,” “attorney,” “lawsuit,” “demand letter”): Legal same day (L3)

DO NOT POST conditions (automatic manual-only hold)
1) Legal threat indicators: sue/lawsuit/attorney/court/demand letter/press charges
2) PHI confirmation risk: reviewer mentions treatment/appointment + draft references records/chart/visit/procedure
3) Active safety investigation or serious injury claim requiring fact-finding
4) Reviewer includes or demands personal data exchange in public thread

Evidence to collect (internal, not public)
- Review URL, platform, timestamp, reviewer handle
- Relevant ticket/invoice/service record identifiers (internal only)
- Staff schedule/dispatch notes (HVAC)
- Photos/diagnostics if damage claimed (HVAC)
- Any prior communications with the reviewer

Public response guidance by scenario
- Billing dispute (L1): empathize + invite offline + avoid quoting invoices publicly.
- Quality complaint (L1): acknowledge + invite offline + offer to make it right without admitting fault.
- Suspected fake review (L1/L2): polite, factual, no accusations; invite offline to verify details; do not disclose customer lists.
- Discrimination claim (L2): acknowledge seriousness + state you take concerns seriously + offline contact + no debate.
- Safety issue/injury/damage (L2): acknowledge + request offline contact urgently + no admissions.
- Legal threat (L3): DO NOT POST; internal escalation only.
- PHI mention (L3): either do not post or post a strictly generic privacy statement that does not confirm patient status.

PART C — APPROVED RESPONSE TEMPLATES LIBRARY v3.0
Rules for all templates
- Allowed variables: {BusinessName}, {ContactEmail}, {ContactPhone}, {FirstNameOrTeam} (no reviewer name), {LocationCity}
- Forbidden variables: appointment date/time, procedure/treatment type, clinician name, invoice amounts, diagnosis, outcomes, internal ticket numbers
- Platform note: Yelp and Google both prefer professional, non-incentivized responses; never mention “we’ll report you to Yelp/Google.”

C1. DENTIST templates (Google/Yelp)

DENT-01 Positive (Routine)
“Thank you for taking the time to share your feedback. We’re glad you had a good experience with {BusinessName}. If there’s ever anything we can do to help, please reach out at {ContactPhone}.”

DENT-02 Neutral/Short praise
“Thanks for your review. We appreciate the feedback and will keep working to provide a great experience. If you’d like to share more details privately, you can contact us at {ContactPhone} or {ContactEmail}.”

DENT-03 Mild negative (wait time/communication) (L1)
“Thank you for the feedback, and I’m sorry to hear your experience didn’t meet expectations. We’re always working to improve scheduling and communication. Please contact {FirstNameOrTeam} at {ContactPhone} so we can learn more and see how we can help.”

DENT-04 Strong negative (service quality) (L1/L2 depending on severity)
“I’m sorry to hear you’re unhappy. We take concerns like this seriously, but we can’t discuss details in a public forum. Please contact {FirstNameOrTeam} at {ContactPhone} or {ContactEmail} so we can understand what happened and work toward a resolution.”

DENT-05 PHI/privacy-safe generic (use only if it does NOT confirm patient status; if risk → L3 hold)
“Thank you for your message. We take privacy seriously and can’t discuss or verify any details in a public review. If you’d like to speak with our team directly, please contact {ContactPhone} so we can assist.”

DENT-06 Suspected fake/unmatched record (L1)
“Thank you for your feedback. We’d like to look into this, but we can’t find enough information here to verify the situation. Please contact {FirstNameOrTeam} at {ContactPhone} so we can better understand your concerns.”

C2. MED SPA templates (Google/Yelp)

MSPA-01 Positive
“Thank you for your kind review. We appreciate you choosing {BusinessName} and we’re glad you had a great experience. If you ever have questions, our team is available at {ContactPhone}.”

MSPA-02 Neutral
“Thanks for sharing your feedback. We’re always working to improve. If you’d like to share more context privately, please contact us at {ContactPhone} or {ContactEmail}.”

MSPA-03 Mild negative (front desk/wait) (L1)
“I’m sorry to hear this was your experience. We value your time and feedback. Please reach out to {FirstNameOrTeam} at {ContactPhone} so we can learn more and help address your concerns.”

MSPA-04 Strong negative (results dissatisfaction) (L1/L2)
“Thank you for the feedback, and I’m sorry you’re disappointed. We can’t discuss or verify details publicly, but we’d like to understand what happened. Please contact {FirstNameOrTeam} at {ContactPhone} so we can speak privately.”

MSPA-05 No outcomes/guarantees reminder (safe positioning)
“We appreciate you sharing your thoughts. Experiences can vary, and we want to make sure you’re supported. Please contact {ContactPhone} so our team can discuss options privately.”

MSPA-06 Suspected fake (L1)
“Thank you for your review. We want to look into this, but we don’t have enough information here to confirm the situation. Please contact {FirstNameOrTeam} at {ContactPhone} so we can assist.”

C3. HVAC templates (Google/Yelp)

HVAC-01 Positive
“Thanks for the review and for choosing {BusinessName}. We’re glad our team could help. If you need anything in the future, you can reach us at {ContactPhone}.”

HVAC-02 Neutral
“Thank you for the feedback. We appreciate the opportunity to improve. If you’d like to share more details, please contact {FirstNameOrTeam} at {ContactPhone}.”

HVAC-03 Mild negative (schedule/late arrival) (L1)
“I’m sorry about the inconvenience and appreciate you letting us know. We’re working to improve scheduling and communication. Please contact {FirstNameOrTeam} at {ContactPhone} so we can learn more and help.”

HVAC-04 Billing dispute (L1)
“Thank you for the feedback, and I’m sorry for the frustration. We’d like to review this with you, but we can’t discuss billing details publicly. Please contact {ContactPhone} so our team can look into it and respond directly.”

HVAC-05 Alleged damage (L2)
“I’m sorry to hear about this and we take concerns like this seriously. We’d like to understand what happened and review it promptly. Please contact {FirstNameOrTeam} at {ContactPhone} as soon as possible so we can follow up directly.”

HVAC-06 Suspected fake/unmatched job (L1)
“Thank you for your review. We’d like to look into this, but we can’t match the details here to a service record. Please contact {ContactPhone} so we can verify the situation and assist.”

PART D — QA EVIDENCE LOG (what engineering/ops should attach after verification)
For each verification run (sandbox or limited live):
1) Export audit logs (CSV/JSON) showing these events: draft_created, flagged, blocked_manual_review (if triggered), approved, posted, post_failed.
2) Provide 3 example IDs per outcome: posted_success, blocked_manual_review, approved_not_posted.
3) Provide weekly KPI report output for the test window and show reconciliation:
   - responses_drafted = count(draft_created)
   - responses_posted = count(posted_success)
   - responses_blocked = count(blocked_manual_review)
   - responses_approved = count(approved)
   Ensure: responses_posted ≤ responses_approved AND blocked items never appear as posted.
4) Screenshots or platform exports verifying that manual-only hold reviews have no public reply.

If you need customer-facing comms (sales/onboarding) referencing legitimacy, use:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Email: agent_bob_replit+review-bot@agentmail.to
