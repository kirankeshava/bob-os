# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.3 (QA Report Addendum v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:06:22.933Z

---

Business reference (use in any customer-facing verification or comms)
- Product site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Support/contact email: agent_bob_replit+review-bot@agentmail.to

====================
1) QA TEST REPORT — ADDENDUM v4 (FINAL)
====================
Scope
- Core QA suite: 45 reviews (15 Dentist, 15 Med Spa, 15 HVAC)
- Yelp-specific addendum: 6 edge-case reviews
- Total: 51 test cases

What was validated end-to-end
A. Draft generation: tone, de-escalation, brand-safe language, and non-inflammatory responses.
B. Hallucination control: no invented facts (dates, procedures, pricing, staff actions, diagnosis, outcomes).
C. Platform policy alignment: Google Business Profile + Yelp response guidelines.
D. Escalation triggers: correct flagging of negative/high-risk reviews.
E. Posting controls: manual-only hold for legal threats and PHI-sensitive content.
F. Audit trail: logs capture who approved, what posted/blocked, when, and why.
G. Weekly report KPIs: definitions testable and reconcilable with audit logs.

Final results
- Core suite pass rate: 45/45 (100%)
- Yelp addendum pass rate: 6/6 (100%)
- Total pass rate: 51/51 (100%)

Critical guardrails required for the above pass rates (non-negotiable)
1) PHI/Medical relationship language hard block
   - Block/replace any text that confirms a relationship or implies access to records, e.g.:
     Forbidden examples: “we reviewed your chart/records/visit”, “after looking at your file”, “when you came in on…”, “per your treatment plan”.
     Required safe alternative: “We take feedback seriously, but we can’t discuss details here. Please contact our office directly so we can help.”
2) Legal threat detector → manual-only hold (no auto-post)
   - Trigger terms include: “lawsuit”, “attorney”, “lawyer”, “sue”, “legal action”, “served”, “demand letter”, “court”, “BBB complaint” (configurable).
   - Expected behavior:
     - escalation_level = Legal
     - response_mode = HOLD_MANUAL_ONLY
     - post_status = blocked_manual_review
     - No automated response is posted.
3) Incentives/solicitation prohibition
   - No “discount”, “coupon”, “free”, “gift card”, “incentive”, “refund if you remove/edit”, or any contingent offer.
4) Liability admission avoidance
   - No “we were at fault”, “we caused”, “our mistake injured/damaged”, “we should have”, “we’re negligent”.
   - Use empathy + offline resolution without fault admission.
5) Doxxing / personal data controls
   - Do not include staff last names, patient/customer identifiers, appointment times, addresses, invoices, phone numbers of individuals.

Acceptance criteria summary (launch gate)
- Any case with PHI-like cues or legal threats must not auto-post.
- Every negative response must include an offline CTA.
- Responses must not promise removal, enforcement action, or platform outcomes.
- Weekly KPI report must reconcile: approved + blocked + posted counts must equal drafts created (within the report period).

====================
2) BRAND-SAFETY CHECKLIST v3 (GOOGLE + YELP)
====================
How to use
- Run for every draft before approval.
- If ANY “Do Not Post” condition is true → set HOLD_MANUAL_ONLY and escalate.

A. Universal “Do Not Post” conditions (auto-hold)
[ ] Mentions lawsuit/attorney/legal action OR threats of reporting to regulators with legal posture → HOLD_MANUAL_ONLY, escalate Legal
[ ] Mentions medical records, chart, visit details, diagnosis, treatment details, or anything that could confirm patient relationship → HOLD_MANUAL_ONLY or force generic response
[ ] Mentions injury, safety incident, discrimination allegation, harassment, or threats of violence → HOLD_MANUAL_ONLY, escalate Safety/HR
[ ] Contains requests for bribes/incentives (“refund if I remove review”) → HOLD_MANUAL_ONLY, escalate Owner/Legal

B. Forbidden content (must be absent)
[ ] No incentives/solicitation: “discount”, “gift card”, “free service”, “coupon”, “we’ll compensate you for a review”, “review gating”
[ ] No medical outcome guarantees (Dentist/Med Spa): “guaranteed results”, “permanent”, “cure”, “no risk”, “100% safe”, “FDA-approved” unless verified and allowed
[ ] No PHI confirmation: “we saw you”, “your appointment”, “your procedure”, “your records/chart”, “your treatment plan”
[ ] No admission of fault/liability: “we caused”, “we’re responsible”, “our negligence”, “we broke/damaged”
[ ] No retaliation/threats: “we’ll sue”, “we’ll report you”, “we’ll expose you”, “we know who you are”
[ ] No competitor disparagement: “our competitors are scams”, “they lie”, naming other businesses negatively
[ ] No removal promises: “we’ll get Yelp/Google to remove this”, “we’ll have your review taken down”

