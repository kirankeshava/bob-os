# Brand-Safety & Escalation Pack v3 (Checklist + Playbook + Approved Templates: Dentist / Med Spa / HVAC)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:25:12.831Z

---

AI Review Reply & Reputation Autopilot (Google/Yelp)
Brand-Safety & Escalation Pack v3
Owner/Support: agent_bob_replit+review-bot@agentmail.to
Legitimacy URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1

SECTION A — BRAND-SAFETY CHECKLIST v3 (Pre-generation + Pre-post Gate)

A1. Non-negotiable response rules (ALL platforms)
1) Always be polite, brief, non-inflammatory. Never argue point-by-point.
2) Never admit fault/liability: avoid “we messed up / our mistake / we caused / we were negligent / we damaged”. Use “We’re sorry to hear this” not “We’re sorry we did this.”
3) Never confirm private relationship/PHI/appointment status: do not say or imply the reviewer was a patient/client, visited, had a procedure, had a diagnosis, had records, etc.
4) Never include personally identifying details: no staff full names, no phone numbers/addresses for individuals, no appointment dates/times, no invoice numbers, no license numbers, no footage references.
5) Never promise outcomes (medical/clinical/esthetic): avoid “guarantee, cure, permanent, 100%, results assured”.
6) Never solicit incentives: no discounts, freebies, gift cards, raffles, “we’ll compensate if you update/remove”.
7) Never propose review gating: do not ask only happy customers to review.
8) Never threaten or retaliate: no “defamation”, “we’ll report you”, “we’ll take action” language.
9) Always move resolution offline: include a call-to-action to contact via official channel.
10) If legal threat/PHI/safety incident triggers: DO NOT POST; set manual-only hold.

A2. Hard-block / forced-safe wording triggers
If review contains any of these, enforce response mode = BLOCKED_MANUAL_REVIEW and escalation:
- Legal threat terms: “sue”, “lawsuit”, “attorney”, “legal action”, “court”, “small claims”, “demand letter”. Escalation_level=Legal.
- PHI/records confirmation bait: “chart”, “records”, “HIPAA”, “diagnosis”, “treatment plan”, “procedure notes”, “my visit on [date]”. Escalation_level=Privacy/PHI.
- Safety injury allegations: “injured”, “burned”, “hurt”, “infection”, “unsafe”, “electrocute”, “gas leak”, “carbon monoxide”. Escalation_level=Safety.
- Harassment/hate speech/violent threats: Escalation_level=Safety/Abuse.

A3. Blocked phrases (do not output; replace with safer alternatives)
- “We reviewed your chart/records/visit/appointment” -> Replace with: “We can’t discuss details publicly, but we’d like to learn more.”
- “That didn’t happen / you’re lying” -> Replace with: “We’d like to look into this; please contact us directly.”
- “We’ll get this removed / reported to Yelp/Google” -> Replace with: “You’re welcome to contact the platform directly; we’re focused on resolving your concerns.”
- “We guarantee” -> Replace with: “We strive to / our goal is”.
- “We’ll give you a discount/refund if you update the review” -> Remove entirely.

A4. Required elements (must be present unless blocked/manual hold)
- Thank or acknowledge sentiment.
- Invite offline contact.
- Provide a neutral path: “Please contact our office/team at [business contact] so we can help.”
- If negative: include empathy + intent to resolve, without admitting wrongdoing.

A5. Platform-specific constraints
Google Business Profile:
- Keep concise; avoid promotional language. No personal data. No “review removal” promises.
Yelp:
- Extra-sensitive to solicitation/incentives; do not mention “Yelp policy” or “we reported your review”. Avoid prolonged back-and-forth.

A6. Pre-post compliance gate (operator/automation)
Before posting, validate:
- No PHI confirmation.
- No admission of liability.
- No incentives/compensation offer.
- No competitor disparagement.
- No staff/customer identifiers.
- Offline CTA present.
If any detector triggers Legal/PHI/Safety/Abuse => status=blocked_manual_review; do not allow UI/API post.


SECTION B — ESCALATION PLAYBOOK v3 (Common negative scenarios)

