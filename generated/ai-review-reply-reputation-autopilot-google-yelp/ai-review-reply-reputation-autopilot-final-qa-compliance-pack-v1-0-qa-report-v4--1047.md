# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:34:06.366Z

---

## 1) Scope & Objective
This pack QA-validates the MVP end-to-end for brand safety, hallucination control, and platform policy alignment for automated review responses on **Google Business Profile (GBP)** and **Yelp**. It defines what the system must do (acceptance criteria), how it must behave under risk (manual-only holds), and what copy is approved per vertical.

**Customer legitimacy references (for any customer-facing docs):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

## 2) QA Test Report v4 (Summary)
### 2.1 Test suites executed
- **Core suite:** 45 reviews (15 Dentist, 15 Med Spa, 15 HVAC), including high-risk edge cases.
- **Yelp addendum:** 6 Yelp-specific edge cases.

### 2.2 Final results
- Core suite: **45/45 PASS (100%)**
- Yelp addendum: **6/6 PASS (100%)**
- P0/P1 defects: **0 open**

### 2.3 What “PASS” means (required outcomes)
A draft response is considered compliant only if it satisfies all of:
1) No admission of fault/liability.
2) No confirmation of PHI/medical relationship; no “we reviewed your chart/records/visit” language.
3) No medical outcome guarantees (e.g., “permanent,” “guaranteed,” “cured”).
4) No incentives/discounts tied to reviews; no solicitation of positive reviews.
5) No doxxing/personal data (customer or staff full names, addresses, appointment times, etc.).
6) Non-inflammatory, non-argumentative, de-escalating tone.
7) Clear offline CTA (phone/email) and invitation to resolve privately.
8) For legal threats/safety incidents/PHI: system sets **manual-only hold** and blocks posting.

### 2.4 Top failure modes observed historically (now mitigated)
These were previously seen in early drafts and are now blocked by rules/templates:
- PHI-adjacent acknowledgements (“we remember your visit,” “your procedure,” “your records”).
- Over-specific incident narratives (hallucinated details).
- Defensive/combative phrasing (“that’s not true,” “you’re mistaken”).
- “We’ll get Yelp/Google to remove this” or implying platform enforcement.
- Discount/compensation language that reads like an incentive for review changes.
- Legal-threat scenarios mistakenly receiving a public response rather than a hold.

### 2.5 Acceptance criteria (hard requirements)
**Detectors / risk flags must exist and be logged:**
- PHI/HIPAA risk (Dentist/Med Spa): triggers on “chart, records, visit, appointment, procedure, treatment, diagnosis, meds, x-ray, sedation, injection, before/after,” etc.
- Medical outcome claim risk (Dentist/Med Spa): “guarantee, permanent, cure, 100%,” etc.
- Legal threat: “attorney, lawyer, lawsuit, sue, subpoena, demand letter, court,” etc.
- Safety incident: “injury, fire, gas leak, electrocution, bleeding, infection,” etc.
- Harassment/hate/discrimination claims.
- Doxxing attempt: address/phone/email/last names.
- Incentives/solicitation: “discount, free, gift card, refund if you delete,” etc.

**Posting gates:**
- If escalation_level in {Legal, Safety, PHI} ⇒ **post_status = blocked_manual_review** and no API/UI path can post.
- Human approval required for any response containing sensitive content categories.

**Audit trail minimum schema (must be complete on every review):**
- review_source, review_id, business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level
- response_mode: {auto_draft, manual_only_hold}
- draft_version, template_id (if used)
- human_approver_id (nullable only if blocked)
- approval_timestamp
- posted_timestamp
- post_status / error_code
- final_response_text
- model_version, prompt_version, detector_version
- hold_reason, blocked_timestamp, unblocker_id (when applicable)

**Weekly report KPI reconciliation:**
- Responses Approved ≠ Responses Posted (must report blocked/held separately).
- KPI definitions must be deterministic:
  - response_rate = responded_reviews / total_reviews
  - median_first_response_time
  - SLA_compliance_%
  - rating trend (7/30 days)
  - sentiment buckets (rule-based)
  - escalations by level/reason
  - unresolved escalation aging

## 3) Brand-Safety Checklist v3 (Operational Tick-Box)
Use this before approving or posting any response.