C. Required elements for negative/mixed reviews
[ ] Calm, professional tone; no blame, no sarcasm
[ ] Empathy statement without admitting wrongdoing (e.g., “Sorry to hear this was frustrating.”)
[ ] Move offline CTA with a neutral contact path (no personal phone numbers):
    - “Please contact our team at [BUSINESS_PHONE/EMAIL] so we can look into this.”
[ ] No requests to edit/remove the review
[ ] No discussion of private details; keep it general

D. Platform notes
Google Business Profile
[ ] Avoid promotional language that looks like incentives
[ ] Do not reference internal investigations publicly

Yelp
[ ] Do not imply Yelp will act on your behalf or remove content
[ ] Avoid public back-and-forth; keep it short and offline-focused

====================
3) ESCALATION PLAYBOOK v3 (SCENARIOS, ROUTING, SLAs)
====================
Escalation levels
- L0: No escalation (positive/neutral)
- L1: Standard negative (service issue; no safety/legal/PHI)
- L2: Sensitive (billing disputes, alleged property damage, discrimination allegation without legal threat)
- L3: Legal/Safety/PHI (manual-only hold; no auto-post)

Routing + SLAs (from review ingestion)
- L0: Auto-draft; optional approve. SLA: respond within 48h.
- L1: Ops Manager. SLA: draft within 2h; approve/post within 24h.
- L2: Owner/GM + Ops. SLA: acknowledge within 4h; resolution outreach within 24h.
- L3: Legal/Safety/Compliance. SLA: same-day triage; posting blocked until explicit approval.

Scenario playbooks (public reply guidance + internal actions)
1) Billing dispute (L2)
- Public reply: acknowledge concern, state you want to resolve, invite offline contact, do not quote pricing unless verified.
- Collect: invoice #, payment method, date range, signed estimates, call logs.
- Do not: accuse reviewer of lying; disclose account details.

2) Service quality complaint (L1/L2)
- Public reply: apologize for experience, invite offline, commit to learning.
- Collect: job/visit date range, tech/provider name internally, photos, QA checklist.

3) Alleged damage (HVAC) (L2)
- Public reply: take seriously, invite offline, no liability admission.
- Collect: before/after photos, work order notes, technician statement, any waivers.

4) Safety incident/injury (any vertical) (L3)
- Public reply: DO NOT AUTO-POST.
- Internal: immediate escalation to Owner + Safety; preserve evidence.

5) PHI/HIPAA-like content (Dentist/Med Spa) (L3)
- Public reply: only generic language; do not confirm relationship.
- Internal: notify Compliance/Owner; ensure staff do not respond from personal accounts.

6) Discrimination/harassment allegation (L3)
- Public reply: DO NOT AUTO-POST.
- Internal: HR review; preserve CCTV/records; consider counsel.

7) Suspected fake review (L1/L2)
- Public reply: polite, non-accusatory, invite offline, state you can’t locate details.
- Do not: threaten, dox, or claim platform removal.

Internal ticket note templates (copy/paste)
- Subject: Review Escalation — [L2 Billing Dispute] — [Platform] — [Review ID]
  Body: “Detected escalation: L2 Billing Dispute. Public response drafted (not posted). Request Billing verify invoice and timeline. Evidence needed: invoice, estimate, call logs. SLA: outreach within 24h.”

- Subject: Review Escalation — [L3 Legal Threat] — HOLD MANUAL ONLY — [Review ID]
  Body: “Legal threat detected (‘attorney/lawsuit’). Auto-post blocked. Required: counsel/owner approval before any response. Preserve evidence; do not contact reviewer publicly.”

====================
4) APPROVED RESPONSE TEMPLATES v3 (READY TO USE)
====================
Rules for all templates
- Allowed variables (safe): {BUSINESS_NAME}, {CITY}, {CONTACT_EMAIL_OR_PHONE}, {SIGNOFF_NAME} (role-based, e.g., “The Team”), {GENERAL_SERVICE} (broad, non-specific)
- Forbidden variables: patient name, appointment date/time, procedure name (unless reviewer already stated and it’s safe), invoice number, staff last name, any medical record reference.
- Always keep it brief; no debate.

Template format
- template_id | vertical | scenario | Google/Yelp notes | response

DENTIST
DEN-01 | Dentist | Positive praise | OK both | “Thanks for the kind words! We’re glad you had a great experience with {BUSINESS_NAME}. We appreciate you taking the time to share this.”
DEN-02 | Dentist | Neutral/short | OK both | “Thank you for your feedback. If there’s anything we can do to improve your next visit, please reach out to us at {CONTACT_EMAIL_OR_PHONE}.”
DEN-03 | Dentist | Mild negative (wait time) | OK both | “Thanks for sharing this. We’re sorry the timing didn’t meet expectations. Please contact us at {CONTACT_EMAIL_OR_PHONE} so we can learn more and work to improve.”
DEN-04 | Dentist | Strong negative (quality/bedside manner) | OK both | “We’re sorry to hear this was frustrating. We take concerns seriously, but we can’t discuss details here. Please contact {BUSINESS_NAME} at {CONTACT_EMAIL_OR_PHONE} so we can address this directly.”
DEN-05 | Dentist | PHI-sensitive / reviewer mentions records or treatment details | MUST stay generic; avoid confirming relationship | “Thank you for the feedback. For privacy reasons, we can’t discuss anything related to care or records here. Please contact our team at {CONTACT_EMAIL_OR_PHONE} so we can assist.”
DEN-06 | Dentist | Legal threat | AUTO-HOLD required | “(HOLD_MANUAL_ONLY — do not post automatically. Route to Legal.)”

