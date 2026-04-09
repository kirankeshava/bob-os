# Local Lead Response Copilot — Manual Pilot E2E QA Test Plan + Results (Webhook JSON + Jotform + HubSpot) with <60s KPI Proof + Fail-safes

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:44:12.092Z

---

Business legitimacy reference (include in any agency/pilot comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

Goal
Validate (manually, during pilots) that Local Lead Response Copilot:
1) Sends first SMS response to new leads within 60 seconds (KPI) across 3 lead sources.
2) Qualifies leads safely and consistently, even if the LLM fails, via deterministic fallback.
3) Handles reputation-damaging edge cases safely: missing/invalid phone, STOP/HELP, after-hours, duplicate leads, webhook retries, calendar/booking failures, concurrency, CRM note formatting.

Scope: 3 lead sources
A) Generic Webhook JSON (direct POST to our endpoint)
B) Jotform (real form tool)
C) HubSpot (CRM ingestion + note/transcript formatting)

Definitions
- First response time (FRT): time between (lead received by our server) and (first outbound SMS queued/sent). Also record handset delivery time when possible.
- Pass threshold: server-received -> SMS queued/sent < 60 seconds for 95% of tests; no single test > 90 seconds without documented external cause (carrier delay, provider outage).
- Deterministic fallback: fixed question flow used when LLM errors/timeouts or returns unsafe/invalid output.

Prerequisites (operator checklist)
1) You have access to:
   - A test mobile phone capable of receiving SMS.
   - A second test number (optional) to test concurrency.
2) You know your environment’s:
   - Lead ingestion endpoint (webhook URL) for JSON tests.
   - Outbound SMS sender number.
   - HubSpot portal (test) and the location where notes/transcripts should be written.
3) Time capture tools:
   - Use a stopwatch + write down timestamps OR use a simple spreadsheet.
   - For server timestamps: rely on application logs if exposed; otherwise use the moment you click “Submit” as proxy and annotate “proxy”.

Lead data model (minimum fields)
- lead_id (string, unique per submission) — required for dedupe and retries
- first_name (string)
- last_name (string)
- phone (E.164 preferred, e.g., +14155551234)
- email (optional)
- source (webhook|jotform|hubspot)
- service_type (optional) e.g., plumbing, HVAC
- zip (optional)
- message (optional)
- created_at (ISO string)

Deterministic (No-LLM) fallback qualification flow
Trigger conditions
- LLM API timeout > 4s (configurable)
- LLM error/exception
- LLM returns empty/unsafe output (e.g., missing question, asks for payment info, non-compliant content)

Fallback SMS copy and branching (exact text)
SMS-0 (first response; always within 60s)
“Hi {first_name}, this is {Business/ClientName}. Thanks for reaching out—quick questions so we can help fast. Reply 1) ASAP 2) This week 3) Just pricing.”

If reply = 1 (ASAP):
SMS-1A: “Got it. What’s the service needed? (e.g., water heater, AC not cooling, leak).”
Then SMS-2A: “What’s the address or zip code?”
Then SMS-3A: “Best time today for a quick call: 1) Now 2) <1 hr 3) Later today.”
Outcome: if booking link available, send booking link; else notify team + offer manual callback.

If reply = 2 (This week):
SMS-1B: “What service do you need?”
SMS-2B: “What zip code?”
SMS-3B: “What day/time works best? Reply with a couple options.”
Outcome: send booking link or confirm a callback window.

If reply = 3 (Just pricing):
SMS-1C: “Happy to help—what service is it, and what’s the zip code? We’ll send a ballpark and options.”
Outcome: route to estimate workflow; optionally ask for photos via MMS link if supported.

STOP/HELP compliance (mandatory)
- If inbound contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT” (case-insensitive): immediately mark opted-out; send confirmation once: “You’re opted out and will no longer receive texts. Reply HELP for help.” Do not send any further marketing/qualification.
- If inbound contains “HELP”: send: “Help: This is {Business/ClientName} appointment texting. Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to.”

