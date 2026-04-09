# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Results + Bug/Fix Log + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:19:07.474Z

---

## 1) Purpose & Scope
Validate end-to-end lead capture → first SMS response → qualification → booking handoff/CRM logging for **Local Lead Response Copilot**. This is a manual, pilot-friendly QA runbook (no automation) to reduce churn risk and protect agency reputation.

**Product/legitimacy URL to share when needed:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
**Support/ops email:** agent_bob_replit+lead-copilot@agentmail.to

### Lead sources under test (minimum 3)
1) **Generic Webhook JSON** (any form/ad tool that can POST JSON)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM logging + formatting)

### Primary KPI
**First-response time (lead received → first outbound SMS sent) must be < 60 seconds**.
- Target: p95 < 60s (pilot bar)
- Absolute: no individual test > 90s without incident note

### Evidence requirements
For every test run, capture:
- Timestamp A: lead submitted (or webhook request time)
- Timestamp B: webhook received by our system (if visible in logs)
- Timestamp C: first SMS send time (provider log) and/or delivery time
- Transcript (inbound/outbound)
- CRM record update screenshot/export (HubSpot note)


## 2) Environment & Preconditions
- A sending phone number exists (Twilio or equivalent) with messaging enabled.
- A test recipient phone you control.
- Ability to view provider logs (message send timestamps).
- Access to internal logs or a request log (even basic server log output).

**Business-safe defaults to configure before testing**
- After-hours window: e.g., 6pm–8am local time + weekends (customizable).
- Dedupe window: 10 minutes by default (same phone + same source).
- Retry policy: webhook retries accepted safely (idempotent).


## 3) Deterministic Safe-Mode (LLM Failure) — Required Behavior
When LLM fails, times out, or returns invalid output, system must switch to **Deterministic Mode** for that lead/session.

### Trigger conditions
- LLM API error/timeout
- Output missing required fields (intent, service type, urgency, address/zip) after N attempts
- Safety/compliance filter blocks output

### Deterministic Mode conversation (copy-paste exact SMS)
**Message 1 (immediate):**
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—can I ask 3 quick questions to get you a fast quote?”

If YES / any response besides STOP/HELP (or if user responds with a question):
**Q1 (service category):**
“1/3 What do you need help with?
A) Repair
B) Install/Replace
C) Estimate/Quote
Reply A, B, or C.”

**Q2 (timing/urgency):**
“2/3 When do you need this?
A) ASAP (today/24h)
B) This week
C) Flexible
Reply A, B, or C.”

**Q3 (location):**
“3/3 What’s your ZIP code?”

**Handoff / booking:**
- If calendar link available: “Perfect—book the soonest time here: {{calendar_link}}. If you prefer, reply with a good time window and we’ll confirm.”
- If calendar link unavailable/failing: “Thanks—our booking link is temporarily down. Reply with 2 times that work for you (e.g., today 3–5 or tomorrow 9–11) and we’ll confirm right away.”

**Escalation-to-human rule:**
- If user gives freeform response that doesn’t map to A/B/C twice, send: “No problem—reply with a short description (1 sentence) and the best callback number if different.” Then notify human.

### Compliance behaviors (must pass)
- If user texts **STOP**: immediately respond “You’re opted out and won’t receive further messages. Reply START to opt back in.” and set contact to DND.
- If user texts **HELP**: respond “Support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
- No further marketing/qualification messages after STOP.


## 4) Test Data & Payloads
### 4.1 Generic Webhook JSON (POST)
Use this payload set; vary fields for edge cases.

**Baseline (valid):**
{
  "source": "webhook-test",
  "lead_id": "T-001",
  "first_name": "Testy",
  "last_name": "McLead",
  "phone": "+14155550123",
  "email": "test@example.com",
  "service": "Plumbing",
  "message": "Need a quote for a leaking faucet",
  "submitted_at": "{{ISO8601}}"
}

**Missing phone:** same as above but omit phone.

**Invalid phone:** "phone": "1234"

**Duplicate lead:** same phone + same lead_id + within 10 minutes.

**Retry simulation:** resend the exact same payload 3 times within 60 seconds.

### 4.2 Jotform field mapping (minimum)
Create fields:
- Name (first/last)
- Phone
- Email
- Service needed (dropdown)
- Message
- Hidden: source=jotform
- Hidden: form_id
- Hidden: submitted_at

Expected: Jotform submission → webhook → first SMS < 60s.

### 4.3 HubSpot expected logging
For each lead/session, HubSpot should have:
- Contact created or updated (dedupe by phone)
- A note (engagement) with normalized formatting (see section 7)


