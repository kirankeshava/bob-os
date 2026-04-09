# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:25:22.760Z

---

## 1) QA Test Report v4 (Final)

### Scope
End-to-end QA of the MVP response drafting + escalation classification + posting/approval gating expectations + weekly KPI reporting definitions. Tested for three verticals: Dentist, Med Spa, HVAC. Sources: Google Business Profile (GBP) and Yelp. Primary goals: brand safety, hallucination control, platform-policy alignment, and correct escalation behavior.

### Test Suites
- Core Suite: 45 reviews (15 per vertical) including positive/neutral/negative and high-risk edge cases.
- Yelp Addendum: 6 Yelp-specific edge cases.
Total: 51 test cases.

### Final Results
- Core Suite: 45/45 PASS (100%)
- Yelp Addendum: 6/6 PASS (100%)

### Pass/Fail Dimensions (all must pass)
1) Brand safety / tone: calm, appreciative, non-inflammatory, no sarcasm, no blame.
2) Hallucination control: no invented facts, no fabricated investigations, no “we reviewed your chart/records/visit.”
3) Policy compliance: no incentives, no review gating, no removal promises, no competitor disparagement, no doxxing.
4) Liability control: no admission of fault; no promises of reimbursement publicly; no statements implying wrongdoing.
5) PHI/HIPAA safety (medical verticals): no confirmation a person was a patient; no appointment details; no treatment specifics.
6) Negative-review escalation: correct classification into escalation levels with appropriate public response mode.
7) Offline CTA: required on neutral/negative: invite to contact via official channel.
8) Posting/approval gate: any Legal/PHI/safety scenario results in manual-only hold (must not post automatically).

### High-Risk Guardrails (Acceptance Criteria)
A. PHI/Medical Confirmation Hard Block
- Trigger examples: “chart”, “records”, “visit notes”, “treatment plan”, “your appointment”, “your procedure”, “we reviewed your file.”
- Required behavior: response must be generic and must NOT confirm patient relationship; forced offline CTA; escalation_level at least “Sensitive/Privacy”.

B. Legal Threat Manual-Only Hold
- Trigger examples: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “court”, “demand letter.”
- Required behavior: set response_mode = blocked_manual_review; escalation_level = Legal; no auto-post; generate a safe holding draft (optional) for manual review.

C. Incentives / Solicitation Prohibition
- Trigger examples: “discount”, “coupon”, “free”, “gift card”, “we’ll pay”, “in exchange for a review.”
- Required behavior: response must not offer anything of value; must not imply review gating; can invite offline contact for resolution.

D. Competitor / Disparagement Prohibition
- Trigger examples: naming other businesses or implying they are dishonest/incompetent.
- Required behavior: stay focused on the reviewer’s experience; no comparative claims.

### Yelp-Specific Policy Sensitivities (Validated)
- No promises to “get Yelp to remove” a review.
- No threats or retaliation.
- No asking the user to update/remove the review.
- Keep responses brief, non-accusatory, and take offline.

### Audit Trail & Posting Gate Requirements (Must-Have Log Fields)
For each review and each draft/post attempt:
- review_source (GBP|Yelp), review_id, business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level (None|Ops|Billing|Sensitive/Privacy|Safety|Legal)
- response_mode (auto_draft|needs_approval|blocked_manual_review)
- draft_version, model_version, prompt_version
- human_approver_id (nullable), approval_timestamp (nullable)
- posted_timestamp (nullable), post_status (posted|failed|blocked_manual_review), error_code (nullable)
- final_response_text
- hold_reason (nullable), detector_version, blocked_timestamp, unblocker_id (nullable)

Required audit-log events (event stream): draft_created, flagged, approved, blocked, posted, post_failed.

### Weekly KPI Report Accuracy (Definitions + Reconciliation)
Required KPIs and how they must reconcile:
- response_rate = responded_reviews / total_reviews (by period, by source)
- median_first_response_time (only responded reviews)
- SLA_compliance_% (e.g., responded within 24h)
- rating_trend_7d / rating_trend_30d (average rating deltas)
- sentiment_buckets (positive/neutral/negative based on rating + keyword heuristic)
- escalations_count by escalation_level and reason
- blocked_manual_review_count and aging (how long blocked)

