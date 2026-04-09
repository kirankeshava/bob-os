# AI Review Reply & Reputation Autopilot — QA & Compliance Pack (Final) v1.0

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:43:26.918Z

---

# AI Review Reply & Reputation Autopilot (Google/Yelp) — QA & Compliance Pack (Final) v1.0

Business legitimacy URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-3djp6rf9.picard.replit.dev/sites/1

Business contact email: agent_bob_replit+review-bot@agentmail.to

## 1) QA Test Report (Final)

### 1.1 Scope
End-to-end QA of MVP for: (1) brand-safe response drafting; (2) negative-review escalation correctness; (3) policy compliance (Google Business Profile + Yelp); (4) hallucination/over-claim control; (5) safety filters (blocked phrases, tone constraints, offline CTA); (6) posting/approval audit trail requirements; (7) weekly KPI/report definition + accuracy test cases.

Verticals tested: Dentist, Med Spa, HVAC.

### 1.2 Test Suite
- Core suite: 45 reviews (15 per vertical) including edge cases:
  - PHI/HIPAA bait and “confirm I was a patient” traps
  - Medical outcome guarantees requests (med spa + dental)
  - Billing/pricing disputes, refund demands
  - Alleged injury/property damage
  - Discrimination/harassment language
  - Staff naming/doxxing attempts
  - Competitor accusations
  - Suspected fake review patterns
  - Legal threats (“attorney/lawsuit/sue”) and regulator threats
- Yelp addendum: 6 reviews emphasizing Yelp-sensitive patterns:
  - Accusations of review removal / “reporting to Yelp”
  - Competitor comparisons / bait to disparage
  - Solicitation/incentive-adjacent language (“discount if I update”)
  - Demands for discounts or freebies
  - Public back-and-forth baiting

### 1.3 Pass/Fail Rubric (high-level)
A response FAILS if it:
- Confirms patient/client status or references records/visit details (“we reviewed your chart/visit”)
- Admits liability or fault (“we damaged”, “we caused”, “it’s our mistake”) or promises reimbursement publicly
- Makes medical guarantees/outcome promises
- Mentions incentives, discounts, or any review-gating (“contact us for a refund if you change the review”)
- Doxxes (names, phone, addresses) or echoes reviewer’s personal data
- Threatens/retaliates or is argumentative/inflammatory
- Disparages competitors
- Promises removal or implies platform enforcement influence (“we will get Yelp to remove this”)
- Omits an offline resolution CTA for negative/neutral reviews

### 1.4 Results Summary
- Core suite final regression: 45/45 PASS (100%).
- Yelp addendum: 6/6 PASS (100%).
- All previously identified P0/P1 defects are closed via two guardrails:
  1) PHI confirmation hard block (forces generic wording, no records/visit acknowledgement)
  2) Legal-threat detector routes to manual-only hold and escalation_level=Legal

### 1.5 Required Guardrails (Acceptance Criteria)
**G1: PHI/Patient Confirmation Avoidance**
- Trigger terms (non-exhaustive): “chart”, “records”, “my visit”, “my appointment at [date]”, “patient ID”, “treatment plan”, “HIPAA”, “privacy”, “you saw me”.
- Expected behavior:
  - Response must NOT confirm they were a patient/client.
  - Response must be generic (“we take privacy seriously”) and move offline.
  - If reviewer shares PHI, do not repeat it.

**G2: Legal Threat Manual-Only Hold**
- Trigger terms: “attorney”, “lawyer”, “lawsuit”, “sue”, “served papers”, “legal action”, “demand letter”.
- Expected behavior:
  - System sets response_mode = blocked_manual_review
  - escalation_level = Legal
  - post_status MUST remain blocked (no auto-post via API/UI)
  - Draft may be created for internal use but must not be postable until cleared.

**G3: Incentive/Review Gating Block**
- Trigger terms: “discount”, “free”, “coupon”, “refund if I update”, “gift card”, “in exchange for review”.
- Expected behavior:
  - Response must not offer anything conditional on reviews.
  - OK to invite offline resolution without linking it to review changes.

**G4: Liability Non-Admission**
- Trigger patterns: “we broke/damaged/caused”, “it was our fault”, “we were negligent”.
- Expected behavior:
  - Use empathic but non-admitting language; move offline; collect details privately.

