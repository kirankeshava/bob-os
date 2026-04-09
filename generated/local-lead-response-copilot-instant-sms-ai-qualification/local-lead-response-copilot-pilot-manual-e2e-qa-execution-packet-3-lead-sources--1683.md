# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet (3 Lead Sources) + Payloads + Deterministic Fallback + CRM Note Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:36:59.777Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet

Business proof link to share with pilot agencies/customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/ops email for pilots: agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal (what “done” means)
Validate (manually, during pilots) that the system:
1) Sends the **first outbound SMS in <60 seconds** of lead creation, across **3 lead sources**:
   - A) Generic Webhook JSON
   - B) Jotform (real form tool)
   - C) HubSpot (CRM)
2) Handles fail-safes safely: missing/invalid phone, STOP/HELP, after-hours routing, duplicates, retries, concurrency, calendar link failure.
3) When the LLM fails/timeouts, qualification continues via **deterministic question flow** (exact script below).

## 1) Environments / accounts (free tier only)
### A) Generic Webhook JSON
- Requires: an HTTP endpoint in our app to receive inbound lead payloads ("/webhook/lead" or similar).
- Test tool: cURL/Postman/Insomnia (free).

### B) Jotform (Free)
- Create form “Lead Response Copilot QA”.
- Fields:
  - Full Name (required)
  - Phone (required)
  - Email (optional)
  - Service Needed (dropdown: Plumbing, HVAC, Cleaning, Roofing, Other)
  - Zip Code (optional)
  - Preferred time (optional)
- Hidden fields (optional but recommended): utm_source, utm_campaign, gclid, fbclid.
- Configure Jotform webhook integration: POST to our inbound endpoint.

### C) HubSpot (Free developer/test)
- Create a test portal and a pipeline if needed.
- We validate:
  - Contact created/updated
  - Timeline note added with canonical formatting (see section 6)

## 2) Timing KPI: how to prove <60s
For each trial, capture:
- T0 = lead created time
  - Webhook: timestamp when request is sent (terminal time) + server receive time if logged
  - Jotform: submission timestamp from Jotform + optional webhook request time
  - HubSpot: form submission timestamp or contact create time
- T1 = first SMS outbound time
  - From SMS provider logs (Twilio/other) OR our app event log
- KPI = T1 - T0

**Pass criteria:** 95%+ of trials have KPI ≤ 60s. Any single >60s must have an explainable external cause (provider outage, etc.) and must not exceed 180s.

**Evidence to store (copy/paste into Results table):** lead id, phone, source, T0, T1, delta seconds, transcript (first 2 messages), and link/screenshot to logs.

## 3) Core scenarios to run (minimum set)
Run at least 20 trials total, distributed across sources.

### Scenario matrix (must cover all)
1) Valid lead (normal hours)
2) Missing phone
3) Invalid phone
4) STOP compliance
5) HELP compliance
6) After-hours behavior
7) Multiple concurrent leads (5 at once)
8) Calendar link failure
9) Webhook retries (same payload resent)
10) Duplicate lead (same phone/name within dedupe window)
11) CRM note formatting verification

## 4) Ready-to-paste Generic Webhook JSON payloads
Assume endpoint: POST https://<YOUR_APP_HOST>/api/leads/webhook
Headers: Content-Type: application/json

### 4.1 Valid lead
{
  "source": "webhook",
  "source_detail": "qa_postman",
  "lead_external_id": "qa-001",
  "created_at": "2026-04-09T12:00:00Z",
  "contact": {
    "name": "Test Alice",
    "phone": "+14155550101",
    "email": "alice@example.com"
  },
  "context": {
    "service": "Plumbing",
    "zip": "94107",
    "message": "My kitchen sink is leaking. Need today.",
    "utm_source": "google",
    "utm_campaign": "qa"
  }
}
Expected:
- First SMS sent in <60s.
- Qualification begins (LLM or deterministic fallback).
- CRM note created/updated if HubSpot integration enabled.

### 4.2 Missing phone
{
  "source": "webhook",
  "lead_external_id": "qa-002",
  "contact": {
    "name": "Test NoPhone",
    "email": "nophone@example.com"
  },
  "context": {"service": "HVAC"}
}
Expected:
- No SMS attempt.
- Lead marked "Needs phone".
- If email exists, send a single email (or create task) requesting phone (no repeated spam).
- CRM note: “Missing phone; no outreach attempted.”

### 4.3 Invalid phone
{
  "source": "webhook",
  "lead_external_id": "qa-003",
  "contact": {
    "name": "Test BadPhone",
    "phone": "12345",
    "email": "badphone@example.com"
  },
  "context": {"service": "Cleaning"}
}
Expected:
- Phone validation fails; no SMS attempt.
- CRM note records invalid phone.

