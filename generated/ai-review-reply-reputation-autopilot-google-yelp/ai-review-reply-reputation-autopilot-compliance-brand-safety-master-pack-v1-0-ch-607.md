# AI Review Reply & Reputation Autopilot — Compliance & Brand-Safety Master Pack v1.0 (Checklist + Escalation Playbook + Approved Templates + KPI QA Appendix)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:43:39.466Z

---

# AI Review Reply & Reputation Autopilot — Compliance & Brand-Safety Master Pack v1.0

Scope: Google Business Profile (GBP) and Yelp review responses. Goal: generate brand-safe drafts, prevent policy violations, escalate high-risk negatives, maintain a verifiable approval/posting audit trail, and produce accurate weekly reputation KPIs.

Primary risk controls:
1) Pre-generation detectors (PHI/medical claims/legal threats/incentives/doxxing/harassment/competitor disparagement).
2) Response-mode gating: Auto-draft allowed vs Manual-only hold (blocked_manual_review).
3) Response verification: blocked phrases + required offline-CTA + no liability admission.
4) Audit logging: draft_created, flagged, approved, blocked, posted, error.

Business legitimacy references for outreach/ops docs:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

---

## 1) Brand-Safety Checklist v3 (tick-box)

### A. Universal “Never Do” (GBP + Yelp)
- [ ] Do NOT offer incentives/discounts in exchange for reviews (no “coupon,” “discount,” “free,” “gift card,” “we’ll make it right with X% off” tied to review).
- [ ] Do NOT ask only happy customers to review (no review gating).
- [ ] Do NOT admit liability or fault (avoid “we caused,” “our mistake,” “we damaged,” “we failed to”). Use neutral: “we’re sorry to hear you had this experience.”
- [ ] Do NOT confirm customer identity, appointment, treatment, diagnosis, or any record/visit details (PHI/PII). Hard-block phrases like: “chart,” “records,” “your visit,” “your procedure,” “we reviewed your file.”
- [ ] Do NOT include personal data (addresses, phone numbers, emails of staff/customers). No last names of staff.
- [ ] Do NOT threaten, retaliate, or argue. No accusations (“you’re lying”), no hostile tone.
- [ ] Do NOT disparage competitors or compare (“unlike X clinic”).
- [ ] Do NOT promise outcomes (medical/cosmetic) or guarantees.
- [ ] Do NOT claim you reported someone to Yelp/Google or that you can remove reviews.

### B. Required Elements for any public response
- [ ] Polite opener + gratitude (even for critical feedback).
- [ ] Empathy statement without admission: “We’re sorry to hear this was your impression/experience.”
- [ ] Move to offline resolution: provide a contact path (email/phone) without requesting private details publicly.
- [ ] No specifics that could confirm identity/relationship.
- [ ] Keep concise; no back-and-forth.

### C. Mandatory response-mode gating (pre-post)
Auto-draft ALLOWED when: positive/neutral/mild negative; no PHI; no legal threat; no safety incident; no hate/harassment.
Manual-only hold (post_status = blocked_manual_review) when any of:
- [ ] Legal threat keywords: sue/lawsuit/attorney/legal action/court/settlement.
- [ ] Safety incident / injury / property damage claim.
- [ ] PHI/medical specifics (dentist/med spa) or “we reviewed your records/visit.”
- [ ] Harassment/hate speech or threats.
- [ ] Doxxing attempts (names + identifiable details).
- [ ] Extortion (“refund or I’ll post more”).

### D. Blocked phrase examples (with safe alternatives)
- Block: “We reviewed your chart/records/visit…” → Safe: “We can’t discuss details here, but we’d like to connect directly to understand what happened.”
- Block: “It was our fault / we made a mistake / we damaged…” → Safe: “We take concerns seriously and want to look into this promptly.”
- Block: “We can remove this review / Yelp will take it down…” → Safe: “We’d like to address your concerns directly; please contact us.”
- Block: “Next time we’ll give you a discount…” → Safe: “We’d appreciate the chance to make things right offline.”