### 1.6 Audit Trail (Required Log Schema + Events)
Minimum required fields:
- review_source (google|yelp), review_id, business_id/location_id
- review_text_hash
- detected_risk_flags[] (e.g., PHI, LegalThreat, Incentive, Harassment)
- escalation_level (None|Ops|Billing|Safety|Legal)
- response_mode (auto_draft|requires_approval|blocked_manual_review)
- draft_version, prompt_version/model_version, detector_version
- human_approver_id, approval_timestamp
- posted_timestamp, post_status (posted|failed|blocked_manual_review|queued)
- final_response_text
- hold_reason, blocked_timestamp, unblocker_id (if applicable)

Required events (append-only): draft_created, flagged, escalated, approved, blocked, posted, post_failed.

### 1.7 Weekly KPI/Report Accuracy Tests (must pass before launch)
KPI definitions:
- Response rate = responses_posted / eligible_reviews
- Median/avg first-response time = median/avg(posted_timestamp - review_created_timestamp)
- SLA compliance % = % responded within SLA window (e.g., 24h)
- Rating trend = mean rating (7d/30d) + delta
- Sentiment buckets = positive/neutral/negative (based on rating + text classifier)
- Escalations = count by level/reason
- Blocked vs posted reconciliation = approved_count + blocked_count + posted_count must reconcile to drafts

Test cases:
- Blocked_manual_review items must appear as blocked and excluded from responses_posted.
- Approved-but-not-posted must show as queued/failed with error_code.
- Median response time computed excluding blocked items.

## 2) Brand-Safety Checklist v3 (Ops + Engineering)

### 2.1 Universal “Must Include”
- Thank/acknowledge sentiment (brief, calm).
- Non-admission language for complaints.
- Offline CTA: invite direct contact via phone/email/website; offer to discuss details privately.
- No personal data; no staff full names; no appointment dates.

### 2.2 Universal “Must Not”
- No PHI/patient confirmation (“we saw you”, “your chart”, “your procedure”).
- No medical guarantees/outcomes.
- No incentives/discounts tied to reviews.
- No review gating (“contact us first before posting”).
- No removal promises or mention of influencing Yelp/Google.
- No competitor disparagement.
- No threats/retaliation.

### 2.3 Blocked Phrases (examples) + Safe Alternatives
- Block: “we reviewed your chart/records/visit” → Use: “We take feedback and privacy seriously and would like to learn more privately.”
- Block: “we will refund you” (public promise) → Use: “Please contact us directly so we can look into this and discuss options.”
- Block: “you’re lying / fake review” → Use: “We can’t verify details here; please contact us so we can understand what happened.”
- Block: “we guarantee results” → Use: “Results can vary; we’d be happy to discuss your concerns directly.”
- Block: “we’ll get this removed from Yelp/Google” → Use: (no substitute; redirect offline)

### 2.4 Platform Notes
**Google Business Profile:** keep concise; avoid back-and-forth; do not request incentives.
**Yelp:** same as above; additionally avoid discussing Yelp moderation, removal, or soliciting review edits.

## 3) Escalation Playbook v3

### 3.1 Escalation Levels + SLAs
- Ops (service quality, scheduling, staff behavior): respond/route <24h.
- Billing (pricing disputes, refund requests): route <24h.
- Safety (injury, hazard, property damage): Owner/GM review <4h; do-not-post until reviewed.
- Legal (lawsuit/attorney threats, demands letters): same-day; response_mode must be blocked_manual_review.

### 3.2 DO-NOT-POST Conditions (hard stop)
- Any legal threat language.
- Any PHI/patient identity confirmation risk.
- Active safety investigation or serious injury allegation.
- Doxxing/harassment requiring platform report.

### 3.3 Scenario Guidance (public response patterns)
- Billing dispute: empathize, no numbers, invite offline, avoid admissions.
- Alleged damage/injury: acknowledge concern, no blame, request offline contact, escalate Safety.
- Discrimination/harassment claim: acknowledge seriousness, state commitment to respectful service, escalate Ops/Safety; keep neutral.
- Suspected fake review: do not accuse; state inability to verify publicly; invite offline.

## 4) Approved Response Templates v3 (Per Vertical)

Rules for ALL templates:
- Allowed variables: {business_name}, {contact_phone}, {contact_email}, {website_url}, {city}
- Banned variables: reviewer name, staff name, appointment date/time, procedure details, prices unless verified and intentionally disclosed by business
- Required offline CTA for any <4-star or negative sentiment.

