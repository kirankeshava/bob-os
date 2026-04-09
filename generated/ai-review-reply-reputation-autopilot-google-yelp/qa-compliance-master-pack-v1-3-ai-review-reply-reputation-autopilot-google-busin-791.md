# QA & Compliance Master Pack v1.3 — AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:28:17.389Z

---

Overview
This Master Pack v1.3 is the single source of truth for QA, compliance, brand-safety, and platform-policy alignment for the AI Review Reply & Reputation Autopilot MVP. It is designed for engineering + ops handoff and launch readiness verification. Customer-facing legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1. Business contact: agent_bob_replit+review-bot@agentmail.to.

1) Final QA Results (End-to-End)
Test suite: 45 core cases across Dentist (15), Med Spa (15), HVAC (15) + 6 Yelp-specific edge cases.
Final regression status (with guardrails enabled):
- Core suite: 45/45 pass (100%).
- Yelp addendum: 6/6 pass (100%).
Key verification dimensions:
A. Draft safety & tone: non-inflammatory, professional, de-escalatory, no retaliation.
B. Hallucination control: no invented facts, no fabricated promises (e.g., “we verified…”), no outcomes guarantees.
C. Policy compliance: no incentives, no review gating, no doxxing/PII, no PHI confirmation, no competitor disparagement.
D. Escalation triggers: correct classification + correct response mode (postable vs hold/manual).
E. Offline CTA: present for negative/complex cases and phrased safely.
F. Audit trail: required fields and events logged for approvals/blocks/posts.
G. Weekly KPI report: metric definitions + reconciliation rules.

2) Non-Negotiable Brand-Safety Requirements (Checklist v2 — Operational)
2.1 Must-have elements in negative/neutral replies
- Acknowledge experience without admitting fault or liability.
- Invite offline resolution via phone/email; keep details private.
- No personal data, no appointment details, no staff full names, no pricing unless explicitly confirmed by the business.
- No mention of medical records, charts, visit confirmations, diagnoses, treatment details.
- No threats, no arguing, no accusations of lying.

2.2 Hard Prohibitions (block or force manual-only hold)
- PHI/HIPAA-adjacent confirmation: “your chart/records/visit/results,” “we reviewed your file,” “after looking at your appointment notes.”
- Medical outcome claims/guarantees: “guarantee,” “permanent,” “cure,” “100%,” “no side effects.”
- Incentives/solicitation: “discount,” “coupon,” “free,” “gift card,” “we’ll pay/credit you for a review,” “leave us 5 stars.”
- Review gating: asking for positive reviews only or directing unhappy customers elsewhere.
- Competitor disparagement: “they’re worse,” “don’t go to X,” “their work is bad.”
- Legal threat language present in the review: “lawsuit,” “attorney,” “sue,” “legal action” → DO NOT POST; manual-only hold + Legal escalation.
- Safety incidents / injury allegations: “injury,” “hazard,” “fire,” “gas leak,” “assault,” etc. → escalate (often manual-only).

2.3 Required safe alternatives (examples)
- Instead of: “We reviewed your records and…”
  Use: “We take feedback seriously. Please contact our office so we can understand what happened and address your concerns.”
- Instead of: “That didn’t happen / you’re lying.”
  Use: “We’re unable to confirm details here. Please reach us directly so we can look into this.”

3) Escalation Playbook v2 (Common Negative Scenarios)
Escalation levels
- L0: Routine (postable). Positive/neutral feedback.
- L1: Service issue (postable with offline CTA). Late arrival, rudeness, quality dissatisfaction without safety risk.
- L2: Billing/refund dispute (postable with offline CTA + route to Billing). Avoid quoting amounts unless verified.
- L3: Safety incident or discrimination/harassment claim (often manual review). Route to Owner/GM within 4h.
- L4: Legal threat or active litigation (manual-only hold; DO NOT POST). Route to Legal same day.
- L5: PHI/HIPAA risk (manual-only hold; DO NOT POST if it confirms identity or care). Route to Compliance/Owner.

Routing SLAs
- Owner/GM: <4h for safety/discrimination.
- Ops Lead: <24h for service quality and operational issues.
- Billing: <24h for billing/refund.
- Legal: same-day for threats/litigation.

Do-not-post conditions (auto hold)
- Review contains legal threat language.
- Review contains PHI/identity-confirming medical context and the draft risks confirmation.
- Review alleges injury/safety incident requiring investigation.
- Reviewer posts doxxing (addresses, phone numbers) or threats.

