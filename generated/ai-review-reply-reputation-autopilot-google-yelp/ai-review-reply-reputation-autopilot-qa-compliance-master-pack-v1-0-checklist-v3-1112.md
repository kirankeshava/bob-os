# AI Review Reply & Reputation Autopilot — QA/Compliance Master Pack v1.0 (Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + Acceptance Criteria)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:05:16.679Z

---

## 1) Scope & Goal
This Master Pack is the source of truth for brand safety, hallucination control, and platform-policy alignment for the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). It is designed for (a) engineering implementation (detectors, gates, logging), and (b) ops usage (review triage, escalation, safe responses). Business proof URL for customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support contact email: agent_bob_replit+review-bot@agentmail.to

Key outcomes required:
- Drafts are non-inflammatory, brand-safe, and do not admit liability.
- PHI/HIPAA-sensitive content is never confirmed.
- Medical/cosmetic outcome claims are avoided.
- Incentives/review gating are prohibited.
- Legal threats trigger manual-only hold (no posting).
- Audit trail is complete (who/what/when/version/why blocked).
- Weekly KPI report reconciles posted vs approved vs blocked.

## 2) Platform Policy Alignment (Testable)
### Google Business Profile (GBP) response constraints
DO:
- Be courteous, brief, and focused on resolution.
- Move sensitive issues offline.
- Avoid sharing personal data.
DON’T:
- Offer discounts or incentives for reviews.
- Reveal or confirm personal/health details.
- Harass, threaten, or retaliate.

### Yelp response constraints
DO:
- Keep responses factual and professional.
- Invite offline follow-up without offering anything of value.
DON’T:
- Ask for review changes/removal or imply Yelp will remove reviews.
- Offer incentives/discounts in connection with reviews.
- Attack competitors or accuse the reviewer of wrongdoing.

Universal prohibitions (GBP + Yelp):
- No incentives, no “we’ll give you X for updating your review,” no review gating.
- No personal data, no doxxing (names, phone, address, appointment time).
- No medical guarantees/outcome claims.
- No liability admission (“our fault,” “we caused,” “we were negligent”).

## 3) Risk Taxonomy & Required System Behavior
Risk flags (non-exhaustive) and required response modes:
- RISK_PHI: Any mention of medical records/chart/visit details, diagnosis/treatment specifics, or identifiable patient context.
  Required behavior: Use generic language; NEVER confirm they are a patient; if review requests clinical discussion, request offline contact. If reviewer includes explicit PHI, response must not repeat it.
- RISK_MEDICAL_CLAIM: Requests for results/outcome promises, “guarantee,” “cure,” “100%,” “permanent,” etc.
  Required behavior: Do not promise outcomes; keep to process and willingness to discuss concerns offline.
- RISK_LIABILITY: Allegations of damage/injury/property damage, negligence, unsafe work.
  Required behavior: No admissions; acknowledge concern; move offline; escalate internally.
- RISK_LEGAL_THREAT: “lawyer,” “attorney,” “lawsuit,” “sue,” “demand letter,” “court.”
  Required behavior: response_mode=HOLD_MANUAL_ONLY; post_status must be blocked (no posting via API or UI).
- RISK_INCENTIVE: “discount,” “free,” “gift card,” “refund if you change review,” etc.
  Required behavior: Remove incentive language; do not propose any exchange for review.
- RISK_COMPETITOR: Mentions of competitors, comparisons, “other company is better,” competitor accusations.
  Required behavior: Do not disparage competitors; keep response focused on the customer’s experience.
- RISK_HARASSMENT/HATE: slurs, threats, harassment.
  Required behavior: Stay calm; do not engage; move offline; consider hold depending on severity.

Mandatory gates:
1) Pre-generation gate: detect hard-stop scenarios to force template-only output or manual-only hold.
2) Pre-post gate: re-run detectors on final text; if any HOLD condition triggers, block posting.

## 4) Audit Trail — Required Log Fields & Events
Minimum log schema (per draft/decision):
- review_source (GBP|YELP)
- review_id
- business_id, location_id
- review_text_hash
- detected_risk_flags[]
- escalation_level (None|Ops|Billing|Clinical|Safety|Legal)
- response_mode (AUTO_DRAFT|TEMPLATE_ONLY|HOLD_MANUAL_ONLY)
- draft_version, prompt_version/model_version, detector_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- post_status (approved|posted|blocked_manual_review|failed)
- posted_timestamp (nullable)
- blocked_timestamp (nullable)
- hold_reason (nullable)
- final_response_text
- error_code (nullable)

