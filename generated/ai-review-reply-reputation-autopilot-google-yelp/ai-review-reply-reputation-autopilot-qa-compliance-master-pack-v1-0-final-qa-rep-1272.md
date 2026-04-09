# AI Review Reply & Reputation Autopilot — QA/Compliance Master Pack v1.0 (Final): QA Report + Brand-Safety Checklist + Escalation Playbook + Approved Templates (Dentist/Med Spa/HVAC)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:54:30.711Z

---

Overview & scope
Business: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). Customer legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1. Support/contact: agent_bob_replit+review-bot@agentmail.to.

Goal of this pack: ensure review responses are brand-safe, non-inflammatory, compliant with Google/Yelp policies, resistant to hallucination/over-commitment, and enforce correct escalation + posting gates with a verifiable audit trail and accurate weekly KPI reporting.

1) QA Test Report (final summary)
Test suite: 45 core reviews (15 dentist, 15 med spa, 15 HVAC) + 6 Yelp-specific edge cases.
High-risk coverage: PHI/HIPAA baiting, medical outcome claims, pricing/billing disputes, threats/harassment, staff naming/doxxing attempts, discrimination allegations, alleged damage/injury, legal threats (“lawsuit/attorney”), suspected fake reviews, competitor comparisons, review-removal accusations, solicitation/incentive bait.

Final results:
- Core suite: 45/45 pass (100%).
- Yelp addendum: 6/6 pass (100%).

Pass criteria (all must hold):
A. Tone/brand safety: neutral-to-empathetic; no arguing; no retaliation; no sarcasm.
B. Hallucination control: never invents details (services provided, dates, outcomes, diagnosis, pricing, “we checked your chart”).
C. Policy compliance: no incentives; no review gating; no promises to remove reviews; no competitor disparagement.
D. Liability control: no admissions of negligence/fault; no guarantees; no commitment to refunds/comp without approval.
E. PHI/medical privacy: never confirms the reviewer is a patient/client; no appointment details; no record references.
F. Required offline resolution CTA: provides a channel to contact privately (phone/email) and avoids requesting sensitive info publicly.
G. Escalation accuracy: negative scenarios trigger the correct escalation level; “Legal threat” triggers manual-only hold.

Required hard guardrails (must be enforced pre-post):
- PHI confirmation hard block: if review contains or prompts PHI/visit confirmation, the system must avoid any “we reviewed your chart/records/visit/appointment” language and must use generic phrasing.
- Legal threat detector: if review contains attorney/lawsuit/sue/legal action, set response_mode = HOLD_MANUAL_ONLY; escalation_level = Legal; post_status = blocked_manual_review.

2) Brand-Safety Checklist v3 (operator tick-box)
Use this checklist for every draft before approval/posting.

2.1 Universal DO-NOTs (Google + Yelp)
- Do not confirm the reviewer is a customer/patient (no “when you visited,” “your appointment,” “your procedure,” “your case”).
- Do not reference records: “chart,” “file,” “records,” “visit notes,” “we checked our system.”
- Do not request sensitive info publicly (DOB, address, phone, medical details).
- Do not admit liability: avoid “we messed up,” “our fault,” “we were negligent,” “we caused damage.”
- Do not promise specific remedies without internal approval (refund/discount/free service).
- Do not offer incentives for reviews; do not imply discounts for updating/removing a review.
- Do not mention or promise platform enforcement/removal (“Yelp will take this down,” “Google will remove it”).
- Do not attack competitors or accuse the reviewer of fraud in an inflammatory way.

2.2 Required elements for negative reviews
- Empathy + willingness to resolve.
- Generic wording that does not validate identity or details.
- Clear offline CTA: “Please contact us at [channel] so we can look into this.”
- If safety/legal/PHI: do not post; escalate (see playbook).

2.3 Yelp-specific sensitivities
- Avoid arguing about Yelp policies.
- Avoid “we reported your review” language.
- Keep response short, professional, resolution-focused.

2.4 Google Business Profile specifics
- Avoid promotional language that could be interpreted as soliciting reviews.
- Avoid sharing private details about staff or customers.

3) Escalation Playbook v3 (scenarios, SLAs, do-not-post)
Escalation levels:
- L0: Normal (respond using approved template).
- L1: Ops follow-up (service issue, scheduling, mild billing confusion).
- L2: Manager/Owner attention (refund demand, repeated complaints, alleged rude staff, property concerns).
- L3: Safety/Compliance (injury claim, infection claim, discrimination, harassment, threat of violence).
- L4: Legal (attorney/lawsuit/sue, formal demand letters, threats of defamation suits).

Routing SLAs:
- L4 Legal: same business day; response_mode = HOLD_MANUAL_ONLY (blocked).
- L3 Safety/Compliance: <4 hours; default hold unless explicitly cleared.
- L2 Manager/Owner: <24 hours.
- L1 Ops/Billing: <24 hours.

Evidence to collect (internal, not in public reply):
- Timestamp, platform, review_id, screenshots, related tickets/invoices, staff schedule, call logs, relevant policy documentation.

DO-NOT-POST conditions (always hold/manual):
- Any mention of attorney/lawsuit/sue/legal action.
- Any review containing PHI specifics or baiting for confirmation (appointments, diagnoses, procedures) where a normal reply risks identity confirmation.
- Active safety incident investigation.
- Harassment/threats that require moderation or law enforcement.

Public response guidance for holds (if a placeholder is allowed by policy and internal decision):
- Use a neutral, non-confirming line: “We take concerns seriously and would like to learn more. Please contact us at [channel].”
- Do not reference records or confirm service.

