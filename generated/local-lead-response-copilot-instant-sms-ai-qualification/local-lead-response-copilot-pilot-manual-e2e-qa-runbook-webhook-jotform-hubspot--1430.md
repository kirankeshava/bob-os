# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (Webhook + Jotform + HubSpot) w/ <60s KPI Proof, Fail-safes, Results + Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:08:46.176Z

---

Business under test: Local Lead Response Copilot (Instant SMS + AI Qualification)
Legitimacy URL to share with testers/customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/ops email for test comms: agent_bob_replit+lead-copilot@agentmail.to

Purpose
Validate end-to-end reliability across 3 lead sources (Generic Webhook JSON, Jotform, HubSpot CRM) with a strict KPI: first outbound SMS sent within 60 seconds of lead receipt. Confirm safe failovers for LLM failure via deterministic question flow, and verify edge-case compliance (STOP/HELP, after-hours, duplicates, retries, calendar failures, concurrency, CRM note formatting).

Scope (3 lead sources)
A) Generic Webhook JSON: POST lead payload to our ingestion endpoint.
B) Jotform (real form tool): form submission -> integration -> ingestion.
C) HubSpot (CRM): new contact/form/lead event -> integration -> ingestion and back-write notes.

Pre-flight checklist (do before running timed tests)
1) Confirm environment: production-like SMS provider configured; a test phone number available to receive SMS.
2) Confirm after-hours schedule configured (e.g., 6pm–8am local time) and business timezone set.
3) Confirm dedupe window configured (recommend: 24h by phone OR lead_id if provided).
4) Confirm calendar/booking handoff is configured (or intentionally pointed to a dummy link to test failure handling).
5) Confirm STOP/HELP compliance path exists (automatic response + suppress future messages).
6) Confirm deterministic fallback flow is enabled on LLM timeout/error (see “Fallback Flow” section).

KPI Definition + How to Measure (<60s)
KPI: Time from lead receipt (server timestamp when payload accepted OR form webhook received) to first outbound SMS “sent/queued” timestamp must be < 60 seconds.
Record three timestamps for each test lead:
T0 = Lead received time (server/log time; if unavailable, use webhook request time captured by tool + annotate).
T1 = SMS queued/sent time (provider log time; if unavailable, use application log when send initiated).
T2 = SMS delivered time (handset screenshot time or provider delivery receipt).
Pass condition: (T1 - T0) < 60 seconds.
Notes:
- Delivery time (T2) is not the KPI but should be observed; if T2 is high, note carrier latency.
- If retries happen, KPI uses the first attempted outbound SMS (first send initiation).

Results Table (copy/paste and fill)
Columns:
Test ID | Source | Scenario | Input Phone | Expected | T0 | T1 | T2 | (T1-T0) sec | Pass/Fail | Notes/Logs Link

Test Matrix (must cover)
You will run at least 20 leads total. Suggested distribution:
- 8 leads via Webhook JSON
- 6 leads via Jotform
- 6 leads via HubSpot
Include all edge cases below at least once; duplicates/retries should be run multiple times.

1) Happy path (baseline)
Expected: SMS sent <60s; qualification questions begin; booking offered when qualified; CRM note/transcript written.

2) Missing phone
Input: no phone field OR empty.
Expected: Do NOT send SMS. Create CRM note/event: “Missing phone; cannot contact.” If email exists, optionally send email (only if configured). Mark lead as “Needs phone” and stop.

3) Invalid phone format
Input: phone like “1234”, “abcd”, or missing country code when required.
Expected: Do NOT send SMS. Log validation error. Create CRM note: “Invalid phone; requires correction.” No further automation.

4) STOP keyword (compliance)
Action: Reply “STOP” from handset after first message.
Expected: Immediate confirmation message per provider policy (e.g., “You have been opted out…”). Suppress all future messages to that number. CRM note: “Opted out (STOP) at <timestamp>.”

5) HELP keyword (compliance)
Action: Reply “HELP”.
Expected: Provide support info including business identity and contact: “For help, reply to this message or email agent_bob_replit+lead-copilot@agentmail.to. Info: <business>”. CRM note logged.

6) After-hours behavior
Condition: Submit lead during after-hours window.
Expected: Either (A) send after-hours acknowledgement + promise follow-up at opening, or (B) queue first contact until opening—choose one and be consistent. Must not spam. CRM note should mention after-hours routing and scheduled follow-up time.

7) Multiple concurrent leads
Action: Submit 5 leads within 30 seconds from mixed sources.
Expected: All first SMS attempts (T1-T0) <60s (or a documented throttling policy). No cross-talk between conversations. CRM notes mapped correctly to each lead.

8) Calendar link failure
Condition: Booking link returns 404 or integration is down.
Expected: SMS flow gracefully offers alternative: “Reply with 2 times that work” and flags ops. CRM note: “Calendar failure; manual scheduling required.” No infinite retry loop.

9) Webhook retries (idempotency)
Action: Send the same webhook payload 3 times (same lead_id) within 2 minutes.
Expected: Only one SMS conversation starts. Subsequent retries are acknowledged/ignored; CRM note indicates dedupe: “Duplicate webhook ignored.”

10) Duplicate leads (same phone, different lead_id)
Action: Submit two leads with same phone within dedupe window.
Expected: Second lead should not start a new SMS thread; instead append CRM note: “Duplicate lead; existing conversation active.” Optionally notify internal channel.

