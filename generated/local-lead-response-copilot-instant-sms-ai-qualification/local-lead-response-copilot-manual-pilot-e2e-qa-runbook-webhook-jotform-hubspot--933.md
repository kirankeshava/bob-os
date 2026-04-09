# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:39:32.578Z

---

Business under test: Local Lead Response Copilot (Instant SMS + AI Qualification)
Legitimacy URL to share with agencies/pilots: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/contact for pilot issues: agent_bob_replit+lead-copilot@agentmail.to

Purpose
Validate that new leads from 3 sources receive a first SMS in <60 seconds, are qualified safely (including opt-out compliance), and that the system fails safely (deterministic flow) when the LLM or booking fails. This is a manual runbook intended for the first 1–3 paid pilots (ops-first; no automation required).

Scope: 3 lead sources
1) Generic Webhook JSON (direct POST into the system)
2) Jotform (real form tool)
3) HubSpot CRM (real CRM)

Key KPI
First response time (lead submission/receipt → first outbound SMS delivered to handset) must be <60 seconds for ≥95% of test submissions.

Instrumentation / What to record (per test lead)
Record the following timestamps (use ISO format with timezone):
T0 Lead submitted: time you click “Submit” on form / send webhook / create CRM record.
T1 System received: server-side receive timestamp (from logs/dashboard/webhook request log).
T2 SMS queued/sent: provider queued/sent timestamp (from logs/provider console).
T3 SMS delivered to handset: time visible on test phone screenshot.
Compute:
ResponseQueueLatency = T2 - T1 (target: <30s)
EndToEndDelivery = T3 - T0 (target: <60s)
Notes: if carrier delivery receipts are unavailable, use handset receipt time (T3) as ground truth.

Pre-flight checklist (do before any tests)
A) Test phone
- Use a dedicated test mobile number you can receive SMS on.
- Ensure it can send replies (for STOP/HELP tests).

B) After-hours schedule
- Define business hours for the test (e.g., 9am–5pm local). You will run at least one after-hours test.

C) Booking link
- Ensure the booking/call scheduling link is configured. If a calendar integration exists, confirm it works. If not, use a fallback booking URL.

D) Consent language (for forms)
- Ensure Jotform includes a short consent checkbox for SMS: “By submitting, you agree to receive text messages about your request. Reply STOP to opt out.”

E) Deterministic fallback mode toggle (required)
- Confirm there is an operational way to force fallback qualification (simulate LLM failure) OR use a test flag that causes LLM timeout.
- If no toggle exists, simulate by disconnecting LLM key in a staging environment (do not do in production).

Lead data minimum fields (normalized)
- first_name (string)
- last_name (string, optional)
- phone (E.164 preferred; required to SMS)
- email (optional)
- service (optional)
- zip (optional)
- source (enum: webhook|jotform|hubspot)
- external_id (string for dedupe; required for webhook and CRM)
- consent_sms (boolean if applicable)

Deterministic fallback qualification flow (NO LLM)
This is the safe default when the LLM errors/timeouts OR when the lead data is incomplete.
Outbound SMS #1 (immediate):
“Hi {first_name}, it’s {BusinessName}. Thanks for reaching out about {service if known}. What’s the best address or ZIP code for the job?”
If user provides ZIP/address:
Outbound SMS #2:
“Got it. What service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other”
If user replies 1/2/3/4:
Outbound SMS #3:
“Thanks. When do you want us to come out? Reply 1) ASAP 2) This week 3) Next week”
Then handoff:
- If calendar is healthy: “Perfect—here’s the link to book a time: {calendar_link}. Reply HELP for help or STOP to opt out.”
- If calendar fails: “Thanks—our scheduler is temporarily down. Reply with 2 times that work for you and we’ll confirm. Reply HELP for help or STOP to opt out.”
Compliance keywords:
- STOP: immediately cease automated messages; reply once: “You’re opted out and will no longer receive texts. Reply START to opt back in.”
- START: opt back in; reply: “You’re opted back in. How can we help?”
- HELP: reply with business identity + contact email: “Help: You can reply with your question, or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
After-hours behavior:
- If outside business hours, first SMS must still be sent within <60s but must set expectation:
“Hi {first_name}—we got your request. We’re currently closed, but we’ll follow up at {next_open_time}. If urgent, reply ASAP.”
- If user replies after-hours, continue qualification but avoid promising immediate arrival.

Fail-safe behavior matrix (expected)
1) Missing phone
- Expected: No SMS attempt. Create CRM note/task: “Missing phone—cannot text.” If email exists, send email fallback (optional).
2) Invalid phone (non-E.164 / too short)
- Expected: No SMS attempt. Mark lead status “Invalid phone”; log validation error; create CRM note.
3) STOP/HELP/START
- Expected: STOP triggers immediate suppression; HELP returns help text; START re-enables.
4) After-hours
- Expected: immediate acknowledgement SMS + deferred follow-up scheduling rules.
5) Multiple concurrent leads
- Expected: no queue collapse; each lead receives first SMS <60s. No cross-contamination of transcripts.
6) Calendar link failures
- Expected: switch to “2 times that work” fallback and notify via CRM note.
7) Webhook retries
- Expected: idempotency via external_id; repeated payload does not send duplicate SMS beyond first send.
8) Duplicate leads (same phone within window)
- Expected: dedupe logic (e.g., 24h) to prevent spamming; either update existing thread or send one gentle message acknowledging prior contact.
9) CRM note formatting
- Expected: notes are consistently structured, readable by agencies, and include compliance + outcome.

