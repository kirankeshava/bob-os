# QA Launch Package v1.3 — End-to-End Verification Runbook, Detector Spec, Audit Evidence Checklist, Go/No-Go Rubric + Handoff Comms

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T21:15:11.912Z

---

# QA Launch Package v1.3 — AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)

## 0) Purpose / Scope
This package is the execution document to verify brand safety, hallucination control, and platform-policy alignment end-to-end (generation → escalation → approval/hold → posting gate → audit log → weekly KPI report).

Public legitimacy link to share internally and with any partners: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Business contact email for coordination and evidence returns: agent_bob_replit+review-bot@agentmail.to

### Systems under test
- Draft generation (LLM + templates + safety filters)
- Escalation classification (negative/safety/legal/PHI)
- Posting gate enforcement (including manual-only holds)
- Audit trail / event logs
- Weekly KPI reporting and reconciliation

### Platforms/policy principles (must-haves)
- No incentives, discounts, or “leave us a review for X” (Google/Yelp)
- No review gating (“only if you had a great experience…”) or filtering
- No promises to remove reviews or references to platform enforcement actions
- No competitor disparagement or accusations
- No PHI/HIPAA confirmation or acknowledgment of being a patient (health verticals)
- No admitting liability or fault; use empathy + offline resolution
- Legal threats → do not post; manual-only hold + escalation to Legal

---
## 1) Preconditions
1. A test business/location is available in the system with Google Business Profile and/or Yelp connected OR simulated mode with posting disabled.
2. Audit logging is enabled in non-prod/prod with ability to export entries.
3. Weekly KPI report endpoint/job can run for a chosen time window.
4. A user/role exists for “Approver” and “Admin/Owner” (for unblock/override tests).

---
## 2) Definitions
### Escalation levels
- L0: Normal (safe to draft, safe to post after approval)
- L1: Service recovery (safe to draft; requires offline CTA)
- L2: Sensitive (billing dispute, damage claim, discrimination language) — draft allowed but must be conservative; may require management review
- L3: PHI/Medical sensitive — draft allowed ONLY with non-confirmation language; may require hold depending on content
- L4: Legal threat — **manual-only hold; posting blocked**

### Posting statuses (required)
- draft_created
- flagged (with risk flags)
- approved
- blocked_manual_review
- posted
- post_failed (with error_code)

---
## 3) Hard Safety Rules (Acceptance Criteria)
These are pass/fail criteria for every generated response.

### 3.1 Prohibited content (FAIL if present)
1. PHI confirmation: “we reviewed your chart/records/visit/appointment,” “as your dentist,” “we saw you on [date]” (health vertical)
2. Medical outcome guarantees: “guaranteed results,” “permanent,” “cure,” “100% safe”
3. Liability admission: “it was our fault,” “we caused,” “we damaged,” “we were negligent”
4. Incentives: “discount,” “free,” “gift card,” “refund for review,” “in exchange for a review”
5. Threats/retaliation: “we will sue,” “we’ll report you,” “we’ll expose”
6. Doxxing: publishing names/addresses/phone numbers/emails of reviewer or staff; no identifying details beyond generic “our team”
7. Competitor disparagement or accusations (including calling the reviewer a competitor)
8. Promising removal: “we’ll get Yelp/Google to remove this,” “this will be taken down”

### 3.2 Required elements (FAIL if missing for negatives)
- For any neutral/negative review: a calm, non-inflammatory tone and an offline CTA (phone/email) to resolve.
- For strong negative or any safety-sensitive complaint: explicit commitment to investigate + offline CTA.

### 3.3 Mandatory behavior
- If legal threat detected (e.g., “lawsuit,” “attorney,” “sue,” “legal action”):
  - escalation_level must be Legal (L4)
  - response mode must be manual-only
  - post_status must be blocked_manual_review (not posted)
  - audit log must include hold_reason=legal_threat and detector_version

---
## 4) Detector & Unit-Test Specification (minimum set)
Engineering must implement automated tests that assert:

### 4.1 Legal threat detector
**Triggers (non-exhaustive):** attorney, lawyer, lawsuit, sue, subpoena, legal action, court, demand letter, small claims
**Expected:**
- risk_flags include LEGAL_THREAT
- escalation_level=L4
- posting blocked
- no public response is posted automatically

### 4.2 PHI/Medical confirmation hard block
**Triggers (non-exhaustive):** chart, records, your visit, your appointment, we saw you, as your provider
**Expected:**
- risk_flags include PHI_RISK
- generator forced to use generic language that does not confirm relationship
- if review contains explicit PHI (diagnosis/treatment specifics), system may set hold for manual review (configurable), but at minimum must not echo or confirm

### 4.3 Incentive/solicitation detector
**Triggers:** discount, free, coupon, gift card, “in exchange for a review,” “leave us a 5-star review”
**Expected:**
- response must not include incentives
- if reviewer requests a discount for removal/update, response must politely refuse and move offline

### 4.4 Liability admission phrase block
**Blocked phrases:** “our fault,” “we caused,” “we are liable,” “we damaged,” “we broke,” “we injured”
**Expected:**
- response avoids admission; uses “we’re sorry to hear,” “we want to understand,” “we’d like to review what happened”

### 4.5 Competitor disparagement / fake-review handling
**Triggers:** “competitor,” “fake review,” “never been there”
**Expected:**
- response remains neutral: “We can’t locate this experience; please contact us so we can investigate”
- no accusations, no mention of reporting/removal promises

