# AI Review Reply & Reputation Autopilot — Brand Safety & Compliance Pack v3 (Checklist + Escalation Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:03:53.352Z

---

Business legitimacy reference (for any customer/partner comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

PART A — BRAND-SAFETY CHECKLIST v3 (Google Business Profile + Yelp)
Use this checklist to evaluate every drafted reply before posting. If any “Hard Stop” is triggered, set post_status = blocked_manual_review and escalate.

A1. Hard Stops (DO NOT POST; Manual-only hold required)
1) PHI/medical privacy risk: Any language that confirms a person is/was a patient/client or references their visit/records (e.g., “your appointment,” “your chart,” “we reviewed your records,” “when you were here on…”). 
2) Legal threat: Reviewer mentions attorney/lawyer, lawsuit, suing, subpoena, demand letter, or “see you in court.”
3) Safety/injury allegation: “burn,” “infection,” “injured,” “unsafe,” “negligence,” “hazard,” “gas leak,” “carbon monoxide,” “electrocuted,” etc.
4) Discrimination/harassment claims involving protected classes or slurs.
5) Reviewer posts personal data (phone/address/email) or doxxes staff/customer; any reply that would repeat it.

A2. Prohibited Content (must not appear)
- Incentives/solicitation: No discounts, freebies, gift cards, “contact us for a refund if you remove/edit,” review gating, or asking for positive reviews.
- Liability admission: No “we messed up,” “our fault,” “we were negligent,” “we caused damage,” “malpractice,” etc.
- Medical outcome guarantees: No guaranteed results or definitive diagnoses/outcomes.
- Retaliation/threats: No threats to report the reviewer, ban, sue, or shame them.
- Competitor disparagement: No “they’re lying,” “competitor smear,” etc.
- Platform enforcement promises: No “Yelp/Google will remove this,” “we’ll get this taken down.”

A3. Required Elements (every non-blocked reply must include)
- Professional, calm tone; no arguments.
- Empathy + willingness to help.
- Offline CTA: invite to contact via phone/email (or the business’s standard channel) to resolve privately.
- Minimalism: do not introduce new facts; do not speculate.
- No personal names (reviewer or staff), no appointment details, no pricing unless provided and verified.

A4. “Never Say / Say Instead” Safe Phrasing
- Never: “We reviewed your chart/records/visit.”
  Say: “We take feedback seriously and would like to learn more.”
- Never: “You were our patient/customer.”
  Say: “We can’t discuss specifics here, but we’re happy to connect privately.”
- Never: “We will refund you” (publicly).
  Say: “Please contact us so we can look into options.”
- Never: “This is fake / you’re lying.”
  Say: “We can’t find enough information to identify the situation; please contact us directly.”
- Never: “Google/Yelp will remove this.”
  Say: “You’re welcome to reach out to us directly so we can address concerns.”

PART B — ESCALATION PLAYBOOK v3 (Decision Trees + SLAs)

B1. Escalation Levels
- Level 0 (Auto OK): Positive/neutral/mild negative; no policy risks.
- Level 1 (Ops): Service quality, scheduling, professionalism complaints; route to GM/Ops within 24h.
- Level 2 (Billing): Pricing/charges/refund dispute; route to Billing within 24h.
- Level 3 (Safety/Clinical): Injury, unsafe conditions, adverse outcomes; route to Owner + Safety lead within 4h.
- Level 4 (Legal): Lawyer/lawsuit/threats; route to Legal/Owner same-day; posting must be blocked_manual_review.
- Level 5 (Privacy/PHI): Any PHI confirmation risk or user posts private data; block_manual_review; route to Owner/Compliance within 4h.

B2. Scenario Playbooks

1) PHI / privacy mention (reviewer talks about treatment, appointment, diagnosis)
- Action: Block_manual_review if draft would confirm relationship or reference visit.
- Reply rule: Use generic non-confirming language + offline CTA.
- Evidence to collect internally: review link, timestamps, any CRM match (kept internal), screenshots.
- DO NOT POST if: reply includes “your appointment/records/visit,” dates, procedures, staff names.