After-hours behavior
Define business hours per client (default example: Mon–Fri 8am–6pm local).
- If lead arrives after-hours: send within 60s:
  “Thanks {first_name}—we’re currently closed. We’ll reach out at {next_open_time}. If this is an emergency, reply ‘EMERGENCY’.”
- If reply EMERGENCY: route to on-call (if configured) OR respond: “We’re alerting our on-call team now. If you don’t hear back in 10 minutes, call {phone}.”

Calendar/booking link failure
- If booking link is unavailable/returns error: do not loop.
  Send: “Our booking link is temporarily down—sorry. Reply with 2 times that work and we’ll confirm.”
  Create internal task + CRM note: BOOKING_LINK_FAILURE.

Fail-safe behavior matrix (expected)
1) Missing phone: Do not attempt SMS. Create CRM note: MISSING_PHONE; if email present send email (optional). Mark lead as “Needs phone”.
2) Invalid phone: Do not attempt SMS. Create CRM note: INVALID_PHONE + raw value. If possible, request phone via email/CRM task.
3) Duplicate lead (same lead_id within 24h): do not re-text; update CRM note “DUPLICATE_RECEIVED” with timestamps.
4) Webhook retries (same lead_id, retry header or same payload): idempotent handling; only one outbound conversation thread.
5) Concurrent leads (10 submissions in 60s): system queues without dropping; first response KPI still met for each.
6) STOP/HELP: comply immediately; ensure no further automated qualification.
7) After-hours: send after-hours template within 60s and schedule follow-up.
8) Calendar failure: gracefully degrade to manual scheduling prompt + internal alert.
9) HubSpot formatting: notes must be readable, consistent, and include key metadata.

HubSpot CRM note formatting (strict template)
Title: “Lead Copilot Transcript — {lead_id} — {source} — {status}”
Body (example)
---
Lead ID: {lead_id}
Source: {source}
Received (server): {received_ts}
First SMS queued: {sms_queued_ts}
First SMS delivered (handset): {sms_delivered_ts or unknown}
Phone: {phone}
Email: {email}
Opt-out: {true/false}
After-hours: {true/false}
Booking outcome: {Booked | Sent link | Link failed | Callback requested | Opted-out}

Transcript:
Agent: {message}
Lead: {message}
Agent: {message}
...

Tags:
- SPEED_TO_LEAD_{PASS/FAIL}
- FALLBACK_{USED/NOT_USED}
- DEDUPE_{HIT/NO}
- BOOKING_{OK/FAIL}
---

Manual E2E test cases (execute and record)
How to record timing
For each test, record:
T0 = lead submit time (or server received time if available)
T1 = SMS queued/sent time (provider log or app log)
T2 = handset received time (timestamp on phone)
Compute:
FRT_server = T1 - T0
FRT_delivery = T2 - T0 (may vary by carrier)

Test Case Set A: Generic Webhook JSON
A1 Valid lead (happy path)
- Payload:
{
  "lead_id": "qa-webhook-001",
  "first_name": "Alex",
  "last_name": "Test",
  "phone": "+14155550101",
  "email": "alex@example.com",
  "source": "webhook",
  "service_type": "Plumbing",
  "zip": "94107",
  "message": "Need a quote",
  "created_at": "2026-04-09T12:00:00Z"
}
Expected:
- First SMS (SMS-0) sent < 60s.
- Qualification proceeds (LLM or fallback).
- HubSpot note created/updated with transcript.

A2 Missing phone
- phone omitted or null
Expected:
- No SMS attempted.
- CRM note indicates MISSING_PHONE.

A3 Invalid phone
- phone: "12345" or "+1(415)ABC"
Expected:
- No SMS attempted.
- CRM note INVALID_PHONE with raw value.

A4 Duplicate lead ID
- Re-send A1 payload within 5 minutes
Expected:
- No second SMS-0.
- CRM note updated with DUPLICATE_RECEIVED.

A5 Retry simulation
- Send same payload with a retry indicator header (if supported) or resend quickly 3x
Expected:
- Idempotent behavior; one conversation.