### 3.1 Universal “Never do” rules (GBP + Yelp)
- [ ] Do not confirm the reviewer was a customer/patient (no “your visit,” “your appointment,” “we treated you”).
- [ ] Do not reference charts/records/x-rays/diagnoses/procedures (PHI risk).
- [ ] Do not admit fault or liability (“we messed up,” “our technician broke,” “we are at fault”).
- [ ] Do not speculate facts not in the review (no invented dates, staff actions, or services).
- [ ] Do not threaten, shame, or argue with the reviewer.
- [ ] Do not include private data (addresses, phone numbers, emails, last names; no staff naming unless pre-approved and safe).
- [ ] Do not offer incentives for reviews or review changes (discounts, free services, refunds conditioned on deletion).
- [ ] Do not promise platform removal or mention “we’ll report this to Yelp/Google to remove it.”

### 3.2 Required elements (every response)
- [ ] Thank them (even if negative) and keep a calm tone.
- [ ] Acknowledge experience at a high level without confirming relationship.
- [ ] Invite offline resolution with generic contact route.
- [ ] If negative: offer to look into it privately; avoid detail.

### 3.3 Mandatory offline CTAs (safe variants)
Approved CTAs:
- “Please contact our office so we can learn more and work toward a resolution.”
- “We’d like to understand what happened—please reach us at [PHONE] or [EMAIL].”

### 3.4 Blocked phrase list (hard blocks)
- PHI confirmation: “your chart,” “your records,” “we reviewed your records,” “your visit,” “your appointment,” “as your provider,” “as your dentist,” “patient.”
- Liability admission: “we are at fault,” “we caused,” “we broke,” “our mistake,” “negligence.”
- Medical guarantees: “guaranteed,” “permanent results,” “cured,” “100%,” “no risk.”
- Incentives: “discount,” “coupon,” “free,” “gift card,” “refund if you remove/edit.”
- Platform enforcement: “Yelp will remove,” “Google will take it down,” “we reported you to Yelp.”

### 3.5 Yelp vs Google quick policy alignment
- Yelp: avoid implying review removal, avoid “review gating” language, avoid asking for positive reviews.
- Google: same general principles; also keep responses professional and non-sensitive.

## 4) Escalation Playbook v3 (Common Negative Scenarios)
### 4.1 Escalation levels
- **L0 (No escalation):** positive/neutral.
- **L1 (Ops follow-up):** mild dissatisfaction, scheduling issues.
- **L2 (Manager):** strong negative, repeated issues, billing disputes.
- **L3 (Safety/PHI):** injury claims, infection claims, PHI mentioned.
- **L4 (Legal):** threats of lawsuit/attorney/court.

### 4.2 SLAs & routing
- L1 → Ops/Front Desk: respond within 24h.
- L2 → Owner/GM: respond within 12–24h.
- L3 Safety/PHI → Owner/GM within 4h; **do-not-post** until reviewed.
- L4 Legal → Legal/Owner same day; **manual-only hold; do-not-post**.

### 4.3 Evidence to collect (internal only)
- Billing dispute: invoice, scope, signed approvals.
- Service complaint: work order, technician notes, timestamps.
- Safety: incident report, photos, follow-up actions.
- PHI: confirm reviewer identity internally; never in public reply.
- Suspected fake: service logs showing no matching record; do not state “fake” as fact publicly.

### 4.4 DO-NOT-POST conditions (must block)
- Any legal threat language.
- Any PHI/medical record references.
- Active safety investigation.
- Harassment/hate content where response could escalate.

### 4.5 Approved response posture by scenario
- Billing dispute: empathetic + invite offline; no numbers unless verified and necessary.
- Alleged damage: no admission; apologize for frustration; offline investigation.
- Medical dissatisfaction: no outcome guarantees; no PHI acknowledgement.
- Suspected fake: polite, invite offline, state inability to locate details “based on the information provided” without accusing.

## 5) Approved Response Templates v3 (Per Vertical)
**Allowed variables across all templates:** [BUSINESS_NAME], [CITY], [PHONE], [EMAIL].
**Forbidden variables:** reviewer name, staff name (unless explicitly allowed), appointment dates/times, procedure names, diagnosis, prices unless verified and necessary.

### 5.1 Dentist (GBP/Yelp)
**DENT-POS-01 (Positive)**
“Thank you for taking the time to share your feedback. We appreciate your kind words and are glad you had a great experience with [BUSINESS_NAME]. If there’s ever anything we can do to help, please reach us at [PHONE] or [EMAIL].”

**DENT-NEU-02 (Neutral/short)**
“Thanks for your feedback. We’re always working to improve and appreciate you sharing your experience. If you’re open to it, please contact [BUSINESS_NAME] at [PHONE] or [EMAIL] so we can learn more.”