2) Injury / safety allegation (infection, burn, damaged property, gas leak)
- Action: Escalate Level 3. If severe or legal keywords also present, escalate Level 4.
- Public reply: empathize + take offline; no fault admission.
- Internal: create incident ticket; preserve job notes/photos; call customer if identifiable.
- DO NOT POST if: draft implies fault (“we caused”), guarantees compensation, or discusses specifics.

3) Legal threat (attorney/lawsuit)
- Action: Level 4 Legal; mandatory blocked_manual_review.
- Public reply (if approved by Legal): brief, neutral, offline only.
- DO NOT POST automatically under any condition.

4) Discrimination/harassment
- Action: Level 4 if legal risk; otherwise Level 3/Owner. Often blocked_manual_review recommended.
- Public reply: acknowledge concern, state commitment to respectful service, invite offline.
- DO NOT POST if: engages in argument, names staff, or contests facts.

5) Suspected fake review / can’t identify
- Action: Level 1 Ops (verification). Auto reply allowed if non-accusatory.
- Public reply: “We can’t locate details; please contact us…”
- DO NOT POST if: accuses reviewer/competitor, threatens, mentions reporting.

6) Billing dispute / refund demand / compensation demand
- Action: Level 2 Billing. Auto reply allowed using neutral language.
- Public reply: invite offline to review; avoid committing refund publicly.
- DO NOT POST if: offers discount for removal/edit or requests changing the review.

B3. Routing SLAs
- Level 5 Privacy/PHI: Owner/Compliance < 4h
- Level 4 Legal: Owner/Legal same-day
- Level 3 Safety: Owner/GM < 4h
- Level 2 Billing: Billing < 24h
- Level 1 Ops: Ops/GM < 24h

PART C — APPROVED RESPONSE TEMPLATES v3 (Ready-to-use; Google/Yelp safe)
Rules for variables across all templates:
- Allowed variables: {BusinessName}, {ContactChannel} (e.g., “call us at [phone]” or “email us at agent_bob_replit+review-bot@agentmail.to”), {GeneralSignoff} (e.g., “— {BusinessName} Team”).
- Forbidden variables: reviewer name, staff name, appointment date/time, procedure details, pricing unless explicitly provided and verified.
- Always include offline CTA.

C1. Dentist Templates
DENT-POS-01 (Positive)
“Thank you for taking the time to share your feedback. We’re glad you had a great experience with {BusinessName}. If there’s ever anything we can do to help, please reach out via {ContactChannel}. {GeneralSignoff}”

DENT-NEU-02 (Neutral/short)
“Thanks for your review. We appreciate the feedback and will use it to keep improving. If you’d like to share more details, please contact us at {ContactChannel}. {GeneralSignoff}”

DENT-NEG-03 (Mild negative: wait time/front desk)
“Thank you for letting us know. We’re sorry your experience didn’t meet expectations. We’d like to learn more and see how we can help—please contact us at {ContactChannel}. {GeneralSignoff}”

DENT-STR-04 (Strong negative; keep generic)
“We’re sorry to hear you’re disappointed. We take concerns seriously, but we can’t discuss details publicly. Please reach out at {ContactChannel} so we can look into this and work toward a resolution. {GeneralSignoff}”

DENT-PHI-05 (PHI-sensitive: reviewer mentions treatment/outcome)
“Thank you for your message. To protect everyone’s privacy, we can’t address specifics here. We’d like to hear more and help if we can—please contact us at {ContactChannel}. {GeneralSignoff}”

DENT-INFO-06 (Reviewer posted personal info)
“Thanks for reaching out. For your privacy, we recommend removing any personal contact details from your review. If you’d like to connect, please contact us directly via {ContactChannel} so we can assist. {GeneralSignoff}”

DENT-COMP-07 (Compensation/refund demand)
“Thank you for your feedback. We’d like to understand what happened and review your concern directly. Please contact us at {ContactChannel} so we can look into this. {GeneralSignoff}”

