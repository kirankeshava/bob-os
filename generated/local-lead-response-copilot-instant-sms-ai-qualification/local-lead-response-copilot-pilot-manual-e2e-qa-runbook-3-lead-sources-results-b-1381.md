# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Results + Bug Log + Deterministic Fallback (LLM Fail-safe)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:50:51.341Z

---

## 1) Scope & goal (pilot-ready, no automation)
This runbook verifies end-to-end reliability and reputation safety for Local Lead Response Copilot across 3 lead sources:
1) Generic Webhook JSON (any form/FB lead tool that can POST JSON)
2) Jotform (real form tool)
3) HubSpot (CRM)

Primary KPI: **first outbound SMS is sent in <60 seconds** from “lead received” timestamp.
Secondary goals: compliance-safe STOP/HELP behavior, safe failovers when the LLM fails, dedupe/retry handling, and correct CRM note formatting.

## 2) Preconditions (what must exist)
- A working environment endpoint for lead ingestion (one per source):
  - Generic webhook URL (POST JSON)
  - Jotform webhook receiver URL (or polling integration)
  - HubSpot app/webhook receiver or API integration
- Access to messaging logs (Twilio or provider console) OR internal message delivery logs.
- A test phone number you can receive SMS on (QA phone). Do NOT use real customer numbers.
- Timekeeping method: phone stopwatch + server logs OR a shared spreadsheet time capture.

Evidence to store per run: screenshots/links for (a) lead submission time, (b) system received time, (c) first SMS sent time, (d) delivered time if available.

## 3) Definitions (timestamps)
Capture these timestamps for every test case:
- T0: Lead submitted (client-side confirmation page timestamp or form submission record time)
- T1: Lead received by Copilot (server log / webhook receipt log)
- T2: First SMS sent (provider log “queued/sent” time)
- T3: First SMS delivered (provider log delivered, optional)

KPI check:
- Response time = T2 - T1 (preferred) AND T2 - T0 (customer-perceived).
- Pass if **T2 - T1 < 60s** (target: 95%+ of trials). Flag if any run >60s.

## 4) Lead sources: setup & test method
### 4.1 Generic Webhook JSON (POST)
Use any HTTP client (curl/Postman). Standard payload (copy/paste):
```json
{
  "source": "generic-webhook",
  "lead_id": "qa-{{UNIQUE_ID}}",
  "submitted_at": "{{ISO8601}}",
  "contact": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "+15555550123",
    "email": "test.lead@example.com"
  },
  "service": {
    "category": "HVAC",
    "requested_service": "AC repair",
    "urgency": "today"
  },
  "metadata": {
    "utm_source": "qa",
    "utm_campaign": "e2e",
    "ip": "127.0.0.1"
  }
}
```
Execution:
1) Start stopwatch.
2) POST payload.
3) Record T1 from webhook receipt log.
4) Record T2 from SMS provider log.
5) Confirm message content + qualification starts.

### 4.2 Jotform (real form tool)
Minimum fields in the form:
- Name (required)
- Phone (required for primary path; optional for missing-phone test)
- Zip code (optional)
- “What do you need help with?” (required)

Execution:
1) Submit form normally (valid phone).
2) Use Jotform submission table to capture T0.
3) Confirm Copilot receipt (T1) and first SMS sent (T2).
4) Repeat for edge cases (invalid/missing phone, duplicates).

### 4.3 HubSpot (CRM)
Target flows:
- New contact created with phone number
- New form submission in HubSpot (if used)

Execution:
1) Create a new contact with phone + email.
2) Trigger the lead-handling workflow (whatever event is used).
3) Capture T0/T1 from HubSpot event time + Copilot receipt log.
4) Verify the Copilot creates/updates:
   - A note/timeline event with qualification transcript
   - Proper formatting (see Section 8)

## 5) Deterministic fail-safe qualification mode (LLM down/timeout)
This is the required safe fallback when the LLM:
- returns an error
- times out (e.g., >8–10s)
- produces non-compliant content

### 5.1 Trigger rules
Switch to deterministic mode if any of the below occur:
- LLM API request fails (non-200)
- LLM latency > 10 seconds for the first qualification turn
- Output is empty / unparseable

### 5.2 Deterministic script (exact messages)
Message 1 (sent immediately after lead receipt):
"Hi {first_name}, it’s {BusinessName}. Thanks for reaching out—quick questions so we can help fast. What service do you need? Reply 1) Repair 2) Estimate 3) Install 4) Other"

If reply not in [1-4] after 3 minutes:
"No problem—just reply with a few words about what you need (e.g., ‘leak repair’, ‘AC not cooling’)."

Message 2 (after service type captured):
"Got it. What’s your ZIP code?"

Message 3 (after ZIP):
"How soon do you need help? Reply 1) Today 2) This week 3) Not sure"

Message 4 (book/escalate):
- If calendar link is healthy:
  "Thanks—want to grab a quick call? Book here: {calendar_link}. If you prefer, reply with a good time window today."
- If calendar link fails or is unavailable:
  "Thanks—our booking link is temporarily down. Reply with a good time window (e.g., ‘2–4pm’), and we’ll confirm by text."

Escalation-to-human (if user asks complex question or after 2 ambiguous replies):
"Thanks—looping in a specialist now. If you’d like, reply with your best callback time."

### 5.3 Timeouts and stop conditions
- If no response for 15 minutes: send one gentle nudge.
- If still no response after 24 hours: send one final message and stop.
- Always stop messaging immediately on STOP (see Section 6).

