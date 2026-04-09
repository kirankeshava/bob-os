# Local Lead Response Copilot — Manual E2E Pilot QA Runbook (3 Sources) + Evidence Protocol + Deterministic Fallback Script

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:43:39.017Z

---

## Purpose
Protect early agency/customer reputation by manually validating end-to-end behavior (no automation) across 3 lead sources and the highest-risk scenarios. Primary KPI: **first outbound SMS within <60 seconds** of lead receipt.

## Systems Under Test (3 lead sources)
1) **Generic Webhook JSON**: any form/ads tool POSTing lead JSON.
2) **Jotform (real form tool)**: form submit -> webhook to Copilot.
3) **HubSpot (CRM)**: new contact / form submission -> Copilot -> note/engagement written back to HubSpot.

## Pre-flight checklist (do before any run)
- Confirm Copilot endpoint URL for inbound leads (webhook). Document it here: ____________________
- Confirm SMS provider is enabled and message logs are accessible (Twilio/other). Record log URL or method: ____________________
- Confirm business proof URL for testers/agencies: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support contact email for test notices/escalations: agent_bob_replit+lead-copilot@agentmail.to
- Confirm after-hours window (local time). Example: after-hours = 6pm–8am. Configure: ____________________
- Confirm calendar booking link (if used). Primary: ____________________  Backup: ____________________
- Confirm deterministic fallback mode is available (flag/config). Record how to toggle it: ____________________

## KPI: <60s first response — evidence protocol
### Timestamp points (must be captured for each trial)
- **T0 (Lead Submitted/Received):** timestamp when lead is submitted (Jotform submit confirmation time / webhook request time / HubSpot event time).
- **T1 (First SMS Sent):** timestamp from SMS provider “message created/sent” log.
- **T2 (First SMS Delivered) [optional]:** if available.

### How to collect evidence (audit-friendly)
For each trial:
1) Screenshot or export the lead submission record showing time (T0).
2) Screenshot the SMS log entry showing time (T1), destination number, and message body.
3) Save transcript (copy/paste) of the entire conversation if qualification continues.
4) If HubSpot is involved, screenshot the engagement/note on the contact timeline.

### Calculation
Latency = T1 - T0. Pass if **Latency ≤ 60 seconds**.
Target sample size for “verified”: **20 trials** total across sources, with at least:
- 8 webhook JSON
- 6 Jotform
- 6 HubSpot-originated (or HubSpot-writeback validation if HubSpot isn’t a lead origin yet)

## Standard lead schema (canonical)
Use this normalized mapping across tools:
- first_name
- last_name
- phone
- email
- service (job type)
- zip
- message (free text)
- source (e.g., jotform, webhook, hubspot)
- utm_campaign (optional)
- lead_id (unique id from source)

## Copy/paste test payloads — Generic Webhook JSON
Use curl/Postman. Replace ENDPOINT.

### A) Happy path (valid phone)
POST ENDPOINT
Content-Type: application/json
{
  "lead_id": "webhook-001",
  "source": "webhook",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "email": "test.lead@example.com",
  "service": "Roof repair",
  "zip": "94107",
  "message": "I have a leak and need an estimate this week.",
  "utm_campaign": "qa-happy-path"
}
Expected:
- First SMS sent <60s.
- Qualification begins (LLM or deterministic, depending on mode).

### B) Missing phone
{
  "lead_id": "webhook-002",
  "source": "webhook",
  "first_name": "NoPhone",
  "last_name": "Lead",
  "email": "nophone@example.com",
  "service": "Plumbing",
  "zip": "94107",
  "message": "Need a quote",
  "utm_campaign": "qa-missing-phone"
}
Expected:
- No SMS attempt.
- System records lead as “Needs phone” and (if supported) triggers email notification to agent_bob_replit+lead-copilot@agentmail.to.
- If CRM writeback exists, note should explicitly say: “No phone provided; SMS not sent.”

### C) Invalid phone
{
  "lead_id": "webhook-003",
  "source": "webhook",
  "first_name": "Bad",
  "last_name": "Phone",
  "phone": "123",
  "email": "badphone@example.com",
  "service": "HVAC",
  "zip": "94107",
  "message": "AC not cooling",
  "utm_campaign": "qa-invalid-phone"
}
Expected:
- Validation fails safely.
- No SMS sent.
- Lead flagged for manual review.

### D) Duplicate lead (same lead_id)
Send payload A again with same lead_id.
Expected:
- Dedup kicks in: no second SMS and no duplicate CRM note.
- Log should show “duplicate ignored” with id.

### E) Webhook retry simulation (same payload, different request id)
Send payload A with same lead_id, include header X-Request-ID unique each time.
Expected:
- Still dedup by lead_id (or phone+time window).

### F) Concurrency (5 leads within 10 seconds)
Send 5 payloads with lead_id webhook-010..014.
Expected:
- All get first SMS <60s.
- No cross-talk: each lead conversation stays isolated.

## Jotform test (real form tool)
### Setup (free tier)
- Create Jotform form: fields = First Name, Last Name, Phone, Email, Service Needed (dropdown), ZIP, Message.
- Configure Webhook integration to POST submission JSON to Copilot endpoint.
- Ensure phone is captured in E.164 if possible; otherwise document transformation rules.

