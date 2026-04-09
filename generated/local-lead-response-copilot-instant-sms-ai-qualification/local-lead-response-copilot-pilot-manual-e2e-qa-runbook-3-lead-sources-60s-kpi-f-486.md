# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources, <60s KPI, Fail-safe Fallback)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:29:51.373Z

---

Overview
This runbook is designed for early pilots to protect reputation (agencies/local operators) while avoiding premature automation. It validates end-to-end behavior across three lead sources and the fail-safe behaviors that prevent “dead leads” or compliance issues. Use this during onboarding and after any integration change.

Business legitimacy references (include in customer-facing comms/log headers)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

Lead sources covered (minimum 3)
1) Generic Webhook JSON (any tool that can POST JSON)
2) Jotform (real form tool)
3) HubSpot (CRM)

Key KPI + acceptance criteria
KPI-1 Speed-to-lead: first outbound SMS must be sent within 60 seconds of lead creation.
- PASS: p95 <= 60s across at least 20 trials per pilot environment (or minimum 20 total across sources if early-stage).
- FAIL: any systematic breach, or any single breach > 180s without an explicit incident cause.
KPI-2 Safety: if LLM fails/timeout/unavailable, the system must continue with deterministic question flow, and must never send blank/garbled messages.
KPI-3 Compliance: STOP must immediately suppress further marketing/qualification texts; HELP must respond with a compliant help message.

Instrumentation required (manual-friendly)
For each trial capture these timestamps and artifacts:
- T0 Lead created (form submit/webhook received/CRM record created)
- T1 Outbound SMS queued (if visible)
- T2 Outbound SMS delivered/sent (provider log or app log)
- T3 First customer reply received (optional)
- T4 Booking link sent (if applicable)
- T5 Appointment booked (if applicable)
Data to collect: lead ID, source, phone, name, timezone, after-hours flag, dedupe key, outcome (qualified/unqualified/stop/help/error), and raw CRM note text.

Deterministic fallback flow (when LLM fails)
Trigger conditions (any): LLM timeout > 5s, 5xx from model provider, malformed output, safety filter block, or response parse error.
Guarantee: fallback uses fixed templates and fixed branching rules only.

Fallback question set (SMS-friendly)
Message 1 (immediate):
“Hi {firstName}, it’s {businessName}. Thanks for reaching out—what service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other”
If reply=1/2/3/4 or free-text:
Message 2:
“Got it. What’s your ZIP code?”
Message 3:
“Thanks—what’s the best time today for a quick call? Reply 1) ASAP 2) Morning 3) Afternoon 4) Evening”
Message 4 (booking step):
“Perfect. You can grab a time here: {calendarLink}. If you prefer, reply with a time window and we’ll confirm.”

Fallback branching rules
- If phone invalid/missing: do not send SMS; create a CRM note/task: “Missing/invalid phone—request phone via email or form resubmission.”
- If after-hours: send a single acknowledgement + next-business-hours expectation. Example: “We’re closed right now but will text you back at 8am. If urgent, reply URGENT.” Then queue follow-up at open.
- If calendarLink unavailable: replace Message 4 with: “Our booking link is temporarily down—reply with two times that work and we’ll confirm.”
- If user says STOP/UNSUBSCRIBE: immediate suppression; send confirmation.
- If user says HELP: send help message; do not suppress.

STOP/HELP exact behaviors
STOP keywords: STOP, UNSUBSCRIBE, CANCEL, END, QUIT.
- On STOP: “You’re unsubscribed and won’t receive more texts. Reply START to re-subscribe.”
- Ensure all future outbound messages to that number are blocked unless START received.
HELP keyword: HELP.
- On HELP: “Help: This is {businessName}. Reply STOP to opt out. For support email {supportEmail}.”

