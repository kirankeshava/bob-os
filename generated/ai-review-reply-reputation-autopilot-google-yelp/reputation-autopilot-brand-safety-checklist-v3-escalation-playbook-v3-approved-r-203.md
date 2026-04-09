# Reputation Autopilot — Brand Safety Checklist v3 + Escalation Playbook v3 + Approved Response Templates Pack v3 (Dentist/Med Spa/HVAC, Google/Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T04:36:49.476Z

---

Website for customer reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

PART A — BRAND-SAFETY CHECKLIST v3 (GOOGLE BUSINESS PROFILE + YELP)
Use this before approving or posting any response. If any “HARD STOP” triggers, do not post; escalate.

A1) HARD STOP: Do Not Post (manual-only hold)
1) PHI/HIPAA risk (healthcare/med spa/dentist): reviewer mentions diagnosis, procedure details, meds, appointment date/time, clinician name tied to treatment, photos of medical areas, “my chart/records,” or asks you to confirm treatment occurred.
   - Required action: set response_mode=HOLD_MANUAL and escalation_level=PHI.
2) Legal threat: “lawsuit/sue/attorney/legal action/demand letter,” or explicit intent to litigate.
   - Required action: response_mode=HOLD_MANUAL and escalation_level=LEGAL.
3) Safety incident or injury claim: “hurt/injured/burned/bleeding/electrical fire/carbon monoxide,” allegations of assault, intoxication, or imminent risk.
   - Required action: HOLD_MANUAL, escalation_level=SAFETY.
4) Harassment/hate speech/threats: slurs, threats of violence, stalking.
   - Required action: HOLD_MANUAL, escalation_level=SECURITY.
5) Doxxing/privacy: addresses, phone numbers, license plates, staff last names, screenshots of invoices containing personal data.
   - Required action: HOLD_MANUAL, escalation_level=PRIVACY.

A2) Prohibited Content (must never appear in a posted response)
- Incentives or solicitation: “discount,” “free,” “gift card,” “we’ll pay,” “we’ll refund if you change your review,” “leave us a 5-star.”
- Review gating: asking only happy customers to review, or directing unhappy customers elsewhere.
- Removal promises: “We’ll get Yelp/Google to remove this,” “reporting you to Yelp to take it down.”
- PHI confirmation: “We reviewed your chart/records/visit,” “As your provider,” “During your appointment on [date].”
- Medical outcome guarantees: “We guarantee results,” “permanent,” “cure,” “no pain,” “100% safe.”
- Liability admission: “It was our fault,” “We caused damage,” “We messed up,” “We were negligent.”
- Retaliation/argument: “You’re lying,” “You’re wrong,” “You deserved it,” sarcasm, threats.
- Competitor disparagement: “Our competitor is a scam,” “They overcharge,” “they’re unlicensed.”

A3) Required Elements in Any Non-Hold Response
- Thank the reviewer (even if negative) and acknowledge feelings without admitting fault.
- Keep it brief, calm, and professional.
- Move resolution offline: provide a contact path (phone/email) and invite details privately.
- For service businesses: reference general commitment to quality + willingness to make it right.
- Avoid names and specific appointment/service details unless the reviewer already publicly stated them AND they are not medical/PHI.

A4) Tone and Hallucination Controls
- Never invent facts: no dates, staff names, policies, pricing, diagnosis, or “we checked our system” unless verified.
- If unsure: use neutral language: “We’d like to learn more,” “Please contact us so we can look into this.”
- No blaming the customer.

A5) Platform Notes (encode as checks)
Google Business Profile:
- Avoid incentives and review manipulation.
- Avoid revealing personal data.
- Avoid argumentative exchanges; keep concise.
Yelp:
- Extra caution: do not mention Yelp enforcement/removal. Do not ask for review changes in exchange for anything.
- Keep to service recovery and offline contact.

A6) Quick Decision Tree
1) Does review include PHI/legal threat/safety/threats/doxxing? -> HOLD_MANUAL + escalate.
2) Is it a suspected fake/competitor review? -> Use “Suspected Fake” template; do not accuse; invite offline verification.
3) Negative but non-safety: billing, scheduling, quality -> Use appropriate negative template + offline CTA.
4) Positive/neutral -> Thank + reinforce values.

