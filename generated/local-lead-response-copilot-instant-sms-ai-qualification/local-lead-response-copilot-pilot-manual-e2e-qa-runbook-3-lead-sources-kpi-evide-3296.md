# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + KPI Evidence + Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:57:53.149Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook

Business legitimacy references for customers/pilots:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal (what this runbook proves)
1) **Speed-to-lead KPI:** first outbound SMS is sent **<60 seconds** after lead capture for at least **20 trials**.
2) **Safety/compliance:** STOP/HELP honored immediately; invalid/missing phone handled safely; after-hours routing works.
3) **Reliability:** retries/deduping prevent spam; calendar booking failures degrade gracefully.
4) **LLM fail-safe:** if the LLM errors/times out, the system uses a deterministic scripted qualification flow (no silent failures).
5) **CRM hygiene:** HubSpot notes are consistently formatted and readable.

## 1) Lead sources covered (minimum 3)
A. **Generic Webhook JSON** (simulates any ad platform / form post)
B. **Jotform** (real form tool, free tier)
C. **HubSpot** (CRM, free tier)

## 2) Test prerequisites (no paid spend)
- Ability to trigger the product’s “new lead” ingestion endpoint(s) (webhook URL or API endpoint).
- Access to logs/telemetry that show **timestamp of lead received** and **timestamp first SMS was sent**.
- A test phone number (can be a real phone you control). If messaging requires a paid SMS provider, **skip live-send** and instead validate “queued/sent event” timestamps in logs; note that live STOP/HELP must be validated during pilot with the real number.
- A shared folder (or simple doc) to store evidence screenshots/log lines.

## 3) KPI measurement method (strict)
For each trial, capture:
- **T0 (Lead Captured):** timestamp when lead enters system (webhook received OR Jotform submit time OR HubSpot workflow trigger time).
- **T1 (First SMS Attempt):** timestamp when system requests message send OR logs “message queued/sent”.
- **Delta:** T1 - T0 in seconds.

**Pass criteria:** Delta < 60s for **≥ 18/20 trials**, and **no trial > 120s** unless documented external outage.

Evidence to save per trial:
- A log line/screenshot for T0
- A log line/screenshot for T1
- (If available) SMS provider delivery event time
- Message body snapshot

## 4) Deterministic fallback qualification mode (LLM down / timeout)
### 4.1 When to activate fallback
Fallback triggers when:
- LLM call errors, returns empty/invalid JSON, or exceeds **6 seconds** latency budget, OR
- LLM confidence below threshold (if supported), OR
- Any downstream dependency required for LLM prompt fails.

### 4.2 Deterministic question flow (exact copy)
**SMS 1 (instant):**
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—what service do you need help with? Reply 1) Repair 2) Install 3) Quote 4) Other”

If reply 1/2/3/4 missing:
**Nudge (after 3 minutes, one time):**
“Just checking—reply 1, 2, 3, or 4 so I can get you to the right person.”

**SMS 2 (after valid service choice):**
“Got it. What’s the job address or ZIP code?”

**SMS 3:**
“Thanks. What’s the best time for a quick call? Reply: 1) Now 2) Today 3) Tomorrow 4) This week”

**Escalation rule:**
- If user replies “Now” (or option 1), create a task: “Call ASAP” and respond:
“Perfect—someone will call you shortly. If you prefer, share any details here.”
- If user provides a date/time, respond:
“Thanks—booking a call. If you don’t see a confirmation within a few minutes, we’ll reach out manually.”

**Stop conditions:**
- If message contains “STOP”, “UNSUBSCRIBE”, “CANCEL”: immediately stop automation and respond only with standard confirmation.
- If message contains “HELP”: send help response and do not ask qualification questions until user continues.

### 4.3 STOP/HELP compliance copy
- STOP response:
“You’re unsubscribed and will no longer receive messages. Reply START to resubscribe.”
- HELP response:
“Help: This is {{business_name}} lead follow-up. Reply STOP to unsubscribe. For support email agent_bob_replit+lead-copilot@agentmail.to.”

## 5) Core test matrix (scenarios required)
Run each scenario at least once per lead source where applicable.

### S1) Missing phone
Input lead without phone.
- Expected: system does **not** attempt SMS; creates CRM note/task “Missing phone—needs manual follow-up”; optional email to internal ops.
- Pass: no outbound SMS attempt logged.

### S2) Invalid phone
Input: “123”, “555-555-5555” (if invalid per validator), or non-E.164.
- Expected: validation fails; no SMS; CRM note includes reason; optional attempt to normalize if safe.

### S3) STOP
Send “STOP” after first message.
- Expected: immediate unsubscribe; no further automated messages; record opt-out in contact.

### S4) HELP
Send “HELP”.
- Expected: help copy; pause qualification until user continues.

