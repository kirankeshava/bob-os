# Local Lead Response Copilot — Pilot E2E QA Runbook (3 Lead Sources) + Results + Bug Log + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:42:59.500Z

---

# Local Lead Response Copilot — Pilot E2E QA Runbook
Business legitimacy URL to share with testers/customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/ops email for escalations: agent_bob_replit+lead-copilot@agentmail.to

## Goal (pilot-stage; no automation)
Validate that the system:
1) Sends first SMS to a new lead in <60 seconds (speed-to-lead KPI)
2) Qualifies safely even if the LLM fails (deterministic fallback questions)
3) Behaves correctly for compliance/edge cases: missing/invalid phone, STOP/HELP, after-hours, concurrency, calendar failures, retries, duplicates, and CRM note formatting.

## Lead sources under test (minimum 3)
A. Generic Webhook JSON (direct POST)
B. Jotform (free form tool)
C. HubSpot (free CRM/dev account)

## Test environment prerequisites
- A test SMS-enabled number in the product (the “sending number”).
- Ability to view message logs with timestamps (app logs, Twilio logs, or internal DB log).
- A single “Test Calendar Link” value (can be a placeholder URL) and the ability to disable/break it for failure testing.
- Ability to toggle or simulate “LLM error/timeout” (or set a short timeout threshold) to force deterministic mode.

## KPI definition and timing method
### KPI
First response latency = timestamp(first inbound lead event received by system) → timestamp(first outbound SMS queued/sent).
Pass criterion: P95 < 60s during manual test batch (pilot). Hard fail if any normal valid lead takes >60s without a documented downstream outage.

### Timing capture (manual, evidence-first)
For every trial, record:
- T0: Lead submitted time (form submit timestamp or webhook request timestamp)
- T1: Webhook received by our system (server log receipt timestamp)
- T2: First SMS queued/sent timestamp (message log)
- Latency = T2 - T1 (primary), also track T2 - T0 (secondary)
Evidence: screenshot or log excerpt showing T1 and T2.

Recommended sample size for pilot verification: 20 trials total across 3 sources (10 Jotform, 5 webhook JSON, 5 HubSpot).

## Deterministic fallback qualification flow (LLM-safe mode)
Trigger deterministic mode if:
- LLM call errors, times out (e.g., >8s), returns empty/invalid output, or confidence score below threshold.
- Also acceptable: a manual “safe mode” toggle for incidents.

### Global rules (apply in both LLM and deterministic modes)
- STOP: Immediately confirm opt-out and set “Do Not Contact”. No further messages.
- HELP: Provide brief help text, business identity, and support email.
- Quiet hours (after-hours): If outside business hours, send a single acknowledgment + next-day expectation; do not spam.
- Max message count: cap at 6 outbound messages per lead in first 24 hours unless the lead actively replies.

### Exact deterministic script (copy/paste)
Message 1 (immediate):
“Hi {first_name if available}—thanks for reaching out. This is the automated assistant for {business_name}. I can help get you booked fast. What service do you need? Reply with 1) Repair 2) Install 3) Quote 4) Other.”

If reply == STOP:
“Confirmed—you won’t receive any more texts from us. (Reply HELP for info.)”

If reply == HELP:
“We’re texting because you requested info from {business_name}. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

If no reply in 3 minutes:
“Quick question so we can route you—what service do you need? 1) Repair 2) Install 3) Quote 4) Other.”

On valid selection → Message 2:
“Got it. What’s your zip code?”

On zip code → Message 3:
“Thanks. When do you want this done? Reply 1) Today 2) This week 3) Next week 4) Not sure.”

On timing → Message 4:
“Perfect—what’s the best time to call you? 1) Morning 2) Afternoon 3) Evening.”

On time window → Message 5 (booking):
“Great. Here’s the booking link: {calendar_link}. If that link doesn’t work, reply ‘CALL’ and we’ll reach out.”

If calendar link is broken / user says it doesn’t work → Message 6:
“Sorry about that—our scheduler is having an issue. Reply with your preferred day/time and we’ll confirm by text.”

Escalation rule:
If user replies “CALL” or provides day/time, create a task for human follow-up and send:
“Thanks—someone will reach out shortly. If urgent, email agent_bob_replit+lead-copilot@agentmail.to.”

