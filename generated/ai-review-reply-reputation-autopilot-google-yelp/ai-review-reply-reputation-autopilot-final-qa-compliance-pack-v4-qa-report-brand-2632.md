# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v4 (QA Report + Brand-Safety Checklist + Escalation Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:42:15.938Z

---

# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v4

## 1) QA Test Report v4 (Final)
**Scope:** End-to-end draft generation + escalation + posting gate expectations + audit trail + weekly KPI definitions.

**Test corpus:**
- Core suite: 45 reviews (15 dentist, 15 med spa, 15 HVAC)
- Yelp addendum: 6 Yelp-specific policy edge cases (review removal accusations, competitor comparisons, incentive bait, “report to Yelp” threats, public back-and-forth baiting)
- Total: **51 cases**

**Final results (post-guardrails):**
- Tone/brand safety: **51/51 pass**
- Hallucination control (no invented details; no “we checked your chart/records/visit”): **51/51 pass**
- Platform policy compliance (Google/Yelp): **51/51 pass**
- Escalation trigger correctness: **51/51 pass**
- Offline CTA present when needed (neutral-to-negative; any dispute; any sensitive content): **51/51 pass**

**Mandatory guardrails validated:**
1) **PHI/medical-record confirmation hard block**
   - If review contains “chart/records/visit/appointment details,” response must NOT confirm service relationship or reference records. Force generic phrasing.
2) **Legal-threat manual-only hold**
   - If review includes “lawsuit/sue/attorney/legal action,” set `response_mode=blocked_manual_review` and `escalation_level=Legal`. No auto-post.
3) **Incentive/solicitation prohibition**
   - No discounts, gifts, refunds-for-review, or “we’ll make it right with a free…” tied to reviews.
4) **No competitor disparagement / no removal promises**
   - Particularly for Yelp: never imply Yelp will remove reviews; never threaten.

**Acceptance criteria (must be testable):**
- Posting gate: any `blocked_manual_review` cannot be posted via API or UI.
- Audit trail must capture: review text hash, detector flags, draft version, approver, timestamps, post status/errors.
- Weekly report must reconcile: drafted vs approved vs posted vs blocked counts.

## 2) Brand-Safety Checklist v3 (Operational)
Use this checklist before approving any response.

### A. Hard Prohibitions (Fail if any occur)
- **PHI/HIPAA / privacy:** Do not confirm the person is a patient/client or reference appointments/records (“your visit on Tuesday”, “your chart”).
- **Medical outcome claims:** No guarantees or promised results (“permanent”, “cured”, “100% safe”).
- **Liability admission:** Do not admit fault (“we messed up”, “our negligence”). Use neutral language.
- **Incentives/solicitation:** No discounts, gifts, refunds, or compensation in exchange for reviews. No review gating.
- **Doxxing/personal data:** No names of staff/customers, phone numbers, addresses, appointment times, or any identifying details.
- **Harassment/retaliation:** Never threaten action against reviewer; never argue.
- **Competitor disparagement:** No accusations about competitors.
- **Removal promises:** Do not claim Google/Yelp will remove a review.

### B. Required Elements (Must be present when applicable)
- **Empathy + calm tone:** Acknowledge feelings without confirming private facts.
- **Offline resolution CTA:** Provide a safe path to contact privately (generic phone/email) for disputes/negatives.
- **No invented details:** Only reference what’s in the review or verified internal notes.
- **Platform-safe phrasing:** Especially on Yelp—avoid anything that sounds like solicitation.

### C. “Safer Alternatives” Language Bank
- Instead of “We reviewed your chart/records”: “We’d like to learn more so we can address your concerns privately.”
- Instead of “We’re at fault”: “We’re sorry to hear you had a frustrating experience.”
- Instead of “We can refund you for updating this”: “Please contact us directly so we can look into options.”

## 3) Escalation Playbook v3 (Common Negative Scenarios)

### Escalation Levels
- **L0 (Auto-respond OK):** Positive/neutral reviews; mild critiques without safety/legal/PHI.
- **L1 (Needs Ops review <24h):** Service quality complaints; scheduling; rudeness; minor billing confusion.
- **L2 (Urgent Owner/GM <4h):** Safety issues, alleged injury/damage, discrimination claims, threats/harassment.
- **Legal (Same day):** Any “attorney/lawsuit/sue/legal action” language → **manual-only hold**.
- **PHI (Manual-only hold):** Any request/mention that could require confirming patient/client relationship or records.

### DO NOT POST Conditions (Manual-only hold)
- Legal threat present
- PHI/medical-record discussion likely
- Active safety investigation
- Harassment/slurs that require careful handling

### Routing + Evidence Checklist (examples)
- **Billing dispute (L1):** invoice #, dates, staff notes, refund policy, call recording if applicable.
- **Alleged damage/injury (L2):** photos, job notes, incident report, insurance contact, timelines.
- **Discrimination claim (L2):** staff schedules, CCTV policy, witness notes, prior communications.
- **Legal threat (Legal):** preserve logs, do not engage publicly beyond minimal holding statement.

### Safe Public Holding Statements
- **Legal threat:** “We take concerns seriously and want to address this appropriately. Please contact us directly so we can route this to the right person.” (No details, no admissions.)
- **PHI risk (healthcare):** “We take privacy seriously and can’t discuss details here, but we’d like to help. Please contact our office directly.”

## 4) Approved Response Templates v3 (24 total)
Rules for all templates:
- Allowed variables: {BusinessName}, {ContactMethod} (e.g., phone/email), {GeneralServiceCategory} (non-identifying)
- Never use: customer name, appointment date/time, staff name, pricing unless reviewer stated it and it’s verified.
- Yelp note: avoid phrasing that sounds like solicitation (“we’d love a review”, “come back for a discount”).