B0. Escalation levels
- L0: Normal (post allowed)
- L1: Service Recovery (post allowed, notify Ops)
- L2: Billing/Refund (post allowed with strict wording, notify Billing)
- L3: Suspected Fake/Competitor (post allowed, notify Owner; consider platform flag via official process)
- L4: Safety Incident (DO NOT POST; internal response only)
- L5: Privacy/PHI (DO NOT POST; internal response only)
- L6: Legal Threat (DO NOT POST; internal response only)

B1. Routing SLAs (from detection)
- L6 Legal: same business day; owner + legal counsel if available.
- L5 PHI: within 4 hours; privacy lead/owner.
- L4 Safety: within 4 hours; owner + ops lead.
- L2 Billing: within 24 hours; billing lead.
- L1 Service recovery: within 24 hours; ops/GM.

B2. Evidence to collect (internal, never public)
- Screenshot of review + timestamp + platform review_id.
- Job/service record identifiers (internal only).
- Staff notes, photos, call logs, invoices (internal only).
- For safety: incident report, equipment logs, technician notes.
- For PHI: verify any exposure risk; confirm no staff replies disclosed PHI.

B3. DO-NOT-POST conditions (automatic hold)
- Any PHI/medical record discussion or appointment confirmation.
- Any legal threat or demand letter mention.
- Any safety incident with injury/alleged illegal conduct.
- Any harassment/hate/violent threats.
Action: set blocked_manual_review=true; draft internal note only.

B4. Scenario guidance (public response posture)
1) Billing dispute (L2):
- Public: acknowledge, invite direct contact; no invoice details; no “you agreed”.
- Internal: billing to review charges and propose resolution.
2) Poor service/quality (L1):
- Public: apologize for experience, invite contact, commit to learning.
- Internal: ops review staff/process.
3) Demands to fire staff / names staff (L1):
- Public: do not discuss personnel; invite offline.
- Internal: HR/owner notified.
4) Suspected fake review / competitor (L3):
- Public: neutral, invite contact, avoid accusing competitor.
- Internal: document and optionally flag via platform.
5) Medical outcome claim (dentist/med spa) (L1 or L5 if PHI bait):
- Public: no outcome debate; no confirmation of treatment; invite offline.
- Internal: clinician/owner review.
6) Legal threat (L6):
- Public: DO NOT POST.
- Internal: counsel guidance; preserve records.


SECTION C — APPROVED RESPONSE TEMPLATES v3
Rules for variables across all templates:
- Allowed: {business_name}, {support_email}, {phone_optional}, {city_optional}, {signoff_name_optional}.
- Not allowed: staff personal names, appointment dates, treatment details, invoice numbers, any confirmation of customer/patient relationship.
- Default contact: agent_bob_replit+review-bot@agentmail.to (or business’s official email/phone if configured).

C1. DENTIST (Google/Yelp) — 8 templates
DENT-01 Positive Praise
“Thank you for taking the time to share this. We truly appreciate your feedback and we’re glad you had a great experience. If there’s anything we can do for you in the future, please reach us at {support_email}. — {business_name}”

DENT-02 Neutral/Short Review
“Thanks for the feedback. We’re always working to improve, and we’d welcome any additional details you’re comfortable sharing. Please contact us at {support_email}. — {business_name}”

DENT-03 Mild Negative (No specifics)
“We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and see how we can help. Please contact our team at {support_email}. — {business_name}”

DENT-04 Strong Negative (Angry tone)
“Thank you for raising this. We take concerns seriously, and we’d like to address them directly. Because we can’t discuss details publicly, please contact us at {support_email} so we can look into this. — {business_name}”

DENT-05 Medical Outcome/Clinical Disagreement (No PHI confirmation)
“We’re sorry you’re feeling this way. We can’t discuss individual situations publicly, but we’d like the opportunity to listen and help. Please reach us at {support_email}. — {business_name}”

DENT-06 Pricing/Billing Dispute
“Thank you for the feedback. We understand billing concerns can be frustrating. We can’t review account details here, but our team can help if you contact us at {support_email}. — {business_name}”

DENT-07 Staff Mention / Doxxing Attempt
“Thank you for sharing your concern. To protect everyone’s privacy, we can’t discuss personnel or specifics publicly. Please contact us at {support_email} so we can follow up appropriately. — {business_name}”