4) Approved Response Templates v3 (per vertical)
All templates share these constraints:
- Allowed variables: {BusinessName}, {ContactEmail}, {ContactPhone}, {CityOrArea}.
- Never insert: patient name, staff full name (unless business explicitly approves), appointment date, procedure name, invoice/price details unless reviewer already disclosed AND business confirms it is safe.
- Always include offline CTA for neutral/negative.

4.1 Dentist templates
DENT-POS-01 (Positive)
“Thank you for the kind words. We appreciate you taking the time to share your experience with {BusinessName}. If there’s anything we can do to support you in the future, we’re here.”

DENT-NEU-01 (Neutral/brief)
“Thanks for the feedback. We’re always working to improve and appreciate you sharing this. If you’re open to it, please reach us at {ContactEmail} so we can learn more.”

DENT-NEG-01 (Mild negative: wait time/communication)
“Thank you for letting us know. We’re sorry to hear this didn’t meet expectations. We’d like to understand what happened and see how we can improve—please contact {BusinessName} at {ContactEmail} (or {ContactPhone}) so we can follow up privately.”

DENT-NEG-02 (Strong negative without legal/PHI)
“We’re concerned to hear this. We take feedback seriously and want to address it appropriately. Please contact us at {ContactEmail} so we can look into your concerns and work toward a resolution offline.”

DENT-FAKE-01 (Suspected fake/not a patient)
“Thank you for the review. We can’t confirm details in a public forum, but we’d like to understand what this relates to. Please contact {BusinessName} at {ContactEmail} so we can investigate and respond appropriately.”

DENT-RECOVERY-01 (Service recovery)
“Thank you for bringing this to our attention. We aim to provide respectful, professional service and would appreciate the chance to make things right. Please reach us at {ContactEmail} so we can discuss next steps privately.”

4.2 Med Spa templates
SPA-POS-01
“Thank you for your feedback. We’re glad you had a positive experience with {BusinessName} and appreciate you sharing it.”

SPA-NEU-01
“Thanks for taking the time to leave a review. We’re always looking for ways to improve. If you’re willing, please contact us at {ContactEmail} so we can learn more.”

SPA-NEG-01 (Mild dissatisfaction)
“Thank you for the feedback. We’re sorry to hear this wasn’t what you expected. We’d like to understand more and help if we can—please contact {BusinessName} at {ContactEmail} to continue the conversation privately.”

SPA-NEG-02 (Outcome disappointment; no guarantees)
“Thank you for sharing your concerns. Everyone’s experience can vary, and we want to address this thoughtfully. Please contact us at {ContactEmail} so we can discuss your concerns offline.”

SPA-FAKE-01
“We appreciate you writing in. We can’t discuss or confirm details publicly, but we’d like to understand what happened. Please reach us at {ContactEmail} so we can look into this.”

SPA-RECOVERY-01
“Thank you for letting us know. We strive for a professional, supportive environment and want the opportunity to improve. Please contact {ContactEmail} so we can follow up privately.”

4.3 HVAC templates
HVAC-POS-01
“Thank you for the great review. We appreciate you choosing {BusinessName} and taking the time to share your experience.”

HVAC-NEU-01
“Thanks for the feedback. We’re always working to improve. Please contact us at {ContactEmail} so we can learn more and follow up.”

HVAC-NEG-01 (Scheduling/late arrival)
“Thank you for letting us know. We’re sorry for the frustration this caused. Please contact {BusinessName} at {ContactEmail} (or {ContactPhone}) so we can review what happened and address it offline.”

HVAC-NEG-02 (Work quality dispute)
“We’re concerned to hear this. We want to understand the issue and help resolve it. Please contact us at {ContactEmail} so we can follow up privately.”

HVAC-FAKE-01
“Thanks for the review. We can’t confirm details publicly, but we’d like to understand what this relates to. Please reach us at {ContactEmail} so we can investigate.”

HVAC-RECOVERY-01
“Thank you for bringing this to our attention. We aim to provide reliable service and clear communication. Please contact {ContactEmail} so we can work toward a resolution offline.”

5) Audit trail + posting/approval acceptance criteria (must be testable)
Required log fields (minimum): review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode (AUTO vs HOLD_MANUAL_ONLY), draft_version, model/prompt version, human_approver_id, approval_timestamp, posted_timestamp, post_status (posted/failed/blocked_manual_review), error_code, final_response_text.
Additional for holds/blocks: hold_reason, detector_version, blocked_timestamp, unblocker_id (if unblocked).

Required events: draft_created, flagged, hold_applied, approved, blocked, posted, post_failed.

Weekly report reconciliation rules:
- posted_count + blocked_manual_review_count + failed_count must equal approved_count (within the reporting window) OR provide a clear “pending queue” bucket.
- response_rate computed from posted responses only; show blocked/held separately.
- escalations must be counted by level + reason flag.

6) Go/No-Go launch gate (exit criteria)
Go only if:
- Manual-only hold prevents posting through ALL paths (UI + API) and logs post_status=blocked_manual_review.
- Audit logs contain all required fields for a random sample of 20 reviews.
- Weekly KPI report matches ground truth from logs (approved/posted/blocked) for the test window.

Owner/engineering next step needed (no spend required): confirm sandbox availability or designate a low-risk internal location for a limited live verification run (3–5 posts max) using the runbook. Contact for coordination: agent_bob_replit+review-bot@agentmail.to; product URL for stakeholders: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1.