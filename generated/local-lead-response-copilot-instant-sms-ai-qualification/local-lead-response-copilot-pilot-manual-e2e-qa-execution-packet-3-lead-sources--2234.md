# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:21:11.317Z

---

Overview
This packet is designed for early pilots (week 1, $0 spend) to validate reliability without building automation. It provides an end-to-end manual test suite across 3 lead sources: (1) Generic Webhook JSON, (2) Jotform (real form tool), and (3) HubSpot CRM. It also verifies the core KPI: first outbound SMS must be sent within 60 seconds of lead submission/receipt.

Legitimacy references (use in any customer comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact email: agent_bob_replit+lead-copilot@agentmail.to

Success criteria (must-pass for pilots)
1) Speed-to-lead KPI: P95 time from lead received → first SMS queued/sent is <60 seconds.
2) Safety: If LLM fails/timeouts, the system switches to deterministic mode (below) and still collects minimum viable qualification (name + job type + timing + address/zip) OR escalates to human.
3) Compliance: STOP halts messages immediately; HELP provides help message; no further marketing content after STOP.
4) Dedupe: Duplicate submissions do not trigger duplicate SMS threads (within dedupe window).
5) Resilience: Webhook retries are idempotent; calendar failures degrade gracefully.

Environments / tools (all free)
- Jotform free account (for form submission testing)
- HubSpot free CRM account (for lead/notes verification)
- cURL or Postman (optional, for Generic Webhook JSON)
- Stopwatch + evidence log (Google Sheet or local notes)

Evidence to capture (required for “verified <60s”)
For each trial, record:
- Trial ID
- Lead Source (Webhook/Jotform/HubSpot)
- t0: Lead submitted time (form submit timestamp OR webhook received timestamp)
- t1: First SMS “queued/sent” timestamp (from app logs/provider logs)
- Δt = t1 - t0 (seconds)
- Outcome (Pass/Fail)
- Transcript snippet (first message + any STOP/HELP)
- Notes saved to CRM (for HubSpot cases)
Minimum sample size for pilot proof: 20 trials total across 3 sources (recommended split: 8 webhook, 6 Jotform, 6 HubSpot).

Deterministic fallback mode (LLM down / timeout / error)
Trigger conditions
- LLM call returns error
- LLM call exceeds timeout (recommend 6–8 seconds)
- LLM returns non-parseable output
Behavior
- Switch conversation state = DETERMINISTIC
- Do not attempt additional LLM calls for that lead for 15 minutes (cooldown)
- Ask a fixed sequence of short questions; stop after collecting required fields or after 4 attempts.

Deterministic questions (exact copy)
Message 1 (immediate)
“Hi {first_name-if-known}, it’s {business_name}. Thanks for reaching out — quick question so we can help fast: what service do you need? (e.g., repair, install, quote)”

If no reply within 2 minutes:
“Just checking — what service can we help with? Reply with a short phrase like ‘water heater repair’.”

On reply, ask timing:
“Got it. When do you need this? Reply with: 1) Today, 2) This week, or 3) Just researching.”

Then ask location:
“Thanks. What’s the job address or ZIP code?”

Then scheduling:
“We can get you booked. Are you available for a quick call in the next 15 minutes? Reply YES or NO.”

If YES:
“Great — here’s the booking link: {calendar_link}. If it doesn’t open, reply with 2 times that work for you today.”

If NO:
“No problem — reply with 2 times that work for you (include timezone).”

Escalation-to-human rules
Escalate immediately (tag “HUMAN_REVIEW”) if:
- Prospect expresses urgency (“emergency”, “flooding”, “gas smell”)
- Prospect asks pricing that cannot be answered safely
- Prospect replies with profanity/abuse
- Prospect replies after 3 failed attempts to collect service + timing + location
Escalation message:
“Thanks — looping in a team member to help you next. If this is urgent, please call us at {business_phone}.”

STOP/HELP compliance (deterministic)
- If inbound message contains “STOP”, “UNSUBSCRIBE”, “CANCEL”: set contact = DO_NOT_CONTACT and reply once:
“You’re opted out and won’t receive texts from us. Reply HELP for help.”
- If inbound contains “HELP”: reply:
“Help: Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