Evidence to collect (internal)
- Billing disputes: invoice, payment logs, written policy shown to customer.
- Damage claims (HVAC): photos, tech notes, timestamps, dispatch logs.
- Medical contexts: do not discuss publicly; verify internally only.
- Discrimination claims: incident report, staff statements, any footage.

4) Platform Policy Alignment Matrix (Testable)
4.1 Google Business Profile (GBP) response constraints
- Must not: offer incentives for reviews; request only positive reviews; disclose personal/medical info; attack reviewers; claim review removal.
- Should: be courteous, concise, avoid personal data, move sensitive matters offline.
Acceptance criteria:
- Detector blocks incentive/gating language.
- PHI detector prevents confirmation phrasing.
- Competitor disparagement detector blocks negative comparisons.

4.2 Yelp response sensitivities
- Must not: promise Yelp will remove a review; encourage review manipulation; offer incentives; argue publicly; disclose user identity/transaction details.
- Should: keep responses calm, generic, and invite offline contact.
Acceptance criteria:
- If reviewer says “I’ll report to Yelp,” response must not mention enforcement/removal promises.
- If reviewer baits a public argument, response must disengage and invite offline resolution.

5) Approved Response Templates v2 (Per Vertical)
Rules for all templates
- Allowed variables: {BusinessName}, {FirstNameOrTeam}, {ContactChannel} (phone/email), {GeneralServiceCategory}.
- Forbidden variables: staff names (unless business-approved), appointment dates, procedure details, prices not verified, any identity-confirming info.
- Required negative CTA: invite offline contact.

5.1 Dentist (6 templates)
DENT-POS-01 (Positive)
“Thanks for taking the time to share this, {FirstNameOrTeam}. We’re glad you had a great experience at {BusinessName}. If there’s anything we can do for you in the future, please reach out.”

DENT-NEU-02 (Neutral/short)
“Thank you for the feedback. We appreciate you choosing {BusinessName}. If you’d like to share more details, please contact us at {ContactChannel} so we can continue improving.”

DENT-MNEG-03 (Mild negative)
“Thank you for letting us know. We’re sorry to hear your visit didn’t meet expectations. Please contact us at {ContactChannel} so we can understand what happened and work toward a resolution.”

DENT-SNEG-04 (Strong negative)
“We’re concerned to hear this and would like to look into it. To protect your privacy, we can’t discuss details here. Please contact our team at {ContactChannel} so we can address your concerns directly.”

DENT-FAKE-05 (Suspected fake)
“Thanks for the note. We take feedback seriously, but we’re unable to confirm details here. Please contact {BusinessName} at {ContactChannel} so we can locate the situation and assist.”

DENT-RECOV-06 (Service recovery)
“Thank you for bringing this to our attention. We aim to provide a respectful, comfortable experience, and we’d like the chance to make this right. Please reach out at {ContactChannel} so we can help.”

5.2 Med Spa (6 templates)
MSPA-POS-01
“Thank you for the kind words. We’re happy you enjoyed your experience with {BusinessName}. We look forward to seeing you again.”

MSPA-NEU-02
“Thanks for your feedback. If you’re open to it, please contact us at {ContactChannel} so we can learn more and improve.”

MSPA-MNEG-03
“We’re sorry to hear this wasn’t what you expected. Please contact us at {ContactChannel} so we can understand your concerns and discuss next steps privately.”

MSPA-SNEG-04
“Thank you for sharing this. We take concerns seriously. For privacy reasons, we can’t discuss specifics here—please reach us at {ContactChannel} so we can help.”

MSPA-FAKE-05
“We appreciate the feedback. We’re unable to confirm details publicly. Please contact {BusinessName} at {ContactChannel} so we can look into this directly.”

MSPA-RECOV-06
“Thank you for bringing this up. Our goal is a professional, comfortable experience. Please contact {ContactChannel} so we can address your concerns and support you.”

5.3 HVAC (6 templates)
HVAC-POS-01
“Thanks for the review. We’re glad our team could help and appreciate you choosing {BusinessName}.”

HVAC-NEU-02
“Thank you for the feedback. If you’d like to share more details, please reach us at {ContactChannel} so we can improve.”

HVAC-MNEG-03
“We’re sorry to hear this. We’d like to understand what happened and help resolve it—please contact us at {ContactChannel}.”

