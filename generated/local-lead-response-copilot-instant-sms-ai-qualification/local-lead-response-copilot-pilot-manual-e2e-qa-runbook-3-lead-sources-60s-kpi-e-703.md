# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + <60s KPI Evidence + Deterministic Fallback Mode

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:14:12.176Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook

## Purpose (pre-revenue, pilot-safe)
This runbook validates that the product reliably texts and qualifies leads fast enough to win deals for local services, **without** building automated QA. It produces timestamped evidence for agencies and a prioritized bug list that prevents churn.

**Customer legitimacy references (include in comms if needed):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

## Scope
### Lead sources (3)
1) **Generic Webhook JSON** (represents any ad platform/form/landing page)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (real CRM)

### Required scenarios (must test)
- Missing phone
- Invalid phone
- STOP / HELP compliance
- After-hours behavior
- Multiple concurrent leads
- Calendar link failures
- Webhook retries
- Duplicate leads (dedupe)
- CRM note formatting (HubSpot)

## KPI: <60s first-response (definition + proof)
### Definition
**First response time** = `timestamp(SMS sent by system) - timestamp(lead received by system)`.

### Pass/Fail
- **PASS:** p95 < 60 seconds across at least **20 trials** (combined across sources); no individual trial > 120 seconds without a logged external outage cause.
- **SOFT FAIL:** p95 between 60–90 seconds (acceptable only in early pilot with documented cause and fix plan).
- **HARD FAIL:** p95 > 90 seconds OR any systematic delay pattern.

### Evidence to capture (per trial)
Record each trial in the Results Table:
- Lead source
- Lead submitted time (client-side)
- Webhook received time (server-side if available)
- SMS queued time
- SMS sent time
- First inbound reply time (if applicable)
- Outcome (qualified, booked, escalated)
- Screenshot/log URL references if available

**How to capture time quickly:**
- Use a single stopwatch + copy timestamps into table.
- Use message provider logs (e.g., Twilio console) if available for sent time.
- Use server logs/webhook logs for received time if available.

## Preconditions / Setup
- A test phone number that can receive SMS and reply.
- A “test calendar link” configured (or a placeholder URL) so calendar failures can be simulated.
- Product has endpoints/config for:
  - Inbound lead webhook (JSON)
  - Jotform integration or webhook
  - HubSpot workflow/webhook/app

If any precondition is missing, log it as a **P0 Blocker** (it prevents KPI proof).

## Deterministic Fallback Mode (LLM-safe)
### When to activate
Trigger deterministic mode if any of these occurs:
- LLM timeout (>5s, configurable)
- LLM returns error/empty output
- LLM returns content that violates policy (e.g., asks for sensitive data)
- Rate limit / upstream outage

### Fallback goals
- Continue qualification with **fixed questions** (no hallucination)
- Keep messages short
- Always provide an “agent will follow up” escape hatch
- Avoid collecting sensitive info

### Deterministic SMS script (copy/paste)
**Message 0 (immediate):**
“Hi {first_name}, thanks for reaching out — quick question so I can help fast: what service do you need? Reply 1) {Service A} 2) {Service B} 3) Other”

**If reply = 1/2/3:**
“Got it. What’s your ZIP code?”

**If ZIP provided (basic pattern: 5 digits US; otherwise accept any short text):**
“Thanks. When do you want this done? Reply 1) ASAP 2) This week 3) Just pricing”

**Then:**
“Perfect — last one: is this for a home you own, rent, or other?”

**Booking step (if calendar available):**
“Thanks. You can grab a time here: {calendar_link}. If you prefer, reply with a good time window and we’ll confirm.”

**If calendar link fails (detected error or known outage):**
“Sorry — our booking link is temporarily down. Reply with 2–3 times that work today/tomorrow and we’ll confirm by text. Or email us at agent_bob_replit+lead-copilot@agentmail.to.”

**Escalation-to-human rule:**
- Escalate immediately if user asks for a human, price quote complexity, or says “complaint”.
- Escalation message:
“Absolutely — looping in a human now. If urgent, email agent_bob_replit+lead-copilot@agentmail.to. We’ll reply ASAP.”

### Safety constraints
- Never request: SSN, full credit card numbers, banking logins.
- If user provides sensitive data unsolicited: respond “For safety, please don’t send sensitive info by text. We can handle that on a call.”

## STOP/HELP compliance behavior
### Required behavior
- If user texts **STOP** (case-insensitive, may include punctuation):
  - Immediately confirm opt-out: “You’re opted out and won’t receive more texts. Reply START to resubscribe.”
  - Ensure no further automated messages are sent.
- If user texts **HELP**:
  - Provide help + contact: “Support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

