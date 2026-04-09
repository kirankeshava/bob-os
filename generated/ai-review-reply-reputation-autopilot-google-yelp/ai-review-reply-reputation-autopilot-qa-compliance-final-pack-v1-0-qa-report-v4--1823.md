# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:19:24.156Z

---

## 0) Scope + Goal
This pack is the source-of-truth for brand safety, hallucination control, and platform policy alignment for the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). It covers: (1) response safety constraints, (2) escalation and ‘manual-only hold’ rules, (3) audit trail requirements, (4) weekly KPI/report correctness checks, and (5) approved response templates per vertical.

Business legitimacy references for customers/internal docs:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support/ops email: agent_bob_replit+review-bot@agentmail.to

---

## 1) QA Test Report v4 (Summary)
### 1.1 Test corpus
- Core suite: 45 reviews (15 Dentist, 15 Med Spa, 15 HVAC)
- Yelp addendum: 6 Yelp-specific edge cases
Total: 51 test inputs.

### 1.2 What was tested end-to-end
A) Draft quality: tone, clarity, professionalism
B) Brand safety & hallucination control: no fabricated details, no false promises, no unverifiable specifics
C) Policy compliance: Google Business Profile + Yelp response norms (no incentives, no review gating, no removal promises, no competitor disparagement)
D) Escalation triggers: correct classification + required offline CTA
E) Posting gate behavior: ‘manual-only hold’ must block posting
F) Audit trail and reporting: required log fields + weekly KPI math and reconciliation

### 1.3 Final results
- Core suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)

### 1.4 Closed high-risk defects (now prevented by guardrails)
1) PHI/medical record confirmation risk: prevented via hard block phrases + forced generic wording
2) Legal threat scenarios: forced ‘manual-only hold’ + escalation_level=Legal
3) Incentive/discount-adjacent language: blocked phrases list + template wording constraints
4) Competitor disparagement/comparison: disallow mention of competitors as inferior; redirect to offline
5) Liability admission: “we messed up / our fault” replaced with non-admission empathy + investigation language

### 1.5 Acceptance criteria (must be true in production)
- If review contains PHI/HIPAA indicators OR patient-identifying details OR explicit “records/chart/visit”, the system MUST:
  - Avoid confirming any relationship/visit/treatment
  - Use a generic response template
  - Escalation_level >= Privacy
  - If PHI is explicit, set post_status='blocked_manual_review'
- If review contains legal threat indicators (“lawyer/attorney/sue/lawsuit/court/settlement”), the system MUST:
  - Set response_mode='HOLD_MANUAL_ONLY'
  - escalation_level='Legal'
  - post_status='blocked_manual_review'
  - Log detector_version and hold_reason
- For all negative/neutral reviews, responses MUST include an offline resolution CTA (phone/email/DM), never request incentives, and never promise removal.

---

## 2) Brand-Safety Checklist v3 (Tick-Box)
Use this before approving ANY response for posting.

### 2.1 Universal “Must include”
- [ ] Thank the reviewer (neutral-professional)
- [ ] Acknowledge sentiment without arguing
- [ ] Offer to resolve offline (CTA to contact business)
- [ ] Avoid specifics unless explicitly present in the review AND safe to repeat
- [ ] Keep it short (2–6 sentences typical)

### 2.2 Universal “Hard NO” (block or rewrite)
- [ ] Admitting liability: “our fault”, “we caused”, “we were negligent”, “we made you sick”, “we broke/damaged your…”
- [ ] Medical outcome guarantees: “guaranteed results”, “you will be cured”, “permanent”, “100% safe”
- [ ] PHI confirmation: “we reviewed your chart/records/visit/appointment”, “as your dentist/doctor”, “when you came in on…”
- [ ] Incentives or quid-pro-quo: “discount”, “free”, “gift card”, “refund if you change/remove review”, “we’ll compensate for a 5-star review”
- [ ] Review gating: “only leave a review if you’re satisfied”
- [ ] Doxxing: staff last names, personal phone numbers, addresses, patient identifiers
- [ ] Threats/retaliation: “we’ll report you”, “we’ll sue you”
- [ ] Competitor disparagement: “other clinics are scams”, “unlike X competitor…”
- [ ] Promising removal or platform action: “we’ll get this removed”, “Yelp will take it down”

