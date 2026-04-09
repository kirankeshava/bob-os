# Brand Safety + Escalation Playbook + Approved Templates v3 (Google Business Profile & Yelp) — AI Review Reply & Reputation Autopilot

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T04:41:46.389Z

---

Website for legitimacy (include in customer comms): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

========================================
1) BRAND-SAFETY & PLATFORM-POLICY CHECKLIST v3 (OPERATOR TICK-BOX)
========================================
Use this checklist for every response before approval/posting.

A. Universal “DO NOT POST” (manual-only hold required)
[ ] Review mentions or implies PHI/health details (HIPAA risk): diagnosis, treatment plan, appointment specifics, “my chart/records,” meds, procedures, photos, insurance details.
[ ] Reviewer threatens legal action or mentions attorney/lawsuit/suing/court/BBB demand letters.
[ ] Safety incident with potential injury, property damage, fire, gas leak, electrical hazard.
[ ] Harassment/hate speech/violent threats (escalate + consider platform report).
[ ] Active dispute where business needs to confirm identity, facts, or payment records to respond.

B. “Hard Blocks” (response text must NOT include)
[ ] Any confirmation of reviewer as a customer/patient: “We treated you,” “your visit,” “we reviewed your chart/records,” “after your procedure,” “your appointment on…”.
[ ] Liability admission: “We were at fault,” “we caused,” “our mistake caused damage,” “we negligently…”.
[ ] Medical outcome guarantees: “results guaranteed,” “permanent,” “no risks,” “100%,” “cure,” “painless,” “will fix.”
[ ] Incentives/solicitation: “discount for a review,” “free service for 5 stars,” “gift card,” “we’ll refund if you change rating.”
[ ] Review gating: “Only leave a review if you’re happy,” “contact us first before reviewing.”
[ ] Competitor disparagement: “unlike [competitor],” “they’re scammers,” “their work is bad.”
[ ] Doxxing: names of staff (unless generic role), addresses beyond business address, phone numbers of individuals, license numbers, or any personal identifiers.

C. Required elements for any negative/neutral response
[ ] Calm, non-inflammatory tone; no sarcasm; no accusations.
[ ] Does not debate facts publicly; invites offline resolution.
[ ] Includes a clear offline CTA with one contact path (phone/email) and a timeframe.
[ ] Mentions “we take feedback seriously” without admitting wrongdoing.

D. Google Business Profile vs Yelp notes (must comply)
Google:
[ ] Avoid personal info; do not reveal private customer details.
[ ] Do not offer incentives for reviews.
Yelp:
[ ] Do not ask for reviews in the response; do not imply Yelp will remove reviews.
[ ] Do not mention “Yelp policy,” “we reported you to Yelp,” or “Yelp will take this down.”

E. Hallucination control (must be true or clearly generic)
[ ] No invented names, dates, services performed, prices, diagnosis, warranties, or internal actions.
[ ] If details unknown, use “we’d like to learn more” and ask for offline contact.

========================================
2) ESCALATION PLAYBOOK v3 (COMMON NEGATIVE SCENARIOS)
========================================
Escalation levels:
- L0: Safe to auto-draft + human approve + post
- L1: High sensitivity; human approval required (default for most negatives)
- L2: Hold—manual only (no posting) pending internal review
- Legal: Hold—manual only; route to legal counsel/owner same-day

Routing SLAs:
- Safety incident/injury/property damage: Owner/GM within 4 hours
- Service failure/quality issue: Ops manager within 24 hours
- Billing/insurance/payment disputes: Billing lead within 24 hours
- Legal threats: Legal/Owner same-day
- PHI/HIPAA: Compliance/Owner same-day (no public posting)

Scenario A: Billing dispute ("overcharged", "hidden fees")
- Escalation: L1 (or L2 if accusations include fraud/crime)
- Evidence to collect: invoice, signed estimate/authorization, payment logs, any comms.
- Public response (safe): Acknowledge concern + invite offline; do not quote prices publicly unless verified and approved.

Scenario B: Poor outcome / dissatisfaction (dentist/med spa)
- Escalation: L2 if medical specifics/PHI; otherwise L1
- Evidence: consent forms, clinical notes (internal only), before/after policy compliance.
- Public response: No confirmation of care; generic empathy + offline contact.

Scenario C: Alleged injury/damage (HVAC property damage; med injury)
- Escalation: L2 + Owner within 4h
- Evidence: photos, work order, technician notes, insurance info, witness statements.
- Public response: Do not admit fault; express concern and request offline contact.

Scenario D: Discrimination/harassment allegation
- Escalation: L2 + Owner/HR within 4h
- Evidence: staff schedule, camera logs if applicable, written statements.
- Public response: Take seriously; invite direct contact with management; no debate.

Scenario E: Legal threats ("my lawyer", "sue")
- Escalation: Legal (manual-only hold; do not post)
- Evidence: full review text, any prior comms.
- Action: internal counsel review; consider platform report if threatening.

Scenario F: Suspected fake review / wrong business
- Escalation: L1
- Evidence: customer records lookup (internal only), booking logs.
- Public response: Do not call them a liar; state you can’t locate details and ask offline contact; optionally suggest they may have intended another business.

Scenario G: PHI mention / HIPAA risk (dentist/med)
- Escalation: L2 (manual-only hold)
- Action: do not post any response confirming relationship; route to compliance.

