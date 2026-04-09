# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode) — Test Plan + Results + Bug/Fix Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:54:47.979Z

---

Business context
Local Lead Response Copilot instantly responds to inbound leads (forms/FB ads/CRM) via SMS, qualifies with short questions, and books calls/appointments. The single biggest churn/reputation risk in month 1 is missed/late first response, broken compliance (STOP/HELP), and “AI weirdness” when the LLM fails. This packet is a manual E2E validation suite designed for early pilots (no automation) to prove <60s first response and safe fallback behavior.

Proof/legitimacy links for pilot comms
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Contact email: agent_bob_replit+lead-copilot@agentmail.to

Scope: 3 lead sources to validate end-to-end
1) Generic Webhook JSON (any form/ad platform posting JSON)
2) Jotform (real form tool)
3) HubSpot (CRM)

Primary KPI + acceptance criteria
KPI-1: First outbound SMS sent within 60 seconds of lead creation.
- PASS: P95 of trials <= 60s; absolute max <= 90s during pilot.
- Evidence required: timestamps for (a) lead submit time, (b) webhook received time (server log), (c) SMS queued time, (d) SMS delivered time (carrier/Twilio log).

Reliability/brand safety gates (must pass for pilot)
GATE-A Missing phone: system must not attempt SMS; must create CRM note/task “Missing phone—manual follow-up” and/or email alert.
GATE-B Invalid phone: system must not spam; should normalize/validate; if invalid, same as missing.
GATE-C STOP/HELP: STOP immediately suppresses future messages; HELP responds with compliant help text and contact email.
GATE-D After-hours: must respect business hours; either (1) send a single acknowledgment + next-step promise, or (2) defer sending until open. Must not start qualification at 2am.
GATE-E Concurrency: multiple leads in same minute must not cross-wire conversations.
GATE-F Calendar link failure: if booking link/slot API fails, pivot to “collect preferred times” and escalate.
GATE-G Webhook retries: idempotent handling; same lead should not receive duplicate first SMS.
GATE-H Duplicate leads: same phone + same day (or configurable window) should not restart flow; should continue existing thread or create “duplicate” note.
GATE-I HubSpot note formatting: timeline note must be readable, with Q/A pairs and booking outcome.

Test environment prerequisites (free-tier friendly)
- One test phone you control capable of SMS.
- A second test phone (or Google Voice) to simulate concurrent lead threads.
- Access to product logs showing webhook receipt timestamps and outbound SMS queue timestamps.
- If using Twilio: access to message logs for delivered timestamps (no purchase done by this agent).
- Jotform: free form with fields: First Name, Last Name, Phone, Service Needed, Zip, Preferred Time.
- HubSpot: free developer account (or free CRM) with contacts + notes enabled.

How to capture timing evidence (<60s)
For every trial, record:
T0 = Lead submit timestamp (Jotform submission time, webhook sender time, or HubSpot create time)
T1 = Webhook received timestamp (server log line)
T2 = SMS queued timestamp (app log or provider API request timestamp)
T3 = SMS delivered timestamp (provider delivery log; if unavailable, use phone receipt time as proxy and flag)
Compute:
- Ingest latency = T1 - T0
- Queue latency = T2 - T1
- Delivery latency = T3 - T2
- End-to-end = T3 - T0 (primary)
Sample size requirement for pilot proof:
- Minimum 20 trials total: at least 6 per source + 2 additional for concurrency.

Deterministic fallback mode (LLM failure safe behavior)
Trigger conditions (any):
- LLM API error/timeout > 8 seconds
- LLM returns empty/garbled output
- LLM confidence below threshold (if available)
- More than 1 consecutive misunderstanding (“I didn’t get that”) in the same thread
Fallback principle: short, fixed questions; no open-ended interpretation required.

Fallback message set (copy-ready)
Message 0 (first response, always within 60s):
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—quick 3 questions so we can get you a fast quote. Reply 1 to start.”
If no first name:
“Hi! It’s {{business_name}}. Thanks for reaching out—quick 3 questions so we can get you a fast quote. Reply 1 to start.”

If user replies START/1:
Q1: “What do you need help with? Reply: 1) Repair 2) Install 3) Quote/Estimate 4) Other”
Q2: “What’s your ZIP code?” (validate 5 digits; if invalid, ask once more then escalate)
Q3: “When do you want service? Reply: 1) ASAP 2) This week 3) Next week”

Booking step:
If calendar link works: “Great—grab a time here: {{calendar_link}}. If you’d rather, reply with two times that work for you.”
If calendar link fails (detected) OR user can’t book:
“No problem—reply with 2 times that work for a quick call (e.g., ‘Today 4pm’ and ‘Tomorrow 10am’).”
Then: create internal task/CRM note and stop automation.

After-hours behavior (configurable)
Definition: outside {{business_hours}}.
Option A (recommended): send one acknowledgment only, defer qualification.
After-hours auto-reply:
“Thanks for reaching out—our office opens at {{next_open_time}}. We’ll text you then to grab a couple details. If urgent, reply URGENT.”
If URGENT: notify human immediately; otherwise resume at open with Message 0.