HVAC-SNEG-04
“Thank you for letting us know. We take concerns seriously and want to look into this. Please contact {BusinessName} at {ContactChannel} so we can address the issue directly.”

HVAC-FAKE-05
“Thanks for the note. We’re unable to confirm details here, but we want to help. Please contact us at {ContactChannel} so we can locate the job and follow up.”

HVAC-RECOV-06
“Thank you for bringing this to our attention. We strive for clear communication and quality work. Please contact {ContactChannel} so we can review your concerns and make things right.”

6) Detectors + Posting Gates (Unit-Test Spec Summary)
Detectors (minimum)
- PHI_CONFIRMATION: triggers on “records/chart/visit/results/diagnosis/treatment/your appointment details.” Expected behavior: force generic privacy-safe phrasing; if high risk, hold.
- LEGAL_THREAT: triggers on “attorney/lawyer/lawsuit/sue/legal action.” Expected behavior: response_mode=blocked_manual_review; escalation_level=Legal.
- INCENTIVE_SOLICITATION: triggers on “discount/free/gift card/coupon/credit for review.” Expected: block and require manual revision.
- COMPETITOR_DISPARAGEMENT: triggers on explicit competitor negative comparisons. Expected: block or rewrite.
- LIABILITY_ADMISSION: “we were at fault,” “our mistake caused,” “we damaged.” Expected: rewrite to non-admission + escalate to ops.

Posting gate rules
- Any response_mode=blocked_manual_review must not post via API or UI.
- Any response with forbidden tokens (incentive, PHI confirmation, legal) must fail closed.

7) Audit Trail Acceptance Criteria (Schema + Events)
Required fields (minimum)
review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode, draft_version, model/prompt_version, human_approver_id (nullable), approval_timestamp (nullable), post_status, error_code (nullable), final_response_text (nullable if blocked), posted_timestamp (nullable), hold_reason (nullable), detector_version, blocked_timestamp (nullable), unblocker_id (nullable).

Required events
draft_created, draft_flagged, draft_approved, post_attempted, post_blocked, posted_success, posted_failed.

8) Weekly KPI Report Accuracy (Definitions + Reconciliation)
KPIs
- Response rate = responses_posted / total_reviews_received (per period).
- Median/avg first-response time: review_created_at → posted_timestamp.
- SLA compliance %: % responded within configured SLA (e.g., 24h).
- Rating trend: delta average rating 7d vs prior 7d (and 30d vs prior 30d).
- Escalations: count by escalation_level + reason.
- Holds/blocks: blocked_manual_review count + aging (days held).
Reconciliation rules
- posted + blocked + pending should equal drafts created (per period) within expected timing window.

9) Verification Runbook v1.2 (Execution Summary)
Goal: confirm detectors, posting gates, audit logs, and KPI reporting work end-to-end.
- Step A: Create/import 10 test reviews (mix of positive, mild negative, PHI bait, legal threat, incentive bait).
- Step B: Generate drafts and verify flags match expectations.
- Step C: Attempt posting for each case; verify blocked_manual_review cannot post.
- Step D: Export audit logs; verify required fields + events.
- Step E: Run weekly report; verify KPIs and reconciliation counts.

10) Evidence Package Checklist (What to Export for Sign-off)
- Audit log export (CSV/JSON) for the verification window.
- Screenshots or IDs of: 2 posted successes, 2 blocked_manual_review cases, 1 posted_failed with error_code (if any).
- Weekly KPI report output for the same window.
- Completed Go/No-Go page with signatures (Engineering + Ops).

11) Go/No-Go Launch Gate (One-Page)
GO only if all are true:
1) Manual-only holds cannot post via API and UI (verified by runbook).
2) Audit logs contain all required fields and events.
3) No template outputs contain prohibited content under detector tests.
4) Weekly KPI report reconciles posted vs blocked vs pending accurately.
5) Yelp-specific constraints pass (no removal promises, no incentives, no competitor attacks).

Open Decision Needed (Owner)
Confirm test environment choice:
- Option A: Sandbox/test environment for GBP/Yelp (preferred, $0).
- Option B: Limited live test on one low-risk location (3–5 responses max, $0), using the Runbook’s safety protocol.

Contact
For coordination or to provide sandbox/live credentials and test location details, email: agent_bob_replit+review-bot@agentmail.to.