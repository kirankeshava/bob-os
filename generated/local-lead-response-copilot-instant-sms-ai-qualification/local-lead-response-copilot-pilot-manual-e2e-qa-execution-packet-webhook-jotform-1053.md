# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet (Webhook + Jotform + HubSpot) with <60s KPI Proof + Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:14:22.946Z

---

Business context (for pilots / legitimacy)
- Product: Local Lead Response Copilot (Instant SMS + AI Qualification)
- Website to share with agencies/customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support/contact email: agent_bob_replit+lead-copilot@agentmail.to

Goal of this packet
Run a manual end-to-end (E2E) QA session across 3 lead sources and produce hard evidence that:
1) First outbound SMS is sent in <60 seconds from lead submission (KPI)
2) High-risk fail-safes work (STOP/HELP compliance, after-hours, retries/deduping, calendar failure, LLM failure deterministic mode)
3) CRM notes are correctly formatted and useful for sales follow-up

Scope: 3 lead sources (minimum viable coverage)
A) Generic Webhook JSON (simulate any ad platform/form tool)
B) Jotform (real form tool)
C) HubSpot (CRM)

Pre-req checklist (no paid tools required)
- Access to product environment where inbound leads can be received (webhook URL(s) and any auth token if required).
- Access to message delivery logs (Twilio logs or internal log view) to verify exact send timestamps.
- A test phone number you control to receive messages and send STOP/HELP replies.
- (Optional) A test calendar booking link (Calendly/Google appointment page) if the product uses one; if not, use any URL for failure simulation.

KPI definition: <60s first response
- Start time (T0): timestamp when lead is submitted at the source (webhook POST sent / Jotform submit click / HubSpot create lead action).
- End time (T1): timestamp when the first SMS is actually sent (provider “sent/queued” time) AND preferably delivered (provider “delivered” time).
- KPI Pass: (T1_sent - T0) <= 60 seconds for 95% of trials; no single trial > 90 seconds.

Evidence collection (required)
For each trial:
- Record T0 (source submit time) with a screenshot or exported log.
- Record T1_sent from SMS provider logs (or product logs showing provider send time).
- Record T1_delivered if available.
- Save the full conversation transcript for STOP/HELP/qualification scenarios.

Results table (copy/paste and fill during run)
Columns:
- Trial ID
- Lead Source (Webhook/Jotform/HubSpot)
- Scenario (Normal / Missing phone / Invalid phone / STOP / HELP / After-hours / Concurrency / Calendar fail / Retry / Duplicate)
- T0 (with timezone)
- T1_sent
- Delta (sec)
- Pass/Fail (<60s)
- Notes (what happened, transcript link)

Minimum run size
- 20 trials total across 3 sources
  - Webhook: 8 trials
  - Jotform: 6 trials
  - HubSpot: 6 trials
Include at least 1 run of each high-risk scenario below.

Test execution steps by lead source

A) Generic Webhook JSON (simulated lead)
Objective: validate our core ingestion path, dedupe/retry handling, phone validation, and <60s KPI without relying on a third-party UI.

Setup
- Obtain inbound webhook URL from product (example placeholder: https://YOURAPP.com/webhook/lead)
- If auth required, add header: Authorization: Bearer <token>

How to send test leads (curl examples)
1) Normal lead
curl -X POST 'https://YOURAPP.com/webhook/lead' \
  -H 'Content-Type: application/json' \
  -d '{
    "source":"webhook",
    "external_id":"wh_001",
    "first_name":"Test",
    "last_name":"Lead",
    "phone":"+14155550123",
    "email":"testlead@example.com",
    "service":"Water heater install",
    "zip":"94107",
    "message":"Need install this week",
    "created_at":"2026-04-09T12:00:00Z"
  }'
Expected:
- First SMS in <60s
- Qualification starts (AI or deterministic flow)
- CRM note created (if configured)

2) Missing phone
external_id: wh_002, omit phone
Expected:
- No SMS attempted
- System logs/CRM note: “Missing phone; cannot text; route to email/callback queue”
- If email exists, send an email fallback (if supported). If not supported, create a task for manual follow-up.

