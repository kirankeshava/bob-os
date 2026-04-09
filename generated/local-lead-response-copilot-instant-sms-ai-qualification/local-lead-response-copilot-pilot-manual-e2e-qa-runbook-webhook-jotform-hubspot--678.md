# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (Webhook + Jotform + HubSpot) w/ <60s KPI Proof, Fail-safes, Bug Log, and Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:26:28.753Z

---

Business reference (include in any customer-facing comms)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

Goal
Validate end-to-end lead capture → <60s first SMS response → qualification → booking handoff → CRM logging across 3 lead sources:
1) Generic Webhook JSON (direct)
2) Jotform (real form tool)
3) HubSpot (CRM)
Also validate fail-safe behaviors: missing/invalid phone, STOP/HELP, after-hours, concurrency, calendar/link failure, webhook retries, duplicates, and CRM note formatting.

Success criteria
- KPI: First outbound SMS is sent within 60 seconds of lead received (server receive timestamp). Record handset delivery time separately (carrier latency may vary).
- Compliance: STOP immediately halts messages and persists opt-out; HELP returns support message.
- Reliability: If LLM times out/errors, system switches to deterministic question flow (below) without stalling.
- Data hygiene: Dedupe prevents multiple parallel conversations for the same lead; retries are idempotent.
- CRM: Notes are consistently formatted and include required metadata.

Test environment prerequisites (operator checklist)
A) Phone/SMS
- A real test handset number that can receive SMS.
- A second test handset number (optional) for concurrency tests.

B) Calendar/booking
- A valid booking link (or simulated failure link) used by the flow.

C) Lead sources
1) Webhook
- A publicly accessible webhook endpoint (your product’s inbound lead endpoint).
- Ability to send POST requests (curl/Postman).

2) Jotform
- Jotform form with these fields (exact labels don’t matter; mapping does):
  - full_name (text)
  - phone (text)
  - service_needed (dropdown/text)
  - zip (text)
  - consent_checkbox (optional)
- Configure Jotform to submit to webhook (webhook integration) OR to the product’s native Jotform integration.

3) HubSpot
- HubSpot test portal with:
  - Contacts enabled
  - A known place where the product writes conversation transcript/notes (Contact note, Engagement, or custom object)


How to measure the <60s KPI (timing protocol)
Record three timestamps per test:
1) T0 Lead received (server):
- If the product exposes logs: use the inbound webhook received timestamp.
- If not: use the request sent time from Postman/curl as a proxy and note it.
2) T1 First SMS sent (provider queued/sent):
- Use product event log OR SMS provider log (if accessible).
- If neither available: use time when SMS appears on handset as a proxy (less ideal).
3) T2 Handset received:
- Time when the first SMS arrives on the phone.

Compute:
- Response latency (system): T1 - T0 (must be <60s)
- Delivery latency (carrier): T2 - T1 (informational)

Results table (copy/paste and fill)
| Test ID | Source | Scenario | T0 Received | T1 SMS Sent | T2 Delivered | T1-T0 (sec) | Pass/Fail | Notes |
|---|---|---|---|---|---|---:|---|---|
| 1 | Webhook | Normal |  |  |  |  |  |  |
| 2 | Jotform | Normal |  |  |  |  |  |  |
| 3 | HubSpot | Normal |  |  |  |  |  |  |
… up to 20+


Deterministic fallback qualification flow (NO-LLM)
Trigger conditions
- Any LLM timeout (>5s), error, empty response, malformed tool call, or safety filter refusal.
- Any downstream dependency failure that blocks LLM-based personalization.

Rules
- Keep messages short, single question at a time.
- Never ask for sensitive info.
- Always provide opt-out language when appropriate.

Exact SMS copy + branching
Message 1 (immediate first response; should always fire)
“Hi {first_name}, this is {business_name}. Thanks for reaching out—can I ask 2 quick questions to get you a fast quote?”
If user replies YES/OK/anything positive → Q1.
If user replies STOP → STOP handling.
If no reply within 5 minutes → one follow-up (optional): “Reply YES and I’ll get you scheduled.”

Q1: Service
“What service do you need? (1) Repair (2) Install (3) Estimate/Quote”
- If 1/2/3 recognized → Q2.
- Else: “Got it—reply 1, 2, or 3 so I route you correctly.”

Q2: Timing
“How soon are you looking to get this done? (1) Today/ASAP (2) This week (3) Just researching”
- If 1/2 → booking handoff.
- If 3 → collect email (optional) or offer booking link anyway.

Booking handoff
If calendar is available:
“Perfect—grab a time here: {calendar_link}. If you prefer, reply with 2 times that work for you.”
If calendar fails/unavailable:
“Thanks—our scheduler is temporarily down. Reply with your preferred day/time window and we’ll confirm ASAP.”

After-hours variant
If after-hours flag is true:
“Thanks—our team is currently offline. We’ll text you first thing at {next_business_open_time}. If urgent, reply URGENT.”
- If URGENT: send escalation instruction (e.g., call forwarding) OR simply tag for priority and confirm.

STOP/HELP compliance
- STOP keywords: STOP, UNSUBSCRIBE, CANCEL, END, QUIT.
Response: “You’re opted out and will no longer receive texts. Reply START to opt back in.”
Persist opt-out on lead record; block all future sends.
- HELP keyword: HELP, INFO.
Response: “Support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”


