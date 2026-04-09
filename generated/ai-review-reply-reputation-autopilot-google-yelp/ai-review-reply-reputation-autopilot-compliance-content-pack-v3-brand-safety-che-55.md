# AI Review Reply & Reputation Autopilot — Compliance Content Pack v3 (Brand-Safety Checklist + Escalation Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T01:33:12.949Z

---

Business legitimacy link to share with customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

PART A — BRAND-SAFETY CHECKLIST v3 (Google Business Profile + Yelp)
Use this as a pre-post QA gate for every response (draft or template). If any FAIL condition is present, set post_status=blocked_manual_review and escalate.

A1. Required elements (must PASS)
1) Tone: calm, respectful, non-argumentative, no sarcasm, no blame. PASS/FAIL
2) Accuracy: response does not invent facts (dates, services performed, pricing, outcomes). PASS/FAIL
3) Privacy: no personal data about the reviewer or staff; no appointment/visit confirmation. PASS/FAIL
4) Offline CTA: includes a neutral invitation to continue privately (phone/email) without incentives. PASS/FAIL
5) Brand-safe positioning: acknowledges feelings/experience without admitting wrongdoing or liability. PASS/FAIL

A2. Hard-block prohibited content (must be absent; auto-block if detected)
PHI/HIPAA confirmation risk (especially for healthcare):
- Block phrases (or close variants): “your chart”, “your records”, “your visit”, “your appointment”, “we reviewed your file”, “according to our notes”, “we checked your X-ray”, “treatment plan”, “procedure you received”, “diagnosis”.
- Rule: Never confirm they are/were a patient. Use generic phrasing: “We take all feedback seriously. Please contact our office so we can look into this.”

Medical/clinical outcome claims (med spa/dentist):
- Block: “guarantee”, “results guaranteed”, “permanent”, “no risk”, “100% safe”, “clinically proven” (unless owner-provided substantiation and approved), “will cure”, “will fix”.
- Rule: No promises; no individualized medical advice.

Liability admission / negligence:
- Block: “it was our fault”, “we made a mistake”, “we caused”, “we’re responsible”, “we admit”, “negligent”.
- Rule: Use service-recovery language without fault admission: “We’re sorry to hear this and want to learn more.”

Incentives / review gating (Google/Yelp):
- Block: “discount for review”, “free gift”, “coupon”, “in exchange for”, “we’ll refund if you remove”, “contact us and we’ll make it right if you update your review”.
- Rule: Never ask for a review change; never offer compensation tied to reviews.

Doxxing/PII:
- Block: phone numbers, addresses, last names, appointment times, invoice numbers, license plate, etc. (except business contact info).

Harassment/retaliation:
- Block: threats, insults, “we’ll report you”, “we know who you are”, “defamation”, “slander” (publicly).

Competitor disparagement:
- Block: “our competitor”, “they always…”, “unlike X”, “they’re lying”.

Legal threats detector (manual-only hold)
- Trigger terms: “lawyer”, “attorney”, “lawsuit”, “sue”, “court”, “legal action”, “demand letter”, “settlement”, “BBB complaint” (treat as high-risk), “insurance claim”.
- Action: block posting; escalation_level=Legal; response_mode=hold_manual_only.

Safety incident detector (manual-only hold)
- Trigger: injury, burns, infection, gas leak, carbon monoxide, flooding, “unsafe”, “hazard”, “emergency”, “police”, “fire department”.
- Action: block posting; escalation_level=Safety; response_mode=hold_manual_only.

A3. Required safe alternatives (use these patterns)
- Empathy without admission: “We’re sorry to hear you had a frustrating experience.”
- No patient confirmation: “We can’t discuss details here, but we’d like to connect.”
- Offline CTA: “Please contact [phone/email] so we can learn more and help.”
- If suspected fake: “We can’t locate this experience from the details provided. Please reach out so we can verify and assist.” (No accusations.)