Test matrix (must-run scenarios)
A) Generic Webhook JSON lead source
1. Happy path webhook
- Send valid JSON with name + phone + service
- Expect first SMS within 60s
- Expect correct personalization + first question
2. Missing phone
- JSON missing phone field
- Expect: no SMS attempt; create internal task/CRM note “Missing phone”; optional email if available
3. Invalid phone
- Phone = “123” or non-E.164
- Expect: validation failure; no SMS; logged error; CRM note created
4. Webhook retries/idempotency
- Send same lead payload (same external_id) 3 times
- Expect: only 1 SMS thread; subsequent requests return 200/OK with “duplicate ignored” behavior
5. Duplicate leads (same phone, different payload)
- Send two leads within 2 minutes with same phone
- Expect: either merge into same conversation or suppress 2nd outbound; record chosen rule
6. After-hours
- Simulate lead at 11:30pm local
- Expect: immediate acknowledgement text OR polite delay message (define policy); no booking pressure
7. Calendar link failure
- Use invalid calendar link
- Expect: fallback message asking for 2 preferred times; escalation tag
8. Multiple concurrent leads
- Trigger 5 leads within 30 seconds
- Expect: first response for each within 60s; no cross-talk between threads

B) Jotform lead source
Setup
- Create a Jotform with fields: Name, Phone, Email, Service Needed, ZIP, Preferred Time
- Configure webhook/integration to Copilot endpoint
Tests
1. Happy path
2. Missing phone (left blank)
3. Invalid phone (letters)
4. Duplicate submit (submit twice)
5. After-hours (manual time simulation: change app timezone rules or run late)
6. STOP/HELP (use test phone where you can respond)

C) HubSpot CRM lead source
Setup
- Create HubSpot form or contact creation workflow that triggers webhook to Copilot OR use HubSpot’s webhook subscriptions (depending on current product support)
Tests
1. Contact created → SMS
- Create contact with phone
- Expect SMS within 60s
- Expect HubSpot note created with transcript header
2. CRM note formatting
- Verify note is readable: includes timestamps, source, qualification answers, status
3. Duplicate contact update
- Update same contact twice
- Expect no duplicate SMS
4. Missing phone in contact
- Expect no SMS; create note “missing phone”

Expected HubSpot note format (copy spec)
Title: “Lead Copilot Conversation — {Lead Source} — {Status}”
Body (example):
“Source: Jotform
Lead Received: 2026-04-09 14:03:12 local
First SMS Sent: 2026-04-09 14:03:40 local (Δt=28s)
Mode: LLM (fallback: deterministic=false)

Q: Service needed?
A: Water heater repair
Q: Timing?
A: Today
Q: ZIP?
A: 94107
Q: Available in next 15 min?
A: YES

Outcome: Booking link sent
Conversation ID: abc123
Opt-out: false”

Results capture table (paste into sheet)
Columns:
Trial ID | Source | Scenario | t0 lead submit/received | t1 first SMS queued/sent | Δt (s) | Pass <60s (Y/N) | Mode (LLM/Deterministic) | STOP/HELP tested (Y/N) | Dedup OK (Y/N) | Notes/URL to evidence

Bug log template
Bug ID | Severity (P0/P1/P2) | Scenario | Steps to Reproduce | Expected | Actual | Logs/Evidence | Suspected Cause | Suggested Fix | Owner | Status
Severity rubric
- P0: compliance breach (STOP ignored), wrong-recipient texting, or >60s widespread latency
- P1: occasional >60s, dedupe failures, calendar failure with no fallback
- P2: formatting issues, minor copy, non-blocking edge cases

Pilot execution checklist (60-minute run)
1) Confirm app is receiving events (one quick webhook ping)
2) Run 8 webhook trials (including retries + duplicates)
3) Run 6 Jotform trials
4) Run 6 HubSpot trials
5) Run STOP/HELP test with at least one lead thread
6) Compute P95 Δt and confirm <60s
7) File bugs with evidence and prioritize P0/P1 for immediate fixes before expanding pilot

Notes on distribution/revenue alignment
This QA packet is intentionally manual to avoid slowing revenue. It is designed to be executed during pilot onboarding to produce credible evidence (<60s) agencies can trust, while preventing reputation damage via deterministic fallback and compliance behaviors.