## Test cases (with acceptance criteria)
### 1) Missing phone number
Input: lead payload without phone
Expected: no SMS attempt; record error in logs; create CRM note “Missing phone” if CRM connected; notify internal channel/email.
Pass: system does not crash; does not send to null; lead marked “uncontactable”.

### 2) Invalid phone number
Input: “123”, “+1(555)abc”
Expected: validation rejects; no SMS; lead flagged invalid with reason.

### 3) STOP / HELP compliance
Input: lead replies STOP after first message
Expected: immediate confirmation; no further outbound messages.
HELP: returns help template + support email.

### 4) After-hours routing
Condition: outside business hours
Expected: single acknowledgement message + expectation; optionally collect one piece of info; do not send booking spam.

### 5) Multiple concurrent leads
Input: 5 leads within 30 seconds
Expected: each lead receives correct first SMS; no cross-talk; latency stays <60s.

### 6) Calendar link failure
Condition: calendar URL unreachable or returns error
Expected: send apology + alternative (“reply CALL” / propose times); create internal task; do not loop.

### 7) Webhook retries
Input: repeat same event_id/request multiple times
Expected: idempotent processing; only one SMS thread created; log “duplicate ignored”.

### 8) Duplicate leads (same phone, close time)
Input: same phone submits twice within 10 minutes
Expected: dedupe rule triggers; either (a) merge into same thread with note, or (b) ignore second. Must not spam with repeated intros.

### 9) CRM note formatting (HubSpot)
Expected note should include:
- Source (Jotform/Webhook/HubSpot)
- Timestamp
- Transcript (inbound/outbound)
- Qualification summary fields: service, zip, urgency, preferred time
- Booking status (booked link sent / booked / failed / escalated)
Pass: readable, no broken markdown, no missing line breaks.

## Source-specific setup and execution
### A) Generic Webhook JSON
Send POST to the product inbound endpoint (once available) with:
{
  "event_id": "qa-{timestamp}-{n}",
  "source": "webhook",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15555550123",
  "email": "test@example.com",
  "service": "Quote",
  "message": "Need help ASAP",
  "submitted_at": "{iso8601}"
}
Run: valid phone, missing phone, invalid phone, duplicate event_id, 3 rapid submissions.

### B) Jotform (free)
- Create form fields: First name, Last name, Phone, Email, Service dropdown, Message.
- Configure webhook integration to the product inbound endpoint.
Run: 10 submissions (include 2 duplicates, 2 invalid/missing phone). Capture Jotform submission time as T0.

### C) HubSpot (free/dev)
- Create a test contact pipeline or use Contacts.
- Configure workflow (or integration) to send new lead events to product OR have product create/update contact and add notes.
Run: 5 ingests. Verify note formatting and dedupe on same phone.

## Results table (copy into a sheet)
Columns:
Trial ID | Source | Scenario | T0 submit | T1 received | T2 first SMS | Latency(T2-T1) | Pass/Fail | Evidence link | Notes

## Bug log template (prioritized for churn risk)
Bug ID | Severity (P0-P3) | Scenario | Steps to reproduce | Expected | Actual | Impact (reputation/revenue) | Suggested fix | Owner | Status

Severity guidance:
- P0: compliance breach (STOP not honored), spamming, wrong person texted, >60s normal response repeatedly
- P1: calendar failures with no fallback, dedupe broken, CRM notes unreadable
- P2: copy issues, minor formatting, edge-case validation
- P3: cosmetic

## Execution checklist (<=60 minutes)
1) Confirm logs accessible for timestamps (T1/T2).
2) Run 5 webhook JSON trials (include duplicates/retries).
3) Run 10 Jotform trials (include missing/invalid phone).
4) Run 5 HubSpot trials (verify note formatting).
5) Run 5-lead concurrency burst.
6) Force LLM failure/timeout and run 3 trials to confirm deterministic mode works end-to-end.
7) Run STOP and HELP from a test handset and capture transcript evidence.
8) Summarize KPI results: average, P95; list all failures and create bug tickets.

## Definition of done (pilot)
- Evidence-backed KPI: P95 first response <60s across 20 trials.
- STOP honored 100% of the time.
- Deterministic safe mode successfully qualifies and escalates without LLM.
- No duplicate spam on retries/duplicates.
- HubSpot notes readable and complete.
