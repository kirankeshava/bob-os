# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof + Fail-safes

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:56:46.265Z

---

Business legitimacy links (include in any customer-facing comms during QA/pilots)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Contact email: agent_bob_replit+lead-copilot@agentmail.to

Purpose
Validate end-to-end lead response for first 1–3 pilots without automation. We verify:
1) First outbound SMS occurs in <60 seconds from lead receipt (speed-to-lead KPI)
2) Qualification and booking behaviors are correct
3) Fail-safes protect compliance and reputation when anything fails (LLM, calendar, retries, duplicates)

Scope: 3 lead sources
A) Generic Webhook JSON (direct POST)
B) Jotform (real form tool)
C) HubSpot (CRM)

Definitions & KPI Timing Method
- T0 (Lead Received): timestamp when our server/integration receives lead payload.
- T1 (SMS Queued/Sent): timestamp when SMS provider accepts message (queued or sent).
- T2 (Handset Delivered): timestamp when test phone receives message (use phone’s message time; note carrier drift if any).
- KPI pass criteria: (T1 - T0) <= 60 seconds. Record T2 for user experience tracking.
How to capture timestamps (manual):
- T0: integration logs / webhook request log timestamp.
- T1: SMS provider message log (queued/sent time).
- T2: screenshot or note the phone received time.

Pre-flight Checklist (do before any test run)
1) Test phone numbers
- One real mobile number to receive test SMS (Primary Test Phone).
- One invalid phone string for validation tests.
- One secondary real number for concurrency tests.
2) Compliance defaults
- System must honor STOP/HELP immediately.
- After-hours behavior must not spam; it should set expectation and offer next steps.
3) Deterministic fallback is enabled
- If LLM times out/errors, system switches to deterministic question flow (documented below).
4) Dedupe key definition
- Prefer lead_source + lead_id; else phone + submitted_at window.

Lead Source A: Generic Webhook JSON
Setup
- Identify the inbound webhook endpoint URL used by the app.
- Ensure request logging is enabled (at least timestamp + body + response status).

Minimum fields expected (normalize these internally)
- first_name (string)
- last_name (string, optional)
- phone (E.164 preferred)
- email (optional)
- service (optional)
- zip (optional)
- message/notes (optional)
- lead_id (string unique per source)
- source (e.g., “webhook”)

Ready-to-paste payloads
1) Valid lead
{
  "lead_id": "wh_001",
  "source": "webhook",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15555550101",
  "email": "test@example.com",
  "service": "HVAC repair",
  "zip": "94107",
  "notes": "AC not cooling"
}
Expected:
- SMS sent in <60s.
- First message acknowledges request and asks Q1.
- CRM note created (if configured) using the formatting spec below.

2) Missing phone
{
  "lead_id": "wh_002",
  "source": "webhook",
  "first_name": "NoPhone",
  "email": "nophone@example.com",
  "service": "Plumbing",
  "zip": "94107"
}
Expected:
- No SMS attempted.
- Internal event/CRM note created: “Missing phone; cannot text.”
- Optional: send internal alert email to agent_bob_replit+lead-copilot@agentmail.to.

3) Invalid phone
{
  "lead_id": "wh_003",
  "source": "webhook",
  "first_name": "BadPhone",
  "phone": "123-ABC",
  "service": "Roofing"
}
Expected:
- No SMS attempted.
- Error recorded; CRM note: “Invalid phone format.”

4) Duplicate lead ID (dedupe)
Send payload (1) again with same lead_id wh_001.
Expected:
- System detects duplicate.
- No second outbound SMS.
- CRM note may add “Duplicate ignored” entry (single line) without spamming.

5) Webhook retry scenario
- Send payload with lead_id wh_004.
- Immediately resend the same payload within 10 seconds (simulate retry).
Expected:
- At most 1 SMS conversation starts.
- Second request returns 200/208 with idempotent handling.


Lead Source B: Jotform (Real Form Tool)
Setup
1) Create a Jotform test form with fields:
- First Name, Last Name
- Phone
- Email
- Service Needed (dropdown)
- Zip
- Freeform details
2) Configure Jotform submission to our system
- Prefer webhook integration from Jotform to our inbound endpoint.
- Map Jotform fields -> normalized lead fields.

Test cases (run at least 10 submissions)
- 5 normal submissions with different services
- 1 missing phone (leave blank)
- 1 invalid phone (text field if possible)
- 1 duplicate submission (same phone, same name within 1 minute)
- 1 after-hours submission (submit outside business hours or set business hours temporarily)
- 1 concurrency: submit 3 leads within 30 seconds
Expected outcomes:
- <60s first response for valid numbers.
- After-hours: message should set expectation and offer next step (see template).
- Duplicate: no spam; either silent ignore or single “we already texted you” message.


Lead Source C: HubSpot (CRM)
Goal
Validate inbound lead creation/update triggers, transcript logging, and note formatting.

Setup
1) HubSpot test account
- Create pipeline/stage (e.g., New Lead -> Qualified -> Booked).
- Ensure we have permission to create notes/engagements on contacts.
2) Define matching rule
- Primary: phone match.
- Secondary: email.

HubSpot test cases
1) New contact created with phone
Expected: SMS starts within <60s of trigger.
2) Existing contact updated with new form submission
Expected: system appends note/transcript rather than creating duplicate contacts.
3) CRM note formatting verification (see spec below)
Expected: note is readable, consistent, and includes opt-out + booking outcome.


