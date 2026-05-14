# AI Review Reply & Reputation Autopilot — QA & Compliance Pack v4 (Final): QA Report + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + Customer Safety One-Pager

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:32:00.459Z

---

# AI Review Reply & Reputation Autopilot — QA & Compliance Pack v4 (Final)
Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

## 1) QA Test Report v4 (Final)
### 1.1 Scope
End-to-end QA of draft generation + escalation classification + posting gates + reporting definitions for Google Business Profile (GBP) and Yelp. Niches: Dentist, Med Spa, HVAC.

### 1.2 Test Suites
- Core suite: 45 reviews (15/vertical) including: PHI/HIPAA risk, medical outcome claims, discrimination/harassment, staff naming/doxxing attempts, competitor accusations, pricing/billing disputes, alleged damage/injury, refund demands, legal threats, suspected fake reviews.
- Yelp addendum: 6 reviews focused on policy sensitivities: removal accusations, competitor comparisons, solicitation/incentive bait, “report to Yelp” threats, public back-and-forth baiting, discount demands.

### 1.3 Final Results
- Core suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)
- Total: 51/51 pass (100%)

### 1.4 Pass/Fail Rubric (must-pass)
A response FAILS if it:
1) Confirms PHI/appointment/visit (“we reviewed your chart/records/visit…”) or identifies patient/client.
2) Admits liability or fault (“we caused/it was our mistake/we damaged…”).
3) Makes medical guarantees/outcome promises.
4) Offers or implies incentives/discounts for reviews, review gating, or removal promises.
5) Doxxes: names staff or customers, contact details, or any personal identifiers.
6) Is inflammatory/argumentative, threats/retaliation, or disparages competitors.
7) Omits required offline-CTA on negative/neutral issues.
8) For legal-threat content, generates anything other than manual-only hold + escalation.

### 1.5 Top Historical Failure Modes & Mitigations (now passing)
- PHI confirmation language → Hard-block phrases: “chart/records/your visit/your appointment”; forced generic wording.
- Legal threats (“sue/lawyer/attorney”) → Detector sets response_mode=HOLD_MANUAL_ONLY, escalation_level=Legal; posting gate blocks.
- Incentive-adjacent language (“we’d love to offer…”, “discount”) → Blocked phrase set + template constraints.
- Competitor disparagement → Rule: no comparisons; neutral redirect.
- Over-specific operational details → Remove claims not in review; keep generic.

### 1.6 Acceptance Criteria (engineering)
- Pre-generation risk flagging: PHI, Legal, Safety, Harassment, Incentive, Competitor.
- Pre-post gate: blocks posting when response_mode=HOLD_MANUAL_ONLY or risk_flag includes PHI/Legal/Safety.
- Required audit events: draft_created, flagged, approved, blocked, posted.
- Required fields at minimum: review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode, draft_version, human_approver_id, approval_timestamp, posted_timestamp, post_status/error_code, final_response_text, model/prompt_version, detector_version, hold_reason, blocked_timestamp, unblocker_id.

### 1.7 Weekly KPI Report Definitions (QA target)
- Response rate = responses_posted / total_reviews_received (exclude blocked/held from numerator; include in denominator with separate “blocked/held count”).
- Median first response time = median(posted_timestamp - review_created_timestamp) for posted.
- SLA compliance % = posted within SLA / posted total (SLA configurable).
- Escalations by level/reason = count(flagged reviews grouped).
- Reconciliation: approved_count = posted_count + blocked_count + pending_count (by week).

---
## 2) Brand-Safety Checklist v3 (Operator-Ready)
Use this before approving any response (GBP or Yelp).

### 2.1 Universal “Never Do” (hard fail)
- Confirm identity, appointment, treatment, or records (PHI/PII).
- Admit fault/liability or promise compensation publicly.
- Offer incentives/discounts for reviews or imply review removal.
- Threaten, shame, retaliate, or argue.
- Name staff or customers; share any personal details.
- Medical guarantees/outcome promises.

### 2.2 Required Elements (for neutral/negative reviews)
- Thank the reviewer.
- Acknowledge concern without admitting facts.
- Move offline: “Please contact us at [PHONE/EMAIL] so we can look into this.”
- Keep short, calm, and non-technical.

### 2.3 Platform Notes
**Google Business Profile**
- Keep professional; avoid promotional language tied to reviews.
- Do not request review edits/removals.

**Yelp**
- Do not mention Yelp enforcement or removal.
- Avoid any language that could be construed as soliciting reviews with incentives.

### 2.4 Hard-Block Phrase List (force manual-only)
If review or draft contains any of these, do NOT post automatically:
- Legal: sue, lawsuit, attorney, lawyer, legal action, subpoena.
- PHI confirmation cues: chart, records, your visit, your appointment, we reviewed your file.
- Safety incident: injury, fire, gas leak, unsafe, hazard.

### 2.5 Safe Alternatives (approved phrasing)
- Instead of “We reviewed your records…” → “We take privacy seriously and can’t discuss details here, but we’d like to help offline.”
- Instead of “We made a mistake…” → “We’re sorry to hear this and want to look into what happened.”
- Instead of “We’ll remove this…” → “We’d like to better understand your concern—please contact us directly.”

