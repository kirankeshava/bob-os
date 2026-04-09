# Brand-Safety & Compliance Pack v2.3 — Checklist + Escalation Playbook + Approved Templates (Google Business Profile & Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T21:21:41.029Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Brand-Safety & Compliance Pack v2.3
Owner/Support Contact: agent_bob_replit+review-bot@agentmail.to
Product URL (legitimacy / reference for customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

====================================
A) BRAND-SAFETY & PLATFORM POLICY CHECKLIST (Ops/QA Tick-Box)
====================================
Use this checklist for: (1) template approval, (2) model/prompt changes, (3) pre-post human approval, (4) incident reviews.

A1. Universal “Must Include” Requirements (All responses)
[ ] Thank the reviewer (or acknowledge feedback) without sarcasm.
[ ] Use neutral, professional tone; no arguing, no blame, no threats.
[ ] Invite offline resolution via a safe CTA (phone/email) without exposing personal data.
[ ] Do not request, pressure, or incentivize reviews.
[ ] Do not mention internal policies that imply retaliation (e.g., “we’ll ban you”).
[ ] Avoid discussing employee discipline publicly.

A2. Universal “Must Not” Requirements (Hard Prohibitions)
PHI/Privacy (especially for healthcare)
[ ] Never confirm they are a patient/customer or that they had an appointment.
[ ] Never reference “records/chart/visit/treatment plan/x-rays/diagnosis.”
[ ] Never mention appointment dates/times, procedures, medications, outcomes.
[ ] Never use the reviewer’s full name if provided; do not repeat personal identifiers.

Liability / Legal
[ ] No admission of fault (“we messed up,” “we caused,” “our negligence”).
[ ] No promises that imply liability acceptance (“we will pay for damages”).
[ ] If legal threat language is detected: response mode MUST be “manual-only hold” (no autopost).

Incentives / Review Gating
[ ] No discounts, freebies, gifts, store credit, raffle entries, “we’ll make it right if you update your review.”
[ ] No gating language (“contact us first before leaving a review”).

Competitors / Defamation
[ ] No disparaging competitors.
[ ] No accusations that reviewer is a competitor unless using the “suspected fake review” safe template.

Sensitive Content
[ ] No harassment, hate, or inflammatory replies even if the review is abusive.
[ ] No doxxing: never post addresses, phone numbers of individuals, license numbers, or private identifiers.

A3. Platform Alignment Notes
Google Business Profile (GBP)
[ ] Keep responses helpful and relevant; avoid spammy repetitive promos.
[ ] Do not ask for review removal; do not claim you can remove reviews.

Yelp
[ ] Do not solicit reviews or encourage “positive reviews.”
[ ] Do not mention Yelp policy enforcement or imply Yelp will remove content.
[ ] Keep responses factual, polite, and offline-directed.

A4. Required Offline CTA Safe Wording (choose one)
[ ] “We’d like to learn more and help. Please contact us at [BUSINESS_EMAIL/PHONE] so we can follow up.”
[ ] “We take feedback seriously. Please reach out at [BUSINESS_EMAIL/PHONE] so we can look into this privately.”

A5. Blocked Phrases (Hard Block → hold_manual_review)
PHI confirmation / records
- “we reviewed your chart/records/visit/appointment”
- “according to your records”
- “our notes show”
Medical guarantees
- “guaranteed results” “permanent results” “100% effective”
Liability admissions
- “our fault” “we caused” “we are liable” “negligent”
Incentives
- “discount” “coupon” “free” “gift card” “refund if you update”
Legal threats (also triggers Legal escalation)
- “lawsuit” “attorney” “sue” “legal action” “court”

A6. Forced-Safe Substitutions (when risky topics appear)
If review includes appointment/procedure details, respond generically:
- Replace any specific: “We can’t discuss details here, but we’d like to connect privately to address your concerns.”
If review includes injury/damage allegation:
- Use: “We’re concerned to hear this. Please contact [BUSINESS_EMAIL/PHONE] so we can understand what happened and address it appropriately.” (No fault admission.)
If review includes discrimination claim:
- Use: “We’re sorry to hear this. We take these concerns seriously and want to look into it. Please contact [BUSINESS_EMAIL/PHONE].”

====================================
B) ESCALATION PLAYBOOK v2.3 (Scenarios, Routing, SLAs, Do-Not-Post)
====================================
Escalation Levels
L0: Safe to respond using approved template (auto-draft; can autopost if enabled).
L1: Mild negative/service recovery (human approval recommended).
L2: High-risk (billing dispute, alleged misconduct, safety issue) → requires human approval.
L3: Legal/PHI/safety incident → HOLD (manual-only; do not autopost).

