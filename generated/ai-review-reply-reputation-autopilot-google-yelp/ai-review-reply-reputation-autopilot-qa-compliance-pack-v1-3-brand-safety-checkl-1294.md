# AI Review Reply & Reputation Autopilot — QA & Compliance Pack v1.3 (Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + Audit/KPI Appendix)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:02:27.087Z

---

This pack is the implementation-ready QA/compliance standard for the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). It is designed to prevent brand-safety failures, hallucination-based harms, and platform-policy violations while creating consistent, professional replies.

Business legitimacy reference for all customer-facing comms:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support/ops email: agent_bob_replit+review-bot@agentmail.to

SECTION A — BRAND-SAFETY CHECKLIST v3 (tick-box, enforceable)
A1. Universal “MUST INCLUDE” elements (all responses)
1) Thank/acknowledge reviewer (neutral tone).
2) Keep it brief; avoid point-by-point debate.
3) Offer offline resolution path with a clear CTA (phone/email) and no incentives.
4) No promises of outcomes; no admissions of fault; no new facts.
5) No personal data. Do not name staff unless the reviewer named them first, and even then avoid full names.

A2. Universal “MUST NOT” content (hard blocks)
- PHI / HIPAA confirmation (health vertical): any wording that confirms the person is/was a patient/client or references their visit/records: “your visit”, “your appointment”, “your chart/records”, “we reviewed your file”, “treatment plan”, “before/after results”, diagnoses, prescriptions.
- Medical guarantees: “cure”, “permanent”, “guaranteed results”, “no pain”, “safe for everyone”.
- Liability admission: “we messed up”, “our fault”, “we caused”, “negligent”, “malpractice”, “we damaged”.
- Incentives/review gating: “discount for a review”, “we’ll refund if you change rating”, “contact us and we’ll make it right if you update/remove”.
- Doxxing: addresses, phone numbers of individuals, schedules, appointment details.
- Threats/retaliation: “we will sue”, “we’ll report you”, “we know who you are”.
- Competitor disparagement: “they are scams”, “we’re better than X”, “their work is terrible”.
- Removal promises: “we will have Yelp/Google take this down”, “we’ll get this removed”.

A3. Required detector-driven behaviors (pre-generation + pre-post gates)
- LEGAL THREAT detector (keywords: sue/lawsuit/attorney/legal action/court/subpoena):
  -> Response mode = HOLD (manual-only). Do not post.
  -> escalation_level = Legal.
  -> post_status must be ‘blocked_manual_review’.
- PHI/HEALTH PRIVACY detector (keywords: chart/records/visit/appointment/treatment + any health-service context):
  -> Force generic wording that does NOT confirm patient relationship.
  -> If review includes explicit PHI or patient identity: HOLD (manual-only) or “minimally acknowledging + offline CTA” depending on policy setting.
- SAFETY INCIDENT detector (injury/fire/gas leak/electrical hazard/assault):
  -> escalation_level = Safety.
  -> Prefer HOLD if allegation implies imminent harm or investigation.
- DISCRIMINATION/HARASSMENT/HATE detector:
  -> escalation_level = Safety/HR.
  -> Response must be de-escalatory; never argue; offer offline contact; consider HOLD if threats present.
- INCENTIVE language detector:
  -> Block or rewrite; ensure no compensation is offered for review changes.

A4. Google Business Profile vs Yelp alignment notes (testable)
- Both: no incentives, no review gating, no disclosure of private customer data, no aggressive/argumentative tone.
- Yelp: especially avoid “Yelp will remove this” claims, and avoid suggesting the review is fake unless phrased carefully (e.g., “We can’t locate this experience—please contact us directly…”). Avoid public back-and-forth.

SECTION B — ESCALATION PLAYBOOK v3 (decision trees + SLAs)
B1. Escalation Levels
L0: Normal (postable): positive/neutral/mild negative; no high-risk flags.
L1: Ops (postable with caution): service quality issues, scheduling, general dissatisfaction; offline CTA required.
L2: Billing/Refund (postable with caution): disputes about charges; never quote private amounts unless reviewer stated them; request offline contact.
L3: Safety/HR (often HOLD): injury, harassment, discrimination, staff threats.
L4: Legal (HOLD mandatory): lawsuits/attorney threats, defamation threats, demands for evidence in public, regulatory complaints implying litigation.
L5: Privacy/PHI (HOLD or forced-generic): any patient-identifying medical content, claims involving records/appointments.

B2. Routing SLAs (internal)
- Legal threats (L4): notify Owner/Legal same-day (≤4 hours). No posting until cleared.
- Safety incidents (L3): Owner/GM ≤4 hours; Ops lead same day; preserve evidence.
- Billing/refund disputes (L2): Billing lead ≤24 hours.
- Service quality (L1): Ops ≤24 hours.

B3. Evidence checklist by scenario
- Billing: invoice ID, dates, authorization logs, signed estimates.
- Service quality: job notes, technician/clinician notes (internal only), photos (internal only), timestamps.
- Safety: incident report, any emergency contact, internal safety checklist.
- Legal: full review text, customer record linkage (internal), prior comms.

B4. “DO NOT POST” conditions (automatic HOLD)
- Any legal threat language.
- Any PHI confirmation risk (health vertical) where a reply could confirm relationship.
- Any safety allegation implying ongoing danger.
- Any request to reveal private information publicly.