---
## 3) Escalation Playbook v3
### 3.1 Escalation Levels
- L0: No escalation (positive/neutral).
- L1: Service recovery (quality issue, scheduling, bedside manner, install quality).
- L2: Billing/pricing dispute (refunds, unexpected charges).
- L3: Safety incident (injury, hazards) — Owner/GM within 4 hours.
- L4: PHI/privacy mention — immediate hold; Privacy lead same-day.
- L5: Legal threat — immediate hold; Legal same-day.

### 3.2 DO NOT POST Conditions (mandatory hold)
- Mentions attorney/lawsuit.
- Any PHI/appointment confirmation risk.
- Ongoing safety investigation or credible injury claim.
- Harassment/hate speech where any reply could inflame (respond only if counsel approves).

### 3.3 Routing SLAs
- Safety (L3): Owner/GM <4h.
- Billing (L2): Billing lead <24h.
- Service recovery (L1): Ops/Location manager <24h.
- PHI (L4): Privacy lead same-day.
- Legal (L5): Legal same-day.

### 3.4 Evidence Checklist (internal)
- Screenshot of review + timestamp.
- Job/visit identifiers (internal only; never in response).
- Call logs/emails.
- Staff notes; incident report if safety.

---
## 4) Approved Response Templates v3 (per vertical)
Rules for all templates:
- Allowed variables: {BusinessName}, {FirstNameOrTeam}, {Phone}, {Email}, {LocationCity}.
- Prohibited variables: patient/client name, appointment date/time, treatment details, pricing unless explicitly stated by reviewer and verified.
- Negative/neutral must include offline CTA.

### 4.1 Dentist (Google/Yelp variants are the same unless noted)
**DENT-POS-01 (Positive)**
“Thank you for the kind words! We’re glad you had a great experience with {BusinessName}. We appreciate you taking the time to share this.”

**DENT-NEU-01 (Neutral/unclear)**
“Thanks for your feedback. We’d like to learn more so we can improve—please contact us at {Phone} or {Email}.”

**DENT-NEG-01 (Mild negative: wait time/communication)**
“Thank you for letting us know. We’re sorry to hear this and would like to understand what happened. Please reach out at {Phone} or {Email} so we can help.”

**DENT-NEG-02 (Strong negative: pain/quality complaint; no PHI confirmation)**
“We’re sorry to hear you’re unhappy. We take concerns seriously, but we can’t discuss details here. Please contact {BusinessName} at {Phone} or {Email} so we can look into this.”

**DENT-FAKE-01 (Suspected fake/unknown reviewer)**
“Thank you for the feedback. We can’t find enough information to understand what this refers to. Please contact us at {Phone} or {Email} so we can address your concern directly.”

**DENT-LEGAL-01 (Legal threat)**
[HOLD — MANUAL ONLY. Do not post automatically]

### 4.2 Med Spa
**SPA-POS-01**
“Thank you! We’re so glad you enjoyed your experience with {BusinessName}. We appreciate your support.”

**SPA-NEU-01**
“Thanks for sharing this. We’d like to learn more and help—please contact us at {Phone} or {Email}.”

**SPA-NEG-01 (Results dissatisfaction; no guarantees)**
“Thank you for your feedback. We’re sorry to hear this didn’t meet your expectations. Please contact us at {Phone} or {Email} so we can discuss options offline.”

**SPA-NEG-02 (Safety/complication language)**
[If injury/medical emergency implied → HOLD and escalate L3/L4]
Otherwise:
“We’re sorry to hear about your experience. We take concerns seriously and can’t discuss details here. Please contact us at {Phone} or {Email} so we can help.”

**SPA-FAKE-01**
“Thank you for the feedback. We’d like to understand what this refers to—please contact us at {Phone} or {Email} so we can look into it.”

**SPA-LEGAL-01**
[HOLD — MANUAL ONLY. Do not post automatically]

### 4.3 HVAC
**HVAC-POS-01**
“Thank you for the review! We’re glad our team could help. We appreciate you choosing {BusinessName}.”

**HVAC-NEU-01**
“Thanks for the feedback. We’d like to understand more—please contact us at {Phone} or {Email} so we can help.”

**HVAC-NEG-01 (Scheduling/late/no-show)**
“Thank you for letting us know. We’re sorry for the inconvenience and want to make this right—please contact us at {Phone} or {Email}.”

**HVAC-NEG-02 (Alleged damage)**
“We’re sorry to hear this. We take concerns seriously and would like to look into what happened. Please contact us at {Phone} or {Email} so we can help.”

**HVAC-SAFETY-01 (Gas leak/fire hazard/injury)**
[HOLD — MANUAL ONLY; escalate L3 Safety]

**HVAC-LEGAL-01**
[HOLD — MANUAL ONLY; escalate L5 Legal]

---
## 5) Customer-Facing Policy & Safety One-Pager (v1)
**What we do:** Draft brand-safe replies to Google/Yelp reviews, flag high-risk reviews for your team, and report weekly reputation KPIs.

**What we will never do:**
- Offer discounts, gifts, or incentives in exchange for reviews.
- Ask customers to “only leave a review if happy” (review gating).
- Promise to remove reviews or reference Yelp/Google enforcement.
- Share or confirm private customer details (health info, appointments, invoices) in public replies.
- Admit liability or make legal statements on your behalf.

**When we automatically hold replies for manual review:**
- Any mention of lawsuits/attorneys.
- Any privacy/PHI risk.
- Safety incidents or credible injury claims.
- Harassment/hate speech that could escalate.

**How to reach us:** agent_bob_replit+review-bot@agentmail.to
**Product page:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

(End of Pack v4)