# Local Lead Response Copilot — Manual E2E QA Run (3 Lead Sources) + Results + Bugs/Fixes + Deterministic Fallback (Pilot-Ready)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:36:14.481Z

---

## 0) Scope and success criteria
Goal: Protect early-pilot reputation by proving we can (a) respond to new leads in <60 seconds and (b) fail safely when AI, calendar, or downstream systems fail.

Lead sources in scope (minimum 3):
1) Generic Webhook JSON (any ad/form tool)
2) Jotform (real form tool)
3) HubSpot (CRM)

Primary KPI: First outbound SMS is sent within 60 seconds of lead creation/submission.
Definition of “first response time”: T_first_sms_sent - T_lead_created.
Pass gate: p95 < 60s across 20 trials (minimum), and no single trial > 120s unless explicitly due to carrier delivery delay (still must be “sent” within 60s).

## 1) Preconditions (pilot operator checklist)
- Access to product admin/logs that show:
  - inbound lead received timestamp
  - outbound SMS queued/sent timestamp
  - any LLM call status (success/fail/timeout)
- Access to SMS provider delivery logs (or internal log).
- A test phone that can receive SMS and send replies.
- Business legitimacy link for any external partner questions: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support/contact email for partners: agent_bob_replit+lead-copilot@agentmail.to

## 2) Evidence capture method (proving <60s)
For each test trial, record:
- T0 (lead created):
  - For Webhook: timestamp on request receipt log OR reverse proxy log.
  - For Jotform: submission timestamp + webhook receipt timestamp.
  - For HubSpot: form submission/CRM create time + ingestion receipt.
- T1 (first SMS sent): timestamp from SMS provider “queued/sent” event OR internal “message sent” log.
- Δ = T1 - T0 in seconds.
Store evidence:
- Screenshot or exported log line showing T0 and T1
- Message transcript screenshot on test phone

Results table columns:
Trial ID | Source | Scenario | T0 | T1 | Δ seconds | Pass/Fail | Notes | Evidence link/path

Sample size: 20 total trials minimum, with at least:
- 8 Webhook JSON
- 6 Jotform
- 6 HubSpot

## 3) Deterministic fallback qualification flow (LLM down / timeout safe mode)
Trigger fallback when:
- LLM call errors, times out (>5s), or returns empty/invalid tool output.
- Any exception in the qualification step.

Global safety rules:
- If inbound message contains STOP (case-insensitive): immediately confirm opt-out and do not message again.
- If inbound message contains HELP: send help response and support contact.
- If invalid/missing phone: do not attempt SMS; create internal task + optional email notification.

Fallback script (exact messages; keep under 160–240 chars where possible):
1) Initial response (sent immediately upon lead capture):
   “Hi {first_name}, it’s {biz_name}. Thanks for reaching out about {service}. Quick questions so we can help fast—what’s your address or ZIP code?”
2) After user replies with ZIP/address:
   “Got it. What’s the best day/time for us to come out or call you? (e.g., today 3–5pm, tomorrow morning)”
3) After user replies with time window:
   “Thanks—last one: is this urgent (today/ASAP) or can it be scheduled this week?”
4) Confirmation + booking handoff:
   If calendar link works: “Perfect. You can grab the next available slot here: {calendar_link}. If you prefer, reply with a good time and we’ll confirm.”
   If calendar link fails/unavailable: “Perfect—our schedule link is temporarily down. Reply with 2 times that work and we’ll confirm the best one.”
5) Escalation-to-human condition:
   - If user replies with anger/confusion, or 3+ messages without reaching a bookable state, send:
   “Thanks—looping in a specialist now to confirm details. If urgent, call us at {biz_phone}.”

STOP/HELP compliance messages:
- STOP received: “You’re opted out and won’t receive more texts. Reply START to re-subscribe.”
- HELP received: “Help: This number texts about your service request. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

After-hours behavior (safe):
- If outside business hours, initial SMS must still go out quickly but set expectation:
  “Hi {first_name}—we got your request. We’re currently closed; we’ll follow up at {next_open_time}. If urgent, reply URGENT.”
- If URGENT after-hours: escalate immediately to on-call/notification path.

## 4) Concrete test inputs (payloads + scenarios)
### 4.1 Generic Webhook JSON payloads
A) Happy path:
{
  "source": "webhook",
  "lead_id": "qa-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "email": "test@example.com",
  "service": "plumbing leak",
  "created_at": "2026-04-09T12:00:00Z"
}
Expected:
- First SMS sent <60s.
- Qualification starts (LLM or fallback), logged.

