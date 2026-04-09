# Local Lead Response Copilot — Manual E2E Pilot QA Execution Packet (3 Lead Sources) + KPI Evidence + Deterministic Fallback Templates

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:06:49.846Z

---

## 1) Scope (Manual, pilot-ready)
Goal: verify end-to-end reliability for early pilots without automation.
Lead sources covered:
1) Generic Webhook JSON (baseline for any ad/form tool)
2) Jotform (real form tool)
3) HubSpot CRM (real CRM)

Primary KPI: **First outbound SMS sent <60 seconds** from lead receipt.
Secondary: safe behavior on edge cases (STOP/HELP, missing/invalid phone, after-hours, duplicates, retries, concurrency, calendar failures, LLM failures).

Legitimacy references for customer comms (if needed):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

---

## 2) Test environment prerequisites (free-tier friendly)
### A) Generic Webhook JSON
- Need the product’s inbound webhook URL (or a dev endpoint) + a way to view send logs (Twilio console logs or internal message log).
- Tool for sending payloads: curl, Postman (free), or browser fetch.

### B) Jotform (free)
1. Create a free Jotform account.
2. Create a form: fields = Full Name, Phone, Email, Service Needed (dropdown), Zip Code, Preferred Time.
3. Set form to collect submissions.
4. Configure Webhook integration: Settings → Integrations → Webhooks → add product inbound webhook URL.
5. Submit test entries from an incognito window.

### C) HubSpot (free)
1. Create a free HubSpot account.
2. Create a test Contact property set if needed: Service Needed, Zip Code.
3. Decide ingest method (depends on product integration):
   - If product receives HubSpot “new contact” events: configure HubSpot workflow/webhook/app.
   - If product pushes notes back into HubSpot: ensure we can view Contact timeline notes.
4. Confirm expected note format (see Section 7).

---

## 3) KPI evidence protocol (<60s first response)
For each test run, capture three timestamps:
- **T0 (Lead Received):** when webhook/form/CRM event is created.
  - Webhook JSON: request sent time + server receipt time if visible.
  - Jotform: submission timestamp.
  - HubSpot: contact create/update timestamp.
- **T1 (Outbound SMS Attempted):** time message is queued/sent (Twilio “created” timestamp or internal log event).
- **T2 (Outbound SMS Delivered)** if available (Twilio delivery status). T2 is not required for KPI, but helpful.

Latency = T1 - T0.
Pass criteria:
- **P0:** median latency <60s across 20 trials.
- **P1:** worst-case latency <60s for 90% of trials (allows a small tail while pre-revenue).
Evidence to store:
- Screenshot/export of message logs for at least 5 representative tests.
- Completed Results Table (Section 8) with timestamps.

---

## 4) Deterministic fallback mode (LLM fails / timeout)
Trigger conditions:
- LLM API error, timeout > 8 seconds, empty/invalid response, or safety refusal.
- Calendar/scheduler link returns non-200 or cannot be generated.

Fallback behavior principles:
- Keep questions short (<=1 sentence).
- Ask at most 3 qualifying questions.
- If user replies with anything unclear twice, escalate to human.

### Copy-paste fallback SMS templates
**Initial message (always deterministic-safe):**
"Hi {first_name}—this is {business_name}. Thanks for reaching out about {service_needed}. I can help get you booked. Quick question 1/3: what’s your address or ZIP code? Reply STOP to opt out."

**Q2:**
"Thanks. Question 2/3: is this urgent (today/24h) or flexible?"

**Q3:**
"Question 3/3: what’s the best time for a quick call or appointment—morning, afternoon, or evening?"

**Booking handoff (calendar OK):**
"Perfect—here’s the booking link: {calendar_link}. If you prefer, reply with a time window and we’ll confirm."

**Calendar failure copy (link down):**
"I’m having trouble generating the booking link right now. Reply with 2 times that work for you (plus your time zone), and we’ll lock one in ASAP."

**Escalation to human (after 2 unclear responses or any angry reply):**
"Got it—looping in a human to help. You’ll get a reply shortly."

---

## 5) Compliance: STOP / HELP
Required behaviors:
- If inbound message equals STOP (or contains STOP as sole intent): immediately set contact to DNC and reply confirmation.
- If inbound message equals HELP: reply with business identification + support email.

**STOP auto-reply:**
"You’re opted out and will no longer receive texts. Reply START to resubscribe."

**HELP auto-reply (include website + email):**
"Help: {business_name} appointment texts. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Reply STOP to opt out."

Test requirements:
- Send STOP after first message; confirm no further messages are sent.
- Send HELP at any point; confirm help response is returned.

---

## 6) Exact test cases (what to do + expected result)
### TC1 Missing phone
Input: lead payload with phone omitted or blank.
Expected: no SMS attempt; create internal task/CRM note: “Missing phone; email follow-up needed”; optionally send email if available.
KPI: not applicable.

### TC2 Invalid phone
Input: phone = “123”, “(555) 555-555”, or non-E.164 invalid.
Expected: no SMS attempt; note indicates invalid; if email exists send email requesting correct number.

### TC3 STOP
Input: user replies STOP.
Expected: immediate opt-out confirmation; mark DNC; suppress all future sends.

