# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Deterministic Fallback Flow

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:48:32.810Z

---

Overview
This runbook validates Local Lead Response Copilot end-to-end for early pilots without building automation. Goal: protect agency reputation by proving <60s first response and safe behavior under failures.

Product legitimacy + support
- Customer-facing URL (share as proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

Scope: 3 lead sources (minimum viable)
1) Generic Webhook JSON (POST)
2) Jotform (real form tool)
3) HubSpot (CRM)

Key KPI to verify
KPI-1: First outbound SMS initiated within 60 seconds of lead receipt.
Definition:
- T0 = timestamp when our server receives the lead (webhook ingestion time)
- T1 = timestamp when SMS is queued/sent by SMS provider (or our “send request” time if provider timestamp not available)
- T2 = handset delivery time (captured by stopwatch + phone screen recording)
Pass condition: (T1 - T0) < 60s. Record T2 for real-world experience, but KPI is measured to T1.

Prerequisites (operator checklist)
- A test mobile phone that can receive SMS (and can reply STOP/HELP).
- Ability to view server logs / event timeline (lead received, qualification started, SMS send attempt, fallback engaged, booking handoff, CRM writeback).
- A calendar booking URL configured (or a known-broken link for the failure test).
- Business hours configuration (e.g., 9am–5pm local). Ensure system timezone is known.

Deterministic fallback qualification flow (NO-LLM)
Trigger conditions (any): LLM timeout > 6s, LLM error, malformed LLM response, or safety classifier uncertainty.
Fallback rules:
- Always identify business + purpose quickly.
- Ask at most 3 questions before handing off to booking/call.
- Be compliant for STOP/HELP.

Fallback SMS script (exact text)
Message 1 (immediate):
“Hi {first_name}, this is {business_name}. Got your request—can I ask 2 quick questions to get you the right time?”

Q1 (service):
“What service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other (type it)”

Q2 (timing):
“When do you need this? Reply 1) ASAP 2) This week 3) Next week 4) Just researching”

Q3 (location, only if needed for routing):
“What ZIP code is the job at?”

Booking handoff (if calendar available):
“Perfect—grab a time that works here: {calendar_link}. If you prefer, reply CALL and we’ll ring you.”

If calendar link is unavailable:
“Thanks—our scheduling link is temporarily down. Reply with a good time window (e.g., ‘today 3–5’), or reply CALL for the next available rep.”

STOP/HELP compliance (global)
- If inbound message contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT”: immediately stop all messages, confirm opt-out:
“You’re opted out and will no longer receive texts. Reply START to opt back in.”
- If inbound contains “HELP”: respond:
“Help: Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

After-hours behavior
If lead arrives outside business hours:
- Send one immediate acknowledgement (still within 60s):
“Thanks {first_name}! We’re currently closed. We’ll text you first thing at {next_open_time}. If urgent, reply URGENT.”
- Do not start multi-question qualification unless URGENT.

Test matrix (execute in order)
For each test: record T0/T1/T2, source, payload, expected vs actual, and attach screenshots/log snippets.

A) Generic Webhook JSON (POST) — minimum fields
Required fields: lead_id (string), first_name, last_name (optional), phone, email (optional), source, created_at.

Payload A1 (valid)
{
  "lead_id": "qa-webhook-001",
  "first_name": "Taylor",
  "phone": "+14155550123",
  "email": "taylor@example.com",
  "source": "webhook-test",
  "created_at": "{now_iso}"
}
Expected:
- SMS Message 1 sent within 60s.
- Qualification begins (LLM or fallback).
- Transcript/note created for CRM writeback (if configured).

Payload A2 (missing phone)
{
  "lead_id": "qa-webhook-002",
  "first_name": "Jordan",
  "email": "jordan@example.com",
  "source": "webhook-test",
  "created_at": "{now_iso}"
}
Expected:
- No SMS attempt.
- System flags “uncontactable: missing phone”.
- Create task/alert (email to ops or dashboard entry). No repeated retries.

Payload A3 (invalid phone)
phone: "12345"
Expected:
- No SMS attempt.
- Error logged with validation message.
- Lead marked invalid phone.

