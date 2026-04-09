# AI Review Reply & Reputation Autopilot — QA/Compliance Handoff Pack v1.3 (Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:03:41.150Z

---

Website for legitimacy/proof (share with customers/testers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/ops email (use in internal SOPs and customer comms): agent_bob_replit+review-bot@agentmail.to

========================================
A) BRAND-SAFETY CHECKLIST v3 (Google Business Profile + Yelp)
========================================
Purpose: Ensure every draft/post is brand-safe, non-inflammatory, non-hallucinatory, and compliant with platform rules. Use for (1) prompt/template design, (2) human approval, and (3) automated QA.

A1. Non-negotiable prohibitions (FAIL if present)
1) PHI/HIPAA / personal data confirmation
- Do not confirm someone is/was a patient/customer if the review implies care/treatment.
- Do not reference “your chart/records/visit/appointment/procedure/results/billing account.”
- Do not mention specific dates/times, clinicians, staff identities, room numbers, diagnoses, medications, outcomes.
2) Medical or service outcome guarantees
- No promises/guarantees: “we guarantee results,” “you will be pain-free,” “permanent,” “cure,” “100%,” “best outcomes.”
- No comparative superiority claims framed as fact (“best in town,” “#1”) unless clearly opinion and non-deceptive.
3) Liability admission / fault language
- Avoid “it was our fault,” “we caused,” “we made a mistake,” “we broke,” “we damaged,” “we failed to.”
- Avoid certainty statements on disputed events (“we did/didn’t do X”) unless verified and approved.
4) Incentives / review gating
- Never offer discounts, refunds, gifts, freebies, or perks in exchange for reviews or review changes.
- Never ask to “remove/update” reviews; never pressure.
5) Harassment/threats/retaliation
- Never threaten legal action, retaliation, banning, or public shaming.
- Never argue; no sarcasm; no “you’re lying.”
6) Doxxing / identifying information
- Do not repeat addresses, phone numbers (except the business’s official line if already approved), emails, full names of staff/patients.
7) Competitor disparagement
- Do not accuse competitors of fake reviews; do not compare negatively (“unlike X”).
8) Claims about platform enforcement
- Yelp edge cases: do not suggest Yelp will remove reviews; do not claim you can “report and get it taken down.”

A2. Required elements (FAIL if missing on negative or sensitive reviews)
1) Professional tone + empathy (without admitting liability)
- Acknowledge concern; thank them; keep it short.
2) Move offline CTA
- Required on negatives: invite direct contact to resolve.
3) Minimalism on sensitive topics
- For PHI-adjacent: do not engage specifics; keep generic.
4) If legal threat / safety incident: DO NOT POST (manual-only hold)
- Response mode must be blocked_manual_review; escalation_level=Legal/Safety.

A3. Blocked phrases and safer alternatives (automate as filters)
PHI confirmation / records
- Block: “we reviewed your chart/records/visit/appointment,” “as your provider,” “during your procedure,” “our notes show,” “your treatment plan,” “your results.”
- Replace with: “We take feedback seriously, but we can’t discuss details here. Please contact our office directly so we can look into your concern.”

Liability admission
- Block: “it was our fault,” “we caused,” “we damaged,” “we made a mistake,” “we are responsible.”
- Replace with: “We’re sorry to hear you had a frustrating experience. We’d like to learn more and see how we can help—please contact us directly.”

Medical guarantees
- Block: “guarantee,” “permanent results,” “cure,” “100% safe,” “no risk,” “pain-free,” “best outcome.”
- Replace with: “Results and experiences vary. We’re happy to discuss your goals and options directly.”

Incentives
- Block: “discount,” “coupon,” “free,” “gift,” “refund if you update,” “leave a review for.”
- Replace with: “We appreciate feedback. If you’re open to it, please contact us so we can address your concerns.”

Competitor disparagement
- Block: “our competitors,” “they’re worse,” “fake competitor reviews.”
- Replace with: “We take all feedback seriously and would like to learn more directly.”

Legal threats
- Trigger for manual-only hold: “attorney,” “lawyer,” “lawsuit,” “sue,” “court,” “legal action,” “demand letter,” “small claims,” “press charges.”
- Required outcome: post_status='blocked_manual_review', escalation_level='Legal', no public response posted unless Legal approves.

A4. Platform alignment notes (testable)
Google Business Profile
- Allowed: professional replies, request to contact, generic apologies.
- Avoid: personal data, inflammatory replies, review manipulation.
Yelp
- Be especially cautious: do not reference Yelp moderation; do not imply removal; keep concise; avoid “please update/remove.”

