# Local Lead Response Copilot — Pilot Manual E2E Test Plan + Results (3 Lead Sources) + Bug Log + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:14:57.276Z

---

## 0) Context / Legitimacy (share with agencies)
- Product: Local Lead Response Copilot (Instant SMS + AI Qualification)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

## 1) Goal
Validate end-to-end behavior across **3 lead sources** and confirm:
1) **Speed-to-lead KPI:** first outbound SMS sent **< 60 seconds** from lead submission/event.
2) **Safety & compliance:** STOP/HELP handling, after-hours behavior, dedupe/retry protection.
3) **Reliability fail-safes:** deterministic qualification flow when LLM fails/timeouts.
4) **Data integrity:** CRM note formatting and content correctness.

## 2) Lead Sources Under Test
A) **Generic Webhook JSON** (represents FB lead ads, website forms, Zapier/Make)
B) **Jotform** (real form tool, free tier)
C) **HubSpot CRM** (free tier)

## 3) Instrumentation / Evidence Collection
### 3.1 Required timestamps
For each trial capture:
- **T0 Lead Created:** submission timestamp from source (Jotform submission time / HubSpot form submit time / webhook request time).
- **T1 Webhook Received:** server log timestamp (or request log) when event hits the copilot.
- **T2 First SMS Sent:** SMS provider log timestamp (or app event “message_sent”).
- Compute **Δ = T2 - T0** in seconds.

### 3.2 Evidence to store (minimal)
- Screenshot/export of source submission timestamp.
- Screenshot/log line showing outbound SMS send time.
- Message transcript (for STOP/HELP tests).
- CRM record screenshot showing note format.

### 3.3 Sample size target (pilot)
- Minimum: **20 trials total** across sources (suggested: 8 webhook, 6 Jotform, 6 HubSpot).
- Must include at least 1 run of each edge case below.

## 4) Acceptance Criteria (Pass/Fail)
### 4.1 KPI
- PASS if **95%+** of valid-phone leads receive first SMS within **<60s**.
- FAIL if any systematic issue causes >60s median, or if retries/dedupe create delays.

### 4.2 Safety
- Missing/invalid phone → no SMS attempt; record error; optional email/CRM note; no crash.
- STOP → immediate suppression (no further marketing/qualification SMS).
- HELP → send compliant help text (who we are + opt-out instruction) and optionally route to human.
- After-hours → send an after-hours message and next-step promise; do not spam.

### 4.3 Reliability
- If LLM errors/timeouts → deterministic flow triggers within 2 seconds of LLM failure; qualification continues.
- Calendar link failures → apology + offer alternate (manual booking link or “reply with times”).
- Webhook retries/duplicates → idempotent behavior (no duplicate conversations).

### 4.4 CRM formatting (HubSpot)
- A note is appended with: source, timestamps, qualification Q/A, disposition, booking link attempt, and suppression flags (STOP).
- Notes are readable (no raw JSON dumps unless explicitly in a code block).

## 5) Deterministic Fallback Qualification Spec (LLM-down Safe Mode)
Trigger conditions:
- LLM API error (non-200), timeout > 3s, empty response, or safety refusal.
- Also allow manual operator toggle “Deterministic Mode ON”.

### 5.1 Message 1 (sent immediately)
"Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out — quick question so I can get you the right info: what service do you need?\n1) Repair\n2) Replacement\n3) Estimate/Quote\nReply 1/2/3."

### 5.2 Branching
- If reply is 1/2/3 → proceed to Q2.
- If reply contains STOP → go to STOP handler.
- If reply contains HELP → go to HELP handler.
- If unclear/non-matching → resend options once, then escalate.

### 5.3 Q2 (job type detail)
"Got it. What’s the address or ZIP code for the job?" (store as location)

### 5.4 Q3 (timing/urgency)
"How soon do you need help?\n1) Today\n2) This week\n3) Just pricing"

### 5.5 Q4 (best callback)
"What’s the best time for a quick call?\n1) Morning\n2) Afternoon\n3) Evening"

### 5.6 Booking behavior
- If calendar is healthy: send booking link:
  "Perfect — you can grab a time here: {{calendar_link}}. If you’d rather, reply with 2 time windows and we’ll confirm."
- If calendar fails: send manual fallback:
  "Looks like our booking link is having trouble. Reply with 2 time windows that work for you and we’ll confirm ASAP."

### 5.7 Escalation / human handoff
If user doesn’t answer after 2 prompts or replies with complex request:
"Thanks — I’m going to have a specialist follow up. What’s the best email to reach you too?"
Also create a CRM task/notification “Manual follow-up needed”.

### 5.8 STOP/HELP handlers
STOP handler (must suppress future messages):
"You’re opted out and won’t receive more texts. Reply START to resubscribe."

HELP handler:
"This is {{business_name}} responding to your inquiry. Reply STOP to opt out. For help email us at agent_bob_replit+lead-copilot@agentmail.to."

