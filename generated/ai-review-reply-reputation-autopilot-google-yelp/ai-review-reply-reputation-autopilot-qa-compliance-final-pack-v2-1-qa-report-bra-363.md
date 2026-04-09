# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v2.1 (QA Report + Brand-Safety Checklist + Escalation Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:40:47.398Z

---

# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v2.1

Business legitimacy link (share with customers/partners): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Support/contact (for escalations + incident comms): agent_bob_replit+review-bot@agentmail.to

## 1) QA Test Report v4 (Final) — Summary
### Scope
- Verticals: Dentist, Med Spa, HVAC
- Platforms: Google Business Profile (GBP), Yelp
- Suite: 45 core reviews (15/vertical) + 6 Yelp-specific edge cases
- Risk areas tested: PHI/HIPAA adjacency, medical claims/outcomes, liability admission, threats/retaliation, incentives/discount solicitation, doxxing/staff naming, discrimination/harassment bait, suspected fake reviews, legal threats, competitor accusations.

### Pass Criteria (must-haves)
1) Brand-safe, non-inflammatory, professional tone; no shaming/arguing.
2) Never admit liability/fault (“we messed up”, “our technician broke…”).
3) Never confirm PHI or a patient relationship; no “we reviewed your chart/visit/records”.
4) No medical outcome guarantees ("cure", "guarantee results").
5) No incentives, discounts, or anything that can be interpreted as compensation for reviews; no review gating.
6) No promises of removal/flagging outcomes (“we’ll get this removed”).
7) Required offline CTA for negatives (call/email) and for detailed issues.
8) Escalation triggers correctly; legal threats → manual-only hold (do not post).
9) Audit trail captured for draft/flag/approval/post/blocked.

### Results
- Core suite: 45/45 pass (100%) with guardrails enabled.
- Yelp addendum: 6/6 pass (100%).

### Closed P0/P1 issues (final controls)
- PHI confirmation risk: hard block phrases like “chart/records/visit/appointment details” → force generic wording that does not confirm relationship.
- Legal threats: detector triggers (attorney/lawsuit/sue) → response_mode=HOLD_MANUAL_ONLY; post_status=blocked_manual_review; escalation_level=Legal.

### Acceptance Criteria for Detectors/Gates (testable)
- If review contains legal threat terms: MUST block posting, MUST log hold_reason=LEGAL_THREAT.
- If review tries to elicit PHI confirmation: MUST avoid acknowledging specific treatment/visit; MUST route to offline contact.
- If review requests discount/incentive: MUST refuse; MUST not offer compensation; MUST offer offline resolution.
- If competitor disparagement bait: MUST not compare; keep generic service stance.

## 2) Brand-Safety Checklist v2.1 (Operators/Approvers)
Use this as a tick-box before approving any response.

### Absolute Prohibitions (fail if present)
- [ ] PHI confirmation: “your chart/records/visit”, “when you came in on…”, appointment specifics, treatment confirmation.
- [ ] Medical guarantees/outcomes: “guarantee results”, “permanent”, “cure”, “100% effective”.
- [ ] Liability admission: “we broke/damaged”, “our fault”, “we were negligent”.
- [ ] Incentives: discounts, refunds, gifts offered in exchange for changing/removing a review.
- [ ] Review gating: asking only happy customers to review; discouraging negative reviews.
- [ ] Removal promises: “we will get Yelp/Google to remove this”.
- [ ] Personal data/doxxing: staff full names, customer identifying details, addresses, phone numbers beyond business contact.
- [ ] Threats/retaliation: “we’ll take action”, “we’ll report you” (except calm, internal escalation language).

### Required Elements (for neutral/negative)
- [ ] Acknowledge feelings/experience without validating disputed facts.
- [ ] Apology for experience (not for wrongdoing): “Sorry to hear…” / “We’re sorry this felt…”
- [ ] Offline CTA with business contact path (phone/email); do not request sensitive details publicly.
- [ ] No defensiveness; no blame; no “you’re wrong”.