A4. Platform-specific constraints (quick notes)
Google Business Profile:
- Avoid discussing enforcement/removal; do not promise Google will remove reviews.
Yelp:
- Same: do not claim Yelp will remove or that you can remove; do not pressure for updates; keep it brief and non-defensive.

PART B — ESCALATION PLAYBOOK v3 (Scenario-based)
Routing SLAs (from detection to human acknowledgment internally):
- Safety incident: Owner/GM immediately, target <4 hours. Do not post publicly until reviewed.
- Legal threat: Owner + Legal same business day. Do not post publicly until reviewed.
- PHI/identity/privacy: Compliance lead/Owner <4 hours. Do not post publicly.
- Service failure (quality/timeliness): Ops/GM <24 hours.
- Billing/pricing dispute: Billing/Owner <24 hours.
- Discrimination/harassment allegations: Owner/HR <4 hours; do not argue publicly.

Evidence checklist (collect before any public response if high risk)
- Review screenshot + URL + timestamp
- Internal job/appointment lookup attempt (without confirming publicly)
- Call logs / ticket history
- Staff on duty / technician assignment
- Photos, invoices, signed work orders (HVAC)
- Consent/communications notes (healthcare)

Do-not-post conditions (automatic)
1) Legal threat present
2) Safety incident alleged
3) Any PHI confirmation risk in draft
4) Reviewer provides sensitive personal data; response might repeat it
5) Ongoing investigation where facts are unclear and response could admit liability

Scenario guidance (what to do + safe public posture)
B1) Billing dispute / “overcharged”
- Public response: acknowledge concern, invite offline verification, no price specifics.
- Internal: verify invoice, offer resolution options privately.

B2) Alleged damage (HVAC) / “you broke X”
- Public: no fault admission. Offer inspection/follow-up offline.
- Escalate: Ops + Owner; collect photos, work order, technician notes.

B3) Clinical complaint (dentist/med spa) about outcomes/pain
- Public: no medical advice, no confirmation of treatment. Invite offline.
- Escalate: Clinical lead/Owner; document follow-up plan.

B4) Discrimination/harassment
- Public: serious acknowledgment, invite offline, state commitment to respectful service.
- Internal: HR review; preserve logs.

B5) Suspected fake/competitor
- Public: do not accuse. State you can’t locate, invite offline to verify.
- Internal: check records; report to platform only if clearly fraudulent (no promises publicly).

B6) Threats to “report to Yelp/Google” / “take down review”
- Public: do not discuss platform action. Offer offline assistance.

PART C — APPROVED RESPONSE TEMPLATES v3
Rules for all templates:
- Allowed variables: {BusinessName}, {TeamName}, {ContactEmail}, {ContactPhone}, {City}, {ServiceCategory}.
- Banned substitutions: reviewer name, staff name, appointment date/time, diagnosis/procedure, invoice number, exact pricing unless verified and pre-approved.
- Always include offline CTA with {ContactPhone} or {ContactEmail}.
- If any detector triggers (legal/safety/PHI), do not post; switch to hold.

Include legitimacy link in outreach/customer comms when needed:
- “You can learn more about our response process here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

C1) DENTIST TEMPLATES
DENT-01 Positive (5-star)
“Thank you for the kind words and for choosing {BusinessName}. We’re glad you had a great experience with our team. If you ever have questions or need anything, please reach out at {ContactPhone} or {ContactEmail}. We appreciate you.”

DENT-02 Neutral / brief praise
“Thanks for taking the time to leave feedback for {BusinessName}. We appreciate it and will share it with our team. If there’s anything we can do to help, contact us at {ContactPhone} or {ContactEmail}.”

DENT-03 Mild negative (wait time/communication)
“Thank you for the feedback. We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and see how we can improve—please contact {BusinessName} at {ContactPhone} or {ContactEmail}.”

DENT-04 Strong negative (no PHI, no admission)
“We’re sorry to hear you’re disappointed. We can’t discuss details in a public forum, but we want to understand what happened and help if we can. Please contact our office at {ContactPhone} or {ContactEmail} so we can look into this.”