### S5) After-hours
Set system after-hours window (e.g., 6pm-8am local).
- Expected: first SMS acknowledges and sets expectation:
“Thanks—our team will text/call you at {{next_business_time}}. If urgent reply URGENT.”
- If URGENT: create priority task for manual review.

### S6) Multiple concurrent leads
Submit 5 leads within 60 seconds.
- Expected: all first responses <60s; no cross-contamination of messages; correct mapping lead→thread.

### S7) Calendar link failures
Simulate booking link down/404.
- Expected: fallback: offer manual scheduling:
“Our booking link is temporarily unavailable—what time works for you?”
- Create task for manual booking.

### S8) Webhook retries
Send the same webhook payload 3x with identical event_id.
- Expected: dedupe prevents duplicate texts; CRM note logs “duplicate suppressed”.

### S9) Duplicate leads (same phone new event)
Send a second lead from same phone within 15 minutes.
- Expected: either merge into same conversation or send a different acknowledgement:
“Welcome back—still looking for help with {{service}}?”

### S10) CRM note formatting (HubSpot)
- Expected note template (exact):
Title: “Lead Copilot Qualification”
Body:
“Source: {{source}}\nReceived: {{timestamp}}\nFirst response sent: {{timestamp}} ({{delta_seconds}}s)\nStatus: {{qualified|unqualified|needs-followup}}\nService: {{service}}\nZIP/Address: {{zip}}\nPreferred time: {{time_pref}}\nTranscript: {{link_or_snippet}}\nFlags: {{after-hours|stop|invalid-phone|calendar-fail|llm-fallback}}”

## 6) Exact payloads for Generic Webhook JSON (copy/paste)
### 6.1 Valid lead
```json
{
  "event_id": "evt_001",
  "source": "webhook_test",
  "timestamp": "2026-05-14T12:00:00Z",
  "lead": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "+14155550123",
    "email": "testlead@example.com",
    "service": "Quote",
    "notes": "Testing speed-to-lead <60s"
  }
}
```

### 6.2 Missing phone
```json
{
  "event_id": "evt_002",
  "source": "webhook_test",
  "timestamp": "2026-05-14T12:05:00Z",
  "lead": {
    "first_name": "NoPhone",
    "last_name": "Lead",
    "email": "nophone@example.com",
    "service": "Install"
  }
}
```

### 6.3 Invalid phone
```json
{
  "event_id": "evt_003",
  "source": "webhook_test",
  "timestamp": "2026-05-14T12:10:00Z",
  "lead": {
    "first_name": "BadPhone",
    "last_name": "Lead",
    "phone": "123",
    "email": "badphone@example.com",
    "service": "Repair"
  }
}
```

### 6.4 Retry/dedupe (send same as valid lead 3x)
Use evt_001 unchanged and send it multiple times.

## 7) Jotform test setup (free tier)
1) Create a form with fields: First Name, Last Name, Phone, Email, Service (dropdown), Notes.
2) Configure webhook integration to the product’s inbound webhook URL.
3) Submit the form 5 times quickly for concurrency test.
4) For missing/invalid phone, submit with blank or “123”.

Evidence: Jotform submission time + product log timestamps.

## 8) HubSpot test setup (free tier)
Two options depending on product integration:
- If product ingests HubSpot form submissions: connect HubSpot form → product.
- If product watches HubSpot new contacts/deals: create a workflow/automation that triggers product webhook on new contact with phone.

Test: create contact(s) with valid/invalid/missing phone and confirm:
- SMS attempt behavior matches scenarios
- Note formatting matches the template in §5 S10

## 9) Results table (fill during execution)
For each trial record:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (S1-S10)
- T0
- T1
- Delta seconds
- Message content (first SMS)
- Outcome (PASS/FAIL)
- Evidence link (screenshot/log URL)

## 10) Bug/Fix log template (prioritized)
Fields:
- ID
- Title
- Severity (P0 compliance / P1 revenue / P2 annoyance)
- Source + Scenario
- Steps to reproduce
- Expected vs Actual
- Evidence
- Suggested fix
- Owner
- Status

Pre-populated likely P0/P1 items to watch:
- P0: STOP not immediately honored; messages continue after STOP
- P0: HELP missing opt-out/support info
- P1: duplicate webhook causes multiple SMS blasts
- P1: invalid phone attempts still sent (carrier errors)
- P1: after-hours sends “call now” language
- P1: calendar link outage leads to dead-end/no manual fallback
- P1: concurrency mixes transcripts between leads

## 11) Definition of “verified <60s first response”
Verification is achieved when:
- At least 20 timestamped trials are recorded,
- Logs show T1-T0 <60s for ≥18/20,
- Failures are annotated with root cause (e.g., provider outage) and remediation plan,
- Evidence is stored (logs/screenshots/transcripts).

---
If you need to contact us during pilots, use the site above and email agent_bob_replit+lead-copilot@agentmail.to.
