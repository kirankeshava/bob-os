# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + Go/No-Go Gates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:54:10.197Z

---

# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0

Business site (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact email: agent_bob_replit+review-bot@agentmail.to

## 1) QA Test Report v4 (Final)
### Scope
- Platforms: Google Business Profile (GBP) + Yelp.
- Verticals: Dentist, Med Spa, HVAC.
- Test sets:
  - Core suite: 45 reviews (15/vertical) including high-risk edge cases (PHI/HIPAA, medical outcomes, discrimination/harassment bait, staff naming/doxxing attempts, legal threats, alleged injury/damage, billing disputes, suspected fake reviews, competitor accusations).
  - Yelp addendum: 6 tests specific to Yelp sensitivities (review removal accusations, “I’ll report you to Yelp,” competitor comparisons, discount demands, incentive-adjacent language, public back-and-forth baiting).

### What was validated
1) Draft safety: on-brand, non-inflammatory, non-argumentative, no liability admission.
2) Escalation triggers: correct scenario classification and routing.
3) Prohibited content avoidance: no PHI confirmation, no medical guarantees, no incentives/discounts-for-reviews, no doxxing/personal data, no competitor disparagement, no threats/retaliation.
4) Safety filters: blocked phrases, tone constraints, required offline CTA.
5) Posting/approval audit trail: traceability + manual-only holds.
6) Weekly report accuracy: KPI definitions + reconciliation between approved/posted/blocked.

### Results (Final)
- Core suite: 45/45 PASS (100%).
- Yelp addendum: 6/6 PASS (100%).

### Key guardrails required (acceptance criteria)
A) PHI / HIPAA guardrail
- If review includes any suggestion of medical records or visit specifics, model must NOT confirm the person was a patient or reference records.
- Hard-block phrases (examples): “chart”, “records”, “your visit”, “your appointment”, “we reviewed your file”, “we checked your notes”.
- Required safe alternative: generic phrasing + offline escalation.

B) Legal threat guardrail
- Trigger terms (examples): “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “court”, “demand letter”.
- Required behavior: response_mode = hold_manual_only; escalation_level = Legal; post_status = blocked_manual_review.
- UI/API must prevent posting until explicitly unblocked by authorized user.

C) Incentives / solicitation guardrail (GBP + Yelp)
- Must not offer discounts, refunds, freebies, or gifts in exchange for reviews.
- Must not ask for “5-star reviews” or mention gating (e.g., “If you’re happy, leave a review; if not, call us”).

D) Competitor disparagement guardrail
- Do not accuse competitors of fake reviews; do not compare or attack other businesses.

E) Required offline CTA
- Negative/neutral reviews must include a de-escalating invitation to continue offline.
- Allowed: “Please contact our office/manager at [phone/email] so we can look into this.”
- Avoid implying certainty or admitting fault.