A5. Human approval checklist (tick-box)
[ ] No PHI confirmation; no specific care/treatment details
[ ] No admission of liability; no certainty on disputed facts
[ ] No guarantees/medical outcome claims
[ ] No incentives, discounts, or review gating
[ ] No harassment, threats, retaliation, or shaming
[ ] No competitor attacks or claims about platform enforcement
[ ] Includes offline CTA (email/phone) for negative/sensitive reviews
[ ] If legal/safety/PHI: blocked_manual_review + escalated (no posting)

========================================
B) ESCALATION PLAYBOOK v3 (L0–L4)
========================================
B1. Levels
L0: Positive/neutral feedback; safe to post standard response.
L1: Mild negative (wait time, scheduling, minor dissatisfaction) with no safety/legal/PHI—safe to post with offline CTA.
L2: Strong negative (billing dispute, rude staff claim, repeated service issue, refund demand)—post with offline CTA + internal ticket.
L3: High risk (alleged injury/damage, discrimination, harassment, suspected fake review with threats, PHI mentioned by reviewer)—manual review required; post only if compliant generic response is approved.
L4: Legal/safety threat (lawsuit/attorney/court; threats of violence; active investigation)—DO NOT POST. blocked_manual_review.

B2. Routing SLAs (internal)
- Safety incident (injury/fire/gas leak/violence threat): Owner/GM within 4 hours; Ops within 4 hours; preserve evidence.
- Legal threat: Legal (or owner acting as legal) same business day; do not post.
- Billing dispute/refund: Billing/Owner within 24 hours.
- Service quality / workmanship: Ops/Service Manager within 24 hours.
- Discrimination/harassment: Owner/HR within 4 hours; do not argue publicly.

B3. Evidence to collect (before any public reply on L3; required for L4)
- Screenshot of review + timestamp + platform URL
- Internal records (NOT to be referenced publicly) to identify whether the person is a customer/patient (kept internal)
- Staff statements; job notes; call recordings if applicable
- Photos of alleged damage; invoice/estimate; appointment logs
- Prior communications (email/SMS) relevant to complaint

B4. “DO NOT POST” conditions (must set blocked_manual_review)
- Any legal threat keywords
- Any request to discuss private records or any drafted response that references records/chart/visit
- Any safety incident involving injury, fire, gas, hazardous conditions
- Any discrimination allegation requiring HR/legal handling where facts are disputed
- Any situation where identity is uncertain AND details could confirm relationship

B5. Public response guidance by scenario (safe patterns)
Billing dispute (L2):
- “We’re sorry to hear this. We want to look into it and make it right. Please contact us directly at agent_bob_replit+review-bot@agentmail.to so we can review the details privately.”

Alleged damage/injury (L3):
- “We’re concerned to hear this. We’d like to understand what happened and address it appropriately. Please contact us directly so we can assist. For privacy reasons, we can’t discuss details here.”

PHI/medical details mentioned by reviewer (L3):
- “Thank you for your feedback. We can’t discuss any personal or health-related details in a public forum. Please contact our office directly so we can address your concerns.”

Legal threat (L4):
- No post. Internal: acknowledge receipt privately if contact exists; route to legal.

Suspected fake review (L2/L3 depending on language):
- “We take feedback seriously, but we can’t locate this experience based on the information here. Please contact us directly so we can look into it.” (No accusations.)

========================================
C) APPROVED RESPONSE TEMPLATES v3 (PER VERTICAL)
========================================
Rules for variables:
- Allowed variables: {business_name}, {team_name_optional}, {contact_method} (phone or email), {general_location_optional}.
- Not allowed: reviewer name (unless platform provides and business policy allows; default NO), staff names, dates/times, appointment references, procedures, diagnoses, pricing specifics unless verified and explicitly approved.
- Mandatory offline CTA for negative/sensitive: include “please contact us directly” + contact.

C1. DENTIST TEMPLATES
DENT-01 Positive
“Thank you for the kind review. We appreciate you choosing {business_name} and we’re glad you had a great experience. We look forward to seeing you again.”

DENT-02 Neutral / short compliment
“Thanks for your feedback. We appreciate you taking the time to share it and we’ll pass it along to our team.”

DENT-03 Mild negative (wait time/scheduling)
“Thank you for the feedback. We’re sorry your visit didn’t meet expectations. We’re always working to improve scheduling and communication. Please contact us directly at {contact_method} so we can learn more.”

