# Local Lead Response Copilot — Manual E2E QA Runbook (3 Lead Sources) + Evidence Kit + Deterministic Fallback (Pilot-Ready)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T23:02:39.482Z

---

Overview
This runbook validates end-to-end lead intake, first SMS response speed, qualification, booking handoff, and safe failovers for Local Lead Response Copilot during early pilots (manual checks only; no automation). It covers 3 lead sources: (1) Generic Webhook JSON, (2) Jotform (real form tool), (3) HubSpot (CRM). Use this to protect agency reputation, reduce churn, and prove <60s speed-to-lead.

Business legitimacy reference (include in any outbound or footer text if needed)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support email: agent_bob_replit+lead-copilot@agentmail.to

Success criteria (global pass/fail)
1) Speed KPI: First outbound SMS is sent within 60 seconds of lead submission time for >= 95% of trials (target: 20 trials). Record evidence.
2) Safety: If LLM fails/timeouts, system switches to deterministic question flow without exposing errors, without hallucinations, and without losing lead context.
3) Compliance: STOP immediately suppresses further messages; HELP returns help/support message; both are logged.
4) Dedupe/retry: Duplicate events do not spam; retries are idempotent.
5) After-hours: Messaging follows configured rules and does not promise immediate human response.

Environment prerequisites (manual)
- A test sending number is configured in the product (or staging). You need access to SMS logs/transcripts.
- A known test calendar/booking link exists (or a placeholder) to simulate success/failure.
- A place to store evidence: shared folder (screenshots) or ticket system.

Evidence kit: how to prove <60s
For each trial, capture these timestamps:
T0: Lead submitted (source timestamp: webhook received time OR form submission time OR CRM record create time)
T1: First SMS sent (provider log timestamp or app log)
Delta = T1 - T0 (seconds)
Evidence to store:
- Screenshot or export showing T0
- Screenshot or export showing T1 (SMS log)
- If available: app log line with lead_id and first_message_sent_at
Minimum sample size: 20 total trials (recommended distribution: 8 webhook JSON, 6 Jotform, 6 HubSpot)

Standard test lead data (use consistent names)
Lead A: Name=Test Alpha, Phone=+14155550101, Service=“Water heater repair”, ZIP=94107
Lead B: Name=Test Beta, Phone=+14155550102, Service=“Roof leak”, ZIP=94110
Lead C (missing phone): Name=Test Gamma, Phone=(empty), Service=“Pest control”, ZIP=94103
Lead D (invalid phone): Name=Test Delta, Phone=“123”, Service=“HVAC”, ZIP=94102

Lead source 1: Generic Webhook JSON (E2E)
Goal: Ensure a generic webhook event triggers SMS within 60s, dedupes retries, and formats CRM notes (if enabled).

1.1 Happy path payload (POST to webhook endpoint)
Use this JSON body:
{
  "event": "lead.created",
  "source": "webhook_test",
  "lead": {
    "external_id": "wh_001",
    "full_name": "Test Alpha",
    "phone": "+14155550101",
    "email": "test.alpha@example.com",
    "service": "Water heater repair",
    "zip": "94107",
    "notes": "Test lead via webhook"
  },
  "meta": {
    "submitted_at": "<ISO8601_NOW>",
    "utm_source": "fb",
    "utm_campaign": "speed_to_lead_test"
  }
}
Expected:
- Outbound SMS begins within 60s (record T0/T1).
- First message copy is polite + identifies business + asks first qualifying question.
- Lead is stored with external_id=wh_001.

1.2 Missing phone payload
{
  "event": "lead.created",
  "source": "webhook_test",
  "lead": {"external_id":"wh_002","full_name":"Test Gamma","phone":"","service":"Pest control","zip":"94103"},
  "meta": {"submitted_at":"<ISO8601_NOW>"}
}
Expected:
- No SMS attempted.
- System logs/flags lead as “unreachable: missing phone”.
- If configured, email alert to support email or dashboard queue entry.

1.3 Invalid phone payload
Same as above but phone="123".
Expected:
- No SMS attempted.
- Validation error recorded; lead queued for manual follow-up.

1.4 Webhook retry + idempotency
Re-send payload wh_001 3 times with identical body (or same external_id).
Expected:
- Only one outbound SMS conversation begins.
- Additional events are marked duplicate (no additional first message).

1.5 Concurrency
Send 5 unique payloads (external_id wh_010..wh_014) within 10 seconds.
Expected:
- All receive first SMS within 60s.
- No cross-talk (messages do not swap names/services).

Lead source 2: Jotform (real form tool)
Goal: Ensure form submissions map correctly and trigger the same flow.

2.1 Jotform setup checklist (manual)
- Create form “Lead Copilot QA Form”.
- Fields:
  - Full Name (required)
  - Phone Number (required)
  - Email (optional)
  - Service Needed (dropdown)
  - ZIP Code
  - Preferred time (optional)
  - Consent checkbox text: “I agree to be contacted by SMS about my request.”
- Configure webhook integration to product endpoint.

2.2 Field mapping acceptance
Verify the webhook payload from Jotform maps:
- name -> lead.full_name
- phone -> lead.phone (E.164 normalized)
- service -> lead.service
- zip -> lead.zip
Expected:
- No missing fields in downstream logs.
- First SMS within 60s.

