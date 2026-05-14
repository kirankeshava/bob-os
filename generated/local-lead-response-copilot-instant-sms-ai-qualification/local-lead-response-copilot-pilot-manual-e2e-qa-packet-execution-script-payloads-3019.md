# Local Lead Response Copilot — Pilot Manual E2E QA Packet (Execution Script + Payloads + <60s KPI Evidence + Deterministic Fallback SMS Flow)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:10:44.270Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Packet

Purpose: protect reputation during early pilots by manually validating end-to-end behavior (no automation) across **3 lead sources** and high-risk failure modes, while collecting evidence that **first response SMS is <60 seconds**.

Assets to reference with customers/agencies:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

## 1) Scope: 3 lead sources
1) **Generic Webhook JSON** (any form/ads tool hitting our endpoint)
2) **Jotform** (real form tool, free tier)
3) **HubSpot CRM** (real CRM, free/dev)

## 2) KPI + Evidence Standard (<60s first response)
### KPI definition
- **T0 (Lead received):** timestamp when our system receives the lead (webhook receipt log / request log / inbound integration log)
- **T1 (First SMS sent):** timestamp when outbound SMS is handed to provider (message send log)
- **T2 (First SMS delivered):** optional; delivery receipts vary. Use T1 as the canonical KPI.

**Pass:** T1 - T0 <= 60 seconds for at least **20 trials total** across sources, with **0 critical failures**.

### Evidence to store (minimum)
For each trial: screenshot/export/log line proving T0 and T1 plus the first SMS body.

## 3) 60-minute pilot execution script (manual)
This is designed to be run during onboarding.

### Minute 0–10: Setup
1. Confirm test phone numbers available:
   - One valid mobile (can receive SMS)
   - One invalid number format (e.g., 123)
   - One landline (optional)
2. Confirm after-hours window configured (or simulate using a toggle).
3. Confirm calendar/booking link configured (or use a known-bad URL to test failure).
4. Confirm deterministic fallback mode can be forced (toggle or by simulating LLM timeout).

### Minute 10–30: Run 10 “happy path” trials (prove <60s)
- 4 trials via Generic Webhook JSON
- 3 trials via Jotform
- 3 trials via HubSpot

For each trial, record T0, T1, SMS body, and whether qualification questions started.

### Minute 30–50: Run failure-mode trials (high risk)
Run at least one trial per case:
- Missing phone
- Invalid phone
- STOP
- HELP
- After-hours
- Concurrency (submit 3 leads within 30 seconds)
- Duplicate lead
- Webhook retry
- Calendar failure
- CRM note formatting

### Minute 50–60: Summarize
- Fill Results table
- Fill Bug log (only if expectations not met)
- Decide go/no-go for pilot based on Critical/High issues

## 4) Test cases (acceptance criteria)
### A) Missing phone
Input: lead has no phone field or phone empty.
Expected:
- No SMS attempted
- Lead is marked “Needs phone” / queued for manual follow-up
- If email is present, send an email to the business owner with lead details
- No repeated retries that spam the system
Severity if failing: **High** (wasted spend / broken conversion)

### B) Invalid phone
Input: phone fails validation (too short, bad characters, no country code rules as required).
Expected:
- No SMS attempted
- Log notes: “Invalid phone” with the raw value
- Owner notification (email/CRM note)
Severity: **High**

### C) STOP compliance
Input: user replies “STOP”.
Expected:
- Immediate confirmation message: “You’re opted out. Reply START to resubscribe.” (or equivalent)
- No further outbound qualification messages
- Opt-out stored for that number
Severity: **Critical**

### D) HELP compliance
Input: user replies “HELP”.
Expected:
- Send help message with business name + contact email: agent_bob_replit+lead-copilot@agentmail.to
- Continue only if user replies with a normal answer (depending on policy)
Severity: **Critical**

### E) After-hours behavior
Condition: lead arrives outside business hours.
Expected:
- SMS acknowledges timing and sets expectation; optionally offers booking link.
- No aggressive multi-question interrogation after-hours; max 1 question or direct booking.
Severity: **Medium/High** (brand harm)

### F) Multiple concurrent leads
Condition: 3+ leads arrive within 30 seconds.
Expected:
- All get first SMS within 60 seconds
- No cross-talk: answers from lead A never update lead B
Severity: **Critical**

### G) Calendar/booking link failure
Condition: booking link returns error or is misconfigured.
Expected:
- SMS falls back to “Reply with preferred time” + escalation to human
- CRM note indicates calendar failure
Severity: **High**

### H) Webhook retries
Condition: upstream retries the same payload (same lead id) 2–3 times.
Expected:
- Idempotency: only one conversation is created
- Second receipt logs “duplicate ignored”
Severity: **High**

### I) Duplicate leads
Condition: same phone submits twice within 10 minutes.
Expected:
- Either reuse existing conversation or start new with explicit context
- Must not double-book or spam
Severity: **High**

### J) CRM note formatting (HubSpot)
Expected:
- Note includes:
  - Lead source
  - Timestamp
  - Contact fields
  - Transcript snippet
  - Qualification status
  - Booking outcome / link
- Formatting readable (bullets/labels)
Severity: **Medium**

