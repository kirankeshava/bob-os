# Local Lead Response Copilot — Manual E2E QA Execution Packet (3 Lead Sources, <60s KPI, Fail-safes) + Test Payloads + Expected HubSpot Notes

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:46:21.716Z

---

## 0) Scope & Goal
This packet is a manual (pilot-friendly) end-to-end QA run to protect reputation during early agency/customer onboarding—no automation required. It validates:
- 3 lead sources: (A) Generic Webhook JSON, (B) Jotform (real form tool), (C) HubSpot CRM
- KPI: first outbound SMS must be sent within **<60 seconds** of lead creation/receipt
- Fail-safe behaviors: missing/invalid phone, STOP/HELP, after-hours, concurrent leads, calendar-link failures, webhook retries, duplicate leads, CRM note formatting
- LLM failure safe mode: deterministic question flow

**Business legitimacy references for any customer-facing comms:**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Preconditions / What you need before running
1) Ability to trigger an inbound lead into the system (webhook endpoint, Jotform integration, and HubSpot integration).
2) Ability to view message logs (Twilio/telephony logs or app logs showing “message sent” timestamp). Manual evidence is acceptable (screenshots).
3) A calendar/booking destination (can be a placeholder link) to test “calendar link failure.”
4) After-hours window configured OR an after-hours toggle.

If any integration endpoint/credential is not available yet, run only the Generic Webhook portion and record as “blocked by missing endpoint URL/credentials.”

---

## 2) KPI measurement method (<60s first response)
**Capture these timestamps per test lead:**
- T0 = Lead created/received timestamp
  - For Generic Webhook: time you click “Send” in your REST client (or the app’s inbound webhook log timestamp)
  - For Jotform: the Jotform submission time
  - For HubSpot: contact creation time OR form submission time in HubSpot
- T1 = First outbound SMS “sent” timestamp (from SMS provider log or app outbound message log)
- Δ = T1 - T0

**Pass/Fail:**
- PASS if Δ < 60 seconds
- FAIL if Δ ≥ 60 seconds OR if no outbound message within 2 minutes

**Evidence to store:** screenshot or copied log line containing T0 and T1 for each run.

**Recommended sample size during pilot:**
- Minimum: 20 total trials (e.g., 8 webhook, 6 Jotform, 6 HubSpot)
- Include at least 5 “edge case” trials (invalid/missing phone, STOP, after-hours, concurrency, calendar fail)

---

## 3) Deterministic fallback qualification flow (LLM down / timeout)
This must activate when:
- LLM call errors
- LLM times out (suggest threshold: 3–5 seconds)
- LLM returns invalid JSON/empty output (if structured output expected)

### 3.1 Fallback intro message (first SMS)
"Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—quick question so I can help: what service do you need? (Reply 1) Repair 2) Install 3) Quote 4) Other)"

### 3.2 Deterministic questions (max 3)
Q1 (service type): options 1–4 above.

Q2 (urgency):
"Got it. How soon do you need this? Reply 1) Today/ASAP 2) This week 3) Flexible"

Q3 (location / zip):
"What’s the service ZIP code?"

### 3.3 Booking / escalation
- If calendar link is healthy: send booking link after Q3.
  "Thanks—here’s the fastest way to get scheduled: {{calendar_link}}. If you prefer, reply with a good time window today."
- If calendar link fails (detected via config flag or failed request):
  "Thanks—our scheduling link is temporarily down. Reply with 2–3 times that work for you today/tomorrow and we’ll confirm ASAP."

### 3.4 Safe behavior rules
- If user replies STOP: immediately mark opted out; send no further messages.
- If user replies HELP: send help text (see STOP/HELP section below).
- If missing phone or invalid phone: do not attempt SMS; route to CRM note + email alert to agent_bob_replit+lead-copilot@agentmail.to.

---

## 4) Test matrix (what to run)
Run each scenario on at least one lead source; for high-risk items run on all sources if possible.

### 4.1 Core happy path (all 3 sources)
- Submit lead with valid phone
- Expect first SMS in <60s
- Expect qualification sequence proceeds (LLM or fallback) and ends with booking option

### 4.2 Missing phone
- Lead payload omits phone or phone field blank
- Expected: no SMS attempt; create CRM note “Missing phone—cannot text”; optional email alert

### 4.3 Invalid phone
Test examples: "123", "+1 (000) 000-0000", "555-555-5555" (depending on your validation rules).
- Expected: no SMS attempt; CRM note indicates invalid phone; internal alert

### 4.4 STOP / HELP compliance
- User replies STOP after first message
  - Expected: confirmation message (carrier-style or system-style) and no further SMS
- User replies HELP
  - Expected help text: business name + contact email/phone + opt-out instruction
  - Example: "{{business_name}}: Reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to."

### 4.5 After-hours behavior
- Trigger lead during after-hours window
- Expected: immediate acknowledgment SMS (still <60s) + set expectation
  - Example: "Thanks—our team is currently closed. We’ll follow up at {{next_open_time}}. If urgent, reply ASAP and we’ll try to respond sooner."
- Should not spam multiple follow-ups overnight

### 4.6 Multiple concurrent leads
- Trigger 3–5 leads within 10 seconds
- Expected: all get first SMS <60s; no cross-contamination (no wrong names/services)