2.3 Negative tests
- Submit with missing phone (if Jotform allows; otherwise temporarily make it optional).
Expected: same as missing phone behavior (no SMS, flagged).
- Submit with invalid phone.
Expected: same as invalid phone behavior.

Lead source 3: HubSpot (CRM)
Goal: Ensure new contact/lead events (or deal) trigger messaging and CRM notes are formatted correctly.

3.1 Trigger definition (pick one and document)
Option A: New Contact created with lifecycle stage=lead.
Option B: New Deal created in pipeline stage “New Lead”.
Expected:
- Only the chosen trigger starts SMS (avoid duplicates where both contact+deal fire).

3.2 CRM note formatting (expected template)
When a conversation starts or qualification completes, create a HubSpot note in this exact format:
Title: Lead Copilot — Qualification Summary
Body (example):
- Source: HubSpot
- Lead: Test Alpha (+1 415-555-0101)
- Service: Water heater repair
- ZIP: 94107
- Outcome: Qualified
- Answers:
  1) “What’s the issue?” → “No hot water since this morning”
  2) “When do you need service?” → “Today”
  3) “Are you the homeowner?” → “Yes”
- Booking: https://cal.example.com/book/abc (Status: sent)
- First response time: 18s
- Conversation link: <internal conversation URL if available>
Acceptance:
- Bullet formatting preserved (no JSON blobs).
- Phone is human-readable and E.164 stored.
- Note is attached to the correct record (contact or deal) consistently.

High-risk scenario test cases (run across at least 2 sources each)
A) STOP keyword
Steps: After first message, reply “STOP”.
Expected:
- Immediate confirmation: “You’re opted out. No more messages. Reply START to opt back in. Help: agent_bob_replit+lead-copilot@agentmail.to” (copy can vary but must confirm opt-out + help path).
- No further outbound messages on that thread.
- Opt-out flag stored.

B) HELP keyword
Reply “HELP”.
Expected:
- Help response includes business identity and support email, and opt-out instructions.

C) After-hours
Set business hours (example 8am–6pm). Submit lead at 9pm.
Expected:
- One immediate acknowledgement SMS within 60s that sets expectation: “Thanks—received your request. We’ll follow up tomorrow morning. If urgent, reply URGENT.”
- No aggressive qualification loop after-hours unless configured.

D) Calendar link failure
Simulate booking link down/invalid.
Expected:
- SMS: “I couldn’t open the booking link right now. What’s the best time for a call tomorrow: morning/afternoon/evening?”
- Escalation to human queue.

E) Duplicate leads
Submit same phone + same source within 5 minutes.
Expected:
- No second “first message” blast.
- Instead: either silent dedupe or a single gentle nudge (configurable), but never >1 extra message.

Deterministic fallback flow (LLM-safe mode)
Trigger conditions (any):
- LLM API error
- LLM timeout (>8s)
- Empty/invalid model output
- Safety filter refusal

Fallback behavior principles:
- Never expose “AI error”.
- Keep to 3 questions max before escalation.
- Always provide a path to a human.

Fallback SMS script (exact copy)
Message 1 (immediate):
“Thanks for reaching out—this is the scheduling assistant. To help you faster: what service do you need? (Reply 1) Plumbing 2) HVAC 3) Electrical 4) Other)” 

If reply 1/2/3/4:
Message 2:
“Got it. When do you need help? (Reply 1) Today 2) This week 3) Just pricing)” 

Message 3:
“Last question: what ZIP code is the job in?”

Then (handoff):
“Thanks—someone will confirm availability shortly. If you prefer, book here: <booking_link>. If the link doesn’t work, reply ‘CALL ME’ with a good time.”

Escalation rules:
- If user replies free-text instead of options: accept it and proceed to next question.
- If user is angry/urgent (“urgent”, “asap”, profanity): immediately send: “Understood—someone will call you as soon as possible. What’s the best number and time?” and flag for human.

Bug log / fix list (what to record)
For each defect record:
- ID, Date, Source (Webhook/Jotform/HubSpot)
- Severity: Sev-1 (compliance/spam), Sev-2 (lost lead), Sev-3 (formatting)
- Steps to reproduce
- Expected vs actual
- Evidence links (screenshots)
- Suggested fix

Common likely bugs to watch
- Phone normalization mistakes causing SMS send failure or wrong country code.
- STOP not globally suppressing follow-ups.
- Double-triggering from HubSpot contact+deal events.
- Retry storms from webhook causing message spam (no idempotency key).
- Calendar link failures not handled (dead end).
- CRM notes dumping raw JSON instead of human summary.

Results table (paste into a sheet)
Columns:
Trial # | Source | Lead external_id/form submission id/CRM record id | T0 (submitted) | T1 (first SMS sent) | Delta (sec) | Scenario | Pass/Fail | Evidence link | Notes/Bugs

Completion definition
This QA run is “done” for a pilot when:
- 20 trials completed, >=95% under 60s, and all Sev-1 issues resolved or mitigated with an operational workaround (e.g., deterministic mode + manual queue).

Operator note
Until revenue exists, do not build automated test harnesses. Run this checklist during onboarding and before any new agency rollout; it provides the fastest risk reduction per hour spent.