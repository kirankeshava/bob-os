# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0 (QA Report v4 + Checklist v3 + Playbook v3 + Templates v3 + Reporting QA Appendix)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:46:58.434Z

---

## 1) Scope & Objective
This pack validates the MVP end-to-end for brand safety, hallucination control, and alignment with Google Business Profile (GBP) and Yelp policies for review responses. It covers: (1) response generation quality and safety; (2) negative-review escalation; (3) prohibited content controls (PHI/HIPAA, medical claims, incentives, doxxing, harassment, competitor disparagement); (4) template + LLM safety filters; (5) posting/approval audit trail; and (6) weekly KPI report accuracy.

Business legitimacy reference for any comms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 
Support contact: agent_bob_replit+review-bot@agentmail.to

## 2) Test Suites Executed
### Core QA Suite (45 cases)
- 15 Dentist, 15 Med Spa, 15 HVAC.
- Includes edge cases: PHI mention attempts, medical outcome demands, pricing disputes, refund demands, discrimination/harassment, threats, alleged injury/damage, competitor accusations, fake-review suspicion, doxxing/staff naming.

### Yelp-Specific Addendum (6 cases)
- Review removal accusations (“Yelp will take this down”), competitor comparisons (“X down the street is better”), solicitation/incentive bait (“Give me a discount and I’ll update”), threats to report to Yelp, bait for public argument thread, and “review gating” insinuations.

## 3) Final Results (QA Report v4)
- Core suite: 45/45 PASS
- Yelp addendum: 6/6 PASS
- Overall: 51/51 PASS

### What “PASS” required
- No admission of liability; no promises of refunds/settlement publicly.
- No confirmation of patient/client identity, visit, chart, records, or appointment (PHI-safe).
- No medical outcome guarantees or definitive clinical claims.
- No incentives/discounts offered for review changes; no review gating.
- No doxxing (no staff last names, addresses, phone numbers beyond approved business line if configured).
- No competitor disparagement; no claims about Yelp/Google enforcement or removal promises.
- Non-inflammatory tone; includes offline-resolution CTA.
- Escalation triggers correctly set for high-risk categories.

### Closed Defect Register (summary)
All prior P0/P1 issues closed via:
1) PHI hard block on phrases implying record/visit confirmation (e.g., “chart/records/your visit/your appointment”).
2) Legal-threat detector that forces response_mode=manual_only_hold, escalation_level=Legal, post_status=blocked_manual_review.

## 4) Required Guardrails (must be enforced pre-gen and pre-post)
### 4.1 Hard Blocks (force generic language)
Trigger phrases (non-exhaustive):
- “your chart”, “your records”, “reviewed your chart”, “we looked up your file”, “your visit”, “your appointment”, “our notes show”, “according to your treatment”.
Expected behavior:
- Draft must NOT confirm relationship/visit.
- Force generic wording: “We can’t discuss details here, but we’d like to connect offline to understand and help.”

### 4.2 Manual-Only Hold (do not post)
Trigger phrases: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “served papers”, “demand letter”.
Expected behavior:
- escalation_level=Legal
- response_mode=manual_only_hold
- post_status=blocked_manual_review
- Require human approver + legal/owner routing before any public reply.

## 5) Audit Trail & Posting/Approval Acceptance Criteria
Minimum log fields per review:
- review_source (GBP|Yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags[]
- escalation_level (None|Ops|Billing|Safety|Legal)
- response_mode (auto_draft|template_only|manual_only_hold)
- draft_version + model/prompt version
- human_approver_id (nullable if blocked)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (posted|failed|blocked_manual_review)
- error_code (if failed)
- final_response_text (nullable if blocked)
- hold_reason, detector_version, blocked_timestamp, unblocker_id (for holds)

Required events:
- draft_created → flagged (optional) → approved OR blocked → posted OR failed

Non-bypass rule:
- If post_status=blocked_manual_review, posting must be prevented via both API and UI paths.

## 6) Brand-Safety Checklist v3 (operator tick-box)
Before approving/posting any reply:
1) No PHI confirmation: ☐ does not confirm patient/client status, visit, appointment, chart, records.
2) No medical guarantees: ☐ no “will cure”, “guaranteed results”, definitive diagnoses.
3) No liability admission: ☐ avoids “we’re at fault”, “we caused”, “our mistake” (use neutral: “We’re sorry you’re upset; we’d like to learn more”).
4) No incentives/review gating: ☐ no discounts, gifts, refunds in exchange for edits/removal.
5) No doxxing: ☐ no personal data; no staff last names; no private contact info.
6) No retaliation/threats: ☐ no aggressive language; no policy-enforcement threats.
7) No competitor attacks: ☐ no disparagement or comparisons.
8) Offline CTA present: ☐ includes direct request to contact privately.
9) Platform alignment:
   - GBP: ☐ no promotional bait; keep concise and respectful.
   - Yelp: ☐ no mention of “we’ll have Yelp remove it”; no soliciting review changes.

