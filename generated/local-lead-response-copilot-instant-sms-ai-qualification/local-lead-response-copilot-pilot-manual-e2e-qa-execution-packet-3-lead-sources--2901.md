# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet (3 Lead Sources) + Payloads + Expected Results + Evidence Checklist + Incident SOP

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:35:27.172Z

---

## Purpose (pilot-stage, revenue-friendly)
This packet enables a repeatable *manual* end-to-end QA run for early pilots (no automation) across 3 lead sources:
1) Generic Webhook JSON (any form/ad tool)
2) Jotform (real form tool)
3) HubSpot (CRM)

Primary KPI: **first outbound SMS sent < 60 seconds** after lead capture.
Reputation protections: STOP/HELP compliance, deterministic fallback if LLM fails, safe handling of missing/invalid phone, dedupe, retries, after-hours routing, calendar link failures, concurrency.

---

## Preconditions / Required Access (no spend)
- Access to the product admin/logs showing: inbound lead received timestamp, outbound SMS queued timestamp, outbound SMS sent/delivered timestamp (or provider accepted).
- Ability to trigger:
  - Generic webhook endpoint (via curl/Postman)
  - Jotform submission (free tier)
  - HubSpot lead/contact creation (free developer/test account)
- A test phone number to receive SMS (can be a team member’s phone during pilots).
- Customer comms channel for incidents: **agent_bob_replit+lead-copilot@agentmail.to**
- Legitimacy link for pilots/agency partners: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

---

## Measurement Method (<60s KPI)
Record 3 timestamps per trial (use ISO format):
T0 = lead submitted/received (source timestamp or webhook received time)
T1 = product logs: first SMS queued
T2 = provider accepted/sent (or delivered if available)

**Pass**: (T1 - T0) <= 60 seconds. If only T2 is available, use (T2 - T0) <= 60 seconds but note it includes carrier delay.

**Sample size for pilot proof**: 20 total trials (minimum) across sources:
- Webhook: 8
- Jotform: 6
- HubSpot: 6

**Evidence requirement per source**: at least 2 screenshot/log captures showing T0 and T1 (and T2 if available).

---

## Evidence Capture Checklist (for agency trust)
For each trial, save:
1) Source proof of submission (webhook request log, Jotform “Submission Received” page, or HubSpot activity time)
2) Product log line for inbound lead received (with lead_id)
3) Product log line for first outbound SMS queued/sent
4) SMS transcript on the receiving phone for the first message

File naming convention:
- YYYYMMDD_source_testcase_trial#_leadId.png (screenshots)
- YYYYMMDD_source_testcase_trial#_leadId.txt (copied logs)

Store in a single folder per run: PilotQA_Run_YYYYMMDD/

---

## Deterministic Fallback Qualification Flow (LLM-safe mode)
Trigger fallback when:
- LLM times out > 8s
- LLM returns error
- LLM returns empty/invalid output
- Downstream tool errors (calendar API) where deterministic response is safer

### Message 1 (immediate)
“Hi {first_name}—thanks for reaching out to {business_name}. Quick question so we can help fast: what service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other.”

### Branching
- If reply 1/2/3/4: proceed to Message 2
- If free-text: map to closest option; if unsure, treat as “Other”

### Message 2
“Got it. What’s your ZIP code?”
- Validate 5 digits. If invalid: “Please reply with a 5-digit ZIP code.”

### Message 3
“When would you like us to come out? Reply 1) ASAP 2) This week 3) Next week”

### Message 4 (handoff / booking)
If calendar link healthy:
“Perfect—here’s the soonest availability: {calendar_link}. If you prefer, reply with a day/time window and we’ll confirm.”

If calendar link failure detected:
“Thanks—our booking link is temporarily down. Reply with a preferred day/time window and we’ll confirm ASAP.”

### Escalation rules
- If user answers all 3 questions: create/update lead + add qualification summary; notify human if needed.
- If no reply within 10 minutes: send one nudge: “Just checking—still want to get this scheduled?”
- After 30 minutes no reply: stop.

---

## STOP / HELP Compliance
Any inbound message containing STOP/UNSUBSCRIBE/CANCEL/QUIT:
- Immediately send: “You’re unsubscribed and will no longer receive messages. Reply HELP for info.”
- Mark lead as DNC (do not contact) and prevent any further automated outbound.

Any inbound HELP:
- Send: “Help: This is {business_name} scheduling. Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to.”

Pass criteria:
- No further messages after STOP.
- HELP response is sent within 60s.

---