### 4.7 Calendar link failures
- Use an intentionally broken calendar URL or simulate downstream outage
- Expected: system switches to “reply with times” flow; logs error; does not crash lead flow

### 4.8 Webhook retries
- Send the same webhook payload 3 times (same lead_id / idempotency key)
- Expected: exactly one conversation started; subsequent retries acknowledged but deduped

### 4.9 Duplicate leads (same phone)
- Send two leads with same phone within 5 minutes
- Expected behavior (choose one and enforce):
  A) Merge into existing conversation and add CRM note “duplicate lead received”
  B) Start new thread but do not re-send the same intro more than once in X minutes

### 4.10 CRM note formatting (HubSpot)
- Verify timeline note contains clean, agency-readable blocks with timestamps and key fields

---

## 5) Copy-paste test payloads
### 5.1 Generic Webhook JSON — happy path
POST to: {{YOUR_WEBHOOK_URL}}
Headers: Content-Type: application/json
Body:
{
  "source": "webhook_test",
  "lead_id": "qa-001",
  "first_name": "Jamie",
  "last_name": "Rivera",
  "phone": "+14155552671",
  "email": "jamie.rivera@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "created_at": "{{ISO_TIMESTAMP_NOW}}"
}

### 5.2 Generic Webhook JSON — missing phone
{
  "source": "webhook_test",
  "lead_id": "qa-002",
  "first_name": "Sam",
  "last_name": "Lee",
  "email": "sam.lee@example.com",
  "service": "AC tune-up",
  "zip": "78704",
  "created_at": "{{ISO_TIMESTAMP_NOW}}"
}

### 5.3 Generic Webhook JSON — invalid phone
{
  "source": "webhook_test",
  "lead_id": "qa-003",
  "first_name": "Taylor",
  "last_name": "Ng",
  "phone": "123",
  "email": "taylor.ng@example.com",
  "service": "Roof inspection",
  "zip": "30303",
  "created_at": "{{ISO_TIMESTAMP_NOW}}"
}

### 5.4 Generic Webhook JSON — retry/dedupe (same lead_id)
Send the happy path payload 3 times with the same lead_id "qa-001".

### 5.5 Generic Webhook JSON — duplicate lead (same phone, different lead_id)
{
  "source": "webhook_test",
  "lead_id": "qa-004",
  "first_name": "Jamie",
  "last_name": "Rivera",
  "phone": "+14155552671",
  "email": "jamie.rivera@example.com",
  "service": "Drain cleaning",
  "zip": "94107",
  "created_at": "{{ISO_TIMESTAMP_NOW}}"
}

---

## 6) Expected HubSpot CRM timeline note format (standard)
When a lead is created/updated, create a single timeline note like below (line breaks matter for readability):

Title: Lead Response Copilot — Qualification Summary

Body:
Lead Source: {{source}} 
Lead ID: {{lead_id}}
Created At: {{created_at}}

Contact:
- Name: {{first_name}} {{last_name}}
- Phone: {{phone_or_missing}}
- Email: {{email_or_missing}}
- ZIP: {{zip_or_missing}}

Speed-to-Lead:
- Lead received (T0): {{t0_timestamp}}
- First SMS sent (T1): {{t1_timestamp}}
- Delta: {{delta_seconds}}s

Conversation Transcript (most recent first):
1) OUT {{t1}}: {{first_message_text}}
2) IN  {{t2}}: {{lead_reply_text}}
3) OUT {{t3}}: {{next_question_or_booking}}

Outcome:
- Status: {{Booked | Pending | Opted out | Invalid phone | After-hours pending}}
- Booking link: {{calendar_link_or_n/a}}
- Agent escalation: {{yes/no}} (reason: {{reason_if_yes}})

Errors/Warnings:
- {{none OR list of errors e.g., "LLM timeout -> deterministic mode", "calendar link down"}}

**Pass criteria:** note is human-readable, consistently structured, and includes the KPI timestamps.

---

## 7) Bug/fix checklist (prioritized)
P0 (reputation/legal):
- STOP not honored immediately
- HELP missing or inaccurate
- Messages sent to invalid phone (bad validation)
- After-hours sends repeated spam

P1 (conversion):
- First SMS >60s
- Calendar failure causes dead-end (no alternate path)
- Concurrency mixes lead data across conversations

P2 (ops):
- HubSpot note unreadable / missing transcript / missing timestamps
- Webhook retries create multiple threads
- Duplicate leads cause multiple identical intros within short window

---

## 8) Results capture table (paste into doc/sheet)
Columns:
Run ID | Source (Webhook/Jotform/HubSpot) | Scenario | T0 | T1 | Δ seconds | PASS/FAIL | Evidence link/screenshot | Notes/Bugs

---

## 9) Execution order (fastest path under 60 minutes)
1) Webhook happy path (prove pipeline)
2) Webhook missing/invalid phone
3) Webhook retry/dedupe
4) Jotform happy path + after-hours
5) HubSpot happy path + note format check
6) Concurrency burst test (3–5 leads)
7) Calendar failure test
8) STOP/HELP (only when real SMS sending number is available)

End state: you have timestamped evidence for <60s response plus a short, high-signal bug list tied directly to churn risk.
