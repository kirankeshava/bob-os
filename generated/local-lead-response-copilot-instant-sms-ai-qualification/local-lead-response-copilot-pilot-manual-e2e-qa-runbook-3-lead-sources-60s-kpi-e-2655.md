# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + <60s KPI Evidence + Deterministic Fallback Flow

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:45:21.386Z

---

## 0) Context (what this runbook proves)
Goal: protect reputation in early pilots by proving (a) first outbound SMS is sent in <60 seconds from lead receipt across 3 sources, and (b) system behaves safely when inputs are bad, users opt out (STOP), after-hours triggers, downstream booking fails, duplicates/retries happen, and the LLM fails.

**Public legitimacy link (shareable):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
**Support contact for pilots:** agent_bob_replit+lead-copilot@agentmail.to

## 1) Lead sources covered (minimum 3)
1) **Generic Webhook JSON** (any form/ad platform that can POST JSON)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (CRM source + note formatting validation)

## 2) KPI: “first response < 60s” measurement method
### Timestamp points (must capture all 3)
- **T0 (Lead Received):** timestamp when our endpoint/integration receives the lead (server log or webhook request log).
- **T1 (SMS Send Initiated):** timestamp when we enqueue/send via SMS provider (app log).
- **T2 (Carrier Accepted/Delivered if available):** provider message status timestamp (optional but preferred).

### Pass/Fail
- Primary KPI: **T1 - T0 <= 60 seconds** (PASS). If >60s (FAIL).
- Secondary: if provider status exists, record **T2 - T0** as “customer-perceived speed”, but don’t fail the KPI on carrier delays.

### Evidence checklist (store per trial)
- Screenshot or export row of webhook/lead receipt log showing **T0** and lead identifier.
- Screenshot/log line showing **T1** with the same lead identifier.
- SMS provider log line with message SID + timestamp (if available).
- Copy of first SMS body sent.

### Sample size target
- **20 trials total** across the 3 sources (suggested distribution: 8 webhook, 6 Jotform, 6 HubSpot). If time-constrained: 3 per source minimum for initial proof.

## 3) Deterministic “LLM down / timeout” safe mode (exact copy + branching)
Use this when: LLM errors, times out, token limits exceeded, vendor outage, or confidence below threshold.

### Global rules
- **Never ask more than 3 questions** before offering a booking link or human handoff.
- If user replies STOP: immediately opt out (see STOP/HELP section).
- If after-hours: acknowledge + promise next-day follow-up; optionally still collect 1 detail.

### Message 0 (immediate first SMS)
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out — we can help. What’s the address (or neighborhood) for the job?”

If no name/business_name available:
“Hi — thanks for reaching out. What’s the address (or neighborhood) for the job?”

### If user answers with location/address
Ask Q2:
“Got it. What do you need help with? Reply 1) Repair 2) Replace 3) Quote 4) Other”

### If user replies 1/2/3/4 (or free text)
Ask Q3:
“Thanks. What’s the best time for a quick call? Reply 1) ASAP 2) Today 3) Tomorrow 4) Just send pricing by text”

### After Q3 response
- If calendar/booking is available:
“Perfect — here’s the link to book: {{calendar_link}}. If you prefer, reply with a good time window and we’ll confirm.”
- If calendar link fails/unavailable:
“Thanks — our booking link is temporarily down. Reply with a 2-hour window that works and we’ll confirm by text.”

### Escalation to human (deterministic trigger)
Escalate if any:
- user asks a complex question (pricing details, policy, warranty, financing)
- user is angry/mentions complaint
- user replies with unclear/unparseable messages 2x
Escalation message:
“Thanks — looping in a specialist to help. If you can share a photo (optional) and your preferred time window, we’ll follow up shortly.”

## 4) Compliance & safety behaviors (STOP/HELP)
### STOP
If inbound body matches (case-insensitive): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- Immediately stop all future messages to that phone.
- Reply once:
“You’re opted out and will no longer receive messages. Reply HELP for info.”
- Log: opt-out timestamp, source, lead id.

### HELP
If inbound body is HELP or INFO:
- Reply:
“Help: This is {{business_name}} responding to your service request. Reply STOP to opt out. For support email: agent_bob_replit+lead-copilot@agentmail.to”

## 5) After-hours rules
Define business hours (example): Mon–Fri 8am–6pm local time.
If lead arrives after-hours:
- Still send first SMS <60s, but with after-hours copy:
“Thanks for reaching out to {{business_name}} — we’re currently closed. If you share the address/neighborhood, we’ll follow up first thing next business day.”
- Mark lead status: AFTER_HOURS.
- Next business day: send follow-up at opening time (or queue for human).

## 6) Test cases (what to run) — includes requested edge cases
Each test case includes: setup, steps, expected result.