DENT-04 Strong negative (service dissatisfaction) — no PHI
“We’re sorry to hear you’re disappointed. We take concerns seriously, and we’d like the chance to understand what happened and help. For privacy reasons we can’t discuss details here—please contact us directly at {contact_method}.”

DENT-05 PHI-adjacent mention by reviewer (manual review recommended)
“Thank you for your message. To protect everyone’s privacy, we can’t discuss any personal or health-related details in a public forum. Please contact our office directly at {contact_method} so we can address your concerns.”

DENT-06 Suspected fake review
“We take all feedback seriously, but we can’t locate this experience based on the information provided here. If you’re open to it, please contact us at {contact_method} so we can look into it.”

C2. MED SPA TEMPLATES
MSPA-01 Positive
“Thank you for the great review. We appreciate your support and we’re glad you enjoyed your experience at {business_name}.”

MSPA-02 Neutral
“Thanks for sharing your feedback. We appreciate you taking the time to leave a review.”

MSPA-03 Mild negative (front desk/ambience/wait)
“Thank you for the feedback. We’re sorry to hear this wasn’t the experience you expected. Please contact us directly at {contact_method} so we can learn more and improve.”

MSPA-04 Strong negative (results dissatisfaction) — avoid guarantees
“We’re sorry to hear you’re unhappy. Experiences can vary, and we’d like to understand your concerns and discuss options privately. For privacy reasons we can’t address specifics here—please contact us at {contact_method}.”

MSPA-05 Safety/medical claim mention by reviewer (manual review; no specifics)
“Thank you for bringing this to our attention. We take safety and quality seriously. We can’t discuss details publicly, but we’d like to connect directly—please contact us at {contact_method}.”

MSPA-06 Suspected fake / competitor bait
“We take feedback seriously, but we can’t confirm details based on this post. Please contact us at {contact_method} so we can look into it.”

C3. HVAC TEMPLATES
HVAC-01 Positive
“Thank you for the review. We appreciate you choosing {business_name} and we’re glad our team could help.”

HVAC-02 Neutral
“Thanks for the feedback—we appreciate you taking the time to share your experience.”

HVAC-03 Mild negative (late arrival/communication)
“Thanks for letting us know. We’re sorry for the inconvenience and we’re working to improve our scheduling and communication. Please reach out at {contact_method} so we can follow up.”

HVAC-04 Strong negative (work quality) — avoid admissions
“We’re sorry to hear this. We take workmanship concerns seriously and want to understand what happened. Please contact us directly at {contact_method} so we can look into this and help. We can’t address details publicly.”

HVAC-05 Alleged damage/safety issue (manual review recommended)
“We’re concerned to hear this and want to address it promptly. Please contact us directly at {contact_method} so we can gather details and assist. For privacy and accuracy, we can’t discuss specifics here.”

HVAC-06 Suspected fake review
“We take feedback seriously, but we can’t identify this job from the information provided. Please contact us at {contact_method} so we can look into it.”

========================================
D) GO/NO-GO EXIT CRITERIA (objective)
========================================
Launch is “GO” only if all are true:
1) Detectors
- PHI confirmation detector blocks “chart/records/visit/appointment/procedure/results” style phrasing.
- Legal-threat detector forces blocked_manual_review.
- Incentive language detector blocks discounts/freebies-for-reviews.
2) Posting gates
- Any blocked_manual_review cannot be posted via API or UI.
- Any response containing blocked phrases cannot be posted.
3) Audit trail
- Logs include: review_source, review_id, review_text_hash, detected_risk_flags, escalation_level, draft_version, approver_id, approval_timestamp, posted_timestamp, post_status, hold_reason, detector_version.
4) Weekly KPIs
- Response rate, response time, escalations, blocked vs posted reconciliation all match audit logs.
5) Template library
- Only templates from section C (or approved variants) are selectable for auto-draft in the three verticals.

========================================
E) CUSTOMER-FACING COMPLIANCE NOTES (optional for sales deck)
========================================
- The system is designed to avoid sharing sensitive details publicly, to move resolution offline, and to require manual review for legal/safety/PHI situations.
- It does not create or solicit fake reviews, does not offer incentives for reviews, and does not ask customers to remove reviews.

If you want, I can also produce a “customer onboarding questionnaire” that gathers brand voice preferences and escalation contacts while explicitly avoiding collection of PHI and other sensitive data.