Payload A4 (duplicate lead id)
Send A1 twice with same lead_id.
Expected:
- Second request deduped (no second SMS).
- Log “duplicate lead suppressed” with correlation id.

Payload A5 (webhook retry simulation)
Send the same payload with a new request_id header but same lead_id within 30s.
Expected:
- Deduplication still prevents double texting.
- HTTP response should be 200/202 with idempotency acknowledgement.

B) Jotform (real form tool)
Setup:
- Create a Jotform form with fields: First Name, Phone, Email, Service Needed (dropdown), ZIP.
- Connect submission to Copilot via webhook/integration.

Tests:
B1 Normal submission: valid phone, all fields.
Expected: SMS within 60s, qualification respects provided “Service Needed” (skip Q1 if already answered).
B2 Missing phone: submit without phone.
Expected: no SMS; flag uncontactable.
B3 International format: +44… or +61… (if supported).
Expected: either supported and SMS sends, or blocked with clear validation; no repeated attempts.
B4 Concurrency: submit 5 leads within 60 seconds.
Expected: all get first SMS within 60s; no cross-talk (messages mapped to correct lead).

C) HubSpot (CRM) source
Goal: ensure CRM-triggered leads and CRM writeback notes are correctly formatted.
Setup:
- HubSpot test pipeline + contact property mapping.
- Define trigger: “New lead created” or “Form submission creates contact” then Copilot triggers.

Tests:
C1 New contact created with phone.
Expected: SMS <60s; contact updated with status.
C2 Duplicate contact (same phone).
Expected: do not send another initial SMS if contacted in last X minutes (define X=60 by default). Add note “duplicate suppressed”.
C3 CRM note formatting validation (strict)
Expected note template (copy exactly):
Title: Lead Copilot Transcript — {date} — {source}
Body:
Lead ID: {lead_id}
Name: {first_name} {last_name}
Phone: {phone}
Email: {email}
Source: {source}
First Response (T1): {timestamp}
Opt-out Status: {subscribed|stopped}
After-hours: {yes|no}
Outcome: {booked|requested_call|no_response|invalid_phone|opted_out}
Booking Link: {calendar_link_or_error}
Transcript:
- OUT: {message1}
- IN: {reply1}
- OUT: {q1_or_skip}
- …
Errors/Flags:
- {any errors}

Edge case tests (must run at least once across any source)
1) STOP: after first SMS, reply STOP.
Expected: immediate opt-out confirmation; no further messages even if webhook retries.
2) HELP: reply HELP.
Expected: help text includes support email + website URL.
3) After-hours: submit lead outside hours.
Expected: one acknowledgement within 60s; no qualification unless URGENT.
4) Calendar link failure: set booking URL to invalid or simulate 500.
Expected: fallback message requesting time window/CALL; log the failure; do not loop.
5) LLM failure simulation: disable LLM key or force timeout.
Expected: deterministic fallback flow engages; still <60s first response.

Results capture (table)
For each run, fill:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Lead ID
- T0 lead received (server)
- T1 SMS queued/sent (server/provider)
- Delta (T1-T0)
- T2 handset received (stopwatch)
- Pass/Fail (<60s)
- Notes (screenshots/log link)

Bug/Fix log template
- Bug ID:
- Severity (P0 reputation/compliance, P1 KPI, P2 formatting, P3 cosmetic):
- Source/Test case:
- Steps to reproduce:
- Expected:
- Actual:
- Logs/snippets:
- Proposed fix (smallest change first):
- Owner:
- Retest status/date:

Known high-risk areas to watch during pilots
- Phone normalization (E.164), preventing double texts during retries, STOP enforcement across all flows, after-hours throttling, and HubSpot note formatting (agencies will judge professionalism here).

Exit criteria (pilot-ready)
- 20 total timed leads across 3 sources.
- 95%+ of leads meet (T1-T0) < 60s; any misses have a documented root cause + workaround.
- STOP/HELP and after-hours behavior verified.
- Deterministic fallback flow verified end-to-end.
- HubSpot note format validated and readable.
