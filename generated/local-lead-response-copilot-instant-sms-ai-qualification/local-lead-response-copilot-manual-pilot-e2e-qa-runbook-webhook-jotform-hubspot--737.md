# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:59:59.054Z

---

Purpose
Validate end-to-end reliability during the first 1–3 pilots without building automation. This runbook proves the speed-to-lead KPI (<60 seconds to first SMS) and verifies fail-safe behaviors that protect reputation with agencies.

Product identity to reference in support/comms
- Website (legitimacy link for customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

Scope: 3 lead sources
1) Generic Webhook JSON (direct POST from any form/ads middleware)
2) Jotform (form tool)
3) HubSpot (CRM)

Pre-flight setup (do once)
A. Phone/SMS environment
- Use one real mobile handset as “Lead Phone A” and (optionally) a second handset as “Lead Phone B” for concurrency tests.
- Confirm the sending number/channel is active.
- Ensure STOP/HELP keywords are enabled/handled.

B. Time capture tools
- Use a stopwatch and a simple timestamp log (Notes/Sheet).
- Required timestamps for every test lead:
  1) T0 = Lead submitted (form submit time or webhook request send time)
  2) T1 = System “SMS queued/sent” time (from logs/provider console if available)
  3) T2 = Handset received time (read directly from message timestamp)
- KPI pass condition: (T2 - T0) <= 60 seconds. Record seconds.

C. Dedupe key
- Define a dedupe rule for test validation: treat leads as duplicates if same phone + same source within 10 minutes OR same external lead_id. Expected: no duplicate outbound SMS; instead add CRM note “Duplicate suppressed”.

Deterministic fallback qualification (NO-LLM) — must trigger on LLM error/timeout
Trigger conditions
- LLM call fails, times out, returns empty, or confidence below threshold.
- Also acceptable to force fallback using a “test mode” flag.

Exact fallback message flow (copy/paste)
Message 1 (immediate):
“Hi {first_name}, this is {business_name}. Thanks for reaching out—quick question so we can help fast: what service do you need? Reply with 1) Repair 2) Install 3) Quote 4) Other.”

If reply is 4/Other:
“Got it—please reply with a short description of what you need.”

Message 2:
“Thanks. What’s your ZIP code?”

Message 3:
“When would you like help? Reply 1) ASAP 2) This week 3) Just gathering quotes.”

Handoff:
- If calendar booking is enabled: send booking link + confirm.
- If booking fails: send manual handoff message:
“Thanks—our scheduling link is having trouble. Please reply with two times that work today/tomorrow, or call us. Support: agent_bob_replit+lead-copilot@agentmail.to”

Compliance keywords
- STOP: immediately stop all messages; add CRM note “Opted out via STOP at {timestamp}”; send confirmation per provider policy.
- HELP: reply with:
“Help: You’re receiving messages because you requested info. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

After-hours behavior (fail-safe)
Define business hours for test: 9am–6pm local.
- If lead arrives after-hours:
  - Still send first response immediately (<60s):
“Thanks for reaching out! We’re currently closed. Reply with your service + ZIP and we’ll follow up first thing tomorrow. If urgent, reply ASAP.”
  - Tag in CRM: AfterHours=true.

Lead source test setup + execution

1) Generic Webhook JSON
Goal: verify raw webhook ingestion, phone validation, dedupe/retry behavior.
Minimum payload fields
- lead_id (string)
- first_name (string)
- last_name (string, optional)
- phone (E.164 preferred)
- email (optional)
- source (e.g., “webhook_test”)
- service (optional)
- submitted_at (ISO8601 optional)

Ready-to-send payloads (examples)
A. Valid lead
{
  "lead_id": "wh_001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15555550101",
  "email": "test.lead@example.com",
  "source": "webhook_test",
  "service": "Repair",
  "submitted_at": "2026-04-09T12:00:00Z"
}
Expected
- First SMS delivered <60s.
- CRM note created with metadata + transcript header.

B. Missing phone
{ "lead_id": "wh_002", "first_name": "NoPhone", "source": "webhook_test" }
Expected
- No SMS attempt.
- Create CRM note “Missing phone—no outreach sent.”
- (Optional) email alert to operator.