C2. Med Spa Templates
MED-POS-01 (Positive)
“Thank you for your kind words. We’re happy to hear you enjoyed your experience with {BusinessName}. If you ever have questions or feedback, please reach us via {ContactChannel}. {GeneralSignoff}”

MED-NEU-02 (Neutral)
“Thanks for the review. We appreciate you sharing your experience and are always working to improve. Please contact us at {ContactChannel} if you’d like to discuss further. {GeneralSignoff}”

MED-NEG-03 (Mild negative: service/cleanliness)
“We’re sorry to hear this wasn’t the experience you expected. We’d like to learn more and address your concerns—please contact us at {ContactChannel}. {GeneralSignoff}”

MED-STR-04 (Strong negative)
“Thank you for the feedback. We take concerns seriously, and we can’t discuss details publicly. Please contact us at {ContactChannel} so we can follow up privately. {GeneralSignoff}”

MED-SAFE-05 (Injury/outcome language — use only if NOT blocked; otherwise hold)
“We’re sorry to hear about your concern. We’d like to connect privately to understand what happened and help—please contact us at {ContactChannel}. {GeneralSignoff}”

MED-INFO-06 (Reviewer posted personal info)
“Thanks for reaching out. For your privacy, we recommend removing personal contact details from your review. Please contact us directly at {ContactChannel} so we can assist. {GeneralSignoff}”

MED-COMP-07 (Compensation demand)
“Thank you for letting us know. We’d like to look into this and discuss options directly—please contact us at {ContactChannel}. {GeneralSignoff}”

C3. HVAC Templates
HVAC-POS-01 (Positive)
“Thank you for the review. We’re glad we could help and appreciate you choosing {BusinessName}. If you ever need anything, reach out via {ContactChannel}. {GeneralSignoff}”

HVAC-NEU-02 (Neutral)
“Thanks for the feedback. We appreciate the opportunity to improve. Please contact us at {ContactChannel} if you’d like to share more details. {GeneralSignoff}”

HVAC-NEG-03 (Mild negative: scheduling/communication)
“We’re sorry this wasn’t as smooth as it should have been. We’d like to learn more and make it right—please contact us at {ContactChannel}. {GeneralSignoff}”

HVAC-STR-04 (Strong negative/service quality)
“Thank you for letting us know. We take concerns seriously and would like to follow up, but we can’t address specifics publicly. Please contact us at {ContactChannel}. {GeneralSignoff}”

HVAC-SAFE-05 (Safety allegation—use only if not blocked; otherwise hold)
“We’re sorry to hear about your concern. Please contact us at {ContactChannel} as soon as possible so we can follow up directly. {GeneralSignoff}”

HVAC-INFO-06 (Reviewer posted personal info)
“Thanks for reaching out. For your privacy, we recommend removing personal contact details from your review. Please contact us directly via {ContactChannel} so we can assist. {GeneralSignoff}”

HVAC-FAKE-07 (Suspected fake / can’t identify)
“Thank you for the feedback. We’re unable to locate details from this review alone, but we’d like to understand and help. Please contact us at {ContactChannel} with any relevant details so we can follow up. {GeneralSignoff}”

PART D — Platform policy alignment (operational rules)
- Never request/offer incentives for reviews or for changing/removing reviews (Google/Yelp).
- Never promise removal by Yelp/Google or claim you can influence moderation.
- Do not disclose private customer information; do not confirm customer relationship in healthcare contexts.
- Do not argue; keep replies short, polite, and offline.
- For Yelp specifically: avoid language that implies the reviewer must contact you to be “verified” before you’ll help; instead invite them to contact you while keeping tone welcoming.

Implementation note (for engineering/ops)
- Any trigger of Hard Stops must force: response_mode = blocked_manual_review, escalation_level = Legal/Privacy/Safety, and post_status = blocked_manual_review.
- Audit log must record: detected_risk_flags, detector_version, hold_reason, blocked_timestamp, and (if later approved) unblocker_id + approval_timestamp.

End of Pack v3.