========================================
3) APPROVED RESPONSE TEMPLATE LIBRARY v3
========================================
Rules for all templates:
- Allowed variables: {business_name}, {city}, {contact_email}, {contact_phone}, {signoff_name_or_role}
- Prohibited variables: patient/customer name, appointment date/time, procedure type, diagnosis, technician name, invoice totals.
- Offline CTA required for neutral/negative: provide either email or phone (one primary).
- For Yelp: do NOT mention Yelp enforcement/removal; do NOT ask for reviews.

-------------------------
A) DENTIST TEMPLATES (Google/Yelp)
-------------------------
DENT-POS-01 (Positive)
“Thank you for the kind words and for taking the time to share your experience with {business_name}. We appreciate your support and look forward to seeing you again. — {signoff_name_or_role}”

DENT-NEU-01 (Neutral/short)
“Thanks for the feedback. If there’s anything we could have done to make your experience better, we’d like to learn more. Please reach us at {contact_email} so our team can help. — {signoff_name_or_role}”

DENT-NEG-01 (Mild negative; no PHI confirmation)
“Thank you for sharing this. We’re sorry to hear you felt disappointed. Because we can’t discuss details publicly, we’d like to learn more and see how we can help—please contact us at {contact_email}. — {signoff_name_or_role}”

DENT-NEG-02 (Strong negative; keep calm)
“We take concerns like this seriously and would like the chance to address them. To protect everyone’s privacy, we can’t go into details here. Please contact {business_name} at {contact_phone} so a manager can follow up. — {signoff_name_or_role}”

DENT-FAKE-01 (Suspected fake/wrong office)
“Thanks for the review. We’re not able to match the details here to our records, and we’d like to make sure this is directed to the right place. Please contact us at {contact_email} with any information you’re comfortable sharing so we can look into it. — {signoff_name_or_role}”

DENT-RECOV-01 (Service recovery without liability)
“We appreciate the feedback and the opportunity to improve. If you’re open to it, please email {contact_email} so we can understand what happened and work toward a resolution. — {signoff_name_or_role}”

HARD NOTE (Dentist): If reviewer mentions procedure/diagnosis/insurance/records → L2 hold, do not post.

-------------------------
B) MED SPA TEMPLATES (Google/Yelp)
-------------------------
MSPA-POS-01
“Thank you for your kind feedback. We’re grateful you chose {business_name} and we appreciate you taking the time to share this. — {signoff_name_or_role}”

MSPA-NEU-01
“Thanks for the note. We’re always working to improve. If you’re willing, please reach out at {contact_email} so we can better understand your experience. — {signoff_name_or_role}”

MSPA-NEG-01 (No outcome promises)
“We’re sorry to hear this didn’t meet expectations. We can’t discuss details in a public forum, but we’d like to learn more and help if possible—please contact us at {contact_email}. — {signoff_name_or_role}”

MSPA-NEG-02 (Strong negative)
“Thank you for bringing this to our attention. We take feedback seriously and would like a chance to address your concerns directly. Please call {contact_phone} so a manager can follow up. — {signoff_name_or_role}”

MSPA-FAKE-01
“Thanks for the review. We’re not finding enough information to identify what this relates to, and we want to ensure we understand correctly. Please email {contact_email} so we can look into it. — {signoff_name_or_role}”

MSPA-RECOV-01
“We appreciate you sharing this. If you’re open to it, please contact {contact_email} so we can understand what happened and see what options are available. — {signoff_name_or_role}”

HARD NOTE (Med Spa): Never claim medical outcomes, permanence, “guaranteed results,” or discuss treatments performed. PHI mention → L2 hold.

-------------------------
C) HVAC TEMPLATES (Google/Yelp)
-------------------------
HVAC-POS-01
“Thanks for the great review and for choosing {business_name}. We appreciate your support and are glad our team could help. — {signoff_name_or_role}”

HVAC-NEU-01
“Thank you for the feedback. We’re always looking to improve. Please contact us at {contact_email} so we can learn more about your experience. — {signoff_name_or_role}”

HVAC-NEG-01 (Mild)
“We’re sorry to hear this wasn’t the experience you expected. We’d like to learn more and help resolve it—please reach out at {contact_phone}. — {signoff_name_or_role}”

HVAC-NEG-02 (Strong; no liability)
“Thank you for bringing this to our attention. We take concerns seriously and would like to review what happened. Please contact {business_name} at {contact_email} so a manager can follow up. — {signoff_name_or_role}”

HVAC-DAMAGE-01 (Alleged damage; careful)
“We’re concerned to hear this and would like to look into it promptly. Please contact us at {contact_phone} so we can gather details and coordinate next steps. — {signoff_name_or_role}”

HVAC-FAKE-01
“Thanks for the review. We’re not able to match the details here to our service records. Please contact us at {contact_email} so we can confirm what this relates to and help if we can. — {signoff_name_or_role}”

HARD NOTE (HVAC): If gas leak/fire/electrical hazard/injury alleged → L2 hold + safety escalation within 4h.

========================================
4) CUSTOMER COMMUNICATION (WHEN A RESPONSE IS BLOCKED/HELD)
========================================
Internal note to customer (business owner) when manual-only hold triggers:
“Your review response was placed on HOLD (manual-only) due to policy/safety risk: {hold_reason}. This prevents accidental violations (PHI/legal/safety). Recommended next step: follow the escalation playbook for {scenario} and approve either (a) a revised compliant public response or (b) no public response. Reference site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

========================================
5) RELEASE/OPS NOTE
========================================
- Default posture: for negatives, be brief, empathetic, and move offline.
- Never confirm a patient/customer relationship on medical verticals.
- Legal threats: do not post; route same-day.
- Yelp: do not discuss Yelp actions or ask for reviews.

End of v3 pack.