C. Invalid phone
{ "lead_id": "wh_003", "first_name": "BadPhone", "phone": "123", "source": "webhook_test" }
Expected
- No SMS attempt.
- CRM note “Invalid phone—blocked.”

D. Duplicate lead_id
Send payload A twice with same lead_id.
Expected
- First triggers SMS, second suppressed; CRM note indicates duplicate suppression.

E. Webhook retry simulation
Send same payload with a “retry_count” field or repeat within 30 seconds.
Expected
- Suppress duplicate outbound SMS; log retry.

2) Jotform
Goal: validate real form submission -> ingestion -> SMS + qualification -> CRM logging.
Form fields to create
- First name (required)
- Last name (optional)
- Mobile phone (required)
- Service needed (dropdown)
- ZIP (short text)
- Notes (paragraph)

Execution steps
- Submit 10 leads:
  - 6 normal valid leads (vary service + zip)
  - 2 invalid phone formats
  - 1 missing phone (if form allows; otherwise simulate via webhook)
  - 1 after-hours submission (or temporarily change business hours config)
- For each: record T0 at form submit, T2 when SMS arrives.
Expected
- All valid leads: T2-T0 <= 60s.
- Invalid phone: blocked safely, no SMS.
- After-hours: immediate closed-hours message.

3) HubSpot
Goal: verify CRM writebacks: contact creation/update, note formatting, dedupe.
HubSpot objects
- Contacts: create/update by phone (primary) or email.
- Notes/Engagements: append qualification transcript + metadata.

Strict CRM note formatting (copy/paste template)
Title: “Lead Copilot Transcript — {source} — {lead_id}”
Body:
- Received: {T0}
- First SMS sent: {T1}
- First SMS received (handset): {T2}
- SLA: {T2-T0}s (PASS/FAIL)
- Lead:
  - Name: {first} {last}
  - Phone: {phone}
  - Email: {email}
  - Service: {service}
  - ZIP: {zip}
  - AfterHours: {true/false}
  - OptOut: {true/false}
- Conversation:
  - System: “…”
  - Lead: “…”
  - System: “…”
  - Lead: “…”
- Outcome:
  - Qualified: {yes/no}
  - Booking: {booked/link_failed/manual_handoff/not_applicable}
  - Appointment time: {if booked}

Edge case test matrix (execute at least once each)
1) STOP keyword
- Lead replies STOP after first message.
Expected: no further messages; CRM OptOut=true; confirmation sent.

2) HELP keyword
- Lead replies HELP.
Expected: help response with support email + website URL.

3) Calendar link failure
- Disable/alter booking link temporarily.
Expected: fallback manual handoff message, CRM outcome=link_failed.

4) Multiple concurrent leads
- Submit 3 leads within 10 seconds.
Expected: all get first SMS <60s; no cross-talk in transcripts.

5) Duplicate leads
- Same phone submits twice within 5 minutes.
Expected: second suppressed or merged; CRM shows one contact with duplicate note.

6) Webhook retries
- Re-send same lead_id.
Expected: suppressed; retry logged.

7) After-hours
- Submit outside hours.
Expected: immediate closed message; follow-up scheduled/flagged.

Results capture table (fill during run)
Columns:
- Test ID | Source | Scenario | T0 Submit | T1 Sent | T2 Received | SLA seconds | PASS/FAIL | Notes/Link to CRM record

Bug log template (fill if any mismatch)
- Bug ID
- Title
- Severity (P0 reputation/legal, P1 revenue, P2 annoyance)
- Source (Webhook/Jotform/HubSpot)
- Steps to reproduce
- Expected vs Actual
- Evidence (screenshots, timestamps)
- Suggested minimal fix/workaround

Exit criteria for “pilot-ready reliability”
- 20 total timed leads across the 3 sources.
- >= 95% first responses within 60 seconds.
- 0 P0 issues: STOP compliance, messaging to missing/invalid phones, after-hours safe messaging, duplicate suppression.
- HubSpot note formatting consistently matches template for agency reporting.
