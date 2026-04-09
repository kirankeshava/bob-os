# AI Review Reply & Reputation Autopilot — QA/Compliance Pack v1.3 (Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + QA Report v4 Summary)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:37:53.902Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
QA/Compliance Pack v1.3
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dta1w77k.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

====================================================
1) BRAND-SAFETY CHECKLIST v3 (Operational, Tick-Box)
====================================================
Purpose: Ensure every generated draft and every posted reply is brand-safe, non-inflammatory, and platform-policy aligned. Use as both (a) engineering acceptance criteria and (b) human-approval checklist.

A. Platform Policy Non-Negotiables (Google + Yelp)
[ ] No incentives/solicitation: do NOT offer discounts, refunds, gifts, contests, “we’ll make it worth your time,” “contact us for a deal,” or anything conditioned on reviews.
[ ] No review gating: do NOT ask only happy customers to review; do NOT discourage negative reviews.
[ ] No fake reviews: do NOT fabricate reviewer identity, details, or outcomes.
[ ] No removal promises: do NOT claim you can remove reviews, “Yelp/Google will take this down,” or threaten reporting as retaliation.
[ ] No competitor disparagement: do NOT insult/compare competitors or accuse them publicly.
[ ] No personal data: do NOT reveal phone, email, address, appointment times, invoices, internal ticket numbers, or any identifying details.

B. HIPAA/PHI & Sensitive Info (especially Dentist/Med Spa)
[ ] Never confirm a person is/was a patient or client.
[ ] Never reference charts/records/visit details (“your chart,” “your appointment,” “your procedure,” “we reviewed your records,” “per your X-ray”).
[ ] Never discuss diagnosis, treatment specifics, medications, outcomes, or clinical decisions.
Required safe alternative: Speak generally and invite offline discussion: “We can’t discuss details here, but we’d like to help—please contact our office directly.”

C. Liability / Legal / Safety
[ ] Do not admit fault or liability (“we were negligent,” “we damaged,” “we caused,” “our mistake”) or promise compensation.
[ ] If reviewer mentions “attorney/lawyer/sue/lawsuit/legal action,” system MUST set: response_mode=HOLD_MANUAL_ONLY and escalation_level=LEGAL.
[ ] If safety incident alleged (injury, fire, gas leak, contamination, assault): escalate to Safety/Critical; avoid debate; request offline contact; do not investigate publicly.

D. Tone & De-escalation
[ ] No argument, sarcasm, blame, or “you’re wrong.”
[ ] Acknowledge feelings without confirming disputed facts: “We’re sorry to hear this was your experience.”
[ ] Use calm, concise language; no threats; no public back-and-forth bait.

E. Required Elements for Public Replies
[ ] Thanks (where appropriate) + apology for experience (negative/neutral).
[ ] Offline CTA (mandatory for neutral/negative): invite contact by phone/email or direct message; provide the business contact email if allowed by customer settings.
[ ] No specific promises; offer to “review” or “make things right” without admissions.

F. Blocked Phrases (Hard Blocks) + Safer Replacements
Hard block patterns (examples):
- PHI confirmation: “we reviewed your chart/records/visit/appointment,” “as your provider,” “when you were here on [date],” “your treatment/procedure.”
- Medical guarantees: “guarantee results,” “permanent,” “cure,” “100%,” “pain-free,” “no side effects.”
- Liability admissions: “our fault,” “we messed up,” “we damaged,” “we caused.”
- Incentives: “discount,” “coupon,” “free,” “gift,” “refund for a review,” “credit if you update.”
- Retaliation: “we will report you,” “we’ll have this removed,” “you’ll be banned.”
Safe replacements:
- “We can’t discuss details here, but we’d like to learn more and help.”
- “Please contact us directly so we can look into this.”

G. Posting Gates (Enforcement)
[ ] Pre-generation gate: detect high-risk triggers (PHI, legal threats, violence, harassment, self-harm). If triggered, force template=SAFE_MINIMAL + escalate.
[ ] Pre-post gate: if response_mode=HOLD_MANUAL_ONLY, block posting (post_status=blocked_manual_review) across API + UI.
[ ] Audit-log event emitted for every state transition.

====================================================
2) ESCALATION PLAYBOOK v3 (Scenarios, Routing, SLAs)
====================================================
Core rule: When in doubt, do NOT post; escalate for manual review.

Escalation Levels
L0: Normal (auto-draft OK)
L1: Manager Review (strong negative, refund demands, accusations)
L2: Safety/Critical (injury, hazard, discrimination, harassment)
L3: Legal Hold (attorney/lawsuit/sue; defamation threats; regulatory complaints)