DENT-08 Legal Threat HOLD (Manual-only; do not post)
INTERNAL NOTE ONLY (not customer-facing): “Legal-threat language detected. Set status=blocked_manual_review, escalation_level=Legal. Do not post publicly. Notify owner/legal same-day; preserve records and screenshots.”

C2. MED SPA (Google/Yelp) — 8 templates
MSPA-01 Positive Praise
“Thank you for your kind words. We appreciate you taking the time to share your experience, and we’re grateful for your support. If you ever need anything, please contact us at {support_email}. — {business_name}”

MSPA-02 Neutral/Short Review
“Thanks for the feedback. We’re always looking for ways to improve. If you’d like to share more, please reach us at {support_email}. — {business_name}”

MSPA-03 Mild Negative
“We’re sorry to hear this didn’t meet your expectations. We’d like to learn more and help if we can. Please contact us at {support_email}. — {business_name}”

MSPA-04 Strong Negative / Emotional
“Thank you for bringing this to our attention. We take concerns seriously. Because we can’t discuss details publicly, please contact us at {support_email} so we can look into this and assist. — {business_name}”

MSPA-05 Outcome/Results Disappointment (No guarantees)
“We understand results and expectations can vary, and we’re sorry you’re disappointed. We can’t discuss specifics here, but we’d like to listen and help. Please contact us at {support_email}. — {business_name}”

MSPA-06 Refund/Chargeback Threat (No incentives)
“Thank you for the feedback. We’d like to review your concern directly. We can’t discuss details publicly, so please contact us at {support_email} and our team will respond. — {business_name}”

MSPA-07 Staff Mention / Privacy
“To protect privacy, we can’t discuss individuals or details publicly. Please contact us at {support_email} so we can follow up appropriately. — {business_name}”

MSPA-08 Legal Threat HOLD (Manual-only; do not post)
INTERNAL NOTE ONLY: “Legal-threat language detected. status=blocked_manual_review; escalation_level=Legal. No public reply. Notify owner/legal and preserve documentation.”

C3. HVAC (Google/Yelp) — 8 templates
HVAC-01 Positive Praise
“Thank you for the great feedback. We appreciate your business and are glad you had a positive experience. If we can help again, please reach us at {support_email}. — {business_name}”

HVAC-02 Neutral/Short Review
“Thanks for your feedback. We’re always working to improve. If you’re willing to share more details, please contact us at {support_email}. — {business_name}”

HVAC-03 Mild Negative
“We’re sorry to hear this wasn’t the experience you expected. We’d like to learn more and see how we can help. Please contact us at {support_email}. — {business_name}”

HVAC-04 Strong Negative (Missed appointment/poor workmanship claim)
“Thank you for bringing this to our attention. We take reliability and quality seriously. We can’t address specifics publicly, but if you contact us at {support_email} we’ll look into this promptly. — {business_name}”

HVAC-05 Pricing Dispute
“Thank you for the feedback. We understand pricing questions are important. We can’t review job details here, but we’d like to help—please contact us at {support_email}. — {business_name}”

HVAC-06 Warranty/Return Visit Dispute
“Thanks for letting us know. We’d like to understand the situation and help if we can. Please contact us at {support_email} so we can review this directly. — {business_name}”

HVAC-07 Suspected Fake/Competitor Review (No accusations)
“Thank you for the feedback. We take concerns seriously, but we’re unable to match this to our records based on the information here. Please contact us at {support_email} so we can look into it. — {business_name}”

HVAC-08 Safety Incident HOLD (Manual-only; do not post)
INTERNAL NOTE ONLY: “Safety incident language detected (injury/gas leak/CO). status=blocked_manual_review; escalation_level=Safety. No public reply until ops/owner reviews. Preserve evidence.”

SECTION D — QUICK POLICY REMINDERS (for ops)
- Never ask for “updated review after we fix this” or offer anything of value.
- Never reveal or confirm customer/patient relationship.
- Do not claim you can remove reviews or that a platform will remove them.
- When in doubt, block and escalate; a non-post is safer than a risky post.

End of Pack v3