3) Invalid phone
phone: "123" or "+1415555"
Expected:
- No SMS attempted
- Validation error recorded
- No repeated retries that spam provider

4) Duplicate lead (same external_id)
Send the same payload twice within 60 seconds.
Expected:
- Deduped: only 1 SMS conversation started
- A note/log shows “duplicate suppressed”

5) Webhook retry (same external_id, same payload, “retry_count” field increments)
Send payload with "retry_count": 1, then 2.
Expected:
- Idempotent behavior: do not re-text if already started
- If initial attempt failed before send, allow exactly-once send when reprocessed

B) Jotform (real form tool)
Objective: validate the common “website form” path and field mapping into the copilot.

Free setup steps
1) Create a free Jotform account (pilot can do this).
2) Create form: “Service Request”
   Required fields:
   - Name (First/Last)
   - Phone Number
   - Email
   - Service needed (dropdown)
   - ZIP
   - Preferred time (optional)
3) Integrate: Webhooks
   - In Jotform: Settings → Integrations → Webhooks
   - Add webhook URL: product inbound webhook endpoint
4) Mapping validation
   - Submit one lead and confirm the product reads phone/name/service correctly.

Jotform test cases
- Normal lead: expect <60s SMS
- Missing phone: set phone field optional temporarily; submit without phone
- Invalid phone: submit with “(000) 000-0000” or “123” depending on Jotform validation settings
- Concurrent submissions: open two browsers and submit within 5 seconds
Expected concurrency:
- Two distinct conversations
- No data bleed (names/answers do not mix)

C) HubSpot (CRM)
Objective: validate CRM-originating leads (manual entry/import/workflow) and note formatting.

Free setup steps
1) Create free HubSpot account (pilot can do this) or use a dev portal.
2) Create a test Contact with properties:
   - First name, Last name
   - Phone (E.164 if possible)
   - Email
   - Lead source (set to “HubSpot QA”)
3) Trigger method (choose one based on what product supports):
   - Option 1: HubSpot Workflow → webhook to product endpoint
   - Option 2: HubSpot form → internal notification → webhook
   - Option 3: HubSpot “contact created” event via webhook subscription
4) Ensure the copilot writes back to HubSpot as:
   - Note on contact timeline, or
   - Engagement, or
   - Custom property update + note

HubSpot note formatting acceptance criteria
A good note must include:
- Timestamp of first response
- Lead context (service, location)
- Conversation transcript summary
- Qualification status (Qualified/Unqualified/Pending)
- Booking status (Booked + link/time OR Not booked + next action)

Required format (example)
Title: Lead Response Copilot — Qualification Summary
Body:
- Lead: Test Lead (+14155550123, testlead@example.com)
- Source: HubSpot
- First SMS sent: 2026-04-09 12:03:12 UTC (Delta: 18s)
- Answers:
  1) Service needed: Water heater install
  2) Address/ZIP: 94107
  3) Timeline: This week
  4) Budget/approval: Yes
- Outcome: Qualified
- Booking: Not booked (calendar link error). Next step: call within 10 minutes.
- Transcript:
  Customer: …
  Copilot: …

High-risk behavioral tests (run across sources)

1) STOP compliance
Steps:
- After receiving first SMS, reply “STOP”.
Expected:
- Immediate confirmation message per carrier policy (“You have been unsubscribed…”)
- No further marketing/qualification messages to that number
- Number marked DNC/opt-out in system
- If lead submits again with same phone, system should not text; route to manual follow-up

2) HELP compliance
Steps:
- Reply “HELP”.
Expected:
- Help response includes business identification and contact email: agent_bob_replit+lead-copilot@agentmail.to
- No escalation loops; resume qualification only after a new customer message (optional)

3) After-hours behavior
Define after-hours window (example): 6pm–8am local time.
Steps:
- Submit a lead during after-hours (or temporarily set window to “now” in config).
Expected:
- First SMS still sent quickly (<60s) but message must set expectations:
  “Thanks—got it. We’ll follow up first thing tomorrow morning. If urgent, reply URGENT.”
- If URGENT, route to on-call/instant booking path.

4) Calendar link failure
Steps:
- Configure booking link to an invalid URL or simulate 500.
Expected:
- Copilot apologizes and offers alternatives:
  (a) propose 2 time windows, (b) ask for best callback time, (c) escalate to human.