DENT-05 Suspected fake / cannot locate
“Thank you for the note. We take feedback seriously, but we can’t identify this experience from the information provided here. Please contact {BusinessName} at {ContactPhone} or {ContactEmail} so we can verify and assist.”

DENT-06 Service recovery (after offline resolution)
“Thank you for the feedback and for giving us the chance to follow up. We’re always working to improve the experience at {BusinessName}. If there’s anything else you’d like to share, please contact us at {ContactPhone} or {ContactEmail}.”

C2) MED SPA TEMPLATES
MED-01 Positive
“Thank you for your review and for visiting {BusinessName}. We’re glad you enjoyed your experience. If you have any questions before a future visit, reach us at {ContactPhone} or {ContactEmail}.”

MED-02 Neutral
“Thanks for the feedback. We appreciate you choosing {BusinessName} and will share your comments with our team. For questions, contact {ContactPhone} or {ContactEmail}.”

MED-03 Mild negative (scheduling/front desk)
“We’re sorry to hear this was frustrating. We want to improve and would appreciate the chance to learn more. Please contact {BusinessName} at {ContactPhone} or {ContactEmail}.”

MED-04 Strong negative (no medical claims)
“Thank you for sharing your concerns. We can’t address specifics publicly, but we’d like to connect and better understand your experience. Please contact us at {ContactPhone} or {ContactEmail}.”

MED-05 Suspected fake
“We take all feedback seriously, but we can’t confirm the situation described from the information in this review. Please reach out to {BusinessName} at {ContactPhone} or {ContactEmail} so we can verify and help.”

MED-06 Safety/complication language present (PUBLIC RESPONSE NOT ALLOWED)
Internal note only (do not post): “Trigger detected (safety/medical complication). Set post_status=blocked_manual_review; escalation_level=Safety/Clinical; route to Owner/Clinical Lead <4h.”

C3) HVAC TEMPLATES
HVAC-01 Positive
“Thank you for choosing {BusinessName} and for taking the time to leave a review. We’re glad our team could help. If you need anything else, contact us at {ContactPhone} or {ContactEmail}.”

HVAC-02 Neutral
“Thanks for the feedback. We appreciate the opportunity to serve {City}. If you have questions or need follow-up, please reach out to {BusinessName} at {ContactPhone} or {ContactEmail}.”

HVAC-03 Mild negative (late arrival)
“We’re sorry to hear the timing didn’t meet expectations. We’re always working to improve scheduling and communication. Please contact {BusinessName} at {ContactPhone} or {ContactEmail} so we can learn more.”

HVAC-04 Strong negative (quality concern; no admission)
“Thank you for letting us know. We’re sorry to hear you’re dissatisfied. We’d like to understand what happened and see what we can do to help—please contact {BusinessName} at {ContactPhone} or {ContactEmail}.”

HVAC-05 Alleged damage
“We’re sorry to hear about your concern. We take this seriously and would like to review the details directly. Please contact {BusinessName} at {ContactPhone} or {ContactEmail} so we can look into it.”

HVAC-06 Suspected fake
“Thanks for the review. We can’t locate this service experience from the details provided. Please contact {BusinessName} at {ContactPhone} or {ContactEmail} so we can verify and assist.”

C4) Universal ‘Hold—Manual Only’ templates (not for posting; internal)
HOLD-LEGAL (detector: sue/lawyer)
“Do not post. Escalation_level=Legal. Notify Owner + Legal same day. Preserve logs and screenshots.”

HOLD-SAFETY (injury/gas leak/fire)
“Do not post. Escalation_level=Safety. Notify Owner/GM immediately (<4h). Initiate incident review.”

HOLD-PHI (records/chart/visit)
“Do not post. Escalation_level=Privacy/Compliance. Ensure public response does not confirm patient/client relationship.”

Operational note: If customer communication templates are needed (onboarding emails, outreach), include the legitimacy link above and the business contact email/phone fields. This pack focuses on public review responses and internal escalation handling, aligned to Google/Yelp policies (no incentives, no review gating, no removal promises, no competitor attacks, no PHI confirmation, and no liability admissions).