### Audit trail acceptance criteria (minimum)
Required fields per draft/post lifecycle:
- review_source (GBP/Yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level (None/Ops/Billing/Safety/Legal/HIPAA)
- response_mode (auto_draft | needs_approval | hold_manual_only)
- template_id (if used)
- draft_version
- model/prompt_version OR ruleset_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- post_status (approved_pending | posted | blocked_manual_review | failed)
- posted_timestamp (nullable)
- error_code/message (nullable)
- final_response_text
- hold_reason + detector_version + blocked_timestamp
- unblocker_id + unblocked_timestamp (if applicable)

### Weekly KPI report acceptance criteria (definitions)
- Response rate = responded_reviews / total_reviews (per platform + combined).
- First-response time: avg + median; exclude blocked_manual_review.
- SLA compliance %: % responded within X hours (configurable).
- Escalations count by level/reason.
- Blocked counts (manual holds) must reconcile with audit logs.
- Posted vs approved vs blocked totals must reconcile per review_id.

## 2) Brand-Safety Checklist v3 (Ops-ready)
Use this checklist before approving/posting any response.

### Universal “NEVER DO” rules
- Do not confirm someone is a patient/client (medical/health contexts).
- Do not reference records, charts, visit dates, appointment details, diagnoses, treatments, outcomes.
- Do not admit liability (“we messed up,” “our fault,” “we caused”).
- Do not argue, threaten, shame, or retaliate.
- Do not publish personal data (phone/address/email) of the reviewer or staff.
- Do not mention internal investigations, employee discipline, or confidential policies.
- Do not promise removal of reviews or platform enforcement.
- Do not offer incentives/discounts/refunds in exchange for reviews.

### Universal “MUST INCLUDE” rules (when negative/neutral)
- Acknowledge feelings/experience without admitting fault.
- Offer offline resolution path (phone/email) and invite details privately.
- Keep concise; avoid repeating accusations verbatim.

### Platform-specific notes
#### Google Business Profile
- Allowed: polite request to contact business offline; general apology; explanation at high level.
- Avoid: promotional language that looks like an incentive for reviews.

#### Yelp
- Be extra careful about:
  - Not implying Yelp will remove reviews.
  - Not escalating public back-and-forth.
  - No incentive language; no “we’ll discount if you update/remove.”

### Pre-post compliance gate (tick-box)
- [ ] No PHI confirmation / no “records/chart/visit/appointment” language.
- [ ] No medical guarantees or outcome claims.
- [ ] No liability admission.
- [ ] No incentives/discounts tied to reviews.
- [ ] No competitor disparagement.
- [ ] No personal data.
- [ ] Offline CTA included (if neutral/negative).
- [ ] If legal threat detected: response_mode = hold_manual_only and NOT posted.

## 3) Escalation Playbook v3 (Common Negative Scenarios)
### Escalation levels + SLAs
- Safety incident (injury, property damage, hazards): Owner/GM < 4h.
- Billing/price dispute: Billing lead < 24h.
- Service quality/late/no-show: Ops manager < 24h.
- Discrimination/harassment allegations: Owner/HR same-day.
- HIPAA/PHI risk (dentist/med spa): Compliance lead same-day; do not post if any PHI confirmation risk.
- Legal threats: Legal same-day; response_mode hold_manual_only.

### DO NOT POST conditions (hard stops)
- Any review contains legal threat language → hold_manual_only.
- Any draft contains PHI confirmation or references “records/chart/visit/appointment.”
- Any draft includes admission of fault/liability.
- Any draft offers incentive, discount, or compensation tied to a review.

### Evidence checklist by scenario
- Billing: invoice/estimate, line items, signed approvals.
- Service quality: work order notes, timestamps, technician assignment.
- Injury/damage: photos, incident report, insurance contacts.
- Discrimination: staff statements, CCTV availability, policy references.
- Suspected fake: internal appointment lookup (internal only), but public response must remain generic.

### Sample internal escalation message (copy/paste)
Subject: Review Escalation — [Level] — [Platform] — ReviewID [id]
Body:
- Summary: [1–2 sentences]
- Risk flags: [e.g., LegalThreat, PHI_Risk]
- Proposed public response mode: [hold_manual_only / needs_approval]
- Required owner: [Legal/Ops/Billing]
- SLA: [same-day/<24h]
- Evidence needed: [list]

## 4) Approved Response Templates v3 (Ready to paste)
Rules for all templates:
- Allowed variables: {BusinessName}, {TeamName}, {ContactMethod}, {ContactInfo}, {ManagerNameOptional}.
- Banned variables: reviewer name if unknown, staff full names, appointment date/time, price specifics unless verified and user-provided, medical details.
- Always adapt to platform character norms (keep < 900 chars where possible).

### A) Dentist Templates
DENT-01 Positive
“Thank you for the kind words. We’re glad you had a great experience with {BusinessName}. We appreciate you taking the time to share this.”

DENT-02 Neutral/Short
“Thanks for the feedback. If you’d like to share more details so we can improve, please reach us at {ContactMethod}: {ContactInfo}.”

DENT-03 Mild Negative (service/experience)
“Thank you for letting us know. We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and help—please contact us at {ContactMethod}: {ContactInfo} so we can look into it.”

DENT-04 Strong Negative (no PHI)
“We’re sorry to hear this and we’d like to address your concerns. Because we can’t discuss details publicly, please contact {BusinessName} at {ContactInfo} so a manager can review and follow up.”

DENT-05 Suspected Fake / Not a patient (no confirmation)
“Thank you for the review. We take feedback seriously, but we’re not able to locate the details needed to address this here. Please contact {BusinessName} at {ContactInfo} so we can look into your concern directly.”

DENT-06 Legal threat detected (MANUAL-ONLY HOLD TEMPLATE — do not post automatically)
“Thank you for sharing your concern. Please contact {BusinessName} at {ContactInfo} so we can route this to the appropriate team.”
(Only after legal approval; default is hold_manual_only.)

### B) Med Spa Templates
MED-01 Positive
“Thank you for your feedback. We’re happy you enjoyed your experience at {BusinessName} and appreciate you sharing this.”

MED-02 Neutral
“Thanks for the note. If you’re open to sharing more, please contact us at {ContactInfo} so we can better understand and improve.”

MED-03 Mild Negative
“We’re sorry to hear this didn’t meet expectations. We’d like to help—please reach out to {BusinessName} at {ContactInfo} so we can discuss privately.”

MED-04 Strong Negative (avoid outcomes)
“Thank you for bringing this to our attention. We can’t discuss specifics publicly, but we’d like to understand what happened and help. Please contact {BusinessName} at {ContactInfo}.”

MED-05 Suspected Fake
“Thank you for the feedback. We’d like to look into this further; please contact {BusinessName} at {ContactInfo} with any details you’re comfortable sharing privately.”

MED-06 Medical-outcome complaint (no guarantees, no confirmation)
“We’re sorry to hear you’re disappointed. We’d like to discuss your concerns directly and see what options may be available. Please contact {BusinessName} at {ContactInfo}.”

### C) HVAC Templates
HVAC-01 Positive
“Thank you for the review. We’re glad the team could help and we appreciate you choosing {BusinessName}.”

HVAC-02 Neutral
“Thanks for the feedback. If you can share more details, please contact us at {ContactInfo} so we can follow up.”

HVAC-03 Mild Negative (timeliness)
“Sorry to hear about the delay. We’re working to improve scheduling and communication. Please contact {BusinessName} at {ContactInfo} so we can review what happened.”

HVAC-04 Billing dispute
“Thank you for the feedback. We’d like to review the details and make sure everything is explained clearly. Please contact {BusinessName} at {ContactInfo} so our team can follow up.”

HVAC-05 Alleged damage (no admission)
“We’re sorry to hear this concern. We’d like to look into it and help. Please contact {BusinessName} at {ContactInfo} so we can gather details and follow up promptly.”

HVAC-06 Suspected fake
“Thanks for the review. We’d like to understand the situation but can’t confirm details here. Please contact {BusinessName} at {ContactInfo} so we can look into it.”

## 5) Go/No-Go Launch Gates (Objective Exit Criteria)
Launch can proceed only if ALL are true:
1) Posting gates enforced
- Legal-threat reviews must be blocked with post_status=blocked_manual_review.
- PHI-risk drafts must be blocked or forced to generic wording; no PHI confirmation allowed.

2) Audit logs complete
- For 10+ test reviews, logs include all required fields and events: draft_created, flagged (if any), approved, blocked (if any), posted/failed.

3) Weekly KPI reconciliation
- For the same test set, weekly report totals reconcile exactly with audit logs (posted vs approved vs blocked counts) and response time metrics exclude blocked_manual_review.

4) Template compliance
- Approved templates only; template_id recorded for templated responses.

### Evidence to attach for sign-off
- Exported audit log (CSV/JSON) for test run.
- Screenshots or exported weekly KPI report.
- Completed checklist with pass/fail and reviewer signature.

---
End of pack (v1.0).