## 5) Execution Steps (per lead source)
### 5.1 Generic Webhook JSON
1) Start a stopwatch.
2) Send POST to webhook endpoint with Baseline payload.
3) Record Timestamp A (request sent) and B (server receipt log).
4) Verify first SMS is sent; capture provider log Timestamp C.
5) Respond as the lead; proceed through qualification.
6) Verify booking/handoff path.
7) Verify HubSpot contact + note.

### 5.2 Jotform
1) Submit the published test form.
2) Record the exact submission time (A).
3) Verify webhook receipt (B) and first SMS send (C).
4) Run STOP/HELP paths (separate tests).
5) Verify HubSpot logging.

### 5.3 HubSpot
1) Confirm contact dedupe and note formatting with:
   - First submission creates contact.
   - Second submission updates existing contact (no duplicates).
2) Confirm note includes source, timestamps, transcript excerpt, qualification outcomes, and booking link status.


## 6) Test Matrix (must-run cases)
Run each case at least once per lead source where applicable.

1) **Happy path**: valid phone → first SMS <60s → qualification → booking link.
2) **Missing phone**: no SMS attempt; create task/alert; optional email fallback.
3) **Invalid phone**: reject/flag; do not spam; log error.
4) **STOP**: user replies STOP at any point; immediate opt-out + no further texts.
5) **HELP**: user replies HELP; support message includes agent_bob_replit+lead-copilot@agentmail.to.
6) **After-hours**: lead arrives outside hours → either (a) immediate acknowledgement + schedule next morning, or (b) queue until opening (must be consistent). Document which.
7) **Concurrent leads**: 5 leads in <30s; ensure each gets unique session; no cross-talk.
8) **Calendar link failure**: booking link 500/timeout; switch to manual time-window collection.
9) **Webhook retries**: same payload repeated; only 1 outbound initial SMS; log idempotency.
10) **Duplicate lead**: same phone new lead_id; within dedupe window: do not restart spammy convo; instead: “Got it—still want help with {{service}}?”
11) **CRM note formatting**: verify exact format, readability, and no PII leakage beyond necessary.


## 7) Expected HubSpot Note Format (copy/paste)
**Title:** Lead Copilot — New Lead Qualified

**Body (template):**
Source: {{source}} ({{source_detail}})
Lead ID: {{lead_id}}
Submitted: {{submitted_at}}
First SMS sent: {{first_sms_sent_at}} ({{latency_seconds}}s)
Status: {{qualified|unqualified|opted_out|needs_human}}
After-hours: {{yes|no}}

Collected:
- Service: {{service_category}}
- Timing: {{asap|this_week|flexible}}
- ZIP: {{zip}}
- Notes: {{freeform_notes}}

Booking:
- Calendar link status: {{ok|failed|not_configured}}
- Booking link: {{calendar_link_or_none}}
- Proposed times (if manual): {{time_windows}}

Transcript (last 6 messages):
1) OUT: {{...}}
2) IN: {{...}}
...

System:
- Mode: {{LLM|Deterministic}}
- Errors: {{error_summary_or_none}}


## 8) Results Capture Table (fill during pilot)
Columns:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario
- Timestamp A (submit)
- Timestamp C (first SMS sent)
- Latency (sec)
- Pass/Fail (<60s)
- Transcript saved (Y/N)
- HubSpot updated (Y/N)
- Notes / anomalies

Acceptance: At least **20 total runs** across all sources; include at least 1 concurrency run and 1 retry run.


## 9) Bug/Fix Log (prioritized)
Record each issue with severity and churn risk.

Fields:
- Bug ID
- Severity (P0 compliance/data-loss, P1 revenue-impact, P2 UX, P3 cosmetic)
- Scenario
- Steps to reproduce
- Expected
- Actual
- Evidence (screenshots/log lines)
- Suggested fix
- Owner
- Status

High-risk (P0/P1) examples to watch:
- STOP not honored immediately (P0)
- Duplicate leads trigger multiple SMS blasts (P1)
- LLM failure causes conversation to stall (P1) → must fall back deterministically
- After-hours sends misleading “we’ll call now” messages (P1)
- Calendar outage blocks next step without alternative (P1)


## 10) What “Verified <60s” Means (definition)
We consider KPI verified when:
- For each of the 3 sources, at least 5 runs show latency <60s from submit/request (A) to first SMS send time (C), and
- No systemic outliers (e.g., consistent 70–90s) without identified root cause.

If latency cannot be measured precisely, store the closest available evidence (provider send log + server receipt log) and note measurement uncertainty.
