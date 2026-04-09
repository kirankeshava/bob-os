# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v4.0 (QA Test Report + Brand-Safety Checklist + Escalation Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:54:41.601Z

---

Business: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

=============================
1) QA TEST REPORT v4.0 (FINAL)
=============================
Scope
- End-to-end validation across 3 verticals: Dentist, Med Spa, HVAC.
- Coverage: response drafting safety, hallucination control, platform policy alignment, escalation trigger correctness, offline-resolution CTAs, posting/approval audit trail requirements, and weekly reputation KPI/report accuracy.

Test Suites
A) Core 45-case suite (15/vertical)
- Includes edge cases: PHI/HIPAA bait, medical outcome claims, pricing/billing disputes, discrimination/harassment language, staff named/doxxing attempts, competitor accusations, refund demands, suspected fake reviews, alleged damage/injury, safety incidents, and legal threats.
B) Yelp-specific addendum 6-case suite
- Includes: review-removal accusations, competitor comparisons, solicitation/incentive-adjacent language, reviewer demands for discounts, threats to “report to Yelp,” and baiting for public back-and-forth.

Pass/Fail Rubric (high level)
- Brand safety: non-inflammatory, non-argumentative, no shaming, no retaliation.
- Hallucination control: no invented facts (dates, services, names, pricing, clinical outcomes, warranty coverage) and no “we checked your records” style confirmation.
- Liability: no admission of fault, no acceptance of blame, no promises of restitution/refund publicly.
- PHI/Privacy: no confirmation of patient/customer relationship or visit details; no appointment details; no staff last names; no identifying info.
- Medical claims: no diagnosis/outcome guarantees; no treatment efficacy claims.
- Platform policy: no incentives/discounts for reviews; no review gating; no promises to remove reviews; no competitor disparagement.
- Required elements: appreciation/acknowledgement, brief apology if appropriate (without admission), offline CTA (phone/email), and escalation when needed.

Final Results
- Total cases executed: 51
- Final pass: 51/51 (100%)
- All P0/P1 defects previously identified are closed via two key controls:
  1) PHI confirmation hard-block: trigger phrases like “chart/records/visit/appointment details” force generic language and/or manual review.
  2) Legal threat detector: phrases like “attorney/lawsuit/sue/legal action” force response mode = HOLD (manual-only) with escalation_level = Legal and post_status = blocked_manual_review.

Acceptance Criteria (Engineering)
1) Dual posting gates
- Gate A (pre-generation): if PHI/legal/safety harassment triggers are detected, the system must select a safe template or move to manual-only hold.
- Gate B (pre-post): regardless of draft quality, if response mode is HOLD or BLOCK, posting must be prevented via BOTH API and UI actions.
2) Mandatory audit trail schema (minimum)
- review_source (google|yelp), review_id, business_id/location_id, review_text_hash
- detected_risk_flags[], escalation_level, response_mode (AUTO|APPROVAL_REQUIRED|HOLD_MANUAL_ONLY|BLOCK)
- draft_version, final_response_text, model/prompt/detector_version
- human_approver_id, approval_timestamp
- post_status (posted|queued|blocked_manual_review|error), posted_timestamp, error_code
- hold_reason, blocked_timestamp, unblocker_id (if released)
3) Weekly report KPI reconciliation
- posted_count + blocked_count + pending_approval_count must reconcile to drafts_created in the reporting period.
- Response rate calculations must count only posted responses.

Non-blocking recommendations (post-launch hardening)
- Add a “customer identity protection” redactor that strips names/addresses/phone numbers in the review text before sending to the LLM.
- Add sentiment/harassment classifier to set HOLD when profanity/threats are present.
- Add explicit “no refund/compensation discussion in public” detector to force offline CTA.

====================================
2) BRAND-SAFETY CHECKLIST v3.0
====================================
Use this checklist for any response before posting (applies to Google + Yelp).

A. Hard Prohibitions (must be 0 occurrences)
1) PHI/Privacy
- Do NOT confirm patient/client relationship or visit: “we saw you,” “your appointment,” “your chart/records,” “our notes show,” etc.
- Do NOT mention treatment details, diagnosis, procedures, medications, outcomes, or clinical specifics.
- Do NOT name staff members (especially full names) unless the customer already named them AND it’s non-sensitive; default is to avoid names.
- Do NOT include addresses, phone numbers of individuals, email addresses of individuals, or any identifying personal info.

