# Local Lead Response Copilot — Pilot E2E QA Packet v1 (3 Lead Sources) — Payloads, KPI Evidence, Fail-safe Script, Bug/Fix List

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:00:11.433Z

---

Purpose
Validate end-to-end lead intake and first-response speed (<60 seconds) across 3 lead sources, while proving safe failover when the LLM or downstream services fail. This is a manual pilot packet (no automation) meant to be executed during early agency/customer onboarding.

Product/Legitimacy references (use in any customer comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

Lead sources under test (minimum)
1) Generic Webhook JSON (any ads/form tool -> webhook)
2) Jotform submission (real form tool)
3) HubSpot CRM (form/lead creation -> workflow/webhook out to copilot)

A) KPI: <60s First SMS — Evidence Procedure (required)
Goal: Prove “lead created/submitted” -> “first outbound SMS sent” <= 60 seconds.

Record these timestamps for every trial:
T0: Lead submit/create time at source
- Generic webhook: client-side time when POST is sent (curl timestamp) OR server access log timestamp.
- Jotform: submission timestamp shown in Jotform “Submissions”.
- HubSpot: contact create time or form submission time shown in HubSpot record timeline.
T1: Copilot receipt time
- Webhook endpoint request log timestamp (server log).
T2: First SMS queued/sent
- Messaging provider log timestamp (or app “message sent” event).

Pass/Fail:
- PASS if (T2 - T0) <= 60s for 95%+ of trials (during pilot, minimum 20 trials; allowed 1 exception if clearly attributable to carrier delay and recorded).
- FAIL if any systematic delay >60s OR if >1/20 exceed 60s without a clear external reason.

Evidence storage (lightweight):
- Create a single table (Google Sheet or CSV) with columns: Trial#, Source, Scenario, T0, T1, T2, Delta(T2-T0), Outcome, Link to screenshot/log.
- Capture screenshots for at least 3 representative passes per source + every failure.

B) Deterministic Fail-safe Qualification Script (LLM down/timeout)
Trigger conditions (any):
- LLM call errors, times out > 8 seconds, returns empty/garbled output
- Safety filter blocks output
- System in “safe mode” toggle

Global rules:
- Always identify business purpose: “Thanks for reaching out—this is an automated text to help schedule you quickly.”
- STOP: immediately cease non-essential messages, set contact “Do Not Text”, confirm.
- HELP: provide brief help and contact email.
- If user responds with urgent/emergency language: escalate immediately (handoff) and stop automation.
- If after-hours (business-configured): acknowledge + collect minimal info + promise next-business-day callback; optionally offer a calendar link if available.

Message 0 (sent immediately upon lead receipt; do not wait for LLM)
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—quick question so we can help fast: what service do you need? Reply 1) Repair 2) Install 3) Quote/Estimate 4) Other.”

Branching
If reply = 1/2/3/4 or free text:
Q1 (Service detail)
“Got it. What’s the address or ZIP code for the job?”

Q2 (Timeline)
“When do you need this done? Reply 1) ASAP 2) This week 3) Next 2–4 weeks 4) Just researching.”

Q3 (Permission to call)
“Best time for a quick call? Reply 1) Now 2) Later today 3) Tomorrow 4) Text only.”

Booking step
If calendar link is configured and healthy:
“Perfect—here’s the fastest way to lock a time: {{calendar_link}}. If you prefer, tell me a 2-hour window and we’ll confirm.”

If calendar link fails (HTTP error, timeout, or known outage flag):
“Scheduling link is temporarily down—no problem. Reply with a 2-hour window that works and we’ll confirm by text (e.g., ‘Tue 1–3pm’).”

After-hours variant (replace Message 0 + booking copy)
Message 0 (after-hours)
“Hi {{first_name}}, it’s {{business_name}}. We’re currently closed, but I can queue this for first thing next business day. What service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other.”
After collecting Q1–Q2:
“Thanks—what’s the best number/time for us to call when we open? If you want, you can also grab the next available slot here: {{calendar_link_if_healthy}}.”

STOP/HELP compliance (exact)
If inbound contains STOP/UNSUBSCRIBE/CANCEL/END/QUIT:
Reply once: “You’re opted out and will no longer receive texts from {{business_name}}. Reply HELP for help.” Then halt.
If inbound contains HELP:
Reply: “Help: This is an automated message from {{business_name}} about your recent inquiry. Reply STOP to opt out. Or email agent_bob_replit+lead-copilot@agentmail.to.”

Concurrency rule (multiple leads)
- Each lead must have an immutable lead_id. Thread messages by lead_id + phone.
- If 2 leads with same phone arrive within 10 minutes, dedupe (see below) and do not start two parallel scripts.