Test matrix (execute in this order)
A. Generic Webhook JSON (baseline)
Setup
- Use any webhook sender (curl/Postman). POST to the app’s inbound webhook URL.
- Standard payload fields to include: firstName, lastName, phone, email, service, source, createdAt.
Test cases
A1 Happy path valid phone
- Steps: send webhook with valid E.164 phone (+1XXXXXXXXXX).
- Expect: first SMS within 60s, correct personalization, next question sent after reply.
- Record T0..T2 and compute latency.
A2 Missing phone
- Steps: omit phone.
- Expect: no SMS sent; CRM note/task created; system marks lead “needs phone.”
A3 Invalid phone
- Steps: phone=“123” or “+1999”.
- Expect: rejected/flagged; no SMS; note created; no retries to carrier.
A4 Duplicate lead (same phone within 10 minutes)
- Steps: send same payload twice.
- Expect: dedupe; do not start a second conversation; append CRM note “duplicate ignored.”
A5 Webhook retry (same eventId)
- Steps: resend identical payload with same eventId header/body field.
- Expect: idempotent handling; no double SMS.
A6 Concurrency (5 leads in 10 seconds)
- Steps: fire 5 webhooks rapidly.
- Expect: all get first SMS within 60s; no cross-talk; correct lead IDs.

B. Jotform (real form tool)
Setup (free)
- Create a Jotform with fields: Name, Phone, Email, Service Needed, ZIP, Preferred Time.
- Configure Jotform webhook to post submissions to the app webhook endpoint.
Test cases
B1 Standard submission
- Submit form with valid phone.
- Expect: SMS within 60s; initial message references their request.
B2 Phone formatting variants
- Submit with (555) 123-4567, 5551234567, +15551234567.
- Expect: normalization to E.164; no carrier errors.
B3 After-hours
- Submit outside configured business hours.
- Expect: after-hours acknowledgement only + scheduled follow-up at open.
B4 Calendar link failure simulation
- Temporarily set calendar link to invalid URL in app config OR toggle “calendar disabled.”
- Expect: fallback message requesting time windows; no broken link sent.

C. HubSpot (CRM)
Setup (free)
- Use a free HubSpot account. Configure either: (1) HubSpot workflow to POST to webhook on new form submission/contact, or (2) manual “create contact” triggers via integration if supported.
- Ensure CRM writeback is enabled: notes/timeline events added to the contact/deal.
Test cases
C1 CRM note formatting
- After a conversation completes, verify the note includes:
  - Lead source
  - Timestamp of first SMS
  - Qualification answers (service/zip/time)
  - Booking status + link
- PASS format example:
  “LLR Copilot Summary (2026-04-09 14:03 UTC)
   Source: Jotform
   First SMS latency: 22s
   Service: Install
   ZIP: 94107
   Preferred time: Afternoon
   Booking: Sent link / Not booked yet
   Conversation transcript: …”
C2 Duplicate CRM contact
- Create two contacts with same phone.
- Expect: system attaches notes to the correct primary contact (rule: most recently created OR the one with active deal), and logs a warning.
C3 STOP logged to CRM
- Send STOP.
- Expect: suppression flag + CRM note “Opt-out received (STOP) at {time}.”

Fail-safe / error-path tests (apply to all sources)
D1 LLM down
- Simulate by toggling “LLM disabled” or using invalid API key in staging.
- Expect: deterministic fallback messages and full flow completion.
D2 Provider send failure
- Use an invalid test number or force provider error.
- Expect: no infinite retries; mark lead “sms_failed”; create CRM task to call/email.
D3 Webhook endpoint timeout
- Simulate sender retry (same eventId).
- Expect: idempotent; no duplicate outbound SMS.

Results capture template (paste into a spreadsheet)
Columns:
Trial#, Date, Source, Scenario, LeadID, Phone, T0, T2, LatencySeconds, AfterHours(Y/N), LLMMode(LLM/Fallback), Outcome, BookingLinkSent(Y/N), Booked(Y/N), STOP/HELP(Y/N), Notes/Defects

Bug log + fix list template
Fields:
- Bug ID
- Severity (P0 compliance / P1 revenue / P2 annoyance)
- Source (Webhook/Jotform/HubSpot)
- Scenario
- Steps to reproduce
- Expected behavior
- Actual behavior
- Evidence (timestamps, screenshots, log IDs)
- Suggested fix
- Owner
- Status

Verified <60s first response (how to verify)
- For each trial compute LatencySeconds = T2 - T0.
- Report p50/p95 and max.
- If p95 > 60s, open a P1 bug and capture where delay occurs (webhook ingest, queue, provider send).

Go/No-go recommendation for pilots
NO-GO if any P0 compliance bug (STOP not enforced, messages sent after STOP, HELP missing) or repeated >60s latency failures without a clear fix.
GO if: STOP/HELP pass, fallback works on forced LLM failure, p95 <= 60s, and dedupe/idempotency prevent double texting.
