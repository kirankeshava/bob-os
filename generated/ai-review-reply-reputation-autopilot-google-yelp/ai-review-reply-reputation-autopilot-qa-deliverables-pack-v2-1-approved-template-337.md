# AI Review Reply & Reputation Autopilot — QA Deliverables Pack v2.1 (Approved Templates + Brand-Safety Checklist + Escalation Playbook)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:23:02.286Z

---

This pack is the compliance/brand-safety “source of truth” for AI-drafted review responses for Google Business Profile (GBP) and Yelp. It is designed to prevent liability admissions, PHI/HIPAA confirmation, medical outcome guarantees, incentive/solicitation language, competitor disparagement, and policy-violating statements (e.g., promising review removal). Any response that cannot be safely posted must be placed into manual-only hold with a logged reason.

1) BRAND-SAFETY CHECKLIST v2.1 (Pre-Post Approval Gate)
A. Universal must-haves (all platforms)
- ☐ Tone is calm, respectful, non-argumentative; no sarcasm, no blame.
- ☐ No admission of liability or fault (avoid: “we messed up”, “our mistake caused…”). Prefer: “We’re sorry to hear this didn’t meet expectations.”
- ☐ No mention of internal records/verification that confirms identity (avoid: “we reviewed your chart/records/visit/appointment”).
- ☐ No personal data: no staff last names, no customer names (unless explicitly present and low-risk), no appointment dates/times, no address details, no phone numbers of the reviewer.
- ☐ No incentives/discounts in exchange for reviews; no review gating; no “please change/remove your review.”
- ☐ Required CTA to take it offline: provide a contact path (phone/email/website form) and invite direct resolution.
- ☐ Response is specific without inventing facts; if uncertain, keep generic.

B. Medical/HIPAA/PHI (Dentist + Med Spa)
- ☐ Do not confirm they are a patient/client or discuss treatments, outcomes, diagnoses, or visit details.
- ☐ Avoid medical guarantees (no: “results guaranteed”, “permanent fix”).
- ☐ If review contains PHI bait, use PHI-safe template and escalate to manual review.

C. Legal/safety incidents (all verticals)
- ☐ If reviewer mentions attorney/lawsuit/sue/police/insurance claim/injury, DO NOT POST automatically.
- ☐ Set manual-only hold; escalation_level=Legal or Safety; collect evidence internally.

D. Yelp-specific do/don’t
- ☐ Do not claim Yelp will remove a review or that you can “get it taken down.”
- ☐ Do not reference Yelp enforcement actions; keep response focused on customer care.

Hard DO NOT POST triggers (must be manual-only hold)
- Any legal threat language (“attorney”, “lawsuit”, “sue”, “court”, “police report”, “insurance claim”).
- Any PHI/identity confirmation risk where a safe generic response cannot be produced.
- Threats/harassment/doxxing content requiring safety review.

2) ESCALATION PLAYBOOK v2.1 (Scenarios, Routing, SLAs)
Escalation levels
- Level 0: No escalation (positive/neutral).
- Level 1: Ops follow-up (service issue, scheduling, mild dissatisfaction).
- Level 2: Manager/Owner (strong negative, refund demand, alleged damage, staff conduct).
- Level 3: Legal/Safety manual-only hold (injury, discrimination allegations, threats, lawsuit/attorney).

Routing + SLA targets
- Service quality/scheduling: Ops Manager within 24h.
- Billing/pricing dispute: Billing lead within 24h.
- Alleged property damage (HVAC) / injury (any): Owner/GM within 4h; preserve records.
- Legal threats: Legal same-day; DO NOT POST.
- HIPAA/PHI bait (medical): Compliance lead within 4h; post only PHI-safe generic if approved.

Evidence checklist (collect internally; never post publicly)
- Original review text + timestamp + platform + URL.
- Service records (internal only), staff roster on shift, job notes, photos (HVAC), consent forms (med), communications.
- Proposed resolution steps and who will contact the reviewer.

Public response constraints
- Apologize for experience (not fault), invite offline discussion, avoid details, avoid arguing facts, never accuse reviewer of lying.

3) APPROVED RESPONSE TEMPLATE LIBRARY v2.1
Rules for all templates
- Allowed variables: {BusinessName}, {ContactEmail}, {ContactPhone}, {LocationCity}, {TeamName}.
- BANNED substitutions: reviewer full name, appointment date/time, procedure name, diagnosis, prescription, chart/record references, pricing unless reviewer explicitly stated it and business has verified it.
- If platform requires: keep within typical length (60–120 words ideal).

CONTACTS (for all templates in this pack)
- Website (legitimacy link to share with customers if needed): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support email: agent_bob_replit+review-bot@agentmail.to

A) DENTIST TEMPLATES (Google + Yelp)
DENT-01 Positive
“Thanks for the kind words and for choosing {BusinessName}. We’re glad you had a great experience with our team. If there’s ever anything we can do to make your next visit even better, please reach us at {ContactPhone} or {ContactEmail}. We appreciate you taking the time to leave a review.”

DENT-02 Neutral/Short
“Thank you for your feedback. We’re always working to improve the patient experience. If you’re open to sharing more details privately, please contact us at {ContactPhone} or {ContactEmail} so we can follow up.”

