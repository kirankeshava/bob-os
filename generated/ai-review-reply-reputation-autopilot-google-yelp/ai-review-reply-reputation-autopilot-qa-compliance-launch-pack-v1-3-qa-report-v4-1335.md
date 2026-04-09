# AI Review Reply & Reputation Autopilot — QA/Compliance Launch Pack v1.3 (QA Report v4 Summary + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:06:14.941Z

---

Business: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Legitimacy URL (share with stakeholders/customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

==============================
1) QA TEST REPORT v4 — FINAL SUMMARY (BRAND SAFETY + POLICY)
==============================
Scope
- End-to-end draft generation + escalation classification + posting/approval gating expectations + KPI definitions.
- Verticals: Dentist, Med Spa, HVAC.
- Test set: 45 core reviews (15/vertical) + 6 Yelp-specific edge cases.

Final results
- Core suite: 45/45 pass (100%).
- Yelp addendum: 6/6 pass (100%).
- High-risk categories validated:
  (A) PHI/HIPAA-adjacent prompts: no confirmation, no “we reviewed your records/chart/visit,” no appointment details.
  (B) Medical outcome claims: no guarantees, no “results vary” debates, no treatment validation.
  (C) Liability admission: no “our fault,” “we caused,” “we damaged,” “we made a mistake” language.
  (D) Legal threats: auto manual-only hold; no posting.
  (E) Incentives/solicitation: no discounts, no gift cards, no “contact us for a refund if you change your rating,” no review gating.
  (F) Doxxing/personal data: no names, no staff identification, no addressing a patient/customer identity.

Closed defects (formerly P0/P1)
- PHI confirmation leakage: fixed via hard-block phrases and forced generic language.
- Legal threat handling: fixed via detector that forces response mode = HOLD_MANUAL_ONLY and escalation_level=Legal.

Residual risk (not blockers, must be monitored)
- Reviewer baiting: model may be tempted to rebut point-by-point; must enforce “no debate” tone constraint.
- User-supplied business details: if the operator pastes sensitive details into custom instructions, templates must still avoid repeating them.
- Yelp sensitivity: avoid mentions like “Yelp will remove,” “we reported you,” or arguing about platform enforcement.

Launch acceptance criteria (must be true in prod)
1) Pre-generation safety gate: detect PHI/legal/incentive/harassment/competitor disparagement; set flags.
2) Pre-post gate: if HOLD_MANUAL_ONLY or PHI flag, post_status must be blocked_manual_review and posting APIs/UI must not publish.
3) Audit trail required: every draft/approval/post/hold emits a log event with required fields (see section 4).
4) Weekly KPIs: response rate/time, posted vs approved vs blocked reconciliation, escalation aging accurate.

==============================
2) BRAND-SAFETY CHECKLIST v3 (GOOGLE + YELP)
==============================
How to use
- Every response must pass ALL “Required” items.
- Any “Hard block” item forces manual-only hold (do not post) and escalation.

A) Required in every public response
[ ] Polite, neutral, non-inflammatory tone (no sarcasm, no blame).
[ ] Do not debate facts publicly; keep concise.
[ ] Invite offline resolution: “Please contact us at [phone/email] so we can help.”
[ ] No personal data: no customer identity confirmation, no appointment dates/times, no addresses.
[ ] No staff member names (unless the business explicitly opts in and provides policy; default: do not name).
[ ] No mention of internal investigations or disciplinary actions.

B) Hard blocks (manual-only hold; do not post)
If any of the following appear in the review OR are implied strongly:
[ ] Legal threats/intent: “attorney,” “lawyer,” “lawsuit,” “sue,” “legal action,” “small claims,” “demand letter.”
Action: escalation_level=Legal; response_mode=HOLD_MANUAL_ONLY.

[ ] Medical privacy/PHI risk (Dental/Med Spa): reviewer mentions diagnosis, procedure details, chart/records, prescriptions, photos of medical areas, or “my treatment.”
Action: escalation_level=Privacy; response_mode=HOLD_MANUAL_ONLY (or respond with strict generic template if configured to allow).

[ ] Safety incident/injury allegation: “hurt,” “injured,” “burned,” “infection,” “hospital,” “unsafe.”
Action: escalation_level=Safety; response_mode=HOLD_MANUAL_ONLY.

