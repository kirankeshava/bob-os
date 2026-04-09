# Local Lead Response Copilot — Manual E2E QA Evidence Pack (3 Lead Sources) + Deterministic Fallback Script

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:14:50.307Z

---

Overview
This evidence pack is designed to be run during early pilots (no automation) to protect reputation: prove <60s first response, validate fail-safes, and produce a real bug/fix list. Lead sources covered: (1) Generic Webhook JSON (direct POST), (2) Jotform (real form tool), (3) HubSpot (CRM).

A) KPI + Evidence Capture (proves <60s)
KPI: First outbound SMS (or fallback email) must be initiated within 60 seconds of lead receipt.
Capture points (record all as UTC):
1) T0 = lead received timestamp (webhook request received time, or Jotform submission time, or HubSpot create time).
2) T1 = first outbound SMS queued/sent timestamp (Twilio message log timestamp, or internal message log).
3) Latency = T1 - T0. Pass if <= 60s.
Evidence to store per test: screenshot or log line for T0 and T1, plus the message body sent.
Sample size goal for pilot proof: 20 total leads (minimum): 8 webhook, 6 Jotform, 6 HubSpot.

Results table (copy/paste)
TestID | Source | Scenario | T0 | T1 | Latency(s) | Pass/Fail | Evidence Link/Notes

B) Standard Generic Webhook JSON Payloads (copy/paste)
All requests should include a stable idempotency key to test dedupe.

1) Valid lead (happy path)
POST /webhook/lead
{
  "event": "lead.created",
  "lead_id": "wh_1001",
  "idempotency_key": "wh_1001",
  "submitted_at": "2026-04-09T12:00:00Z",
  "source": "generic_webhook",
  "contact": {
    "first_name": "Jamie",
    "last_name": "Rivera",
    "phone": "+14155550123",
    "email": "jamie.rivera@example.com"
  },
  "service": "HVAC repair",
  "zip": "94107",
  "notes": "No cooling since last night"
}
Expected: First SMS within 60s, starts qualification. CRM note created/updated (if enabled).

2) Missing phone
{
  "event": "lead.created",
  "lead_id": "wh_1002",
  "idempotency_key": "wh_1002",
  "submitted_at": "2026-04-09T12:05:00Z",
  "source": "generic_webhook",
  "contact": {
    "first_name": "Morgan",
    "last_name": "Lee",
    "phone": "",
    "email": "morgan.lee@example.com"
  },
  "service": "Plumbing",
  "zip": "94110"
}
Expected: No SMS attempt. Fallback behavior: create CRM note “Missing phone” + send email to agent_bob_replit+lead-copilot@agentmail.to (internal alert) and/or mark lead “needs phone.”

3) Invalid phone
{
  "event": "lead.created",
  "lead_id": "wh_1003",
  "idempotency_key": "wh_1003",
  "submitted_at": "2026-04-09T12:06:00Z",
  "source": "generic_webhook",
  "contact": {
    "first_name": "Avery",
    "last_name": "Patel",
    "phone": "555-abc-9999",
    "email": "avery.patel@example.com"
  },
  "service": "Roofing"
}
Expected: Phone validation fails deterministically; no SMS sent. Internal alert + CRM note with sanitized value.

4) Duplicate lead (same idempotency key)
Send payload (1) twice.
Expected: Exactly one conversation started; second delivery yields dedupe log entry and/or updates existing record without re-texting.

5) Webhook retry (same payload, different delivery_id)
{
  "event": "lead.created",
  "delivery_id": "retry_01",
  "lead_id": "wh_1004",
  "idempotency_key": "wh_1004",
  "submitted_at": "2026-04-09T12:10:00Z",
  "source": "generic_webhook",
  "contact": {"first_name": "Sam","last_name": "Chen","phone": "+14155550124"},
  "service": "Garage door"
}
Then resend with delivery_id “retry_02” but same idempotency_key.
Expected: No second SMS. System treats idempotency_key as the dedupe primitive.

C) Deterministic Qualification Fallback Script (LLM down/timeout)
Trigger conditions (any): LLM error, timeout > 4s, malformed output, or confidence below threshold.
Global rules:
- Always identify business and purpose quickly.
- Always include opt-out language on first message if required by policy.
- STOP/HELP must be handled immediately.
- If user is non-responsive: 2 nudges then stop.

Message 0 (first response; must be <60s)
“Hi {{first_name}}, this is {{business_name}}. Got your request for {{service}}. Quick 2 questions so we can help fast—what’s your ZIP code? Reply with 5 digits. Reply STOP to opt out.”

Branch 1: ZIP received (valid 5 digits)
Message 1:
“Thanks. What’s the issue? Reply 1) Urgent today 2) This week 3) Just pricing”

Branch 2: urgency received
If “1”:
Message 2A:
“Understood—what’s the best time window today? Reply 1) Morning 2) Afternoon 3) Evening”
If “2”:
Message 2B:
“What day works best this week? Reply with Mon/Tue/Wed/Thu/Fri.”
If “3”:
Message 2C:
“Got it—what type of property? Reply 1) House 2) Apartment/Condo 3) Business”

Booking step (calendar dependency)
If calendar link works:
“Perfect. You can pick a time here: {{calendar_link}}. If you prefer, reply with a time and we’ll confirm.”
If calendar link fails (HTTP error, empty link, provider outage):
“Thanks—our booking link is acting up. Reply with a good time/day and a call-back number (if different). We’ll confirm ASAP.”

After-hours behavior (local business hours: configurable)
If outside hours:
“Thanks—our team is currently offline. We’ll text you first thing at {{next_open_time}}. If it’s urgent, reply URGENT and we’ll try to route it.”
Expected: create task/notification for next open; do not promise immediate call.

STOP/HELP compliance (highest priority)
If inbound contains STOP:
“Confirmed—you’re opted out and will no longer receive texts. Reply START to re-subscribe.”
Expected: mark conversation opted_out=true; no further messages.
If inbound contains HELP:
“Help: This number provides updates about your service request. Reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

No-response policy
If no reply after 10 minutes:
Nudge 1: “Just checking—what ZIP should we send a quote for?”
If still no reply after 30 minutes:
Nudge 2: “Last message—reply with your ZIP anytime and we’ll help.” Then stop.

D) HubSpot CRM Note Formatting (expected)
When a lead is created or updated, add a note with consistent structure:
Title: “Lead Copilot Qualification”
Body:
- Source: {{source}} (Jotform / Webhook / HubSpot)
- Lead ID: {{lead_id}}
- First response latency: {{latency_seconds}}s
- Conversation status: {{status}} (active/opted_out/needs_phone/after_hours)
- Collected: ZIP={{zip}}, Urgency={{urgency}}, Preferred time={{time_window}}
- Transcript (last 5 messages):
  1) In: “...”
  2) Out: “...”

E) Bug/Fix Log (use during pilots)
BugID | Severity (P0/P1/P2) | Scenario | Steps | Expected | Actual | Evidence | Fix suggestion | Owner

Acceptance gates (do not onboard agencies until mostly green)
P0 fail: Any STOP ignored, SMS sent to missing/invalid phone repeatedly, duplicate lead causes multiple SMS threads, first response >60s in >10% of tests, after-hours promise violates policy, calendar outage blocks progression with no fallback.

Notes for customer-facing legitimacy
When sending HELP or internal links, use:
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support email: agent_bob_replit+lead-copilot@agentmail.to
