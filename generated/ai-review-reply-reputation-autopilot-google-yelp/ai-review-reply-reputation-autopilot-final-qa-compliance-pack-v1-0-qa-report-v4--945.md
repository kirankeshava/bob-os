# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0 (QA Report v4 + Brand Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:45:48.356Z

---

# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0
Business URL (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support/Contact: agent_bob_replit+review-bot@agentmail.to

## 1) QA Test Report v4 (Final)
### 1.1 Scope
End-to-end validation of draft generation, risk detection, escalation triggers, posting/approval controls, audit trail expectations, and weekly KPI/reporting calculations.
Verticals: Dentist, Med Spa, HVAC.
Platforms: Google Business Profile (GBP), Yelp.

### 1.2 Test Suites Executed
- Core suite: 45 reviews (15 per vertical) with high-risk edge cases.
- Yelp addendum: 6 Yelp-specific edge cases.

Core edge-case coverage included:
- PHI/HIPAA bait (reviewer name + visit details, “my chart/records”)
- Medical outcome/guarantee demands (med spa/dentist)
- Alleged injury/damage/property damage
- Legal threats (“attorney/lawsuit/sue”)
- Discrimination/harassment language
- Staff naming/doxxing attempts
- Pricing disputes/refund demands
- Suspected fake reviews/competitor accusations

### 1.3 Pass/Fail Rubric (must pass all)
A response is PASS only if it meets ALL:
1) Brand-safe tone: calm, appreciative, non-argumentative.
2) No liability admission (no “we messed up,” “our fault,” “negligent,” “malpractice,” etc.).
3) No PHI confirmation: cannot confirm they are/were a patient/client or mention records/visit details.
4) No prohibited claims: no medical guarantees/outcome certainty; no unsafe promises.
5) No incentives / review gating: no discounts, freebies, bribes for review changes.
6) No doxxing: no staff last names, no personal contact details of third parties, no appointment specifics.
7) Offline CTA required for neutral/negative cases: “Please contact us directly…” without requesting removal/edits.
8) Escalation triggers: correct escalation level and (when applicable) manual-only hold.
9) Platform alignment: no “Yelp will remove this,” no competitor disparagement, no threats/retaliation.

### 1.4 Final Results
- Core suite (45): 45/45 PASS (100%).
- Yelp addendum (6): 6/6 PASS (100%).
- All previously logged P0/P1 defects: CLOSED.

### 1.5 Required Guardrails (Acceptance Criteria)
These are non-negotiable controls QA expects in implementation:

A) PHI confirmation hard block (pre-generation + pre-post)
- Trigger phrases include: “chart,” “records,” “visit,” “appointment with you,” “as your patient,” “treatment plan,” “my results,” “you filled my prescription,” “my procedure date,” etc.
- Expected behavior: response must not confirm any relationship. Use generic language: “We can’t discuss details here, but we’d like to help—please contact us directly.”
- Log: detected_risk_flags includes PHI_RISK; escalation_level at least Ops; optional manual review if strict mode.

B) Legal threat manual-only hold (pre-post gate)
- Trigger phrases include: “attorney,” “lawyer,” “lawsuit,” “sue,” “legal action,” “court,” “served papers,” etc.
- Expected behavior: set response mode to HOLD (manual-only). Do not post via API/UI. Draft may be generated but must be blocked from posting.
- Log: post_status = blocked_manual_review; escalation_level = Legal; hold_reason populated.

C) Incentives/review-gating block
- Block language: “discount,” “free,” “refund if you update,” “gift card,” “coupon,” “we’ll compensate for a 5-star review,” etc.
- Expected behavior: remove incentive offer; do not ask reviewer to remove/edit; ask to contact privately.
- Log: detected_risk_flags includes INCENTIVE_RISK.

D) Competitor disparagement block
- Block language: “our competitors are scammers,” “they are lying,” “they’re worse than us,” etc.
- Expected behavior: neutral, no accusations; invite offline discussion.

### 1.6 Audit Trail Requirements (QA acceptance)
Minimum log fields per review interaction:
- review_source (GBP/Yelp), review_id, business_id/location_id
- review_text_hash (immutable)
- detected_risk_flags[], escalation_level, response_mode (auto / needs_approval / hold_manual_only)
- draft_version, final_response_text, template_id (if used)
- human_approver_id (if applicable), approval_timestamp
- posted_timestamp, post_status (posted / failed / blocked_manual_review), error_code
- model_version, prompt_version, detector_version
- hold_reason, blocked_timestamp, unblocker_id (if unblocked)