Deterministic No-LLM Fallback Qualification Flow (Exact Message Text)
Trigger conditions
- LLM timeout > 5 seconds, error, or empty response.
- Or “safe mode” toggle enabled for pilot.

General rules
- Keep messages short.
- Ask one question at a time.
- If user answers off-pattern, accept free text and move forward.
- STOP/HELP handled globally (see compliance section).

Message 0 (first response)
“Hi {first_name}, this is {business_name}. Got your request for {service}. A couple quick questions so we can help fast—what’s the address or ZIP code for the job?”

Q1: Location
If reply contains 5-digit ZIP or address-like text -> store location.
Then Q2.

Q2: Timing
“When would you like service? Reply 1) ASAP 2) This week 3) Date/time”

Q3: Job type / scope
“Briefly, what’s going on? (1–2 sentences is perfect)”

Q4: Booking handoff
Option A (calendar available):
“Thanks—want to book a quick call or appointment now? Here’s the link: {calendar_link}. If you prefer, reply with a good time and we’ll confirm.”
Option B (calendar failure or missing link):
“Thanks—our booking link is temporarily down. Reply with 2 times that work for you (today/tomorrow), and we’ll confirm one.”

Completion message (after booking confirmed)
“Perfect—you're booked for {time}. If anything changes, reply here. (Reply STOP to opt out.)”


Fail-safe Behavior Matrix (Acceptance Criteria)
1) Missing phone
- No outbound SMS.
- Create internal log + CRM note.
- Optional: email alert to agent_bob_replit+lead-copilot@agentmail.to.

2) Invalid phone
- No outbound SMS.
- Log validation error.
- CRM note: invalid phone.

3) STOP
- Immediately mark phone as opted-out.
- Send confirmation: “You’re opted out and will no longer receive texts. Reply HELP for help.” (if required by provider policy)
- No further messages for future leads unless user re-consents (process defined by business).

4) HELP
- Respond with: “Help: This is an automated text about your service request. Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to.”

5) After-hours
- First response still should be <60s.
- Content should set expectation:
“Thanks {first_name}—we’re currently closed. We’ll follow up at {next_open_time}. If urgent, reply ‘ASAP’ and we’ll try to prioritize.”

6) Multiple concurrent leads
- No queue starvation.
- Each lead gets first SMS <60s.
- Logs show separate conversation threads.

7) Calendar link failures
- Detect non-200 / timeout.
- Send fallback booking message (Option B above).
- Create internal alert + CRM note: “Calendar link failure; manual scheduling requested.”

8) Webhook retries
- Idempotent processing by lead_id or request_id.
- No duplicate SMS.

9) Duplicate leads
- Within dedupe window (e.g., 24h): do not restart full qualification.
- Either: append note and send one polite message: “We just texted you—reply here to continue.”

10) CRM note formatting
- Must be consistent, readable, and not leak prompt/system text.
- Must include: lead metadata, timestamps, transcript, status, opt-out flag.


HubSpot CRM Note Formatting Spec (Copy/Paste)
Title: “Lead Copilot — SMS Qualification Transcript”
Body (exact sections):
Lead Meta
- Source: {source}
- Lead ID: {lead_id}
- Name: {first_name} {last_name}
- Phone: {phone}
- Email: {email}
- Service: {service}
- Location: {location_or_zip}
Timing
- Lead received (T0): {iso_timestamp}
- First SMS queued/sent (T1): {iso_timestamp}
- First response latency: {seconds}s
Status
- Current stage: {New/Qualified/Booked/Needs Manual Follow-up/Opted-out}
- Opt-out: {Yes/No}
Transcript
- {timestamp} System: {message}
- {timestamp} Lead: {message}
- …
Outcome
- Booking: {Booked via link / Manual time requested / Not booked}
- Next step: {e.g., “Call at 3pm Tue”}


Results Tables (fill during pilot)
Table 1: KPI Timing (20 total rows across sources)
Columns:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (Normal/Missing phone/Invalid/Duplicate/After-hours/Concurrency/etc.)
- T0
- T1
- Latency seconds (T1-T0)
- T2 (optional)
- Pass/Fail (<60s)
- Notes

Table 2: Behavior Verification
Columns:
- Test ID
- Expected behavior summary
- Actual behavior summary
- Pass/Fail
- Bug ID (if fail)


Bug / Fix Log Template
Bug ID:
Title:
Severity: (P0 compliance / P1 revenue / P2 UX / P3 cosmetic)
Source:
Scenario:
Steps to reproduce:
Expected:
Actual:
Logs/screenshots:
Workaround (if any):
Proposed fix (smallest change first):
Retest date/result:

Exit Criteria for “Pilot-ready”
- At least 20 timed submissions across the 3 sources.
- 95%+ of valid-phone leads have T1-T0 <= 60 seconds; 0 compliance failures on STOP.
- Deterministic fallback successfully completes Q1–Q4 on at least 5 leads when forced.
- HubSpot notes meet the formatting spec for all CRM-involved tests.

Operator Notes
- If any STOP/HELP behavior is inconsistent, pause outbound tests and fix immediately (compliance risk).
- If KPI misses occur, identify whether delay is: inbound webhook latency, queue backlog, SMS provider, or retry storm. Use smallest operational fix first (rate limits, idempotency, queue settings) before engineering larger changes.