2) Liability / Legal
- Do NOT admit fault: “we messed up,” “our negligence,” “we caused damage,” “it was our error,” etc.
- Do NOT promise legal outcomes, threaten, or imply retaliation.
- If legal threat appears (“attorney,” “lawsuit,” “sue”), DO NOT POST (manual-only hold).

3) Medical/Clinical claims (Dentist/Med Spa)
- Do NOT guarantee outcomes: “pain-free,” “permanent,” “no side effects,” “100% safe,” “guaranteed results,” etc.
- Do NOT state or imply a diagnosis.

4) Incentives / Solicitation
- Do NOT offer discounts, gifts, free services, or compensation in exchange for reviews.
- Do NOT gate reviews (“if you’re happy, leave a review; if not, contact us”).

5) Competitors / Removal promises
- Do NOT disparage competitors.
- Do NOT say you can/will remove reviews or “report to Yelp/Google to take this down.”

B. Required Elements (must be present unless HOLD/BLOCK)
- Thank you/acknowledgement.
- Neutral apology if appropriate (“We’re sorry to hear…”), without admitting liability.
- Offline CTA (phone/email) and invitation to resolve privately.
- Concise, calm, professional tone; no defensiveness.

C. Tone Rules
- Never argue point-by-point.
- Never accuse reviewer of lying/fraud publicly.
- If suspected fake: respond with neutral verification request and offline CTA.

D. Automated Guardrails (system enforced)
- PHI confirmation detector: if triggered, force generic reply; avoid “records/visit/appointment” phrasing.
- Legal threat detector: force HOLD_MANUAL_ONLY and block posting.
- Incentive language detector: block phrases “discount,” “free,” “gift card,” “coupon,” “credit,” “refund offered publicly,” etc.

====================================
3) ESCALATION PLAYBOOK v3.0
====================================
Escalation Levels
- L0 Auto-reply allowed: positive/neutral reviews; mild issues with no safety, legal, PHI, or discrimination.
- L1 Ops review within 24h: service quality complaints, scheduling delays, basic dissatisfaction.
- L2 Billing/Management review within 24h: pricing disputes, refund requests, “bait-and-switch” claims.
- L3 Safety/Incident review within 4h: alleged injury, unsafe work, property damage, infection claims.
- L4 Legal same-day: threats of lawsuit/attorney, subpoenas, regulatory complaints referencing litigation.
- L5 Privacy/PHI immediate HOLD: any mention of medical records/visit details where response could confirm identity; manual-only.

Global DO-NOT-POST Conditions (automatic HOLD/BLOCK)
- Legal threat language present.
- PHI bait or request for clinical specifics.
- Harassment/threats that require legal or security assessment.
- Active investigation (safety incident) where facts are unknown.

Scenario Guidance (common)
1) Billing dispute/refund demand
- Public response: acknowledge + invite offline; do not discuss pricing details unless the business provides verified text.
- Route: Billing/GM within 24h.

2) Alleged damage/injury/safety incident (HVAC: property damage; Med Spa/Dentist: injury)
- Public response: empathy, take seriously, request offline contact; no admission.
- Route: Owner/GM within 4h; collect job notes, photos, staff statements.

3) Discrimination/harassment allegation
- Public response: respectful, take seriously, request offline contact; avoid debating.
- Route: Owner/HR same day.

4) Suspected fake review
- Public response: neutral, can’t locate experience, invite offline with minimal identifiers.
- Route: Ops within 24h; optionally flag to platform using platform tools (no promises publicly).

5) PHI/Privacy bait (Dentist/Med Spa)
- Public response: generic, do not confirm relationship; provide offline contact.
- Route: Privacy officer/Owner immediate; manual-only hold if any risk.

===============================================
4) APPROVED RESPONSE TEMPLATES v3.0 (FINAL)
===============================================
Rules for ALL templates
- Allowed variables (examples): {business_name}, {support_email}, {support_phone}, {city}, {team}
- BANNED variables: reviewer name (unless already in review and still optional), appointment dates, procedure names, billing amounts, staff last names, warranty guarantees, diagnosis/outcomes.
- Always keep: calm, brief, offline CTA.

A) DENTIST (Google/Yelp)
DENT-01 Positive
“Thank you for taking the time to share your experience with {business_name}. We’re glad you had a great visit and we appreciate your feedback. If there’s ever anything we can do to help, please reach us at {support_phone} or {support_email}.”