B1. Do-Not-Post Conditions (HOLD_MANUAL_REVIEW)
- Any PHI confirmation risk or healthcare-specific details.
- Any legal threat language (attorney/lawsuit/sue/legal action).
- Any credible safety incident (gas leak, electrical hazard, injury) until internal review.
- Active harassment/stalking threats: respond only after internal decision.

B2. Routing & SLAs (internal)
Safety incident (injury, hazard, “unsafe”)
- Escalation: L3
- Owner/GM SLA: <4 hours
- Evidence: job notes, technician assignment, photos, call logs
Billing dispute / refund demand
- Escalation: L2
- Billing/Finance SLA: <24 hours
- Evidence: invoices, signed estimates, payment logs
Quality complaint (service outcome)
- Escalation: L1–L2 depending on severity
- Ops SLA: <24 hours
- Evidence: appointment logs/job notes, staff schedule, communications
Discrimination / harassment allegation
- Escalation: L3
- Owner/HR SLA: same day
- Evidence: staff statements, CCTV (if applicable), communications
Suspected fake review / wrong business
- Escalation: L1
- Ops SLA: <24 hours
- Evidence: customer records match check (without posting PHI), service area validation

B3. Approved Public Response Patterns by Scenario
1) Billing dispute
- Goal: acknowledge, invite offline, no public negotiation.
- Never: post line-item details or accuse the reviewer of nonpayment.
2) Healthcare complaint (dentist/med spa)
- Goal: avoid PHI; generic.
- Never: confirm they were a patient or mention treatment.
3) HVAC safety concern
- Goal: prioritize safety; immediate offline CTA.
- Never: admit fault or promise compensation publicly.
4) Legal threat
- Goal: no response or minimal neutral response after counsel; generally hold.
- System requirement: auto HOLD + escalation_level=Legal.

====================================
C) APPROVED RESPONSE TEMPLATE LIBRARY v2.3 (Per Vertical)
====================================
Rules for all templates
- Allowed variables: {BusinessName}, {BusinessPhone}, {BusinessEmail}, {FirstNameInitial} (optional), {GeneralServiceCategory} (e.g., “dental care”, “aesthetic services”, “HVAC service”).
- Disallowed variables: appointment date/time, procedure names, pricing details unless pre-verified and customer-supplied for public posting, staff full names, any health info.
- Must include offline CTA.

C1) DENTIST TEMPLATES (Google/Yelp)
DENT-01 Positive
“Thank you for your kind words. We’re glad you had a great experience with {BusinessName}. If you ever have questions or need anything, please reach us at {BusinessPhone} or {BusinessEmail}.”

DENT-02 Neutral/Short
“Thanks for taking the time to leave feedback. If there’s anything we can do to improve your experience, please contact us at {BusinessPhone} or {BusinessEmail}.”

DENT-03 Mild Negative (Service recovery; no PHI)
“We’re sorry to hear you felt disappointed. We take feedback seriously and would like to learn more. Please contact {BusinessName} at {BusinessPhone} or {BusinessEmail} so we can follow up privately.”

DENT-04 Strong Negative (High emotion; remain calm; no PHI)
“Thank you for sharing your concerns. We can’t discuss details in a public forum, but we want to understand what happened and address it appropriately. Please reach out to {BusinessName} at {BusinessPhone} or {BusinessEmail}.”

DENT-05 Suspected Fake / Wrong Office
“We take reviews seriously, but we’re not finding enough information to match this experience. If you believe this is for {BusinessName}, please contact us at {BusinessPhone} or {BusinessEmail} so we can look into it. If this review was meant for a different office, we’d appreciate an update.”

DENT-06 PHI-Risk Safe Reply (Use when reviewer includes treatment details; do not confirm)
“Thanks for reaching out. For privacy reasons, we can’t discuss anything related to care in a public review. We’d like to help—please contact {BusinessName} at {BusinessPhone} or {BusinessEmail} so we can follow up directly.”

C2) MED SPA TEMPLATES (Google/Yelp)
MSPA-01 Positive
“Thank you for the kind review. We’re happy you enjoyed your experience with {BusinessName}. If we can help with anything else, please contact us at {BusinessPhone} or {BusinessEmail}.”

MSPA-02 Neutral
“Thanks for your feedback. We’re always working to improve. Please reach out at {BusinessPhone} or {BusinessEmail} if you’d like to share more details privately.”

MSPA-03 Mild Negative
“We’re sorry to hear this didn’t meet your expectations. We’d like to learn more and help. Please contact {BusinessName} at {BusinessPhone} or {BusinessEmail} so we can follow up directly.”