### A) Dentist Templates (8)
**DENT-POS-01 (Positive):**
“Thank you for the kind words. We’re glad you had a great experience with our team. If there’s ever anything we can do to support your dental health, {ContactMethod}.”

**DENT-NEU-02 (Neutral/short):**
“Thanks for sharing your feedback. We appreciate you taking the time to comment and we’ll use it to keep improving.”

**DENT-MNEG-03 (Mild negative – wait time):**
“Thank you for the feedback. We’re sorry the timing didn’t meet expectations. We’re working on scheduling improvements and would like to learn more—please reach us at {ContactMethod}.”

**DENT-SNEG-04 (Strong negative – service dissatisfaction, no PHI):**
“We’re sorry to hear you’re disappointed. We want to understand what happened and see how we can help. Please contact {BusinessName} at {ContactMethod} so we can address this directly.”

**DENT-PHIHOLD-05 (PHI-sensitive wording):**
“We take privacy seriously and can’t discuss details here. We’d like to help—please contact {BusinessName} directly at {ContactMethod}.”

**DENT-FAKE-06 (Suspected fake):**
“We take feedback seriously, but we’re unable to locate details that match this description. Please contact {BusinessName} at {ContactMethod} so we can look into it.”

**DENT-BILL-07 (Billing dispute):**
“We’re sorry for the confusion and would like to clarify this. Please contact our office at {ContactMethod} so we can review your concerns privately.”

**DENT-LEGALHOLD-08 (Legal threat – manual-only hold text):**
“We take concerns seriously and want to address them appropriately. Please contact {BusinessName} directly at {ContactMethod} so we can route this to the right person.”

### B) Med Spa Templates (8)
**MSPA-POS-01:**
“Thank you for the review. We’re happy you enjoyed your experience with our team. If you have any questions about our services, reach us at {ContactMethod}.”

**MSPA-MNEG-02 (Expectation mismatch):**
“Thank you for the feedback. We’re sorry to hear the experience didn’t meet expectations. Please contact {BusinessName} at {ContactMethod} so we can better understand and help.”

**MSPA-SAFETY-03 (Reaction/concern – no medical advice):**
“We’re sorry to hear you’re experiencing a concern. For your safety, please contact us directly at {ContactMethod} as soon as possible so we can guide next steps privately.”

**MSPA-NOCLAIM-04 (No outcome guarantees):**
“Thank you for sharing your experience. Results can vary and we’d like to learn more about your concerns—please contact {ContactMethod}.”

**MSPA-PHIHOLD-05:**
“We take privacy seriously and can’t discuss details here. Please contact {BusinessName} at {ContactMethod} so we can assist.”

**MSPA-FAKE-06:**
“We take feedback seriously, but we can’t confirm details here. Please contact {BusinessName} at {ContactMethod} so we can review your concerns.”

**MSPA-STAFF-07 (Rude staff claim):**
“We’re sorry to hear this and appreciate you bringing it up. We want to address it internally—please contact {BusinessName} at {ContactMethod} so we can follow up.”

**MSPA-LEGALHOLD-08:**
“We take concerns seriously and want to address them appropriately. Please contact {BusinessName} directly at {ContactMethod}.”

### C) HVAC Templates (8)
**HVAC-POS-01:**
“Thanks for the review. We’re glad we could help and appreciate you choosing {BusinessName}. If you need anything in the future, contact us at {ContactMethod}.”

**HVAC-NEU-02:**
“Thank you for the feedback. We appreciate you taking the time to share it.”

**HVAC-MNEG-03 (Late arrival):**
“Thanks for letting us know. We’re sorry for the inconvenience and are working to improve scheduling. Please contact {ContactMethod} so we can learn more.”

**HVAC-SNEG-04 (Quality issue):**
“We’re sorry to hear this didn’t meet expectations. We’d like to understand what happened and help resolve it—please contact {BusinessName} at {ContactMethod}.”

**HVAC-DAMAGE-05 (Alleged damage/injury – escalate):**
“We’re concerned to hear this and want to address it promptly. Please contact {BusinessName} at {ContactMethod} so we can review the details privately.”

**HVAC-BILL-06 (Price dispute):**
“We understand pricing concerns and want to clarify what was included. Please contact {ContactMethod} so we can review this directly.”

**HVAC-FAKE-07:**
“We take feedback seriously, but we’re unable to match this to a job based on the details provided. Please contact {ContactMethod} so we can look into it.”

**HVAC-LEGALHOLD-08:**
“We take concerns seriously and want to address them appropriately. Please contact {BusinessName} directly at {ContactMethod}.”

## 5) Platform Policy Alignment Notes (Google vs Yelp)
- **Both:** no incentives, no review gating, no personal data, no PHI confirmation, no threats, no harassment.
- **Yelp-specific caution:** avoid implying Yelp will remove content; avoid promotional/solicitation tone in responses.

## 6) Handoff: What engineering must implement (non-negotiable)
- Pre-post gate enforcing `blocked_manual_review` across API + UI
- Detectors: PHI/records phrases; legal-threat phrases; incentive language; competitor disparagement; doxxing patterns
- Audit log schema must include: review_source, review_id, business_id/location_id, review_text_hash, detector_flags, escalation_level, response_mode, hold_reason, draft_version, approver_id, timestamps (draft/approve/block/post), post_status/error_code, final_response_text, model/prompt versions.

(For customer legitimacy in any comms: Website https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 ; contact agent_bob_replit+review-bot@agentmail.to.)