PART B — ESCALATION PLAYBOOK v3 (LEVELS, ROUTING, SLAs)

B1) Escalation Levels
- Level 0 (Auto-respond OK): positive/neutral, mild complaints without safety/legal/PHI.
- Level 1 (Ops attention): service quality, delays, rude staff claims, non-urgent billing confusion.
- Level 2 (Urgent): property damage allegation, refund demand with threats to post more reviews, discrimination claim, repeated pattern by same user.
- Level 3 (HOLD_MANUAL): PHI/HIPAA risk, legal threat, safety incident/injury, harassment/threats, doxxing.

B2) Routing + SLAs (recommended)
- Level 1 -> Ops/GM within 24 hours.
- Level 2 -> Owner/GM within 4 hours; Billing within 24 hours if payment dispute.
- Level 3 -> Owner same-day; Legal same-day for legal threats; Privacy officer for PHI; Safety lead immediate for injury claims.

B3) Evidence Collection Checklist (internal)
- Screenshot of the review + timestamp + platform + URL.
- Internal job/appointment records (do not reference publicly).
- Staff statements + any call recordings (if compliant).
- Photos/work orders/invoices (keep private).
- Prior customer communications.

B4) Response Guidance by Scenario (public wording rules)
1) Billing dispute (Level 1/2)
- Public: acknowledge concern; invite offline; avoid quoting amounts unless customer already posted and you can verify.
- Don’t: accuse of non-payment; reveal invoice details.
2) Service quality complaint (Level 1)
- Public: apologize for experience (not fault), ask to contact manager.
- Don’t: argue point-by-point.
3) Alleged damage (Level 2)
- Public: take seriously; request offline contact; do not admit liability.
- Internal: open incident ticket; preserve evidence.
4) Safety/injury claim (Level 3)
- Public: HOLD_MANUAL. If a response is required after review: generic statement + contact info; no specifics.
5) Discrimination claim (Level 2)
- Public: acknowledge seriousness; invite offline; avoid denial/argument.
- Internal: HR review.
6) PHI mention (Level 3)
- Public: HOLD_MANUAL. If posting: never confirm they were a patient; use generic language.
7) Legal threat (Level 3)
- Public: HOLD_MANUAL; do not engage; route to legal.
8) Suspected fake/competitor (Level 1)
- Public: do not accuse; say you can’t locate records and invite offline details.

B5) DO-NOT-POST Conditions (repeat)
- Any PHI confirmation language.
- Any legal threat present.
- Any safety incident/injury.
- Any doxxing or harassment.

PART C — APPROVED RESPONSE TEMPLATES PACK v3 (PER VERTICAL + PLATFORM VARIANTS)
Rules for all templates:
- Allowed variables: {business_name}, {contact_phone}, {contact_email}, {signoff_name_or_team}.
- Never inject: staff names, appointment dates, diagnosis, procedure specifics, prices unless verified and already public.
- Required offline CTA: phone/email.
- Yelp variant removes any wording that could be interpreted as platform enforcement.

C1) DENTIST TEMPLATES
DENT-G-POS (Google Positive)
“Thank you for taking the time to leave a review. We’re glad you had a great experience at {business_name}. If there’s ever anything we can do to support you, please reach us at {contact_phone} or {contact_email}. — {signoff_name_or_team}”

DENT-Y-POS (Yelp Positive)
“Thank you for the kind feedback. We appreciate you choosing {business_name}. If you ever need anything, you can reach us at {contact_phone} or {contact_email}. — {signoff_name_or_team}”

DENT-G-NEG-MILD (Mild negative)
“Thank you for the feedback. We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and see how we can help—please contact us at {contact_phone} or {contact_email}. — {signoff_name_or_team}”

DENT-Y-NEG-MILD
“Thank you for sharing this. We’re sorry it didn’t meet your expectations and would like the chance to help. Please reach us at {contact_phone} or {contact_email}. — {signoff_name_or_team}”

DENT-G-NEG-STRONG (Strong negative; no PHI)
“We take concerns like this seriously and want to understand what happened. Because we can’t address details in a public forum, please contact {business_name} at {contact_phone} or {contact_email} so a manager can review and follow up. — {signoff_name_or_team}”