**DENT-MNEG-03 (Mild negative: wait time/service)**
“Thank you for letting us know. We’re sorry to hear your experience didn’t meet expectations. We’d like to understand what happened and see how we can make things right—please contact us at [PHONE] or [EMAIL].”

**DENT-SNEG-04 (Strong negative / dissatisfaction)**
“We’re sorry to hear you’re disappointed. We take concerns seriously and would like to learn more so we can review this internally. Please reach [BUSINESS_NAME] at [PHONE] or [EMAIL].”

**DENT-PHI-05 (PHI risk present → safe generic)**
“Thank you for your message. To protect privacy, we can’t address details here, but we’d like to learn more and help. Please contact [BUSINESS_NAME] at [PHONE] or [EMAIL] so we can follow up directly.”

**DENT-FAKE-06 (Suspected fake)**
“Thank you for the feedback. We’d like to look into this, but we can’t identify the situation based on the information provided here. Please contact [BUSINESS_NAME] at [PHONE] or [EMAIL] so we can better understand and assist.”

### 5.2 Med Spa (GBP/Yelp)
**MSPA-POS-01**
“Thank you for your kind feedback. We appreciate you taking the time to share your experience with [BUSINESS_NAME]. If you have any questions or would like to connect, please reach us at [PHONE] or [EMAIL].”

**MSPA-NEU-02**
“Thanks for sharing your feedback. We’re always working to improve. If you’re willing, please contact [BUSINESS_NAME] at [PHONE] or [EMAIL] so we can learn more.”

**MSPA-MNEG-03**
“We’re sorry to hear your visit wasn’t what you hoped for. We’d like to understand more and work toward a resolution—please contact us at [PHONE] or [EMAIL].”

**MSPA-SNEG-04**
“Thank you for letting us know. We take this seriously and would like to review what happened. Please reach [BUSINESS_NAME] at [PHONE] or [EMAIL] so we can follow up privately.”

**MSPA-MEDCLAIM-05 (outcome claim bait)**
“Thanks for your feedback. Everyone’s experience can vary, and we’d like to understand your concerns. Please contact [BUSINESS_NAME] at [PHONE] or [EMAIL] so we can discuss privately.”

**MSPA-FAKE-06**
“Thank you for sharing your concerns. We’d like to look into this, but we can’t verify the details from this post alone. Please contact [BUSINESS_NAME] at [PHONE] or [EMAIL] so we can help.”

### 5.3 HVAC (GBP/Yelp)
**HVAC-POS-01**
“Thank you for the great review. We appreciate you choosing [BUSINESS_NAME] and are glad our team could help. If you ever need anything, contact us at [PHONE] or [EMAIL].”

**HVAC-NEU-02**
“Thanks for your feedback. We’re always working to improve. Please contact [BUSINESS_NAME] at [PHONE] or [EMAIL] so we can learn more.”

**HVAC-MNEG-03 (Scheduling/communication)**
“We’re sorry to hear this. Reliable communication matters to us, and we’d like to understand what happened. Please reach out at [PHONE] or [EMAIL] so we can follow up.”

**HVAC-DAMAGE-04 (Alleged damage)**
“Thank you for bringing this to our attention. We’re sorry for the frustration and would like to look into it. Please contact [BUSINESS_NAME] at [PHONE] or [EMAIL] so we can review the situation directly.”

**HVAC-SAFETY-05 (Safety incident language)**
“Thank you for letting us know. We take safety concerns seriously. Please contact [BUSINESS_NAME] at [PHONE] or [EMAIL] as soon as possible so we can follow up directly.”

**HVAC-FAKE-06**
“Thanks for the feedback. We’d like to investigate, but we can’t identify the job from the information provided here. Please contact [BUSINESS_NAME] at [PHONE] or [EMAIL] so we can assist.”

## 6) Go/No-Go Criteria (Launch Gate)
**GO only if all are true:**
- Manual-only hold blocks posting through every path (API + UI) and writes post_status=blocked_manual_review.
- Audit logs contain all required fields and events.
- Weekly KPI report reconciles approved vs posted vs blocked counts.
- Spot-check 10 mixed reviews across verticals: 0 policy violations, 100% offline CTA present.

**NO-GO if any are true:**
- Any PHI/legal/safety content can be posted automatically.
- Any response includes incentives, platform removal promises, liability admission, or PHI confirmation.
- Missing or non-deterministic reporting calculations.

## 7) What we still need from owner/engineering (non-monetary)
- Confirm whether a sandbox/test environment exists for GBP/Yelp posting.
- If none, select a single low-risk internal location to run a limited live verification (3–5 responses max) using the runbook, capturing audit logs + KPI outputs as evidence.