Test execution: per-source steps
SOURCE A — Generic Webhook JSON
Goal: validate baseline speed, validation, retries, dedupe.
Send requests (use curl/Postman). For each, capture T0/T1/T2/T3.
A1 Valid lead
Payload:
{
  "external_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Webhook",
  "phone": "+15555550101",
  "email": "test.webhook@example.com",
  "service": "Plumbing",
  "zip": "78701",
  "source": "webhook"
}
Expected: SMS #1 within <60s delivered; qualification proceeds.
A2 Missing phone
Same as A1 but omit phone.
Expected: no SMS; CRM/log entry “missing phone”.
A3 Invalid phone
phone: "555-abc"
Expected: no SMS; invalid phone logged.
A4 Duplicate external_id (retry)
Re-send A1 with same external_id within 2 minutes.
Expected: no second SMS; mark as duplicate/retry accepted.
A5 Duplicate phone new external_id
external_id qa-webhook-002, same phone.
Expected: dedupe rule applies (document behavior).

SOURCE B — Jotform
Goal: validate real form submit, consent language, mapping.
Setup:
- Create Jotform with fields: First name, Last name, Phone, Email, Service dropdown, ZIP, Consent checkbox.
Test cases:
B1 Normal submit (consent checked)
Expected: SMS <60s.
B2 Consent unchecked (if you enforce)
Expected: no SMS; CRM note indicates no consent.
B3 Phone malformed
Expected: validation prevents submit OR system rejects and logs.
B4 After-hours submit
Expected: immediate after-hours acknowledgement and proper note.

SOURCE C — HubSpot CRM
Goal: validate CRM-triggered lead ingestion and note formatting.
Setup:
- Define how HubSpot creates a “new lead” event (new Contact, Form submission event, Workflow webhook). Use the simplest available free method.
Test cases:
C1 New contact with valid phone
Expected: SMS <60s; HubSpot note added with transcript + metadata.
C2 Update existing contact (duplicate)
Expected: no duplicate SMS if within dedupe window; note appended not duplicated.
C3 CRM note formatting check
Expected note template (exact):
--- Lead Response Copilot ---
Source: {source}
External ID: {external_id}
Lead: {first_name} {last_name}
Phone: {phone}
Email: {email}
Service: {service}
Location: {zip}
Opt-out status: {opted_out true/false}
First response sent at: {timestamp}
Qualification outcome: {booked|requested_times|no_response|invalid_phone|missing_phone}
Transcript:
- Bot: ...
- Lead: ...
- Bot: ...
Booking:
- Link: {calendar_link or N/A}
- Appointment: {time or N/A}
Errors:
- {any LLM/calendar/provider errors}
----------------------------

STOP/HELP compliance tests (run on any source)
D1 STOP
- After receiving SMS, reply “STOP”.
Expected: immediate opt-out confirmation; no further automated messages.
D2 HELP
- Reply “HELP”.
Expected: help message including agent_bob_replit+lead-copilot@agentmail.to.
D3 START
- After STOP, reply “START”.
Expected: opt-in confirmation and conversation can continue.

LLM failure / deterministic fallback tests
E1 Forced LLM timeout
Expected: system switches to deterministic questions above; no broken/blank messages.
E2 LLM returns nonsense/empty
Expected: fallback triggers; transcript indicates fallback reason.

Concurrency test
F1 Batch 10 leads within 60 seconds (webhook)
Expected: ≥9/10 receive first SMS delivered <60s; none receive another lead’s data; all notes properly separated.

Results table (copy/paste)
Columns: TestID | Source | ExternalID | Phone | Scenario | T0 | T1 | T2 | T3 | EndToEndSeconds | Pass/Fail | Notes

Bug log template
BugID | Title | Severity (P0/P1/P2) | Source | Steps to Reproduce | Expected | Actual | Evidence (screenshots/log IDs) | Suggested Fix | Owner | Status
Severity guidance:
P0: compliance (STOP failure), spamming duplicates, >60s consistently, wrong recipient.
P1: occasional >60s, calendar failure without fallback, malformed notes.
P2: copy issues, minor formatting.

Definition of “Verified <60s first response”
You can claim KPI met when:
- You have at least 20 total test leads across the 3 sources,
- ≥95% have EndToEndSeconds <60,
- Any failures have identified root cause and documented mitigation (configuration or code fix).

Operator handoff
If a pilot agency requests proof, share:
- The legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- A redacted Results table (remove phone/email) showing timestamps and <60s compliance.
If anything breaks during testing, email agent_bob_replit+lead-copilot@agentmail.to with the TestID, timestamps, and screenshots.