## 5) Copy/paste test payloads — Generic Webhook JSON
Use these as raw POST bodies to the webhook endpoint (set Content-Type: application/json).

### Payload 1 — Happy path
{
  "lead_id": "test-001",
  "source": "webhook",
  "submitted_at": "2026-05-14T12:00:00Z",
  "contact": {
    "first_name": "Alex",
    "last_name": "Jordan",
    "phone": "+14155550123",
    "email": "alex@example.com"
  },
  "service": {
    "category": "HVAC",
    "request": "AC not cooling, need service today"
  },
  "utm": {"campaign": "spring_ac", "medium": "fb", "source": "facebook"}
}

Expected first SMS within 60s.

### Payload 2 — Missing phone
{
  "lead_id": "test-002",
  "source": "webhook",
  "submitted_at": "2026-05-14T12:01:00Z",
  "contact": {
    "first_name": "Sam",
    "last_name": "Lee",
    "phone": "",
    "email": "sam@example.com"
  },
  "service": {"category": "Plumbing", "request": "Leaking sink"}
}

Expected: no SMS; owner notified; CRM/log flagged.

### Payload 3 — Invalid phone
{
  "lead_id": "test-003",
  "source": "webhook",
  "submitted_at": "2026-05-14T12:02:00Z",
  "contact": {
    "first_name": "Taylor",
    "last_name": "Ng",
    "phone": "123",
    "email": "taylor@example.com"
  },
  "service": {"category": "Roofing", "request": "Need quote"}
}

Expected: no SMS; invalid phone flagged.

### Payload 4 — Duplicate (same lead_id)
Send Payload 1 again within 2 minutes.
Expected: dedupe/idempotent behavior.

### Payload 5 — Retry simulation (same lead_id, header changed)
Send Payload 1 again 3 times quickly.
Expected: only one outbound SMS.

## 6) Deterministic fallback flow (LLM down / timeout safe mode)
Goal: if LLM errors/timeouts, keep conversion moving with a consistent, compliant script.

### Trigger conditions
Enter deterministic mode when ANY:
- LLM call errors or times out (e.g., >6 seconds)
- LLM returns empty/invalid JSON
- Safety policy blocks content unexpectedly

### Global rules
- Max 3 questions before escalation to human.
- If user gives a direct “book me” answer at any time, skip remaining questions and send booking link.
- After 2 minutes of no response, send one reminder; after 10 minutes, stop.
- Respect STOP/HELP immediately.

### First SMS (sent immediately on lead receipt)
"Hi {first_name}, this is {BusinessName}. Thanks for reaching out — we can help. What’s the address or ZIP code for the job?"

### Q2 (after valid ZIP/address)
"Got it. What’s the best time today for a quick call: morning, afternoon, or evening?"

### Q3 (after time preference)
"Thanks — and is this urgent (needs help today) or flexible? Reply: URGENT or FLEXIBLE."

### Booking / escalation
- If calendar link works:
  "Perfect. You can grab the next available time here: {calendar_link}. If you prefer, reply with a specific time window and we’ll confirm."
- If calendar link fails/unset:
  "Thanks — our booking link is temporarily down. Reply with a 2-hour window (e.g., 2–4pm) and we’ll confirm ASAP."

### After-hours variant
If after-hours:
"Hi {first_name}, thanks for reaching out — we’re currently closed. Reply with your ZIP code and we’ll text you first thing in the morning, or book here: {calendar_link}."

### Deterministic classification outputs (for CRM notes)
- Status: New / Qualified / Needs-follow-up / Opted-out
- Urgency: Urgent / Flexible / Unknown
- Preferred time: Morning/Afternoon/Evening/Specific window
- Location: ZIP/address

## 7) HubSpot note format (expected)
Title: “Lead Copilot — New lead received”
Body (example):
- Source: Jotform (or Webhook/HubSpot)
- Received (T0): 2026-05-14 12:00:05Z
- First SMS sent (T1): 2026-05-14 12:00:22Z
- Name: Alex Jordan
- Phone: +1 415-555-0123
- Email: alex@example.com
- Request: AC not cooling, need service today
- Qualification:
  - ZIP/Address: 94107
  - Preferred time: Afternoon
  - Urgency: URGENT
- Booking: Sent calendar link (status: pending)
- Transcript (first 6 messages):
  1) Outbound: ...
  2) Inbound: ...

## 8) Results capture tables (paste into sheet)
### KPI trials table
Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (Happy/Missing phone/etc.)
- T0
- T1
- Delta seconds
- First SMS content
- Pass/Fail
- Evidence link (screenshot/log)

### Bug log (if needed)
Columns:
- Bug ID
- Severity (Critical/High/Med/Low)
- Scenario
- Steps to reproduce
- Expected
- Actual
- Impact (conversion/compliance/brand)
- Suggested fix
- Owner
- Status

## 9) Go/No-Go criteria for pilots
NO-GO if any:
- STOP/HELP fails
- Cross-talk between concurrent leads
- Duplicate/retry causes multiple first SMS messages to same lead
- First response >60s on >10% of trials without clear external cause

Otherwise GO with monitoring + run this checklist before each new onboarding until product stabilizes.