## 6) Test Matrix (Edge Cases)
Run each at least once per source where applicable.
1) Missing phone
2) Invalid phone (letters, too short, wrong country)
3) STOP
4) HELP
5) After-hours submission
6) Multiple concurrent leads (5 leads within 30 seconds)
7) Calendar link failure (simulate by using invalid URL or forced 500)
8) Webhook retries (same payload resent 3 times)
9) Duplicate leads (same phone + same source within 5 minutes)
10) CRM note formatting verification

## 7) Source-Specific Setup + Test Payloads
### 7.1 Generic Webhook JSON
Assume endpoint: POST {{COPILOT_WEBHOOK_URL}} (to be provided during pilot)
Headers:
- Content-Type: application/json
- X-Source: generic

Valid payload:
{
  "source": "generic_webhook",
  "lead_id": "gw-{{uuid}}",
  "created_at": "{{iso_timestamp}}",
  "first_name": "Jamie",
  "last_name": "Lee",
  "phone": "+14155551234",
  "email": "jamie.lee@example.com",
  "service": "HVAC repair",
  "message": "AC stopped cooling",
  "utm": {"campaign":"summer","adset":"a1"}
}

Missing phone payload:
{
  "source": "generic_webhook",
  "lead_id": "gw-missing-phone-{{uuid}}",
  "created_at": "{{iso_timestamp}}",
  "first_name": "Casey",
  "email": "casey@example.com",
  "service": "Plumbing",
  "message": "Need leak fixed"
}
Expected: no SMS send; CRM/log entry “phone_missing”; operator alert.

Invalid phone payload (too short):
{
  "source": "generic_webhook",
  "lead_id": "gw-invalid-phone-{{uuid}}",
  "created_at": "{{iso_timestamp}}",
  "first_name": "Riley",
  "phone": "55512",
  "service": "Roofing",
  "message": "Estimate needed"
}
Expected: no SMS; log “phone_invalid”.

Retry/duplicate test:
- Re-send the exact same JSON (same lead_id) 3 times.
Expected: idempotent; only one conversation and one first SMS.

### 7.2 Jotform (Free)
Fields to create:
- Name (First/Last)
- Phone
- Email
- Service dropdown
- Message textarea
- Hidden field: lead_id (prefill with {submission_id} if possible)

Webhook configuration:
- In Jotform: Settings → Integrations → Webhooks → paste {{COPILOT_JOTFORM_WEBHOOK_URL}}

Test steps:
1) Submit valid lead; record Jotform submission time (T0).
2) Verify first SMS <60s (T2) and message matches either AI or deterministic flow.
3) Submit missing phone: should not SMS.
4) Submit invalid phone: should not SMS.
5) After-hours submission: should send after-hours script.

### 7.3 HubSpot (Free)
Two options:
A) HubSpot Form submission → webhook/automation to copilot (preferred if implemented)
B) HubSpot API “New contact” event → copilot (if available)

Expected CRM note format (example):
Title: "Lead Copilot Qualification"
Body:
- Source: HubSpot Form: "Request Service"
- Lead created: 2026-05-14T18:22:10Z
- First SMS sent: 2026-05-14T18:22:33Z (Δ 23s)
- Conversation ID: lc_abc123
- Q/A:
  Q1 Service needed: Repair
  Q2 ZIP: 94107
  Q3 Urgency: Today
  Q4 Best time: Afternoon
- Disposition: Qualified / Needs callback
- Booking: Calendar link sent (or calendar_failed=true)
- Compliance: stop_flag=false help_flag=false

STOP test in HubSpot context:
- Use a test number you control; reply STOP.
Expected: stop_flag=true stored; no further messages.

## 8) Results Capture Table (copy/paste)
Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (valid/missing phone/STOP/etc.)
- T0 lead created
- T1 webhook received
- T2 first SMS sent
- Δ seconds (T2-T0)
- Pass/Fail
- Notes / links to evidence

## 9) Bug/Fix Log Template (copy/paste)
- Bug ID:
- Severity (P0 compliance / P1 revenue / P2 annoyance):
- Source:
- Scenario:
- Steps to reproduce:
- Expected:
- Actual:
- Evidence link(s):
- Suspected cause:
- Recommended fix:
- Owner:
- Status:

## 10) Common Failure Modes + Prescribed Fixes
1) Duplicate SMS on retries → implement idempotency key: (source + lead_id) or (phone + created_at window).
2) Slow first response (>60s) → send Message 1 immediately before any enrichment; queue LLM work after first SMS.
3) LLM outage breaks flow → deterministic mode auto-trigger.
4) Calendar failures → detect non-200/timeout and switch to manual scheduling prompt.
5) STOP not honored → central suppression list keyed by phone; checked before every send.

---
Owner/operator instruction for pilots: Run this packet during onboarding for every new agency/client and keep the evidence bundle (screenshots + logs). This is the fastest path to protect reputation pre-revenue while keeping effort under 60 minutes per pilot.
