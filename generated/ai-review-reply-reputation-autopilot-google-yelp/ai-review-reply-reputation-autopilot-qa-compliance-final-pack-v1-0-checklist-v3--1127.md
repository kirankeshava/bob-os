# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.0 (Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:47:49.737Z

---

This document is the final QA/compliance pack for the AI Review Reply & Reputation Autopilot MVP. It is written to be enforceable (prompt rules + detectors + posting gates), auditable (log fields/events), and aligned with Google Business Profile and Yelp policies.

BUSINESS IDENTITY (for internal references)
- Product: AI Review Reply & Reputation Autopilot (Google/Yelp)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

A) BRAND-SAFETY CHECKLIST v3 (FINAL)
Use this checklist on every generated draft before allowing “approve/post.” Any FAIL requires a rewrite or a manual-only hold.

A1. Universal MUST-HAVES (Google + Yelp)
1) Professional, non-argumentative tone (no sarcasm, no blame, no escalation).
2) No admission of liability or fault (avoid “we caused,” “we broke,” “our mistake,” “we neglected”). Prefer: “We’re sorry to hear you had this experience” / “We’d like to learn more.”
3) No personal data (no phone, email, address of reviewer; no staff last names; no appointment times; no invoice numbers).
4) No PHI/medical privacy confirmation (do not confirm they were a patient/client). If review implies they are: respond generically.
5) Required offline resolution CTA: invite them to contact the business privately.
6) No incentives or review gating: never offer discounts/gifts for reviews, never suggest “contact us and we’ll fix it if you update/remove your review.”
7) No competitor disparagement or “fake review” accusations as fact. If suspected fake: neutral verification language only.
8) No threats, retaliation, or policy/legal posturing (don’t mention reporting to Yelp/Google, removal guarantees, or “we’ll take action against you”).
9) No hallucinated details: do not add facts not present in the review or confirmed by the business (services performed, dates, outcomes, pricing, staff names).

A2. Hard-Blocked Phrases / Forced Rewrites
If draft includes any of the following, block posting and force rewrite or manual-only hold:
- PHI confirmation patterns: “your visit,” “your appointment,” “your treatment,” “your chart,” “your records,” “we reviewed your records,” “as your provider,” “we saw you on [date].”
  Safe alternative: “We take feedback seriously. Please contact our office so we can look into your concerns.”
- Liability admissions: “we were at fault,” “we messed up,” “we broke/damaged,” “our negligence.”
  Safe alternative: “We’re sorry this didn’t meet expectations. We’d like to understand what happened.”
- Medical guarantees/outcomes: “guaranteed results,” “cure,” “permanent,” “100%,” “no risks.”
  Safe alternative: “Outcomes vary by individual. We’re happy to discuss concerns directly.”
- Incentives: “discount,” “free,” “gift card,” “refund if you change your review,” “we’ll make it right if you update.”
  Safe alternative: “Please contact us to discuss next steps.”
- Legal-threat triggers (AUTO manual-only hold, do not post): “sue,” “lawsuit,” “attorney,” “legal action,” “court,” “demand letter.”

A3. Platform Alignment Notes
GOOGLE BUSINESS PROFILE (GBP)
- OK: polite responses, request to contact offline, generic service recovery language.
- Avoid: anything that looks like review gating or incentives.

YELP
- Avoid: mentions implying Yelp will remove reviews, “we reported you to Yelp,” “Yelp will take this down,” or public back-and-forth.
- Avoid: asking for an updated review in exchange for resolution.
- OK: brief, polite, offline CTA; do not debate details publicly.

A4. Required Output Metadata (for audit and controls)
Every draft must include:
- risk_flags[] (e.g., PHI_RISK, LEGAL_THREAT, SAFETY_INCIDENT, INCENTIVE_RISK, COMPETITOR_MENTION)
- escalation_level (None, L1, L2, Legal)
- response_mode (auto_draft_ok, needs_human_approval, blocked_manual_review)

B) ESCALATION PLAYBOOK v3 (FINAL)
This playbook decides: (1) whether we respond; (2) how we respond; (3) who must be looped in; (4) evidence needed.

B1. Escalation Levels
- None: Positive/neutral or mild complaint; safe to draft + post after normal approval.
- L1 (Ops): Service quality, scheduling, rude staff, mild billing confusion; draft ok with stronger empathy + offline CTA.
- L2 (Owner/GM): Alleged damage, safety issues, discrimination/harassment claims, repeated failures, refund demands with threats.
- Legal (Manual-only hold): Any lawsuit/attorney/legal action mention; any PHI risk where draft might confirm patient status; any credible threat of violence.

B2. SLAs (internal routing)
- Safety incident / discrimination claim: Owner/GM notified <4 hours; do not post until reviewed.
- Billing dispute: Billing lead notified <24 hours.
- Service failure without safety: Ops lead notified <24 hours.
- Legal threats: Legal same-day; response_mode must be blocked_manual_review.

B3. DO-NOT-POST Conditions (always manual-only hold)
1) Legal threats (“attorney/sue/lawsuit”).
2) The response would confirm PHI/patient relationship or disclose private information.
3) Active safety investigation (injury, fire, gas leak, malpractice allegation, assault).
4) Reviewer posts hate speech, threats, or doxxing: do not engage substantively; route to platform/reporting process internally.

B4. Evidence Checklist by Scenario (minimum)
- Billing dispute: invoice, payment logs, written estimate/authorization, call notes.
- Alleged damage (HVAC/any): before/after photos, technician notes, dispatch logs.
- Clinical complaint (dentist/med spa): internal visit notes (do not reference publicly), consent forms, aftercare instructions.
- Discrimination: staff roster on shift, CCTV (if applicable), written statements.

