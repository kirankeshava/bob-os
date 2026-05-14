# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + <60s KPI Evidence + Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:40:11.745Z

---

## Purpose
Validate the end-to-end (E2E) lead response and qualification flow across 3 lead sources with a strict reputation KPI: **first outbound SMS in <60 seconds**. Ensure safe behavior under failure modes (LLM down/timeouts, calendar/link failures, retries, duplicates) using a deterministic question flow.

**Product/legitimacy link to share with pilot agencies/customers (if needed):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
**Business contact email for test coordination:** agent_bob_replit+lead-copilot@agentmail.to

---

## Scope (3 Lead Sources)
1) **Generic Webhook JSON** (any form/ad tool that can POST JSON)  
2) **Jotform** (real form tool)  
3) **HubSpot CRM** (real CRM)

Out of scope (for now): automated test suite, load testing at scale, paid deliverability tooling.

---

## KPI and Evidence Requirements
### KPI
- **KPI-1: First response time**: time from **lead received by our system** → **first outbound SMS queued/sent** must be **<60s**.

### Required evidence per run
For each test case, capture:
- **T0 (Lead submission time)**: timestamp from source tool OR webhook request timestamp.
- **T1 (Copilot intake time)**: timestamp when webhook received/processed (server logs if available).
- **T2 (First SMS sent/queued)**: timestamp from SMS provider log (or app log if provider log unavailable).
- Screenshot or log excerpt showing T0/T1/T2.

### Sample size gates
- Minimum **20 total trials** across the 3 sources before claiming KPI met.
- At least **5 trials per source**, plus 5 trials across “high-risk” scenarios (STOP/HELP, after-hours, duplicates/retries).

---

## Test Data (Use These Fixtures)
### Phone numbers
- Valid E.164: +14155550100
- Invalid short: 415555010
- Invalid letters: +1415ABC0100
- Missing: null / empty string

### Lead identity
- First: Jordan
- Last: Taylor
- Service: “Water heater repair”
- Zip: 94107
- Notes: “Leak under tank. Prefer morning.”

---

## Lead Source 1: Generic Webhook JSON
### Endpoint assumptions
- Accepts POST JSON with lead fields.

### Baseline payload (valid)
```json
{
  "source": "webhook_test",
  "lead_id": "wh_0001",
  "first_name": "Jordan",
  "last_name": "Taylor",
  "phone": "+14155550100",
  "email": "jordan.taylor@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "submitted_at": "2026-05-14T12:00:00Z"
}
```

### Missing phone payload
```json
{
  "source": "webhook_test",
  "lead_id": "wh_0002",
  "first_name": "Jordan",
  "last_name": "Taylor",
  "phone": "",
  "email": "jordan.taylor@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "submitted_at": "2026-05-14T12:02:00Z"
}
```

### Duplicate lead payload (same lead_id)
Send the baseline payload twice within 60 seconds.

### Retry simulation
Resend baseline payload with same `lead_id` but a header like `X-Retry: 1` (or simulate retries by sending 3 identical POSTs 5 seconds apart).

Acceptance:
- Duplicate/retry must **not** send multiple first SMS messages (dedupe window recommended: 10–30 minutes).

---

## Lead Source 2: Jotform
### Setup
Create a free Jotform with fields:
- First name
- Last name
- Phone
- Email
- Service needed (dropdown)
- Zip
- Additional details (paragraph)

Map Jotform submission → our webhook fields. Confirm phone normalization to E.164.

### Test cases
- Valid submission (phone valid)
- Missing phone
- Invalid phone
- Two submissions back-to-back (concurrency)

Acceptance:
- If phone missing/invalid: **no SMS attempt**, log the issue, and optionally email internal alert (or create CRM task) depending on current product capabilities.

---

## Lead Source 3: HubSpot CRM
### Setup
Use a free HubSpot account.
- Create a Contact with phone.
- Simulate “new lead” via form submission into HubSpot OR create Contact and trigger workflow/webhook if supported.

### CRM note formatting requirement
When Copilot qualifies, create a Note (or Engagement) with this exact structure:

**Title:** Lead Copilot Qualification — {Service} — {Lead Name}

**Body (plain text):**
- Source: {source}
- Lead ID: {lead_id}
- Submitted: {submitted_at}
- First SMS sent: {timestamp}
- Status: {Qualified | Not qualified | Needs human follow-up}
- Answers:
  1) {Q1}: {A1}
  2) {Q2}: {A2}
  3) {Q3}: {A3}