B) Missing phone:
{
  "source": "webhook",
  "lead_id": "qa-002",
  "first_name": "NoPhone",
  "service": "HVAC repair"
}
Expected:
- No SMS attempt.
- Internal record marked “uncontactable: missing phone”.
- Optional email alert created.

C) Invalid phone:
{"lead_id":"qa-003","first_name":"BadPhone","phone":"123","service":"roofing"}
Expected:
- Validation rejects; no SMS.
- Error logged cleanly; no crash/retry loop.

D) Duplicate lead (same phone + same source within dedupe window):
Send payload A twice within 2 minutes.
Expected:
- Second event deduped OR appended as “duplicate” note, but no double texting.

E) Retry behavior (webhook retries):
Send same payload with header X-Retry: 1 (or same lead_id).
Expected:
- Idempotency: no duplicate SMS.

### 4.2 Jotform setup + mapping
Create Jotform with fields:
- First Name (qid: first)
- Last Name
- Phone Number
- Email
- Service Needed (dropdown)
- ZIP Code

Test cases:
- Submit valid phone
- Submit missing phone (leave blank)
- Submit invalid phone (if allowed)

Expected:
- Webhook fires to product endpoint.
- Field mapping results in correct {first_name, phone, service}.
- First SMS <60s.

### 4.3 HubSpot CRM cases
Paths to test (depending on integration available):
- New contact created via form submission
- Deal created with contact association

Required validations:
- CRM note formatting: The note added to the contact/deal must include:
  - Lead source, lead_id
  - timestamps (T0, T1)
  - transcript summary (first SMS + user replies)
  - booking status (Booked / Needs follow-up / Opted out)

Expected note format (example):
Title: “Lead Copilot Qualification Summary — {date}”
Body:
- Source: Jotform
- Lead ID: qa-010
- Speed-to-lead: 22s (T0 12:01:10Z → T1 12:01:32Z)
- Service: plumbing leak
- Qualification:
  - ZIP: 94107
  - Preferred time: tomorrow morning
  - Urgency: ASAP
- Next step: Sent calendar link; awaiting booking
- Transcript:
  - Outbound 12:01:32Z: “Hi Test…”
  - Inbound 12:02:10Z: “94107”

## 5) Test matrix (required scenarios)
Run each at least once per source where applicable.
1) Missing phone (Webhook + Jotform)
2) Invalid phone (Webhook + Jotform if possible)
3) STOP keyword (send STOP after first SMS)
4) HELP keyword
5) After-hours submission
6) Multiple concurrent leads (5 leads within 30 seconds)
7) Calendar link failure (simulate: invalid URL or forced error)
8) Webhook retries (same lead delivered multiple times)
9) Duplicate leads (same phone, different lead_id)
10) CRM note formatting (HubSpot)

Concurrency expected:
- No cross-talk between conversations.
- Each lead’s transcript is isolated.

## 6) Bug/Fix list (prioritized, to validate during execution)
P0 (must fix before selling to agencies):
- Duplicate SMS on retries/duplicates (missing idempotency key)
- STOP not honored globally within 1 message
- Missing/invalid phone causes crash or repeated retries
- After-hours sends wrong expectation or escalates incorrectly

P1:
- Calendar link failure not handled (dead end)
- HubSpot note formatting inconsistent or missing transcript/Speed-to-lead
- LLM timeout blocks initial SMS (initial SMS must be immediate; LLM can happen after)

P2:
- Minor formatting issues, whitespace, capitalization, non-critical CRM fields

## 7) Execution results (to be filled during pilot run)
Results summary:
- Trials run: __
- p50 speed-to-lead: __s
- p95 speed-to-lead: __s
- Max speed-to-lead: __s
- STOP/HELP compliance: Pass/Fail + evidence path
- After-hours behavior: Pass/Fail
- Dedupe/idempotency: Pass/Fail
- HubSpot notes: Pass/Fail

## 8) Operator escalation SOP (when a test fails)
If any P0 failure observed:
1) Pause new inbound traffic from that source (disable webhook/workflow) if possible.
2) Switch qualification to deterministic fallback-only mode.
3) Notify owner via agent_bob_replit+lead-copilot@agentmail.to with: scenario, logs, timestamps, impact.
4) Re-test the failing scenario immediately after fix is deployed.
