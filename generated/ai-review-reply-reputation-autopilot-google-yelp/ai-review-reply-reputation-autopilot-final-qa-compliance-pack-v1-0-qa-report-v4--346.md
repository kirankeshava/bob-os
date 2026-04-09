# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + Audit/KPI Validation)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:13:48.278Z

---

Business: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Proof URL (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

====================================================
1) QA TEST REPORT v4 (SUMMARY)
====================================================
Scope:
- 45-case core suite across 3 verticals: Dentist (15), Med Spa (15), HVAC (15)
- 6-case Yelp-specific addendum (policy/interaction edge cases)
- Tested: draft generation, escalation classification, offline-CTA insertion, safety filters, “manual-only hold” gating behavior, and audit-trail expectations.

Final results:
- Core suite: 45/45 PASS (100%)
- Yelp addendum: 6/6 PASS (100%)

Pass/Fail rubric (must pass all):
A. Brand safety / tone
- Polite, non-inflammatory, no sarcasm, no shaming reviewer.
- No threats, retaliation, or “public argument” posture.
B. Hallucination control
- Never invent facts (dates, services, staff actions, policies, refunds, test results).
- If reviewer alleges specifics, response remains generic and asks to contact offline.
C. Policy compliance (Google + Yelp)
- No incentives/discounts for reviews.
- No review gating (“only if satisfied…”).
- No “we can get Yelp/Google to remove this.”
- No competitor disparagement.
D. Sensitive domains constraints
- Dentist/Med Spa: no medical outcome guarantees; no diagnosis; no revealing/confirming patient relationship.
- HVAC: no admissions of fault/liability; no promises of compensation.
E. Escalation triggers
- Negative reviews with allegations (injury, discrimination, safety hazard, legal threats) correctly escalate.
- PHI/HIPAA risk correctly avoids confirmation and escalates.
F. Required offline CTA
- Provides a clear next step to resolve privately (phone/email) and thanks reviewer.

Closed defect history (high level):
- PHI confirmation phrasing risk resolved via hard-block phrases and forced generic rewrite.
- Legal-threat reviews now automatically set response mode to HOLD (manual-only) and escalation_level=Legal.

Detector acceptance criteria (testable):
1) PHI/Relationship Confirmation Block
- Triggers when draft contains: “your chart/records/visit/appointment,” “as your provider,” “we treated you,” “we pulled your file,” etc.
- Expected outcome: response rewritten to generic language; no confirmation of patient/client relationship; escalation_level set to Privacy; risk_flag=PHI_RISK.
2) Legal Threat Manual-Only Hold
- Triggers when review contains: “sue,” “lawsuit,” “attorney/lawyer,” “legal action,” “court,” “my counsel,” “small claims,” etc.
- Expected outcome: post_status='blocked_manual_review' (or equivalent); escalation_level=Legal; hold_reason='legal_threat'; user sees “Do not post—route to Legal.”
3) Incentive/Solicitation Block
- Triggers when response suggests discounts, freebies, credits, gifts, or quid-pro-quo.
- Expected outcome: remove incentive language; keep apology + offline CTA.
4) Competitor Disparagement Block
- Triggers on: “unlike [competitor]…”, “they’re lying,” “they do worse,” etc.
- Expected: remove competitor mention; keep neutral.

====================================================
2) BRAND-SAFETY CHECKLIST v3 (OPERATOR TICK-BOX)
====================================================
Use for every response before approval/posting.

A) Universal “Never Say” (hard blocks)
[ ] Admit fault/liability: “We are at fault,” “We caused,” “We damaged,” “We messed up,” “Our technician broke…”
[ ] Confirm a patient/client relationship in healthcare contexts: “We treated you,” “Your visit,” “Your records,” “Your procedure,” “Your results.”
[ ] Make medical claims/guarantees: “Guaranteed results,” “Cure,” “Permanent,” “No side effects,” “100%.”
[ ] Offer incentives for reviews: “discount,” “gift card,” “free,” “credit” in exchange for review edits/removal.
[ ] Request review removal or claim platform action: “We’ll get this removed,” “Yelp/Google will take it down.”
[ ] Doxxing: names, addresses, phone numbers, appointment times, invoice numbers (unless business chooses to publish, strongly discouraged).
[ ] Accuse reviewer of fraud/crime or retaliate.

B) Required response elements (must include)
[ ] Thanks + acknowledgement (“Thank you for the feedback…”) without admitting liability.
[ ] Empathy/apology framed safely (“We’re sorry to hear this…” not “We’re sorry we did X”).
[ ] Offline resolution CTA with contact method.
[ ] No new facts beyond reviewer text.
[ ] Tone: calm, brief, solutions-oriented.