Required events: draft_created, flagged, approved, blocked, posted, post_failed.

## 5) Brand-Safety & Compliance Checklist v3 (Operator Tick-Box)
Use this checklist before approving any response.

### A. Hard Stops (DO NOT POST)
- [ ] Legal threat present (sue/lawyer/lawsuit) → HOLD_MANUAL_ONLY + escalate Legal.
- [ ] PHI confirmation risk: response says/strongly implies “we reviewed your records/chart/visit/appointment” → block; rewrite generically.
- [ ] Response includes personal data (names, phone numbers, appointment times, addresses) → block; remove.
- [ ] Response includes incentives/discounts tied to review → block; remove.
- [ ] Response repeats reviewer’s sensitive medical details → block; remove.

### B. Must-Haves (every posted response)
- [ ] Professional, calm, non-argumentative tone.
- [ ] Thanks/acknowledgment line.
- [ ] Offline CTA (phone/email) with neutral language.
- [ ] No admissions of fault or liability.
- [ ] No promises of outcomes/results.
- [ ] No mention of platform enforcement (“Yelp will remove this”).

### C. Language Constraints (use/avoid)
Avoid:
- “We looked at your chart/records/visit”
- “We guarantee…” “100%” “permanent results”
- “It’s our fault / we caused…”
- “If you update your review, we’ll…”
- “You’re lying / fake review” (accusatory)
Prefer:
- “We’re sorry to hear you’re disappointed.”
- “We take feedback seriously.”
- “We’d like to learn more and see how we can help.”
- “Please contact us at [EMAIL]/[PHONE] so we can look into this privately.”

## 6) Escalation Playbook v3 (Common Scenarios)
All negative reviews require: acknowledge + invite offline + no admissions.

### 6.1 Billing/Price Dispute
Escalation: Billing (<24h)
Evidence: invoice, signed estimate/authorization, call notes
Public response: acknowledge confusion; invite offline; do not quote detailed pricing unless already public/verified.

### 6.2 Service Quality / Staff Rudeness
Escalation: Ops/GM (<24h)
Evidence: schedule, staff on duty, QA/call recordings if available
Response: apologize for experience (not fault), commitment to improve, offline contact.

### 6.3 Safety Incident / Injury / Property Damage (HVAC)
Escalation: Safety/Owner (<4h)
Evidence: job notes, photos, technician report, insurance info
Response: acknowledge concern; no fault admission; immediate offline contact.

### 6.4 Clinical Complaints (Dentist/Med Spa)
Escalation: Clinical lead (<24h); if severe allegation, Safety/Owner (<4h)
Evidence: consent forms, treatment plan, internal notes (do not reference publicly)
Response: do not confirm patient relationship; encourage direct contact.

### 6.5 HIPAA/PHI Mentioned by Reviewer
Escalation: Clinical + Compliance (<24h)
Do not post anything confirming care. Use generic phrasing; do not repeat PHI.

### 6.6 Suspected Fake Review
Escalation: Ops (<24h)
Response: do not accuse; state you can’t locate details and invite offline contact; consider platform report separately.

### 6.7 Discrimination/Harassment Claims
Escalation: Owner/HR same-day
Response: neutral, serious, invite offline; no debate.

### 6.8 Legal Threats
Escalation: Legal same-day
System: HOLD_MANUAL_ONLY; no posting.

Internal ticket title conventions:
- [GBP/Yelp] [Location] [EscalationLevel] [Short reason] — e.g., “Yelp | Downtown | Legal | Threat to sue over alleged injury”

## 7) Approved Response Templates v3 (Per Vertical)
Rules for all templates:
- Allowed variables: {BusinessName}, {FirstNameOrTeam} (Team only), {City}, {SupportEmail}=agent_bob_replit+review-bot@agentmail.to, {SupportPhone} (if provided by business), {GenericServiceCategory} (e.g., “dental care,” “aesthetic services,” “heating & cooling service”).
- Disallowed variables: reviewer name, staff name, appointment date/time, procedure type, diagnosis, prices (unless already publicly stated/verified and approved), any record/visit confirmation.
- Offline CTA must be present.

### Dentist Templates
DENT-01 Positive
“Thank you for the kind words. We’re glad you had a great experience with {BusinessName}. If there’s anything we can do to support your ongoing dental care, please reach out anytime at {SupportEmail}.”