---
## 5) End-to-End Verification Runbook (Sandbox or Limited Live)
### Track A — Sandbox/Simulated Posting (preferred)
1. Import a set of 10 reviews (mix of positive/neutral/negative) across verticals (dentist/med spa/HVAC).
2. Generate drafts.
3. Verify:
   - offline CTA present on negatives
   - no prohibited content
   - correct escalation levels
4. Approve 6 safe drafts (L0–L2) and attempt to post.
5. Create 2 legal-threat reviews and 2 PHI-sensitive reviews; verify:
   - legal-threat responses are blocked_manual_review
   - PHI responses do not confirm relationship or reference records
6. Export audit logs for all 10 items.
7. Run weekly KPI report for the window covering these actions.
8. Reconcile counts (see Section 7).

### Track B — Limited Live Test (if no sandbox exists)
**Safety constraints:**
- Use ONE internal/low-risk location.
- Post maximum 3–5 responses.
- Do NOT test with real PHI or real legal threats publicly. Use internal crafted reviews only if they are already in the platform and safe; otherwise run those cases in dry-run (blocked) mode.

Steps:
1. Select 3 genuine low-risk reviews already present (1 positive, 1 neutral, 1 mild negative).
2. Generate drafts → human approve.
3. Post.
4. Verify post appears on platform and matches approved text exactly.
5. Trigger one legal-threat test in dry-run (must block) OR by internal test review if available; ensure not posted.
6. Export audit logs and run KPI report.

---
## 6) Audit Trail Requirements (must be present in logs)
Each review response attempt must log:
- review_source: Google|Yelp
- review_id
- business_id / location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level
- response_mode: auto|manual_only
- draft_version
- model_version / prompt_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- post_status: posted|blocked_manual_review|post_failed
- posted_timestamp (nullable)
- error_code (nullable)
- final_response_text
- hold_reason (nullable)
- detector_version
- blocked_timestamp (nullable)
- unblocker_id (nullable)

Required events:
- draft_created
- flagged (if any risk)
- approved OR blocked_manual_review
- posted OR post_failed

---
## 7) Weekly KPI Report Reconciliation Rules (testable)
For a chosen date window:
1. Responses drafted count = count(draft_created)
2. Responses approved count = count(approved)
3. Responses posted count = count(posted)
4. Responses blocked count = count(blocked_manual_review)

**Must reconcile:**
- posted ≤ approved
- approved = posted + post_failed + (approved but not yet posted) [if async]
- blocked are excluded from posted but included in escalation totals

KPI definitions (minimum):
- Response rate = posted_responses / total_reviews_received
- Median first-response time = median(posted_timestamp - review_created_timestamp)
- Escalations by reason/level = count(flagged grouped)
- SLA compliance % (if SLA configured)

---
## 8) Go / No-Go Rubric (Exit Criteria)
### GO (all must be true)
1. Posting gate: all L4 legal threats are blocked_manual_review (0 leaks)
2. PHI: no response confirms relationship or references records/visits
3. Audit logs: required schema fields present for 100% of tested items
4. KPI report: reconciliation passes; counts match logs within 0 discrepancy
5. Yelp-specific: no removal promises, no competitor disparagement, no incentives language

### NO-GO (any one)
- Any legal-threat item posts publicly
- Any response contains prohibited content (Section 3.1)
- Missing audit events or inability to export logs
- KPI report miscounts posted vs blocked vs failed

---
## 9) Evidence / Attachment Checklist (what to return to QA for sign-off)
Return the following to agent_bob_replit+review-bot@agentmail.to:
1. Audit log export (CSV/JSON) for the test window
2. Screenshot(s) of:
   - one approved response before posting
   - the corresponding posted response on platform (for live track)
   - one blocked_manual_review item showing it cannot be posted
3. Weekly KPI report output (PDF/CSV) for the same window
4. Notes: environment (sandbox/live), location_id, test start/end timestamps, any errors encountered

---
## 10) Owner → Engineering Handoff Communications (ready to send)

### Email template (owner to engineering)
Subject: Launch Verification — Review Reply Autopilot QA Package + Sign-off Needed

Hi team,

We’re ready for end-to-end compliance verification for the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). Please use the attached QA Launch Package v1.3 to validate posting gates (including manual-only holds), audit logs, and weekly KPI reconciliation.

Public product page for reference/legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Return evidence bundle (audit log export + KPI output + screenshots) to: agent_bob_replit+review-bot@agentmail.to

Key launch blockers to confirm:
1) Legal-threat detector forces manual-only hold (blocked_manual_review) and cannot post via API or UI.
2) PHI-sensitive prompts never confirm patient relationship or reference records/visits.
3) Audit trail fields/events are emitted and exportable.
4) Weekly KPIs reconcile posted vs approved vs blocked.

Please reply with (a) which track you ran (Sandbox or Limited Live), (b) the evidence attachments, and (c) a signed GO/NO-GO result per Section 8.

Thanks,
Bob

### Slack message template
Heads up: QA Launch Package v1.3 is ready for the Review Reply Autopilot (Google/Yelp). Need engineering to run the sandbox or limited live verification: posting gates (legal-threat = blocked_manual_review), PHI non-confirmation, audit logs, KPI reconciliation.

Reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Send evidence bundle to agent_bob_replit+review-bot@agentmail.to.

---
## Versioning
- Package: v1.3
- Templates library: v2 (18 templates across Dentist/Med Spa/HVAC)
- Checklist: v2
- Playbook: v2
- QA report: v3

End of document.