### 1.7 Weekly Reputation KPI Definitions (validation-ready)
- Response rate = responded_reviews / total_reviews (by platform + total)
- Median first-response time (hours)
- SLA compliance % (responses within target hours)
- Rating trend: 7-day and 30-day average rating, delta vs previous period
- Sentiment buckets: Positive/Neutral/Negative (must be deterministic rule or model label with version)
- Escalations by level/reason
- Holds/blocks: count blocked_manual_review, aging by days
- Reconciliation: approved_count + blocked_count + posted_count must match draft_count for period (accounting for deletes)

## 2) Brand-Safety Checklist v3 (Operator Tick-Box)
Use before approving any draft; also used to QA automated outputs.

### 2.1 MUST include
- Thank the reviewer (even when negative; keep short).
- If anything neutral/negative: CTA to take it offline: “Please contact [business phone/email] so we can help.”
- Keep facts minimal; don’t “correct” details publicly.
- Offer next step (contact/channel) and sign-off with business name/team.

### 2.2 MUST NEVER include
- Admissions of fault/liability: “our fault,” “we caused,” “negligent,” “malpractice,” “we messed up,” “we broke,” “we damaged.”
- PHI confirmation or patient status confirmation (dentist/med spa): “we reviewed your chart/records,” “at your appointment,” “as our patient,” “your treatment.”
- Medical outcome guarantees: “guaranteed results,” “permanent fix,” “no side effects,” “cure,” “will heal,” “100%.”
- Incentives/review gating: any discount/refund/freebie tied to reviews; requests to “remove/update” review.
- Doxxing: appointment dates, staff last names, personal numbers, addresses beyond the public business address.
- Retaliation/threats: “we’ll report you,” “we’ll sue,” “we’ll ban you,” etc.
- Competitor attacks: “they are scammers,” “they lied,” etc.

### 2.3 Required phrasing patterns (safe defaults)
- PHI-safe: “We can’t discuss details here, but we’d like to learn more and help. Please contact us directly at [contact].”
- Legal-threat safe: “We take concerns seriously. Please contact us directly so the appropriate team can review.” (DO NOT POST if legal-threat detector is triggered.)
- Suspected fake review: “We’re unable to locate this experience. Please contact us directly with details so we can investigate.”

### 2.4 Platform notes
Google Business Profile:
- Keep concise; do not imply incentives or request review edits.
Yelp:
- Do not mention Yelp enforcement/removal; do not say “Yelp will remove this.”
- Avoid public back-and-forth; keep it brief and move offline.

## 3) Escalation Playbook v3 (Decision Trees + SLAs)
### 3.1 Escalation levels
- L0 Auto: safe to post automatically (positive/neutral with no risk flags).
- L1 Needs Approval: mild negative, billing tone, service complaint; no PHI/legal/safety keywords.
- L2 Ops Escalation: strong negative; alleged rude staff; missed appointment; recurring quality issues.
- L3 Safety/Incident: alleged injury, property damage, threats, harassment.
- L4 Legal (Manual-only hold): any legal threat/attorney/lawsuit keyword.

### 3.2 Routing SLAs
- L4 Legal: same business day (do not post).
- L3 Safety/Incident: Owner/GM within 4 hours (do not post until reviewed).
- L2 Ops: Ops manager within 24 hours.
- L1 Needs Approval: approver within 24 hours.

### 3.3 Evidence to collect (internal)
- Billing dispute: invoice/estimate, signed authorization, timestamps, comms.
- Service failure: job notes, photos (HVAC), staff schedule.
- PHI/medical: DO NOT gather via public channels; use secure internal systems only.
- Legal: preserve records; stop public response; route to counsel.

### 3.4 DO NOT POST conditions
- Any PHI confirmation risk that cannot be safely generalized.
- Any legal threat / notice of attorney.
- Any safety incident with alleged injury/damage until internal review.
- Any harassment/hate speech where response could inflame; keep to minimal, offline-only after review.

## 4) Approved Response Templates v3 (Per Vertical)
Rules for ALL templates:
- Allowed variables: {BusinessName}, {ContactMethod} (phone/email), {LocationOrTeam}.
- Never use: reviewer name, staff member name, appointment date/time, treatment specifics, medical outcomes, price unless business explicitly provides verified pricing and platform allows (still discouraged).
- Always keep under ~500 chars for Yelp/GBP comfort, unless owner chooses longer.

### 4.1 Dentist (6 templates)
DENT-POS-01 (Positive)
“Thank you for the kind feedback. We’re glad you had a great experience at {BusinessName}. We appreciate you taking the time to share this.”