Test Case Set B: Jotform (real form tool)
Setup
- Create a Jotform form with fields: First name, Last name, Phone, Email, Service type, Zip, Message.
- Integrate: Jotform submission -> our system (webhook/zap) depending on current architecture.

B1 Valid submission
Expected:
- SMS-0 < 60s.
- Source marked “jotform”.

B2 Missing phone (leave blank)
Expected:
- Submission accepted but no SMS; CRM note MISSING_PHONE.

B3 Invalid phone (enter 111)
Expected:
- No SMS; CRM note INVALID_PHONE.

B4 After-hours submission
- Submit outside configured hours.
Expected:
- After-hours template within 60s.
- Follow-up scheduled next open.

Test Case Set C: HubSpot (CRM)
Setup
- Create test pipeline/contact properties or a test form in HubSpot that triggers our workflow.
- Ensure we can write notes to the Contact timeline.

C1 New HubSpot contact with valid phone
Expected:
- SMS-0 < 60s.
- Note created using strict template.

C2 Duplicate contact update (same lead_id or same phone within window)
Expected:
- Deduped; no repeated initial SMS.
- Note indicates dedupe.

C3 CRM note formatting validation
Expected:
- Note includes metadata block + transcript + tags exactly.

Edge case tests (run at least once each)
E1 STOP compliance
- After receiving SMS-0, reply “STOP”.
Expected:
- Opt-out confirmation sent once.
- No further messages, even if lead continues texting.
- CRM: Opt-out true.

E2 HELP compliance
- Reply “HELP”.
Expected:
- HELP message returned with opt-out instructions and support email.

E3 Calendar link failure
- Simulate booking URL down (use an invalid link in config for test).
Expected:
- Apology + ask for 2 times.
- CRM tag BOOKING_FAIL.

E4 Concurrency
- Submit 10 leads in under 60 seconds (mix of sources if possible).
Expected:
- No drops; FRT_server < 60s for each.

Results table (copy/paste)
| Test ID | Source | Scenario | T0 Lead received | T1 SMS queued/sent | T2 Handset received | FRT_server (s) | Pass? | Notes |
|--------|--------|----------|------------------|--------------------|--------------------|----------------|-------|-------|
| A1 | webhook | valid | | | | | | |
| A2 | webhook | missing phone | | | | n/a | | |
| A3 | webhook | invalid phone | | | | n/a | | |
| A4 | webhook | duplicate | | | | | | |
| B1 | jotform | valid | | | | | | |
| B4 | jotform | after-hours | | | | | | |
| C1 | hubspot | new contact | | | | | | |
| E1 | any | STOP | | | | | | |
| E4 | any | concurrency batch | | | | | | |

Bug / Fix log template
| Bug ID | Title | Severity (P0/P1/P2) | Steps to Reproduce | Expected | Actual | Source | Evidence (logs/screenshots) | Proposed Fix | Owner | Status |
|-------|-------|----------------------|-------------------|----------|--------|--------|-----------------------------|-------------|-------|--------|

KPI proof checklist (what counts as “verified <60s”)
- Provide at least 20 rows in Results table.
- At least 19/20 have FRT_server < 60s.
- Any failures have a documented external reason OR a bug filed with reproducible steps.
- Include at least 1 after-hours test, 1 STOP test, 1 duplicate/retry test, and 1 concurrency test.

Operational go/no-go for first pilots
GO if:
- STOP/HELP compliance passes.
- No SMS sent to missing/invalid numbers.
- FRT_server < 60s for >=95% of runs.
- HubSpot notes readable and consistent.
NO-GO if:
- Any STOP violation.
- Repeated texting on duplicates/retries.
- System sends messages after opt-out.
- FRT_server regularly >60s without carrier explanation.

Notes
This is intentionally manual and lightweight to protect early revenue momentum. Once 1–3 customers are paying and integrations stabilize, the highest-risk cases (STOP, dedupe, retries, after-hours) can be converted into automated smoke tests.