### TC1 Missing phone
- Setup: submit lead with phone=null/empty.
- Expected: no SMS attempt; lead marked “NEEDS_PHONE”; create CRM note “Missing phone; cannot text.”; optionally email internal alert.

### TC2 Invalid phone
- Setup: phone=“123”, phone=“555-555-5555” (if invalid by validator), phone with letters.
- Expected: validation fail; no SMS; log reason; CRM note includes raw input and failure reason.

### TC3 STOP
- Setup: normal lead; user replies “STOP”.
- Expected: opt-out stored; no further outbound; one confirmation reply only.

### TC4 HELP
- Setup: user replies HELP.
- Expected: HELP template sent containing support email and STOP instruction.

### TC5 After-hours
- Setup: submit lead outside hours.
- Expected: after-hours first SMS <60s; status AFTER_HOURS; no booking pressure; queued follow-up.

### TC6 Multiple concurrent leads
- Setup: submit 5 leads within 10 seconds.
- Expected: each receives first SMS <60s; no cross-talk; correct lead-to-thread mapping.

### TC7 Calendar link failure
- Setup: calendar_link missing/invalid or booking API errors.
- Expected: system sends fallback “link down” copy; collects time window; escalates/handoff; no dead-end.

### TC8 Webhook retries
- Setup: resend same webhook payload with same idempotency key/event_id (or same lead_id).
- Expected: dedupe; do not send duplicate first SMS; log “duplicate webhook ignored”.

### TC9 Duplicate lead (same phone within window)
- Setup: same phone submits twice within 5 minutes.
- Expected: dedupe rule applies (configurable): either suppress second SMS or send polite acknowledgment without restarting questions; must not spam.

### TC10 CRM note formatting (HubSpot)
- Setup: ensure note is created/updated with a single canonical format.
- Expected: note contains: Lead Source, T0/T1, first SMS body, conversation transcript snippet, opt-out status, booking outcome, and any errors.

## 7) Concrete payloads (ready to paste)
### 7.1 Generic Webhook JSON (POST)
Headers: Content-Type: application/json
Body:
{
  "event_id": "evt_2026_05_14_0001",
  "source": "webhook",
  "first_name": "Jamie",
  "last_name": "Lee",
  "phone": "+14155550123",
  "email": "jamie.lee@example.com",
  "service": "water heater repair",
  "zip": "94107",
  "message": "Need someone today",
  "timestamp": "2026-05-14T16:10:00Z"
}
Expected: first SMS sent <60s; lead record created; idempotency on event_id.

### 7.2 Jotform field mapping (example)
Assume fields:
- name[first], name[last]
- phone
- email
- address
- service_type
Expected mapping:
first_name=name[first]; last_name=name[last]; phone=phone; email=email; location=address; intent=service_type.
Expected: first SMS uses first_name if present; if phone missing => TC1 behavior.

### 7.3 HubSpot note template (canonical)
Title: “Lead Response Copilot — Conversation Log”
Body (example):
- Lead Source: HubSpot Form / Contact Create
- Lead ID: {{lead_id}}
- Phone: {{phone}}
- Received (T0): {{t0}}
- First SMS queued (T1): {{t1}} (Δ={{delta_seconds}}s)
- First SMS: “{{first_sms_body}}”
- Outcome: {{Booked / Requested callback / Opted out / No response}}
- Booking Link Status: {{OK / Failed: reason}}
- Errors: {{none or list}}
- Transcript:
  - OUT {{t1}}: {{first_sms_body}}
  - IN {{t_in}}: {{user_reply}}
  - OUT {{t_out}}: {{system_reply}}

## 8) Results capture table (paste into sheet)
Columns:
Trial# | Source (Webhook/Jotform/HubSpot) | Scenario (Normal/STOP/etc) | Lead ID | Phone | T0 | T1 | Δsec | First SMS text | PASS/FAIL | Notes/Evidence link

## 9) Bug/Fix checklist (prioritized for churn risk)
P0 (must fix before any agency pilot):
- SMS not sent or >60s consistently
- STOP not honored immediately
- Duplicate/retry causes spam
- Missing/invalid phone triggers SMS attempt (wasted spend + compliance risk)

P1:
- After-hours messaging wrong tone or schedules follow-up incorrectly
- Calendar failure results in dead-end
- Concurrency causes message mix-up

P2:
- HubSpot note formatting inconsistent or missing T0/T1

## 10) Execution order (fastest path)
1) Run 3 normal-flow trials (one per source) and record Δsec.
2) Run STOP/HELP on one thread each.
3) Run missing/invalid phone.
4) Run retries/duplicates.
5) Run after-hours (simulate by adjusting system clock or using a staging “after-hours mode”).
6) Run concurrency (5 leads burst).

End-state: a timestamped table demonstrating <60s T1-T0 and a short bug list with repro steps + severity.