SECTION C — APPROVED RESPONSE TEMPLATES v3 (versioned)
Rules for all templates:
- Allowed variables (safe): {business_name}, {support_email}, {support_phone}, {city}, {role_title}.
- Disallowed variables: patient/customer name (unless reviewer already used and approved by human), appointment dates, medical details, prices not stated in review, staff last names.
- Mandatory offline CTA: “Please contact us at {support_email} or {support_phone} so we can help.”

C1. Dentist Templates (Google/Yelp)
DENT-01 Positive (postable)
“Thank you for the kind words. We’re glad you had a great experience with our team. If there’s anything we can do for you in the future, please reach us at {support_email} or {support_phone}.”

DENT-02 Neutral/short praise (postable)
“Thanks for taking a moment to leave feedback. We appreciate it and will share it with the team.”

DENT-03 Mild negative: wait time/communication (postable, L1)
“Thank you for the feedback. We aim to be respectful of everyone’s time, and we’re sorry this was frustrating. Please contact us at {support_email} or {support_phone} so we can learn more and address it.”

DENT-04 Strong negative (no PHI confirmation) (postable only if no PHI; otherwise HOLD)
“Thank you for sharing your concerns. We take feedback seriously and want to understand what happened. Please contact our team at {support_email} or {support_phone} so we can look into this and help.”

DENT-05 Suspected fake/can’t locate (postable, careful wording)
“Thank you for the review. We can’t locate an experience that matches the details provided, but we’d like to understand more. Please contact us at {support_email} or {support_phone}.”

DENT-06 Legal threat (HOLD, do not post)
System output must be: escalation_level=Legal, post_status=blocked_manual_review. No public reply until legal approval.

C2. Med Spa Templates (Google/Yelp)
MSPA-01 Positive
“Thank you for the kind feedback. We’re happy you enjoyed your experience with our team. If you ever have questions, contact us at {support_email} or {support_phone}.”

MSPA-02 Neutral
“Thanks for sharing your feedback. We appreciate you taking the time to comment.”

MSPA-03 Results dissatisfaction (no outcome debate; no PHI)
“Thank you for the feedback. We’re sorry to hear you’re unhappy. We’d like to learn more and help where we can—please contact us at {support_email} or {support_phone}.”

MSPA-04 Staff professionalism complaint
“Thank you for letting us know. We expect professional, respectful service and want to look into this. Please contact us at {support_email} or {support_phone} so we can follow up.”

MSPA-05 PHI-heavy review (HOLD or forced generic)
If reviewer includes medical details/identities: HOLD recommended. If forced generic allowed: “Thank you for your feedback. For privacy reasons we can’t discuss details here. Please contact us at {support_email} or {support_phone} so we can assist.”

MSPA-06 Incentive request (“discount for removing review”) (postable, refuse incentives)
“Thanks for your message. We don’t offer compensation in exchange for reviews or rating changes, but we do want to address your concerns. Please contact us at {support_email} or {support_phone}.”

C3. HVAC Templates (Google/Yelp)
HVAC-01 Positive
“Thank you for the review. We appreciate your business and are glad our team could help. If you need anything else, contact us at {support_email} or {support_phone}.”

HVAC-02 Scheduling delay
“Thank you for the feedback, and we’re sorry for the scheduling frustration. Please contact us at {support_email} or {support_phone} so we can understand what happened and make it right.”

HVAC-03 Pricing dispute (no private amounts unless reviewer stated them)
“Thanks for letting us know. We want pricing to be clear and fair. Please contact us at {support_email} or {support_phone} so we can review the details with you directly.”

HVAC-04 Alleged damage
“Thank you for the feedback. We take concerns like this seriously and want to investigate. Please contact us at {support_email} or {support_phone} so we can gather details and follow up.”

HVAC-05 Safety allegation (gas leak, fire risk) (often HOLD)
If imminent hazard alleged: HOLD + escalation_level=Safety. If not imminent and policy allows: very brief reply + offline CTA; no admissions.

HVAC-06 Suspected fake
“Thank you for the review. We can’t match the details to our records, but we’d like to understand more. Please contact us at {support_email} or {support_phone}.”

SECTION D — AUDIT TRAIL + REPORTING APPENDIX (acceptance criteria)
D1. Required log fields (minimum)
review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags[], escalation_level, response_mode (postable/hold), draft_version, template_id (if used), model_version/prompt_version, human_approver_id (nullable), approval_timestamp (nullable), posted_timestamp (nullable), post_status (approved/posted/failed/blocked_manual_review), hold_reason (nullable), detector_version.

D2. Required events
draft_created, flagged, escalated, approved, blocked, posted, post_failed.

D3. Weekly KPIs (must reconcile)
- Response rate = posted_responses / total_reviews_received.
- Median first-response time = median(posted_timestamp - review_created_at) for posted.
- Blocked count = count(post_status=blocked_manual_review).
- Approved-not-posted = approved_count - posted_count - blocked_count (must be explainable via failures).
- Escalations by level/reason.

END STATE
This pack defines the exact content constraints, escalation rules, templates, and logging/reporting requirements needed for a compliant launch on Google Business Profile and Yelp. Engineering should implement detectors + posting gates to enforce HOLD conditions, and ops should use the playbook to resolve escalations without policy violations.