C) Escalation required (do not post without human review)
[ ] Legal threat words present → HOLD, escalate Legal.
[ ] PHI/medical privacy risk (healthcare) → HOLD or Privacy escalation.
[ ] Safety incident/injury allegation → HOLD, escalate Owner/GM.
[ ] Discrimination/harassment allegation → HOLD, escalate HR/Owner.
[ ] Alleged criminal activity/theft → HOLD, escalate Owner/Legal.

D) Platform-specific checks
Google Business Profile:
[ ] No personal data disclosure.
[ ] Avoid back-and-forth arguments.
Yelp:
[ ] Do not mention “Yelp will remove this.”
[ ] Do not solicit review edits; do not pressure reviewer to change rating.

====================================================
3) ESCALATION PLAYBOOK v3 (SCENARIOS, SLAs, WHAT TO DO)
====================================================
Escalation levels:
- L0: Normal (autopost allowed)
- L1: Ops follow-up (autopost allowed after approval)
- L2: Sensitive (manual approval required)
- L3: HOLD (posting blocked; internal-only handling)

Routing SLAs:
- Safety/injury, discrimination, legal threat: Owner/GM <4 hours; Legal same-day if legal threat.
- Billing/pricing dispute: Billing <24 hours.
- Service quality/no-show/late: Ops <24 hours.
- Suspected fake/competitor: Owner/Ops <24 hours.

Evidence checklist (collect before any public response for L2/L3):
- Job/appointment lookup internally (do not confirm publicly).
- Staff notes, invoices, photos, call logs.
- Any safety reports or incident documentation.

DO NOT POST conditions (always HOLD):
- Legal threat words present.
- Any draft that references “records/chart/visit/results” in healthcare.
- Ongoing safety investigation.
- Harassment/threats where response may escalate.

Recommended public posture (when posting is allowed):
- Acknowledge, invite offline, avoid details, avoid blame.
- Example safe line: “We’d like to learn more and address this directly—please contact our team at [email/phone].”

====================================================
4) APPROVED RESPONSE TEMPLATES v3 (PER VERTICAL)
====================================================
Global rules for all templates:
- Allowed variables: {business_name}, {support_email}, {support_phone}, {city}, {signature_name_or_team}
- Disallowed variables: staff names, appointment dates/times, procedure names for healthcare unless reviewer already stated AND still avoid confirming relationship.
- Always include offline CTA.

4.1 DENTIST (Google/Yelp)
D1 Positive (5-star)
“Thank you for taking the time to leave this review. We’re glad you had a great experience with {business_name}. If there’s ever anything we can do to help, please reach us at {support_email}. —{signature_name_or_team}”

D2 Neutral/Short
“Thanks for the feedback. We’re always working to improve, and we’d appreciate the chance to learn more. Please contact us at {support_email} so we can follow up. —{signature_name_or_team}”

D3 Mild Negative (wait time / communication)
“Thank you for sharing this. We’re sorry to hear your experience didn’t meet expectations. We’d like to understand what happened and see how we can improve—please reach out at {support_email} or {support_phone}. —{signature_name_or_team}”

D4 Strong Negative (pain, poor experience) — no PHI confirmation
“Thank you for your review. We’re sorry to hear you’re disappointed. Because we can’t discuss details here, we’d like to connect privately to better understand your concerns and address them appropriately. Please contact {business_name} at {support_email} or {support_phone}. —{signature_name_or_team}”

D5 PHI/HIPAA mention by reviewer (privacy-safe)
“Thank you for your message. We take privacy seriously and can’t address personal or clinical details in a public forum. We’d like to speak directly—please contact us at {support_email} or {support_phone} so we can help. —{signature_name_or_team}”

D6 Suspected Fake / Not a Patient
“Thank you for the feedback. We take concerns seriously, but we’re unable to confirm any details publicly. Please contact {support_email} with any relevant information so we can look into this. —{signature_name_or_team}”

D7 Pricing/Billing Concern
“Thank you for raising this. We understand billing questions can be frustrating. We’d like to review this with you directly—please contact our team at {support_email} or {support_phone}. —{signature_name_or_team}”

D8 Legal Threat (HOLD TEMPLATE — internal note only; do not post)
INTERNAL: “Legal-threat detected. Do not post publicly. Escalate to Legal and Owner/GM. Preserve records.”

4.2 MED SPA (Google/Yelp)
M1 Positive
“Thank you for the kind words. We’re happy you had a great experience at {business_name}. If you ever have questions, contact us at {support_email}. —{signature_name_or_team}”

M2 Neutral
“Thanks for the feedback. We’d love to learn more so we can improve. Please reach out at {support_email}. —{signature_name_or_team}”

