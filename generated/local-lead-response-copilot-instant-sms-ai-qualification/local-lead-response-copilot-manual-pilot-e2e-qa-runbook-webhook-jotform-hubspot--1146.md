# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof + Fail-safes

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:22:11.211Z

---

Overview
This runbook is an operator-executed (manual) end-to-end QA plan to validate Local Lead Response Copilot reliability during the first 1–3 pilots without investing in automated test suites. It validates (1) speed-to-lead (<60 seconds to first SMS), (2) qualification/booking flow, (3) compliance (STOP/HELP), and (4) fail-safe behavior when LLM/calendar/integrations fail.

Proof-of-legitimacy links for pilots
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Contact email (support + QA evidence): agent_bob_replit+lead-copilot@agentmail.to

Scope
Lead sources to test (minimum 3):
1) Generic Webhook JSON (direct POST)
2) Jotform (real form tool)
3) HubSpot CRM (real CRM)

Core KPI
- First response KPI: First outbound SMS must be sent within 60 seconds of lead receipt time.
- Measure in three timestamps:
  A) T0 = Lead received timestamp (server/integration receive time)
  B) T1 = SMS queued/sent timestamp (provider send time)
  C) T2 = SMS delivered timestamp (handset receive time; screenshot clock)
Pass criteria:
- T1 - T0 <= 60s for at least 19/20 test leads
- No lead receives zero first contact when a phone number is present and valid

Pre-flight checklist (before running timed tests)
1) Test phone numbers
- Have two real mobile numbers available:
  - Number A: Primary test handset (receives first SMS)
  - Number B: Secondary handset (used for concurrency and duplicate tests)
2) After-hours window
- Define pilot “business hours” for test (e.g., 9am–5pm local). Configure after-hours behavior accordingly.
3) Calendar/booking target
- Ensure booking step points to either a valid calendar link or a known broken link for failure testing.
4) Logging
- Ensure you can view:
  - Lead receive logs (webhook ingestion time)
  - SMS send logs (message id + timestamp)
  - CRM note logs (HubSpot contact timeline notes)

Deterministic fallback qualification flow (NO-LLM)
Trigger conditions (any):
- LLM timeout (>8s waiting)
- LLM error/5xx
- LLM returns empty/unsafe output
- Model cost/rate limit exceeded

Fallback conversation goals:
- Confirm service needed
- Confirm ZIP/city
- Confirm urgency (today/this week)
- Offer booking link or request preferred callback time

Exact fallback questions (copy/paste)
Message 1 (immediate):
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—what service do you need help with? Reply with 1) Repair 2) Install 3) Quote 4) Other.”

If reply = 1/2/3/4:
Message 2:
“Got it. What ZIP code is the job in?”

Message 3:
“Thanks—how soon do you need help? Reply 1) Today 2) This week 3) Just researching.”

Booking handoff (business hours):
Message 4:
“Perfect. You can grab a time here: {{calendar_link}}. If you prefer, reply with a good time for us to call.”

After-hours handoff:
Message 4 (after-hours):
“Thanks—our office is currently closed. Reply with a good time tomorrow and we’ll confirm first thing, or book here: {{calendar_link}}.”

STOP/HELP compliance (always deterministic)
- If inbound contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT” (case-insensitive):
  - Immediately mark contact as opted-out
  - Send once: “You’re opted out and will no longer receive texts. Reply START to opt back in.”
  - Do not send further qualification or booking messages
- If inbound contains “HELP”:
  - Send: “For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

Test cases matrix (execute across 3 sources)
Each test must specify: source, payload/fields, expected first SMS behavior, expected CRM behavior, and expected fallback behavior.

A. Phone validation
A1 Missing phone
- Input: lead has no phone field or empty
- Expected: no SMS sent; create CRM note “Missing phone” + send email alert to agent_bob_replit+lead-copilot@agentmail.to (or log as task)
- Pass: system does not attempt SMS; lead is flagged for manual follow-up

A2 Invalid phone
- Input: phone = “123”, “555-5555”, or non-E.164 invalid
- Expected: no SMS sent; CRM note includes “Invalid phone: <value>”

B. Compliance
B1 STOP
- Input: lead receives first SMS, then replies “STOP”
- Expected: immediate opt-out confirmation; no further texts; CRM note shows opt-out timestamp and keyword

B2 HELP
- Input: reply “HELP”
- Expected: help message with support email + opt-out instruction

C. After-hours routing
C1 After-hours new lead
- Input: submit lead outside configured hours
- Expected: first SMS still sent <60s acknowledging closed + request preferred time; optional booking link

D. Concurrency
D1 5 concurrent leads
- Input: submit 5 leads in <30 seconds (mix numbers A/B)
- Expected: all first SMS go out; no cross-contamination of names/answers; no thread mix-ups