### TC4 HELP
Input: user replies HELP.
Expected: help message includes support email + website.

### TC5 After-hours routing
Input: lead arrives outside business hours.
Expected: send “we’ll reply in the morning” message + optionally offer booking link; do not notify on-call unless configured.

### TC6 Multiple concurrent leads
Input: submit 5 leads within 10 seconds.
Expected: each lead gets first SMS <60s; no cross-talk (messages mapped to correct lead).

### TC7 Calendar link failure
Input: simulate scheduler down (disable link generation or use invalid calendar ID).
Expected: send calendar failure copy; collect two time windows; escalate to human.

### TC8 Webhook retries
Input: same webhook payload resent 3 times with identical idempotency key.
Expected: only one conversation started; subsequent receives logged as duplicates.

### TC9 Duplicate leads (same phone)
Input: two leads same phone within 10 minutes.
Expected: suppress second “intro” message; append context to existing thread/CRM note.

### TC10 CRM note formatting
Input: qualified conversation.
Expected: HubSpot note includes: source, timestamps, Q/A summary, booking status, opt-out status.

---

## 7) HubSpot note formatting (expected)
Use a consistent, agency-readable block:

Title: “Lead Copilot Qualification Summary”
Body (example):
- Source: Jotform (Form: Emergency Plumbing)
- Lead: Jane Doe | +15551234567 | jane@email.com
- Received (T0): 2026-04-09 14:03:12 UTC
- First SMS (T1): 2026-04-09 14:03:38 UTC (Latency: 26s)
- ZIP/Address: 94110
- Urgency: Today
- Preferred time: Afternoon
- Outcome: Booking link sent (calendar ok) / Manual scheduling requested
- Compliance: STOP not received / DNC=false
- Transcript (last 6 msgs):
  1) System: ...
  2) Lead: ...
  ...

Pass criteria: readable in HubSpot timeline; no JSON dumps; no markdown that HubSpot renders poorly.

---

## 8) Results table (fill during execution)
Columns:
- Run #
- Source (Webhook/Jotform/HubSpot)
- Scenario (Normal/Missing/Invalid/STOP/etc.)
- Lead ID / Idempotency Key
- Phone
- T0 (lead received)
- T1 (first SMS created)
- Latency (sec)
- Pass/Fail
- Evidence link (screenshot/log URL)
- Notes/bugs

Minimum runs to claim KPI: 20 total, with at least:
- 8 Webhook JSON
- 6 Jotform
- 6 HubSpot
Include at least 1 run each for TC1–TC10.

---

## 9) Ready-to-send Generic Webhook JSON payloads
Assume inbound endpoint = {WEBHOOK_URL}. Use curl examples.

### Normal lead
```bash
curl -X POST "{WEBHOOK_URL}" -H "Content-Type: application/json" -d '
{
  "idempotency_key": "qa-001",
  "source": "webhook",
  "submitted_at": "2026-04-09T14:00:00Z",
  "lead": {
    "full_name": "QA Test",
    "phone": "+15555550101",
    "email": "agent_bob_replit+lead-copilot@agentmail.to",
    "service_needed": "Plumbing leak",
    "zip": "94110"
  }
}'
```

### Missing phone
```bash
curl -X POST "{WEBHOOK_URL}" -H "Content-Type: application/json" -d '
{
  "idempotency_key": "qa-002",
  "source": "webhook",
  "submitted_at": "2026-04-09T14:01:00Z",
  "lead": {
    "full_name": "No Phone",
    "email": "agent_bob_replit+lead-copilot@agentmail.to",
    "service_needed": "HVAC tune-up",
    "zip": "10001"
  }
}'
```

### Invalid phone
```bash
curl -X POST "{WEBHOOK_URL}" -H "Content-Type: application/json" -d '
{
  "idempotency_key": "qa-003",
  "source": "webhook",
  "submitted_at": "2026-04-09T14:02:00Z",
  "lead": {
    "full_name": "Bad Phone",
    "phone": "123",
    "email": "agent_bob_replit+lead-copilot@agentmail.to",
    "service_needed": "Roof repair",
    "zip": "60601"
  }
}'
```

### Duplicate lead (same idempotency_key) / retry simulation
Send the same payload 3x:
```bash
curl -X POST "{WEBHOOK_URL}" -H "Content-Type: application/json" -d '{
  "idempotency_key": "qa-004",
  "source": "webhook",
  "submitted_at": "2026-04-09T14:03:00Z",
  "lead": {
    "full_name": "Retry Test",
    "phone": "+15555550102",
    "email": "agent_bob_replit+lead-copilot@agentmail.to",
    "service_needed": "Garage door",
    "zip": "73301"
  }
}'
```
Expected: only one conversation created.

---

## 10) Bug/fix log rubric (what to record)
For every failure, log:
- Severity: P0 (churn/compliance), P1 (revenue-impact), P2 (annoyance)
- Repro steps
- Expected vs actual
- Evidence (log screenshot)
- Suggested fix

High-risk P0 examples:
- STOP not honored
- Messages sent to invalid phone repeatedly
- Duplicate spam texts due to webhook retries
- After-hours sends wrong promise (“someone will call now”)

This packet is ready to execute as soon as we have the actual inbound webhook URL + access to SMS/CRM logs.