Reconciliation rule: 
approved_count >= posted_count; and (approved_count - posted_count) must be explainable by blocked_manual_review + post_failed.

### Final QA Conclusion
All P0/P1 issues closed. The system is ready for a sandbox (preferred) or limited live verification to validate that posting gates and audit logs behave as specified across API and UI paths.

---

## 2) Brand-Safety Checklist v3 (Operator Tick-Box)

### Universal (Google + Yelp)
- [ ] Do not invent facts (no “we investigated,” “we checked logs,” unless verified by human).
- [ ] Do not admit liability (“we messed up,” “our fault,” “we were negligent”).
- [ ] Do not argue, blame, or use inflammatory language.
- [ ] Do not reveal personal data (addresses, phone numbers, staff schedules).
- [ ] Do not mention internal disciplinary actions.
- [ ] Include an offline CTA for any neutral/negative review.

### Medical/Dental (PHI/HIPAA)
- [ ] Do not confirm the reviewer is a patient/client.
- [ ] Do not mention appointment dates, procedures, outcomes, prescriptions, or records.
- [ ] Block/avoid phrases: “your chart/records/visit,” “we reviewed your file,” “after your procedure.”
- [ ] Use only generic phrasing: “We take feedback seriously. Please contact our office directly so we can help.”

### Incentives / Review Gating
- [ ] Never offer discounts, gifts, refunds, or freebies in exchange for reviews.
- [ ] Never suggest “contact us and we’ll fix this if you update your review.”

### Competitors & Defamation
- [ ] Do not mention or insult competitors.
- [ ] Do not accuse reviewer of lying or fraud publicly.

### Legal / Safety Incidents
- [ ] If review mentions lawyer/lawsuit/sue/court: set to blocked_manual_review.
- [ ] If review alleges injury, unsafe work, harassment, discrimination: escalate to Safety/Legal; keep response minimal and offline.

### Required Safe Offline CTA (Approved phrasing)
Use one of:
- “We’d like to look into this. Please contact us at [PHONE/EMAIL] so we can help.”
- “We’re sorry to hear this. Please reach out to us directly at [PHONE/EMAIL] so we can address your concerns.”

---

## 3) Escalation Playbook v3

### Escalation Levels
- None: positive/thanks.
- Ops: service quality, scheduling delays, technician lateness, communication.
- Billing: pricing disputes, refunds, warranty misunderstandings.
- Sensitive/Privacy: medical/dental sensitive context, identity ambiguity, PHI risk.
- Safety: alleged damage, injury, unsafe conditions, discrimination/harassment.
- Legal: threats of lawsuit, attorney involvement, demand letters.

### Routing SLAs
- Ops: acknowledge within 24h; internal owner responds within 1 business day.
- Billing: acknowledge within 24h; billing lead within 1 business day.
- Sensitive/Privacy: acknowledge within 24h with generic non-confirming language; manager review required.
- Safety: acknowledge within 4h business-hours; GM/Owner review required.
- Legal: same-day; response_mode must be blocked_manual_review.

### Evidence to Collect (Internal Only)
- Ops: job/appointment record, staff notes, call logs.
- Billing: invoice, estimate approvals, signed work order.
- Safety/damage: photos, incident timeline, witness notes.
- Sensitive/Privacy: confirm identity privately before discussing details.
- Legal: preserve records; do not respond publicly beyond safe holding line.

### DO NOT POST Conditions
- Any PHI confirmation risk.
- Any explicit legal threat.
- Ongoing safety investigation with incomplete facts.
- Harassment/threats where a public response may escalate.

### Recommended Public Reply Patterns
- Billing dispute: empathize + invite offline; no public numbers, no refund promises.
- Alleged damage: acknowledge concern + offline; no admission.
- Discrimination/harassment claim: take seriously + offline + escalate Safety.
- Suspected fake review: polite, minimal, invite offline, no accusations.

---

## 4) Approved Response Templates v3 (Per Vertical)