E. Calendar failures
E1 Broken calendar link
- Input: configure calendar link to invalid URL for this test
- Expected: message includes fallback “reply with a good time to call”; CRM note flags booking link failure

F. Webhook retries
F1 Same webhook event delivered twice
- Input: identical event_id delivered twice within 2 minutes
- Expected: dedupe prevents duplicate SMS and duplicate CRM notes; second delivery is logged as duplicate

G. Duplicate leads
G1 Same phone, new lead within 10 minutes
- Input: same phone submits again
- Expected: either (a) single-thread continuation message (“Saw your new request…”) or (b) dedupe with CRM note “duplicate submission”

H. CRM note formatting
H1 HubSpot note template correctness
- Expected note must be formatted exactly:
  - Title line: “Lead Copilot — Qualification Transcript”
  - Metadata block (key: value): source, received_at, sms_first_sent_at, response_time_seconds, lead_name, phone, email, campaign/form name
  - Transcript block with timestamps and speaker tags (Lead / Copilot)
  - Outcome: booked (Y/N), booking_link_clicked (Y/N/Unknown), opted_out (Y/N)

Lead source setup and execution

1) Generic Webhook JSON
Goal: verify ingestion, dedupe, validation, and speed-to-lead.

Ready-to-send payloads (examples)
Use curl/Postman; ensure event_id is unique unless testing dedupe.

Valid lead payload
{
  "event_id": "qa-webhook-001",
  "source": "webhook",
  "submitted_at": "{{ISO_NOW}}",
  "first_name": "Test",
  "last_name": "Webhook",
  "phone": "+1XXXXXXXXXX",
  "email": "test@example.com",
  "service": "Quote",
  "notes": "QA valid lead"
}

Missing phone payload
{
  "event_id": "qa-webhook-002",
  "source": "webhook",
  "submitted_at": "{{ISO_NOW}}",
  "first_name": "Test",
  "last_name": "NoPhone",
  "phone": "",
  "email": "test@example.com"
}

Invalid phone payload
{
  "event_id": "qa-webhook-003",
  "source": "webhook",
  "submitted_at": "{{ISO_NOW}}",
  "first_name": "Test",
  "last_name": "BadPhone",
  "phone": "123",
  "email": "test@example.com"
}

Duplicate/retry payload (send twice)
{
  "event_id": "qa-webhook-004",
  "source": "webhook",
  "submitted_at": "{{ISO_NOW}}",
  "first_name": "Test",
  "last_name": "Retry",
  "phone": "+1XXXXXXXXXX",
  "email": "test@example.com"
}

2) Jotform
Goal: validate real form submission mapping and edge cases.
Setup steps:
- Create a form with fields: First Name, Last Name, Phone, Email, Service Needed (dropdown), ZIP, Consent checkbox
- Configure integration/webhook to Lead Copilot endpoint
Execution:
- Submit 10 times (6 normal, 4 edge: missing phone, invalid phone, after-hours, duplicate)
Expected:
- Field mapping correct (name/phone)
- Consent captured in CRM note
- <60s first SMS for valid phones

3) HubSpot CRM
Goal: validate CRM-originated leads (new contact or form submission inside HubSpot) and note formatting.
Setup steps:
- Create test pipeline or list
- Ensure new contact creation triggers Lead Copilot
Execution:
- Create 10 contacts (including duplicates)
Expected:
- SMS first response sent
- Single contact record updated (no duplicates)
- Note formatting matches template (metadata + transcript + outcome)

Results capture template (fill during execution)
For each test lead, record:
- Test ID:
- Source (Webhook/Jotform/HubSpot):
- Scenario (Normal/Missing phone/STOP/etc.):
- T0 received_at:
- T1 sms_sent_at:
- T2 handset_received_at:
- Response time (T1-T0 seconds):
- Pass/Fail:
- Notes / link to screenshots:

Bug log template (use during pilot)
- Bug ID:
- Severity (P0 revenue/compliance, P1 conversion, P2 cosmetic):
- Source:
- Steps to reproduce:
- Expected vs actual:
- Evidence (timestamps/screenshots/log lines):
- Suggested fix / workaround:
- Retest result:

Minimum acceptance criteria for first paid pilot
- 20 timed submissions across 3 sources completed
- At least 95% (19/20) meet T1-T0 <= 60 seconds
- 100% compliance correctness for STOP/HELP
- No duplicate SMS on webhook retry/duplicate submission
- HubSpot notes readable and consistent (metadata + transcript + outcome)

Operator instruction: where to send QA evidence
Email screenshots/log exports and the filled Results table to: agent_bob_replit+lead-copilot@agentmail.to. Include the website URL in any agency-facing QA summary: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