## 6) Compliance behaviors: STOP/HELP (must-pass)
- On inbound “STOP” (case-insensitive, also STOP ALL, UNSUBSCRIBE):
  - Immediately mark contact as opted-out.
  - Send: "You’re opted out and will no longer receive messages. Reply START to resubscribe."
  - Do not send any further qualification messages.

- On inbound “HELP”:
  - Send: "Reply STOP to opt out. Message & data rates may apply. For help email: agent_bob_replit+lead-copilot@agentmail.to or see {website_url}"
  - Continue only if user replies normally after HELP; otherwise pause.

## 7) Test cases (minimum set)
Run at least 20 total trials distributed across the 3 sources.

### A) Missing phone (all sources)
Input: lead payload with no phone or blank phone.
Expected:
- No SMS attempted.
- Lead marked as “needs phone” and logged.
- Optional: email to internal inbox or CRM task created.
Pass criteria: No SMS send attempt; clear internal flag.

### B) Invalid phone
Input: phone like “123”, “+1555”, non-E.164.
Expected:
- Reject/normalize; do not send SMS until valid.
- Log validation error in lead record.

### C) STOP and HELP
Flow:
1) Submit valid lead.
2) Reply STOP after first message.
3) Confirm no further texts.
4) Reply HELP in a separate lead.

### D) After-hours
Setup: define business hours (e.g., 8am–6pm local).
Expected:
- After-hours message acknowledges receipt and sets expectation.
- Optional: offers booking link.
Example after-hours first message:
"Thanks for reaching out—our team is currently offline. We’ll text you first thing in the morning. If you want, you can book here: {calendar_link}."

### E) Multiple concurrent leads
Method: submit 5 leads within 30 seconds.
Expected:
- All 5 receive first SMS <60s.
- No cross-talk between conversations (each thread isolated).

### F) Calendar link failure
Simulate: provide invalid calendar URL or force 500 from scheduling service.
Expected:
- System swaps to fallback copy (no broken link loops).
- Creates internal follow-up task.

### G) Webhook retries
Send same lead_id 3 times (simulate tool retry).
Expected:
- Dedupe: only one outbound SMS.
- Log duplicate receipt count.

### H) Duplicate leads (different IDs but same phone)
Send 2 leads with different lead_id, same phone within 10 minutes.
Expected:
- Either (a) merge into existing conversation or (b) send one message and note “duplicate lead suppressed.”
- Must avoid spamming.

### I) CRM note formatting (HubSpot)
Expected note contains:
- Source, submitted time, first response time
- Qualification Q/A transcript with timestamps
- Opt-out status and after-hours indicator if applicable

## 8) Expected HubSpot note format (copy/paste target)
Title: "Lead Copilot Qualification — {FirstName} {LastName} ({Phone})"
Body (example):
"Source: Jotform
Lead ID: qa-2026-04-09-001
Submitted: 2026-04-09T14:02:10Z
First SMS Sent: 2026-04-09T14:02:42Z (32s from receipt)
Status: Qualified / Booking link sent

Transcript:
[14:02:42] Copilot: Hi Test, it’s {BusinessName}... Reply 1) Repair 2) Estimate 3) Install 4) Other
[14:03:05] Lead: 1
[14:03:06] Copilot: Got it. What’s your ZIP code?
[14:03:20] Lead: 78704
[14:03:21] Copilot: How soon do you need help? Reply 1) Today 2) This week 3) Not sure
[14:03:40] Lead: 1
[14:03:41] Copilot: Thanks—want to grab a quick call? Book here: {calendar_link}"

Formatting requirements:
- Plain text acceptable; avoid huge JSON blobs.
- Always include first response latency line.

## 9) Results capture tables
### 9.1 KPI table (fill for each trial)
Columns:
- Trial #
- Lead Source (Webhook/Jotform/HubSpot)
- Scenario (Normal, Missing Phone, STOP, etc.)
- T0 Submitted
- T1 Received
- T2 First SMS Sent
- T2-T1 (sec)
- Pass/Fail (<60s)
- Evidence link (log URL / screenshot)
- Notes

Acceptance:
- For normal flows: 95%+ trials T2-T1 < 60s.
- Any STOP failure = Critical.

### 9.2 Message content checklist
- First message sent immediately and references the user’s name (if available)
- No hallucinated pricing or guarantees
- Contains booking path or human escalation path

## 10) Bug/Fix log (prioritized)
Fields:
- Bug ID
- Severity (Critical/High/Medium/Low)
- Scenario
- Repro steps
- Expected vs Actual
- Impact (conversion/compliance/reputation)
- Suggested fix
- Owner
- Status

Severity guidance:
- Critical: STOP ignored, wrong-number texting continues, massive delays (>5 min), duplicate spam
- High: >60s frequently, invalid phone causes crashes, calendar failure causes dead-end
- Medium: CRM notes messy, minor copy issues

## 11) Customer-facing legitimacy reference (for pilots)
If any pilot stakeholder asks where to validate the product, share:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

## 12) Execution checklist (run in <60 minutes)
1) Prepare 3 test phones: valid, invalid, and a secondary device for STOP/HELP.
2) Run 5 normal trials (2 webhook, 2 Jotform, 1 HubSpot) and capture KPI.
3) Run each edge case once (A–I) and capture evidence.
4) Compute pass rate for <60s.
5) File bugs with severity; do not proceed to customer go-live if any Critical is open.