SLAs & Owners (recommended)
- L0: same day response target
- L1: Ops/GM review <24h
- L2: Owner/GM <4h; document incident; pause public debate
- L3: Legal same-day; DO NOT POST publicly until cleared

Do-Not-Post Conditions (always HOLD_MANUAL_ONLY)
- PHI/medical details where any confirmation risk exists
- Legal threats or “my lawyer,” “I’ll sue,” “lawsuit,” “attorney,” “court”
- Active safety investigation or alleged criminal conduct
- Harassment/doxxing (names + personal identifiers)

Scenario Guidance (what to do + approved public posture)
1) Billing/Price Dispute
- Route: Billing (L1)
- Collect: invoice/estimate, signed authorization
- Public reply: apologize, invite offline resolution, no itemized pricing unless already public/verified

2) Service Quality / Poor Experience
- Route: Ops/GM (L1)
- Collect: date range, staff schedule, job notes
- Public reply: acknowledge experience; invite offline; avoid “we did everything right”

3) No-Show / Late Arrival Accusation
- Route: Ops (L1)
- Collect: appointment policy, timestamps
- Public reply: general policy mention allowed, no specific appointment confirmations

4) Damage Allegation (HVAC)
- Route: Ops + Insurance workflow (L2 if severe)
- Collect: photos, work order, tech notes
- Public reply: concern + offline; no admissions; offer to inspect offline

5) Injury/Adverse Outcome (Dentist/Med Spa)
- Route: Clinical lead + Owner (L2) and possibly L3 depending on language
- Collect: incident report, consent forms
- Public reply: minimal; cannot discuss; invite offline

6) Discrimination/Harassment Claim
- Route: Owner/HR (L2)
- Collect: witness statements, CCTV if applicable
- Public reply: take seriously; invite offline; no debate

7) Suspected Fake Review / Wrong Business
- Route: Ops (L1)
- Collect: customer lookup attempt WITHOUT confirming publicly
- Public reply: “We can’t locate this experience; please contact us with details.” No accusation.

8) Legal Threat / Regulatory Complaint
- Route: Legal (L3)
- Public reply: usually none; if allowed, minimal “Please contact us directly.”

====================================================
3) APPROVED RESPONSE TEMPLATE LIBRARY v3 (24 templates)
====================================================
Template rules (apply to all):
- Allowed variables: {BusinessName}, {City}, {ContactEmail}, {PhoneOptional}, {TeamNameOptional}
- Forbidden variables: reviewer name, staff name, appointment date/time, chart/records, invoice number
- Mandatory offline CTA for neutral/negative
- Yelp note: avoid talking about Yelp actions/enforcement; no “reporting you to Yelp.”

A) DENTIST (8)
DENT-POS-01 (Positive)
“Thank you for the kind words about {BusinessName}. We’re glad you had a great experience. We appreciate you taking the time to share your feedback.”

DENT-POS-02 (Positive + team)
“Thanks for your review. Our team at {BusinessName} works hard to provide a welcoming experience, and we’re happy to hear it showed. We appreciate you.”

DENT-NEU-01 (Neutral)
“Thank you for the feedback. We’re always looking for ways to improve. If you’re open to sharing more, please contact us at {ContactEmail} so we can learn from your experience.”

DENT-NEG-01 (Mild negative)
“We’re sorry to hear your visit didn’t meet expectations. We can’t discuss details here, but we’d like to understand what happened and help. Please reach out to {ContactEmail}.”

DENT-NEG-02 (Strong negative)
“Thank you for bringing this to our attention. We’re sorry this was your experience. We can’t address specifics publicly, but we’d like the chance to look into this and speak with you directly—please contact {ContactEmail}.”

DENT-PHI-01 (PHI-sensitive / forced generic)
“We take privacy seriously and can’t discuss anything that could relate to a person’s care in a public forum. If you believe this review is about our office, please contact us at {ContactEmail} so we can assist.”

DENT-FAKE-01 (Suspected fake / wrong office)
“We’re concerned because we can’t identify the situation from your description. We’d like to help if this involved our office—please email {ContactEmail} with any details you’re comfortable sharing privately.”

DENT-LEGAL-01 (Legal threat → hold/manual only wording if approved)
“We’re sorry to hear this. We can’t discuss this matter publicly. Please contact us directly at {ContactEmail}.”
(Note: system should default HOLD_MANUAL_ONLY; this text is only for counsel-approved posting.)

B) MED SPA (8)
SPA-POS-01
“Thank you for the review. We’re glad you enjoyed your experience at {BusinessName} and appreciate you sharing your feedback.”

SPA-POS-02
“Thanks for your kind words. We’re happy to hear you felt welcomed and supported by our team at {BusinessName}.”