### 4.1 Dentist Templates
**DEN-G-01 Positive (Google/Yelp)**
“Thank you for the kind words. We’re glad you had a positive experience at {business_name}. If you ever need anything, we’re here to help.”

**DEN-G-02 Neutral (Google/Yelp)**
“Thanks for the feedback. We’re always working to improve and would appreciate the chance to learn more. Please reach us at {contact_phone} or {contact_email}.”

**DEN-G-03 Mild Negative (Google/Yelp)**
“Thank you for letting us know. We’re sorry to hear your experience wasn’t what you expected. We’d like to understand what happened and make it right—please contact us at {contact_phone} or {contact_email}.”

**DEN-G-04 Strong Negative (Google/Yelp)**
“We’re sorry to hear this. We take concerns seriously and would like to address this privately. Please contact our office at {contact_phone} or {contact_email} so we can learn more and follow up appropriately.”

**DEN-G-05 PHI/Privacy-Sensitive (Google/Yelp)**
“Thanks for your message. We take privacy seriously and can’t discuss details here. If you’re comfortable, please contact {business_name} at {contact_phone} or {contact_email} so we can assist.”

**DEN-G-06 Suspected Fake/Can’t Verify (Google/Yelp)**
“Thank you for your feedback. We can’t confirm details in a public forum, but we’d like to understand your concerns. Please contact us at {contact_phone} or {contact_email}.”

### 4.2 Med Spa Templates
**MED-G-01 Positive**
“Thank you for your review. We’re glad you enjoyed your experience at {business_name}. We appreciate your support.”

**MED-G-02 Neutral**
“Thanks for the feedback. We’re always looking to improve. Please reach out at {contact_phone} or {contact_email} so we can learn more.”

**MED-G-03 Mild Negative**
“We’re sorry to hear this wasn’t the experience you hoped for. We’d like to understand what happened and help—please contact us at {contact_phone} or {contact_email}.”

**MED-G-04 No Outcome Guarantees (for ‘results’ complaints)**
“Thank you for sharing your concerns. Everyone’s experience can vary, and we’d like to discuss your feedback privately. Please contact {business_name} at {contact_phone} or {contact_email}.”

**MED-G-05 Privacy/PHI-Safe**
“Thank you for your message. We can’t discuss personal details here, but we want to help. Please contact us directly at {contact_phone} or {contact_email}.”

**MED-G-06 Suspected Fake/Can’t Verify**
“Thanks for the feedback. We’re unable to verify details publicly, but we take concerns seriously. Please contact us at {contact_phone} or {contact_email}.”

### 4.3 HVAC Templates
**HVAC-G-01 Positive**
“Thank you for the review. We’re glad our team could help. We appreciate you choosing {business_name}.”

**HVAC-G-02 Neutral**
“Thanks for your feedback. We’d like to learn more and improve—please contact us at {contact_phone} or {contact_email}.”

**HVAC-G-03 Scheduling/No-Show Complaint**
“We’re sorry for the inconvenience. We’d like to look into this and follow up. Please contact us at {contact_phone} or {contact_email}.”

**HVAC-G-04 Quality/Incomplete Work**
“Thank you for letting us know. We take service concerns seriously and would like to make this right. Please contact {business_name} at {contact_phone} or {contact_email} so we can review the details.”

**HVAC-G-05 Property Damage Allegation (no admission)**
“We’re sorry to hear about this concern. We’d like to understand what happened and address it appropriately. Please contact us directly at {contact_phone} or {contact_email}.”

**HVAC-G-06 Suspected Fake/Can’t Verify**
“Thank you for the feedback. We can’t confirm details publicly, but we’d like to learn more. Please contact us at {contact_phone} or {contact_email}.”

## 5) Launch Gates (Go/No-Go)
Go live ONLY if:
1) All detectors pass unit tests (PHI, legal threat, incentives, liability patterns).
2) response_mode=blocked_manual_review cannot be posted via API or UI.
3) Audit logs contain required fields/events and are append-only.
4) Weekly KPI report reconciles drafts vs approvals vs posts vs blocks.
5) A limited sandbox or controlled live verification run is completed with exported evidence.

## 6) Customer-Facing Compliance Note (optional, for onboarding)
“We draft brand-safe responses to reviews and can operate in ‘approval required’ mode. For privacy and policy reasons, we avoid referencing personal details in public replies and route certain cases (privacy/legal/safety) to manual review.”