B5. Response Rules by Scenario
- Suspected fake review: never accuse as fact. Use verification language: “We can’t find a record matching this; please contact us so we can look into it.”
- Refund demand: no public negotiation. “Please contact us directly so we can review your concerns.”
- Staff named: do not discuss personnel actions. “We take this seriously and will review internally.”

C) APPROVED RESPONSE TEMPLATE LIBRARY v3 (FINAL)
Rules for all templates:
- Allowed variables (only if verified by business): {business_name}, {location_city}, {contact_method} (phone or email), {signoff_name} (first name only).
- Disallowed variables: staff last names, appointment date/time, procedure details, pricing specifics unless explicitly in review AND verified.
- Always include offline CTA.

C1. DENTIST TEMPLATES
DENT-01 (Positive)
“Thank you for the kind words. We’re glad you had a great experience with {business_name}. If you ever need anything, please reach out to us at {contact_method}. — {signoff_name}”

DENT-02 (Neutral/Short)
“Thank you for your feedback. If there’s anything we can do to improve your experience, please contact us at {contact_method} so we can help. — {signoff_name}”

DENT-03 (Mild Negative: wait time / communication)
“We’re sorry to hear this didn’t meet expectations. We aim to provide timely, clear care and would like to learn more about what happened. Please contact us at {contact_method} so we can address your concerns. — {signoff_name}”

DENT-04 (Strong Negative: pain/outcome complaint; no guarantees)
“We’re sorry you’re feeling this way. Patient experience and safety are very important to us. We can’t discuss details here, but we’d like to connect directly to understand your concerns and discuss next steps. Please reach us at {contact_method}. — {signoff_name}”

DENT-05 (Suspected Fake/No Record)
“Thank you for sharing this. We take concerns seriously, but we’re not able to identify the situation from the information provided. Please contact {business_name} at {contact_method} so we can look into it. — {signoff_name}”

DENT-06 (PHI Risk Safe Generic; use when review mentions records/visit)
“Thank you for your feedback. We take privacy and service concerns seriously and would like to learn more. Please contact us at {contact_method} so we can assist. — {signoff_name}”

C2. MED SPA TEMPLATES
MSPA-01 (Positive)
“Thank you for the review. We’re happy you enjoyed your experience at {business_name}. If you have any questions, please contact us at {contact_method}. — {signoff_name}”

MSPA-02 (Neutral)
“Thank you for your feedback. We’re always working to improve. Please reach out at {contact_method} so we can better understand your experience. — {signoff_name}”

MSPA-03 (Mild Negative: scheduling/front desk)
“We’re sorry to hear this. Great service is important to us, and we’d like to make things right. Please contact us at {contact_method} so we can help. — {signoff_name}”

MSPA-04 (Results dissatisfaction; avoid guarantees)
“We’re sorry this didn’t meet your expectations. Results can vary and we want to understand your concerns. Please contact us at {contact_method} so we can discuss options privately. — {signoff_name}”

MSPA-05 (Suspected fake / competitor comparison bait)
“Thank you for sharing your perspective. We’d like to look into this, but we need a bit more information. Please contact {business_name} at {contact_method}. — {signoff_name}”

MSPA-06 (Safety/complication mention: escalate L2)
“We’re sorry to hear about your experience. We take safety concerns seriously and would like to connect directly as soon as possible. Please contact us at {contact_method}. — {signoff_name}”

C3. HVAC TEMPLATES
HVAC-01 (Positive)
“Thanks for choosing {business_name}. We appreciate your feedback and are glad we could help. If you need anything else, contact us at {contact_method}. — {signoff_name}”

HVAC-02 (Neutral)
“Thank you for your feedback. We’d like to learn more so we can improve. Please contact us at {contact_method}. — {signoff_name}”

HVAC-03 (Mild Negative: late arrival)
“We’re sorry for the inconvenience. We aim to be on time and communicate clearly. Please contact us at {contact_method} so we can review what happened. — {signoff_name}”

HVAC-04 (Billing dispute)
“We’re sorry for the frustration. We’d like to review your concerns and make sure everything is clear. Please contact our team at {contact_method} so we can assist. — {signoff_name}”

HVAC-05 (Alleged damage)
“We’re sorry to hear this. We take concerns like this seriously and want to understand what happened. Please contact us at {contact_method} so we can look into it and help resolve the issue. — {signoff_name}”

HVAC-06 (Suspected fake)
“Thank you for the feedback. We’re not able to confirm the situation from the details provided, but we’d like to investigate. Please contact {business_name} at {contact_method}. — {signoff_name}”

D) AUDIT TRAIL (MINIMUM ACCEPTANCE CRITERIA)
System must log (at minimum): review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode, draft_version, model/prompt version, human_approver_id, approval_timestamp, posted_timestamp, post_status/error_code, hold_reason (if any), detector_version, blocked_timestamp, unblocker_id, final_response_text. Events: draft_created, flagged, approved, blocked, posted.

E) GO/NO-GO EXIT CRITERIA (SUMMARY)
GO if all true:
1) Legal-threat detector forces response_mode=blocked_manual_review and prevents posting via API and UI.
2) PHI confirmation hard-block prevents “records/chart/visit/appointment” acknowledgements.
3) Yelp-specific constraints pass (no removal promises, no incentives, no competitor disparagement).
4) Audit logs contain all required fields for at least 10 end-to-end test cases (mix of auto_draft_ok and blocked_manual_review).
5) Weekly KPIs reconcile: approved vs posted vs blocked counts match log events.

End of Final Pack v1.0.