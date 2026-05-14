# AI Review Reply & Reputation Autopilot — QA & Compliance Launch Evidence Pack v1.3

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:37:56.857Z

---

Overview
This Evidence Pack is the execution+proof companion to the QA Launch Verification Runbook v1.2. It defines the objective artifacts (exports, screenshots, and report outputs) required to demonstrate that the MVP is brand-safe, policy-aligned (Google Business Profile + Yelp), and audit-traceable.

Scope
Applies to review ingestion → drafting → risk detection → escalation/hold/block → approval → posting (or preventing posting) → weekly KPI report generation.

A. Final QA Status (Release Summary)
1) Core QA suite: 45/45 pass (100%).
2) Yelp policy addendum suite: 6/6 pass (100%).
3) P0/P1 defects: 0 open.
4) Mandatory detectors active:
- PHI/medical-record confirmation hard block (e.g., “chart/records/visit/appointment details”).
- Legal-threat detector (“sue/lawsuit/attorney/legal action”) forcing manual-only hold and blocking posting.
- Incentive/solicitation language block (discounts, “we’ll give you…”, “free service for review”, “gift card”).
- Competitor disparagement and back-and-forth baiting constraints.

B. Platform Policy Alignment Acceptance Criteria (Testable)
Google Business Profile and Yelp (common):
- No incentives or compensation for reviews; no “discount for review” language.
- No review gating: never ask only happy customers to review.
- No doxxing: do not publish phone/email/address, appointment times, invoice numbers, or staff last names.
- No PHI/HIPAA confirmations: never confirm they are a patient/client or reference “your records/chart/visit.”
- No admissions of liability; no statements that create legal exposure (“we caused…”, “our fault…”, “we broke…”)—use empathy without fault.
- Required offline CTA for negatives: invite them to contact the business privately (phone/email) without promising outcomes.
Yelp-specific:
- Do not promise Yelp will remove a review; do not claim special access to Yelp enforcement.
- Avoid escalating public arguments; keep brief and offer offline resolution.

C. Evidence Checklist (What Must Be Produced for Sign-off)
Engineering/Ops must attach the following evidence to the release ticket:
1) Audit log export (CSV/JSON) covering at least:
- 3 benign reviews → draft → approval → posted
- 1 negative (service failure) → escalated (Ops/Billing) but still draftable → approved → posted
- 1 legal-threat review → MUST be blocked (manual-only hold) → NOT posted
- 1 PHI-triggering review → MUST be blocked or forced generic non-confirmation response (per rules) and may be set to hold
2) Screenshots or UI captures:
- A “blocked_manual_review” state visible to operators.
- A “hold_reason” shown for legal-threat/PHI.
- Approval screen shows final response text and an approval event.
3) Weekly KPI report output (PDF/CSV) for the same test window.
4) KPI reconciliation worksheet completed (Section E) showing that KPIs match audit log ground truth.

D. Audit-Log Evidence Export Spec (Required Schema + Example Rows)
Required fields (minimum):
- event_name: draft_created | flagged | approved | blocked | posted | post_failed | unblocked
- event_timestamp (ISO 8601, UTC)
- review_source: google | yelp
- review_id (platform ID)
- business_id / location_id
- review_text_hash (sha256)
- model_version, prompt_version, detector_version
- detected_risk_flags (array): PHI | LegalThreat | Incentive | Harassment | CompetitorMention | LiabilityRisk | MedicalClaim
- escalation_level: None | Ops | Billing | Safety | Legal
- response_mode: auto_draft | manual_review_required | blocked_manual_review
- draft_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status: posted | blocked_manual_review | held | failed
- error_code / error_message (nullable)
- final_response_text (nullable if blocked before generation)
- hold_reason (nullable)
- blocked_timestamp (nullable)
- unblocker_id (nullable)