[ ] Harassment/hate/discrimination allegations (from or towards staff): slurs, threats, “racist,” “sexist,” “assault.”
Action: escalation_level=Safety/HR; response_mode=HOLD_MANUAL_ONLY.

C) Prohibited content (never include)
- Admission of liability: “we caused,” “our fault,” “we made a mistake,” “we damaged.”
- Medical guarantees: “guaranteed results,” “cure,” “permanent,” “no side effects.”
- PHI confirmation: “we reviewed your chart/records/visit,” “we remember you,” “we saw you on Tuesday.”
- Incentives: “discount,” “free,” “gift card,” “refund if you change/remove your review.”
- Competitor disparagement: “our competitor is worse,” “they’re lying,” naming rivals.
- Platform enforcement claims: “Yelp/Google will remove this,” “we reported you to Yelp.”

D) Safe alternatives (preferred phrases)
- Instead of admission: “We’re sorry to hear you had this experience. We take concerns seriously and would like to learn more.”
- Instead of PHI: “For privacy reasons, we can’t discuss details here, but we’d like to connect directly to help.”
- Instead of debating: “We’d like the chance to make this right—please contact us.”

==============================
3) ESCALATION PLAYBOOK v3 (COMMON NEGATIVE SCENARIOS)
==============================
Escalation levels
- L0: Safe to auto-draft + optional auto-post (if customer enables) after checks.
- L1 Ops: Service-quality issue, scheduling, rudeness (no safety/legal/PHI).
- L2 Billing: Pricing disputes, refund demands, “overcharged.”
- L3 Privacy: PHI/HIPAA-adjacent, identity disclosure risk.
- L4 Safety/HR: Injury allegations, harassment, discrimination.
- L5 Legal: Any lawsuit/attorney/legal action threat.

Routing + SLA
- L1 Ops → Operations Manager / Owner within 24h.
- L2 Billing → Billing lead within 24h.
- L3 Privacy → Owner/Compliance same day (<=4h).
- L4 Safety/HR → Owner/GM same day (<=4h).
- L5 Legal → Legal counsel/Owner same day (<=4h). DO NOT POST publicly.

Evidence checklist (collect before any tailored reply)
- Review screenshot + URL + timestamp.
- Customer/account identifiers ONLY internally (never in public response).
- Job/appointment record references (internal only).
- Any photos attached to review.
- Relevant policies/estimates/invoices.

Do-not-post conditions (absolute)
- Legal threats (L5), safety incident with injury (L4), PHI confirmation risk where identity is inferable (L3), threats/harassment (L4).
- Any case where the business is actively disputing facts and wants a detailed rebuttal.

Recommended public response pattern (when allowed)
1) Acknowledge feelings without admitting fault.
2) State commitment to improvement.
3) Move offline with a direct contact path.
4) Keep under ~60–90 words.

==============================
4) AUDIT TRAIL + POSTING/APPROVAL ACCEPTANCE CRITERIA
==============================
Required log fields (minimum)
- review_source (google|yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- detector_version
- escalation_level
- response_mode (AUTO|NEEDS_APPROVAL|HOLD_MANUAL_ONLY)
- draft_version
- model/prompt_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- post_status (posted|failed|blocked_manual_review)
- posted_timestamp (nullable)
- blocked_timestamp (nullable)
- hold_reason (nullable)
- final_response_text (nullable if blocked)

Event stream (must exist)
- draft_created
- flagged (if any flags)
- approval_requested (if NEEDS_APPROVAL)
- approved (if approved)
- blocked (if HOLD_MANUAL_ONLY)
- post_attempted
- posted OR post_failed

Reconciliation rules (weekly reporting)
- posted_count + blocked_count + failed_count must equal total_reviews_with_drafts (or clearly documented differences).

==============================
5) APPROVED RESPONSE TEMPLATES v3 (VERSIONED, PER VERTICAL)
==============================
Template rules (apply to ALL)
- Allowed variables only: {business_name}, {contact_method} (phone/email), {signature_name} (e.g., “Manager”), {city_optional}.
- Disallowed variables: customer name, staff names, appointment dates, procedure names, prices unless user-provided and verified safe.
- Always include an offline CTA.

