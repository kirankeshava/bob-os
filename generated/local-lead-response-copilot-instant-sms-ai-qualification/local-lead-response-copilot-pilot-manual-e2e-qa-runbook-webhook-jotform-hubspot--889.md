# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:18:20.591Z

---

Business context
Local Lead Response Copilot (Instant SMS + AI Qualification) — micro-SaaS that texts new leads within 60 seconds, qualifies via short questions, and routes to booking/call. Legitimacy link to share with testers/agencies: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Ops contact email (use in tool configs + test notifications): agent_bob_replit+lead-copilot@agentmail.to

Goal of this runbook
1) Validate <60 seconds from “lead received” to “first SMS delivered” across 3 lead sources.
2) Validate safe fallback behaviors (compliance + booking reliability) under common failure/edge cases.
3) Produce agency-grade CRM notes (HubSpot) with consistent formatting.

Lead sources in scope (3)
A) Generic Webhook JSON (direct POST to our webhook endpoint)
B) Jotform (real form tool) → webhook or native integration into our app
C) HubSpot CRM (new contact / form submission / workflow trigger) → our app

Key KPI definition and measurement
KPI: First outbound SMS must be delivered to the lead handset in <60 seconds from lead receipt time.
Definitions:
- T0 (Lead received): timestamp when our server receives the lead payload (log time).
- T1 (SMS queued/sent): timestamp when SMS provider API call returns success (log time).
- T2 (SMS delivered): handset delivery time (best effort). If delivery receipts aren’t available, use phone stopwatch + message arrival time as proxy.
Pass criteria: (T2 - T0) < 60s. If T2 unavailable, require (T1 - T0) < 20s AND observed handset arrival < 60s.

Required logging fields (minimum)
For every test lead, capture:
- Lead Source (Webhook/Jotform/HubSpot)
- External Lead ID (if provided)
- Phone number used
- T0 (server receive)
- T1 (SMS sent)
- T2 (handset received)
- Scenario (normal / missing phone / invalid / STOP / after-hours / etc.)
- Outcome (Pass/Fail)
- Notes / screenshot link

Deterministic fallback qualification flow (NO-LLM)
Trigger conditions:
- LLM timeout > 5 seconds
- LLM returns error/empty
- LLM confidence below threshold (if implemented)
- Compliance mode forced (e.g., user says “agent”, “human”, or STOP/HELP)

Fallback message and question flow (exact text)
Message 1 (immediate):
“Hi {first_name}—this is {business_name}. Thanks for reaching out. Quick questions so we can help fast:”
Q1: “What service do you need? Reply 1) Repair 2) Install 3) Quote/Other”
- If 1/2/3 not recognized → “Reply 1, 2, or 3.” (max 2 retries, then route to human)
Q2: “What’s your ZIP code?”
- If invalid ZIP → “Please reply with a 5-digit ZIP code.” (max 2 retries)
Q3: “When do you need this? Reply 1) ASAP 2) This week 3) Just researching”
Q4: “Best time to call you? Reply 1) Morning 2) Afternoon 3) Evening”
Handoff:
- If within business hours: “Got it—here’s the booking link: {calendar_link}. If you prefer, reply CALL and we’ll ring you.”
- After-hours: “Thanks—our team will text/call you when we open at {open_time}. If urgent, reply URGENT.”
STOP/HELP compliance (always deterministic):
- If inbound contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT”: Immediately stop all messages and log opt-out.
- If inbound contains “HELP”: Send: “You’re receiving texts about your recent inquiry. Reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to”

Fail-safe behavior matrix (expected behaviors)
1) Missing phone
- Expected: Do not send SMS. Create CRM note: “Lead missing phone—unable to contact via SMS.” Send internal email alert to agent_bob_replit+lead-copilot@agentmail.to.
2) Invalid phone (non-E.164 or too short)
- Expected: Do not send SMS. Normalize if possible; otherwise log invalid and alert.
3) STOP received
- Expected: Immediately cease. Tag contact “SMS Opted Out”. No further automation.
4) HELP received
- Expected: Send HELP response once; do not qualify further unless lead re-engages with a clear request.
5) After-hours
- Expected: Send a single acknowledgement (no repeated pings). Queue follow-up at next open time. Do not book calls outside allowed window.
6) Multiple concurrent leads (10+ within 1 minute)
- Expected: No queue backlog that breaks <60s; if rate-limited, prioritize first SMS and defer qualification.
7) Calendar link failure (404, timeout)
- Expected: Fallback to “Reply CALL” and notify internal email; write CRM note “calendar_down=true”.
8) Webhook retries
- Expected: Idempotency by externalLeadId (or phone+timestamp window). Retried payload must not spam duplicate SMS.
9) Duplicate leads (same phone within 5 minutes)
- Expected: Suppress duplicate intro SMS; append CRM note with “duplicate_suppressed=true”.
10) CRM note formatting
- Expected: Notes must be readable, consistent, and contain key metadata, transcript, and outcome.