### Tests
- STOP after first system message
- STOP mid-qualification
- HELP at start and mid-flow
- START after STOP (if supported)

## After-hours behavior
Define business hours (example): Mon–Fri 8am–6pm local.

### Required after-hours behavior
- If lead arrives after-hours:
  - Send immediate acknowledgement: “Thanks — we’re closed right now but will text you first thing at {open_time}. If urgent, reply URGENT.”
  - Create a follow-up task/queue item for next open.

## Dedupe / Retry rules
### Webhook retries
- If the same webhook is delivered multiple times, system should be idempotent.

### Dedupe key (suggested)
- Prefer `external_lead_id` if present.
- Else hash of `(phone + source + form_id + date_bucket)`.

### Required behavior
- Duplicate lead should not trigger multiple parallel conversations.
- If duplicate occurs within 24h:
  - Append note internally; optionally send a single message: “We’re on it — a quick question…” only if no recent outbound in last X minutes.

## CRM note formatting (HubSpot)
### Requirement
Qualification transcript should be readable and structured.

**Expected HubSpot Note Template:**
Title: “Lead Copilot — SMS Qualification Summary”
Body:
- Source: {source}
- Lead name: {name}
- Phone: {phone}
- Received: {timestamp}
- First SMS sent: {timestamp} (response time: {seconds}s)
- Service needed: {answer}
- ZIP: {answer}
- Timing: {answer}
- Ownership: {answer}
- Booking: {booked_time OR calendar_link OR ‘needs scheduling’}
- Opt status: {opted-in/opted-out}
- Full transcript (most recent first):
  - [time] System: …
  - [time] Lead: …

## Execution order (run in <60 minutes)
1) Run **Generic Webhook JSON** happy path (1 trial) to validate baseline.
2) Run **Jotform** happy path (2 trials) + missing/invalid phone (2 trials).
3) Run STOP/HELP tests (4 trials total across any source).
4) Run after-hours simulation (1–2 trials).
5) Run calendar failure simulation (1–2 trials).
6) Run webhook retry + duplicate lead (2–3 trials).
7) Run concurrency: submit 3 leads within 60 seconds (1 batch).
8) Run HubSpot note formatting verification (at least 3 trials) and confirm transcript layout.
9) Summarize KPI p95 and list bugs.

## Copy-pastable Generic Webhook JSON payloads
### Payload A — Happy path
```json
{
  "external_lead_id": "qa-001",
  "source": "webhook",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15555550101",
  "email": "test@example.com",
  "service": "Plumbing",
  "message": "Need a quote"
}
```

### Payload B — Missing phone
```json
{
  "external_lead_id": "qa-002",
  "source": "webhook",
  "first_name": "NoPhone",
  "last_name": "Lead",
  "email": "test@example.com",
  "service": "HVAC"
}
```
Expected: no SMS attempt; create internal task; error logged; optional email fallback.

### Payload C — Invalid phone
```json
{
  "external_lead_id": "qa-003",
  "source": "webhook",
  "first_name": "BadPhone",
  "phone": "123",
  "service": "Roofing"
}
```
Expected: validation failure; no SMS; visible error.

### Payload D — Retry/duplicate
Send Payload A twice with same `external_lead_id`.
Expected: only one conversation/SMS; second request returns idempotent success.

## Results Table (paste into sheet)
Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (happy, stop, help, invalid phone, etc.)
- Lead submit time
- System received time
- SMS sent time
- First response time (sec)
- Outcome
- Evidence link (logs/screenshot)
- Notes

## Bug/Fix Log (severity rubric)
- **P0 Blocker:** prevents sending first SMS; STOP not honored; spam risk; cannot prove <60s.
- **P1 High:** delays >60s common; incorrect routing after-hours; duplicates spam.
- **P2 Medium:** formatting issues; minor copy; occasional edge-case.
- **P3 Low:** cosmetic.

Bug entry format:
- ID:
- Severity:
- Source/Scenario:
- Steps to reproduce:
- Expected:
- Actual:
- Evidence:
- Suggested fix:
- Retest checklist:

## Acceptance checklist (ship/pilot gate)
- [ ] p95 first response <60s across 20 trials
- [ ] STOP stops all future automation
- [ ] HELP provides support contact + STOP instruction
- [ ] Missing/invalid phone does not attempt SMS; creates internal follow-up record
- [ ] After-hours message is correct and schedules follow-up
- [ ] Calendar failures degrade gracefully with manual scheduling prompt
- [ ] Webhook retries are idempotent
- [ ] Dedupe prevents multiple concurrent threads per lead
- [ ] HubSpot notes are readable and include timestamps + transcript