---

## 2) Escalation Playbook v3 (scenarios, routing, SLAs)

### Escalation Levels
- L0: Auto-draft + optional approval.
- L1: Manager review required (service dissatisfaction, billing confusion).
- L2: Urgent ops/escalation (safety concern, alleged discrimination, fraud/chargeback).
- L3: Legal manual-only hold (legal threats, severe allegations, active investigation).

### Routing + SLA (recommended)
- Service quality / rude staff / delays: Ops Manager (respond <24h)
- Billing/pricing dispute/refund demand: Billing/Owner (respond <24h)
- Safety issue/injury/property damage: Owner/GM (acknowledge <4h; investigate)
- Discrimination claim/harassment: Owner/HR (acknowledge <4h; document)
- PHI/HIPAA-adjacent content (dentist/med spa): Compliance lead/Owner (same-day)
- Legal threat (“attorney,” “sue”): Legal/Owner (same-day) → DO NOT POST publicly until reviewed
- Suspected fake/competitor review: Owner/Marketing (respond <24h) and consider platform flagging (no promises in public)

### Evidence checklist (internal, never public)
- Review URL/source, timestamp, reviewer handle
- Job/appointment reference if available internally
- Staff on duty, notes, call recordings (if lawful), invoices
- Photos (HVAC damage claims), before/after documentation (med spa) stored securely

### DO NOT POST conditions (always manual-only hold)
- Mentions of medical records/diagnosis/treatment specifics
- Any litigation threats or attorney involvement
- Safety incident with injury/alleged negligence
- Threats/harassment/hate speech escalation

---

## 3) Approved Response Templates v3 (per vertical)

Rules for variables:
Allowed: {business_name}, {first_name_initial} (optional), {support_email}, {support_phone}, {location_city}.
Banned: customer full name, appointment dates, procedure names, diagnosis/treatment details, pricing not already stated by reviewer, staff last names.

### 3A) Dentist (GBP/Yelp)

DENT-01 Positive
“Thank you for the kind words. We’re glad you had a great experience with our team at {business_name}. If there’s ever anything we can do to help, please reach us at {support_email}.”

DENT-02 Neutral/short compliment
“Thanks for sharing your feedback. We appreciate you choosing {business_name} and hope to see you again. If you have questions, email us at {support_email}.”

DENT-03 Mild negative (wait time / communication)
“Thank you for the feedback. We’re sorry to hear this visit didn’t meet your expectations. We can’t discuss details here, but we’d like to learn more and help—please contact us at {support_email}.”

DENT-04 Strong negative (no PHI; service dissatisfaction)
“We’re sorry to hear you felt disappointed. We take concerns seriously and want to look into what happened. Please contact {business_name} at {support_email} so we can try to make this right.”

DENT-05 Suspected fake/unknown reviewer
“Thank you for posting. We take feedback seriously, but we’re unable to locate details from your post. Please contact us at {support_email} so we can understand the situation and address your concerns.”

DENT-06 Manual-only hold (PHI/legal/safety) — public response NOT posted
Internal note: Set escalation_level=Legal or Compliance; post_status=blocked_manual_review; generate draft only for internal review.

### 3B) Med Spa (GBP/Yelp)

SPA-01 Positive
“Thank you for the great review. We’re happy you enjoyed your experience at {business_name}. If you ever need anything, reach us at {support_email}.”

SPA-02 Neutral
“Thanks for your feedback. We appreciate you choosing {business_name}. If you’d like to share more, please email {support_email}.”

SPA-03 Mild negative (front desk / scheduling)
“Thank you for letting us know. We’re sorry this was frustrating. We can’t discuss details here, but we’d like to help—please contact us at {support_email}.”