## Test Cases (required)
### A) Missing phone
Input: lead payload has no phone or blank.
Expected:
- No SMS attempted.
- Lead still created with status “Needs phone”.
- If email exists, send a single email to request phone OR flag for human follow-up.

### B) Invalid phone
Input: phone = “123”, or non-E.164.
Expected:
- No SMS attempted.
- Validation error recorded.
- Lead status “Invalid phone”.

### C) STOP/HELP
Expected as above; store transcript evidence.

### D) After-hours
Define business hours (pilot default): Mon–Fri 8am–6pm local.
Expected:
- After-hours: send either (a) immediate acknowledgement + promise follow-up time, or (b) queue first outreach for next opening—*but still must be deterministic and consistent*.
- No aggressive back-and-forth at 2am.

### E) Multiple concurrent leads
Trigger 5 leads within 30 seconds.
Expected:
- All get first response <60s.
- No cross-talk between conversations.

### F) Calendar link failures
Simulate calendar endpoint returning 500/timeout.
Expected:
- Deterministic Message 4 (collect time window), no dead link.

### G) Webhook retries
Send identical payload 3 times.
Expected:
- Exactly one conversation started.
- Log shows dedupe key hit.

### H) Duplicate leads (same phone new source)
Expected:
- Update existing lead record, append note “Duplicate submission” with timestamps.
- Do not restart qualification if already mid-convo (unless explicit rule).

### I) CRM note formatting (HubSpot)
Expected note format (single note per lead update, readable):
Title: “Lead Copilot Qualification Summary”
Body example:
- Source: Jotform
- Submitted: 2026-05-14T19:22:31Z
- First SMS queued: 2026-05-14T19:22:47Z (16s)
- Service: Repair
- ZIP: 78704
- Timing: ASAP
- Outcome: Sent calendar link / Collected time window
- Opt-out: No

Pass: No broken markdown, no JSON blobs, no missing line breaks.

---

## Copy/Paste Test Payloads — Generic Webhook JSON
Use these to hit the product’s inbound webhook endpoint once available.

### 1) Valid lead
{
  "source": "webhook_test",
  "lead_id": "wh_001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "email": "testlead@example.com",
  "service": "Water heater repair",
  "submitted_at": "2026-05-14T19:20:00Z"
}

### 2) Missing phone
{
  "source": "webhook_test",
  "lead_id": "wh_002",
  "first_name": "NoPhone",
  "phone": "",
  "email": "nophone@example.com",
  "service": "AC install",
  "submitted_at": "2026-05-14T19:21:00Z"
}

### 3) Invalid phone
{
  "source": "webhook_test",
  "lead_id": "wh_003",
  "first_name": "BadPhone",
  "phone": "123",
  "email": "badphone@example.com",
  "service": "Roof quote",
  "submitted_at": "2026-05-14T19:22:00Z"
}

### 4) Duplicate / retry (same lead_id)
(re-send payload #1 three times)
Expected: dedupe.

---

## Results Table (fill during run)
Columns:
Trial# | Source | Test case | Lead identifier | T0 | T1 | T2 | Delta (T1-T0) | Pass/Fail | Notes/Evidence file

Minimum acceptance:
- 18/20 trials meet <60s T1-T0
- 0 STOP violations
- 0 cross-talk between concurrent leads

---

## Bug/Fix Log Template (pilot)
Bug ID | Severity (P0/P1/P2) | Scenario | Steps | Expected | Actual | Impact | Suggested fix | Owner | Status

Severity guidance:
- P0: STOP compliance, messages sent to wrong person, repeated spam, >60s consistently
- P1: calendar failures causing dead ends, dedupe not working, CRM notes unreadable
- P2: copy tweaks, minor formatting

---

## Incident Response SOP (pilot, fast)
### Incident types
1) LLM down/timeouts
2) SMS provider delays/failures
3) Calendar link/API outage

### Immediate actions (within 5 minutes)
- Switch to deterministic fallback mode (defined above).
- Post an internal note with timestamp and scope (which leads affected).

### Customer communication (within 15 minutes)
Email from: agent_bob_replit+lead-copilot@agentmail.to
Subject: “Lead Copilot status: temporary issue, leads still handled”
Body:
“Hi — we’re seeing a temporary issue with {LLM/SMS/Calendar}. We’ve switched your account to safe mode so leads still get an immediate text and we collect the key details. No action needed. We’ll confirm when normal mode is restored. Reference: {timestamp/run-id}. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

### Resolution
- Confirm recovery.
- Run 3 quick regression checks: valid lead, STOP, calendar.
- Summarize incident + prevention item in bug log.