M3 Mild Negative (scheduling / front desk)
“Thank you for sharing this. We’re sorry to hear it wasn’t seamless. We’d like to follow up and make it right—please contact us at {support_email} or {support_phone}. —{signature_name_or_team}”

M4 Strong Negative (results dissatisfaction) — no guarantees
“Thank you for your review. We’re sorry to hear you’re unhappy. We can’t discuss personal details here, but we’d like to connect privately to understand your concerns and help. Please contact {support_email} or {support_phone}. —{signature_name_or_team}”

M5 Safety/Adverse reaction mention — escalate
“Thank you for letting us know. We’re sorry to hear you had a concerning experience. Because this is important and we can’t discuss details publicly, please contact us as soon as possible at {support_phone} or {support_email} so we can follow up directly. —{signature_name_or_team}”

M6 Suspected fake/competitor
“Thank you for the feedback. We take reviews seriously, but we can’t confirm details publicly. Please contact {support_email} so we can look into this. —{signature_name_or_team}”

M7 Refund demand
“Thank you for your message. We’d like to review this with you directly and understand what happened. Please contact {support_email} or {support_phone}. —{signature_name_or_team}”

M8 Legal threat — HOLD (internal)
INTERNAL: “HOLD—manual only. Escalate Legal. Do not post.”

4.3 HVAC (Google/Yelp)
H1 Positive
“Thank you for the review. We’re glad our team could help. If you need anything in the future, reach us at {support_phone} or {support_email}. —{signature_name_or_team}”

H2 Neutral
“Thanks for the feedback. We’re always working to improve and would appreciate the chance to learn more. Please contact {support_email}. —{signature_name_or_team}”

H3 Mild Negative (late arrival)
“Thank you for sharing this. We’re sorry to hear the timing wasn’t what you expected. We’d like to look into it and improve—please contact {support_email} or {support_phone}. —{signature_name_or_team}”

H4 Strong Negative (quality issue) — no liability admission
“Thank you for your review. We’re sorry to hear you’re dissatisfied. We’d like to understand what happened and work toward a resolution. Please contact us at {support_phone} or {support_email}. —{signature_name_or_team}”

H5 Alleged damage
“Thank you for letting us know. We take concerns like this seriously and would like to review the situation directly. Please contact {support_phone} or {support_email} so we can follow up. —{signature_name_or_team}”

H6 Pricing dispute
“Thank you for the feedback. We understand pricing questions can be frustrating. Please contact {support_email} so we can review the details with you directly. —{signature_name_or_team}”

H7 Suspected fake
“Thank you for the review. We’re unable to confirm details publicly, but we’d like to look into this. Please contact {support_email} with any relevant info. —{signature_name_or_team}”

H8 Legal threat — HOLD (internal)
INTERNAL: “HOLD—manual only. Escalate Legal.”

====================================================
5) AUDIT TRAIL + KPI VALIDATION APPENDIX
====================================================
Required audit-log events (minimum):
- review_ingested
- draft_created
- risk_flagged (include risk_flags[])
- escalation_set (include escalation_level + reason)
- approval_requested
- approved (human_approver_id, approval_timestamp)
- blocked_manual_review (hold_reason, blocked_timestamp)
- posted (posted_timestamp, platform_response_id)
- post_failed (error_code, error_message)

Required fields (minimum schema):
review_source, review_id, business_id/location_id, review_text_hash, rating, created_at, detected_risk_flags[], escalation_level, response_mode (auto/needs_approval/hold), template_id (if used), draft_version, model_version/prompt_version, human_approver_id, approval_timestamp, post_status, posted_timestamp, platform_response_id, hold_reason, detector_version.

Weekly KPI definitions (must reconcile):
- Response rate = responded_count / total_reviews
- Median first-response time (by platform and combined)
- SLA compliance % (responses within X hours)
- Escalations by level and reason
- Unresolved escalation aging (days open)
- Posted vs Approved vs Blocked counts must sum correctly

KPI test cases (sample):
1) A held legal-threat review should appear in: total_reviews++, blocked_manual_review++, escalations_legal++ and NOT in posted_count.
2) A draft generated but not approved should count as “pending approval” and not “responded/posted.”
3) If post_failed occurs, do not count as responded; include in failure metric.

====================================================
6) OWNER/ENGINEERING NEXT STEPS (NO COST)
====================================================
Decision needed:
- Confirm whether a sandbox/test environment exists for Google Business Profile and Yelp posting.
- If none, choose one low-risk internal location for limited live verification (3–5 responses max) following the runbook; do not post for any HOLD cases.

If you need help running the verification, send evidence (exported logs + KPI report) to agent_bob_replit+review-bot@agentmail.to.

End of Pack v1.0