DENT-03 Mild Negative (service/scheduling)
“Thank you for letting us know. We’re sorry to hear your visit didn’t meet expectations. We’d like to learn more and see how we can help—please contact our office at {ContactPhone} or email {ContactEmail}. We appreciate the opportunity to improve.”

DENT-04 Strong Negative (no PHI, no fault admission)
“We’re sorry to hear you’re disappointed. We take concerns seriously and want to address this directly. For privacy reasons we can’t discuss details here, but we’d like to connect and help resolve it—please call {ContactPhone} or email {ContactEmail} at your convenience.”

DENT-05 PHI/HIPAA bait (do not confirm; generic)
“Thank you for your message. For privacy reasons, we can’t discuss or verify any details in a public forum. If you believe there’s an issue we should address, please contact {BusinessName} directly at {ContactPhone} or {ContactEmail} so we can assist.”

DENT-06 Suspected fake / wrong location
“Thanks for the review. We’re unable to locate enough information to understand what this refers to. If you believe this is about {BusinessName}, please reach out at {ContactPhone} or {ContactEmail} with any details you’re comfortable sharing so we can look into it.”

DENT-07 Legal threat (MANUAL-ONLY HOLD — do not auto-post)
Status: blocked_manual_review
Draft (only if Legal approves): “We’re sorry to hear about your concern. We’d like to address this appropriately—please contact {BusinessName} directly at {ContactEmail} so we can route your message to the right team.”

B) MED SPA TEMPLATES (Google + Yelp)
MED-01 Positive
“Thank you for the wonderful feedback. We’re glad you enjoyed your experience at {BusinessName}. If you have questions before your next visit, feel free to contact us at {ContactPhone} or {ContactEmail}. We appreciate your support.”

MED-02 Neutral/Short
“Thanks for sharing your feedback. We’re always working to improve. If you’d like to discuss your experience privately, please contact us at {ContactPhone} or {ContactEmail}.”

MED-03 Mild Negative (service feel)
“We’re sorry to hear this wasn’t the experience you expected. We’d like to learn more and help make it right. Please contact {BusinessName} at {ContactPhone} or {ContactEmail} so we can follow up privately.”

MED-04 Strong Negative (no medical claims)
“Thank you for bringing this to our attention. We take concerns seriously and want to address them directly. For privacy reasons we can’t discuss details here—please contact us at {ContactPhone} or {ContactEmail} so we can assist.”

MED-05 PHI/medical outcome bait (no confirmation, no guarantees)
“Thanks for your message. We can’t discuss or verify any details publicly. If you’d like support, please contact {BusinessName} at {ContactPhone} or {ContactEmail} so we can help you privately.”

MED-06 Suspected fake / competitor bait
“We take feedback seriously, but we’re not able to confirm what this refers to based on the information provided. If you believe this concerns {BusinessName}, please contact {ContactEmail} so we can look into it.”

MED-07 Legal threat (MANUAL-ONLY HOLD)
Status: blocked_manual_review
Draft (only if approved): “We’re sorry to hear about your concern. Please contact {BusinessName} at {ContactEmail} so we can route this to the appropriate team.”

C) HVAC TEMPLATES (Google + Yelp)
HVAC-01 Positive
“Thanks for choosing {BusinessName} and for taking the time to leave a review. We’re glad our team could help. If you ever need assistance in the future, you can reach us at {ContactPhone} or {ContactEmail}.”

HVAC-02 Neutral/Short
“Thank you for your feedback. If you’re willing, we’d like to learn more so we can improve—please contact {BusinessName} at {ContactPhone} or {ContactEmail}.”

HVAC-03 Mild Negative (delay/scheduling)
“We’re sorry to hear about the inconvenience. We aim to provide timely service and would like to understand what happened. Please contact us at {ContactPhone} or {ContactEmail} so we can follow up and help resolve this.”

HVAC-04 Strong Negative (quality dispute; no fault admission)
“Thank you for sharing this. We take service concerns seriously and want to address them directly. Please contact {BusinessName} at {ContactPhone} or {ContactEmail} with the best way to reach you so we can review and assist.”

HVAC-05 Alleged damage/injury (MANUAL-ONLY HOLD recommended)
Status: blocked_manual_review
Draft (only if approved): “We’re sorry to hear about your concern. We’d like to address this directly—please contact {BusinessName} at {ContactEmail} or {ContactPhone} so we can route this to the appropriate team.”

HVAC-06 Suspected fake / wrong company
“Thanks for the review. We’re not seeing enough information to identify this job. If you believe this is about {BusinessName}, please contact {ContactEmail} with any details you’re comfortable sharing so we can look into it.”

HVAC-07 Competitor comparison bait (no disparagement)
“Thank you for the feedback. We focus on providing reliable service and would like to learn more about your experience. Please contact {ContactPhone} or {ContactEmail} so we can follow up directly.”

4) QA NOTES (What these templates are designed to prevent)
- Hallucination control: templates avoid specific promises, diagnoses, job details, and “we found your account/visit.”
- Liability control: avoids admitting fault; uses empathetic but non-committal language.
- Platform compliance: no incentives, no gating (“leave us 5 stars”), no removal promises, no retaliation.
- Safety gating: legal threats and injury/damage scenarios default to blocked_manual_review.

If customer asks “prove legitimacy” in private correspondence, share: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 and use agent_bob_replit+review-bot@agentmail.to as the contact email.
