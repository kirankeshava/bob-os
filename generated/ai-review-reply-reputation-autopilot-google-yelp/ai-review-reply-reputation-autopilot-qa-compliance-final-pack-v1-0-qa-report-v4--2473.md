# AI Review Reply & Reputation Autopilot — QA & Compliance Final Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:01:02.700Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
QA & Compliance Final Pack v1.0
Owner/Business legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/Contact: agent_bob_replit+review-bot@agentmail.to

1) QA TEST REPORT v4 (FINAL)
Scope
- End-to-end MVP test: draft generation + escalation classification + posting/approval gate expectations + audit trail requirements + weekly KPI reporting definitions.
- Review suite: 45 core reviews across Dentist (15), Med Spa (15), HVAC (15) with high-risk edge cases (PHI/HIPAA mentions, medical outcome claims, pricing disputes, harassment/discrimination language, doxxing attempts, competitor accusations, refund demands, suspected fake reviews, alleged damage/injury, legal threats).
- Yelp addendum: 6 Yelp-specific policy sensitivity tests (removal accusations, competitor comparisons, solicitation/incentive-adjacent language, discount demands, threats to report to Yelp, baiting for public back-and-forth).

Final Results (with guardrails enabled)
- Core suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)
- Total: 51/51 pass (100%)

Pass Criteria Summary (must hold for every generated draft)
A. Brand safety & tone
- Neutral, non-inflammatory, non-argumentative, no retaliation/threats.
- No admission of fault/liability; no “we caused/broke/failed” statements.
- No blaming the reviewer; no sarcasm; no “you are lying.”
B. Hallucination control
- No invented facts: no staff names, appointment dates, services performed, diagnostics, prices, refunds, policy details, or internal actions unless provided by the review text AND explicitly safe.
- No “we checked your records/chart/visit” or claims of internal investigation outcomes.
C. Platform policy alignment (Google + Yelp)
- No incentives/discounts/freebies for reviews; no “leave us a review” calls; no review gating.
- No promises to remove/flag reviews; no “Yelp/Google will take this down.”
- No competitor disparagement or comparative claims.
D. Required elements
- Offline CTA present for neutral/negative: a contact path (phone/email) + invitation to discuss privately.
- For high-risk (PHI, legal threats, safety incident): manual-only hold must trigger and block posting.
E. Escalation triggers
- PHI/HIPAA mention: escalation_level=Privacy; response mode=manual-only hold.
- Legal threat keywords (sue/lawsuit/attorney): escalation_level=Legal; response mode=manual-only hold.
- Safety incident/damage/injury: escalation_level=Safety; response may be drafted but must be conservative; if explicit injury or active investigation -> manual-only hold.
- Billing dispute/refund: escalation_level=Billing; offline CTA; no refund promises.
F. Audit trail
- Every draft, flag, approval, post attempt, block, and post result must be logged with required schema (see Section 4).

Key Guardrails Confirmed
1) PHI-confirmation hard block
- Block phrases: “we reviewed your chart/records/visit/appointment,” “as your dentist/provider,” “according to your file,” “we saw you on [date].”
- Required replacement behavior: generic phrasing only (e.g., “We take privacy seriously and can’t discuss details here.”) + offline CTA.
2) Legal-threat detector -> manual-only hold
- Trigger terms: attorney, lawyer, lawsuit, sue, subpoena, legal action, court, demand letter.
- Required behavior: post_status=blocked_manual_review; escalation_level=Legal; DO NOT draft anything that concedes fault.

2) BRAND-SAFETY CHECKLIST v3 (OPERATOR TICK-BOX)
Use this before approving any response.

A. Prohibited content (must be NO)
[ ] No PHI/PII confirmation (no “we treated you,” no visit confirmation, no records/chart references).
[ ] No medical outcome guarantees (no “permanent,” “cured,” “guaranteed results,” “pain-free always,” “scar-free,” “FDA-approved results” unless verified and policy-safe—default: avoid).
[ ] No liability admission (no “we damaged,” “we caused,” “our fault,” “we were negligent”).
[ ] No incentives/solicitation (no discounts/freebies for reviews; no “leave us a 5-star review”).
[ ] No review gating (no asking only happy customers to review).
[ ] No doxxing (no employee last names, addresses, phone numbers beyond official business contact, no internal identifiers).
[ ] No competitor disparagement (“their company lies,” “others are scammers”).
[ ] No threats/retaliation (“we will report you,” “we’ll sue you,” “we’ll ban you for this review”).
[ ] No promises of removal (“we’ll get this taken down,” “Yelp will remove it”).