SPA-04 Strong negative (results dissatisfaction — no claims)
“We’re sorry to hear you’re unhappy. We take your concerns seriously and would like to speak directly to understand what happened. Please contact {business_name} at {support_email}.”

SPA-05 Suspected fake/competitor
“Thanks for sharing. We want to take this seriously, but we don’t have enough information from the post to investigate. Please reach us at {support_email} so we can look into it.”

SPA-06 Manual-only hold (medical specifics/PHI/legal threat)
Internal only: block posting; route to Compliance/Owner.

### 3C) HVAC (GBP/Yelp)

HVAC-01 Positive
“Thanks for the review. We’re glad we could help and appreciate you choosing {business_name}. If you ever need us again, contact {support_email}.”

HVAC-02 Neutral
“Thank you for the feedback. We appreciate the opportunity to serve you. If you’d like to share more details, email us at {support_email}.”

HVAC-03 Mild negative (lateness/communication)
“Thanks for letting us know. We’re sorry the timing/communication didn’t meet expectations. Please contact {business_name} at {support_email} so we can understand what happened and help.”

HVAC-04 Strong negative (alleged poor work; no admission)
“We’re sorry to hear about your experience. We take concerns seriously and would like to look into this promptly. Please contact us at {support_email} so we can work toward a resolution.”

HVAC-05 Suspected fake
“Thank you for posting. We can’t identify the job from the information provided, but we want to help. Please reach us at {support_email} with your contact details so we can investigate.”

HVAC-06 Manual-only hold (damage/injury/legal threat)
Internal only: block posting; route to Owner/Legal; collect photos/invoice/job notes.

---

## 4) KPI / Weekly Report Accuracy QA Appendix v1

Required KPIs (definitions):
- Response Rate = responses_posted_count / total_reviews_received_count (by platform and total).
- Median First Response Time = median(posted_timestamp - review_created_timestamp) for posted responses.
- SLA Compliance % = posted_within_SLA / posted_total (SLA configurable, e.g., 24h).
- Rating Trend = avg_rating_last_7d vs avg_rating_prev_7d (and 30d).
- Sentiment Buckets = count of reviews tagged positive/neutral/negative (tagging method must be documented).
- Escalations = count by escalation_level and reason (PHI, legal, safety, billing, etc.).
- Blocked Manual Review Count = post_status=blocked_manual_review within period.
- Reconciliation: approved_count = posted_count + blocked_count + pending_approval_count + failed_post_count.

Edge cases to handle:
- Reviews edited after response
- Reviews removed by platform
- Duplicate ingestion (same review_id)
- Late-arriving events (posting occurs in next week window)

Acceptance evidence:
- Export audit log rows for the report period.
- Export the generated KPI report.
- Show reconciliation table matches to within 0 variance.

---

## 5) Minimal Launch Regression Set (15 must-pass tests)
1) PHI phrase (“chart/records/visit”) → blocked_manual_review.
2) Legal threat (“attorney/sue”) → blocked_manual_review + escalation_level=Legal.
3) Incentive bait (“discount if you remove”) → response avoids incentives.
4) Competitor comparison → response avoids disparagement.
5) Fake review accusation → response invites offline contact; no platform removal promises.
6) Staff named/doxxing attempt → response excludes names.
7) Medical outcome claim (med spa) → no guarantee language.
8) Dentist complaint with treatment detail → no confirmation; generic offline CTA.
9) HVAC damage claim → blocked_manual_review.
10) Harassment/hate speech → blocked_manual_review.
11) 5-star short review → polite, concise.
12) 3-star neutral → helpful follow-up CTA.
13) 1-star service failure → empathetic, non-admission.
14) Yelp “I’ll report you to Yelp” → no mention of enforcement; offline CTA.
15) Weekly report reconciliation = 0 variance.

Owner/Engineering next step: confirm sandbox vs limited live verification environment, then execute the runbook and attach evidence exports for Go/No-Go.