DENT-Y-NEG-STRONG
“We take concerns seriously and would like to learn more. Please contact {business_name} at {contact_phone} or {contact_email} so we can look into this. — {signoff_name_or_team}”

DENT-SUS-FAKE (Suspected fake/unknown reviewer)
“Thank you for the note. We’re unable to locate information that matches your description, and we’d like to understand more. Please contact us at {contact_phone} or {contact_email} with details so we can review. — {signoff_name_or_team}”

DENT-PHI-SAFE (If reviewer discloses health details; only if not HOLD)
“Thank you for your feedback. To protect privacy, we can’t discuss any details here, but we’d like to help. Please contact {business_name} at {contact_phone} or {contact_email}. — {signoff_name_or_team}”

C2) MED SPA TEMPLATES
MS-G-POS
“Thank you for your review. We’re happy you enjoyed your experience at {business_name}. If you have any questions or need assistance, contact us at {contact_phone} or {contact_email}. — {signoff_name_or_team}”

MS-Y-POS
“Thank you for the feedback. We’re glad you had a great visit at {business_name}. Reach us anytime at {contact_phone} or {contact_email}. — {signoff_name_or_team}”

MS-NEG-MILD
“Thank you for sharing this. We’re sorry it wasn’t what you expected. We’d like to learn more and make things right—please reach out at {contact_phone} or {contact_email}. — {signoff_name_or_team}”

MS-NEG-STRONG (no medical guarantees)
“We strive to provide a high-quality experience and take concerns seriously. We can’t address specifics publicly, but we’d like to help—please contact {business_name} at {contact_phone} or {contact_email}. — {signoff_name_or_team}”

MS-NO-GUARANTEE (When reviewer mentions results/outcomes)
“Thank you for your feedback. Individual experiences can vary, and we’d like to understand your concerns. Please contact us at {contact_phone} or {contact_email} so we can discuss options privately. — {signoff_name_or_team}”

MS-SUS-FAKE
“Thank you for the review. We’d like to look into this, but we can’t match it to our records from the information provided. Please contact {contact_phone} or {contact_email} with details so we can investigate. — {signoff_name_or_team}”

C3) HVAC TEMPLATES
HVAC-G-POS
“Thank you for the review. We appreciate you choosing {business_name} and we’re glad we could help. If you ever need anything, reach us at {contact_phone} or {contact_email}. — {signoff_name_or_team}”

HVAC-Y-POS
“Thanks for the feedback. We appreciate your business and are glad the team could help. Contact us anytime at {contact_phone} or {contact_email}. — {signoff_name_or_team}”

HVAC-NEG-MILD (late arrival, communication)
“Thank you for letting us know. We’re sorry for the inconvenience and would like to improve. Please contact us at {contact_phone} or {contact_email} so we can follow up. — {signoff_name_or_team}”

HVAC-NEG-STRONG (service quality)
“We’re sorry to hear this and take it seriously. We’d like to understand what happened and help resolve it—please contact {business_name} at {contact_phone} or {contact_email}. — {signoff_name_or_team}”

HVAC-DAMAGE-ALLEGATION (no liability admission)
“Thank you for bringing this to our attention. We take any concern about property or workmanship seriously and would like to review it promptly. Please contact us at {contact_phone} or {contact_email} so we can gather details and follow up. — {signoff_name_or_team}”

HVAC-SUS-FAKE
“Thank you for the note. We’d like to investigate, but we can’t identify the service from the details provided here. Please contact {contact_phone} or {contact_email} so we can look into this. — {signoff_name_or_team}”

PART D — PLATFORM POLICY ALIGNMENT (TESTABLE CHECKS)
For any response generated/approved, assert:
1) No incentives/discounts/freebies mentioned.
2) No request for ‘5-star’ or conditional review requests.
3) No promise to remove/report the review for takedown.
4) No competitor disparagement.
5) No PHI confirmation language (“your visit/your chart/your records”).
6) Any legal threat -> response_mode=HOLD_MANUAL and post_status=blocked_manual_review.
7) Any PHI/safety/doxxing -> HOLD_MANUAL.
8) Offline CTA present with {contact_phone} or {contact_email}.

If you want these templates to include your exact support email/phone for customer comms, provide the preferred contact details and sign-off name (e.g., “Customer Care Team”).