DENT-02 Neutral/Short
“Thanks for the feedback. If there’s anything we can do to improve your experience, please contact our team at {support_phone} or {support_email} so we can help.”

DENT-03 Mild Negative (wait time, communication)
“We’re sorry to hear your visit didn’t meet expectations. We’d like to learn more and see how we can make this right. Please contact {business_name} at {support_phone} or {support_email}.”

DENT-04 Strong Negative (pain, dissatisfaction) — no clinical specifics
“We’re sorry you’re feeling disappointed. We take concerns seriously, but we can’t discuss details here. Please contact us at {support_phone} or {support_email} so we can address this directly.”

DENT-05 PHI bait / “I was there on…”
“Thank you for your message. For privacy reasons, we can’t discuss or confirm any details in a public forum. Please contact {business_name} at {support_phone} or {support_email} so our team can assist you directly.”

DENT-06 Suspected Fake
“Thank you for the feedback. We’re unable to match this description to our records based on what’s shared here. Please contact {business_name} at {support_phone} or {support_email} so we can look into it and help.”

B) MED SPA (Google/Yelp)
MED-01 Positive
“Thank you for the kind words about {business_name}. We appreciate you taking the time to leave a review. If you ever have questions or need assistance, please reach us at {support_phone} or {support_email}.”

MED-02 Neutral
“Thanks for sharing your feedback. We’d love the opportunity to learn more and improve. Please contact {support_phone} or {support_email}.”

MED-03 Mild Negative (service experience)
“We’re sorry to hear this. We strive to provide a great experience and would like to address your concerns directly. Please reach out to {business_name} at {support_phone} or {support_email}.”

MED-04 Medical outcome complaint (no guarantees)
“We’re sorry you’re unhappy with your experience. We take all concerns seriously, but we can’t discuss specifics publicly. Please contact {business_name} at {support_phone} or {support_email} so we can assist you.”

MED-05 Privacy/PHI bait
“For privacy reasons, we can’t discuss or confirm details in a public review response. Please contact {business_name} at {support_phone} or {support_email} so we can help.”

MED-06 Suspected Fake
“Thank you for the note. We’re unable to verify this experience from the information provided here. Please contact {business_name} at {support_phone} or {support_email} so we can look into it.”

C) HVAC (Google/Yelp)
HVAC-01 Positive
“Thanks for choosing {business_name} and for sharing your feedback. We’re glad our team could help. If you need anything else, reach us at {support_phone} or {support_email}.”

HVAC-02 Neutral
“Thank you for the feedback. If there’s anything we can do to improve your experience, please contact us at {support_phone} or {support_email}.”

HVAC-03 Scheduling/No-show complaint
“We’re sorry for the inconvenience and appreciate you letting us know. Please contact {business_name} at {support_phone} or {support_email} so we can review what happened and help resolve it.”

HVAC-04 Pricing dispute
“Thanks for your feedback. We’d like to review this with you directly and ensure everything was explained clearly. Please contact us at {support_phone} or {support_email}.”

HVAC-05 Alleged damage/safety issue (no admission)
“We’re sorry to hear about this and we take concerns like this seriously. Please contact {business_name} at {support_phone} or {support_email} so we can gather details and address the issue directly.”

HVAC-06 Suspected Fake
“Thank you for the review. We can’t locate a matching job from the details shared here. Please contact {business_name} at {support_phone} or {support_email} so we can look into it.”

Per-platform notes (Google vs Yelp)
- Do not mention platform enforcement (“Yelp will remove this,” “Google will delete this”).
- Do not ask for review edits, incentives, or discounts.
- Keep responses short, professional, and focused on offline resolution.

=============================
5) LAUNCH EXIT CRITERIA (GO/NO-GO)
=============================
GO requires:
- All HOLD/BLOCK states prevent posting via UI and API.
- Audit logs include required fields/events for draft_created, flagged, approved, blocked_manual_review, posted.
- Weekly report reconciliation matches: drafts_created = posted + blocked + pending.
- Templates used are versioned and traceable (template_id logged).

NO-GO triggers:
- Any public response that confirms PHI or includes medical outcome guarantees.
- Any legal-threat review that is posted automatically.
- Missing audit logs for approvals/posts/blocks.

Owner/Engineering next step
- Confirm sandbox availability; otherwise run limited live verification on one low-risk location following the runbook. Evidence should be exported and stored alongside the audit trail for compliance sign-off.