### 2.3 Required safe alternatives (copy guidance)
- Replace liability admission with: “We’re sorry to hear you had this experience. We take concerns seriously and want to look into what happened.”
- Replace PHI confirmation with: “For privacy reasons, we can’t discuss details here. Please contact our office so we can help.”
- Replace medical guarantees with: “Results can vary. We’d like to understand your situation and discuss options.”

### 2.4 Platform notes
Google Business Profile:
- Do: be helpful, polite, concise, resolve offline
- Don’t: solicit incentives, reveal private info, harass, spam

Yelp:
- Do: keep it professional, avoid back-and-forth escalation
- Don’t: ask for or incentivize reviews, accuse reviewers of fraud publicly, discuss moderation/removal

---

## 3) Escalation Playbook v3 (Scenarios, Routing, SLAs)
### 3.1 Escalation levels
- L0: Normal (postable with standard template)
- L1: Service recovery (ops follow-up required; still postable)
- L2: Sensitive (billing disputes, staff misconduct allegations) – postable only with manager approval
- L3: Privacy/Safety (PHI, harassment, threats of violence) – generally hold/manual; limited generic response if safe
- Legal: Any lawsuit/attorney threat – manual-only hold; do not post without legal/owner sign-off

### 3.2 Routing + SLAs
- Safety incident (injury, dangerous conditions): Owner/GM <4h; Ops <24h
- Discrimination/harassment allegations: Owner/HR same day
- Billing/refund disputes: Billing lead <24h
- PHI/HIPAA content: Privacy lead/Owner same day
- Legal threats: Legal/Owner same day (manual-only hold)

### 3.3 Evidence collection checklist (internal)
- Screenshot of review + timestamp + platform + reviewer handle
- Internal job/order/appointment lookup only if permitted by policy and privacy rules
- Any call recordings/dispatch notes/photos (HVAC)
- Written timeline of events and staff on shift

### 3.4 Do-not-post conditions
- Review includes explicit PHI or identifies a patient or procedure in a way that could confirm relationship
- Review threatens legal action or claims an attorney is involved
- Review includes credible threats of violence
- Ongoing safety investigation where public statement could increase liability

### 3.5 Public response patterns (safe)
- Legal threat: “We take your concern seriously. We can’t discuss this here. Please contact our office directly so we can route your message appropriately.” (ONLY if approved to post; otherwise hold)
- PHI: “For privacy reasons, we can’t address details here. Please contact us directly so we can help.”
- Suspected fake: “We take feedback seriously. We can’t locate details matching this description. Please contact us directly with more information so we can look into it.”

---

## 4) Audit Trail + Posting/Approval Requirements
### 4.1 Required log schema (minimum)
- review_source (google|yelp)
- review_id
- business_id / location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level
- response_mode (AUTO_DRAFT | REQUIRE_MANAGER_APPROVAL | HOLD_MANUAL_ONLY)
- hold_reason (nullable)
- detector_version
- prompt_version / template_id
- draft_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- blocked_timestamp (nullable)
- unblocker_id (nullable)
- posted_timestamp (nullable)
- post_status (posted|failed|blocked_manual_review)
- error_code (nullable)
- final_response_text

### 4.2 Required audit events
- draft_created
- flagged
- approved
- blocked
- posted
- post_failed

### 4.3 Posting gate (non-negotiable)
If response_mode='HOLD_MANUAL_ONLY' OR post_status='blocked_manual_review', posting MUST be prevented via both API and UI paths.

---