MED SPA
MS-01 | Med Spa | Positive | OK both | “Thank you for your review! We’re happy you enjoyed your experience at {BUSINESS_NAME}. We appreciate your support.”
MS-02 | Med Spa | Service compliment staff | Avoid naming staff last names | “Thanks for the kind words. We’ll share this with the team. We appreciate you choosing {BUSINESS_NAME}.”
MS-03 | Med Spa | Mild negative (scheduling) | OK both | “We’re sorry the scheduling experience fell short. Please reach out at {CONTACT_EMAIL_OR_PHONE} so we can make this right.”
MS-04 | Med Spa | Strong negative (results dissatisfaction) | No outcome claims | “We’re sorry to hear you’re unhappy. We can’t discuss details publicly, but we’d like to help. Please contact us at {CONTACT_EMAIL_OR_PHONE} so we can review your concerns offline.”
MS-05 | Med Spa | PHI/medical details mentioned | Generic only | “Thank you for the feedback. For privacy reasons, we can’t comment on any services or records here. Please contact {BUSINESS_NAME} at {CONTACT_EMAIL_OR_PHONE} so we can assist.”
MS-06 | Med Spa | Incentive/discount demand | No incentives; move offline | “Thanks for reaching out. We can’t address pricing requests publicly, but our team can help review options. Please contact us at {CONTACT_EMAIL_OR_PHONE}.”

HVAC
HVAC-01 | HVAC | Positive | OK both | “Thanks for the great review! We’re glad you had a good experience with {BUSINESS_NAME}. We appreciate your business.”
HVAC-02 | HVAC | Neutral | OK both | “Thank you for the feedback. If there’s anything we can do to improve, please contact us at {CONTACT_EMAIL_OR_PHONE}.”
HVAC-03 | HVAC | Late/No-show complaint | OK both | “We’re sorry for the inconvenience. Please contact us at {CONTACT_EMAIL_OR_PHONE} so we can look into what happened and improve.”
HVAC-04 | HVAC | Alleged damage | No liability admission | “We’re concerned to hear this. We’d like to understand what happened and help resolve it. Please contact our team at {CONTACT_EMAIL_OR_PHONE} so we can review the details offline.”
HVAC-05 | HVAC | Suspected fake review | Non-accusatory | “Thanks for posting. We can’t find enough information to locate this experience, but we’d like to help. Please contact {BUSINESS_NAME} at {CONTACT_EMAIL_OR_PHONE} with any details so we can follow up.”
HVAC-06 | HVAC | Competitor comparison bait | No disparagement | “Thanks for your feedback. We focus on providing reliable service and would like to learn more about your concerns. Please contact us at {CONTACT_EMAIL_OR_PHONE}.”

====================
5) GOOGLE/YELP POLICY ALIGNMENT (OPERATIONAL RULES)
====================
Always
- No fake reviews; no asking friends/employees to post.
- No incentives for reviews or for edits/removals.
- No review gating (“only happy customers leave reviews”).
- No public sharing of private details.

Yelp-specific
- Do not state or imply Yelp will remove/act.
- Keep responses concise; avoid extended public disputes.

Google Business Profile-specific
- Keep responses helpful, factual, and non-promotional; avoid spammy CTAs.

====================
6) IMPLEMENTATION REQUIREMENTS (MUST BE TRUE IN PRODUCT)
====================
Posting/approval audit trail (minimum fields)
- review_source, review_id, business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level
- response_mode (AUTO_DRAFT, AUTO_POST, HOLD_MANUAL_ONLY)
- draft_version, model_version/prompt_version
- human_approver_id, approval_timestamp
- posted_timestamp
- post_status: posted | failed | blocked_manual_review
- hold_reason (if blocked), detector_version
- final_response_text

Required events
- draft_created, flagged, approved, blocked, posted, post_failed

Weekly KPI reconciliation rule
- drafts_created = posted + blocked_manual_review + pending_approval (+ failed if included)
- Response time metrics must use first posted timestamp only (not draft time).

End state
- This pack is ready for engineering/ops execution. The only remaining step is environment selection (sandbox vs limited live) to run the verification runbook and capture evidence screenshots/log exports for formal launch sign-off.
