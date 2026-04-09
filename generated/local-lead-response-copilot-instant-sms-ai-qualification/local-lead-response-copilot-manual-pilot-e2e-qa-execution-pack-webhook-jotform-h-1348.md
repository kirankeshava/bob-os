# Local Lead Response Copilot — Manual Pilot E2E QA Execution Pack (Webhook + Jotform + HubSpot) with <60s KPI Proof + Fail-safe Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:15:24.794Z

---

Purpose
This manual E2E QA execution pack is designed for the first 1–3 paid pilots to protect reputation (agencies/local operators) while we prioritize distribution and revenue. It verifies that new leads receive the first SMS in <60 seconds, qualification behaves safely (even if the LLM fails), opt-out compliance is correct, and CRM logging is clean.

Reference assets for pilots (use in customer comms)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support/contact email: agent_bob_replit+lead-copilot@agentmail.to

Scope: 3 lead sources (minimum viable coverage)
1) Generic Webhook JSON (baseline + easiest to replay)
2) Jotform (real form tool)
3) HubSpot (CRM lead creation / note formatting)

North-star KPI
- First response (initial SMS) sent within 60 seconds of lead submission/receipt.

Pre-Flight Setup Checklist (do this once per environment)
A) SMS/Compliance
- Confirm brand name and business name used in the initial SMS are correct.
- Confirm STOP/HELP keywords are supported by the SMS provider (or middleware) and are not intercepted incorrectly.
- Confirm messages include compliant opt-out language at least once early in the conversation (recommended in message 1 or 2): “Reply STOP to opt out. Reply HELP for help.”

B) After-hours definition
- Define business hours and timezone (example): Mon–Fri 8am–6pm local time.
- Define after-hours behavior: immediate acknowledgement + next-step promise + optional scheduling link.

C) Dedupe key
- Define what constitutes a duplicate lead:
  - Same source + same lead_id, OR
  - Same phone normalized (E.164) within a short window (e.g., 24h), OR
  - Same email + last name (fallback).

D) Calendar/booking
- Define booking method: calendar link OR internal booking API.
- Define failure behavior when booking fails: apologize, collect preferred time window, notify operator.

Instrumentation required (manual acceptable)
To prove <60s first response without automation:
- T0 = lead submitted timestamp (from Jotform submission time / webhook request time / HubSpot create time)
- T1 = system received timestamp (server logs or integration log)
- T2 = SMS queued/sent timestamp (provider log)
- T3 = handset received timestamp (record from test phone lockscreen time)
Compute:
- Receive latency = T1 – T0
- Send latency = T2 – T1
- Delivery latency = T3 – T2
- Total first response time = T3 – T0 (must be < 60s target; note carrier variance)

Results Table (copy/paste and fill during run)
Columns:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario
- T0 submitted
- T1 received
- T2 SMS sent
- T3 handset received
- Total (T3–T0)
- Expected behavior met? (Y/N)
- Notes/bug link

Deterministic fallback qualification flow (no-LLM)
Trigger conditions (any): LLM timeout > 8s, LLM error, empty response, policy refusal, confidence below threshold.
Goal: keep conversation short, structured, and safe.

Message templates (exact text)
1) Initial SMS (within 60s)
“Hi {first_name}, this is {business_name}. Thanks for reaching out about {service}. A couple quick questions so we can help fast. Reply STOP to opt out, HELP for help.”

2) Q1: Service confirmation
“What service do you need? Reply with 1) Repair 2) Install 3) Quote 4) Other”
- If reply = 4/Other: “Please type a few words about what you need.”

3) Q2: Timing/urgency
“When do you want this done? Reply 1) ASAP 2) This week 3) Next 2–4 weeks 4) Just researching”

4) Q3: Location (zip)
“What’s the job ZIP code?”
- If non-5-digit: “Please reply with a 5-digit ZIP code.” (retry 1x; then route to human)

5) Handoff / booking
If calendar available: “Got it — best next step is to grab a time here: {calendar_link}. If you’d rather, reply with two times that work today/tomorrow.”
If after-hours: “Thanks — we’re currently closed, but we’ll follow up first thing when we open. If you want, share a good time window for a call tomorrow.”
If calendar fails: “Sorry — our scheduling link is having issues. Reply with a good time window (e.g., ‘tomorrow 9–11am’) and we’ll confirm.”

STOP/HELP compliance (must override all flows)
- If inbound = “STOP” (case-insensitive, trimmed): immediately mark opted-out and send confirmation: “You’re opted out and will no longer receive texts.” Do not send further marketing/qualification.
- If inbound = “HELP”: “Help: You’re receiving this because you requested info from {business_name}. Reply STOP to opt out. For support email {support_email}.” Use: agent_bob_replit+lead-copilot@agentmail.to

Fail-safe behavior matrix (expected outcomes)
1) Missing phone (lead source omits phone)
- Expected: no SMS attempt; create CRM note “Missing phone”; send internal alert (email/Slack) to operator; optionally email lead if email exists.

2) Invalid phone (too short, letters, not E.164 convertible)
- Expected: no SMS attempt; CRM note includes raw input; internal alert; optionally request corrected number if email exists.

