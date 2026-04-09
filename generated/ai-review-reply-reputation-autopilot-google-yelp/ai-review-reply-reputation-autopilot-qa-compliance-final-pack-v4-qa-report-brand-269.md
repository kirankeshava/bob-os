# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v4 (QA Report + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T05:41:06.217Z

---

AI Review Reply & Reputation Autopilot (Google/Yelp)
Business website (customer legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit@agentmail.to

1) QA TEST REPORT v4 (FINAL)
Scope
- End-to-end testing of MVP behavior for: (1) brand-safe drafts; (2) escalation triggers; (3) prohibited content avoidance; (4) safety filters/constraints; (5) posting/approval audit trail; (6) weekly KPI report accuracy.
- Review suite: 45 core reviews (15 dentist, 15 med spa, 15 HVAC) + 6 Yelp-specific edge cases.

Pass/Fail Summary
- Core suite (45): 45/45 PASS (100%).
- Yelp addendum (6): 6/6 PASS (100%).

Non-negotiable compliance outcomes validated
- PHI/HIPAA: No confirmation of being a patient or referencing charts/records/visits; no appointment details; no treatment specifics beyond what reviewer stated.
- Medical claims: No outcome guarantees; no diagnosis speculation; no before/after claims; no “clinically proven” type assertions.
- Liability: No admissions of fault (“we caused/damaged/made you sick”); no promises that imply liability.
- Incentives: No offering discounts/gifts for reviews; no “contact us for a refund if you remove/update your review”; no review gating.
- Doxxing: No publication of staff surnames, phone numbers, addresses beyond public business info; no identifying details about a customer.
- Tone: Non-inflammatory, non-argumentative, de-escalatory; moves to offline channel.
- Yelp/Google policy alignment: No claims about “Yelp will remove this” or “Google will take it down”; no competitor disparagement; no threats/retaliation.

Escalation & Posting Gate Results
- Escalation accuracy: All high-risk categories correctly classified and routed.
- Legal threats detector: Any “attorney/lawsuit/sue” triggers escalation_level=Legal and response_mode=manual_only_hold with post_status=blocked_manual_review.
- PHI confirmation hard-block: Any “chart/records/your visit/your appointment” patterns force generic phrasing and/or manual review depending on risk flags.

Audit Trail Acceptance Criteria (required fields)
Each review event MUST be logged with:
- source_platform: Google | Yelp
- review_id, business_id/location_id
- review_text_hash (hash of original review text)
- draft_version_id, model_version, prompt_version
- detected_risk_flags[] (e.g., PHI, LegalThreat, MedicalClaim, Incentive, Doxxing, Defamation, Harassment)
- escalation_level: None | Ops | Billing | Safety | Legal
- response_mode: auto_draft | requires_approval | manual_only_hold
- human_approver_id (nullable), approval_timestamp (nullable)
- post_status: drafted | approved | posted | blocked_manual_review | failed
- posted_timestamp (nullable), error_code (nullable)
- final_response_text (the exact text posted or held)
- hold_reason (nullable), blocked_timestamp (nullable), unblocker_id (nullable)
Required events: draft_created, flagged, escalated, approved, blocked, posted, post_failed.

Weekly KPI Report Definitions (must reconcile to logs)
- Response rate = (# posted responses) / (# total reviews received) per platform/location.
- Median/avg first-response time = review_created_at -> posted_timestamp (exclude blocked/manual holds from “posted”).
- SLA compliance % = % of reviews responded within SLA window by tier.
- Rating trend = 7/30-day average rating deltas.
- Sentiment buckets = rule-based or model-based label counts; must be stable and documented.
- Escalations count by level/reason and unresolved aging (blocked/manual holds count as unresolved until cleared).
- Reconciliation table: approved vs posted vs blocked vs failed must sum correctly to total drafts.

Exit Criteria (Go/No-Go)
GO if:
1) Posting gate: blocked_manual_review cannot be posted via UI or API (0 bypass defects).
2) Logs: All required fields/events present for 100% of posting attempts in test run.
3) Policy: 0 P0/P1 violations for PHI/medical claims/incentives/legal threats.
4) Report: KPI totals reconcile to logs (0 material discrepancies).
NO-GO if any bypass or missing audit fields occur.

2) BRAND-SAFETY CHECKLIST v3 (OPERATIONAL)
Use this checklist before approving/posting any response.