HubSpot note format (strict template)
Subject: “Lead Copilot Qualification Transcript — {source} — {status}”
Body (example):
---
Lead Copilot Summary
Source: {Webhook|Jotform|HubSpot}
External Lead ID: {id or n/a}
Received (T0): {ISO timestamp}
First SMS Sent (T1): {ISO timestamp}
First SMS Delivered (T2): {ISO timestamp or n/a}
Phone: {E.164}
Opt-out: {true/false}
After-hours: {true/false}
Booking Link Presented: {true/false}
Booking Outcome: {Booked|Clicked|No Response|Calendar Down|Routed to Human}

Transcript
OUT: {message1}
IN: {reply1}
OUT: {message2}
IN: {reply2}
...

Tags
{kpi_under_60s=true/false, duplicate_suppressed=true/false, llm_fallback_used=true/false}
---

Test execution plan (manual)
Setup prerequisites
- A test handset number you control (ideally 2 numbers: one primary + one for concurrency tests).
- Ability to view server/app logs for T0 and T1 timestamps.
- Access to Jotform (free) and HubSpot (free) sandbox.

Step-by-step: Generic Webhook JSON
1) Identify the webhook endpoint URL in the app.
2) Use curl/Postman to send payloads below.
3) Start a stopwatch at send time; capture T0 from server logs; capture handset arrival time for T2.
4) Verify SMS content, STOP/HELP behavior, and CRM note creation.

Webhook payloads (ready to paste)
A) Normal
{
  "source": "webhook",
  "externalLeadId": "qa-webhook-001",
  "firstName": "Test",
  "lastName": "Lead",
  "phone": "+14155550101",
  "email": "test@example.com",
  "service": "HVAC repair",
  "zip": "94107",
  "timestamp": "2026-04-09T12:00:00Z"
}
Expected: Intro SMS <60s; qualification begins; CRM note created.

B) Missing phone
{
  "source": "webhook",
  "externalLeadId": "qa-webhook-002",
  "firstName": "NoPhone",
  "email": "test@example.com"
}
Expected: No SMS; internal alert; CRM note indicates missing phone.

C) Invalid phone
{
  "source": "webhook",
  "externalLeadId": "qa-webhook-003",
  "firstName": "BadPhone",
  "phone": "12345"
}
Expected: No SMS; invalid phone logged; internal alert.

D) Duplicate lead ID retry
(send A again with same externalLeadId)
Expected: No second intro SMS; CRM note shows duplicate suppressed.

E) Simulated retry (no leadId)
{
  "source": "webhook",
  "firstName": "Retry",
  "phone": "+14155550101",
  "timestamp": "2026-04-09T12:01:00Z"
}
Expected: If identical payload repeats within short window, suppress duplicates using phone+time heuristic.

Step-by-step: Jotform
1) Create a Jotform form named “Lead Copilot QA Form”. Fields:
- First Name (required)
- Last Name
- Phone (required)
- Email
- Service Needed (dropdown)
- ZIP
2) Configure form submission webhook to our app endpoint.
3) Submit 10 tests: 6 normal, 2 invalid phone formats, 1 missing phone (attempt), 1 after-hours.
4) Record KPI timings and confirm CRM note formatting.

Step-by-step: HubSpot
1) Create a test HubSpot portal.
2) Create a contact property “lead_source_test” (optional).
3) Set up a workflow trigger for new contacts (or form submissions) to POST to our webhook endpoint.
4) Create 10 contacts quickly to simulate concurrency (CSV import or manual rapid entry).
5) Verify:
- Dedupe (same phone)
- Note format template
- No spam on retries

Edge-case scripts to run on handset
STOP test:
- After receiving first SMS, reply “STOP”. Ensure no further messages.
HELP test:
- Reply “HELP”. Ensure correct help text includes agent_bob_replit+lead-copilot@agentmail.to.
After-hours test:
- Change business hours setting (or run at off-hours). Ensure only one acknowledgement and follow-up scheduling.
Calendar failure test:
- Temporarily set calendar link to an invalid URL. Ensure fallback “Reply CALL” and internal alert.

Results table (fill during execution)
Columns:
Test ID | Source | Scenario | Phone | T0 | T1 | T2 | (T2-T0) | Pass? | Notes/Bug link
Minimum proof target: 20 total leads across 3 sources with at least:
- 10 normal
- 2 missing phone
- 2 invalid phone
- 2 STOP/HELP combined
- 2 after-hours
- 2 duplicates/retries

Bug log format (copy/paste)
Bug ID:
Title:
Severity: (Blocker/High/Medium/Low)
Source(s):
Scenario:
Steps to Reproduce:
Expected:
Actual:
Evidence (logs/screenshots):
Suggested Fix (smallest change first):
Workaround (if any):
Retest Date/Result:

Known high-risk failure points to watch
- Phone normalization to E.164 (avoid sending to malformed numbers)
- Idempotency key design (externalLeadId vs phone+window)
- Rate limiting from SMS provider under concurrency
- Calendar link brittleness
- HubSpot API note length/format issues

Operator instructions for agency-facing communication (if asked)
If an agency asks “is this legit” or wants proof:
- Send website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

End of runbook
Completion criteria: At least 20 timed tests executed; >= 95% of first responses delivered <60s; all compliance behaviors (STOP/HELP/after-hours) verified; any failures documented with reproducible bug entries and recommended smallest fixes/workarounds.