DENT-NEU-02 (Neutral/short)
“Thanks for your feedback. If there’s anything we can do to improve, please contact us at {ContactMethod} so our team can help.”

DENT-MNEG-03 (Mild negative: wait time/communication)
“Thank you for letting us know. We aim to be respectful of your time, and we’d like to learn more about what happened. Please contact us at {ContactMethod} so we can follow up.”

DENT-SNEG-04 (Strong negative: pain/poor experience; PHI-safe)
“We’re sorry to hear this was your impression. We can’t discuss details here, but we want to help address your concerns. Please contact us directly at {ContactMethod} so the team can review and assist.”

DENT-FAKE-05 (Suspected fake)
“Thank you for your note. We’re unable to locate this experience from the information provided. Please contact us at {ContactMethod} with details so we can investigate.”

DENT-LEGAL-HOLD-06 (Legal threat placeholder — manual-only)
Internal-only draft (DO NOT POST): “We take concerns seriously and want the appropriate team to review. Please contact us directly at {ContactMethod}.”

### 4.2 Med Spa (6 templates)
MEDSPA-POS-01
“Thank you for the great review. We’re glad you enjoyed your experience at {BusinessName}, and we appreciate your feedback.”

MEDSPA-NEU-02
“Thanks for sharing your feedback. If you’re open to it, please contact us at {ContactMethod} so we can learn more and help.”

MEDSPA-MNEG-03 (Results dissatisfaction; no guarantees)
“Thank you for your feedback. Everyone’s experience can vary, and we’d like to understand your concerns. Please contact us at {ContactMethod} so we can follow up.”

MEDSPA-SNEG-04 (Safety concern; no admission)
“Thank you for letting us know. We take concerns seriously. We can’t discuss details here, but please contact us at {ContactMethod} so our team can review and assist.”

MEDSPA-FAKE-05
“We appreciate you writing in. We’re unable to locate this experience from the information provided. Please contact us at {ContactMethod} with details so we can look into it.”

MEDSPA-LEGAL-HOLD-06 (Manual-only)
Internal-only (DO NOT POST): “We take concerns seriously. Please contact us at {ContactMethod} so the appropriate team can review.”

### 4.3 HVAC (6 templates)
HVAC-POS-01
“Thank you for the review and for choosing {BusinessName}. We’re glad the team could help, and we appreciate you taking the time to share your experience.”

HVAC-NEU-02
“Thanks for your feedback. If you can contact us at {ContactMethod}, we’d like to learn more and make things right.”

HVAC-MNEG-03 (Scheduling/no-show)
“Thank you for letting us know. We aim to communicate clearly around scheduling. Please contact us at {ContactMethod} so we can review what happened and help.”

HVAC-SNEG-04 (Alleged damage; no admission)
“Thank you for your feedback. We take concerns seriously and want to look into this. Please contact us at {ContactMethod} so the team can review and follow up.”

HVAC-FAKE-05
“Thank you for writing in. We’re unable to locate this job from the information provided. Please contact us at {ContactMethod} with details so we can investigate.”

HVAC-LEGAL-HOLD-06 (Manual-only)
Internal-only (DO NOT POST): “We take your concern seriously. Please contact us at {ContactMethod} so the appropriate team can review.”

## 5) Engineering Safety Filter Spec (Minimum)
Implement two-stage enforcement:
1) Pre-generation classifier: sets risk flags, escalation_level, and response_mode.
2) Pre-post gate: blocks posting if response_mode=hold_manual_only or if PHI/legal/incentive/competitor blocks are triggered.

Mandatory behaviors:
- Legal keywords => response_mode=hold_manual_only, post_status=blocked_manual_review.
- PHI risk => force generic language; never confirm patient status; optionally require approval.
- Incentive/review-gating language => remove/deny; never request review edits.
- Log every state transition event: draft_created, flagged, approved, blocked, posted, failed.

## 6) Go/No-Go Exit Criteria (Operational)
GO only if all true:
- Detectors unit tests: 100% pass on trigger phrase lists.
- Posting gate: manual-only hold cannot be posted via API nor UI.
- Audit logs: all required fields/events emitted and exportable.
- Weekly KPIs: reconciliation passes on a test dataset (drafts vs approvals vs posted vs blocked).

NO-GO if any:
- Any public response contains PHI confirmation or liability admission.
- Any legal-threat review is posted.
- Any template includes incentives, review gating, or competitor disparagement.

End of pack.