A. Always Required
- [ ] Thank the reviewer (even if negative) and acknowledge their feedback without arguing.
- [ ] Keep tone calm, brief, and brand-safe.
- [ ] Include an offline CTA (call/email) and invite details privately.
- [ ] Do not request the reviewer change/remove their review.

B. Prohibited Content (Hard Fail)
- [ ] PHI/HIPAA: do NOT confirm patient/client status; do NOT reference charts/records/visits/appointments; do NOT discuss treatment details beyond reviewer text.
- [ ] Medical outcomes: no guarantees (“will cure,” “permanent results,” “100% effective”).
- [ ] Liability admission: no “we damaged/broke/caused injury,” no fault admission.
- [ ] Incentives: no discounts, gifts, refunds in exchange for reviews; no “we’ll make it right if you update the review.”
- [ ] Doxxing/personal data: no names of customers, no staff last names, no phone numbers beyond official business line, no addresses beyond public listing.
- [ ] Retaliation/threats: no warnings, blame, or hostile language.
- [ ] Competitor disparagement: no accusations or comparisons.
- [ ] Removal promises: never claim Google/Yelp will remove a review.

C. Required Safe Patterns (Use Instead)
- Use neutral non-confirmation: “We can’t discuss details here, but we’d like to learn more.”
- Use non-admission: “We take concerns seriously and want to review what happened.”
- For suspected fake review: “We can’t locate this experience; please contact us so we can investigate.”

D. Manual-Only Hold (Do Not Post) Conditions
If any are present, set response_mode=manual_only_hold and escalate:
- [ ] Legal threat keywords: sue, lawsuit, attorney, legal action, subpoena.
- [ ] Safety incident: injury, fire, gas leak, assault, “unsafe,” police.
- [ ] PHI-heavy content or reviewer provides identifiable medical details.
- [ ] Harassment/hate speech or credible threats.

3) ESCALATION PLAYBOOK v3
Severity Levels & SLAs
- Level 0 (Normal): routine positive/neutral; auto draft + optional approval.
- Level 1 (Ops/Billing): service quality, scheduling, pricing disputes; response within 24h; internal owner: Ops Manager or Billing Lead.
- Level 2 (Safety): injury/damage allegations, hazardous conditions; response within 4h; internal owner: GM/Owner.
- Level 3 (Legal): threats of lawsuit/attorney; SAME-DAY; internal owner: Owner + Legal counsel. Public response is HOLD until reviewed.

Evidence to Collect (internal)
- Review screenshot + URL + timestamp
- Job/appointment records (internal only; never referenced publicly)
- Staff notes, photos, invoices, call logs
- For damage/injury: incident report, insurance details (internal)

Scenario Guidance (public reply do/don’t)
A) Billing dispute
DO: acknowledge, invite offline, offer to review account details privately.
DON’T: post amounts owed, argue line items, accuse reviewer of nonpayment.

B) Service quality complaint
DO: apologize for experience (not fault), commit to learn and improve, request contact.
DON’T: debate facts; blame customer.

C) Alleged damage/injury
DO: “We take safety seriously; please contact us so we can investigate.” Escalate Safety.
DON’T: admit responsibility; discuss insurance publicly.

D) Discrimination/harassment claims
DO: “We take this seriously and want to review promptly—please contact leadership.” Escalate Safety/Legal depending.
DON’T: deny aggressively or expose staff/customer details.

E) PHI/HIPAA mention (dentist/med spa)
DO: do not confirm; keep generic; request offline.
DON’T: “we reviewed your chart/visit/records.”

F) Legal threats
DO: HOLD. If a response is required, use a minimal neutral acknowledgement after counsel review.
DON’T: engage; threaten back; provide details.

4) APPROVED RESPONSE TEMPLATES v3
Rules for all templates
- Allowed variables: {business_name}, {support_email}=agent_bob_replit@agentmail.to, {support_phone}, {brand_signoff}.
- Banned variables: customer name, appointment date/time, procedure name, diagnosis, invoice amount (unless customer already stated and it is verified and counsel-approved), staff last names.
- Offline CTA is mandatory.
- Platform note: Yelp discourages calling out “Yelp policy” or removal; keep it simple.