SPA-NEU-01
“Thank you for the feedback. We’d like to learn more so we can improve. Please contact {ContactEmail} and we’ll follow up.”

SPA-NEG-01
“We’re sorry to hear this was your experience. We can’t discuss details here, but we’d like to connect and see how we can help. Please email {ContactEmail}.”

SPA-NEG-02 (Strong negative)
“Thank you for sharing your concerns. We take this seriously and want to address it appropriately. Please contact {ContactEmail} so we can discuss privately.”

SPA-SAFETY-01 (adverse reaction mention)
“We’re sorry to hear you’re feeling this way. For privacy and safety reasons we can’t discuss anything clinical here, but we want to connect promptly. Please contact {ContactEmail} as soon as you can.”

SPA-FAKE-01
“We can’t confirm details in a public reply, but we’d like to understand what happened. If this involved {BusinessName}, please contact {ContactEmail} so we can assist.”

SPA-LEGAL-01
“We’re sorry to hear this. We can’t discuss this publicly. Please contact us directly at {ContactEmail}.”

C) HVAC (8)
HVAC-POS-01
“Thank you for the great review. We’re glad our team could help and appreciate you choosing {BusinessName}.”

HVAC-POS-02
“Thanks for taking the time to share your experience. We appreciate your business and are happy to hear you were satisfied with the service.”

HVAC-NEU-01
“Thank you for the feedback. We’re always working to improve. Please contact {ContactEmail} so we can learn more and follow up.”

HVAC-NEG-01
“We’re sorry to hear this was your experience. We’d like to look into it and help resolve it. Please reach out to {ContactEmail} with the best way to contact you.”

HVAC-NEG-02 (Strong negative)
“Thank you for raising this concern. We take it seriously and want to address it properly. Please contact {ContactEmail} so we can review what happened and follow up directly.”

HVAC-DAMAGE-01 (damage allegation)
“We’re sorry to hear about this concern. We can’t confirm details here, but we want to review the situation and make sure it’s addressed appropriately. Please contact {ContactEmail} so we can follow up.”

HVAC-FAKE-01
“We’re unable to identify this job from the information provided. If this relates to {BusinessName}, please contact {ContactEmail} so we can look into it.”

HVAC-LEGAL-01
“We’re sorry to hear this. We can’t discuss this publicly. Please contact us directly at {ContactEmail}.”

====================================================
4) QA TEST REPORT v4 — EXEC SUMMARY + CONTROL MAPPING
====================================================
Scope tested: 45-core review suite across Dentist/Med Spa/HVAC + 6 Yelp-specific edge cases. Final results: 51/51 pass after implementing two critical guardrails:
- PHI confirmation hard block (records/chart/visit/procedure wording)
- Legal-threat detector → HOLD_MANUAL_ONLY + escalation_level=LEGAL + post_status=blocked_manual_review

Top policy risks and required controls
1) PHI/HIPAA risk (medical/dental)
- Detector: PHI_CONFIRMATION
- Gate: pre-generation forces PHI-safe template; pre-post blocks if any PHI pattern appears
- Logging: detected_risk_flags includes PHI_CONFIRMATION; detector_version

2) Medical outcome claims / guarantees
- Detector: MEDICAL_GUARANTEE
- Gate: auto-rewrite to non-claim language or HOLD if persistent

3) Incentives/solicitation
- Detector: INCENTIVE_LANGUAGE
- Gate: block posting; require human revision

4) Liability admission
- Detector: LIABILITY_ADMISSION
- Gate: auto-rewrite to non-admission language; if severe, HOLD_MANUAL_ONLY

5) Legal threats
- Detector: LEGAL_THREAT
- Gate: HOLD_MANUAL_ONLY; block posting everywhere

Audit trail minimum acceptance criteria
- Log fields: review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode, draft_version, approver_id, approval_timestamp, posted_timestamp, post_status/error_code, final_response_text, model/prompt version, hold_reason, blocked_timestamp, unblocker_id.
- Required events: draft_created, flagged, hold_applied, approved, blocked, posted, post_failed.

End-to-end verification requirement
- Must prove blocked_manual_review prevents posting via both UI and API paths.
- Weekly KPI reconciliation must show counts for approved vs posted vs blocked and exclude blocked from “posted” totals.

====================================================
OWNER DECISION NEEDED (No spend)
====================================================
Confirm test environment approach for end-to-end posting verification:
A) Sandbox/test environment for Google Business Profile + Yelp (preferred, $0)
B) Limited live test on one designated low-risk location (3–5 responses max, $0) using the Runbook v1.2.

If you confirm A or B, QA can provide the exact step list and evidence bundle checklist (screenshots/log exports/KPI report output) for engineering sign-off.