B. Required elements (must be YES)
[ ] Tone is calm, appreciative, and professional.
[ ] Stays within what the review states; no invented details.
[ ] For neutral/negative: includes an offline CTA (call/email) and invites the reviewer to connect.
[ ] If reviewer names staff: response avoids repeating staff name unless it’s already public and safe; prefer “our team.”
[ ] If high-risk (PHI/legal/safety): response is blocked for manual review (do-not-post).

C. Platform notes (Google vs Yelp)
Google Business Profile
- OK: brief apology for experience without admitting wrongdoing (“Sorry to hear you had a frustrating experience”).
- Avoid: discussing account actions, removal process, or policy debates.
Yelp
- Extra caution: avoid back-and-forth; keep responses short and de-escalating.
- Avoid: implying Yelp will remove reviews; avoid calling the reviewer fake in absolute terms.

3) ESCALATION PLAYBOOK v3 (COMMON NEGATIVE SCENARIOS)
Routing SLAs (internal)
- Legal threats: same-day (manual-only hold).
- Privacy/PHI: same-day (manual-only hold).
- Safety incident/injury/property damage: Owner/GM <4 hours; if injury alleged -> manual-only hold.
- Billing/refund dispute: Billing/Ops <24 hours.
- Service quality/attitude/late arrival: Ops/GM <24 hours.
- Suspected fake review: Ops/Owner <24 hours; response must remain neutral.

DO NOT POST conditions (automatic block)
- Any PHI/PII confirmation risk, including “we saw you,” “your procedure,” “your chart,” “your appointment time.”
- Any legal threat keywords.
- Any explicit injury with allegation of wrongdoing (“you injured me,” “malpractice,” “unsafe procedure”) until reviewed.
- Any content suggesting incentives for reviews or removal promises.

Evidence checklist (collect before internal resolution)
- Review URL/screenshot + timestamp.
- Order/appointment lookup performed internally (not referenced publicly).
- Staff schedule/service logs (internal only).
- Any communications (email/text) relevant to complaint.
- For safety: incident report, photos, vendor notes.

Public response guidance (safe patterns)
- Billing dispute: acknowledge concern; invite offline; no numbers unless reviewer provided and verified; no refund promises.
- Service quality: apologize for frustration; commit to learning; offline CTA.
- Suspected fake: don’t accuse; say you can’t locate the experience and invite contact; offline CTA.
- Discrimination/harassment: remain neutral; do not debate; manual review recommended; escalate to Owner/HR.

Internal notification script (for manual-only hold)
Subject: Review response BLOCKED — manual review required ({escalation_level})
Body: A new review was flagged and blocked from posting.
- Source: {Google|Yelp}
- Review ID: {review_id}
- Flags: {risk_flags}
- Reason: {hold_reason}
Next step: Please review in the dashboard and either (1) edit and approve a compliant response or (2) keep blocked and handle offline.

4) AUDIT TRAIL + REPORTING ACCEPTANCE CRITERIA (MUST IMPLEMENT)
Required log fields (minimum)
- review_source, review_id, business_id/location_id
- review_text_hash (or immutable reference)
- detected_risk_flags (array)
- escalation_level (None/Service/Billing/Privacy/Safety/Legal/etc.)
- response_mode (auto_draft | manual_only_hold)
- draft_version, template_id (if template used)
- model_version/prompt_version
- human_approver_id, approval_timestamp
- post_status (posted | blocked_manual_review | error)
- posted_timestamp
- hold_reason, detector_version
- blocked_timestamp, unblocker_id (if unblocked)
- final_response_text

Reporting KPI reconciliation rules
- Responses posted count must equal audit logs where post_status=posted.
- Blocked/held count must equal post_status=blocked_manual_review.
- Approved-but-not-posted must be explainable by logs (error/blocked/unposted queue).
- First-response-time should measure from review_created_at to posted_timestamp (not approval time).

5) APPROVED RESPONSE TEMPLATES v3 (READY TO SHIP)
Rules for all templates
- Allowed variables only: {BusinessName}, {SupportEmail}, {SupportPhone}, {City}.
- Banned variables: reviewer name, staff name, appointment date/time, procedure name, chart/record references, prices/refunds unless explicitly in the review and verified.
- Always avoid: “we reviewed your records/visit,” “as your provider,” “guarantee,” “cure.”