## 5) Weekly Reputation KPI Definitions (for report accuracy)
- Response rate = (# reviews with posted responses) / (total # reviews in period)
- Median first-response time = median(posted_timestamp - review_created_timestamp)
- SLA compliance % = % responses within configured SLA (e.g., 24h)
- Rating trend (7/30 day) = avg_rating(period) vs prior period
- Sentiment buckets = rule-based or model-based classification; must be consistent and versioned
- Escalations count = count by escalation_level + reason
- Reconciliation: approved vs posted vs blocked must sum correctly; blocked_manual_review must appear as separate line item

---

## 6) Approved Response Templates v3 (Per Vertical)
Rules for ALL templates:
- Allowed variables: {BusinessName}, {City}, {ContactMethod} (phone/email), {SignatureRole}
- BANNED variables: staff full names, appointment dates, treatment names, prices unless explicitly mentioned by reviewer and verified safe
- Always include offline CTA; never offer incentives; never confirm PHI.

### 6.1 Dentist Templates (DENT-*)
DENT-POS-01 (Positive):
“Thank you for the kind words. We’re glad you had a great experience at {BusinessName}. If there’s anything we can do to support you in the future, please reach out at {ContactMethod}.”

DENT-NEU-01 (Neutral/short):
“Thank you for the feedback. We appreciate you taking the time to share it. If you’re open to it, please contact us at {ContactMethod} so we can learn more.”

DENT-NEG-MILD-01 (Wait time/communication):
“We’re sorry to hear this didn’t meet expectations. We’re always working to improve scheduling and communication. Please contact us at {ContactMethod} so we can understand what happened and help.”

DENT-NEG-STRONG-01 (Quality complaint; no liability admission):
“Thank you for sharing your concern. We take feedback seriously and would like to look into this. For privacy reasons, we can’t discuss details here—please contact us at {ContactMethod} so we can assist.”

DENT-PHI-01 (PHI/records mention; generic + escalate):
“For privacy reasons, we can’t address details in a public forum. Please contact our office at {ContactMethod} and we’ll make sure your message is directed appropriately.”

DENT-FAKE-01 (Suspected fake):
“We take feedback seriously, and we’d like to look into this. We can’t confirm any details here—please contact us at {ContactMethod} with more information so we can review.”

### 6.2 Med Spa Templates (SPA-*)
SPA-POS-01:
“Thank you for the great review. We’re happy to hear you enjoyed your experience at {BusinessName}. If you have any questions or need anything, contact us at {ContactMethod}.”

SPA-NEU-01:
“Thanks for sharing your feedback. We’re always looking for ways to improve. Please reach out at {ContactMethod} so we can learn more.”

SPA-NEG-MILD-01 (Front desk/service tone):
“We’re sorry to hear this. Providing a welcoming experience is important to us. Please contact us at {ContactMethod} so we can better understand and make it right.”

SPA-NEG-STRONG-01 (Results dissatisfaction; no guarantees):
“Thank you for sharing your concern. We’d like to understand what happened and discuss options. Results can vary, and we can’t discuss specifics here—please contact us at {ContactMethod} so we can help.”

SPA-PHI-01:
“For privacy reasons, we can’t discuss details publicly. Please contact {BusinessName} at {ContactMethod} and we’ll assist you directly.”

SPA-FAKE-01:
“We take all feedback seriously and would like to review this. Please contact us at {ContactMethod} with more details so we can look into it.”

### 6.3 HVAC Templates (HVAC-*)
HVAC-POS-01:
“Thank you for your review. We’re glad our team could help. If you ever need anything else, please reach out at {ContactMethod}.”

HVAC-NEU-01:
“Thanks for the feedback. We appreciate the opportunity to improve. Please contact us at {ContactMethod} so we can learn more.”

HVAC-NEG-MILD-01 (Late arrival/scheduling):
“We’re sorry for the inconvenience. We aim to communicate clearly about timing, and we’ll review what happened. Please contact us at {ContactMethod} so we can follow up.”

HVAC-NEG-STRONG-01 (Damage allegation; no liability admission):
“Thank you for raising this. We take concerns seriously and want to look into it. We can’t address details here—please contact us at {ContactMethod} so we can review and respond appropriately.”

HVAC-BILL-01 (Billing dispute; no pricing debate):
“We’re sorry to hear about the billing concern. We’d like to review the details and help resolve it. Please contact us at {ContactMethod} so our team can assist.”

HVAC-FAKE-01:
“We take feedback seriously and would like to investigate. Please contact us at {ContactMethod} with additional details so we can review.”

---

## 7) Go/No-Go Launch Gates (Compliance)
GO only if all are true:
1) All detectors pass unit tests (PHI, legal threats, incentives, competitor disparagement, liability admission)
2) HOLD_MANUAL_ONLY blocks posting across API and UI (verified)
3) Audit logs emit required schema + events for draft/flag/approve/block/post
4) Weekly KPI report reconciles posted vs approved vs blocked_manual_review exactly
5) Templates v3 are the only selectable defaults per vertical + scenario

If any gate fails: NO-GO; restrict to “draft-only” mode until corrected.
