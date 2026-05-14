# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Approved Templates Pack v3.0

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:17:30.266Z

---

AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Approved Templates Pack v3.0
Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/Contact: agent_bob_replit+review-bot@agentmail.to

A) BRAND-SAFETY CHECKLIST v3.0 (Tick-box)
Scope: Public responses to Google Business Profile (GBP) and Yelp reviews. Goal: brand-safe, non-inflammatory, non-admitting, policy-aligned responses that move resolution offline.

A1. Absolute prohibitions (must not appear)
1) PHI/PII confirmation or specifics:
- Do NOT confirm someone is/was a patient/client/customer (“We saw you on…”, “Your visit/appointment…”, “Your chart/records…”, “Our notes show…”) even if they reveal it.
- Do NOT mention appointment times, procedures performed, prescriptions, diagnoses, treatment outcomes, staff schedules, addresses beyond what is publicly listed.
2) Medical guarantees/claims (dentist/med spa):
- No outcome guarantees (“will cure”, “permanent results”, “100% safe”), no before/after claims, no clinical promises.
3) Liability admissions:
- No admissions of fault (“We messed up”, “We caused damage”, “Our technician broke…”). Use neutral phrasing and route to escalation.
4) Incentives / review gating:
- No offers tied to reviews (discounts, refunds, freebies) and no “contact us to change/remove your review.”
5) Retaliation / threats / harassment:
- No argumentative tone, no accusations, no doxxing, no shaming, no “You’re lying.”
6) Competitor disparagement:
- Do not attack competitors or compare service quality in a way that violates platform norms.
7) Platform enforcement promises:
- Do not claim Yelp/Google will remove reviews; do not mention “reporting you to Yelp/Google” in a threatening way.

A2. Required elements (must be present unless explicitly blocked)
1) Thank-you + acknowledgement of sentiment:
- Positive: gratitude.
- Negative: acknowledgement without conceding facts.
2) Offline CTA (take it off-platform):
- Provide a clear path: “Please contact us at [phone/email] so we can help.”
- Use the official contact email when possible: agent_bob_replit+review-bot@agentmail.to (for MVP testing) or the business’s real support line.
3) Privacy language when sensitive:
- “For privacy reasons, we can’t discuss details here.”
4) Non-admission wording for negatives:
- “We’re sorry to hear you had a frustrating experience” (NOT “We’re sorry we did X”).
5) Calm, short, professional tone:
- 60–120 words typical; avoid long back-and-forth.

A3. Mandatory escalations / holds (DO NOT POST automatically)
Set response_mode = blocked_manual_review when any triggers occur:
- Legal threats: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “court”, “demand letter”.
- Safety/injury/damage allegations: “injured”, “hurt”, “burned”, “unsafe”, “fire”, “gas leak”, “flood”, “electric shock”, “damage to my home”, “broke my…”.
- Discrimination/harassment claims: “racist”, “sexist”, “harassed”, “assault”, “discriminated”.
- PHI cues: “my records”, “my chart”, “my diagnosis”, “my treatment plan”, “prescription”, “HIPAA”.
- Extortion/blackmail: “or I’ll post everywhere”, “pay me or…”.

A4. Yelp vs GBP policy reminders (operational)
- Yelp: Do not suggest Yelp will remove a review; do not publicly debate “Yelp took down my review.” Keep neutral and offline.
- GBP: Same no-incentives and no review gating. Avoid discussing specifics that could be construed as confirming customer relationship.

A5. Final pre-post QA (quick pass)
- No names, no dates, no order numbers unless provided AND verified safe AND non-identifying.
- No prices unless reviewer posted them; still keep minimal.
- No staff blaming.
- No “we reviewed your records/visit.”
- Offline CTA present.


B) ESCALATION PLAYBOOK v3.0
Goal: Ensure negative/high-risk reviews are handled safely, routed correctly, and never posted publicly when policy risk exists.

B1. Severity Levels
L0 (Safe): Positive/neutral feedback; standard template OK.
L1 (Service dissatisfaction): Late arrival, rude staff, scheduling issues; post with apology sentiment + offline CTA.
L2 (Billing/refund dispute): Charges, estimates, warranty claims; post neutral + offline CTA + route Billing.
L3 (Safety/damage/injury claim): Auto HOLD. Route Ops + Owner/GM. Collect evidence.
L4 (Legal threat / discrimination / harassment / PHI): Auto HOLD. Route Legal/Owner same-day. Do not post without manual approval.

B2. Routing SLAs
- L0: Auto-draft + optional approval; post within 24h.
- L1: Ops Manager review within 24h; post within 24–48h.
- L2: Billing Lead review within 24h; post within 24–48h.
- L3: Owner/GM within 4h; investigate within 24h.
- L4: Legal/Owner same-day; post only if counsel/owner approves.

B3. Do-not-post conditions (hard stop)
- Any L3/L4 trigger.
- Reviewer requests PHI/PII discussion in public.
- Active chargeback / insurance dispute / litigation.
- Threats, hate speech, or ongoing safety investigation.

B4. Evidence to collect (internal)
- Full review screenshot, timestamps, platform, location.
- CRM/job ticket/appointment lookup (internal only).
- Staff statements (internal only).
- Photos/invoices/service notes (internal only).
- Prior communications.