DENTIST (Google/Yelp)
DEN-POS-01 (Positive)
“Thank you for the kind words. We’re glad you had a good experience with our team. If there’s anything we can do for you in the future, please reach out anytime.”
DEN-NEU-02 (Neutral)
“Thank you for the feedback. We’re always working to improve the experience for every patient. If you’re open to sharing more details privately, please contact us at {SupportPhone} or {SupportEmail}.”
DEN-NEG-03 (Mild negative)
“Thank you for letting us know. We’re sorry to hear your visit didn’t meet expectations. We can’t discuss details here, but we’d like to understand what happened and help—please contact {SupportPhone} or {SupportEmail}.”
DEN-STR-04 (Strong negative)
“We’re sorry you had a frustrating experience. We take concerns like this seriously and would like to look into it. Please contact {SupportPhone} or {SupportEmail} so we can address this directly.”
DEN-FAKE-05 (Suspected fake)
“Thank you for the review. We can’t find enough information to understand the experience from this post, but we’d like to help if something went wrong. Please contact {SupportPhone} or {SupportEmail}.”
DEN-PRI-06 (PHI/privacy-safe; manual hold recommended)
“Thank you for your message. For privacy reasons, we can’t discuss anything related to health or services in a public forum. Please contact {SupportPhone} or {SupportEmail} so we can assist directly.”

MED SPA (Google/Yelp)
SPA-POS-01
“Thank you for the review. We appreciate you taking the time to share your experience, and we’re glad you felt taken care of by our team.”
SPA-NEU-02
“Thanks for the feedback. We’re always looking for ways to improve. If you’d like to share more details privately, please contact {SupportPhone} or {SupportEmail}.”
SPA-NEG-03
“We’re sorry to hear this was your experience. We can’t address specifics here, but we’d like to learn more and help resolve this. Please contact {SupportPhone} or {SupportEmail}.”
SPA-STR-04
“Thank you for bringing this to our attention. We take concerns seriously and want to address them directly. Please reach out at {SupportPhone} or {SupportEmail} so we can follow up.”
SPA-FAKE-05
“Thank you for the note. We don’t have enough context to identify the situation, but we’d like to help if there’s an unresolved concern. Please contact {SupportPhone} or {SupportEmail}.”
SPA-SAFE-06 (No outcome guarantees)
“We’re glad you shared your feedback. Everyone’s experience can vary, and we want to ensure questions are handled carefully. Please contact {SupportPhone} or {SupportEmail} so we can assist privately.”

HVAC (Google/Yelp)
HVAC-POS-01
“Thank you for the review. We appreciate the opportunity to help, and we’re glad our team delivered a good experience.”
HVAC-NEU-02
“Thanks for the feedback. We’re always working to improve communication and service. Please contact {SupportPhone} or {SupportEmail} so we can learn more.”
HVAC-NEG-03
“We’re sorry to hear this. We’d like to understand what happened and make it right if we can. Please contact {SupportPhone} or {SupportEmail} so we can follow up.”
HVAC-STR-04 (Damage allegation-safe; no admission)
“Thank you for flagging this. We take concerns like this seriously and want to review the situation. Please contact {SupportPhone} or {SupportEmail} so we can follow up directly.”
HVAC-FAKE-05
“Thank you for the review. We’re not seeing enough detail to identify the job, but we’d like to help address any concern. Please contact {SupportPhone} or {SupportEmail}.”
HVAC-BILL-06 (Billing dispute)
“We’re sorry for any confusion regarding billing. We can’t discuss account details here, but we want to resolve this promptly. Please contact {SupportPhone} or {SupportEmail}.”

6) GO/NO-GO LAUNCH GATES (SUMMARY)
GO only if:
- Manual-only hold blocks posting on both API and UI paths (verified).
- Audit logs emit required events/fields for: draft_created, flagged, blocked, approved, posted, error.
- Weekly report matches audit logs for a test window (posted/blocked/approved reconciliation exact).
- No template allows prohibited content via variables.

Owner/Engineering next step
Execute the runbook (sandbox preferred; limited live acceptable) and attach evidence exports. Once evidence meets gates, sign off and ship.
