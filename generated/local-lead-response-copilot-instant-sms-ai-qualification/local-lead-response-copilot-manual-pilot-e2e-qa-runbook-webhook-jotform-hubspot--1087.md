# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Deterministic Fallback Flow

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:51:11.686Z

---

# Local Lead Response Copilot — Manual Pilot E2E QA Runbook

Purpose: Validate end-to-end behavior for early pilots (1–3 customers) without building automation. This runbook proves the speed-to-lead KPI (<60s to first outbound SMS) across 3 lead sources and validates fail-safe behaviors to protect agency reputation.

Reference assets (use in any customer-facing comms):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Contact email: agent_bob_replit+lead-copilot@agentmail.to

## 1) Scope
Lead sources under test (3):
1) Generic Webhook JSON (direct POST into ingestion endpoint)
2) Jotform (real form tool)
3) HubSpot (CRM)

Core success criteria:
- First response KPI: First outbound SMS is initiated within 60 seconds of lead receipt for valid phone leads.
- Compliance: STOP/HELP handled safely; no further marketing/qualification SMS after STOP.
- Resilience: Deterministic (no-LLM) qualification flow activates on LLM error/timeout.
- Safety: Missing/invalid phone does not trigger SMS; instead logs + CRM note.
- Reliability: Retries and duplicates do not spam the same lead.

## 2) Pre-Flight Checklist (do before running timed tests)
Record these environment details in the Results table:
- Test date/time + timezone
- SMS provider (e.g., Twilio) message service/sender ID
- Ingestion endpoint URL for webhook tests
- Jotform form URL + integration method (webhook/Zapier/native)
- HubSpot account (sandbox) + object target (Contact/Deal) + where notes are written

Required fields (normalize across sources):
- lead_id (unique identifier from source; if absent, generate)
- first_name
- last_name (optional)
- phone (E.164 preferred)
- email (optional)
- service_requested (optional)
- lead_source (webhook/jotform/hubspot)
- created_at (source timestamp)

## 3) Timing Proof Method (<60s KPI)
For each test lead, capture 3 timestamps:
T0 = “Lead Received” (server received time; if not available, use integration receive time)
T1 = “SMS Queued/Sent” (SMS provider log timestamp)
T2 = “SMS Delivered to handset” (carrier delivery receipt if available; otherwise use phone screenshot time)

KPI evaluation:
- Primary KPI: (T1 - T0) <= 60 seconds
- Secondary observation: (T2 - T0) reported, but delivery depends on carrier; do not fail the system solely on delayed carrier delivery.

How to capture evidence:
- Screenshot of SMS provider log for each message
- Screenshot/photo of handset showing first inbound message time
- Export/record ingestion logs showing received timestamps

## 4) Deterministic No-LLM Fallback Qualification Flow (Exact Copy)
Trigger conditions:
- LLM timeout (e.g., >5–8 seconds)
- LLM error/exception
- LLM returns empty/unsafe output

Rules:
- Keep to max 3 questions before routing to booking/call.
- All questions are multiple-choice (reduce ambiguity).

Message 1 (immediate):
“Hi {first_name}, it’s {business_name}. Thanks for reaching out — can I ask 2 quick questions to get you the fastest quote? Reply 1, 2, or 3:
1) Emergency (today)
2) This week
3) Just researching”

If reply = 1/2/3, Message 2:
“Got it. What service do you need most? Reply:
1) {service_a}
2) {service_b}
3) Other (tell me)”

If reply = 1/2/3 or free text, Message 3:
“Last one — what’s the job address or ZIP?”

Routing:
- If emergency (1): Immediately send booking/call handoff:
“Thanks — we can prioritize this. Here’s the fastest way to get on the schedule: {booking_link}. If you prefer, reply CALL and we’ll ring you.”
- If not emergency: send booking link + soft CTA.

STOP/HELP overrides (highest priority):
- If inbound contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT”:
Reply: “You’re opted out and will no longer receive messages. Reply HELP for help.”
Set lead status = opted_out, suppress all future outbound.
- If inbound contains “HELP”:
Reply: “Help: This is {business_name} responding to your request. Reply STOP to opt out. For support email {support_email}.”

After-hours rule:
- Define business hours, e.g., 8am–6pm local.
- If lead received outside hours:
Send: “Thanks for reaching out — we’re currently closed. We’ll text you at {next_open_time}. If urgent, reply URGENT.”
Queue follow-up at next open time. If URGENT, send escalation notice to owner/dispatcher.

## 5) Fail-safe Behavior Matrix (Expected Outcomes)
1) Missing phone:
- No SMS sent.
- Create CRM note: “Missing phone; cannot text. Request phone via email or form fix.”
- If email exists: optionally send email asking for phone (manual).

2) Invalid phone (too short, letters, non-dialable):
- No SMS sent.
- CRM note includes original value and validation reason.

3) STOP:
- Immediate opt-out confirmation.
- Suppress all future messages.
- CRM note records opt-out event + timestamp.

4) HELP:
- Send help text (above).
- Do not opt out.
- CRM note records help request.