Fail-safe behavior matrix (expected)
1) Missing phone
- Expected: Do not send SMS. Create CRM note: “Lead missing phone; SMS not sent.” If email exists, send email fallback (optional).

2) Invalid phone (fails E.164/length)
- Expected: Do not send SMS. Mark lead as invalid_phone. Log validation error.

3) STOP
- Expected: Immediate confirmation; no further texts; CRM note includes opt-out timestamp and keyword.

4) HELP
- Expected: Provide support email and STOP instructions; do not change opt-in status.

5) After-hours
- Expected: First SMS still sends within 60s but uses after-hours copy; no booking pressure; optionally schedules follow-up at open.

6) Multiple concurrent leads (10 within 60 seconds)
- Expected: All get first SMS <60s; no cross-talk; no queue starvation; per-lead state isolated.

7) Calendar link failures
- Expected: Provide manual scheduling fallback message; log calendar_error; do not loop.

8) Webhook retries
- Expected: Idempotent by lead_id or (source+external_id). Retries should not trigger duplicate SMS.

9) Duplicate leads
- Expected: Detect duplicate within a time window (e.g., same phone + source within 5–15 minutes). Do not restart qualification; append CRM note “duplicate received.”

10) CRM note formatting
- Expected: Notes are readable, consistent, and include required metadata (template below).


HubSpot CRM note formatting (strict template)
Title: “Lead Copilot — Qualification Transcript”
Body (markdown-like plain text):
---
Source: {source} (Jotform/Webhook/HubSpot)
External Lead ID: {external_id}
Received At (UTC): {received_at}
First SMS Sent At (UTC): {first_sms_sent_at}
Opt Status: {opt_status} (opted_in/opted_out)
After Hours: {true/false}
Outcome: {booked / link_sent / manual_followup_needed / invalid_phone / missing_phone / opted_out}
Booking Link: {calendar_link or ‘N/A’}

Transcript:
- System: {message_1}
- Lead: {reply_1}
- System: {q1}
- Lead: {a1}
- System: {q2}
- Lead: {a2}
- System: {handoff}

Errors/Flags:
- {any errors: llm_timeout, calendar_error, validation_error, dedupe_triggered}
---


Test cases (minimum set to run in first pilot)
Run at least 20 total submissions across the three sources.
A) Normal flows (9)
1. Webhook normal lead
2. Webhook normal lead (different phone)
3. Webhook after-hours
4. Jotform normal lead
5. Jotform normal lead (different phone)
6. Jotform after-hours
7. HubSpot normal lead creation → trigger
8. HubSpot lead with existing contact
9. HubSpot after-hours

B) Edge cases (11)
10. Missing phone (webhook)
11. Invalid phone (webhook: “1234”)
12. STOP response immediately after first SMS
13. HELP response
14. Calendar link failure (use intentionally broken link)
15. Webhook retry (same lead_id resent 3x)
16. Duplicate lead (same phone, different external_id)
17. Concurrency burst: 10 leads in 60 seconds (webhook)
18. LLM failure simulation (force timeout/error) → verify deterministic fallback
19. CRM note formatting verification (random sample of 5)
20. Opt-out persistence: send new lead for previously STOPped phone


Webhook test payloads (ready-to-send examples)
1) Valid
{
  "source": "webhook",
  "external_id": "wh_001",
  "full_name": "Test Customer",
  "phone": "+14155550101",
  "service_needed": "Repair",
  "zip": "94103",
  "submitted_at": "2026-04-09T12:00:00Z"
}

2) Missing phone
{
  "source": "webhook",
  "external_id": "wh_002",
  "full_name": "No Phone",
  "service_needed": "Estimate",
  "zip": "94103",
  "submitted_at": "2026-04-09T12:01:00Z"
}

3) Invalid phone
{
  "source": "webhook",
  "external_id": "wh_003",
  "full_name": "Bad Phone",
  "phone": "1234",
  "service_needed": "Install",
  "zip": "94103",
  "submitted_at": "2026-04-09T12:02:00Z"
}

4) Duplicate lead (same phone)
{
  "source": "webhook",
  "external_id": "wh_004",
  "full_name": "Dup Lead",
  "phone": "+14155550101",
  "service_needed": "Repair",
  "zip": "94103",
  "submitted_at": "2026-04-09T12:03:00Z"
}

5) Retry scenario (same external_id resent)
{
  "source": "webhook",
  "external_id": "wh_001",
  "full_name": "Test Customer",
  "phone": "+14155550101",
  "service_needed": "Repair",
  "zip": "94103",
  "submitted_at": "2026-04-09T12:00:00Z",
  "retry": true
}


Bug log (fill during pilot)
| Bug ID | Severity (P0/P1/P2) | Scenario | Steps to Reproduce | Expected | Actual | Evidence (log/screenshot) | Proposed Fix | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|

High-risk bugs to watch (P0 candidates)
- First SMS >60s after T0.
- STOP not honored or opt-out not persisted.
- Duplicate/retry sends multiple SMS threads.
- Calendar failure causes loop or dead-end.
- HubSpot notes missing transcript/metadata.

Operator execution notes
- Prefer running tests during a window that includes after-hours boundary to validate routing.
- When measuring T1 (SMS sent), always use the earliest provider “sent/queued” timestamp available; handset delivery is not a reliable KPI.
- Keep all test phones and payload IDs documented so we can reproduce issues quickly.