Compliance: STOP/HELP
On STOP/UNSUBSCRIBE/CANCEL:
- Immediately set contact status = opted_out
- Respond once: “You’re opted out and will no longer receive texts. Reply START to opt back in.” (Only if compliant for region/provider)
On HELP:
“Help: This number is used to follow up on your request with {{business_name}}. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

Test cases (manual execution)
Each test includes: setup, steps, expected result, evidence to capture.

TC-01 Generic Webhook JSON happy path
Steps:
1) POST a valid JSON payload with phone, name, service.
2) Confirm first SMS arrives.
Expected:
- First SMS <=60s.
- Qualification proceeds (LLM or fallback).
Evidence:
- Payload, logs (T0/T1/T2), SMS delivery (T3).

TC-02 Webhook missing phone
Payload omits phone.
Expected:
- No SMS attempt.
- CRM note/task created: “Missing phone—manual follow-up.”
Evidence:
- App log “validation_failed_missing_phone”; CRM note screenshot.

TC-03 Webhook invalid phone
Payload phone=“12345” or “+1 (000) 000-0000”.
Expected:
- No SMS.
- Same handling as missing phone.

TC-04 Jotform happy path
Steps:
1) Submit Jotform with valid phone.
2) Confirm SMS <=60s.
Expected:
- Correct merge fields (first name).
- Dedup key stored.
Evidence:
- Jotform submission record + SMS timestamps.

TC-05 Jotform duplicate lead
Steps:
1) Submit same phone twice within 5 minutes.
Expected:
- Second submission does NOT send a second “Message 0” (or sends a different “we already texted you” message).
- CRM note marks duplicate.

TC-06 HubSpot create contact (CRM-origin lead)
Steps:
1) Create new contact with phone + lifecycle stage = lead.
Expected:
- SMS <=60s.
- HubSpot note created with transcript.
Evidence:
- HubSpot timeline entry.

TC-07 HubSpot note formatting verification
Expected note format (must be readable):
Title: “Lead Copilot Qualification — {{date}}”
Body example:
“Source: HubSpot
First response: 2026-04-09T14:03:12Z
Q1 Service: Install
Q2 ZIP: 94110
Q3 Timing: ASAP
Outcome: Sent booking link
Conversation:
- Bot: …
- Lead: …”

TC-08 STOP compliance
Steps:
1) From test phone, reply STOP.
2) Trigger a new message attempt (new lead or follow-up).
Expected:
- No further messages.
- Opt-out flag stored.
Evidence:
- Opt-out record + absence of outbound messages.

TC-09 HELP compliance
Steps:
1) Reply HELP.
Expected:
- Help text returned with contact email.

TC-10 After-hours routing
Steps:
1) Submit lead outside configured hours.
Expected:
- Single after-hours ack (or deferred send).
- No multi-question flow until open.

TC-11 Multiple concurrent leads
Steps:
1) Submit two leads within 10 seconds for two different phones.
2) Respond to each with different answers.
Expected:
- No cross-talk; each thread retains its own state.
Evidence:
- Transcript snippets.

TC-12 Calendar link failure
Steps:
1) Simulate calendar endpoint down or use invalid link config.
Expected:
- Bot asks for two preferred times and creates escalation task.

TC-13 Webhook retry/idempotency
Steps:
1) Re-send identical webhook with same event_id/idempotency_key.
Expected:
- No duplicate first SMS.
- Log indicates “duplicate_event_ignored”.

Results table (paste into sheet/doc)
Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario
- T0 lead created
- T1 webhook received
- T2 SMS queued
- T3 SMS delivered
- End-to-end seconds
- Pass/Fail
- Notes / link to evidence

Bug / fix log template (prioritized)
Fields:
- Bug ID
- Severity (S0 compliance, S1 revenue-loss, S2 annoyance)
- Scenario/test case
- Steps to reproduce
- Expected
- Actual
- Evidence link
- Suggested fix
- Owner
- Status

Known high-risk bug patterns to watch (with suggested fixes)
1) Duplicate SMS on retries → implement idempotency key per lead event; dedupe window by (source_id + phone + created_at bucket).
2) STOP not respected across channels → central opt-out list keyed by E.164 phone; check before every send.
3) After-hours spamming → single-message throttle + scheduled resume at open.
4) LLM timeout stalls flow → hard 8s timeout then deterministic mode.
5) CRM note unreadable → enforce structured Q/A format and include timestamps.

Definition of “Verified <60s first response” (what to store)
- A results table with >=20 trials, with computed end-to-end seconds.
- For each source, provide P50/P95 and max.
- Provide at least 3 screenshots/log snippets showing T0/T1/T2/T3 alignment.

Next execution step
Run TC-01 through TC-13 in the order above during the first pilot onboarding, fill the results table live, and open bugs immediately for any GATE failure (A–I).