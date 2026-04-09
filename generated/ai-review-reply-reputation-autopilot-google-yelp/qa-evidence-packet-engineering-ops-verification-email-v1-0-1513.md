# QA Evidence Packet + Engineering/OPS Verification Email (v1.0)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:13:20.997Z

---

QA EVIDENCE PACKET TEMPLATE v1.0 — AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)

Purpose
Create auditable proof that posting gates, detectors, audit logging, and weekly KPI reporting work end-to-end and comply with brand-safety + platform guidelines. This packet is completed during execution of “QA Launch Verification Runbook v1.2”.

Product & Build Info (fill in)
- Product name: AI Review Reply & Reputation Autopilot
- Website (legitimacy reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- QA contact: agent_bob_replit+review-bot@agentmail.to
- Build/version:
- Prompt/template version:
- Detector_version:
- Environment: (Sandbox / Live limited test)
- Date/time window:
- Tester name: Bob Smith

SECTION A — Posting Gate Verification Evidence
A1. Manual-only hold prevents posting (API path)
- Test ID: GATE-API-01
- Trigger: Create/ingest a review containing legal threat phrase (e.g., “my attorney will contact you”, “lawsuit”, “I will sue”).
- Expected: escalation_level=Legal; response_mode=blocked_manual_review; post_status=blocked_manual_review; NO outbound post attempt.
- Evidence required:
  1) Screenshot or JSON export showing flags + response_mode.
  2) Audit log event(s): draft_created, flagged, blocked (with hold_reason=LegalThreat).
  3) Proof of no post: outbound queue empty OR post attempt absent.
- Attachments:

A2. Manual-only hold prevents posting (UI path)
- Test ID: GATE-UI-01
- Trigger: same as above, but attempt to click “Post/Approve” in UI.
- Expected: UI blocks action; displays message; creates audit event blocked.
- Evidence required:
  1) Screenshot of UI block message.
  2) Audit log: blocked_timestamp populated; unblocker_id empty.
- Attachments:

A3. PHI/Healthcare relationship non-confirmation enforced
- Test ID: PHI-01
- Trigger: Review mentions appointment/visit/records/chart or names a clinician.
- Expected: response does NOT confirm visit, records, treatment, diagnosis; uses generic phrasing; encourages offline contact.
- Evidence required:
  1) Original review text (redact names if needed).
  2) Generated draft.
  3) Highlighted diff/annotation showing “no relationship confirmation.”
- Attachments:

SECTION B — Audit Trail (Logging) Evidence
Required log fields to verify (export a sample row/event for each):
- review_source (Google|Yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level
- response_mode (normal|needs_approval|blocked_manual_review)
- draft_version
- human_approver_id (nullable if blocked)
- approval_timestamp (nullable if blocked)
- posted_timestamp (nullable if blocked)
- post_status (posted|failed|blocked_manual_review)
- error_code (if failed)
- final_response_text
- model/prompt version
- hold_reason (if blocked)
- detector_version
- blocked_timestamp
- unblocker_id (if unblocked)

B1. Event sequence integrity
- Test ID: LOG-SEQ-01
- Expected: Every review has deterministic event chain; blocked reviews never include posted event.
- Evidence required: export showing chronological event order.

SECTION C — Weekly KPI Report Reconciliation Evidence
Provide exports (CSV/PDF/screenshot) plus the calculations used.

C1. Response rate calculation
- Test ID: KPI-01
- Expected: response_rate = (# posted responses) / (# total reviews) for period; excludes blocked_manual_review from numerator; denominator includes all reviews ingested.
- Evidence required:
  1) Raw counts: total_reviews, posted_count, blocked_count, approved_not_posted_count.
  2) Computed response_rate.

C2. First response time (median/avg) correctness
- Test ID: KPI-02
- Expected: response_time computed from review_created_timestamp to posted_timestamp; blocked reviews excluded or explicitly reported separately.
- Evidence required: sample of at least 5 rows with manual spot-check.

C3. Escalations by reason/level
- Test ID: KPI-03
- Expected: escalations_count grouped by escalation_level and reason; Legal threats appear only as Legal.
- Evidence required: grouped table + at least 2 source examples.

SECTION D — Response Policy “Do/Don’t” Matrix (Testable Checks)
For each platform, verify responses:
D1. No incentives / discounts / compensation offers for reviews
- Fail examples: “10% off next visit”, “free service if you update review”.
- Pass pattern: “Please contact us to make this right” (no quid-pro-quo).

D2. No review gating / no selective review solicitation
- Fail examples: “If you’re happy leave a review; if not contact us.”
- Pass pattern: generic thanks; offline resolution.

D3. No promises about removal / platform enforcement
- Fail examples: “We’ll have Yelp remove this.”
- Pass pattern: “We’d like to learn more—please contact us.”

D4. No competitor disparagement
- Fail examples: “Our competitor lies/scams.”
- Pass pattern: neutral, fact-minimal.

D5. No doxxing / personal data
- Fail: names, phone numbers, appointment times, addresses (unless business public contact).
- Pass: business contact channel only.

D6. Never confirm customer relationship/visit/treatment (especially dentist/med spa)
- Fail examples: “We reviewed your chart/records/visit.”
- Pass pattern: “We can’t discuss details here; please contact our office so we can look into this.”

SECTION E — Final Sign-off
- All GATE tests passed: Yes/No
- All LOG tests passed: Yes/No
- All KPI tests passed: Yes/No
- Any open P0/P1 defects: Yes/No (link)
- Go/No-Go result: GO / NO-GO
- Signed by Engineering:
- Signed by QA:
- Signed by Ops/Owner:


ENGINEERING/OPS EMAIL (READY TO SEND)
Subject: Launch Verification Runbook + Evidence Packet — Please Execute and Return Sign-off

Hi team,

We’re ready for end-to-end launch verification of the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). Please execute “QA Launch Verification Runbook v1.2” and complete the attached “QA Evidence Packet v1.0” with exports/screenshots/logs.

Key items to prove with evidence:
1) Manual-only hold works: legal-threat content must set response_mode=blocked_manual_review and prevent posting via both API and UI.
2) PHI/relationship non-confirmation: healthcare responses must not confirm visits/records/treatment; keep details offline.
3) Audit trail completeness: required log fields/events are emitted (draft_created, flagged, approved, blocked, posted) and blocked items never show posted.
4) Weekly KPI reconciliation: response rate, response time, escalations breakdown correctly reconcile posted vs approved vs blocked.

Business legitimacy reference (if needed in docs):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If any check fails, please reply with:
- failing Test ID(s)
- exported log rows/events
- the exact generated response text
- build version + detector_version

Send completed evidence + sign-off to: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob Smith
QA/Compliance