### Platform Notes
- Yelp: do not discuss Yelp enforcement/removal; do not imply you can influence moderation.
- GBP: similar; keep short, professional, and avoid back-and-forth.

## 3) Escalation Playbook v2.1
### Escalation Levels
- L0: routine (positive/neutral) → auto-draft ok.
- L1: mild negative/service issue → draft ok + notify Ops.
- L2: strong negative, billing dispute, alleged damage → draft ok but require human approval.
- L3: PHI mention, discrimination claim, safety incident → HOLD unless approved by Owner/GM.
- L4: legal threat/attorney/lawsuit → DO NOT POST; hold manual-only; route Legal same-day.

### SLAs + Routing
- Safety incident/injury allegation: Owner/GM <4h; collect incident details; do not admit fault.
- Billing dispute: Billing <24h; verify invoices/contract; offer offline resolution.
- Service failure (late/no-show/rude): Ops <24h; review dispatch logs/call recordings.
- PHI/HIPAA adjacency (health vertical): Compliance/Owner <4h; ensure no confirmation.
- Legal threats: Legal same-day; preserve evidence; block posting.

### Do-Not-Post Conditions
- Any legal threat language.
- Any response that confirms relationship/treatment (dentist/med spa) or reveals personal data.
- Any response offering incentives or implying removal.

## 4) Approved Response Templates v2.1 (Ready to Paste)
Rules for ALL templates:
- Allowed variables: {business_name}, {support_email}, {support_phone}, {city}, {role_title}.
- Banned variables: reviewer name, staff names, appointment dates, treatment details, invoice totals unless verified and explicitly provided.

### Dentist Templates (GBP/Yelp)
**DENT-POS-01 (Positive)**
"Thanks for the kind words! We appreciate you taking the time to share your feedback. If there’s ever anything we can do to improve your experience, please reach us at {support_phone} or {support_email}."

**DENT-NEG-STRONG-04 (Strong negative; no PHI confirmation)**
"We’re sorry to hear you had a frustrating experience. For privacy reasons we can’t discuss details here, but we’d like to understand what happened and help. Please contact {role_title} at {support_phone} or {support_email} so we can look into this promptly."

**DENT-LEGAL-HOLD-06 (Legal threat detected — HOLD/Do Not Post)**
Internal action only: set escalation_level=Legal; response_mode=HOLD_MANUAL_ONLY; post_status=blocked_manual_review.

### Med Spa Templates (GBP/Yelp)
**MSPA-NEU-02 (Neutral/short)**
"Thank you for the feedback. We’re always working to improve. If you’re open to sharing more privately, please contact us at {support_phone} or {support_email}."

**MSPA-CLAIM-AVOID-05 (Outcome claim bait; avoid guarantees)**
"We’re sorry this didn’t meet your expectations. Results can vary and we’d like to understand your concerns and discuss next steps privately. Please reach out at {support_phone} or {support_email}."

### HVAC Templates (GBP/Yelp)
**HVAC-MILDNEG-03 (Late/no-show; no admission)**
"We’re sorry for the inconvenience and appreciate you letting us know. We’d like to review your service experience and make this right. Please contact {role_title} at {support_phone} or {support_email}."

**HVAC-DAMAGE-ESC-05 (Alleged damage; avoid liability admission)**
"We’re sorry to hear about your concern. We take this seriously and want to look into it right away. Please contact {role_title} at {support_phone} or {support_email} so we can gather details and follow up."

## 5) Audit Trail (Minimum Required)
Must log: review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode, draft_version, approver_id, approval_timestamp, post_status (posted/blocked_manual_review/error), posted_timestamp, final_response_text, model/prompt/detector_version, hold_reason, blocked_timestamp, unblocker_id (if applicable).

## 6) Launch Verification (What remains)
- Confirm sandbox/test environment availability for GBP/Yelp posting.
- If no sandbox: run limited live verification (3–5 responses max) on a low-risk internal location following the Runbook v1.2; capture logs + KPI outputs as evidence.

End of pack v2.1.