C) Ready-to-Send Test Payloads (copy/paste)
C1) Generic Webhook JSON — baseline
POST to /webhook/lead (or configured endpoint)
{
  "lead_id": "gw-001",
  "source": "generic_webhook",
  "created_at": "2026-04-09T12:00:00Z",
  "first_name": "Alex",
  "last_name": "Taylor",
  "phone": "+14155550123",
  "email": "alex.taylor@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "notes": "Leaking tank, need ASAP"
}

C2) Missing phone (should not attempt SMS)
{
  "lead_id": "gw-002",
  "source": "generic_webhook",
  "created_at": "2026-04-09T12:01:00Z",
  "first_name": "Jamie",
  "last_name": "Lee",
  "phone": "",
  "email": "jamie.lee@example.com",
  "service": "Roof inspection"
}
Expected: mark lead “needs phone”, no outbound SMS, create CRM note/task “Missing phone; request via email or form validation.”

C3) Invalid phone (should fail validation)
{
  "lead_id": "gw-003",
  "source": "generic_webhook",
  "created_at": "2026-04-09T12:02:00Z",
  "first_name": "Sam",
  "phone": "12345",
  "service": "HVAC install"
}
Expected: do not send SMS; log validation error; optionally trigger email to ops.

C4) Duplicate lead (same lead_id)
Send C1 twice.
Expected: second request returns 200/202 “duplicate ignored”; no second SMS.

C5) Webhook retry simulation (same payload, different delivery id)
Add header X-Request-ID changes, same lead_id.
Expected: idempotent by lead_id; no duplicate messaging.

C6) Concurrency (two different lead_ids same phone within 60s)
Send:
{"lead_id":"gw-004","phone":"+14155550123","first_name":"Alex","service":"Drain cleaning"}
then 10s later
{"lead_id":"gw-005","phone":"+14155550123","first_name":"Alex","service":"Sewer line camera"}
Expected: dedupe policy chooses newest OR appends context to existing thread; must not start parallel scripts.

C7) After-hours
Use a lead created outside configured business hours.
Expected: after-hours message variant; no promise of immediate call.

D) Jotform Test Setup (free)
1) Create a Jotform with required fields: First name, Phone, Service needed, ZIP, Preferred time.
2) Configure Jotform webhook/integration to send submission JSON to the copilot webhook endpoint.
3) Run 5 submissions:
- normal
- missing phone (if Jotform allows; otherwise simulate via generic webhook)
- invalid phone (letters)
- duplicate submission (submit same data twice)
- after-hours (submit outside business hours)
Expected: same behavior as generic webhook; verify T0 from Jotform submission time.

E) HubSpot Test Setup (free)
1) Create a free HubSpot account and a simple form OR manually create contacts.
2) Configure a workflow/webhook (if available) or middleware that posts contact create events to copilot.
3) Validate CRM note formatting (see below) and dedupe behavior.

CRM note formatting (must be consistent)
Create/append a note titled: “Lead Copilot — Qualification Transcript” containing:
- Lead ID, Source, Created time
- First response time delta
- Transcript with timestamps (inbound/outbound)
- Outcome: booked / needs follow-up / opted out
Example note body:
Lead ID: gw-001 | Source: Jotform
First SMS: 34s after submit
Transcript:
12:00:00 Lead submitted
12:00:34 Outbound: Hi Alex…what service…
12:01:10 Inbound: Repair
Outcome: Booking link sent | Next step: awaiting time selection

F) Required Scenario Checklist (execute & record)
1) Missing phone (no SMS, create follow-up)
2) Invalid phone (no SMS, validation error logged)
3) STOP (one confirmation then halt)
4) HELP (help response)
5) After-hours routing
6) Multiple concurrent leads (no cross-talk)
7) Calendar link failure (graceful alternate scheduling)
8) Webhook retries (idempotent)
9) Duplicate leads (dedupe)
10) CRM note formatting (readable, consistent)

G) Bug/Fix List (prioritized for churn prevention)
P0 (must-fix before pilots scale)
- Any case where STOP does not halt messaging within 1 message.
Fix: central opt-out registry keyed by phone; check before every send.
- Any systemic delay >60s from T0->T2.
Fix: send Message 0 immediately on webhook receipt; make LLM async.
- Duplicate messages on retries/duplicates.
Fix: idempotency key = lead_id; store send status; reject repeats.

P1
- After-hours promises immediate call/booking.
Fix: enforce after-hours template + queue logic.
- Calendar link outage causes conversation to stall.
Fix: detect link health; provide manual time-window fallback.

P2
- CRM note formatting inconsistent or missing timestamps.
Fix: standard note template with transcript blocks.

Execution result section (to be filled during pilots)
- Total trials:
- Pass rate under 60s:
- Worst-case delta:
- Failures + root causes:
- Fixes applied:

Owner/operator note
This packet is intentionally manual to protect Week-1 speed-to-revenue. Run it during the first 1–2 pilots, record evidence, fix only P0/P1 items, and defer automation until retention/revenue proves the channel.