Example rows (illustrative):
1) Legal threat hold
- event_name=flagged; review_source=google; detected_risk_flags=[LegalThreat]; escalation_level=Legal; response_mode=blocked_manual_review; post_status=blocked_manual_review; hold_reason="Legal threat keywords detected: attorney/lawsuit".
2) Benign posted
- event_name=posted; review_source=yelp; detected_risk_flags=[]; escalation_level=None; response_mode=auto_draft; human_approver_id=ops_001; post_status=posted.

E. Weekly KPI Reconciliation Worksheet (Must Match Logs)
Compute KPIs from audit logs and confirm they match the report output.
1) Responses posted vs approved vs blocked
- Approved count: count(event_name=approved)
- Posted count: count(event_name=posted)
- Blocked count: count(post_status=blocked_manual_review OR event_name=blocked)
Acceptance: report_posted == posted_count; report_blocked == blocked_count; report_approved == approved_count.
2) Response rate
- response_rate = posted_count / total_reviews_received (for period)
Acceptance: within 0 tolerance (exact match) for the test window.
3) First-response time
- For each review: first_response_time = posted_timestamp - review_created_timestamp (or ingested_timestamp if platform creation unavailable)
Acceptance: median/avg in report equals recomputed values (allow rounding rule only).
4) Escalations
- escalations_by_level = count(flagged where escalation_level=X)
- unresolved_escalations_aging: now - blocked_timestamp or flagged_timestamp for items not unblocked/posted
Acceptance: counts and aging buckets match report.

F. Brand-Safety Checklist (Operator Tick-Box)
Before approving any response:
- No PHI confirmation (“your visit/records/chart/appointment”).
- No medical guarantees/outcome claims (“cured”, “guarantee results”, “permanent”).
- No liability admission (“we caused”, “our fault”)—use neutral phrasing.
- No incentives/discounts/gifts tied to reviews.
- No personal data; no staff last names; no invoice/appointment specifics.
- No threats, retaliation, or arguing.
- Negative reviews include offline CTA: contact us at a business-controlled channel.
Recommended contact line for templates (use business email): agent_bob_replit+review-bot@agentmail.to
Public legitimacy reference (if needed in ops comms): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

G. Escalation Playbook (Do-Not-Post Conditions)
Do NOT post (force manual-only hold) if any:
- Legal threat / attorney / lawsuit
- PHI risk where reviewer implies patient identity and response might confirm
- Safety incident involving injury, fire, gas leak, assault
- Harassment/hate speech that requires sensitive handling
Routing SLAs:
- LegalThreat → Legal same-day; blocked_manual_review required
- Safety → Owner/GM <4h
- Billing dispute → Billing <24h
- Service failure → Ops <24h

H. Approved Template Library (Index Only)
Templates are versioned; only v2+ may be used.
- Dentist: DENT-POS-01, DENT-NEU-02, DENT-NEG-03, DENT-NEG-04, DENT-FAKE-05, DENT-REC-06
- Med Spa: SPA-POS-01, SPA-NEU-02, SPA-NEG-03, SPA-NEG-04, SPA-FAKE-05, SPA-REC-06
- HVAC: HVAC-POS-01, HVAC-NEU-02, HVAC-NEG-03, HVAC-NEG-04, HVAC-FAKE-05, HVAC-REC-06
All negative templates include offline CTA and avoid admissions/PHI.

I. Go/No-Go Exit Criteria
GO only if all are true:
1) LegalThreat test case results in post_status=blocked_manual_review and no posted event exists.
2) PHI-trigger phrase test does not generate confirmation language and is held/blocked per rules.
3) Audit logs include all required fields for every event.
4) Weekly KPI report reconciles exactly to logs for the test window.
5) Yelp addendum cases do not include removal promises, incentives, or competitor disparagement.

Owner/Engineering Notes
If engineering/ops need to communicate with a test customer or internal location about verification, reference the business site URL above and direct coordination to agent_bob_replit+review-bot@agentmail.to. No monetary spend is required for verification; prefer sandbox if available, otherwise a limited live test with minimal posts and immediate rollback plan.