MSPA-04 Strong Negative
“Thank you for bringing this to our attention. We can’t discuss specifics publicly, but we take concerns seriously and want to address them. Please contact {BusinessName} at {BusinessPhone} or {BusinessEmail}.”

MSPA-05 Suspected Fake / Wrong Business
“We want to look into this, but we don’t have enough information to identify the visit you’re referencing. Please contact {BusinessName} at {BusinessPhone} or {BusinessEmail}. If this was intended for another business, we’d appreciate an update.”

MSPA-06 No Results/Outcome Claim (avoid guarantees)
“Thank you for your feedback. Everyone’s experience can vary, and we’d like to understand your concerns. Please reach out to {BusinessName} at {BusinessPhone} or {BusinessEmail} so we can follow up privately.”

C3) HVAC TEMPLATES (Google/Yelp)
HVAC-01 Positive
“Thanks for choosing {BusinessName} and for the great review. We’re glad we could help. If you need anything in the future, contact us at {BusinessPhone} or {BusinessEmail}.”

HVAC-02 Neutral
“Thank you for the feedback. If there’s anything we can do better or clarify, please contact {BusinessName} at {BusinessPhone} or {BusinessEmail}.”

HVAC-03 Mild Negative (late arrival / communication)
“We’re sorry for the inconvenience and appreciate you letting us know. We’d like to learn more and make this right. Please contact {BusinessName} at {BusinessPhone} or {BusinessEmail}.”

HVAC-04 Strong Negative (quality/damage allegation; no liability admission)
“We’re concerned to hear this and want to understand what happened. Please contact {BusinessName} at {BusinessPhone} or {BusinessEmail} so we can review the situation and follow up directly.”

HVAC-05 Safety Concern (gas smell, electrical)
“Safety is extremely important to us. Please contact {BusinessName} at {BusinessPhone} immediately so we can understand the situation and advise next steps. We’d like to address this directly.”

HVAC-06 Suspected Fake / Wrong Company
“We take feedback seriously, but we’re not able to match this experience based on what’s shared here. Please contact {BusinessName} at {BusinessPhone} or {BusinessEmail} so we can look into it. If this was meant for another company, we’d appreciate an update.”

====================================
D) SAFETY FILTERS & DETECTORS (Engineering/QA Requirements)
====================================
D1. Response Modes
- auto_draft: draft generated
- requires_approval: cannot post until approved
- blocked_manual_review: no posting via API or UI; must be explicitly unblocked by authorized user

D2. Mandatory Detectors (minimum)
1) PHI/Healthcare privacy detector
- Triggers: “chart”, “records”, “visit”, “appointment”, procedure/diagnosis keywords
- Expected: if triggered in healthcare vertical, force PHI-safe template and block any text implying confirmation.
2) Legal threat detector
- Triggers: “lawsuit”, “attorney”, “sue”, “legal action”, “court”
- Expected: escalation_level=Legal, response_mode=blocked_manual_review.
3) Incentive/solicitation detector
- Triggers: discount/free/gift card/refund for update
- Expected: remove incentive language; if user tries to add it, block.
4) Competitor disparagement detector
- Triggers: named competitor + negative adjectives
- Expected: remove/disallow; switch to neutral wording.
5) Liability admission detector
- Triggers: “our fault”, “we caused”, “negligent”
- Expected: remove; switch to non-admission safe phrasing; may require approval.

D3. Logging/Audit Trail (minimum fields)
review_source, review_id, business_id/location_id, review_text_hash, risk_flags[], escalation_level, response_mode, draft_version, approver_id, approval_timestamp, posted_timestamp, post_status, hold_reason, detector_version, model_version, final_response_text.

====================================
E) QA EXIT CRITERIA (for launch readiness)
====================================
[ ] 100% pass on core QA suite (45/45) and Yelp edge addendum (6/6) with current model/prompt.
[ ] Legal threats always HOLD (blocked_manual_review) and cannot be posted via API/UI.
[ ] Healthcare reviews with treatment details never generate PHI-confirming language.
[ ] No incentives/review gating language can be produced or posted.
[ ] Weekly KPI report reconciles counts: drafted vs approved vs posted vs blocked.

Version control
- Pack version: v2.3
- Templates: v2.3 (DENT-01..06, MSPA-01..06, HVAC-01..06)
- Checklist: v2.3
- Playbook: v2.3

If you need changes or want a customer-facing policy summary, email agent_bob_replit+review-bot@agentmail.to and reference the product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1