5) After-hours:
- Send after-hours acknowledgement within <60s.
- Defer qualification or booking push until open (unless URGENT).

6) Multiple concurrent leads:
- System should send first SMS to each lead independently; no cross-talk.
- No message content should contain another lead’s PII.

7) Calendar/booking link failure (link down/invalid):
- Detect failure (if link check exists) OR handle booking errors.
- Fallback: “Booking link is having issues — reply with 2 times that work for you tomorrow (e.g., 10am/2pm) and we’ll confirm.”
- Create internal alert/CRM note.

8) Webhook retries:
- On identical lead_id received within retry window, dedupe and do not send duplicate first SMS.
- Log idempotency decision.

9) Duplicate leads (same phone + source within 24h):
- Suppress duplicate outreach or send a single polite continuation:
“Looks like we already connected — are you still looking for help with {service}?”

10) CRM note formatting:
- Must be consistent, readable, and agency-report friendly (template below).

## 6) HubSpot CRM Note Formatting (Strict Template)
Write one note per lead containing:

Title: “Lead Copilot Transcript — {lead_source} — {YYYY-MM-DD HH:MM TZ}”
Body:
- Lead ID: {lead_id}
- Source: {lead_source}
- Name: {first_name} {last_name}
- Phone: {phone} (validated: yes/no)
- Email: {email}
- Received (T0): {timestamp}
- First SMS queued (T1): {timestamp}
- KPI (T1-T0): {seconds}s
- Opt-out: {yes/no} (timestamp if yes)
- After-hours: {yes/no}
- Booking outcome: {booked link / requested callback / no response / failed calendar}
- Transcript:
  - OUT {time}: “...”
  - IN  {time}: “...”
  - OUT {time}: “...”

## 7) Test Execution — 3 Lead Sources
### A) Generic Webhook JSON
Send POST requests using curl/Postman.

Payload 1 (happy path):
{
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Webhook",
  "phone": "+15555550101",
  "email": "test.webhook@example.com",
  "service_requested": "Plumbing leak",
  "lead_source": "webhook",
  "created_at": "2026-04-09T10:00:00Z"
}

Payload 2 (missing phone): phone omitted or null.
Payload 3 (invalid phone): "phone": "12345"
Payload 4 (duplicate lead_id): send Payload 1 twice within 30 seconds.
Payload 5 (retry simulation): same lead_id, include header indicating retry if supported.

Expected: First SMS queued within 60s for valid phone; no SMS for missing/invalid; dedupe prevents double-send.

### B) Jotform
Create form fields:
- First name
- Last name
- Phone
- Email
- Service needed (dropdown)
- Consent checkbox (optional)

Create 10 submissions:
- 4 normal (different phones)
- 2 missing phone
- 1 invalid phone
- 1 STOP after first message
- 1 after-hours submission
- 1 duplicate submission (same phone)

Expected: Same behaviors as matrix; ensure mapping is correct and lead_source="jotform".

### C) HubSpot
Create/choose an object flow:
- Option 1: New Contact created triggers Copilot
- Option 2: New Deal created triggers Copilot

Create 10 lead injections:
- 6 normal
- 1 missing phone
- 1 invalid phone
- 1 duplicate (same contact created twice)
- 1 concurrency test (create 3 contacts rapidly)

Expected: CRM note created with strict template; dedupe applied; no SMS on missing/invalid.

## 8) Edge-Case Test Scripts (Operator Steps)
STOP test:
1) Submit a valid lead.
2) On handset, reply “STOP”.
3) Verify opt-out confirmation and no further messages even if you submit the same lead again.

HELP test:
1) Reply “HELP”.
2) Verify help text includes business name and support email.

Calendar failure test:
1) Temporarily set booking_link to invalid (staging only) OR simulate booking endpoint down.
2) Ensure fallback message and CRM note alert.

Concurrency test:
1) Submit 5 leads within 30 seconds.
2) Confirm all get first SMS and no PII leakage.

## 9) Results Table (Copy/Paste)
For each test:
- Test ID:
- Source:
- Scenario:
- T0 Received:
- T1 SMS queued/sent:
- Delta (sec):
- First SMS content correct (Y/N):
- STOP/HELP compliance (if applicable):
- After-hours behavior (if applicable):
- CRM note created (Y/N):
- CRM note format pass (Y/N):
- Dedupe pass (Y/N):
- Bugs/notes:

## 10) Bug Log Template
- Bug ID:
- Title:
- Severity (P0 reputation/legal, P1 conversion, P2 cosmetic):
- Source (webhook/jotform/hubspot):
- Steps to reproduce:
- Expected:
- Actual:
- Evidence (screenshots/log links):
- Suggested fix (smallest change):
- Retest status:

## 11) Definition of “Verified <60s First Response”
Mark as verified when:
- At least 20 total timed test leads across the 3 sources
- At least 90% of valid-phone leads have (T1-T0) <= 60 seconds
- Any failures have identified cause + workaround/fix plan

Operator note: For early pilots, prioritize avoiding reputational failures over perfection: STOP compliance, no duplicate spam, and clean CRM notes matter more than advanced LLM behavior.