11) CRM note formatting (HubSpot)
Expected notes must be standardized and agency-readable. Use this template:
---
Lead Response Copilot Log
Source: <Webhook|Jotform|HubSpot>
Lead ID: <id if available>
Received At (T0): <timestamp>
First SMS Sent At (T1): <timestamp>
First-Response Latency: <seconds>
Status: <Qualified|Not Qualified|Opted Out|Needs Phone|After Hours Queued|Booking Link Failed>
Conversation Transcript:
- System: <message>
- Lead: <message>
- System: <message>
Qualification Summary:
- Service: <answer>
- Location/Zip: <answer>
- Urgency: <answer>
- Budget/Range (optional): <answer>
Booking Outcome:
- <Booked link/time OR requested callback OR manual scheduling required>
Compliance:
- STOP/HELP: <none|STOP at time|HELP at time>
---
Pass condition: Notes render cleanly (no broken JSON), include timestamps + latency, and are attached to the correct contact/deal.

Deterministic No‑LLM Fallback Qualification Flow (must trigger on LLM error/timeout)
Trigger conditions:
- LLM returns error
- LLM exceeds timeout threshold (recommend: 5–8 seconds)
- LLM returns empty/unsafe output
Behavior: Immediately switch to deterministic script below; do not attempt repeated LLM calls in a tight loop.

Fallback Script (exact SMS copy)
Message 1 (immediate):
“Hi—thanks for reaching out. Quick questions so we can help fast. What service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other”
If reply 1/2/3/4 captured ->
Message 2:
“Got it. What’s your ZIP code?”
If ZIP captured ->
Message 3:
“When would you like us to come out? Reply 1) ASAP 2) Next 1–2 days 3) This week 4) Not sure”
If after-hours -> prepend:
“We’re currently closed, but we’ll follow up first thing at <opening time>. Meanwhile—” then Message 1.
If qualified (service + zip + urgency answered) ->
Message 4 (booking):
“Perfect. Book a time here: <calendar link>. If that link doesn’t work, reply with 2 times that work for you.”
If calendar fails (detected or reported) ->
“Sorry—our booking link is having trouble. Reply with 2 times that work and a good callback number.”
STOP/HELP handling (always-on):
- If inbound contains “STOP”: mark opted-out; send confirmation; end flow.
- If inbound contains “HELP”: send help text including agent_bob_replit+lead-copilot@agentmail.to and business identity.

Test Payloads (Webhook JSON) — ready to paste
1) Valid lead
{
  "lead_id": "qa-001",
  "source": "webhook",
  "name": "Test Lead",
  "phone": "+15555550101",
  "email": "testlead@example.com",
  "service": "HVAC repair",
  "created_at": "<now>"
}
2) Missing phone
{
  "lead_id": "qa-002",
  "source": "webhook",
  "name": "No Phone",
  "email": "nophone@example.com"
}
3) Invalid phone
{
  "lead_id": "qa-003",
  "source": "webhook",
  "name": "Bad Phone",
  "phone": "1234"
}
4) Duplicate lead_id retry (send 3x)
{
  "lead_id": "qa-004",
  "source": "webhook",
  "name": "Retry Lead",
  "phone": "+15555550102"
}
5) Same phone duplicate different lead_id
{
  "lead_id": "qa-005a",
  "source": "webhook",
  "name": "Dup Phone A",
  "phone": "+15555550103"
}
{
  "lead_id": "qa-005b",
  "source": "webhook",
  "name": "Dup Phone B",
  "phone": "+15555550103"
}

Bug Log Template (fill during run)
Bug ID | Date | Severity (P0/P1/P2) | Source | Scenario | Steps to Reproduce | Actual | Expected | Suspected Cause | Proposed Fix | Owner | Status
Severity guide:
P0: Compliance breach (STOP ignored), sends to invalid/missing phone, wrong contact messaged, or KPI consistently >60s.
P1: Booking handoff breaks, retries cause multiple threads, CRM notes unreadable.
P2: Minor formatting, copy tweaks, non-blocking delays.

Execution Steps (operator script)
1) Prepare a stopwatch or use a timestamp tool. Open:
- SMS provider logs (for T1)
- App/server logs (for T0 if available)
- HubSpot contact record (for note verification)
- Your handset to receive/respond
2) Run baseline happy path on each source (Webhook, Jotform, HubSpot). Record T0/T1/T2.
3) Run edge cases in this order (to avoid opt-out interfering with later tests): missing phone, invalid phone, retries/dedupe, calendar failure, after-hours, concurrency, HELP, STOP (STOP should be last for each test number).
4) After each test, verify HubSpot note formatting and correct association.
5) Summarize KPI: count passes/fails, average (T1-T0), max latency, and any carrier-delivery anomalies.

Acceptance Criteria (what “done” means for pilots)
- Proven via Results Table: 20/20 leads have (T1-T0) < 60s OR documented and explained exceptions with an operational workaround.
- STOP and HELP behave correctly every time.
- No duplicate conversations on webhook retries or duplicate leads in dedupe window.
- After-hours behavior is consistent and non-spammy.
- Calendar failures degrade gracefully to manual scheduling.
- HubSpot notes are readable, standardized, and correctly attached.

Customer/agency communication note (if asked for legitimacy)
Share the website URL above, and for support/escalations use agent_bob_replit+lead-copilot@agentmail.to.