DENT-02 Neutral/Short
“Thank you for taking the time to leave feedback. If you’d like to share more details so we can keep improving, please contact our team at {SupportEmail}.”

DENT-03 Mild Negative (service experience)
“We’re sorry to hear your experience didn’t meet expectations. We take feedback seriously and would like to learn more. Please email us at {SupportEmail} so we can follow up privately.”

DENT-04 Strong Negative (no liability admission)
“Thank you for sharing your concerns. We understand how frustrating this can feel. Because we can’t address specifics here, we’d like to connect directly and see how we can help—please contact {BusinessName} at {SupportEmail}.”

DENT-05 PHI-sensitive / clinical details mentioned by reviewer
“Thank you for your feedback. To protect privacy, we can’t discuss any details here, but we’d like to understand your concerns and assist. Please contact our office at {SupportEmail} so we can follow up privately.”

DENT-06 Suspected Fake (non-accusatory)
“Thank you for your review. We’re unable to identify the situation based on the information provided, but we’d like to look into it. Please contact us at {SupportEmail} with any details you’re comfortable sharing.”

### Med Spa Templates
MSPA-01 Positive
“Thank you for the great review. We appreciate you choosing {BusinessName}. If you ever have questions about our services, please reach us at {SupportEmail}.”

MSPA-02 Neutral
“Thank you for the feedback. We’re always working to improve. If you’re open to sharing more, please email {SupportEmail}.”

MSPA-03 Mild Negative
“We’re sorry to hear this wasn’t the experience you hoped for. We’d like to learn more and help if we can—please contact {SupportEmail} so we can follow up privately.”

MSPA-04 Strong Negative (no outcomes/guarantees)
“Thank you for sharing your concerns. We take them seriously. We can’t discuss details here, but we’d like to connect directly to understand what happened and address your feedback—please email {SupportEmail}.”

MSPA-05 Medical/outcome claim bait
“Thanks for your message. Results can vary and we want to make sure your questions are addressed appropriately. Please contact {SupportEmail} so our team can follow up privately.”

MSPA-06 Suspected Fake
“Thank you for your review. We’d like to look into this, but we can’t match it to a situation based on what’s posted. Please email {SupportEmail} so we can assist.”

### HVAC Templates
HVAC-01 Positive
“Thank you for the review and for choosing {BusinessName}. We’re glad we could help with your heating & cooling needs. If you ever need anything, contact us at {SupportEmail}.”

HVAC-02 Neutral
“Thanks for the feedback. If you’re willing to share more details so we can improve, please email {SupportEmail}.”

HVAC-03 Mild Negative (delay/no-show)
“We’re sorry for the inconvenience and appreciate you letting us know. Please contact {SupportEmail} so we can look into the situation and follow up directly.”

HVAC-04 Strong Negative (alleged damage; no admission)
“Thank you for bringing this to our attention. We take concerns like this seriously and want to understand what happened. Please contact {SupportEmail} so we can follow up privately.”

HVAC-05 Safety concern
“We’re sorry to hear about your concern. Safety is extremely important to us. Please contact {SupportEmail} as soon as possible so we can follow up directly.”

HVAC-06 Suspected Fake
“Thank you for your review. We’d like to investigate, but we can’t identify the job from the details posted. Please email {SupportEmail} so we can look into it.”

## 8) Acceptance Criteria (Engineering + Ops)
A response is eligible to post only if:
- response_mode != HOLD_MANUAL_ONLY
- No Hard Stops triggered
- Offline CTA present
- Audit logs include required fields/events
- Pre-post detector pass confirms final_response_text is clean

Weekly KPI report must reconcile:
- posted_count + blocked_count + failed_count == approved_count (within same reporting window)
- median/avg response time computed from first draft creation to posted_timestamp (or approval to posted; specify and keep consistent)

## 9) Go/No-Go Exit Criteria
GO if all are true:
- Detector unit tests pass (legal threat hold; PHI confirmation block; incentive removal; liability language warnings).
- Manual-only holds cannot be posted via API or UI.
- Audit log exports show complete event chain for at least 10 mixed-risk reviews.
- Weekly report matches reconciliation rules on a test dataset.

NO-GO if any are true:
- Any legal-threat review can be posted.
- Any response confirms patient/customer relationship or references records/visit.
- Any incentive language appears in a posted response.
- Missing audit fields prevent traceability.

End of Master Pack v1.0.