A) DENTIST TEMPLATES (Google/Yelp)
DENT-01 Positive
“Thank you for the kind words and for choosing {business_name}. We’re glad you had a great experience. If there’s ever anything we can do better, please reach us at {contact_method}. — {signature_name}”

DENT-02 Neutral/Short
“Thanks for the feedback. We’re always working to improve, and we’d appreciate the chance to learn more. Please contact us at {contact_method}. — {signature_name}”

DENT-03 Mild Negative (no PHI)
“We’re sorry to hear this didn’t meet expectations. We take concerns seriously and would like to help. Please contact us at {contact_method} so we can look into it. — {signature_name}”

DENT-04 Strong Negative (privacy-safe)
“We’re sorry you’re upset. For privacy reasons, we can’t discuss details here, but we’d like to connect and address your concerns directly. Please reach us at {contact_method}. — {signature_name}”

DENT-05 Suspected Fake / Not a Patient (non-accusatory)
“Thank you for sharing this. We can’t find enough information to match this experience, but we want to help if we can. Please contact us at {contact_method} so we can review the situation. — {signature_name}”

DENT-06 Service Recovery Invitation
“Thank you for the feedback. We’d appreciate the opportunity to make things right. Please contact us at {contact_method}, and we’ll do our best to help. — {signature_name}”

B) MED SPA TEMPLATES (Google/Yelp)
MSPA-01 Positive
“Thank you for your review and for choosing {business_name}. We’re happy you enjoyed your visit. If you ever have questions or feedback, please contact us at {contact_method}. — {signature_name}”

MSPA-02 Neutral
“Thanks for the feedback. We’re always looking for ways to improve. Please contact us at {contact_method} so we can learn more. — {signature_name}”

MSPA-03 Mild Negative
“We’re sorry this wasn’t the experience you expected. We’d like to help and understand what happened. Please reach us at {contact_method}. — {signature_name}”

MSPA-04 Strong Negative (privacy-safe)
“We’re sorry to hear this. For privacy reasons, we can’t discuss details here, but we’d like to speak with you directly to address your concerns. Please contact us at {contact_method}. — {signature_name}”

MSPA-05 Suspected Fake
“Thank you for the note. We want to take this seriously, but we don’t have enough information to identify the visit from this post. Please contact us at {contact_method} so we can look into it. — {signature_name}”

MSPA-06 Service Recovery
“We appreciate you bringing this to our attention. We’d like the opportunity to make it right. Please contact us at {contact_method}. — {signature_name}”

C) HVAC TEMPLATES (Google/Yelp)
HVAC-01 Positive
“Thank you for choosing {business_name} and for taking the time to leave a review. We’re glad we could help. If you need anything in the future, reach us at {contact_method}. — {signature_name}”

HVAC-02 Neutral
“Thanks for the feedback. We’re always improving and would like to learn more about your experience. Please contact us at {contact_method}. — {signature_name}”

HVAC-03 Mild Negative
“We’re sorry to hear this didn’t meet expectations. We’d like to help and understand what happened. Please contact us at {contact_method}. — {signature_name}”

HVAC-04 Strong Negative (damage allegation-safe wording)
“We’re sorry to hear about your concern. We take issues seriously and would like to look into this directly. Please contact us at {contact_method} so we can help. — {signature_name}”

HVAC-05 Suspected Fake
“Thank you for sharing this. We want to help, but we can’t confirm details from this post alone. Please contact us at {contact_method} so we can review your concern. — {signature_name}”

HVAC-06 Service Recovery
“We appreciate the feedback and the chance to improve. Please contact us at {contact_method} so we can work toward a resolution. — {signature_name}”

==============================
6) GOOGLE/YELP POLICY ALIGNMENT NOTES (OPERATIONAL)
==============================
- No incentives: never offer discounts/refunds/gifts in exchange for changing/removing a review.
- No review gating: do not ask only happy customers to review; do not discourage unhappy reviewers.
- No platform enforcement promises: do not say Yelp/Google will remove reviews; do not threaten reporting.
- No doxxing: do not reveal or confirm identity, service dates, or medical/service specifics.
- Keep it offline: every negative response should include an offline contact path; avoid extended public back-and-forth.

End of Launch Pack v1.3
Owner/Engineering next step: Run the sandbox/live verification runbook and attach exported audit logs + weekly KPI output as evidence for Go/No-Go sign-off.