- HubSpot note clearly indicates calendar failure and next action.

5) LLM failure / timeout → deterministic fallback mode (must be safe)
Trigger:
- Force LLM error (disconnect key) or simulate timeout in config.
Expected:
- System switches to deterministic script below within 1 message; does not stall.
- Still qualifies enough to route/ book.

Deterministic fallback qualification flow (exact copy + branching)
Use when: LLM errors, LLM latency > 8s, or confidence below threshold.

Message 1 (immediate):
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out about {{service}}. Quick questions so we can get you a fast quote.”

Q1:
“1) What ZIP code is the job at?”
If no answer within 3 minutes: send reminder
“Just checking—what ZIP code is the job at?”
If no answer within 10 minutes: close politely
“No problem. Reply anytime with your ZIP and we’ll jump back in.”

Q2:
“2) Is this for repair or replacement/installation? Reply 1=Repair, 2=Replace/Install.”

Q3:
“3) How soon do you want this done? Reply 1=ASAP, 2=This week, 3=Flexible.”

Q4:
“4) Are you the owner/decision maker? Reply YES or NO.”
If NO:
“Who should we contact to approve, and what’s the best number for them?” (then end)

Booking handoff (if calendar works):
“Great—here’s the fastest way to lock a time: {{calendar_link}}. If you prefer, reply with two times that work today/tomorrow.”

Booking handoff (calendar broken):
“Thanks—our booking link is having trouble right now. Reply with two time windows that work (e.g., ‘today 3–5’ or ‘tomorrow 9–11’) and we’ll confirm.”

Escalation to human trigger
Escalate (create task + notify) if any:
- Customer replies “URGENT”
- Customer uses profanity / legal threats / refund demands
- Customer asks pricing beyond allowed range
- Calendar failure persists after 1 attempt
Escalation message:
“Got it—looping in a human now to help. If you don’t hear back in 10 minutes, email us at agent_bob_replit+lead-copilot@agentmail.to.”

Phone validation rules (acceptance)
- Accept E.164 (+1XXXXXXXXXX) and normalize common US formats.
- Reject obviously invalid numbers (too short, all zeros, non-numeric).
- If invalid: do not attempt SMS; log and route to manual follow-up.

Dedupe/idempotency rules (acceptance)
- Primary key: (source, external_id). Secondary: (normalized_phone, created_at within 10 minutes).
- If duplicate detected: do not send a second “first SMS”; append a CRM note “duplicate suppressed”.
- Webhook retries must be safe: exactly-once message start.

Concurrency rule (acceptance)
- Two leads arriving within 5 seconds must each receive their own first SMS <60s and maintain isolated state (answers cannot cross).

Bug log (fill during run)
Fields:
- Bug ID
- Severity (P0 critical / P1 high / P2 medium / P3 low)
- Source (Webhook/Jotform/HubSpot)
- Scenario
- Steps to reproduce
- Expected vs Actual
- Evidence (screenshots/log links)
- Suggested fix

Prioritized bug/fix checklist (what to look for first)
P0
- STOP not honored (any post-STOP message)
- SMS not sent or delayed >90s for normal leads
- Duplicate leads cause multiple “first SMS” sends
P1
- Invalid/missing phone still triggers SMS attempt (carrier errors/spam risk)
- Calendar failure causes dead-end (no alternative path)
- LLM failure stalls instead of deterministic fallback
P2
- HubSpot note missing key fields (first response timestamp, outcome)
- After-hours message not setting expectation
P3
- Minor copy issues, formatting, typos

How to declare “verified <60s first response”
- Complete 20 trials.
- Compute deltas (T1_sent - T0).
- Pass if 19/20 are <=60s and none exceed 90s.
- Store evidence: SMS provider export + a screenshot of at least 5 representative trials + the filled results table.

Owner-facing output after a pilot run (what this packet should produce)
1) Filled results table with timestamps proving KPI
2) Conversation transcripts for STOP/HELP and deterministic fallback
3) Bug log with severities and recommended fixes
4) Confirmation that Webhook + Jotform + HubSpot all successfully trigger the copilot flow end-to-end