3) After-hours
- Expected: still send acknowledgement SMS within 60s; do not promise immediate call; offer time window; queue follow-up task for open hours.

4) Multiple concurrent leads (10 leads within 60s)
- Expected: no dropped webhooks; each lead receives first SMS; dedupe prevents double texting the same lead; queue handles bursts.

5) Calendar link failures
- Expected: detect 4xx/5xx or timeout; switch to collect time window; create CRM task “Manual booking needed.”

6) Webhook retries
- Expected: idempotent handling (same lead_id) results in single SMS thread; log “retry ignored”; CRM note updates should be additive not duplicated.

7) Duplicate leads (same phone)
- Expected: if within dedupe window, do not resend initial SMS; instead append CRM note “Duplicate lead suppressed” and optionally send a single gentle continuation: “Still interested in help with {service}? Reply YES and we’ll continue.” (only if compliant and desired).

8) CRM note formatting (HubSpot)
- Expected: a single, clean note per conversation stage; consistent template; no markdown rendering issues; timestamps in ISO or local format.

HubSpot CRM note template (strict)
Subject: Lead Response Copilot — Conversation Log
Body:
- Lead Source: {Webhook|Jotform|HubSpot}
- Lead ID: {lead_id}
- Name: {full_name}
- Phone (E.164): {+1XXXXXXXXXX} (raw: {raw_phone})
- Email: {email}
- Service: {service}
- Created At (T0): {timestamp}
- First SMS Sent (T2): {timestamp}
- First SMS Delivered (T3): {timestamp or ‘unknown’}
- Status: {Qualified|Unqualified|Opted-out|Needs-human|Booked}
- Opt-out: {Yes/No} (keyword: {STOP if any})
- Transcript:
  1) OUT {time}: {message}
  2) IN  {time}: {message}
  3) OUT {time}: {message}
- Booking:
  - Calendar link: {url}
  - Outcome: {Booked / Link failed / Awaiting times}
- Next Action:
  - {Call within business hours / Send quote / Manual schedule}

Test execution: 3 sources x scenarios
A) Generic Webhook JSON (replayable)
Run at least these payloads and validate expected behavior.
1) Valid lead
{
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15555550101",
  "email": "testlead@example.com",
  "service": "Water heater install",
  "source": "webhook",
  "submitted_at": "{ISO timestamp}"
}
Expected: SMS within <60s; qualification starts; HubSpot note created/updated.

2) Missing phone
{
  "lead_id": "qa-webhook-002",
  "first_name": "NoPhone",
  "last_name": "Lead",
  "email": "nophone@example.com",
  "service": "Roof repair",
  "source": "webhook"
}
Expected: no SMS; CRM note “Missing phone”; operator alert.

3) Invalid phone
{"lead_id":"qa-webhook-003","first_name":"Bad","last_name":"Phone","phone":"123-ABC","service":"HVAC repair","source":"webhook"}
Expected: no SMS; CRM note includes raw phone; operator alert.

4) Duplicate lead_id (retry/idempotency)
Send payload from (1) again.
Expected: no second initial SMS; log “duplicate lead_id suppressed”; CRM note updated without duplication.

5) Concurrency burst
Send 10 unique valid payloads in <60 seconds.
Expected: all receive first SMS; no queue collapse; KPI captured.

B) Jotform (real form tool)
- Create a “Request a Quote” form with fields: First name, Last name, Phone, Email, Service Needed (dropdown), Zip.
- Submit:
  1) Normal submission
  2) Missing phone (leave blank if allowed)
  3) Invalid phone (e.g., 111)
  4) Duplicate (submit twice with same phone)
  5) After-hours (submit outside business hours)
Expected: identical to matrix above; confirm that Jotform field mapping matches (no swapped fields).

C) HubSpot (CRM)
Two variants depending on integration method:
- If HubSpot is a source (new contact triggers): create a new Contact with phone/email and verify SMS fires.
- If HubSpot is a sink (logging only): ensure every lead produces a correctly formatted note.
Test:
1) New contact valid phone triggers SMS
2) Update existing contact with same phone should not re-trigger initial SMS (dedupe)
3) Note formatting: verify transcript and timestamps render correctly

Bug log template (fill during pilots)
- Bug ID:
- Severity (Blocker/High/Med/Low):
- Source (Webhook/Jotform/HubSpot):
- Scenario:
- Steps to reproduce:
- Expected:
- Actual:
- Evidence (screenshots/log IDs):
- Suspected cause:
- Proposed fix (smallest first):
- Retest result:

“Verified <60s first response” criteria
We can claim KPI met for a pilot when:
- At least 20 total lead submissions across the 3 sources
- At least 90% have T3–T0 < 60s (note carrier variability; if T2–T0 < 60s but T3 delayed, document carrier delay)
- 100% of STOP requests are honored immediately (no further sends)
- 0 duplicate double-texts for the same lead_id or same phone within dedupe window

Operator notes
- Use a dedicated test phone number for inbound/outbound and record handset receipt times.
- If any scenario risks texting a real person, stop and use a controlled number only.
- For agencies, share the legitimacy link (website) and support email above if they ask for proof or help.