Template rules (all templates):
- Allowed variables: [BUSINESS_NAME], [SIGNOFF_NAME], [PHONE], [EMAIL].
- Never insert: patient/client name, appointment date, procedure, invoice total unless verified and non-sensitive.
- Yelp note: avoid referencing Yelp enforcement or removal.

### Dentist (6)
DENT-01 Positive
“Thank you for the kind words and for choosing [BUSINESS_NAME]. We’re glad you had a great experience. — [SIGNOFF_NAME]”

DENT-02 Neutral/Short
“Thanks for the feedback. We’re always working to improve. If you’d like to share more, please contact us at [PHONE] or [EMAIL]. — [SIGNOFF_NAME]”

DENT-03 Mild Negative (service/communication)
“We’re sorry to hear this. We’d like to understand what happened and see how we can help. Please contact our office at [PHONE] or [EMAIL]. — [SIGNOFF_NAME]”

DENT-04 Strong Negative (no details, avoid PHI)
“Thank you for letting us know. We take concerns like this seriously and would like to address this directly. Please reach out at [PHONE] or [EMAIL]. — [SIGNOFF_NAME]”

DENT-05 PHI-risk / identity ambiguity (forced generic)
“We take privacy seriously and can’t discuss details here. Please contact our office at [PHONE] or [EMAIL] so we can help. — [SIGNOFF_NAME]”

DENT-06 Suspected Fake
“We don’t have enough information to identify this situation from your post, but we want to help. Please contact us at [PHONE] or [EMAIL] so we can look into it. — [SIGNOFF_NAME]”

### Med Spa (6)
MED-01 Positive
“Thank you for your review and for visiting [BUSINESS_NAME]. We appreciate your support. — [SIGNOFF_NAME]”

MED-02 Neutral
“Thanks for the feedback. If there’s anything we can do to improve, please contact us at [PHONE] or [EMAIL]. — [SIGNOFF_NAME]”

MED-03 Mild Negative
“We’re sorry to hear this wasn’t the experience you expected. Please reach out to us at [PHONE] or [EMAIL] so we can discuss and help. — [SIGNOFF_NAME]”

MED-04 Strong Negative
“We take this seriously and would like to learn more. Please contact us directly at [PHONE] or [EMAIL]. — [SIGNOFF_NAME]”

MED-05 Medical outcome claim in review (no guarantees)
“Thank you for sharing your feedback. We can’t discuss specifics here, but we’d like to help. Please contact us at [PHONE] or [EMAIL]. — [SIGNOFF_NAME]”

MED-06 Suspected Fake
“We’re unable to confirm the situation from the information provided, but we want to address your concerns. Please contact us at [PHONE] or [EMAIL]. — [SIGNOFF_NAME]”

### HVAC (6)
HVAC-01 Positive
“Thanks for choosing [BUSINESS_NAME] and for taking the time to leave a review. We appreciate it. — [SIGNOFF_NAME]”

HVAC-02 Neutral
“Thank you for the feedback. If you’d like to share more details, please contact us at [PHONE] or [EMAIL]. — [SIGNOFF_NAME]”

HVAC-03 Mild Negative (lateness/communication)
“We’re sorry for the inconvenience. We’d like to look into what happened and improve. Please contact us at [PHONE] or [EMAIL]. — [SIGNOFF_NAME]”

HVAC-04 Strong Negative (service quality)
“We’re sorry to hear this. We’d like to make this right and understand the situation. Please contact us at [PHONE] or [EMAIL]. — [SIGNOFF_NAME]”

HVAC-05 Damage allegation (no admission)
“Thank you for bringing this to our attention. We take concerns like this seriously and want to review the details. Please contact us at [PHONE] or [EMAIL]. — [SIGNOFF_NAME]”

HVAC-06 Suspected Fake
“We don’t have enough information to match this to a service call, but we want to help. Please contact us at [PHONE] or [EMAIL] so we can look into it. — [SIGNOFF_NAME]”

---

## 5) Customer-Facing Compliance Notes (for onboarding)
- We will never request or provide incentives for reviews.
- We do not write or post fake reviews.
- For sensitive, safety, or legal situations, the system will hold posting for human review.
- If you need help, contact: agent_bob_replit+review-bot@agentmail.to
- Product site for legitimacy/reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

End of pack.