- Next step: {Booked link | Requested callback | After-hours auto-message | Escalated}
- Conversation transcript (last 6 messages max):
  - {timestamp} In: ...
  - {timestamp} Out: ...

Acceptance:
- Note must be readable in HubSpot without markdown breaking.
- No PII leakage beyond what is already in the lead + conversation.

---

## High-Risk Scenario Tests (All Sources Where Applicable)
### 1) STOP compliance
Steps:
1. Lead receives first SMS.
2. Reply: “STOP”.
Expected:
- Immediate confirmation message consistent with SMS provider compliance (or no further messages if provider handles confirmation).
- Lead is flagged as opted-out; **no further SMS** for that phone.
- Dedupe/opt-out persists across sources.

### 2) HELP compliance
Reply “HELP”.
Expected:
- Provide business identifier and support contact: agent_bob_replit+lead-copilot@agentmail.to and/or a support message.

### 3) After-hours behavior
Define business hours (example): Mon–Fri 8am–6pm local.
Submit a lead outside hours.
Expected:
- First SMS still sent quickly (<60s) but message indicates after-hours and sets expectation.
- Optionally collects minimal info and offers scheduling link for next day.

### 4) Multiple concurrent leads
Submit 5 leads within 30 seconds.
Expected:
- No cross-talk (each lead gets correct name/service).
- KPI still <60s for each.

### 5) Calendar link failure
Simulate booking link down (use an invalid URL or force failure if possible).
Expected:
- Copilot does not loop.
- Offers fallback: “Reply with 2 time windows” and escalates to human.

---

## Deterministic Fallback Qualification Flow (LLM Fail-Safe)
Trigger: LLM error, timeout > 5s, rate limit, or invalid output.

### Rule: Always send first response immediately
**First SMS (within 60s):**
“Hi {first_name}, it’s {BusinessName}. Thanks for reaching out about {service}. A quick question so we can help fast: is this urgent (today) or can it wait? Reply 1) Urgent today 2) Can wait”

### Branching (no AI)
If reply contains “1” / urgent:
- SMS: “Got it. What’s the address or ZIP where service is needed?”
- Then: “Thanks—what’s the best time in the next 2 hours for a call? Reply with a time window.”
- Then: escalate to human / create CRM task “URGENT lead—call ASAP”.

If reply contains “2” / can wait:
- SMS: “Great. What day works best? Reply with 1) Today 2) Tomorrow 3) This week”
- If 1/2/3: offer booking link; if link fails, request two time windows and escalate.

If no reply after 5 minutes:
- SMS follow-up: “Just checking—still want help with {service}? Reply YES and we’ll get you scheduled.”

If still no reply after 30 minutes:
- Stop messaging (avoid spam); create CRM note “No response”.

Safety rules:
- If phone invalid/missing: do not send SMS; create internal alert/CRM note.
- If STOP received: hard stop.
- Max outbound messages in fallback: 4 within 1 hour.

---

## Results Capture Table (Copy/Paste)
For each run, record:
- Source (Webhook/Jotform/HubSpot)
- Test Case ID
- Lead ID
- Phone
- T0 submitted
- T1 received
- T2 first SMS
- Delta (T2-T1)
- Pass/Fail
- Evidence link (screenshot/log path)
- Notes

---

## Bug/Fix Log (Prioritized)
Fields:
- Bug ID
- Severity (P0 compliance, P1 revenue-risk, P2 minor)
- Scenario (STOP/after-hours/dedupe/etc.)
- Steps to reproduce
- Expected
- Actual
- Logs/evidence
- Suggested fix
- Owner
- Status

P0 examples:
- STOP not honored
- Duplicate leads causing multiple SMS blasts
- Wrong lead receives another lead’s conversation

---

## Execution Checklist (60-minute pilot run)
1) Run 3 baseline tests (one per source) and confirm KPI measurement points are visible.
2) Run high-risk tests: missing phone, invalid phone, STOP, HELP, after-hours.
3) Run duplicates/retries and concurrency burst.
4) Force LLM failure (if toggle exists) and confirm deterministic flow works.
5) Verify HubSpot note formatting on at least 3 leads.
6) Summarize KPI stats: median, p95, worst-case; attach evidence.

This runbook is designed to protect reputation with early agencies by proving <60s first response and safe behavior even when AI or downstream systems fail.