B5. Scenario guidance (what to say)
1) Billing dispute (L2):
- Public: acknowledge, invite offline, no promises.
- Internal: confirm invoice/estimate; prepare resolution options.
2) Alleged damage/injury (L3):
- Public: DO NOT POST automatically.
- Internal: safety investigation; insurer/legal as needed.
3) Suspected fake review (L1/L2 depending):
- Public: “We can’t locate this experience; please contact us so we can look into it.” No accusations.
4) PHI/HIPAA mention (L4):
- Public: If allowed to post, use strict privacy statement and do not confirm relationship.
5) Competitor comparison bait (L1):
- Public: don’t disparage; emphasize commitment and invite offline.


C) APPROVED RESPONSE TEMPLATES v3.0
Rules for variables:
Allowed variables: {BusinessName}, {SupportEmail}, {SupportPhone}, {LocationCity}, {TeamName}.
Banned variables: patient/client name, appointment date/time, procedure/service specifics (medical), technician identity, invoice numbers, address beyond listing.

C1. Dentist (GBP/Yelp)
DENT-01 Positive
“Thank you for the kind words and for taking the time to share your experience with {BusinessName}. We’re glad you felt well cared for. If there’s ever anything we can do to support you, please reach us at {SupportPhone} or {SupportEmail}. We appreciate you!”

DENT-02 Neutral/short
“Thank you for your feedback. We’re always working to improve the experience at {BusinessName}. If you’d like to share more details, please contact us at {SupportEmail}.”

DENT-03 Mild negative (service)
“Thank you for letting us know. We’re sorry to hear your experience didn’t meet expectations. For privacy reasons we can’t discuss details here, but we’d like to learn more and help—please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

DENT-04 Strong negative (no admission)
“We’re sorry to hear you’re frustrated. We take feedback seriously and want to address your concerns. For privacy reasons we can’t discuss anything specific here. Please contact our team at {SupportPhone} or {SupportEmail} so we can look into this and work toward a resolution.”

DENT-05 Suspected fake/can’t locate
“Thank you for the note. We’re unable to identify the situation from the information provided, and we’d like to understand what happened. Please contact {BusinessName} at {SupportEmail} with a phone number we can reach you at. For privacy reasons, we can’t discuss details publicly.”

DENT-06 PHI-sensitive (only if not HOLD)
“Thank you for your message. For privacy reasons, we can’t discuss personal or health-related details in a public forum. If you’d like, please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can assist you directly.”

C2. Med Spa (GBP/Yelp)
MED-01 Positive
“Thank you for the great review. We’re happy you enjoyed your experience with {BusinessName}. If you have any questions or want to share additional feedback, please reach us at {SupportPhone} or {SupportEmail}. We appreciate you.”

MED-02 Neutral
“Thank you for your feedback. We’re always working to improve. If you’re open to sharing more, please contact us at {SupportEmail}.”

MED-03 Mild negative
“We’re sorry to hear this wasn’t the experience you expected. We’d like to learn more and help. For privacy reasons we can’t discuss details here—please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

MED-04 Strong negative (no outcomes talk)
“Thank you for sharing this. We understand how disappointing this can feel. We want to look into what happened and address your concerns. Please contact our team at {SupportPhone} or {SupportEmail}; for privacy reasons we can’t discuss specifics publicly.”

MED-05 Suspected fake
“We take feedback seriously, but we can’t identify this experience from the information provided. Please contact {BusinessName} at {SupportEmail} so we can review the concern. For privacy reasons, we can’t discuss details here.”

MED-06 Safety/medical claim mention (often HOLD; if allowed)
“Thank you for reaching out. For your privacy and safety, we can’t discuss health-related concerns in public replies. Please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can support you directly.”

C3. HVAC (GBP/Yelp)
HVAC-01 Positive
“Thank you for the review and for choosing {BusinessName}. We’re glad our team could help. If you ever need anything else, contact us at {SupportPhone} or {SupportEmail}. We appreciate your business.”

HVAC-02 Neutral
“Thank you for your feedback. We’re always working to improve our service. If you’d like to share more details, please reach us at {SupportEmail}.”

HVAC-03 Mild negative (lateness/communication)
“Thank you for letting us know. We’re sorry the experience didn’t meet expectations. We’d like to learn more and help—please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can follow up.”

HVAC-04 Billing dispute
“Thank you for your feedback. We understand billing concerns can be frustrating. We’d like to review this with you and make sure everything is clear. Please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can assist.”

HVAC-05 Suspected fake
“Thanks for the note. We’re unable to locate this job from the information provided, but we want to understand what happened. Please contact {BusinessName} at {SupportEmail} with a phone number we can reach you at so we can look into it.”

HVAC-06 Alleged damage/safety (should HOLD; if allowed by manual)
“Thank you for bringing this to our attention. We take safety and quality concerns seriously and want to look into this promptly. Please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can follow up directly.”


D) IMPLEMENTATION NOTES (for product/ops)
1) Enforce hard blocks both pre-generation and pre-post.
2) When blocked_manual_review: do not post via API or UI. Require human override with reason.
3) Logging requirements (minimum): review_source, review_id, timestamps (draft/flag/approve/post/block), detected_risk_flags, escalation_level, response_mode, final_response_text, approver_id, model/prompt version.
4) Weekly reporting must reconcile counts: drafts_created, blocked, approved, posted, failed.

End of Pack v3.0