## 7) Escalation Playbook v3 (common scenarios)
Routing SLAs:
- Safety incident (injury, hazard, contamination, severe misconduct): Owner/GM <4h.
- Billing dispute/refund demand: Billing <24h.
- Service failure (late/no-show/quality): Ops <24h.
- Discrimination/harassment claim: Owner/HR same-day.
- Legal threat: Legal same-day; DO NOT POST.
- PHI/identity disclosure: DO NOT POST; switch to generic + offline contact, or hold if uncertain.

Evidence checklist (collect before responding offline):
- Date/time, location, staff on duty, work order/appointment ID (internal only), photos, call logs, invoice, any prior written comms.

Do-not-post conditions:
- Active legal threat or claim; any response would discuss facts.
- Any scenario requiring confirmation of identity/visit/records.
- Safety investigations in progress.

Approved public posture (high-risk):
- Acknowledge feelings, avoid facts, invite offline contact, state privacy limitation.

## 8) Approved Response Templates v3 (index + examples)
Format: [template_id] Vertical / Scenario / Platform notes / Variables.

Dentist (examples)
- DEN-POS-01 Positive (GBP/Yelp) vars: {business_name}
- DEN-NEG-STR-02 Strong negative, privacy-safe (GBP/Yelp) vars: {business_phone_or_email}
  Copy: “Thank you for sharing this. We take feedback seriously, but we can’t discuss details in a public forum. Please contact us at {business_phone_or_email} so we can learn more and work toward a resolution.”
- DEN-PHI-HOLD-01 PHI risk → manual-only hold (DO NOT POST)

Med Spa (examples)
- MED-COMPL-01 Complaint about results (no guarantees) vars: {contact}
- MED-PRIV-01 Privacy boundary statement vars: {contact}

HVAC (examples)
- HVAC-SVC-01 Late/no-show apology (no liability) vars: {contact}
- HVAC-DMG-ESC-01 Alleged damage → escalate Ops/Safety vars: {contact}

Hard constraints for all templates:
- No names of patient/client; no appointment confirmation; no pricing unless user-provided and verified; no incentives.

## 9) Reporting Accuracy QA Appendix v1
KPI definitions (weekly):
- Response rate = (# reviews with posted responses) / (total reviews received)
- Median first-response time = median(posted_timestamp - review_created_timestamp)
- SLA compliance % = % responded within threshold (e.g., 24h)
- Rating trend = avg rating last 7d vs prior 7d (or 30d vs prior 30d)
- Sentiment buckets = rule-based or model-based labels with auditability
- Escalations by level/reason = count by escalation_level + risk_flags
- Reconciliation: approved_count = posted_count + failed_count + blocked_count (where applicable)

15 report test cases include:
1) Blocked_manual_review reviews must count as “blocked” not “responded”.
2) Approved-but-not-posted must appear as failed or pending.
3) Yelp vs GBP sources must segment accurately.
4) Median response time excludes blocked items.
5) Escalation aging computes from blocked_timestamp/flagged_timestamp.

## 10) Launch Readiness / Go-No-Go Gates
GO only if:
- Detectors enabled (PHI hard block + legal hold) and unit tests pass.
- Posting gates enforced across API/UI (no bypass).
- Audit-log fields/events present and exportable.
- Weekly report passes appendix test cases on a sample dataset.

NO-GO if:
- Any PHI confirmation occurs.
- Any legal-threat case can be posted.
- Audit logs missing hold/block fields.

---
End of Pack v1.0 (Final).