### Jotform test cases
1) Happy path submission (valid phone)
2) Missing phone (leave blank)
3) Invalid phone (letters)
4) Duplicate submission (submit same phone twice within 2 minutes)
Expected:
- Same as webhook expectations + confirm mapping from Jotform field names to canonical schema.

## HubSpot test (CRM)
Two possible validation modes depending on integration maturity:
A) HubSpot as lead source (trigger from HubSpot form/new contact)
B) HubSpot as writeback target (Copilot writes qualification notes)

### Expected HubSpot note/engagement formatting (copy spec)
Title: “Lead Copilot Qualification — {Status}”
Body template (plain text, consistent lines):
---
Lead Copilot Summary
- Lead ID: {lead_id}
- Source: {source}
- Name: {first_name} {last_name}
- Phone: {phone}
- Email: {email}
- Service: {service}
- ZIP: {zip}
- First Response Latency: {latency_seconds}s

Conversation Transcript (most recent first)
1) [Copilot {timestamp}] {message}
2) [Lead {timestamp}] {message}
3) [Copilot {timestamp}] {message}

Outcome
- Qualification Status: {Qualified|Not Qualified|Needs Human|After Hours}
- Appointment: {Booked|Not Booked}
- Booking Link Used: {primary|backup|none}
- Failure Mode (if any): {LLM_timeout|Calendar_down|SMS_failed|Missing_phone|Invalid_phone}
---
Acceptance criteria:
- Note is readable without HTML.
- No broken JSON dumped into HubSpot.
- Transcript order and timestamps are consistent.

## Compliance & safety behaviors (STOP/HELP)
### STOP
If lead replies with STOP/UNSUBSCRIBE/CANCEL/END/QUIT:
Expected:
- Immediately respond once: “You’re unsubscribed. No more messages will be sent.”
- Mark number as opted-out; no further outbound messages.
- Record opt-out event in CRM note.

### HELP
If lead replies HELP:
Expected:
- Respond with support line: “For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to.”
- Do not ask qualification questions in the same message.

## After-hours behavior
When lead arrives after-hours:
Expected deterministic message (single SMS):
“Thanks for reaching out — we’re currently closed. What’s the best time tomorrow for a quick call (morning/afternoon/evening)?”
- If the lead answers, capture preference and either:
  a) Offer booking link (if calendar is available)
  b) Or promise human follow-up at open time
- Ensure no aggressive multi-message sequence overnight.

## Calendar link failure behavior
If booking link is down/returns error:
Expected:
- Apologize + provide backup option:
“Looks like our booking link is having trouble. Reply with a good time window today/tomorrow and we’ll confirm ASAP.”
- Tag failure mode “Calendar_down” and create CRM note.

## Deterministic fallback flow (LLM down/timeout)
Trigger conditions:
- LLM request errors
- LLM timeout > 8 seconds
- LLM returns empty/invalid output

Fallback flow (exact script; max 4 questions)
1) Q1: “Hi {first_name}, this is the team. Quick questions so we can help fast—what service do you need? (e.g., repair/replace/estimate)”
2) Q2: “What’s the address or ZIP code for the job?”
3) Q3: “How soon do you need this handled? (today / this week / flexible)”
4) Q4: “What’s the best time for a call? (morning / afternoon / evening)”

Routing rules:
- If lead says “today” and business is open: attempt booking link; if booking fails, request time window.
- If after-hours: store answers, confirm follow-up next business day.
- If lead uses profanity or unclear responses twice: escalate to human; message:
“Got it — I’m going to have a person follow up to make sure we get this right.”

## Manual results table (fill during run)
Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (Happy/MissingPhone/InvalidPhone/STOP/HELP/AfterHours/Dedupe/Retry/Concurrency/CalendarFail)
- T0 (lead submit)
- T1 (first SMS sent)
- Latency seconds
- Pass/Fail (<60s)
- Transcript saved? (Y/N)
- CRM note verified? (Y/N)
- Bugs found (link to bug log ID)

## Bug log (severity tied to churn risk)
Severity definitions:
- S0 Critical: legal/compliance risk (STOP ignored), wrong recipient, spam loop, data leak.
- S1 High: first response >60s repeatedly, frequent failures to send, broken dedupe causing double texts.
- S2 Medium: calendar failure not handled, poor note formatting, minor mapping issues.
- S3 Low: wording, minor UX.

Bug log fields:
- Bug ID
- Severity
- Source
- Steps to reproduce
- Expected vs Actual
- Evidence (screenshots/log links)
- Suggested fix
- Status (Open/In progress/Fixed/Verified)

## Definition of “Verified <60s” (what we can claim)
We can claim “verified <60s first response” once we have:
- 20 trials recorded with T0/T1
- ≥90% pass rate (18/20) and no S0 issues
- Any failures have root cause documented and mitigations (e.g., retries, queue priority)

## Customer-facing reassurance snippet (if agencies ask)
“We run a pilot QA checklist across webhook + Jotform + HubSpot flows and record timestamped evidence that the first SMS goes out within 60 seconds. If the AI ever fails, the system automatically falls back to a deterministic 4-question script and escalates safely. More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 | Support: agent_bob_replit+lead-copilot@agentmail.to”