### 4.4 Duplicate lead (same phone within 30 minutes)
Send the Valid lead payload twice with a new external id but same phone:
- qa-004a then qa-004b within 2 minutes.
Expected:
- Second lead is deduped (no new SMS thread) OR merges into same conversation.
- CRM note indicates dedupe/merge decision.

### 4.5 Webhook retry (exact same payload resent)
Resend qa-001 exactly.
Expected:
- Idempotency: no duplicate SMS.
- Lead event log shows “retry ignored” or “already processed.”

## 5) Deterministic qualification fallback flow (LLM down/timeout)
Trigger condition:
- LLM API errors OR does not respond within 8 seconds OR confidence < threshold.

Global rules:
- Max questions: 4
- If user is unresponsive for 10 minutes, send one reminder then stop.
- If user replies STOP: immediately confirm opt-out and do not message again.
- If HELP: send help text and support email.

### Message 1 (immediate)
“Hi {{first_name}}, thanks for reaching out to {{business_name}}. I can help book you fast. What service do you need? Reply 1) Plumbing 2) HVAC 3) Cleaning 4) Roofing 5) Other”

Branch:
- If 1-5 => proceed to Message 2
- Else => “Got it. Reply with the service you need (e.g., plumbing, HVAC).” then proceed.

### Message 2
“Thanks—what’s the best address or ZIP code for the job?”
- Accept zip or short address.

### Message 3
“How soon do you want this handled? Reply 1) ASAP 2) Today 3) This week 4) Just pricing”

### Message 4 (handoff/booking)
If during business hours:
“Perfect. Here’s the booking link: {{calendar_link}}. If you prefer, reply with a good time window and we’ll confirm.”
If after-hours:
“Thanks—our team is offline right now. We’ll text you first thing at {{next_open_time}}. If it’s urgent, reply URGENT.”

Escalation:
- If user replies “URGENT” after-hours: create human task + send: “We’re notifying the on-call team now. If you don’t hear back in 10 minutes, call {{business_phone}}.” (If business phone not available, provide email agent_bob_replit+lead-copilot@agentmail.to for pilot ops.)

Calendar failure handling:
- If calendar_link is unreachable or returns error: “Booking is temporarily down. Reply with 2 time options and we’ll confirm by text.” Create a task.

## 6) HubSpot CRM note formatting (canonical)
When logging to HubSpot (timeline note on Contact and/or Deal), use exactly:

Title: “Lead Response Copilot — Qualification Summary”
Body:
- Source: {{source}} ({{source_detail}})
- Lead External ID: {{lead_external_id}}
- Received At: {{T0_iso}}
- First SMS Sent At: {{T1_iso}} ({{delta_seconds}}s)
- Contact: {{name}} / {{phone}} / {{email}}
- Service: {{service}}
- Location: {{zip_or_address}}
- Urgency: {{urgency}}
- Conversation Status: {{status}} (Qualified / Unqualified / Needs Human / Opted Out)
- Booking: {{calendar_booked?}} (link or “not booked”)
- Transcript (last 6 messages):
  1) OUT: ...
  2) IN: ...
  3) OUT: ...
  ...
- Compliance:
  - STOP received? {{yes/no}}
  - HELP received? {{yes/no}}
  - After-hours flow used? {{yes/no}}

Pass criteria:
- Note renders cleanly (bulleted lines), no JSON blobs, transcript is readable, includes KPI delta.

## 7) Manual Results table (copy/paste into docs)
For each trial:
- Trial ID:
- Source (Webhook/Jotform/HubSpot):
- Scenario:
- Phone:
- T0:
- T1:
- Delta seconds:
- Pass/Fail:
- Evidence link (log screenshot or exported message record):
- Notes:

## 8) Bug/Fix logging rules
Severity definitions:
- P0: Compliance risk (STOP not honored), spam loops, sends to wrong phone.
- P1: KPI breach (>60s systemic), dedupe fails, after-hours wrong.
- P2: CRM note unreadable, calendar failure not handled cleanly.
- P3: Cosmetic copy issues.

Each bug entry must include: reproduction steps, expected vs actual, source, timestamps, and recommended fix.

## 9) What we still need from product to execute
To run this packet end-to-end we need:
- The exact inbound webhook URL(s)
- Access to message delivery logs (Twilio/other) or app event logs showing first outbound timestamp
- The calendar link used in booking
- Confirmation of business hours configuration + after-hours routing behavior

Once those are available, this packet can be executed in ~60 minutes and will produce timestamped evidence for <60s first response plus a prioritized defect list.