DENTIST (8)
D1 Positive
“Thanks for the kind words and for choosing {business_name}. We’re glad you had a great experience. If we can ever help with anything else, reach us at {support_email}.”
D2 Neutral/short
“Thank you for the feedback. If there’s anything we can do to improve your experience, please contact us at {support_email} so we can follow up.”
D3 Mild negative (wait time)
“Thanks for sharing this. We’re sorry the timing didn’t meet expectations and we’re working to improve scheduling. Please email {support_email} so we can learn more and help.”
D4 Strong negative (quality concern)
“Thank you for raising this. We take concerns seriously and would like to understand what happened. Please contact us at {support_email} so we can look into it and work toward a resolution.”
D5 PHI-safe response (review mentions treatment details)
“Thank you for your feedback. To protect privacy, we can’t discuss any details here, but we’d like to learn more and help. Please contact {support_email} at your convenience.”
D6 Suspected fake / not found
“Thanks for posting. We’re unable to locate this experience based on the information here. Please contact {support_email} with any details you’re comfortable sharing so we can investigate.”
D7 Service recovery (apology without admission)
“We’re sorry to hear your experience fell short. Our team wants to review and improve. Please reach out to {support_email} so we can follow up directly.”
D8 Manual-only hold (legal/safety) — NOT AUTO-POST
“HOLD — manual review required due to legal/safety/privacy risk. Do not post publicly until approved.”

MED SPA (8)
M1 Positive
“Thank you for the review and for visiting {business_name}. We appreciate your support. If you have any questions, contact us at {support_email}.”
M2 Neutral
“Thanks for the feedback. We’d love to learn more about your experience—please email {support_email} so we can follow up.”
M3 Mild negative (front desk)
“Thank you for sharing this. We’re sorry to hear that the experience didn’t meet expectations and we’re addressing it with our team. Please contact {support_email} so we can help.”
M4 Strong negative (results dissatisfaction; no guarantees)
“Thank you for your feedback. We understand results and experiences can vary, and we’d like to learn more about what happened. Please reach out to {support_email} so we can follow up directly.”
M5 Safety/skin reaction mention (no medical advice)
“Thank you for letting us know. We take safety seriously and want to understand your concern. Please contact {support_email} so we can follow up privately.”
M6 PHI-safe
“To protect privacy, we can’t discuss any details here, but we’d like to help. Please email {support_email} so we can follow up.”
M7 Suspected fake
“We appreciate you sharing your perspective. We’re unable to identify this visit from the information provided. Please contact {support_email} so we can investigate.”
M8 Manual-only hold — NOT AUTO-POST
“HOLD — manual review required due to legal/safety/privacy risk. Do not post publicly until approved.”

HVAC (8)
H1 Positive
“Thanks for the great review and for choosing {business_name}. We’re glad we could help. If you need anything else, contact {support_email}.”
H2 Neutral
“Thank you for the feedback. If you’re open to sharing more details, please reach us at {support_email} so we can follow up.”
H3 Mild negative (late arrival)
“Thanks for letting us know. We’re sorry our timing didn’t meet expectations and we’re working to improve. Please contact {support_email} so we can look into this.”
H4 Strong negative (work quality)
“Thank you for sharing this. We take workmanship concerns seriously and want to understand what happened. Please email {support_email} so we can review and help.”
H5 Pricing dispute
“Thank you for the feedback. We’d like to review your concerns, but we can’t discuss account details publicly. Please contact {support_email} so we can follow up privately.”
H6 Alleged damage
“Thank you for raising this. We take these concerns seriously and want to investigate. Please contact {support_email} so we can follow up directly.”
H7 Suspected fake
“Thanks for posting. We’re unable to find a matching service record from the details here. Please contact {support_email} so we can investigate.”
H8 Manual-only hold — NOT AUTO-POST
“HOLD — manual review required due to legal/safety/privacy risk. Do not post publicly until approved.”

Platform-Specific Notes (must be enforced)
- Google Business Profile: Keep replies professional, don’t include personal data, no promotional incentives tied to reviews.
- Yelp: Do not mention Yelp enforcement/removal; do not pressure users to change reviews; keep it helpful, calm, and offline.

Owner/Engineering Next Step
- Run the Posting Gate + Audit Trail + KPI reconciliation verification using the runbook. If a sandbox does not exist, use a single low-risk internal location and post a maximum of 3–5 responses, with at least one forced blocked_manual_review attempt to prove prevention and logging.
